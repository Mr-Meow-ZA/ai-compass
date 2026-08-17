-- AI Compass community/forum foundation.
-- Shared Supabase project: all objects are namespaced ai_compass_* to preserve app boundaries.
-- Public readers can browse published community content. Authenticated members need an active
-- AI Compass profile with a username before they can post or react.

create table public.ai_compass_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text,
  display_name text not null default 'AI Compass member',
  bio text not null default '',
  experience_level text not null default 'beginner',
  avatar_url text,
  status text not null default 'active',
  joined_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_compass_profiles_username_format check (username is null or username ~ '^[A-Za-z0-9_]{3,24}$'),
  constraint ai_compass_profiles_display_name_length check (char_length(display_name) between 1 and 60),
  constraint ai_compass_profiles_bio_length check (char_length(bio) <= 280),
  constraint ai_compass_profiles_experience check (experience_level in ('beginner','everyday-user','power-user','builder','enterprise')),
  constraint ai_compass_profiles_status check (status in ('active','suspended','deleted'))
);

create unique index ai_compass_profiles_username_ci_unique
  on public.ai_compass_profiles (lower(username))
  where username is not null;

create table public.ai_compass_user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_compass_user_roles_role check (role in ('member','moderator','admin'))
);

create table public.ai_compass_forum_categories (
  id text primary key,
  name text not null unique,
  description text not null,
  sort_order integer not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint ai_compass_forum_categories_id check (id ~ '^[a-z0-9-]{3,40}$'),
  constraint ai_compass_forum_categories_name_length check (char_length(name) between 2 and 60),
  constraint ai_compass_forum_categories_description_length check (char_length(description) between 10 and 240)
);

create table public.ai_compass_forum_threads (
  id uuid primary key default gen_random_uuid(),
  category_id text not null references public.ai_compass_forum_categories(id),
  author_id uuid not null references auth.users(id) on delete restrict,
  title text not null,
  body text not null,
  status text not null default 'open',
  is_pinned boolean not null default false,
  accepted_reply_id uuid,
  linked_content_type text,
  linked_content_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  edited_at timestamptz,
  last_activity_at timestamptz not null default now(),
  constraint ai_compass_forum_threads_title_length check (char_length(title) between 8 and 160),
  constraint ai_compass_forum_threads_body_length check (char_length(body) between 20 and 12000),
  constraint ai_compass_forum_threads_status check (status in ('open','answered','locked','archived','removed')),
  constraint ai_compass_forum_threads_link_type check (linked_content_type is null or linked_content_type in ('guide','tool','model','course','resource','learning-path')),
  constraint ai_compass_forum_threads_link_pair check ((linked_content_type is null and linked_content_id is null) or (linked_content_type is not null and linked_content_id is not null))
);

create table public.ai_compass_forum_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.ai_compass_forum_threads(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete restrict,
  body text not null,
  status text not null default 'visible',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  edited_at timestamptz,
  constraint ai_compass_forum_replies_body_length check (char_length(body) between 2 and 8000),
  constraint ai_compass_forum_replies_status check (status in ('visible','removed'))
);

alter table public.ai_compass_forum_threads
  add constraint ai_compass_forum_threads_accepted_reply_fk
  foreign key (accepted_reply_id) references public.ai_compass_forum_replies(id) on delete set null;

create table public.ai_compass_forum_thread_likes (
  thread_id uuid not null references public.ai_compass_forum_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (thread_id, user_id)
);

create table public.ai_compass_forum_reply_helpful (
  reply_id uuid not null references public.ai_compass_forum_replies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (reply_id, user_id)
);

create table public.ai_compass_forum_thread_follows (
  thread_id uuid not null references public.ai_compass_forum_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (thread_id, user_id)
);

create table public.ai_compass_forum_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  thread_id uuid references public.ai_compass_forum_threads(id) on delete cascade,
  reply_id uuid references public.ai_compass_forum_replies(id) on delete cascade,
  reason text not null,
  details text not null default '',
  status text not null default 'open',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  constraint ai_compass_forum_reports_one_target check ((thread_id is not null)::int + (reply_id is not null)::int = 1),
  constraint ai_compass_forum_reports_reason check (reason in ('spam','harassment','unsafe','misinformation','off-topic','other')),
  constraint ai_compass_forum_reports_details_length check (char_length(details) <= 1000),
  constraint ai_compass_forum_reports_status check (status in ('open','resolved','dismissed'))
);

create table public.ai_compass_forum_moderation_actions (
  id uuid primary key default gen_random_uuid(),
  moderator_id uuid not null references auth.users(id) on delete restrict,
  target_type text not null,
  target_id uuid not null,
  action text not null,
  note text not null default '',
  created_at timestamptz not null default now(),
  constraint ai_compass_forum_moderation_target check (target_type in ('thread','reply','profile','report')),
  constraint ai_compass_forum_moderation_action check (action in ('remove','restore','lock','unlock','pin','unpin','suspend','unsuspend','resolve-report','dismiss-report')),
  constraint ai_compass_forum_moderation_note_length check (char_length(note) <= 1000)
);

