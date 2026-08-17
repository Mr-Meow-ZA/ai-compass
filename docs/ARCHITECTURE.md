# Architecture

## Current application

AI Compass is a static single-page application with a stable core renderer plus maintained discovery, curriculum, intelligence and freshness layers.

The 0.7.0 architecture deliberately avoids a full rewrite of the proven 41-guide application. Instead it introduces a structured maintained-content boundary around the records most likely to change frequently.

### Stable historical/original layer

- `index.html` loads the application, SEO metadata and registered runtime modules.
- `data.js` contains the imported original guides, comparisons, repositories, community items and historical curated external feed.
- `knowledge.js` adds maintained original guides without rewriting the imported historical collection.
- `dashboard-guide.js`, `practical-build-guides.js`, `research-build-guide.js`, `infographic-build-guide.js`, `agentic-build-guides.js` and `enterprise-ai-builder-guides.js` contain maintained original guide collections.
- `template-library.js`, `sector-starter-packs.js` and `education-starter-pack.js` contain maintained reusable/sector guidance.
- `content.js` contains foundational learning paths, practical tips, reference terms and goal cards.
- `enterprise-learning-path.js` adds the maintained **Build AI systems at work** path.
- dated reference/news refresh modules preserve verified additions without rewriting historical source files.

### Structured maintained-content layer

`content/manifest.json` is now the canonical registry for structured collections and runtime registration. It records:

- release/build identity;
- structured source collection paths and schemas;
- runtime script order;
- registered content collections;
- cumulative preservation minimums;
- default freshness classes.

The first structured collections are:

- `content/maintained/discovery.json` — Tools, Models, Courses and reusable Resources.
- `content/maintained/curriculum.json` — the five-level curriculum, **Become an AI power user**, path prerequisites/outcomes and next-path relationships.
- `content/maintained/news-intelligence.json` — signal/status/source-quality/impact/action metadata layered onto the historical curated feed.
- `content/maintained/freshness.json` — freshness policy, review windows and guide-specific overrides.

Each collection has a corresponding JSON Schema under `content/schemas/`.

The former `discovery-data.js`, `curriculum-data.js` and `news-intelligence-data.js` source modules were removed in 0.7.0. They must not be recreated as parallel maintained sources.

### Runtime loading

`structured-content-loader.js` loads `content/manifest.json`, fetches the declared structured collections and exposes one `window.AI_COMPASS_CONTENT_READY` promise.

`maintained-content-runtime.js` waits for that promise and adapts the structured records into the existing runtime globals:

- `AI_COMPASS_DISCOVERY`
- `AI_COMPASS_CURRICULUM`
- `AI_COMPASS_NEWS_INTELLIGENCE`

It also applies News intelligence metadata to the existing curated feed and inserts the Power User path into the existing learning-path array without replacing historical path definitions.

`freshness-runtime.js` chains onto the same readiness promise and exposes the deterministic `AI_COMPASS_FRESHNESS` policy helpers.

Presentation modules that depend on structured content (`site-evolution.js`, `learning-intelligence.js`, `news-intelligence.js`, `freshness-ui.js`) explicitly wait for `AI_COMPASS_CONTENT_READY` before reading the structured globals. This is a release requirement: a fast local server must not be relied on to hide an async startup race.

`app.js` remains the stable core hash router/renderer. It can render the historical/original layer independently while structured enhancements initialise.

## User-facing routes

Primary navigation:

- `#home`
- `#learn` and `#learn/:path`
- `#guides` and `#article/:slug`
- `#practical` (legacy `#tips` resolves to the same evolved practical experience)
- `#tools`
- `#models`
- `#courses`
- `#resources`
- `#news`

Supporting routes include:

- `#reference`
- `#community`
- `#search?q=`
- `#saved`
- `#about`

Legacy routes such as `#compare`, `#repos`, `#videos` and `#explore` remain accepted and route to maintained equivalents.

## Learning architecture

The current learning model contains **7 paths organised across 5 levels**:

1. **AI Essentials** — basic use, prompting, privacy and verification.
2. **AI at Work** — office/productivity and repeatable professional workflows.
3. **AI Power User** — evidence-led research, reusable instructions, RAG fundamentals, automation choice and evaluation.
4. **AI Builder & Team Lead** — tools, agents, orchestration, governance and human authority boundaries.
5. **Enterprise AI Builder** — architecture, permission-aware RAG, evaluation, identity/security and lifecycle governance.

Each active path belongs to exactly one level and may expose a prerequisite, explicit outcomes, curriculum position and recommended next path. Curriculum metadata is now structured independently from guide bodies, which lets the learning sequence evolve without duplicating lessons.

## News intelligence architecture

The historical curated feed remains the publisher/source record. Structured News intelligence adds interpretation without silently changing that record:

- **Publisher fact layer** — title, source, source type, publication date, canonical URL and maintained summary of what changed.
- **AI Compass analysis layer** — signal, real-world status, source-quality label, why it matters, who should care, next move and related learning.
- **Top Signals** — deliberately elevated items ranked by practical impact/durability rather than category or launch volume.
- **Full briefing** — the complete curated archive remains available with search plus signal/topic/status filters.

High-signal status is not inherited automatically from a category. Primary documentation/research is preferred when establishing what changed; reputable external reporting remains clearly labelled when used for context.

## Freshness architecture

Freshness answers a different question from quality: **how recently should this material be re-verified before a reader relies on it?**

Current classes:

- `news` — 10-day warning threshold, 21-day archive threshold.
- `volatile` — 30-day warning threshold, 45-day review threshold.
- `durable` — 150-day warning threshold, 180-day review threshold.

Reader-facing states are intentionally plain:

- `Current`
- `Recent`
- `Archive`
- `Review soon`
- `Needs review`
- `Review date not recorded`

