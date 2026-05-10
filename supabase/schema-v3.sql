do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'app_role'
  ) then
    create type app_role as enum ('member', 'founder');
  end if;
end $$;

create table if not exists app_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role app_role not null default 'member',
  member_id uuid references members(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists app_users_role_idx
  on app_users (role);

drop trigger if exists app_users_set_updated_at on app_users;
create trigger app_users_set_updated_at
before update on app_users
for each row execute function set_updated_at();

alter table app_users enable row level security;

grant usage on schema public to authenticated, service_role;
grant select, insert on table public.app_users to authenticated, service_role;
grant select on table public.join_requests to authenticated, service_role;

drop policy if exists "authenticated users can read own app user" on app_users;
create policy "authenticated users can read own app user"
on app_users
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "authenticated users can create own app user" on app_users;
create policy "authenticated users can create own app user"
on app_users
for insert
to authenticated
with check (auth.uid() = id and role = 'member');

drop policy if exists "founders can read join requests" on join_requests;
create policy "founders can read join requests"
on join_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.app_users
    where app_users.id = auth.uid()
      and app_users.role = 'founder'
  )
);

-- After your own account exists in app_users, promote it like this:
-- update public.app_users
-- set role = 'founder'
-- where email = 'you@example.com';
