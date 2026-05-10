export type ArchiveSportSummary = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  facts: Array<{ label: string; value: string }>;
};

export type ArchiveDirectoryEntry = {
  slug: string;
  name: string;
  status: "active" | "defunct";
  steward: string;
  era: string;
  note: string;
  seasonRecord?: string;
  seasonFinish?: string;
  seasonMarker?: string;
};

export type AwardCategorySummary = {
  slug: string;
  title: string;
  type: "title" | "gm" | "tone";
  body: string;
};

export type RivalrySummary = {
  slug: string;
  title: string;
  body: string;
  state: string;
};

export type NbaRivalryExplorerOption = {
  slug: string;
  name: string;
};

export type NbaRivalryMatchupSummary = {
  slug: string;
  franchiseA: {
    slug: string;
    name: string;
  };
  franchiseB: {
    slug: string;
    name: string;
  };
  record: string;
  detail: string;
};

export type NbaFranchiseComparisonSummary = {
  slug: string;
  name: string;
  regularSeasonRecord: string;
  winPct: string;
  topFourFinishes: number;
  finalsAppearances: number;
  championships: number;
  draftAwards: number | null;
  gmAwards: number | null;
};

export type ArchiveOpsSummary = {
  sections: Array<{
    title: string;
    body: string;
    status: string;
    tasks: string[];
  }>;
};

export type MemberIdentitySummary = {
  displayName: string;
  city: string;
  status: string;
  intro: string;
  currentFranchises: Array<{
    sport: string;
    franchise: string;
    state: string;
  }>;
  identityLedger: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
};

export type NbaArchiveSummary = {
  heroTitle: string;
  heroBody: string;
  leagueFacts: Array<{ label: string; value: string }>;
  awardCategories: string[];
  archiveModules: Array<{ title: string; detail: string }>;
  franchiseDirectory: ArchiveDirectoryEntry[];
  awardsDirectory: AwardCategorySummary[];
  rivalryDirectory: RivalrySummary[];
  seasonDirectory: Array<{
    slug: string;
    label: string;
    division: string;
    status: string;
  }>;
};

export type FranchiseProfileSummary = {
  slug: string;
  name: string;
  status: "active" | "defunct";
  sport: string;
  body: string;
  facts: Array<{ label: string; value: string }>;
  rosterSections: Array<{
    label: string;
    players: string[];
  }>;
  topFive: Array<{
    player: string;
    average: string;
  }>;
  awardsRail: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  headToHead: Array<{
    opponent: string;
    record: string;
    detail: string;
  }>;
};

export type MemberProfileSummary = {
  name: string;
  body: string;
  franchises: Array<{ sport: string; slot: string; detail: string }>;
  facts: Array<{ label: string; value: string }>;
  currentStage: string;
  awardsRail: Array<{ label: string; value: string; detail: string }>;
};

export type ArchiveMemberDirectoryEntry = {
  slug: string;
  name: string;
  body: string;
};

export type NbaSeasonSummary = {
  slug: string;
  label: string;
  division: string;
  heroTitle: string;
  heroBody: string;
  heroFacts: Array<{ label: string; value: string }>;
  sourceNote: {
    importedFrom: string;
    confidence: string;
    included: string[];
    missing: string[];
  };
  standings: Array<{
    rank: number;
    franchiseSlug: string;
    franchiseName: string;
    record: string;
    winPct: string;
    pointsFor: string;
    pointsAgainst: string;
    longestWinStreak: string;
  }>;
  playoffRounds: Array<{
    round: string;
    matchup: string;
    result: string;
    winner: string;
    note: string;
  }>;
  awards: Array<{
    title: string;
    winner: string;
    detail: string;
    type: "title" | "gm" | "tone";
  }>;
};

const seasonOneStandings = [
  {
    rank: 1,
    franchiseSlug: "kalubowila-kudaz",
    franchiseName: "Kalubowila Kudaz",
    record: "12-2",
    winPct: ".857",
    pointsFor: "39,326",
    pointsAgainst: "34,841",
    longestWinStreak: "5"
  },
  {
    rank: 2,
    franchiseSlug: "galle-face-gobayas",
    franchiseName: "Galle Face Gobayas",
    record: "10-4",
    winPct: ".714",
    pointsFor: "38,231",
    pointsAgainst: "34,730",
    longestWinStreak: "7"
  },
  {
    rank: 3,
    franchiseSlug: "katunayake-whorenets",
    franchiseName: "Katunayake Whorenets",
    record: "7-7",
    winPct: ".500",
    pointsFor: "37,051",
    pointsAgainst: "36,301",
    longestWinStreak: "4"
  },
  {
    rank: 4,
    franchiseSlug: "kurunduwatte-warriors",
    franchiseName: "Kurunduwatte Warriors",
    record: "7-7",
    winPct: ".500",
    pointsFor: "35,831",
    pointsAgainst: "34,467",
    longestWinStreak: "2"
  },
  {
    rank: 5,
    franchiseSlug: "eheliyagoda-rising-suns",
    franchiseName: "Eheliyagoda Rising Suns",
    record: "6-8",
    winPct: ".429",
    pointsFor: "35,018",
    pointsAgainst: "36,951",
    longestWinStreak: "1"
  },
  {
    rank: 6,
    franchiseSlug: "jubilee-post-jungies",
    franchiseName: "Jubilee Post Jungies",
    record: "0-14",
    winPct: ".000",
    pointsFor: "29,100",
    pointsAgainst: "37,267",
    longestWinStreak: "-"
  }
] as const;

