# Quality Score

## Review — 2026-08-17 maintainability and freshness foundation (0.7.0)

Build `2026-08-17.6` is primarily an architecture/trust release rather than a content-volume release. It preserves the 41-guide library and all current reader experiences while moving the highest-maintenance editorial data into schema-validated structured collections behind a shared manifest, adding visible freshness states and eliminating parallel maintained data modules.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.4 | Existing mobile navigation and responsive content remain intact. Structured-content/freshness smoke routes render Guides, volatile article, Tools, Models, Courses, Reference, Learn and News at mobile/desktop sizes without losing the 0.6.21 hierarchy. Physical iOS/Android testing remains desirable. |
| Navigation | 9.5 | Reader-first Home/Learn/Guides/Practical/Tools/Models/Courses/Resources/News structure remains stable. The five-level learning hierarchy and News intelligence desk are preserved through the data migration. |
| Visual design | 9.4 | Freshness badges/maintenance strips are deliberately subordinate to article/tool/course/news hierarchy rather than becoming decorative UI. The publication-style visual system remains coherent. |
| Accessibility | 9.2 | Existing labelled filters, semantic headings, focus states and mobile target-size foundations remain. Freshness is presented as text rather than colour alone. A dedicated assistive-technology audit is still outstanding. |
| Performance | 8.8 | The app remains framework-free/static. Structured JSON adds small fetches at startup, but duplicate maintained JavaScript datasets are removed. A later generated index/content split can reduce global-script weight further. |
| Reliability | 9.8 | CI now validates schemas, manifest/index registration, source relationships, 41-guide preservation, all seven paths/five levels, News intelligence, deterministic freshness boundaries and five independent Chromium suites. Structured-dependent presentation modules explicitly wait for content readiness instead of relying on fast-network timing. |
| Information architecture | 9.7 | Tools, Models, Courses, Resources, Curriculum, News intelligence and freshness now have explicit structured ownership. Historical/original content remains separate rather than being rewritten into one ambiguous store. |
| Search and filtering | 9.3 | Guide and News filters remain strong, but the site still lacks one generated cross-content taxonomy/search index across all directories and learning records. |
| Content discovery | 9.7 | Existing goal entry points, tags, five-level curriculum, course-to-path links, toolkit resources and News-to-learning links survive the migration. Freshness metadata adds useful trust context to discovery. |
| Trustworthiness | 9.8 | Source-backed facts versus AI Compass analysis remain separated; high-signal elevation remains deliberate; provider-controlled content now carries review state; manifest/schema contracts reduce accidental editorial drift. Universal item-level superseded/source objects are still future work. |
| Usefulness to beginners | 9.6 | The five-level curriculum still gives a clear first step and move-on criteria. Maintenance labels are plain-language rather than technical version metadata. |
| Usefulness to experienced users | 9.7 | Enterprise guides, RAG/agent/evaluation learning, tool/model/course directories and source/freshness metadata now sit on a more maintainable foundation for deeper technical coverage. |

**Current overall product score: 9.4/10.** The increase from 9.3 reflects a material improvement in reliability, freshness transparency and maintainability rather than a claim that AI Compass is feature-complete. Shared accounts/community, generated cross-site taxonomy/search, deeper per-tool/model pages, role-based paths, physical-device testing and full structured migration remain significant gaps.

## Validation completed for 0.7.0 release candidate

- `npm run check` validates JavaScript syntax plus schema, manifest, guide/source, discovery, curriculum, News intelligence, visual-system and freshness contracts.
- Cumulative preservation remains at **41 original guides**, **7 learning paths** and **5 curriculum levels**.
- `content/manifest.json` is checked against `index.html` runtime registration, package version/build marker and all structured source/schema paths.
- Discovery, Curriculum, News Intelligence and Freshness load from canonical JSON collections; superseded parallel data modules are absent.
- Deterministic freshness tests verify the exact threshold transitions for news, volatile and durable material and guide-specific overrides.
- Core visual regression, Enterprise AI Builder, discovery/navigation, signal/curriculum and structured-content/freshness Chromium suites pass.
- The structured-content/freshness suite verifies real browser loading rather than only validating JSON on disk.
- Desktop screenshots for Guides, a volatile subscription guide, Tools, Courses and News were inspected during the release-candidate pass; freshness presentation remained subordinate to the primary content hierarchy.
- A startup-timing review identified a potential async race even though CI was green. `site-evolution.js`, `learning-intelligence.js`, `news-intelligence.js` and `freshness-ui.js` were changed to wait explicitly for `AI_COMPASS_CONTENT_READY`; all suites must pass again from the final documentation-complete head before merge.

