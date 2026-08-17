'use strict';
const fs=require('fs');
const vm=require('vm');
const document={addEventListener(){},querySelectorAll(){return[]},getElementById(){return null}};
const context={window:{},document,MutationObserver:class{observe(){}},Intl,Date,URL,console};
vm.createContext(context);
for(const file of [
  'data.js','subscription-refresh.js','news-refresh.js','news-2026-08-13.js','news-intelligence-data.js',
  'knowledge.js','dashboard-guide.js','practical-build-guides.js','infographic-build-guide.js','research-build-guide.js',
  'agentic-build-guides.js','enterprise-ai-builder-guides.js','template-library.js','sector-starter-packs.js','education-starter-pack.js',
  'content.js','enterprise-learning-path.js','curriculum-data.js','reference-refresh-2026-08-14.js','reference-refresh-2026-08-15.js'
])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});

const D=context.window.AI_COMPASS_DATA;
const L=context.window.AI_COMPASS_LIBRARY;
const F=context.window.AI_COMPASS_FEED;
const C=context.window.AI_COMPASS_CURRICULUM;
const I=context.window.AI_COMPASS_NEWS_INTELLIGENCE;
const errors=[];
const slugs=new Set((D?.articles||[]).map(item=>item.slug));
const pathIds=new Set((L?.learningPaths||[]).map(item=>item.id));

if((D?.articles||[]).length<41)errors.push(`Guide preservation failure: expected at least 41 guides, found ${(D?.articles||[]).length}`);
if(!C||C.reviewed!=='2026-08-17'||!Array.isArray(C.levels))errors.push('Curriculum metadata missing or stale');
if((C?.levels||[]).length!==5)errors.push(`Expected five curriculum levels, found ${(C?.levels||[]).length}`);
if(!pathIds.has('ai-power-user'))errors.push('AI Power User path did not load');
const power=(L?.learningPaths||[]).find(item=>item.id==='ai-power-user');
if((power?.steps||[]).length!==6)errors.push('AI Power User path must contain six lessons');
for(const slug of power?.steps||[])if(!slugs.has(slug))errors.push(`AI Power User path references missing guide: ${slug}`);

const assigned=[];
for(const level of C?.levels||[]){
  if(!level.id||!level.number||!level.title||!level.description||!level.readyWhen)errors.push(`Incomplete curriculum level: ${level.id||'unknown'}`);
  if(!Array.isArray(level.skills)||level.skills.length<4)errors.push(`Curriculum level needs at least four skills: ${level.id}`);
  for(const id of level.paths||[]){assigned.push(id);if(!pathIds.has(id))errors.push(`Curriculum references missing path: ${id}`);}
}
for(const id of pathIds){
  const count=assigned.filter(value=>value===id).length;
  if(count!==1)errors.push(`Learning path ${id} must appear in exactly one curriculum level; found ${count}`);
  const meta=C?.pathMeta?.[id];
  if(!meta||!meta.level||!meta.prerequisite||!Array.isArray(meta.outcomes)||meta.outcomes.length<3)errors.push(`Curriculum path metadata incomplete: ${id}`);
  if(meta?.next&&!pathIds.has(meta.next))errors.push(`Curriculum next path missing: ${id} -> ${meta.next}`);
}

if(!I||I.reviewed!=='2026-08-17'||!Array.isArray(I.method?.principles)||I.method.principles.length!==4)errors.push('News intelligence method missing or stale');
if(!Array.isArray(F)||F.length<20)errors.push(`Expected at least 20 curated news items, found ${F?.length||0}`);
let highSignal=0;
for(const item of F||[]){
  const n=item.intelligence;
  if(!n||!n.signal||!n.status||!n.sourceQuality||!n.why||!n.audience||!n.action)errors.push(`News intelligence incomplete: ${item.id}`);
  if(typeof n?.importance!=='number'||n.importance<1||n.importance>5)errors.push(`Invalid news importance: ${item.id}`);
  if((n?.importance||0)>=4)highSignal++;
  if(n?.related&&!slugs.has(n.related)&&!(L?.references||[]).some(ref=>ref.slug===n.related))errors.push(`News intelligence related content missing: ${item.id} -> ${n.related}`);
}
if(highSignal<3)errors.push(`Expected at least three high-signal items, found ${highSignal}`);
for(const id of ['anthropic-claude-watermarking-provenance','openai-atlas-retirement','deepmind-gemini-flash-cyber']){
  const item=(F||[]).find(entry=>entry.id===id);
  if(!item)errors.push(`Maintained news signal missing: ${id}`);
  if((item?.intelligence?.importance||0)<4)errors.push(`Maintained news signal not marked high signal: ${id}`);
}

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Intelligence valid: ${D.articles.length} guides, ${L.learningPaths.length} paths across ${C.levels.length} levels, ${F.length} news items, ${highSignal} high-signal developments.`);