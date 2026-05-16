import Link from "next/link";
import { HuddleShell } from "@/components/huddle-shell";
import { getNbaArchiveSummary } from "@/lib/tranche-two-data";
import styles from "../../shared.module.css";

export default function NbaFranchiseDirectoryPage() {
  const data = getNbaArchiveSummary();

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/nba", label: "NBA archive" }}>
      <section className={`${styles.hero} ${styles.heroNba}`}>
        <div className={styles.heroSplit}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Franchise directory</p>
            <h1>Every badge should lead somewhere real.</h1>
            <p className={styles.heroBody}>
              Season 1 gives the directory its first true layer: six franchise pages with standings truth, playoff-entry rosters, and the first scars already attached.
            </p>
          </div>
          <div className={styles.heroVisual}>
            <img src="/tranche2/nba-almanac.svg" alt="Franchise archive illustration" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Directory</p>
          <h2>Franchise bones</h2>
        </div>
        <div className={styles.directory}>
          {data.franchiseDirectory.map((franchise) => (
            <article key={franchise.slug} className={styles.directoryRow}>
              <div className={styles.directoryTitle}>
                <div className={styles.linkRow}>
                  <span className={`${styles.statusBadge} ${franchise.status === "defunct" ? styles.statusDefunct : styles.statusActive}`}>
                    {franchise.status === "defunct" ? "Defunct" : "Active"}
                  </span>
                </div>
                <h3>{franchise.name}</h3>
                <p>{franchise.note}</p>
              </div>
              <div className={styles.directoryMeta}>
                <h3>Era</h3>
                <p>{franchise.era}</p>
              </div>
              <div className={styles.directoryMeta}>
                <h3>Season 1</h3>
                <p>{franchise.seasonRecord ?? franchise.steward}</p>
              </div>
              <div className={styles.directoryMeta}>
                <h3>Finish</h3>
                <p>{franchise.seasonFinish ?? franchise.era}</p>
              </div>
              <div className={styles.directoryMeta}>
                <h3>Marker</h3>
                <p>{franchise.seasonMarker ?? "Imported"}</p>
              </div>
              <Link className={styles.directoryAction} href={`/history/nba/teams/${franchise.slug}`}>Open profile</Link>
            </article>
          ))}
        </div>
      </section>
    </HuddleShell>
  );
}
