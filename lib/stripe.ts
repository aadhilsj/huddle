import { createHmac, timingSafeEqual } from "crypto";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const stripeCurrency = (process.env.STRIPE_CURRENCY ?? "usd").toLowerCase();
const stripeEntryFeeCents = Number(process.env.STRIPE_ENTRY_FEE_CENTS ?? "2500");

type StripeCheckoutSessionResponse = {
  amount_total: number | null;
  currency: string;
  customer_details?: {
    email?: string | null;
    name?: string | null;
  } | null;
  id: string;
  metadata?: Record<string, string> | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
};

export function isStripeConfigured() {
  return Boolean(stripeSecretKey && appUrl);
}

export function getStripePublishableConfig() {
  return {
    appUrl,
    currency: stripeCurrency,
    entryFeeCents: stripeEntryFeeCents,
    ready: isStripeConfigured()
  };
}

export async function createStripeCheckoutSession(args: {
  competitionName: string;
  email: string;
  fullName: string;
  joinRequestId: string;
}) {
  if (!stripeSecretKey || !appUrl) {
    return { error: "stripe_not_configured" as const, url: null };
  }

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", `${appUrl}/onboarding?email=${encodeURIComponent(args.email)}&name=${encodeURIComponent(args.fullName)}`);
  params.set("cancel_url", `${appUrl}/checkout?email=${encodeURIComponent(args.email)}&name=${encodeURIComponent(args.fullName)}`);
  params.set("customer_email", args.email);
  params.set("metadata[join_request_id]", args.joinRequestId);
  params.set("metadata[email]", args.email);
  params.set("metadata[full_name]", args.fullName);
  params.set("line_items[0][quantity]", "1");
  params.set("line_items[0][price_data][currency]", stripeCurrency);
  params.set("line_items[0][price_data][unit_amount]", String(stripeEntryFeeCents));
  params.set("line_items[0][price_data][product_data][name]", args.competitionName);
  params.set("line_items[0][price_data][product_data][description]", "Huddle entry");

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString(),
    cache: "no-store"
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Stripe Checkout Session creation failed.", errorBody);
    return { error: "stripe_session_failed" as const, url: null };
  }

  const data = (await response.json()) as { url?: string };

  return {
    error: null,
    url: data.url ?? null
  };
}

function parseStripeSignature(header: string) {
  const parts = header.split(",");
  const timestamp = parts
    .find((part) => part.startsWith("t="))
    ?.slice(2);
  const signatures = parts
    .filter((part) => part.startsWith("v1="))
    .map((part) => part.slice(3));

  return { signatures, timestamp };
}

export function verifyStripeWebhookSignature(payload: string, signatureHeader: string | null) {
  if (!stripeWebhookSecret || !signatureHeader) {
    return false;
  }

  const { signatures, timestamp } = parseStripeSignature(signatureHeader);

  if (!timestamp || !signatures.length) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac("sha256", stripeWebhookSecret)
    .update(signedPayload, "utf8")
    .digest("hex");

  return signatures.some((signature) => {
    try {
      return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    } catch {
      return false;
    }
  });
}

export function parseStripeWebhookEvent(payload: string) {
  return JSON.parse(payload) as {
    data?: {
      object?: StripeCheckoutSessionResponse;
    };
    type?: string;
  };
}
