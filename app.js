(()=>{
'use strict';

const D=window.AI_COMPASS_DATA||{categories:[],articles:[],comparisons:[],repos:[],questions:[],approvalQueue:[]};
const F=window.AI_COMPASS_FEED||[];
const L=window.AI_COMPASS_LIBRARY||{learningPaths:[],tips:[],references:[],taskCards:[]};
const app=document.getElementById('app');
const toastEl=document.getElementById('toast');
const safeStore=(()=>{try{const k='__aic_test';localStorage.setItem(k,'1');localStorage.removeItem(k);return localStorage}catch{return{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}}})();
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const fmtDate=value=>{try{return new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'short',year:'numeric'}).format(new Date(`${value}T12:00:00`))}catch{return value||''}};
const category=id=>D.categories.find(item=>item.id===id)||{id,name:id||'General',description:''};
const articleBySlug=slug=>D.articles.find(item=>item.slug===slug);
const route=()=>{const raw=(location.hash||'#home').slice(1);const [path,query='']=raw.split('?');const parts=path.split('/').filter(Boolean);return{page:parts[0]||'home',arg:parts[1]||'',params:new URLSearchParams(query)}};
const externalAttrs=url=>/^https?:/i.test(url||'')?' target="_blank" rel="noopener noreferrer"':'';
const initials=value=>String(value||'AI').replace(/[^A-Za-z0-9 ]/g,'').split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
let firstRender=true;

const icons={
  search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 5 5"></path></svg>',
  bookmark:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5A1.5 1.5 0 0 1 8 3h8a1.5 1.5 0 0 1 1.5 1.5V21L12 17.5 6.5 21V4.5Z"></path></svg>',
  arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5"></path></svg>',
  external:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8"></path><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path></svg>'
};

function showToast(message){
  if(!toastEl)return;
  toastEl.textContent=message;
  toastEl.classList.add('show');
  clearTimeout(window.__aicToast);
  window.__aicToast=setTimeout(()=>toastEl.classList.remove('show'),2200);
}

function header(active){
  const nav=[
    ['home','Home'],
    ['learn','Learn'],
    ['guides','Guides'],
    ['tips','Tips & tricks'],
    ['reference','Reference'],
    ['tools','Tools & models'],
    ['resources','Resources'],
    ['news','News']
  ];
  return `<header class="site-header">
    <div class="utility-bar"><div class="container utility-inner"><span>Independent AI education and discovery</span><div><a href="#about">Editorial method</a><a href="#community">Community</a></div></div></div>
    <div class="container header-main">
      <a class="brand" href="#home" aria-label="AI Compass home"><span class="brand-mark" aria-hidden="true"><span></span></span><span class="brand-name">AI Compass<small>Learn · choose · build</small></span></a>
      <form class="global-search" id="globalSearch" role="search">${icons.search}<input name="q" aria-label="Search AI Compass" placeholder="Search guides, tips, terms, tools and news"><button type="submit">Search</button></form>
      <div class="header-actions"><a class="icon-button" href="#saved" aria-label="Saved guides">${icons.bookmark}</a><button class="menu-button" id="menuButton" aria-label="Open navigation" aria-expanded="false" aria-controls="primaryNav">Menu</button></div>
    </div>
    <nav class="primary-nav" id="primaryNav" aria-label="Primary navigation"><div class="container nav-inner">${nav.map(([id,label])=>`<a href="#${id}" ${active===id?'aria-current="page"':''}>${esc(label)}</a>`).join('')}</div></nav>
  </header>`;
}

function footer(){
  return `<footer class="site-footer"><div class="container footer-grid">
    <div><a class="brand footer-brand" href="#home"><span class="brand-mark" aria-hidden="true"><span></span></span><span class="brand-name">AI Compass<small>Learn · choose · build</small></span></a><p>Practical AI education, reliable reference material and carefully curated discovery. News is context—not the product.</p></div>
    <div><strong>Learn</strong><a href="#learn">Learning paths</a><a href="#guides">Guides</a><a href="#tips">Tips & tricks</a><a href="#reference">Reference</a></div>
    <div><strong>Choose</strong><a href="#tools">Tools & models</a><a href="#resources">Resources</a><a href="#news">AI news</a><a href="#saved">Saved guides</a></div>
    <div><strong>Trust</strong><a href="#about">Editorial method</a><a href="#community">Community</a><a href="#owner">Review queue</a><a href="https://github.com/Mr-Meow-ZA/ai-compass" target="_blank" rel="noopener noreferrer">GitHub source ↗</a></div>
  </div><div class="container footer-bottom"><span>© 2026 AI Compass</span><span>AI assists with research and maintenance. Sources, dates and human accountability remain visible.</span></div></footer>`;
}

function shell(active,content){return `${header(active)}<main id="main" class="page" tabindex="-1">${content}</main>${footer()}`}
function sectionHeading(kicker,title,description,link='',linkLabel='View all'){return `<div class="section-heading"><div><p class="eyebrow">${esc(kicker)}</p><h2>${esc(title)}</h2>${description?`<p>${esc(description)}</p>`:''}</div>${link?`<a class="text-link" href="${esc(link)}">${esc(linkLabel)} ${icons.arrow}</a>`:''}</div>`}
function meta(items){return `<div class="meta-row">${items.filter(Boolean).map(item=>`<span>${esc(item)}</span>`).join('')}</div>`}

