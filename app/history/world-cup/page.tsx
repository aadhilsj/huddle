import { HuddleShell } from "@/components/huddle-shell";
import styles from "../shared.module.css";

export default function WorldCupHistoryPage() {
  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/world-cup", label: "World Cup archive" }}>
      <section className={`${styles.hero} ${styles.heroArchive}`}>
        <p className={styles.eyebrow}>World Cup archive</p>
        <h1>The campaign should eventually become memory too.</h1>
        <p className={styles.heroBody}>
          The World Cup starts as the wedge, but it should not vanish afterward. It should become one more chapter in the club’s archive once the campaign turns into history.
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
          <h2>Not just a campaign page that disappears.</h2>
          <p className={styles.sectionBody}>
            This route is where the temporary funnel eventually becomes a permanent part of club memory: entrants, winners, awards, and what the tournament changed afterward.
          </p>
        </div>
      </section>
    </HuddleShell>
  );
}