const seasonOneFranchises: FranchiseProfileSummary[] = [
  {
    slug: "kalubowila-kudaz",
    name: "Kalubowila Kudaz",
    status: "active",
    sport: "NBA",
    body:
      "The first regular-season machine. Twelve wins, one seed, top-scoring offense, then a finals loss that gives the franchise its opening wound.",
    facts: [
      { label: "Season 1 record", value: "12-2" },
      { label: "Regular-season finish", value: "1st" },
      { label: "Points for", value: "39,326 (1st)" },
      { label: "Points against", value: "34,841 (3rd)" },
      { label: "Longest streak", value: "5" }
    ],
    rosterSections: [
      {
        label: "Core",
        players: [
          "Luka Doncic",
          "De'Aaron Fox",
          "Ja Morant",
          "Dejounte Murray",
          "Donovan Mitchell",
          "Fred VanVleet",
          "Jaylen Brown",
          "Anthony Edwards",
          "Tobias Harris",
          "Aaron Gordon",
          "Nikola Jokic",
          "Joel Embiid"
        ]
      },
      {
        label: "Bench and IR",
        players: ["RJ Barrett", "Lu Dort", "Robert Covington", "Kelly Olynyk", "Jakob Poeltl", "IR: John Collins"]
      }
    ],
    topFive: [
      { player: "Nikola Jokic", average: "82.1" },
      { player: "Joel Embiid", average: "75.8" },
      { player: "Luka Doncic", average: "71.8" },
      { player: "De'Aaron Fox", average: "57.0" },
      { player: "Donovan Mitchell", average: "57.0" }
    ],
    awardsRail: [
      {
        label: "Season MVP",
        value: "Nikola Jokic",
        detail: "Season 1 most valuable player came from this roster."
      },
      {
        label: "Playoff finish",
        value: "Runner-up",
        detail: "Lost the first finals to Galle Face Gobayas, 5684-5850."
      }
    ],
    headToHead: [
      {
        opponent: "Galle Face Gobayas",
        record: "2-1 regular season, lost finals",
        detail: "Won the regular-season edge, then lost the title game. This is the first true rivalry scar."
      },
      {
        opponent: "Kurunduwatte Warriors",
        record: "3-0 regular season, 1-0 playoffs",
        detail: "Swept them in the table, then edged them again in the semis, 6111-6089."
      },
      {
        opponent: "Jubilee Post Jungies",
        record: "3-0",
        detail: "Held the basement side down every time."
      },
      {
        opponent: "Katunayake Whorenets",
        record: "2-1",
        detail: "Dropped one in the regular season, but still took the season series."
      },
      {
        opponent: "Eheliyagoda Rising Suns",
        record: "2-0",
        detail: "Never let them get a foothold."
      }
    ]
  },
  {
    slug: "galle-face-gobayas",
    name: "Galle Face Gobayas",
    status: "active",
    sport: "NBA",
    body:
      "The first champions. They did not own the one seed, but they closed the year strongest and took the finals when it mattered.",
    facts: [
      { label: "Season 1 record", value: "10-4" },
      { label: "Regular-season finish", value: "2nd" },
      { label: "Points for", value: "38,231 (2nd)" },
      { label: "Points against", value: "34,730 (2nd)" },
      { label: "Longest streak", value: "7" }
    ],
    rosterSections: [
      {
        label: "Core",
        players: [
          "Chris Paul",
          "Kyle Lowry",
          "D'Angelo Russell",
          "Zach LaVine",
          "James Harden",
          "Collin Sexton",
          "Jimmy Butler",
          "Kawhi Leonard",
          "Julius Randle",
          "Domantas Sabonis",
          "Bam Adebayo",
          "Jarrett Allen"
        ]
      },
      {
        label: "Bench and IR",
        players: ["Devonte' Graham", "Marcus Smart", "Harrison Barnes", "Robert Williams", "Moses Brown", "IR: Jaren Jackson Jr."]
      }
    ],
    topFive: [
      { player: "James Harden", average: "75.8" },
      { player: "Kawhi Leonard", average: "66.1" },
      { player: "Jimmy Butler", average: "63.9" },
      { player: "Julius Randle", average: "60.0" },
      { player: "Domantas Sabonis", average: "60.0" }
    ],
    awardsRail: [
      {
        label: "Champion",
        value: "Season 1",
        detail: "Beat Kalubowila Kudaz in the first finals, 5850-5684."
      },
      {
        label: "Finals MVP",
        value: "Domantas Sabonis",
        detail: "80.4 FP average in the finals."
      }
    ],
    headToHead: [
      {
        opponent: "Kalubowila Kudaz",
        record: "1-2 regular season, won finals",
        detail: "Lost the regular-season edge, then took the one result that mattered most."
      },
      {
        opponent: "Eheliyagoda Rising Suns",
        record: "3-0",
        detail: "Never slipped against them all year."
      },
      {
        opponent: "Katunayake Whorenets",
        record: "2-1",
        detail: "Took the season series by one game."
      },
      {
        opponent: "Kurunduwatte Warriors",
        record: "2-1",
        detail: "Won two of three and beat another top-half side on repeat."
      },
      {
        opponent: "Jubilee Post Jungies",
        record: "2-0 regular season, 1-0 playoffs",
        detail: "Handled them in the table and ended the upset run in the semis."
      }
    ]
  },
  {
    slug: "katunayake-whorenets",
    name: "Katunayake Whorenets",
    status: "active",
    sport: "NBA",
    body:
      "A .500 team with real scoring power. They swept Jubilee in the regular season, then got caught in the opening playoff round.",
    facts: [
      { label: "Season 1 record", value: "7-7" },
      { label: "Regular-season finish", value: "3rd" },
      { label: "Points for", value: "37,051 (3rd)" },
      { label: "Points against", value: "36,301 (4th)" },
      { label: "Longest streak", value: "4" }
    ],
    rosterSections: [
      {
        label: "Core",
        players: [
          "Trae Young",
          "Kyrie Irving",
          "Jamal Murray",
          "Bradley Beal",
          "Kevin Porter Jr.",
          "Norman Powell",
          "Brandon Ingram",
          "Jerami Grant",
          "Giannis Antetokounmpo",
          "Kristaps Porzingis",
          "DeAndre Ayton"
        ]
      },
      {
        label: "Bench and IR",
        players: ["Lonzo Ball", "Dennis Schroder", "Jordan Clarkson", "Larry Nance Jr.", "Chris Boucher", "IR: Shai Gilgeous-Alexander"]
      }
    ],
    topFive: [
      { player: "Giannis Antetokounmpo", average: "76.6" },
      { player: "Kyrie Irving", average: "67.6" },
      { player: "Bradley Beal", average: "65.8" },
      { player: "Trae Young", average: "60.3" },
      { player: "Brandon Ingram", average: "54.3" }
    ],
    awardsRail: [
      {
        label: "Playoff note",
        value: "Upset in round 1",
        detail: "Went 3-0 against Jubilee Post Jungies in the regular season, then lost 5400-5494 when the bracket started."
      }
    ],
    headToHead: [
      {
        opponent: "Jubilee Post Jungies",
        record: "3-0 regular season, lost playoffs",
        detail: "The clean sweep that still ended in a playoff upset."
      },
      {
        opponent: "Kalubowila Kudaz",
        record: "1-2",
        detail: "Got one off the eventual one seed."
      },
      {
        opponent: "Galle Face Gobayas",
        record: "1-2",
        detail: "Another near-even fight that broke against them late."
      },
      {
        opponent: "Kurunduwatte Warriors",
        record: "1-1",
        detail: "Split the season cleanly."
      },
      {
        opponent: "Eheliyagoda Rising Suns",
        record: "1-2",
        detail: "One of the season series they could not fully pull back."
      }
    ]
  },
  {
    slug: "kurunduwatte-warriors",
    name: "Kurunduwatte Warriors",
    status: "active",
    sport: "NBA",
    body:
      "A .500 side with the league's stingiest defense. They survived the first round and almost pushed all the way through the semis.",
    facts: [
      { label: "Season 1 record", value: "7-7" },
      { label: "Regular-season finish", value: "4th" },
      { label: "Points for", value: "35,831 (4th)" },
      { label: "Points against", value: "34,467 (1st)" },
      { label: "Longest streak", value: "2" }
    ],
    rosterSections: [
      {
        label: "Core",
        players: [
          "Stephen Curry",
          "Ben Simmons",
          "Mike Conley",
          "Jrue Holiday",
          "Malcolm Brogdon",
          "DeMar DeRozan",
          "Andrew Wiggins",
          "Jayson Tatum",
          "Christian Wood",
          "Myles Turner",
          "Nikola Vucevic",
          "Karl-Anthony Towns"
        ]
      },
      {
        label: "Bench",
        players: ["Duncan Robinson", "Draymond Green", "Terrence Ross", "Bogdan Bogdanovic", "Joe Ingles"]
      }
    ],
    topFive: [
      { player: "Stephen Curry", average: "68.3" },
      { player: "Karl-Anthony Towns", average: "67.6" },
      { player: "Nikola Vucevic", average: "64.8" },
      { player: "Jayson Tatum", average: "58.4" },
      { player: "DeMar DeRozan", average: "54.8" }
    ],
    awardsRail: [
      {
        label: "Defensive mark",
        value: "34,467 allowed",
        detail: "Lowest points-against total in Season 1."
      }
    ],
    headToHead: [
      {
        opponent: "Kalubowila Kudaz",
        record: "0-3 regular season, 0-1 playoffs",
        detail: "The one contender they could not solve, including a 22-point semi-final loss."
      },
      {
        opponent: "Eheliyagoda Rising Suns",
        record: "2-1",
        detail: "Won the season series and knocked them out in the opening round."
      },
      {
        opponent: "Jubilee Post Jungies",
        record: "3-0",
        detail: "Handled the lower end of the table cleanly."
      },
      {
        opponent: "Galle Face Gobayas",
        record: "1-2",
        detail: "Could not hold the edge against the eventual champions."
      },
      {
        opponent: "Katunayake Whorenets",
        record: "1-1",
        detail: "A dead-even split."
      }
    ]
  },
  {
    slug: "eheliyagoda-rising-suns",
    name: "Eheliyagoda Rising Suns",
    status: "active",
    sport: "NBA",
    body:
      "Six wins, fifth place, and just enough firepower to stay irritating. They never turned it into a run, but they were not easy to live with.",
    facts: [
      { label: "Season 1 record", value: "6-8" },
      { label: "Regular-season finish", value: "5th" },
      { label: "Points for", value: "35,018 (5th)" },
      { label: "Points against", value: "36,951 (5th)" },
      { label: "Longest streak", value: "1" }
    ],
    rosterSections: [
      {
        label: "Core",
        players: [
          "Russell Westbrook",
          "Terry Rozier",
          "Darius Garland",
          "Devin Booker",
          "Khris Middleton",
          "Evan Fournier",
          "Kevin Durant",
          "OG Anunoby",
          "Zion Williamson",
          "Richaun Holmes",
          "Clint Capela",
          "Jonas Valanciunas"
        ]
      },
      {
        label: "Bench and IR",
        players: ["Derrick White", "Tyler Herro", "Gary Trent Jr.", "Kelly Oubre Jr.", "Montrezl Harrell", "IR: Anthony Davis"]
      }
    ],
    topFive: [
      { player: "Kevin Durant", average: "70.4" },
      { player: "Russell Westbrook", average: "63.9" },
      { player: "Zion Williamson", average: "63.0" },
      { player: "Clint Capela", average: "56.7" },
      { player: "Devin Booker", average: "52.7" }
    ],
    awardsRail: [
      {
        label: "Table note",
        value: "Fifth in both PF and PA",
        detail: "Sat exactly fifth in both scoring and points allowed."
      }
    ],
    headToHead: [
      {
        opponent: "Jubilee Post Jungies",
        record: "3-0",
        detail: "Took care of the bottom side every time."
      },
      {
        opponent: "Katunayake Whorenets",
        record: "2-1",
        detail: "One of the few places they held a real edge."
      },
      {
        opponent: "Galle Face Gobayas",
        record: "0-3",
        detail: "Could not crack the eventual champions."
      },
      {
        opponent: "Kalubowila Kudaz",
        record: "0-2",
        detail: "Never got the one seed."
      },
      {
        opponent: "Kurunduwatte Warriors",
        record: "1-2",
        detail: "Came up short in a close season series."
      }
    ]
  },
  {
    slug: "jubilee-post-jungies",
    name: "Jubilee Post Jungies",
    status: "active",
    sport: "NBA",
    body:
      "The first winless franchise, but not a useless one. They carried the league's first real bracket upset and earned a permanent place in the archive.",
    facts: [
      { label: "Season 1 record", value: "0-14" },
      { label: "Regular-season finish", value: "6th" },
      { label: "Points for", value: "29,100 (6th)" },
      { label: "Points against", value: "37,267 (6th)" },
      { label: "Longest streak", value: "-" }
    ],
    rosterSections: [
      {
        label: "Core",
        players: [
          "John Wall",
          "Kemba Walker",
          "Tyrese Haliburton",
          "CJ McCollum",
          "Victor Oladipo",
          "Buddy Hield",
          "Paul George",
          "Caris LeVert",
          "Pascal Siakam",
          "Chuma Okeke",
          "Andre Drummond",
          "Rudy Gobert"
        ]
      },
      {
        label: "Bench and IR",
        players: ["Donte DiVincenzo", "Joe Harris", "Mikal Bridges", "Thaddeus Young", "Danilo Gallinari", "IR: LeBron James"]
      }
    ],
    topFive: [
      { player: "CJ McCollum", average: "56.8" },
      { player: "Rudy Gobert", average: "55.6" },
      { player: "Paul George", average: "55.3" },
      { player: "Pascal Siakam", average: "52.8" },
      { player: "Andre Drummond", average: "52.0" }
    ],
    awardsRail: [
      {
        label: "Playoff note",
        value: "Round 1 upset",
        detail: "Went 0-14, then immediately knocked out Katunayake Whorenets, 5494-5400."
      }
    ],
    headToHead: [
      {
        opponent: "Katunayake Whorenets",
        record: "0-3 regular season, won playoffs",
        detail: "Lost every regular-season meeting and still beat them when the bracket mattered."
      },
      {
        opponent: "Eheliyagoda Rising Suns",
        record: "0-3",
        detail: "Never solved them in the regular season."
      },
      {
        opponent: "Kalubowila Kudaz",
        record: "0-3",
        detail: "The one seed kept them quiet all year."
      },
      {
        opponent: "Galle Face Gobayas",
        record: "0-2 regular season, 0-1 playoffs",
        detail: "Could not stretch the upset run into a finals push."
      },
      {
        opponent: "Kurunduwatte Warriors",
        record: "0-3",
        detail: "Another clean sweep against them."
      }
    ]
  }
];

const seasonOneAwards = [
  {
    title: "Champion",
    winner: "Galle Face Gobayas",
    detail: "Beat Kalubowila Kudaz 5850-5684 in the finals.",
    type: "title" as const
  },
  {
    title: "Finals MVP",
    winner: "Domantas Sabonis",
    detail: "80.4 fantasy points average in the finals.",
    type: "title" as const
  },
  {
    title: "Season MVP",
    winner: "Nikola Jokic",
    detail: "Most valuable player of the season, from Kalubowila Kudaz.",
    type: "title" as const
  },
  {
    title: "Draft night winner",
    winner: "Randesh Wickrama",
    detail: "Voted award for drafting the best team before trades and free agency.",
    type: "gm" as const
  },
  {
    title: "Unluckiest GM",
    winner: "Isira Harisinghe",
    detail: "Voted award.",
    type: "tone" as const
  },
  {
    title: "Worst GM to talk trades with",
    winner: "Randesh Wickrama",
    detail: "Voted award.",
    type: "tone" as const
  },
  {
    title: "Most cunning GM to talk trades with",
    winner: "Aadhil Shah Jahan & Randesh Wickrama",
    detail: "Shared voted award.",
    type: "tone" as const
  }
];

