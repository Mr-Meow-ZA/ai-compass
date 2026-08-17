# AI Compass

AI Compass is an independent AI learning, discovery, reference and community platform for beginners, professionals and experienced builders.

**Production:** https://ai-compass-hub.vercel.app  
**Vercel project:** `ai-compass-hub`  
**Canonical repository:** `Mr-Meow-ZA/ai-compass`  
**Default branch:** `main`

## Product direction

AI Compass is **not primarily a news website**. It should help a reader learn AI, build useful things, choose tools and models, find trustworthy training and resources, understand important developments and eventually learn with a community.

The intended product pillars are:

1. **Learn** — a five-level curriculum from AI Essentials through workplace use, power-user skills, controlled building and enterprise AI.
2. **Guides** — substantial original explainers, decision guides and practical build walkthroughs.
3. **Practical Library** — concise prompt recipes, patterns, checklists and techniques linked to deeper guidance.
4. **Tools** — product profiles and practical recommendations by task, audience and constraint.
5. **Models** — model-family reference separated from end-user products and subscriptions.
6. **Courses** — vetted external training with an AI Compass editorial review, audience fit and value assessment.
7. **Resources** — reusable AI Compass templates/frameworks plus carefully curated repositories and external material.
8. **Reference** — glossary, concepts, standards and durable technical explanations.
9. **News** — a selective source-first intelligence briefing that separates publisher facts from AI Compass analysis, status and recommended action.
10. **Community** — questions today, with free profiles, follows, progress, comments and forums planned as a governed future layer.

The homepage should orient readers by **what they want to achieve**, not force them to understand the product taxonomy first. News should support discovery without dominating the experience.

## Current repository contents

- `index.html` — static application entry point and module registration.
- `styles.css` / `mobile.css` — responsive application visual system.
- `data.js` — imported guides, comparisons, repositories, community data and historical external feed records.
- `subscription-refresh.js` — maintained verified subscription-plan corrections layered onto the historical comparison content.
- `news-refresh.js` and dated news modules — maintained current-news additions, verification metadata and attributable source context.
- `news-intelligence-data.js` — editorial signal/status/source-quality/impact metadata layered across the curated news feed.
- `news-intelligence.js` / `intelligence.css` — source-first News briefing with Top Signals, explicit fact-versus-analysis sections and filtered full archive.
- `knowledge.js` — maintained original guides added after the imported historical collection.
- `dashboard-guide.js` / `dashboard-guide.css` — flagship visual dashboard build guide.
- `practical-build-guides.js` / `practical-build-guides.css` — executive presentation, Excel tracker and workflow-automation build guides.
- `infographic-build-guide.js` — evidence-led AI-assisted infographic guide.
- `research-build-guide.js` — source-backed research/report build guide.
- `agentic-build-guides.js` — agent orchestration and governed workplace agent-pilot guides.
- `enterprise-ai-builder-guides.js` — enterprise architecture, RAG, evaluation, identity/security and AI-development-lifecycle guides.
- `enterprise-learning-path.js` — maintained **Build AI systems at work** path linking the practical, agentic and enterprise builder series.
- `curriculum-data.js` / `learning-intelligence.js` — five-level curriculum, the **Become an AI power user** bridge path and prerequisite/outcome/progression context for learning paths.
- `template-library.js` — reusable prompt and workflow template guide collection.
- `sector-starter-packs.js` / `education-starter-pack.js` — sector-focused adoption guidance.
- `content.js` — foundational learning paths, practical tips, reference terms and goal cards.
- `discovery-data.js` — maintained tool, model, course and reusable-resource directories with verification/editorial metadata.
- `site-evolution.js` / `site-evolution.css` — progressive navigation and discovery layer for separate Tools, Models, Courses, Practical and expanded Resources experiences without rewriting the stable core router.
- dated reference-refresh modules — maintained reference and tip additions with primary-source metadata.
- `visual-system.css`, `editorial-photo-overrides.css` and browser smoke scripts — maintained photographic editorial treatment and rendered validation.
- `app.js` — stable hash routing, rendering, unified search, filters and interactions.
- `enhancements.js` — progressive mobile interaction refinements.
- `vercel.json` — deployment and security-header configuration.
- `docs/` — product vision, architecture, roadmap, content workflow, release archive and quality standards.
- `CHANGELOG.md` — current release history.

The current source remains a self-contained static web application with no required build step or external UI framework. Shared accounts/community require a future backend and are not represented as production-ready merely because the interface describes the roadmap.

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
3. Run `npm run check` and relevant rendered browser validation.
4. Review actual desktop and mobile screenshots.
5. Open or review a pull request.
6. Require repository validation and Vercel Preview before merge.
7. Merge to `main` only after checks pass.
8. Let the connected Vercel project deploy `main`.
9. Verify the exact merged SHA reached Vercel production before calling the release published.

The Vercel project is connected directly to this repository. Older payload-based deployments from `Mr-Meow-ZA/yeet` are legacy migration history and are not part of the current production workflow.

## Product guardrails

- Do not let news displace guides, learning, reference, tools, models, courses or reusable resources.
- Preserve every original guide by default; an unexplained guide-count reduction or missing registered module is a validation failure.
- Keep Tools and Models conceptually separate: a product/subscription is not the same thing as the underlying model family.
- Course ratings are editorial judgements supported by explicit reasons, limitations, audience fit and current source verification—not affiliate rankings.
- News signal labels are editorial triage, not objective scores. A category never earns high-signal status automatically.
- Separate source-backed `what changed` facts from AI Compass interpretation, audience impact and recommended action.
- Prefer primary sources for establishing what changed; use independent reporting as clearly labelled context rather than silently upgrading it to a primary claim.
- Keep external previews short and link to the original publisher.
- Clearly identify AI Compass original content versus third-party material and future user-generated community content.
- Prefer primary sources and preserve publication/verification dates.
- Use imagery only when provenance is clear and rendering is reliable.
- Do not publish low-confidence rumours, unsupported rankings or unverified pricing as fact.
- Do not represent browser-local saves/questions as shared-account features.
- Authentication, database schemas, profile/community persistence, moderation systems, paid services or secrets require an explicitly reviewed backend phase.

## Status

**Current release candidate: 0.6.21 / build `2026-08-17.5`.**

The current library preserves at least **41 original guides** and now exposes **7 learning paths organised across 5 curriculum levels**. The new **Become an AI power user** path bridges everyday AI use and technical building through evidence-led research, reusable instructions, RAG fundamentals, automation choice and evaluation.

News is now a source-first intelligence experience rather than a flat feed: Top Signals are deliberately elevated, publisher facts are separated from AI Compass analysis, availability/status is visible, readers can see who should care and what to do next, and the full 20-item curated archive remains filterable. The 17 August primary-source scan did not justify adding a filler story simply to increase recency.

The next architectural step remains **0.7.0 — Maintainability & Freshness**: structured content/schema validation, visible freshness/superseded metadata, shared source metadata and generated taxonomy/relationships. The future account/community phase should then add free profiles, synced saves/follows, learning progress, comments, forums, notifications and moderation on an approved backend without weakening editorial/community separation.

Run `npm run check` before committing. It validates JavaScript syntax, guide identities/sources, all seven learning paths, curriculum assignments, subscription freshness, cumulative guide preservation, maintained news/reference metadata, editorial news-intelligence contracts, visual-system contracts and discovery/course/resource relationships. Use `bash scripts/smoke-visuals.sh`, `bash scripts/smoke-enterprise.sh`, `bash scripts/smoke-discovery.sh` and `bash scripts/smoke-intelligence.sh` for rendered validation.
