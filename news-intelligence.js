(()=>{
'use strict';
const F=window.AI_COMPASS_FEED||[];
const D=window.AI_COMPASS_DATA||{articles:[]};
const L=window.AI_COMPASS_LIBRARY||{references:[]};
let I=null;
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const ext=' target="_blank" rel="noopener noreferrer"';
const fmtDate=value=>{try{return new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'short',year:'numeric'}).format(new Date(`${value}T12:00:00`))}catch{return value||''}};
const current=()=>{const raw=(location.hash||'#home').slice(1);return raw.split(/[/?]/)[0]||'home'};
const sorted=()=>[...F].sort((a,b)=>String(b.date).localeCompare(String(a.date))||((b.intelligence?.importance||0)-(a.intelligence?.importance||0)));
const signalClass=value=>String(value||'context').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

function relatedLink(item){
  const key=item.intelligence?.related;if(!key)return'';
  const article=(D.articles||[]).find(entry=>entry.slug===key);
  if(article)return `<a class="intel-related" href="#article/${esc(article.slug)}">Use the related guide: ${esc(article.title)} →</a>`;
  const ref=(L.references||[]).find(entry=>entry.slug===key);
  if(ref)return `<a class="intel-related" href="#reference?term=${encodeURIComponent(ref.term)}">Open the reference: ${esc(ref.term)} →</a>`;
  return'';
}

function sourceMeta(item){
  const n=item.intelligence||{};
  return `<div class="intel-source"><span class="intel-source-name">${esc(item.source)}</span><span>${esc(item.sourceType)}</span><span>${fmtDate(item.date)}</span><span>${esc(n.sourceQuality||'Source')}</span></div>`;
}

function signalCard(item,index){
  const n=item.intelligence||{};
  return `<article class="signal-card ${index===0?'lead':''}">
    <div class="signal-card-top"><span class="signal-badge ${signalClass(n.signal)}">${esc(n.signal||'Context')}</span><span class="status-badge">${esc(n.status||'Update')}</span></div>
    ${sourceMeta(item)}
    <h2><a href="${esc(item.url)}"${ext}>${esc(item.title)} ↗</a></h2>
    <div class="signal-block fact"><strong>What changed</strong><p>${esc(item.dek)}</p></div>
    <div class="signal-block analysis"><strong>Why AI Compass thinks it matters</strong><p>${esc(n.why)}</p></div>
    <div class="signal-audience"><span><strong>Who should care</strong>${esc(n.audience)}</span><span><strong>Next move</strong>${esc(n.action)}</span></div>
    ${relatedLink(item)}
  </article>`;
}

function compactRow(item){
  const n=item.intelligence||{};
  return `<article class="intel-news-row" data-signal="${esc(n.signal||'Context')}" data-topic="${esc(item.category||'General')}" data-status="${esc(n.status||'Update')}">
    <div class="intel-news-mark"><span class="signal-badge ${signalClass(n.signal)}">${esc(n.signal||'Context')}</span><small>${fmtDate(item.date)}</small></div>
    <div class="intel-news-copy">${sourceMeta(item)}<h3><a href="${esc(item.url)}"${ext}>${esc(item.title)} ↗</a></h3><p>${esc(item.dek)}</p><div class="intel-row-analysis"><strong>Why it matters:</strong> ${esc(n.why)}</div>${relatedLink(item)}</div>
    <div class="intel-news-state"><span>${esc(n.status||'Update')}</span><small>${esc(item.category||'General')}</small></div>
  </article>`;
}

