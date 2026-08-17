# Quality Score

## Review — 2026-08-17 signal and curriculum pass (0.6.21)

Version `2026-08-17.5` builds on the 0.6.20 navigation foundation without increasing the guide count for its own sake. It turns News into a source-first intelligence briefing, establishes a five-level curriculum across all seven learning paths and adds the missing AI Power User bridge between routine AI use and controlled agent/enterprise building.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.4 | News and the five-level Learn overview were rendered at 390px and manually inspected. The intelligence hierarchy, status bar, signal cards, horizontal curriculum rail and fixed mobile navigation remain usable without visible overlap. Physical iOS/Android testing remains desirable. |
| Navigation | 9.5 | The 0.6.20 reader-first navigation remains intact. Learning now exposes a coherent progression rather than only a path directory, while News offers top signals plus a complete filtered briefing. |
| Visual design | 9.4 | News uses a restrained editorial briefing treatment with clearly different fact and analysis blocks. Curriculum cards and path progression use the existing publication system rather than introducing a separate app-like aesthetic. |
| Accessibility | 9.2 | Existing semantic/focus/target-size foundations remain. New filters are labelled and learning/news content uses headings and readable text hierarchy; a dedicated assistive-technology audit is still outstanding. |
| Performance | 8.7 | The app remains static and dependency-free, but 0.6.21 adds more browser-global modules. This makes the 0.7 structured-content/manifest migration more important, not less. |
| Reliability | 9.6 | CI now validates 41-guide preservation, seven learning paths, exactly five curriculum levels and complete intelligence metadata across all 20 curated news items. Four rendered Chromium suites pass. An old News-card selector regression was corrected to verify preserved content under either legacy or intelligence markup. |
| Information architecture | 9.7 | Learning now has an explicit five-level progression with prerequisites/outcomes/next paths. News now separates publisher facts, AI Compass analysis, status, source quality and reader action. Tool/model/course/resource boundaries remain intact. |
| Search and filtering | 9.3 | News now supports search plus signal/topic/status filters. Guide discovery remains strong, but Tools, Models, Courses, Resources and the curriculum still need one generated taxonomy/search model. |
| Content discovery | 9.7 | Top Signals connect developments to related learning; every path has curriculum context and recommended progression; the Power User bridge closes a material gap between everyday use and advanced building. |
| Trustworthiness | 9.6 | `What changed` and `Why AI Compass thinks it matters` are visibly separate. High-signal status is deliberate rather than category-inherited; visual review caught and corrected an over-promoted external safety commentary item before merge. Primary sources remain preferred for establishing what changed. |
| Usefulness to beginners | 9.6 | AI Essentials is now visibly the first curriculum level with explicit move-on criteria, reducing the need for beginners to infer a sequence from seven independent paths. |
| Usefulness to experienced users | 9.6 | Power User, Builder/Team Lead and Enterprise levels now form a continuous route through evidence, RAG, evaluation, agents, governance, architecture and identity/security. |

**Current overall product score: 9.3/10.** The score remains deliberately unchanged from 0.6.20 despite stronger News and Learn experiences. The product still lacks shared accounts/progress, a structured content/schema layer, generated cross-site taxonomy/search, universal freshness/superseded indicators and physical-device/accessibility testing; those are material enough that a higher headline score would overstate readiness.

## Validation completed for 0.6.21

- `npm run check` validates JavaScript syntax, **41 original guides**, **7 learning paths**, exactly **5 curriculum levels**, news/reference/discovery contracts and the intelligence metadata layer.
- `scripts/validate-intelligence.js` checks every active path belongs to exactly one level, verifies prerequisites/outcomes/next relationships and validates intelligence fields/related links across the full 20-item curated feed.
- Core visual regression, Enterprise AI Builder, discovery/navigation and dedicated signal/curriculum Chromium suites all pass.
- News desktop/mobile, Learn desktop/mobile and the AI Power User path were manually inspected from uploaded GitHub Actions screenshots.
- The first 0.6.21 CI pass correctly failed because the old core smoke suite counted only legacy `.news-item` cards; the test was strengthened to verify either legacy or intelligence structures while preserving the curated-item floor and requiring Top Signals.
- Manual visual review then caught a generic Safety-category item being promoted into Top Signals. Category defaults were reduced to `Worth knowing`; the final Top Signals are deliberately elevated source-backed developments instead.

## Known limitations / next quality targets

