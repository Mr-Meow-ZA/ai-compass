(()=>{
'use strict';
const X=window.AI_COMPASS_DISCOVERY||{tools:[],models:[],courses:[],resources:[]};
const D=window.AI_COMPASS_DATA||{articles:[],repos:[]};
const L=window.AI_COMPASS_LIBRARY||{learningPaths:[],tips:[]};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ext=' target="_blank" rel="noopener noreferrer"';
const current=()=>{const raw=(location.hash||'#home').slice(1);const [path]=raw.split('?');const parts=path.split('/').filter(Boolean);return{page:parts[0]||'home',arg:parts[1]||''}};
const meta=items=>`<div class="meta-row">${items.filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('')}</div>`;
const tags=items=>`<div class="taxonomy-tags">${(items||[]).slice(0,6).map(x=>`<span>${esc(x)}</span>`).join('')}</div>`;
const hero=(kicker,title,copy,stat,label)=>`<section class="page-hero evolution-hero"><div class="container page-hero-grid"><div><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1><p>${esc(copy)}</p></div><div class="page-stat"><strong>${esc(stat)}</strong><span>${esc(label)}</span></div></div></section>`;

function setMain(html,title){
 const main=document.getElementById('main');if(!main)return;
 main.innerHTML=html;document.title=`${title} — AI Compass`;main.focus?.({preventScroll:true});
}

function upgradeNav(){
 const r=current();
 const nav=document.querySelector('#primaryNav .nav-inner');
 if(nav){
  const items=[['home','Home'],['learn','Learn'],['guides','Guides'],['practical','Practical'],['tools','Tools'],['models','Models'],['courses','Courses'],['resources','Resources'],['news','News']];
  nav.innerHTML=items.map(([id,label])=>`<a href="#${id}" ${((r.page==='tips'&&id==='practical')||r.page===id)?'aria-current="page"':''}>${label}</a>`).join('');
 }
 const footerLinks=document.querySelectorAll('.site-footer a[href="#tips"]');footerLinks.forEach(a=>{a.href='#practical';a.textContent='Practical library'});
 const toolLinks=document.querySelectorAll('.site-footer a[href="#tools"]');toolLinks.forEach(a=>{if(a.textContent.includes('Tools'))a.textContent='Tools'});
 const search=document.querySelector('#globalSearch input');if(search)search.placeholder='Search guides, courses, tools, models and AI concepts';
 const utility=document.querySelector('.utility-inner div');
 if(utility&&!utility.querySelector('a[href="#courses"]'))utility.insertAdjacentHTML('afterbegin','<a href="#courses">Vetted courses</a>');
}

function toolCard(t){return `<article class="directory-card"><div class="directory-head"><span class="content-type">${esc(t.type)}</span><span class="level-badge">${esc(t.level)}</span></div><h2>${esc(t.name)}</h2><p class="directory-provider">${esc(t.provider)}</p><p><strong>Best for:</strong> ${esc(t.bestFor)}</p><p class="caution"><strong>Watch:</strong> ${esc(t.watch)}</p>${tags(t.tags)}<div class="directory-actions"><a class="primary-link" href="${esc(t.url)}"${ext}>Open tool ↗</a><a class="text-link" href="${esc(t.sourceUrl)}"${ext}>Official information ↗</a></div></article>`}
function modelCard(m){return `<article class="directory-card model-card"><div class="directory-head"><span class="content-type">${esc(m.access)}</span><span>${esc(m.openness)}</span></div><h2>${esc(m.name)}</h2><p class="directory-provider">${esc(m.provider)}</p><p><strong>Good fit:</strong> ${esc(m.bestFor)}</p><p class="caution"><strong>Watch:</strong> ${esc(m.watch)}</p>${tags(m.tags)}<a class="primary-link" href="${esc(m.url)}"${ext}>Official model documentation ↗</a></article>`}
function courseCard(c){return `<article class="course-card"><div class="course-score"><strong>${esc(c.rating)}</strong><span>AI Compass<br>editorial score</span></div><div><div class="directory-head"><span class="content-type">${esc(c.level)}</span><span>Verified ${esc(c.verified)}</span></div><h2>${esc(c.title)}</h2><p class="directory-provider">${esc(c.provider)}</p><p><strong>Best for:</strong> ${esc(c.audience)}</p><p>${esc(c.why)}</p><div class="course-value"><strong>Why it is valuable</strong><p>${esc(c.value)}</p></div><p class="caution"><strong>Who should skip it:</strong> ${esc(c.skip)}</p>${meta([c.duration,c.cost,c.certificate])}<div class="directory-actions"><a class="primary-link" href="${esc(c.url)}"${ext}>View course ↗</a><a class="text-link" href="#learn/${esc(c.path)}">Related AI Compass path →</a></div></div></article>`}
function resourceCard(r){return `<a class="resource-toolkit-card" href="${esc(r.href)}"><span class="content-type">${esc(r.type)}</span><h2>${esc(r.title)}</h2><p>${esc(r.summary)}</p>${meta([r.audience,r.source])}${tags(r.tags)}<span class="card-action">Open resource →</span></a>`}
function repoCard(r){return `<article class="repo-row"><div class="repo-icon">&lt;/&gt;</div><div><h3><a href="${esc(r.url)}"${ext}>${esc(r.name)} ↗</a></h3><p>${esc(r.description)}</p>${meta([r.category,r.language,r.checked?`Checked ${r.checked}`:''])}${tags(r.tags)}</div></article>`}

function renderTools(){setMain(`${hero('Choose the product, not the hype','AI tools for real tasks.','Browse assistants, work suites, research tools and developer products by what they are actually useful for. Tool profiles are editorial starting points, not universal rankings.',X.tools.length,'vetted tool profiles')}<section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Tool directory</p><h2>Start with the job you need to do.</h2><p>Check the official source before buying or deploying; product capabilities and plans change quickly.</p></div><a class="text-link" href="#models">Compare model families →</a></div><div class="directory-grid">${X.tools.map(toolCard).join('')}</div></div></section>`,'AI tools')}
function renderModels(){setMain(`${hero('Separate the model from the product','AI model families, explained.','Compare the major model ecosystems by access, deployment style, openness and practical fit. AI Compass avoids unsupported “best model” rankings.',X.models.length,'model families')}<section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Model directory</p><h2>Choose by constraints and workload.</h2><p>Model names and versions move quickly; family pages point readers back to current provider documentation.</p></div><a class="text-link" href="#reference?term=open-weight">Understand open weights →</a></div><div class="directory-grid">${X.models.map(modelCard).join('')}</div></div></section>`,'AI models')}
function renderCourses(){setMain(`${hero('Vetted training, not a course marketplace','AI courses worth your time.','AI Compass reviews reputable training for learning quality, practical value, audience fit and limitations. Provider marketing claims do not determine the score.',X.courses.length,'vetted courses')}<section class="course-method"><div class="container"><div><strong>How we review courses</strong><span>Curriculum quality</span><span>Practical exercises</span><span>Transferable skills</span><span>Audience fit</span><span>Source credibility</span><span>Value for time and cost</span></div></div></section><section class="content-section"><div class="container course-list">${X.courses.sort((a,b)=>b.rating-a.rating).map(courseCard).join('')}</div></section>`,'AI courses')}
function renderPractical(){
 const kinds=[['Prompt recipes','Prompting','Instructions you can reuse immediately.'],['Quality & verification','Quality','Patterns for checking outputs and assumptions.'],['Workflow patterns','Workflow','Ways to turn useful chats into repeatable work.'],['Safety & governance','Safety','Small controls that prevent large mistakes.']];
 setMain(`${hero('The AI Compass toolkit','Practical patterns you can use today.','Short recipes, checklists and habits for prompting, research, automation, quality and safe AI work. Each item points to deeper guidance when you need it.',L.tips.length,'practical patterns')}<section class="practical-map"><div class="container practical-map-grid">${kinds.map(([a,b,c])=>`<a href="#search?q=${encodeURIComponent(b)}"><span>${esc(b)}</span><strong>${esc(a)}</strong><p>${esc(c)}</p></a>`).join('')}</div></section><section class="content-section"><div class="container"><div class="tips-grid">${L.tips.map(t=>`<article class="tip-card"><div class="tip-card-head"><span class="content-type">${esc(t.category)}</span><span>${esc(t.level)}</span></div><h3>${esc(t.title)}</h3><p>${esc(t.summary)}</p><div class="tip-example"><strong>Try this</strong><code>${esc(t.example)}</code></div><a class="text-link" href="#article/${esc(t.related)}">Open the deeper guide →</a></article>`).join('')}</div></div></section>`,'Practical AI library')
}
function renderResources(){
 const repos=(D.repos||[]).slice(0,14);
 setMain(`${hero('Useful things, not a link dump','Resources for building and using AI.','Templates, checklists, frameworks and curated repositories chosen because they help readers complete real work. Original AI Compass resources are clearly separated from external projects.',X.resources.length+repos.length,'toolkit items and repositories')}<section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">AI Compass toolkit</p><h2>Reusable frameworks and checklists.</h2><p>Open the underlying guide for instructions, context and source-backed reasoning.</p></div></div><div class="resource-toolkit-grid">${X.resources.map(resourceCard).join('')}</div></div></section><section class="content-section tinted" id="repositories"><div class="container"><div class="section-heading"><div><p class="eyebrow">Curated open source</p><h2>Repositories worth investigating.</h2><p>Inclusion means relevance, not automatic endorsement. Check licence, security posture, maintenance and fit before adoption.</p></div></div><div class="repo-directory">${repos.map(repoCard).join('')}</div></div></section>`,'AI resources')
}

function enhanceHome(){
 const heroEl=document.querySelector('.hero');if(!heroEl||document.querySelector('.evolution-entrypoints'))return;
 const section=document.createElement('section');section.className='evolution-entrypoints';
 section.innerHTML=`<div class="container"><p class="eyebrow">Choose your route</p><h2>What do you want from AI Compass?</h2><div class="entrypoint-grid">${[['Learn AI','#learn','Start with structured paths by experience and goal.'],['Build something','#guides','Follow practical, source-backed build guides.'],['Use AI better','#practical','Grab prompts, checklists and workflow patterns.'],['Choose a tool','#tools','Compare products by task and constraints.'],['Understand models','#models','Learn the model families behind the products.'],['Take a course','#courses','Use training we have reviewed and rated.'],['Get a resource','#resources','Templates, frameworks and curated repositories.'],['Stay current','#news','See the developments that are actually worth knowing.']].map(([t,h,p])=>`<a href="${h}"><strong>${t}</strong><p>${p}</p><span>Explore →</span></a>`).join('')}</div></div>`;
 heroEl.insertAdjacentElement('afterend',section);
}

function enhanceLearn(){
 if(current().arg||document.querySelector('.learning-lanes'))return;
 const heroEl=document.querySelector('.page-hero');if(!heroEl)return;
 const lanes=document.createElement('section');lanes.className='learning-lanes';
 const path=(id)=>L.learningPaths.find(x=>x.id===id);
 const laneData=[
  ['01','AI Essentials','Start here if AI still feels unfamiliar.',['start-here']],
  ['02','AI for Work','Move from chat to repeatable professional workflows.',['office-productivity','work-smarter']],
  ['03','AI Power User','Build context, automation and stronger operating habits.',['responsible-adoption','build-agents']],
  ['04','AI Builder & Enterprise','Design, test and govern AI systems at work.',['enterprise-ai-builder']]
 ];
 lanes.innerHTML=`<div class="container"><div class="section-heading"><div><p class="eyebrow">Choose by experience</p><h2>From first use to enterprise builder.</h2><p>You do not need to know AI terminology to choose what to learn next.</p></div></div><div class="learning-lane-grid">${laneData.map(([n,t,d,ids])=>`<article><span>${n}</span><h3>${t}</h3><p>${d}</p>${ids.map(id=>path(id)).filter(Boolean).map(p=>`<a href="#learn/${esc(p.id)}">${esc(p.title)} →</a>`).join('')}</article>`).join('')}</div></div>`;
 heroEl.insertAdjacentElement('afterend',lanes);
}

function enhanceGuides(){
 const directory=document.getElementById('guideDirectory');if(!directory)return;
 const bar=document.querySelector('.filter-bar .container');
 if(bar&&!document.querySelector('.guide-topic-bar')){
  const popular=['agents','RAG','workflows','research','security','evaluation','prompting','enterprise AI'];
  const row=document.createElement('div');row.className='guide-topic-bar';row.innerHTML=`<span>Popular topics</span>${popular.map(t=>`<button type="button" data-guide-topic="${esc(t)}">${esc(t)}</button>`).join('')}`;bar.insertAdjacentElement('afterend',row);
  row.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{const input=document.getElementById('guideSearch');if(input){input.value=btn.dataset.guideTopic;input.dispatchEvent(new Event('input',{bubbles:true}));}}));
 }
 requestAnimationFrame(()=>{
  directory.querySelectorAll('.guide-card-link').forEach(link=>{
   if(link.querySelector('.taxonomy-tags'))return;
   const slug=decodeURIComponent((link.getAttribute('href')||'').split('/').pop()||'');const a=D.articles.find(x=>x.slug===slug);if(!a)return;
   const action=link.querySelector('.card-action');if(action)action.insertAdjacentHTML('beforebegin',tags(a.tags));
  });
 });
}

