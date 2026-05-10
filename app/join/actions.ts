"use server";

import { redirect } from "next/navigation";

import { createJoinRequest } from "@/lib/join-data";

export async function submitJoinRequest(formData: FormData) {
  const result = await createJoinRequest(formData);

  if (!result.ok) {
    redirect(`/join?error=${result.error}`);
  }

  redirect(
    `/join/success?email=${encodeURIComponent(result.email)}&name=${encodeURIComponent(result.fullName)}`
  );
}
