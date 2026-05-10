grant update on table public.join_requests to authenticated, service_role;

drop policy if exists "founders can update join requests" on join_requests;
create policy "founders can update join requests"
on join_requests
for update
to authenticated
using (
  exists (
    select 1
    from public.app_users
    where app_users.id = auth.uid()
      and app_users.role = 'founder'
  )
)
with check (
  exists (
    select 1
    from public.app_users
    where app_users.id = auth.uid()
      and app_users.role = 'founder'
  )
);
