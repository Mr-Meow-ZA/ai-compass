# Architecture

## Current application

AI Compass is a static single-page application:

- `index.html` loads the application and SEO metadata.
- `data.js` contains the imported original guides, comparisons, repositories, community items and curated external feed.
- `knowledge.js` adds maintained original guides without rewriting the imported historical collection.
- `dashboard-guide.js` contains the flagship visual dashboard guide.
- `practical-build-guides.js` contains maintained outcome-first guides for presentations, Excel trackers and workflow automation.
- `research-build-guide.js` and `infographic-build-guide.js` contain maintained research and visual-communication build guides.
- `agentic-build-guides.js` contains maintained agent-orchestration and governed workplace-agent guides.
- `enterprise-ai-builder-guides.js` contains maintained enterprise architecture, RAG, evaluation, identity/security and AI-development-lifecycle guides.
- `template-library.js` contains maintained reusable prompt and workflow templates.
- `sector-starter-packs.js` and `education-starter-pack.js` contain maintained adoption guides for specific contexts.
- `content.js` contains foundational learning paths, tips, reference terms and goal-based homepage entry points.
- `enterprise-learning-path.js` adds the maintained Build AI systems at work path after the foundational library loads.
- dated reference-refresh modules maintain verified reference and tip additions without rewriting the historical collection.
- `app.js` provides hash routing, rendering, unified search, filters, saved guides and local prototype interactions.
- `enhancements.js` provides progressive mobile navigation, mobile search and article contents controls.
- `styles.css`, `visual-system.css`, `editorial-photo-overrides.css` and `mobile.css` provide the responsive and photographic visual system.

There is no compile step and no server-side database in this snapshot.

## Main routes

- `#home`
- `#learn` and `#learn/:path`
- `#guides` and `#article/:slug`
- `#tips`
- `#reference`
- `#tools`
- `#resources`
- `#news`
- `#community`
- `#search?q=`

Legacy routes such as `#compare`, `#repos`, `#videos` and `#explore` resolve to the relevant new collection.

## Current persistence

Saved guides and some community or editorial interactions use browser-local storage. They are not shared between users or devices.

## Validation architecture

- `npm run check` validates JavaScript syntax, guide/source metadata, internal relationships and cumulative guide preservation.
- `scripts/smoke-visuals.sh` renders core desktop/mobile routes and flagship visual guides in Chromium.
- `scripts/smoke-enterprise.sh` renders the Enterprise AI Builder architecture guide and learning path at desktop/mobile sizes.
- GitHub Actions runs both validation layers and uploads rendered screenshots/DOM diagnostics before merge.

The application and content validator currently use explicit module registration. Adding or renaming a published module therefore requires updating both load paths in the same release. The planned 0.7.x content-manifest work should remove this drift risk.

## Production infrastructure

- Vercel project: `ai-compass-hub`
- Project ID: `prj_e2vn0fxjtUJ1UJVE5S5re8Vsvq9h`
- Team: `mr-meow-zas-projects`
- Production URL: `https://ai-compass-hub.vercel.app`
- Canonical GitHub repository: `Mr-Meow-ZA/ai-compass`
- Default branch: `main`

## Legacy deployment

Before this repository existed, production was deployed through compressed HTML payload chunks stored in the unrelated public repository `Mr-Meow-ZA/yeet`, notably the branches `ai-compass-site` and `ai-compass-news-v5`.

That was a recovery workaround, not the target architecture. New development happens only in this repository. Vercel is now connected directly to `Mr-Meow-ZA/ai-compass`; legacy payload branches should not be used for new releases.

## Recommended evolution

### Phase 1 — stable static source

- Keep source readable and directly deployable.
- Maintain repeatable link, schema and browser smoke tests.
- Keep Vercel connected directly to this repository.

### Phase 2 — maintainable content model

- Move guides, tips, references, news and resources into separate JSON or Markdown collections.
- Add content schemas and required source metadata.
- Generate search indexes automatically.
- Add editorial status and change-history fields.
- Replace hard-coded module lists with a shared manifest so application registration and validation cannot drift apart.

### Phase 3 — shared backend

Only after explicit approval:

- User accounts and shared saved items.
- Community questions and moderation.
- Editorial approval queue.
- Automated RSS/API ingestion.
- Duplicate detection and source-quality scoring.

Any database, authentication, secret, paid-service or domain change requires owner approval.