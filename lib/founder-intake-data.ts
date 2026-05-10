import { cache } from "react";

import { getSupabaseServerClient } from "@/lib/supabase";

export type FounderIntakeRequest = {
  createdAt: string;
  email: string;
  fullName: string;
  homeCity: string;
  sourceDetail: string;
  status: string;
};

export type FounderIntakeData = {
  totalRequests: string;
  recentRequests: FounderIntakeRequest[];
  latestRequestAt: string;
};

const fallbackFounderIntakeData: FounderIntakeData = {
  totalRequests: "0",
  recentRequests: [],
  latestRequestAt: "No intake yet"
};

type JoinRequestRow = {
  created_at: string;
  email: string;
  full_name: string;
  home_city: string | null;
  source_detail: string | null;
  status: string;
};

function formatCreatedAt(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    timeZone: "UTC",
    timeZoneName: "short"
  }).format(new Date(value));
}

export const getFounderIntakeData = cache(async (): Promise<FounderIntakeData> => {
  try {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return fallbackFounderIntakeData;
    }

    const { data, error, count } = await supabase
      .from("join_requests")
      .select("full_name, email, home_city, source_detail, status, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(12);

    if (error) {
      console.error("Founder intake load failed.", error);
      return fallbackFounderIntakeData;
    }

    const rows = (data ?? []) as JoinRequestRow[];

    return {
      totalRequests: String(count ?? rows.length),
      latestRequestAt: rows[0] ? formatCreatedAt(rows[0].created_at) : fallbackFounderIntakeData.latestRequestAt,
      recentRequests: rows.map((row) => ({
        createdAt: formatCreatedAt(row.created_at),
        email: row.email,
        fullName: row.full_name,
        homeCity: row.home_city ?? "Unknown",
        sourceDetail: row.source_detail ?? "Unknown",
        status: row.status
      }))
    };
  } catch (error) {
    console.error("Founder intake load failed.", error);
    return fallbackFounderIntakeData;
  }
});
