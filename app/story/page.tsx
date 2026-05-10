import { HuddleShell } from "@/components/huddle-shell";
import styles from "./page.module.css";

export default function StoryPage() {
  return (
    <HuddleShell mode="public" primaryAction={{ href: "/join", label: "Join now" }}>
      <section className={styles.storyHero}>
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Olympic%20Stadium%20at%20night.jpg"
          alt="A stadium at night before a major sporting event"
          className={styles.heroImage}
        />
        <span className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>What this is</p>
          <h1>Huddle aims to become a city first sports culture club.</h1>
          <p className={styles.heroBody}>
            It started with leagues. The real signal was the room around them: return, rivalry,
            and a chat that actually stayed alive.
          </p>
          <p className={styles.heroNote}>
            Huddle is the attempt to make that easier to enter on purpose.
          </p>
        </div>
      </section>

      <section className={styles.sectionBlock} id="north-star">
        <article className={styles.imageStatement}>
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/The%20crowd%20in%20the%20Olympic%20Stadium%20%289375658705%29.jpg"
            alt="A packed stadium crowd"
            className={styles.statementImage}
          />
          <span className={styles.statementOverlay} />
          <div className={styles.statementContent}>
            <p className={styles.eyebrow}>North star</p>
            <h2>Make community easy.</h2>
            <p className={styles.statementBody}>Make return, ritual, and belonging feel natural.</p>
          </div>
        </article>
      </section>

      <section className={styles.sectionBlock} id="origin">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Where it started</p>
          <h2>Huddle already had history before it had structure.</h2>
        </div>
        <div className={styles.signalGrid}>
          <article>
            <span>History</span>
            <strong>Six NBA seasons</strong>
            <p>Enough time for receipts, rituals, and memory to become real.</p>
          </article>
          <article>
            <span>Depth</span>
            <strong>A second division</strong>
            <p>More people wanted in, so the world expanded on its own.</p>
          </article>
          <article>
            <span>Gravity</span>
            <strong>A real room around it</strong>
            <p>The Discord stopped being a side channel and became daily life for members.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock} id="insight">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>The insight</p>
          <h2>The valuable thing was never just the scoring system.</h2>
        </div>
        <div className={styles.ideaLayout}>
          <div className={styles.ideaQuote}>
            <p>Competition is the wedge. Community is the product.</p>
          </div>
          <div className={styles.ideaList}>
            <article>
              <span>What was true</span>
              <strong>People stayed for the room around the league</strong>
              <p>Scoring systems can be copied. A living room with history, rivalry, and return cannot.</p>
            </article>
            <article>
              <span>What changed</span>
              <strong>The front door needed to stop being confusing</strong>
              <p>The next person should be able to enter something real without needing six years of backstory.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.storyFooter}>
        <div className={styles.storyFooterHeading}>
          <p className={styles.eyebrow}>Why it matters</p>
          <h2>The right rituals keep people in orbit.</h2>
        </div>
        <p className={styles.storyFooterBody}>
          Better tournaments are the obvious win. The deeper one is a denser city: more return,
          more shared ritual, more reasons to show up again.
        </p>
      </section>
    </HuddleShell>
  );
}