create index ai_compass_threads_category_activity_idx on public.ai_compass_forum_threads(category_id, last_activity_at desc);
create index ai_compass_threads_author_idx on public.ai_compass_forum_threads(author_id, created_at desc);
create index ai_compass_threads_status_activity_idx on public.ai_compass_forum_threads(status, last_activity_at desc);
create index ai_compass_threads_linked_content_idx on public.ai_compass_forum_threads(linked_content_type, linked_content_id) where linked_content_type is not null;
create index ai_compass_replies_thread_created_idx on public.ai_compass_forum_replies(thread_id, created_at);
create index ai_compass_replies_author_idx on public.ai_compass_forum_replies(author_id, created_at desc);
create index ai_compass_reports_status_created_idx on public.ai_compass_forum_reports(status, created_at);
create index ai_compass_follows_user_idx on public.ai_compass_forum_thread_follows(user_id, created_at desc);

create or replace function public.ai_compass_current_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select role from public.ai_compass_user_roles where user_id = (select auth.uid())),
    'member'
  );
$$;

create or replace function public.ai_compass_is_moderator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.ai_compass_current_role() in ('moderator','admin');
$$;

create or replace function public.ai_compass_can_post()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.ai_compass_profiles p
    where p.user_id = (select auth.uid())
      and p.status = 'active'
      and p.username is not null
  );
$$;

revoke all on function public.ai_compass_current_role() from public;
revoke all on function public.ai_compass_is_moderator() from public;
revoke all on function public.ai_compass_can_post() from public;
grant execute on function public.ai_compass_current_role() to authenticated;
grant execute on function public.ai_compass_is_moderator() to authenticated;
grant execute on function public.ai_compass_can_post() to authenticated;

create or replace function public.ai_compass_guard_profile_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null or public.ai_compass_is_moderator() then
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

create trigger ai_compass_profiles_guard_update
before update on public.ai_compass_profiles
for each row execute function public.ai_compass_guard_profile_update();

create or replace function public.ai_compass_guard_thread_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  recent_count integer;
  day_count integer;
begin
  if uid is null then
    return new;
  end if;
  if new.author_id <> uid then
    raise exception 'Thread author must match the signed-in user.';
  end if;
  if not public.ai_compass_can_post() then
    raise exception 'Complete an active AI Compass profile before posting.';
  end if;
  if new.status <> 'open' or new.is_pinned or new.accepted_reply_id is not null then
    raise exception 'New threads must begin open and unpinned.';
  end if;
  if not exists (select 1 from public.ai_compass_forum_categories c where c.id = new.category_id and c.is_active) then
    raise exception 'Choose an active forum category.';
  end if;

  select count(*) into recent_count
  from public.ai_compass_forum_threads
  where author_id = uid and created_at > now() - interval '10 minutes';
  if recent_count >= 3 then
    raise exception 'Posting limit reached. Please wait before creating another thread.';
  end if;

  select count(*) into day_count
  from public.ai_compass_forum_threads
  where author_id = uid and created_at > now() - interval '24 hours';
  if day_count >= 20 then
    raise exception 'Daily thread limit reached.';
  end if;

  new.updated_at := now();
  new.last_activity_at := now();
  return new;
end;
$$;

create trigger ai_compass_threads_guard_insert
before insert on public.ai_compass_forum_threads
for each row execute function public.ai_compass_guard_thread_insert();

create or replace function public.ai_compass_guard_thread_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  accepted_ok boolean;
begin
  -- Internal reply-activity touches are allowed; direct client updates still have to pass RLS first.
  if new.last_activity_at is distinct from old.last_activity_at
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
     or new.linked_content_id is distinct from old.linked_content_id then
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

create trigger ai_compass_threads_guard_update
before update on public.ai_compass_forum_threads
for each row execute function public.ai_compass_guard_thread_update();

create or replace function public.ai_compass_guard_reply_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  recent_count integer;
  day_count integer;
  thread_state text;
begin
  if uid is null then return new; end if;
  if new.author_id <> uid then raise exception 'Reply author must match the signed-in user.'; end if;
  if not public.ai_compass_can_post() then raise exception 'Complete an active AI Compass profile before replying.'; end if;

  select status into thread_state from public.ai_compass_forum_threads where id = new.thread_id;
  if thread_state is null or thread_state not in ('open','answered') then
    raise exception 'This thread is not accepting replies.';
  end if;

  select count(*) into recent_count
  from public.ai_compass_forum_replies
  where author_id = uid and created_at > now() - interval '5 minutes';
  if recent_count >= 10 then raise exception 'Reply limit reached. Please wait before posting again.'; end if;

  select count(*) into day_count
  from public.ai_compass_forum_replies
  where author_id = uid and created_at > now() - interval '24 hours';
  if day_count >= 100 then raise exception 'Daily reply limit reached.'; end if;

  new.status := 'visible';
  new.updated_at := now();
  return new;
