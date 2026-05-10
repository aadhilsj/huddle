"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { getSupabaseBrowserClient } from "@/lib/supabase";

type AppUserRole = "member" | "founder";

type AppUser = {
  displayName: string | null;
  email: string;
  id: string;
  role: AppUserRole;
};

type AppUserRow = {
  display_name: string | null;
  email: string;
  id: string;
  role: AppUserRole;
};

type AuthContextValue = {
  appUser: AppUser | null;
  loading: boolean;
  requestOtp: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  user: User | null;
  verifyOtp: (args: {
    email: string;
    name?: string;
    token: string;
  }) => Promise<{ error: string | null; role: AppUserRole | null }>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchAppUser(userId: string) {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("app_users")
    .select("id, email, display_name, role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("App user fetch failed.", error);
    return null;
  }

  if (!data) {
    return null;
  }

  const row = data as AppUserRow;

  return {
    displayName: row.display_name,
    email: row.email,
    id: row.id,
    role: row.role
  } satisfies AppUser;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) {
        return;
      }

      setSession(data.session);

      if (data.session?.user) {
        const nextAppUser = await fetchAppUser(data.session.user.id);

        if (mounted) {
          setAppUser(nextAppUser);
        }
      }

      if (mounted) {
        setLoading(false);
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);

      if (!nextSession?.user) {
        setAppUser(null);
        setLoading(false);
        return;
      }

      fetchAppUser(nextSession.user.id).then((nextAppUser) => {
        if (mounted) {
          setAppUser(nextAppUser);
          setLoading(false);
        }
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const requestOtp = useCallback(async (email: string) => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return { error: "Supabase is not configured." };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false
      }
    });

    return { error: error?.message ?? null };
  }, []);

  const verifyOtp = useCallback(
    async ({ email, token, name }: { email: string; token: string; name?: string }) => {
      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        return { error: "Supabase is not configured.", role: null };
      }

      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email"
      });

      if (error) {
        return { error: error.message, role: null };
      }

      const user = data.user;

      if (!user?.id || !user.email) {
        return { error: "No authenticated user came back from Supabase.", role: null };
      }

      const existingAppUser = await fetchAppUser(user.id);

      if (!existingAppUser) {
        const { error: insertError } = await (supabase.from("app_users") as unknown as {
          insert: (values: AppUserRow) => Promise<{ error: { message: string } | null }>;
        }).insert({
          display_name: name?.trim() || user.email,
          email: user.email,
          id: user.id,
          role: "member"
        });

        if (insertError) {
          console.error("App user insert failed.", insertError);
          return { error: insertError.message, role: null };
        }
      }

      const nextAppUser = await fetchAppUser(user.id);
      setSession(data.session);
      setAppUser(nextAppUser);

      return { error: null, role: nextAppUser?.role ?? "member" };
    },
    []
  );

  const signOut = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setSession(null);
    setAppUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      appUser,
      loading,
      requestOtp,
      signOut,
      user: session?.user ?? null,
      verifyOtp
    }),
    [appUser, loading, requestOtp, session?.user, signOut, verifyOtp]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
