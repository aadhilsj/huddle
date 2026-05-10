import Link from "next/link";
import { HuddleShell } from "@/components/huddle-shell";
import { getMemberProfileSummary } from "@/lib/tranche-two-data";
import styles from "../../shared.module.css";

export default async function MemberArchiveProfilePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getMemberProfileSummary(slug);

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/members", label: "Members" }}>
      <section className={`${styles.hero} ${styles.heroProfile}`}>
        <p className={styles.eyebrow}>Member profile</p>
        <h1>{data.name}</h1>
        <p className={styles.heroBody}>{data.body}</p>
        <div className={styles.heroMeta}>
          {data.facts.map((fact) => (
            <div key={fact.label} className={styles.factCard}>
              <span className={styles.factLabel}>{fact.label}</span>
              <strong className={styles.factValue}>{fact.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Franchises</p>
          <h2>One person, many worlds.</h2>
          <p className={styles.sectionBody}>
            The shape is cross-sport on purpose, but the archive stays explicit about what is proven now and what is still waiting on ownership mapping.
          </p>
        </div>
        <div className={styles.grid2}>
          {data.franchises.map((franchise) => (
            <article key={`${franchise.sport}-${franchise.slot}`} className={styles.card}>
              <p className={styles.eyebrow}>{franchise.sport}</p>
              <h3>{franchise.slot}</h3>
              <p>{franchise.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Known receipts</p>
          <h2>What the archive can already say cleanly.</h2>
        </div>
        <div className={styles.grid3}>
          {data.awardsRail.map((award) => (
            <article key={award.label} className={styles.card}>
              <p className={styles.eyebrow}>{award.label}</p>
              <h3>{award.value}</h3>
              <p>{award.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionCompact}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Archive map</p>
          <h2>Profiles should connect back into the world.</h2>
        </div>
        <div className={styles.routeList}>
          <Link href="/history">Back to archive hub</Link>
          <Link href="/history/nba">Open NBA archive</Link>
          <Link href="/history/nba/awards">Open awards rail</Link>
          <Link href="/history/nba/rivalries">Open rivalries</Link>
          <Link href="/profile">Open current-user profile</Link>
        </div>
      </section>
    </HuddleShell>
  );
}
