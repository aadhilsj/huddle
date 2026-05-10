import { cache } from "react";

import { getSupabaseServerClient } from "@/lib/supabase";

type MetricCard = {
  label: string;
  value: string;
  detail: string;
};

type MetricRow = [label: string, value: string];

export type FounderDashboardData = {
  updatedAt: string;
  focus: string;
  metricBand: MetricCard[];
  density: MetricRow[];
  funnel: MetricRow[];
};

const fallbackFounderData: FounderDashboardData = {
  updatedAt: "08:42 UTC",
  focus: "World Cup + Colombo",
  metricBand: [
    {
      label: "Colombo active core",
      value: "18",
      detail: "Members with repeated, recent participation."
    },
    {
      label: "World Cup entries",
      value: "43",
      detail: "Confirmed entries for the current tournament."
    },
    {
      label: "League to next-league intent",
      value: "31%",
      detail: "Members likely to return for what comes next."
    },
    {
      label: "Discord join completion",
      value: "91%",
      detail: "Members who paid and made it fully inside."
    }
  ],
  density: [
    ["Colombo Local Core", "18"],
    ["Colombo Orbit", "27"],
    ["Huddle Active Core", "41"]
  ],
  funnel: [
    ["Landing page -> join click", "12.4%"],
    ["Join click -> paid entry", "8.1%"],
    ["Paid entry -> Discord complete", "91%"]
  ]
};

type SnapshotRow = {
  captured_at: string;
  detail: string | null;
  metric_key: string;
  value_numeric: number | null;
  value_text: string | null;
  value_unit: string | null;
};

function formatValue(metric: SnapshotRow | undefined, fallback: string) {
  if (!metric) {
    return fallback;
  }

  if (metric.value_text) {
    return metric.value_text;
  }

  if (metric.value_numeric === null) {
    return fallback;
  }

  const unit = metric.value_unit ?? "";
  return `${metric.value_numeric}${unit}`;
}

function formatUpdatedAt(capturedAt: string | undefined) {
  if (!capturedAt) {
    return fallbackFounderData.updatedAt;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    timeZone: "UTC",
    timeZoneName: "short"
  }).format(new Date(capturedAt));
}

export const getFounderDashboardData = cache(async (): Promise<FounderDashboardData> => {
  try {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return fallbackFounderData;
    }

    const { data, error } = await supabase
      .from("metric_snapshots")
      .select("metric_key, value_numeric, value_text, value_unit, detail, captured_at")
      .eq("is_public", true)
      .order("captured_at", { ascending: false });

    if (error || !data?.length) {
      return fallbackFounderData;
    }

    const latestByKey = new Map<string, SnapshotRow>();

    for (const row of data as SnapshotRow[]) {
      if (!latestByKey.has(row.metric_key)) {
        latestByKey.set(row.metric_key, row);
      }
    }

    const colomboActiveCore =
      latestByKey.get("colombo_active_core") ?? latestByKey.get("density_colombo_local_core");
    const worldCupEntries = latestByKey.get("world_cup_entries");
    const nextLeagueIntent = latestByKey.get("next_league_intent");
    const discordJoinCompletion = latestByKey.get("discord_join_completion");

    return {
      updatedAt: formatUpdatedAt(data[0]?.captured_at),
      focus: formatValue(latestByKey.get("current_focus"), fallbackFounderData.focus),
      metricBand: [
        {
          label: "Colombo active core",
          value: formatValue(colomboActiveCore, fallbackFounderData.metricBand[0].value),
          detail:
            colomboActiveCore?.detail ?? fallbackFounderData.metricBand[0].detail
        },
        {
          label: "World Cup entries",
          value: formatValue(worldCupEntries, fallbackFounderData.metricBand[1].value),
          detail:
            worldCupEntries?.detail ?? fallbackFounderData.metricBand[1].detail
        },
        {
          label: "League to next-league intent",
          value: formatValue(nextLeagueIntent, fallbackFounderData.metricBand[2].value),
          detail:
            nextLeagueIntent?.detail ?? fallbackFounderData.metricBand[2].detail
        },
        {
          label: "Discord join completion",
          value: formatValue(discordJoinCompletion, fallbackFounderData.metricBand[3].value),
          detail:
            discordJoinCompletion?.detail ?? fallbackFounderData.metricBand[3].detail
        }
      ],
      density: [
        [
          "Colombo Local Core",
          formatValue(
            latestByKey.get("density_colombo_local_core"),
            fallbackFounderData.density[0][1]
          )
        ],
        [
          "Colombo Orbit",
          formatValue(latestByKey.get("density_colombo_orbit"), fallbackFounderData.density[1][1])
        ],
        [
          "Huddle Active Core",
          formatValue(
            latestByKey.get("density_huddle_active_core"),
            fallbackFounderData.density[2][1]
          )
        ]
      ],
      funnel: [
        [
          "Landing page -> join click",
          formatValue(
            latestByKey.get("funnel_landing_to_join_click"),
            fallbackFounderData.funnel[0][1]
          )
        ],
        [
          "Join click -> paid entry",
          formatValue(
            latestByKey.get("funnel_join_click_to_paid_entry"),
            fallbackFounderData.funnel[1][1]
          )
        ],
        [
          "Paid entry -> Discord complete",
          formatValue(
            latestByKey.get("funnel_paid_entry_to_discord_complete"),
            fallbackFounderData.funnel[2][1]
          )
        ]
      ]
    };
  } catch (error) {
    console.error("Founder dashboard snapshot load failed.", error);
    return fallbackFounderData;
  }
});