const seasonOneSummary: NbaSeasonSummary = {
  slug: "season-1-mula",
  label: "Season 1",
  division: "Mula",
  heroTitle: "Season 1 is where the archive becomes real.",
  heroBody:
    "Six franchises, a 14-week regular season, the first playoff bracket, the first champion, and the first set of awards that turned chat memory into league memory.",
  heroFacts: [
    { label: "Division", value: "Mula" },
    { label: "Franchises", value: "6" },
    { label: "Champion", value: "Galle Face Gobayas" },
    { label: "Season MVP", value: "Nikola Jokic" }
  ],
  sourceNote: {
    importedFrom: "Instagram carousel screenshots shared by the founder",
    confidence: "High for standings, bracket, champion, MVPs, franchise playoff snapshots, and selected room awards.",
    included: [
      "Regular season standings",
      "Points for and points against",
      "Longest win streak",
      "Playoff bracket and round results",
      "Champion, Finals MVP, and season MVP",
      "Final playoff roster snapshots",
      "Top five heading into the playoffs",
      "Selected GM and tone awards"
    ],
    missing: [
      "Bound GM ownership to each franchise",
      "Cash or prize records",
      "Computed head-to-heads from raw rows instead of first-pass summaries"
    ]
  },
  standings: seasonOneStandings.map((row) => ({ ...row })),
  playoffRounds: [
    {
      round: "Round 1",
      matchup: "Katunayake Whorenets vs Jubilee Post Jungies",
      result: "5400 - 5494",
      winner: "Jubilee Post Jungies",
      note: "The first upset. Katunayake had swept the regular-season series 3-0."
    },
    {
      round: "Round 1",
      matchup: "Kurunduwatte Warriors vs Eheliyagoda Rising Suns",
      result: "6192 - 6049",
      winner: "Kurunduwatte Warriors",
      note: "Kurunduwatte survived the opening round and carried the best defensive mark in the league."
    },
    {
      round: "Semi-final",
      matchup: "Kalubowila Kudaz vs Kurunduwatte Warriors",
      result: "6111 - 6089",
      winner: "Kalubowila Kudaz",
      note: "Only 22 points separated them."
    },
    {
      round: "Semi-final",
      matchup: "Galle Face Gobayas vs Jubilee Post Jungies",
      result: "6136 - 5349",
      winner: "Galle Face Gobayas",
      note: "The winless regular-season side could not extend the upset run."
    },
    {
      round: "Final",
      matchup: "Galle Face Gobayas vs Kalubowila Kudaz",
      result: "5850 - 5684",
      winner: "Galle Face Gobayas",
      note: "The first title game fixed the first real hierarchy fight in place."
    }
  ],
  awards: seasonOneAwards
};

const seasonTwoStandings = [
  {
    rank: 1,
    franchiseSlug: "galle-face-gobayas",
    franchiseName: "Galle Face Gobayas",
    record: "11-3",
    winPct: ".786",
    pointsFor: "31,275",
    pointsAgainst: "25,780",
    longestWinStreak: "8"
  },
  {
    rank: 2,
    franchiseSlug: "kalubowila-kudaz",
    franchiseName: "Kalubowila Kudaz",
    record: "11-3",
    winPct: ".786",
    pointsFor: "31,199",
    pointsAgainst: "25,421",
    longestWinStreak: "5"
  },
  {
    rank: 3,
    franchiseSlug: "eheliyagoda-rising-suns",
    franchiseName: "Eheliyagoda Rising Suns",
    record: "11-3",
    winPct: ".786",
    pointsFor: "28,888",
    pointsAgainst: "25,434",
    longestWinStreak: "6"
  },
  {
    rank: 4,
    franchiseSlug: "wattala-willywankas",
    franchiseName: "Wattala WillyWankas",
    record: "10-4",
    winPct: ".714",
    pointsFor: "26,558",
    pointsAgainst: "25,574",
    longestWinStreak: "4"
  },
  {
    rank: 5,
    franchiseSlug: "battaramulla-baathala-cokkas",
    franchiseName: "Battaramulla Baathala Cokkas",
    record: "7-7",
    winPct: ".500",
    pointsFor: "26,558",
    pointsAgainst: "27,479",
    longestWinStreak: "3"
  },
  {
    rank: 6,
    franchiseSlug: "bomiriya-bebaddhas",
    franchiseName: "Bomiriya Bebaddhas",
    record: "5-9",
    winPct: ".357",
    pointsFor: "23,541",
    pointsAgainst: "26,507",
    longestWinStreak: "2"
  },
  {
    rank: 7,
    franchiseSlug: "pepiliyana-ponzis",
    franchiseName: "Pepiliyana Ponzis",
    record: "5-9",
    winPct: ".357",
    pointsFor: "23,536",
    pointsAgainst: "25,273",
    longestWinStreak: "2"
  },
  {
    rank: 8,
    franchiseSlug: "katunayake-whorenets",
    franchiseName: "Katunayake Whorenets",
    record: "4-10",
    winPct: ".286",
    pointsFor: "24,803",
    pointsAgainst: "27,746",
    longestWinStreak: "2"
  },
  {
    rank: 9,
    franchiseSlug: "mount-patta-thunder",
    franchiseName: "Mount Patta Thunder",
    record: "3-11",
    winPct: ".214",
    pointsFor: "22,658",
    pointsAgainst: "26,897",
    longestWinStreak: "1"
  },
  {
    rank: 10,
    franchiseSlug: "mount-lavinia-mavericks",
    franchiseName: "Mount Lavinia Mavericks",
    record: "3-11",
    winPct: ".214",
    pointsFor: "22,051",
    pointsAgainst: "24,986",
    longestWinStreak: "2"
  }
] as const;

const seasonTwoAwards = [
  {
    title: "Champion",
    winner: "Galle Face Gobayas",
    detail: "Beat Kalubowila Kudaz 5285-4768 in the finals.",
    type: "title" as const
  },
  {
    title: "Finals MVP",
    winner: "Kevin Durant",
    detail: "70.0 fantasy points average in the finals.",
    type: "title" as const
  },
  {
    title: "Most Valuable Player",
    winner: "Nikola Jokic",
    detail: "Most overall points across the season, for Katunayake Whorenets.",
    type: "title" as const
  },
  {
    title: "Best Free Agency Pickup",
    winner: "Evan Mobley",
    detail: "Battaramulla Baathala Cokkas. Best undrafted player.",
    type: "gm" as const
  },
  {
    title: "Best Value For Money Draft",
    winner: "Darius Garland",
    detail: "Galle Face Gobayas. $12, 3724 FP, 55.6 AVG.",
    type: "gm" as const
  },
  {
    title: "Diamond In The Rough",
    winner: "Jordan Poole",
    detail: "Drafted by Gobayas. Breakout drafted player.",
    type: "gm" as const
  },
  {
    title: "Worst Drafted Player",
    winner: "Kendrick Nunn",
    detail: "Mount Lavinia Mavericks.",
    type: "tone" as const
  },
  {
    title: "Biggest Flopped Star",
    winner: "Zion Williamson",
    detail: "Pepiliyana Ponzis.",
    type: "tone" as const
  },
  {
    title: "Most Unreasonable GM To Talk Trades With",
    winner: "Chevaan Wickremasinghe",
    detail: "Voted award.",
    type: "tone" as const
  },
  {
    title: "Worst GM To Talk Trades With",
    winner: "Kisal Wijesooriya",
    detail: "Voted award.",
    type: "tone" as const
  },
  {
    title: "Unluckiest GM of The Year",
    winner: "Vidhaan Chand",
    detail: "Voted award.",
    type: "tone" as const
  },
  {
    title: "Most Cunning GM To Talk Trades With",
    winner: "Aadhil Shah Jahan",
    detail: "Voted award.",
    type: "gm" as const
  },
  {
    title: "Draft Night Winner",
    winner: "Aadhil Shah Jahan",
    detail: "Voted award.",
    type: "gm" as const
  },
  {
    title: "Rookie GM of the Year",
    winner: "Krish Prabaharan",
    detail: "Voted award.",
    type: "gm" as const
  },
  {
    title: "GM of the Year",
    winner: "Aadhil Shah Jahan",
    detail: "Voted award.",
    type: "gm" as const
  }
];

const seasonTwoSummary: NbaSeasonSummary = {
  slug: "season-2-mula",
  label: "Season 2",
  division: "Mula",
  heroTitle: "Season 2 is where the archive widens from proof to system.",
  heroBody:
    "Ten franchises, play-ins, quarter-finals, semi-finals, a repeat final, and a second Gobayas title. This is where the archive stops looking accidental.",
  heroFacts: [
    { label: "Division", value: "Mula" },
    { label: "Franchises", value: "10" },
    { label: "Champion", value: "Galle Face Gobayas" },
    { label: "Season MVP", value: "Nikola Jokic" }
  ],
  sourceNote: {
    importedFrom: "Instagram carousel posts shared by the founder",
    confidence: "High for standings, weekly results, playoff bracket, playoff rosters, top-fives, champion, finals MVP, season MVP, and posted voted awards.",
    included: [
      "Regular season standings",
      "Points for and points against",
      "Longest win streak",
      "Weekly regular-season match results",
      "Play-ins, quarter-finals, semi-finals, and finals",
      "Champion, Finals MVP, and season MVP",
      "Playoff roster snapshots",
      "Top five heading into the playoffs",
      "Posted trade, pickup, draft, and GM awards"
    ],
    missing: [
      "Bound GM ownership to every franchise",
      "Cash or prize records",
      "Clean franchise-to-member identity map"
    ]
  },
  standings: seasonTwoStandings.map((row) => ({ ...row })),
  playoffRounds: [
    {
      round: "Play-in",
      matchup: "Pepiliyana Ponzis vs Mount Lavinia Mavericks",
      result: "4287 - 3883",
      winner: "Pepiliyana Ponzis",
      note: "The seven seed held serve and moved on."
    },
    {
      round: "Play-in",
      matchup: "Katunayake Whorenets vs Mount Patta Thunder",
      result: "4712 - 2806",
      winner: "Katunayake Whorenets",
      note: "Jokic and Luka powered the eight seed through cleanly."
    },
    {
      round: "Quarter-final",
      matchup: "Galle Face Gobayas vs Katunayake Whorenets",
      result: "5345 - 4964",
      winner: "Galle Face Gobayas",
      note: "Gobayas survived the Jokic-Doncic pairing."
    },
    {
      round: "Quarter-final",
      matchup: "Wattala WillyWankas vs Battaramulla Baathala Cokkas",
      result: "4960 - 4437",
      winner: "Wattala WillyWankas",
      note: "The four seed shut the door on the Giannis-LeBron group."
    },
    {
      round: "Quarter-final",
      matchup: "Eheliyagoda Rising Suns vs Bomiriya Bebaddhas",
      result: "4493 - 4378",
      winner: "Eheliyagoda Rising Suns",
      note: "A narrow first-round escape."
    },
    {
      round: "Quarter-final",
      matchup: "Kalubowila Kudaz vs Pepiliyana Ponzis",
      result: "5505 - 4206",
      winner: "Kalubowila Kudaz",
      note: "Kudaz crushed the surviving play-in side."
    },
    {
      round: "Semi-final",
      matchup: "Galle Face Gobayas vs Wattala WillyWankas",
      result: "4743 - 4583",
      winner: "Galle Face Gobayas",
      note: "Only 160 points separated them."
    },
    {
      round: "Semi-final",
      matchup: "Kalubowila Kudaz vs Eheliyagoda Rising Suns",
      result: "5722 - 4025",
      winner: "Kalubowila Kudaz",
      note: "The other semi was not close."
    },
    {
      round: "Final",
      matchup: "Galle Face Gobayas vs Kalubowila Kudaz",
      result: "5285 - 4768",
      winner: "Galle Face Gobayas",
      note: "The rematch ended the same way: Gobayas took the ring."
    }
  ],
  awards: seasonTwoAwards
};

type NbaGameResult = {
  season: "season-2-mula";
  stage: "regular" | "play-in" | "quarter-final" | "semi-final" | "final";
  franchiseA: string;
  franchiseB: string;
  scoreA: number;
  scoreB: number;
};

