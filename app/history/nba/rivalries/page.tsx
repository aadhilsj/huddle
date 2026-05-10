import { HuddleShell } from "@/components/huddle-shell";
import { NbaRivalryExplorer } from "@/components/nba-rivalry-explorer";
import {
  getNbaFranchiseComparisonSummaries,
  getNbaRivalryExplorerOptions,
  getNbaRivalryMatchups
} from "@/lib/tranche-two-data";
import styles from "../../shared.module.css";

export default function NbaRivalriesPage() {
  const options = getNbaRivalryExplorerOptions();
  const matchups = getNbaRivalryMatchups();
  const comparisons = getNbaFranchiseComparisonSummaries();

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/nba", label: "NBA archive" }}>
      <section className={styles.section}>
        <div className={styles.lookupHeader}>
          <p className={styles.eyebrow}>Rivalries</p>
          <div className={styles.lookupTitleRow}>
            <h1>Pick two franchises.</h1>
            <span className={styles.lookupHint}>Lookup</span>
          </div>
        </div>
        <NbaRivalryExplorer options={options} matchups={matchups} comparisons={comparisons} />
      </section>
    </HuddleShell>
  );
}
