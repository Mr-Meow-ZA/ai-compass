# Roadmap

## Immediate — restore the full AI Compass balance

- [x] Redesign the homepage so news is one module, not the whole website.
- [x] Introduce clear top-level sections for Learn, Tips & Tricks and Reference.
- [x] Surface the existing guide library prominently.
- [x] Preserve external article, video and repository previews inside dedicated discovery sections.
- [x] Clarify AI Compass original content versus third-party links.
- [x] Add goal-based homepage entry points and beginner learning paths.

## Foundation

- [x] Connect the Vercel project directly to `Mr-Meow-ZA/ai-compass` on `main`.
- [x] Remove production dependence on compressed payload chunks in `Mr-Meow-ZA/yeet`; the canonical Vercel deployment now follows this repository directly.
- [x] Add JavaScript, generated-route, internal article-link and form-label checks to the rebuild review.
- [x] Add repeatable repository-based browser smoke tests for desktop and mobile, including rendered visual validation before merge.
- [x] Maintain a repository product changelog and quality score.

## Content architecture

- [x] Give guides, tips, references, comparisons, tools, resources and news separate user-facing collections.
- [ ] Move each maintained collection from browser globals into individual JSON or Markdown files with schema validation.
- [x] Add beginner, everyday-user and builder learning paths.
- [x] Build an initial glossary and reference index.
- [x] Build an initial reusable tips and workflow library.
- [ ] Add freshness and superseded-content indicators across every content type.

## Discovery

- [x] Add unified search across guides, tips, references, repositories and news.
- [x] Add filters appropriate to each major content collection.
- [x] Add related guide links and cross-content homepage discovery.
- [ ] Expand saved reading into all content types and add progress tracking.
- [ ] Add dedicated source pages and formal source-quality indicators.

## Future backend — approval required

- [ ] Shared accounts and saved items.
- [ ] Community questions, answers and moderation.
- [ ] Automated RSS/API ingestion.
- [ ] Duplicate and near-duplicate detection.
- [ ] Editorial approval workflow.
- [ ] Personalised feeds and recommendations.

## Completed in 0.6.2 — depth and mobile

- [x] Add original guides for office productivity, evaluation, architecture choice, governance and multimodal work.
- [x] Expand learning paths, tips and reference coverage.
- [x] Add automated validation for unique content identifiers, source URLs and internal relationships.
- [x] Add safe-area-aware mobile shortcuts and search.
- [x] Increase touch target sizes and improve article, table, filter and card behaviour on narrow screens.
- [x] Give each major content type a more distinct visual identity.

## Completed in 0.6.3 — reusable templates

- [x] Build a versioned prompt and workflow template library with copyable patterns for common real-world tasks.
- [x] Ground the template library in current primary-source prompting guidance.
- [x] Add the new content module to syntax and relationship validation.

## Completed in 0.6.4 — first sector starter pack

- [x] Add the small-business AI starter pack with a measurable pilot and staged-adoption method.
- [x] Link the starter pack to deeper AI Compass guides rather than duplicating those workflows.
- [x] Ground sector guidance in current primary-source material and avoid volatile product rankings or pricing.

## Completed in 0.6.5 — operations starter pack

- [x] Add an operations AI starter pack for grounded procedure assistance, handovers, incident review, recurring reporting and maintenance workflows.
- [x] Define human approval and authority boundaries for consequential operational actions.
- [x] Add prompt-injection and representative-evaluation guidance grounded in current primary sources.

## Completed in 0.6.7 — education starter pack

- [x] Add an educator AI starter pack centred on learning goals, student-use rules, privacy, assessment and teacher judgement.
- [x] Add verification and AI-literacy practices grounded in UNESCO competency frameworks.
- [x] Add a small classroom-pilot method linked to existing evaluation and governance guidance.

## Completed in 0.6.8–0.6.9 — editorial visual system

- [x] Add a validated editorial visual system without removing the existing guide library.
- [x] Replace temporary vector/diagram treatment with curated high-resolution photography.
- [x] Preserve official publisher artwork where provenance is clear.
- [x] Add responsive crops, alt text, visible source credits and external-image reachability checks.
- [x] Add headless-Chrome visual smoke validation for desktop and mobile routes.

## Next release — 0.7.0 Maintainability & Freshness

The next release should strengthen the product's long-term content architecture before another broad content expansion.

### Required outcomes

- [ ] Move the most actively maintained content collections into structured JSON or Markdown with schema validation so editing does not depend on large browser-global JavaScript files.
- [ ] Add visible freshness / last-reviewed / superseded metadata to maintained guides and comparisons.
- [ ] Establish a reusable source-metadata and source-quality model that can later support dedicated source pages.
- [ ] Preserve all existing 28+ original guides and current routes during the migration.
- [ ] Keep `npm run check`, rendered browser smoke tests and Vercel Preview as release gates.

### Explicitly deferred

- accounts/community/backend features without separate approval
- automated ingestion before the editorial approval model is defined
- more sector packs merely to increase content count

## Later content priorities

- [ ] Add data-analysis practice files and an interactive spreadsheet learning route.
- [ ] Continue sector starter packs for creative work.
- [ ] Expand image, audio and video creation workflows with maintained primary-source references.
