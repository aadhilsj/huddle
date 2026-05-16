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
          <h1>Claim your place in the room.</h1>
          <p className={styles.heroBody}>
            Put your name down for the {joinFlowData.competitionName}, and Huddle will move you from
            entry to inside without losing the thread.
          </p>
          <p className={styles.heroNote}>
            {joinFlowData.entryCountLabel}. One competition first, then the world around it.
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
              <strong>Enter, then move inside</strong>
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
                This saves your place so Huddle can carry the right context into the next step.
              </p>

              <button type="submit" className={styles.submitButton}>
                Join the World Cup
              </button>
            </form>
          </div>

          <div className={styles.lightCard}>
            <p className={styles.cardLabel}>Right now</p>
            <strong>No payment yet</strong>
            <p>
              This step is about entry, not checkout. Payment and onboarding follow after your place is saved.
            </p>
          </div>
        </aside>
      </section>

      <section className={styles.sectionBlock} id="what-happens">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>What happens</p>
          <h2>Three steps from interest to inside.</h2>
        </div>
        <div className={styles.panelGrid}>
          <article className={styles.panel}>
            <span>01</span>
            <h3>Save your place</h3>
            <p>Your request lands against the live competition, not in a form that goes nowhere.</p>
          </article>
          <article className={styles.panel}>
            <span>02</span>
            <h3>Get routed properly</h3>
            <p>From there, Huddle can move you into payment, onboarding, or founder review without losing momentum.</p>
          </article>
          <article className={styles.panel}>
            <span>03</span>
            <h3>Arrive inside</h3>
            <p>The destination is the same every time: the league, the room, and a place worth returning to.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock} id="inside">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Inside Huddle</p>
          <h2>The tournament is the wedge. The room is the product.</h2>
          <p className={styles.sectionBody}>
            The join flow should feel clear because the club should feel clear. No fog, no drift, no dead-end handoff.
          </p>
        </div>
        <div className={styles.listLayout}>
          <div className={styles.listPanel}>
            <span>North star</span>
            <strong>Make community easy.</strong>
            <p>
              Even this page should do that. Lower friction, hold context, and hand people into something real.
            </p>
          </div>
          <div className={styles.checklist}>
            <article>
              <strong>Competition is still the wedge</strong>
              <p>The tournament gets people through the door because it is concrete and alive right now.</p>
            </article>
            <article>
              <strong>Community is still the product</strong>
              <p>The league matters because it gives people a reason to gather again.</p>
            </article>
            <article>
              <strong>The flow is now real</strong>
              <p>This request lands in the product, not in a mockup pretending to be one.</p>
            </article>
          </div>
        </div>
      </section>
    </HuddleShell>
  );
}