function guideCard(article,variant='standard'){
  const c=category(article.category);
  return `<article class="guide-card ${esc(variant)}">
    <a class="guide-card-link" href="#article/${esc(article.slug)}">
      <div class="guide-card-top"><span class="content-type">${esc(article.type)}</span><span class="level-badge">${esc(article.level)}</span></div>
      <h3>${esc(article.title)}</h3><p>${esc(article.excerpt)}</p>
      ${meta([c.name,`${article.readTime} min`,article.updated?`Updated ${fmtDate(article.updated)}`:`Published ${fmtDate(article.date)}`])}
      <span class="card-action">Read guide ${icons.arrow}</span>
    </a>
  </article>`;
}

function compactGuide(article,index){
  return `<a class="compact-guide" href="#article/${esc(article.slug)}"><span class="compact-number">${String(index+1).padStart(2,'0')}</span><span><strong>${esc(article.title)}</strong><small>${esc(article.level)} · ${article.readTime} min</small></span>${icons.arrow}</a>`;
}

function tipCard(tip){
  return `<article class="tip-card"><div class="tip-card-head"><span class="content-type">${esc(tip.category)}</span><span>${esc(tip.level)}</span></div><h3>${esc(tip.title)}</h3><p>${esc(tip.summary)}</p><div class="tip-example"><strong>Try this</strong><code>${esc(tip.example)}</code></div><a class="text-link" href="#article/${esc(tip.related)}">Related guide ${icons.arrow}</a></article>`;
}

function referenceItem(item){
  return `<article class="reference-item" id="term-${esc(item.slug)}"><div class="term-letter" aria-hidden="true">${esc(item.term[0])}</div><div><h3>${esc(item.term)}</h3><p>${esc(item.definition)}</p><p class="reference-note"><strong>Why it matters:</strong> ${esc(item.why)}</p>${meta(item.tags)}</div></article>`;
}

function comparisonCard(item){
  return `<article class="comparison-card"><div class="comparison-title"><span class="source-avatar">${esc(initials(item.name))}</span><div><h3>${esc(item.name)}</h3><p>${esc(item.score)}</p></div></div><strong>${esc(item.bestFor)}</strong><ul>${item.strengths.slice(0,3).map(value=>`<li>${esc(value)}</li>`).join('')}</ul><p class="caution"><strong>Watch:</strong> ${esc(item.caution)}</p><div class="comparison-footer"><span>${esc(item.price)}</span><a href="${esc(item.url)}"${externalAttrs(item.url)}>Official source ${icons.external}</a></div></article>`;
}

function repoRow(repo){
  return `<article class="repo-row"><div class="repo-icon">&lt;/&gt;</div><div><h3><a href="${esc(repo.url)}"${externalAttrs(repo.url)}>${esc(repo.name)} ${icons.external}</a></h3><p>${esc(repo.description)}</p>${meta([repo.category,repo.language,`Checked ${fmtDate(repo.checked)}`])}</div></article>`;
}

function newsItem(item,featured=false){
  return `<article class="news-item ${featured?'featured':''}"><div class="news-source"><span class="source-avatar">${esc(initials(item.source))}</span><div><strong>${esc(item.source)}</strong><small>${esc(item.sourceType)} · ${fmtDate(item.date)}</small></div></div><div><span class="content-type">${esc(item.category)} · ${esc(item.format)}</span><h3><a href="${esc(item.url)}"${externalAttrs(item.url)}>${esc(item.title)} ${icons.external}</a></h3><p>${esc(item.dek)}</p>${meta([item.readTime,'External source'])}</div></article>`;
}

function pathCard(path){
  const articles=path.steps.map(articleBySlug).filter(Boolean);
  return `<article class="path-card accent-${esc(path.accent)}"><div class="path-intro"><span class="content-type">${esc(path.audience)}</span><h2>${esc(path.title)}</h2><p>${esc(path.description)}</p>${meta([path.duration,`${articles.length} lessons`])}<a class="primary-link" href="#learn/${esc(path.id)}">Open learning path ${icons.arrow}</a></div><ol class="path-preview">${articles.map((article,index)=>`<li><span>${index+1}</span><a href="#article/${esc(article.slug)}">${esc(article.title)}</a></li>`).join('')}</ol></article>`;
}

