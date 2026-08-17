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

## Current architecture

AI Compass remains a self-contained static web application with no runtime framework and no server-side database. Release 0.7.0 introduces a manifest-driven maintained-content layer so fast-changing editorial records no longer need duplicate browser-global source modules.

### Stable application and historical content

- `index.html` — static application entry point and script registration.
- `app.js` — stable hash routing, core rendering, search, filters, saved guides and browser-local prototype interactions.
- `data.js` — imported guides, comparisons, repositories, community records and historical curated feed records.
- `knowledge.js` and maintained guide modules — the cumulative original-guide library.
- `content.js` — foundational learning paths, practical tips, reference terms and goal cards.
- `enterprise-learning-path.js` — maintained **Build AI systems at work** path.
- dated news/reference refresh modules — verified additions layered onto historical data without rewriting it.

### Structured maintained content

- `content/manifest.json` — canonical release/build manifest, source-collection registry, runtime-module registry, preservation floors and freshness classes.
- `content/maintained/discovery.json` — Tools, Models, Courses and reusable Resources.
- `content/maintained/curriculum.json` — five-level curriculum, **Become an AI power user**, prerequisites, outcomes and next-path metadata.
- `content/maintained/news-intelligence.json` — signal/status/source-quality/impact metadata applied to the curated News feed.
- `content/maintained/freshness.json` — shared freshness classes, review windows and guide overrides.
- `content/schemas/*.schema.json` — JSON Schema contracts for the manifest and maintained collections.
- `structured-content-loader.js` — loads the manifest and declared JSON collections in the browser.
- `maintained-content-runtime.js` — adapts structured records into the existing runtime globals while the stable renderer is preserved.
- `freshness-runtime.js` / `freshness-ui.js` / `freshness.css` — deterministic freshness classification and visible maintenance state.

The superseded `discovery-data.js`, `curriculum-data.js` and `news-intelligence-data.js` modules are intentionally removed in 0.7.0 so the maintained records have one source of truth.

### Presentation layers

- `site-evolution.js` / `site-evolution.css` — Tools, Models, Courses, Practical, Resources, guide tags and reader-first discovery.
- `learning-intelligence.js` / `intelligence.css` — five-level curriculum and path progression.
- `news-intelligence.js` / `intelligence.css` — source-first News intelligence desk.
- `visual-system.css`, `editorial-photo-overrides.css`, guide-specific styles and `mobile.css` — responsive publication-style visual system.
- `enhancements.js` — progressive mobile/search/article interaction refinements.

## Freshness model

AI Compass now distinguishes content by how quickly it can become misleading:

- **News** — fast-moving developments. Reader states progress from `Current` to `Recent` to `Archive`.
- **Volatile** — provider-controlled details such as tools, models, courses, subscriptions and selected hardware/comparison guides. States progress from `Current` to `Review soon` to `Needs review`.
- **Durable** — concepts, learning structure and engineering guidance with longer review windows.

Freshness is maintenance metadata, not a quality score. An archived news item remains historically valid if its source/summary was accurate; a `Needs review` label means the current recommendation or provider-controlled detail should be re-verified before relying on it.

## Local development

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

Do not open `index.html` directly from the filesystem. The 0.7.0 maintained-content loader fetches JSON collections, so a served HTTP environment is required.

## Deployment

The canonical workflow is:

1. Create a focused branch.
2. Make source/content changes.
3. Run `npm run check` and affected rendered-browser suites.
4. Review actual desktop/mobile screenshots for meaningful visual changes.
5. Open/review a pull request.
6. Require repository validation and Vercel Preview for the exact PR head.
7. Merge to `main` only after required checks pass.
8. Let the connected Vercel project deploy `main`.
9. Verify the exact merged SHA has a successful post-merge GitHub Actions run and successful Vercel deployment status before calling the release published.

Older payload-based deployments from `Mr-Meow-ZA/yeet` are legacy migration history and are not part of the current production workflow.

## Editing structured maintained content

For Tools, Models, Courses, Resources, Curriculum, News intelligence or freshness policy:

1. Edit the appropriate file under `content/maintained/`.
2. Keep stable IDs and existing canonical relationships unless an editorial correction requires a change.
3. Add/update schema fields if the content contract genuinely changes.
4. Update `content/manifest.json` only when a collection/module/preservation contract changes.
5. Run `npm run check`.
6. Render the affected route before merge.

Do not recreate parallel JavaScript source modules for structured collections. The manifest/JSON record is the canonical maintained source.

## Product guardrails

- Do not let news displace guides, learning, reference, tools, models, courses or reusable resources.
- Preserve every original guide by default; an unexplained guide-count reduction or missing required identity is a validation failure.
- Keep Tools and Models conceptually separate: a product/subscription is not the same thing as the underlying model family.
- Course ratings are editorial judgements supported by explicit reasons, limitations, audience fit and current source verification—not affiliate rankings.
- News signal labels are editorial triage, not objective scores. A category never earns high-signal status automatically.
- Separate source-backed `what changed` facts from AI Compass interpretation, audience impact and recommended action.
- Prefer primary sources for establishing what changed; use independent reporting as clearly labelled context.
- Keep external previews short and link to the original publisher.
- Clearly identify AI Compass original content versus third-party material and future user-generated community content.
- Preserve source URLs, verification/review dates and superseded/archive state where relevant.
- Use imagery only when provenance is clear and rendering is reliable.
- Do not publish low-confidence rumours, unsupported rankings or unverified pricing as fact.
- Do not represent browser-local saves/questions as shared-account features.
- Authentication, database schemas, profile/community persistence, moderation systems, paid services or secrets require an explicitly reviewed backend phase.

## Status

**Release candidate: 0.7.0 / build `2026-08-17.6`.**

The current library preserves at least **41 original guides**, **7 learning paths** across **5 curriculum levels**, a source-first **20-item News intelligence briefing**, **6 Tools**, **6 model families**, **6 vetted Courses** and **8 reusable toolkit resources**.

0.7.0 is primarily an architecture/trust release: Discovery, Curriculum, News Intelligence and Freshness are now canonical schema-validated JSON collections behind a shared manifest; duplicate JavaScript sources are removed; visible freshness states are shared across volatile content; and CI validates manifest registration, schemas, relationships, freshness behaviour and all existing browser routes.

This is an incremental migration, not a risky rewrite. Original guide bodies, foundational tips/references and imported historical data remain in their proven modules and can move into structured collections during later 0.7.x work.

Run `npm run check` before committing. The full release gate also includes:

```bash
bash scripts/smoke-visuals.sh
bash scripts/smoke-enterprise.sh
bash scripts/smoke-discovery.sh
bash scripts/smoke-intelligence.sh
bash scripts/smoke-structured-content.sh
```

The next product priorities after 0.7.0 are generated cross-site taxonomy/search, deeper per-item freshness/source metadata, role-based learning paths and richer resource/tool/model coverage; the separately reviewed free-profile/community backend remains an approved product goal rather than a static-frontend shortcut.
