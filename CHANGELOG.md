# Changelog

Historical release entries through **0.7.0** are preserved in [`docs/CHANGELOG_ARCHIVE_THROUGH_0.7.0.md`](docs/CHANGELOG_ARCHIVE_THROUGH_0.7.0.md). The earlier archive through 0.6.11 remains preserved inside that history.

## Daily intelligence - 2026-08-27

### Published
- **Deep Analysis:** *OpenAI–Hugging Face incident: what the agent escape actually proves*, grounded in OpenAI's 38-page technical incident report and the independent METR/Redwood investigation. The analysis distinguishes agent capability and security evidence from anthropomorphic interpretations and translates the incident into concrete controls for agent builders.
- **Daily Brief:** GitHub Copilot Code Review enters public preview for Azure Repos, including organization/project/repository controls, custom instructions, automatic branch-policy reviews, Managed DevOps Pool support and project-level cost attribution.
- **Daily Brief:** Perplexity Portable Computer launches for local-first agent workflows on NVIDIA DGX Spark, with local orchestration and optional authorized cloud escalation.

### Editorial
- The daily scan ledger records all three items with explicit scores across impact, reader value, novelty, evidence quality and durability.
- OpenAI's incident is classified **Must know**; Portable Computer **Must know**; Azure Repos Copilot Code Review **Worth knowing**.
- Other scanned developments were duplicates, outside the active window or below the publication threshold.
- Build marker advances to **2026-08-27.1** without changing the 0.7.1 product release number.

## 0.7.1 - 2026-08-26

### Added
- New **Today in AI** homepage layer that surfaces the latest reader-relevant developments without turning the homepage into a news firehose.
- Two explicit editorial formats: **Daily Brief** for concise source-checked developments and **Deep Analysis** for original AI Compass reporting that needs durable explanation, claim checking or practical comparison.
- Reader-facing triage labels: **Must know**, **Worth knowing** and **Watch**.
- Three new primary-source Daily Briefs covering **Gemini 3.5 Transcribe**, the **OpenAI Admin plugin for ChatGPT Work and Codex**, and OpenAI's first published **Jalapeño inference-chip results**.
- `content/editorial/news-operations.json` with the maintained source registry, scoring dimensions, English-reader source policy and publication thresholds.
- `content/editorial/news-scan-log.json` so AI Compass records a completed editorial scan even on a valid no-publish day.
- `docs/NEWS_DAILY_PIPELINE.md` defining the daily research, scoring, writing, validation, PR, deployment and failure-handling workflow.
- `scripts/validate-news-health.js` plus a scheduled GitHub Actions health check that fails when the daily scan ledger is not current after the expected curator window.
- Maintained `news-daily.js` overlay so daily automation can update current briefs without adding an endless series of dated runtime modules.
- Daily curator automation scheduled for **07:30 Africa/Johannesburg**, with the repository health check following at 09:30 local time.

### Changed
- News editorial method advances to **1.1**, allowing useful Daily Brief coverage without lowering the threshold for Deep Analysis.
- Daily news now follows the reader-language rule established by the Xiaomi AI Cube correction: prefer a vetted English reader-facing source while retaining non-English primary evidence in Sources and verification when needed.
- The News preservation floor increases to **23** while the current runtime feed contains **24** curated items.
- News-related internal links for new briefs now resolve to real AI Compass guides rather than aspirational/nonexistent slugs.
- Structured-content validators now compare runtime release/build identity with the current manifest instead of hard-coding historical release `0.7.0`.
- Application version advances to **0.7.1** and build marker to **2026-08-26.2**.

### Validation
- Source/content validation checks Daily Brief IDs, canonical official URLs, verification dates, daily-scan health, structured runtime identity and existing guide/path/reference preservation contracts.
- The intelligence Chromium suite now renders and checks **Today in AI** on desktop/mobile in addition to News, Xiaomi Deep Analysis and the five-level learning curriculum.
- No Community/My Compass candidate code is included in this release; that work remains isolated in its separate staged release.

### Editorial note
- A daily scan is required; a daily article is not. When nothing clears the publishing threshold, the correct outcome is a logged **no-publish** scan rather than filler.
