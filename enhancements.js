(()=>{
'use strict';
const svg={
  home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10.5V20h13v-9.5M9.5 20v-6h5v6"></path></svg>',
  learn:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"></path><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z"></path></svg>',
  guides:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6z"></path><path d="M15 3v4h4M9 11h6M9 15h6"></path></svg>',
  search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 5 5"></path></svg>',
  saved:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5A1.5 1.5 0 0 1 8 3h8a1.5 1.5 0 0 1 1.5 1.5V21L12 17.5 6.5 21V4.5Z"></path></svg>'
};
function currentPage(){return (location.hash||'#home').slice(1).split(/[/?]/)[0]||'home'}
function ensureDock(){
  if(document.getElementById('mobileDock'))return;
  const dock=document.createElement('nav');
  dock.id='mobileDock';dock.className='mobile-dock';dock.setAttribute('aria-label','Mobile shortcuts');
  dock.innerHTML=`<a href="#home" data-page="home">${svg.home}<span>Home</span></a><a href="#learn" data-page="learn">${svg.learn}<span>Learn</span></a><a href="#guides" data-page="guides">${svg.guides}<span>Guides</span></a><button type="button" id="mobileSearchOpen">${svg.search}<span>Search</span></button><a href="#saved" data-page="saved">${svg.saved}<span>Saved</span></a>`;
  document.body.appendChild(dock);
  const dialog=document.createElement('dialog');
  dialog.id='mobileSearchDialog';dialog.className='mobile-search-dialog';dialog.setAttribute('aria-labelledby','mobileSearchTitle');
  dialog.innerHTML=`<div class="mobile-search-inner"><div class="mobile-search-head"><h2 id="mobileSearchTitle">Search AI Compass</h2><button class="mobile-search-close" type="button" aria-label="Close search">×</button></div><form class="mobile-search-form"><label class="sr-only" for="mobileSearchInput">Search guides, tips, terms, tools and news</label><input id="mobileSearchInput" name="q" type="search" placeholder="What do you want to learn or do?" autocomplete="off"><button type="submit">Search the full library</button></form><div class="mobile-search-shortcuts"><a href="#learn/start-here">Start here</a><a href="#tips">Tips</a><a href="#reference">Reference</a><a href="#tools">Tools</a><a href="#news">News</a></div></div>`;
  document.body.appendChild(dialog);
  const open=document.getElementById('mobileSearchOpen');
  const input=dialog.querySelector('input');
  open.addEventListener('click',()=>{dialog.showModal();setTimeout(()=>input.focus(),30)});
  dialog.querySelector('.mobile-search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>dialog.close()));
  dialog.querySelector('form').addEventListener('submit',event=>{event.preventDefault();const q=input.value.trim();if(q){dialog.close();location.hash=`search?q=${encodeURIComponent(q)}`}});
}
function updateDock(){
  ensureDock();
  const page=currentPage();
  document.querySelectorAll('#mobileDock [data-page]').forEach(item=>item.toggleAttribute('aria-current',item.dataset.page===page));
  document.getElementById('mobileSearchOpen')?.classList.toggle('active',page==='search');
}
function enhanceArticleToc(){
  const summary=document.querySelector('.article-summary');
  if(!summary||summary.querySelector('.toc-toggle'))return;
  const list=summary.querySelector('ol');if(!list)return;
  const button=document.createElement('button');button.type='button';button.className='toc-toggle';button.textContent='Guide contents';button.setAttribute('aria-expanded','false');
  summary.classList.add('is-collapsed');summary.insertBefore(button,list);
  button.addEventListener('click',()=>{const expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));summary.classList.toggle('is-collapsed',expanded)});
}
function addContentLabels(){
  document.querySelectorAll('.guide-card:not([data-kind])').forEach(card=>card.dataset.kind='guide');
  document.querySelectorAll('.tip-card:not([data-kind])').forEach(card=>card.dataset.kind='tip');
  document.querySelectorAll('.reference-item:not([data-kind])').forEach(card=>card.dataset.kind='reference');
  document.querySelectorAll('.resource-card:not([data-kind])').forEach(card=>card.dataset.kind='resource');
  document.querySelectorAll('.news-item:not([data-kind])').forEach(card=>card.dataset.kind='news');
}
function run(){updateDock();enhanceArticleToc();addContentLabels()}
document.addEventListener('DOMContentLoaded',()=>setTimeout(run,0));
addEventListener('hashchange',()=>setTimeout(run,0));
addEventListener('resize',()=>{if(innerWidth>820){document.getElementById('mobileSearchDialog')?.close()}});
})();
