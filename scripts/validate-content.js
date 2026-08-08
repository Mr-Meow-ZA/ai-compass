const fs=require('fs');
const vm=require('vm');
const context={window:{}};
vm.createContext(context);
for(const file of ['data.js','knowledge.js','template-library.js','sector-starter-packs.js','content.js']){
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}
const D=context.window.AI_COMPASS_DATA;
const L=context.window.AI_COMPASS_LIBRARY;
const errors=[];
if(!D||!Array.isArray(D.articles))errors.push('AI_COMPASS_DATA.articles is missing');
if(!L||!Array.isArray(L.learningPaths))errors.push('AI_COMPASS_LIBRARY.learningPaths is missing');
const slugs=new Set();
for(const article of D.articles||[]){
  if(!article.slug||!article.title||!article.excerpt)errors.push(`Incomplete article metadata: ${article.slug||article.title||'unknown'}`);
  if(slugs.has(article.slug))errors.push(`Duplicate article slug: ${article.slug}`);
  slugs.add(article.slug);
  if(!Array.isArray(article.sections)||article.sections.length<2)errors.push(`Article needs at least two sections: ${article.slug}`);
  if(!Array.isArray(article.sources)||article.sources.length===0)errors.push(`Article has no sources: ${article.slug}`);
  for(const source of article.sources||[]){
    if(!/^https:\/\//.test(source.url||''))errors.push(`Invalid source URL in ${article.slug}: ${source.url||'missing'}`);
  }
}
for(const path of L.learningPaths||[]){
  if(!path.steps?.length)errors.push(`Learning path has no steps: ${path.id}`);
  for(const slug of path.steps||[])if(!slugs.has(slug))errors.push(`Learning path ${path.id} references missing article ${slug}`);
}
for(const tip of L.tips||[])if(!slugs.has(tip.related))errors.push(`Tip ${tip.id} references missing article ${tip.related}`);
const terms=new Set();
for(const item of L.references||[]){
  const key=(item.term||'').toLowerCase();
  if(!key)errors.push('Reference term is missing');
  if(terms.has(key))errors.push(`Duplicate reference term: ${item.term}`);
  terms.add(key);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Content valid: ${D.articles.length} guides, ${L.learningPaths.length} paths, ${L.tips.length} tips, ${L.references.length} reference terms.`);
