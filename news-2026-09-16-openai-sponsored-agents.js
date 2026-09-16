(()=>{
'use strict';
const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const item={
  id:'openai-sponsored-agents',
  title:'OpenAI tests Sponsored Agents as ChatGPT Ads becomes conversational',
  dek:'OpenAI is testing Sponsored Agents with select US advertisers, letting a user choose to open a clearly labelled conversation with a business-sponsored agent after clicking an ad in ChatGPT. The sponsored conversation is distinct from ChatGPT’s independent answers and from the user’s original conversation. OpenAI also added natural-language campaign management through an Ads Manager plugin, AI-assisted ad creation, optional contextual text customization, and integrations with HubSpot and Shopify. These are vendor-described product capabilities, not evidence that conversational ads improve outcomes. The durable shift is that AI advertising is moving beyond static placements toward interactive, agent-mediated commercial conversations.',
  source:'OpenAI',sourceType:'Official product announcement',category:'Products',format:'Daily brief',date:'2026-09-16',readTime:'4 min',
  url:'https://openai.com/index/reimagining-advertising-with-ai/',verified:'2026-09-16',visual:'product-purple'
};
const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url);
if(existing>=0)feed[existing]={...feed[existing],...item};else feed.unshift(item);
})();
