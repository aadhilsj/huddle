# Huddle App Skeleton

This workspace now includes a real app skeleton for Huddle using:

- Next.js App Router
- Vercel-friendly routing
- Supabase-ready client setup

## Routes

- `/` -> Huddle FIFA World Cup landing page
- `/join` -> public join request flow
- `/join/success` -> intake success state
- `/checkout` -> PayHere checkout handoff
- `/api/payhere/notify` -> PayHere payment confirmation endpoint
- `/onboarding` -> onboarding state scaffold
- `/discord` -> Discord linkage step
- `/api/member/discord` -> member-side Discord state/actions
- `/api/member/discord/oauth-url` -> Discord OAuth start
- `/api/discord/callback` -> Discord OAuth callback
- `/login` -> OTP login
- `/member` -> member foyer
- `/founder` -> founder dashboard
- `/founder/intake` -> real join request queue
- `/story` -> Huddle story page

## Navigation

- The app shell now has three navigation modes: `public`, `member`, and `founder`.
- Each mode shares one global top nav and one persistent action button.
- Individual pages can still add local section nav beneath the header when a route is long enough to need it.

## Notes

- The founder dashboard now attempts to read public snapshot rows from Supabase first.
- The member foyer now attempts to read the active public competition and World Cup entry count from Supabase first.
- The join page now writes real `join_requests` rows once the v2 SQL is run.
- The founder intake page now reads real `join_requests` rows so demand is visible as people, not just aggregate counts.
- Checkout now has a PayHere handoff path, country-aware pricing display, and a notify callback route that can create members, memberships, payments, and payment-confirmed onboarding events.
- OTP auth now creates app-level users in `app_users`, which is the bridge between Supabase auth and Huddle’s own roles.
- Discord now has both a manual bridge and a real OAuth/callback skeleton, so member-facing social onboarding can move from placeholder state into actual linkage.
- If the snapshot table is empty or the SQL has not been run yet, it falls back to the original design-phase placeholder values.
- Member-specific identity fields are still in a safe placeholder state until auth and real member lookup are added.
- The visual bones are ready. The next step is running the initial Supabase schema and then replacing more placeholder data with real queries.

## Supabase schema

Run the SQL in [supabase/schema.sql](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/supabase/schema.sql) inside the Supabase SQL editor.

That file creates the first core tables:

- `members`
- `competitions`
- `competition_memberships`
- `payments`
- `onboarding_events`
- `member_classifications`
- `metric_snapshots`

It also seeds:

- one public competition row for the FIFA World Cup league
- one public founder snapshot set so `/founder` can render from real Supabase data immediately

Then run [supabase/schema-v2.sql](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/supabase/schema-v2.sql) to add:

- `join_requests`
- the public insert policy the `/join` form needs

Then run [supabase/schema-v3.sql](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/supabase/schema-v3.sql) to add:

- `app_users`
- founder-only select access to `join_requests`
- the role bridge between Supabase Auth and Huddle’s own route access

Then run [supabase/schema-v4.sql](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/supabase/schema-v4.sql) to add:

- founder update access to `join_requests`
- intake queue action support (`reviewed`, `approved`, `pending`)

## Discord setup

To activate the real Discord link flow instead of only the manual bridge, add these env vars:

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_STATE_SECRET`

Optional for automatic guild join / role assignment:

- `DISCORD_BOT_TOKEN`
- `DISCORD_GUILD_ID`
- `DISCORD_MEMBER_ROLE_ID`

The Discord OAuth callback route is:

- `/api/discord/callback`

What the app does today:

- member opens `/discord`
- app creates a signed Discord OAuth state
- Discord sends the user back to the callback
- the callback updates:
  - `members.discord_user_id`
  - `members.discord_handle`
  - `onboarding_events`

If bot and guild envs are set too, the callback can also:

- add the member to the Discord guild
- apply the configured member role

Until those env vars exist, the manual founder/member Discord state controls still work as a bridge.

## PayHere setup

To activate real checkout instead of the scaffolded fallback, add these env vars:

- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `PAYHERE_MERCHANT_ID`
- `PAYHERE_MERCHANT_SECRET`
- `PAYHERE_SANDBOX`
- `BASE_ENTRY_FEE_LKR`

The checkout page:

- stores one base price in LKR
- detects country from request headers/IP
- displays an estimated local currency price for at least:
  - `LKR`
  - `USD`
  - `GBP`
  - `EUR`
  - `NOK`
  - `AUD`
  - `CAD`
- settles through PayHere in `LKR` for Sri Lanka and `USD` elsewhere

The payment callback route is:

- `/api/payhere/notify`

Once PayHere is connected:

- the checkout page posts directly to PayHere
- PayHere sends the member back into onboarding after payment
- the `notify_url` callback creates or updates:
  - `members`
  - `competition_memberships`
  - `payments`
  - `onboarding_events`
  - `join_requests.status`

## Install

Once you are back in your normal local setup with a package manager available:

```bash
npm install
npm run dev
```

Or use the package manager you prefer.
