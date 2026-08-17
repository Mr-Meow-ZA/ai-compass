(()=>{
'use strict';
const loadJson=async path=>{
  const response=await fetch(path,{credentials:'same-origin'});
  if(!response.ok)throw new Error(`Could not load ${path} (${response.status})`);
  return response.json();
};

window.AI_COMPASS_CONTENT_READY=(async()=>{
  const manifest=await loadJson('content/manifest.json');
  if(!Array.isArray(manifest.sourceCollections)||!manifest.sourceCollections.length)throw new Error('Content manifest has no source collections');
  const entries=await Promise.all(manifest.sourceCollections.map(async collection=>{
    const value=await loadJson(collection.path);
    return [collection.runtimeKey,value];
  }));
  const maintained={manifest};
  for(const [key,value] of entries)maintained[key]=value;
  window.AI_COMPASS_CONTENT_MANIFEST=manifest;
  window.AI_COMPASS_MAINTAINED=maintained;
  return maintained;
})().catch(error=>{
  window.AI_COMPASS_CONTENT_ERROR=error;
  console.error('AI Compass structured content failed to load',error);
  throw error;
});
})();
