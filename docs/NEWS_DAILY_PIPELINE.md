# AI Compass Daily Intelligence Pipeline

Status: operational policy for the daily curator run.

## Reader promise

AI Compass does not try to publish every AI announcement. It scans every day and publishes the developments that materially help readers understand, choose, build, work with or govern AI.

The visible formats are:

- **Daily Brief** — concise, source-checked context for a useful development.
- **Deep Analysis** — original AI Compass analysis where claims, trade-offs, uncertainty or practical implications need durable treatment.
- **No-publish scan** — a completed daily scan in which nothing clears the publishing threshold. The scan is still logged so freshness is observable.

## Daily curator sequence

1. Inspect `main`, the current News feed, `content/editorial/news-operations.json` and `content/editorial/news-scan-log.json`.
2. Scan the registered primary-source channels first. Use Reuters and selected technical reporting for independent context where useful.
3. Collect candidates from the previous 24–48 hours and any material item missed since the previous successful run.
4. Deduplicate by underlying development, not headline.
5. Score impact, reader value, novelty, evidence quality and durability.
6. Classify candidates as **Must know**, **Worth knowing**, **Watch** or **Skip**.
7. Research candidates that clear the threshold. Separate confirmed facts, vendor claims, independent evidence and AI Compass analysis.
8. Prefer an English reader-facing source. Preserve non-English primary evidence in Sources and verification when it is the underlying source.
9. Publish 1–3 Daily Briefs when warranted. Publish at most one new Deep Analysis in a normal daily run unless several genuinely material stories require it.
10. Update `content/editorial/news-scan-log.json` whether or not anything is published.
11. Run source/content validation and rendered desktop/mobile smoke tests.
12. Use a dedicated branch and PR. Merge only when GitHub validation and Vercel Preview are successful.
13. Verify the post-merge GitHub Actions run and Vercel deployment for the exact merged SHA.

## Editorial gates

A candidate should not publish merely because it is new. The daily curator should reject or downgrade items that are primarily:

- rumours or unverified leaks;
- minor feature churn with little durable reader value;
- unsupported benchmark claims;
- repeated coverage of a development already represented in AI Compass;
- pricing or availability claims that cannot be verified;
- commentary that adds no useful decision or learning outcome.

## Automation and failure handling

The scheduled curator run is the publishing mechanism. A separate GitHub Actions workflow runs a lightweight daily health check after the expected curator window. It fails if the scan ledger has not been updated for the current day.

Do not create filler content to make the health check green. A valid `no-publish` scan is the correct outcome when nothing clears the threshold.

If deployment, source access or authentication prevents publication, leave the content branch/PR unmerged, record the blocker and keep the scan ledger honest.

## Metrics worth tracking later

- days with completed scans;
- Daily Briefs and Deep Analyses published;
- primary-source ratio;
- average age of the latest scan;
- story-to-guide/reference internal-link coverage;
- click-through from News into learning/build content;
- returning-reader engagement with Today in AI.
