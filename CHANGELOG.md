# Changelog

Historical release entries from 0.1.0 through 0.6.11 are preserved in [`docs/CHANGELOG_ARCHIVE_THROUGH_0.6.11.md`](docs/CHANGELOG_ARCHIVE_THROUGH_0.6.11.md).

## 0.8.0 - 2026-08-18

### Added
- Real Supabase-backed **AI Compass Community** replacing the browser-local question-board concept with public forum reading and 11 maintained categories spanning beginner help, AI for work, prompting/research, automation, agents, coding, models/local AI, courses, enterprise AI, showcases and general discussion.
- Free passwordless email magic-link sign-in plus public AI Compass profiles with username, display name, experience level and optional bio. Authentication email remains outside the public profile model.
- Shared threads/replies, thread likes, helpful reply votes, thread follows and accepted answers.
- Linked-content fields so Community threads can belong to a Guide now and Tools, Models, Courses, Resources or Learning Paths later without creating separate comment systems.
- Community reporting with private reporter/moderator access and a moderator-only queue/action log.
- `docs/COMMUNITY_GUIDELINES.md` covering privacy, evidence, AI-assisted content, spam/promotion, intellectual property, helpful/accepted answer semantics and editorial/community separation.
- New **My Compass** account layer with a signed-in return dashboard, content Likes/Follows, private learning progress, Continue Learning cards and community identity.
- Guide-level **Like / Follow / Discuss** controls plus guide-linked Community discussions.
- Learning-path **Follow** and private per-lesson **Mark complete** controls.
- `my-compass-live.js` to redraw progressive guide/learning controls after persisted/auth state changes without rewriting the stable router.
- Four ordered Supabase community/My Compass migration groups under `supabase/migrations/`, all namespaced `ai_compass_*` in the existing shared project.
- `scripts/validate-community.js` and a sixth rendered Chromium suite, `scripts/smoke-community.sh`, including live anonymous reads from the real Supabase backend.

### Security and privacy
- Enabled RLS on **10 forum/profile tables** plus **3 My Compass retention tables**.
- Kept editable profile data separate from protected member/moderator/admin roles so a profile cannot self-promote.
- Added database-level author checks, active-profile checks, accepted-answer integrity and posting/reply rate limits.
- Hardened function privileges so trigger-only functions are not callable through the browser RPC surface; small role/post helpers use security-invoker behaviour.
- Added thread-bump protection so authors cannot manipulate `last_activity_at` directly.
- Restricted normal browser profile updates to the profile owner rather than granting broad moderator profile edits.
- Kept content Follows and learning progress private to the owning user. Like counts are social context only and cannot alter editorial rankings, course verdicts, guide freshness or News signal.
- User post bodies are rendered as escaped plain text rather than executable HTML/Markdown.
- Lazy-loaded Supabase JS asynchronously so a community dependency failure cannot block the editorial site.
- Reviewed Supabase security-advisor output after migrations; no new AI Compass Community/My Compass findings remain. Pre-existing unrelated shared-project warnings were not modified.

### Changed
- Advanced manifest/package release identity to `0.8.0` and application build marker to `2026-08-18.1` on the candidate branch.
- Added Community to reader navigation and **My Compass** to the personal utility experience.
- Preserved all **41 original guides**, **7 learning paths**, **5 curriculum levels**, source-first News intelligence and 0.7 structured/freshness architecture.
- Fixed historical validators that incorrectly hard-coded structured runtime release `0.7.0`; runtime validation now compares against the current manifest release/build.
- Manual visual review corrected default forum button styling, removed duplicate My Compass utility wording and moved guide engagement beneath the existing article actions so the guide title remains primary.

### Validation / release status
- A complete implementation head passed all six GitHub Actions browser suites, including live public Community reads from Supabase and rendered Community desktop/mobile, profile, category, My Compass, guide discussion and learning-progress states.
- Production publication remains intentionally gated by the underlying 0.7.0 release, Supabase Auth redirect allow-list configuration, a real signed-in magic-link acceptance flow, final exact-head Vercel Preview and exact merged-SHA production verification.
- 0.8 remains a **candidate**, not a production claim, until those authenticated/deployment gates are satisfied.

## 0.7.0 - 2026-08-17

