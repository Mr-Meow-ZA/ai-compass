(()=>{
'use strict';
const D=window.AI_COMPASS_DATA;
const L=window.AI_COMPASS_LIBRARY;
if(!D||!Array.isArray(D.articles)||!L)return;

D.articles.push({
  slug:'context-engineering-for-reliable-agents',
  title:'Context engineering: give AI the right information at the right time',
  excerpt:'A practical guide to managing instructions, tools, retrieved knowledge and conversation history so agents stay useful without drowning in context.',
  type:'Architecture guide',
  category:'agents',
  level:'Intermediate',
  readTime:18,
  date:'2026-08-07',
  featured:true,
  source:'AI Compass',
  tags:['context engineering','agents','retrieval','rag','tools','memory','compaction'],
  sections:[
    {
      title:'Prompt engineering is only one part of the problem',
      id:'beyond-prompts',
      html:'<p>A good system prompt matters, but capable AI systems also receive tool definitions, retrieved documents, conversation history, files, intermediate results and system state. <strong>Context engineering</strong> is the practice of deciding which of that information should be available for the next model call.</p><p>The goal is not to maximise the amount of text. It is to maximise the usefulness of the limited attention and context available to the model.</p>'
    },
    {
      title:'Think in four context layers',
      id:'four-layers',
      html:'<div class="table-wrap"><table><thead><tr><th>Layer</th><th>Purpose</th><th>Common failure</th></tr></thead><tbody><tr><td>Instructions</td><td>Rules, role, goals and output requirements</td><td>Conflicting or stale instructions</td></tr><tr><td>Tools</td><td>What the system can read or change</td><td>Too many broad tools or unclear permissions</td></tr><tr><td>Knowledge</td><td>Retrieved documents, records and external evidence</td><td>Irrelevant chunks or missing source context</td></tr><tr><td>Working state</td><td>Recent messages, plans, results and open decisions</td><td>Long histories that bury the current task</td></tr></tbody></table></div><p>Debug each layer separately. A retrieval problem should not be “fixed” by making the system prompt longer, and a permission problem should not be treated as a memory problem.</p>'
    },
    {
      title:'Retrieve narrowly instead of dumping everything',
      id:'retrieve-narrowly',
      html:'<p>Retrieval-augmented generation works best when the system can find a small set of relevant, permission-appropriate evidence. Modern retrieval systems often combine exact keyword matching with semantic search and ranking rather than relying on embeddings alone.</p><div class="checklist"><strong>For each retrieved item, preserve:</strong><ul><li>The source and canonical location.</li><li>The document or record it came from.</li><li>Dates, version and permission context when relevant.</li><li>Enough surrounding text to understand names, units and references.</li><li>A traceable identifier so the final answer can cite it.</li></ul></div>'
    },
    {
      title:'Use just-in-time context for agents',
      id:'just-in-time',
      html:'<p>Long-running agents should not preload every file or system record they might need. A better pattern is to keep lightweight references—file paths, IDs, saved queries or URLs—and let the agent fetch the specific information when the task requires it.</p><p>This reduces context pressure, keeps information fresher and makes tool activity easier to inspect. The trade-off is that retrieval and tool calls must be reliable, permission-aware and observable.</p>'
    },
    {
      title:'Compact history without deleting the important state',
      id:'compaction',
      html:'<p>As an agent works, conversation and tool output accumulate. Compaction replaces older low-value detail with a shorter durable state: current goal, completed steps, important decisions, unresolved questions, constraints and references to evidence.</p><div class="callout"><strong>Useful compact state:</strong> “Goal: prepare Q3 risk brief. Completed: source inventory and finance check. Decision: use approved forecast v4. Open: confirm legal note. Evidence IDs: F-17, R-04. Do not publish without approval.”</div><p>Do not compress away audit-critical details when exact history is required. Keep full traces in storage and pass only the working summary back into model context.</p>'
    },
    {
      title:'Evaluate context quality, not only final answers',
      id:'evaluate-context',
      html:'<p>When an answer is wrong, inspect what the model actually received. Ask whether the correct source was retrieved, whether irrelevant material displaced it, whether instructions conflicted, and whether the agent loaded the right state before acting.</p><ol class="steps"><li>Create test questions with known evidence.</li><li>Measure whether the correct source appears in retrieval results.</li><li>Check ranking, citations and permission filtering.</li><li>Inspect the final answer separately from retrieval quality.</li><li>Repeat after changing chunking, ranking, prompts, tools or models.</li></ol>'
    },
    {
      title:'A practical context budget',
      id:'context-budget',
      html:'<p>For an important workflow, write down what deserves context space before implementation.</p><div class="table-wrap"><table><thead><tr><th>Priority</th><th>Include</th></tr></thead><tbody><tr><td>Always</td><td>Current goal, non-negotiable constraints, permission boundaries and acceptance criteria</td></tr><tr><td>When relevant</td><td>Retrieved evidence, tool instructions and recent decisions</td></tr><tr><td>By reference</td><td>Large archives, old transcripts, full logs and rarely used documents</td></tr><tr><td>Exclude</td><td>Duplicate text, unrelated history, secrets and stale drafts</td></tr></tbody></table></div><p>Context should be treated as a designed interface between the model and the surrounding system, not as a storage location.</p>'
    }
  ],
  sources:[
    {title:'Anthropic — Effective context engineering for AI agents',url:'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',publisher:'Anthropic'},
    {title:'Anthropic — Introducing Contextual Retrieval',url:'https://www.anthropic.com/engineering/contextual-retrieval',publisher:'Anthropic'},
    {title:'Microsoft — Retrieval-augmented generation in Azure AI Search',url:'https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview',publisher:'Microsoft'},
    {title:'OpenAI — A practical guide to building AI agents',url:'https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/',publisher:'OpenAI'}
  ],
  updated:'7 August 2026'
});

L.tips.push(
  {
    id:'context-budget-before-agent',
    title:'Write a context budget before building an agent',
    summary:'Decide what must always be present, what should be retrieved on demand and what should stay outside the model context.',
    category:'Agents',level:'Intermediate',
    example:'Always include the goal and approval boundaries. Retrieve project evidence only when needed. Keep full logs outside context and reference them by ID.',
    related:'context-engineering-for-reliable-agents'
  },
  {
    id:'inspect-retrieval-before-answer',
    title:'Inspect retrieval before blaming the model',
    summary:'If a grounded answer is wrong, first check whether the correct evidence was actually retrieved and ranked highly enough.',
    category:'RAG',level:'Intermediate',
    example:'For five known-answer questions, record the retrieved source IDs before reviewing the generated answer.',
    related:'context-engineering-for-reliable-agents'
  },
  {
    id:'keep-agent-state-compact',
    title:'Keep agent working state compact',
    summary:'Summarise completed steps, decisions, blockers and evidence references instead of replaying an entire long transcript every turn.',
    category:'Agents',level:'Advanced',
    example:'Carry forward goal, completed work, open decisions and source IDs; keep the full execution trace in storage.',
    related:'context-engineering-for-reliable-agents'
  }
);

L.references.push(
  {
    term:'Context engineering',slug:'context-engineering',
    definition:'The practice of selecting and maintaining the instructions, tools, retrieved knowledge and working state a model receives for a task.',
    why:'More context is not automatically better. Relevant, current and well-structured context can matter as much as the model itself.',
    tags:['agents','prompting','retrieval']
  },
  {
    term:'Hybrid search',slug:'hybrid-search',
    definition:'A retrieval approach that combines lexical keyword search with semantic or vector search and then merges or reranks the results.',
    why:'Exact terms and semantic similarity catch different kinds of matches, so combining them can improve retrieval coverage.',
    tags:['rag','search','retrieval']
  },
  {
    term:'Agentic retrieval',slug:'agentic-retrieval',
    definition:'A retrieval pattern in which an AI system plans or decomposes queries, runs multiple searches and combines evidence for a complex question.',
    why:'It can improve difficult conversational retrieval, but adds model calls, latency, cost and more behaviour that must be evaluated.',
    tags:['rag','agents','search']
  },
  {
    term:'Compaction',slug:'compaction',
    definition:'Replacing older conversation or execution detail with a shorter state summary so a long-running agent can continue within context limits.',
    why:'Good compaction preserves goals, decisions, blockers and evidence references while removing low-value repetition.',
    tags:['agents','context','memory']
  }
);
})();
