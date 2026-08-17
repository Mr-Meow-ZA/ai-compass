# Content Workflow

## Content types

AI Compass maintains deliberately distinct content types:

- Original guide / build guide / decision guide
- Learning path and learning-path lesson
- Practical pattern / prompt recipe / checklist / quick tip
- Reference or glossary entry
- Tool profile
- Model-family profile
- Subscription/comparison record
- Vetted course/training review
- AI Compass reusable resource/template/framework
- Curated repository
- External article/video/podcast/paper/report preview
- AI Compass news analysis or external news preview
- Community question/comment/forum post (future user-generated content)

Do not collapse different types merely because they mention the same provider. A product such as ChatGPT is a Tool; GPT is a model family; an OpenAI Academy course is Training; an OpenAI announcement can be News; a sourced explanation can be an AI Compass Guide.

## Required metadata

Every published item should include, where relevant:

- Stable ID or slug
- Title
- Short summary
- Content type
- Topic and tags
- Intended skill level
- Goal/use case and audience/role when useful
- Publication or verification date
- Source name and canonical source URL
- Original, external editorial preview or user-generated status
- Confidence/editorial status
- Related content and learning path
- Freshness class / last reviewed date for volatile material
- Superseded, archived or abandoned status when applicable

### Tool/model metadata

Tool profiles should additionally record provider, product type, best-fit tasks, cautions and official source. Model-family profiles should record provider, access/deployment style, openness/licence caveat, best-fit workloads and official current documentation. Do not treat tool/subscription pricing as stable model metadata.

### Course-review metadata

Every vetted course should include:

- Provider and canonical course URL
- Level and intended audience
- Time commitment
- Price only when verified or explicitly marked variable
- Certificate/credential context without overstating its value
- AI Compass editorial score or verdict
- Why the course is recommended
- What value it provides
- Who should skip it / limitations
- Related AI Compass learning path
- Verification date

Ratings are editorial judgement, not objective fact. They must be supported by the written review and never purchased, sponsored or affiliate-driven without explicit disclosure.

### News-analysis metadata

As news evolves beyond short external previews, structured AI Compass news analysis should aim to include:

- What happened
- Why it matters
- Who should care
- What changes for readers now
- What remains unknown/unverified
- Primary source and optional independent context
- Importance label
- Related guide/reference/tool/model/course links
- Publication/source date and AI Compass verification date

Do not create analysis solely to increase volume.

## Source standards

Prefer:

1. Official documentation and product announcements.
2. Research papers and standards.
3. Maintainer-owned repositories.
4. Reputable technical publications.
5. Independent commentary when it adds clearly labelled context.

Do not publish unverified rumours or low-confidence claims as fact.

For technical build guides, primary sources should support architecture or implementation claims; avoid turning vendor-specific examples into universal requirements. Separate durable engineering principles from product-specific capabilities that can change.

For course vetting, inspect the provider's current curriculum/course page rather than relying on third-party course aggregators. External reviews can inform context but should not replace curriculum verification.

## External content

- Use a short original summary or preview.
- Link to the canonical publisher/provider.
- Do not reproduce full articles, transcripts, courses or copyrighted media.
- Display publisher/provider and date clearly.
- Separate sponsored or affiliate material explicitly.
- Do not imply AI Compass ownership of external training, artwork or repositories.

## Community/editorial separation

Future community content must be clearly labelled user-generated content and stored separately from editorial truth/status.

- Likes, votes or popularity do not turn a claim into an editorial fact.
- Community course/tool experiences may add reader context but do not automatically change the editorial verdict.
- Moderators may remove abuse/spam without silently rewriting editorial history.
- Editorial corrections remain versioned editorial actions.
- Public profiles should expose only fields users deliberately make public.

## Updating existing content

Before adding an item:

1. Search titles, IDs, tags, claims and source URLs.
2. Update the best existing record when possible.
3. Avoid duplicate or near-duplicate pages.
4. Preserve meaningful history.
5. Mark obsolete items as superseded, archived or abandoned rather than silently presenting them as current.
6. Preserve every existing original guide by default; an unexplained count reduction or missing guide slug is a release blocker.
7. Re-review volatile tool/model/course records when their provider documentation materially changes.

## Current source locations

- `data.js` contains imported guides, comparisons, repositories, community records and historical curated external feed data.
- `knowledge.js` and maintained guide modules extend the original guide library.
- `content.js` contains foundational learning paths, practical items, reference terms and goal cards.
- `enterprise-learning-path.js` extends the learning-path library with the corporate AI builder route.
- `discovery-data.js` contains maintained Tools, Models, Courses and reusable Resources metadata.
- `site-evolution.js` presents the evolved information architecture without rewriting the historical/core renderer.
- dated reference/news refresh modules add maintained current content without rewriting historical collections.

This split is an interim static model. The 0.7.x target is separate schema-validated JSON/Markdown collections with shared source/freshness metadata and a reusable manifest.

## Release gates

Every meaningful editorial/product release should:

1. Register every new module in both application and validation paths.
2. Run syntax/content/source validation.
3. Validate affected search, filters, taxonomy and internal relationships.
4. Validate all course-to-learning-path and toolkit-to-guide links.
5. Preserve cumulative guide identities/count floors.
6. Run rendered browser checks for meaningful visual/navigation changes at desktop and mobile sizes.
7. Inspect the actual screenshots rather than relying only on build success or DOM counts.
8. Preserve image provenance and accessible treatment for prominent imagery.
9. Update the changelog and relevant architecture/roadmap documentation.
10. Merge only after required checks pass.
11. Confirm the exact merged `main` commit reached Vercel production before calling it live.
