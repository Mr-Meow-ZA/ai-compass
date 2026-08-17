# Content Workflow

## Content types

AI Compass keeps materially different content types separate:

- Original guide / build guide / decision guide
- Learning path and lesson
- Curriculum level / progression metadata
- Practical pattern / prompt recipe / checklist / quick tip
- Reference or glossary entry
- Tool profile
- Model-family profile
- Subscription/comparison record
- Vetted course/training review
- AI Compass reusable resource/template/framework
- Curated repository
- External article/video/podcast/paper/report preview
- AI Compass News intelligence record / external News preview
- Community thread / reply / profile / social signal / report (user-generated or governance data)
- My Compass follow / like / learning-progress record (reader state, not editorial content)

Do not collapse types merely because they mention the same provider. A product such as ChatGPT is a Tool; GPT is a model family; OpenAI Academy is Training; an OpenAI announcement can be News; a sourced explanation can be an AI Compass Guide; a forum post is Community content.

## Canonical maintained-content rule

For collections migrated into `content/maintained/*.json`, the JSON record is the single editorial source of truth. Runtime globals are compatibility adapters, not editorial stores.

Current structured editorial sources:

- `content/maintained/discovery.json`
- `content/maintained/curriculum.json`
- `content/maintained/news-intelligence.json`
- `content/maintained/freshness.json`

`content/manifest.json` owns registration, release/build identity, preservation floors and source/schema references.

Do not recreate deleted parallel maintained JavaScript sources.

## Editorial metadata

Every published editorial item should include where relevant:

- Stable ID/slug
- Title and short summary
- Content type
- Topic/tags
- Intended level and audience/role
- Publication/verification/review date
- Source name and canonical source URL
- Original vs external editorial preview status
- Confidence/editorial status
- Related content/learning path
- Freshness class
- Superseded/archive/abandoned state

### Learning/curriculum

Each active path must belong to exactly one curriculum level and every lesson slug must resolve to a published guide. Curriculum should record prerequisite, outcomes, stage/skills and recommended next path. Reusing a good guide is preferred to creating duplicate lessons merely to make a curriculum appear larger.

### Tools/models

Tool profiles record provider, product type, best-fit tasks, cautions, tags, official source and review date. Model-family profiles record provider, access/deployment style, openness/licence caveat, best-fit workloads, tags, current docs and review date.

Do not treat product pricing as stable model metadata.

### Courses

Every vetted course should record provider/URL, level/audience, time, verified/variable cost, credential context, AI Compass verdict/score, rationale, value, limitations, related path and review date. Ratings are editorial judgement and must never be bought or affiliate-driven without disclosure.

### News intelligence

Preserve two layers:

**Publisher/source layer:** what changed, source/publisher, source type, URL, publication date, review date, optional independent context.

**AI Compass layer:** signal/importance, real-world status, source-quality label, why it matters, who should care, next move, related content and optional watch-next/unknowns.

High signal is deliberate editorial elevation, not something a broad category inherits automatically. Publishing nothing is preferable to manufacturing daily volume.

## Freshness policy

Freshness is maintenance state, not quality.

- **news** — fast-moving developments;
- **volatile** — provider-controlled products/models/courses/subscriptions and selected comparisons;
- **durable** — concepts/curriculum/engineering guidance.

`Current`, `Recent`, `Archive`, `Review soon` and `Needs review` are reader-facing maintenance states. Update review dates only after an actual source check.

## Source standards

Prefer, in order:

1. Official documentation/announcements.
2. Research papers and standards.
3. Maintainer-owned repositories.
4. Reputable technical publications.
5. Independent commentary when it adds clearly labelled context.

Do not publish rumours or low-confidence claims as fact. Vendor examples must not silently become universal engineering rules.

For Courses, inspect the current provider curriculum. For News, prefer primary evidence for what changed and use independent reporting as attributable context.

## External content

- Write short original summaries/previews.
- Link to canonical publisher/provider.
- Do not reproduce full copyrighted works.
- Show publisher/date.
- Disclose sponsored/affiliate content.
- Never imply ownership of third-party artwork/training/repositories.

## Community/editorial separation

Community is now a real product layer in the 0.8 candidate, so this separation is mandatory rather than aspirational.

### Community content is user-generated

Threads, replies, profile bios, likes, helpful votes and accepted answers are **not** AI Compass editorial claims.

- A popular post does not become an editorial fact.
- Helpful votes indicate reader usefulness, not verification.
- Accepted answers indicate the thread author's chosen answer, not AI Compass certification.
- Community tool/course experiences may inform future editorial review, but never silently change an editorial verdict.
- A linked guide discussion sits adjacent to the guide; it does not modify the guide body.

### Public vs private reader state

Public community fields can include username, display name, experience level, bio and published contributions.

