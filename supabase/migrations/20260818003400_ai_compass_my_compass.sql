-- My Compass retention foundation: public like counts, private follows and private learning progress.
-- These records are user preference/state only; they never alter AI Compass editorial rankings or truth status.

create table public.ai_compass_content_likes (
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null,
  content_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, content_type, content_id),
  constraint ai_compass_content_likes_type check (content_type in ('guide','tool','model','course','resource','learning-path')),
  constraint ai_compass_content_likes_id_length check (char_length(content_id) between 1 and 200)
);

create table public.ai_compass_content_follows (
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null,
  content_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, content_type, content_id),
  constraint ai_compass_content_follows_type check (content_type in ('guide','tool','model','course','resource','learning-path')),
  constraint ai_compass_content_follows_id_length check (char_length(content_id) between 1 and 200)
);

create table public.ai_compass_learning_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  path_id text not null,
  step_slug text not null,
  completed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, path_id, step_slug),
  constraint ai_compass_learning_progress_path_length check (char_length(path_id) between 1 and 120),
  constraint ai_compass_learning_progress_step_length check (char_length(step_slug) between 1 and 200)
);

create index ai_compass_content_likes_content_idx on public.ai_compass_content_likes(content_type, content_id, created_at desc);
create index ai_compass_content_follows_user_idx on public.ai_compass_content_follows(user_id, created_at desc);
create index ai_compass_learning_progress_user_path_idx on public.ai_compass_learning_progress(user_id, path_id, completed_at desc);

alter table public.ai_compass_content_likes enable row level security;
alter table public.ai_compass_content_follows enable row level security;
alter table public.ai_compass_learning_progress enable row level security;

-- Like counts are public; the UI does not expose per-user liker lists.
create policy ai_compass_content_likes_public_read on public.ai_compass_content_likes
for select to anon, authenticated using (true);
create policy ai_compass_content_likes_self_insert on public.ai_compass_content_likes
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy ai_compass_content_likes_self_delete on public.ai_compass_content_likes
for delete to authenticated using ((select auth.uid()) = user_id);

-- Follows are private preference state.
create policy ai_compass_content_follows_self_read on public.ai_compass_content_follows
for select to authenticated using ((select auth.uid()) = user_id);
create policy ai_compass_content_follows_self_insert on public.ai_compass_content_follows
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy ai_compass_content_follows_self_delete on public.ai_compass_content_follows
for delete to authenticated using ((select auth.uid()) = user_id);

-- Learning progress is private to the signed-in learner.
create policy ai_compass_learning_progress_self_read on public.ai_compass_learning_progress
for select to authenticated using ((select auth.uid()) = user_id);
create policy ai_compass_learning_progress_self_insert on public.ai_compass_learning_progress
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy ai_compass_learning_progress_self_update on public.ai_compass_learning_progress
for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy ai_compass_learning_progress_self_delete on public.ai_compass_learning_progress
for delete to authenticated using ((select auth.uid()) = user_id);

grant select on public.ai_compass_content_likes to anon, authenticated;
grant insert, delete on public.ai_compass_content_likes to authenticated;
grant select, insert, delete on public.ai_compass_content_follows to authenticated;
grant select, insert, update, delete on public.ai_compass_learning_progress to authenticated;
