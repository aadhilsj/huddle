import Link from "next/link";
import type { Route } from "next";
import { HuddleShell } from "@/components/huddle-shell";
import { getPublicLeagueSummaries } from "@/lib/public-league-data";
import styles from "./public-world-cup.module.css";

export default function HomePage() {
  const leagues = getPublicLeagueSummaries();

  return (
    <HuddleShell mode="public" primaryAction={{ href: "/join", label: "Join now" }}>
      <section className={styles.hero} id="join">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Huddle FIFA World Cup Fantasy League</p>
          <h1>Join the FIFA World Cup.</h1>
          <p className={styles.heroBody}>
            Start with one World Cup league. Stay for the banter, the rivalry, and the kind of room
            that gives people a reason to talk every day again.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/join" className={`${styles.button} ${styles.primary}`}>
              Join the World Cup
            </Link>
            <a href="#how-it-works" className={`${styles.button} ${styles.secondary}`}>
              How Huddle works
            </a>
          </div>
          <p className={styles.heroNote}>
            Competition is the wedge. Community is the point.
          </p>
        </div>

        <aside className={styles.heroSidebar}>
          <section className={styles.sportGateway}>
            <div className={styles.sportGatewayHeader}>
              <p className={styles.detailLabel}>Sport entry</p>
            </div>
            <div className={styles.sportButtonGrid}>
              {leagues.map((league) => (
                <Link key={league.slug} href={league.route as Route} className={styles.sportButton}>
                  <img
                    src={league.cardImageUrl}
                    alt={league.title}
                    className={styles.sportImage}
                    style={
                      league.cardImagePosition
                        ? { objectPosition: league.cardImagePosition }
                        : undefined
                    }
                  />
                  <span className={styles.sportButtonOverlay} />
                  <span className={styles.sportButtonContent}>
                    <span className={styles.sportButtonEyebrow}>{league.eyebrow}</span>
                    <strong>{league.cardLabel}</strong>
                    <small>{league.status}</small>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className={styles.sectionBlock} id="how-it-works">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>How it works</p>
          <h2>Three steps. No fog.</h2>
        </div>
        <div className={styles.threeGrid}>
          <article>
            <span>01</span>
            <h3>Join the competition</h3>
            <p>Claim your place in the World Cup league and give the tournament some stakes.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Enter the room</h3>
            <p>Move into the Discord where the banter, receipts, and daily rhythm actually live.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Make it matter</h3>
            <p>Follow every match more closely and leave with people, history, and a reason to come back.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Why this feels different</p>
          <h2>Not a fantasy platform.</h2>
          <p className={styles.sectionBody}>
            The league is only the way in. Huddle is the world that forms around it.
          </p>
        </div>
        <div className={styles.threeGrid}>
          <article>
            <h3>Belonging</h3>
            <p>It gives people a place to return to, not just a table that disappears when the scores stop moving.</p>
          </article>
          <article>
            <h3>Banter</h3>
            <p>Competition gives people a reason to talk. Trash talk turns into real talk if the room is worth staying in.</p>
          </article>
          <article>
            <h3>Glory</h3>
            <p>Titles, records, promotions, and receipts are what turn one season into something people remember.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Why this works</p>
          <h2>Built on six seasons of proof.</h2>
          <p className={styles.sectionBody}>
            The pattern is already there: people return, bring their people in, and turn a season into shared history.
          </p>
        </div>
        <div className={styles.proofLayout}>
          <div className={styles.proofQuote}>
            <p>People join for one competition. They stay for a world.</p>
          </div>
          <div className={styles.proofStats}>
            <article>
              <span>History</span>
              <strong>Six NBA seasons. Three in the lower division.</strong>
              <p>The original top division started with six people. It now supports a full Division A and a second tier underneath it.</p>
            </article>
            <article>
              <span>Pull</span>
              <strong>The room recruits the next room.</strong>
              <p>Roughly twenty to thirty of around forty-five current NBA and F1 participants came through existing-member pull, not cold acquisition.</p>
            </article>
            <article>
              <span>Reality</span>
              <strong>The chat becomes part of real life.</strong>
              <p>During the season, it becomes one of the most active chats in many members’ actual lives. That is the standard this World Cup is entering.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.footerCtaHeading}>
          <p className={styles.eyebrow}>Ready?</p>
          <h2>Start with the World Cup. Stay if the room feels right.</h2>
        </div>
        <div className={styles.ctaRow}>
          <Link href="/join" className={`${styles.button} ${styles.primary}`}>
            Join the World Cup
          </Link>
          <Link href="/story" className={`${styles.button} ${styles.secondary}`}>
            Read the story
          </Link>
        </div>
      </section>
    </HuddleShell>
  );
}
