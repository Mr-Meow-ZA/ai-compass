# Architecture

## Current application

AI Compass is a static single-page application with a stable core renderer plus maintained content/discovery/intelligence layers:

- `index.html` loads the application, SEO metadata and explicit content modules.
- `data.js` contains the imported original guides, comparisons, repositories, community items and curated external feed.
- `knowledge.js` adds maintained original guides without rewriting the imported historical collection.
- `dashboard-guide.js`, `practical-build-guides.js`, `research-build-guide.js`, `infographic-build-guide.js`, `agentic-build-guides.js` and `enterprise-ai-builder-guides.js` contain maintained original guide collections.
- `template-library.js`, `sector-starter-packs.js` and `education-starter-pack.js` contain maintained reusable/sector guidance.
- `content.js` contains foundational learning paths, practical tips, reference terms and goal-based homepage entry points.
- `enterprise-learning-path.js` adds the maintained **Build AI systems at work** path after the foundational library loads.
- `curriculum-data.js` adds the maintained **Become an AI power user** path and maps all seven current learning paths into a five-level progression with prerequisites, outcomes and next-step metadata.
- `learning-intelligence.js` progressively renders the five-level curriculum and path-level progression context without rewriting the stable core learning renderer.
- dated reference-refresh modules maintain verified reference and practical additions without rewriting historical collections.
- `discovery-data.js` contains the maintained Tools, Models, Courses and reusable Resources directories, including verification and editorial-review metadata.
- `news-intelligence-data.js` enriches each curated news record with editorial signal, real-world status, source-quality label, audience, analysis, recommended action and related learning where applicable.
- `news-intelligence.js` progressively replaces the flat News directory with a source-first briefing while preserving the underlying curated feed and canonical publisher links.
- `app.js` is the stable core hash router/renderer with unified search, filters, saved guides and browser-local prototype interactions.
- `site-evolution.js` progressively adds the 0.6.20 information architecture: separate Tools and Models, Courses, Practical Library, expanded Resources, guide tags and community-roadmap messaging.
- `enhancements.js` provides mobile navigation, mobile search and article-contents refinements.
- `styles.css`, `visual-system.css`, `editorial-photo-overrides.css`, `site-evolution.css`, `intelligence.css` and `mobile.css` provide the responsive/editorial visual system.

There is no compile step and no server-side database in the current production architecture.

## User-facing routes

Primary navigation after the progressive layers load:

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

Legacy routes such as `#compare`, `#repos`, `#videos` and `#explore` remain accepted and are routed to the appropriate maintained experience.

## Learning architecture

The current learning model contains **7 paths organised across 5 levels**:

1. **AI Essentials** — basic use, prompting, privacy and verification.
2. **AI at Work** — office/productivity and repeatable professional workflows.
3. **AI Power User** — evidence-led research, reusable instructions, RAG fundamentals, automation choice and evaluation.
4. **AI Builder & Team Lead** — tools, agents, orchestration, governance and human authority boundaries.
5. **Enterprise AI Builder** — architecture, permission-aware RAG, evaluation, identity/security and lifecycle governance.

Each path can expose a prerequisite, explicit outcomes, curriculum position and recommended next path. This progression metadata is separate from guide content so a future structured-content migration can change the curriculum without rewriting lessons.

## News intelligence architecture

The historical curated feed remains the source collection. The intelligence layer adds interpretation without silently changing the publisher record:

- **Publisher fact layer** — title, source, source type, publication date, canonical URL and maintained summary of what changed.
- **AI Compass analysis layer** — signal, real-world status, source-quality label, why it matters, who should care, next move and related learning.
- **Top Signals** — deliberately elevated items ranked by practical impact/durability rather than category or launch volume.
- **Full briefing** — the entire curated archive remains available with search plus signal/topic/status filters.

High-signal status is not inherited automatically from a category. Primary documentation/research is preferred when establishing what changed; reputable external reporting remains clearly labelled when used for context.

## Content/discovery boundaries

The evolved information architecture deliberately separates concepts that were previously bundled:

- **Tool** — an end-user product or work/developer application.
- **Model** — an underlying model family/ecosystem, which may be exposed through several products/APIs.
- **Course** — external training that receives an AI Compass editorial review and verification date.
- **Resource** — a reusable template/checklist/framework or curated external project useful for doing work.
- **Guide** — substantial AI Compass original content.
- **Practical item** — a concise pattern/recipe linked to deeper guidance.
- **News fact** — a sourced external development.
- **News analysis** — clearly labelled AI Compass interpretation/action guidance layered on the sourced development.
- **Community content** — future user-generated material that must never be silently presented as editorial guidance.

## Current persistence

