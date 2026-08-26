'use strict';
const fs=require('fs');
const vm=require('vm');
const document={addEventListener(){},querySelectorAll(){return[]},getElementById(){return null}};
const context={window:{},document,MutationObserver:class{observe(){}},Intl,Date,URL,console};
vm.createContext(context);
for(const file of ['data.js','news-2026-08-26-xiaomi-ai-cube.js','news-2026-08-26-daily-brief.js','news-refresh.js','news-2026-08-13.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const feed=context.window.AI_COMPASS_FEED;
const errors=[];
if(!Array.isArray(feed))errors.push('AI_COMPASS_FEED is missing');
const ids=new Set();
const urls=new Set();
for(const item of feed||[]){
  if(!item.id||!item.title||!item.source||!item.sourceType||!item.date||!item.url)errors.push(`Incomplete news metadata: ${item.id||item.title||'unknown'}`);
  if(ids.has(item.id))errors.push(`Duplicate news id: ${item.id}`); else ids.add(item.id);
  const url=(item.url||'').replace(/\/$/,'');
  if(!/^https:\/\//.test(url))errors.push(`Invalid news URL: ${item.id}`);
  if(urls.has(url))errors.push(`Duplicate news URL: ${url}`); else urls.add(url);
  if(item.verified&&!/^\d{4}-\d{2}-\d{2}$/.test(item.verified))errors.push(`Invalid verified date: ${item.id}`);
  if(item.thumbnail){
    if(!/^https:\/\//.test(item.thumbnail))errors.push(`Non-HTTPS thumbnail: ${item.id}`);
    if(!item.thumbnailAlt||!item.thumbnailCredit||!item.thumbnailSource)errors.push(`Incomplete thumbnail provenance: ${item.id}`);
  }
}
const provenance=(feed||[]).find(item=>item.id==='anthropic-claude-watermarking-provenance');
if(!provenance)errors.push('Anthropic provenance news item is missing');
if(provenance?.source!=='Anthropic')errors.push('Anthropic provenance item is not primary-source led');
if(provenance?.url!=='https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content')errors.push('Anthropic provenance item does not use the canonical official source');
if(provenance?.verified!=='2026-08-14')errors.push('Anthropic provenance item verification date is stale');
const xiaomi=(feed||[]).find(item=>item.id==='xiaomi-ai-cube-prototype');
if(!xiaomi)errors.push('Xiaomi AI Cube news item is missing');
if(xiaomi?.url!=='https://www.notebookcheck.net/Xiaomi-unveils-AI-Cube-mini-PC-with-three-Xring-chips-and-150-W-performance.1376717.0.html')errors.push('Xiaomi AI Cube reader-facing link must use the vetted English Notebookcheck source');
if(xiaomi?.contextUrl!=='https://weibo.com/2/detail/5335498025601317')errors.push('Xiaomi AI Cube item must retain the Xiaomi / Lei Jun primary source');
if(!/primary source, Chinese/i.test(xiaomi?.contextSource||''))errors.push('Xiaomi AI Cube primary-source language label is missing');
if(xiaomi?.verified!=='2026-08-26')errors.push('Xiaomi AI Cube verification date is stale');
const daily={
  'gemini-3-5-transcribe':'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/',
  'openai-admin-plugin-work-codex':'https://openai.com/index/introducing-admin-plugin/',
  'openai-jalapeno-inference-chip':'https://openai.com/index/jalapeno-first-results/'
};
for(const [id,url] of Object.entries(daily)){
  const item=(feed||[]).find(entry=>entry.id===id);
  if(!item)errors.push(`Daily Brief missing: ${id}`);
  if(item?.url!==url)errors.push(`Daily Brief does not use its canonical official source: ${id}`);
  if(item?.format!=='Daily brief')errors.push(`Daily Brief format label is missing: ${id}`);
  if(item?.verified!=='2026-08-26')errors.push(`Daily Brief verification date is stale: ${id}`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`News valid: ${feed.length} items; English-reader, primary-source and Daily Brief contracts verified.`);
