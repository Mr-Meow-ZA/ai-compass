(()=>{
'use strict';
const D=window.AI_COMPASS_DATA||{articles:[]};
const L=window.AI_COMPASS_LIBRARY||{learningPaths:[]};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
const current=()=>{const raw=(location.hash||'#home').slice(1);const [path]=raw.split('?');const parts=path.split('/').filter(Boolean);return{page:parts[0]||'home',arg:parts[1]||''}};
const article=slug=>D.articles.find(x=>x.slug===slug);
const path=id=>L.learningPaths.find(x=>x.id===id);
const setMain=(html,title)=>{const main=document.getElementById('main');if(!main)return;main.innerHTML=html;document.title=`${title} — AI Compass`;main.focus?.({preventScroll:true})};
const hero=(kicker,title,copy)=>`<section class="page-hero reader-hero"><div class="container"><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1><p>${esc(copy)}</p></div></section>`;

const journeys=[
 {id:'new',number:'01',title:'I’m new to AI',copy:'Learn the essential concepts, prompting habits, privacy basics and verification skills without assuming technical knowledge.',primary:'#learn/start-here',primaryLabel:'Start AI Essentials',secondary:'#reference',secondaryLabel:'Browse plain-English terms'},
 {id:'work',number:'02',title:'I use AI at work',copy:'Move beyond one-off chats into dependable research, documents, spreadsheets, presentations and repeatable workflows.',primary:'#learn/work-smarter',primaryLabel:'Learn AI for work',secondary:'#practical',secondaryLabel:'Open practical patterns'},
 {id:'power',number:'03',title:'I want to become a power user',copy:'Build better context, reusable skills, RAG fundamentals, automation judgement and systematic evaluation habits.',primary:'#learn/ai-power-user',primaryLabel:'Become an AI power user',secondary:'#guides',secondaryLabel:'Browse deeper guides'},
 {id:'builder',number:'04',title:'I build AI tools and workflows',copy:'Design agents, orchestration, RAG, evaluations and production-ready systems with explicit testing and guardrails.',primary:'#build',primaryLabel:'Open the Build hub',secondary:'#learn/enterprise-ai-builder',secondaryLabel:'Follow the builder curriculum'},
 {id:'leader',number:'05',title:'I lead or govern AI at work',copy:'Focus on architecture, business value, security, rollout, evidence, decision rights and safe paths from experiment to production.',primary:'#article/design-an-enterprise-ai-architecture',primaryLabel:'Start with enterprise architecture',secondary:'#article/enterprise-ai-development-lifecycle',secondaryLabel:'See the AI delivery lifecycle'},
 {id:'local',number:'06',title:'I want private or local AI',copy:'Understand model families, deployment trade-offs and emerging local-AI hardware before choosing a machine or architecture.',primary:'#models',primaryLabel:'Explore model families',secondary:'#article/xiaomi-ai-cube-local-ai-prototype',secondaryLabel:'Read the latest local-AI analysis'},
 {id:'current',number:'07',title:'I want to keep up with AI',copy:'Get a selective daily briefing that separates what changed, why it matters and what is still unproven.',primary:'#news',primaryLabel:'Open Today in AI',secondary:'#home',secondaryLabel:'Return to the daily briefing'}
];

function upgradeNav(){
 const r=current();
 const nav=document.querySelector('#primaryNav .nav-inner');if(!nav)return;
 const groupPage=page=>['guides','practical','tips','resources'].includes(page)?'build':['tools','models','courses'].includes(page)?'choose':page;
 const active=groupPage(r.page);
 const items=[['home','Home'],['start','Start'],['learn','Learn'],['build','Build'],['choose','Choose'],['news','News'],['community','Community']];
 nav.innerHTML=items.map(([id,label])=>`<a href="#${id}" ${active===id?'aria-current="page"':''}>${label}</a>`).join('');
 const utility=document.querySelector('.utility-inner div');if(utility){
   utility.querySelectorAll('a[href="#community"]').forEach(a=>a.remove());
   if(!utility.querySelector('a[href="#start"]'))utility.insertAdjacentHTML('afterbegin','<a href="#start">Start here</a>');
 }
}

function upgradeFooter(){
 const grid=document.querySelector('.site-footer .footer-grid');if(!grid||grid.dataset.readerNav==='1')return;grid.dataset.readerNav='1';
 const brand=grid.firstElementChild?.outerHTML||'';
 grid.innerHTML=`${brand}
 <div><strong>Start & learn</strong><a href="#start">Find your route</a><a href="#learn">Learning paths</a><a href="#guides">All guides</a><a href="#courses">Vetted courses</a></div>
 <div><strong>Build & choose</strong><a href="#build">Build hub</a><a href="#practical">Practical library</a><a href="#tools">Tools</a><a href="#models">Models</a><a href="#resources">Resources</a></div>
 <div><strong>Stay informed</strong><a href="#news">Today in AI</a><a href="#community">Community</a><a href="#about">Editorial method</a><a href="https://github.com/Mr-Meow-ZA/ai-compass" target="_blank" rel="noopener noreferrer">GitHub source ↗</a></div>`;
}

function journeyCard(j){return `<article class="journey-card" data-journey="${j.id}"><span class="journey-number">${j.number}</span><h2>${esc(j.title)}</h2><p>${esc(j.copy)}</p><div class="journey-actions"><a class="primary-link" href="${j.primary}">${esc(j.primaryLabel)} →</a><a class="text-link" href="${j.secondary}">${esc(j.secondaryLabel)} →</a></div></article>`}

function renderStart(){
 setMain(`${hero('Start with your situation','You should not need to understand our menu first.','Choose the description that sounds most like you. AI Compass will point you toward a sensible next step instead of making you browse the whole library.')}
 <section class="reader-shortcuts"><div class="container"><div class="reader-shortcut-grid"><a href="#learn/start-here"><span>New</span><strong>New to AI?</strong><p>Start with four essential lessons.</p></a><a href="#learn/work-smarter"><span>Work</span><strong>Using AI professionally?</strong><p>Build reliable everyday workflows.</p></a><a href="#build"><span>Build</span><strong>Making AI systems?</strong><p>Jump to agents, RAG, evaluation and enterprise architecture.</p></a></div></div></section>
 <section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Find your route</p><h2>What describes you today?</h2><p>You can switch routes at any time. These are recommendations, not levels you need permission to unlock.</p></div></div><div class="journey-grid">${journeys.map(journeyCard).join('')}</div></div></section>
 <section class="reader-next"><div class="container"><div><p class="eyebrow">Still unsure?</p><h2>Start with one useful outcome.</h2><p>Pick a real task you want to improve, use the shortest relevant guide, then return to a learning path once you know which skills you actually need.</p></div><div class="reader-next-links"><a href="#article/prompting-for-reliable-results">Get more reliable answers →</a><a href="#article/research-with-ai-and-verify-sources">Research and verify sources →</a><a href="#article/build-your-first-ai-assisted-workflow-automation">Automate a workflow →</a><a href="#news">See what changed in AI today →</a></div></div></section>`,'Start here');
}

function buildCard(kicker,title,copy,href,link){return `<a class="hub-card" href="${href}"><span>${esc(kicker)}</span><h2>${esc(title)}</h2><p>${esc(copy)}</p><strong>${esc(link)} →</strong></a>`}
function renderBuild(){
 const cards=[
  ['Workflows','Automate useful work','Turn repeatable steps into controlled AI-assisted workflows before reaching for autonomous agents.','#article/build-your-first-ai-assisted-workflow-automation','Build a workflow'],
  ['Agents','Build and orchestrate agents','Understand tool boundaries, handoffs, state, human approval, tracing and evaluation.','#article/build-agent-orchestration','Build agent orchestration'],
  ['Knowledge','Build trustworthy RAG','Design retrieval around permissions, citations, evaluation and maintainable knowledge sources.','#article/build-a-trustworthy-enterprise-rag-system','Build enterprise RAG'],
  ['Evaluation','Test before you trust','Create golden sets, graders, regressions and release gates for AI systems.','#article/build-an-enterprise-ai-evaluation-framework','Build an evaluation framework'],
  ['Security','Design least privilege','Give agents only the identity, tools and permissions required for the task.','#article/secure-enterprise-ai-agents-with-identity-and-least-privilege','Secure AI agents'],
  ['Architecture','Connect the whole system','Map models, RAG, tools, agents and business systems into an enterprise architecture.','#article/design-an-enterprise-ai-architecture','Design the architecture']
 ];
 setMain(`${hero('Build with a path to production','Build useful AI systems — not impressive demos.','Choose the thing you are trying to build, then follow source-backed guidance from first prototype through evaluation, security and production decisions.')}
 <section class="hub-summary"><div class="container"><div><strong>Start small</strong><span>Prefer the least autonomous design that solves the problem.</span></div><div><strong>Measure reality</strong><span>Use representative tasks, failure cases, cost and human review.</span></div><div><strong>Earn autonomy</strong><span>Increase permissions only when evidence supports it.</span></div><div><strong>Keep an exit</strong><span>Design for rollback, observability and human authority.</span></div></div></section>
 <section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Choose what you are building</p><h2>From workflow to enterprise AI system.</h2></div><a class="text-link" href="#learn/enterprise-ai-builder">Follow the full builder curriculum →</a></div><div class="hub-grid">${cards.map(c=>buildCard(...c)).join('')}</div></div></section>
 <section class="hub-bottom"><div class="container hub-bottom-grid"><a href="#practical"><span>Practical library</span><strong>Prompts, patterns and small controls →</strong></a><a href="#resources"><span>Resources</span><strong>Templates, frameworks and repositories →</strong></a><a href="#guides"><span>Guide library</span><strong>Browse every original guide →</strong></a></div></section>`,'Build AI systems');
}

function renderChoose(){
 const cards=[
  ['Products','Choose an AI tool','Compare assistants, work suites, research products and developer tools by the job they actually help with.','#tools','Browse tools'],
  ['Models','Choose a model family','Separate the underlying model ecosystem from the product or subscription wrapped around it.','#models','Browse models'],
  ['Training','Choose a course','Use vetted training reviews that explain audience fit, strengths, limitations, time and value.','#courses','Browse courses'],
  ['Plans','Choose an AI subscription','Compare needs before paying for overlapping plans and provider-controlled features.','#article/choose-your-first-ai-subscription','Choose a plan'],
  ['Local AI','Explore private/local options','Start with deployment constraints and model fit rather than buying hardware from headline specifications.','#models','Explore local-capable models'],
  ['Open source','Investigate repositories','Use curated starting points, then check licence, maintenance, security and fit yourself.','#resources','Browse resources']
 ];
 setMain(`${hero('Choose by constraint, not hype','Choose tools, models and training with a reason.','Start with the work, privacy, deployment, budget and skill constraints you actually have. AI Compass avoids pretending there is one universal “best” option.')}
 <section class="hub-summary choose-summary"><div class="container"><div><strong>Task</strong><span>What must the tool actually help you finish?</span></div><div><strong>Access</strong><span>Cloud, enterprise, API, local or open-weight?</span></div><div><strong>Risk</strong><span>What data, actions and permissions are involved?</span></div><div><strong>Evidence</strong><span>Have you tested your own representative tasks?</span></div></div></section>
 <section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Decision hubs</p><h2>Pick the decision you need to make.</h2><p>Directories are starting points. Provider-controlled details are freshness-tracked and should be rechecked before purchasing or deployment.</p></div></div><div class="hub-grid">${cards.map(c=>buildCard(...c)).join('')}</div></div></section>
 <section class="reader-next"><div class="container"><div><p class="eyebrow">A better comparison habit</p><h2>Do not compare products only by feature lists.</h2><p>Write down five representative tasks, the data involved, acceptable failure modes and budget. Test those before changing a production workflow or buying another subscription.</p></div><div class="reader-next-links"><a href="#article/choose-your-first-ai-subscription">Choose your first AI subscription →</a><a href="#article/build-an-enterprise-ai-evaluation-framework">Build an evaluation framework →</a><a href="#courses">Find vetted training →</a><a href="#news">Check current product changes →</a></div></div></section>`,'Choose AI tools and models');
}

function annotateHome(){
 if(current().page!=='home'||document.querySelector('.reader-home-start'))return;
 const entry=document.querySelector('.evolution-entrypoints');if(!entry)return;
 const n=document.createElement('div');n.className='reader-home-start';n.innerHTML='<div class="container"><span>Not sure where to begin?</span><a href="#start">Tell us what kind of reader you are →</a></div>';entry.insertAdjacentElement('beforebegin',n);
}
function render(){upgradeNav();upgradeFooter();const r=current();if(r.page==='start')renderStart();else if(r.page==='build')renderBuild();else if(r.page==='choose')renderChoose();else annotateHome()}
async function start(){try{await(window.AI_COMPASS_CONTENT_READY||Promise.resolve());if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(render,80),{once:true});else setTimeout(render,80);addEventListener('hashchange',()=>setTimeout(render,100))}catch(e){console.error('Reader navigation could not start',e)}}
start();
})();
