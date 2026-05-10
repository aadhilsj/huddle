import type { Route } from "next";
import { redirect } from "next/navigation";

import { getMemberFoyerData } from "@/lib/member-data";

type OnboardingPageProps = {
  searchParams?: Promise<{
    email?: string;
    name?: string;
  }>;
};

function withIdentity(path: string, email?: string, name?: string): Route {
  const params = new URLSearchParams();

  if (email) {
    params.set("email", email);
  }

  if (name) {
    params.set("name", name);
  }

  const query = params.toString();
  return (query ? `${path}?${query}` : path) as Route;
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const resolvedSearchParams = await searchParams;
  const email = resolvedSearchParams?.email;
  const name = resolvedSearchParams?.name;
  const memberData = await getMemberFoyerData({ email, name });

  const target =
    memberData.communityStatus === "Discord linked" || memberData.stageLabel === "Inside"
      ? withIdentity("/member", email, name)
      : withIdentity("/discord", email, name);

  redirect(target);
}
