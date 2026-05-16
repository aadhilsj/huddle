"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/auth-provider";

import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { appUser, loading, requestOtp, user, verifyOtp } = useAuth();
  const [step, setStep] = useState<"request" | "verify">("request");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  async function handleRequestOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorking(true);
    setError(null);
    setSuccess(null);

    const result = await requestOtp(email.trim().toLowerCase());

    setWorking(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess("A code has been sent to your email. Enter it below.");
    setStep("verify");
  }

  async function handleVerifyOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorking(true);
    setError(null);
    setSuccess(null);

    const result = await verifyOtp({
      email: email.trim().toLowerCase(),
      name,
      token: token.trim()
    });

    setWorking(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess("You are signed in.");
    router.push(result.role === "founder" ? "/founder" : "/member");
    router.refresh();
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Login</p>
          <h1>Get back inside.</h1>
          <p className={styles.heroBody}>
            Huddle login stays light. Enter your email, take the code, and get back to the room without another password to remember.
          </p>
          <p className={styles.heroNote}>
            Founders and members enter through the same door. Your role decides what opens after that.
          </p>
        </div>

        <aside className={styles.formStack}>
          <div className={styles.card}>
            <p className={styles.stepTag}>{step === "request" ? "Request code" : "Enter code"}</p>
            {error ? <p className={styles.errorText}>{error}</p> : null}
            {success ? <p className={styles.successText}>{success}</p> : null}

            {step === "request" ? (
              <form className={styles.form} onSubmit={handleRequestOtp}>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    placeholder="Aadhil Shahjahan"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <p className={styles.fieldHelp}>
                  This flow expects a numeric code, not a magic link.
                </p>
                <button className={styles.button} disabled={working} type="submit">
                  {working ? "Sending code..." : "Send code"}
                </button>
              </form>
            ) : (
              <form className={styles.form} onSubmit={handleVerifyOtp}>
                <div className={styles.field}>
                  <label htmlFor="token">One-time code</label>
                  <input
                    id="token"
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    inputMode="numeric"
                    type="text"
                    placeholder="123456"
                    required
                  />
                </div>
                <div className={styles.actionRow}>
                  <button className={styles.button} disabled={working} type="submit">
                    {working ? "Verifying..." : "Verify and enter"}
                  </button>
                  <button
                    className={styles.ghostButton}
                    disabled={working}
                    onClick={() => setStep("request")}
                    type="button"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className={styles.lightCard}>
            <p className={styles.stepTag}>Current session</p>
            <strong>
              {loading
                ? "Checking..."
                : user
                  ? appUser?.role === "founder"
                    ? "Founder"
                    : "Member"
                  : "Logged out"}
            </strong>
            <p>
              {user ? (
                <>
                  Signed in as {user.email}.{" "}
                  <Link href={appUser?.role === "founder" ? "/founder" : "/member"}>
                    Open your route
                  </Link>
                </>
              ) : (
                "No session yet. Request a code and come in properly."
                
              )}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
