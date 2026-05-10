import { HuddleShell } from "@/components/huddle-shell";
import { getJoinFlowData } from "@/lib/join-data";

import { submitJoinRequest } from "./actions";
import styles from "./page.module.css";

type JoinPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error: string | undefined) {
  switch (error) {
    case "missing_fields":
      return "Name and email are required.";
    case "insert_failed":
      return "The join request did not save cleanly. Try once more.";
    case "supabase_unavailable":
      return "The database connection is not ready yet.";
    case "unexpected":
      return "Something broke on submit. Try once more.";
    default:
      return null;
  }
}

export default async function JoinPage({ searchParams }: JoinPageProps) {
  const [joinFlowData, resolvedSearchParams] = await Promise.all([
    getJoinFlowData(),
    searchParams
  ]);
  const errorMessage = getErrorMessage(resolvedSearchParams?.error);

  return (
    <HuddleShell mode="public" primaryAction={{ href: "/", label: "Back to World Cup" }}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Join Huddle</p>
          <h1>Claim your place properly.</h1>
          <p className={styles.heroBody}>
            This is the clean start. Put your name down for the{" "}
            {joinFlowData.competitionName}, and Huddle will carry you into the right next step.
          </p>
          <p className={styles.heroNote}>
            {joinFlowData.entryCountLabel}. One clean entry now, then the room around it.
          </p>
          <div className={styles.metaStrip}>
            <div>
              League
              <strong>{joinFlowData.competitionShortName}</strong>
            </div>
            <div>
              Format
              <strong>{joinFlowData.competitionFormat}</strong>
            </div>
            <div>
              Flow
              <strong>Join, then guided inside</strong>
            </div>
          </div>
        </div>

        <aside className={styles.formPanel} id="join-form">
          <div className={styles.formCard}>
            <p className={styles.cardLabel}>Your entry</p>
            {errorMessage ? <p className={styles.banner}>{errorMessage}</p> : null}
            <form action={submitJoinRequest} className={styles.joinForm}>
              <input type="hidden" name="competitionId" value={joinFlowData.competitionId ?? ""} />
              <input type="hidden" name="competitionName" value={joinFlowData.competitionName} />

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="fullName">Full name</label>
                  <input id="fullName" name="fullName" type="text" placeholder="Aadhil Shahjahan" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="homeCity">Home city</label>
                  <input id="homeCity" name="homeCity" type="text" placeholder="Colombo" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="sourceDetail">How did you hear about it?</label>
                  <input id="sourceDetail" name="sourceDetail" type="text" placeholder="Instagram, friend, group chat" />
                </div>
              </div>

              <p className={styles.fieldHelp}>
                This saves your place and gives Huddle the context to move you cleanly into the next step.
              </p>

              <button type="submit" className={styles.submitButton}>
                Join the World Cup
              </button>
            </form>
          </div>

          <div className={styles.lightCard}>
            <p className={styles.cardLabel}>Right now</p>
            <strong>You are not paying yet</strong>
            <p>
              This is the first clean intake step. Payment and onboarding can slot in after the core flow is stable.
            </p>
          </div>
        </aside>
      </section>

      <section className={styles.sectionBlock} id="what-happens">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>What happens</p>
          <h2>Three clean steps from interest to entry.</h2>
        </div>
        <div className={styles.panelGrid}>
          <article className={styles.panel}>
            <span>01</span>
            <h3>Save the request</h3>
            <p>Your details land in the system tied to the current competition, not in a forgotten form.</p>
          </article>
          <article className={styles.panel}>
            <span>02</span>
            <h3>Confirm the route</h3>
            <p>From there, Huddle can point you into payment, onboarding, or the next manual check without confusion.</p>
          </article>
          <article className={styles.panel}>
            <span>03</span>
            <h3>Arrive inside</h3>
            <p>The destination is still the same: league, room, and a place that already feels intentional.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock} id="inside">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Inside Huddle</p>
          <h2>The point is still the room around the tournament.</h2>
          <p className={styles.sectionBody}>
            The intake should feel clean because the club should feel clean. No dead-end forms, no fog, no vague next step.
          </p>
        </div>
        <div className={styles.listLayout}>
          <div className={styles.listPanel}>
            <span>North star</span>
            <strong>Make community easy.</strong>
            <p>
              Even the join flow should do that. It should lower friction, preserve context, and hand people into something real.
            </p>
          </div>
          <div className={styles.checklist}>
            <article>
              <strong>Competition is still the wedge</strong>
              <p>The tournament gets people through the door because it is concrete and alive right now.</p>
            </article>
            <article>
              <strong>Community is still the product</strong>
              <p>The league matters, but the point is what gathers around it once people arrive.</p>
            </article>
            <article>
              <strong>The stack is getting real</strong>
              <p>This request now lands in the database instead of disappearing into a mockup-only flow.</p>
            </article>
          </div>
        </div>
      </section>
    </HuddleShell>
  );
}
