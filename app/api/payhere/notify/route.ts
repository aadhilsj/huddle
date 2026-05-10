import { NextResponse } from "next/server";

import { verifyPayHereSignature } from "@/lib/payhere";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type JoinRequestRow = {
  competition_id: string | null;
  email: string;
  full_name: string;
  home_city: string | null;
  source_channel: string | null;
  source_detail: string | null;
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const merchantId = String(formData.get("merchant_id") ?? "");
  const orderId = String(formData.get("order_id") ?? "");
  const payhereAmount = String(formData.get("payhere_amount") ?? formData.get("amount") ?? "");
  const payhereCurrency = String(formData.get("payhere_currency") ?? formData.get("currency") ?? "");
  const statusCode = String(formData.get("status_code") ?? "");
  const md5sig = String(formData.get("md5sig") ?? "");
  const paymentId = String(formData.get("payment_id") ?? "");
  const joinRequestId = String(formData.get("custom_1") ?? orderId);

  if (
    !verifyPayHereSignature({
      merchantId,
      orderId,
      payhereAmount,
      payhereCurrency,
      statusCode,
      md5sig
    })
  ) {
    return new NextResponse("invalid signature", { status: 400 });
  }

  if (statusCode !== "2") {
    return new NextResponse("ignored", { status: 200 });
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return new NextResponse("missing supabase admin", { status: 500 });
  }

  const admin = supabase as unknown as {
    from: (table: string) => any;
  };

  const { data: existingPayment } = await admin
    .from("payments")
    .select("id")
    .eq("provider_payment_id", paymentId)
    .maybeSingle();

  if (existingPayment?.id) {
    return new NextResponse("ok", { status: 200 });
  }

  const { data: joinRequest, error: joinRequestError } = await admin
    .from("join_requests")
    .select("competition_id, email, full_name, home_city, source_channel, source_detail")
    .eq("id", joinRequestId)
    .maybeSingle();

  if (joinRequestError || !joinRequest) {
    console.error("PayHere notify could not load join request.", joinRequestError);
    return new NextResponse("join request missing", { status: 404 });
  }

  const requestRow = joinRequest as JoinRequestRow;

  const { data: existingMember } = await admin
    .from("members")
    .select("id")
    .eq("email", requestRow.email)
    .maybeSingle();

  let memberId = existingMember?.id ?? null;

  if (!memberId) {
    const { data: insertedMember, error: memberError } = await admin
      .from("members")
      .insert({
        email: requestRow.email,
        full_name: requestRow.full_name,
        home_city: requestRow.home_city,
        source_channel: requestRow.source_channel,
        source_detail: requestRow.source_detail,
        member_status: "active"
      })
      .select("id")
      .single();

    if (memberError || !insertedMember?.id) {
      console.error("PayHere notify member creation failed.", memberError);
      return new NextResponse("member create failed", { status: 500 });
    }

    memberId = insertedMember.id;
  } else {
    await admin
      .from("members")
      .update({ member_status: "active" })
      .eq("id", memberId);
  }

  let competitionMembershipId: string | null = null;

  if (requestRow.competition_id) {
    const { data: existingMembership } = await admin
      .from("competition_memberships")
      .select("id")
      .eq("member_id", memberId)
      .eq("competition_id", requestRow.competition_id)
      .maybeSingle();

    if (existingMembership?.id) {
      competitionMembershipId = existingMembership.id;
      await admin
        .from("competition_memberships")
        .update({
          membership_status: "active",
          payment_status: "paid"
        })
        .eq("id", competitionMembershipId);
    } else {
      const { data: insertedMembership, error: membershipError } = await admin
        .from("competition_memberships")
        .insert({
          member_id: memberId,
          competition_id: requestRow.competition_id,
          membership_status: "active",
          payment_status: "paid"
        })
        .select("id")
        .single();

      if (membershipError || !insertedMembership?.id) {
        console.error("PayHere notify competition membership creation failed.", membershipError);
        return new NextResponse("membership create failed", { status: 500 });
      }

      competitionMembershipId = insertedMembership.id;
    }
  }

  const amountCents = Math.round(Number(payhereAmount) * 100);

  await admin
    .from("payments")
    .insert({
      member_id: memberId,
      competition_membership_id: competitionMembershipId,
      provider: "payhere",
      provider_payment_id: paymentId || orderId,
      amount_cents: amountCents,
      currency: payhereCurrency,
      payment_status: "paid",
      paid_at: new Date().toISOString(),
      metadata: {
        join_request_id: joinRequestId,
        gateway: "payhere",
        order_id: orderId
      }
    });

  await admin
    .from("join_requests")
    .update({ status: "approved" })
    .eq("id", joinRequestId);

  await admin
    .from("onboarding_events")
    .insert({
      member_id: memberId,
      competition_membership_id: competitionMembershipId,
      event_type: "payment_confirmed",
      event_status: "completed",
      detail: "PayHere payment confirmed.",
      metadata: {
        provider: "payhere",
        provider_payment_id: paymentId || orderId
      }
    });

  return new NextResponse("ok", { status: 200 });
}
