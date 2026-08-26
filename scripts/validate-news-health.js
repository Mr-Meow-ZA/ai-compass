'use strict';
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const log=JSON.parse(fs.readFileSync(path.join(root,'content/editorial/news-scan-log.json'),'utf8'));
const ops=JSON.parse(fs.readFileSync(path.join(root,'content/editorial/news-operations.json'),'utf8'));
const errors=[];
const datePattern=/^\d{4}-\d{2}-\d{2}$/;
if(!datePattern.test(log.lastScan||''))errors.push('news-scan-log lastScan must be YYYY-MM-DD');
if(!['publish','no-publish'].includes(log.result))errors.push('news-scan-log result must be publish or no-publish');
if(!Array.isArray(log.publishedIds))errors.push('news-scan-log publishedIds must be an array');
if(!Array.isArray(ops.primarySources)||ops.primarySources.length<8)errors.push('news operations must retain a broad primary-source registry');
if(ops.readerLanguage!=='English')errors.push('reader-facing news language must remain English');
const nowRaw=process.env.AIC_NOW||new Date().toISOString().slice(0,10);
const now=new Date(`${nowRaw}T12:00:00Z`);const last=new Date(`${log.lastScan}T12:00:00Z`);
const age=Math.floor((now-last)/86400000);
if(Number.isFinite(age)&&age<0)errors.push('news-scan-log lastScan is in the future');
if(process.env.AIC_REQUIRE_TODAY==='1'){
  if(log.lastScan!==nowRaw)errors.push(`Daily news scan is stale: expected ${nowRaw}, found ${log.lastScan}`);
}else if(Number.isFinite(age)&&age>2)errors.push(`News scan is more than two days old: ${log.lastScan}`);
if(log.result==='no-publish'&&String(log.notes||'').trim().length<20)errors.push('No-publish scans need an editorial note explaining that the scan completed');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`News health OK: last scan ${log.lastScan}; result ${log.result}; ${ops.primarySources.length} primary-source channels registered.`);
