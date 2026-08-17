(()=>{
'use strict';
const D=window.AI_COMPASS_DATA||{articles:[]};
const F=window.AI_COMPASS_FEED||[];
const L=window.AI_COMPASS_LIBRARY||{references:[]};
let X=window.AI_COMPASS_DISCOVERY||{tools:[],models:[],courses:[],resources:[]};
let C=window.AI_COMPASS_CURRICULUM||{};
const current=()=>{const raw=(location.hash||'#home').slice(1);const [path]=raw.split('?');const parts=path.split('/').filter(Boolean);return{page:parts[0]||'home',arg:parts[1]||''}};
const FR=()=>window.AI_COMPASS_FRESHNESS;
const normalizeUrl=value=>String(value||'').replace(/\/$/,'');

function addSlot(target,html,className='freshness-card-slot',position='beforeend'){
  if(!target||target.querySelector?.(`.${className}`))return;
  target.insertAdjacentHTML(position,`<div class="${className}">${html}</div>`);
}

function collectionStrip(kind,reviewed,copy){
  const fresh=FR();if(!fresh||!reviewed||document.querySelector('.freshness-strip'))return;
  const hero=document.querySelector('#main .page-hero');if(!hero)return;
  hero.insertAdjacentHTML('afterend',`<section class="freshness-strip"><div class="container"><p><strong>Maintenance status</strong> ${copy}</p>${fresh.collectionBadge(kind,reviewed)}</div></section>`);
}

function decorateGuides(){
  const fresh=FR();if(!fresh)return;
  document.querySelectorAll('.guide-card-link').forEach(link=>{
    if(link.querySelector('.freshness-card-slot'))return;
    const slug=decodeURIComponent((link.getAttribute('href')||'').split('/').pop()||'');
    const article=(D.articles||[]).find(item=>item.slug===slug);if(!article)return;
    const action=link.querySelector('.card-action');
    if(action)action.insertAdjacentHTML('beforebegin',`<div class="freshness-card-slot">${fresh.badge(article,'guides',article.slug)}</div>`);
  });
}

function decorateArticle(slug){
  const fresh=FR();const article=(D.articles||[]).find(item=>item.slug===slug);if(!fresh||!article||document.querySelector('.article-freshness'))return;
  const anchor=document.querySelector('.article-taxonomy')||document.querySelector('.article-labels');
  if(anchor)anchor.insertAdjacentHTML('afterend',`<div class="article-freshness">${fresh.badge(article,'guides',article.slug)}</div>`);
}

function decorateReference(){
  const fresh=FR();if(!fresh)return;
  document.querySelectorAll('.reference-item').forEach(node=>{
    if(node.querySelector('.freshness-card-slot'))return;
    const slug=(node.id||'').replace(/^term-/,'');const item=(L.references||[]).find(entry=>entry.slug===slug);if(!item)return;
    const body=node.lastElementChild;addSlot(body,fresh.badge(item,'references',item.slug));
  });
}

function decorateDirectory(kind,items,selector,titleSelector){
  const fresh=FR();if(!fresh)return;
  document.querySelectorAll(selector).forEach(card=>{
    if(card.querySelector('.freshness-card-slot'))return;
    const title=(card.querySelector(titleSelector)?.textContent||'').trim().toLowerCase();
    const item=(items||[]).find(entry=>String(entry.name||entry.title||'').trim().toLowerCase()===title);if(!item)return;
    const actions=card.querySelector('.directory-actions');
    if(actions)actions.insertAdjacentHTML('beforebegin',`<div class="freshness-card-slot">${fresh.badge(item,kind,item.id)}</div>`);
    else addSlot(card,fresh.badge(item,kind,item.id));
  });
}

function decorateResources(){
  const fresh=FR();if(!fresh)return;
  document.querySelectorAll('.resource-toolkit-card').forEach(card=>{
    if(card.querySelector('.freshness-card-slot'))return;
    const href=card.getAttribute('href')||'';const item=(X.resources||[]).find(entry=>entry.href===href);if(!item)return;
    const action=card.querySelector('.card-action');
    if(action)action.insertAdjacentHTML('beforebegin',`<div class="freshness-card-slot">${fresh.badge(item,'resources',item.id)}</div>`);
  });
}

function newsItemForLink(link){
  if(!link)return null;const href=normalizeUrl(link.href||link.getAttribute('href'));
  return (F||[]).find(item=>normalizeUrl(item.url)===href);
}
function decorateNews(){
  const fresh=FR();if(!fresh)return;
  document.querySelectorAll('.signal-card').forEach(card=>{
    if(card.querySelector('.freshness-badge'))return;const item=newsItemForLink(card.querySelector('h2 a'));if(!item)return;
    const source=card.querySelector('.intel-source');if(source)source.insertAdjacentHTML('beforeend',fresh.badge(item,'news',item.id));
  });
  document.querySelectorAll('.intel-news-row').forEach(row=>{
    if(row.querySelector('.freshness-badge'))return;const item=newsItemForLink(row.querySelector('h3 a'));if(!item)return;
    const copy=row.querySelector('.intel-news-copy');if(copy)addSlot(copy,fresh.badge(item,'news',item.id));
  });
}

function decorateLearning(){
  const fresh=FR();if(!fresh||!C.reviewed)return;
  const review=document.querySelector('.curriculum-review');if(review&&!review.querySelector('.freshness-badge'))review.insertAdjacentHTML('beforeend',fresh.collectionBadge('learning-paths',C.reviewed));
  const position=document.querySelector('.path-position');if(position&&!position.querySelector('.freshness-badge'))position.insertAdjacentHTML('beforeend',fresh.collectionBadge('learning-paths',C.reviewed));
}

function wireRefreshControls(){
  document.querySelectorAll('#guideSearch,#guideCategory,#guideLevel,#referenceSearch,#intelNewsSearch,#intelNewsSignal,#intelNewsTopic,#intelNewsStatus').forEach(control=>{
    if(control.dataset.freshnessWired)return;control.dataset.freshnessWired='1';
    control.addEventListener(control.tagName==='INPUT'?'input':'change',()=>setTimeout(decorate,40));
  });
}

function decorate(){
  if(!FR())return;
  const r=current();
  if(r.page==='home'||r.page==='guides')decorateGuides();
  if(r.page==='article')decorateArticle(r.arg);
  if(r.page==='reference')decorateReference();
  if(r.page==='tools'||r.page==='compare'){
    collectionStrip('tools',X.reviewed,'Tool profiles are provider-controlled and reviewed on a shorter cycle than evergreen guides.');
    decorateDirectory('tools',X.tools,'.directory-card:not(.model-card)','h2');
  }
  if(r.page==='models'){
    collectionStrip('models',X.reviewed,'Model-family details are treated as volatile and point back to current provider documentation.');
    decorateDirectory('models',X.models,'.directory-card.model-card','h2');
  }
  if(r.page==='courses'){
    collectionStrip('courses',X.reviewed,'Course recommendations are periodically rechecked for curriculum, access and audience fit.');
    decorateDirectory('courses',X.courses,'.course-card','h2');
  }
  if(r.page==='resources'||r.page==='repos'||r.page==='videos'){
    collectionStrip('resources',X.reviewed,'Reusable AI Compass resources are maintained separately from external repositories.');
    decorateResources();
  }
  if(r.page==='news'||r.page==='explore'){
    collectionStrip('news',window.AI_COMPASS_NEWS_INTELLIGENCE?.reviewed,'Current developments age into Recent and Archive states instead of silently looking new forever.');
    decorateNews();
  }
  if(r.page==='learn')decorateLearning();
  wireRefreshControls();
}

function start(){
 const ready=window.AI_COMPASS_CONTENT_READY||Promise.resolve();
 ready.then(()=>{
  X=window.AI_COMPASS_DISCOVERY||X;
  C=window.AI_COMPASS_CURRICULUM||C;
  const run=()=>setTimeout(decorate,140);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  addEventListener('hashchange',()=>setTimeout(decorate,160));
 }).catch(error=>console.error('AI Compass freshness UI could not start',error));
}
start();
})();