const seasonTwoGames: NbaGameResult[] = [
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "kalubowila-kudaz", scoreA: 1620, scoreB: 2124 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "katunayake-whorenets", scoreA: 1840, scoreB: 1567 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "mount-patta-thunder", scoreA: 1780, scoreB: 1433 },
  { season: "season-2-mula", stage: "regular", franchiseA: "battaramulla-baathala-cokkas", franchiseB: "bomiriya-bebaddhas", scoreA: 1806, scoreB: 1366 },
  { season: "season-2-mula", stage: "regular", franchiseA: "pepiliyana-ponzis", franchiseB: "mount-lavinia-mavericks", scoreA: 1282, scoreB: 1141 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "katunayake-whorenets", scoreA: 2485, scoreB: 2148 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "mount-patta-thunder", scoreA: 2349, scoreB: 1745 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "battaramulla-baathala-cokkas", scoreA: 1990, scoreB: 2175 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "mount-lavinia-mavericks", scoreA: 2153, scoreB: 1088 },
  { season: "season-2-mula", stage: "regular", franchiseA: "bomiriya-bebaddhas", franchiseB: "pepiliyana-ponzis", scoreA: 2073, scoreB: 1660 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "battaramulla-baathala-cokkas", scoreA: 2689, scoreB: 2322 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "katunayake-whorenets", scoreA: 2517, scoreB: 1843 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "pepiliyana-ponzis", scoreA: 2038, scoreB: 1685 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "bomiriya-bebaddhas", scoreA: 2379, scoreB: 1613 },
  { season: "season-2-mula", stage: "regular", franchiseA: "mount-patta-thunder", franchiseB: "mount-lavinia-mavericks", scoreA: 1979, scoreB: 1624 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "pepiliyana-ponzis", scoreA: 2256, scoreB: 1720 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "battaramulla-baathala-cokkas", scoreA: 2200, scoreB: 2268 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "wattala-willywankas", scoreA: 2192, scoreB: 2293 },
  { season: "season-2-mula", stage: "regular", franchiseA: "katunayake-whorenets", franchiseB: "mount-patta-thunder", scoreA: 1973, scoreB: 1870 },
  { season: "season-2-mula", stage: "regular", franchiseA: "bomiriya-bebaddhas", franchiseB: "mount-lavinia-mavericks", scoreA: 1661, scoreB: 1656 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "wattala-willywankas", scoreA: 2601, scoreB: 2258 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "pepiliyana-ponzis", scoreA: 2181, scoreB: 1583 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "mount-lavinia-mavericks", scoreA: 1767, scoreB: 1731 },
  { season: "season-2-mula", stage: "regular", franchiseA: "battaramulla-baathala-cokkas", franchiseB: "katunayake-whorenets", scoreA: 2281, scoreB: 1737 },
  { season: "season-2-mula", stage: "regular", franchiseA: "bomiriya-bebaddhas", franchiseB: "mount-patta-thunder", scoreA: 2050, scoreB: 1825 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "mount-lavinia-mavericks", scoreA: 2424, scoreB: 1605 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "wattala-willywankas", scoreA: 1961, scoreB: 2190 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "bomiriya-bebaddhas", scoreA: 2271, scoreB: 1929 },
  { season: "season-2-mula", stage: "regular", franchiseA: "battaramulla-baathala-cokkas", franchiseB: "mount-patta-thunder", scoreA: 1894, scoreB: 1605 },
  { season: "season-2-mula", stage: "regular", franchiseA: "pepiliyana-ponzis", franchiseB: "katunayake-whorenets", scoreA: 1903, scoreB: 1465 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "bomiriya-bebaddhas", scoreA: 2353, scoreB: 1777 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "mount-lavinia-mavericks", scoreA: 1989, scoreB: 1820 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "mount-patta-thunder", scoreA: 1843, scoreB: 1795 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "katunayake-whorenets", scoreA: 2068, scoreB: 2005 },
  { season: "season-2-mula", stage: "regular", franchiseA: "battaramulla-baathala-cokkas", franchiseB: "pepiliyana-ponzis", scoreA: 1751, scoreB: 1669 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "eheliyagoda-rising-suns", scoreA: 2226, scoreB: 2129 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "bomiriya-bebaddhas", scoreA: 2272, scoreB: 1807 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "battaramulla-baathala-cokkas", scoreA: 2099, scoreB: 2297 },
  { season: "season-2-mula", stage: "regular", franchiseA: "pepiliyana-ponzis", franchiseB: "mount-patta-thunder", scoreA: 1747, scoreB: 1766 },
  { season: "season-2-mula", stage: "regular", franchiseA: "katunayake-whorenets", franchiseB: "mount-lavinia-mavericks", scoreA: 1731, scoreB: 2021 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "mount-patta-thunder", scoreA: 2353, scoreB: 1814 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "eheliyagoda-rising-suns", scoreA: 1811, scoreB: 2207 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "pepiliyana-ponzis", scoreA: 1551, scoreB: 1546 },
  { season: "season-2-mula", stage: "regular", franchiseA: "battaramulla-baathala-cokkas", franchiseB: "mount-lavinia-mavericks", scoreA: 1507, scoreB: 1501 },
  { season: "season-2-mula", stage: "regular", franchiseA: "bomiriya-bebaddhas", franchiseB: "katunayake-whorenets", scoreA: 1653, scoreB: 1515 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "kalubowila-kudaz", scoreA: 1710, scoreB: 1856 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "katunayake-whorenets", scoreA: 1818, scoreB: 1033 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "mount-patta-thunder", scoreA: 1380, scoreB: 1002 },
  { season: "season-2-mula", stage: "regular", franchiseA: "battaramulla-baathala-cokkas", franchiseB: "bomiriya-bebaddhas", scoreA: 1583, scoreB: 1181 },
  { season: "season-2-mula", stage: "regular", franchiseA: "pepiliyana-ponzis", franchiseB: "mount-lavinia-mavericks", scoreA: 650, scoreB: 1192 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "katunayake-whorenets", scoreA: 1361, scoreB: 1487 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "mount-patta-thunder", scoreA: 2253, scoreB: 1312 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "battaramulla-baathala-cokkas", scoreA: 2337, scoreB: 1754 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "mount-lavinia-mavericks", scoreA: 1687, scoreB: 1438 },
  { season: "season-2-mula", stage: "regular", franchiseA: "bomiriya-bebaddhas", franchiseB: "pepiliyana-ponzis", scoreA: 1321, scoreB: 1822 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "battaramulla-baathala-cokkas", scoreA: 2032, scoreB: 1649 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "katunayake-whorenets", scoreA: 2706, scoreB: 2029 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "pepiliyana-ponzis", scoreA: 2398, scoreB: 1864 },
  { season: "season-2-mula", stage: "regular", franchiseA: "wattala-willywankas", franchiseB: "bomiriya-bebaddhas", scoreA: 1985, scoreB: 1707 },
  { season: "season-2-mula", stage: "regular", franchiseA: "mount-lavinia-mavericks", franchiseB: "mount-patta-thunder", scoreA: 2040, scoreB: 1645 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "pepiliyana-ponzis", scoreA: 2305, scoreB: 1846 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "battaramulla-baathala-cokkas", scoreA: 2521, scoreB: 1352 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "wattala-willywankas", scoreA: 1831, scoreB: 1690 },
  { season: "season-2-mula", stage: "regular", franchiseA: "katunayake-whorenets", franchiseB: "mount-patta-thunder", scoreA: 1950, scoreB: 1194 },
  { season: "season-2-mula", stage: "regular", franchiseA: "bomiriya-bebaddhas", franchiseB: "mount-lavinia-mavericks", scoreA: 1742, scoreB: 1705 },
  { season: "season-2-mula", stage: "regular", franchiseA: "galle-face-gobayas", franchiseB: "wattala-willywankas", scoreA: 2860, scoreB: 1045 },
  { season: "season-2-mula", stage: "regular", franchiseA: "kalubowila-kudaz", franchiseB: "pepiliyana-ponzis", scoreA: 2459, scoreB: 1935 },
  { season: "season-2-mula", stage: "regular", franchiseA: "eheliyagoda-rising-suns", franchiseB: "mount-lavinia-mavericks", scoreA: 2227, scoreB: 1881 },
  { season: "season-2-mula", stage: "regular", franchiseA: "battaramulla-baathala-cokkas", franchiseB: "katunayake-whorenets", scoreA: 2320, scoreB: 2029 },
  { season: "season-2-mula", stage: "regular", franchiseA: "bomiriya-bebaddhas", franchiseB: "mount-patta-thunder", scoreA: 1661, scoreB: 1673 },
  { season: "season-2-mula", stage: "play-in", franchiseA: "pepiliyana-ponzis", franchiseB: "mount-lavinia-mavericks", scoreA: 4287, scoreB: 3883 },
  { season: "season-2-mula", stage: "play-in", franchiseA: "katunayake-whorenets", franchiseB: "mount-patta-thunder", scoreA: 4712, scoreB: 2806 },
  { season: "season-2-mula", stage: "quarter-final", franchiseA: "galle-face-gobayas", franchiseB: "katunayake-whorenets", scoreA: 5345, scoreB: 4964 },
  { season: "season-2-mula", stage: "quarter-final", franchiseA: "wattala-willywankas", franchiseB: "battaramulla-baathala-cokkas", scoreA: 4960, scoreB: 4437 },
  { season: "season-2-mula", stage: "quarter-final", franchiseA: "eheliyagoda-rising-suns", franchiseB: "bomiriya-bebaddhas", scoreA: 4493, scoreB: 4378 },
  { season: "season-2-mula", stage: "quarter-final", franchiseA: "kalubowila-kudaz", franchiseB: "pepiliyana-ponzis", scoreA: 5505, scoreB: 4206 },
  { season: "season-2-mula", stage: "semi-final", franchiseA: "galle-face-gobayas", franchiseB: "wattala-willywankas", scoreA: 4743, scoreB: 4583 },
  { season: "season-2-mula", stage: "semi-final", franchiseA: "kalubowila-kudaz", franchiseB: "eheliyagoda-rising-suns", scoreA: 5722, scoreB: 4025 },
  { season: "season-2-mula", stage: "final", franchiseA: "galle-face-gobayas", franchiseB: "kalubowila-kudaz", scoreA: 5285, scoreB: 4768 }
];

