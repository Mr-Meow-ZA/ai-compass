window.AI_COMPASS_LIBRARY = {
  learningPaths: [
    {
      id: 'start-here',
      title: 'Start using AI with confidence',
      audience: 'Beginner',
      duration: 'About 90 minutes',
      description: 'Choose a service, write better instructions, protect sensitive information and verify what the model tells you.',
      accent: 'blue',
      steps: [
        'choose-your-first-ai-subscription',
        'prompting-for-reliable-results',
        'ai-privacy-before-uploading',
        'research-with-ai-and-verify-sources'
      ]
    },
    {
      id: 'work-smarter',
      title: 'Build repeatable AI workflows',
      audience: 'Everyday user',
      duration: 'About 2 hours',
      description: 'Move beyond isolated chats by connecting your files, tools and knowledge into reliable systems.',
      accent: 'green',
      steps: [
        'obsidian-ai-second-brain',
        'connect-ai-to-github',
        'create-reusable-ai-skills',
        'build-first-rag-knowledge-base'
      ]
    },
    {
      id: 'build-agents',
      title: 'Build agents without losing control',
      audience: 'Builder',
      duration: 'About 2.5 hours',
      description: 'Understand MCP, orchestration and guardrails before allowing an AI system to take actions.',
      accent: 'violet',
      steps: [
        'mcp-explained-and-set-up',
        'agent-orchestration-without-chaos',
        'production-agent-guardrails',
        'automate-ai-content-website'
      ]
    }
  ],
  tips: [
    {
      id: 'ask-for-assumptions',
      title: 'Ask the model to list its assumptions first',
      summary: 'For planning, analysis and troubleshooting, expose hidden assumptions before accepting the answer.',
      category: 'Prompting',
      level: 'Beginner',
      example: 'Before answering, list the assumptions you are making and flag any that need verification.',
      related: 'prompting-for-reliable-results'
    },
    {
      id: 'give-success-test',
      title: 'Define what “done” means',
      summary: 'A clear acceptance test produces more reliable output than adding more adjectives to a prompt.',
      category: 'Workflow',
      level: 'Beginner',
      example: 'The result is complete when every source opens, all dates are current and no table has blank required fields.',
      related: 'prompting-for-reliable-results'
    },
    {
      id: 'separate-draft-review',
      title: 'Separate generation from review',
      summary: 'Use one pass to produce the work and a second pass with explicit review criteria to find problems.',
      category: 'Quality',
      level: 'Beginner',
      example: 'Review this draft for unsupported claims, missing context, repetition and instructions that are not actionable.',
      related: 'research-with-ai-and-verify-sources'
    },
    {
      id: 'small-context-packets',
      title: 'Send focused context packets',
      summary: 'Give the model only the documents and facts needed for the current decision instead of dumping an entire archive.',
      category: 'Context',
      level: 'Intermediate',
      example: 'Use these three documents only. Treat anything not contained in them as unknown.',
      related: 'rag-vs-long-context'
    },
    {
      id: 'source-first-research',
      title: 'Request primary sources before summaries',
      summary: 'Locate official documentation, papers or repositories first; summarise only after the evidence is visible.',
      category: 'Research',
      level: 'Beginner',
      example: 'Find the primary sources, show their dates and explain what each one directly supports.',
      related: 'research-with-ai-and-verify-sources'
    },
    {
      id: 'use-diff-review',
      title: 'Review code as a diff, not a promise',
      summary: 'Require the AI to show exactly what changed, why it changed and which tests prove the change works.',
      category: 'Coding',
      level: 'Intermediate',
      example: 'Show the diff, list possible regressions and run the smallest relevant tests before proposing a merge.',
      related: 'connect-ai-to-github'
    },
    {
      id: 'redact-before-upload',
      title: 'Redact before you upload',
      summary: 'Remove secrets, identifiers and unnecessary personal information before sending files to any AI service.',
      category: 'Privacy',
      level: 'Beginner',
      example: 'Replace names, account numbers and API keys with stable placeholders before analysis.',
      related: 'ai-privacy-before-uploading'
    },
    {
      id: 'agent-stop-condition',
      title: 'Give every agent a stop condition',
      summary: 'An agent should know when to stop, ask for approval or declare that it cannot proceed safely.',
      category: 'Agents',
      level: 'Advanced',
      example: 'Stop and request approval before deleting, publishing, spending money, changing access or altering infrastructure.',
      related: 'production-agent-guardrails'
    }
  ],
  references: [
    {
      term: 'Context window',
      slug: 'context-window',
      definition: 'The amount of information a model can consider in one request, including instructions, conversation and uploaded text.',
      why: 'A larger context window does not guarantee better recall or reasoning across every part of the input.',
      tags: ['models', 'prompting']
    },
    {
      term: 'Embedding',
      slug: 'embedding',
      definition: 'A numerical representation that places semantically similar content near each other in a vector space.',
      why: 'Embeddings power semantic search and many retrieval systems, but they do not preserve every detail of the source.',
      tags: ['rag', 'search']
    },
    {
      term: 'RAG',
      slug: 'rag',
      definition: 'Retrieval-augmented generation: finding relevant source material and giving it to a model before it answers.',
      why: 'RAG can improve grounding and freshness, but poor retrieval or weak source data still produces poor answers.',
      tags: ['knowledge', 'retrieval']
    },
    {
      term: 'Agent',
      slug: 'agent',
      definition: 'A system that uses a model to plan and take multiple tool-assisted steps toward a goal.',
      why: 'The important distinction is not the label but what actions the system may take, under which limits and approvals.',
      tags: ['automation', 'tools']
    },
    {
      term: 'MCP',
      slug: 'mcp',
      definition: 'Model Context Protocol, a standard way for AI applications to discover and use tools and data sources.',
      why: 'MCP reduces one-off integration work, but permissions and tool design still determine whether the connection is safe.',
      tags: ['integrations', 'agents']
    },
    {
      term: 'Inference',
      slug: 'inference',
      definition: 'Running a trained model to generate an output from an input.',
      why: 'Inference cost, latency, privacy and hardware requirements influence whether a model should run locally or through an API.',
      tags: ['models', 'local-ai']
    },
    {
      term: 'Hallucination',
      slug: 'hallucination',
      definition: 'A fluent model output that is unsupported, incorrect or invented.',
      why: 'Confidence and writing quality are not evidence. Important claims must be checked against reliable sources.',
      tags: ['quality', 'research']
    },
    {
      term: 'Tool calling',
      slug: 'tool-calling',
      definition: 'A structured method for a model to request that software perform an operation such as search, calculation or file access.',
      why: 'Tool calling can make answers more useful, but it also introduces permissions, validation and failure-handling requirements.',
      tags: ['agents', 'integrations']
    },
    {
      term: 'Fine-tuning',
      slug: 'fine-tuning',
      definition: 'Additional training that adapts a base model to a narrower behaviour, domain or output style.',
      why: 'Fine-tuning is not the first answer to every knowledge problem; prompting, retrieval or workflow changes may be cheaper and safer.',
      tags: ['training', 'models']
    },
    {
      term: 'Benchmark',
      slug: 'benchmark',
      definition: 'A repeatable test used to compare model performance on a defined set of tasks.',
      why: 'A benchmark measures its test design, not universal usefulness. Real workflow evaluation remains necessary.',
      tags: ['evaluation', 'models']
    }
  ],
  taskCards: [
    {
      title: 'I am new to AI',
      description: 'Choose a service, learn safe habits and complete your first useful workflow.',
      href: '#learn/start-here',
      label: 'Begin here',
      icon: '01'
    },
    {
      title: 'I want to work smarter',
      description: 'Find repeatable workflows, prompt patterns and practical integrations.',
      href: '#tips',
      label: 'Explore workflows',
      icon: '02'
    },
    {
      title: 'I need to choose a tool',
      description: 'Compare subscriptions, coding assistants, models and open-source projects.',
      href: '#tools',
      label: 'Compare options',
      icon: '03'
    },
    {
      title: 'I am building with AI',
      description: 'Use technical guides, repositories, architecture references and guardrails.',
      href: '#learn/build-agents',
      label: 'Build responsibly',
      icon: '04'
    }
  ]
};
