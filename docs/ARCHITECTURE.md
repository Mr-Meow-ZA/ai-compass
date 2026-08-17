# Architecture

## Current application

AI Compass keeps a static editorial single-page application with a stable core renderer, structured maintained-content layers and—starting with the 0.8.0 candidate—a separately governed authenticated community/personalization layer.

The design goal remains incremental evolution rather than a rewrite of the proven 41-guide application.

## Editorial/runtime layers

### Stable historical/original layer

- `index.html` loads SEO metadata and manifest-registered runtime modules.
- `data.js` contains imported guides, comparisons, repositories and the historical curated external feed.
- `knowledge.js` and guide modules extend the original guide library without rewriting imported history.
- `content.js` contains foundational learning paths, practical tips, reference terms and goal cards.
- `enterprise-learning-path.js` adds the maintained **Build AI systems at work** path.
- dated reference/news refresh modules preserve verified additions without rewriting historical source files.

### Structured maintained-content layer

`content/manifest.json` is the canonical registry for structured collections and runtime registration. It records release/build identity, structured source paths/schemas, exact runtime script order, content preservation floors and freshness classes.

Current structured collections:

- `content/maintained/discovery.json` — Tools, Models, Courses and reusable Resources.
- `content/maintained/curriculum.json` — five-level curriculum, **Become an AI power user**, prerequisites/outcomes and progression.
- `content/maintained/news-intelligence.json` — signal/status/source-quality/impact/action metadata layered onto the curated News feed.
- `content/maintained/freshness.json` — review windows and guide overrides.

Each collection has a JSON Schema under `content/schemas/`.

`structured-content-loader.js` exposes `window.AI_COMPASS_CONTENT_READY`; every presentation module that depends on structured data must wait for that promise. `maintained-content-runtime.js` adapts structured records into the proven globals and `freshness-runtime.js` exposes deterministic maintenance helpers.

The superseded `discovery-data.js`, `curriculum-data.js` and `news-intelligence-data.js` sources must not be recreated.

### Presentation layers

- `app.js` — stable core router/renderer.
- `site-evolution.js` — Tools, Models, Courses, Practical, Resources and discovery enhancements.
- `learning-intelligence.js` — five-level curriculum and path progression.
- `news-intelligence.js` — source-first News briefing.
- `freshness-ui.js` — visible maintenance state.
- existing publication/guide/mobile CSS — responsive editorial visual system.

## 0.8 community and profile architecture

The community layer is deliberately separate from editorial truth. It can add questions, implementation experience and useful social context without changing an AI Compass guide, course verdict or News signal.

### Shared Supabase tenancy

The candidate uses the existing Supabase project `rapha-personal-apps` (`lnmgieielbqqqvboonzj`). All new objects are namespaced `ai_compass_*` so AI Compass remains logically separated from other applications sharing the project.

The browser receives only:

- the Supabase project URL;
- the public/publishable client key.

No service-role key, API secret, access token or credential may be committed to frontend code.

### Authentication

`community-data.js` lazy-loads the Supabase JavaScript client only when the runtime starts. The external library is asynchronous so failure to load Supabase cannot block the editorial site.

Authentication uses **passwordless email magic links**. Supabase Auth owns the email identity; AI Compass does not store an email column in `ai_compass_profiles` and never displays an authentication email as profile data.

Before production, the canonical AI Compass URL and approved preview must be explicitly allowed in Supabase Auth redirect configuration and a real signed-in flow must be tested.

### Forum data model

The community foundation contains 10 primary forum/profile tables:

- `ai_compass_profiles`
- `ai_compass_user_roles`
- `ai_compass_forum_categories`
- `ai_compass_forum_threads`
- `ai_compass_forum_replies`
- `ai_compass_forum_thread_likes`
- `ai_compass_forum_reply_helpful`
- `ai_compass_forum_thread_follows`
- `ai_compass_forum_reports`
- `ai_compass_forum_moderation_actions`

