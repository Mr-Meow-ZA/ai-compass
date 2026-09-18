(()=>{
'use strict';
const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const items=[
  {
    id:'anthropic-frontier-lab-pace-metrics',
    title:'Anthropic proposes metrics for measuring how quickly frontier AI labs are accelerating',
    dek:'Anthropic has proposed a public measurement framework for tracking the pace of AI development inside frontier labs, arguing that outside observers currently lack visibility into how quickly AI-assisted research is changing model-development cycles. The proposal focuses on measurable indicators rather than treating capability progress as a sequence of launch announcements. This is a research and policy proposal, not an adopted industry standard; the durable signal is the push to measure AI-driven R&D acceleration itself as a governance-relevant variable.',
    source:'Anthropic',sourceType:'Official research and policy proposal',category:'Research',format:'Daily brief',date:'2026-09-18',readTime:'5 min',
    url:'https://www.anthropic.com/institute/measuring-pace-of-ai-development',verified:'2026-09-18',visual:'research-blue'
  },
  {
    id:'openai-model-misalignment-disclosure-framework',
    title:'OpenAI publishes a framework for reporting model misalignment incidents',
    dek:'OpenAI has published a systematic framework for tracking, investigating and disclosing unexpected or concerning model behavior, alongside six initial incident reports from the previous six months. The important change is operational rather than rhetorical: model-misalignment events are being treated as incidents that can be classified, investigated and disclosed over time. The framework is OpenAI’s own process rather than an independent standard, but it creates a concrete disclosure surface that researchers and governance teams can compare against future incidents and other labs’ practices.',
    source:'OpenAI',sourceType:'Official safety framework and incident reports',category:'Safety',format:'Daily brief',date:'2026-09-17',readTime:'5 min',
    url:'https://openai.com/index/model-misalignment-reporting-framework/',verified:'2026-09-18',visual:'enterprise-blue'
  }
];
for(const item of items){
  const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url);
  if(existing>=0)feed[existing]={...feed[existing],...item};else feed.unshift(item);
}
})();
