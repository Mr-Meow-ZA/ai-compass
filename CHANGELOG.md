# Changelog

Historical release entries through **0.7.0** are preserved in [`docs/CHANGELOG_ARCHIVE_THROUGH_0.7.0.md`](docs/CHANGELOG_ARCHIVE_THROUGH_0.7.0.md). The earlier archive through 0.6.11 remains preserved inside that history.

## Daily intelligence - 2026-09-04

### Published
- **Daily Brief:** NVIDIA officially confirms an agreement to acquire Hugging Face for **$12.93 billion**. The brief pairs NVIDIA's primary announcement with Reuters independent confirmation and focuses on the durable ecosystem question: whether Hugging Face remains neutral across models, frameworks, clouds, inference providers and compute platforms after the transaction closes.

### Editorial
- The NVIDIA–Hugging Face acquisition is classified **Must know** at 20/20. It moves from Watch only after NVIDIA supplied primary-source confirmation.
- OpenAI's GPT-6 Astra launch scored highly but was deduplicated against the existing Astra Critical-cyber-threshold brief rather than generating repetitive coverage of the same underlying model development.
- OpenAI Daybreak for Frontline Defenders, NVIDIA's IFA local-AI announcements and Hugging Face NeoMME were logged as Worth knowing but held below today's publication priority.
- The first rendered validation run caught a stale smoke assertion that still hard-coded Tencent Hy4 as the newest homepage brief. The test was updated to require the new NVIDIA–Hugging Face brief on both desktop and mobile while preserving the historical-feed and route checks.
- The daily scan ledger records the complete September 4 decision set and next scan date.

## Daily intelligence - 2026-09-02

### Published
- **Daily Brief:** OpenAI says Astra is the first model it has designated at the **Critical** cybersecurity capability threshold under its Preparedness Framework, activating stronger safeguards and restricted access to its most advanced cyber capabilities. OpenAI-run exploit and benchmark results are framed as vendor evidence; Reuters provides independent context on the threshold activation and release constraints.
- **Daily Brief:** Anthropic releases Claude Fable 5.1 for general use and Mythos 5.1 through trusted-access programs. The brief focuses on the durable split between capability, safeguard configuration and access tier, while treating benchmark and cost-saving claims as vendor evidence.

### Editorial
- Astra is classified **Must know** at 20/20 because a previously theoretical frontier-safety threshold has now been activated in practice.
- Claude Fable/Mythos 5.1 is classified **Must know** at 20/20 because the launch combines a new frontier model with materially different safeguard/access configurations and enterprise privacy controls.
- Anthropic Enterprise Frontier Safeguards scored **Worth knowing** but is folded into the model brief to avoid duplicate coverage of the same launch cluster.
- Hugging Face WebGPU kernels, OpenAI healthcare/EHR connectors and NVIDIA/CrowdStrike agentic-security work were logged but held below today's publication priority.
- The reported NVIDIA acquisition of Hugging Face remains **Watch** because no matching NVIDIA or Hugging Face primary announcement was established.
- The daily scan ledger records the complete September 2 decision set and next scan date.

## Daily intelligence - 2026-09-01

### Published
- **Daily Brief:** Anthropic resumes high-risk evaluations with new containment, monitoring and external-evaluator controls after recent cyber incidents. The brief separates confirmed operational hardening from Anthropic's preliminary alignment interpretation.
- **Daily Brief:** Google documents Antigravity Teamwork as a long-horizon multi-agent orchestration framework spanning mathematical research, systems engineering and upstream open-source work. Vendor benchmark claims remain labelled as such while public papers and code artifacts are retained as verification signals.

### Editorial
- Anthropic's post-incident hardening is classified **Must know** with a 20/20 editorial score; Google Antigravity Teamwork is classified **Must know** at 18/20.
- The reported NVIDIA acquisition of Hugging Face remains **Watch** because no matching NVIDIA or Hugging Face primary announcement was established.
- Reuters reporting on a large Anthropic-Lambda cloud agreement was not published without named-company confirmation.
- NIST agent-identity guidance and a new harness-evolution preprint were logged but held below today's publication priority.
- The daily scan ledger records the complete September 1 decision set and next scan date.

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