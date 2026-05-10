import Link from "next/link";
import { HuddleShell } from "@/components/huddle-shell";
import { getCurrentProfileSummary } from "@/lib/tranche-two-data";
import styles from "../history/shared.module.css";

export default function ProfilePage() {
  const data = getCurrentProfileSummary();

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history", label: "Archive" }}>
      <section className={`${styles.hero} ${styles.heroProfile}`}>
        <div className={styles.profileHero}>
          <div className={styles.heroVisual}>
            <img src="/tranche2/profile-dossier.svg" alt="Profile dossier illustration" />
          </div>
          <div>
            <p className={styles.eyebrow}>Profile</p>
            <h1>{data.displayName}</h1>
            <p className={styles.heroBody}>{data.intro}</p>
          </div>
        </div>
        <div className={styles.heroMeta}>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>City</span>
            <strong className={styles.factValue}>{data.city}</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Status</span>
            <strong className={styles.factValue}>{data.status}</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Sports</span>
            <strong className={styles.factValue}>Multi-franchise ready</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Archive</span>
            <strong className={styles.factValue}>Identity layer live</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Current franchises</p>
          <h2>One profile should hold more than one sport.</h2>
          <p className={styles.sectionBody}>
            NBA and F1 should both be visible here when they exist. The profile should understand one person as one club identity, not one row per sport.
          </p>
        </div>
        <div className={styles.franchiseRail}>
          {data.currentFranchises.map((franchise) => (
            <article key={franchise.sport} className={styles.franchisePill}>
              <p className={styles.eyebrow}>{franchise.sport}</p>
              <h3>{franchise.franchise}</h3>
              <p>{franchise.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Identity ledger</p>
          <h2>The deep stats belong to a person too.</h2>
        </div>
        <div className={styles.identityLedger}>
          {data.identityLedger.map((item) => (
            <article key={item.label} className={styles.ledgerCard}>
              <p className={styles.eyebrow}>{item.label}</p>
              <h3>{item.value}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionCompact}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Route map</p>
          <h2>The profile should connect back into the wider archive.</h2>
        </div>
        <div className={styles.miniGrid}>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Members</p>
            <h3>Profile directory</h3>
            <div className={styles.routeList}>
              <Link href="/history/members">Open member directory</Link>
              <Link href="/history/members/aadhil-shah-jahan">View sample archive profile</Link>
            </div>
          </article>
          <article className={styles.card}>
            <p className={styles.eyebrow}>NBA</p>
            <h3>Primary world</h3>
            <div className={styles.routeList}>
              <Link href="/history/nba">Open NBA archive</Link>
              <Link href="/history/nba/teams">View franchise directory</Link>
            </div>
          </article>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Cross-sport</p>
            <h3>Second worlds</h3>
            <div className={styles.routeList}>
              <Link href="/history/f1">Open F1 archive</Link>
              <Link href="/history/world-cup">Open World Cup archive</Link>
            </div>
          </article>
        </div>
      </section>
    </HuddleShell>
  );
}
