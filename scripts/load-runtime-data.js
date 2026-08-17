'use strict';
const fs=require('fs');
const path=require('path');
const vm=require('vm');
const root=path.resolve(__dirname,'..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));

async function loadRuntimeData({includeNews=false,includeFreshness=false}={}){
  const document={addEventListener(){},querySelectorAll(){return[]},getElementById(){return null}};
  const context={window:{},document,MutationObserver:class{observe(){}},Intl,Date,URL,console,Promise,setTimeout,clearTimeout};
  vm.createContext(context);
  const files=['data.js','subscription-refresh.js'];
  if(includeNews)files.push('news-refresh.js','news-2026-08-13.js');
  files.push(
    'knowledge.js','dashboard-guide.js','practical-build-guides.js','infographic-build-guide.js','research-build-guide.js',
    'agentic-build-guides.js','enterprise-ai-builder-guides.js','template-library.js','sector-starter-packs.js','education-starter-pack.js',
    'content.js','enterprise-learning-path.js','reference-refresh-2026-08-14.js','reference-refresh-2026-08-15.js'
  );
  for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  const manifest=readJson('content/manifest.json');
  const maintained={manifest};
  for(const source of manifest.sourceCollections)maintained[source.runtimeKey]=readJson(source.path);
  context.window.AI_COMPASS_MAINTAINED=maintained;
  context.window.AI_COMPASS_CONTENT_MANIFEST=manifest;
  context.window.AI_COMPASS_CONTENT_READY=Promise.resolve(maintained);
  vm.runInContext(fs.readFileSync(path.join(root,'maintained-content-runtime.js'),'utf8'),context,{filename:'maintained-content-runtime.js'});
  if(includeFreshness)vm.runInContext(fs.readFileSync(path.join(root,'freshness-runtime.js'),'utf8'),context,{filename:'freshness-runtime.js'});
  await context.window.AI_COMPASS_CONTENT_READY;
  return context;
}
module.exports={loadRuntimeData};
