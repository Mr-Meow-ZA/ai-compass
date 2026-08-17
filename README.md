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
- `data.js` — imported guides, comparisons, repositories, community data and historical external feed records.
- `subscription-refresh.js` — maintained verified subscription-plan corrections layered onto the imported decision guide and comparison cards before rendering.
- `news-refresh.js` and dated news modules — maintained current-news additions, verification metadata and attributable source context.
- `news-media.css` — responsive news-thumbnail presentation.
- `knowledge.js` — maintained original guides added after the imported historical collection.
- `dashboard-guide.js` / `dashboard-guide.css` — flagship visual guide for designing professional dashboards with AI, including eight dashboard-type mockups, mobile composition and reusable design prompts.
- `practical-build-guides.js` / `practical-build-guides.css` — outcome-first guides for executive presentations, smart Excel trackers and AI-assisted workflow automation.
- `infographic-build-guide.js` — maintained visual-communication guide for evidence-led AI-assisted infographics, accessibility and verification.
- `research-build-guide.js` — maintained build guide for source-backed AI research reports, evidence matrices, synthesis and verification.
- `agentic-build-guides.js` — maintained guides for agent orchestration and governed workplace agent pilots/evaluation.
- `enterprise-ai-builder-guides.js` — enterprise architecture, RAG, evaluation, identity/security and AI-development-lifecycle guides.
- `enterprise-learning-path.js` — maintained “Build AI systems at work” learning path linking the practical, agentic and enterprise builder series.
- `template-library.js` — reusable prompt and workflow template guide collection.
- `sector-starter-packs.js` — sector-focused practical adoption guides for small business and operations.
- `education-starter-pack.js` — educator-focused AI adoption guide covering pedagogy, assessment, privacy and AI literacy.
- `content.js` — foundational learning paths, tips, reference terms and goal-based homepage entry points.
- dated reference-refresh modules — maintained reference and tip additions with primary-source metadata without rewriting the historical collection.
- `visual-system.css`, `editorial-photo-overrides.css` and visual validation scripts — maintained photographic editorial treatment and rendered desktop/mobile checks.
- `app.js` — hash-based routing, rendering, unified search, filters and interactions.
- `enhancements.js` and `mobile.css` — progressive mobile interaction and content-type refinements.
- `vercel.json` — deployment and security-header configuration.
- `docs/` — product vision, architecture, roadmap, content workflow, release archive and quality standards.
- `CHANGELOG.md` — current release history, with older entries preserved in the changelog archive.

The current source is a self-contained static web application with no required build step or external UI framework.

## Local development

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

Do not open `index.html` directly from the filesystem because browser security rules can differ from a served environment.

## Deployment

The canonical workflow is:

1. Create a small branch.
2. Make focused changes.
3. Run `npm run check` and the relevant rendered browser validation.
4. Review desktop and mobile routes/interactions.
5. Open or review a pull request.
6. Require Vercel Preview and repository validation before merge.
7. Merge to `main` only after checks pass.
8. Let the connected Vercel project deploy `main`.
9. Inspect the production result after deployment.

The Vercel project is connected directly to this repository. Older payload-based deployments from `Mr-Meow-ZA/yeet` are legacy migration history and are not part of the current production workflow.

## Product guardrails

- Do not let the news feed displace guides, references, tips, comparisons or learning paths.
- Keep external previews short and link to the original publisher.
- Clearly identify AI Compass original content versus third-party links.
- Prefer primary sources and preserve publication or verification dates.
- Use news imagery only when provenance is clear; preserve source credit and allow image-free cards when it is not.
- Do not publish low-confidence rumours as facts.
- Preserve every original guide by default and treat unexplained guide-count reductions or missing registered modules as validation failures.
- Do not change authentication, secrets, domains, paid services, privacy settings or database schemas without explicit approval.

## Status

**Current release baseline: 0.6.19 / build `2026-08-17.3`.**

The 0.6.x line established the balanced knowledge-platform direction, expanded original guides and learning paths, introduced maintained current-news/reference layers, established professional photographic guide treatment and built a growing practical “make useful things with AI” series.

The current library preserves at least **41 original guides** alongside structured learning paths, practical tips, reference terms, templates and curated discovery collections. The Enterprise AI Builder series now connects workflow automation and agent orchestration to enterprise architecture, trustworthy RAG, systematic evaluation, least-privilege identity/security and a full idea-to-retirement AI development lifecycle. The dedicated **Build AI systems at work** path links these into one progressive route for corporate AI builders.

The next planned structural release remains **0.7.0 — Maintainability & Freshness**, focused on structured content files/schema validation, freshness and superseded-content metadata, and a reusable source-quality model.

Run `npm run check` before committing. It validates JavaScript syntax, guide identifiers, sources, internal learning relationships, subscription freshness, cumulative guide preservation, maintained news/reference metadata and visual-system contracts. Use `bash scripts/smoke-visuals.sh` and `bash scripts/smoke-enterprise.sh` for rendered visual validation.