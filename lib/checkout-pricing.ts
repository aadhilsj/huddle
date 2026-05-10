import { headers } from "next/headers";

const supportedDisplayCurrencies = new Set(["LKR", "USD", "GBP", "EUR", "NOK", "AUD", "CAD"]);
const euroCountries = new Set([
  "AT",
  "BE",
  "CY",
  "DE",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PT",
  "SI",
  "SK"
]);

type IpApiResponse = {
  country_code?: string;
};

export type CheckoutPricing = {
  baseLkrAmount: number;
  detectedCountry: string;
  displayAmount: number;
  displayCurrency: string;
  exchangeRate: number;
  settlementAmount: number;
  settlementCurrency: "LKR" | "USD";
};

function inferCurrencyFromCountry(country: string) {
  switch (country) {
    case "LK":
      return "LKR";
    case "US":
      return "USD";
    case "GB":
      return "GBP";
    case "NO":
      return "NOK";
    case "AU":
      return "AUD";
    case "CA":
      return "CAD";
    default:
      return euroCountries.has(country) ? "EUR" : "USD";
  }
}

function getSettlementCurrency(country: string): "LKR" | "USD" {
  return country === "LK" ? "LKR" : "USD";
}

async function detectCountryFromRequest() {
  const headerStore = await headers();
  const headerCountry =
    headerStore.get("x-vercel-ip-country") ??
    headerStore.get("cf-ipcountry") ??
    headerStore.get("x-country-code");

  if (headerCountry && headerCountry.length === 2) {
    return headerCountry.toUpperCase();
  }

  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!forwardedFor) {
    return "LK";
  }

  try {
    const response = await fetch(`https://ipapi.co/${forwardedFor}/json/`, {
      cache: "no-store",
      headers: {
        "User-Agent": "Huddle Checkout"
      }
    });

    if (!response.ok) {
      return "LK";
    }

    const payload = (await response.json()) as IpApiResponse;
    return payload.country_code?.toUpperCase() ?? "LK";
  } catch {
    return "LK";
  }
}

async function getRate(base: string, quote: string) {
  if (base === quote) {
    return 1;
  }

  const response = await fetch(
    `https://api.frankfurter.dev/v2/rate/${base}/${quote}`,
    {
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error(`Rate lookup failed for ${base}/${quote}`);
  }

  const data = (await response.json()) as { rate?: number };
  return data.rate ?? 1;
}

export async function getCheckoutPricing() : Promise<CheckoutPricing> {
  const baseLkrAmount = Number(process.env.BASE_ENTRY_FEE_LKR ?? "7500");
  const detectedCountry = await detectCountryFromRequest();
  const displayCurrency = inferCurrencyFromCountry(detectedCountry);
  const settlementCurrency = getSettlementCurrency(detectedCountry);

  const [displayRate, settlementRate] = await Promise.all([
    supportedDisplayCurrencies.has(displayCurrency) ? getRate("LKR", displayCurrency).catch(() => 1) : Promise.resolve(1),
    getRate("LKR", settlementCurrency).catch(() => 1)
  ]);

  return {
    baseLkrAmount,
    detectedCountry,
    displayAmount: Number((baseLkrAmount * displayRate).toFixed(2)),
    displayCurrency,
    exchangeRate: displayRate,
    settlementAmount: Number((baseLkrAmount * settlementRate).toFixed(2)),
    settlementCurrency
  };
}
