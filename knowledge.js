(()=>{
'use strict';
const D=window.AI_COMPASS_DATA;
if(!D||!Array.isArray(D.articles))return;
const additions=[
  {
    "slug": "ai-for-documents-spreadsheets-meetings",
    "title": "Use AI for documents, spreadsheets and meetings without losing control",
    "excerpt": "A practical office-work system for preparing source packs, analysing data, producing drafts and turning meetings into accountable actions.",
    "type": "Workflow guide",
    "category": "workflows",
    "level": "Beginner",
    "readTime": 16,
    "date": "2026-08-06",
    "featured": true,
    "source": "AI Compass",
    "tags": [
      "office work",
      "documents",
      "spreadsheets",
      "meetings",
      "productivity",
      "verification"
    ],
    "sections": [
      {
        "title": "Start with the job, not the chatbot",
        "id": "job-first",
        "html": "<p>AI is most useful in office work when it removes a specific bottleneck: finding information, turning notes into a first draft, checking a dataset, preparing for a meeting or converting decisions into actions. Do not begin by asking a general assistant to “improve productivity.” Pick one repeated task and define the result that a colleague could review.</p><div class=\"callout\"><strong>Good pilot:</strong> “Create a weekly project brief from these three approved sources, with every risk linked to evidence and every action assigned to an owner.”</div>"
      },
      {
        "title": "Build a source pack",
        "id": "source-pack",
        "html": "<p>Provide the smallest complete set of trustworthy material. Name which file is authoritative, which dates matter and what the model must treat as unknown. This improves quality and reduces the chance that an old email, partial spreadsheet or unrelated document drives the answer.</p><ol class=\"steps\"><li>Remove secrets and unrelated personal data.</li><li>Use clear file names and stable column headings.</li><li>State the reporting period and required output format.</li><li>Ask the model to identify missing or contradictory evidence before drafting.</li></ol>"
      },
      {
        "title": "Documents: draft from evidence",
        "id": "documents",
        "html": "<p>Ask for an outline first, then a draft, then a review against explicit criteria. Require citations or source labels for material claims. Keep policy, legal, financial and customer-facing approval with a responsible person.</p><pre><code>Using only the attached approved sources:\n1. Create a five-section outline.\n2. Map each section to its supporting source.\n3. Draft the document.\n4. Flag unsupported statements and decisions still required.\n5. Return a final review checklist.</code></pre>"
      },
      {
        "title": "Spreadsheets: preserve control totals",
        "id": "spreadsheets",
        "html": "<p>Before analysis, record row count, unique identifiers, blank required fields and important totals. Ask the model to explain transformations and provide the calculation logic. After the change, compare the same control totals so missing rows, duplicated records or changed units cannot hide behind a polished chart.</p><div class=\"checklist\"><strong>Minimum spreadsheet checks:</strong><ul><li>One record per row and clear column names.</li><li>Dates, currencies and units normalised.</li><li>Duplicates and missing values reported.</li><li>Calculations reproducible outside the chat.</li><li>Outliers reviewed rather than silently removed.</li></ul></div>"
      },
      {
        "title": "Meetings: produce decisions and owned actions",
        "id": "meetings",
        "html": "<p>A meeting summary is useful only when it distinguishes discussion from decisions. Ask for an action register containing the owner, deadline, dependency and source evidence. Send the draft to attendees for correction rather than treating automated notes as the official record.</p><div class=\"table-wrap\"><table><thead><tr><th>Output</th><th>Required fields</th></tr></thead><tbody><tr><td>Decision</td><td>Decision, decision-maker, date, evidence</td></tr><tr><td>Action</td><td>Action, owner, due date, dependency</td></tr><tr><td>Open question</td><td>Question, person responsible, next checkpoint</td></tr></tbody></table></div>"
      },
      {
        "title": "Run a 30-minute pilot",
        "id": "pilot",
        "html": "<ol class=\"steps\"><li>Select one task performed at least weekly.</li><li>Measure the current completion and correction time.</li><li>Run the AI-assisted version on three real examples.</li><li>Count errors, unsupported claims and manual corrections.</li><li>Keep the workflow only when the total review burden is lower and the result is at least as reliable.</li></ol><p>The objective is not maximum automation. It is a controlled process that produces a better outcome with less total effort.</p>"
      }
    ],
    "sources": [
      {
        "title": "OpenAI — Data analysis with ChatGPT",
        "url": "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        "publisher": "OpenAI"
      },
      {
        "title": "Microsoft — Write a great prompt in Microsoft 365 Copilot",
        "url": "https://support.microsoft.com/en-US/Microsoft-365-Copilot/write-a-great-prompt-in-microsoft-365-copilot",
        "publisher": "Microsoft"
      },
      {
        "title": "Google — Get started with Google Workspace with Gemini",
        "url": "https://support.google.com/drive/answer/13952129?hl=en",
        "publisher": "Google"
      }
    ],
    "updated": "6 August 2026"
  },
  {
    "slug": "evaluate-ai-output-scorecard",
    "title": "Evaluate AI output with a scorecard instead of “looks good”",
    "excerpt": "A repeatable six-part review method for correctness, evidence, completeness, usefulness, safety and reproducibility.",
    "type": "Evaluation guide",
    "category": "research",
    "level": "Beginner",
    "readTime": 15,
    "date": "2026-08-06",
    "featured": true,
    "source": "AI Compass",
    "tags": [
      "evaluation",
      "quality",
      "verification",
      "scorecard",
      "regression testing"
    ],
    "sections": [
      {
        "title": "Fluency is not a quality measure",
        "id": "fluency",
        "html": "<p>AI output can sound confident while being incomplete, unsupported or wrong. Replace the general question “Is this good?” with a small set of criteria tied to the real task. The same scorecard can be used for a single important answer, a repeated prompt or an agent workflow.</p>"
      },
      {
        "title": "Use the six-part scorecard",
        "id": "scorecard",
        "html": "<div class=\"table-wrap\"><table><thead><tr><th>Dimension</th><th>Question</th><th>Fail condition</th></tr></thead><tbody><tr><td>Correctness</td><td>Are claims and calculations accurate?</td><td>A material fact or number is wrong.</td></tr><tr><td>Evidence</td><td>Can important claims be traced to reliable sources?</td><td>A key claim has no support or cites the wrong source.</td></tr><tr><td>Completeness</td><td>Did it satisfy every required part?</td><td>A required section, field or edge case is missing.</td></tr><tr><td>Usefulness</td><td>Can the intended user take the next action?</td><td>The answer is generic, ambiguous or not in the requested format.</td></tr><tr><td>Safety</td><td>Did it respect privacy, permissions and escalation rules?</td><td>It exposes restricted data or takes unauthorised action.</td></tr><tr><td>Reproducibility</td><td>Can another reviewer understand how the result was produced?</td><td>Sources, inputs, model, prompt version or calculations are missing.</td></tr></tbody></table></div><p>Score each dimension from 0 to 2. Define which dimensions are mandatory passes rather than allowing a high average to hide a critical failure.</p>"
      },
      {
        "title": "Build tests from real work",
        "id": "test-cases",
        "html": "<p>Collect representative examples from the actual workflow: normal cases, difficult cases and cases where the system must refuse or escalate. For non-deterministic systems, run important tests more than once. Keep a baseline so a new model or prompt can be compared with the current method.</p><div class=\"callout\"><strong>Capability test:</strong> Can it do a difficult task at all?<br><strong>Regression test:</strong> Does it still handle tasks it previously passed?</div>"
      },
      {
        "title": "Grade the outcome, not only the explanation",
        "id": "outcome",
        "html": "<p>For agents and automations, the final message is not enough. Verify the state of the file, database, calendar, deployment or other system after the run. A tool can claim that an action succeeded when the underlying outcome is incomplete or wrong.</p>"
      },
      {
        "title": "Combine automated and human review",
        "id": "review-layers",
        "html": "<p>Use code checks for facts that can be tested exactly, model-based graders for carefully defined qualitative criteria and humans for judgement, calibration and high-impact cases. Read failed transcripts regularly so you can tell whether the system failed or the test itself was unfair.</p>"
      },
      {
        "title": "A practical release rule",
        "id": "release-rule",
        "html": "<div class=\"checklist\"><strong>Do not release when:</strong><ul><li>A mandatory safety or correctness check fails.</li><li>The new version performs worse than the baseline on common tasks.</li><li>Failures cannot be explained from the trace or source data.</li><li>The reviewer cannot reproduce the result.</li><li>There is no owner for monitoring and rollback.</li></ul></div>"
      }
    ],
    "sources": [
      {
        "title": "NIST — AI Risk Management Framework: Generative AI Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "publisher": "NIST"
      },
      {
        "title": "Anthropic — Demystifying evals for AI agents",
        "url": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
        "publisher": "Anthropic"
      },
      {
        "title": "Google PAIR — People + AI Guidebook",
        "url": "https://pair.withgoogle.com/guidebook-v2/",
        "publisher": "Google"
      }
    ],
    "updated": "6 August 2026"
  },
  {
    "slug": "automation-workflow-or-agent",
    "title": "Automation, workflow or agent? Choose the simplest system that works",
    "excerpt": "A decision framework for choosing between fixed rules, AI-assisted workflows and autonomous agents—with approval and rollback boundaries.",
    "type": "Architecture guide",
    "category": "agents",
    "level": "Intermediate",
    "readTime": 17,
    "date": "2026-08-06",
    "featured": true,
    "source": "AI Compass",
    "tags": [
      "automation",
      "agents",
      "workflows",
      "architecture",
      "approvals"
    ],
    "sections": [
      {
        "title": "Three different levels of delegation",
        "id": "levels",
        "html": "<div class=\"table-wrap\"><table><thead><tr><th>Pattern</th><th>Best when</th><th>Main risk</th></tr></thead><tbody><tr><td>Rule-based automation</td><td>The steps and conditions are known in advance.</td><td>Rigid logic breaks on unexpected inputs.</td></tr><tr><td>AI-assisted workflow</td><td>The path is known but one or more steps require interpretation or generation.</td><td>Poor output can enter a reliable process.</td></tr><tr><td>Agent</td><td>The system must choose steps, use tools and adapt to feedback.</td><td>Errors can compound across actions and changing state.</td></tr></tbody></table></div><p>Start at the top of the table. Move down only when the simpler pattern cannot handle the uncertainty of the task.</p>"
      },
      {
        "title": "Use the decision ladder",
        "id": "decision-ladder",
        "html": "<ol class=\"steps\"><li>Can normal software rules solve the task? Use automation.</li><li>Is the sequence fixed but one step needs judgement? Use an AI-assisted workflow.</li><li>Does the system need to choose tools or plan dynamically? Consider an agent.</li><li>Can a person review before important actions? Add an approval gate.</li><li>Can every write action be observed and reversed? If not, reduce authority.</li></ol>"
      },
      {
        "title": "Separate the brain from the hands",
        "id": "brain-hands",
        "html": "<p>Give the reasoning component access to information and draft actions, but place real-world changes behind narrow tools with validation. A calendar tool should expose “create one event with these fields,” not unrestricted account access. A publishing tool should validate title, source and approval status before it can make a page public.</p>"
      },
      {
        "title": "Define authority and stop conditions",
        "id": "authority",
        "html": "<div class=\"checklist\"><strong>Write down:</strong><ul><li>What the system may read.</li><li>What it may draft.</li><li>What it may change without approval.</li><li>Which conditions require a person.</li><li>How many retries and how much cost are allowed.</li><li>What evidence proves success.</li><li>How to stop and roll back.</li></ul></div>"
      },
      {
        "title": "Pilot with observation before autonomy",
        "id": "pilot",
        "html": "<p>Run the system in shadow mode first: it recommends actions while a human performs or approves them. Compare recommendations with actual decisions, collect failure cases and build evaluations. Increase autonomy one reversible action at a time rather than turning on an entire agent loop.</p>"
      },
      {
        "title": "When not to use an agent",
        "id": "not-agent",
        "html": "<p>Avoid an agent when rules are clear, the task is rare, failures are hard to detect, actions are irreversible, the available data is unreliable or the system cannot be monitored. A checklist and a human may be both cheaper and safer.</p>"
      }
    ],
    "sources": [
      {
        "title": "Anthropic — Building effective agents",
        "url": "https://www.anthropic.com/engineering/building-effective-agents",
        "publisher": "Anthropic"
      },
      {
        "title": "OpenAI — A practical guide to building AI agents",
        "url": "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
        "publisher": "OpenAI"
      },
      {
        "title": "Microsoft — Apply responsible AI",
        "url": "https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai",
        "publisher": "Microsoft"
      }
    ],
    "updated": "6 August 2026"
  },
  {
    "slug": "ai-governance-starter-kit",
    "title": "A lightweight AI governance starter kit for small teams",
    "excerpt": "Create an AI inventory, data rules, risk tiers, release gates and incident process without building a bureaucracy first.",
    "type": "Governance guide",
    "category": "research",
    "level": "Intermediate",
    "readTime": 19,
    "date": "2026-08-06",
    "featured": false,
    "source": "AI Compass",
    "tags": [
      "governance",
      "risk",
      "policy",
      "security",
      "teams"
    ],
    "sections": [
      {
        "title": "Govern the use case, not the brand name",
        "id": "use-case",
        "html": "<p>The same model can be low risk when drafting an internal outline and high risk when making decisions about people, money, access or safety. Record what the system does, whose data it uses, who is affected and which actions it can take.</p>"
      },
      {
        "title": "Maintain a simple AI inventory",
        "id": "inventory",
        "html": "<div class=\"table-wrap\"><table><thead><tr><th>Field</th><th>Example</th></tr></thead><tbody><tr><td>Purpose</td><td>Draft weekly project status reports</td></tr><tr><td>Owner</td><td>Operations manager</td></tr><tr><td>Data</td><td>Approved project documents; no personal data</td></tr><tr><td>Actions</td><td>Draft only; cannot publish</td></tr><tr><td>Review</td><td>Project lead approves every report</td></tr><tr><td>Evidence</td><td>Source links and change log retained</td></tr></tbody></table></div>"
      },
      {
        "title": "Use three practical risk tiers",
        "id": "tiers",
        "html": "<ul><li><strong>Low:</strong> brainstorming, formatting and private drafts. Basic privacy guidance and user review.</li><li><strong>Medium:</strong> work grounded in internal data, repeated automations or content used by a team. Named owner, evaluation set, logs and approval rules.</li><li><strong>High:</strong> decisions or actions affecting people, money, access, legal obligations, critical infrastructure or safety. Specialist review, strong controls and explicit executive accountability.</li></ul>"
      },
      {
        "title": "Set minimum release gates",
        "id": "gates",
        "html": "<div class=\"checklist\"><strong>Before launch:</strong><ul><li>Purpose, owner, users and prohibited uses are documented.</li><li>Data sources and retention are approved.</li><li>Representative evaluations pass.</li><li>Permissions follow least privilege.</li><li>High-impact actions require approval.</li><li>Users can report problems.</li><li>Monitoring, rollback and incident ownership exist.</li></ul></div>"
      },
      {
        "title": "Prepare for prompt injection and excessive agency",
        "id": "security",
        "html": "<p>Connected AI systems can encounter malicious instructions inside documents, websites and tool output. Treat external content as untrusted data. Validate tool arguments, restrict permissions, isolate secrets and prevent generated text from directly becoming code, commands or published content without checks.</p>"
      },
      {
        "title": "Review continuously",
        "id": "continuous",
        "html": "<p>Models, tools, prompts, data and laws change. Review the inventory on a schedule and after material changes. Use incidents, user feedback and failed evaluations to update controls rather than treating governance as a launch-time form.</p>"
      }
    ],
    "sources": [
      {
        "title": "NIST — AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework",
        "publisher": "NIST"
      },
      {
        "title": "NIST — Generative AI Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "publisher": "NIST"
      },
      {
        "title": "OWASP — Top 10 for LLM Applications 2025",
        "url": "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/",
        "publisher": "OWASP"
      },
      {
        "title": "Microsoft — Apply responsible AI",
        "url": "https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai",
        "publisher": "Microsoft"
      }
    ],
    "updated": "6 August 2026"
  },
  {
    "slug": "multimodal-ai-practical-guide",
    "title": "A practical guide to multimodal AI: text, images, audio and video",
    "excerpt": "Understand what multimodal systems can help with, where they fail and how to verify media-based work responsibly.",
    "type": "Concept guide",
    "category": "models",
    "level": "Beginner",
    "readTime": 14,
    "date": "2026-08-06",
    "featured": false,
    "source": "AI Compass",
    "tags": [
      "multimodal",
      "images",
      "audio",
      "video",
      "accessibility"
    ],
    "sections": [
      {
        "title": "What multimodal means",
        "id": "meaning",
        "html": "<p>A multimodal system can accept or produce more than one type of information, such as text, images, audio or video. This creates useful workflows—describing a photo, extracting a table, reviewing a recording or creating a visual draft—but each modality has different failure modes.</p>"
      },
      {
        "title": "Separate observation from interpretation",
        "id": "observation",
        "html": "<p>Ask the system to list directly observable details before it interprets intent, identity, cause or emotion. For charts and documents, request the extracted values or quoted evidence before accepting the summary.</p><pre><code>First describe only what is directly visible or audible.\nThen list interpretations separately.\nFor each interpretation, state the evidence and uncertainty.</code></pre>"
      },
      {
        "title": "Improve the input",
        "id": "input",
        "html": "<ul><li>Use clear, high-resolution images and include the full context.</li><li>For audio, reduce noise and identify speakers when possible.</li><li>For video, specify the time range and the question being investigated.</li><li>For documents, prefer original digital files over screenshots or poor scans.</li><li>Provide units, legends and labels for diagrams and charts.</li></ul>"
      },
      {
        "title": "Protect rights and privacy",
        "id": "rights",
        "html": "<p>Do not upload sensitive media without authority. Consider who appears in the content, whether consent exists, where files are stored and whether generated material could mislead people about what is real. Keep provenance for important edited or synthetic media.</p>"
      },
      {
        "title": "Verify by modality",
        "id": "verify",
        "html": "<div class=\"table-wrap\"><table><thead><tr><th>Media</th><th>Verification</th></tr></thead><tbody><tr><td>Image</td><td>Inspect the original at full resolution and check metadata or alternate evidence.</td></tr><tr><td>Chart</td><td>Recalculate from the source data and verify axes, units and omitted categories.</td></tr><tr><td>Audio</td><td>Listen to the relevant segment and confirm speaker attribution.</td></tr><tr><td>Video</td><td>Review the surrounding footage, not only selected frames.</td></tr><tr><td>Generated media</td><td>Check anatomy, text, continuity, factual context and usage rights.</td></tr></tbody></table></div>"
      },
      {
        "title": "Make outputs accessible",
        "id": "accessible",
        "html": "<p>Add useful alternative text, captions and transcripts. Do not rely on colour alone to communicate meaning. When AI generates descriptions, review them against the original media and the needs of the intended audience.</p>"
      }
    ],
    "sources": [
      {
        "title": "NIST — Generative AI Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "publisher": "NIST"
      },
      {
        "title": "Google PAIR — People + AI Guidebook",
        "url": "https://pair.withgoogle.com/guidebook-v2/",
        "publisher": "Google"
      },
      {
        "title": "OpenAI — File Uploads FAQ",
        "url": "https://help.openai.com/en/articles/8555545-file-uploads-faq",
        "publisher": "OpenAI"
      }
    ],
    "updated": "6 August 2026"
  }
];
const existing=new Set(D.articles.map(item=>item.slug));
D.articles.unshift(...additions.filter(item=>!existing.has(item.slug)));

const sourcePatches={
  'prompting-for-reliable-results':[
    {
      title:'OpenAI — Prompt engineering best practices for ChatGPT',
      url:'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt',
      publisher:'OpenAI'
    },
    {
      title:'Microsoft — Write a great prompt in Microsoft 365 Copilot',
      url:'https://support.microsoft.com/en-us/topic/write-a-great-prompt-in-microsoft-365-copilot-7b5436d8-4c87-4ee0-bd21-0cf03f6ae9e3',
      publisher:'Microsoft'
    }
  ],
  'build-first-rag-knowledge-base':[
    {
      title:'Anthropic — Contextual Retrieval',
      url:'https://www.anthropic.com/engineering/contextual-retrieval',
      publisher:'Anthropic'
    },
    {
      title:'OpenAI — Knowledge Retrieval blueprint',
      url:'https://openai.com/solutions/blueprints/knowledge-retrieval/',
      publisher:'OpenAI'
    },
    {
      title:'Google Cloud — What is retrieval-augmented generation?',
      url:'https://cloud.google.com/use-cases/retrieval-augmented-generation',
      publisher:'Google Cloud'
    }
  ]
};
for(const [slug,sources] of Object.entries(sourcePatches)){
  const article=D.articles.find(item=>item.slug===slug);
  if(article&&(!Array.isArray(article.sources)||article.sources.length===0)){
    article.sources=sources;
    article.updated='6 August 2026';
  }
}
})();