const seasonTwoFranchises: FranchiseProfileSummary[] = [
  {
    slug: "galle-face-gobayas",
    name: "Galle Face Gobayas",
    status: "active",
    sport: "NBA",
    body: "Back-to-back champions. Season 2 turned the first title into a repeat and established the franchise as the first real dynasty line in the archive.",
    facts: [
      { label: "Season 2 record", value: "11-3" },
      { label: "Regular-season finish", value: "1st" },
      { label: "Points for", value: "31,275 (1st)" },
      { label: "Points against", value: "25,780 (6th)" },
      { label: "Longest streak", value: "8" }
    ],
    rosterSections: [
      { label: "Roster", players: ["Dejounte Murray", "Darius Garland", "Terry Rozier", "Fred VanVleet", "CJ McCollum", "Cade Cunningham", "Kevin Durant", "Kyle Kuzma", "Anthony Davis", "John Collins", "Karl-Anthony Towns", "Rudy Gobert"] },
      { label: "Bench", players: ["Desmond Bane", "Caris LeVert", "Seth Curry", "JaSean Tate", "Chris Boucher"] }
    ],
    topFive: [
      { player: "Kevin Durant", average: "70.5" },
      { player: "Karl-Anthony Towns", average: "65.9" },
      { player: "Dejounte Murray", average: "65.7" },
      { player: "Anthony Davis", average: "65.2" },
      { player: "Rudy Gobert", average: "57.2" }
    ],
    awardsRail: [
      { label: "Champion", value: "Season 2", detail: "Beat Kalubowila Kudaz 5285-4768 in the finals." },
      { label: "Finals MVP", value: "Kevin Durant", detail: "70.0 fantasy points average in the finals." },
      { label: "Best Value For Money Draft", value: "Darius Garland", detail: "$12, 3724 FP, 55.6 AVG." },
      { label: "Diamond In The Rough", value: "Jordan Poole", detail: "Drafted by Gobayas and broke out." }
    ],
    headToHead: []
  },
  {
    slug: "kalubowila-kudaz",
    name: "Kalubowila Kudaz",
    status: "active",
    sport: "NBA",
    body: "Another 11-3 regular season and another finals appearance. Season 2 confirmed Kudaz as the clearest counterweight to Gobayas.",
    facts: [
      { label: "Season 2 record", value: "11-3" },
      { label: "Regular-season finish", value: "2nd" },
      { label: "Points for", value: "31,199 (2nd)" },
      { label: "Points against", value: "25,421 (3rd)" },
      { label: "Longest streak", value: "5" }
    ],
    rosterSections: [
      { label: "Roster", players: ["Ja Morant", "Shai Gilgeous-Alexander", "Cole Anthony", "Tyrese Haliburton", "Tyrese Maxey", "Anthony Edwards", "Brandon Ingram", "Miles Bridges", "Domantas Sabonis", "Pascal Siakam", "Joel Embiid", "Robert Williams III"] },
      { label: "Bench", players: ["Tyler Herro", "Kevin Porter Jr.", "Clint Capela", "Bobby Portis", "Marvin Bagley III"] }
    ],
    topFive: [
      { player: "Joel Embiid", average: "76.0" },
      { player: "Ja Morant", average: "63.4" },
      { player: "Domantas Sabonis", average: "58.5" },
      { player: "Pascal Siakam", average: "57.6" },
      { player: "Shai Gilgeous-Alexander", average: "55.0" }
    ],
    awardsRail: [
      { label: "Final result", value: "Runner-up", detail: "Lost the finals to Galle Face Gobayas, 4768-5285." }
    ],
    headToHead: []
  },
  {
    slug: "eheliyagoda-rising-suns",
    name: "Eheliyagoda Rising Suns",
    status: "active",
    sport: "NBA",
    body: "Season 2 brought a leap to 11-3 and a semi-final berth. The archive now has a real second-era version of the Rising Suns.",
    facts: [
      { label: "Season 2 record", value: "11-3" },
      { label: "Regular-season finish", value: "3rd" },
      { label: "Points for", value: "28,888 (3rd)" },
      { label: "Points against", value: "25,434 (4th)" },
      { label: "Longest streak", value: "6" }
    ],
    rosterSections: [
      { label: "Roster", players: ["Russell Westbrook", "Jrue Holiday", "Josh Giddey", "Bradley Beal", "Klay Thompson", "Jaylen Brown", "Khris Middleton", "Tobias Harris", "Julius Randle", "DeAndre Hunter", "Christian Wood", "Jaren Jackson Jr."] },
      { label: "Bench / IR", players: ["Cory Joseph", "Duncan Robinson", "Royce O'Neal", "Kevin Love", "Kelly Olynyk", "IR: Damian Lillard"] }
    ],
    topFive: [
      { player: "Damian Lillard (IR)", average: "53.6" },
      { player: "Jrue Holiday", average: "52.3" },
      { player: "Bradley Beal", average: "52.0" },
      { player: "Julius Randle", average: "50.3" },
      { player: "Christian Wood", average: "50.1" }
    ],
    awardsRail: [],
    headToHead: []
  },
  {
    slug: "wattala-willywankas",
    name: "Wattala WillyWankas",
    status: "active",
    sport: "NBA",
    body: "A new Season 2 entrant that immediately landed in the top four and reached the semi-finals.",
    facts: [
      { label: "Season 2 record", value: "10-4" },
      { label: "Regular-season finish", value: "4th" },
      { label: "Points for", value: "26,558 (T-4th)" },
      { label: "Points against", value: "25,574 (5th)" },
      { label: "Longest streak", value: "4" }
    ],
    rosterSections: [
      { label: "Roster", players: ["DeAaron Fox", "Derrick White", "Marcus Smart", "James Harden", "Donovan Mitchell", "RJ Barrett", "Lu Dort", "Kelly Oubre", "Cameron Johnson", "Wendell Carter Jr.", "Bam Adebayo", "Myles Turner"] },
      { label: "Bench / IR", players: ["Jalen Suggs", "Herbert Jones", "PJ Tucker", "Alperun Sengun", "Coby White", "IR: Draymond Green"] }
    ],
    topFive: [
      { player: "James Harden", average: "65.2" },
      { player: "Donovan Mitchell", average: "57.5" },
      { player: "Bam Adebayo", average: "55.6" },
      { player: "DeAaron Fox", average: "50.9" },
      { player: "Wendell Carter Jr.", average: "45.0" }
    ],
    awardsRail: [],
    headToHead: []
  },
  {
    slug: "battaramulla-baathala-cokkas",
    name: "Battaramulla Baathala Cokkas",
    status: "active",
    sport: "NBA",
    body: "Season 2 gave the Cokkas a 7-7 record, a quarter-final place, and the clearest free-agency win in the award set.",
    facts: [
      { label: "Season 2 record", value: "7-7" },
      { label: "Regular-season finish", value: "5th" },
      { label: "Points for", value: "26,558 (T-4th)" },
      { label: "Points against", value: "27,479 (9th)" },
      { label: "Longest streak", value: "3" }
    ],
    rosterSections: [
      { label: "Roster", players: ["Stephen Curry", "LeBron James", "Devonte Graham", "DeMar DeRozan", "Will Barton", "Chris Duarte", "Harrison Barnes", "Darius Bazley", "Giannis Antetokounmpo", "LaMarcus Aldridge", "Kristaps Porzingis", "Jusuf Nurkic"] },
      { label: "Bench", players: ["Terrence Ross", "Michael Beasley", "Cedi Osman", "Jarred Vanderbilt", "JaVale McGee"] }
    ],
    topFive: [
      { player: "Giannis Antetokounmpo", average: "78.3" },
      { player: "LeBron James", average: "74.9" },
      { player: "DeMar DeRozan", average: "61.1" },
      { player: "Stephen Curry", average: "60.8" },
      { player: "Kristaps Porzingis", average: "50.9" }
    ],
    awardsRail: [
      { label: "Best Free Agency Pickup", value: "Evan Mobley", detail: "Best undrafted player in Season 2." }
    ],
    headToHead: []
  },
  {
    slug: "bomiriya-bebaddhas",
    name: "Bomiriya Bebaddhas",
    status: "active",
    sport: "NBA",
    body: "A fifth-place-adjacent Season 2 side that stayed competitive enough to make the quarter-final bracket.",
    facts: [
      { label: "Season 2 record", value: "5-9" },
      { label: "Regular-season finish", value: "6th" },
      { label: "Points for", value: "23,541 (6th)" },
      { label: "Points against", value: "26,507 (7th)" },
      { label: "Longest streak", value: "2" }
    ],
    rosterSections: [
      { label: "Roster", players: ["Trae Young", "Kyle Lowry", "Malcolm Brogdon", "Josh Hart", "Buddy Hield", "Jordan Clarkson", "Gordon Hayward", "OG Anunoby", "Keldon Johnson", "Evan Mobley", "Jonas Valanciunas", "DeAndre Ayton"] },
      { label: "Bench", players: ["Bogdan Bogdanovic", "Jeremy Lamb", "Dorian Finney-Smith", "Devin Vassell", "Ivica Zubac"] }
    ],
    topFive: [
      { player: "Trae Young", average: "67.1" },
      { player: "Jonas Valanciunas", average: "52.2" },
      { player: "DeAndre Ayton", average: "48.6" },
      { player: "Malcolm Brogdon", average: "47.9" },
      { player: "Evan Mobley", average: "45.1" }
    ],
    awardsRail: [],
    headToHead: []
  },
  {
    slug: "pepiliyana-ponzis",
    name: "Pepiliyana Ponzis",
    status: "active",
    sport: "NBA",
    body: "The Ponzis fought through the play-in but never made the deeper run. Season 2 still gave them a full competitive footprint and one very visible flop award.",
    facts: [
      { label: "Season 2 record", value: "5-9" },
      { label: "Regular-season finish", value: "7th" },
      { label: "Points for", value: "23,536 (7th)" },
      { label: "Points against", value: "25,273 (2nd)" },
      { label: "Longest streak", value: "2" }
    ],
    rosterSections: [
      { label: "Roster", players: ["LaMelo Ball", "Mike Conley", "D'Angelo Russell", "Spencer Dinwiddie", "Norman Powell", "Jalen Green", "Gary Trent Jr.", "Jerami Grant", "Frank Wagner", "Aaron Gordon", "Nikola Vucevic", "Jakob Poeltl"] },
      { label: "Bench", players: ["Patty Mills", "Justin Holiday", "Caleb Martin", "Pat Connaughton", "Brandon Clarke"] }
    ],
    topFive: [
      { player: "LaMelo Ball", average: "56.4" },
      { player: "Nikola Vucevic", average: "53.0" },
      { player: "Jakob Poeltl", average: "48.3" },
      { player: "D'Angelo Russell", average: "46.1" },
      { player: "Jerami Grant", average: "44.0" }
    ],
    awardsRail: [
      { label: "Biggest Flopped Star", value: "Zion Williamson", detail: "Player expected to have a good season but flopped." }
    ],
    headToHead: []
  },
  {
    slug: "katunayake-whorenets",
    name: "Katunayake Whorenets",
    status: "active",
    sport: "NBA",
    body: "A rough 4-10 regular season still carried the season MVP and a play-in win. Season 2 kept the Whorenets dangerous even when the table did not flatter them.",
    facts: [
      { label: "Season 2 record", value: "4-10" },
      { label: "Regular-season finish", value: "8th" },
      { label: "Points for", value: "24,803 (5th)" },
      { label: "Points against", value: "27,746 (10th)" },
      { label: "Longest streak", value: "2" }
    ],
    rosterSections: [
      { label: "Roster", players: ["Luka Doncic", "Chris Paul", "Anfernee Simons", "Jordan Poole", "Alec Burks", "Malik Monk", "Jimmy Butler", "Kentavious Caldwell-Pope", "Scottie Barnes", "Montrezl Harrell", "Nikola Jokic", "Mitchell Robinson"] },
      { label: "Bench", players: ["Eric Gordon", "Gary Harris", "Chuma Okeke", "Eric Bledsoe", "Isaiah Stewart"] }
    ],
    topFive: [
      { player: "Nikola Jokic", average: "81.5" },
      { player: "Luka Doncic", average: "69.9" },
      { player: "Jimmy Butler", average: "57.7" },
      { player: "Chris Paul", average: "55.1" },
      { player: "Scottie Barnes", average: "44.8" }
    ],
    awardsRail: [
      { label: "Most Valuable Player", value: "Nikola Jokic", detail: "Most overall points across the season." }
    ],
    headToHead: []
  },
  {
    slug: "mount-patta-thunder",
    name: "Mount Patta Thunder",
    status: "active",
    sport: "NBA",
    body: "The Thunder finished ninth, reached the play-in, and stayed alive through a real stars-and-volume lineup.",
    facts: [
      { label: "Season 2 record", value: "3-11" },
      { label: "Regular-season finish", value: "9th" },
      { label: "Points for", value: "22,658 (8th)" },
      { label: "Points against", value: "26,897 (8th)" },
      { label: "Longest streak", value: "1" }
    ],
    rosterSections: [
      { label: "Roster", players: ["Dennis Schroder", "Reggie Jackson", "Devin Booker", "Paul George", "Tim Hardaway Jr.", "Garrison Mathews", "Jayson Tatum", "Lauri Markannen", "Marcus Morris Sr.", "Bojan Bogdanovic", "Steven Adams", "Al Horford"] },
      { label: "Bench", players: ["Nicolas Batum", "Nic Claxton", "Daniel Gafford", "Carmelo Anthony"] }
    ],
    topFive: [
      { player: "Jayson Tatum", average: "61.6" },
      { player: "Devin Booker", average: "59.6" },
      { player: "Paul George", average: "57.2" },
      { player: "Al Horford", average: "38.7" },
      { player: "Reggie Jackson", average: "36.8" }
    ],
    awardsRail: [],
    headToHead: []
  },
  {
    slug: "mount-lavinia-mavericks",
    name: "Mount Lavinia Mavericks",
    status: "active",
    sport: "NBA",
    body: "The Mavericks finished last in record but first in points against, which makes them one of the stranger Season 2 archive shapes already.",
    facts: [
      { label: "Season 2 record", value: "3-11" },
      { label: "Regular-season finish", value: "10th" },
      { label: "Points for", value: "22,051 (9th)" },
      { label: "Points against", value: "24,986 (1st)" },
      { label: "Longest streak", value: "2" }
    ],
    rosterSections: [
      { label: "Roster", players: ["Patrick Beverley", "Monte Morris", "Kyrie Irving", "Jalen Brunson", "Zach LaVine", "Andrew Wiggins", "Mikal Bridges", "Saddiq Bey", "Robert Covington", "Danilo Gallinari", "Jarrett Allen", "Mo Bamba"] },
      { label: "Bench", players: ["Luke Kennard", "Evan Fournier", "Kevin Huerter", "PJ Washington", "Kevon Looney"] }
    ],
    topFive: [
      { player: "Kyrie Irving", average: "65.0" },
      { player: "Zach LaVine", average: "52.5" },
      { player: "Jarrett Allen", average: "52.1" },
      { player: "Andrew Wiggins", average: "41.1" },
      { player: "Jalen Brunson", average: "40.9" }
    ],
    awardsRail: [
      { label: "Worst Drafted Player", value: "Kendrick Nunn", detail: "Season 2 voted award." }
    ],
    headToHead: []
  }
];