Eleven initial categories mirror AI Compass reader needs: Beginner help, AI for work, Prompting & research, Automation & workflows, Agents & orchestration, Coding & builders, Models & local AI, Courses & learning, Enterprise AI, What I built and General discussion.

Threads can optionally link to an internal Guide, Tool, Model, Course, Resource or Learning Path. This is the foundation for one discussion system rather than separate comments/forums for every content type.

### My Compass data model

Personal retention state lives in three additional tables:

- `ai_compass_content_likes` — public aggregate social signal; user can manage only their own row.
- `ai_compass_content_follows` — private to the signed-in user.
- `ai_compass_learning_progress` — private lesson completion state.

Likes, follows and progress are reader state. They have **no permission to modify editorial ranking, content status, News signal or course recommendation data**.

### RLS and authority boundaries

Every new community/My Compass table has Row Level Security enabled.

Key rules:

- Anonymous users can read visible forum categories, threads/replies and public social signals.
- Creating threads/replies requires an authenticated user with an active AI Compass profile and username.
- Profiles expose username, display name, bio, experience level and optional avatar—not auth email.
- User roles are stored separately from editable profile fields.
- A normal browser profile update is self-only and cannot change profile status, user ID or join date.
- Thread authors cannot pin, lock, archive, reassign or manually advance `last_activity_at`.
- Accepted answers must be visible replies belonging to the same thread.
- Reports are readable only by their reporter and moderators.
- Content follows and learning progress are private to the owning user.
- Database-level rate guards constrain rapid thread/reply creation even if the frontend is bypassed.
- Trigger functions are removed from the browser-callable RPC surface.
- Small role/post eligibility helpers are security-invoker functions rather than broad security-definer APIs.

Supabase security-advisor review is required after migrations. Existing findings that belong to other shared-project apps must be preserved and tracked by their owners rather than changed opportunistically during AI Compass work.

### Abuse/privacy hardening

`20260818003300_ai_compass_forum_abuse_hardening.sql` prevents thread bumping by reserving `last_activity_at` advancement for an internal reply-maintenance path. It also removes broad moderator browser rights over arbitrary profile fields.

Community post content is stored/rendered as plain text. `community.js` HTML-escapes user input before converting line breaks; arbitrary user HTML or Markdown is not executed.

`docs/COMMUNITY_GUIDELINES.md` defines behavioural expectations, privacy warnings, AI-assisted content disclosure, promotional/spam boundaries, accepted/helpful answer semantics and editorial/community separation.

## Community and My Compass runtime

- `community-config.js` — public project configuration and enablement.
- `community-data.js` — authentication, identity, profiles, forum CRUD-like actions, social actions, reporting and moderation queue.
- `community.js` — forum/category/thread/profile/new-post/moderation routes.
- `community.css` / `community-controls.css` — forum/profile UI.
- `my-compass-data.js` — likes, follows, progress and guide-linked thread queries.
- `my-compass.js` — My Compass dashboard, guide Like/Follow/Discuss and learning progress UI.
- `my-compass-live.js` — refreshes progressive controls after persisted state/auth changes.
- `my-compass.css` — dashboard/progress/engagement visuals.

Community failure is isolated: the core editorial application must still render if Supabase or the lazy client library is unavailable.

## User-facing routes

Primary editorial routes remain:

- `#home`
- `#learn` / `#learn/:path`
- `#guides` / `#article/:slug`
- `#practical`
- `#tools`
- `#models`
- `#courses`
- `#resources`
- `#news`
- `#reference`

Community/profile routes in the 0.8 candidate:

- `#community`
- `#community/category/:id`
- `#community/thread/:id`
- `#community/new`
- `#community/profile`
- `#community/moderation`
- `#my-compass`

Legacy routes remain accepted by the stable core router where documented.

## Learning architecture

The library contains **7 paths across 5 levels**: AI Essentials, AI at Work, AI Power User, AI Builder & Team Lead and Enterprise AI Builder.

