import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type DiscordAction = "start" | "complete";

type AppUserRow = {
  display_name: string | null;
  email: string;
  id: string;
  role: string;
};

type JoinRequestRow = {
  competition_id: string | null;
  email: string;
  full_name: string;
  home_city: string | null;
  id: string;
};

type MemberRow = {
  discord_handle: string | null;
  id: string;
  member_status?: string;
};

type OnboardingEventRow = {
  event_status: string;
  event_type: string;
};

type DiscordStatePayload = {
  competitionShortName: string;
  detail: string;
  discordHandle: string;
  email: string;
  label: string;
  state: "not_started" | "started" | "linked" | "inside" | "failed";
};

function shortCompetitionName(name: string) {
  const cleaned = name
    .replace(/^Huddle\s+/i, "")
    .replace(/\s+Fantasy League$/i, "")
    .trim();

  return cleaned && cleaned.toLowerCase() !== "league" ? cleaned : "FIFA World Cup";
}

async function requireSignedInUser(request: Request) {
  const admin = getSupabaseAdminClient() as
    | (ReturnType<typeof getSupabaseAdminClient> & {
        auth: {
          getUser: (token: string) => Promise<{
            data: { user: { id: string } | null };
            error: { message: string } | null;
          }>;
        };
        from: (table: string) => any;
      })
    | null;

  if (!admin) {
    return { error: NextResponse.json({ error: "Supabase admin is not configured." }, { status: 500 }) };
  }

  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;

  if (!token) {
    return { error: NextResponse.json({ error: "Missing auth token." }, { status: 401 }) };
  }

  const { data: authUser, error: authError } = await admin.auth.getUser(token);

  if (authError || !authUser.user?.id) {
    return { error: NextResponse.json({ error: "Authentication failed." }, { status: 401 }) };
  }

  const { data: appUser, error: appUserError } = await admin
    .from("app_users")
    .select("id, email, display_name, role")
    .eq("id", authUser.user.id)
    .maybeSingle();

  if (appUserError || !appUser) {
    return { error: NextResponse.json({ error: "No app user found." }, { status: 404 }) };
  }

  return { admin, appUser: appUser as AppUserRow };
}