### Added
- New canonical `content/manifest.json` containing release/build identity, structured source registration, runtime-module order, collection preservation floors and freshness classes.
- Schema-validated maintained collections for **Discovery**, **Curriculum**, **News Intelligence** and **Freshness** under `content/maintained/` with contracts under `content/schemas/`.
- Manifest-driven browser loading plus a compatibility runtime adapter so the stable static renderer can consume structured records without a full application rewrite.
- Shared freshness policy with `news`, `volatile` and `durable` classes and visible **Current / Recent / Archive / Review soon / Needs review** states.
- Guide-specific freshness overrides for provider-controlled subscription/comparison/hardware guidance.
- `scripts/validate-structured-content.js`, `scripts/validate-manifest.js` and `scripts/validate-freshness.js` plus a dedicated structured-content/freshness Chromium suite.
- Permanent CI guards that fail if deleted legacy maintained-data modules reappear or if structured-content presentation modules stop waiting for the shared readiness promise.

### Changed
- Tools, Models, Courses and reusable Resources now come from canonical JSON rather than `discovery-data.js`.
- The five-level curriculum and **Become an AI power user** path now come from canonical JSON rather than `curriculum-data.js`.
- News signal/status/source-quality/analysis/action metadata now comes from canonical JSON rather than `news-intelligence-data.js`.
- Removed the superseded `discovery-data.js`, `curriculum-data.js` and `news-intelligence-data.js` maintained sources so these records no longer have parallel editorial truth.
- `site-evolution.js`, `learning-intelligence.js`, `news-intelligence.js` and `freshness-ui.js` now wait explicitly for `AI_COMPASS_CONTENT_READY` before reading structured globals, eliminating a network-timing startup race that fast CI/network conditions could otherwise hide.
- Corrected the legacy learning-lane fallback to match the current five-level curriculum and dedicated AI Power User path.
- Preserved all **41 original guides**, **7 learning paths**, **5 curriculum levels**, the complete source-first News briefing and all existing public article routes.
- Advanced application build marker to `2026-08-17.6` and package version to `0.7.0`.

### Validation and review
- Schema/manifest validation checks structured shape, unique IDs, HTTPS sources, path relationships, runtime registration, release/build alignment and deleted-source invariants.
- Freshness validation uses fixed dates to verify exact state transitions rather than relying on whatever day CI happens to run.
- Core visual regression, Enterprise AI Builder, discovery/navigation, signal/curriculum and structured-content/freshness Chromium suites are release gates.
- The initial 0.7.0 release-candidate head passed all five suites before documentation closeout; the startup-readiness guard was then strengthened and requires the complete suite to pass again on the final head before merge.
- Manual rendered review confirmed the freshness layer remains subordinate to primary content hierarchy on Guides, a volatile subscription guide, Tools, Courses and News.

### Scope
- This is an incremental architecture migration, not a rewrite. Original guide bodies, foundational practical/reference records and historical imported data remain in their proven modules for later 0.7.x migration where the maintenance benefit justifies the risk.
- No filler News item was added as part of this architecture release.

## 0.6.21 - 2026-08-17

### Added
- New source-first **AI Compass intelligence desk** for News with three deliberately elevated Top Signals, explicit real-world status, source-quality labels, audience relevance and a recommended next move.
- Clear separation between sourced **What changed** summaries and **Why AI Compass thinks it matters** editorial analysis.
- Search plus Signal, Topic and Status filters across the complete existing 20-item curated briefing.
- New five-level curriculum: **AI Essentials → AI at Work → AI Power User → AI Builder & Team Lead → Enterprise AI Builder**.
- New six-lesson **Become an AI power user** path covering reliable prompting, evidence-led research, reusable AI skills, RAG fundamentals, automation-versus-agent choice and evaluation.
- Path-level prerequisite, learning-outcome, curriculum-position and recommended-next-path context.
- `scripts/validate-intelligence.js` for curriculum/news-intelligence contracts and `scripts/smoke-intelligence.sh` for rendered News/Learn/Power User/Enterprise checks at desktop and mobile sizes.

### Changed
- News is no longer presented as a flat link directory. The original publisher/source records and canonical links remain intact underneath the intelligence presentation.
- High-signal status is now deliberate editorial elevation rather than something a broad category such as Safety or Models can inherit automatically.
- Preserved all **41 original guides** while increasing active learning paths from 6 to **7** and organising every path into exactly one of **5 curriculum levels**.
- Strengthened the legacy visual smoke suite so it verifies preserved News volume under either the historical card markup or the new intelligence structure and requires Top Signals when the intelligence layer is active.
- Advanced application build marker to `2026-08-17.5` and package version to `0.6.21`.

