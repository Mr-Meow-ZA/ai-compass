'use strict';
const fs=require('fs');
const path=require('path');
const vm=require('vm');
const root=path.resolve(__dirname,'..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const payload={
  manifest:readJson('content/manifest.json'),
  discovery:readJson('content/maintained/discovery.json'),
  curriculum:readJson('content/maintained/curriculum.json'),
  newsIntelligence:readJson('content/maintained/news-intelligence.json'),
  freshness:readJson('content/maintained/freshness.json')
};
const target=path.join(root,payload.manifest.generatedBundle);
const generated=`/* GENERATED FILE — edit content/maintained/*.json and run node scripts/generate-maintained-content.js */\nwindow.AI_COMPASS_MAINTAINED=${JSON.stringify(payload,null,2)};\nwindow.AI_COMPASS_CONTENT_MANIFEST=window.AI_COMPASS_MAINTAINED.manifest;\n`;

if(process.argv.includes('--check')){
  if(!fs.existsSync(target)){
    console.error(`Generated bundle missing: ${path.relative(root,target)}`);
    process.exit(1);
  }
  const context={window:{}};vm.createContext(context);
  try{vm.runInContext(fs.readFileSync(target,'utf8'),context,{filename:path.basename(target)});}catch(error){
    console.error(`Generated bundle cannot execute: ${error.message}`);process.exit(1);
  }
  if(JSON.stringify(context.window.AI_COMPASS_MAINTAINED)!==JSON.stringify(payload)){
    console.error('Generated maintained-content bundle is stale. Run: node scripts/generate-maintained-content.js');
    process.exit(1);
  }
  console.log(`Generated bundle current: ${path.relative(root,target)} (${payload.manifest.sourceCollections.length} structured collections).`);
}else{
  fs.writeFileSync(target,generated);
  console.log(`Generated ${path.relative(root,target)} from structured content sources.`);
}
