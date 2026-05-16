import { HuddleShell } from "@/components/huddle-shell";
import styles from "../shared.module.css";

export default function WorldCupHistoryPage() {
  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/world-cup", label: "World Cup archive" }}>
      <section className={`${styles.hero} ${styles.heroArchive}`}>
        <p className={styles.eyebrow}>World Cup archive</p>
        <h1>The campaign should become memory, not disappear.</h1>
        <p className={styles.heroBody}>
          The World Cup starts as the wedge, but it should not vanish afterward. It should become another chapter in the club once the tournament turns into history.
        </p>
        <div className={styles.heroMeta}>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Current role</span>
            <strong className={styles.factValue}>Acquisition wedge</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Future role</span>
            <strong className={styles.factValue}>Archived season</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>State</span>
            <strong className={styles.factValue}>Ready for conversion</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Data</span>
            <strong className={styles.factValue}>Awaiting import</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>What it becomes</p>
          <h2>Not just a funnel that expires.</h2>
          <p className={styles.sectionBody}>
            This is where the temporary campaign becomes permanent club memory: entrants, winners, awards, and what changed after the tournament ended.
          </p>
        </div>
      </section>
    </HuddleShell>
  );
}
