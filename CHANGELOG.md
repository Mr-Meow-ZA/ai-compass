# Changelog

Historical release entries from 0.1.0 through 0.6.11 are preserved in [`docs/CHANGELOG_ARCHIVE_THROUGH_0.6.11.md`](docs/CHANGELOG_ARCHIVE_THROUGH_0.6.11.md).

## 0.6.13 - 2026-08-14

### Corrected
- Re-grounded the Claude content-marking news item in Anthropic’s official Claude Help Center guidance rather than using secondary reporting as the canonical source.
- Clarified that supported Claude models use embedded text watermarks and signed provenance metadata for supported files, while a detected mark is only a signal and the absence of one does not prove human authorship.

### Added
- Added concise AI Compass reference entries for **Content provenance (C2PA)** and **Open-weight model**, each with a primary canonical source and 14 August 2026 verification date.
- Added a practical verification tip: treat provenance marks as evidence, not a verdict.
- Added dedicated maintained-news validation covering unique IDs/URLs, source metadata, verification dates and thumbnail provenance; registered the dated news and reference-refresh modules in the repository validation path.

### News scan
- Reviewed current primary-source channels and found no additional post-13-August announcement that clearly met AI Compass’s significance and source-quality bar. No filler news item was added.

### Release
- Original guide count remains 29; no guide was removed or replaced.
- Application build marker advances to `2026-08-14.1` and package version to `0.6.13`.

## 0.6.12 - 2026-08-13

### Added
- New flagship original guide: **Create professional dashboards with AI: from requirements to polished decision tools**.
- Eight original dashboard mockups covering executive/board, operations/command centre, KPI/performance, financial, project/portfolio, SLA/service, AI-agent operations and personal productivity use cases.
- Mobile dashboard composition guidance, chart-selection guidance, a bad → better → excellent visual quality ladder, KPI contracts, reusable AI design prompts and a production release checklist.
- Static local dashboard publication artwork used by the guide and its guide card; no runtime guide-image injection is introduced.
- New news synthesis covering Anthropic's announced machine-readable watermarking and provenance approach for Claude-generated content, clearly labelled as AI Compass synthesis and verified 13 August 2026.

### Changed
- Increased the original guide library from 28 to 29 guides.
- Registered the dashboard guide module and stylesheet in the production entry point and syntax validation path.
- Registered the dashboard guide in content and visual-system validation, raised the preservation floor to 29, and added rendered desktop/mobile browser checks for all eight dashboard mockups, the quality ladder and mobile composition.
- Advanced the production build marker to `2026-08-13.1`.
