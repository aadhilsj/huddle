import { cache } from "react";

import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/supabase";

export type MemberFoyerData = {
  competitionName: string;
  competitionShortName: string;
  memberStatus: string;
  communityStatus: string;
  whatComesLater: string;
  entryStatus: string;
  entryCountLabel: string;
  memberName: string;
  memberEmail: string;
  paymentStatus: string;
  stageLabel: string;
  stageDetail: string;
  nextActionTitle: string;
  nextActionBody: string;
  timeline: Array<{
    label: string;
    detail: string;
    state: string;
  }>;
};

const fallbackMemberData: MemberFoyerData = {
  competitionName: "Huddle FIFA World Cup Fantasy League",
  competitionShortName: "FIFA World Cup",
  memberStatus: "Active",
  communityStatus: "Discord linked",
  whatComesLater: "More leagues + profile",
  entryStatus: "You are in",
  entryCountLabel: "43 entries confirmed so far",
  memberName: "You",
  memberEmail: "your inbox",
  paymentStatus: "Not started",
  stageLabel: "Request saved",
  stageDetail: "Huddle has your place held. Payment and community steps come next.",
  nextActionTitle: "Wait for the next handoff",
  nextActionBody: "The route is in place. The next real layer is payment and community onboarding.",
  timeline: [
    {
      label: "Join request",
      detail: "Saved into Huddle.",
      state: "Completed"
    },
    {
      label: "Payment",
      detail: "Still to be confirmed.",
      state: "Pending"
    },
    {
      label: "Community",
      detail: "Discord linkage comes after payment.",
      state: "Pending"
    }
  ]
};

type CompetitionRow = {
  name: string;
};

type MetricSnapshotRow = {
  value_numeric: number | null;
  value_text: string | null;
  value_unit: string | null;
};

type JoinRequestRow = {
  email: string;
  full_name: string;
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
  occurred_at?: string;
};

function firstName(value: string | null | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.split(/\s+/)[0] ?? null;
}

function formatEntryCount(metric: MetricSnapshotRow | null | undefined) {
  if (!metric) {
    return fallbackMemberData.entryCountLabel;
  }

  if (metric.value_text) {
    return metric.value_text;
  }

  if (metric.value_numeric === null) {
    return fallbackMemberData.entryCountLabel;
  }

  const unit = metric.value_unit ? metric.value_unit : "";
  return `${metric.value_numeric}${unit} entries confirmed so far`;
}

function shortCompetitionName(name: string) {
  const cleaned = name
    .replace(/^Huddle\s+/i, "")
    .replace(/\s+Fantasy League$/i, "")
    .trim();

  return cleaned && cleaned.toLowerCase() !== "league" ? cleaned : "FIFA World Cup";
}

