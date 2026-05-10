import { HuddleShell } from "@/components/huddle-shell";
import { ArchiveSlideDeck } from "@/components/archive-slide-deck";
import { getNbaArchiveSummary } from "@/lib/tranche-two-data";
import styles from "../../shared.module.css";

export default function NbaAwardsPage() {
  const data = getNbaArchiveSummary();
  const titleAwards = data.awardsDirectory.filter((award) => award.type === "title");
  const gmAwards = data.awardsDirectory.filter((award) => award.type === "gm");
  const toneAwards = data.awardsDirectory.filter((award) => award.type === "tone");
  const awardSlides = [
    {
      label: "Titles",
      title: "The formal podium.",
      body: "Champion, finals decider, and season MVP should read as one clean spine.",
      points: titleAwards.map((award) => `${award.title} — ${award.body}`)
    },
    {
      label: "GM",
      title: "Room judgment belongs here too.",
      body: "These awards describe how the league was steered, not just how it scored.",
      points: gmAwards.map((award) => `${award.title} — ${award.body}`)
    },
    {
      label: "Tone",
      title: "The social truth survives.",
      body: "Some of the best archive memory is what the room decided about itself after the season.",
      points: toneAwards.map((award) => `${award.title} — ${award.body}`)
    }
  ];

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/history/nba", label: "NBA archive" }}>
      <section className={`${styles.hero} ${styles.heroNba}`}>
        <p className={styles.eyebrow}>Awards system</p>
        <h1>Season memory is never just the trophy.</h1>
        <p className={styles.heroBody}>
          Season 1 already proves the split: title outcomes, player outcomes, GM judgments, and tone awards all
          tell different truths about the same year.
        </p>
      </section>

      <section className={styles.sectionCompact}>
        <ArchiveSlideDeck
          eyebrow="Awards slides"
          heading="Flip through the different truths instead of reading one long wall."
          slides={awardSlides}
        />
      </section>

      <section className={styles.sectionCompact}>
        <div className={styles.grid3}>
          {titleAwards.slice(0, 3).map((award) => (
            <article key={award.slug} className={styles.card}>
              <p className={styles.eyebrow}>{award.type}</p>
              <h3>{award.title}</h3>
              <p>{award.body}</p>
            </article>
          ))}
        </div>
      </section>
    </HuddleShell>
  );
}
