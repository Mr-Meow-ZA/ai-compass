(()=>{
'use strict';
const nativeAdd=document.addEventListener.bind(document);
window.AI_COMPASS_DISCOVERY=window.AI_COMPASS_DISCOVERY||{reviewed:'',tools:[],models:[],courses:[],resources:[]};
window.AI_COMPASS_CURRICULUM=window.AI_COMPASS_CURRICULUM||{reviewed:'',levels:[],pathMeta:{}};
window.AI_COMPASS_NEWS_INTELLIGENCE=window.AI_COMPASS_NEWS_INTELLIGENCE||{reviewed:'',method:{title:'',principles:[],note:''}};

// Existing renderers register DOMContentLoaded listeners synchronously. Keep this
// wrapper in place for the lifetime of the page so every renderer waits for the
// final AI_COMPASS_CONTENT_READY chain, including runtime transformation and
// freshness policy application — not merely the JSON fetch itself.
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

nativeAdd('DOMContentLoaded',()=>{
  window.AI_COMPASS_CONTENT_READY.catch(error=>{
    const app=document.getElementById('app');
    if(app)app.innerHTML=`<main id="main" class="empty-state"><h1>AI Compass could not load its maintained content.</h1><p>${String(error.message||'Unknown content error').replace(/[&<>"']/g,'')}</p><p>Please refresh or try again later.</p></main>`;
  });
});
})();
