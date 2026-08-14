(()=>{
'use strict';
const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const item={
  id:'anthropic-claude-watermarking-provenance',
  title:'Anthropic documents machine-readable marks for Claude-generated content',
  dek:'Anthropic says supported Claude models use imperceptible text watermarks and digitally signed provenance metadata for supported files. New models launched in the EU on or after 2 August 2026 support marking at launch, older models are being updated, and the absence of a detectable mark does not prove content is human-made.',
  source:'Anthropic',
  sourceType:'Official Claude Help Center guidance',
  category:'Safety',
  format:'Transparency update',
  date:'2026-08-11',
  readTime:'5 min',
  url:'https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content',
  contextUrl:'https://www.theverge.com/ai-artificial-intelligence/977823/anthropic-claude-ai-watermarks-c2pa-text-images',
  contextSource:'The Verge',
  verified:'2026-08-14',
  visual:'provenance-blue'
};
const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url||entry.contextUrl===item.url);
if(existing>=0)feed[existing]={...feed[existing],...item};else feed.unshift(item);
})();
