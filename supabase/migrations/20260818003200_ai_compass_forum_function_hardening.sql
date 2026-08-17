-- Harden the forum API surface after the initial schema migration.
-- Supabase grants execute on new functions to API roles through default privileges, so trigger
-- functions must be explicitly removed from the callable RPC surface.

-- Public readers do not need moderator checks. Split anonymous and authenticated read policies.
drop policy if exists ai_compass_categories_public_read on public.ai_compass_forum_categories;
create policy ai_compass_categories_anon_read on public.ai_compass_forum_categories
for select to anon using (is_active);
create policy ai_compass_categories_auth_read on public.ai_compass_forum_categories
for select to authenticated using (is_active or public.ai_compass_is_moderator());

drop policy if exists ai_compass_threads_public_read on public.ai_compass_forum_threads;
create policy ai_compass_threads_anon_read on public.ai_compass_forum_threads
for select to anon using (status <> 'removed');
create policy ai_compass_threads_auth_read on public.ai_compass_forum_threads
for select to authenticated using (status <> 'removed' or public.ai_compass_is_moderator());

drop policy if exists ai_compass_replies_public_read on public.ai_compass_forum_replies;
create policy ai_compass_replies_anon_read on public.ai_compass_forum_replies
for select to anon using (status = 'visible');
create policy ai_compass_replies_auth_read on public.ai_compass_forum_replies
for select to authenticated using (status = 'visible' or public.ai_compass_is_moderator());

-- Users only need to read their own explicit role row. Moderator power is evaluated by helper.
drop policy if exists ai_compass_roles_self_read on public.ai_compass_user_roles;
create policy ai_compass_roles_self_read on public.ai_compass_user_roles
for select to authenticated using ((select auth.uid()) = user_id);

-- These helpers only inspect rows the current authenticated user is already permitted to see.
alter function public.ai_compass_current_role() security invoker;
alter function public.ai_compass_is_moderator() security invoker;
alter function public.ai_compass_can_post() security invoker;

-- Remove all browser-callable execute rights first, including Supabase's explicit default grants.
revoke execute on function public.ai_compass_current_role() from public, anon, authenticated;
revoke execute on function public.ai_compass_is_moderator() from public, anon, authenticated;
revoke execute on function public.ai_compass_can_post() from public, anon, authenticated;
revoke execute on function public.ai_compass_guard_profile_update() from public, anon, authenticated;
revoke execute on function public.ai_compass_guard_thread_insert() from public, anon, authenticated;
revoke execute on function public.ai_compass_guard_thread_update() from public, anon, authenticated;
revoke execute on function public.ai_compass_guard_reply_insert() from public, anon, authenticated;
revoke execute on function public.ai_compass_guard_reply_update() from public, anon, authenticated;
revoke execute on function public.ai_compass_touch_thread_from_reply() from public, anon, authenticated;

-- Only these small, argument-free identity helpers are part of the authenticated client contract.
grant execute on function public.ai_compass_current_role() to authenticated;
grant execute on function public.ai_compass_is_moderator() to authenticated;
grant execute on function public.ai_compass_can_post() to authenticated;