function home(){
  const featured=D.articles.filter(item=>item.featured).slice(0,4);
  const recommended=(featured.length>=3?featured.slice(0,3):D.articles.slice(0,3));
  const latestNews=[...F].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,4);
  const popularRepos=D.repos.slice(0,4);
  const tips=L.tips.slice(0,3);
  const refs=L.references.slice(0,4);
  const path=L.learningPaths[0];
  return shell('home',`
    <section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">Your practical guide to artificial intelligence</p><h1>Make AI useful.<br><span>Understand what matters.</span></h1><p class="hero-lede">Learn the fundamentals, choose the right tools and build reliable workflows—without drowning in hype, product launches or jargon.</p><form class="hero-search" id="heroSearch" role="search">${icons.search}<input name="q" aria-label="What do you want to learn or do?" placeholder="What do you want to learn or do?"><button>Find an answer</button></form><div class="hero-prompts"><span>Popular:</span><a href="#article/choose-your-first-ai-subscription">Choose an AI plan</a><a href="#article/prompting-for-reliable-results">Write better prompts</a><a href="#reference">Understand AI terms</a></div></div><aside class="hero-panel"><p class="eyebrow">Start here</p><h2>New to AI?</h2><p>Follow a short, ordered path that covers tools, prompting, privacy and verification.</p><div class="hero-progress"><span style="width:25%"></span></div><div class="hero-stat"><strong>4</strong><span>practical lessons<br>about 90 minutes</span></div><a class="primary-link dark" href="#learn/start-here">Begin the learning path ${icons.arrow}</a></aside></div></section>

    <section class="task-section"><div class="container">${sectionHeading('Find your direction','What would you like AI to help you do?','Choose a route based on your goal rather than a product name.')}<div class="task-grid">${L.taskCards.map(card=>`<a class="task-card" href="${esc(card.href)}"><span class="task-number">${esc(card.icon)}</span><h3>${esc(card.title)}</h3><p>${esc(card.description)}</p><span>${esc(card.label)} ${icons.arrow}</span></a>`).join('')}</div></div></section>

    <section class="content-section"><div class="container">${sectionHeading('Original AI Compass content','Recommended guides','Detailed, source-backed explanations written to help you make decisions and complete real work.','#guides','Browse all guides')}<div class="guide-grid">${recommended.map(article=>guideCard(article)).join('')}</div></div></section>

    <section class="split-section"><div class="container split-grid"><div>${sectionHeading('Structured learning','A path, not a pile of articles','Work through the essentials in a sensible order.')}<div class="featured-path"><div><span class="content-type">${esc(path.audience)} path</span><h2>${esc(path.title)}</h2><p>${esc(path.description)}</p>${meta([path.duration,`${path.steps.length} lessons`])}<a class="primary-link" href="#learn/${esc(path.id)}">View the full path ${icons.arrow}</a></div><div class="path-list">${path.steps.map((slug,index)=>compactGuide(articleBySlug(slug),index)).join('')}</div></div></div><aside class="reference-desk">${sectionHeading('Quick reference','Understand the language','Plain-English definitions for terms you will encounter.','#reference','Open reference')}<div class="reference-compact">${refs.map(item=>`<a href="#reference?term=${encodeURIComponent(item.term)}"><strong>${esc(item.term)}</strong><span>${esc(item.definition)}</span></a>`).join('')}</div></aside></div></section>

    <section class="content-section tinted"><div class="container">${sectionHeading('Practical library','Tips you can use today','Small changes that make AI work more reliably.','#tips','See all tips')}<div class="tips-grid">${tips.map(tipCard).join('')}</div></div></section>

    <section class="content-section"><div class="container">${sectionHeading('Choose with evidence','Tools, models and open source','Compare practical fit, limitations and source information before you adopt anything.','#tools','Explore tools & models')}<div class="tools-home-grid"><div class="comparison-mini">${D.comparisons.slice(0,3).map(item=>`<a href="#tools"><span class="source-avatar">${esc(initials(item.name))}</span><span><strong>${esc(item.name)}</strong><small>${esc(item.bestFor)}</small></span>${icons.arrow}</a>`).join('')}</div><div class="repo-mini">${popularRepos.map(repo=>`<a href="${esc(repo.url)}"${externalAttrs(repo.url)}><span>&lt;/&gt;</span><span><strong>${esc(repo.name)}</strong><small>${esc(repo.category)} · ${esc(repo.language)}</small></span>${icons.external}</a>`).join('')}</div></div></div></section>

    <section class="news-module"><div class="container">${sectionHeading('One part of the compass','Latest AI news','A compact, source-labelled view of notable developments. News stays separate from our evergreen guides and reference material.','#news','Open the news section')}<div class="news-list compact">${latestNews.map((item,index)=>newsItem(item,index===0)).join('')}</div></div></section>

    <section class="community-banner"><div class="container community-banner-inner"><div><p class="eyebrow">Still unsure?</p><h2>Ask a practical AI question.</h2><p>Community questions help us identify gaps and create better guides, comparisons and references.</p></div><a class="primary-link dark" href="#community">Visit the community ${icons.arrow}</a></div></section>
  `);
}

function learn(selected=''){
  if(selected){
    const path=L.learningPaths.find(item=>item.id===selected);
    if(!path)return learn();
    const lessons=path.steps.map(articleBySlug).filter(Boolean);
    return shell('learn',`<section class="page-hero"><div class="container narrow"><a class="back-link" href="#learn">← All learning paths</a><p class="eyebrow">${esc(path.audience)} learning path</p><h1>${esc(path.title)}</h1><p>${esc(path.description)}</p>${meta([path.duration,`${lessons.length} lessons`])}</div></section><section class="content-section"><div class="container narrow"><div class="lesson-list">${lessons.map((article,index)=>`<article class="lesson"><div class="lesson-number">${String(index+1).padStart(2,'0')}</div><div><span class="content-type">${esc(article.type)} · ${article.readTime} min</span><h2><a href="#article/${esc(article.slug)}">${esc(article.title)}</a></h2><p>${esc(article.excerpt)}</p></div><a class="lesson-action" href="#article/${esc(article.slug)}" aria-label="Open ${esc(article.title)}">${icons.arrow}</a></article>`).join('')}</div></div></section>`);
  }
  return shell('learn',`<section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Learn in a sensible order</p><h1>Build confidence step by step.</h1><p>AI Compass learning paths connect our strongest guides into short, goal-based courses. Start with the path that matches what you need to do next.</p></div><div class="page-stat"><strong>${L.learningPaths.length}</strong><span>curated paths<br>${D.articles.length} detailed guides</span></div></div></section><section class="content-section"><div class="container path-grid">${L.learningPaths.map(pathCard).join('')}</div></section><section class="content-section tinted"><div class="container">${sectionHeading('Not sure where to start?','Use the beginner route','It covers the minimum foundations before you move into tools, automation or agents.')}<div class="beginner-strip"><div><strong>1</strong><span>Choose a service</span></div><div><strong>2</strong><span>Give clear instructions</span></div><div><strong>3</strong><span>Protect information</span></div><div><strong>4</strong><span>Verify important claims</span></div><a class="primary-link" href="#learn/start-here">Start now ${icons.arrow}</a></div></div></section>`);
}

