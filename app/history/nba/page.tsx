import Link from "next/link";
import { HuddleShell } from "@/components/huddle-shell";
import { getNbaArchiveSummary } from "@/lib/tranche-two-data";
import styles from "../shared.module.css";

export default function NbaHistoryPage() {
  const data = getNbaArchiveSummary();
  const seasonGroups = [
    {
      heading: "Mula seasons",
      seasons: data.seasonDirectory.filter((season) => season.division === "Mula")
    },
    {
      heading: "Delta seasons",
      seasons: data.seasonDirectory.filter((season) => season.division === "Delta")
    }
  ];

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/nba", label: "NBA archive" }}>
      <section className={`${styles.hero} ${styles.heroNba}`}>
        <div className={styles.heroSplit}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>NBA archive</p>
            <h1>{data.heroTitle}</h1>
            <p className={styles.heroBody}>{data.heroBody}</p>
          </div>
          <div className={styles.heroVisual}>
            <img src="/tranche2/nba-almanac.svg" alt="NBA archive almanac illustration" />
          </div>
        </div>
        <div className={styles.heroMeta}>
          {data.leagueFacts.map((fact) => (
            <div key={fact.label} className={styles.factCard}>
              <span className={styles.factLabel}>{fact.label}</span>
              <strong className={styles.factValue}>{fact.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Archive doors</p>
          <h2>Pick a lane.</h2>
        </div>
        <div className={styles.grid3}>
          <Link href="/history/nba/teams" className={styles.archiveDoorCard}>
            <p className={styles.eyebrow}>Directory</p>
            <h3>Franchises</h3>
            <span className={styles.cardArrow}>Open</span>
          </Link>
          <Link href="/history/nba/awards" className={styles.archiveDoorCard}>
            <p className={styles.eyebrow}>Awards</p>
            <h3>Awards rail</h3>
            <span className={styles.cardArrow}>Open</span>
          </Link>
          <Link href="/history/nba/rivalries" className={styles.archiveDoorCard}>
            <p className={styles.eyebrow}>Lookup</p>
            <h3>Rivalries</h3>
            <span className={styles.cardArrow}>Open</span>
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Season directory</p>
          <h2>Open a season when you need it.</h2>
        </div>
        <div className={styles.stack}>
          {seasonGroups.map((group) => (
            <details key={group.heading} className={styles.collapseCard}>
              <summary className={styles.collapseSummary}>
                <div>
                  <p className={styles.eyebrow}>{group.heading}</p>
                  <h3>{group.seasons.length} seasons tracked</h3>
                </div>
                <div className={styles.collapseMeta}>
                  <span className={styles.statusBadge}>
                    {group.seasons.some((season) => season.status === "Imported") ? "Live" : "Planned"}
                  </span>
                  <span className={styles.collapseArrow} aria-hidden="true">
                    +
                  </span>
                </div>
              </summary>
              <div className={styles.collapseBody}>
                <div className={styles.seasonStrip}>
                  {group.seasons.map((season) => (
                    <Link key={season.slug} href={`/history/nba/seasons/${season.slug}`} className={styles.seasonRowLink}>
                      <div className={styles.seasonLabel}>
                        <span>{season.label}</span>
                      </div>
                      <span className={styles.seasonMeta}>{season.division}</span>
                      <span className={styles.seasonMeta}>{season.status}</span>
                      <span className={styles.rowArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.sectionCompact}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Archive model</p>
          <h2>What belongs here.</h2>
        </div>
        <div className={styles.grid3}>
          {data.archiveModules.map((module) => (
            <article key={module.title} className={styles.card}>
              <h3>{module.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </HuddleShell>
  );
}
