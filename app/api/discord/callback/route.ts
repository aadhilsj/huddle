import { NextResponse } from "next/server";

import {
  addDiscordUserToGuild,
  applyDiscordRole,
  exchangeDiscordCode,
  fetchDiscordUser,
  getDiscordMemberRoleId,
  isDiscordConfigured,
  isDiscordGuildProvisioningConfigured,
  verifyDiscordState
} from "@/lib/discord";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

type AppUserRow = {
  display_name: string | null;
  email: string;
  id: string;
};

type JoinRequestRow = {
  competition_id: string | null;
  email: string;
  full_name: string;
  home_city: string | null;
};

async function ensureMemberContext(
  admin: { from: (table: string) => any },
  appUser: AppUserRow
) {
  const { data: joinRequest } = await admin
    .from("join_requests")
    .select("email, full_name, home_city, competition_id")
    .eq("email", appUser.email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const requestRow = joinRequest as JoinRequestRow | null;

  const { data: existingMember } = await admin
    .from("members")
    .select("id")
    .eq("email", appUser.email)
    .maybeSingle();

  let memberId = (existingMember?.id as string | null) ?? null;

  if (!memberId) {
    const { error: memberError } = await admin
      .from("members")
      .insert({
        email: appUser.email,
        full_name: requestRow?.full_name ?? appUser.display_name ?? appUser.email,
        home_city: requestRow?.home_city ?? null,
        member_status: "active"
      });

    if (memberError) {
      console.error("Discord callback member creation failed.", memberError);
      throw new Error(`Could not create member. ${memberError.message}`);
    }

    const { data: insertedMember, error: insertedMemberError } = await admin
      .from("members")
      .select("id")
      .eq("email", appUser.email)
      .maybeSingle();

    if (insertedMemberError || !insertedMember?.id) {
      console.error("Discord callback member lookup failed after insert.", insertedMemberError);
      throw new Error(
        `Could not create member. ${insertedMemberError?.message ?? "Member lookup after insert failed."}`
      );
    }

    memberId = insertedMember.id as string;
  }

  return {
    joinRequest: requestRow,
    memberId
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(`${appUrl}/discord?status=cancelled`);
  }

  if (!code || !state || !isDiscordConfigured()) {
    return NextResponse.redirect(`${appUrl}/discord?status=invalid`);
  }

  const statePayload = verifyDiscordState(state);

  if (!statePayload) {
    return NextResponse.redirect(`${appUrl}/discord?status=invalid`);
  }

  const admin = getSupabaseAdminClient() as
    | (ReturnType<typeof getSupabaseAdminClient> & {
        from: (table: string) => any;
      })
    | null;

  if (!admin) {
    return NextResponse.redirect(`${appUrl}/discord?status=invalid`);
  }

  try {
    const tokenResponse = await exchangeDiscordCode(code);
    const discordUser = await fetchDiscordUser(tokenResponse.access_token);
    const adminClient = admin as unknown as { from: (table: string) => any };
    const { data: appUser } = await adminClient
      .from("app_users")
      .select("id, email, display_name")
      .eq("id", statePayload.appUserId)
      .maybeSingle();

    if (!appUser) {
      throw new Error("App user missing for Discord callback.");
    }

    const typedAppUser = appUser as AppUserRow;
    const { memberId } = await ensureMemberContext(adminClient, typedAppUser);

    await adminClient
      .from("members")
      .update({
        discord_handle: discordUser.global_name
          ? `${discordUser.global_name} (${discordUser.username})`
          : discordUser.username,
        discord_user_id: discordUser.id
      })
      .eq("id", memberId);

    await adminClient.from("onboarding_events").insert({
      detail: "Discord OAuth completed.",
      event_status: "completed",
      event_type: "discord_link_completed",
      member_id: memberId,
      metadata: {
        source: "discord_oauth",
        discord_user_id: discordUser.id,
        username: discordUser.username
      }
    });

    let provisioningFailed = false;

    if (isDiscordGuildProvisioningConfigured()) {
      try {
        await addDiscordUserToGuild({
          accessToken: tokenResponse.access_token,
          nickname: discordUser.global_name ?? discordUser.username,
          roleIds: getDiscordMemberRoleId() ? [getDiscordMemberRoleId() as string] : [],
          userId: discordUser.id
        });

        await adminClient.from("onboarding_events").insert({
          detail: "Discord guild join provisioned.",
          event_status: "completed",
          event_type: "discord_role_applied",
          member_id: memberId,
          metadata: {
            source: "discord_guild_join",
            discord_user_id: discordUser.id
          }
        });

        const roleId = getDiscordMemberRoleId();

        if (roleId) {
          await applyDiscordRole({
            roleId,
            userId: discordUser.id
          });
        }
      } catch (provisioningError) {
        provisioningFailed = true;
        console.error("Discord guild provisioning failed.", provisioningError);
      }
    }

    return NextResponse.redirect(
      `${appUrl}/discord?status=linked${provisioningFailed ? "&provisioning=failed" : ""}`
    );
  } catch (callbackError) {
    console.error("Discord callback failed.", callbackError);
    const reason =
      callbackError instanceof Error && callbackError.message
        ? callbackError.message
        : "Unknown Discord callback error.";

    return NextResponse.redirect(
      `${appUrl}/discord?status=failed&reason=${encodeURIComponent(reason)}`
    );
  }
}
