# Content Workflow

## Content types

AI Compass maintains distinct content types:

- Original guide
- Learning-path lesson
- Tip or trick
- Reference or glossary entry
- Workflow or template
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

## Current source locations

- `data.js` contains the imported long-form guides, comparisons, repositories, community records and curated external feed.
- `content.js` contains learning paths, concise tips, reference terms and goal-based homepage entry points.

This split is an interim static model. Future work should move each collection into separate schema-validated JSON or Markdown files without changing the visible distinction between AI Compass originals and third-party previews.
