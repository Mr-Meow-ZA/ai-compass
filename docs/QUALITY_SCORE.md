# Quality Score

## Review — 2026-08-06 content depth and mobile pass (0.6.2)

Version `2026-08-06.2` expands the balanced-platform rebuild with five high-value evergreen guides, two additional learning paths, a larger practical reference library and a deliberate mobile interaction layer.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.3 | Safe-area bottom navigation, mobile search, swipeable task cards, collapsible article contents, 44px control targets and no tested horizontal overflow at 390px. Real-device testing on multiple iPhones and Android devices remains useful. |
| Navigation | 9.2 | Primary navigation remains product-led; mobile shortcuts prioritise Home, Learn, Guides, Search and Saved while News stays secondary. |
| Visual design | 9.1 | Guides, tips, reference, resources, repositories, comparisons and news now have distinct but coherent visual identities. |
| Accessibility | 9.2 | WCAG-oriented target sizes, skip navigation, visible focus, labelled search dialog, keyboard escape handling, reduced-motion support and semantic controls. |
| Performance | 8.9 | Dependency-free static application. Additional content increases transfer size; collection splitting and generated search indexes remain future work. |
| Reliability | 9.2 | Syntax, relationship and source validation pass; 13 routes and key mobile interactions ran without console or page errors. |
| Information architecture | 9.4 | Learning, guides, tips, reference, tools, resources and news remain separate. New content fills practical work and governance gaps. |
| Search and filtering | 9.1 | Unified search includes the five new guides, twenty tips and twenty-two reference terms. Mobile search is directly accessible. |
| Content discovery | 9.4 | Six goal routes, five learning paths, updated featured guides and content-specific visual cues improve orientation. |
| Trustworthiness | 9.3 | New guides use primary sources from NIST, Anthropic, OpenAI, Google, Microsoft and OWASP, with dates and caution boundaries. |
| Usefulness to beginners | 9.5 | Stronger coverage of office work, evaluation, multimodal literacy, safe adoption and plain-language definitions. |
| Usefulness to experienced users | 9.1 | Governance, evals, authority boundaries, guardrails and architecture choice add practical depth. |

**Current overall product score: 9.2/10** based on content, source, route, interaction and responsive browser review.

## Validation completed

- JavaScript syntax passed for `app.js`, `data.js`, `knowledge.js`, `content.js` and `enhancements.js`.
- Content validation passed for 24 guide slugs, 5 learning paths, 20 tips, 22 reference terms and all source URLs.
- Thirteen representative routes rendered in headless Chromium.
- Mobile navigation, search dialog, article contents toggle and Escape behaviour passed.
- No console errors, page errors or horizontal overflow were found at 390 × 844.
- No visible non-inline controls below the WCAG 2.2 24px minimum were found; primary mobile controls are designed around 44px targets.

## Known limitations

- Browser testing used Chromium rather than physical iOS Safari and Android Chrome devices.
- The content collections remain JavaScript data files rather than schema-validated Markdown or JSON collections.
- Vercel still requires a direct Git connection to this repository for normal commit-to-production deployments.
