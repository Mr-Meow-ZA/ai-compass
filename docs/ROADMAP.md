# Roadmap

## Product destination

AI Compass should become an independent **Learn + Build + Choose + Understand + Stay Current + Participate** platform.

A first-time reader should be able to arrive with a problem rather than AI vocabulary. A returning reader should have reasons to come back for learning progress, updated recommendations, important developments, reusable resources and eventually community discussion.

Target experience:

- **Learn** — AI Essentials → AI at Work → AI Power User → AI Builder & Team Lead → Enterprise AI Builder, plus role/goal paths.
- **Guides** — substantial source-backed original content with level/topic/tool/goal metadata.
- **Practical** — prompt recipes, patterns, checklists and quick techniques.
- **Tools** — end-user/developer product profiles and comparisons.
- **Models** — model-family reference independent from product branding.
- **Courses** — vetted training with explicit AI Compass editorial judgement and audience fit.
- **Resources** — reusable templates/frameworks/checklists and curated repositories/external material.
- **Reference** — glossary, concepts, standards and durable explainers.
- **News** — selective source-first intelligence about developments that matter, connected back to learning.
- **Community / My Compass** — future free profiles, follows/saves, progress, comments, forum and personal return experience.

## Foundation completed

- [x] Connect Vercel production directly to `Mr-Meow-ZA/ai-compass` on `main`.
- [x] Remove new-release dependence on historical payload deployments.
- [x] Establish source/content validation and cumulative guide preservation.
- [x] Establish desktop/mobile rendered browser validation.
- [x] Maintain changelog, architecture, workflow and quality documentation.
- [x] Preserve AI Compass original versus external-content distinctions.
- [x] Keep news as one product section rather than the product identity.

## Content depth completed through 0.6.19

- [x] Preserve and expand the original guide library to at least 41 guides.
- [x] Add beginner, work, responsible-adoption and builder learning paths.
- [x] Add reusable prompt/workflow templates and sector starter packs.
- [x] Add flagship build guides for dashboards, presentations, Excel, automation, research and infographics.
- [x] Add agent orchestration and workplace-agent testing guides.
- [x] Add Enterprise AI Builder guides for architecture, RAG, evaluation, identity/security and development lifecycle.
- [x] Add **Build AI systems at work** as a coherent corporate builder route.
- [x] Establish professional photographic editorial treatment and visual validation.

## 0.6.20 — Navigation & Discovery foundation

- [x] Add reader-first homepage entry points based on goals rather than product taxonomy.
- [x] Split **Tools** and **Models** into distinct reader experiences.
- [x] Introduce a vetted **Courses** directory with rating, audience, value, limitations and related learning path.
- [x] Evolve Tips & Tricks into a stronger **Practical Library** presentation.
- [x] Expand **Resources** around reusable AI Compass frameworks/checklists plus curated repositories.
- [x] Add visible guide topic tags and topic shortcuts.
- [x] Add initial experience-based learning lanes.
- [x] Add an explicit community/profile roadmap without pretending browser-local prototype features are shared accounts.
- [x] Add structural validation for tool/model/course/resource metadata and relationships.
- [x] Add dedicated desktop/mobile Chromium smoke routes for the new discovery experiences.

## 0.6.21 — Signal & Curriculum

- [x] Turn News from a flat link feed into a source-first intelligence briefing.
- [x] Clearly separate publisher-backed **What changed** from **Why AI Compass thinks it matters**.
- [x] Add signal, real-world status, source-quality, audience and recommended-next-action metadata across the full curated feed.
- [x] Reserve high-signal status for deliberate editorial elevation rather than inheriting it from broad categories.
- [x] Add Top Signals ranked by practical impact/durability while preserving the complete 20-item briefing with search and filters.
- [x] Connect selected developments to relevant AI Compass guides/reference topics.
- [x] Organise all seven learning paths into a formal five-level curriculum.
- [x] Add a dedicated six-lesson **Become an AI power user** path bridging weekly AI use and controlled agent/enterprise building.
- [x] Add prerequisites, learning outcomes, curriculum position and recommended next path to learning-path pages.
- [x] Add structural intelligence/curriculum validation plus dedicated desktop/mobile Chromium smoke routes.
- [x] Preserve all 41 original guides and existing public article routes.

## 0.7.0 — Maintainability & Freshness foundation

This release establishes the structured-content boundary without risking an all-at-once rewrite of the cumulative guide library.

### Completed outcomes

- [x] Add a shared content manifest containing release/build identity, structured source registry, runtime-module registration, collection preservation floors and freshness classes.
- [x] Move **Tools, Models, Courses, reusable Resources, Curriculum and News Intelligence** into canonical structured JSON collections.
- [x] Add JSON Schema contracts and repository validation without adding a runtime framework or package dependency.
- [x] Remove superseded `discovery-data.js`, `curriculum-data.js` and `news-intelligence-data.js` maintained sources.
- [x] Add a manifest-driven browser loader and runtime adapter while preserving the stable hash router and all public routes.
- [x] Add a shared freshness policy with `news`, `volatile` and `durable` classes.
- [x] Surface visible **Current / Recent / Archive / Review soon / Needs review** states across affected guides, Tools, Models, Courses, Reference, Learn and News.
- [x] Add guide-specific freshness overrides for provider-controlled subscription/comparison/hardware material.
- [x] Add deterministic freshness boundary tests.
- [x] Add manifest/index registration-drift validation.
- [x] Make structured-dependent presentation modules wait explicitly for the content-ready promise so slow network timing cannot silently disable discovery/curriculum/intelligence layers.
- [x] Add a dedicated desktop/mobile structured-content/freshness Chromium suite in addition to all existing visual regressions.
- [x] Preserve at least **41 guides**, **7 paths**, **5 curriculum levels** and the full source-first News intelligence hierarchy.

