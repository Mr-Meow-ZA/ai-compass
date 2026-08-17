-- AI Compass app-scoped profile lifecycle for a shared Supabase Auth project.
-- These operations NEVER delete auth.users because the identity may be used by other apps.

create or replace function public.ai_compass_export_my_data()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'exported_at', now(),
    'profile', (select to_jsonb(p) from public.ai_compass_profiles p where p.user_id = (select auth.uid())),
    'role', (select role from public.ai_compass_user_roles r where r.user_id = (select auth.uid())),
    'content_likes', coalesce((select jsonb_agg(to_jsonb(x) - 'user_id') from public.ai_compass_content_likes x where x.user_id = (select auth.uid())), '[]'::jsonb),
    'content_follows', coalesce((select jsonb_agg(to_jsonb(x) - 'user_id') from public.ai_compass_content_follows x where x.user_id = (select auth.uid())), '[]'::jsonb),
    'learning_progress', coalesce((select jsonb_agg(to_jsonb(x) - 'user_id') from public.ai_compass_learning_progress x where x.user_id = (select auth.uid())), '[]'::jsonb),
    'forum_threads', coalesce((select jsonb_agg(to_jsonb(x) - 'author_id') from public.ai_compass_forum_threads x where x.author_id = (select auth.uid())), '[]'::jsonb),
    'forum_replies', coalesce((select jsonb_agg(to_jsonb(x) - 'author_id') from public.ai_compass_forum_replies x where x.author_id = (select auth.uid())), '[]'::jsonb),
    'thread_follows', coalesce((select jsonb_agg(to_jsonb(x) - 'user_id') from public.ai_compass_forum_thread_follows x where x.user_id = (select auth.uid())), '[]'::jsonb),
    'thread_likes', coalesce((select jsonb_agg(to_jsonb(x) - 'user_id') from public.ai_compass_forum_thread_likes x where x.user_id = (select auth.uid())), '[]'::jsonb),
    'reply_helpful_votes', coalesce((select jsonb_agg(to_jsonb(x) - 'user_id') from public.ai_compass_forum_reply_helpful x where x.user_id = (select auth.uid())), '[]'::jsonb),
    'reports', coalesce((select jsonb_agg(to_jsonb(x) - 'reporter_id') from public.ai_compass_forum_reports x where x.reporter_id = (select auth.uid())), '[]'::jsonb)
  )
  where (select auth.uid()) is not null;
$$;

create or replace function public.ai_compass_delete_my_profile_data()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  current_role text;
begin
  if uid is null then raise exception 'Authentication required.'; end if;
  select role into current_role from public.ai_compass_user_roles where user_id = uid;
  if current_role in ('moderator','admin') then
    raise exception 'Moderator/admin AI Compass profiles require a reviewed role handoff before app-profile deletion.';
  end if;

  delete from public.ai_compass_content_follows where user_id = uid;
  delete from public.ai_compass_content_likes where user_id = uid;
  delete from public.ai_compass_learning_progress where user_id = uid;
  delete from public.ai_compass_forum_thread_follows where user_id = uid;
  delete from public.ai_compass_forum_thread_likes where user_id = uid;
  delete from public.ai_compass_forum_reply_helpful where user_id = uid;
  delete from public.ai_compass_forum_reports where reporter_id = uid;
  delete from public.ai_compass_profiles where user_id = uid;
  delete from public.ai_compass_user_roles where user_id = uid and role = 'member';

  return jsonb_build_object(
    'deleted', true,
    'auth_identity_preserved', true,
    'public_contributions_preserved_anonymously', true
  );
end;
$$;

revoke execute on function public.ai_compass_export_my_data() from public, anon, authenticated;
revoke execute on function public.ai_compass_delete_my_profile_data() from public, anon, authenticated;
grant execute on function public.ai_compass_export_my_data() to authenticated;
grant execute on function public.ai_compass_delete_my_profile_data() to authenticated;