const importedSeasons = [seasonOneSummary, seasonTwoSummary] as const;
const importedStandings = [seasonOneStandings, seasonTwoStandings] as const;
const importedFranchiseSnapshots = [...seasonOneFranchises, ...seasonTwoFranchises];
const importedAwards = [...seasonOneAwards, ...seasonTwoAwards];

type RivalryAggregate = {
  slugA: string;
  nameA: string;
  slugB: string;
  nameB: string;
  regularWinsA: number;
  regularWinsB: number;
  playoffWinsA: number;
  playoffWinsB: number;
};

function getPairKey(slugA: string, slugB: string) {
  return [slugA, slugB].sort().join("__");
}

function ensureRivalryAggregate(
  map: Map<string, RivalryAggregate>,
  franchiseA: { slug: string; name: string },
  franchiseB: { slug: string; name: string }
) {
  const pair = [franchiseA, franchiseB].sort((left, right) => left.slug.localeCompare(right.slug));
  const key = `${pair[0].slug}__${pair[1].slug}`;
  const existing = map.get(key);

  if (existing) {
    return existing;
  }

  const created: RivalryAggregate = {
    slugA: pair[0].slug,
    nameA: pair[0].name,
    slugB: pair[1].slug,
    nameB: pair[1].name,
    regularWinsA: 0,
    regularWinsB: 0,
    playoffWinsA: 0,
    playoffWinsB: 0
  };

  map.set(key, created);
  return created;
}

function addStructuredHeadToHead(
  aggregate: RivalryAggregate,
  perspectiveSlug: string,
  regularWins: number,
  regularLosses: number,
  playoffWins: number,
  playoffLosses: number
) {
  if (aggregate.slugA === perspectiveSlug) {
    aggregate.regularWinsA += regularWins;
    aggregate.regularWinsB += regularLosses;
    aggregate.playoffWinsA += playoffWins;
    aggregate.playoffWinsB += playoffLosses;
    return;
  }

  aggregate.regularWinsB += regularWins;
  aggregate.regularWinsA += regularLosses;
  aggregate.playoffWinsB += playoffWins;
  aggregate.playoffWinsA += playoffLosses;
}

function parseHistoricalHeadToHead(record: string) {
  const regularSeason = record.match(/(\d+)-(\d+)\s+regular season/i);
  const playoffs = record.match(/(\d+)-(\d+)\s+playoffs/i);
  const bareRecord = record.match(/^(\d+)-(\d+)$/);
  const regularWins = regularSeason ? Number(regularSeason[1]) : bareRecord ? Number(bareRecord[1]) : 0;
  const regularLosses = regularSeason ? Number(regularSeason[2]) : bareRecord ? Number(bareRecord[2]) : 0;
  const playoffWins = playoffs ? Number(playoffs[1]) : /won finals|won playoffs/i.test(record) ? 1 : 0;
  const playoffLosses = playoffs ? Number(playoffs[2]) : /lost finals|lost playoffs/i.test(record) ? 1 : 0;

  return { regularWins, regularLosses, playoffWins, playoffLosses };
}

function buildRivalryAggregateMap() {
  const map = new Map<string, RivalryAggregate>();

  seasonOneFranchises.forEach((franchise) => {
    franchise.headToHead.forEach((entry) => {
      const opponent = seasonOneFranchises.find((candidate) => candidate.name === entry.opponent);

      if (!opponent || franchise.slug > opponent.slug) {
        return;
      }

      const aggregate = ensureRivalryAggregate(
        map,
        { slug: franchise.slug, name: franchise.name },
        { slug: opponent.slug, name: opponent.name }
      );
      const parsed = parseHistoricalHeadToHead(entry.record);
      addStructuredHeadToHead(
        aggregate,
        franchise.slug,
        parsed.regularWins,
        parsed.regularLosses,
        parsed.playoffWins,
        parsed.playoffLosses
      );
    });
  });

  seasonTwoGames.forEach((game) => {
    const franchiseAName =
      seasonTwoStandings.find((entry) => entry.franchiseSlug === game.franchiseA)?.franchiseName ??
      game.franchiseA;
    const franchiseBName =
      seasonTwoStandings.find((entry) => entry.franchiseSlug === game.franchiseB)?.franchiseName ??
      game.franchiseB;
    const aggregate = ensureRivalryAggregate(
      map,
      { slug: game.franchiseA, name: franchiseAName },
      { slug: game.franchiseB, name: franchiseBName }
    );
    const isRegularSeason = game.stage === "regular";
    const aWins = game.scoreA > game.scoreB ? 1 : 0;
    const bWins = game.scoreB > game.scoreA ? 1 : 0;

    if (aggregate.slugA === game.franchiseA) {
      if (isRegularSeason) {
        aggregate.regularWinsA += aWins;
        aggregate.regularWinsB += bWins;
      } else {
        aggregate.playoffWinsA += aWins;
        aggregate.playoffWinsB += bWins;
      }
    } else if (isRegularSeason) {
      aggregate.regularWinsA += bWins;
      aggregate.regularWinsB += aWins;
    } else {
      aggregate.playoffWinsA += bWins;
      aggregate.playoffWinsB += aWins;
    }
  });

  return map;
}

function formatHeadToHeadRecord(entry: RivalryAggregate, perspectiveSlug: string) {
  const isA = perspectiveSlug === entry.slugA;
  const regularWins = isA ? entry.regularWinsA : entry.regularWinsB;
  const regularLosses = isA ? entry.regularWinsB : entry.regularWinsA;
  const playoffWins = isA ? entry.playoffWinsA : entry.playoffWinsB;
  const playoffLosses = isA ? entry.playoffWinsB : entry.playoffWinsA;
  const parts: string[] = [];

  if (regularWins + regularLosses > 0) {
    parts.push(`${regularWins}-${regularLosses} regular season`);
  }

  if (playoffWins + playoffLosses > 0) {
    parts.push(`${playoffWins}-${playoffLosses} playoffs`);
  }

  return parts.join(", ");
}

function formatHeadToHeadDetail(entry: RivalryAggregate) {
  if (entry.playoffWinsA + entry.playoffWinsB > 0) {
    return "Regular season and playoff meetings are both imported.";
  }

  return "Regular-season meetings imported.";
}

const rivalryAggregateMap = buildRivalryAggregateMap();

function buildMergedFranchiseMap() {
  const map = new Map<string, FranchiseProfileSummary>();
  const standingsBySlug = new Map<string, Array<(typeof seasonOneStandings)[number] | (typeof seasonTwoStandings)[number]>>();

  importedStandings.forEach((table) => {
    table.forEach((row) => {
      const existing = standingsBySlug.get(row.franchiseSlug) ?? [];
      existing.push(row);
      standingsBySlug.set(row.franchiseSlug, existing);
    });
  });

  importedFranchiseSnapshots.forEach((snapshot) => {
    const existing = map.get(snapshot.slug);
    const rivalryRows = [...rivalryAggregateMap.values()]
      .filter((entry) => entry.slugA === snapshot.slug || entry.slugB === snapshot.slug)
      .map((entry) => ({
        opponent: entry.slugA === snapshot.slug ? entry.nameB : entry.nameA,
        record: formatHeadToHeadRecord(entry, snapshot.slug),
        detail: formatHeadToHeadDetail(entry)
      }))
      .sort((left, right) => left.opponent.localeCompare(right.opponent));

    if (!existing) {
      const rows = standingsBySlug.get(snapshot.slug) ?? [];
      const championships = importedSeasons.filter((season) =>
        season.awards.some((award) => award.title === "Champion" && award.winner === snapshot.name)
      ).length;
      const finalsAppearances = importedSeasons.filter((season) =>
        season.playoffRounds.some((round) => round.round === "Final" && round.matchup.includes(snapshot.name))
      ).length;

      map.set(snapshot.slug, {
        ...snapshot,
        facts: [
          { label: "Imported seasons", value: String(rows.length || 1) },
          ...snapshot.facts,
          { label: "Championships", value: String(championships) },
          { label: "Finals appearances", value: String(finalsAppearances) }
        ],
        headToHead: rivalryRows
      });
      return;
    }

    const mergedAwards = [...existing.awardsRail];
    snapshot.awardsRail.forEach((award) => {
      if (!mergedAwards.some((entry) => entry.label === award.label && entry.value === award.value)) {
        mergedAwards.push(award);
      }
    });

    map.set(snapshot.slug, {
      ...existing,
      body: snapshot.body,
      facts: existing.facts,
      rosterSections: snapshot.rosterSections,
      topFive: snapshot.topFive,
      awardsRail: mergedAwards,
      headToHead: rivalryRows
    });
  });

  return Object.fromEntries(map.entries()) as Record<string, FranchiseProfileSummary>;
}