function guides(categoryId=''){
  const categoryOptions=D.categories.map(item=>`<option value="${esc(item.id)}" ${categoryId===item.id?'selected':''}>${esc(item.name)}</option>`).join('');
  return shell('guides',`<section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">AI Compass originals</p><h1>Practical guides for real decisions and workflows.</h1><p>Long-form, source-backed articles covering AI fundamentals, subscriptions, integrations, local models, research, RAG and production agents.</p></div><div class="page-stat"><strong>${D.articles.length}</strong><span>original guides<br>beginner to advanced</span></div></div></section><section class="filter-bar"><div class="container filter-grid"><label>Search guides<input id="guideSearch" type="search" placeholder="Search titles, topics and tags"></label><label>Category<select id="guideCategory"><option value="all">All categories</option>${categoryOptions}</select></label><label>Level<select id="guideLevel"><option value="all">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label></div></section><section class="content-section"><div class="container"><div class="results-line"><span id="guideSummary"></span><span>AI Compass original content</span></div><div class="guide-grid" id="guideDirectory"></div><div class="empty-state" id="guideEmpty" hidden><h2>No guides match those filters.</h2><p>Try a broader search or another category.</p></div></div></section>`);
}

function article(slug){
  const article=articleBySlug(slug);
  if(!article)return shell('guides',`<section class="page-hero"><div class="container narrow"><h1>Guide not found</h1><p>The requested article is not available.</p><a class="primary-link" href="#guides">Browse all guides ${icons.arrow}</a></div></section>`);
  const c=category(article.category);
  const related=D.articles.filter(item=>item.slug!==article.slug&&(item.category===article.category||item.tags.some(tag=>article.tags.includes(tag)))).slice(0,3);
  const saved=safeStore.getItem(`saved:${article.slug}`)==='1';
  return shell('guides',`<div class="reading-progress" id="readingProgress"></div><article class="article-page"><header class="article-header"><div class="container article-header-grid"><div><a class="back-link" href="#guides">← All guides</a><div class="article-labels"><span class="content-type">AI Compass original</span><span class="level-badge">${esc(article.level)}</span></div><h1>${esc(article.title)}</h1><p>${esc(article.excerpt)}</p>${meta([c.name,`${article.readTime} min read`,article.updated?`Updated ${fmtDate(article.updated)}`:`Published ${fmtDate(article.date)}`,`${article.sources?.length||0} sources`])}<div class="article-actions"><button id="saveGuide" class="button-secondary">${saved?'Saved ✓':'Save guide'}</button><button id="copyLink" class="button-secondary">Copy link</button></div></div><aside class="article-summary"><p class="eyebrow">In this guide</p><ol>${article.sections.map(section=>`<li><a href="#section-${esc(section.id)}">${esc(section.title)}</a></li>`).join('')}</ol></aside></div></header><div class="container article-layout"><div class="article-body">${article.sections.map(section=>`<section id="section-${esc(section.id)}"><h2>${esc(section.title)}</h2>${section.html}</section>`).join('')}${article.sources?.length?`<section class="sources"><h2>Sources and verification</h2><p>Open the original sources and check dates before relying on time-sensitive details.</p><ol>${article.sources.map(source=>`<li><a href="${esc(source.url)}"${externalAttrs(source.url)}>${esc(source.title)} ${icons.external}</a><span>${esc(source.publisher||'Primary source')}</span></li>`).join('')}</ol></section>`:''}</div><aside class="article-rail"><div class="article-rail-card"><strong>Trust note</strong><p>AI Compass separates original guidance from external reporting. Pricing, product availability and capabilities can change.</p><a href="#about">Read our editorial method</a></div></aside></div></article><section class="content-section tinted"><div class="container">${sectionHeading('Continue learning','Related guides','Move to the next useful topic rather than starting over.')}<div class="guide-grid">${related.map(item=>guideCard(item)).join('')}</div></div></section>`);
}

function tips(){
  const categories=[...new Set(L.tips.map(item=>item.category))].sort();
  return shell('tips',`<section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Small improvements, immediate value</p><h1>Tips and patterns for better AI work.</h1><p>Concise, reusable practices for prompting, research, privacy, coding, context management and safe automation.</p></div><div class="page-stat"><strong>${L.tips.length}</strong><span>practical tips<br>linked to deeper guides</span></div></div></section><section class="filter-bar"><div class="container filter-grid two"><label>Search tips<input id="tipSearch" type="search" placeholder="Search tips and examples"></label><label>Category<select id="tipCategory"><option value="all">All categories</option>${categories.map(value=>`<option>${esc(value)}</option>`).join('')}</select></label></div></section><section class="content-section"><div class="container"><div class="results-line"><span id="tipSummary"></span><span>Test the advice against your own workflow</span></div><div class="tips-grid" id="tipDirectory"></div><div class="empty-state" id="tipEmpty" hidden><h2>No tips match that search.</h2></div></div></section>`);
}

function reference(){
  return shell('reference',`<section class="page-hero reference-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Plain-English AI reference</p><h1>Understand the terms without the jargon.</h1><p>Short definitions explain what a concept means, why it matters and where people commonly misunderstand it.</p></div><div class="page-stat"><strong>${L.references.length}</strong><span>core concepts<br>more being added</span></div></div></section><section class="filter-bar"><div class="container filter-grid one"><label>Search the reference<input id="referenceSearch" type="search" placeholder="Try RAG, agent, context window or benchmark"></label></div></section><section class="content-section"><div class="container narrow-wide"><div class="results-line"><span id="referenceSummary"></span><span>Definitions, not marketing labels</span></div><div class="reference-list" id="referenceDirectory"></div><div class="empty-state" id="referenceEmpty" hidden><h2>No terms match that search.</h2></div></div></section>`);
}