## Known limitations / next quality targets

- Browser testing uses headless Chromium rather than physical iOS Safari and Android Chrome devices.
- Structured migration currently covers the highest-maintenance Discovery, Curriculum, News Intelligence and Freshness collections; original guide bodies and foundational tips/references still live in JavaScript modules.
- Search does not yet expose one generated taxonomy across Guides, Practical, Reference, Tools, Models, Courses, Resources, News and curriculum.
- Freshness is shared at collection/class level with selected guide overrides; more explicit item-level `superseded`, `abandoned` and source metadata is still needed.
- News does not yet expose a dedicated `what remains unknown / watch next` field for every item; it should be added only where uncertainty materially helps action.
- Course editorial scoring has an explicit methodology, but the directory is intentionally small.
- Current saved/question interactions remain browser-local; free profiles, synced learning progress, comments and forum participation need a real authenticated backend with moderation/privacy controls.
- Every release still requires exact merged-SHA GitHub Actions and Vercel deployment evidence before it is treated as published.

## Historical review — 2026-08-17 signal and curriculum pass (0.6.21)

Build `2026-08-17.5` turned News into a source-first intelligence briefing, established a five-level curriculum across seven learning paths and added the missing AI Power User bridge.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.4 | News and five-level Learn rendered cleanly at 390px in Chromium. |
| Navigation | 9.5 | Reader-first navigation remained intact; Learn gained progression and News gained Top Signals plus a full filtered briefing. |
| Visual design | 9.4 | Fact/analysis blocks and curriculum cards fit the existing publication system. |
| Accessibility | 9.2 | Labelled filters and structured headings remained; full assistive-technology testing was still pending. |
| Performance | 8.7 | Static/dependency-free, but more browser-global modules increased maintainability pressure. |
| Reliability | 9.6 | CI validated 41 guides, seven paths, five levels and complete intelligence metadata across 20 curated News records. |
| Information architecture | 9.7 | Learning and News gained explicit internal structure without collapsing other content types. |
| Search and filtering | 9.3 | News added signal/topic/status filters; one generated cross-site taxonomy was still missing. |
| Content discovery | 9.7 | The Power User bridge and News-related learning materially improved onward journeys. |
| Trustworthiness | 9.6 | Publisher facts and AI Compass analysis were visibly separated and high-signal status became deliberate. |
| Usefulness to beginners | 9.6 | AI Essentials became the visible first curriculum level. |
| Usefulness to experienced users | 9.6 | Power User → Builder → Enterprise became a continuous advanced route. |

**Historical 0.6.21 overall product score: 9.3/10.**

## Historical review — 2026-08-17 navigation and discovery foundation (0.6.20)

Build `2026-08-17.4` preserved the 41-guide library while separating Tools and Models, introducing vetted Courses, strengthening Practical and Resources and giving the homepage clearer goal-based entry points.

| Area | Score |
|---|---:|
| Mobile usability | 9.3 |
| Navigation | 9.5 |
| Visual design | 9.3 |
| Accessibility | 9.2 |
| Performance | 8.8 |
| Reliability | 9.5 |
| Information architecture | 9.6 |
| Search and filtering | 9.1 |
| Content discovery | 9.6 |
| Trustworthiness | 9.4 |
| Usefulness to beginners | 9.5 |
| Usefulness to experienced users | 9.5 |

**Historical 0.6.20 overall product score: 9.3/10.**

## Historical review — 2026-08-06 content depth and mobile pass (0.6.2)

Build `2026-08-06.2` established the balanced-platform/mobile baseline with broader guides, learning paths, practical/reference depth and deliberate mobile interactions.

**Historical 0.6.2 overall product score: 9.2/10.**
