"use client";

import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import styles from "./huddle-shell.module.css";

type NavItem = {
  href: string;
  label: string;
  minRole?: "member" | "founder";
};

type ShellMode = "public" | "member" | "founder";

type ShellAction = {
  href: string;
  label: string;
};

type DrawerLinkItem = NavItem & {
  detail?: string;
};

type DrawerSection = {
  heading: string;
  items: DrawerLinkItem[];
};

const fantasyLeagueItems: DrawerLinkItem[] = [
  { href: "/leagues/world-cup", label: "FIFA World Cup Fantasy" },
  { href: "/leagues/nba", label: "NBA Fantasy" },
  { href: "/leagues/f1", label: "F1 Fantasy" }
];

const memberDashboardItems: DrawerLinkItem[] = [
  { href: "/member", label: "Foyer" },
  { href: "/profile", label: "Profile" },
  { href: "/discord", label: "Discord" }
];

const archiveDashboardItems: DrawerLinkItem[] = [
  { href: "/history/nba", label: "NBA Archive" },
  { href: "/history/f1", label: "F1 Archive" }
];

const founderDashboardItems: DrawerLinkItem[] = [
  { href: "/founder", label: "Overview" },
  { href: "/founder/intake", label: "Intake" }
];

export function HuddleShell({
  brandHref = "/",
  mode = "public",
  navItems = [],
  primaryAction,
  children
}: {
  brandHref?: string;
  mode?: ShellMode;
  navItems?: NavItem[];
  primaryAction?: ShellAction;
  children: ReactNode;
}) {
  void primaryAction;
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const dashboardButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);
  const { appUser, loading, signOut, user } = useAuth();
  const effectiveRole =
    appUser?.role ?? (mode === "founder" ? "founder" : mode === "member" ? "member" : null);
  const drawerSections: DrawerSection[] = useMemo(() => {
    const sections: DrawerSection[] = [];

    sections.push({
      heading: "Fantasy Leagues",
      items: fantasyLeagueItems
    });

    if (effectiveRole === "member" || effectiveRole === "founder") {
      sections.push({
        heading: "Member",
        items: memberDashboardItems
      });

      sections.push({
        heading: "Archive",
        items: archiveDashboardItems
      });
    }

    if (effectiveRole === "founder") {
      sections.push({
        heading: "Founder",
        items: founderDashboardItems
      });
    }

    return sections;
  }, [effectiveRole]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!navOpen) {
        return;
      }

      const target = event.target as Node;

      if (dashboardButtonRef.current?.contains(target) || drawerRef.current?.contains(target)) {
        return;
      }

      if (navOpen) {
        setNavOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navOpen]);

  const showBackButton = pathname !== "/";

  return (
    <main className={styles.pageShell}>
      <div className={styles.topbarWrap}>
        <header className={styles.topbar}>
          <div className={styles.brandBlock}>
            <Link href={brandHref as Route} className={styles.brand} aria-label="Huddle home">
              Huddle
            </Link>
            {showBackButton ? (
              <button
                className={styles.backButton}
                onClick={() => router.back()}
                type="button"
                aria-label="Back"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15.5 5.5 9 12l6.5 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Back</span>
              </button>
            ) : null}
          </div>

          <nav className={styles.globalNav} aria-label="Primary">
            <Link href="/" className={styles.globalNavHome} aria-label="Home">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4.5 10.75 12 4.75l7.5 6v8a1 1 0 0 1-1 1h-4.75v-5.5h-3.5v5.5H5.5a1 1 0 0 1-1-1z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/story" className={styles.globalNavLink}>
              Our Story
            </Link>
            <button
              ref={dashboardButtonRef}
              className={styles.globalNavButton}
              onClick={() => setNavOpen((current) => !current)}
              type="button"
              aria-expanded={navOpen}
              aria-controls="huddle-route-drawer"
            >
              Dashboard
            </button>
          </nav>

          <div className={styles.topbarRight}>
            <div className={styles.authCluster}>
              {loading ? <span className={styles.authStatus}>Checking…</span> : null}
              {!loading && user ? (
                <>
                  <button className={styles.secondaryAction} onClick={() => void signOut()} type="button">
                    Log out
                  </button>
                </>
              ) : null}
              {!loading && !user ? (
                <Link href="/login" className={styles.secondaryAction}>
                  Login
                </Link>
              ) : null}
            </div>
          </div>
        </header>

        {drawerSections.length ? (
          <aside
            ref={drawerRef}
            id="huddle-route-drawer"
            className={navOpen ? styles.routeDrawerOpen : styles.routeDrawer}
            aria-label="Site sections"
          >
            <div className={styles.routeDrawerHeader}>
              <span className={styles.routeDrawerEyebrow}>Dashboard</span>
            </div>
            <div className={styles.routeDrawerGrid}>
              {drawerSections.map((section) => (
                <section key={section.heading} className={styles.routeDrawerSection}>
                  <h2>{section.heading}</h2>
                  <nav className={styles.routeDrawerLinks} aria-label={section.heading}>
                    {section.items.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(`${item.href}/`));

                      return (
                        <Link
                          key={`${section.heading}-${item.href}`}
                          href={item.href as Route}
                          className={isActive ? styles.drawerLinkActive : styles.drawerLink}
                          onClick={() => setNavOpen(false)}
                        >
                          <span className={styles.drawerLinkCopy}>
                            <span>{item.label}</span>
                            {item.detail ? <small>{item.detail}</small> : null}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </section>
              ))}
            </div>
          </aside>
        ) : null}
      </div>

      {navItems.length ? (
        <nav className={styles.localNav} aria-label="On this page">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href as Route}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}

      {children}
    </main>
  );
}
