import { HuddleShell } from "@/components/huddle-shell";
import { RoleGate } from "@/components/role-gate";
import { getFounderDashboardData } from "@/lib/dashboard-data";
import styles from "./page.module.css";

export default async function FounderPage() {
  const founderData = await getFounderDashboardData();

  return (
    <HuddleShell mode="founder" primaryAction={{ href: "/join", label: "View intake" }}>
      <RoleGate requiredRole="founder">
        <section className={styles.hero} id="overview">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Founder view</p>
            <h1>Read the room.</h1>
            <p className={styles.heroBody}>
              Operating view for entry volume, member quality, and whether the room is actually holding together.
            </p>
            <p className={styles.heroNote}>
              Last updated {founderData.updatedAt}. Snapshot view, not live noise.
            </p>
          </div>

          <aside className={styles.heroPanel}>
            <div className={`${styles.heroCard} ${styles.light}`}>
              <p className={styles.detailLabel}>Current focus</p>
              <p className={styles.detailValue}>{founderData.focus}</p>
              <p className={styles.detailBody}>Traffic matters less than who comes back and who brings people with them.</p>
            </div>
          </aside>
        </section>

        <section className={styles.metricBand}>
          {founderData.metricBand.map((metric) => (
            <article key={metric.label} className={styles.metricCard}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </section>

        <section className={styles.sectionBlock} id="health">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Health</p>
            <h2>This week’s shape</h2>
          </div>
          <div className={styles.healthGrid}>
            <article className={`${styles.panel} ${styles.dark}`}>
              <p className={styles.panelLabel}>Density</p>
              <table className={styles.dataTable}>
                <tbody>
                  {founderData.density.map(([label, value]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className={`${styles.panel} ${styles.dark}`}>
              <p className={styles.panelLabel}>Funnel</p>
              <table className={styles.dataTable}>
                <tbody>
                  {founderData.funnel.map(([label, value]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className={`${styles.panel} ${styles.light}`}>
              <p className={styles.panelLabel}>Founder read</p>
              <p className={styles.panelValue}>Repeat intent is still the test.</p>
            </article>
          </div>
        </section>

        <section className={styles.sectionBlock} id="signals">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Signals</p>
            <h2>Watchlist</h2>
          </div>
          <div className={styles.signalGrid}>
            <article className={styles.signalCard}>
              <span>Member quality</span>
              <strong>Are the right people entering?</strong>
            </article>
            <article className={styles.signalCard}>
              <span>Conversation quality</span>
              <strong>Does the room feel alive?</strong>
            </article>
            <article className={styles.signalCard}>
              <span>Return potential</span>
              <strong>Would they come back for the next world?</strong>
            </article>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Notes</p>
            <h2>Open questions</h2>
          </div>
          <div className={styles.notesGrid}>
            <article>
              <h3>Watch</h3>
              <p>Colombo density is improving, but repeat participation still matters more than spikes.</p>
            </article>
            <article>
              <h3>Keep</h3>
              <p>The public route and onboarding feel coherent enough. Do not decorate them into confusion.</p>
            </article>
            <article>
              <h3>Question</h3>
              <p>Does this World Cup cohort want another Huddle league after the tournament closes?</p>
            </article>
          </div>
        </section>
      </RoleGate>
    </HuddleShell>
  );
}
