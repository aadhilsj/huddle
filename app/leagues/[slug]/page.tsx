import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { HuddleShell } from "@/components/huddle-shell";
import { getPublicLeagueSummary } from "@/lib/public-league-data";
import styles from "./page.module.css";

export default async function PublicLeaguePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const league = getPublicLeagueSummary(slug);

  if (!league) {
    notFound();
  }

  return (
    <HuddleShell mode="public" primaryAction={{ href: "/", label: "Back home" }}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{league.eyebrow}</p>
          <h1>{league.title}</h1>
          <p className={styles.heroBody}>{league.summary}</p>
          <div className={styles.factRow}>
            <div>
              <span>Entry fee</span>
              <strong>{league.entryFee}</strong>
            </div>
            <div>
              <span>Format</span>
              <strong>{league.format}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{league.status}</strong>
            </div>
          </div>
          <div className={styles.ctaRow}>
            <Link href={league.ctaHref as Route} className={styles.primaryButton}>
              {league.ctaLabel}
            </Link>
            <Link href="/" className={styles.secondaryButton}>
              All sports
            </Link>
          </div>
        </div>

        <aside className={styles.infoRail}>
          <div className={styles.heroMedia}>
            <img
              src={league.heroImageUrl}
              alt={league.title}
              style={league.heroImagePosition ? { objectPosition: league.heroImagePosition } : undefined}
            />
            <span className={styles.heroMediaOverlay} />
            <div className={styles.heroMediaLabel}>
              <span>{league.eyebrow}</span>
              <strong>{league.shortLabel}</strong>
            </div>
          </div>
          <article className={styles.infoCard}>
            <p className={styles.cardLabel}>How it works</p>
            <div className={styles.pointList}>
              {league.mechanics.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
          <article className={styles.infoCard}>
            <p className={styles.cardLabel}>League shape</p>
            <strong>{league.teamsLine}</strong>
            <p>
              Public-facing description first. Full club depth sits behind archive, profile, and member routes.
            </p>
          </article>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{league.rankingHeading}</p>
          <h2>Public ranking signal.</h2>
        </div>
        <div className={styles.rankings}>
          {league.rankingRows.map((row) => (
            <article key={row.label} className={styles.rankCard}>
              <p>{row.label}</p>
              <h3>{row.value}</h3>
              <span>{row.detail}</span>
            </article>
          ))}
        </div>
      </section>
    </HuddleShell>
  );
}
