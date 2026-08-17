'use strict';
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const errors=[];

function validate(value,schema,at='$'){
  if(!schema||typeof schema!=='object')return;
  if(schema.type){
    const ok=schema.type==='array'?Array.isArray(value):schema.type==='object'?value!==null&&typeof value==='object'&&!Array.isArray(value):schema.type==='number'?typeof value==='number'&&Number.isFinite(value):typeof value===schema.type;
    if(!ok){errors.push(`${at}: expected ${schema.type}`);return;}
  }
  if(schema.enum&&!schema.enum.includes(value))errors.push(`${at}: value ${JSON.stringify(value)} is not allowed`);
  if(typeof value==='string'&&schema.pattern&&!new RegExp(schema.pattern).test(value))errors.push(`${at}: value does not match ${schema.pattern}`);
  if(Array.isArray(value)){
    if(schema.minItems!=null&&value.length<schema.minItems)errors.push(`${at}: expected at least ${schema.minItems} items, found ${value.length}`);
    if(schema.items)value.forEach((item,index)=>validate(item,schema.items,`${at}[${index}]`));
  }
  if(value!==null&&typeof value==='object'&&!Array.isArray(value)){
    for(const key of schema.required||[])if(value[key]===undefined||value[key]===null||value[key]==='')errors.push(`${at}.${key}: required value missing`);
    for(const [key,childSchema] of Object.entries(schema.properties||{}))if(value[key]!==undefined)validate(value[key],childSchema,`${at}.${key}`);
  }
}

function unique(items,key,label){
  const seen=new Set();
  for(const item of items||[]){const value=item?.[key];if(seen.has(value))errors.push(`Duplicate ${label}: ${value}`);seen.add(value);}
}

const manifest=readJson('content/manifest.json');
validate(manifest,readJson('content/schemas/manifest.schema.json'),'manifest');
unique(manifest.sourceCollections,'id','source collection id');
unique(manifest.sourceCollections,'runtimeKey','source collection runtime key');
unique(manifest.sourceCollections,'path','source collection path');
unique(manifest.runtimeModules,'path','runtime module path');
unique(manifest.collections,'id','manifest collection id');

const structured={};
for(const source of manifest.sourceCollections){
  for(const file of [source.path,source.schema])if(!fs.existsSync(path.join(root,file)))errors.push(`Manifest references missing file: ${file}`);
  if(!fs.existsSync(path.join(root,source.path))||!fs.existsSync(path.join(root,source.schema)))continue;
  const value=readJson(source.path);const schema=readJson(source.schema);validate(value,schema,source.id);structured[source.runtimeKey]=value;
}

const discovery=structured.discovery||{};
for(const key of ['tools','models','courses','resources'])unique(discovery[key],'id',`${key} id`);
for(const item of [...(discovery.tools||[]),...(discovery.models||[]),...(discovery.courses||[])]){
  if(item.url&&!/^https:\/\//.test(item.url))errors.push(`Structured discovery URL must use HTTPS: ${item.id}`);
  if(item.sourceUrl&&!/^https:\/\//.test(item.sourceUrl))errors.push(`Structured discovery source URL must use HTTPS: ${item.id}`);
}
for(const course of discovery.courses||[])if(course.rating<1||course.rating>10)errors.push(`Course rating outside 1–10: ${course.id}`);

const curriculum=structured.curriculum||{};
unique(curriculum.levels,'id','curriculum level id');
const assigned=(curriculum.levels||[]).flatMap(level=>level.paths||[]);
for(const pathId of Object.keys(curriculum.pathMeta||{})){
  const count=assigned.filter(id=>id===pathId).length;if(count!==1)errors.push(`Structured curriculum path ${pathId} must appear in exactly one level; found ${count}`);
}
if(curriculum.powerUserPath?.id!=='ai-power-user')errors.push('Structured curriculum power-user path id changed unexpectedly');

const news=structured.newsIntelligence||{};
for(const [id,item] of Object.entries(news.explicit||{})){
  if(typeof item.importance!=='number'||item.importance<1||item.importance>5)errors.push(`News intelligence importance invalid: ${id}`);
  if(!item.why||!item.audience||!item.action)errors.push(`News intelligence analysis incomplete: ${id}`);
}

const freshness=structured.freshness||{};
for(const [name,rules] of Object.entries(freshness.classes||{})){
  if(typeof rules.reviewEveryDays!=='number'||typeof rules.warnAfterDays!=='number'||rules.warnAfterDays>=rules.reviewEveryDays)errors.push(`Freshness class thresholds invalid: ${name}`);
}
for(const [collection,className] of Object.entries(freshness.collectionDefaults||{}))if(!freshness.classes?.[className])errors.push(`Unknown freshness class ${className} for ${collection}`);
for(const [slug,className] of Object.entries(freshness.guideOverrides||{}))if(!freshness.classes?.[className])errors.push(`Unknown guide freshness class ${className} for ${slug}`);

const legacy=['discovery-data.js','curriculum-data.js','news-intelligence-data.js'];
for(const file of legacy){
  if(fs.existsSync(path.join(root,file)))errors.push(`Superseded maintained data module must not reappear: ${file}`);
  if(manifest.runtimeModules.some(module=>module.path===file))errors.push(`Legacy maintained data module remains registered: ${file}`);
}

const readinessDependents=['site-evolution.js','learning-intelligence.js','news-intelligence.js','freshness-ui.js'];
for(const file of readinessDependents){
  const source=fs.readFileSync(path.join(root,file),'utf8');
  if(!source.includes('AI_COMPASS_CONTENT_READY'))errors.push(`Structured-content presentation module does not wait for readiness: ${file}`);
}

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Structured content valid: ${manifest.sourceCollections.length} source collections, ${manifest.runtimeModules.length} runtime modules, ${manifest.collections.length} registered content collections; readiness guards present.`);