(()=>{
'use strict';
const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const item={
  id:'google-gemini-3-8-live',
  title:'Google releases Gemini 3.8 Live for real-time multimodal agents',
  dek:'Google has released Gemini 3.8 Live and Gemini 3.8 Live Extended Thinking through the Gemini API and Google AI Studio for real-time conversational agents. Google says the models use native speech-to-speech interaction, can keep a conversation moving while asynchronous tools and APIs run, can use live visual context, and support more than 97 languages. Extended Thinking adds configurable background reasoning during a live interaction. Those capability and quality claims are vendor evidence; the durable signal is architectural: voice agents are moving from turn-by-turn chat toward continuous multimodal interaction in which reasoning and tool execution can happen alongside the conversation.',
  source:'Google',sourceType:'Official developer announcement',category:'Agents',format:'Daily brief',date:'2026-09-15',readTime:'5 min',
  url:'https://blog.google/innovation-and-ai/technology/developers-tools/build-real-time-voice-applications-gemini-audio/',verified:'2026-09-16',visual:'developer-blue'
};
const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url);
if(existing>=0)feed[existing]={...feed[existing],...item};else feed.unshift(item);
})();