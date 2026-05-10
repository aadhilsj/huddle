"use client";

import { useAuth } from "@/components/auth-provider";

function firstName(value: string | null | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.split(/\s+/)[0] ?? null;
}

export function MemberGreeting({ fallbackName }: { fallbackName: string }) {
  const { appUser } = useAuth();
  const preferredName = firstName(appUser?.displayName) ?? firstName(appUser?.email?.split("@")[0]);
  const name = preferredName ?? firstName(fallbackName) ?? "there";

  return <>Welcome, {name}.</>;
}
