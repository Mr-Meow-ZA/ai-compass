'use strict';
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'content/manifest.json'),'utf8'));
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const errors=[];
const actual=[...index.matchAll(/<script\s+src="([^"]+)"[^>]*><\/script>/g)].map(match=>match[1]).filter(src=>!/^https?:\/\//.test(src));
const expected=manifest.runtimeModules.map(module=>module.path);
if(JSON.stringify(actual)!==JSON.stringify(expected)){
  const missing=expected.filter(file=>!actual.includes(file));
  const unregistered=actual.filter(file=>!expected.includes(file));
  if(missing.length)errors.push(`Index is missing manifest modules: ${missing.join(', ')}`);
  if(unregistered.length)errors.push(`Index contains unregistered modules: ${unregistered.join(', ')}`);
  if(!missing.length&&!unregistered.length)errors.push('Runtime module order differs from content manifest');
}
for(const module of manifest.runtimeModules)if(!fs.existsSync(path.join(root,module.path)))errors.push(`Runtime module does not exist: ${module.path}`);
const build=index.match(/name="ai-compass-build"\s+content="([^"]+)"/)?.[1];
if(build!==manifest.build)errors.push(`Index build marker ${build||'missing'} does not match manifest ${manifest.build}`);
if(pkg.version!==manifest.release)errors.push(`package.json version ${pkg.version} does not match manifest release ${manifest.release}`);
for(const source of manifest.sourceCollections){
  if(!fs.existsSync(path.join(root,source.path)))errors.push(`Structured source missing: ${source.path}`);
  if(!fs.existsSync(path.join(root,source.schema)))errors.push(`Structured schema missing: ${source.schema}`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Manifest aligned: ${expected.length} runtime modules; release ${manifest.release}; build ${manifest.build}.`);
