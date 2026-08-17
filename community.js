(()=>{
'use strict';
const API=()=>window.AI_COMPASS_COMMUNITY;
const main=()=>document.getElementById('main');
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const bodyText=value=>esc(value).replace(/\n/g,'<br>');
const fmt=value=>{try{return new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value))}catch{return''}};
const clip=(value,n=180)=>{const s=String(value||'');return s.length>n?`${s.slice(0,n-1).trim()}…`:s};
const experience={beginner:'Beginner','everyday-user':'Everyday user','power-user':'Power user',builder:'Builder',enterprise:'Enterprise'};
let renderToken=0;

function route(){
 const raw=(location.hash||'#home').slice(1).split('?')[0];
 const parts=raw.split('/').filter(Boolean);
 return{page:parts[0]||'home',view:parts[1]||'',id:parts[2]||''};
}
function profileName(profile){return profile?.display_name||profile?.username||'AI Compass member'}
function initials(profile){return profileName(profile).split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'AI'}
function profileChip(profile){
 if(!profile)return`<span class="community-avatar anonymous">AI</span><span><strong>Community member</strong><small>Profile unavailable</small></span>`;
 return`<span class="community-avatar">${esc(initials(profile))}</span><span><strong>${esc(profileName(profile))}</strong><small>@${esc(profile.username||'member')} · ${esc(experience[profile.experience_level]||'Member')}</small></span>`;
}
function statusBadge(status){const label={open:'Open',answered:'Answered',locked:'Locked',archived:'Archived',removed:'Removed'}[status]||status;return`<span class="community-status status-${esc(status)}">${esc(label)}</span>`}
function sessionBar(){
 const ident=API()?.identity?.()||{user:null,profile:null,role:'guest'};
 if(!ident.user)return`<div class="community-session"><span>Read freely. Sign in free to ask, reply and follow.</span><a class="button small" href="#community/profile">Sign in / create profile</a></div>`;
 return`<div class="community-session"><span>Signed in${ident.profile?` as <strong>${esc(profileName(ident.profile))}</strong>`:''}${['moderator','admin'].includes(ident.role)?` · <strong>${esc(ident.role)}</strong>`:''}</span><div><a href="#community/profile">My profile</a>${['moderator','admin'].includes(ident.role)?'<a href="#community/moderation">Moderation</a>':''}<button type="button" data-community-action="sign-out">Sign out</button></div></div>`;
}
function communityHero(kicker,title,copy){return`<section class="page-hero community-hero"><div class="container page-hero-grid"><div><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1><p>${esc(copy)}</p></div><div class="community-hero-mark"><strong>AI</strong><span>Community</span><small>Learn · Build · Share</small></div></div></section>${sessionBar()}`}
function loading(){return`${communityHero('AI Compass community','Loading the community…','Public discussions are readable without an account.')}<section class="content-section"><div class="container"><div class="community-loading"><span></span><p>Loading discussions…</p></div></div></section>`}
function errorPage(message){return`${communityHero('AI Compass community','Community is temporarily unavailable.','The editorial site remains available while the community layer recovers.')}<section class="content-section"><div class="container narrow"><div class="community-callout error"><h2>Could not load the forum</h2><p>${esc(message)}</p><button class="button" type="button" data-community-action="retry">Try again</button></div></div></section>`}
function authCard(){return`<div class="community-auth-card"><p class="eyebrow">Free profile</p><h2>Join AI Compass</h2><p>Enter your email and we’ll send a secure sign-in link. No password to remember.</p><form id="communityAuth"><label>Email address<input type="email" name="email" autocomplete="email" required placeholder="you@example.com"></label><button class="button" type="submit">Email me a sign-in link</button></form><small>Signing in lets you post, reply, follow discussions and build your learning profile.</small></div>`}
function profileForm(profile={}){return`<form id="communityProfile" class="community-profile-form"><div class="form-grid"><label>Username<span>3–24 letters, numbers or underscores</span><input name="username" required minlength="3" maxlength="24" pattern="[A-Za-z0-9_]{3,24}" value="${esc(profile.username||'')}"></label><label>Display name<span>Shown publicly on your posts</span><input name="display_name" required maxlength="60" value="${esc(profile.display_name||'')}"></label><label>Experience level<select name="experience_level">${Object.entries(experience).map(([value,label])=>`<option value="${value}" ${profile.experience_level===value?'selected':''}>${esc(label)}</option>`).join('')}</select></label><label class="span-2">Short bio<span>Optional · up to 280 characters</span><textarea name="bio" maxlength="280" rows="4">${esc(profile.bio||'')}</textarea></label></div><button class="button" type="submit">${profile.user_id?'Save profile':'Create free profile'}</button></form>`}
function memberGate(copy='Complete your free profile before posting.'){const ident=API().identity();return ident.user&&!ident.profile?`<div class="community-callout"><strong>One quick step</strong><p>${esc(copy)}</p><a class="button small" href="#community/profile">Create my profile</a></div>`:''}

