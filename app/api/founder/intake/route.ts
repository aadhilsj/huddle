import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type FounderAction =
  | "reviewed"
  | "approved"
  | "pending"
  | "payment_confirmed"
  | "discord_linked"
  | "onboarding_completed"
  | "onboarding_failed"
  | "dismissed";

type JoinRequestRow = {
  competition_id: string | null;
  created_at: string;
  email: string;
  full_name: string;
  home_city: string | null;
  id: string;
  source_detail: string | null;
  status: string;
};

type MemberRow = {
  id: string;
  member_status: string;
};

type PaymentRow = {
  payment_status: string;
};

type OnboardingEventRow = {
  event_status: string;
  event_type: string;
};

type FounderQueueRow = {
  communityStatus: string;
  createdAt: string;
  email: string;
  fullName: string;
  homeCity: string;
  id: string;
  memberStatus: string;
  paymentStatus: string;
  sourceDetail: string;
  stageLabel: string;
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

async function requireFounder(request: Request) {
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

  const { data: appUser, error: roleError } = await admin
    .from("app_users")
    .select("role")
    .eq("id", authUser.user.id)
    .maybeSingle();

  const roleRow = appUser as { role?: string } | null;

  if (roleError || roleRow?.role !== "founder") {
    return { error: NextResponse.json({ error: "Founder access required." }, { status: 403 }) };
  }

  return { admin };
}

async function ensureMemberContext(
  admin: { from: (table: string) => any },
  joinRequest: JoinRequestRow
) {
  const { data: existingMember } = await admin
    .from("members")
    .select("id")
    .eq("email", joinRequest.email)
    .maybeSingle();

  let memberId = existingMember?.id ?? null;

  if (!memberId) {
    const { data: createdMember, error: memberError } = await admin
      .from("members")
      .insert({
        email: joinRequest.email,
        full_name: joinRequest.full_name,
        home_city: joinRequest.home_city,
        member_status: "active",
        source_detail: joinRequest.source_detail,
        source_channel: "founder_intake"
      })
      .select("id")
      .single();

    if (memberError || !createdMember?.id) {
      throw new Error("Could not create member.");
    }

    memberId = createdMember.id;
  }

  let competitionMembershipId: string | null = null;

  if (joinRequest.competition_id) {
    const { data: existingMembership } = await admin
      .from("competition_memberships")
      .select("id")
      .eq("member_id", memberId)
      .eq("competition_id", joinRequest.competition_id)
      .maybeSingle();

    if (existingMembership?.id) {
      competitionMembershipId = existingMembership.id;
    } else {
      const { data: createdMembership, error: membershipError } = await admin
        .from("competition_memberships")
        .insert({
          competition_id: joinRequest.competition_id,
          member_id: memberId,
          membership_status: "pending",
          payment_status: "pending"
        })
        .select("id")
        .single();

      if (membershipError || !createdMembership?.id) {
        throw new Error("Could not create competition membership.");
      }

      competitionMembershipId = createdMembership.id;
    }
  }

  return { competitionMembershipId, memberId };
}

async function deriveQueueRow(
  admin: { from: (table: string) => any },
  row: JoinRequestRow
): Promise<FounderQueueRow> {
  const { data: member } = await admin
    .from("members")
    .select("id, member_status")
    .eq("email", row.email)
    .maybeSingle();

  let paymentStatus = "Not started";
  let communityStatus = "Not started";
  let memberStatus = member?.member_status ?? "No member";
  let stageLabel = "Pending";

  if (row.status === "reviewed") {
    stageLabel = "Reviewed";
  } else if (row.status === "approved") {
    stageLabel = "Approved";
  } else if (row.status === "checkout_started") {
    stageLabel = "Checkout started";
    paymentStatus = "Awaiting payment";
  }

  if (member?.id) {
    const [{ data: payment }, { data: onboardingEvent }] = await Promise.all([
      admin
        .from("payments")
        .select("payment_status")
        .eq("member_id", member.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      admin
        .from("onboarding_events")
        .select("event_type, event_status")
        .eq("member_id", member.id)
        .order("occurred_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    ]);

    const paymentRow = payment as PaymentRow | null;
    const onboardingRow = onboardingEvent as OnboardingEventRow | null;

    memberStatus = member.member_status;

    if (paymentRow?.payment_status === "paid") {
      paymentStatus = "Paid";
      stageLabel = "Payment confirmed";
      communityStatus = "Discord pending";
    }

    if (onboardingRow?.event_type === "discord_link_started") {
      communityStatus = "Discord linking";
      stageLabel = "Discord linking";
    }

    if (
      onboardingRow?.event_type === "discord_link_completed" ||
      onboardingRow?.event_type === "discord_role_applied"
    ) {
      communityStatus = "Discord linked";
      stageLabel = "Community ready";
    }

    if (onboardingRow?.event_type === "onboarding_completed" && onboardingRow.event_status === "completed") {
      communityStatus = "Inside";
      stageLabel = "Inside";
    }

    if (onboardingRow?.event_type === "onboarding_failed" && onboardingRow.event_status === "failed") {
      communityStatus = "Attention needed";
      stageLabel = "Needs attention";
    }
  }

  return {
    communityStatus,
    createdAt: formatCreatedAt(row.created_at),
    email: row.email,
    fullName: row.full_name,
    homeCity: row.home_city ?? "Unknown",
    id: row.id,
    memberStatus,
    paymentStatus,
    sourceDetail: row.source_detail ?? "Unknown",
    stageLabel,
    status: row.status
  };
}

async function listQueue(admin: { from: (table: string) => any }) {
  const { data, error } = await admin
    .from("join_requests")
    .select("id, created_at, email, full_name, home_city, source_detail, status, competition_id")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    throw new Error("Could not load founder queue.");
  }

  const rows = (data ?? []) as JoinRequestRow[];
  return Promise.all(rows.map((row) => deriveQueueRow(admin, row)));
}

async function applyFounderAction(
  admin: { from: (table: string) => any },
  requestId: string,
  action: FounderAction
) {
  const { data: joinRequest, error } = await admin
    .from("join_requests")
    .select("id, created_at, email, full_name, home_city, source_detail, status, competition_id")
    .eq("id", requestId)
    .maybeSingle();

  if (error || !joinRequest) {
    throw new Error("Join request not found.");
  }

  const row = joinRequest as JoinRequestRow;

  if (action === "dismissed") {
    await admin.from("join_requests").delete().eq("id", requestId);
    return;
  }

  if (action === "reviewed" || action === "approved" || action === "pending") {
    await admin.from("join_requests").update({ status: action }).eq("id", requestId);
    return;
  }

  const { memberId, competitionMembershipId } = await ensureMemberContext(admin, row);

  if (action === "payment_confirmed") {
    const manualPaymentId = `manual:${requestId}`;
    const { data: existingPayment } = await admin
      .from("payments")
      .select("id")
      .eq("provider_payment_id", manualPaymentId)
      .maybeSingle();

    if (!existingPayment?.id) {
      await admin.from("payments").insert({
        amount_cents: 0,
        competition_membership_id: competitionMembershipId,
        currency: "LKR",
        member_id: memberId,
        metadata: { source: "founder_manual" },
        paid_at: new Date().toISOString(),
        payment_status: "paid",
        provider: "manual",
        provider_payment_id: manualPaymentId
      });
    }

    if (competitionMembershipId) {
      await admin
        .from("competition_memberships")
        .update({ membership_status: "active", payment_status: "paid" })
        .eq("id", competitionMembershipId);
    }

    await admin.from("join_requests").update({ status: "approved" }).eq("id", requestId);
    await admin.from("onboarding_events").insert({
      competition_membership_id: competitionMembershipId,
      detail: "Founder manually confirmed payment.",
      event_status: "completed",
      event_type: "payment_confirmed",
      member_id: memberId,
      metadata: { source: "founder_manual" }
    });
    return;
  }

  const actionMap: Record<
    Exclude<FounderAction, "reviewed" | "approved" | "pending" | "payment_confirmed" | "dismissed">,
    { detail: string; event_status: "completed" | "pending" | "failed"; event_type: string }
  > = {
    discord_linked: {
      detail: "Founder marked Discord link complete.",
      event_status: "completed",
      event_type: "discord_link_completed"
    },
    onboarding_completed: {
      detail: "Founder marked onboarding complete.",
      event_status: "completed",
      event_type: "onboarding_completed"
    },
    onboarding_failed: {
      detail: "Founder marked onboarding as failed.",
      event_status: "failed",
      event_type: "onboarding_failed"
    }
  };

  const nextEvent = actionMap[action];

  await admin.from("onboarding_events").insert({
    competition_membership_id: competitionMembershipId,
    detail: nextEvent.detail,
    event_status: nextEvent.event_status,
    event_type: nextEvent.event_type,
    member_id: memberId,
    metadata: { source: "founder_manual" }
  });

  if (action === "onboarding_completed" && competitionMembershipId) {
    await admin
      .from("competition_memberships")
      .update({ membership_status: "active" })
      .eq("id", competitionMembershipId);
    await admin
      .from("members")
      .update({ member_status: "active" })
      .eq("id", memberId);
  }
}

export async function GET(request: Request) {
  const auth = await requireFounder(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const requests = await listQueue(auth.admin);
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Founder queue load failed.", error);
    return NextResponse.json({ error: "Could not load founder queue." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireFounder(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = (await request.json()) as { action?: FounderAction; requestId?: string };

    if (!body.requestId || !body.action) {
      return NextResponse.json({ error: "Missing request id or action." }, { status: 400 });
    }

    await applyFounderAction(auth.admin, body.requestId, body.action);
    const requests = await listQueue(auth.admin);
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Founder queue action failed.", error);
    return NextResponse.json({ error: "Could not update founder queue." }, { status: 500 });
  }
}
