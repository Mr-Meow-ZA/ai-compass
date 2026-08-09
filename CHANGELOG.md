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

## 2026-08-07 — Reusable prompt template library (0.6.3)

### Content added

- Added an original, provider-neutral guide containing eight copyable prompt patterns for source-first research, evidence-bound document drafting, spreadsheet audits, meeting actions, option comparisons, troubleshooting, code changes and governed agent work.
- Added a five-block prompt structure covering goal, context, constraints, output and success tests.
- Added a lightweight versioning method for prompts that drive repeated or consequential workflows.
- Grounded the guide in current official prompting guidance from OpenAI, Anthropic and Google rather than third-party prompt collections.

### Editorial rationale

- This closes the highest-priority gap in the 6 August content audit: a versioned template library for prompts, checklists and workflow artefacts.
- The release adds durable evergreen utility without increasing the share of homepage news content.

### Validation

- Added `template-library.js` to syntax and content validation.
- The content validator now checks the new guide alongside the existing guide, learning-path, tip and reference collections.

## 2026-08-08 — Small-business sector starter pack (0.6.4)

### Content added

- Added the first sector-specific starter pack: a practical small-business adoption guide for choosing use cases, setting information boundaries, running measurable pilots, standardising successful workflows and adding automation in layers.
- Added a 30-day adoption sequence and internal links to the office-work, evaluation, prompt-template, architecture-choice and governance guides.
- Grounded the guide in current primary-source guidance from NIST, OECD, Microsoft and OpenAI.

### Editorial rationale

- This starts the next major content-audit priority: sector starter packs for small business, operations, education and creative work.
- The guide focuses on durable adoption method rather than vendor-specific feature lists or unverified productivity claims.
- News volume is unchanged.

### Validation

- Added `sector-starter-packs.js` to syntax and content validation.
- Updated the application build marker to `2026-08-08.1` and package version to `0.6.4`.

## 2026-08-09 — Operations sector starter pack (0.6.5)

### Content added

- Added an operations-focused starter pack covering source-grounded SOP and procedure assistance, shift handovers, incident review, recurring reports, work-order triage and maintenance-note workflows.
- Added explicit authority boundaries that keep direct equipment control, safety interlocks, emergency actions and regulatory sign-off outside ordinary generative-AI workflows.
- Added a representative operations-evaluation method and a four-level human approval ladder from summarise through act.
- Added prompt-injection guidance for vendor documents, messages, web content and other untrusted operational inputs.

### Editorial rationale

- Continues the sector-starter-pack roadmap with an evergreen operations guide rather than increasing daily-news volume.
- Grounds claims in current NIST, Microsoft, OWASP and OpenAI primary guidance and links to existing AI Compass evaluation, governance, architecture and prompt-template material.
- Avoids product rankings, volatile pricing and unsupported claims about autonomous operational performance.

### Validation target

- Application build marker is `2026-08-09.1` and package version is `0.6.5`.
- Repository CI must pass syntax, content-source and internal-relationship validation before merge.

## 2026-08-09 — Curated news refresh and source thumbnails (0.6.6)

### News added

- Added an official OpenAI service update covering the scheduled 9 August retirement of Atlas and the transition of browser-agent work into supported ChatGPT and Codex experiences.
- Added OpenAI's 29 July ChatGPT for Academic Researchers announcement as a research-discovery item, with the rollout scale described as the publisher's stated program plan rather than an independent outcome claim.
- Added Google DeepMind's Gemini 3.5 Flash Cyber announcement with explicit dual-use and limited-access context rather than repeating provider benchmark claims as independent fact.

### News imagery and provenance

- Added the first maintained news-image metadata and rendering layer.
- Added an official Google DeepMind 16:9 announcement image for Gemini 3.5 Flash Cyber and official Anthropic artwork for the existing Claude for Teachers item.
- Added source credit, source-page links, accessible alt text, lazy loading and a failure fallback that hides a broken image rather than leaving a damaged card.
- News items without a suitably attributable or reliable image remain image-free.

### Editorial and validation changes

- Added a dedicated `news-refresh.js` maintenance layer so current curated news can be updated without rewriting the imported historical feed in `data.js`.
- Added `news-media.css` for responsive thumbnail presentation and verification markers.
- Added verification dates to maintained news records.
- Updated the application build marker to `2026-08-09.2` and package version to `0.6.6`.
- Added `news-refresh.js` to the repository syntax check; CI and preview validation remain release gates before merge.
