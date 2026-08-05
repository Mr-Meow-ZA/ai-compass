# Changelog

## 2026-08-05 — Repository initialisation

### Added

- Imported the current AI Compass static application source.
- Established `Mr-Meow-ZA/ai-compass` as the canonical project repository.
- Added product vision, architecture, roadmap, content workflow and quality-score documentation.
- Documented the production Vercel project and the legacy payload-based deployment.

### Current limitation

- The imported snapshot is visually and structurally news-heavy.
- Guides still exist, but Learn, Tips & Tricks and Reference require dedicated product sections.
- Vercel still needs to be connected directly to this repository before the legacy `Mr-Meow-ZA/yeet` payload dependency can be retired.

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