In 0.8, signed-in users can mark lessons complete. Progress is stored per `(user_id, path_id, step_slug)` and is private. Completion is a reader aid, not a credential or proof of competence; UI copy explicitly encourages marking a lesson complete when the reader can apply it.

## News intelligence and freshness

The News/source and freshness architecture from 0.6.21/0.7 remains unchanged by community work. Publisher facts stay separate from AI Compass analysis, and maintenance states remain independent of social popularity.

Freshness classes:

- `news` — warning after 10 days; archive after 21 days.
- `volatile` — warning after 30 days; needs review after 45 days.
- `durable` — warning after 150 days; needs review after 180 days.

## Validation architecture

`npm run check` covers the historical library, structured maintained content and community/security contracts.

Additional 0.8 validator:

- `scripts/validate-community.js` verifies publishable-key-only frontend configuration, runtime/manifest registration, community/My Compass RLS migrations, 11 categories, rate guards, report/accepted-answer integrity, trigger-function hardening, thread-bump prevention, private follow/progress semantics, passwordless auth and progressive UI contracts.

Rendered release gates:

- `scripts/smoke-visuals.sh`
- `scripts/smoke-enterprise.sh`
- `scripts/smoke-discovery.sh`
- `scripts/smoke-intelligence.sh`
- `scripts/smoke-freshness.sh`
- `scripts/smoke-community.sh`

The Community smoke suite performs **live anonymous reads against the real Supabase backend** and renders Community desktop/mobile, profile entry, a category route, My Compass signed-out state, guide engagement/discussion and learning-progress entry state.

Signed-in behaviour cannot be proven by anonymous browser automation. Production 0.8 therefore has an explicit owner acceptance gate for magic-link sign-in, profile creation, thread/reply, Like/Follow, guide-linked discussion and learning-progress persistence.

## Production infrastructure

- Vercel project: `ai-compass-hub`
- Project ID: `prj_e2vn0fxjtUJ1UJVE5S5re8Vsvq9h`
- Production URL: `https://ai-compass-hub.vercel.app`
- Canonical GitHub repository: `Mr-Meow-ZA/ai-compass`
- Default branch: `main`
- Community backend candidate: shared Supabase `rapha-personal-apps`, namespaced `ai_compass_*`

A release is published only when the exact merged `main` SHA has passing post-merge GitHub Actions and successful Vercel production evidence. Authenticated releases additionally require real signed-in acceptance before merge.

## Evolution

### Completed foundations

- 0.6.20 — discovery/navigation.
- 0.6.21 — signal and five-level curriculum.
- 0.7.0 candidate — manifest/schema/freshness architecture.

### 0.8.0 candidate — Community + My Compass

Implemented on the stacked candidate branch:

- public governed forum and 11 categories;
- passwordless free profiles;
- threads/replies, thread likes, helpful votes, follows and accepted answers;
- reports and moderator queue/action logging;
- guide-linked discussions;
- content Likes/Follows;
- private learning progress;
- My Compass personal dashboard;
- RLS/security-advisor/anti-abuse hardening;
- anonymous live-backend rendered tests.

Still required before production:

- underlying 0.7.0 release must merge/deploy safely;
- Supabase Auth redirect allow-list configuration;
- real signed-in acceptance;
- final exact-head Vercel Preview and production verification.

### Later 0.8.x community depth

- notification delivery and preferences;
- followed topics/models/tools/course-specific feeds;
- account/community-data export and deletion semantics that are safe in a shared Auth project;
- stronger spam/reputation controls as real usage appears;
- moderator profile suspension through a narrowly scoped operation rather than broad browser update rights;
- community profile pages and contribution history;
- course/tool experience reviews only after anti-abuse/editorial separation rules are mature.

### Later maintainability/product work

- complete structured-content migration for maintained references/practical metadata;
- generated cross-site taxonomy/search;
- role-based learning paths;
- richer tool/model/course/resource profiles;
- selective personalization/automation only after privacy/account models are proven.