Selected guide overrides classify provider-controlled material such as subscription comparisons and local-hardware guidance as volatile even though the guide collection defaults to durable.

Freshness does not erase history. An archived News record can remain a valid historical record; a volatile page marked `Needs review` should be rechecked before its recommendation or provider-controlled facts are trusted.

## Content/discovery boundaries

The information architecture deliberately separates concepts that are easy to blur:

- **Tool** — an end-user product or work/developer application.
- **Model** — an underlying model family/ecosystem.
- **Course** — external training with an AI Compass editorial review and verification date.
- **Resource** — a reusable template/checklist/framework or curated external project useful for doing work.
- **Guide** — substantial AI Compass original content.
- **Practical item** — a concise pattern/recipe linked to deeper guidance.
- **News fact** — a sourced external development.
- **News analysis** — clearly labelled AI Compass interpretation/action guidance layered on that development.
- **Community content** — future user-generated material that must never be silently presented as editorial guidance.

## Current persistence

Saved guides and some community/editorial prototype interactions use browser-local storage. They are not shared between users or devices. The UI must continue to label these limitations honestly until a real account backend exists.

There is no production account database in 0.7.0.

## Validation architecture

`npm run check` now validates both the legacy/original library and the structured maintained layer.

Key validators:

- `scripts/validate-structured-content.js` — schema shape, unique IDs, URLs, curriculum/news/freshness contracts and absence of superseded data modules.
- `scripts/validate-manifest.js` — exact `index.html` runtime registration order, module existence, release/build alignment and structured source/schema existence.
- `scripts/validate-content.js` — guide identities/sources, all learning relationships, cumulative guide preservation and maintained reference/tip contracts using the runtime data adapter.
- `scripts/validate-discovery.js` — Tools/Models/Courses/Resources coverage, course reviews/links, toolkit relationships and guide preservation.
- `scripts/validate-intelligence.js` — five curriculum levels, all seven paths, Power User path, News intelligence metadata, related content and deliberately elevated Top Signals.
- `scripts/validate-freshness.js` — deterministic boundary tests for Current/Recent/Archive/Review soon/Needs review and guide overrides.

Rendered release gates:

- `scripts/smoke-visuals.sh` — core routes and flagship visual guides.
- `scripts/smoke-enterprise.sh` — Enterprise AI Builder routes.
- `scripts/smoke-discovery.sh` — Tools, Models, Courses, Practical, Resources and Learn.
- `scripts/smoke-intelligence.sh` — News intelligence and five-level curriculum.
- `scripts/smoke-structured-content.sh` — manifest-loaded data and freshness presentation across Guides, volatile guide, Tools, Models, Courses, Reference, Learn and News on desktop/mobile.

GitHub Actions runs all validation layers and uploads actual screenshots/DOM diagnostics before merge.

## Production infrastructure

- Vercel project: `ai-compass-hub`
- Project ID: `prj_e2vn0fxjtUJ1UJVE5S5re8Vsvq9h`
- Team: `mr-meow-zas-projects`
- Production URL: `https://ai-compass-hub.vercel.app`
- Canonical GitHub repository: `Mr-Meow-ZA/ai-compass`
- Default branch: `main`

Production is considered published only when the exact merged `main` SHA has both a successful post-merge GitHub Actions run and successful Vercel deployment status.

## Legacy deployment

Before this repository existed, production was deployed through compressed HTML payload chunks stored in the unrelated public repository `Mr-Meow-ZA/yeet`. That was a recovery workaround, not the target architecture. New development happens only in this repository and the canonical Vercel deployment follows `main`.

## Recommended evolution

### Completed — 0.6.20 discovery/navigation foundation

- Separate Tools and Models.
- Add vetted Courses and stronger Resources/Practical experiences.
- Add guide tags and reader-first discovery.

### Completed — 0.6.21 signal and curriculum

- Turn News into a fact-versus-analysis intelligence briefing.
- Add deliberate signal/status/source-quality metadata.
- Organise seven paths into a five-level curriculum.
- Add the AI Power User bridge.

### Completed foundation — 0.7.0 maintainability and freshness

- Add a shared manifest.
- Move Discovery, Curriculum, News Intelligence and Freshness into schema-validated JSON.
- Remove parallel maintained JavaScript sources.
- Add visible shared freshness states.
- Add manifest/schema/freshness validation and rendered structured-content tests.
- Make structured-dependent presentation modules wait explicitly for content readiness.

### Next — 0.7.x structured-content expansion

- Move actively maintained reference/practical records and selected guide metadata into schemas incrementally.
- Add reusable source objects and superseded/archive metadata at item level.
- Generate a cross-site taxonomy/search index from structured metadata.
- Generate related-content relationships where deterministic rules are appropriate.
- Add per-tool/model/course pages once their structured records are deep enough to support them.

### Future — free profiles and community backend

Requires a separately reviewed backend/authentication change:

- free user accounts/profiles;
- synced saves, likes/follows and recently viewed content;
- learning-path progress and “continue learning”;
- followed topics/tools/models/courses/guides;
- comments, questions, threads and replies;
- accepted/helpful answers;
- notifications;
- reporting, moderation and abuse controls;
- privacy controls, data export/deletion and retention rules.

Editorial and user-generated content must remain separate at both data-model and presentation layers. Community reputation must not automatically alter editorial truth/status.

### Later — selective automation/personalisation

Only after editorial/community models are stable:

- personalised “new since your last visit” and recommended-next-content views;
- automated ingestion candidates into an editorial approval queue, never automatic publication;
- duplicate/near-duplicate detection;
- source-quality scoring and freshness reminders.

Any database, authentication, secret, paid-service or domain change requires explicit owner approval and preview/security validation before production.
