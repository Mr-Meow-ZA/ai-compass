(()=>{
'use strict';

const D=window.AI_COMPASS_DATA||{articles:[]};
const F=window.AI_COMPASS_FEED||[];

/*
  AI Compass visual library.
  Images are deliberately photographic/editorial rather than synthetic diagrams.
  Free Unsplash imagery is used with visible attribution even where attribution is optional.
  Official publisher imagery in news-refresh.js still takes precedence for news stories.
*/
const photos={
  business:{
    base:'https://images.unsplash.com/photo-1707902665498-a202981fb5ac',
    source:'https://unsplash.com/photos/LNnmSumlwO4',
    credit:'Jakub Żerdzicki',
    alt:'Hands working with a notebook, calculator and laptop on a business desk',
    position:'50% 54%'
  },
  team:{
    base:'https://images.unsplash.com/photo-1521737711867-e3b97375f902',
    source:'https://unsplash.com/s/photos/team-meeting',
    credit:'Annie Spratt / Unsplash',
    alt:'Colleagues gathered around a table during a working session',
    position:'50% 48%'
  },
  education:{
    base:'https://images.unsplash.com/photo-1509062522246-3755977927d7',
    source:'https://unsplash.com/photos/zFSo6bnZJTw',
    credit:'Quilia',
    alt:'Teacher presenting to students in a classroom',
    position:'50% 44%'
  },
  coding:{
    base:'https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338',
    source:'https://unsplash.com/photos/vWJtYRfE_rw',
    credit:'Ibrahim Yusuf',
    alt:'Developer working on code at a laptop',
    position:'50% 50%'
  },
  automation:{
    base:'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1',
    source:'https://unsplash.com/photos/kE0JmtbvXxM',
    credit:'ZHENYU LUO',
    alt:'Industrial robotic equipment in a modern manufacturing environment',
    position:'50% 48%'
  },
  infrastructure:{
    base:'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee',
    source:'https://unsplash.com/photos/2JJ3wBHu4_0',
    credit:'Kevin Ache',
    alt:'Professional server racks and network equipment in a data centre',
    position:'50% 50%'
  },
  security:{
    base:'https://images.unsplash.com/photo-1667264501379-c1537934c7ab',
    source:'https://unsplash.com/photos/3Nwt6w-KU3E',
    credit:'Kier in Sight Archives',
    alt:'Dense server and network infrastructure representing security and reliability',
    position:'50% 50%'
  },
  research:{
    base:'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
    source:'https://unsplash.com/s/photos/library',
    credit:'Unsplash',
    alt:'Rows of books in a large research library',
    position:'50% 46%'
  },
  governance:{
    base:'https://unsplash.com/photos/yCdPU73kGSc/download?force=true',
    source:'https://unsplash.com/s/photos/scales-of-justice',
    credit:'Tingey Injury Law Firm / Unsplash',
    alt:'Lady Justice sculpture holding balanced scales',
    position:'55% 38%',
    direct:true
  }
};

const categoryPhoto={
  'getting-started':'business',
  workflows:'team',
  models:'infrastructure',
  agents:'automation',
  'open-source':'coding',
  research:'research',
  education:'education',
  safety:'security',
  products:'coding',
  work:'team',
  coding:'coding',
  society:'team',
  events:'team',
  video:'coding',
  default:'business'
};

const slugPhoto={
  'small-business-ai-starter-pack':'business',
  'operations-ai-starter-pack':'automation',
  'education-ai-starter-pack':'education',
  'ai-governance-starter-kit':'governance',
  'reusable-prompt-template-library':'coding',
  'prompting-for-reliable-results':'coding',
  'automation-workflow-or-agent':'automation',
  'choose-your-first-ai-subscription':'business',
  'evaluate-ai-output-scorecard':'research',
  'ai-for-documents-spreadsheets-meetings':'team',
  'ai-news-signal-not-noise':'research'
};

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function imageUrl(photo,width=960){
  if(!photo||!photo.base)return'';
  if(photo.direct)return photo.base;
  const join=photo.base.includes('?')?'&':'?';
  return `${photo.base}${join}auto=format&fit=crop&w=${width}&q=84`;
}

function photoFor(input,category){
  const slug=typeof input==='string'?input:input?.slug||input?.id||'';
  const cat=String(category||input?.category||'default').toLowerCase();
  const key=slugPhoto[slug]||categoryPhoto[cat]||categoryPhoto.default;
  return {...photos[key],key};
}

function picture(photo,alt='',className='',eager=false){
  const p=photo||photos.business;
  const effectiveAlt=alt||p.alt||'Editorial photograph';
  const src=imageUrl(p,960);
  const srcset=p.direct?'':`${imageUrl(p,640)} 640w, ${imageUrl(p,960)} 960w, ${imageUrl(p,1400)} 1400w`;
  return `<figure class="editorial-photo-frame ${esc(className)}" data-photo-key="${esc(p.key||'photo')}"><img class="editorial-photo" src="${esc(src)}"${srcset?` srcset="${esc(srcset)}" sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 420px"`:''} alt="${esc(effectiveAlt)}" loading="${eager?'eager':'lazy'}" decoding="async" fetchpriority="${eager?'high':'auto'}" style="object-position:${esc(p.position||'50% 50%')}" referrerpolicy="no-referrer"><figcaption class="visual-credit">Photo: <a href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">${esc(p.credit)}</a></figcaption></figure>`;
}

function articleForSlug(slug){return D.articles?.find(item=>item.slug===slug)}
function normalise(value){try{const u=new URL(String(value||''),location.href);u.hash='';return u.href.replace(/\/$/,'')}catch{return String(value||'').trim().replace(/\/$/,'')}}
function feedForUrl(url){const clean=normalise(url);return F.find(item=>normalise(item.url)===clean)}

function enhanceGuides(root=document){
  root.querySelectorAll?.('.guide-card-link[href^="#article/"]').forEach(link=>{
    if(link.dataset.visualEnhanced)return;
    const slug=decodeURIComponent(link.getAttribute('href').split('/').pop()||'');
    const item=articleForSlug(slug);
    if(!item)return;
    const wrap=document.createElement('div');
    wrap.className='editorial-visual guide-visual';
    wrap.innerHTML=picture(photoFor(item),`Photo selected for ${item.title}`,'guide-photo');
    const top=link.querySelector('.guide-card-top');
    if(top)link.insertBefore(wrap,top);else link.prepend(wrap);
    link.dataset.visualEnhanced='photo';
  });
}

function fallbackNewsVisual(content,item){
  if(content.querySelector('.news-thumbnail:not([hidden])'))return;
  const figure=document.createElement('figure');
  figure.className='news-thumbnail editorial-fallback';
  figure.dataset.editorialFallback='photo';
  const p=photoFor(item.id||item.url,item.category);
  figure.innerHTML=`<div class="editorial-visual">${picture(p,`Contextual editorial photograph for ${item.title}`,'news-photo')}</div>`;
  content.insertBefore(figure,content.firstChild);
}

function enhanceNews(root=document){
  root.querySelectorAll?.('.news-item h3 a[href]').forEach(link=>{
    const item=feedForUrl(link.href);
    if(!item)return;
    const content=link.closest('h3')?.parentElement;
    if(!content)return;
    const external=content.querySelector('.news-thumbnail:not(.editorial-fallback)');
    if(item.thumbnail&&external&&!external.hidden)return;
    if(item.thumbnail&&!external)return;
    if(external?.hidden)external.remove();
    fallbackNewsVisual(content,item);
  });
}

function enhanceArticle(root=document){
  const match=(location.hash||'').match(/^#article\/([^?]+)/);
  if(!match)return;
  const slug=decodeURIComponent(match[1]);
  const item=articleForSlug(slug);
  const summary=root.querySelector?.('.article-summary');
  if(!item||!summary||summary.dataset.visualEnhanced)return;
  const visual=document.createElement('div');
  visual.className='editorial-visual article-visual';
  visual.innerHTML=picture(photoFor(item),`Editorial photograph for ${item.title}`,'article-photo',true);
  summary.prepend(visual);
  summary.dataset.visualEnhanced='photo';
}

function enhancePaths(root=document){
  root.querySelectorAll?.('.path-card').forEach((card,index)=>{
    if(card.dataset.visualEnhanced)return;
    const intro=card.querySelector('.path-intro');
    const title=intro?.querySelector('h2')?.textContent||`Learning path ${index+1}`;
    if(!intro)return;
    const visual=document.createElement('div');
    visual.className='editorial-visual path-visual';
    visual.innerHTML=picture(photos[index%2?'team':'business'],`Editorial photograph for ${title}`,'path-photo');
    intro.prepend(visual);
    card.dataset.visualEnhanced='photo';
  });
}

function enhanceHero(root=document){
  const panel=root.querySelector?.('.hero-panel');
  if(!panel||panel.dataset.visualEnhanced)return;
  const visual=document.createElement('div');
  visual.className='editorial-visual hero-photo';
  visual.innerHTML=picture({...photos.team,key:'team'},'People collaborating around a table','hero-photo-frame',true);
  panel.prepend(visual);
  panel.dataset.visualEnhanced='photo';
}

let queued=false;
function enhance(root=document){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{
    queued=false;
    enhanceHero(root);enhanceGuides(root);enhanceNews(root);enhanceArticle(root);enhancePaths(root);
  });
}

window.AI_COMPASS_VISUALS={photos,photoFor,picture,imageUrl};
document.addEventListener('DOMContentLoaded',()=>{
  enhance();
  const app=document.getElementById('app');
  if(app)new MutationObserver(()=>enhance(app)).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
});
})();