function threadRow(thread,data){
 const p=data.profiles.get(thread.author_id);const replies=data.replyCounts[thread.id]||0;const likes=data.likeCounts[thread.id]||0;
 return`<a class="community-thread-row" href="#community/thread/${esc(thread.id)}" data-search="${esc(`${thread.title} ${thread.body} ${p?.username||''}`.toLowerCase())}"><div class="community-thread-main"><div class="community-thread-top">${thread.is_pinned?'<span class="community-pin">Pinned</span>':''}${statusBadge(thread.status)}<span>${esc(data.categories.find(c=>c.id===thread.category_id)?.name||thread.category_id)}</span></div><h3>${esc(thread.title)}</h3><p>${esc(clip(thread.body,210))}</p><div class="community-author-mini">${profileChip(p)}</div></div><div class="community-thread-stats"><span><strong>${replies}</strong>replies</span><span><strong>${likes}</strong>likes</span><small>${fmt(thread.last_activity_at)}</small></div></a>`;
}
function categoryCard(category,data){const count=data.categoryCounts[category.id]||0;return`<a class="community-category-card" href="#community/category/${esc(category.id)}"><span class="category-index">${String(category.sort_order/10).padStart(2,'0')}</span><h3>${esc(category.name)}</h3><p>${esc(category.description)}</p><strong>${count} discussion${count===1?'':'s'} →</strong></a>`}

async function renderHome(categoryId=''){
 const token=++renderToken;main().innerHTML=loading();
 const api=API();await api.ready;
 const data=await api.loadForum(categoryId);if(token!==renderToken)return;
 const category=data.categories.find(c=>c.id===categoryId);
 const title=category?category.name:'Learn with people using and building AI.';
 const copy=category?category.description:'Ask useful questions, share what worked, compare approaches and learn from people at different stages of their AI journey.';
 main().innerHTML=`${communityHero(category?'Forum category':'AI Compass community',title,copy)}
 <section class="community-toolbar"><div class="container"><div class="community-toolbar-actions"><a class="button" href="#community/new">Start a discussion</a><a href="#community">All categories</a></div><label class="community-search">Search discussions<input id="communityThreadSearch" type="search" placeholder="Search this view"></label></div></section>
 ${memberGate()}
 ${category?'':`<section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Find your people</p><h2>Choose a discussion area.</h2><p>Categories mirror the way AI Compass teaches and organises practical AI work.</p></div></div><div class="community-category-grid">${data.categories.map(c=>categoryCard(c,data)).join('')}</div></div></section>`}
 <section class="content-section ${category?'':'tinted'}"><div class="container"><div class="section-heading"><div><p class="eyebrow">${category?'Category discussions':'Latest discussions'}</p><h2>${data.threads.length?'What the community is talking about.':'Be the first to start a useful discussion.'}</h2></div><span>${data.threads.length} thread${data.threads.length===1?'':'s'}</span></div><div id="communityThreadList" class="community-thread-list">${data.threads.length?data.threads.map(t=>threadRow(t,data)).join(''):`<div class="community-empty"><strong>No discussions yet.</strong><p>A good first post asks a specific question, shares context and explains what you have already tried.</p><a class="button small" href="#community/new">Start the first thread</a></div>`}</div><div id="communitySearchEmpty" class="community-empty" hidden>No discussions match that search.</div></div></section>`;
 wireSearch();
}

function wireSearch(){const input=document.getElementById('communityThreadSearch');if(!input)return;input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();let visible=0;document.querySelectorAll('.community-thread-row').forEach(row=>{const show=!q||(row.dataset.search||'').includes(q);row.hidden=!show;if(show)visible++;});const empty=document.getElementById('communitySearchEmpty');if(empty)empty.hidden=visible>0;});}

async function renderProfile(){
 const token=++renderToken;main().innerHTML=loading();const api=API();await api.ready;if(token!==renderToken)return;const ident=api.identity();
 if(!ident.user){main().innerHTML=`${communityHero('My Compass profile','Create a free AI Compass profile.','Your profile unlocks forum participation now and will become the home for followed content and learning progress as My Compass expands.')}<section class="content-section"><div class="container narrow">${authCard()}</div></section>`;return;}
 main().innerHTML=`${communityHero('My Compass profile',ident.profile?'Your community profile.':'Finish setting up your profile.','Choose a public username and tell the community where you are in your AI journey. Your email is never shown on your public profile.')}<section class="content-section"><div class="container narrow">${profileForm(ident.profile||{})}</div></section>`;
}

