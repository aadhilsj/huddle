import { HuddleShell } from "@/components/huddle-shell";
import styles from "../shared.module.css";

export default function F1HistoryPage() {
  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/f1", label: "F1 archive" }}>
      <section className={`${styles.hero} ${styles.heroArchive}`}>
        <p className={styles.eyebrow}>F1 archive</p>
        <h1>The second world should still feel native.</h1>
        <p className={styles.heroBody}>
          F1 should not feel like a footnote to NBA. The archive needs to support a second serious world, even before every imported table is in place.
        </p>
        <div className={styles.heroMeta}>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Current role</span>
            <strong className={styles.factValue}>Second world</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Identity</span>
            <strong className={styles.factValue}>Cross-sport</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Import state</span>
            <strong className={styles.factValue}>Awaiting data</strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factLabel}>Bones</span>
            <strong className={styles.factValue}>Route live</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>What lands here</p>
          <h2>Driver tables are not the whole point.</h2>
          <p className={styles.sectionBody}>
            This world should eventually hold season standings, constructors, rivalries, awards, and the second identity a member can carry.
          </p>
        </div>
        <div className={styles.grid3}>
          <article className={styles.card}>
            <h3>Season tables</h3>
            <p>Standings and winners will land here once imported.</p>
          </article>
          <article className={styles.card}>
            <h3>Member crossover</h3>
            <p>This route exists so one person can hold both an NBA and an F1 identity cleanly.</p>
          </article>
          <article className={styles.card}>
            <h3>Awards</h3>
            <p>The model is built for more than title outcomes alone.</p>
          </article>
        </div>
      </section>
    </HuddleShell>
  );
}
