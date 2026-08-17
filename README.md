# AI Compass

AI Compass is an independent AI learning, discovery, reference and community platform for beginners, professionals and experienced builders.

**Production:** https://ai-compass-hub.vercel.app  
**Vercel project:** `ai-compass-hub`  
**Canonical repository:** `Mr-Meow-ZA/ai-compass`  
**Default branch:** `main`

## Product direction

AI Compass is **not primarily a news website**. It should help a reader learn AI, build useful things, choose tools and models, find trustworthy training and resources, understand important developments and learn with other people.

The product pillars are:

1. **Learn** — a five-level curriculum from AI Essentials through workplace use, power-user skills, controlled building and enterprise AI.
2. **Guides** — substantial original explainers, decision guides and practical build walkthroughs.
3. **Practical Library** — concise prompt recipes, patterns, checklists and techniques linked to deeper guidance.
4. **Tools** — product profiles and practical recommendations by task, audience and constraint.
5. **Models** — model-family reference separated from end-user products and subscriptions.
6. **Courses** — vetted external training with AI Compass editorial review, audience fit and value assessment.
7. **Resources** — reusable AI Compass templates/frameworks plus carefully curated repositories and external material.
8. **Reference** — glossary, concepts, standards and durable technical explanations.
9. **News** — a selective source-first intelligence briefing that separates publisher facts from AI Compass analysis, status and recommended action.
10. **Community** — a governed public forum with free profiles, discussions, replies, follows, helpful/accepted answers, reporting and moderation.
11. **My Compass** — the signed-in return experience for followed content, private learning progress, likes and community identity.

The homepage should orient readers by **what they want to achieve**, not force them to understand the product taxonomy first. News should support discovery without dominating the experience. Community popularity must never silently replace editorial evidence.

## Current architecture

AI Compass keeps its editorial experience as a static web application. Release 0.7.0 introduces the manifest-driven maintained-content layer; the 0.8.0 candidate adds an authenticated community/personalization layer backed by the existing shared Supabase project.

### Stable application and editorial content

- `index.html` — static application entry point and manifest-checked script registration.
- `app.js` — stable hash routing, core rendering, search, filters and historical browser-local interactions.
- `data.js` — imported guides, comparisons, repositories and historical curated feed records.
- `knowledge.js` and maintained guide modules — the cumulative original-guide library.
- `content.js` — foundational learning paths, practical tips, reference terms and goal cards.
- `enterprise-learning-path.js` — maintained **Build AI systems at work** path.
- dated news/reference refresh modules — verified additions layered onto historical data without rewriting it.

### Structured maintained content

- `content/manifest.json` — release/build manifest, source-collection registry, runtime-module registry, preservation floors and freshness classes.
- `content/maintained/discovery.json` — Tools, Models, Courses and reusable Resources.
- `content/maintained/curriculum.json` — five-level curriculum, **Become an AI power user**, prerequisites, outcomes and next-path metadata.
- `content/maintained/news-intelligence.json` — signal/status/source-quality/impact metadata applied to the curated News feed.
- `content/maintained/freshness.json` — shared freshness classes, review windows and guide overrides.
- `content/schemas/*.schema.json` — JSON Schema contracts for maintained collections and manifest.
- `structured-content-loader.js` / `maintained-content-runtime.js` — manifest-driven browser loading and adaptation into the proven renderer.
- `freshness-runtime.js` / `freshness-ui.js` / `freshness.css` — deterministic maintenance states.

The superseded `discovery-data.js`, `curriculum-data.js` and `news-intelligence-data.js` modules are intentionally removed by 0.7.0 so maintained records have one source of truth.

### Community and My Compass

The 0.8.0 candidate uses the existing Supabase project `rapha-personal-apps`, with every new table namespaced `ai_compass_*` so AI Compass remains logically isolated from other applications sharing the project.

Browser code receives only the Supabase project URL and **publishable** client key. No service-role key or secret is stored in the frontend.

Community runtime:

- `community-config.js` — public client configuration and feature enablement.
- `community-data.js` — lazy-loads Supabase JS, initializes passwordless email authentication and exposes profile/forum actions.
- `community.js` — public forum, categories, thread/reply views, profile setup, reporting and moderator queue.
- `community.css` / `community-controls.css` — responsive publication-style community UI.
- `docs/COMMUNITY_GUIDELINES.md` — community behaviour, evidence, privacy and moderation standard.

My Compass runtime:

- `my-compass-data.js` — content likes/follows, private learning progress and guide-linked forum discussions.
- `my-compass.js` — signed-in dashboard, guide Like/Follow/Discuss controls and learning-path completion UI.
- `my-compass-live.js` — redraws progressive controls immediately after persisted state changes without rewriting the stable core router.
- `my-compass.css` — personal dashboard/progress/discussion styling.

### Community database boundaries

Forum tables cover profiles, protected roles, categories, threads, replies, thread likes, helpful votes, thread follows, reports and moderation logs. My Compass adds content likes, private content follows and private learning progress.

Every community/My Compass table has Row Level Security enabled. Important boundaries include:

