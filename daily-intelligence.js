(()=>{
'use strict';
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const fmtDate=value=>{try{return new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'short'}).format(new Date(`${value}T12:00:00`))}catch{return value||''}};
const current=()=>{const raw=(location.hash||'#home').slice(1);return raw.split(/[/?]/)[0]||'home'};
const feed=()=>window.AI_COMPASS_FEED||[];
const articles=()=>window.AI_COMPASS_DATA?.articles||[];
const tier=item=>{const score=item.intelligence?.importance||0;if(score>=4)return'Must know';if(score>=3)return'Worth knowing';return'Watch'};
const relatedArticle=item=>{const related=item.intelligence?.related;return related?articles().find(article=>article.slug===related):null};
const format=item=>relatedArticle(item)?.type==='News analysis'?'Deep Analysis':'Daily Brief';
const internalHref=item=>relatedArticle(item)?.type==='News analysis'?`#article/${relatedArticle(item).slug}`:'';
const sortedRecent=()=>[...feed()].sort((a,b)=>String(b.date).localeCompare(String(a.date))||((b.intelligence?.importance||0)-(a.intelligence?.importance||0)));
let scan=null;

function renderHome(){
  if(current()!=='home')return;
  document.querySelector('.daily-intelligence-home')?.remove();
  const hero=document.querySelector('#main .hero');if(!hero)return;
  const items=sortedRecent().slice(0,5);
  const section=document.createElement('section');
  section.className='daily-intelligence-home';
  section.innerHTML=`<div class="container">
    <div class="daily-intel-heading"><div><p class="eyebrow">Today in AI</p><h2>What changed — and what deserves your attention.</h2><p>A short editorial briefing, not a firehose. Daily Briefs cover useful developments quickly; Deep Analysis is reserved for stories that need more context.</p></div><a class="text-link" href="#news">Open the full intelligence desk →</a></div>
    <div class="daily-intel-grid">${items.map((item,index)=>{const href=internalHref(item)||item.url;const external=!internalHref(item);return `<article class="daily-intel-card ${index===0?'lead':''}"><div class="daily-intel-meta"><span class="daily-tier ${tier(item).toLowerCase().replace(/\s+/g,'-')}">${tier(item)}</span><span>${format(item)}</span><span>${fmtDate(item.date)}</span></div><h3><a href="${esc(href)}"${external?' target="_blank" rel="noopener noreferrer"':''}>${esc(item.title)}${external?' ↗':''}</a></h3><p>${esc(item.dek)}</p><div class="daily-intel-foot"><span>${esc(item.source)}</span><span>${esc(item.intelligence?.status||item.format||'Update')}</span></div></article>`}).join('')}</div>
    <div class="daily-intel-scan"><span><strong>Daily editorial scan</strong> ${esc(scan?.lastScan?fmtDate(scan.lastScan):'maintained daily')}</span><span>${scan?.result==='no-publish'?'Scan completed; nothing cleared the publishing threshold.':'Publishing is gated by source quality, verification and reader value.'}</span></div>
  </div>`;
  hero.insertAdjacentElement('afterend',section);
}

function annotateNews(){
  if(current()!=='news')return;
  document.querySelector('.daily-format-key')?.remove();
  const status=document.querySelector('.intel-status-bar');
  if(status){const key=document.createElement('section');key.className='daily-format-key';key.innerHTML='<div class="container"><div><strong>Daily Brief</strong><span>Fast, source-checked context for a useful development.</span></div><div><strong>Deep Analysis</strong><span>Original AI Compass reporting when claims, trade-offs or practical implications need deeper treatment.</span></div><div><strong>Daily scan</strong><span>AI Compass records the scan even when nothing deserves publication.</span></div></div>';status.insertAdjacentElement('afterend',key)}
  const byUrl=new Map(feed().map(item=>[item.url,item]));
  document.querySelectorAll('.signal-card h2 a,.intel-news-copy h3 a').forEach(link=>{const item=byUrl.get(link.getAttribute('href'));if(!item)return;const heading=link.closest('h2,h3');if(!heading||heading.previousElementSibling?.classList?.contains('editorial-format'))return;heading.insertAdjacentHTML('beforebegin',`<div class="editorial-format"><span>${format(item)}</span><span>${tier(item)}</span></div>`)});
}

function run(){setTimeout(()=>{renderHome();annotateNews()},160)}
async function start(){
  const ready=window.AI_COMPASS_CONTENT_READY||Promise.resolve();
  try{await ready;try{const response=await fetch('content/editorial/news-scan-log.json',{cache:'no-store'});if(response.ok)scan=await response.json()}catch{}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
    addEventListener('hashchange',run);
  }catch(error){console.error('AI Compass daily intelligence could not start',error)}
}
start();
})();
