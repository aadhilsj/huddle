import { HuddleShell } from "@/components/huddle-shell";
import { getPublicLeagueSummary } from "@/lib/public-league-data";
import { submitLeagueQueueRequest } from "../actions";
import styles from "./page.module.css";

type QueuePageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ error?: string }>;
};

function getErrorMessage(error: string | undefined) {
  switch (error) {
    case "missing_fields":
      return "Name and email are required.";
    case "insert_failed":
      return "The queue request did not save cleanly. Try once more.";
    case "supabase_unavailable":
      return "The database connection is not ready yet.";
    case "unexpected":
      return "Something broke on submit. Try once more.";
    default:
      return null;
  }
}

export default async function LeagueQueuePage({ params, searchParams }: QueuePageProps) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const league = getPublicLeagueSummary(slug);

  if (!league || slug === "world-cup") {
    return (
      <HuddleShell mode="public" primaryAction={{ href: "/", label: "Back home" }}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Queue</p>
            <h1>That queue is not open here.</h1>
            <p className={styles.heroBody}>
              NBA, F1, and WNBA use queue capture. FIFA World Cup goes through the live join route instead.
            </p>
          </div>
        </section>
      </HuddleShell>
    );
  }

  const errorMessage = getErrorMessage(resolvedSearchParams?.error);

  return (
    <HuddleShell mode="public" primaryAction={{ href: league.route, label: "Back to league" }}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Next season queue</p>
          <h1>{league.shortLabel}</h1>
          <p className={styles.heroBody}>
            This is not the live intake. It is the early line for the next season, so Huddle can see demand before the league opens.
          </p>
          <div className={styles.metaStrip}>
            <div>
              League
              <strong>{league.shortLabel}</strong>
            </div>
            <div>
              Status
              <strong>{league.status}</strong>
            </div>
            <div>
              Entry
              <strong>{league.entryFee}</strong>
            </div>
          </div>
        </div>

        <aside className={styles.formPanel}>
          <div className={styles.formCard}>
            <p className={styles.cardLabel}>Reserve your spot</p>
            {errorMessage ? <p className={styles.banner}>{errorMessage}</p> : null}
            <form action={submitLeagueQueueRequest} className={styles.joinForm}>
              <input type="hidden" name="leagueSlug" value={league.slug} />
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="fullName">Full name</label>
                  <input id="fullName" name="fullName" type="text" placeholder="Aadhil Shahjahan" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="homeCity">Home city</label>
                  <input id="homeCity" name="homeCity" type="text" placeholder="Colombo" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="sourceDetail">What makes you want in?</label>
                  <input id="sourceDetail" name="sourceDetail" type="text" placeholder="Been following since Season 1, want next slot" />
                </div>
              </div>
              <p className={styles.fieldHelp}>
                This puts you on the early queue for next season. Huddle can use it to gauge demand and call the right people in first.
              </p>
              <button type="submit" className={styles.submitButton}>
                {league.slug === "f1" ? "Join the queue" : "Reserve your spot"}
              </button>
            </form>
          </div>
        </aside>
      </section>
    </HuddleShell>
  );
}
