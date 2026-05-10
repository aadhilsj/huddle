import { cache } from "react";

import { getSupabaseServerClient } from "@/lib/supabase";

export type JoinFlowData = {
  competitionId: string | null;
  competitionName: string;
  competitionShortName: string;
  competitionFormat: string;
  entryCountLabel: string;
};

const fallbackJoinFlowData: JoinFlowData = {
  competitionId: null,
  competitionName: "Huddle FIFA World Cup Fantasy League",
  competitionShortName: "FIFA World Cup",
  competitionFormat: "Fantasy league",
  entryCountLabel: "43 entries confirmed so far"
};

type CompetitionRow = {
  competition_format: string;
  id: string;
  name: string;
};

type MetricSnapshotRow = {
  value_numeric: number | null;
  value_text: string | null;
  value_unit: string | null;
};

function shortCompetitionName(name: string) {
  return name
    .replace(/^Huddle\s+/i, "")
    .replace(/\s+Fantasy League$/i, "")
    .trim();
}

function formatEntryCount(metric: MetricSnapshotRow | null | undefined) {
  if (!metric) {
    return fallbackJoinFlowData.entryCountLabel;
  }

  if (metric.value_text) {
    return metric.value_text;
  }

  if (metric.value_numeric === null) {
    return fallbackJoinFlowData.entryCountLabel;
  }

  const unit = metric.value_unit ? metric.value_unit : "";
  return `${metric.value_numeric}${unit} entries confirmed so far`;
}

export const getJoinFlowData = cache(async (): Promise<JoinFlowData> => {
  try {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return fallbackJoinFlowData;
    }

    const [competitionResult, entryResult] = await Promise.all([
      supabase
        .from("competitions")
        .select("id, name, competition_format")
        .eq("is_active", true)
        .eq("is_public", true)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("metric_snapshots")
        .select("value_numeric, value_text, value_unit")
        .eq("metric_key", "world_cup_entries")
        .eq("is_public", true)
        .order("captured_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    ]);

    const competition = competitionResult.data as CompetitionRow | null;
    const entryMetric = entryResult.data as MetricSnapshotRow | null;

    if (!competitionResult.error && competition?.name) {
      return {
        competitionId: competition.id,
        competitionName: competition.name,
        competitionShortName: shortCompetitionName(competition.name),
        competitionFormat: competition.competition_format,
        entryCountLabel: formatEntryCount(entryMetric)
      };
    }

    return fallbackJoinFlowData;
  } catch (error) {
    console.error("Join flow data load failed.", error);
    return fallbackJoinFlowData;
  }
});

export async function createJoinRequest(formData: FormData) {
  "use server";

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const homeCity = String(formData.get("homeCity") ?? "").trim();
  const sourceDetail = String(formData.get("sourceDetail") ?? "").trim();
  const competitionId = String(formData.get("competitionId") ?? "").trim();
  const competitionName = String(formData.get("competitionName") ?? "Huddle FIFA World Cup Fantasy League").trim();

  if (!fullName || !email) {
    return { ok: false as const, error: "missing_fields" };
  }

  try {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return { ok: false as const, error: "supabase_unavailable" };
    }

    const { error } = await supabase.from("join_requests").insert({
      competition_id: competitionId || null,
      competition_name: competitionName,
      email,
      full_name: fullName,
      home_city: homeCity || null,
      source_channel: "website",
      source_detail: sourceDetail || null,
      status: "pending"
    });

    if (error) {
      console.error("Join request insert failed.", error);
      return { ok: false as const, error: "insert_failed" };
    }

    return { ok: true as const, email, fullName };
  } catch (error) {
    console.error("Join request submit failed.", error);
    return { ok: false as const, error: "unexpected" };
  }
}
