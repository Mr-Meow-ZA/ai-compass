# Changelog

## 2026-08-05 — Repository initialisation

### Added

- Imported the current AI Compass static application source.
- Established `Mr-Meow-ZA/ai-compass` as the canonical project repository.
- Added product vision, architecture, roadmap, content workflow and quality-score documentation.
- Documented the production Vercel project and the legacy payload-based deployment.

### Initial limitation

- The imported snapshot was visually and structurally news-heavy.
- Guides still existed, but Learn, Tips & Tricks and Reference required dedicated product sections.
- Vercel was not directly connected to the new repository.

## 2026-08-06 — Balanced platform rebuild

### Changed

- Rebuilt the homepage around AI education, practical guidance, reference and tool discovery.
- Reduced news to a compact homepage module plus a dedicated News section.
- Replaced the news-publication navigation with Home, Learn, Guides, Tips & Tricks, Reference, Tools & Models, Resources and News.
- Reworked the visual system into a calm white knowledge-platform interface rather than a news template.

### Added

- Three structured learning paths for beginners, everyday users and builders.
- A dedicated Tips & Tricks library with practical examples and related guides.
- A plain-English AI reference and glossary section.
- Unified search across guides, tips, reference terms, repositories and external news.
- Goal-based homepage entry points.
- Dedicated Tools & Models and Resources sections.
- `content.js` for learning paths, tips, reference terms and homepage task cards.

### Validation

- JavaScript syntax checks passed for all source data and application scripts.
- Fourteen routes rendered successfully in the test harness.
- Generated route snapshots contained no duplicate IDs, empty links or unlabelled controls.
- All generated internal article links resolve to an existing guide.
- The one-time GitHub validation workflow completed successfully and removed its staging files.

### Production

- Deployed build `2026-08-06.1` to Vercel production.
- Verified HTTP 200 responses for the production page and application JavaScript.
- Verified that the production alias serves the rebuilt source from canonical commit `c257396378ea1ad1693a6f89d6fc27648b6cd466`.
- Removed production dependence on the legacy compressed payload chunks in `Mr-Meow-ZA/yeet`.
- Direct Vercel Git integration with `Mr-Meow-ZA/ai-compass` remains the next infrastructure task.