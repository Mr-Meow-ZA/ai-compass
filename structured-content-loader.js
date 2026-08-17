(()=>{
'use strict';
const nativeAdd=document.addEventListener.bind(document);
const originalAdd=document.addEventListener;
window.AI_COMPASS_DISCOVERY=window.AI_COMPASS_DISCOVERY||{reviewed:'',tools:[],models:[],courses:[],resources:[]};
window.AI_COMPASS_CURRICULUM=window.AI_COMPASS_CURRICULUM||{reviewed:'',levels:[],pathMeta:{}};
window.AI_COMPASS_NEWS_INTELLIGENCE=window.AI_COMPASS_NEWS_INTELLIGENCE||{reviewed:'',method:{title:'',principles:[],note:''}};

// Existing renderers register DOMContentLoaded listeners synchronously. Wrap only that
// event so the stable renderer can remain unchanged while structured JSON loads.
document.addEventListener=function(type,listener,options){
  if(type==='DOMContentLoaded'){
    return nativeAdd(type,event=>{
      Promise.resolve(window.AI_COMPASS_CONTENT_READY).then(()=>listener.call(document,event)).catch(()=>{});
    },options);
  }
  return nativeAdd(type,listener,options);
};

const loadJson=async path=>{
  const response=await fetch(path,{credentials:'same-origin'});
  if(!response.ok)throw new Error(`Could not load ${path} (${response.status})`);
  return response.json();
};

const ready=(async()=>{
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
})();

window.AI_COMPASS_CONTENT_READY=ready.catch(error=>{
  window.AI_COMPASS_CONTENT_ERROR=error;
  console.error('AI Compass structured content failed to load',error);
  throw error;
});

window.AI_COMPASS_CONTENT_READY.then(()=>{document.addEventListener=originalAdd;}).catch(()=>{});
nativeAdd('DOMContentLoaded',()=>{
  window.AI_COMPASS_CONTENT_READY.catch(error=>{
    const app=document.getElementById('app');
    if(app)app.innerHTML=`<main id="main" class="empty-state"><h1>AI Compass could not load its maintained content.</h1><p>${String(error.message||'Unknown content error').replace(/[&<>"']/g,'')}</p><p>Please refresh or try again later.</p></main>`;
  });
});
})();
