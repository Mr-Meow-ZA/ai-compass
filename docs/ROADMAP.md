# Roadmap

## Product destination

AI Compass is evolving into an independent **Learn + Build + Choose + Understand + Stay Current + Participate + Continue** platform.

A first-time reader should be able to arrive with a problem rather than AI vocabulary. A returning reader should have reasons to come back for progress, followed material, current recommendations, important developments, reusable resources and relevant community discussion.

Target experience:

- **Learn** — AI Essentials → AI at Work → AI Power User → AI Builder & Team Lead → Enterprise AI Builder, plus role/goal paths.
- **Guides** — substantial source-backed original content.
- **Practical** — prompt recipes, patterns, checklists and quick techniques.
- **Tools / Models** — separate maintained product and model-family reference.
- **Courses** — vetted training with explicit AI Compass judgement.
- **Resources / Reference** — reusable material plus durable concepts/standards.
- **News** — selective source-first intelligence connected to learning.
- **Community** — governed public discussion and implementation experience.
- **My Compass** — private continuity across follows and learning progress.

## Foundations completed through 0.6.21

- [x] Direct canonical GitHub → Vercel production workflow.
- [x] Source/content validation and cumulative guide preservation.
- [x] Desktop/mobile rendered browser validation.
- [x] At least 41 original guides including practical/agentic/enterprise build series.
- [x] Reader-first navigation; separate Tools and Models; vetted Courses; stronger Practical and Resources.
- [x] Source-first News intelligence with deliberate Top Signals.
- [x] Seven learning paths organised into five curriculum levels including AI Power User.
- [x] Publication-quality photographic editorial system.

## 0.7.0 — Maintainability & Freshness candidate

Implemented and reviewed on PR #27:

- [x] Shared manifest with release/build identity, runtime registration and preservation floors.
- [x] Canonical JSON + schemas for Discovery, Curriculum, News Intelligence and Freshness.
- [x] Removal of duplicate maintained JavaScript data sources.
- [x] Manifest-driven browser loader and readiness contract.
- [x] Visible Current / Recent / Archive / Review soon / Needs review states.
- [x] Deterministic freshness tests and manifest-drift checks.
- [x] Full existing regression suites remain green.
- [x] Startup-race prevention for structured presentation modules.
- [ ] Merge/deploy after Vercel free-plan build-rate limit clears and exact reviewed Preview can succeed.

Do not create no-op commits or deployment loops to work around the Vercel quota.

## 0.8.0 — Community + My Compass candidate

Implemented as draft PR #28 stacked on the reviewed 0.7 branch.

### Community foundation implemented

- [x] Reuse the existing shared Supabase project with strict `ai_compass_*` namespacing.
- [x] Passwordless email magic-link authentication using public client configuration only.
- [x] Public forum reading and **11 categories** aligned with AI Compass topics.
- [x] Free public profiles with username, display name, experience level and optional bio.
- [x] Threads and replies.
- [x] Thread likes, helpful reply votes and thread follows.
- [x] Accepted answers.
- [x] Guide/content link fields so one forum can support guide discussions and future tool/model/course/resource/path discussions.
- [x] Reporting plus moderator-only queue/action log.
- [x] Community guidelines covering privacy, evidence, AI assistance, promotion/spam and moderation.
- [x] Plain-text escaped user content; no executable user HTML/Markdown.
- [x] Database-level posting rate limits and thread-bump protection.
- [x] Separate protected role table so editable profiles cannot self-promote.
- [x] RLS on every new forum/profile table.
- [x] Supabase security-advisor review with no new AI Compass community findings.
- [x] Lazy-load Supabase so community failure cannot block the editorial site.
- [x] Live anonymous-reader browser tests against the real Supabase backend.

### My Compass foundation implemented

- [x] `#my-compass` personal return experience.
- [x] Content Likes.
- [x] Private content Follows.
- [x] Private per-lesson learning progress.
- [x] Continue-learning cards derived from progress.
- [x] Guide Like / Follow / Discuss controls.
- [x] Guide-linked forum threads.
- [x] Learning-path Follow and Mark-complete controls.
- [x] Cross-device persistence model through Supabase.
- [x] Explicit rule that likes/follows/community popularity cannot alter editorial rankings or truth state.

### 0.8 production gates still open

