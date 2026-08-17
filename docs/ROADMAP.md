# Roadmap

## Product destination

AI Compass should become an independent **Learn + Build + Choose + Understand + Stay Current + Participate** platform.

A first-time reader should be able to arrive with a problem rather than AI vocabulary. A returning reader should have reasons to come back for learning progress, updated recommendations, important developments, reusable resources and eventually community discussion.

Target experience:

- **Learn** — AI Essentials → AI for Work → AI Power User → AI Builder / Enterprise, plus role/goal paths.
- **Guides** — substantial source-backed original content with level/topic/tool/goal metadata.
- **Practical** — prompt recipes, patterns, checklists and quick techniques.
- **Tools** — end-user/developer product profiles and comparisons.
- **Models** — model-family reference independent from product branding.
- **Courses** — vetted training with explicit AI Compass editorial judgement and audience fit.
- **Resources** — reusable templates/frameworks/checklists and curated repositories/external material.
- **Reference** — glossary, concepts, standards and durable explainers.
- **News** — selective analysis of developments that matter, connected back to learning.
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
- [x] Add experience-based learning lanes: AI Essentials, AI for Work, AI Power User, AI Builder & Enterprise.
- [x] Add an explicit community/profile roadmap without pretending browser-local prototype features are shared accounts.
- [x] Add structural validation for tool/model/course/resource metadata and relationships.
- [x] Add dedicated desktop/mobile Chromium smoke routes for the new discovery experiences.

## Next — 0.7.0 Maintainability & Freshness

The next structural release should make the growing library easier and safer to maintain before another large feature wave.

### Required outcomes

- [ ] Move actively maintained guides, practical items, references, tools, models, courses, resources and news into structured JSON or Markdown collections with schemas.
- [ ] Add a shared content manifest so app registration and validation cannot drift.
- [ ] Add visible `last reviewed`, freshness class and superseded/archive metadata across volatile content.
- [ ] Establish reusable source metadata and source-quality indicators.
- [ ] Generate internal related-content relationships/search indexes from metadata where practical.
- [ ] Preserve all 41+ original guides and existing public routes during migration.
- [ ] Keep `npm run check`, rendered browser smoke tests and Vercel Preview as release gates.

## News evolution

- [ ] Audit the existing news archive for duplicate, low-value and outdated previews without erasing history.
- [ ] Add structured AI Compass analysis fields: **what happened, why it matters, who should care, what changes, what remains unknown**.
- [ ] Add importance labels such as Worth knowing / Important / Major development.
- [ ] Link news to relevant guides, references, tools, models and courses.
- [ ] Keep primary announcements visible and use reputable independent reporting only where it adds context.
- [ ] Prefer a few meaningful developments to high-volume headline aggregation.

## Learning evolution

- [ ] Audit every existing path for prerequisites, gaps, duplicated lessons and sensible next steps.
- [ ] Build a formal **AI Power User** curriculum bridging everyday usage and technical builder material.
- [ ] Add role-oriented paths such as Manager, Analyst/Researcher, Developer, Educator and Enterprise Leader where the library can support them without filler.
- [ ] Add course recommendations and reusable resources inside learning paths.
- [ ] Add progress/completion metadata in preparation for synced user profiles.

## Discovery/content expansion priorities

- [ ] Expand the Tools directory with proper per-tool profiles, reviewed strengths/limitations, alternatives and related learning.
- [ ] Expand Model pages with model-level freshness, licensing/openness context and careful benchmark interpretation.
- [ ] Continue vetting high-quality training from provider academies, Microsoft Learn, DeepLearning.AI, universities and other reputable sources.
- [ ] Expand reusable resources into downloadable/copyable templates where appropriate.
- [ ] Add human-in-the-loop design, AI observability/LLMOps, cost engineering/model routing, reliable tool calling, durable long-running workflows, prompt-injection testing and business-value measurement guides.

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

- [ ] Select/approve authentication and backend (Supabase is a likely option but not assumed until designed/reviewed).
- [ ] Define profiles, follows, saves, progress, comments, threads, replies, notifications and moderation schemas.
- [ ] Define RLS/authorization and editorial-versus-user-generated data boundaries.
- [ ] Threat-model abuse, impersonation, spam, unsafe links and moderation privileges.
- [ ] Build behind preview/feature flags with anonymous-reader behavior preserved.
- [ ] Add authenticated and signed-out browser tests before production.

## Explicitly deferred until their foundations exist

- Automated publishing from RSS/APIs before an editorial approval/source-quality model exists.
- Personalised AI recommendations before accounts, preferences and privacy controls are defined.
- Gamification that rewards volume over useful contributions.
- More content purely to increase counts.
