# Content Workflow

## Content types

AI Compass maintains distinct content types:

- Original guide
- Learning-path lesson
- Tip or trick
- Reference or glossary entry
- Workflow or template
- Sector starter pack
- Model, tool or subscription comparison
- Curated repository or resource
- External article preview
- Video or podcast preview
- News item
- Community question

## Required metadata

Every published item should include, where relevant:

- Title
- Short summary
- Content type
- Topic and tags
- Intended skill level
- Publication or verification date
- Source name and canonical source URL
- Original versus external status
- Confidence or editorial status
- Related content
- Superseded or archived status when applicable

## Source standards

Prefer:

1. Official documentation and product announcements.
2. Research papers and standards.
3. Maintainer-owned GitHub repositories.
4. Reputable technical publications.
5. Independent commentary when it adds clearly labelled analysis.

Do not publish unverified rumours or low-confidence claims as fact.

For technical build guides, primary sources should support the architecture or implementation claims; avoid turning vendor-specific examples into universal requirements. Separate durable engineering principles from product-specific capabilities that can change.

## External content

- Use a short original summary or preview.
- Link to the canonical publisher.
- Do not reproduce full articles, transcripts or copyrighted media.
- Display the publisher and date clearly.
- Separate sponsored or affiliate material explicitly.

## Updating existing content

Before adding an item:

1. Search titles, tags, claims and source URLs.
2. Update the best existing record when possible.
3. Avoid duplicate or near-duplicate pages.
4. Preserve meaningful history.
5. Mark obsolete items as superseded, archived or abandoned rather than silently presenting them as current.
6. Preserve every existing original guide by default; an unexplained count reduction or missing guide slug is a release blocker.

## Current source locations

- `data.js` contains the imported long-form guides, comparisons, repositories, community records and curated external feed.
- `knowledge.js` contains maintained original guides that extend the imported library.
- `dashboard-guide.js`, `practical-build-guides.js`, `research-build-guide.js`, `infographic-build-guide.js`, `agentic-build-guides.js` and `enterprise-ai-builder-guides.js` contain maintained practical build-guide series.
- `template-library.js` contains reusable prompt and workflow templates.
- `sector-starter-packs.js` and `education-starter-pack.js` contain context-specific adoption guides.
- `content.js` contains foundational learning paths, concise tips, reference terms and goal-based homepage entry points.
- `enterprise-learning-path.js` extends the learning-path library with the corporate AI builder route.
- dated reference-refresh modules add maintained references/tips without rewriting the historical collection.

This split is an interim static model. Future work should move each collection into separate schema-validated JSON or Markdown files without changing the visible distinction between AI Compass originals and third-party previews.

## Release gates

Every meaningful editorial release should:

1. Register every new module in both the application and validation paths.
2. Run syntax/content/source validation.
3. Validate affected search, filters and internal learning relationships.
4. Run rendered browser checks for meaningful visual changes at desktop and mobile sizes.
5. Preserve photographic provenance and accessible treatment for prominent imagery.
6. Update the changelog.
7. Merge only after required checks pass.
8. Confirm that the exact merged `main` commit reached Vercel production before calling it live.