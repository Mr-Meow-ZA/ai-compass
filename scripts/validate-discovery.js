'use strict';
const fs=require('fs');
const vm=require('vm');
const context={window:{}};vm.createContext(context);
for(const file of ['data.js','subscription-refresh.js','knowledge.js','dashboard-guide.js','practical-build-guides.js','infographic-build-guide.js','research-build-guide.js','agentic-build-guides.js','enterprise-ai-builder-guides.js','template-library.js','sector-starter-packs.js','education-starter-pack.js','content.js','enterprise-learning-path.js','reference-refresh-2026-08-14.js','reference-refresh-2026-08-15.js','discovery-data.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const X=context.window.AI_COMPASS_DISCOVERY;
const D=context.window.AI_COMPASS_DATA;
const L=context.window.AI_COMPASS_LIBRARY;
const errors=[];
if(!X)errors.push('AI_COMPASS_DISCOVERY is missing');
if(!D?.articles)errors.push('AI_COMPASS_DATA articles are missing');
if(!L?.learningPaths)errors.push('AI_COMPASS_LIBRARY learning paths are missing');
for(const [name,min] of [['tools',6],['models',6],['courses',6],['resources',8]]){
 const items=X?.[name]||[];if(items.length<min)errors.push(`${name} expected at least ${min}, found ${items.length}`);
 const ids=new Set();for(const item of items){if(!item.id||(!item.name&&!item.title))errors.push(`${name} item missing identity`);if(ids.has(item.id))errors.push(`Duplicate ${name} id: ${item.id}`);ids.add(item.id);}
}
for(const item of [...(X?.tools||[]),...(X?.models||[]),...(X?.courses||[])]){
 if(!/^https:\/\//.test(item.url||''))errors.push(`Invalid url for ${item.id}`);
 if(item.sourceUrl&&!/^https:\/\//.test(item.sourceUrl))errors.push(`Invalid sourceUrl for ${item.id}`);
}
const pathIds=new Set((L?.learningPaths||[]).map(item=>item.id));
for(const c of X?.courses||[]){
 if(typeof c.rating!=='number'||c.rating<1||c.rating>10)errors.push(`Invalid course rating: ${c.id}`);
 if(c.verified!=='2026-08-17')errors.push(`Course verification date missing: ${c.id}`);
 if(!c.why||!c.value||!c.skip||!c.audience)errors.push(`Course editorial review incomplete: ${c.id}`);
 if(!pathIds.has(c.path))errors.push(`Course ${c.id} references missing learning path: ${c.path}`);
}
const articleSlugs=new Set((D?.articles||[]).map(item=>item.slug));
const knownRoutes=new Set(['#repos','#resources','#tools','#models','#courses','#practical','#learn','#guides','#reference','#news','#community']);
for(const r of X?.resources||[]){
 if(!/^#/.test(r.href||'')){errors.push(`Internal resource href invalid: ${r.id}`);continue;}
 if(r.href.startsWith('#article/')){
  const slug=r.href.slice('#article/'.length);if(!articleSlugs.has(slug))errors.push(`Resource ${r.id} references missing guide: ${slug}`);
 }else if(!knownRoutes.has(r.href))errors.push(`Resource ${r.id} references unknown route: ${r.href}`);
}
if((D?.articles||[]).length<41)errors.push(`Guide preservation failure inside discovery validation: found ${(D?.articles||[]).length}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Discovery valid: ${X.tools.length} tools, ${X.models.length} model families, ${X.courses.length} courses, ${X.resources.length} toolkit resources; ${D.articles.length} guides preserved.`);