function tools(){
  const repoCategories=[...new Set(D.repos.map(item=>item.category))].sort();
  return shell('tools',`<section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Choose by workflow, evidence and constraints</p><h1>Tools, models and open-source projects.</h1><p>Use comparisons to narrow the field, then check official sources, licence terms, maintenance activity and fit with your actual work.</p></div><div class="page-stat"><strong>${D.comparisons.length+D.repos.length}</strong><span>plans and repositories<br>curated with caution notes</span></div></div></section><section class="content-section"><div class="container">${sectionHeading('Subscription comparison','Popular AI plans','A practical snapshot—not a permanent ranking. Pricing and features require current verification.')}<div class="comparison-grid">${D.comparisons.map(comparisonCard).join('')}</div></div></section><section class="content-section tinted"><div class="container">${sectionHeading('Open-source directory','Repositories worth investigating','Inclusion means the project is relevant, not automatically safe or endorsed.')}<div class="repo-controls"><label>Search repositories<input id="repoSearch" type="search" placeholder="Search project, category, language or tags"></label><label>Category<select id="repoCategory"><option value="all">All categories</option>${repoCategories.map(value=>`<option>${esc(value)}</option>`).join('')}</select></label></div><div class="results-line"><span id="repoSummary"></span><span>Check licence, security and activity before adoption</span></div><div class="repo-directory" id="repoDirectory"></div><div class="empty-state" id="repoEmpty" hidden><h2>No repositories match those filters.</h2></div></div></section>`);
}

function resources(){
  const resourceFeed=F.filter(item=>['Video','Podcast','Paper','Report','Guide'].includes(item.format)).slice(0,12);
  return shell('resources',`<section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Curated material from across the web</p><h1>Videos, papers, reports and useful external guides.</h1><p>AI Compass links to the original publisher, clearly labels the source and keeps third-party material separate from our own guides.</p></div><div class="page-stat"><strong>${resourceFeed.length}</strong><span>featured resources<br>from original publishers</span></div></div></section><section class="filter-bar"><div class="container filter-grid two"><label>Search resources<input id="resourceSearch" type="search" placeholder="Search title, source or topic"></label><label>Format<select id="resourceFormat"><option value="all">All formats</option>${[...new Set(resourceFeed.map(item=>item.format))].map(value=>`<option>${esc(value)}</option>`).join('')}</select></label></div></section><section class="content-section"><div class="container"><div class="results-line"><span id="resourceSummary"></span><span>External links open at the original source</span></div><div class="resource-grid" id="resourceDirectory"></div><div class="empty-state" id="resourceEmpty" hidden><h2>No resources match those filters.</h2></div></div></section>`);
}

function news(){
  const categories=[...new Set(F.map(item=>item.category))].sort();
  return shell('news',`<section class="page-hero news-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Latest developments</p><h1>AI news with sources and context.</h1><p>A dedicated feed for official announcements, independent reporting, research and open-source releases. Use the evergreen sections when you need to learn or make a decision.</p></div><div class="page-stat"><strong>${F.length}</strong><span>curated items<br>news is one feature</span></div></div></section><section class="filter-bar"><div class="container filter-grid"><label>Search news<input id="newsSearch" type="search" placeholder="Search headline, source or topic"></label><label>Topic<select id="newsCategory"><option value="all">All topics</option>${categories.map(value=>`<option>${esc(value)}</option>`).join('')}</select></label><label>Format<select id="newsFormat"><option value="all">All formats</option>${[...new Set(F.map(item=>item.format))].sort().map(value=>`<option>${esc(value)}</option>`).join('')}</select></label></div></section><section class="content-section"><div class="container news-layout"><div><div class="results-line"><span id="newsSummary"></span><span>External content remains the work of its publisher</span></div><div class="news-list" id="newsDirectory"></div><div class="empty-state" id="newsEmpty" hidden><h2>No news items match those filters.</h2></div></div><aside class="news-sidebar"><div class="sidebar-card"><p class="eyebrow">Use news well</p><h2>Turn developments into understanding.</h2><ol><li>Open the original source.</li><li>Check the publication date.</li><li>Separate announced features from available features.</li><li>Use a guide or comparison before changing your workflow.</li></ol><a class="text-link" href="#article/ai-news-signal-not-noise">Build a better news habit ${icons.arrow}</a></div><div class="sidebar-card"><p class="eyebrow">Looking for durable answers?</p><a href="#guides">Browse original guides</a><a href="#reference">Use the reference desk</a><a href="#tools">Compare tools and models</a></div></aside></div></section>`);
}

function resourceCard(item){
  return `<article class="resource-card"><div class="resource-source"><span class="source-avatar">${esc(initials(item.source))}</span><span><strong>${esc(item.source)}</strong><small>${esc(item.sourceType)}</small></span></div><span class="content-type">${esc(item.format)} · ${esc(item.category)}</span><h3><a href="${esc(item.url)}"${externalAttrs(item.url)}>${esc(item.title)} ${icons.external}</a></h3><p>${esc(item.dek)}</p>${meta([fmtDate(item.date),item.readTime])}</article>`;
}

function community(){
  const local=JSON.parse(safeStore.getItem('community:questions')||'[]');
  const questions=[...local,...D.questions];
  return shell('community',`<section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Questions shape the library</p><h1>Ask, answer and identify what needs a better guide.</h1><p>Community discussions are useful when they lead to clearer explanations, tested workflows and better source material.</p></div><div class="page-stat"><strong>${questions.length}</strong><span>questions<br>stored locally in this prototype</span></div></div></section><section class="content-section"><div class="container community-grid"><div class="question-list">${questions.map(item=>`<article class="question-card"><div>${meta([item.status||'Awaiting answer',item.author||item.name||'Community',item.replies!=null?`${item.replies} replies`:'Local draft'])}<h2>${esc(item.title)}</h2>${item.answer?`<p>${esc(item.answer)}</p>`:`<p>${esc(item.body||'This question is awaiting review.')}</p>`}${item.tags?meta(item.tags):''}</div></article>`).join('')}</div><aside><form class="question-form" id="questionForm"><p class="eyebrow">Ask a question</p><h2>What are you trying to understand or do?</h2><label>Title<input name="title" required maxlength="120"></label><label>Context<textarea name="body" required rows="6" maxlength="1000"></textarea></label><label>Name<input name="name" required maxlength="60"></label><button class="primary-button">Submit for review</button><small>This prototype stores your draft in this browser only.</small></form></aside></div></section>`);
}

