import { NextResponse } from "next/server";

import { buildDiscordAuthorizeUrl, isDiscordConfigured, signDiscordState } from "@/lib/discord";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type AppUserRow = {
  display_name: string | null;
  email: string;
  id: string;
};

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
    .select("id, email, display_name")
    .eq("id", authUser.user.id)
    .maybeSingle();

  if (appUserError || !appUser) {
    return { error: NextResponse.json({ error: "No app user found." }, { status: 404 }) };
  }

  return { admin, appUser: appUser as AppUserRow };
}

export async function POST(request: Request) {
  const auth = await requireSignedInUser(request);

  if ("error" in auth) {
    return auth.error;
  }

  if (!isDiscordConfigured()) {
    return NextResponse.json({ error: "Discord is not configured yet." }, { status: 400 });
  }

  try {
    const state = signDiscordState({
      appUserId: auth.appUser.id,
      timestamp: Date.now()
    });

    return NextResponse.json({
      url: buildDiscordAuthorizeUrl(state)
    });
  } catch (error) {
    console.error("Discord authorize URL build failed.", error);
    return NextResponse.json({ error: "Could not start Discord link." }, { status: 500 });
  }
}