const franchiseMap = buildMergedFranchiseMap();

const franchiseDirectory: ArchiveDirectoryEntry[] = Object.values(franchiseMap)
  .map((franchise) => ({
    slug: franchise.slug,
    name: franchise.name,
    status: franchise.status,
    steward: "Owner import next",
    era:
      franchise.facts.find((fact) => fact.label === "Imported seasons")?.value === "1"
        ? "Single imported season"
        : "Multi-season archive",
    seasonRecord:
      franchise.facts.find((fact) => fact.label === "Season 2 record")?.value ??
      franchise.facts.find((fact) => fact.label === "Season 1 record")?.value,
    seasonFinish: franchise.facts.find((fact) => fact.label === "Regular-season finish")?.value,
    seasonMarker:
      franchise.awardsRail.some((award) => award.label === "Champion")
        ? "Champion"
        : franchise.awardsRail.some((award) => award.label === "Final result" && award.value === "Runner-up")
          ? "Finalist"
          : "Imported",
    note: franchise.body
  }))
  .sort((left, right) => left.name.localeCompare(right.name));

const seasonAliasMap: Record<string, NbaSeasonSummary> = {
  "season-1-mula": seasonOneSummary,
  "season-1-division-a": seasonOneSummary,
  "season-2-mula": seasonTwoSummary
};

const archiveMemberDirectory: ArchiveMemberDirectoryEntry[] = [
  {
    slug: "aadhil-shah-jahan",
    name: "Aadhil Shah Jahan",
    body: "Season 1 archive recipient who turns into the first clearly multi-season GM awards figure once Season 2 lands."
  },
  {
    slug: "randesh-wickrama",
    name: "Randesh Wickrama",
    body: "Season 1 archive figure with the heaviest early award footprint: draft night winner, worst trade talks, and shared cunning-GM honors."
  },
  {
    slug: "isira-harisinghe",
    name: "Isira Harisinghe",
    body: "Season 1 archive recipient for the first unluckiest-GM award."
  },
  {
    slug: "chevaan-wickremasinghe",
    name: "Chevaan Wickremasinghe",
    body: "Season 2 archive recipient for the room’s most unreasonable trade-table award."
  },
  {
    slug: "kisal-wijesooriya",
    name: "Kisal Wijesooriya",
    body: "Season 2 archive recipient for the worst-GM-to-talk-trades-with rail."
  },
  {
    slug: "vidhaan-chand",
    name: "Vidhaan Chand",
    body: "Season 2 archive recipient for the unluckiest-GM award."
  },
  {
    slug: "krish-prabaharan",
    name: "Krish Prabaharan",
    body: "Season 2 archive recipient for rookie GM of the year."
  }
];

const memberProfileMap: Record<string, MemberProfileSummary> = {
  "aadhil-shah-jahan": {
    name: "Aadhil Shah Jahan",
    body:
      "This is one of the first real archive people pages. The franchise layer is still being bound, but Season 1 already proves that person-level law belongs in the product too.",
    franchises: [
      {
        sport: "NBA",
        slot: "Season 1 Mula franchise",
        detail: "Ownership is not yet fully mapped from source material, so the person-to-team binding stays explicit about what is still unresolved."
      },
      {
        sport: "F1",
        slot: "Cross-sport slot",
        detail: "Reserved so one member can hold multiple franchise identities once the wider archive lands."
      }
    ],
    facts: [
      { label: "Known archive receipts", value: "4" },
      { label: "Season range", value: "Seasons 1-2" },
      { label: "Franchise binding", value: "Still resolving" },
      { label: "Cross-sport shape", value: "Supported" }
    ],
    currentStage: "Multi-season GM archive fixture",
    awardsRail: [
      {
        label: "Most cunning GM to talk trades with",
        value: "Season 1 shared winner",
        detail: "Shared with Randesh Wickrama in the first voted tone-award rail."
      },
      {
        label: "Most cunning GM to talk trades with",
        value: "Season 2",
        detail: "Returned as the outright winner in the second imported season."
      },
      {
        label: "Draft Night Winner",
        value: "Season 2",
        detail: "Voted award."
      },
      {
        label: "GM of the Year",
        value: "Season 2",
        detail: "Voted award for the final-four GM who impressed most."
      }
    ]
  },
  "randesh-wickrama": {
    name: "Randesh Wickrama",
    body:
      "Season 1 already puts a real shape around this profile. Even before the full franchise map lands, the archive knows this member as one of the first heavily decorated GM personalities.",
    franchises: [
      {
        sport: "NBA",
        slot: "Season 1 Mula franchise",
        detail: "The exact franchise link is still awaiting owner mapping, but the award trail is already concrete."
      },
      {
        sport: "F1",
        slot: "Cross-sport slot",
        detail: "Kept open so the profile can widen instead of getting trapped in one sport."
      }
    ],
    facts: [
      { label: "Known archive receipts", value: "3" },
      { label: "Season 1 state", value: "Most decorated GM rail" },
      { label: "Franchise binding", value: "Still resolving" },
      { label: "Cross-sport shape", value: "Supported" }
    ],
    currentStage: "Season 1 GM archive fixture",
    awardsRail: [
      {
        label: "Draft night winner",
        value: "Season 1",
        detail: "Voted award for drafting the best team before trades and free agency."
      },
      {
        label: "Worst GM to talk trades with",
        value: "Season 1",
        detail: "Voted tone award."
      },
      {
        label: "Most cunning GM to talk trades with",
        value: "Shared winner",
        detail: "Shared with Aadhil Shah Jahan."
      }
    ]
  },
  "isira-harisinghe": {
    name: "Isira Harisinghe",
    body:
      "The archive should preserve bad variance too. This profile exists because Season 1 recorded the room’s judgment, not just the clean statistical layer.",
    franchises: [
      {
        sport: "NBA",
        slot: "Season 1 Mula franchise",
        detail: "Ownership still needs to be mapped explicitly from source material."
      },
      {
        sport: "F1",
        slot: "Cross-sport slot",
        detail: "Reserved so later sports can attach cleanly without rethinking the profile structure."
      }
    ],
    facts: [
      { label: "Known archive receipt", value: "Unluckiest GM" },
      { label: "Season 1 state", value: "Tone rail preserved" },
      { label: "Franchise binding", value: "Still resolving" },
      { label: "Cross-sport shape", value: "Supported" }
    ],
    currentStage: "Season 1 tone-award recipient",
    awardsRail: [
      {
        label: "Unluckiest GM of the season",
        value: "Season 1",
        detail: "Voted award preserved as part of the cultural layer, not flattened away as noise."
      },
      {
        label: "Profile role",
        value: "Variance receipt",
        detail: "This page proves the archive keeps the room’s memory, not only final standings."
      },
      {
        label: "Next import",
        value: "Franchise ownership",
        detail: "The next step is binding this member to the correct team history once owner mapping lands."
      }
    ]
  },
  "chevaan-wickremasinghe": {
    name: "Chevaan Wickremasinghe",
    body:
      "Season 2 gives this profile a clear social-law receipt. The archive should preserve how the room judged trade behavior, not only standings.",
    franchises: [
      {
        sport: "NBA",
        slot: "Season 2 Mula franchise",
        detail: "Franchise ownership is still unresolved at the source layer."
      }
    ],
    facts: [
      { label: "Known archive receipt", value: "Most unreasonable GM" },
      { label: "Season range", value: "Season 2" },
      { label: "Franchise binding", value: "Still resolving" },
      { label: "Archive state", value: "Person-level receipt live" }
    ],
    currentStage: "Season 2 tone-award recipient",
    awardsRail: [
      {
        label: "Most Unreasonable GM To Talk Trades With",
        value: "Season 2",
        detail: "Voted award."
      }
    ]
  },
  "kisal-wijesooriya": {
    name: "Kisal Wijesooriya",
    body:
      "The archive keeps the room’s negative judgments too. This profile exists because those awards are part of the actual memory of the season.",
    franchises: [
      {
        sport: "NBA",
        slot: "Season 2 Mula franchise",
        detail: "Franchise ownership is still unresolved at the source layer."
      }
    ],
    facts: [
      { label: "Known archive receipt", value: "Worst GM to talk trades with" },
      { label: "Season range", value: "Season 2" },
      { label: "Franchise binding", value: "Still resolving" },
      { label: "Archive state", value: "Person-level receipt live" }
    ],
    currentStage: "Season 2 tone-award recipient",
    awardsRail: [
      {
        label: "Worst GM To Talk Trades With",
        value: "Season 2",
        detail: "Voted award."
      }
    ]
  },
  "vidhaan-chand": {
    name: "Vidhaan Chand",
    body:
      "Bad variance belongs in the record too. Season 2 gave this profile the room’s cleanest luck receipt.",
    franchises: [
      {
        sport: "NBA",
        slot: "Season 2 Mula franchise",
        detail: "Franchise ownership is still unresolved at the source layer."
      }
    ],
    facts: [
      { label: "Known archive receipt", value: "Unluckiest GM" },
      { label: "Season range", value: "Season 2" },
      { label: "Franchise binding", value: "Still resolving" },
      { label: "Archive state", value: "Person-level receipt live" }
    ],
    currentStage: "Season 2 tone-award recipient",
    awardsRail: [
      {
        label: "Unluckiest GM of The Year",
        value: "Season 2",
        detail: "Voted award."
      }
    ]
  },
  "krish-prabaharan": {
    name: "Krish Prabaharan",
    body:
      "Season 2 adds the first rookie-GM receipt to the archive. That matters because it turns growth into something the product can preserve.",
    franchises: [
      {
        sport: "NBA",
        slot: "Season 2 Mula franchise",
        detail: "Franchise ownership is still unresolved at the source layer."
      }
    ],
    facts: [
      { label: "Known archive receipt", value: "Rookie GM of the Year" },
      { label: "Season range", value: "Season 2" },
      { label: "Franchise binding", value: "Still resolving" },
      { label: "Archive state", value: "Person-level receipt live" }
    ],
    currentStage: "Season 2 GM-award recipient",
    awardsRail: [
      {
        label: "Rookie GM of the Year",
        value: "Season 2",
        detail: "Voted award."
      }
    ]
  }
};

export function getArchiveSports(): ArchiveSportSummary[] {
  return [
    {
      slug: "nba",
      title: "NBA archive",
      eyebrow: "Flagship depth",
      summary:
        "The deepest world in the club: standings, divisions, awards, franchise memory, roster snapshots, and rivalry that compounds over years.",
      facts: [
        { label: "Mula seasons", value: "6" },
        { label: "Delta seasons", value: "3" },
        { label: "Imported now", value: "Seasons 1-2" }
      ]
    },
    {
      slug: "f1",
      title: "F1 archive",
      eyebrow: "Cross-sport identity",
      summary:
        "The second major world. This is where one member can eventually carry more than one franchise identity at once.",
      facts: [
        { label: "History", value: "Import next" },
        { label: "Profile crossover", value: "Supported" },
        { label: "Archive state", value: "Planned" }
      ]
    },
    {
      slug: "world-cup",
      title: "World Cup archive",
      eyebrow: "Campaign to memory",
      summary:
        "The acquisition wedge eventually becomes a permanent chapter in the club archive rather than disappearing after the tournament ends.",
      facts: [
        { label: "Current role", value: "Wedge first" },
        { label: "Future role", value: "Archived season" },
        { label: "Archive state", value: "Planned" }
      ]
    }
  ];
}