function enhanceArticle(){
 const r=current();if(r.page!=='article')return;const a=D.articles.find(x=>x.slug===r.arg);if(!a)return;
 const labels=document.querySelector('.article-labels');if(labels&&!document.querySelector('.article-taxonomy'))labels.insertAdjacentHTML('afterend',`<div class="article-taxonomy">${(a.tags||[]).map(t=>`<a href="#search?q=${encodeURIComponent(t)}">${esc(t)}</a>`).join('')}</div>`);
}

function enhanceCommunity(){
 const heroEl=document.querySelector('.page-hero');if(!heroEl||document.querySelector('.community-roadmap'))return;
 const s=document.createElement('section');s.className='community-roadmap';s.innerHTML=`<div class="container"><div><p class="eyebrow">Community roadmap</p><h2>AI Compass is becoming a place to learn with other people.</h2><p>The current question board remains a browser-local prototype. The planned free profile system will add synced saves, followed topics and guides, learning progress, comments, forum posting, replies and moderation.</p></div><div class="community-capabilities">${['Free profile','Saved & followed content','Learning progress','Guide comments','Community forum','Helpful answers & moderation'].map(x=>`<span>${x}</span>`).join('')}</div><p class="roadmap-note"><strong>Editorial content stays separate from community content.</strong> User discussion will add experience and context without silently becoming AI Compass editorial guidance.</p></div>`;heroEl.insertAdjacentElement('afterend',s);
}

function enhance(){
 upgradeNav();const r=current();
 if(r.page==='tools'||r.page==='compare')return renderTools();
 if(r.page==='models')return renderModels();
 if(r.page==='courses')return renderCourses();
 if(r.page==='practical'||r.page==='tips')return renderPractical();
 if(r.page==='resources'||r.page==='videos'||r.page==='repos')return renderResources();
 if(r.page==='home')enhanceHome();
 if(r.page==='learn')enhanceLearn();
 if(r.page==='guides')enhanceGuides();
 if(r.page==='article')enhanceArticle();
 if(r.page==='community')enhanceCommunity();
}

document.addEventListener('DOMContentLoaded',()=>setTimeout(enhance,0));
addEventListener('hashchange',()=>setTimeout(enhance,0));
})();