- [ ] 0.7.0 dependency merges and deploys safely first.
- [ ] Add the AI Compass canonical host and approved preview URL/pattern to Supabase Auth redirect URLs without changing unrelated shared-project auth settings.
- [ ] Complete a real signed-in magic-link acceptance test: sign in → profile → thread → reply → Like/Follow → guide-linked discussion → lesson completion → refresh/reopen → verify persistence.
- [ ] Verify signed-out users cannot post/update private state.
- [ ] Verify moderation role/queue with an explicitly assigned test/admin user before public moderator use.
- [ ] Final exact-head GitHub CI and Vercel Preview.
- [ ] Exact merged-SHA GitHub Actions + Vercel Production verification.

## 0.8.x — Community depth after real usage

Priority items:

- [ ] Narrowly scoped suspend/unsuspend moderation action instead of broad browser profile updates.
- [ ] Notification preferences and delivery for followed threads/content.
- [ ] Community profile pages and contribution history.
- [ ] Recently viewed and “new since your last visit”.
- [ ] Topic/tool/model/course follows once taxonomy/search is generated.
- [ ] Safe AI Compass community-data export/deletion semantics that account for the shared Supabase Auth project.
- [ ] Additional anti-spam/reputation controls based on observed abuse rather than speculative complexity.
- [ ] Rate-limit/abuse telemetry that does not expose private content.
- [ ] Accessibility/physical-device testing of signed-in community flows.

Do not add public leaderboards or gamification that rewards volume before contribution quality/moderation is proven.

## 0.7.x / 0.9 — Taxonomy, Search & Content Depth

### Structured-content expansion

- [ ] Move actively maintained reference/practical records into schema-validated collections incrementally.
- [ ] Add a structured guide metadata index before moving full guide bodies.
- [ ] Add reusable source objects and item-level superseded/archive metadata.
- [ ] Add optional `watch next / unknowns` to News where uncertainty materially helps action.

### Generated discovery/search

- [ ] Generate one cross-site taxonomy/search index covering Guides, Practical, Reference, Tools, Models, Courses, Resources, News, learning paths and eligible Community links.
- [ ] Stable tags for level, topic, goal, role, tool/model and freshness.
- [ ] Shareable URL/filter state.
- [ ] Deterministic related-content candidates with editorial override support.
- [ ] Role/goal landing experiences without duplicate source content.

### Tool/model/course/resource depth

- [ ] Proper per-tool profiles with strengths, limits, alternatives and related learning.
- [ ] Deeper model pages with licensing/openness and careful benchmark interpretation.
- [ ] Continue course vetting across provider academies, Microsoft Learn, DeepLearning.AI, universities and other reputable sources.
- [ ] Course filtering by level/time/cost/certificate/audience once inventory justifies it.
- [ ] More downloadable/copyable resources and templates.

## News evolution

- [ ] Audit historical archive for duplicate/low-value previews while preserving meaningful history.
- [ ] Add `what remains unknown / watch next` when it changes reader action.
- [ ] Expand related links into Tools, Models, Courses, Resources and relevant Community discussions.
- [ ] Keep primary-source-first, low-volume editorial signal.

## Learning evolution

- [ ] Audit lesson sequences for duplication, prerequisites and practical exercises.
- [ ] Role paths for Manager, Analyst/Researcher, Developer, Educator and Enterprise Leader where depth supports them.
- [ ] Embed vetted Courses/Resources directly into learning paths.
- [ ] Add practical checkpoints where competence can be demonstrated.
- [ ] Use My Compass progress to recommend the next *relevant* step without turning completion into gamification.

## Practical guide expansion priorities

- [ ] Human-in-the-loop workflow design.
- [ ] AI observability / LLMOps dashboard and operating model.
- [ ] Cost engineering, model routing and caching.
- [ ] Reliable tool calling and idempotency.
- [ ] Durable long-running agent workflows.
- [ ] Prompt-injection/adversarial testing.
- [ ] Document-processing pipelines.
- [ ] Business-value / ROI measurement for AI systems.

## Explicitly deferred

- Automated publishing from feeds/APIs without editorial approval.
- Personalised AI-generated recommendations before privacy/preferences are proven.
- Public learning leaderboards.
- Reputation systems that reward posting volume.
- More content purely to increase counts.
