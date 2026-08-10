(()=>{
'use strict';

const F=window.AI_COMPASS_FEED||[];
const V=window.AI_COMPASS_VISUALS;
if(!V||typeof V.photoFor!=='function'||typeof V.picture!=='function')return;

const normalise=value=>{
  try{
    const u=new URL(String(value||''),location.href);
    u.hash='';
    return u.href.replace(/\/$/,'');
  }catch{return String(value||'').trim().replace(/\/$/,'')}
};
const byUrl=new Map(F.filter(item=>item.url).map(item=>[normalise(item.url),item]));
const byTitle=new Map(F.filter(item=>item.title).map(item=>[item.title.trim(),item]));

function itemFor(link){
  return byUrl.get(normalise(link.href))||byTitle.get((link.textContent||'').trim())||null;
}

function ensureNewsVisuals(root=document){
  root.querySelectorAll?.('.news-item').forEach(card=>{
    const link=card.querySelector('h3 a[href]');
    const content=link?.closest('h3')?.parentElement;
    const item=link?itemFor(link):null;
    if(!content||!item)return;

    const official=content.querySelector('.news-thumbnail:not(.editorial-fallback)');
    const fallback=content.querySelector('.news-thumbnail.editorial-fallback');

    if(official&&!official.hidden){
      fallback?.remove();
      card.dataset.visualCoverage='official';
      return;
    }
    if(official?.hidden)official.remove();
    if(fallback){
      card.dataset.visualCoverage='photo';
      return;
    }

    const figure=document.createElement('figure');
    figure.className='news-thumbnail editorial-fallback';
    figure.dataset.editorialFallback='photo';
    const photo=V.photoFor(item.id||item.url,item.category);
    figure.innerHTML=`<div class="editorial-visual">${V.picture(photo,`Contextual editorial photograph for ${item.title}`,'news-photo')}</div>`;
    content.insertBefore(figure,content.firstChild);
    card.dataset.visualCoverage='photo';
  });
}

let queued=false;
function queue(root=document){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;ensureNewsVisuals(root)});
}

document.addEventListener('DOMContentLoaded',()=>{
  queue();
  const app=document.getElementById('app');
  if(app)new MutationObserver(()=>queue(app)).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
});
})();
