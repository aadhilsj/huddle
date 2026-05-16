import Link from "next/link";
import { HuddleShell } from "@/components/huddle-shell";
import { getArchiveMemberDirectory, getMemberProfileSummary } from "@/lib/tranche-two-data";
import styles from "../shared.module.css";

export default function MemberArchiveDirectoryPage() {
  const sampleMembers = getArchiveMemberDirectory().map((member) => ({
    ...member,
    profile: getMemberProfileSummary(member.slug)
  }));

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/members", label: "Members" }}>
      <section className={`${styles.hero} ${styles.heroProfile}`}>
        <p className={styles.eyebrow}>Member directory</p>
        <h1>People need receipts, not just rosters.</h1>
        <p className={styles.heroBody}>
          The franchise layer matters, but the club also remembers who won the room, who got unlucky, and who built a reputation that survives the season.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Profiles</p>
          <h2>The archive should hold people-level memory too.</h2>
        </div>
        <div className={styles.directory}>
          {sampleMembers.map((member) => (
            <article key={member.slug} className={styles.directoryRow}>
              <div className={styles.directoryTitle}>
                <h3>{member.name}</h3>
                <p>{member.body}</p>
              </div>
              <div className={styles.directoryMeta}>
                <h3>Best known receipt</h3>
                <p>{member.profile.facts[0]?.value ?? "Archive profile"}</p>
              </div>
              <div className={styles.directoryMeta}>
                <h3>State</h3>
                <p>{member.profile.currentStage}</p>
              </div>
              <Link className={styles.directoryAction} href={`/history/members/${member.slug}`}>
                Open profile
              </Link>
            </article>
          ))}
        </div>
      </section>
    </HuddleShell>
  );
}
