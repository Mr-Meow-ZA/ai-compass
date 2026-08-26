(()=>{
'use strict';
const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const items=[
  {
    id:'gemini-3-5-transcribe',
    title:'Google introduces Gemini 3.5 Transcribe for real-time speech-to-text',
    dek:'Google says Gemini 3.5 Transcribe is its most precise speech-to-text model yet, designed to turn noisy or disfluent audio into polished, formatted text for real-time voice interactions. The announcement is a model release, not proof that every existing Gemini surface exposes the same transcription controls.',
    source:'Google',
    sourceType:'Official announcement',
    category:'Models',
    format:'Daily brief',
    date:'2026-08-26',
    readTime:'3 min',
    url:'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/',
    verified:'2026-08-26',
    visual:'models-blue'
  },
  {
    id:'openai-admin-plugin-work-codex',
    title:'OpenAI adds an Admin plugin for ChatGPT Work and Codex',
    dek:'OpenAI has introduced an Admin plugin that lets authorized workspace administrators inspect adoption and usage, manage members and groups, review permissions and usage limits, and automate selected recurring admin workflows from ChatGPT Work and Codex. The plugin works within the admin’s existing role and permissions rather than granting broader access.',
    source:'OpenAI',
    sourceType:'Official announcement',
    category:'Business',
    format:'Daily brief',
    date:'2026-08-25',
    readTime:'4 min',
    url:'https://openai.com/index/introducing-admin-plugin/',
    verified:'2026-08-26',
    visual:'enterprise-blue'
  },
  {
    id:'openai-jalapeno-inference-chip',
    title:'OpenAI publishes first performance results for its Jalapeño inference chip',
    dek:'OpenAI says its first custom inference chip, Jalapeño, delivered a better combination of latency and performance per watt across GPT-OSS 120B, DeepSeek R1 670B and Kimi K2.5 1T in its testing. The published comparisons are OpenAI-run results and should be treated as vendor evidence until broader independent testing is available.',
    source:'OpenAI',
    sourceType:'Official engineering results',
    category:'Products',
    format:'Daily brief',
    date:'2026-08-25',
    readTime:'5 min',
    url:'https://openai.com/index/jalapeno-first-results/',
    verified:'2026-08-26',
    visual:'hardware-blue'
  }
];
for(const item of items){
  const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url);
  if(existing>=0)feed[existing]={...feed[existing],...item};else feed.unshift(item);
}
})();
