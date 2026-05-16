import { HuddleShell } from "@/components/huddle-shell";
import { MemberGreeting } from "@/components/member-greeting";
import { getMemberFoyerData } from "@/lib/member-data";
import styles from "./page.module.css";

type MemberPageProps = {
  searchParams?: Promise<{
    email?: string;
    name?: string;
  }>;
};

export default async function MemberPage({ searchParams }: MemberPageProps) {
  const resolvedSearchParams = await searchParams;
  const memberData = await getMemberFoyerData({
    email: resolvedSearchParams?.email,
    name: resolvedSearchParams?.name
  });

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/join", label: "New entry" }}>
      <section className={styles.arrival}>
        <div className={styles.arrivalCopy}>
          <p className={styles.eyebrow}>Member foyer</p>
          <h1><MemberGreeting fallbackName={memberData.memberName} /></h1>
          <p className={styles.arrivalBody}>
            Your place is set. This is your way back into the club.
          </p>
          <div className={styles.arrivalActions}>
            <a className={`${styles.button} ${styles.primary}`} href="#status">
              View your status
            </a>
            <a className={`${styles.button} ${styles.secondary}`} href="/discord">
              Discord
            </a>
          </div>
          <p className={styles.arrivalNote}>
            {memberData.entryCountLabel}. The room gets better when more of the right people are in.
          </p>
        </div>

        <aside className={styles.arrivalPanel}>
          <div className={`${styles.arrivalCard} ${styles.dark}`}>
            <p className={styles.detailLabel}>Current membership</p>
            <table className={styles.detailTable}>
              <tbody>
                <tr>
                  <td>League</td>
                  <td>{memberData.competitionName}</td>
                </tr>
                <tr>
                  <td>Member status</td>
                  <td>{memberData.memberStatus}</td>
                </tr>
                <tr>
                  <td>Recorded contact</td>
                  <td>{memberData.memberEmail}</td>
                </tr>
                <tr>
                  <td>Community</td>
                  <td>{memberData.communityStatus}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={`${styles.arrivalCard} ${styles.foyerVisual}`}>
            <p className={styles.detailLabel}>Inside view</p>
            <div className={styles.foyerBadge}>Colombo to the room</div>
            <p className={styles.visualTitle}>{memberData.stageLabel}</p>
            <p className={styles.visualBody}>{memberData.stageDetail}</p>
          </div>
        </aside>
      </section>

        <section className={styles.sectionBlock} id="status">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Current status</p>
            <h2>The essentials</h2>
          </div>
        <div className={styles.grid3}>
          <article className={styles.statusCard}>
            <span>League</span>
            <strong>{memberData.competitionShortName}</strong>
            <p>Your current competition and the world gathering around it.</p>
          </article>
          <article className={styles.statusCard}>
            <span>Community</span>
            <strong>{memberData.communityStatus}</strong>
            <p>Whether you are still on the way in or properly inside.</p>
          </article>
          <article className={styles.statusCard}>
            <span>Payment</span>
            <strong>{memberData.paymentStatus}</strong>
            <p>The payment state attached to your entry.</p>
          </article>
        </div>
      </section>

        <section className={styles.sectionBlock} id="next">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Next</p>
            <h2>{memberData.nextActionTitle}</h2>
          </div>
        <div className={styles.grid3}>
          <article className={styles.actionCard}>
            <span>01</span>
            <h3>Current handoff</h3>
            <p>{memberData.nextActionBody}</p>
          </article>
          <article className={styles.actionCard}>
            <span>02</span>
            <h3>Current competition</h3>
            <p>{memberData.competitionShortName} is the live wedge. The room around it is still the point.</p>
          </article>
          <article className={styles.actionCard}>
            <span>03</span>
            <h3>Later</h3>
            <p>{memberData.whatComesLater} is where this stops being a flow and starts becoming memory.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock} id="inside">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Inside Huddle</p>
          <h2>What builds from here</h2>
          <p className={styles.sectionBody}>
            Right now, you have the league, the room around it, and a place to return to. Later, that grows into profile, history, rivalry, and identity.
          </p>
        </div>
        <div className={styles.insideLayout}>
          <div className={styles.insideList}>
            <article>
              <span>Now</span>
              <strong>League + room + rhythm</strong>
              <p>Enough to know where you are, who is around you, and why you would come back.</p>
            </article>
            <article>
              <span>Later</span>
              <strong>Profile + history + more worlds</strong>
              <p>The deeper layers arrive as the club gathers weight.</p>
            </article>
          </div>
        </div>
      </section>
    </HuddleShell>
  );
}