async function renderNewThread(){
 const token=++renderToken;main().innerHTML=loading();const api=API();await api.ready;if(token!==renderToken)return;const ident=api.identity();
 if(!ident.user){main().innerHTML=`${communityHero('Start a discussion','Sign in before posting.','Reading is public; posting requires a free AI Compass profile.')}<section class="content-section"><div class="container narrow">${authCard()}</div></section>`;return;}
 if(!ident.profile){main().innerHTML=`${communityHero('Start a discussion','Create your profile first.','A public username gives community posts a consistent identity without exposing your email.')}<section class="content-section"><div class="container narrow">${profileForm({})}</div></section>`;return;}
 const data=await api.loadForum();if(token!==renderToken)return;
 main().innerHTML=`${communityHero('Start a discussion','Ask something useful — or share something useful.','Specific context produces better answers. Explain the goal, what you tried and where you are stuck.')}<section class="content-section"><div class="container narrow"><form id="communityNewThread" class="community-compose"><label>Category<select name="category_id" required>${data.categories.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}</select></label><label>Title<span>8–160 characters</span><input name="title" minlength="8" maxlength="160" required placeholder="What are you trying to solve?"></label><label>Discussion<span>20–12,000 characters · plain text</span><textarea name="body" minlength="20" maxlength="12000" rows="10" required placeholder="Give enough context for someone to help or learn from your experience."></textarea></label><div class="compose-note"><strong>Community standard</strong><p>Be constructive, do not post confidential company data, personal information, credentials or copyrighted material you do not have permission to share.</p></div><button class="button" type="submit">Publish discussion</button></form></div></section>`;
}

function replyCard(reply,threadData){
 const p=threadData.profiles.get(reply.author_id);const ident=API().identity();const votes=threadData.helpful.filter(v=>v.reply_id===reply.id);const mine=!!ident.user&&votes.some(v=>v.user_id===ident.user.id);const accepted=threadData.thread.accepted_reply_id===reply.id;const canAccept=!!ident.user&&(threadData.thread.author_id===ident.user.id||['moderator','admin'].includes(ident.role));
 return`<article class="community-reply ${accepted?'accepted':''}" id="reply-${esc(reply.id)}"><header><div class="community-author-mini">${profileChip(p)}</div><div>${accepted?'<span class="accepted-badge">Accepted answer</span>':''}<small>${fmt(reply.created_at)}${reply.edited_at?' · edited':''}</small></div></header><div class="community-post-body">${bodyText(reply.body)}</div><footer><button type="button" data-community-action="helpful" data-id="${esc(reply.id)}" data-active="${mine?'1':'0'}" ${ident.user?'':'disabled'}>Helpful · ${votes.length}</button>${canAccept?`<button type="button" data-community-action="accept" data-thread="${esc(threadData.thread.id)}" data-id="${accepted?'':esc(reply.id)}">${accepted?'Unaccept':'Accept answer'}</button>`:''}${ident.user?`<button type="button" data-community-action="report" data-type="reply" data-id="${esc(reply.id)}">Report</button>`:''}</footer></article>`;
}

