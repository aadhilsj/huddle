import { NextResponse } from "next/server";

import {
  parseStripeWebhookEvent,
  verifyStripeWebhookSignature
} from "@/lib/stripe";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type JoinRequestRow = {
  competition_id: string | null;
  email: string;
  full_name: string;
  home_city: string | null;
  source_channel: string | null;
  source_detail: string | null;
  status: string;
};

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!verifyStripeWebhookSignature(payload, signature)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const event = parseStripeWebhookEvent(payload);

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data?.object;

  if (!session?.id) {
    return NextResponse.json({ error: "missing_session" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ error: "supabase_admin_missing" }, { status: 500 });
  }

  const admin = supabase as unknown as {
    from: (table: string) => any;
  };

  const { data: existingPayment } = await admin
    .from("payments")
    .select("id")
    .eq("provider_payment_id", session.id)
    .maybeSingle();

  if (existingPayment?.id) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const joinRequestId = session.metadata?.join_request_id;

  if (!joinRequestId) {
    return NextResponse.json({ error: "missing_join_request_id" }, { status: 400 });
  }

  const { data: joinRequest, error: joinRequestError } = await admin
    .from("join_requests")
    .select("competition_id, email, full_name, home_city, source_channel, source_detail, status")
    .eq("id", joinRequestId)
    .maybeSingle();

  if (joinRequestError || !joinRequest) {
    console.error("Stripe webhook could not load join request.", joinRequestError);
    return NextResponse.json({ error: "join_request_missing" }, { status: 404 });
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
      console.error("Stripe webhook member creation failed.", memberError);
      return NextResponse.json({ error: "member_create_failed" }, { status: 500 });
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
        console.error("Stripe webhook competition membership creation failed.", membershipError);
        return NextResponse.json({ error: "membership_create_failed" }, { status: 500 });
      }

      competitionMembershipId = insertedMembership.id;
    }
  }

  const amountCents = session.amount_total ?? 0;

  const { error: paymentError } = await admin
    .from("payments")
    .insert({
      member_id: memberId,
      competition_membership_id: competitionMembershipId,
      provider: "stripe",
      provider_payment_id: session.id,
      amount_cents: amountCents,
      currency: session.currency.toUpperCase(),
      payment_status: session.payment_status === "paid" ? "paid" : "pending",
      paid_at: session.payment_status === "paid" ? new Date().toISOString() : null,
      metadata: {
        join_request_id: joinRequestId,
        customer_email: session.customer_details?.email ?? requestRow.email
      }
    });

  if (paymentError) {
    console.error("Stripe webhook payment insert failed.", paymentError);
    return NextResponse.json({ error: "payment_insert_failed" }, { status: 500 });
  }

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
      detail: "Stripe Checkout completed.",
      metadata: {
        provider: "stripe",
        provider_payment_id: session.id
      }
    });

  return NextResponse.json({ received: true });
}
