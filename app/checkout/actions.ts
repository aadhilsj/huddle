"use server";

import { redirect } from "next/navigation";
import type { Route } from "next";

import { createStripeCheckoutSession } from "@/lib/stripe";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function startCheckout(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const competitionName = String(formData.get("competitionName") ?? "").trim();

  if (!email || !competitionName) {
    redirect("/checkout?error=missing_fields");
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    redirect(`/checkout?email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&error=supabase_admin_missing`);
  }

  const admin = supabase as unknown as {
    from: (table: string) => any;
  };

  const { data: joinRequest, error: joinRequestError } = await admin
    .from("join_requests")
    .select("id, status")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (joinRequestError || !joinRequest?.id) {
    console.error("Checkout start failed to locate join request.", joinRequestError);
    redirect(`/checkout?email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&error=join_request_missing`);
  }

  const session = await createStripeCheckoutSession({
    competitionName,
    email,
    fullName: fullName || email,
    joinRequestId: joinRequest.id
  });

  if (session.error || !session.url) {
    redirect(`/checkout?email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&error=${session.error ?? "stripe_session_failed"}`);
  }

  await admin
    .from("join_requests")
    .update({ status: "checkout_started" })
    .eq("id", joinRequest.id);

  redirect(session.url as Route);
}
