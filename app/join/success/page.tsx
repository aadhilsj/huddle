import Link from "next/link";

import { HuddleShell } from "@/components/huddle-shell";
import { getJoinFlowData } from "@/lib/join-data";

import styles from "./page.module.css";

type SuccessPageProps = {
  searchParams?: Promise<{
    email?: string;
    name?: string;
  }>;
};

export default async function JoinSuccessPage({ searchParams }: SuccessPageProps) {
  const [joinFlowData, resolvedSearchParams] = await Promise.all([
    getJoinFlowData(),
    searchParams
  ]);
  const email = resolvedSearchParams?.email ?? "your inbox";

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/member", label: "Open foyer" }}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Request received</p>
          <h1>Your place is saved.</h1>
          <p className={styles.heroBody}>
            You are now in the system for the {joinFlowData.competitionName}. From here, Huddle should move you forward without losing the thread.
          </p>
          <div className={styles.ctaRow}>
            <Link
              href={`/checkout?email=${encodeURIComponent(email)}&name=${encodeURIComponent(resolvedSearchParams?.name ?? "")}`}
              className={`${styles.button} ${styles.primary}`}
            >
              Continue to checkout
            </Link>
            <Link href="/story" className={`${styles.button} ${styles.secondary}`}>
              Read what Huddle is
            </Link>
          </div>
          <p className={styles.heroNote}>
            The route is real now. Payment and onboarding can attach to this instead of being stitched on later.
          </p>
        </div>

        <aside className={styles.sidebar}>
          <div className={`${styles.sidebarCard} ${styles.dark}`}>
            <p className={styles.sidebarLabel}>Competition</p>
            <p className={styles.sidebarValue}>{joinFlowData.competitionShortName}</p>
            <p className={styles.sidebarBody}>{joinFlowData.entryCountLabel}.</p>
          </div>
          <div className={`${styles.sidebarCard} ${styles.light}`}>
            <p className={styles.sidebarLabel}>Recorded contact</p>
            <p className={styles.sidebarValue}>{email}</p>
            <p className={styles.sidebarBody}>That is the thread Huddle can use for the next handoff.</p>
          </div>
        </aside>
      </section>

      <section className={styles.sectionBlock} id="next">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>What happens next</p>
          <h2>The next layers can build on this.</h2>
          <p className={styles.sectionBody}>
            This request now lands with competition context attached, which means the rest of the journey can be carried properly.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.panel}>
            <span>01</span>
            <strong>Join request saved</strong>
            <p>Your entry now exists as a real record the product can move on.</p>
          </article>
          <article className={styles.panel}>
            <span>02</span>
            <strong>Payment can slot in next</strong>
            <p>The next layer is attaching checkout and confirmation to the same journey, not inventing a new one.</p>
          </article>
          <article className={styles.panel}>
            <span>03</span>
            <strong>Onboarding can follow cleanly</strong>
            <p>Discord linking and member identity now have a real intake event to attach to.</p>
          </article>
        </div>
      </section>
    </HuddleShell>
  );
}
