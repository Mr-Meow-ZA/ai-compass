(()=>{
'use strict';
const clearCurrent=()=>{
  const raw=(location.hash||'#home').slice(1).split('?')[0];const parts=raw.split('/').filter(Boolean);const page=parts[0]||'home';
  if(page==='article'){document.querySelector('.my-guide-engagement')?.remove();document.querySelector('.my-guide-discussion')?.remove();}
  if(page==='learn'&&parts[1]){document.querySelector('.my-learning-progress')?.remove();document.querySelectorAll('.my-lesson-check').forEach(node=>node.remove());}
};
const refresh=()=>{clearCurrent();setTimeout(()=>window.dispatchEvent(new Event('hashchange')),30);};
const api=window.AI_COMPASS_MY_COMPASS;
if(api){
  for(const name of ['toggleLike','toggleFollow','setStep']){
    const original=api[name];if(typeof original!=='function'||original.__aiCompassWrapped)continue;
    const wrapped=async(...args)=>{const result=await original(...args);document.dispatchEvent(new CustomEvent('ai-compass-my-updated',{detail:{action:name}}));return result;};
    wrapped.__aiCompassWrapped=true;api[name]=wrapped;
  }
}
document.addEventListener('ai-compass-my-updated',()=>setTimeout(refresh,40));
document.addEventListener('ai-compass-community-auth',()=>{const r=(location.hash||'').slice(1);if(r.startsWith('article/')||r.startsWith('learn/'))setTimeout(refresh,30);});
})();
