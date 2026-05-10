create extension if not exists pgcrypto;

create type membership_status as enum ('pending', 'active', 'inactive', 'cancelled');
create type payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type onboarding_event_type as enum (
  'payment_confirmed',
  'discord_link_started',
  'discord_link_completed',
  'discord_role_applied',
  'onboarding_completed',
  'onboarding_failed'
);
create type onboarding_status as enum ('pending', 'completed', 'failed');
create type classification_key as enum (
  'colombo_local_core',
  'colombo_orbit',
  'huddle_active_core'
);
create type classification_status as enum ('suggested', 'confirmed', 'excluded');

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text unique,
  home_city text,
  current_city text,
  country_code text,
  discord_user_id text unique,
  discord_handle text,
  source_channel text,
  source_detail text,
  member_status membership_status not null default 'pending',
  joined_at timestamptz not null default timezone('utc', now()),
  notes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists competitions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sport text not null,
  competition_format text not null,
  is_active boolean not null default false,
  is_public boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists competition_memberships (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  competition_id uuid not null references competitions(id) on delete cascade,
  membership_status membership_status not null default 'pending',
  payment_status payment_status not null default 'pending',
  joined_at timestamptz not null default timezone('utc', now()),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (member_id, competition_id)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id) on delete set null,
  competition_membership_id uuid references competition_memberships(id) on delete set null,
  provider text not null,
  provider_payment_id text unique,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'USD',
  payment_status payment_status not null default 'pending',
  paid_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists onboarding_events (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  competition_membership_id uuid references competition_memberships(id) on delete set null,
  event_type onboarding_event_type not null,
  event_status onboarding_status not null default 'pending',
  detail text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists member_classifications (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  classification_key classification_key not null,
  classification_status classification_status not null default 'suggested',
  assigned_by text not null default 'system',
  rationale text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (member_id, classification_key)
);

create table if not exists metric_snapshots (
  id uuid primary key default gen_random_uuid(),
  metric_key text not null,
  snapshot_scope text not null default 'global',
  value_numeric numeric,
  value_text text,
  value_unit text,
  detail text,
  is_public boolean not null default false,
  captured_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  check (value_numeric is not null or value_text is not null)
);

create index if not exists competition_memberships_member_idx
  on competition_memberships (member_id);

create index if not exists competition_memberships_competition_idx
  on competition_memberships (competition_id);

create index if not exists payments_member_idx
  on payments (member_id);

create index if not exists onboarding_events_member_idx
  on onboarding_events (member_id, occurred_at desc);

create index if not exists member_classifications_member_idx
  on member_classifications (member_id, classification_key);

create index if not exists metric_snapshots_lookup_idx
  on metric_snapshots (metric_key, snapshot_scope, captured_at desc);

drop trigger if exists members_set_updated_at on members;
create trigger members_set_updated_at
before update on members
for each row execute function set_updated_at();

drop trigger if exists competitions_set_updated_at on competitions;
create trigger competitions_set_updated_at
before update on competitions
for each row execute function set_updated_at();

drop trigger if exists competition_memberships_set_updated_at on competition_memberships;
create trigger competition_memberships_set_updated_at
before update on competition_memberships
for each row execute function set_updated_at();

drop trigger if exists payments_set_updated_at on payments;
create trigger payments_set_updated_at
before update on payments
for each row execute function set_updated_at();

drop trigger if exists member_classifications_set_updated_at on member_classifications;
create trigger member_classifications_set_updated_at
before update on member_classifications
for each row execute function set_updated_at();

create or replace view latest_metric_snapshots as
select distinct on (metric_key, snapshot_scope)
  metric_key,
  snapshot_scope,
  value_numeric,
  value_text,
  value_unit,
  detail,
  is_public,
  captured_at
from metric_snapshots
order by metric_key, snapshot_scope, captured_at desc;

alter table members enable row level security;
alter table competitions enable row level security;
alter table competition_memberships enable row level security;
alter table payments enable row level security;
alter table onboarding_events enable row level security;
alter table member_classifications enable row level security;
alter table metric_snapshots enable row level security;

drop policy if exists "public competitions are readable" on competitions;
create policy "public competitions are readable"
on competitions
for select
using (is_public = true);

drop policy if exists "public metric snapshots are readable" on metric_snapshots;
create policy "public metric snapshots are readable"
on metric_snapshots
for select
using (is_public = true);

insert into competitions (slug, name, sport, competition_format, is_active, is_public)
values (
  'huddle-fifa-world-cup-2026',
  'Huddle FIFA World Cup Fantasy League',
  'Football',
  'Fantasy league',
  true,
  true
)
on conflict (slug) do update set
  name = excluded.name,
  sport = excluded.sport,
  competition_format = excluded.competition_format,
  is_active = excluded.is_active,
  is_public = excluded.is_public,
  updated_at = timezone('utc', now());

insert into metric_snapshots (
  metric_key,
  snapshot_scope,
  value_numeric,
  value_text,
  value_unit,
  detail,
  is_public
)
values
  ('current_focus', 'global', null, 'World Cup + Colombo', null, 'Traffic is useful. Density is what matters.', true),
  ('colombo_active_core', 'global', 18, null, null, 'Members with repeated, recent participation.', true),
  ('world_cup_entries', 'global', 43, null, null, 'Confirmed entries for the current tournament.', true),
  ('next_league_intent', 'global', 31, null, '%', 'Members likely to return for what comes next.', true),
  ('discord_join_completion', 'global', 91, null, '%', 'Members who paid and made it fully inside.', true),
  ('density_colombo_local_core', 'global', 18, null, null, 'Founder-defined local density.', true),
  ('density_colombo_orbit', 'global', 27, null, null, 'Members socially tied to Colombo but not locally dense.', true),
  ('density_huddle_active_core', 'global', 41, null, null, 'Members with repeated, recent participation across Huddle.', true),
  ('funnel_landing_to_join_click', 'global', 12.4, null, '%', 'Landing page visitors who click into join flow.', true),
  ('funnel_join_click_to_paid_entry', 'global', 8.1, null, '%', 'Join clicks that convert into a paid entry.', true),
  ('funnel_paid_entry_to_discord_complete', 'global', 91, null, '%', 'Paid entrants who complete Discord onboarding.', true);
