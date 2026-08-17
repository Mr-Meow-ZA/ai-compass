(()=>{
'use strict';
const current=()=>{const raw=(location.hash||'#home').slice(1).split('?')[0];const parts=raw.split('/').filter(Boolean);return{page:parts[0]||'home',arg:parts[1]||''};};
const clearCurrent=()=>{
  const r=current();
  if(r.page==='article'){document.querySelector('.my-guide-engagement')?.remove();document.querySelector('.my-guide-discussion')?.remove();}
  if(r.page==='learn'&&r.arg){document.querySelector('.my-learning-progress')?.remove();document.querySelectorAll('.my-lesson-check').forEach(node=>node.remove());}
};
const polish=()=>{
  const profileShortcut=document.querySelector('.utility-inner a[href="#community/profile"]');
  if(profileShortcut&&profileShortcut.textContent.trim()==='My Compass')profileShortcut.textContent='Profile';
  const engagement=document.querySelector('.my-guide-engagement');
  const articleActions=document.querySelector('.article-actions');
  if(engagement&&articleActions&&engagement.previousElementSibling!==articleActions)articleActions.insertAdjacentElement('afterend',engagement);
};
const refresh=()=>{clearCurrent();setTimeout(()=>{window.dispatchEvent(new Event('hashchange'));setTimeout(polish,220);},30);};
const api=window.AI_COMPASS_MY_COMPASS;
if(api){
  for(const name of ['toggleLike','toggleFollow','setStep']){
    const original=api[name];if(typeof original!=='function'||original.__aiCompassWrapped)continue;
    const wrapped=async(...args)=>{const result=await original(...args);document.dispatchEvent(new CustomEvent('ai-compass-my-updated',{detail:{action:name}}));return result;};
    wrapped.__aiCompassWrapped=true;api[name]=wrapped;
  }
}
document.addEventListener('ai-compass-my-updated',()=>setTimeout(refresh,40));
document.addEventListener('ai-compass-community-auth',()=>{const r=current();if(r.page==='article'||(r.page==='learn'&&r.arg))setTimeout(refresh,30);else setTimeout(polish,60);});
document.addEventListener('DOMContentLoaded',()=>setTimeout(polish,420));
addEventListener('hashchange',()=>setTimeout(polish,420));
})();
