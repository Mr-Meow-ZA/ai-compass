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

## Canonical maintained-content rule

For collections migrated into `content/maintained/*.json`, the structured JSON record is the single editorial source of truth.

Do **not** recreate parallel maintained JavaScript data modules. Runtime globals are compatibility adapters for the current static renderer, not canonical editorial stores.

Current structured sources:

- `content/maintained/discovery.json` — Tools, Models, Courses, Resources.
- `content/maintained/curriculum.json` — curriculum levels, Power User path and progression metadata.
- `content/maintained/news-intelligence.json` — News signal/status/analysis/action metadata.
- `content/maintained/freshness.json` — review classes/windows and guide overrides.

`content/manifest.json` owns registration, release/build identity, collection floors and structured-source/schema references.

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

Learning paths should record audience, duration, ordered lesson slugs and a clear description. The maintained curriculum should record:

- One curriculum level for every active learning path
- Intended audience and stage for each level
- Skills the level is intended to build
- A practical `move on when` criterion rather than completion-for-completion's-sake
- Path prerequisite
- Explicit learning outcomes
- Recommended next path when one exists

A learning path may reuse an existing source-backed guide; creating duplicate lessons solely to make a curriculum appear larger is discouraged. Every path step must resolve to a published guide and every active path must belong to exactly one curriculum level.

### Tool/model metadata

Tool profiles should additionally record provider, product type, best-fit tasks, cautions, tags, official source and review date. Model-family profiles should record provider, access/deployment style, openness/licence caveat, best-fit workloads, tags, official current documentation and review date.

Do not treat tool/subscription pricing as stable model metadata.

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
- Verification/review date

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

## Freshness policy

Freshness is maintenance metadata, not a quality score.

The shared policy currently uses three classes:

- **news** — fast-moving current developments;
- **volatile** — provider-controlled products, models, courses, subscriptions and selected hardware/comparison guidance;
- **durable** — concepts, curriculum structure and engineering guidance with longer review windows.

Reader-facing states include `Current`, `Recent`, `Archive`, `Review soon`, `Needs review` and `Review date not recorded`.

Rules:

1. A freshness warning is a prompt to re-verify; it is not evidence that the content is wrong.
2. Archived News remains part of historical editorial record unless the original item itself was materially incorrect.
3. Volatile content marked `Needs review` should not be promoted as a current recommendation until its provider-controlled claims are rechecked.
4. When an item is superseded or abandoned, mark that explicitly instead of using freshness alone to imply the change.
5. Update the canonical review/verification date only after a real source check, not simply because a file was edited.

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

Before adding or changing an item:

1. Search titles, IDs, tags, claims and source URLs.
2. Update the best existing record when possible.
3. Avoid duplicate or near-duplicate pages.
4. Preserve meaningful history.
5. Mark obsolete items as superseded, archived or abandoned rather than silently presenting them as current.
6. Preserve every existing original guide by default; an unexplained count reduction or missing guide slug is a release blocker.
7. Re-review volatile tool/model/course/news records when provider documentation materially changes or the freshness policy says review is due.
8. Re-check curriculum assignments whenever a path is added, removed or substantially reordered.
9. For structured collections, edit the JSON source rather than runtime globals or deleted legacy data modules.
10. If a schema genuinely changes, update the schema and validators in the same branch.

## Current source locations

### Historical/original content

- `data.js` — imported guides, comparisons, repositories, community records and historical curated external feed data.
- `knowledge.js` and maintained guide modules — cumulative original guide library.
- `content.js` — foundational learning paths, practical items, reference terms and goal cards.
- `enterprise-learning-path.js` — corporate AI builder route.
- dated reference/news refresh modules — preserved source-backed additions.

### Structured maintained content

- `content/manifest.json` — registration/preservation/freshness manifest.
- `content/maintained/discovery.json` — Tools, Models, Courses, Resources.
- `content/maintained/curriculum.json` — curriculum and Power User path.
- `content/maintained/news-intelligence.json` — News intelligence analysis metadata.
- `content/maintained/freshness.json` — shared freshness policy.
- `content/schemas/*.schema.json` — structured content contracts.
- `structured-content-loader.js` — browser JSON/manifest loader.
- `maintained-content-runtime.js` — compatibility adapter into current runtime globals.
- `freshness-runtime.js` / `freshness-ui.js` — shared freshness calculation and presentation.
- `site-evolution.js`, `learning-intelligence.js`, `news-intelligence.js` — structured-content-aware presentation layers.

The migration is intentionally incremental. Guide bodies and foundational tips/references can move later only when the schema provides a clear maintenance benefit and cumulative-history risks are controlled.

## Release gates

Every meaningful editorial/product release should:

1. Fetch/read the current canonical repository and shared workflow lessons before editing.
2. Keep structured collection IDs and source relationships stable unless a deliberate correction/migration requires change.
3. Run schema/manifest validation and verify `index.html` registration agrees with `content/manifest.json`.
4. Run syntax/content/source validation.
5. Validate affected search, filters, taxonomy and internal relationships.
6. Validate course-to-learning-path, toolkit-to-guide, curriculum-to-path and News-related-content links.
7. Preserve cumulative guide identities/count floors.
8. Verify structured-dependent presentation modules wait for content readiness rather than assuming network timing.
9. For News changes, verify sourced facts and AI Compass analysis remain visibly distinct.
10. For freshness changes, test deterministic threshold boundaries rather than only today's state.
11. Run rendered browser checks for meaningful visual/navigation/runtime changes at desktop and mobile sizes.
12. Inspect actual screenshots rather than relying only on build success or DOM counts when presentation changed.
13. Preserve image provenance and accessible treatment for prominent imagery.
14. Update changelog and relevant README/architecture/roadmap/quality documentation.
15. Merge only after required checks and Vercel Preview pass for the exact branch head.
16. Confirm the exact merged `main` SHA has a successful post-merge GitHub Actions run and successful Vercel deployment status before calling it published.