function searchPage(params){
  const q=(params.get('q')||'').trim();
  const lower=q.toLowerCase();
  const guides=D.articles.filter(item=>[item.title,item.excerpt,item.tags.join(' '),category(item.category).name].join(' ').toLowerCase().includes(lower));
  const tips=L.tips.filter(item=>[item.title,item.summary,item.category,item.example].join(' ').toLowerCase().includes(lower));
  const refs=L.references.filter(item=>[item.term,item.definition,item.why,item.tags.join(' ')].join(' ').toLowerCase().includes(lower));
  const repos=D.repos.filter(item=>[item.name,item.description,item.category,item.language,item.tags.join(' ')].join(' ').toLowerCase().includes(lower));
  const news=F.filter(item=>[item.title,item.dek,item.source,item.category,item.format].join(' ').toLowerCase().includes(lower));
  const total=guides.length+tips.length+refs.length+repos.length+news.length;
  return shell('home',`<section class="page-hero"><div class="container narrow-wide"><p class="eyebrow">Search AI Compass</p><h1>${q?`Results for “${esc(q)}”`:'Search the full library'}</h1><p>${q?`${total} result${total===1?'':'s'} across original guides, tips, references, repositories and news.`:'Use the search box above to find a concept, tool or task.'}</p></div></section>${q?`<section class="content-section"><div class="container search-results">${guides.length?`<section>${sectionHeading('Original content',`Guides (${guides.length})`,'')}<div class="guide-grid">${guides.slice(0,6).map(item=>guideCard(item)).join('')}</div></section>`:''}${tips.length?`<section>${sectionHeading('Practical library',`Tips (${tips.length})`,'')}<div class="tips-grid">${tips.slice(0,6).map(tipCard).join('')}</div></section>`:''}${refs.length?`<section>${sectionHeading('Reference',`Terms (${refs.length})`,'')}<div class="reference-list">${refs.slice(0,8).map(referenceItem).join('')}</div></section>`:''}${repos.length?`<section>${sectionHeading('Open source',`Repositories (${repos.length})`,'')}<div class="repo-directory">${repos.slice(0,8).map(repoRow).join('')}</div></section>`:''}${news.length?`<section>${sectionHeading('Latest developments',`News (${news.length})`,'')}<div class="news-list">${news.slice(0,6).map(item=>newsItem(item)).join('')}</div></section>`:''}${total?'':'<div class="empty-state"><h2>No results found.</h2><p>Try a broader phrase or browse the learning paths.</p></div>'}</div></section>`:''}`);
}

function saved(){
  const savedGuides=D.articles.filter(item=>safeStore.getItem(`saved:${item.slug}`)==='1');
  return shell('home',`<section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Saved in this browser</p><h1>Your reading list.</h1><p>Saved items currently remain on this device. Shared accounts require a future backend.</p></div><div class="page-stat"><strong>${savedGuides.length}</strong><span>saved guides</span></div></div></section><section class="content-section"><div class="container">${savedGuides.length?`<div class="guide-grid">${savedGuides.map(item=>guideCard(item)).join('')}</div>`:'<div class="empty-state"><h2>Your reading list is empty.</h2><p>Open a guide and choose “Save guide”.</p><a class="primary-link" href="#guides">Browse guides '+icons.arrow+'</a></div>'}</div></section>`);
}

function about(){
  return shell('',`<section class="page-hero"><div class="container narrow-wide"><p class="eyebrow">How AI Compass works</p><h1>Useful guidance requires more than collecting links.</h1><p>AI Compass combines original education, practical reference material and curated external discovery. Every content type has a different purpose and must be labelled accordingly.</p></div></section><section class="content-section"><div class="container principles-grid">${[
    ['Original guides','AI Compass explanations and decision support, written from reviewed sources.'],
    ['Reference','Concise definitions designed for retrieval and reuse.'],
    ['Tips & workflows','Small, testable practices linked to deeper guidance.'],
    ['Tools & comparisons','Practical fit and limitations—not universal rankings.'],
    ['External resources','Short previews that send the reader to the original publisher.'],
    ['News','A compact feed of developments, clearly separated from evergreen guidance.']
  ].map((item,index)=>`<article><span>0${index+1}</span><h2>${esc(item[0])}</h2><p>${esc(item[1])}</p></article>`).join('')}</div></section><section class="content-section tinted"><div class="container narrow-wide">${sectionHeading('Editorial principles','Trust is a product feature','')}<div class="method-list"><div><strong>Prefer primary sources</strong><p>Official documentation, research papers, standards and maintainer-owned repositories come first.</p></div><div><strong>Show dates and uncertainty</strong><p>Fast-changing details must include verification dates and clear limitations.</p></div><div><strong>Separate evidence from judgement</strong><p>Facts, interpretation, recommendations and external claims should not blur together.</p></div><div><strong>Do not manufacture volume</strong><p>A smaller, maintained library is more useful than endless duplicated content.</p></div></div></div></section>`);
}

