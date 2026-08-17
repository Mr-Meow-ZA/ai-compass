# Quality Score

## Review — 2026-08-17 navigation and discovery foundation (0.6.20)

Version `2026-08-17.4` is the first broad information-architecture review since the 0.6.2 rebuild. It preserves the 41-guide library while separating Tools and Models, introducing vetted Courses, strengthening Practical and Resources, adding experience-based learning lanes and giving the homepage clearer goal-based entry points.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.3 | Core mobile navigation remains intact; the evolved homepage and Courses route were rendered at 390px and manually inspected. Goal cards and course-review content stack cleanly without visible collisions or horizontal overflow. Physical iOS/Android testing remains useful. |
| Navigation | 9.5 | Primary navigation now separates Learn, Guides, Practical, Tools, Models, Courses, Resources and News. Homepage entry points let readers choose by intent instead of requiring knowledge of AI taxonomy. Reference and Community remain available as supporting destinations. |
| Visual design | 9.3 | New directory/course/resource surfaces retain the calm publication-style system. Tool/model cards, learning lanes, course reviews and toolkit resources have clear hierarchy without generic AI artwork or excessive decorative UI. |
| Accessibility | 9.2 | Existing semantic/focus/target-size foundations remain. New routes use readable headings, links and responsive card layouts; a dedicated accessibility audit of the new directories is still desirable before 1.0. |
| Performance | 8.8 | The product remains dependency-free/static, but the growing number of browser-global content modules reinforces the need for 0.7 structured collection splitting and generated indexes. |
| Reliability | 9.5 | CI now validates 41-guide preservation plus Tool, Model, Course and Resource relationships. Core, Enterprise Builder and discovery/navigation Chromium suites all pass after a brittle mobile test assertion was corrected rather than bypassed. |
| Information architecture | 9.6 | Tool products and underlying model families are now distinct; Courses and reusable Resources have explicit editorial roles; learning is organised into four experience lanes; community/editorial boundaries are documented. |
| Search and filtering | 9.1 | Existing unified search and guide filters remain; guide topic chips improve discovery. Tools, Models, Courses and Resources are not yet fully indexed into one generated search/taxonomy model, which is a 0.7 priority. |
| Content discovery | 9.6 | Eight homepage intent routes, experience-based learning lanes, visible guide tags, course-to-learning-path links and reusable toolkit cards create significantly stronger onward journeys. |
| Trustworthiness | 9.4 | Course recommendations include explicit editorial rationale, limitations, verification dates and official sources. Tool/model directories avoid unsupported universal rankings and point back to current provider documentation. |
| Usefulness to beginners | 9.5 | “Learn AI”, AI Essentials, vetted beginner courses, Tools and Practical provide clearer entry points without requiring technical terminology. |
| Usefulness to experienced users | 9.5 | Enterprise builder material is now easier to discover and is connected to RAG, evaluation, security, model families, courses and reusable frameworks. |

**Current overall product score: 9.3/10.** This is a fresh product/navigation assessment backed by source validation plus rendered desktop/mobile review. It does not claim that every planned 1.0 capability exists: accounts/community persistence, generated taxonomy/search, structured content schemas, richer news analysis and full freshness indicators remain unfinished.

## Validation completed for 0.6.20

- `npm run check` validates JavaScript syntax, guide identities/sources, learning relationships, news/reference metadata and the new discovery-directory contracts.
- Cumulative guide preservation remains at **41 original guides**.
- `scripts/validate-discovery.js` verifies unique Tool/Model/Course/Resource IDs, HTTPS source URLs, course-review completeness, course-to-learning-path relationships and toolkit-to-guide relationships.
- Core rendered regression routes pass in Chromium.
- Enterprise AI Builder desktop/mobile routes pass in Chromium.
- Tools, Models, Courses, Practical, Resources and Learn render successfully in the dedicated discovery suite.
- Courses and the evolved homepage were rendered at 390px and manually inspected.
- Desktop screenshots for Learn, Tools, Models, Courses, Practical and Resources were manually inspected before merge.
- An initial discovery-smoke failure was traced to a brittle literal-text assertion around a line break; it was replaced with a structural mobile course-card count assertion and the full suite was rerun successfully.

## Known limitations / next quality targets

- Browser testing uses headless Chromium rather than physical iOS Safari and Android Chrome devices.
- Tools, Models, Courses, Resources and other maintained collections still live in JavaScript modules rather than schema-validated Markdown/JSON.
- Search does not yet expose a single generated taxonomy across every new directory.
- Course editorial scoring has an explicit methodology, but the directory is still small and should expand carefully rather than by volume.
- Current saved/question interactions remain browser-local; free profiles, learning progress, comments and forum participation need a real authenticated backend with moderation/privacy controls.
- News still needs the planned structured AI Compass analysis model (`what happened`, `why it matters`, `who should care`, `what changes`, `unknowns`).
- Every release still requires verification that the exact merged `main` commit reached Vercel production before it is treated as published.

## Historical review — 2026-08-06 content depth and mobile pass (0.6.2)

Version `2026-08-06.2` expanded the balanced-platform rebuild with five high-value evergreen guides, two additional learning paths, a larger practical reference library and a deliberate mobile interaction layer.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.3 | Safe-area bottom navigation, mobile search, swipeable task cards, collapsible article contents, 44px control targets and no tested horizontal overflow at 390px. Real-device testing on multiple iPhones and Android devices remains useful. |
| Navigation | 9.2 | Primary navigation remains product-led; mobile shortcuts prioritise Home, Learn, Guides, Search and Saved while News stays secondary. |
| Visual design | 9.1 | Guides, tips, reference, resources, repositories, comparisons and news now have distinct but coherent visual identities. |
| Accessibility | 9.2 | WCAG-oriented target sizes, skip navigation, visible focus, labelled search dialog, keyboard escape handling, reduced-motion support and semantic controls. |
| Performance | 8.9 | Dependency-free static application. Additional content increases transfer size; collection splitting and generated search indexes remain future work. |
| Reliability | 9.2 | Syntax, relationship and source validation pass; 13 routes and key mobile interactions ran without console or page errors. |
| Information architecture | 9.4 | Learning, guides, tips, reference, tools, resources and news remain separate. New content fills practical work and governance gaps. |
| Search and filtering | 9.1 | Unified search includes maintained guides, twenty tips and twenty-two reference terms. Mobile search is directly accessible. |
| Content discovery | 9.4 | Six goal routes, five learning paths, updated featured guides and content-specific visual cues improve orientation. |
| Trustworthiness | 9.3 | Maintained guides use primary sources from NIST, Anthropic, OpenAI, Google, Microsoft, OECD and OWASP, with dates and caution boundaries. |
| Usefulness to beginners | 9.5 | Stronger coverage of office work, evaluation, multimodal literacy, safe adoption and plain-language definitions. |
| Usefulness to experienced users | 9.1 | Governance, evals, authority boundaries, guardrails and architecture choice add practical depth. |

**Historical 0.6.2 overall product score: 9.2/10.** Later editorial releases retained that score provisionally until the fresh 0.6.20 review above.