function capitalize(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildTimeline(data: {
  joinStatus: string | null;
  paymentStatus: string;
  communityStatus: string;
}) {
  const joinState =
    data.joinStatus === "reviewed"
      ? "Reviewed"
      : data.joinStatus === "approved"
        ? "Approved"
        : data.joinStatus === "checkout_started"
          ? "Ready"
          : "Completed";

  const paymentState =
    data.paymentStatus === "Paid"
      ? "Completed"
      : data.paymentStatus === "Awaiting payment"
        ? "In progress"
        : "Pending";

  const communityState =
    data.communityStatus === "Inside"
      ? "Completed"
      : data.communityStatus === "Discord linked"
        ? "Completed"
        : data.communityStatus === "Discord linking"
          ? "In progress"
          : data.communityStatus === "Attention needed"
            ? "Needs attention"
            : "Pending";

  return [
    {
      label: "Join request",
      detail: "Your initial request is in the system.",
      state: joinState
    },
    {
      label: "Payment",
      detail: "This is what confirms the entry properly.",
      state: paymentState
    },
    {
      label: "Community",
      detail: "Discord linking and role access are the final step inside.",
      state: communityState
    }
  ];
}

export async function getMemberFoyerData(identity?: {
  email?: string;
  name?: string;
}): Promise<MemberFoyerData> {
  try {
    const supabase = getSupabaseServerClient();
    const admin = getSupabaseAdminClient();

    if (!supabase) {
      return {
        ...fallbackMemberData,
        memberName: firstName(identity?.name) ?? fallbackMemberData.memberName,
        memberEmail: identity?.email ?? fallbackMemberData.memberEmail
      };
    }

    const normalizedEmail = identity?.email?.trim().toLowerCase();
    const [competitionResult, entryResult, joinRequestResult, memberResult] = await Promise.all([
      supabase
        .from("competitions")
        .select("name")
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
        .maybeSingle(),
      normalizedEmail
        ? supabase
            .from("join_requests")
            .select("full_name, email, status")
            .eq("email", normalizedEmail)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      normalizedEmail && admin
        ? (admin as unknown as { from: (table: string) => any })
            .from("members")
            .select("id, member_status")
            .eq("email", normalizedEmail)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null })
    ]);

    const competition = competitionResult.data as CompetitionRow | null;
    const entryMetric = entryResult.data as MetricSnapshotRow | null;
    const joinRequest = joinRequestResult.data as JoinRequestRow | null;
    const member = memberResult?.data as MemberRow | null;
    const memberName =
      firstName(joinRequest?.full_name) ??
      firstName(identity?.name) ??
      fallbackMemberData.memberName;
    const memberEmail = joinRequest?.email ?? normalizedEmail ?? fallbackMemberData.memberEmail;
    let entryStatus = fallbackMemberData.entryStatus;
    let memberStatus = member?.member_status ? capitalize(member.member_status) : fallbackMemberData.memberStatus;
    let communityStatus = fallbackMemberData.communityStatus;
    let paymentStatus = fallbackMemberData.paymentStatus;
    let stageLabel = fallbackMemberData.stageLabel;
    let stageDetail = fallbackMemberData.stageDetail;
    let nextActionTitle = fallbackMemberData.nextActionTitle;
    let nextActionBody = fallbackMemberData.nextActionBody;
    let joinStatus = joinRequest?.status ?? null;

    if (member?.id && admin) {
      const adminClient = admin as unknown as { from: (table: string) => any };
      const [{ data: payment }, { data: onboardingEvents }] = await Promise.all([
        adminClient
          .from("payments")
          .select("payment_status")
          .eq("member_id", member.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        adminClient
          .from("onboarding_events")
          .select("event_type, event_status, occurred_at")
          .eq("member_id", member.id)
          .order("occurred_at", { ascending: false })
          .limit(5)
      ]);

      const paymentRow = payment as PaymentRow | null;
      const onboardingRows = (onboardingEvents ?? []) as OnboardingEventRow[];
      const onboardingRow = onboardingRows[0] ?? null;

      if (paymentRow?.payment_status === "paid") {
        entryStatus = "Payment confirmed";
        paymentStatus = "Paid";
      } else if (joinRequest?.status === "checkout_started") {
        entryStatus = "Checkout started";
        paymentStatus = "Awaiting payment";
      }

      if (onboardingRow?.event_type === "payment_confirmed") {
        communityStatus = "Discord pending";
        stageLabel = "Payment confirmed";
        stageDetail = "The entry is confirmed. Community access is the next real step.";
        nextActionTitle = "Finish community onboarding";
        nextActionBody = "Link Discord and apply the right access so the member actually lands inside.";
      }

      if (onboardingRow?.event_type === "discord_link_started") {
        communityStatus = "Discord linking";
        stageLabel = "Discord linking";
        stageDetail = "The member is in the middle of connecting the social layer.";
        nextActionTitle = "Finish the inside handoff";
        nextActionBody = "Complete the Discord link and role step so the room feels real.";
      }

      if (
        onboardingRow?.event_type === "discord_link_completed" ||
        onboardingRow?.event_type === "discord_role_applied"
      ) {
        communityStatus = "Discord linked";
        stageLabel = "Community ready";
        stageDetail = "The member is connected to the room. Final onboarding can close cleanly now.";
        nextActionTitle = "Close the loop";
        nextActionBody = "Mark onboarding complete once the member is fully inside and oriented.";
      }

      if (onboardingRow?.event_type === "onboarding_completed" && onboardingRow.event_status === "completed") {
        communityStatus = "Discord linked";
        stageLabel = "Inside";
        stageDetail = "Payment, access, and member identity are all in the right place.";
        nextActionTitle = "Stay active";
        nextActionBody = "The product work after this is retention, history, and profile depth.";
      }

      if (onboardingRow?.event_type === "onboarding_failed" && onboardingRow.event_status === "failed") {
        communityStatus = "Attention needed";
        stageLabel = "Needs attention";
        stageDetail = "Something in the inside flow broke or stalled.";
        nextActionTitle = "Recover this member";
        nextActionBody = "Check payment, Discord link, and role assignment so they do not fall out of the flow.";
      }
    } else if (joinRequest?.status === "checkout_started") {
      entryStatus = "Checkout started";
      communityStatus = "Discord pending";
      paymentStatus = "Awaiting payment";
      stageLabel = "Checkout started";
      stageDetail = "The member has moved out of intake and into the payment step.";
      nextActionTitle = "Finish payment";
      nextActionBody = "Payment confirmation is what turns this request into a real member state.";
    } else if (joinRequest?.status === "approved") {
      entryStatus = "Approved";
      communityStatus = "Waiting for payment";
      paymentStatus = "Not confirmed";
      stageLabel = "Founder approved";
      stageDetail = "This request has cleared review, but payment is not confirmed yet.";
      nextActionTitle = "Collect payment";
      nextActionBody = "Payment confirmation should happen before the member is treated as fully inside.";
    } else if (joinRequest?.status === "reviewed") {
      stageLabel = "Founder review";
      stageDetail = "The request is being looked at, but has not moved further yet.";
      nextActionTitle = "Advance the request";
      nextActionBody = "Once approved, this should move into payment and onboarding cleanly.";
    } else if (joinRequest?.status === "pending") {
      stageLabel = "Request saved";
      stageDetail = "The request is in the queue and waiting for the next handoff.";
      nextActionTitle = "Wait for the next handoff";
      nextActionBody = "The first real next step is founder review or payment start.";
    }

    const timeline = buildTimeline({
      joinStatus,
      paymentStatus,
      communityStatus
    });

    if (!competitionResult.error && competition?.name) {
      return {
        competitionName: competition.name,
        competitionShortName: shortCompetitionName(competition.name),
        memberStatus,
        communityStatus,
        whatComesLater: fallbackMemberData.whatComesLater,
        entryStatus,
        entryCountLabel: formatEntryCount(entryMetric),
        memberName,
        memberEmail,
        paymentStatus,
        stageLabel,
        stageDetail,
        nextActionTitle,
        nextActionBody,
        timeline
      };
    }

    return {
      ...fallbackMemberData,
      memberName,
      memberEmail
    };
  } catch (error) {
    console.error("Member foyer data load failed.", error);
    return {
      ...fallbackMemberData,
      memberName: firstName(identity?.name) ?? fallbackMemberData.memberName,
      memberEmail: identity?.email ?? fallbackMemberData.memberEmail
    };
  }
}
