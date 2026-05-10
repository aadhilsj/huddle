"use client";

import { useMemo, useState } from "react";
import styles from "@/app/history/shared.module.css";
import type {
  NbaFranchiseComparisonSummary,
  NbaRivalryExplorerOption,
  NbaRivalryMatchupSummary
} from "@/lib/tranche-two-data";

export function NbaRivalryExplorer({
  options,
  matchups,
  comparisons
}: {
  options: NbaRivalryExplorerOption[];
  matchups: NbaRivalryMatchupSummary[];
  comparisons: NbaFranchiseComparisonSummary[];
}) {
  const [franchiseA, setFranchiseA] = useState(options[0]?.slug ?? "");
  const [franchiseB, setFranchiseB] = useState(options[1]?.slug ?? "");

  const matchup = useMemo(
    () =>
      matchups.find(
        (entry) =>
          (entry.franchiseA.slug === franchiseA && entry.franchiseB.slug === franchiseB) ||
          (entry.franchiseA.slug === franchiseB && entry.franchiseB.slug === franchiseA)
      ) ?? null,
    [franchiseA, franchiseB, matchups]
  );

  const comparisonA = useMemo(
    () => comparisons.find((entry) => entry.slug === franchiseA) ?? null,
    [comparisons, franchiseA]
  );

  const comparisonB = useMemo(
    () => comparisons.find((entry) => entry.slug === franchiseB) ?? null,
    [comparisons, franchiseB]
  );

  const matchupSnapshot = useMemo(() => {
    if (!matchup || !comparisonA || !comparisonB) {
      return null;
    }

    const comparisonAIsLeft = matchup.franchiseA.slug === comparisonA.slug;
    const regularSeason = matchup.record.match(/(\d+)-(\d+)\s+regular season/i);
    const playoffs = matchup.record.match(/(\d+)-(\d+)\s+playoffs/i);
    const bareRecord = matchup.record.match(/^(\d+)-(\d+)$/);

    const regularSeasonLeftWins = regularSeason
      ? Number(comparisonAIsLeft ? regularSeason[1] : regularSeason[2])
      : bareRecord
        ? Number(comparisonAIsLeft ? bareRecord[1] : bareRecord[2])
        : 0;
    const regularSeasonRightWins = regularSeason
      ? Number(comparisonAIsLeft ? regularSeason[2] : regularSeason[1])
      : bareRecord
        ? Number(comparisonAIsLeft ? bareRecord[2] : bareRecord[1])
        : 0;

    const matchupAIsWinner =
      matchup.record.includes("won finals") || matchup.record.includes("won playoffs");
    const matchupAIsLoser =
      matchup.record.includes("lost finals") || matchup.record.includes("lost playoffs");

    const playoffLeftWins = playoffs
      ? Number(comparisonAIsLeft ? playoffs[1] : playoffs[2])
      : matchupAIsWinner
        ? comparisonAIsLeft
          ? 1
          : 0
        : matchupAIsLoser
          ? comparisonAIsLeft
            ? 0
            : 1
          : 0;
    const playoffRightWins = playoffs
      ? Number(comparisonAIsLeft ? playoffs[2] : playoffs[1])
      : matchupAIsWinner
        ? comparisonAIsLeft
          ? 0
          : 1
        : matchupAIsLoser
          ? comparisonAIsLeft
            ? 1
            : 0
          : 0;

    const totalLeftWins = regularSeasonLeftWins + playoffLeftWins;
    const totalRightWins = regularSeasonRightWins + playoffRightWins;

    return {
      leftWins: totalLeftWins,
      rightWins: totalRightWins,
      regularSeasonLeftWins,
      regularSeasonRightWins,
      playoffLeftWins,
      playoffRightWins
    };
  }, [comparisonA, comparisonB, matchup]);

  const comparisonMetrics = [
    {
      key: "win-pct",
      label: "Win % overall",
      getValue: (entry: NbaFranchiseComparisonSummary) => entry.winPct
    },
    {
      key: "top-four",
      label: "Top-four",
      getValue: (entry: NbaFranchiseComparisonSummary) => String(entry.topFourFinishes)
    },
    {
      key: "finals",
      label: "Finals",
      getValue: (entry: NbaFranchiseComparisonSummary) => String(entry.finalsAppearances)
    },
    {
      key: "championships",
      label: "Championships",
      getValue: (entry: NbaFranchiseComparisonSummary) => String(entry.championships)
    },
    {
      key: "draft-awards",
      label: "Best draft",
      getValue: (entry: NbaFranchiseComparisonSummary) => (entry.draftAwards == null ? "—" : String(entry.draftAwards))
    },
    {
      key: "gm-awards",
      label: "Best GM",
      getValue: (entry: NbaFranchiseComparisonSummary) => (entry.gmAwards == null ? "—" : String(entry.gmAwards))
    }
  ];

  return (
    <div className={styles.rivalryExplorer}>
      <div className={styles.rivalryControls}>
        <label className={styles.rivalryField}>
          <span>Team one</span>
          <select value={franchiseA} onChange={(event) => setFranchiseA(event.target.value)}>
            {options.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.rivalryField}>
          <span>Team two</span>
          <select value={franchiseB} onChange={(event) => setFranchiseB(event.target.value)}>
            {options.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {franchiseA === franchiseB ? (
        <article className={styles.rivalryBoard}>
          <div className={styles.rivalryPrompt}>
            <span className={styles.rivalryPromptMark}>VS</span>
            <p>Pick two different franchises.</p>
          </div>
        </article>
      ) : matchupSnapshot && comparisonA && comparisonB ? (
        <article className={styles.rivalryBoard}>
          <div className={styles.rivalryHeader}>
            <div className={`${styles.rivalryTeamHeader} ${styles.rivalryTeamHeaderLeft}`}>
              <h3>{comparisonA.name}</h3>
            </div>
            <div className={styles.rivalryCenterBadge}>
              <span>Head to head</span>
            </div>
            <div className={`${styles.rivalryTeamHeader} ${styles.rivalryTeamHeaderRight}`}>
              <h3>{comparisonB.name}</h3>
            </div>
          </div>

          <div className={styles.rivalryScoreboard}>
            <strong className={styles.rivalryScoreMain}>
              {matchupSnapshot.leftWins}-{matchupSnapshot.rightWins}
            </strong>
          </div>

          <div className={styles.rivalrySplitBoard}>
            <div className={styles.rivalrySplitRow}>
              <div className={`${styles.rivalryMetricValue} ${styles.rivalryMetricValueLeft} ${styles.rivalrySplitValue}`}>
                {matchupSnapshot.regularSeasonLeftWins}
              </div>
              <div className={styles.rivalryMetricLabel}>H2H regular season</div>
              <div className={`${styles.rivalryMetricValue} ${styles.rivalryMetricValueRight} ${styles.rivalrySplitValue}`}>
                {matchupSnapshot.regularSeasonRightWins}
              </div>
            </div>
            <div className={styles.rivalrySplitRow}>
              <div className={`${styles.rivalryMetricValue} ${styles.rivalryMetricValueLeft} ${styles.rivalrySplitValue}`}>
                {matchupSnapshot.playoffLeftWins}
              </div>
              <div className={styles.rivalryMetricLabel}>H2H playoffs</div>
              <div className={`${styles.rivalryMetricValue} ${styles.rivalryMetricValueRight} ${styles.rivalrySplitValue}`}>
                {matchupSnapshot.playoffRightWins}
              </div>
            </div>
          </div>

          <div className={styles.rivalryMetricBoard}>
            {comparisonMetrics.map((metric) => (
              <div key={metric.key} className={styles.rivalryMetricRow}>
                <div className={`${styles.rivalryMetricValue} ${styles.rivalryMetricValueLeft}`}>
                  {metric.getValue(comparisonA)}
                </div>
                <div className={styles.rivalryMetricLabel}>{metric.label}</div>
                <div className={`${styles.rivalryMetricValue} ${styles.rivalryMetricValueRight}`}>
                  {metric.getValue(comparisonB)}
                </div>
              </div>
            ))}
          </div>

          <p className={styles.rivalryFootnote}>GM award counts stay blank until franchise ownership is mapped cleanly.</p>
        </article>
      ) : (
        <article className={styles.rivalryBoard}>
          <div className={styles.rivalryPrompt}>
            <span className={styles.rivalryPromptMark}>...</span>
            <p>This pairing is not structured yet.</p>
          </div>
        </article>
      )}
    </div>
  );
}
