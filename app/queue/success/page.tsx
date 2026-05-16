import Link from "next/link";
import type { Route } from "next";
import { HuddleShell } from "@/components/huddle-shell";
import { getPublicLeagueSummary } from "@/lib/public-league-data";
import styles from "./page.module.css";

type QueueSuccessPageProps = {
  searchParams?: Promise<{
    email?: string;
    name?: string;
    league?: string;
  }>;
};

export default async function QueueSuccessPage({ searchParams }: QueueSuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const league = getPublicLeagueSummary(resolvedSearchParams?.league ?? "");
  const email = resolvedSearchParams?.email ?? "your inbox";
  const leagueRoute = (league?.route ?? "/") as Route;

  return (
    <HuddleShell mode="public" primaryAction={{ href: leagueRoute, label: "Back to league" }}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Queue request received</p>
          <h1>Your place in line is saved.</h1>
          <p className={styles.heroBody}>
            {league ? `You are now on the early queue for ${league.shortLabel}.` : "You are now on the early queue."} Huddle can use this to track demand and call you in when the next season opens.
          </p>
          <div className={styles.ctaRow}>
            <Link href={leagueRoute} className={`${styles.button} ${styles.primary}`}>
              Back to {league?.shortLabel ?? "league"}
            </Link>
            <Link href="/story" className={`${styles.button} ${styles.secondary}`}>
              Read what Huddle is
            </Link>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={`${styles.sidebarCard} ${styles.dark}`}>
            <p className={styles.sidebarLabel}>League</p>
            <p className={styles.sidebarValue}>{league?.shortLabel ?? "Waitlist"}</p>
          </div>
          <div className={`${styles.sidebarCard} ${styles.light}`}>
            <p className={styles.sidebarLabel}>Recorded contact</p>
            <p className={styles.sidebarValue}>{email}</p>
            <p className={styles.sidebarBody}>That is the thread Huddle can use when the next season is ready.</p>
          </div>
        </aside>
      </section>
    </HuddleShell>
  );
}
