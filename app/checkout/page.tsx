import { HuddleShell } from "@/components/huddle-shell";
import { getCheckoutPricing } from "@/lib/checkout-pricing";
import { getJoinFlowData } from "@/lib/join-data";
import { buildPayHereForm, isPayHereConfigured } from "@/lib/payhere";
import { getSupabaseAdminClient } from "@/lib/supabase";

import styles from "./page.module.css";

type CheckoutPageProps = {
  searchParams?: Promise<{
    email?: string;
    error?: string;
    name?: string;
  }>;
};

type JoinRequestRow = {
  full_name: string;
  home_city: string | null;
  id: string;
};

function getErrorMessage(error?: string) {
  switch (error) {
    case "payment_cancelled":
      return "Payment was cancelled before completion.";
    case "missing_join_request":
      return "No saved join request was found for this email. Start from the join page again.";
    case "payhere_not_configured":
      return "PayHere credentials are still missing from the environment.";
    default:
      return null;
  }
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const [joinFlowData, resolvedSearchParams, pricing] = await Promise.all([
    getJoinFlowData(),
    searchParams,
    getCheckoutPricing()
  ]);

  const email = resolvedSearchParams?.email?.trim().toLowerCase() ?? "";
  const joinName = resolvedSearchParams?.name?.trim() ?? "";
  const admin = getSupabaseAdminClient();
  const errorMessage = getErrorMessage(resolvedSearchParams?.error);

  const joinRequestResult =
    email && admin
      ? await (admin as unknown as { from: (table: string) => any })
          .from("join_requests")
          .select("id, full_name, home_city")
          .eq("email", email)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      : { data: null };

  const joinRequest = joinRequestResult.data as JoinRequestRow | null;
  const fullName = joinRequest?.full_name ?? joinName;
  const payhereReady = isPayHereConfigured() && Boolean(joinRequest?.id);
  const checkoutError =
    errorMessage ??
    (!joinRequest?.id && email ? "No saved join request was found for this email. Start from the join page again." : null) ??
    (!isPayHereConfigured() ? "PayHere credentials are still missing from the environment." : null);
  const payHereForm = payhereReady
    ? buildPayHereForm({
        address: joinRequest?.home_city ?? "Colombo",
        city: joinRequest?.home_city ?? "Colombo",
        competitionName: joinFlowData.competitionName,
        country: pricing.detectedCountry,
        email,
        fullName: fullName || "Huddle member",
        joinRequestId: joinRequest!.id,
        phone: "0770000000",
        settlementAmount: pricing.settlementAmount,
        settlementCurrency: pricing.settlementCurrency
      })
    : {
        actionUrl: "",
        fields: {},
        ready: false
      };

  return (
    <HuddleShell mode="public" primaryAction={{ href: "/", label: "Back to World Cup" }}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Checkout</p>
          <h1>Local price on screen. PayHere underneath.</h1>
          <p className={styles.heroBody}>
            Huddle stores the base price in LKR, detects where the visitor is coming from, and shows
            the entry in a familiar currency before handing payment off to PayHere.
          </p>
          {checkoutError ? <p className={styles.heroNote}>{checkoutError}</p> : null}

          {payHereForm.ready ? (
            <form action={payHereForm.actionUrl} method="post" className={styles.ctaRow}>
              {Object.entries(payHereForm.fields).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value} />
              ))}
              <button type="submit" className={`${styles.button} ${styles.primary}`}>
                Continue to PayHere
              </button>
              <a href="/join" className={`${styles.button} ${styles.secondary}`}>
                Back to join
              </a>
            </form>
          ) : (
            <div className={styles.ctaRow}>
              <a href="/join" className={`${styles.button} ${styles.secondary}`}>
                Back to join
              </a>
            </div>
          )}

          <p className={styles.heroNote}>
            {payHereForm.ready
              ? `Displayed in ${pricing.displayCurrency}. Final gateway charge is ${formatMoney(pricing.settlementAmount, pricing.settlementCurrency)} via PayHere.`
              : "This page still needs PayHere credentials and a saved join request before it can hand off to live checkout."}
          </p>
        </div>

        <aside className={styles.sidebar} id="summary">
          <div className={styles.card}>
            <p className={styles.cardLabel}>Pricing</p>
            <table className={styles.summaryTable}>
              <tbody>
                <tr>
                  <td>League</td>
                  <td>{joinFlowData.competitionShortName}</td>
                </tr>
                <tr>
                  <td>Detected country</td>
                  <td>{pricing.detectedCountry}</td>
                </tr>
                <tr>
                  <td>Shown on screen</td>
                  <td>{formatMoney(pricing.displayAmount, pricing.displayCurrency)}</td>
                </tr>
                <tr>
                  <td>Gateway currency</td>
                  <td>{formatMoney(pricing.settlementAmount, pricing.settlementCurrency)}</td>
                </tr>
                <tr>
                  <td>Base price</td>
                  <td>{formatMoney(pricing.baseLkrAmount, "LKR")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.lightCard}>
            <p className={styles.cardLabel}>Why this structure</p>
            <strong>One source price. Local display.</strong>
            <p className={styles.lightBody}>
              Huddle keeps pricing anchored in LKR, converts for clarity, and still settles through a Sri Lankan gateway.
            </p>
          </div>
        </aside>
      </section>

      <section className={styles.sectionBlock} id="what-happens">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>What happens</p>
          <h2>PayHere now owns the payment handoff.</h2>
          <p className={styles.sectionBody}>
            Huddle still owns the member state before and after the payment. PayHere only owns the gateway step.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.infoCard}>
            <span>01</span>
            <h3>Join request already exists</h3>
            <p>The intake is saved before payment starts, so the app already knows who is trying to enter.</p>
          </article>
          <article className={styles.infoCard}>
            <span>02</span>
            <h3>PayHere takes the charge</h3>
            <p>The gateway handles the actual payment with settlement still routed through a Sri Lankan processor.</p>
          </article>
          <article className={styles.infoCard}>
            <span>03</span>
            <h3>Notify URL closes the loop</h3>
            <p>The callback updates member, payment, competition membership, and onboarding state inside Huddle.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock} id="why">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Multi-currency</p>
          <h2>Clarity for the visitor, simplicity for the business.</h2>
          <p className={styles.sectionBody}>
            The visitor sees an amount in a currency they recognise. The business still keeps one base price and one gateway integration path.
          </p>
        </div>
      </section>
    </HuddleShell>
  );
}