end;
$$;

create trigger ai_compass_replies_guard_insert
before insert on public.ai_compass_forum_replies
for each row execute function public.ai_compass_guard_reply_insert();

create or replace function public.ai_compass_guard_reply_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null or public.ai_compass_is_moderator() then
    new.updated_at := now();
    if new.body is distinct from old.body then new.edited_at := now(); end if;
    return new;
  end if;

  if uid <> old.author_id then raise exception 'Only the reply author or a moderator can edit this reply.'; end if;
  if old.status = 'removed' then raise exception 'Removed replies cannot be edited.'; end if;
  if new.thread_id is distinct from old.thread_id or new.author_id is distinct from old.author_id or new.created_at is distinct from old.created_at then
    raise exception 'Protected reply fields cannot be changed.';
  end if;
  if new.status not in ('visible','removed') then raise exception 'Invalid reply state.'; end if;
  if new.status = 'removed' and exists (
    select 1 from public.ai_compass_forum_threads t where t.accepted_reply_id = old.id
  ) then
    raise exception 'Ask the thread author to unaccept this answer before removing it.';
  end if;
  if new.body is distinct from old.body then new.edited_at := now(); end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger ai_compass_replies_guard_update
before update on public.ai_compass_forum_replies
for each row execute function public.ai_compass_guard_reply_update();

create or replace function public.ai_compass_touch_thread_from_reply()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.ai_compass_forum_threads
  set last_activity_at = now()
  where id = coalesce(new.thread_id, old.thread_id);
  return coalesce(new, old);
end;
$$;

create trigger ai_compass_replies_touch_thread_insert
after insert on public.ai_compass_forum_replies
for each row execute function public.ai_compass_touch_thread_from_reply();

create trigger ai_compass_replies_touch_thread_update
after update on public.ai_compass_forum_replies
for each row execute function public.ai_compass_touch_thread_from_reply();

alter table public.ai_compass_profiles enable row level security;
alter table public.ai_compass_user_roles enable row level security;
alter table public.ai_compass_forum_categories enable row level security;
alter table public.ai_compass_forum_threads enable row level security;
alter table public.ai_compass_forum_replies enable row level security;
alter table public.ai_compass_forum_thread_likes enable row level security;
alter table public.ai_compass_forum_reply_helpful enable row level security;
alter table public.ai_compass_forum_thread_follows enable row level security;
alter table public.ai_compass_forum_reports enable row level security;
alter table public.ai_compass_forum_moderation_actions enable row level security;

create policy ai_compass_profiles_public_read on public.ai_compass_profiles
for select to anon, authenticated using (status <> 'deleted');
create policy ai_compass_profiles_self_insert on public.ai_compass_profiles
for insert to authenticated with check ((select auth.uid()) = user_id and status = 'active');
create policy ai_compass_profiles_self_or_mod_update on public.ai_compass_profiles
for update to authenticated using ((select auth.uid()) = user_id or public.ai_compass_is_moderator())
with check ((select auth.uid()) = user_id or public.ai_compass_is_moderator());

create policy ai_compass_roles_self_read on public.ai_compass_user_roles
for select to authenticated using ((select auth.uid()) = user_id or public.ai_compass_is_moderator());

create policy ai_compass_categories_public_read on public.ai_compass_forum_categories
for select to anon, authenticated using (is_active or public.ai_compass_is_moderator());

create policy ai_compass_threads_public_read on public.ai_compass_forum_threads
for select to anon, authenticated using (status <> 'removed' or public.ai_compass_is_moderator());
create policy ai_compass_threads_member_insert on public.ai_compass_forum_threads
for insert to authenticated with check ((select auth.uid()) = author_id and public.ai_compass_can_post());
create policy ai_compass_threads_author_or_mod_update on public.ai_compass_forum_threads
for update to authenticated using ((select auth.uid()) = author_id or public.ai_compass_is_moderator())
with check ((select auth.uid()) = author_id or public.ai_compass_is_moderator());

create policy ai_compass_replies_public_read on public.ai_compass_forum_replies
for select to anon, authenticated using (status = 'visible' or public.ai_compass_is_moderator());
create policy ai_compass_replies_member_insert on public.ai_compass_forum_replies
for insert to authenticated with check ((select auth.uid()) = author_id and public.ai_compass_can_post());
create policy ai_compass_replies_author_or_mod_update on public.ai_compass_forum_replies
for update to authenticated using ((select auth.uid()) = author_id or public.ai_compass_is_moderator())
with check ((select auth.uid()) = author_id or public.ai_compass_is_moderator());