async function renderThread(threadId){
 const token=++renderToken;main().innerHTML=loading();const api=API();await api.ready;const data=await api.loadThread(threadId);if(token!==renderToken)return;
 if(!data){main().innerHTML=`${communityHero('AI Compass community','Discussion not found.','It may have been removed, archived or the link may be incorrect.')}<section class="content-section"><div class="container narrow"><a class="button" href="#community">Back to community</a></div></section>`;return;}
 const {thread,replies,profiles,category}=data;const author=profiles.get(thread.author_id);const ident=api.identity();const liked=!!ident.user&&data.likes.some(v=>v.user_id===ident.user.id);const canReply=ident.user&&ident.profile&&['open','answered'].includes(thread.status);
 main().innerHTML=`${communityHero('Community discussion',thread.title,category?.name||thread.category_id)}<section class="community-thread-page"><div class="container community-thread-layout"><div class="community-thread-column"><article class="community-thread-post"><header><div class="community-author-mini">${profileChip(author)}</div><div>${statusBadge(thread.status)}<small>${fmt(thread.created_at)}${thread.edited_at?' · edited':''}</small></div></header><div class="community-post-body">${bodyText(thread.body)}</div>${thread.linked_content_type?`<a class="community-linked-content" href="#${thread.linked_content_type==='guide'?'article/':''}${esc(thread.linked_content_id)}">Related ${esc(thread.linked_content_type)} →</a>`:''}<footer><button type="button" data-community-action="like" data-id="${esc(thread.id)}" data-active="${liked?'1':'0'}" ${ident.user?'':'disabled'}>${liked?'Liked':'Like'} · ${data.likes.length}</button><button type="button" data-community-action="follow" data-id="${esc(thread.id)}" data-active="${data.followed?'1':'0'}" ${ident.user?'':'disabled'}>${data.followed?'Following':'Follow'}</button>${ident.user?`<button type="button" data-community-action="report" data-type="thread" data-id="${esc(thread.id)}">Report</button>`:''}</footer></article><section class="community-replies"><div class="section-heading compact"><div><p class="eyebrow">Discussion</p><h2>${replies.length} repl${replies.length===1?'y':'ies'}</h2></div></div>${replies.length?replies.map(r=>replyCard(r,data)).join(''):'<div class="community-empty"><strong>No replies yet.</strong><p>Be the first person to add something useful.</p></div>'}</section>${canReply?`<form id="communityReply" data-thread="${esc(thread.id)}" class="community-compose reply-compose"><label>Your reply<textarea name="body" minlength="2" maxlength="8000" rows="6" required placeholder="Add a useful answer, example or question."></textarea></label><button class="button" type="submit">Post reply</button></form>`:ident.user&&!ident.profile?memberGate('Complete your profile before replying.'):!ident.user?`<div class="community-callout"><strong>Want to reply?</strong><p>Join free with an email magic link.</p><a class="button small" href="#community/profile">Sign in / create profile</a></div>`:''}</div><aside class="community-thread-aside"><a href="#community/category/${esc(thread.category_id)}">← ${esc(category?.name||'Category')}</a><div><strong>Community reminders</strong><p>Challenge ideas, not people.</p><p>Do not post confidential work data, credentials or private personal information.</p><p>Use Report for spam, harassment or unsafe content.</p></div></aside></div></section>`;
}

async function renderModeration(){
 const token=++renderToken;main().innerHTML=loading();const api=API();await api.ready;if(token!==renderToken)return;const ident=api.identity();if(!['moderator','admin'].includes(ident.role)){main().innerHTML=errorPage('Moderator access is required.');return;}
 const data=await api.loadModeration();if(token!==renderToken)return;
 main().innerHTML=`${communityHero('Community moderation','Review community reports.','Moderation actions are separate from editorial content and are logged as community governance actions.')}<section class="content-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Open reports</p><h2>${data.reports.length} awaiting review.</h2></div></div><div class="moderation-list">${data.reports.length?data.reports.map(r=>`<article class="moderation-card"><div><span>${esc(r.reason)}</span><small>${fmt(r.created_at)}</small></div><p>${esc(r.details||'No additional details supplied.')}</p><code>${esc(r.thread_id?'Thread':'Reply')}: ${esc(r.thread_id||r.reply_id)}</code><div><button class="button small danger" type="button" data-community-action="moderate-report" data-decision="remove" data-report='${esc(JSON.stringify(r))}'>Remove content & resolve</button><button class="button small ghost" type="button" data-community-action="moderate-report" data-decision="dismiss" data-report='${esc(JSON.stringify(r))}'>Dismiss report</button></div></article>`).join(''):'<div class="community-empty"><strong>Queue clear.</strong><p>No open community reports.</p></div>'}</div></div></section>`;
}

async function render(){
 decorateNav();const r=route();if(r.page!=='community')return;const api=API();if(!api?.available){main().innerHTML=errorPage(api?.reason||'Community client unavailable.');return;}
 try{
   if(r.view==='thread'&&r.id)return await renderThread(r.id);
   if(r.view==='category'&&r.id)return await renderHome(r.id);
   if(r.view==='profile')return await renderProfile();
   if(r.view==='new')return await renderNewThread();
   if(r.view==='moderation')return await renderModeration();
   return await renderHome();
 }catch(error){console.error(error);main().innerHTML=errorPage(error.message||'Unknown community error.');}
}

function decorateNav(){
 const nav=document.querySelector('#primaryNav .nav-inner');
 if(nav&&!nav.querySelector('a[href="#community"]'))nav.insertAdjacentHTML('beforeend','<a href="#community">Community</a>');
 if(route().page==='community')nav?.querySelector('a[href="#community"]')?.setAttribute('aria-current','page');
 const utility=document.querySelector('.utility-inner div');if(utility&&!utility.querySelector('a[href="#community/profile"]'))utility.insertAdjacentHTML('afterbegin','<a href="#community/profile">My Compass</a>');
}

