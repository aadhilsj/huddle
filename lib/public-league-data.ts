import { getNbaSeasonSummary } from "@/lib/tranche-two-data";

export type PublicLeagueSlug = "world-cup" | "nba" | "f1" | "wnba";

export type PublicLeagueSummary = {
  slug: PublicLeagueSlug;
  title: string;
  shortLabel: string;
  cardLabel: string;
  eyebrow: string;
  summary: string;
  route: string;
  status: string;
  entryFee: string;
  cardImageUrl: string;
  cardImagePosition?: string;
  heroImageUrl: string;
  heroImagePosition?: string;
  format: string;
  teamsLine: string;
  ctaLabel: string;
  ctaHref: string;
  mechanics: string[];
  rankingHeading: string;
  rankingRows: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
};

export function getPublicLeagueSummaries(): PublicLeagueSummary[] {
  const seasonOne = getNbaSeasonSummary("season-1-mula");

  return [
    {
      slug: "world-cup",
      title: "FIFA World Cup Fantasy League",
      shortLabel: "FIFA World Cup",
      cardLabel: "FIFA World Cup",
      eyebrow: "Public now",
      summary: "The current public way in: one World Cup league, guided onboarding, and a room that keeps going after kickoff.",
      route: "/leagues/world-cup",
      status: "Open intake",
      entryFee: "TBA",
      cardImageUrl: "https://unsplash.com/photos/lM6g64U--tk/download?force=true&w=1200",
      cardImagePosition: "center 34%",
      heroImageUrl: "https://unsplash.com/photos/QPwgWD5Xepk/download?force=true&w=1600",
      heroImagePosition: "center 45%",
      format: "Fantasy league",
      teamsLine: "Public campaign live now",
      ctaLabel: "Join the World Cup",
      ctaHref: "/join",
      mechanics: [
        "Pick a tournament team and follow every match closer.",
        "Enter through one clear intake instead of a scattered chat flow.",
        "Move into the Discord and whatever world comes after this one."
      ],
      rankingHeading: "Public board",
      rankingRows: [
        {
          label: "Campaign state",
          value: "Live now",
          detail: "This is the active public intake route."
        },
        {
          label: "Archive conversion",
          value: "Planned",
          detail: "This tournament should become a permanent chapter after it closes."
        }
      ]
    },
    {
      slug: "nba",
      title: "NBA Fantasy League",
      shortLabel: "NBA Fantasy League",
      cardLabel: "NBA Fantasy League",
      eyebrow: "Flagship depth",
      summary: "The deepest Huddle world so far: seasons, divisions, franchise history, awards, and rivalries that compound over time.",
      route: "/leagues/nba",
      status: "Archive visible",
      entryFee: "Private / TBA",
      cardImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Kobe%20Bryant%202014.jpg",
      cardImagePosition: "center 18%",
      heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/LeBron%20James%20dunk.jpg",
      heroImagePosition: "center 36%",
      format: "Season fantasy league",
      teamsLine: "6 franchises imported for Season 1",
      ctaLabel: "Reserve your spot",
      ctaHref: "/queue/nba",
      mechanics: [
        "Season-long fantasy competition with divisions and playoff structure.",
        "Franchises, awards, and standings persist instead of disappearing after the season.",
        "The archive already holds the first imported season."
      ],
      rankingHeading: "Season 1 standings",
      rankingRows:
        seasonOne?.standings.map((row) => ({
          label: row.franchiseName,
          value: row.record,
          detail: `Rank ${row.rank} • PF ${row.pointsFor}`
        })) ?? [
          {
            label: "Season 1",
            value: "Awaiting import",
            detail: "Public standings board lands here."
          }
        ]
    },
    {
      slug: "f1",
      title: "F1 Fantasy League",
      shortLabel: "F1 Fantasy League",
      cardLabel: "F1 Fantasy League",
      eyebrow: "Cross-sport world",
      summary: "The second serious sport world. Built to carry driver tables, constructors, and a second identity for members.",
      route: "/leagues/f1",
      status: "Planned",
      entryFee: "TBA",
      cardImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Formula%20one.jpg",
      cardImagePosition: "center 42%",
      heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Formula%201%20race%20cars%20on%20display.jpg",
      heroImagePosition: "center 42%",
      format: "Season fantasy league",
      teamsLine: "Archive bones live",
      ctaLabel: "Join the queue",
      ctaHref: "/queue/f1",
      mechanics: [
        "Designed as a true second world, not an NBA footnote.",
        "Will hold season tables, rivalry, and member crossover.",
        "Public surface exists before the archive import is complete."
      ],
      rankingHeading: "Ranking board",
      rankingRows: [
        {
          label: "Import state",
          value: "Awaiting data",
          detail: "Public ranking board appears once the first season lands."
        }
      ]
    },
    {
      slug: "wnba",
      title: "WNBA Fantasy League",
      shortLabel: "WNBA Fantasy League",
      cardLabel: "WNBA Fantasy League",
      eyebrow: "Next launchable world",
      summary: "A public placeholder for the next league branch. The route should exist before the season is fully operational.",
      route: "/leagues/wnba",
      status: "Planned",
      entryFee: "TBA",
      cardImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/A%27ja%20Wilson.jpg",
      heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Caitlin%20Clark%20%282%29.jpg",
      heroImagePosition: "center 22%",
      format: "Season fantasy league",
      teamsLine: "Entry page ready before import",
      ctaLabel: "Reserve your spot",
      ctaHref: "/queue/wnba",
      mechanics: [
        "Same club, different league logic and roster culture.",
        "Should launch with its own identity, not as a copied NBA shell.",
        "Public explanation and ranking slot can exist before the data layer is full."
      ],
      rankingHeading: "Ranking board",
      rankingRows: [
        {
          label: "State",
          value: "Awaiting launch",
          detail: "Ranking table opens when the first season structure is announced."
        }
      ]
    }
  ];
}

export function getPublicLeagueSummary(slug: string): PublicLeagueSummary | null {
  return getPublicLeagueSummaries().find((league) => league.slug === slug) ?? null;
}