### Validation and editorial review
- Structural validation passes with 41 guides, 7 paths, 5 curriculum levels and complete intelligence metadata across all 20 curated News records.
- Core visual regression, Enterprise AI Builder, discovery/navigation and the new signal/curriculum Chromium suites pass.
- Manual desktop/mobile screenshot review caught an over-promoted external safety commentary item in Top Signals; the generic category scoring was corrected before merge. The resulting Top Signals are the maintained Anthropic provenance item, OpenAI Atlas retirement/migration and Google DeepMind Gemini 3.5 Flash Cyber limited-access development.
- Reviewed official OpenAI, Anthropic, Google and Microsoft announcement/documentation channels for a newer material development. No post-13-August item cleared the significance/source-quality threshold, so no filler story was added merely to increase recency.

## 0.6.20 - 2026-08-17

### Added
- New reader-first homepage entry points for learning, building, practical help, tools, models, courses, resources and current developments.
- Separate **Tools** directory with six initial vetted product profiles and official-source links.
- Separate **Models** directory with six model-family profiles covering access, openness/deployment context, practical fit and cautions.
- New **Courses** section with six vetted training recommendations from OpenAI Academy, Anthropic, Google for Developers and Microsoft Learn. Each review includes audience, level, time/cost context, editorial score, why it is recommended, value, limitations and a related AI Compass learning path.
- Expanded **Resources** experience with eight reusable AI Compass templates/frameworks/checklists plus curated repositories.
- New experience-based learning lanes: **AI Essentials**, **AI for Work**, **AI Power User**, and **AI Builder & Enterprise**.
- Visible guide-topic shortcuts and article/guide tags for better discovery.
- Explicit community/profile roadmap describing future free accounts, synced saves/follows, progress, comments, forums and moderation while keeping current browser-local prototypes honestly labelled.

### Changed
- Evolved **Tips & Tricks** into a stronger **Practical Library** presentation with prompt/workflow/quality/safety entry points while preserving the existing practical records and legacy route.
- Refreshed the primary navigation to Home, Learn, Guides, Practical, Tools, Models, Courses, Resources and News, while retaining supporting Reference and Community routes.
- Preserved all 41 existing original guides and public article routes; this release adds discovery/navigation structure rather than replacing guide assets.
- Updated product vision, README, architecture, roadmap and content workflow to define the acquisition, retention, course-vetting and community strategy.
- Advanced application build marker to `2026-08-17.4` and package version to `0.6.20`.

### Validation
- Added `scripts/validate-discovery.js` to validate tool/model/course/resource IDs, URLs, course-review completeness, learning-path relationships, internal toolkit links and the 41-guide preservation floor.
- Added `scripts/smoke-discovery.sh` to render Tools, Models, Courses, Practical, Resources and Learn on desktop plus Courses and the evolved homepage on mobile.
- Expanded GitHub Actions visual artifacts so the actual new discovery/navigation screenshots can be inspected before merge.

## 0.6.19 - 2026-08-17

### Added
- New original guide: **Design an enterprise AI architecture: models, RAG, tools, agents and business systems**.
- New original guide: **Build a trustworthy enterprise RAG system: retrieval, permissions, citations and evaluation**.
- New original guide: **Build an enterprise AI evaluation framework: golden sets, graders, regressions and release gates**.
- New original guide: **Secure enterprise AI agents: identity, permissions and least privilege**.
- New original guide: **Build an enterprise AI development lifecycle: idea to pilot, production and retirement**.
- New **Build AI systems at work** learning path connecting workflow automation, agent orchestration, workplace agent testing and the five enterprise builder guides.
- Added a dedicated enterprise desktop/mobile Chromium smoke suite and subject-specific photographic guide-card treatment using the existing attributable editorial photo library.

### Changed
- Original guide library increases from 36 to 41 guides.
- Raised cumulative preservation validation to 41 guides and added explicit verification/source checks for all five enterprise builder guide slugs plus the new learning path.
- Refreshed README, architecture and content-workflow documentation to match the real module structure and current guide baseline.
- Advanced application build marker to `2026-08-17.3` and package version to `0.6.19`.

