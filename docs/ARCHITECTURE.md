# Architecture

## Current application

AI Compass is a static single-page application with a stable core renderer plus maintained content/discovery layers:

- `index.html` loads the application, SEO metadata and explicit content modules.
- `data.js` contains the imported original guides, comparisons, repositories, community items and curated external feed.
- `knowledge.js` adds maintained original guides without rewriting the imported historical collection.
- `dashboard-guide.js`, `practical-build-guides.js`, `research-build-guide.js`, `infographic-build-guide.js`, `agentic-build-guides.js` and `enterprise-ai-builder-guides.js` contain maintained original guide collections.
- `template-library.js`, `sector-starter-packs.js` and `education-starter-pack.js` contain maintained reusable/sector guidance.
- `content.js` contains foundational learning paths, practical tips, reference terms and goal-based homepage entry points.
- `enterprise-learning-path.js` adds the maintained **Build AI systems at work** path after the foundational library loads.
- dated reference-refresh modules maintain verified reference and practical additions without rewriting historical collections.
- `discovery-data.js` contains the maintained Tools, Models, Courses and reusable Resources directories, including verification and editorial-review metadata.
- `app.js` is the stable core hash router/renderer with unified search, filters, saved guides and browser-local prototype interactions.
- `site-evolution.js` progressively adds the 0.6.20 information architecture: separate Tools and Models, Courses, Practical Library, expanded Resources, learning lanes, guide tags and community-roadmap messaging. It deliberately avoids a broad core-router rewrite during this foundation release.
- `enhancements.js` provides mobile navigation, mobile search and article-contents refinements.
- `styles.css`, `visual-system.css`, `editorial-photo-overrides.css`, `site-evolution.css` and `mobile.css` provide the responsive/editorial visual system.

There is no compile step and no server-side database in the current production architecture.

## User-facing routes

Primary navigation after the discovery layer loads:

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

## Content/discovery boundaries

The evolved information architecture deliberately separates concepts that were previously bundled:

- **Tool** — an end-user product or work/developer application.
- **Model** — an underlying model family/ecosystem, which may be exposed through several products/APIs.
- **Course** — external training that receives an AI Compass editorial review and verification date.
- **Resource** — a reusable template/checklist/framework or curated external project useful for doing work.
- **Guide** — substantial AI Compass original content.
- **Practical item** — a concise pattern/recipe linked to deeper guidance.
- **Community content** — future user-generated material that must never be silently presented as editorial guidance.

## Current persistence

Saved guides and some community/editorial prototype interactions use browser-local storage. They are not shared between users or devices. The UI must continue to label these limitations honestly until a real account backend exists.

## Validation architecture

- `npm run check` validates JavaScript syntax, guide/source metadata, internal learning relationships, cumulative guide preservation, maintained news/reference metadata and discovery-directory contracts.
- `scripts/validate-discovery.js` verifies minimum discovery coverage, unique IDs, official URLs, course-review completeness, course-to-learning-path relationships, toolkit-to-guide relationships and the 41-guide preservation floor.
- `scripts/smoke-visuals.sh` renders core desktop/mobile routes and flagship visual guides in Chromium.
- `scripts/smoke-enterprise.sh` renders Enterprise AI Builder content and learning routes at desktop/mobile sizes.
- `scripts/smoke-discovery.sh` renders Tools, Models, Courses, Practical, Resources and Learn at desktop sizes plus Courses/Home at mobile sizes.
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
- Add guide tags and experience-based learning lanes.
- Preserve the stable 41-guide library and routes while the information architecture is proven in rendered browsers.

### Phase 2 — maintainable content model (0.7.x)

- Move maintained guides, practical items, references, news, tools, models, courses and resources into schema-validated JSON or Markdown collections.
- Add shared source/freshness/editorial-status metadata.
- Add visible `last reviewed` and superseded indicators.
- Generate search indexes and related-content relationships automatically.
- Replace hard-coded module lists with a shared manifest.
- Expand news records from headline previews toward structured AI Compass analysis (`what happened`, `why it matters`, `who should care`, `what changes`, `unknowns`, related learning).

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
