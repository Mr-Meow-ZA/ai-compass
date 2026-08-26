# Changelog

Historical release entries through **0.7.0** are preserved in [`docs/CHANGELOG_ARCHIVE_THROUGH_0.7.0.md`](docs/CHANGELOG_ARCHIVE_THROUGH_0.7.0.md). The earlier archive through 0.6.11 remains preserved inside that history.

## 0.7.2 - 2026-08-27

### Added
- New **Start** hub that routes readers by situation rather than by AI Compass taxonomy: new to AI, AI at work, power user, builder, AI leader/governance, private/local AI and stay-current readers.
- New **Build** hub connecting workflow automation, agent orchestration, RAG, evaluation, security and enterprise architecture into one practical builder entry point.
- New **Choose** hub connecting Tools, Models, Courses, subscriptions, local-AI decisions and curated resources around the decision a reader is trying to make.
- New homepage shortcut: **“Not sure where to begin? Tell us what kind of reader you are.”**
- Dedicated desktop/mobile rendered validation for Start, Build and Choose.

### Changed
- Primary navigation is simplified from nine equal-weight content categories to **Home · Start · Learn · Build · Choose · News · Community**.
- Existing Guides, Practical, Resources, Tools, Models and Courses remain fully available; they are grouped under clearer Build/Choose decision hubs rather than removed.
- The footer is reorganised around **Start & learn**, **Build & choose** and **Stay informed**.
- Active navigation state maps Guides/Practical/Resources to Build and Tools/Models/Courses to Choose so the information hierarchy stays visible while readers move through deeper pages.
- Application version advances to **0.7.2** and build marker to **2026-08-27.1**.

### Reader principle
- AI Compass should not require readers to learn the site's information architecture before they can learn AI. The top-level menu answers **where do I start, what do I learn, what do I build, what do I choose, and what changed?**

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
