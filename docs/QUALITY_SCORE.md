# Quality Score

## Review — 2026-08-06 content depth and mobile pass (0.6.2)

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

**Current overall product score: 9.2/10** based on the 0.6.2 content, source, route, interaction and responsive browser review. Later editorial releases retain this score provisionally until the next full browser and quality review rather than inflating it without equivalent evidence.

## Validation completed

- JavaScript syntax and relationship validation are maintained in repository CI.
- The 0.6.2 browser review covered thirteen representative routes in headless Chromium.
- Mobile navigation, search dialog, article contents toggle and Escape behaviour passed that review.
- No console errors, page errors or horizontal overflow were found at 390 × 844 in that review.
- No visible non-inline controls below the WCAG 2.2 24px minimum were found; primary mobile controls are designed around 44px targets.
- Releases 0.6.3 through 0.6.5 extend the maintained guide set and are included in repository syntax and relationship validation.

## Known limitations

- Browser testing used Chromium rather than physical iOS Safari and Android Chrome devices.
- The content collections remain JavaScript data files rather than schema-validated Markdown or JSON collections.
- The Vercel project is now connected to the canonical GitHub repository, but every release still requires verification that the exact `main` commit reached the stable production URL before it is treated as published.
- A fresh end-to-end browser review should be run after the next structural UI change or substantial collection-model change.