async function loadDiscordContext(
  admin: { from: (table: string) => any },
  appUser: AppUserRow
) {
  const { data: joinRequest } = await admin
    .from("join_requests")
    .select("id, email, full_name, home_city, competition_id")
    .eq("email", appUser.email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const requestRow = joinRequest as JoinRequestRow | null;

  const { data: existingMember } = await admin
    .from("members")
    .select("id, discord_handle, member_status")
    .eq("email", appUser.email)
    .maybeSingle();

  return {
    member: (existingMember as MemberRow | null) ?? null,
    joinRequest: requestRow,
    memberId: (existingMember as MemberRow | null)?.id ?? null
  };
}

async function ensureMemberContext(
  admin: { from: (table: string) => any },
  appUser: AppUserRow
) {
  const { joinRequest, member, memberId: existingMemberId } = await loadDiscordContext(admin, appUser);
  let memberId = existingMemberId;

  if (!memberId) {
    const { error: memberError } = await admin
      .from("members")
      .insert({
        email: appUser.email,
        full_name: joinRequest?.full_name ?? appUser.display_name ?? appUser.email,
        home_city: joinRequest?.home_city ?? null,
        member_status: "active"
      });

    if (memberError) {
      throw new Error("Could not create member record.");
    }

    const { data: insertedMember, error: insertedMemberError } = await admin
      .from("members")
      .select("id")
      .eq("email", appUser.email)
      .maybeSingle();

    if (insertedMemberError || !insertedMember?.id) {
      throw new Error("Could not create member record.");
    }

    memberId = insertedMember.id as string;
  }

  let competitionMembershipId: string | null = null;

  if (joinRequest?.competition_id) {
    const { data: membership } = await admin
      .from("competition_memberships")
      .select("id")
      .eq("member_id", memberId)
      .eq("competition_id", joinRequest.competition_id)
      .maybeSingle();

    competitionMembershipId = membership?.id ?? null;

    if (!competitionMembershipId) {
      const { data: createdMembership, error: membershipError } = await admin
        .from("competition_memberships")
        .insert({
          competition_id: joinRequest.competition_id,
          member_id: memberId,
          membership_status: "active",
          payment_status: "pending"
        })
        .select("id")
        .single();

      if (membershipError || !createdMembership?.id) {
        throw new Error("Could not create competition membership.");
      }

      competitionMembershipId = createdMembership.id as string;
    }
  }

  return {
    competitionMembershipId,
    joinRequest,
    member: member ?? null,
    memberId
  };
}

async function deriveDiscordState(
  admin: { from: (table: string) => any },
  appUser: AppUserRow
): Promise<DiscordStatePayload> {
  const { memberId, joinRequest, member } = await loadDiscordContext(admin, appUser);

  const [{ data: events }, { data: competition }] = await Promise.all([
    memberId
      ? admin
          .from("onboarding_events")
          .select("event_type, event_status")
          .eq("member_id", memberId)
          .order("occurred_at", { ascending: false })
          .limit(5)
      : Promise.resolve({ data: [] }),
    joinRequest?.competition_id
      ? admin
          .from("competitions")
          .select("name")
          .eq("id", joinRequest.competition_id)
          .maybeSingle()
      : admin
          .from("competitions")
          .select("name")
          .eq("is_active", true)
          .eq("is_public", true)
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle()
  ]);

  const recentEvents = (events ?? []) as OnboardingEventRow[];
  const latestEvent = recentEvents[0] ?? null;
  const competitionName = String((competition?.name as string | undefined) ?? "Huddle FIFA World Cup Fantasy League");
  const competitionShortName = shortCompetitionName(competitionName);

  if (latestEvent?.event_type === "onboarding_completed" && latestEvent.event_status === "completed") {
    return {
      competitionShortName,
      detail: "You are already inside. Discord is linked and the room is ready.",
      discordHandle: member?.discord_handle ?? "",
      email: appUser.email,
      label: "Inside",
      state: "inside"
    };
  }

  if (latestEvent?.event_type === "onboarding_failed" && latestEvent.event_status === "failed") {
    return {
      competitionShortName,
      detail: "Something in the Discord handoff stalled. Retry the link or ask a founder to recover it.",
      discordHandle: member?.discord_handle ?? "",
      email: appUser.email,
      label: "Needs attention",
      state: "failed"
    };
  }

  if (
    latestEvent?.event_type === "discord_link_completed" ||
    latestEvent?.event_type === "discord_role_applied"
  ) {
    return {
      competitionShortName,
      detail: "Discord is linked. The last step is founder-side orientation and access cleanup if needed.",
      discordHandle: member?.discord_handle ?? "",
      email: appUser.email,
      label: "Discord linked",
      state: "linked"
    };
  }

  if (latestEvent?.event_type === "discord_link_started") {
    return {
      competitionShortName,
      detail: "The Discord step has started. Finish it, then come back here once you are in the room.",
      discordHandle: member?.discord_handle ?? "",
      email: appUser.email,
      label: "Link in progress",
      state: "started"
    };
  }

  return {
    competitionShortName,
    detail: "This is the next handoff after payment. Join the room, then confirm the link back here.",
    discordHandle: member?.discord_handle ?? "",
    email: appUser.email,
    label: "Not started",
    state: "not_started"
  };
}

export async function GET(request: Request) {
  const auth = await requireSignedInUser(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const payload = await deriveDiscordState(auth.admin, auth.appUser);
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Discord state load failed.", error);
    return NextResponse.json({ error: "Could not load Discord state." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireSignedInUser(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = (await request.json()) as { action?: DiscordAction; discordHandle?: string };
    const admin = auth.admin as unknown as { from: (table: string) => any };

    if (!body.action) {
      return NextResponse.json({ error: "Missing Discord action." }, { status: 400 });
    }

    const { competitionMembershipId, memberId } = await ensureMemberContext(admin, auth.appUser);

    if (body.discordHandle?.trim()) {
      await admin
        .from("members")
        .update({ discord_handle: body.discordHandle.trim() })
        .eq("id", memberId);
    }

    if (body.action === "start") {
      await admin.from("onboarding_events").insert({
        competition_membership_id: competitionMembershipId,
        detail: "Member started Discord link.",
        event_status: "pending",
        event_type: "discord_link_started",
        member_id: memberId,
        metadata: {
          source: "member_self_serve"
        }
      });
    }

    if (body.action === "complete") {
      await admin.from("onboarding_events").insert({
        competition_membership_id: competitionMembershipId,
        detail: "Member confirmed Discord link.",
        event_status: "completed",
        event_type: "discord_link_completed",
        member_id: memberId,
        metadata: {
          source: "member_self_serve"
        }
      });
    }

    const payload = await deriveDiscordState(admin, auth.appUser);
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Discord action failed.", error);
    return NextResponse.json({ error: "Could not update Discord state." }, { status: 500 });
  }
}
