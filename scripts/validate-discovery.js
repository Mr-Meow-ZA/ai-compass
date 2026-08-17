'use strict';
const fs=require('fs');
const vm=require('vm');
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync('discovery-data.js','utf8'),context,{filename:'discovery-data.js'});
const X=context.window.AI_COMPASS_DISCOVERY;const errors=[];
if(!X)errors.push('AI_COMPASS_DISCOVERY is missing');
for(const [name,min] of [['tools',6],['models',6],['courses',6],['resources',8]]){
 const items=X?.[name]||[];if(items.length<min)errors.push(`${name} expected at least ${min}, found ${items.length}`);
 const ids=new Set();for(const item of items){if(!item.id||!item.name&&!item.title)errors.push(`${name} item missing identity`);if(ids.has(item.id))errors.push(`Duplicate ${name} id: ${item.id}`);ids.add(item.id);}
}
for(const item of [...(X?.tools||[]),...(X?.models||[]),...(X?.courses||[])]){
 for(const key of ['url'])if(!/^https:\/\//.test(item[key]||''))errors.push(`Invalid ${key} for ${item.id}`);
 if(item.sourceUrl&&!/^https:\/\//.test(item.sourceUrl))errors.push(`Invalid sourceUrl for ${item.id}`);
}
for(const c of X?.courses||[]){if(typeof c.rating!=='number'||c.rating<1||c.rating>10)errors.push(`Invalid course rating: ${c.id}`);if(c.verified!=='2026-08-17')errors.push(`Course verification date missing: ${c.id}`);if(!c.why||!c.value||!c.skip||!c.audience)errors.push(`Course editorial review incomplete: ${c.id}`);}
for(const r of X?.resources||[])if(!/^#/.test(r.href||''))errors.push(`Internal resource href invalid: ${r.id}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Discovery valid: ${X.tools.length} tools, ${X.models.length} model families, ${X.courses.length} courses, ${X.resources.length} toolkit resources.`);