### Deliberately incremental

The following remain in their proven modules for later 0.7.x migration rather than being rewritten in one risky release:

- original guide bodies;
- foundational practical tips;
- foundational reference entries;
- historical imported comparisons/repositories/community records;
- dated source-backed overlays where preservation history is useful.

## Next — 0.7.x Taxonomy, Search & Deeper Freshness

### Structured-content expansion

- [ ] Move actively maintained reference/practical records into schema-validated collections incrementally.
- [ ] Add a structured guide metadata index before considering migration of full guide bodies.
- [ ] Add reusable source objects so canonical URL, source type, verified date and provenance are not repeated inconsistently.
- [ ] Add explicit item-level superseded / archived / abandoned metadata where applicable.
- [ ] Add optional `watch next / unknowns` fields to News intelligence when uncertainty materially helps action.

### Generated discovery/search

- [ ] Generate one cross-site taxonomy/search index covering Guides, Practical, Reference, Tools, Models, Courses, Resources, News and learning paths.
- [ ] Use stable tags for level, topic, goal, role, tool/model and freshness class.
- [ ] Generate deterministic related-content candidates while retaining editorial overrides for important journeys.
- [ ] Add URL/state-safe filters that can be linked/shared.
- [ ] Add better role/goal landing experiences without duplicating source content.

### Tool/model/course depth

- [ ] Expand the Tools directory with proper per-tool profiles, reviewed strengths/limitations, alternatives and related learning.
- [ ] Expand Model pages with model-level freshness, licensing/openness context and careful benchmark interpretation.
- [ ] Continue vetting high-quality training from provider academies, Microsoft Learn, DeepLearning.AI, universities and other reputable sources.
- [ ] Add course comparison/filtering by level, time, free/paid, certificate and technical/non-technical audience once the directory is large enough to justify it.

## News evolution — next depth

The 0.6.21 intelligence model and 0.7.0 freshness layer are established. Remaining improvements:

- [ ] Audit the historical archive for duplicate, low-value and outdated previews without erasing meaningful history.
- [ ] Add `what remains unknown / watch next` only where uncertainty materially affects action.
- [ ] Expand related links from guides/reference into relevant tools, models, courses and resources.
- [ ] Use the shared structured source model once available.
- [ ] Keep primary announcements visible and independent reporting clearly labelled as context.
- [ ] Continue preferring a few meaningful developments to high-volume headline aggregation.

## Learning evolution — next depth

The five-level curriculum and AI Power User bridge are now established. Remaining improvements:

- [ ] Audit every lesson sequence for duplicated material, prerequisites and opportunities for practical exercises.
- [ ] Add role-oriented paths such as Manager, Analyst/Researcher, Developer, Educator and Enterprise Leader where the library can support them without filler.
- [ ] Add vetted course recommendations and reusable resources directly inside learning paths.
- [ ] Add practice tasks / checkpoints where completion can be meaningfully demonstrated.
- [ ] Add progress/completion metadata in preparation for synced user profiles.

## Practical guide expansion priorities

- [ ] Human-in-the-loop workflow design.
- [ ] AI observability / LLMOps dashboard and operating model.
- [ ] Cost engineering, model routing and caching.
- [ ] Reliable tool-calling patterns and idempotency.
- [ ] Durable long-running agent workflows.
- [ ] Prompt-injection and adversarial testing.
- [ ] Document-processing pipelines.
- [ ] Business-value / ROI measurement for AI systems.

## Community & free profiles — approved product goal, backend implementation still gated

The product goal is a genuine learning community, not an unmoderated comment layer.

Planned free-profile capabilities:

- [ ] Account/profile creation with clear privacy controls.
- [ ] Synced saved items and likes/follows.
- [ ] Follow guides, topics, tools, models, courses and discussion threads.
- [ ] Learning-path progress and **Continue learning**.
- [ ] Recently viewed / new since last visit.
- [ ] Guide comments and structured questions.
- [ ] Forum categories for beginner help, AI for work, automation, agents, coding, models/local AI, courses, enterprise AI and general discussion.
- [ ] Replies, helpful/accepted answers and lightweight contributor reputation.
- [ ] Reporting, moderation queues, spam/abuse controls and clear community guidelines.
- [ ] Notification preferences.
- [ ] Account data export/deletion and retention rules.

### Required architecture before community launch

- [ ] Select/approve authentication and backend (Supabase remains a likely option but is not assumed until designed/reviewed).
- [ ] Define profiles, follows, saves, progress, comments, threads, replies, notifications and moderation schemas.
- [ ] Define RLS/authorization and editorial-versus-user-generated data boundaries.
- [ ] Threat-model abuse, impersonation, spam, unsafe links and moderation privileges.
- [ ] Build behind preview/feature flags with anonymous-reader behaviour preserved.
- [ ] Add authenticated and signed-out browser tests before production.

## Explicitly deferred until their foundations exist

- Automated publishing from RSS/APIs before an editorial approval/source-quality model exists.
- Personalised AI recommendations before accounts, preferences and privacy controls are defined.
- Gamification that rewards volume over useful contributions.
- More content purely to increase counts.
