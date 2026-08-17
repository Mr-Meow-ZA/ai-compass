(()=>{
'use strict';
const L=window.AI_COMPASS_LIBRARY;
if(!L||!Array.isArray(L.learningPaths))return;

const powerUserPath={
  id:'ai-power-user',
  title:'Become an AI power user',
  audience:'Power user',
  duration:'About 3 hours',
  description:'Turn good prompting into a repeatable operating system: research with evidence, reusable instructions, grounded knowledge, sensible automation and explicit quality checks.',
  accent:'teal',
  steps:[
    'prompting-for-reliable-results',
    'research-with-ai-and-verify-sources',
    'create-reusable-ai-skills',
    'build-first-rag-knowledge-base',
    'automation-workflow-or-agent',
    'evaluate-ai-output-scorecard'
  ]
};

if(!L.learningPaths.some(item=>item.id===powerUserPath.id)){
  const builderIndex=L.learningPaths.findIndex(item=>item.id==='build-agents');
  L.learningPaths.splice(builderIndex>=0?builderIndex:L.learningPaths.length,0,powerUserPath);
}

window.AI_COMPASS_CURRICULUM={
  version:'2026-08-17.1',
  reviewed:'2026-08-17',
  promise:'Learn enough to do the next useful thing safely — then move up only when your work actually needs more complexity.',
  levels:[
    {
      id:'essentials',number:'01',title:'AI Essentials',stage:'Start here',
      description:'Understand what AI can and cannot do, write useful instructions, protect information and verify important claims.',
      forWhom:'New or occasional AI users',
      paths:['start-here'],
      skills:['Choosing a first AI service','Prompt structure','Privacy judgment','Source verification'],
      readyWhen:'You can use an assistant for ordinary work without treating fluent output as automatically correct.'
    },
    {
      id:'work',number:'02',title:'AI at Work',stage:'Make it repeatable',
      description:'Use AI deliberately across documents, spreadsheets, meetings, files and recurring knowledge work.',
      forWhom:'Professionals using AI every week',
      paths:['office-productivity','work-smarter'],
      skills:['Document workflows','Data checks','Meeting actions','Context packaging','Connected workspaces'],
      readyWhen:'You can describe a repeatable workflow, its source material, its review step and what success looks like.'
    },
    {
      id:'power-user',number:'03',title:'AI Power User',stage:'Build an operating system',
      description:'Move beyond better chats into reusable context, research, retrieval, automation boundaries and evaluation.',
      forWhom:'People who rely on AI for substantial work',
      paths:['ai-power-user'],
      skills:['Evidence-led research','Reusable AI skills','RAG fundamentals','Automation selection','Evaluation'],
      readyWhen:'You can make an AI workflow repeatable, testable and easier for another person to understand or reuse.'
    },
    {
      id:'builder',number:'04',title:'AI Builder & Team Lead',stage:'Give AI tools and authority',
      description:'Build tool-using systems and team adoption practices while keeping permissions, approvals, guardrails and rollback explicit.',
      forWhom:'Builders, automation owners and team leads',
      paths:['build-agents','responsible-adoption'],
      skills:['MCP and tools','Agent orchestration','Guardrails','Governance','Human approval boundaries'],
      readyWhen:'You can explain what an AI system may read, decide and change — and what happens when it is wrong.'
    },
    {
      id:'enterprise',number:'05',title:'Enterprise AI Builder',stage:'Design for production',
      description:'Design secure, governed AI systems that connect models, retrieval, tools, identity, evaluation and business systems.',
      forWhom:'Enterprise architects, AI leads and advanced builders',
      paths:['enterprise-ai-builder'],
      skills:['Enterprise architecture','Trustworthy RAG','Evaluation frameworks','Identity and least privilege','AI lifecycle governance'],
      readyWhen:'You can take an AI use case from bounded pilot to measured production with ownership, controls and a retirement path.'
    }
  ],
  pathMeta:{
    'start-here':{
      level:'essentials',prerequisite:'None',
      outcomes:['Choose a sensible first AI service','Write clearer instructions','Know what not to upload','Verify important answers'],
      next:'office-productivity'
    },
    'office-productivity':{
      level:'work',prerequisite:'Comfort with basic prompting and verification',
      outcomes:['Use AI across office documents and data','Turn meetings into owned actions','Keep humans accountable for consequential work'],
      next:'work-smarter'
    },
    'work-smarter':{
      level:'work',prerequisite:'Regular use of an AI assistant',
      outcomes:['Package context more deliberately','Connect AI to durable knowledge and tools','Turn useful chats into repeatable workflows'],
      next:'ai-power-user'
    },
    'ai-power-user':{
      level:'power-user',prerequisite:'You already use AI for real work every week',
      outcomes:['Research with visible evidence','Create reusable AI instructions','Choose when RAG is useful','Separate automation from agents','Evaluate outputs systematically'],
      next:'build-agents'
    },
    'build-agents':{
      level:'builder',prerequisite:'Comfort with repeatable workflows, evaluation and basic automation',
      outcomes:['Understand MCP and tool boundaries','Choose an orchestration pattern','Add stop conditions, approvals and guardrails'],
      next:'responsible-adoption'
    },
    'responsible-adoption':{
      level:'builder',prerequisite:'You are introducing AI to a team or business process',
      outcomes:['Choose the right autonomy level','Create practical governance','Define human review triggers','Compare AI to the current baseline'],
      next:'enterprise-ai-builder'
    },
    'enterprise-ai-builder':{
      level:'enterprise',prerequisite:'Experience with agentic workflows, governance and evaluation',
      outcomes:['Design an enterprise AI architecture','Build permission-aware RAG','Establish release gates','Secure agent identity and tools','Manage the full AI development lifecycle'],
      next:''
    }
  }
};
})();