### Research basis
- Enterprise architecture guidance is grounded in current Microsoft agent architecture/data-planning documentation, OpenAI agent/tool guidance and NIST AI RMF material.
- RAG guidance is grounded in current Microsoft RAG architecture/evaluation and secure multitenant retrieval guidance plus OpenAI vector-store metadata/chunking documentation.
- Evaluation guidance uses current Microsoft iterative agent-evaluation guidance, OpenAI Evals and NIST risk/evaluation material.
- Identity/security guidance uses current Microsoft Entra Agent ID and authorization guidance plus NIST risk-management material.

### News scan
- Reviewed current official OpenAI, Anthropic, Google and Microsoft AI announcement channels for material developments since the previous successful curator pass. No new item surfaced that cleared the significance and source-quality threshold, so no filler news item was added.

## 0.6.18 - 2026-08-17

### Added
- New original build guide: **Build agent orchestration: coordinate models, tools, specialists and handoffs**.
- New original workplace guide: **Build and test agentic AI at the workplace: from safe pilot to governed production**.
- Added architecture-pattern selection, manager/specialist contracts, tool and handoff boundaries, state/context design, guardrails, tracing and orchestration red-team guidance.
- Added a progressive workplace autonomy ladder, pilot charter, sandbox/testing approach, golden and adversarial evaluation sets, release gates, human approval guidance and production governance checklist.
- Grounded both guides in current OpenAI Agents SDK, Anthropic agent architecture guidance and Microsoft agent evaluation/responsible-AI documentation.

### Changed
- Original guide library increases from 34 to 36 guides.
- Registered the agentic guide module in application and validation paths and raised cumulative preservation validation to 36 guides with explicit required-slug/source checks.
- Advanced application build marker to `2026-08-17.2` and package version to `0.6.18`.

## 0.6.17 - 2026-08-17

### Added
- New original build guide: **Build a professional infographic with AI: evidence, hierarchy, visuals and verification**.
- Added a seven-pass visual-communication workflow, visual-form selection guidance, reusable research/layout/image-direction/red-team prompts, accessibility guidance and a publication QA checklist.
- Grounded the guide in current OpenAI image-generation guidance, Datawrapper accessibility documentation and WCAG 2.2.
- Added a distinct, attributable Unsplash editorial photograph for the guide card with provenance preserved in the stylesheet.

### Changed
- Original guide library increases from 33 to 34 guides.
- Registered the infographic guide in the application and syntax/content validation paths, raised the cumulative preservation floor to 34 and added an explicit required-slug/verification check.
- Advanced the application build marker to `2026-08-17.1` and package version to `0.6.17`.

### News scan
- Reviewed current official OpenAI, Anthropic, Google and Microsoft AI announcement channels for material developments since the previous successful curator pass. No post-16-August item met the significance/source-quality threshold, so no filler news item was added.

## 0.6.16 - 2026-08-16

### Added
- New original build guide: **Build a professional research report with AI: question, evidence, synthesis and verification**.
- Added an evidence-matrix workflow, source-selection rules, reusable research/synthesis/red-team prompts and a publication QA checklist.
- Grounded the guide in current primary documentation for ChatGPT Deep Research, Gemini Deep Research and Claude Research/web search.

### Changed
- Original guide library increases from 32 to 33 guides.
- Registered the new research guide in the application and syntax/content validation paths, raised the cumulative preservation floor to 33 and added an explicit required-slug/verification check.
- Restored attributable photographic guide-card imagery for the dashboard and three earlier practical-build guides after rendered validation exposed legacy SVG/gradient overrides.
- Advanced application build marker to `2026-08-16.1` and package version to `0.6.16`.

### News scan
- Reviewed current official OpenAI, Anthropic, Google and Microsoft AI announcement channels for material developments since the previous successful curator pass. No post-15-August item met the significance/source-quality threshold, so no filler news item was added.

## 0.6.15 - 2026-08-15

### Added
- New maintained reference entry for **Structured Outputs**, grounded in OpenAI's primary documentation and verified 15 August 2026.
- New practical automation tip: define and validate a fixed schema before asking AI to extract data for downstream workflows.

### Changed
- Raised cumulative guide-preservation validation from 29 to 32 and added explicit identity checks for the dashboard and three practical build guides so a missing module cannot pass silently.
- Registered the 15 August reference-refresh module in both the application and validation paths.