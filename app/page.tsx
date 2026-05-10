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
            A private FIFA World Cup fantasy league where you build a team, follow every
            match a little more closely, and experience the tournament with the people in
            your league.
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
            One tournament first. Then the room around it, and whatever comes next.
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
            <h3>Join the league</h3>
            <p>Claim your place in the Huddle FIFA World Cup Fantasy League.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Enter the chat</h3>
            <p>Get into the Discord and settle in before the tournament properly begins.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Make the tournament matter</h3>
            <p>Follow every match a little more closely, and leave with a reason to return.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Why this feels different</p>
          <h2>Not fantasy in a vacuum.</h2>
          <p className={styles.sectionBody}>
            The format is familiar. The feeling is not. It has somewhere to live once the teams
            are set.
          </p>
        </div>
        <div className={styles.threeGrid}>
          <article>
            <h3>A room, not just a table</h3>
            <p>Most fantasy leagues live inside an app and end there. This one has somewhere to return to.</p>
          </article>
          <article>
            <h3>The tournament sharpens</h3>
            <p>Every match carries a little more weight when the league is live and everyone is watching.</p>
          </article>
          <article>
            <h3>It does not end at one tournament</h3>
            <p>The World Cup is the first entry point, not the only one.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Why this works</p>
          <h2>Built on six seasons of proof.</h2>
          <p className={styles.sectionBody}>
            The pattern is already real: people return, recruit their friends, care about fairness, and turn a season into something with memory.
          </p>
        </div>
        <div className={styles.proofLayout}>
          <div className={styles.proofQuote}>
            <p>It stopped being just a league a long time ago.</p>
          </div>
          <div className={styles.proofStats}>
            <article>
              <span>History</span>
              <strong>Six NBA seasons. Three in the lower division.</strong>
              <p>The original top division started with six people. It now supports a full Division A and a second tier underneath it.</p>
            </article>
            <article>
              <span>Pull</span>
              <strong>Members bring the next members in.</strong>
              <p>Roughly twenty to thirty of around forty-five current NBA and F1 participants came through existing-member pull, not cold acquisition.</p>
            </article>
            <article>
              <span>Reality</span>
              <strong>The Discord becomes real life chat.</strong>
              <p>During the season, it becomes the most active chat in many members’ actual lives. That is the standard this World Cup is entering.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.footerCtaHeading}>
          <p className={styles.eyebrow}>Ready?</p>
          <h2>Join the FIFA World Cup. See if you come back.</h2>
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
