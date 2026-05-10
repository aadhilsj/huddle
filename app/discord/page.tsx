"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { HuddleShell } from "@/components/huddle-shell";
import { useAuth } from "@/components/auth-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase";

import styles from "./page.module.css";

type DiscordState = {
  competitionShortName: string;
  detail: string;
  discordHandle: string;
  email: string;
  label: string;
  state: "not_started" | "started" | "linked" | "inside" | "failed";
};

const fallbackState: DiscordState = {
  competitionShortName: "Huddle league",
  detail: "Sign in first, then Huddle can tell you what the Discord step looks like.",
  discordHandle: "",
  email: "",
  label: "Sign in required",
  state: "not_started"
};

function DiscordPageContent() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const [discordState, setDiscordState] = useState<DiscordState>(fallbackState);
  const [discordHandle, setDiscordHandle] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !user) {
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      const accessToken = data.session?.access_token;

      if (!accessToken) {
        return;
      }

      const response = await fetch("/api/member/discord", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as DiscordState;
      setDiscordState(payload);
      setDiscordHandle(payload.discordHandle ?? "");
    });
  }, [user]);

  const callbackStatus = searchParams.get("status");
  const provisioningStatus = searchParams.get("provisioning");
  const callbackReason = searchParams.get("reason");

  async function runAction(action: "start" | "complete") {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    setWorking(true);
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (!accessToken) {
      setWorking(false);
      return;
    }

    const response = await fetch("/api/member/discord", {
      body: JSON.stringify({
        action,
        discordHandle
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      method: "POST"
    });

    if (response.ok) {
      const payload = (await response.json()) as DiscordState;
      setDiscordState(payload);
      setDiscordHandle(payload.discordHandle ?? discordHandle);
    }

    setWorking(false);
  }

  async function startDiscordOauth() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    setWorking(true);
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (!accessToken) {
      setWorking(false);
      return;
    }

    const response = await fetch("/api/member/discord/oauth-url", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: "POST"
    });

    if (!response.ok) {
      setWorking(false);
      return;
    }

    const payload = (await response.json()) as { url?: string };

    if (payload.url) {
      window.location.href = payload.url;
      return;
    }

    setWorking(false);
  }

  const statusTone = useMemo(() => {
    switch (discordState.state) {
      case "inside":
      case "linked":
        return styles.success;
      case "started":
        return styles.progress;
      case "failed":
        return styles.warning;
      default:
        return styles.pending;
    }
  }, [discordState.state]);

  const isLinked = discordState.state === "linked" || discordState.state === "inside";
  const isStarted = discordState.state === "started";

  return (
    <HuddleShell mode="member" primaryAction={{ href: "/member", label: "Back home" }}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Discord</p>
          <h1>Get into the room.</h1>
          <p className={styles.heroBody}>
            This is the social handoff after entry. The competition is the wedge. The room is what makes it feel alive.
          </p>
          {callbackStatus === "linked" ? (
            <p className={styles.statusNote}>Discord came back cleanly. Huddle has that link now.</p>
          ) : null}
          {callbackStatus === "linked" && provisioningStatus === "failed" ? (
            <p className={styles.statusNote}>
              Discord linked, but the server access step still needs a founder-side fix. The account link itself succeeded.
            </p>
          ) : null}
          {callbackStatus === "failed" ? (
            <p className={styles.statusNote}>
              Discord callback failed.
              {callbackReason ? ` ${callbackReason}` : " Use the manual bridge for now, then retry."}
            </p>
          ) : null}
          {callbackStatus === "cancelled" ? (
            <p className={styles.statusNote}>Discord auth was cancelled before completion.</p>
          ) : null}
          <div className={styles.ctaRow}>
            {!user ? (
              <a className={`${styles.button} ${styles.primary}`} href="/login">
                Log in to connect Discord
              </a>
            ) : isLinked ? (
              <a className={`${styles.button} ${styles.primary}`} href="/member">
                Back to member home
              </a>
            ) : (
              <button
                className={`${styles.button} ${styles.primary}`}
                disabled={loading || working}
                onClick={() => void startDiscordOauth()}
                type="button"
              >
                {isStarted ? "Reconnect Discord" : "Connect Discord"}
              </button>
            )}
            <a
              className={`${styles.button} ${styles.secondary}`}
              href="https://discord.com/app"
              rel="noreferrer"
              target="_blank"
            >
              Open Discord
            </a>
            {!isLinked ? (
              <a className={`${styles.button} ${styles.secondary}`} href="/member">
                Back to member home
              </a>
            ) : null}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={`${styles.detailCard} ${styles.dark}`}>
            <p className={styles.detailLabel}>Current state</p>
            <p className={`${styles.detailValue} ${statusTone}`}>{discordState.label}</p>
            <p className={styles.detailBody}>{discordState.detail}</p>
          </div>
          <div className={`${styles.detailCard} ${styles.light}`}>
            <p className={styles.detailLabel}>Competition</p>
            <p className={styles.detailValue}>{discordState.competitionShortName}</p>
            <p className={styles.detailBody}>
              {discordState.email ? `Signed in as ${discordState.email}` : "Use your Huddle account first."}
            </p>
          </div>
        </aside>
      </section>

      {isLinked ? (
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Connected</p>
            <h2>The link is in place.</h2>
            <p className={styles.sectionBody}>
              Huddle has the Discord connection now. The remaining work is founder-side access cleanup only if the room setup needs adjustment.
            </p>
          </div>

          <div className={styles.successGrid}>
            <article className={styles.successCard}>
              <p className={styles.detailLabel}>Discord account</p>
              <p className={styles.successValue}>{discordHandle || "Connected cleanly"}</p>
              <p className={styles.detailBody}>
                {discordHandle
                  ? "This is the account Huddle has on file for the community step."
                  : "The OAuth link succeeded even if the handle has not been surfaced yet."}
              </p>
            </article>

            <article className={styles.successCard}>
              <p className={styles.detailLabel}>What now</p>
              <p className={styles.successValue}>You are past the hard part.</p>
              <p className={styles.detailBody}>
                Go back inside. If the room access still looks off, a founder can clean that up without re-linking your account.
              </p>
            </article>
          </div>
        </section>
      ) : (
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Link status</p>
            <h2>Confirm the social layer.</h2>
            <p className={styles.sectionBody}>
              This is the interim bridge while the room logic gets cleaner. The goal is simple: connect Discord, get into the room, and let Huddle hold that state properly.
            </p>
          </div>

          <div className={styles.controlsGrid}>
            <article className={styles.controlCard}>
              <span>1</span>
              <h3>Start the handoff</h3>
              <p>Open Discord, find the room, and begin the inside step properly.</p>
              <button
                className={styles.inlineButton}
                disabled={loading || working || !user}
                onClick={() => void runAction("start")}
                type="button"
              >
                Mark started
              </button>
            </article>

            <article className={styles.controlCard}>
              <span>2</span>
              <h3>Save your handle</h3>
              <p>Useful if a founder needs to reconcile room access manually.</p>
              <label className={styles.field}>
                <span>Discord handle</span>
                <input
                  onChange={(event) => setDiscordHandle(event.target.value)}
                  placeholder="@yourname"
                  type="text"
                  value={discordHandle}
                />
              </label>
            </article>

            <article className={styles.controlCard}>
              <span>3</span>
              <h3>Confirm you are in</h3>
              <p>Once you have joined the room, mark it here so Huddle and the founder queue stop treating you as pending.</p>
              <button
                className={`${styles.inlineButton} ${styles.confirm}`}
                disabled={loading || working || !user}
                onClick={() => void runAction("complete")}
                type="button"
              >
                I joined the room
              </button>
            </article>
          </div>
        </section>
      )}
    </HuddleShell>
  );
}

export default function DiscordPage() {
  return (
    <Suspense
      fallback={
        <HuddleShell mode="member" primaryAction={{ href: "/member", label: "Back home" }}>
          <div />
        </HuddleShell>
      }
    >
      <DiscordPageContent />
    </Suspense>
  );
}
