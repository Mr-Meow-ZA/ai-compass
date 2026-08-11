(()=>{
'use strict';
const D=window.AI_COMPASS_DATA||{articles:[]};
const bySlug=slug=>D.articles.find(item=>item.slug===slug);
const MANIFEST_URL='https://lnmgieielbqqqvboonzj.supabase.co/functions/v1/ai-compass-admin?action=manifest';
let overrides=new Map();

const localSrc=slug=>`assets/guides/${encodeURIComponent(slug)}.webp`;
const src=slug=>overrides.get(slug)?.public_url||localSrc(slug);

function applyFigure(figure,item){
  if(!figure||!item)return;
  const img=figure.querySelector('img');if(!img)return;
  const desired=src(item.slug);
  if(figure.dataset.customGuideAsset===item.slug&&figure.dataset.customGuideSrc===desired)return;
  const fallback=localSrc(item.slug);
  const hasOverride=overrides.has(item.slug);
  const credit=figure.querySelector('.visual-credit');
  img.onerror=()=>{
    if(img.getAttribute('src')!==fallback){
      overrides.delete(item.slug);
      img.src=fallback;
      figure.dataset.customGuideSrc=fallback;
      if(credit)credit.textContent='AI-generated for AI Compass';
    }
  };
  img.src=desired;img.removeAttribute('srcset');img.removeAttribute('sizes');img.removeAttribute('referrerpolicy');
  img.alt=`Guide thumbnail illustrating ${item.title}`;
  img.loading=figure.closest('.article-visual')?'eager':'lazy';img.decoding='async';img.style.objectPosition='50% 50%';
  if(credit)credit.textContent=hasOverride?'AI Compass guide artwork':'AI-generated for AI Compass';
  figure.dataset.customGuideAsset=item.slug;
  figure.dataset.customGuideSrc=desired;
}
function enhance(root=document){
  root.querySelectorAll?.('.guide-card-link[href^="#article/"]').forEach(link=>{
    const slug=decodeURIComponent(link.getAttribute('href').split('/').pop()||'');
    const item=bySlug(slug);if(item)applyFigure(link.querySelector('.editorial-photo-frame'),item);
  });
  const match=(location.hash||'').match(/^#article\/([^?]+)/);
  if(match){const item=bySlug(decodeURIComponent(match[1]));if(item)applyFigure(root.querySelector?.('.article-summary .editorial-photo-frame'),item)}
}
async function refreshOverrides(){
  try{
    const res=await fetch(MANIFEST_URL,{cache:'no-store',credentials:'omit'});
    if(!res.ok)return false;
    const data=await res.json();
    overrides=new Map((data.images||[]).filter(x=>x&&x.slug&&x.public_url).map(x=>[x.slug,x]));
    enhance(document);return true;
  }catch{return false;}
}
let queued=false;function queue(root=document){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;enhance(root)})}
document.addEventListener('DOMContentLoaded',()=>{
  queue();refreshOverrides();
  const app=document.getElementById('app');if(app)new MutationObserver(()=>queue(app)).observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>queue());
});
window.AI_COMPASS_GUIDE_ASSETS={src,refresh:refreshOverrides};
})();