function showNotice(message,type='success'){let node=document.getElementById('communityNotice');if(!node){node=document.createElement('div');node.id='communityNotice';node.className='community-notice';document.body.appendChild(node);}node.className=`community-notice ${type}`;node.textContent=message;node.classList.add('show');clearTimeout(window.__communityNotice);window.__communityNotice=setTimeout(()=>node.classList.remove('show'),3500);}
function openReport(type,id){
 const modal=document.createElement('div');modal.className='community-modal';modal.id='communityReportModal';modal.innerHTML=`<div role="dialog" aria-modal="true" aria-labelledby="reportTitle"><button class="modal-close" type="button" data-community-action="close-modal" aria-label="Close">×</button><p class="eyebrow">Community safety</p><h2 id="reportTitle">Report this ${esc(type)}</h2><form id="communityReport" data-type="${esc(type)}" data-id="${esc(id)}"><label>Reason<select name="reason"><option value="spam">Spam</option><option value="harassment">Harassment</option><option value="unsafe">Unsafe content</option><option value="misinformation">Potentially harmful misinformation</option><option value="off-topic">Off-topic</option><option value="other">Other</option></select></label><label>Details <span>optional</span><textarea name="details" maxlength="1000" rows="4"></textarea></label><button class="button" type="submit">Send report</button></form></div>`;document.body.appendChild(modal);modal.querySelector('select')?.focus();
}

async function onSubmit(event){
 const form=event.target;if(!(form instanceof HTMLFormElement))return;const api=API();
 try{
  if(form.id==='communityAuth'){event.preventDefault();const button=form.querySelector('button');button.disabled=true;await api.requestMagicLink(new FormData(form).get('email'));showNotice('Check your email for the AI Compass sign-in link.');button.disabled=false;return;}
  if(form.id==='communityProfile'){event.preventDefault();const fd=new FormData(form);await api.saveProfile(Object.fromEntries(fd.entries()));showNotice('Profile saved.');location.hash='#community';return;}
  if(form.id==='communityNewThread'){event.preventDefault();const fd=new FormData(form);const thread=await api.createThread(Object.fromEntries(fd.entries()));showNotice('Discussion published.');location.hash=`#community/thread/${thread.id}`;return;}
  if(form.id==='communityReply'){event.preventDefault();const fd=new FormData(form);await api.createReply(form.dataset.thread,fd.get('body'));showNotice('Reply posted.');await render();return;}
  if(form.id==='communityReport'){event.preventDefault();const fd=new FormData(form);await api.reportContent({threadId:form.dataset.type==='thread'?form.dataset.id:null,replyId:form.dataset.type==='reply'?form.dataset.id:null,reason:fd.get('reason'),details:fd.get('details')});document.getElementById('communityReportModal')?.remove();showNotice('Report sent to moderators.');return;}
 }catch(error){showNotice(error.message||'Community action failed.','error');form.querySelector('button')?.removeAttribute('disabled');}
}

async function onClick(event){
 const button=event.target.closest('[data-community-action]');if(!button)return;const action=button.dataset.communityAction;const api=API();
 try{
  if(action==='retry')return render();
  if(action==='sign-out'){await api.signOut();showNotice('Signed out.');return render();}
  if(action==='like'){await api.toggleThreadLike(button.dataset.id,button.dataset.active==='1');return render();}
  if(action==='follow'){await api.toggleFollow(button.dataset.id,button.dataset.active==='1');return render();}
  if(action==='helpful'){await api.toggleHelpful(button.dataset.id,button.dataset.active==='1');return render();}
  if(action==='accept'){await api.setAccepted(button.dataset.thread,button.dataset.id||null);showNotice(button.dataset.id?'Answer accepted.':'Accepted answer cleared.');return render();}
  if(action==='report')return openReport(button.dataset.type,button.dataset.id);
  if(action==='close-modal')return document.getElementById('communityReportModal')?.remove();
  if(action==='moderate-report'){const report=JSON.parse(button.dataset.report);await api.moderateReport(report,button.dataset.decision);showNotice('Moderation action recorded.');return render();}
 }catch(error){showNotice(error.message||'Community action failed.','error');}
}

document.addEventListener('submit',onSubmit);
document.addEventListener('click',onClick);
document.addEventListener('ai-compass-community-auth',()=>setTimeout(render,20));
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,140));
addEventListener('hashchange',()=>setTimeout(render,140));
})();
