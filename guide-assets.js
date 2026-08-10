(()=>{
'use strict';
const D=window.AI_COMPASS_DATA||{articles:[]};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bySlug=slug=>D.articles.find(item=>item.slug===slug);
const src=slug=>`assets/guides/${encodeURIComponent(slug)}.webp`;
function applyFigure(figure,item){
  if(!figure||!item||figure.dataset.customGuideAsset===item.slug)return;
  const img=figure.querySelector('img');if(!img)return;
  img.src=src(item.slug);img.removeAttribute('srcset');img.removeAttribute('sizes');img.removeAttribute('referrerpolicy');
  img.alt=`AI-generated editorial thumbnail illustrating ${item.title}`;
  img.loading=figure.closest('.article-visual')?'eager':'lazy';img.decoding='async';img.style.objectPosition='50% 50%';
  const credit=figure.querySelector('.visual-credit');if(credit)credit.innerHTML='AI-generated for AI Compass';
  figure.dataset.customGuideAsset=item.slug;
}
function enhance(root=document){
  root.querySelectorAll?.('.guide-card-link[href^="#article/"]').forEach(link=>{const slug=decodeURIComponent(link.getAttribute('href').split('/').pop()||'');const item=bySlug(slug);if(item)applyFigure(link.querySelector('.editorial-photo-frame'),item)});
  const match=(location.hash||'').match(/^#article\/([^?]+)/);if(match){const item=bySlug(decodeURIComponent(match[1]));if(item)applyFigure(root.querySelector?.('.article-summary .editorial-photo-frame'),item)}
}
let queued=false;function queue(root=document){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;enhance(root)})}
document.addEventListener('DOMContentLoaded',()=>{queue();const app=document.getElementById('app');if(app)new MutationObserver(()=>queue(app)).observe(app,{childList:true,subtree:true});window.addEventListener('hashchange',()=>queue())});
window.AI_COMPASS_GUIDE_ASSETS={src};
})();