create policy ai_compass_thread_likes_public_read on public.ai_compass_forum_thread_likes
for select to anon, authenticated using (true);
create policy ai_compass_thread_likes_self_insert on public.ai_compass_forum_thread_likes
for insert to authenticated with check ((select auth.uid()) = user_id and public.ai_compass_can_post());
create policy ai_compass_thread_likes_self_delete on public.ai_compass_forum_thread_likes
for delete to authenticated using ((select auth.uid()) = user_id);

create policy ai_compass_reply_helpful_public_read on public.ai_compass_forum_reply_helpful
for select to anon, authenticated using (true);
create policy ai_compass_reply_helpful_self_insert on public.ai_compass_forum_reply_helpful
for insert to authenticated with check ((select auth.uid()) = user_id and public.ai_compass_can_post());
create policy ai_compass_reply_helpful_self_delete on public.ai_compass_forum_reply_helpful
for delete to authenticated using ((select auth.uid()) = user_id);

create policy ai_compass_follows_self_read on public.ai_compass_forum_thread_follows
for select to authenticated using ((select auth.uid()) = user_id);
create policy ai_compass_follows_self_insert on public.ai_compass_forum_thread_follows
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy ai_compass_follows_self_delete on public.ai_compass_forum_thread_follows
for delete to authenticated using ((select auth.uid()) = user_id);

create policy ai_compass_reports_self_or_mod_read on public.ai_compass_forum_reports
for select to authenticated using ((select auth.uid()) = reporter_id or public.ai_compass_is_moderator());
create policy ai_compass_reports_self_insert on public.ai_compass_forum_reports
for insert to authenticated with check ((select auth.uid()) = reporter_id and public.ai_compass_can_post());
create policy ai_compass_reports_mod_update on public.ai_compass_forum_reports
for update to authenticated using (public.ai_compass_is_moderator()) with check (public.ai_compass_is_moderator());

create policy ai_compass_moderation_mod_read on public.ai_compass_forum_moderation_actions
for select to authenticated using (public.ai_compass_is_moderator());
create policy ai_compass_moderation_mod_insert on public.ai_compass_forum_moderation_actions
for insert to authenticated with check (public.ai_compass_is_moderator() and moderator_id = (select auth.uid()));

grant select on public.ai_compass_profiles to anon, authenticated;
grant insert, update on public.ai_compass_profiles to authenticated;
grant select on public.ai_compass_user_roles to authenticated;
grant select on public.ai_compass_forum_categories to anon, authenticated;
grant select on public.ai_compass_forum_threads to anon, authenticated;
grant insert, update on public.ai_compass_forum_threads to authenticated;
grant select on public.ai_compass_forum_replies to anon, authenticated;
grant insert, update on public.ai_compass_forum_replies to authenticated;
grant select on public.ai_compass_forum_thread_likes to anon, authenticated;
grant insert, delete on public.ai_compass_forum_thread_likes to authenticated;
grant select on public.ai_compass_forum_reply_helpful to anon, authenticated;
grant insert, delete on public.ai_compass_forum_reply_helpful to authenticated;
grant select, insert, delete on public.ai_compass_forum_thread_follows to authenticated;
grant select, insert, update on public.ai_compass_forum_reports to authenticated;
grant select, insert on public.ai_compass_forum_moderation_actions to authenticated;

insert into public.ai_compass_forum_categories (id, name, description, sort_order) values
  ('beginner-help','Beginner help','Friendly questions about getting started, prompting, privacy and understanding everyday AI.',10),
  ('ai-for-work','AI for work','Practical workplace use: research, writing, meetings, spreadsheets, presentations and repeatable workflows.',20),
  ('prompting-research','Prompting & research','Prompt design, evidence-led research, verification, structured outputs and reusable instructions.',30),
  ('automation-workflows','Automation & workflows','Turn useful AI tasks into repeatable automations, integrations and reliable business workflows.',40),
  ('agents-orchestration','Agents & orchestration','Agent design, tools, handoffs, multi-agent patterns, evaluation, guardrails and human approval.',50),
  ('coding-builders','Coding & builders','APIs, AI-assisted coding, RAG, application architecture, debugging and developer workflows.',60),
  ('models-local-ai','Models & local AI','Model families, open weights, local deployment, hardware, inference and model-selection trade-offs.',70),
  ('courses-learning','Courses & learning','Discuss AI courses, certifications, learning plans and what to study next.',80),
  ('enterprise-ai','Enterprise AI','Security, identity, governance, evaluation, architecture, adoption and production AI at organisations.',90),
  ('showcase','What I built','Share useful AI tools, workflows, experiments and lessons learned from actually building them.',100),
  ('general','General discussion','AI topics that do not fit elsewhere, including thoughtful questions about the wider ecosystem.',110);
