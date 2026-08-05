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

## 2026-08-06 — Content depth and mobile usability pass (0.6.2)

### Content added

- Added five original guides covering office productivity, AI-output evaluation, automation-versus-agent architecture, lightweight governance and multimodal AI.
- Expanded learning paths from three to five with new Office Productivity and Responsible Adoption routes.
- Expanded practical tips from eight to twenty.
- Expanded the reference desk from ten to twenty-two concepts.
- Expanded goal-based homepage entry points from four to six.
- Added a formal content audit documenting addressed and remaining gaps.

### Mobile improvements

- Added a safe-area-aware bottom shortcut dock for Home, Learn, Guides, Search and Saved.
- Added a mobile search dialog with direct access to Tips, Reference, Tools and News.
- Increased interactive target sizes and spacing to meet or exceed WCAG 2.2 minimum target guidance.
- Converted goal cards into a swipeable mobile carousel.
- Added a collapsible guide contents control on mobile articles.
- Improved narrow-screen tables, code blocks, filters, typography, card density and footer spacing.
- Prevented article tables from expanding the page beyond the viewport.

### Content identity

- Added distinct visual treatments for guides, tips, references, resources, comparisons, repositories and news.
- Rebalanced the six homepage goal cards into a three-by-two desktop grid and a touch-friendly mobile carousel.

### Validation

- All application JavaScript passed syntax checks.
- Content validation passed for unique slugs, source links, learning-path references and tip relationships.
- Thirteen routes rendered successfully in Chromium at desktop and mobile widths.
- Mobile search, mobile navigation, article contents toggle and all directory filters were exercised.
- No console errors, page errors, narrow-screen overflow or undersized non-inline controls were found in the test pass.
