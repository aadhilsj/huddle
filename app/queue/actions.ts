"use server";

import { redirect } from "next/navigation";
import { createJoinRequest } from "@/lib/join-data";
import { getPublicLeagueSummary } from "@/lib/public-league-data";

export async function submitLeagueQueueRequest(formData: FormData) {
  const slug = String(formData.get("leagueSlug") ?? "").trim();
  const league = getPublicLeagueSummary(slug);

  if (!league) {
    redirect("/?error=league_missing");
  }

  const cloned = new FormData();
  cloned.set("fullName", String(formData.get("fullName") ?? ""));
  cloned.set("email", String(formData.get("email") ?? ""));
  cloned.set("homeCity", String(formData.get("homeCity") ?? ""));
  cloned.set("sourceDetail", String(formData.get("sourceDetail") ?? ""));
  cloned.set("competitionId", "");
  cloned.set("competitionName", `${league.shortLabel} waitlist`);

  const result = await createJoinRequest(cloned);

  if (!result.ok) {
    redirect(`/queue/${slug}?error=${result.error}`);
  }

  redirect(
    `/queue/success?league=${encodeURIComponent(slug)}&email=${encodeURIComponent(result.email)}&name=${encodeURIComponent(result.fullName)}`
  );
}
