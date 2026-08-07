(()=>{
'use strict';
const D=window.AI_COMPASS_DATA;
if(!D||!Array.isArray(D.articles))return;
const additions=[
  {
    "slug":"reusable-prompt-template-library",
    "title":"A reusable prompt template library for real work",
    "excerpt":"Eight copyable prompt patterns for research, drafting, spreadsheets, meetings, comparisons, troubleshooting, code changes and governed agent work—plus a simple versioning method.",
    "type":"Template library",
    "category":"workflows",
    "level":"Beginner",
    "readTime":18,
    "date":"2026-08-07",
    "featured":true,
    "source":"AI Compass",
    "tags":["prompt templates","workflows","research","documents","data","meetings","coding","agents","versioning"],
    "sections":[
      {
        "title":"Use a template when the job repeats",
        "id":"why-templates",
        "html":"<p>A good prompt is not a magic phrase. It is a compact specification of the job: the goal, the relevant context, constraints, output shape and success criteria. Current guidance from OpenAI, Anthropic and Google consistently emphasises clear instructions, enough context, iterative refinement and explicit structure. A reusable template turns those principles into a repeatable working method instead of starting every chat from scratch.</p><div class=\"callout\"><strong>Rule:</strong> save a prompt as a template only after it has worked on several representative examples. A template is a maintained workflow artefact, not a one-off clever instruction.</div>"
      },
      {
        "title":"The five-block structure",
        "id":"five-blocks",
        "html":"<p>Most useful work prompts can be built from five blocks. Keep the labels visible when reliability matters.</p><div class=\"table-wrap\"><table><thead><tr><th>Block</th><th>What to include</th></tr></thead><tbody><tr><td>Goal</td><td>The decision, deliverable or outcome you need.</td></tr><tr><td>Context</td><td>Only the facts, files and background required for this task.</td></tr><tr><td>Constraints</td><td>Boundaries, sources, privacy rules, exclusions and approval limits.</td></tr><tr><td>Output</td><td>The exact format: table, checklist, draft, JSON, comparison or action register.</td></tr><tr><td>Success test</td><td>What must be true before the result counts as complete.</td></tr></tbody></table></div><pre><code># Goal\n[What outcome do I need?]\n\n# Context\n[Relevant facts, files and definitions]\n\n# Constraints\n[What must or must not happen]\n\n# Output\n[Exact structure and level of detail]\n\n# Success test\n[Checks the answer must pass]</code></pre>"
      },
      {
        "title":"Template 1: source-first research brief",
        "id":"research",
        "html":"<pre><code># Goal\nAnswer: [research question].\n\n# Source rules\nPrioritise primary sources: official documentation, standards, papers and maintainer-owned repositories. Use secondary reporting only when it adds independent context.\n\n# Method\n1. Find the strongest current sources first.\n2. Record each source date and what it directly supports.\n3. Separate facts, reasonable inferences and unknowns.\n4. Identify disagreements or stale evidence.\n\n# Output\nReturn: short answer, evidence table, unresolved questions and recommended next step.\n\n# Success test\nEvery material factual claim is traceable to a source and time-sensitive claims are dated.</code></pre><p>Use this for product research, technical investigations, policy questions and market scans. Avoid asking for a long narrative before the evidence is visible.</p>"
      },
      {
        "title":"Template 2: evidence-bound document draft",
        "id":"document",
        "html":"<pre><code># Goal\nDraft [document type] for [audience].\n\n# Approved sources\nUse only the attached or linked sources I provide. Treat anything else as unknown.\n\n# Requirements\n- Start with an outline.\n- Map important claims to a source.\n- Flag missing evidence instead of inventing it.\n- Keep decisions that require human approval clearly marked.\n\n# Output\nReturn the outline, draft and a final review checklist.\n\n# Success test\nNo unsupported factual claims, no missing required section and no unapproved decision presented as final.</code></pre>"
      },
      {
        "title":"Template 3: spreadsheet audit before analysis",
        "id":"spreadsheet",
        "html":"<pre><code># Goal\nAnalyse this dataset for [question].\n\n# Before analysis\nReport row count, unique ID count, required-field blanks, duplicate IDs, date range, units and important control totals.\n\n# Analysis rules\nExplain transformations and calculations. Do not silently remove outliers or missing values.\n\n# Output\nReturn: data-quality findings, analysis, calculation logic, caveats and recommended checks.\n\n# Success test\nThe final row count and control totals reconcile with the stated transformations.</code></pre><p>This pattern is intentionally conservative. A polished chart is not evidence that the underlying data survived the transformation correctly.</p>"
      },
      {
        "title":"Template 4: meeting decisions and actions",
        "id":"meeting",
        "html":"<pre><code># Goal\nTurn these notes or transcript into an accountable meeting record.\n\n# Distinguish\nSeparate discussion, decisions, actions and open questions. Do not infer a decision when none was explicitly made.\n\n# Output\nCreate four sections:\n1. Decisions — decision, decision-maker, date, supporting evidence.\n2. Actions — action, owner, due date, dependency.\n3. Open questions — question, responsible person, next checkpoint.\n4. Corrections needed — ambiguous or conflicting statements.\n\n# Success test\nEvery action has an owner or is explicitly marked unassigned.</code></pre>"
      },
      {
        "title":"Template 5: compare options without fake rankings",
        "id":"comparison",
        "html":"<pre><code># Goal\nCompare [options] for [specific user or use case].\n\n# Criteria\nUse these decision criteria: [criteria]. Weight them only if I provide weights.\n\n# Evidence rules\nVerify current specifications, availability and pricing from primary sources where possible. Label estimates and unknowns.\n\n# Output\nReturn a comparison table, trade-offs, best fit by scenario and the information that could change the recommendation.\n\n# Success test\nDo not declare one universal winner unless the evidence and criteria genuinely support it.</code></pre>"
      },
      {
        "title":"Template 6: troubleshoot by testing hypotheses",
        "id":"troubleshooting",
        "html":"<pre><code># Goal\nDiagnose [problem].\n\n# Known state\nExpected behaviour: [expected].\nObserved behaviour: [observed].\nRecent changes: [changes].\nEvidence available: [logs, screenshots, metrics].\n\n# Method\nRank plausible causes by likelihood and impact. Test the cheapest discriminating hypothesis first. After each test, update the diagnosis instead of repeating the same fix.\n\n# Output\nReturn hypothesis, evidence for/against, test, result and next action.\n\n# Stop condition\nStop before destructive changes, credential rotation, data deletion or production writes unless explicitly approved.</code></pre>"
      },
      {
        "title":"Template 7: review a code change as evidence",
        "id":"code",
        "html":"<pre><code># Goal\nImplement or review [change].\n\n# Boundaries\nPreserve existing behaviour outside the requested scope. Do not change secrets, infrastructure or public APIs unless required and approved.\n\n# Method\n1. Inspect the relevant files and tests.\n2. Make the smallest coherent change.\n3. Show the diff or changed files.\n4. Run the narrowest relevant checks, then broader checks if needed.\n5. Identify regressions and rollback path.\n\n# Output\nReturn changed behaviour, evidence from tests, unresolved risks and deployment recommendation.\n\n# Success test\nTests pass and the claimed behaviour is verified from the resulting state, not only from the model's explanation.</code></pre>"
      },
      {
        "title":"Template 8: governed agent work packet",
        "id":"agent",
        "html":"<pre><code># Objective\n[Outcome the agent should achieve.]\n\n# Allowed reads\n[Systems, folders or sources it may inspect.]\n\n# Allowed writes\n[Reversible changes it may make without approval.]\n\n# Approval required\nStop before sending, publishing, deleting, spending money, changing access, modifying production infrastructure or performing any irreversible action.\n\n# Limits\nMaximum retries: [n]. Maximum cost/time budget: [limit].\n\n# Evidence of success\n[Observable state that proves the job is complete.]\n\n# Failure behaviour\nIf blocked, preserve state, report the blocker and the safest next action. Do not improvise around permissions.</code></pre><p>Use an agent only when the system genuinely needs to choose steps or tools dynamically. Fixed processes are usually better implemented as normal automation or an AI-assisted workflow.</p>"
      },
      {
        "title":"Version templates like lightweight software",
        "id":"versioning",
        "html":"<p>When a prompt drives repeated or consequential work, give it a stable name and version. Record why it changed and which examples were used to test it. This makes regressions visible and prevents an effective prompt from slowly accumulating contradictory instructions.</p><div class=\"checklist\"><strong>Minimum template record:</strong><ul><li>Name and version, for example <code>research-brief v1.2</code>.</li><li>Owner and last reviewed date.</li><li>Intended use case and known exclusions.</li><li>Representative test cases.</li><li>Change note explaining what improved or failed.</li><li>Required human approval points.</li></ul></div><div class=\"callout\"><strong>Do not overfit:</strong> model behaviour changes. Re-test important templates when you switch models, providers or tool permissions rather than assuming an old prompt remains optimal.</div>"
      },
      {
        "title":"How to improve a template",
        "id":"improve",
        "html":"<ol class=\"steps\"><li>Define what success means before rewriting the prompt.</li><li>Collect a small set of normal, difficult and failure examples.</li><li>Change one meaningful instruction at a time.</li><li>Compare the new version with the current baseline.</li><li>Keep the change only if it improves the actual task, not merely the style of the answer.</li></ol><p>Anthropic's current prompt-engineering guidance explicitly recommends defining success criteria and empirical tests before tuning prompts. Google's guidance likewise treats prompt design as iterative rather than a one-time recipe. That is the right mindset for every template in this library.</p>"
      }
    ],
    "sources":[
      {"title":"OpenAI — How do I create a good prompt for an AI model?","url":"https://help.openai.com/en/articles/4936848-how-do-i-create-a-good-prompt-for-an-ai-model-like-gpt4","publisher":"OpenAI"},
      {"title":"Anthropic — Prompt engineering overview","url":"https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview","publisher":"Anthropic"},
      {"title":"Google — Prompt design strategies","url":"https://ai.google.dev/gemini-api/docs/prompting-strategies","publisher":"Google"}
    ],
    "updated":"7 August 2026"
  }
];
const existing=new Set(D.articles.map(article=>article.slug));
for(const article of additions)if(!existing.has(article.slug))D.articles.push(article);
})();
