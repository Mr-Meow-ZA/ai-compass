(()=>{
'use strict';

const D=window.AI_COMPASS_DATA||{articles:[]};
const GENERATOR='https://gen.pollinations.ai/image/';
const MODEL='flux';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=value=>{let h=2166136261;for(const c of String(value)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return Math.abs(h>>>0)};
const articleForSlug=slug=>D.articles?.find(item=>item.slug===slug);

function promptFor(item){
  const title=String(item?.title||'Practical artificial intelligence guide').replace(/[“”]/g,'');
  const excerpt=String(item?.excerpt||'').replace(/[“”]/g,'');
  return [
    `Premium editorial thumbnail for an article titled: ${title}.`,
    excerpt?`Subject context: ${excerpt}`:'',
    'Create one clear visual metaphor or realistic scene that communicates the specific subject immediately at small thumbnail size.',
    'Professional technology magazine art direction, sophisticated composition, cinematic natural lighting, realistic materials, crisp focal subject, restrained dark blue and warm neutral palette, subtle depth, high-end commercial photography or photoreal editorial illustration.',
    'No text, no letters, no logos, no brand marks, no UI screenshot, no infographic, no vector diagram, no generic glowing brain, no humanoid robot unless robotics is directly relevant, no hologram hands, no cyberpunk neon overload, no visual clutter.',
    '16:9 landscape composition with the important subject kept away from the extreme edges.'
  ].filter(Boolean).join(' ');
}

function generatedUrl(item){
  const prompt=encodeURIComponent(promptFor(item));
  return `${GENERATOR}${prompt}?model=${MODEL}&width=960&height=540&seed=${hash(item?.slug||item?.title||'ai-compass')}&nologo=true&enhance=true`;
}

function replaceFigure(figure,item){
  if(!figure||!item||figure.dataset.generatedGuideVisual===item.slug)return;
  const img=figure.querySelector('img.editorial-photo');
  if(!img)return;
  const original={src:img.src,srcset:img.getAttribute('srcset')||'',sizes:img.getAttribute('sizes')||'',credit:figure.querySelector('.visual-credit')?.innerHTML||''};
  img.removeAttribute('srcset');
  img.removeAttribute('sizes');
  img.src=generatedUrl(item);
  img.alt=`Custom AI-generated editorial thumbnail for ${item.title}`;
  img.dataset.generatedFor=item.slug;
  img.loading='lazy';
  img.decoding='async';
  const credit=figure.querySelector('.visual-credit');
  if(credit)credit.innerHTML='Custom AI-generated editorial image · AI Compass';
  img.addEventListener('error',()=>{
    if(img.dataset.generatedFallback==='1')return;
    img.dataset.generatedFallback='1';
    img.src=original.src;
    if(original.srcset)img.setAttribute('srcset',original.srcset);
    if(original.sizes)img.setAttribute('sizes',original.sizes);
    img.alt=`Fallback editorial photograph for ${item.title}`;
    if(credit)credit.innerHTML=original.credit;
    figure.dataset.generatedGuideVisual='fallback';
  },{once:true});
  figure.dataset.generatedGuideVisual=item.slug;
}

function enhanceGuideCards(root=document){
  root.querySelectorAll?.('.guide-card-link[href^="#article/"]').forEach(link=>{
    const slug=decodeURIComponent(link.getAttribute('href').split('/').pop()||'');
    const item=articleForSlug(slug);
    if(!item)return;
    replaceFigure(link.querySelector('.editorial-photo-frame'),item);
  });
}

function enhanceArticle(root=document){
  const match=(location.hash||'').match(/^#article\/([^?]+)/);
  if(!match)return;
  const item=articleForSlug(decodeURIComponent(match[1]));
  if(!item)return;
  replaceFigure(root.querySelector?.('.article-summary .editorial-photo-frame'),item);
}

let queued=false;
function enhance(root=document){
  if(queued)return;queued=true;
  requestAnimationFrame(()=>{queued=false;enhanceGuideCards(root);enhanceArticle(root)});
}

window.AI_COMPASS_GENERATED_GUIDE_VISUALS={promptFor,generatedUrl};
document.addEventListener('DOMContentLoaded',()=>{
  enhance();
  const app=document.getElementById('app');
  if(app)new MutationObserver(()=>enhance(app)).observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>enhance());
});
})();
