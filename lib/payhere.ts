import { createHash } from "crypto";

const merchantId = process.env.PAYHERE_MERCHANT_ID;
const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const sandbox = process.env.PAYHERE_SANDBOX !== "false";

export type PayHereFormConfig = {
  actionUrl: string;
  fields: Record<string, string>;
  ready: boolean;
};

function payhereActionUrl() {
  return sandbox ? "https://sandbox.payhere.lk/pay/checkout" : "https://www.payhere.lk/pay/checkout";
}

function toAmountString(amount: number) {
  return amount.toFixed(2);
}

function md5(value: string) {
  return createHash("md5").update(value).digest("hex").toUpperCase();
}

function firstName(fullName: string) {
  const [first] = fullName.trim().split(/\s+/);
  return first || fullName;
}

function lastName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return parts.length > 1 ? parts.slice(1).join(" ") : "-";
}

export function isPayHereConfigured() {
  return Boolean(merchantId && merchantSecret && appUrl);
}

export function buildPayHereForm(args: {
  address: string;
  city: string;
  competitionName: string;
  country: string;
  email: string;
  fullName: string;
  joinRequestId: string;
  phone: string;
  settlementAmount: number;
  settlementCurrency: "LKR" | "USD";
}) : PayHereFormConfig {
  if (!merchantId || !merchantSecret || !appUrl) {
    return {
      actionUrl: payhereActionUrl(),
      fields: {},
      ready: false
    };
  }

  const orderId = args.joinRequestId;
  const amount = toAmountString(args.settlementAmount);
  const hashedSecret = md5(merchantSecret);
  const hash = md5(`${merchantId}${orderId}${amount}${args.settlementCurrency}${hashedSecret}`);

  return {
    actionUrl: payhereActionUrl(),
    ready: true,
    fields: {
      merchant_id: merchantId,
      return_url: `${appUrl}/onboarding?email=${encodeURIComponent(args.email)}&name=${encodeURIComponent(args.fullName)}`,
      cancel_url: `${appUrl}/checkout?email=${encodeURIComponent(args.email)}&name=${encodeURIComponent(args.fullName)}&error=payment_cancelled`,
      notify_url: `${appUrl}/api/payhere/notify`,
      order_id: orderId,
      items: args.competitionName,
      currency: args.settlementCurrency,
      amount,
      first_name: firstName(args.fullName),
      last_name: lastName(args.fullName),
      email: args.email,
      phone: args.phone,
      address: args.address,
      city: args.city,
      country: args.country,
      custom_1: args.joinRequestId,
      custom_2: args.email,
      hash
    }
  };
}

export function verifyPayHereSignature(args: {
  merchantId: string;
  orderId: string;
  payhereAmount: string;
  payhereCurrency: string;
  statusCode: string;
  md5sig: string;
}) {
  if (!merchantSecret || !merchantId) {
    return false;
  }

  const localMerchantSecret = md5(merchantSecret);
  const localSig = md5(
    `${args.merchantId}${args.orderId}${args.payhereAmount}${args.payhereCurrency}${args.statusCode}${localMerchantSecret}`
  );

  return localSig === args.md5sig.toUpperCase();
}
