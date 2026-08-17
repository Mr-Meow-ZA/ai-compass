# Content Workflow

## Content types

AI Compass maintains deliberately distinct content types:

- Original guide / build guide / decision guide
- Learning path and learning-path lesson
- Curriculum level / path progression metadata
- Practical pattern / prompt recipe / checklist / quick tip
- Reference or glossary entry
- Tool profile
- Model-family profile
- Subscription/comparison record
- Vetted course/training review
- AI Compass reusable resource/template/framework
- Curated repository
- External article/video/podcast/paper/report preview
- AI Compass news intelligence record / external news preview
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

### Learning/curriculum metadata

Learning paths should additionally record audience, duration, ordered lesson slugs and a clear description. The maintained curriculum layer should record:

- One curriculum level for every active learning path
- Intended audience and stage for each level
- Skills the level is intended to build
- A practical `move on when` criterion rather than completion-for-completion's-sake
- Path prerequisite
- Explicit learning outcomes
- Recommended next path when one exists

A learning path may reuse an existing source-backed guide; creating duplicate lessons solely to make a curriculum appear larger is discouraged. Every path step must resolve to a published guide and every active path must belong to exactly one curriculum level.

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

### News-intelligence metadata

Every maintained News record should preserve the source-backed publisher layer first, then add a clearly separate AI Compass interpretation layer.

**Publisher/source layer:**

- What changed / concise sourced summary
- Publisher/source name and source type
- Canonical source URL
- Publication date
- Verification/review date where maintained
- Optional independent context URL/source when it adds material context

**AI Compass intelligence layer:**

- Importance/signal label
- Real-world status such as available, rolling out, limited/preview, research or retirement/migration
- Source-quality label
- Why AI Compass thinks it matters
- Who should care
- Recommended next move
- Related guide/reference/tool/model/course/resource where useful
- What remains unknown / watch next when uncertainty materially affects action

Signal labels are editorial triage, not objective scores. Broad categories such as Safety or Models **must not automatically earn high-signal status**. High-signal elevation should be deliberate and supported by practical impact/durability. The UI must visually distinguish sourced `What changed` content from AI Compass analysis.

Do not create analysis solely to increase volume. If the source scan produces no meaningful development, publishing nothing is preferable to manufacturing a daily story.

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

For News, prefer a primary source for establishing what changed. Independent reporting is useful for impact/context, but its interpretation should remain attributable and must not be presented as if it were the provider's own statement.

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
7. Re-review volatile tool/model/course/news records when their provider documentation materially changes.
8. Re-check curriculum assignments whenever a path is added, removed or substantially reordered.

## Current source locations

- `data.js` contains imported guides, comparisons, repositories, community records and historical curated external feed data.
- `knowledge.js` and maintained guide modules extend the original guide library.
- `content.js` contains foundational learning paths, practical items, reference terms and goal cards.
- `enterprise-learning-path.js` extends the learning-path library with the corporate AI builder route.
- `curriculum-data.js` adds the Power User path and five-level curriculum/progression metadata.
- `learning-intelligence.js` presents curriculum and path progression without rewriting the stable core renderer.
- `discovery-data.js` contains maintained Tools, Models, Courses and reusable Resources metadata.
- `site-evolution.js` presents the evolved information architecture without rewriting the historical/core renderer.
- `news-intelligence-data.js` layers signal/status/source-quality/action metadata across the curated feed.
- `news-intelligence.js` presents the source-first intelligence briefing.
- dated reference/news refresh modules add maintained current content without rewriting historical collections.

This split is an interim static model. The 0.7.x target is separate schema-validated JSON/Markdown collections with shared source/freshness metadata and a reusable manifest, including migration of the current curriculum and news-intelligence overlays.

## Release gates

Every meaningful editorial/product release should:

1. Register every new module in both application and validation paths.
2. Run syntax/content/source validation.
3. Validate affected search, filters, taxonomy and internal relationships.
4. Validate course-to-learning-path, toolkit-to-guide, curriculum-to-path and news-related-content links.
5. Preserve cumulative guide identities/count floors.
6. For News changes, verify the sourced fact layer and AI Compass analysis remain visibly distinct.
7. Run rendered browser checks for meaningful visual/navigation changes at desktop and mobile sizes.
8. Inspect the actual screenshots rather than relying only on build success or DOM counts.
9. Preserve image provenance and accessible treatment for prominent imagery.
10. Update the changelog and relevant architecture/roadmap documentation.
11. Merge only after required checks pass.
12. Confirm the exact merged `main` commit reached Vercel production before calling it live.
