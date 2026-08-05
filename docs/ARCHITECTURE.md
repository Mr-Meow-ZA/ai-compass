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

## Legacy deployment

Before this repository existed, production was deployed through compressed HTML payload chunks stored in the unrelated public repository `Mr-Meow-ZA/yeet`, notably the branches `ai-compass-site` and `ai-compass-news-v5`.

That was a recovery workaround, not the target architecture. New development happens only in this repository. Vercel should be connected directly to `Mr-Meow-ZA/ai-compass` after the new source is verified.

## Recommended evolution

### Phase 1 — stable static source

- Keep source readable and directly deployable.
- Add repeatable link, schema and browser smoke tests.
- Connect Vercel directly to this repository.

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
