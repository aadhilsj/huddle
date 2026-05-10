import crypto from "node:crypto";

const DISCORD_API_BASE = "https://discord.com/api";

const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordGuildId = process.env.DISCORD_GUILD_ID;
const discordMemberRoleId = process.env.DISCORD_MEMBER_ROLE_ID;
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const discordStateSecret = process.env.DISCORD_STATE_SECRET ?? "discord-dev-secret";

export type DiscordStatePayload = {
  appUserId: string;
  memberId?: string;
  timestamp: number;
};

export function isDiscordConfigured() {
  return Boolean(discordClientId && discordClientSecret);
}

export function isDiscordGuildProvisioningConfigured() {
  return Boolean(discordBotToken && discordGuildId);
}

export function getDiscordRedirectUri() {
  return `${appUrl}/api/discord/callback`;
}

function base64url(value: string) {
  return Buffer.from(value).toString("base64url");
}

export function signDiscordState(payload: DiscordStatePayload) {
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", discordStateSecret)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifyDiscordState(state: string): DiscordStatePayload | null {
  const [encodedPayload, signature] = state.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", discordStateSecret)
    .update(encodedPayload)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as DiscordStatePayload;

    if (!payload.appUserId || !payload.timestamp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function buildDiscordAuthorizeUrl(state: string) {
  if (!discordClientId) {
    throw new Error("Discord client id is missing.");
  }

  const params = new URLSearchParams({
    client_id: discordClientId,
    redirect_uri: getDiscordRedirectUri(),
    response_type: "code",
    scope: isDiscordGuildProvisioningConfigured() ? "identify guilds.join" : "identify",
    state
  });

  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export async function exchangeDiscordCode(code: string) {
  if (!discordClientId || !discordClientSecret) {
    throw new Error("Discord OAuth is not configured.");
  }

  const params = new URLSearchParams({
    client_id: discordClientId,
    client_secret: discordClientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: getDiscordRedirectUri()
  });

  const response = await fetch(`${DISCORD_API_BASE}/oauth2/token`, {
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Discord token exchange failed.");
  }

  return response.json() as Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  }>;
}

export async function fetchDiscordUser(accessToken: string) {
  const response = await fetch(`${DISCORD_API_BASE}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error("Discord user fetch failed.");
  }

  return response.json() as Promise<{
    avatar: string | null;
    global_name: string | null;
    id: string;
    username: string;
  }>;
}

export async function addDiscordUserToGuild(args: {
  accessToken: string;
  nickname?: string;
  roleIds?: string[];
  userId: string;
}) {
  if (!discordBotToken || !discordGuildId) {
    return { provisioned: false };
  }

  const response = await fetch(`${DISCORD_API_BASE}/guilds/${discordGuildId}/members/${args.userId}`, {
    body: JSON.stringify({
      access_token: args.accessToken,
      nick: args.nickname,
      roles: args.roleIds && args.roleIds.length ? args.roleIds : undefined
    }),
    headers: {
      Authorization: `Bot ${discordBotToken}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });

  if (!response.ok && response.status !== 201 && response.status !== 204) {
    throw new Error("Discord guild join failed.");
  }

  return { provisioned: true };
}

export async function applyDiscordRole(args: { roleId: string; userId: string }) {
  if (!discordBotToken || !discordGuildId) {
    return { applied: false };
  }

  const response = await fetch(
    `${DISCORD_API_BASE}/guilds/${discordGuildId}/members/${args.userId}/roles/${args.roleId}`,
    {
      headers: {
        Authorization: `Bot ${discordBotToken}`
      },
      method: "PUT"
    }
  );

  if (!response.ok && response.status !== 204) {
    throw new Error("Discord role apply failed.");
  }

  return { applied: true };
}

export function getDiscordMemberRoleId() {
  return discordMemberRoleId ?? null;
}
