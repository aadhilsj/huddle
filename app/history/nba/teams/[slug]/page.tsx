import Link from "next/link";
import { HuddleShell } from "@/components/huddle-shell";
import { getFranchiseProfileSummary } from "@/lib/tranche-two-data";
import styles from "../../../shared.module.css";

export default async function FranchiseArchivePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getFranchiseProfileSummary(slug);

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/nba", label: "NBA archive" }}>
      <section className={`${styles.hero} ${styles.heroNba}`}>
        <div className={styles.heroSplit}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Franchise profile</p>
            <h1>{data.name}</h1>
            <p className={styles.heroBody}>{data.body}</p>
            <div className={styles.linkRow}>
              <span className={`${styles.statusBadge} ${data.status === "defunct" ? styles.statusDefunct : styles.statusActive}`}>
                {data.status === "defunct" ? "Defunct" : "Active"}
              </span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <img src="/tranche2/profile-dossier.svg" alt="Franchise dossier illustration" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Archive facts</p>
          <h2>The season facts should sit up front.</h2>
        </div>
        <div className={styles.grid2}>
          {data.facts.map((fact, index) => (
            <article key={`${fact.label}-${fact.value}-${index}`} className={styles.card}>
              <p className={styles.eyebrow}>{fact.label}</p>
              <h3>{fact.value}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionCompact}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Roster snapshot</p>
          <h2>The playoff roster belongs in the permanent record.</h2>
        </div>
        <div className={styles.miniGrid}>
          {data.rosterSections.map((section, index) => (
            <article key={`${section.label}-${index}`} className={styles.card}>
              <p className={styles.eyebrow}>{section.label}</p>
              <h3>{section.label}</h3>
              <div className={styles.routeList}>
                {section.players.map((player, playerIndex) => (
                  <span key={`${player}-${playerIndex}`}>{player}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Top five</p>
          <h2>The playoff entry form should be visible.</h2>
        </div>
        <div className={styles.grid2}>
          {data.topFive.map((entry, index) => (
            <article key={`${entry.player}-${entry.average}-${index}`} className={styles.card}>
              <p className={styles.eyebrow}>Heading into playoffs</p>
              <h3>{entry.player}</h3>
              <p>{entry.average} avg</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionCompact}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Awards and head-to-head</p>
          <h2>Results and wounds both belong here.</h2>
        </div>
        <div className={styles.grid2}>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Awards rail</p>
            <h3>What stuck to this franchise</h3>
            <div className={styles.routeList}>
              {data.awardsRail.map((award, index) => (
                <span key={`${award.label}-${award.value}-${index}`}>
                  <strong>{award.label}:</strong> {award.value} — {award.detail}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Head-to-head</p>
            <h3>First archive edges</h3>
            <div className={styles.routeList}>
              {data.headToHead.map((entry, index) => (
                <span key={`${entry.opponent}-${entry.record}-${index}`}>
                  <strong>{entry.opponent}:</strong> {entry.record} — {entry.detail}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.sectionCompact}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Cross-links</p>
          <h2>Stay inside the archive.</h2>
        </div>
        <div className={styles.miniGrid}>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Directory</p>
            <h3>All franchises</h3>
            <div className={styles.routeList}>
              <Link href="/history/nba/teams">Back to franchise directory</Link>
              <Link href="/history/nba">Back to NBA archive</Link>
            </div>
          </article>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Season page</p>
            <h3>Season 1</h3>
            <div className={styles.routeList}>
              <Link href="/history/nba/seasons/season-1-mula">Open season record</Link>
            </div>
          </article>
        </div>
      </section>
    </HuddleShell>
  );
}
