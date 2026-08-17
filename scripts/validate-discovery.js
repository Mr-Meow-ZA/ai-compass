'use strict';
const {loadRuntimeData}=require('./load-runtime-data');

(async()=>{
const context=await loadRuntimeData();
const X=context.window.AI_COMPASS_DISCOVERY;
const D=context.window.AI_COMPASS_DATA;
const L=context.window.AI_COMPASS_LIBRARY;
const errors=[];
if(!X)errors.push('AI_COMPASS_DISCOVERY is missing');
if(!D?.articles)errors.push('AI_COMPASS_DATA articles are missing');
if(!L?.learningPaths)errors.push('AI_COMPASS_LIBRARY learning paths are missing');
if(!/^\d{4}-\d{2}-\d{2}$/.test(X?.reviewed||''))errors.push('Discovery collection review date is invalid');
for(const [name,min] of [['tools',6],['models',6],['courses',6],['resources',8]]){
 const items=X?.[name]||[];if(items.length<min)errors.push(`${name} expected at least ${min}, found ${items.length}`);
 const ids=new Set();for(const item of items){if(!item.id||(!item.name&&!item.title))errors.push(`${name} item missing identity`);if(ids.has(item.id))errors.push(`Duplicate ${name} id: ${item.id}`);ids.add(item.id);if(!/^\d{4}-\d{2}-\d{2}$/.test(item.reviewed||''))errors.push(`${name} item missing structured review date: ${item.id}`);}
}
for(const item of [...(X?.tools||[]),...(X?.models||[]),...(X?.courses||[])]){
 if(!/^https:\/\//.test(item.url||''))errors.push(`Invalid url for ${item.id}`);
 if(item.sourceUrl&&!/^https:\/\//.test(item.sourceUrl))errors.push(`Invalid sourceUrl for ${item.id}`);
}
const pathIds=new Set((L?.learningPaths||[]).map(item=>item.id));
for(const c of X?.courses||[]){
 if(typeof c.rating!=='number'||c.rating<1||c.rating>10)errors.push(`Invalid course rating: ${c.id}`);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(c.verified||''))errors.push(`Course verification date invalid: ${c.id}`);
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
})().catch(error=>{console.error(error);process.exit(1)});
