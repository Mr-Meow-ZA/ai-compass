(()=>{
'use strict';

const D=window.AI_COMPASS_DATA||{articles:[]};
const F=window.AI_COMPASS_FEED||[];

const palettes={
  'getting-started':['#0f172a','#e7eef8','#2f6fed','#ffffff','#9fb7d8'],
  workflows:['#102a23','#e7f3ee','#17805f','#ffffff','#a9cdbf'],
  models:['#2b1d3f','#f0eafa','#7251b5','#ffffff','#c4b4df'],
  agents:['#17233b','#e9eef8','#315f9d','#ffffff','#a8bbd5'],
  'open-source':['#20262d','#edf0f2','#59636f','#ffffff','#bdc5cc'],
  research:['#3a2417','#f6eee7','#b15f2d','#ffffff','#d8b89f'],
  education:['#153047','#eaf3f8','#3479a3','#ffffff','#a9c9da'],
  safety:['#3a1f21','#f8e9ea','#b24850','#ffffff','#d9aeb2'],
  products:['#1c2740','#eaf0fb','#4f6fae','#ffffff','#adbfdf'],
  work:['#23311f','#edf4e9','#637e4f','#ffffff','#bacbaa'],
  coding:['#1d2730','#e9eef2','#45677e','#ffffff','#a9bcc8'],
  society:['#392c20','#f4efe8','#8a694b','#ffffff','#ccb9a5'],
  events:['#2c2540','#efecf7','#685895','#ffffff','#beb5d4'],
  video:['#30221e','#f4ece9','#8c5a4d','#ffffff','#c9aca4'],
  default:['#1f2937','#eef2f6','#53657a','#ffffff','#bcc7d3']
};

const templates={
  'getting-started':'steps',workflows:'flow',models:'compare',agents:'nodes','open-source':'code',research:'evidence',
  education:'book',safety:'shield',products:'window',work:'workflow',coding:'code',society:'layers',events:'orbit',video:'frame',default:'grid'
};

const hash=value=>{
  let h=2166136261;
  for(const ch of String(value||'')){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}
  return h>>>0;
};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paletteFor=category=>palettes[String(category||'').toLowerCase()]||palettes.default;
const templateFor=category=>templates[String(category||'').toLowerCase()]||templates.default;

function shapeMarkup(type,n,c){
  const [ink,paper,accent,white,soft]=c;
  const x=18+(n%7)*3;
  const y=16+((n>>3)%5)*3;
  const common=`fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  if(type==='steps')return `<path d="M28 67h27V50h27V33h31" ${common}/><circle cx="28" cy="67" r="5" fill="${accent}"/><circle cx="55" cy="50" r="5" fill="${white}" stroke="${accent}" stroke-width="2"/><circle cx="82" cy="33" r="5" fill="${accent}"/><path d="M98 24h18v18" ${common}/>`;
  if(type==='flow')return `<rect x="23" y="27" width="34" height="28" rx="4" fill="${white}" stroke="${ink}" stroke-width="2"/><rect x="103" y="47" width="34" height="28" rx="4" fill="${white}" stroke="${ink}" stroke-width="2"/><circle cx="80" cy="51" r="9" fill="${accent}"/><path d="M57 41h14M89 54h14" ${common}/><path d="m67 36 6 5-6 5m30 3 6 5-6 5" ${common}/>`;
  if(type==='compare')return `<rect x="24" y="25" width="47" height="49" rx="5" fill="${white}" stroke="${ink}" stroke-width="2"/><rect x="89" y="25" width="47" height="49" rx="5" fill="${white}" stroke="${ink}" stroke-width="2"/><path d="M35 39h25M35 50h18M100 39h25M100 50h15" ${common}/><circle cx="47" cy="64" r="4" fill="${accent}"/><circle cx="112" cy="64" r="4" fill="${soft}"/>`;
  if(type==='nodes')return `<path d="M41 60 78 31l41 28M78 31l4 45M41 60l41 16 37-17" ${common}/><circle cx="41" cy="60" r="8" fill="${white}" stroke="${accent}" stroke-width="3"/><circle cx="78" cy="31" r="8" fill="${accent}"/><circle cx="82" cy="76" r="8" fill="${white}" stroke="${ink}" stroke-width="2"/><circle cx="119" cy="59" r="8" fill="${white}" stroke="${accent}" stroke-width="3"/>`;
  if(type==='code')return `<rect x="23" y="23" width="114" height="58" rx="6" fill="${ink}"/><circle cx="35" cy="34" r="2" fill="${paper}" opacity=".7"/><circle cx="43" cy="34" r="2" fill="${paper}" opacity=".45"/><path d="m45 52-9 8 9 8M115 52l9 8-9 8M91 48 72 72" fill="none" stroke="${paper}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M57 38h43" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>`;
  if(type==='evidence')return `<rect x="25" y="22" width="84" height="61" rx="4" fill="${white}" stroke="${ink}" stroke-width="2"/><path d="M39 39h48M39 51h38M39 63h44" ${common}/><circle cx="117" cy="62" r="17" fill="${paper}" stroke="${accent}" stroke-width="4"/><path d="m129 75 12 12" stroke="${accent}" stroke-width="5" stroke-linecap="round"/><circle cx="117" cy="62" r="6" fill="${accent}" opacity=".2"/>`;
  if(type==='book')return `<path d="M29 29c18-5 32 0 49 10v43c-17-10-31-15-49-10V29Zm100 0c-18-5-32 0-49 10v43c17-10 31-15 49-10V29Z" fill="${white}" stroke="${ink}" stroke-width="2"/><path d="M80 39v43" stroke="${accent}" stroke-width="3"/><path d="M40 44h24M40 55h20M96 44h22M96 55h18" ${common}/>`;
  if(type==='shield')return `<path d="M80 19 119 32v24c0 23-16 36-39 46-23-10-39-23-39-46V32l39-13Z" fill="${white}" stroke="${ink}" stroke-width="2"/><path d="m61 58 12 12 27-30" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(type==='window')return `<rect x="22" y="22" width="116" height="66" rx="7" fill="${white}" stroke="${ink}" stroke-width="2"/><path d="M22 38h116" stroke="${ink}" stroke-width="2"/><circle cx="33" cy="30" r="2.5" fill="${accent}"/><circle cx="42" cy="30" r="2.5" fill="${soft}"/><rect x="34" y="49" width="41" height="25" rx="3" fill="${paper}" stroke="${soft}" stroke-width="2"/><path d="M88 52h34M88 63h26M88 74h19" ${common}/>`;
  if(type==='workflow')return `<path d="M30 33h24v18H30zM68 33h24v18H68zM106 33h24v18h-24z" fill="${white}" stroke="${ink}" stroke-width="2"/><path d="M54 42h14M92 42h14" ${common}/><rect x="49" y="66" width="62" height="15" rx="7.5" fill="${accent}"/><path d="M61 73.5h38" stroke="${white}" stroke-width="2" stroke-linecap="round"/>`;
  if(type==='layers')return `<path d="m80 22 48 23-48 23-48-23 48-23Z" fill="${white}" stroke="${ink}" stroke-width="2"/><path d="m32 58 48 23 48-23M32 70l48 23 48-23" ${common}/><circle cx="80" cy="45" r="7" fill="${accent}"/>`;
  if(type==='orbit')return `<ellipse cx="80" cy="56" rx="50" ry="22" fill="none" stroke="${ink}" stroke-width="2"/><ellipse cx="80" cy="56" rx="25" ry="47" fill="none" stroke="${soft}" stroke-width="2"/><circle cx="80" cy="56" r="10" fill="${accent}"/><circle cx="30" cy="56" r="5" fill="${white}" stroke="${ink}" stroke-width="2"/><circle cx="91" cy="15" r="5" fill="${white}" stroke="${accent}" stroke-width="2"/>`;
  if(type==='frame')return `<rect x="25" y="22" width="110" height="68" rx="7" fill="${ink}"/><path d="m70 43 28 13-28 13V43Z" fill="${paper}"/><path d="M34 32h18M108 80h18" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>`;
  return `<path d="M28 ${y}h104M28 ${y+22}h104M28 ${y+44}h104M${x} 20v72M${x+34} 20v72M${x+68} 20v72" ${common}/><rect x="${x+35}" y="${y+23}" width="32" height="20" rx="3" fill="${accent}"/>`;
}

function artwork(seed,category,label='Editorial illustration'){
  const n=hash(seed);
  const c=paletteFor(category);
  const type=templateFor(category);
  const [ink,paper,accent,,soft]=c;
  const dotX=134-(n%18), dotY=18+((n>>5)%20);
  return `<svg class="editorial-svg" viewBox="0 0 160 104" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="104" rx="10" fill="${paper}"/><path d="M0 86h160" stroke="${soft}" stroke-width="1" opacity=".5"/><circle cx="${dotX}" cy="${dotY}" r="4" fill="${accent}" opacity=".9"/>${shapeMarkup(type,n,c)}<path d="M10 10h22" stroke="${ink}" stroke-width="2" stroke-linecap="round" opacity=".22"/></svg>`;
}

function articleForSlug(slug){return D.articles?.find(item=>item.slug===slug)}
function feedForUrl(url){
  const clean=String(url||'').replace(/\/$/,'');
  return F.find(item=>String(item.url||'').replace(/\/$/,'')===clean);
}
function newsCategory(item){return String(item?.category||'default').toLowerCase()}

function enhanceGuides(root=document){
  root.querySelectorAll?.('.guide-card-link[href^="#article/"]').forEach(link=>{
    if(link.dataset.visualEnhanced)return;
    const slug=decodeURIComponent(link.getAttribute('href').split('/').pop()||'');
    const item=articleForSlug(slug);
    if(!item)return;
    const wrap=document.createElement('div');
    wrap.className='editorial-visual guide-visual';
    wrap.innerHTML=artwork(item.slug,item.category,`Editorial illustration for ${item.title}`);
    const top=link.querySelector('.guide-card-top');
    if(top)link.insertBefore(wrap,top);else link.prepend(wrap);
    link.dataset.visualEnhanced='true';
  });
}

function fallbackNewsVisual(content,item){
  if(content.querySelector('.news-thumbnail:not([hidden])'))return;
  const figure=document.createElement('figure');
  figure.className='news-thumbnail editorial-fallback';
  figure.dataset.editorialFallback='true';
  figure.innerHTML=`<div class="editorial-visual">${artwork(item.id||item.url,newsCategory(item),`AI Compass editorial illustration for ${item.title}`)}</div><figcaption>AI Compass editorial illustration</figcaption>`;
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
    if(item.thumbnail&&!external)return; // let news-refresh insert the official image first
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
  visual.innerHTML=artwork(item.slug,item.category,`Editorial illustration for ${item.title}`);
  summary.prepend(visual);
  summary.dataset.visualEnhanced='true';
}

function enhancePaths(root=document){
  root.querySelectorAll?.('.path-card').forEach((card,index)=>{
    if(card.dataset.visualEnhanced)return;
    const intro=card.querySelector('.path-intro');
    const title=intro?.querySelector('h2')?.textContent||`Learning path ${index+1}`;
    if(!intro)return;
    const visual=document.createElement('div');
    visual.className='editorial-visual path-visual';
    visual.innerHTML=artwork(title,'getting-started',`Editorial illustration for ${title}`);
    intro.prepend(visual);
    card.dataset.visualEnhanced='true';
  });
}

let queued=false;
function enhance(root=document){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{
    queued=false;
    enhanceGuides(root);enhanceNews(root);enhanceArticle(root);enhancePaths(root);
  });
}

window.AI_COMPASS_VISUALS={artwork,paletteFor,templateFor};
document.addEventListener('DOMContentLoaded',()=>{
  enhance();
  const app=document.getElementById('app');
  if(app)new MutationObserver(()=>enhance(app)).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
});
})();
