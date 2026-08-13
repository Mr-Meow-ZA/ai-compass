'use strict';
const fs=require('fs');
const vm=require('vm');
const context={window:{}};
vm.createContext(context);
for(const file of ['data.js','subscription-refresh.js','knowledge.js','template-library.js','sector-starter-packs.js','education-starter-pack.js','dashboard-guide.js','content.js']){
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}
const D=context.window.AI_COMPASS_DATA;
const guide=D?.articles?.find(item=>item.slug==='create-professional-dashboards-with-ai');
if(!guide)throw new Error('Dashboard guide did not load');
if(D.articles.length<29)throw new Error(`Guide preservation failure: expected at least 29 guides, found ${D.articles.length}`);
if((guide.sections||[]).length<9)throw new Error('Dashboard guide does not meet the depth requirement');
const html=guide.sections.map(section=>section.html||'').join('\n');
for(const token of ['dashboard-gallery','dashboard-compare','phone-frame','dashboard-steps']){
  if(!html.includes(token))throw new Error(`Dashboard visual contract missing: ${token}`);
}
if((guide.sources||[]).length<5)throw new Error('Dashboard guide source set is incomplete');
console.log(`Dashboard guide OK: ${guide.sections.length} sections, ${guide.sources.length} sources, ${D.articles.length} guides preserved.`);