function owner(){
  const decisions=JSON.parse(safeStore.getItem('approval:decisions')||'{}');
  return shell('',`<section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow">Editorial review queue</p><h1>Human judgement stays visible.</h1><p>Potential updates that involve weak evidence, duplication, sensitive claims or major changes should not publish automatically.</p></div><div class="page-stat"><strong>${D.approvalQueue.length}</strong><span>items awaiting review</span></div></div></section><section class="content-section"><div class="container owner-list">${D.approvalQueue.map(item=>{const status=decisions[item.id]||item.status;return `<article class="owner-item" data-id="${esc(item.id)}"><div><span class="status">${esc(status)}</span><h2>${esc(item.title)}</h2><p>${esc(item.reason)}</p>${meta([`${item.confidence}% confidence`,item.source,item.action])}</div><div><button data-decision="Rejected" class="button-secondary">Reject</button><button data-decision="Approved" class="primary-button">Approve</button></div></article>`}).join('')}</div></section>`);
}

function render(){
  try{
    const r=route();
    window.onscroll=null;
    let html;
    switch(r.page){
      case 'home':html=home();break;
      case 'learn':html=learn(r.arg);break;
      case 'guides':html=guides(r.arg);break;
      case 'article':html=article(r.arg);break;
      case 'tips':html=tips();break;
      case 'reference':html=reference();break;
      case 'tools':case 'compare':case 'repos':html=tools();break;
      case 'resources':case 'videos':html=resources();break;
      case 'news':case 'explore':html=news();break;
      case 'community':html=community();break;
      case 'search':html=searchPage(r.params);break;
      case 'saved':html=saved();break;
      case 'about':html=about();break;
      case 'owner':html=owner();break;
      default:html=home();
    }
    app.innerHTML=html;
    document.title=titleForRoute(r);
    bind(r);
    window.scrollTo(0,0);
    const main=document.getElementById('main');
    if(main&&!firstRender)main.focus({preventScroll:true});
    firstRender=false;
  }catch(error){
    console.error(error);
    app.innerHTML=`<main id="main" class="empty-state"><h1>AI Compass could not load.</h1><p>${esc(error.message||'Unknown error')}</p></main>`;
  }
}

function titleForRoute(r){
  const titles={home:'AI Compass — Learn, choose and use AI with confidence',learn:'Learn AI — AI Compass',guides:'Practical AI guides — AI Compass',tips:'AI tips and tricks — AI Compass',reference:'AI reference — AI Compass',tools:'AI tools and models — AI Compass',resources:'AI resources — AI Compass',news:'AI news — AI Compass',community:'Community — AI Compass',about:'Editorial method — AI Compass',saved:'Saved guides — AI Compass',search:'Search — AI Compass',owner:'Editorial review queue — AI Compass'};
  if(r.page==='article'){const item=articleBySlug(r.arg);return item?`${item.title} — AI Compass`:'Guide — AI Compass'}
  return titles[r.page]||'AI Compass';
}

function bind(r){
  const menu=document.getElementById('menuButton');
  const nav=document.getElementById('primaryNav');
  menu?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));

  const submitSearch=form=>{
    form?.addEventListener('submit',event=>{
      event.preventDefault();
      const q=String(new FormData(form).get('q')||'').trim();
      location.hash=q?`search?q=${encodeURIComponent(q)}`:'guides';
    });
  };
  submitSearch(document.getElementById('globalSearch'));
  submitSearch(document.getElementById('heroSearch'));

  if(r.page==='guides')bindGuideFilters();
  if(r.page==='tips')bindTipFilters();
  if(r.page==='reference')bindReferenceFilters(r.params);
  if(['tools','compare','repos'].includes(r.page))bindRepoFilters();
  if(['resources','videos'].includes(r.page))bindResourceFilters();
  if(['news','explore'].includes(r.page))bindNewsFilters();

  document.getElementById('copyLink')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);showToast('Guide link copied')}catch{showToast('Copy the address from your browser')}});
  document.getElementById('saveGuide')?.addEventListener('click',event=>{
    const slug=route().arg;
    const key=`saved:${slug}`;
    const saved=safeStore.getItem(key)==='1';
    if(saved)safeStore.removeItem(key);else safeStore.setItem(key,'1');
    event.currentTarget.textContent=saved?'Save guide':'Saved ✓';
    showToast(saved?'Removed from reading list':'Saved to reading list');
  });
  document.getElementById('questionForm')?.addEventListener('submit',event=>{
    event.preventDefault();
    const form=new FormData(event.currentTarget);
    const items=JSON.parse(safeStore.getItem('community:questions')||'[]');
    items.unshift({title:form.get('title'),body:form.get('body'),name:form.get('name'),status:'Awaiting review'});
    safeStore.setItem('community:questions',JSON.stringify(items));
    showToast('Question saved for review');
    render();
  });
  document.querySelectorAll('[data-decision]').forEach(button=>button.addEventListener('click',()=>{
    const item=button.closest('.owner-item');
    const decisions=JSON.parse(safeStore.getItem('approval:decisions')||'{}');
    decisions[item.dataset.id]=button.dataset.decision;
    safeStore.setItem('approval:decisions',JSON.stringify(decisions));
    showToast(button.dataset.decision);
    render();
  }));

  if(r.page==='article'){
    const progress=document.getElementById('readingProgress');
    const updateProgress=()=>{const doc=document.documentElement;const distance=doc.scrollHeight-innerHeight;const pct=distance>0?Math.min(100,(scrollY/distance)*100):0;if(progress)progress.style.width=`${pct}%`};
    updateProgress();
    window.onscroll=updateProgress;
  }
}

