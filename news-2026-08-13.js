(()=>{
'use strict';
const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const item={
  id:'anthropic-claude-watermarking-provenance',
  title:'Anthropic plans machine-readable marks for Claude-generated content',
  dek:'Anthropic says new Claude models will mark generated text with imperceptible watermarks and add digitally signed provenance metadata to supported generated files. Existing models are being updated on a later timetable, and missing marks do not prove content is human-made.',
  source:'Anthropic / The Verge',
  sourceType:'AI Compass synthesis of Anthropic statements reported by The Verge',
  category:'Safety',
  format:'Transparency update',
  date:'2026-08-11',
  readTime:'5 min',
  url:'https://www.theverge.com/ai-artificial-intelligence/977823/anthropic-claude-ai-watermarks-c2pa-text-images',
  verified:'2026-08-13',
  visual:'provenance-blue'
};
const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url);
if(existing>=0)feed[existing]={...feed[existing],...item};else feed.unshift(item);
})();