- Forum reading is public; posting requires an authenticated active AI Compass profile with a username.
- Profile email addresses come from Supabase Auth and are never rendered in the public profile model.
- User-editable profile fields cannot change account status or community role.
- Moderator/admin roles live in a separate protected table.
- Thread authors cannot pin/lock threads or manipulate activity timestamps to bump them.
- Database triggers enforce posting/reply rate limits in addition to UI controls.
- Reports are private to the reporter and moderators.
- My Compass **follows and learning progress are private** to the signed-in user.
- Like counts may be public social signals but never change editorial rankings, course verdicts or News signal status.
- User post bodies are rendered as escaped plain text; arbitrary user HTML/Markdown is not executed.

Supabase security-advisor checks are part of the backend review. Existing unrelated warnings in the shared project are not treated as AI Compass findings and must not be “fixed” by editing other apps.

## Community routes in the 0.8 candidate

- `#community` — public forum home.
- `#community/category/:id` — one of 11 discussion categories.
- `#community/thread/:id` — thread and replies.
- `#community/new` — authenticated discussion composer.
- `#community/profile` — passwordless sign-in and profile setup.
- `#community/moderation` — moderator-only report queue.
- `#my-compass` — personal dashboard for progress, follows, likes and community identity.

Guides progressively expose Like, Follow and linked Community discussions. Learning-path pages progressively expose private lesson-completion state and path follows.

## Freshness model

AI Compass distinguishes content by how quickly it can become misleading:

- **News** — `Current` → `Recent` → `Archive`.
- **Volatile** — tools, models, courses, subscriptions and selected comparisons: `Current` → `Review soon` → `Needs review`.
- **Durable** — concepts, learning structure and engineering guidance with longer review windows.

Freshness is maintenance metadata, not a quality score.

## Local development

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

Do not open `index.html` directly from the filesystem. Structured editorial collections and the community client require a served HTTP environment.

## Deployment

The canonical workflow is:

1. Create a focused branch.
2. Make source/content changes.
3. Run `npm run check` and affected rendered-browser suites.
4. Review actual desktop/mobile screenshots for meaningful visual changes.
5. Open/review a pull request.
6. Require repository validation and Vercel Preview for the exact PR head.
7. For authenticated releases, complete a real signed-in acceptance flow against the exact preview before merge.
8. Merge to `main` only after required checks pass.
9. Let the connected Vercel project deploy `main`.
10. Verify the exact merged SHA has successful post-merge GitHub Actions and Vercel production evidence before calling it published.

Do not generate no-op commits merely to retry Vercel quota failures.

## Editing community/backend code

- Keep all shared-project objects namespaced `ai_compass_*`.
- Commit every schema/RLS change as an ordered migration under `supabase/migrations/`.
- Never place service-role keys, auth tokens or secret values in browser code, GitHub, documentation or tests.
- Review RLS and Supabase security-advisor output after migrations.
- Keep editorial data and user-generated content in separate storage/presentation paths.
- Do not make popularity a proxy for editorial truth.
- Preserve a graceful failure boundary: the editorial site must remain usable if Supabase or the community client is unavailable.

## Product guardrails

- Preserve every original guide by default; unexplained guide-count reduction is a validation failure.
- Keep Tools and Models conceptually separate.
- Course ratings are editorial judgements, never purchased rankings.
- News signal labels are editorial triage, not popularity scores.
- Separate source-backed facts from AI Compass interpretation.
- Prefer primary sources for establishing what changed.
- Clearly identify original, external-preview and user-generated content.
- Use imagery only when provenance is clear.
- Do not publish rumours, unsupported rankings or unverified pricing as fact.
- Never expose private follow/progress state as public community activity.
- Helpful votes and accepted answers are community signals, not editorial certification.

## Status

**0.8.0 candidate / build `2026-08-18.1` is under review on a stacked draft branch. It is not production yet.**

The candidate preserves at least **41 original guides**, **7 learning paths** across **5 curriculum levels**, the source-first **20-item News intelligence briefing**, **6 Tools**, **6 model families**, **6 vetted Courses** and **8 reusable toolkit resources**.

It additionally introduces a real Supabase-backed Community with **11 forum categories**, free passwordless profiles, threads/replies, social/follow signals, accepted/helpful answers, reporting/moderation, guide-linked discussion, My Compass follows/likes and private learning progress.

The new public/anonymous community routes have rendered successfully against the live Supabase backend in CI. Production publication remains gated by:

1. safe completion/merge of the underlying 0.7.0 structured-content release;
2. Supabase Auth redirect allow-list configuration for the AI Compass host/approved preview;
3. real signed-in magic-link acceptance covering profile creation, thread/reply, Like/Follow, guide discussion and learning-progress persistence;
4. final exact-head CI + Vercel Preview, then exact merged-SHA production verification.

Full local/CI validation now includes:

```bash
npm run check
bash scripts/smoke-visuals.sh
bash scripts/smoke-enterprise.sh
bash scripts/smoke-discovery.sh
bash scripts/smoke-intelligence.sh
bash scripts/smoke-freshness.sh
bash scripts/smoke-community.sh
```
