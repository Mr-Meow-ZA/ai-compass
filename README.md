# AI Compass

AI Compass is an AI discovery, education and reference platform for beginners and experienced users.

**Production:** https://ai-compass-hub.vercel.app  
**Vercel project:** `ai-compass-hub`  
**Canonical repository:** `Mr-Meow-ZA/ai-compass`  
**Default branch:** `main`

## Product direction

AI Compass is **not primarily a news website**. News is one section inside a broader practical hub.

The intended product pillars are:

1. **Learn** — beginner-to-advanced learning paths.
2. **Guides** — substantial original walkthroughs.
3. **Tips & Tricks** — concise, practical techniques.
4. **Reference** — glossary, concepts, model families and terminology.
5. **Tools & Models** — comparisons and practical recommendations.
6. **Resources** — repositories, videos, courses, templates and useful websites.
7. **News** — a curated external discovery feed with clear source attribution.
8. **Community** — questions, answers and suggested topics.

The homepage should balance these pillars. News should support discovery without dominating the product.

## Current repository contents

- `index.html` — static application entry point.
- `styles.css` — responsive visual system.
- `data.js` — imported guides, comparisons, repositories, community data and external feed records.
- `content.js` — learning paths, tips, reference terms and goal-based homepage entry points.
- `app.js` — hash-based routing, rendering, unified search, filters and interactions.
- `vercel.json` — deployment and security-header configuration.
- `docs/` — product vision, architecture, roadmap, content workflow and quality standards.
- `CHANGELOG.md` — concise development history.

The current source is a self-contained static web application with no required build step or external UI framework.

## Local development

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

Do not open `index.html` directly from the filesystem because browser security rules can differ from a served environment.

## Deployment

The intended long-term workflow is:

1. Create a small branch.
2. Make focused changes.
3. Test desktop and mobile routes and interactions.
4. Open or review a pull request.
5. Merge to `main` only after tests pass.
6. Let the connected Vercel project deploy `main`.
7. Inspect the production URL after deployment.

The Vercel project must ultimately be connected directly to this repository. Older payload-based deployments from `Mr-Meow-ZA/yeet` are legacy migration history and should not be used for new development.

## Product guardrails

- Do not let the news feed displace guides, references, tips, comparisons or learning paths.
- Keep external previews short and link to the original publisher.
- Clearly identify AI Compass original material versus third-party content.
- Prefer primary sources and preserve publication or verification dates.
- Do not publish low-confidence rumours as facts.
- Do not change authentication, secrets, domains, paid services, privacy settings or database schemas without explicit approval.

## Status

The balanced-platform rebuild was completed in source on 6 August 2026. The homepage now prioritises learning paths, original guides, tips, reference material and tool discovery, with news retained as a compact module and dedicated section. The remaining infrastructure priority is connecting the Vercel project directly to this repository and completing a deployed browser-level visual inspection.


## Current library snapshot

- 24 original guides
- 5 structured learning paths
- 20 practical tips
- 22 plain-English reference terms
- Curated tool, repository, resource and news collections

Run `npm run check` before committing. It validates JavaScript syntax, guide identifiers, sources and internal learning relationships.