function renderNews(){
  if(!I||current()!=='news')return;
  const main=document.getElementById('main');if(!main)return;
  const all=sorted();
  const top=[...all].sort((a,b)=>(b.intelligence?.importance||0)-(a.intelligence?.importance||0)||String(b.date).localeCompare(String(a.date))).slice(0,3);
  const signals=[...new Set(all.map(item=>item.intelligence?.signal||'Context'))];
  const topics=[...new Set(all.map(item=>item.category||'General'))].sort();
  const statuses=[...new Set(all.map(item=>item.intelligence?.status||'Update'))].sort();
  main.innerHTML=`
    <section class="page-hero news-intel-hero"><div class="container page-hero-grid"><div><p class="eyebrow">AI Compass intelligence desk</p><h1>AI news that tells you what changed — and whether it matters.</h1><p>Primary-source-first briefing for people who need signal, not launch-day volume. Facts from publishers stay separate from AI Compass analysis.</p></div><div class="page-stat"><strong>${top.filter(item=>(item.intelligence?.importance||0)>=4).length}</strong><span>high-signal items<br>in the current briefing</span></div></div></section>
    <section class="intel-status-bar"><div class="container"><span><strong>Editorial scan</strong> ${fmtDate(I.reviewed)}</span><span><strong>Method</strong> source → availability → scope → durability</span><span><strong>Rule</strong> announcements are not treated as availability</span></div></section>
    <section class="content-section signal-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Top signals</p><h2>What deserves attention first.</h2><p>Ranked by practical impact and durability, not by how loudly it was announced.</p></div><a class="text-link" href="#about">Editorial method →</a></div><div class="signal-grid">${top.map(signalCard).join('')}</div></div></section>
    <section class="content-section tinted intel-method-section"><div class="container intel-method-grid"><div><p class="eyebrow">Signal method</p><h2>${esc(I.method.title)}</h2><p>${esc(I.method.note)}</p></div><ol>${I.method.principles.map(item=>`<li>${esc(item)}</li>`).join('')}</ol></div></section>
    <section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Full briefing</p><h2>All curated developments.</h2><p>Filter by signal, topic or real-world status. Every item still opens at its original publisher.</p></div></div>
      <div class="intel-filter-grid"><label>Search<input id="intelNewsSearch" type="search" placeholder="Search headline, source or analysis"></label><label>Signal<select id="intelNewsSignal"><option value="all">All signals</option>${signals.map(value=>`<option>${esc(value)}</option>`).join('')}</select></label><label>Topic<select id="intelNewsTopic"><option value="all">All topics</option>${topics.map(value=>`<option>${esc(value)}</option>`).join('')}</select></label><label>Status<select id="intelNewsStatus"><option value="all">All statuses</option>${statuses.map(value=>`<option>${esc(value)}</option>`).join('')}</select></label></div>
      <div class="results-line"><span id="intelNewsSummary">${all.length} curated developments</span><span>Publisher facts and AI Compass analysis are labelled separately</span></div>
      <div class="intel-news-list" id="intelNewsList">${all.map(compactRow).join('')}</div><div class="empty-state" id="intelNewsEmpty" hidden><h2>No developments match those filters.</h2><p>Try a broader topic or signal level.</p></div>
    </div></section>`;
  document.title='AI news intelligence — AI Compass';
  wireFilters(all);
}

function wireFilters(all){
  const q=document.getElementById('intelNewsSearch');const s=document.getElementById('intelNewsSignal');const t=document.getElementById('intelNewsTopic');const st=document.getElementById('intelNewsStatus');const list=document.getElementById('intelNewsList');const summary=document.getElementById('intelNewsSummary');const empty=document.getElementById('intelNewsEmpty');
  if(!q||!s||!t||!st||!list)return;
  const apply=()=>{
    const query=q.value.trim().toLowerCase();
    const filtered=all.filter(item=>{
      const n=item.intelligence||{};
      const hay=`${item.title||''} ${item.dek||''} ${item.source||''} ${item.category||''} ${n.why||''} ${n.audience||''}`.toLowerCase();
      return(!query||hay.includes(query))&&(s.value==='all'||n.signal===s.value)&&(t.value==='all'||item.category===t.value)&&(st.value==='all'||n.status===st.value);
    });
    list.innerHTML=filtered.map(compactRow).join('');
    if(summary)summary.textContent=`${filtered.length} of ${all.length} curated developments`;
    if(empty)empty.hidden=filtered.length>0;
  };
  [q,s,t,st].forEach(control=>control.addEventListener(control.tagName==='INPUT'?'input':'change',apply));
}

function enhance(){if(current()==='news')renderNews();}
function start(){
 const ready=window.AI_COMPASS_CONTENT_READY||Promise.resolve();
 ready.then(()=>{
  I=window.AI_COMPASS_NEWS_INTELLIGENCE||null;
  if(!I)return;
  const run=()=>setTimeout(enhance,60);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  addEventListener('hashchange',run);
 }).catch(error=>console.error('AI Compass news intelligence could not start',error));
}
start();
})();