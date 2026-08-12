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

## 2026-08-10 — Education sector starter pack (0.6.7)

### Content added

- Added a practical educator starter pack covering learning-goal-first AI use, explicit student-use rules, verification, privacy, assessment design, teacher-reviewed feedback and AI literacy.
- Added a simple classroom pilot method that measures learning quality and teacher workload instead of treating tool adoption as success by itself.
- Linked the guide to AI Compass evaluation, prompt-template and governance material.
- Grounded the guide in UNESCO's current teacher and student AI competency frameworks, UNESCO's generative-AI guidance and the TeachAI school-guidance toolkit.

### Editorial rationale

- Continues the sector-starter-pack roadmap with evergreen education guidance rather than increasing news volume.
- Keeps teacher judgement, learner agency, privacy and visible evidence of learning central.
- The fresh-news scan found no additional post-0.6.6 primary-source announcement that met the bar for another news item, so the feed was not padded with low-value updates.

### Validation target

- Application build marker is `2026-08-10.1` and package version is `0.6.7`.
- `education-starter-pack.js` is included in the repository syntax check; CI and Vercel preview remain release gates before merge.

## 2026-08-10 — Editorial visual system (0.6.8)

### Visual design

- Added a restrained AI Compass-owned vector illustration system for guide cards, learning paths, article summaries and news fallbacks.
- Added distinct editorial motifs for getting started, workflows, models, agents, open source, research, education, safety, products, work, coding, society, events and video instead of generic generated imagery.
- Preserved official publisher artwork where it is already attributable and reliable; externally hosted news images now fall back to an AI Compass illustration if they fail to load.
- Kept visual treatment deliberately flat, typographic and diagrammatic to avoid synthetic-photo aesthetics and repetitive AI-art conventions.

### Guide preservation

- No guide was removed or replaced in this release.
- Added automated visual validation with a preservation floor of 28 original guides so an unexpected library reduction fails CI.

### Validation target

- Application build marker is `2026-08-10.2` and package version is `0.6.8`.
- `npm run check` now validates the visual-system source, deterministic SVG output, guide-count preservation, news-image HTTPS/alt/credit metadata and CSS visual contracts.
- CI and Vercel preview remain required before merge.

## 2026-08-10 — Photographic editorial upgrade (0.6.9)

### Visual design

- Replaced the 0.6.8 diagrammatic/vector treatment with high-resolution editorial photography across the homepage start panel, guide cards, learning paths, article summaries and news fallbacks.
- Added curated topic imagery for business use, collaboration, education, coding, industrial automation, infrastructure, security, research and governance.
- Preserved official publisher artwork for news where available; contextual editorial photography is used only as a fallback when a maintained news item does not have a suitable official thumbnail.
- Added responsive image crops, `srcset`, lazy loading for card imagery, eager loading for above-the-fold/article imagery, accessible alt text and visible source credits.
- Adjusted product-news fallback selection so browser/product stories use developer/workstation photography rather than generic infrastructure imagery.

### Quality and preservation

- No original guide was removed or replaced; the preservation floor remains 28 guides.
- Removed legacy vector rendering from the live guide-card path.
- CI now fails if legacy vector artwork renders, if guide photography or attribution is incomplete, or if the curated photographic CDN sources are unreachable.
- Headless Chrome renders and captures Home, Guides, News, article and 390 px mobile routes for visual review before merge.

### Release target

- Application build marker is `2026-08-10.3` and package version is `0.6.9`.
- Vercel Preview and the full rendered-photography validation must pass before merge.

## 2026-08-11 — Editorial freshness verification

### Corrected

- Re-verified OpenAI’s Atlas service-update source after the stated 9 August deadline passed.
- Reworded the AI Compass preview so it reports OpenAI’s scheduled shutdown date without claiming that post-deadline service state has been independently confirmed.
- Updated the Atlas record’s verification date to 11 August 2026.

### News scan

- Reviewed current official OpenAI, Anthropic, Google DeepMind, Meta, Microsoft Research, GitHub and Hugging Face channels.
- Added no new daily-news item because no post-10-August announcement surfaced that clearly met the significance and source-quality bar.
- Preserved all existing original guides and did not increase news prominence.

## 2026-08-11 — Static guide imagery correction (0.6.10)

### Fixed

- Removed the live `visual-system.js` and `visual-news-coverage.js` runtime image injectors from the production entry point.
- Guide-card photography now renders directly from the stylesheet as part of the card layout, so images do not depend on MutationObserver timing or post-render DOM enhancement.
- Added subject-aware static photo selection for prompting/coding, automation/agents/operations, models/infrastructure, education, governance, security/privacy, research/evaluation and office-work guides.
- Restored the normal guide-card padding and responsive image crop behaviour for desktop and mobile.
- Preserved all existing original guides and content modules.

### Release

- Application build marker is `2026-08-11.1` and package version is `0.6.10`.
- The runtime visual files remain in repository history for auditability but are no longer loaded by the production page.

## 2026-08-12 — Subscription-plan freshness correction (0.6.11)

### Corrected

- Re-verified the original AI subscription decision guide against official OpenAI, Anthropic, Google, Microsoft and Perplexity plan pages.
- Corrected Google coverage so Google AI Plus is the lower-cost paid entry tier at $9.99/month on the US plan page, while Google AI Pro remains $19.99/month with the larger bundle and higher limits.
- Clarified that Microsoft Copilot Chat is included for eligible Microsoft 365 users while the full Microsoft 365 Copilot business licence remains $30/user/month paid yearly on the South Africa page, excluding VAT.
- Refreshed ChatGPT Plus, Claude Pro and Perplexity Pro plan-price verification dates and kept regional/local-price caveats visible.
- Updated the related comparison cards in the same release so the guide and comparison directory do not diverge.

### Editorial workflow

- Added `subscription-refresh.js` as a small maintained pre-render correction layer for volatile subscription facts without rewriting the imported historical guide collection.
- Registered the module in syntax and content validation and added assertions for the verified Google AI Plus correction.
- Preserved every existing original guide; guide count is unchanged.
- Scanned current official OpenAI, Anthropic, Google DeepMind, Meta, Microsoft, GitHub and Hugging Face channels and added no new news item because no post-11-August development met the significance/source-quality bar.

### Release target

- Application build marker is `2026-08-12.1` and package version is `0.6.11`.
- Repository validation and Vercel Preview remain required before merge; production must be verified against the exact merged `main` commit.