- Browser testing uses headless Chromium rather than physical iOS Safari and Android Chrome devices.
- Maintained collections, curriculum metadata and news-intelligence metadata still live in JavaScript modules rather than schema-validated Markdown/JSON.
- Search does not yet expose one generated taxonomy across Guides, Tools, Models, Courses, Resources, News and curriculum.
- News does not yet expose a dedicated `what remains unknown / watch next` field for every item; it should be added only where uncertainty materially helps action.
- Course editorial scoring has an explicit methodology, but the directory is still intentionally small.
- Current saved/question interactions remain browser-local; free profiles, synced learning progress, comments and forum participation need a real authenticated backend with moderation/privacy controls.
- Every release still requires verification that the exact merged `main` commit reached Vercel production before it is treated as published.

## Historical review — 2026-08-17 navigation and discovery foundation (0.6.20)

Version `2026-08-17.4` was the first broad information-architecture review since the 0.6.2 rebuild. It preserved the 41-guide library while separating Tools and Models, introducing vetted Courses, strengthening Practical and Resources, adding experience-based learning lanes and giving the homepage clearer goal-based entry points.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.3 | Core mobile navigation remained intact; the evolved homepage and Courses route were rendered at 390px and manually inspected. |
| Navigation | 9.5 | Primary navigation separated Learn, Guides, Practical, Tools, Models, Courses, Resources and News while homepage entry points let readers choose by intent. |
| Visual design | 9.3 | New directory/course/resource surfaces retained the calm publication-style system. |
| Accessibility | 9.2 | Existing semantic/focus/target-size foundations remained; a dedicated accessibility audit was still outstanding. |
| Performance | 8.8 | The product remained dependency-free/static, but growing browser-global modules reinforced the need for structured collection splitting. |
| Reliability | 9.5 | CI validated 41-guide preservation plus Tool, Model, Course and Resource relationships across core, Enterprise and discovery suites. |
| Information architecture | 9.6 | Tool products and model families became distinct; Courses and reusable Resources gained explicit editorial roles. |
| Search and filtering | 9.1 | Existing unified search and guide filters remained, while new directories were not yet part of one generated taxonomy. |
| Content discovery | 9.6 | Eight homepage intent routes, learning lanes, guide tags, course-to-path links and toolkit cards strengthened onward journeys. |
| Trustworthiness | 9.4 | Course recommendations included explicit rationale, limitations, verification dates and official sources. |
| Usefulness to beginners | 9.5 | Learn AI, AI Essentials, vetted beginner courses, Tools and Practical improved entry points. |
| Usefulness to experienced users | 9.5 | Enterprise builder material became easier to discover and connected to supporting resources. |

**Historical 0.6.20 overall product score: 9.3/10.**

## Historical review — 2026-08-06 content depth and mobile pass (0.6.2)

Version `2026-08-06.2` expanded the balanced-platform rebuild with five high-value evergreen guides, two additional learning paths, a larger practical reference library and a deliberate mobile interaction layer.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.3 | Safe-area bottom navigation, mobile search, swipeable task cards, collapsible article contents, 44px control targets and no tested horizontal overflow at 390px. Real-device testing on multiple iPhones and Android devices remains useful. |
| Navigation | 9.2 | Primary navigation remained product-led; mobile shortcuts prioritised Home, Learn, Guides, Search and Saved while News stayed secondary. |
| Visual design | 9.1 | Guides, tips, reference, resources, repositories, comparisons and news had distinct but coherent visual identities. |
| Accessibility | 9.2 | WCAG-oriented target sizes, skip navigation, visible focus, labelled search dialog, keyboard escape handling, reduced-motion support and semantic controls. |
| Performance | 8.9 | Dependency-free static application; collection splitting and generated search indexes remained future work. |
| Reliability | 9.2 | Syntax, relationship and source validation passed across representative routes and key mobile interactions. |
| Information architecture | 9.4 | Learning, guides, tips, reference, tools, resources and news remained separate. |
| Search and filtering | 9.1 | Unified search included maintained guides, tips and reference terms. |
| Content discovery | 9.4 | Goal routes, learning paths, featured guides and content-specific visual cues improved orientation. |
| Trustworthiness | 9.3 | Maintained guides used primary sources with dates and caution boundaries. |
| Usefulness to beginners | 9.5 | Strong coverage of office work, evaluation, multimodal literacy, safe adoption and plain-language definitions. |
| Usefulness to experienced users | 9.1 | Governance, evals, authority boundaries, guardrails and architecture choice added practical depth. |

**Historical 0.6.2 overall product score: 9.2/10.**
