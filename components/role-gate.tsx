"use client";

import Link from "next/link";

import { useAuth } from "@/components/auth-provider";

import styles from "./role-gate.module.css";

export function RoleGate({
  children,
  requiredRole
}: {
  children: React.ReactNode;
  requiredRole: "founder";
}) {
  const { appUser, loading, user } = useAuth();

  if (loading) {
    return <div className={styles.stateBox}>Checking access…</div>;
  }

  if (!user) {
    return (
      <div className={styles.stateBox}>
        <strong>Login required.</strong>
        <p>This area is protected. Sign in with your email code to continue.</p>
        <Link href="/login" className={styles.action}>
          Open login
        </Link>
      </div>
    );
  }

  if (!appUser || appUser.role !== requiredRole) {
    return (
      <div className={styles.stateBox}>
        <strong>Founder access only.</strong>
        <p>
          You are signed in, but this account does not have founder access yet. The role can be
          promoted in Supabase once the account exists.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