function bindGuideFilters(){
  const search=document.getElementById('guideSearch');
  const categorySelect=document.getElementById('guideCategory');
  const level=document.getElementById('guideLevel');
  const directory=document.getElementById('guideDirectory');
  const summary=document.getElementById('guideSummary');
  const empty=document.getElementById('guideEmpty');
  const update=()=>{
    const q=search.value.trim().toLowerCase();
    const items=D.articles.filter(item=>(categorySelect.value==='all'||item.category===categorySelect.value)&&(level.value==='all'||item.level===level.value)&&(!q||[item.title,item.excerpt,item.tags.join(' '),category(item.category).name].join(' ').toLowerCase().includes(q)));
    directory.innerHTML=items.map(item=>guideCard(item)).join('');
    summary.textContent=`${items.length} guide${items.length===1?'':'s'}`;
    empty.hidden=items.length>0;
  };
  [search,categorySelect,level].forEach(control=>control.addEventListener(control.tagName==='INPUT'?'input':'change',update));
  update();
}

function bindTipFilters(){
  const search=document.getElementById('tipSearch');
  const categorySelect=document.getElementById('tipCategory');
  const directory=document.getElementById('tipDirectory');
  const summary=document.getElementById('tipSummary');
  const empty=document.getElementById('tipEmpty');
  const update=()=>{
    const q=search.value.trim().toLowerCase();
    const items=L.tips.filter(item=>(categorySelect.value==='all'||item.category===categorySelect.value)&&(!q||[item.title,item.summary,item.example,item.category,item.level].join(' ').toLowerCase().includes(q)));
    directory.innerHTML=items.map(tipCard).join('');
    summary.textContent=`${items.length} practical tip${items.length===1?'':'s'}`;
    empty.hidden=items.length>0;
  };
  search.addEventListener('input',update);categorySelect.addEventListener('change',update);update();
}

function bindReferenceFilters(params){
  const search=document.getElementById('referenceSearch');
  const directory=document.getElementById('referenceDirectory');
  const summary=document.getElementById('referenceSummary');
  const empty=document.getElementById('referenceEmpty');
  const initial=params?.get('term')||'';
  if(initial)search.value=initial;
  const update=()=>{
    const q=search.value.trim().toLowerCase();
    const items=L.references.filter(item=>!q||[item.term,item.definition,item.why,item.tags.join(' ')].join(' ').toLowerCase().includes(q));
    directory.innerHTML=items.map(referenceItem).join('');
    summary.textContent=`${items.length} reference term${items.length===1?'':'s'}`;
    empty.hidden=items.length>0;
  };
  search.addEventListener('input',update);update();
}

function bindRepoFilters(){
  const search=document.getElementById('repoSearch');
  const categorySelect=document.getElementById('repoCategory');
  const directory=document.getElementById('repoDirectory');
  const summary=document.getElementById('repoSummary');
  const empty=document.getElementById('repoEmpty');
  if(!search)return;
  const update=()=>{
    const q=search.value.trim().toLowerCase();
    const items=D.repos.filter(item=>(categorySelect.value==='all'||item.category===categorySelect.value)&&(!q||[item.name,item.description,item.category,item.language,item.tags.join(' ')].join(' ').toLowerCase().includes(q)));
    directory.innerHTML=items.map(repoRow).join('');
    summary.textContent=`${items.length} repositor${items.length===1?'y':'ies'}`;
    empty.hidden=items.length>0;
  };
  search.addEventListener('input',update);categorySelect.addEventListener('change',update);update();
}

function bindResourceFilters(){
  const search=document.getElementById('resourceSearch');
  const format=document.getElementById('resourceFormat');
  const directory=document.getElementById('resourceDirectory');
  const summary=document.getElementById('resourceSummary');
  const empty=document.getElementById('resourceEmpty');
  if(!search)return;
  const resourceFeed=F.filter(item=>['Video','Podcast','Paper','Report','Guide'].includes(item.format));
  const update=()=>{
    const q=search.value.trim().toLowerCase();
    const items=resourceFeed.filter(item=>(format.value==='all'||item.format===format.value)&&(!q||[item.title,item.dek,item.source,item.category,item.format].join(' ').toLowerCase().includes(q)));
    directory.innerHTML=items.map(resourceCard).join('');
    summary.textContent=`${items.length} external resource${items.length===1?'':'s'}`;
    empty.hidden=items.length>0;
  };
  search.addEventListener('input',update);format.addEventListener('change',update);update();
}

function bindNewsFilters(){
  const search=document.getElementById('newsSearch');
  const categorySelect=document.getElementById('newsCategory');
  const format=document.getElementById('newsFormat');
  const directory=document.getElementById('newsDirectory');
  const summary=document.getElementById('newsSummary');
  const empty=document.getElementById('newsEmpty');
  if(!search)return;
  const update=()=>{
    const q=search.value.trim().toLowerCase();
    const items=[...F].sort((a,b)=>String(b.date).localeCompare(String(a.date))).filter(item=>(categorySelect.value==='all'||item.category===categorySelect.value)&&(format.value==='all'||item.format===format.value)&&(!q||[item.title,item.dek,item.source,item.category,item.format].join(' ').toLowerCase().includes(q)));
    directory.innerHTML=items.map((item,index)=>newsItem(item,index===0)).join('');
    summary.textContent=`${items.length} curated item${items.length===1?'':'s'}`;
    empty.hidden=items.length>0;
  };
  search.addEventListener('input',update);categorySelect.addEventListener('change',update);format.addEventListener('change',update);update();
}

addEventListener('hashchange',render);
document.addEventListener('DOMContentLoaded',render);
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    const nav=document.getElementById('primaryNav');
    const menu=document.getElementById('menuButton');
    if(nav?.classList.contains('open')){nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.focus()}
  }
  if(event.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){event.preventDefault();document.querySelector('#globalSearch input')?.focus()}
});
})();
