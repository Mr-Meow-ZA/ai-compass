# Architecture

## Current application

AI Compass is a static single-page application:

- `index.html` loads the application and SEO metadata.
- `data.js` contains the imported original guides, comparisons, repositories, community items and curated external feed.
- `content.js` contains the learning paths, tips, reference terms and goal-based homepage entry points introduced in the balanced-platform rebuild.
- `app.js` provides hash routing, rendering, unified search, filters, saved guides and local prototype interactions.
- `styles.css` contains the responsive visual system.

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

## Production infrastructure

- Vercel project: `ai-compass-hub`
- Project ID: `prj_e2vn0fxjtUJ1UJVE5S5re8Vsvq9h`
- Team: `mr-meow-zas-projects`
- Production URL: `https://ai-compass-hub.vercel.app`
- Canonical GitHub repository: `Mr-Meow-ZA/ai-compass`
- Default branch: `main`
- Current verified product build: `2026-08-06.1`
- Current reviewed source commit: `c257396378ea1ad1693a6f89d6fc27648b6cd466`

## Current deployment bridge

The Vercel project is not yet connected directly to this GitHub repository. The verified production deployment therefore uses a small temporary Vercel function pinned to the reviewed commit above and serves `index.html`, `styles.css`, `app.js`, `data.js` and `content.js` from the canonical repository.

This bridge has removed production's dependency on the old compressed payload chunks in `Mr-Meow-ZA/yeet`. It is deliberately pinned to a commit so production cannot silently change when `main` changes.

The target architecture remains a direct Vercel Git integration from `Mr-Meow-ZA/ai-compass` on `main`, after which the temporary bridge can be retired.

## Legacy deployment

Before this repository existed, production was deployed through compressed HTML payload chunks stored in the unrelated public repository `Mr-Meow-ZA/yeet`, notably the branches `ai-compass-site` and `ai-compass-news-v5`.

Those branches are migration history only. New development happens only in `Mr-Meow-ZA/ai-compass`.

## Recommended evolution

### Phase 1 — stable static source

- Keep source readable and directly deployable.
- Add repeatable link, schema and browser smoke tests.
- Connect Vercel directly to this repository.
- Remove the temporary commit-pinned deployment bridge after direct integration is verified.

### Phase 2 — maintainable content model

- Move guides, tips, references, news and resources into separate JSON or Markdown collections.
- Add content schemas and required source metadata.
- Generate search indexes automatically.
- Add editorial status and change-history fields.

### Phase 3 — shared backend

Only after explicit approval:

- User accounts and shared saved items.
- Community questions and moderation.
- Editorial approval queue.
- Automated RSS/API ingestion.
- Duplicate detection and source-quality scoring.

Any database, authentication, secret, paid-service or domain change requires owner approval.