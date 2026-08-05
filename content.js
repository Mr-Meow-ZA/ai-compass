window.AI_COMPASS_LIBRARY = {
  "learningPaths": [
    {
      "id": "start-here",
      "title": "Start using AI with confidence",
      "audience": "Beginner",
      "duration": "About 90 minutes",
      "description": "Choose a service, write better instructions, protect sensitive information and verify what the model tells you.",
      "accent": "blue",
      "steps": [
        "choose-your-first-ai-subscription",
        "prompting-for-reliable-results",
        "ai-privacy-before-uploading",
        "research-with-ai-and-verify-sources"
      ]
    },
    {
      "id": "work-smarter",
      "title": "Build repeatable AI workflows",
      "audience": "Everyday user",
      "duration": "About 2 hours",
      "description": "Move beyond isolated chats by connecting your files, tools and knowledge into reliable systems.",
      "accent": "green",
      "steps": [
        "obsidian-ai-second-brain",
        "connect-ai-to-github",
        "create-reusable-ai-skills",
        "build-first-rag-knowledge-base"
      ]
    },
    {
      "id": "build-agents",
      "title": "Build agents without losing control",
      "audience": "Builder",
      "duration": "About 2.5 hours",
      "description": "Understand MCP, orchestration and guardrails before allowing an AI system to take actions.",
      "accent": "violet",
      "steps": [
        "mcp-explained-and-set-up",
        "agent-orchestration-without-chaos",
        "production-agent-guardrails",
        "automate-ai-content-website"
      ]
    },
    {
      "id": "office-productivity",
      "title": "Use AI across documents, data and meetings",
      "audience": "Professional",
      "duration": "About 2 hours",
      "description": "Turn common office work into controlled, reviewable AI workflows without losing source context or accountability.",
      "accent": "amber",
      "steps": [
        "ai-for-documents-spreadsheets-meetings",
        "prompting-for-reliable-results",
        "ai-privacy-before-uploading",
        "evaluate-ai-output-scorecard"
      ]
    },
    {
      "id": "responsible-adoption",
      "title": "Adopt AI responsibly as a team",
      "audience": "Team lead",
      "duration": "About 2.5 hours",
      "description": "Choose the right level of automation, establish practical governance and evaluate systems before they affect real users.",
      "accent": "red",
      "steps": [
        "automation-workflow-or-agent",
        "ai-governance-starter-kit",
        "evaluate-ai-output-scorecard",
        "production-agent-guardrails"
      ]
    }
  ],
  "tips": [
    {
      "id": "ask-for-assumptions",
      "title": "Ask the model to list its assumptions first",
      "summary": "For planning, analysis and troubleshooting, expose hidden assumptions before accepting the answer.",
      "category": "Prompting",
      "level": "Beginner",
      "example": "Before answering, list the assumptions you are making and flag any that need verification.",
      "related": "prompting-for-reliable-results"
    },
    {
      "id": "give-success-test",
      "title": "Define what “done” means",
      "summary": "A clear acceptance test produces more reliable output than adding more adjectives to a prompt.",
      "category": "Workflow",
      "level": "Beginner",
      "example": "The result is complete when every source opens, all dates are current and no table has blank required fields.",
      "related": "prompting-for-reliable-results"
    },
    {
      "id": "separate-draft-review",
      "title": "Separate generation from review",
      "summary": "Use one pass to produce the work and a second pass with explicit review criteria to find problems.",
      "category": "Quality",
      "level": "Beginner",
      "example": "Review this draft for unsupported claims, missing context, repetition and instructions that are not actionable.",
      "related": "research-with-ai-and-verify-sources"
    },
    {
      "id": "small-context-packets",
      "title": "Send focused context packets",
      "summary": "Give the model only the documents and facts needed for the current decision instead of dumping an entire archive.",
      "category": "Context",
      "level": "Intermediate",
      "example": "Use these three documents only. Treat anything not contained in them as unknown.",
      "related": "rag-vs-long-context"
    },
    {
      "id": "source-first-research",
      "title": "Request primary sources before summaries",
      "summary": "Locate official documentation, papers or repositories first; summarise only after the evidence is visible.",
      "category": "Research",
      "level": "Beginner",
      "example": "Find the primary sources, show their dates and explain what each one directly supports.",
      "related": "research-with-ai-and-verify-sources"
    },
    {
      "id": "use-diff-review",
      "title": "Review code as a diff, not a promise",
      "summary": "Require the AI to show exactly what changed, why it changed and which tests prove the change works.",
      "category": "Coding",
      "level": "Intermediate",
      "example": "Show the diff, list possible regressions and run the smallest relevant tests before proposing a merge.",
      "related": "connect-ai-to-github"
    },
    {
      "id": "redact-before-upload",
      "title": "Redact before you upload",
      "summary": "Remove secrets, identifiers and unnecessary personal information before sending files to any AI service.",
      "category": "Privacy",
      "level": "Beginner",
      "example": "Replace names, account numbers and API keys with stable placeholders before analysis.",
      "related": "ai-privacy-before-uploading"
    },
    {
      "id": "agent-stop-condition",
      "title": "Give every agent a stop condition",
      "summary": "An agent should know when to stop, ask for approval or declare that it cannot proceed safely.",
      "category": "Agents",
      "level": "Advanced",
      "example": "Stop and request approval before deleting, publishing, spending money, changing access or altering infrastructure.",
      "related": "production-agent-guardrails"
    },
    {
      "id": "separate-facts-inference",
      "title": "Ask for facts, inferences and unknowns separately",
      "summary": "A three-column answer makes unsupported conclusions easier to spot before they become decisions.",
      "category": "Research",
      "level": "Beginner",
      "example": "Return three sections: directly supported facts, reasonable inferences, and information that is still unknown.",
      "related": "evaluate-ai-output-scorecard"
    },
    {
      "id": "sample-before-batch",
      "title": "Test five items before processing five hundred",
      "summary": "Small pilot batches reveal bad assumptions, formatting errors and missing edge cases before they scale.",
      "category": "Automation",
      "level": "Intermediate",
      "example": "Run this workflow on five representative records. Stop and report failures before continuing with the full dataset.",
      "related": "automation-workflow-or-agent"
    },
    {
      "id": "record-model-date",
      "title": "Record the model, date and prompt version",
      "summary": "Reproducibility improves when you can tell which system and instruction set produced an important result.",
      "category": "Quality",
      "level": "Intermediate",
      "example": "Add a footer containing provider, model, run date, prompt version and source pack used.",
      "related": "evaluate-ai-output-scorecard"
    },
    {
      "id": "spreadsheet-control-totals",
      "title": "Use control totals when AI edits a spreadsheet",
      "summary": "Row counts, column totals and duplicate checks catch silent data loss after transformations.",
      "category": "Data",
      "level": "Intermediate",
      "example": "Before and after the change, report row count, unique ID count, blank required fields and total amount.",
      "related": "ai-for-documents-spreadsheets-meetings"
    },
    {
      "id": "meeting-actions-owners",
      "title": "Turn meeting summaries into owned actions",
      "summary": "A useful recap names an owner, deadline and evidence for every action instead of producing a generic paragraph.",
      "category": "Work",
      "level": "Beginner",
      "example": "Create an action table with decision, owner, due date, dependency and the transcript evidence supporting it.",
      "related": "ai-for-documents-spreadsheets-meetings"
    },
    {
      "id": "prompt-change-log",
      "title": "Keep a change log for important prompts",
      "summary": "Treat prompts that drive repeated work like lightweight software: version them and record why they changed.",
      "category": "Workflow",
      "level": "Intermediate",
      "example": "Prompt v1.3: added a source-date check after two stale citations were accepted in review.",
      "related": "create-reusable-ai-skills"
    },
    {
      "id": "authority-budget",
      "title": "Give automation an authority budget",
      "summary": "Define exactly what the system may read, draft, change, send or spend before it starts.",
      "category": "Agents",
      "level": "Advanced",
      "example": "May read approved folders and draft messages. Must ask before sending, deleting, publishing or changing access.",
      "related": "automation-workflow-or-agent"
    },
    {
      "id": "rollback-first",
      "title": "Design the rollback before the automation",
      "summary": "A workflow is safer when every write action has a clear undo path and an owner who can invoke it.",
      "category": "Safety",
      "level": "Intermediate",
      "example": "Before enabling writes, document how to restore the previous file, record, deployment or permission state.",
      "related": "ai-governance-starter-kit"
    },
    {
      "id": "multimodal-evidence",
      "title": "Treat images and audio as evidence, not decoration",
      "summary": "Ask the model to identify what is directly visible or audible and what it is inferring.",
      "category": "Multimodal",
      "level": "Beginner",
      "example": "Describe observable details first. Put interpretations in a separate section and state confidence.",
      "related": "multimodal-ai-practical-guide"
    },
    {
      "id": "human-review-trigger",
      "title": "Define when human review is mandatory",
      "summary": "Do not rely on vague instructions such as “be careful”; name the exact conditions that force escalation.",
      "category": "Governance",
      "level": "Intermediate",
      "example": "Escalate when confidence is low, personal data is present, money or access changes, or sources disagree.",
      "related": "ai-governance-starter-kit"
    },
    {
      "id": "compare-to-baseline",
      "title": "Compare AI work to the current baseline",
      "summary": "The useful question is whether AI improves the existing process—not whether the output looks impressive.",
      "category": "Evaluation",
      "level": "Intermediate",
      "example": "Measure completion time, correction time, error rate and user satisfaction against the current manual method.",
      "related": "evaluate-ai-output-scorecard"
    },
    {
      "id": "structured-output",
      "title": "Ask for a schema when consistency matters",
      "summary": "A fixed table or JSON shape is easier to validate and automate than free-form prose.",
      "category": "Prompting",
      "level": "Intermediate",
      "example": "Return one row per source with fields: title, date, claim supported, confidence and URL.",
      "related": "prompting-for-reliable-results"
    }
  ],
  "references": [
    {
      "term": "Context window",
      "slug": "context-window",
      "definition": "The amount of information a model can consider in one request, including instructions, conversation and uploaded text.",
      "why": "A larger context window does not guarantee better recall or reasoning across every part of the input.",
      "tags": [
        "models",
        "prompting"
      ]
    },
    {
      "term": "Embedding",
      "slug": "embedding",
      "definition": "A numerical representation that places semantically similar content near each other in a vector space.",
      "why": "Embeddings power semantic search and many retrieval systems, but they do not preserve every detail of the source.",
      "tags": [
        "rag",
        "search"
      ]
    },
    {
      "term": "RAG",
      "slug": "rag",
      "definition": "Retrieval-augmented generation: finding relevant source material and giving it to a model before it answers.",
      "why": "RAG can improve grounding and freshness, but poor retrieval or weak source data still produces poor answers.",
      "tags": [
        "knowledge",
        "retrieval"
      ]
    },
    {
      "term": "Agent",
      "slug": "agent",
      "definition": "A system that uses a model to plan and take multiple tool-assisted steps toward a goal.",
      "why": "The important distinction is not the label but what actions the system may take, under which limits and approvals.",
      "tags": [
        "automation",
        "tools"
      ]
    },
    {
      "term": "MCP",
      "slug": "mcp",
      "definition": "Model Context Protocol, a standard way for AI applications to discover and use tools and data sources.",
      "why": "MCP reduces one-off integration work, but permissions and tool design still determine whether the connection is safe.",
      "tags": [
        "integrations",
        "agents"
      ]
    },
    {
      "term": "Inference",
      "slug": "inference",
      "definition": "Running a trained model to generate an output from an input.",
      "why": "Inference cost, latency, privacy and hardware requirements influence whether a model should run locally or through an API.",
      "tags": [
        "models",
        "local-ai"
      ]
    },
    {
      "term": "Hallucination",
      "slug": "hallucination",
      "definition": "A fluent model output that is unsupported, incorrect or invented.",
      "why": "Confidence and writing quality are not evidence. Important claims must be checked against reliable sources.",
      "tags": [
        "quality",
        "research"
      ]
    },
    {
      "term": "Tool calling",
      "slug": "tool-calling",
      "definition": "A structured method for a model to request that software perform an operation such as search, calculation or file access.",
      "why": "Tool calling can make answers more useful, but it also introduces permissions, validation and failure-handling requirements.",
      "tags": [
        "agents",
        "integrations"
      ]
    },
    {
      "term": "Fine-tuning",
      "slug": "fine-tuning",
      "definition": "Additional training that adapts a base model to a narrower behaviour, domain or output style.",
      "why": "Fine-tuning is not the first answer to every knowledge problem; prompting, retrieval or workflow changes may be cheaper and safer.",
      "tags": [
        "training",
        "models"
      ]
    },
    {
      "term": "Benchmark",
      "slug": "benchmark",
      "definition": "A repeatable test used to compare model performance on a defined set of tasks.",
      "why": "A benchmark measures its test design, not universal usefulness. Real workflow evaluation remains necessary.",
      "tags": [
        "evaluation",
        "models"
      ]
    },
    {
      "term": "Token",
      "slug": "token",
      "definition": "A unit of text processed by a language model. A token may be a word, part of a word, punctuation or another symbol.",
      "why": "Tokens affect context limits, cost and latency, but token counts do not map neatly to page counts across languages and file types.",
      "tags": [
        "models",
        "cost"
      ]
    },
    {
      "term": "Grounding",
      "slug": "grounding",
      "definition": "Connecting a model response to supplied documents, databases, tools or current external information.",
      "why": "Grounding can improve relevance and traceability, but the source can still be incomplete, stale or misinterpreted.",
      "tags": [
        "quality",
        "retrieval"
      ]
    },
    {
      "term": "Evaluation (eval)",
      "slug": "evaluation",
      "definition": "A repeatable test that measures whether an AI system meets defined success criteria on representative tasks.",
      "why": "An eval turns vague impressions into evidence and helps detect regressions when prompts, tools or models change.",
      "tags": [
        "quality",
        "testing"
      ]
    },
    {
      "term": "Guardrail",
      "slug": "guardrail",
      "definition": "A technical or procedural control that limits, checks or redirects an AI system before or after it acts.",
      "why": "Guardrails are layers, not guarantees. Strong systems combine permissions, validation, monitoring, approvals and recovery.",
      "tags": [
        "safety",
        "agents"
      ]
    },
    {
      "term": "Prompt injection",
      "slug": "prompt-injection",
      "definition": "An attempt to make an AI system follow untrusted instructions contained in user input, documents, websites or tool output.",
      "why": "Connected systems must treat retrieved content as data, not as authority that can override system rules.",
      "tags": [
        "security",
        "agents"
      ]
    },
    {
      "term": "Human in the loop",
      "slug": "human-in-the-loop",
      "definition": "A workflow in which a person reviews, approves, corrects or takes responsibility for selected AI decisions or actions.",
      "why": "Human review only helps when the reviewer has enough context, time and authority to challenge the system.",
      "tags": [
        "governance",
        "workflow"
      ]
    },
    {
      "term": "Multimodal model",
      "slug": "multimodal-model",
      "definition": "A model that can work with more than one type of input or output, such as text, images, audio or video.",
      "why": "Capabilities and failure modes differ by modality; a model that writes well may still misread a chart, image or recording.",
      "tags": [
        "models",
        "media"
      ]
    },
    {
      "term": "System prompt",
      "slug": "system-prompt",
      "definition": "High-priority instructions supplied by an application to shape a model’s role, boundaries and behaviour.",
      "why": "A system prompt is useful but should not be treated as a security boundary on its own.",
      "tags": [
        "prompting",
        "agents"
      ]
    },
    {
      "term": "Temperature",
      "slug": "temperature",
      "definition": "A sampling setting that influences how varied or predictable generated outputs are.",
      "why": "Lower values can improve repeatability, but they do not make an incorrect answer factual or deterministic.",
      "tags": [
        "models",
        "generation"
      ]
    },
    {
      "term": "Latency",
      "slug": "latency",
      "definition": "The time between making a request and receiving a usable result.",
      "why": "Multi-step agents and large files can improve quality while also increasing delay and cost.",
      "tags": [
        "performance",
        "agents"
      ]
    },
    {
      "term": "Model drift",
      "slug": "model-drift",
      "definition": "A change in system behaviour or quality over time because the model, data, tools, prompts or real-world conditions changed.",
      "why": "Production AI needs ongoing monitoring and regression tests rather than a once-off launch review.",
      "tags": [
        "evaluation",
        "operations"
      ]
    },
    {
      "term": "Structured output",
      "slug": "structured-output",
      "definition": "A response constrained to a defined schema such as a table, form or JSON object.",
      "why": "Structured output is easier to validate and automate, but each field still needs quality checks.",
      "tags": [
        "automation",
        "prompting"
      ]
    }
  ],
  "taskCards": [
    {
      "title": "I am new to AI",
      "description": "Choose a service, learn safe habits and complete your first useful workflow.",
      "href": "#learn/start-here",
      "label": "Begin here",
      "icon": "01"
    },
    {
      "title": "I want to use AI at work",
      "description": "Improve documents, spreadsheets, meetings and everyday knowledge work.",
      "href": "#learn/office-productivity",
      "label": "Work smarter",
      "icon": "02"
    },
    {
      "title": "I need to choose a tool",
      "description": "Compare subscriptions, models, coding assistants and open-source projects.",
      "href": "#tools",
      "label": "Compare options",
      "icon": "03"
    },
    {
      "title": "I am building with AI",
      "description": "Use technical guides, repositories, architecture references and guardrails.",
      "href": "#learn/build-agents",
      "label": "Build responsibly",
      "icon": "04"
    },
    {
      "title": "I manage AI for a team",
      "description": "Create lightweight governance, evaluation and approval practices.",
      "href": "#learn/responsible-adoption",
      "label": "Set controls",
      "icon": "05"
    },
    {
      "title": "I want quick improvements",
      "description": "Browse small prompt, research, data and workflow techniques you can apply today.",
      "href": "#tips",
      "label": "Open tips",
      "icon": "06"
    }
  ]
};