Authentication email is not a profile field and must not be displayed.

Private My Compass state includes:

- content follows;
- learning progress;
- later notification preferences/recently viewed unless explicitly designed otherwise.

Do not build a public learning-progress activity feed by default.

### User-generated content safety

- Render user content as escaped plain text unless a future rich-text format has an explicit sanitizer/security review.
- Never render arbitrary user HTML.
- Warn users not to post company-confidential data, credentials, private personal data or copyrighted material they cannot share.
- Substantial AI-assisted technical/community content should be disclosed when that context helps readers judge it.
- Do not encourage high-volume AI-generated posting.

### Moderation workflow

- Users can report a thread/reply for spam, harassment, unsafe material, potentially harmful misinformation, off-topic content or other concerns.
- Reports are private to reporter/moderators.
- Moderation actions are logged separately from editorial corrections.
- Moderator/admin authority is stored outside editable profile fields.
- Normal browser profile updates are self-only.
- Broad moderator access to arbitrary profile fields is prohibited; suspension should use a narrowly scoped operation.
- Removing spam/abuse does not rewrite editorial history.

`docs/COMMUNITY_GUIDELINES.md` is the community behaviour standard.

## My Compass state

Likes, follows and progress are reader continuity signals, not content-ranking inputs.

- Like counts may be shown as social context.
- Follows stay private to the owner.
- Learning completion stays private to the learner.
- Mark-complete language should encourage applied learning, not gamified page opening.
- Social/learning state must never directly update News signal, course ratings, guide freshness or editorial ranking.

## Community backend changes

All shared Supabase objects must use the `ai_compass_*` namespace.

For each schema/security change:

1. Add an ordered migration under `supabase/migrations/`.
2. Apply it through the approved Supabase project workflow.
3. Confirm RLS on every exposed table.
4. Use only the public publishable key in browser configuration.
5. Do not expose service-role or secret keys.
6. Review database posting/authority constraints, not only frontend controls.
7. Run Supabase security-advisor checks and distinguish new AI Compass findings from unrelated shared-project findings.
8. Update `scripts/validate-community.js` when a security invariant is added.
9. Render public community routes against the real backend.
10. Complete a real signed-in acceptance test before production for auth/persistence changes.

## Updating existing editorial content

Before adding/changing an item:

1. Search titles, IDs, tags, claims and source URLs.
2. Update the best existing record where possible.
3. Avoid duplicates.
4. Preserve history.
5. Mark obsolete material superseded/archived/abandoned.
6. Preserve every existing original guide by default.
7. Re-review volatile records when provider docs change or review is due.
8. Re-check curriculum assignments when paths change.
9. Edit canonical structured JSON rather than compatibility globals where migrated.
10. Change schemas and validators together when the contract genuinely changes.

## Current source locations

### Historical/original editorial content

- `data.js`
- `knowledge.js` and guide modules
- `content.js`
- `enterprise-learning-path.js`
- dated reference/news refresh modules

### Structured maintained editorial content

- `content/manifest.json`
- `content/maintained/*.json`
- `content/schemas/*.schema.json`
- `structured-content-loader.js`
- `maintained-content-runtime.js`
- `freshness-runtime.js` / `freshness-ui.js`
- `site-evolution.js`, `learning-intelligence.js`, `news-intelligence.js`

### Community/My Compass

- `community-config.js`
- `community-data.js`
- `community.js`
- `community.css` / `community-controls.css`
- `my-compass-data.js`
- `my-compass.js` / `my-compass-live.js`
- `my-compass.css`
- `supabase/migrations/20260818*.sql`
- `docs/COMMUNITY_GUIDELINES.md`

## Release gates

Every meaningful release should:

1. Read canonical repository and shared workflow lessons.
2. Preserve stable content IDs/relationships unless deliberate migration/correction.
3. Validate schemas and manifest/runtime alignment.
4. Run syntax/content/source validation.
5. Validate affected search/filter/taxonomy/relationship behaviour.
6. Preserve cumulative guide identities/count floors.
7. Verify structured-dependent modules wait for readiness.
8. Keep News facts vs analysis visibly distinct.
9. Test freshness thresholds deterministically.
10. For community/backend changes, validate RLS/security contracts and run security-advisor review.
11. Render meaningful desktop/mobile routes and inspect screenshots.
12. For authenticated changes, perform a real signed-in flow against the exact release candidate; anonymous smoke is insufficient proof.
13. Update changelog and relevant architecture/roadmap/quality docs.
14. Require exact-head GitHub CI and Vercel Preview before merge.
15. Confirm exact merged `main` SHA in post-merge GitHub Actions and Vercel Production before calling it live.

A Vercel quota/rate-limit failure is a release gate, not a reason to generate repeated no-op commits.
