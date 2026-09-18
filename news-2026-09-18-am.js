(()=>{
'use strict';
const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const items=[
{
 id:'openai-model-misalignment-disclosure-framework',
 title:'OpenAI formalizes public reporting for model misalignment incidents',
 dek:'OpenAI has introduced a framework for tracking, investigating and publicly disclosing unexpected or concerning model behavior, alongside six initial incident reports. The framework defines internal escalation and disclosure criteria and is intended to make reporting more systematic as increasingly agentic systems encounter real environments. Reuters independently confirms the policy change and notes that the process remains voluntary and company-run. The durable signal is governance rather than any single incident: frontier labs are beginning to treat model-behavior failures as a recurring incident-reporting discipline instead of isolated research anecdotes.',
 source:'OpenAI',sourceType:'Official safety framework',category:'Safety',format:'Daily brief',date:'2026-09-17',readTime:'5 min',
 url:'https://openai.com/index/model-misalignment-reporting-framework/',contextUrl:'https://www.reuters.com/technology/openai-releases-framework-track-model-misalignment-2026-09-16/',verified:'2026-09-18',visual:'enterprise-blue'
},
{
 id:'openai-astra-for-law',
 title:'OpenAI launches Astra for Law with a dedicated U.S. legal search index',
 dek:'OpenAI has introduced Astra for Law, a GPT-6 Astra variant tailored to professional legal work and paired with a Legal Search Index covering U.S. case law, statutes, regulations, court rules and administrative decisions that OpenAI says is updated daily. Initial access is limited to selected U.S. law firms through Trusted Access and Codex, with API access planned. OpenAI explicitly tells users to review answers and cited sources before relying on them. The durable signal is the continued shift from general-purpose frontier models toward professionally scoped systems that combine model capability with curated domain retrieval and workflow integrations.',
 source:'OpenAI',sourceType:'Official product documentation',category:'Business',format:'Daily brief',date:'2026-09-17',readTime:'4 min',
 url:'https://help.openai.com/en/articles/20001528-astra-for-law',contextUrl:'https://www.reuters.com/legal/litigation/openai-launches-legal-focused-ai-platform-escalating-race-law-firm-users-2026-09-17/',verified:'2026-09-18',visual:'enterprise-blue'
}
];
for(const item of items){const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url);if(existing>=0)feed[existing]={...feed[existing],...item};else feed.unshift(item);}
})();