export function getCurrentProfileSummary(): MemberIdentitySummary {
  return {
    displayName: "Your profile",
    city: "Colombo orbit",
    status: "Two imported seasons live",
    intro:
      "This page is where one person can eventually hold multiple franchises, awards, seasons, and rivalry depth without getting flattened into one table.",
    currentFranchises: [
      {
        sport: "NBA",
        franchise: "Import next",
        state: "Season history will bind here once GM ownership is mapped."
      },
      {
        sport: "F1",
        franchise: "Awaiting import",
        state: "Cross-sport slot ready"
      }
    ],
    identityLedger: [
      {
        label: "Titles",
        value: "Import next",
        detail: "This is where championships and division wins will accumulate."
      },
      {
        label: "Awards",
        value: "Seasons 1-2 imported",
        detail: "GM honors, fantasy MVPs, and tone awards all belong here."
      },
      {
        label: "Head-to-head",
        value: "Season summaries ready",
        detail: "Rivalry depth will start showing once GM-to-franchise ownership is mapped."
      }
    ]
  };
}

export function getArchiveMemberDirectory(): ArchiveMemberDirectoryEntry[] {
  return archiveMemberDirectory.map((member) => ({ ...member }));
}

export function getArchiveOpsSummary(): ArchiveOpsSummary {
  return {
    sections: [
      {
        title: "Imported now",
        body: "Season 1 and Season 2 Mula are now real archive chapters: standings, points for and against, playoff brackets, champions, MVPs, roster snapshots, and the first rivalry law.",
        status: "Seasons 1-2 imported",
        tasks: [
          "Keep Seasons 1-2 as the source-of-truth examples for later imports",
          "Map GM ownership to the imported franchises",
          "Preserve awards as title, GM, and tone layers instead of flattening them"
        ]
      },
      {
        title: "Still missing",
        body: "The archive can now hold Season 1 facts, but the identity layer is still incomplete until member ownership is bound cleanly and later seasons land beside it.",
        status: "Ownership unresolved",
        tasks: [
          "Create member-profile summaries once GM mappings land",
          "Turn first-year head-to-heads into computed summaries instead of hand-written notes",
          "Bind defunct and renamed franchise handling before later seasons compound"
        ]
      },
      {
        title: "Import seam",
        body: "The product is now ready for messy-source ingestion. Instagram sets, fantasy app screenshots, and copied notes can all be normalized into the same archive shape.",
        status: "Operational seam open",
        tasks: [
          "Backfill later Mula seasons from the fantasy app",
          "Create a lightweight source note for every imported season"
        ]
      }
    ]
  };
}

export function getNbaArchiveSummary(): NbaArchiveSummary {
  return {
    heroTitle: "NBA is where the archive has to feel inevitable.",
    heroBody:
      "This is the first deep world: Mula, Delta, championships, roster snapshots, franchise eras, GM awards, and the first real rivalries.",
    leagueFacts: [
      { label: "Mula seasons", value: "6" },
      { label: "Delta seasons", value: "3" },
      { label: "Imported now", value: "Seasons 1-2" },
      { label: "Franchise model", value: "Active + defunct" }
    ],
    awardCategories: ["Champion", "Finals MVP", "Season MVP", "Draft Night Winner", "GM of the Year"],
    archiveModules: [
      {
        title: "Season tables",
        detail: "Each season needs standings, winner, bracket outcomes, player awards, and the shape of the year."
      },
      {
        title: "Franchise profiles",
        detail: "Current and defunct teams both deserve preserved pages with era facts, rosters, titles, and records."
      },
      {
        title: "Head-to-heads",
        detail: "This is where team and member history starts feeling like actual law instead of old screenshots."
      }
    ],
    franchiseDirectory,
    awardsDirectory: importedAwards.map((award) => ({
      slug: award.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: award.title,
      type: award.type,
      body: `${award.winner}. ${award.detail}`
    })),
    rivalryDirectory: [
      {
        slug: "gobayas-v-kudaz",
        title: "Galle Face Gobayas vs Kalubowila Kudaz",
        body: "Kudaz took the Season 1 regular-season edge, Gobayas took both finals, and Season 2 turned the pairing into the first durable title-line rivalry.",
        state: "Two-season final line"
      },
      {
        slug: "whorenets-v-jungies",
        title: "Katunayake Whorenets vs Jubilee Post Jungies",
        body: "Katunayake swept the regular season 3-0, then lost 5400-5494 when the bracket opened. That is real archive material.",
        state: "First upset"
      },
      {
        slug: "kudaz-v-warriors",
        title: "Kalubowila Kudaz vs Kurunduwatte Warriors",
        body: "Kalubowila swept the regular-season series 3-0 and still only escaped the semis by 22 points, 6111-6089.",
        state: "Pressure game"
      }
    ],
    seasonDirectory: [
      {
        slug: "season-1-mula",
        label: "Season 1",
        division: "Mula",
        status: "Imported"
      },
      {
        slug: "season-2-mula",
        label: "Season 2",
        division: "Mula",
        status: "Imported"
      },
      {
        slug: "season-3-mula",
        label: "Season 3",
        division: "Mula",
        status: "Awaiting import"
      },
      {
        slug: "season-4-mula",
        label: "Season 4",
        division: "Mula",
        status: "Awaiting import"
      },
      {
        slug: "season-5-mula",
        label: "Season 5",
        division: "Mula",
        status: "Awaiting import"
      },
      {
        slug: "season-6-mula",
        label: "Season 6",
        division: "Mula",
        status: "Awaiting import"
      },
      {
        slug: "season-1-delta",
        label: "Season 1",
        division: "Delta",
        status: "Awaiting import"
      },
      {
        slug: "season-2-delta",
        label: "Season 2",
        division: "Delta",
        status: "Awaiting import"
      },
      {
        slug: "season-3-delta",
        label: "Season 3",
        division: "Delta",
        status: "Awaiting import"
      }
    ]
  };
}

export function getNbaRivalryExplorerOptions(): NbaRivalryExplorerOption[] {
  return franchiseDirectory.map((franchise) => ({
    slug: franchise.slug,
    name: franchise.name
  }));
}

export function getNbaRivalryMatchups(): NbaRivalryMatchupSummary[] {
  return [...rivalryAggregateMap.values()].map((entry) => ({
    slug: getPairKey(entry.slugA, entry.slugB),
    franchiseA: {
      slug: entry.slugA,
      name: entry.nameA
    },
    franchiseB: {
      slug: entry.slugB,
      name: entry.nameB
    },
    record: [
      entry.regularWinsA + entry.regularWinsB > 0
        ? `${entry.regularWinsA}-${entry.regularWinsB} regular season`
        : null,
      entry.playoffWinsA + entry.playoffWinsB > 0
        ? `${entry.playoffWinsA}-${entry.playoffWinsB} playoffs`
        : null
    ]
      .filter(Boolean)
      .join(", "),
    detail:
      entry.playoffWinsA + entry.playoffWinsB > 0
        ? "Regular season and playoff meetings are imported."
        : "Regular-season meetings imported."
  }));
}

export function getNbaFranchiseComparisonSummaries(): NbaFranchiseComparisonSummary[] {
  const map = new Map<
    string,
    {
      slug: string;
      name: string;
      wins: number;
      losses: number;
      topFourFinishes: number;
      finalsAppearances: number;
      championships: number;
    }
  >();

  importedStandings.forEach((table) => {
    table.forEach((entry) => {
      const [wins, losses] = entry.record.split("-").map((value) => Number(value));
      const existing = map.get(entry.franchiseSlug) ?? {
        slug: entry.franchiseSlug,
        name: entry.franchiseName,
        wins: 0,
        losses: 0,
        topFourFinishes: 0,
        finalsAppearances: 0,
        championships: 0
      };

      existing.wins += wins;
      existing.losses += losses;
      existing.topFourFinishes += entry.rank <= 4 ? 1 : 0;
      map.set(entry.franchiseSlug, existing);
    });
  });

  importedSeasons.forEach((season) => {
    const finalRound = season.playoffRounds.find((round) => round.round === "Final");
    const champion = season.awards.find((award) => award.title === "Champion")?.winner;

    if (!finalRound) {
      return;
    }

    finalRound.matchup.split(" vs ").forEach((name) => {
      const slug = franchiseDirectory.find((entry) => entry.name === name)?.slug;

      if (!slug) {
        return;
      }

      const existing = map.get(slug);

      if (existing) {
        existing.finalsAppearances += 1;
      }
    });

    if (champion) {
      const championSlug = franchiseDirectory.find((entry) => entry.name === champion)?.slug;
      const existing = championSlug ? map.get(championSlug) : null;

      if (existing) {
        existing.championships += 1;
      }
    }
  });

  return [...map.values()]
    .map((entry) => ({
      slug: entry.slug,
      name: entry.name,
      regularSeasonRecord: `${entry.wins}-${entry.losses}`,
      winPct: (entry.wins / (entry.wins + entry.losses)).toFixed(3).replace(/^0/, ""),
      topFourFinishes: entry.topFourFinishes,
      finalsAppearances: entry.finalsAppearances,
      championships: entry.championships,
      draftAwards: null,
      gmAwards: null
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function getNbaSeasonSummary(slug: string): NbaSeasonSummary | null {
  return seasonAliasMap[slug] ?? null;
}

export function getFranchiseProfileSummary(slug: string): FranchiseProfileSummary {
  return (
    franchiseMap[slug] ?? {
      slug,
      name: slug
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      status: "defunct",
      sport: "NBA",
      body: "This franchise is no longer active or not yet fully imported, but its page is reserved in the archive.",
      facts: [
        { label: "Status", value: "Defunct or pending" },
        { label: "Archive state", value: "Awaiting import" }
      ],
      rosterSections: [],
      topFive: [],
      awardsRail: [],
      headToHead: []
    }
  );
}

export function getMemberProfileSummary(slug: string): MemberProfileSummary {
  const mappedProfile = memberProfileMap[slug];

  if (mappedProfile) {
    return mappedProfile;
  }

  const name = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    name,
    body:
      "This member profile is built to hold multiple sports, multiple franchises, awards, rivalry depth, and a longer archive timeline without collapsing into a single season summary.",
    franchises: [
      {
        sport: "NBA",
        slot: "Primary franchise",
        detail: "Season 1 franchise ownership import is the next binding step."
      },
      {
        sport: "F1",
        slot: "Second franchise",
        detail: "Cross-sport identity is supported here too."
      }
    ],
    facts: [
      { label: "Titles", value: "Awaiting GM import" },
      { label: "Awards", value: "Season 1 structure ready" },
      { label: "Rivalry depth", value: "Read model later" },
      { label: "Archive state", value: "Profile bones live" }
    ],
    currentStage: "Archive identity ready",
    awardsRail: [
      {
        label: "GM awards",
        value: "Awaiting import",
        detail: "This is where best-GM and tone-award outcomes will sit once the historical data lands."
      },
      {
        label: "Fantasy MVPs",
        value: "Awaiting import",
        detail: "Best actual-player awards should appear beside titles, not disappear into season notes."
      },
      {
        label: "Receipts",
        value: "Read model later",
        detail: "Rivalry texture and long-form archive notes can layer in once the bones are stable."
      }
    ]
  };
}
