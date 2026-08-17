-- Prevent client-side thread bumping and keep profile moderation out of normal browser updates.

create or replace function public.ai_compass_guard_profile_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  -- Service-role/admin maintenance is outside the authenticated browser policy and may set status.
  if uid is null then
    new.updated_at := now();
    return new;
  end if;

  if uid <> old.user_id then
    raise exception 'You can only edit your own AI Compass profile.';
  end if;
  if new.user_id is distinct from old.user_id or new.status is distinct from old.status or new.joined_at is distinct from old.joined_at then
    raise exception 'Protected profile fields cannot be changed.';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

-- A signed-in moderator does not get arbitrary profile update access through PostgREST.
-- Suspension/unsuspension will use a deliberately scoped moderation operation later.
drop policy if exists ai_compass_profiles_self_or_mod_update on public.ai_compass_profiles;
create policy ai_compass_profiles_self_update on public.ai_compass_profiles
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create or replace function public.ai_compass_guard_thread_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  accepted_ok boolean;
  internal_touch boolean := coalesce(current_setting('ai_compass.internal_thread_touch', true),'') = 'on';
begin
  -- Only the reply-maintenance trigger is allowed to advance last_activity_at without another edit.
  if internal_touch
     and new.last_activity_at is distinct from old.last_activity_at
     and new.category_id is not distinct from old.category_id
     and new.author_id is not distinct from old.author_id
     and new.title is not distinct from old.title
     and new.body is not distinct from old.body
     and new.status is not distinct from old.status
     and new.is_pinned is not distinct from old.is_pinned
     and new.accepted_reply_id is not distinct from old.accepted_reply_id
     and new.linked_content_type is not distinct from old.linked_content_type
     and new.linked_content_id is not distinct from old.linked_content_id then
    new.last_activity_at := now();
    new.updated_at := now();
    return new;
  end if;

  if uid is null or public.ai_compass_is_moderator() then
    if new.accepted_reply_id is not null then
      select exists (
        select 1 from public.ai_compass_forum_replies r
        where r.id = new.accepted_reply_id and r.thread_id = old.id and r.status = 'visible'
      ) into accepted_ok;
      if not accepted_ok then raise exception 'Accepted answer must be a visible reply in this thread.'; end if;
    end if;
    new.updated_at := now();
    if new.title is distinct from old.title or new.body is distinct from old.body then new.edited_at := now(); end if;
    return new;
  end if;

  if uid <> old.author_id then
    raise exception 'Only the thread author or a moderator can edit this thread.';
  end if;
  if old.status in ('locked','archived','removed') then
    raise exception 'This thread cannot be edited in its current state.';
  end if;
  if new.author_id is distinct from old.author_id
     or new.category_id is distinct from old.category_id
     or new.is_pinned is distinct from old.is_pinned
     or new.created_at is distinct from old.created_at
     or new.linked_content_type is distinct from old.linked_content_type
     or new.linked_content_id is distinct from old.linked_content_id
     or new.last_activity_at is distinct from old.last_activity_at then
    raise exception 'Protected thread fields cannot be changed.';
  end if;
  if new.status not in ('open','answered','removed') then
    raise exception 'Thread authors cannot lock, archive or pin threads.';
  end if;
  if new.accepted_reply_id is distinct from old.accepted_reply_id and new.accepted_reply_id is not null then
    select exists (
      select 1 from public.ai_compass_forum_replies r
      where r.id = new.accepted_reply_id and r.thread_id = old.id and r.status = 'visible'
    ) into accepted_ok;
    if not accepted_ok then raise exception 'Accepted answer must be a visible reply in this thread.'; end if;
  end if;

  if new.accepted_reply_id is not null then
    new.status := 'answered';
  elsif old.accepted_reply_id is not null and new.status = 'answered' then
    new.status := 'open';
  end if;
  if new.title is distinct from old.title or new.body is distinct from old.body then new.edited_at := now(); end if;
  new.last_activity_at := old.last_activity_at;
  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.ai_compass_touch_thread_from_reply()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform set_config('ai_compass.internal_thread_touch','on',true);
  update public.ai_compass_forum_threads
  set last_activity_at = now()
  where id = coalesce(new.thread_id, old.thread_id);
  perform set_config('ai_compass.internal_thread_touch','off',true);
  return coalesce(new, old);
end;
$$;

-- Re-assert that trigger-only functions are not callable through the browser API.
revoke execute on function public.ai_compass_guard_profile_update() from public, anon, authenticated;
revoke execute on function public.ai_compass_guard_thread_update() from public, anon, authenticated;
revoke execute on function public.ai_compass_touch_thread_from_reply() from public, anon, authenticated;
