import Link from "next/link";
import { ArchiveSlideDeck } from "@/components/archive-slide-deck";
import { HuddleShell } from "@/components/huddle-shell";
import { getNbaArchiveSummary, getNbaSeasonSummary } from "@/lib/tranche-two-data";
import styles from "../../../shared.module.css";

export default async function NbaSeasonArchivePage({
  params
}: {
  params: Promise<{ season: string }>;
}) {
  const { season } = await params;
  const data = getNbaSeasonSummary(season);
  const archive = getNbaArchiveSummary();

  if (!data) {
    const seasonLabel = season.replace(/-/g, " ");

    return (
      <HuddleShell mode="member" primaryAction={{ href: "/history/nba", label: "NBA archive" }}>
        <section className={`${styles.hero} ${styles.heroNba}`}>
          <p className={styles.eyebrow}>Season archive</p>
          <h1>{seasonLabel}</h1>
          <p className={styles.heroBody}>
            This season slot exists. The structure is ready. The actual imported history still needs to land.
          </p>
        </section>
      </HuddleShell>
    );
  }

  const standingsByPointsFor = [...data.standings].sort(
    (left, right) => Number.parseInt(right.pointsFor.replace(/,/g, ""), 10) - Number.parseInt(left.pointsFor.replace(/,/g, ""), 10)
  );
  const standingsByPointsAgainst = [...data.standings].sort(
    (left, right) => Number.parseInt(left.pointsAgainst.replace(/,/g, ""), 10) - Number.parseInt(right.pointsAgainst.replace(/,/g, ""), 10)
  );
  const titleAwards = data.awards.filter((award) => award.type === "title");
  const cultureAwards = data.awards.filter((award) => award.type !== "title");
  const seasonSlides = [
    {
      label: "Titles",
      title: "The year’s hard outcomes.",
      body: "Champion, finals MVP, and season MVP should be fast to scan.",
      points: titleAwards.map((award) => `${award.title} — ${award.winner} • ${award.detail}`)
    },
    {
      label: "Culture",
      title: "The room’s side judgments.",
      body: "These are the things people remembered beyond standings and playoff results.",
      points: cultureAwards.map((award) => `${award.title} — ${award.winner}`)
    },
    {
      label: "Source",
      title: "Recovered from screenshots, not guessed.",
      body: data.sourceNote.confidence,
      points: [
        `Imported from — ${data.sourceNote.importedFrom}`,
        ...data.sourceNote.included.slice(0, 4).map((item) => `Included — ${item}`),
        ...data.sourceNote.missing.slice(0, 2).map((item) => `Next — ${item}`)
      ]
    },
    {
      label: "Rivalries",
      title: "The first scars.",
      body: "The season should show where the first durable tensions came from.",
      points: archive.rivalryDirectory.map((rivalry) => `${rivalry.title} — ${rivalry.body}`)
    }
  ];

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/nba", label: "NBA archive" }}>
      <section className={`${styles.hero} ${styles.heroNba}`}>
        <div className={styles.heroSplit}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              {data.division} archive
            </p>
            <h1>{data.label}</h1>
            <p className={styles.heroBody}>{data.heroBody}</p>
          </div>
          <div className={styles.heroVisual}>
            <img src="/tranche2/nba-almanac.svg" alt="Season archive almanac illustration" />
          </div>
        </div>
        <div className={styles.heroMeta}>
          {data.heroFacts.map((fact) => (
            <div key={fact.label} className={styles.factCard}>
              <span className={styles.factLabel}>{fact.label}</span>
              <strong className={styles.factValue}>{fact.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Standings</p>
          <h2>The first table is now anchored.</h2>
          <p className={styles.sectionBody}>
            Season 1 is the first proof that this archive can hold more than vibes. The regular-season table, points totals, and streaks all belong here.
          </p>
        </div>
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Franchise</th>
                <th>Record</th>
                <th>Win %</th>
                <th>PF</th>
                <th>PA</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {data.standings.map((row) => (
                <tr key={row.franchiseSlug}>
                  <td>{row.rank}</td>
                  <td>
                    <Link href={`/history/nba/teams/${row.franchiseSlug}`}>{row.franchiseName}</Link>
                  </td>
                  <td>{row.record}</td>
                  <td>{row.winPct}</td>
                  <td>{row.pointsFor}</td>
                  <td>{row.pointsAgainst}</td>
                  <td>{row.longestWinStreak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Scoring shape</p>
          <h2>Consistency and pressure should read separately.</h2>
          <p className={styles.sectionBody}>
            The Instagram set split these into two tables for a reason. One tells you who could score. The other tells you who lived easiest or hardest against the room.
          </p>
        </div>
        <div className={styles.grid2}>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Total points for</p>
            <h3>Most output through 14 weeks</h3>
            <div className={styles.routeList}>
              {standingsByPointsFor.map((row, index) => (
                <span key={`${row.franchiseSlug}-pf`}>
                  <strong>{index + 1}. {row.franchiseName}</strong> — {row.pointsFor}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Total points against</p>
            <h3>Who had the cleanest defensive run</h3>
            <div className={styles.routeList}>
              {standingsByPointsAgainst.map((row, index) => (
                <span key={`${row.franchiseSlug}-pa`}>
                  <strong>{index + 1}. {row.franchiseName}</strong> — {row.pointsAgainst}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Bracket</p>
          <h2>The first playoff trail should stay legible.</h2>
        </div>
        <div className={styles.directory}>
          {data.playoffRounds.map((series) => (
            <article key={`${series.round}-${series.matchup}`} className={styles.directoryRow}>
              <div className={styles.directoryTitle}>
                <p className={styles.eyebrow}>{series.round}</p>
                <h3>{series.matchup}</h3>
                <p>{series.note}</p>
              </div>
              <div className={styles.directoryMeta}>
                <h3>Result</h3>
                <p>{series.result}</p>
              </div>
              <div className={styles.directoryMeta}>
                <h3>Winner</h3>
                <p>{series.winner}</p>
              </div>
              <span className={styles.directoryAction}>Recorded</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionCompact}>
        <ArchiveSlideDeck
          eyebrow="Season slides"
          heading="Move through the year one layer at a time."
          slides={seasonSlides}
        />
      </section>
    </HuddleShell>
  );
}
