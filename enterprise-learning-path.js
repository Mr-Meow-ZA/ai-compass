(()=>{
'use strict';
const L=window.AI_COMPASS_LIBRARY;if(!L||!Array.isArray(L.learningPaths))return;
const path={
 id:'enterprise-ai-builder',
 title:'Build AI systems at work',
 audience:'Enterprise AI builder',
 duration:'About 6 hours',
 description:'Move from a bounded workflow to governed agents, enterprise architecture, trustworthy RAG, systematic evaluation, least-privilege security and a production lifecycle.',
 accent:'violet',
 steps:[
  'build-your-first-ai-assisted-workflow-automation',
  'build-agent-orchestration',
  'build-and-test-agentic-ai-at-work',
  'design-an-enterprise-ai-architecture',
  'build-a-trustworthy-enterprise-rag-system',
  'build-an-enterprise-ai-evaluation-framework',
  'secure-enterprise-ai-agents-with-identity-and-least-privilege',
  'enterprise-ai-development-lifecycle'
 ]
};
if(!L.learningPaths.some(item=>item.id===path.id))L.learningPaths.unshift(path);
})();