Saved guides and some community/editorial prototype interactions use browser-local storage. They are not shared between users or devices. The UI must continue to label these limitations honestly until a real account backend exists.

## Validation architecture

- `npm run check` validates JavaScript syntax, guide/source metadata, all learning relationships, five-level curriculum assignments, cumulative guide preservation, maintained news/reference metadata, discovery contracts and every news-intelligence record.
- `scripts/validate-discovery.js` verifies minimum discovery coverage, unique IDs, official URLs, course-review completeness, course-to-learning-path relationships, toolkit-to-guide relationships and the 41-guide preservation floor.
- `scripts/validate-intelligence.js` verifies 41-guide preservation, all seven paths, exactly five curriculum levels, path prerequisites/outcomes/next relationships, complete intelligence metadata across the full news feed, valid related-content links and deliberately elevated high-signal records.
- `scripts/smoke-visuals.sh` renders core desktop/mobile routes and flagship visual guides in Chromium and understands both legacy and intelligence News structures.
- `scripts/smoke-enterprise.sh` renders Enterprise AI Builder content and learning routes at desktop/mobile sizes.
- `scripts/smoke-discovery.sh` renders Tools, Models, Courses, Practical, Resources and Learn at desktop sizes plus Courses/Home at mobile sizes.
- `scripts/smoke-intelligence.sh` renders News, the five-level Learn overview, the AI Power User path and enterprise path positioning, including mobile News/Learn.
- GitHub Actions runs all validation layers and uploads rendered screenshots/DOM diagnostics before merge.

The application and validators still use explicit module registration. Adding or renaming a published module requires updating both load and validation paths in the same release. The planned 0.7.x manifest/schema work should remove this drift risk.

## Production infrastructure

- Vercel project: `ai-compass-hub`
- Project ID: `prj_e2vn0fxjtUJ1UJVE5S5re8Vsvq9h`
- Team: `mr-meow-zas-projects`
- Production URL: `https://ai-compass-hub.vercel.app`
- Canonical GitHub repository: `Mr-Meow-ZA/ai-compass`
- Default branch: `main`

## Legacy deployment

Before this repository existed, production was deployed through compressed HTML payload chunks stored in the unrelated public repository `Mr-Meow-ZA/yeet`. That was a recovery workaround, not the target architecture. New development happens only in this repository and the canonical Vercel deployment follows `main`.

## Recommended evolution

### Phase 1 — discovery/navigation foundation (0.6.20)

- Separate Tools and Models in the reader experience.
- Add vetted Courses and stronger Resources/Practical experiences.
- Add guide tags and reader-first learning entry points.
- Preserve the stable 41-guide library and routes while the information architecture is proven in rendered browsers.

### Phase 1b — signal and curriculum (0.6.21)

- Turn News into a fact-versus-analysis intelligence briefing while preserving the full curated feed.
- Add deliberate signal/status/source-quality metadata and related learning.
- Organise all learning paths into a five-level curriculum.
- Add the AI Power User bridge between everyday AI work and controlled agent/enterprise building.
- Add curriculum and news-intelligence validation plus rendered desktop/mobile smoke routes.

### Phase 2 — maintainable content model (0.7.x)

- Move maintained guides, practical items, references, news, tools, models, courses and resources into schema-validated JSON or Markdown collections.
- Add shared source/freshness/editorial-status metadata.
- Add visible `last reviewed` and superseded indicators.
- Generate search indexes and related-content relationships automatically.
- Replace hard-coded module lists with a shared manifest.
- Move the current news-intelligence and curriculum metadata into the structured content model rather than maintaining browser-global overlays indefinitely.

### Phase 3 — free profiles and community backend

Requires a separately reviewed backend/authentication change. Intended capabilities:

- Free user accounts/profiles.
- Synced saves, likes/follows and recently viewed content.
- Learning-path progress and “continue learning”.
- Followed topics, tools, models, courses and guides.
- Guide comments and discussion threads.
- Community forum/questions/replies and accepted/helpful answers.
- Notification preferences.
- Reporting, moderation, block/abuse controls and community roles.
- Privacy controls, account export/deletion and retention rules.

Editorial and user-generated content must remain separate at the data-model and presentation layers. Community reputation must not automatically alter editorial truth/status.

### Phase 4 — selective automation/personalization

Only after the editorial and community models are stable:

- Personalised “new since your last visit” and recommended-next-content views.
- Automated ingestion candidates into an editorial approval queue, never automatic publication.
- Duplicate/near-duplicate detection.
- Source-quality scoring and freshness reminders.

Any database, authentication, secret, paid-service or domain change requires explicit owner approval and preview/security validation before production.
