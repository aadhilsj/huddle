create table if not exists join_requests (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid references competitions(id) on delete set null,
  competition_name text not null,
  full_name text not null,
  email text not null,
  home_city text,
  source_channel text,
  source_detail text,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists join_requests_email_idx
  on join_requests (email, created_at desc);

drop trigger if exists join_requests_set_updated_at on join_requests;
create trigger join_requests_set_updated_at
before update on join_requests
for each row execute function set_updated_at();

alter table join_requests enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant insert on table public.join_requests to anon, authenticated, service_role;

drop policy if exists "public can create join requests" on join_requests;
create policy "public can create join requests"
on join_requests
for insert
with check (true);

drop policy if exists "public can read own-looking join requests" on join_requests;
create policy "public can read own-looking join requests"
on join_requests
for select
using (false);
