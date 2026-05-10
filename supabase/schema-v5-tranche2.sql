create table if not exists public.sports (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  archive_status text not null default 'planned',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.seasons (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid not null references public.sports(id) on delete cascade,
  slug text not null unique,
  season_label text not null,
  division_label text,
  tier integer,
  status text not null default 'awaiting_import',
  started_at date,
  ended_at date,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.franchises (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid not null references public.sports(id) on delete cascade,
  slug text not null unique,
  display_name text not null,
  franchise_status text not null default 'active',
  origin_city text,
  defunct_at date,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.franchise_status_history (
  id uuid primary key default gen_random_uuid(),
  franchise_id uuid not null references public.franchises(id) on delete cascade,
  status text not null,
  effective_from date,
  effective_to date,
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.member_franchises (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  franchise_id uuid not null references public.franchises(id) on delete cascade,
  sport_id uuid not null references public.sports(id) on delete cascade,
  role_label text default 'gm',
  active boolean not null default true,
  assigned_from date,
  assigned_to date,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.franchise_seasons (
  id uuid primary key default gen_random_uuid(),
  franchise_id uuid not null references public.franchises(id) on delete cascade,
  season_id uuid not null references public.seasons(id) on delete cascade,
  member_id uuid references public.members(id) on delete set null,
  final_rank integer,
  wins integer,
  losses integer,
  points_for numeric,
  points_against numeric,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  unique (franchise_id, season_id)
);

create table if not exists public.season_standings (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete cascade,
  franchise_id uuid not null references public.franchises(id) on delete cascade,
  rank integer not null,
  wins integer,
  losses integer,
  points_for numeric,
  points_against numeric,
  prize_amount numeric,
  created_at timestamptz not null default timezone('utc', now()),
  unique (season_id, franchise_id)
);

create table if not exists public.awards (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid references public.sports(id) on delete cascade,
  slug text not null unique,
  display_name text not null,
  award_type text not null,
  description text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.award_results (
  id uuid primary key default gen_random_uuid(),
  award_id uuid not null references public.awards(id) on delete cascade,
  season_id uuid references public.seasons(id) on delete cascade,
  member_id uuid references public.members(id) on delete set null,
  franchise_id uuid references public.franchises(id) on delete set null,
  result_label text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.prize_records (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete cascade,
  franchise_id uuid references public.franchises(id) on delete set null,
  member_id uuid references public.members(id) on delete set null,
  prize_label text not null,
  prize_amount numeric,
  currency text default 'LKR',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.head_to_head_results (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid not null references public.sports(id) on delete cascade,
  season_id uuid references public.seasons(id) on delete cascade,
  left_member_id uuid references public.members(id) on delete set null,
  right_member_id uuid references public.members(id) on delete set null,
  left_franchise_id uuid references public.franchises(id) on delete set null,
  right_franchise_id uuid references public.franchises(id) on delete set null,
  winner_side text,
  margin numeric,
  notes text,
  occurred_on date,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.member_profile_summaries (
  member_id uuid primary key references public.members(id) on delete cascade,
  display_name text not null,
  archive_status text not null default 'awaiting_import',
  current_city text,
  titles_count integer not null default 0,
  awards_count integer not null default 0,
  rivalry_summary text,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.franchise_profile_summaries (
  franchise_id uuid primary key references public.franchises(id) on delete cascade,
  display_name text not null,
  archive_status text not null default 'awaiting_import',
  current_status text not null default 'active',
  titles_count integer not null default 0,
  awards_count integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.head_to_head_summaries (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid not null references public.sports(id) on delete cascade,
  left_entity_type text not null,
  left_entity_id uuid not null,
  right_entity_type text not null,
  right_entity_id uuid not null,
  left_wins integer not null default 0,
  right_wins integer not null default 0,
  notes text,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.sport_archive_summaries (
  sport_id uuid primary key references public.sports(id) on delete cascade,
  top_division_seasons integer not null default 0,
  lower_division_seasons integer not null default 0,
  archive_status text not null default 'awaiting_import',
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.season_archive_summaries (
  season_id uuid primary key references public.seasons(id) on delete cascade,
  archive_status text not null default 'awaiting_import',
  champion_member_id uuid references public.members(id) on delete set null,
  champion_franchise_id uuid references public.franchises(id) on delete set null,
  prize_summary text,
  updated_at timestamptz not null default timezone('utc', now())
);

grant usage on schema public to service_role;
grant all privileges on all tables in schema public to service_role;
grant all privileges on all sequences in schema public to service_role;
grant all privileges on all routines in schema public to service_role;

alter default privileges in schema public
grant all privileges on tables to service_role;

alter default privileges in schema public
grant all privileges on sequences to service_role;

alter default privileges in schema public
grant all privileges on routines to service_role;

insert into public.sports (slug, name, archive_status)
values
  ('nba', 'NBA', 'bones_live'),
  ('f1', 'F1', 'planned'),
  ('world-cup', 'World Cup', 'planned')
on conflict (slug) do update
set
  name = excluded.name,
  archive_status = excluded.archive_status;
