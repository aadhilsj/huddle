"use client";

import { useEffect, useState } from "react";

import { HuddleShell } from "@/components/huddle-shell";
import { RoleGate } from "@/components/role-gate";
import { useAuth } from "@/components/auth-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase";

import styles from "./page.module.css";

type FounderIntakeRequest = {
  communityStatus: string;
  id: string;
  createdAt: string;
  email: string;
  full_name: string;
  fullName: string;
  homeCity: string;
  memberStatus: string;
  paymentStatus: string;
  sourceDetail: string;
  stageLabel: string;
  status: string;
};

function canMarkReviewed(request: FounderIntakeRequest) {
  return request.status === "pending";
}

function canApprove(request: FounderIntakeRequest) {
  return request.status === "pending" || request.status === "reviewed";
}

function canMarkPaid(request: FounderIntakeRequest) {
  return request.paymentStatus !== "Paid";
}

function canMarkDiscordLinked(request: FounderIntakeRequest) {
  return request.communityStatus !== "Discord linked" && request.communityStatus !== "Inside";
}

function canMarkInside(request: FounderIntakeRequest) {
  return request.stageLabel !== "Inside";
}

export default function FounderIntakePage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<FounderIntakeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !user) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      const accessToken = data.session?.access_token;

      if (!accessToken) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/founder/intake", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error("Founder intake load failed.");
        setRequests([]);
        setLoading(false);
        return;
      }

      const payload = (await response.json()) as { requests?: FounderIntakeRequest[] };
      setRequests(payload.requests ?? []);
      setLoading(false);
    });
  }, [user]);

  async function updateRequestStatus(
    requestId: string,
    nextStatus:
      | "reviewed"
      | "approved"
      | "pending"
      | "payment_confirmed"
      | "discord_linked"
      | "onboarding_completed"
      | "onboarding_failed"
      | "dismissed"
  ) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    setUpdatingId(requestId);
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (!accessToken) {
      setUpdatingId(null);
      return;
    }

    const response = await fetch("/api/founder/intake", {
      body: JSON.stringify({
        action: nextStatus,
        requestId
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      method: "POST"
    });

    if (!response.ok) {
      console.error("Founder intake status update failed.");
      setUpdatingId(null);
      return;
    }

    const payload = (await response.json()) as { requests?: FounderIntakeRequest[] };
    setRequests(payload.requests ?? []);
    setUpdatingId(null);
  }

  return (
    <HuddleShell mode="founder" primaryAction={{ href: "/join", label: "Open join flow" }}>
      <RoleGate requiredRole="founder">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Founder intake</p>
            <h1>Who is trying to get in?</h1>
            <p className={styles.heroBody}>
              Real join requests, newest first, with the signals that tell you whether the person is moving toward the room or drifting out.
            </p>
            <p className={styles.heroNote}>
              {requests[0] ? `Latest request ${requests[0].createdAt}.` : "No intake yet."}
            </p>
          </div>

          <aside className={`${styles.heroCard} ${styles.light}`}>
            <p className={styles.detailLabel}>Current intake volume</p>
            <p className={styles.detailValue}>{loading ? "…" : String(requests.length)}</p>
            <p className={styles.detailBody}>Saved join requests currently visible in Supabase.</p>
          </aside>
        </section>

        <section className={styles.sectionBlock} id="requests">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Requests</p>
            <h2>Recent entries</h2>
          </div>

          {loading ? (
            <div className={styles.emptyState}>Loading join requests…</div>
          ) : requests.length ? (
            <div className={styles.requestsGrid} id="recent">
              {requests.map((request) => (
                <article key={request.id} className={styles.requestCard}>
                  <div className={styles.requestHeader}>
                    <div>
                      <h3>{request.fullName}</h3>
                      <p className={styles.requestMeta}>{request.email}</p>
                    </div>
                    <span className={styles.requestStatus}>{request.status}</span>
                  </div>
                  <div className={styles.requestGrid}>
                    <div className={styles.requestSummary}>
                      <div className={styles.summaryLine}>
                        <strong>{request.stageLabel}</strong>
                        <span>{request.createdAt}</span>
                      </div>
                      <p className={styles.requestMeta}>
                        {request.homeCity} · {request.sourceDetail}
                      </p>
                    </div>
                    <div className={styles.requestDetails}>
                      <div>
                        <strong>Payment</strong>
                        <span>{request.paymentStatus}</span>
                      </div>
                      <div>
                        <strong>Community</strong>
                        <span>{request.communityStatus}</span>
                      </div>
                      <div>
                        <strong>Member</strong>
                        <span>{request.memberStatus}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.requestActions}>
                    {canMarkReviewed(request) ? (
                      <button
                        type="button"
                        className={styles.actionButton}
                        disabled={updatingId === request.id}
                        onClick={() => void updateRequestStatus(request.id, "reviewed")}
                      >
                        Review
                      </button>
                    ) : null}
                    {canApprove(request) ? (
                      <button
                        type="button"
                        className={`${styles.actionButton} ${styles.approveButton}`}
                        disabled={updatingId === request.id}
                        onClick={() => void updateRequestStatus(request.id, "approved")}
                      >
                        Approve
                      </button>
                    ) : null}
                    {canMarkPaid(request) ? (
                      <button
                        type="button"
                        className={styles.actionButton}
                        disabled={updatingId === request.id}
                        onClick={() => void updateRequestStatus(request.id, "payment_confirmed")}
                      >
                        Mark paid
                      </button>
                    ) : null}
                    {canMarkDiscordLinked(request) ? (
                      <button
                        type="button"
                        className={styles.actionButton}
                        disabled={updatingId === request.id}
                        onClick={() => void updateRequestStatus(request.id, "discord_linked")}
                      >
                        Discord linked
                      </button>
                    ) : null}
                    {canMarkInside(request) ? (
                      <button
                        type="button"
                        className={`${styles.actionButton} ${styles.approveButton}`}
                        disabled={updatingId === request.id}
                        onClick={() => void updateRequestStatus(request.id, "onboarding_completed")}
                      >
                        Mark inside
                      </button>
                    ) : null}
                    {request.status !== "pending" ? (
                      <button
                        type="button"
                        className={styles.actionButton}
                        disabled={updatingId === request.id}
                        onClick={() => void updateRequestStatus(request.id, "pending")}
                      >
                        Reset
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled={updatingId === request.id}
                      onClick={() => void updateRequestStatus(request.id, "dismissed")}
                    >
                      Dismiss
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>No join requests yet. The route is live, but the room has not started filling from this surface yet.</div>
          )}
        </section>
      </RoleGate>
    </HuddleShell>
  );
}
