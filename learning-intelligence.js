(()=>{
'use strict';
const L=window.AI_COMPASS_LIBRARY||{learningPaths:[]};
const C=window.AI_COMPASS_CURRICULUM;
if(!C)return;
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const current=()=>{const raw=(location.hash||'#home').slice(1);const [path]=raw.split('?');const parts=path.split('/').filter(Boolean);return{page:parts[0]||'home',arg:parts[1]||''}};
const pathById=id=>L.learningPaths.find(item=>item.id===id);
const levelById=id=>C.levels.find(item=>item.id===id);

function pathLink(id){
  const path=pathById(id);if(!path)return'';
  return `<a class="curriculum-path-link" href="#learn/${esc(path.id)}"><span>${esc(path.audience)}</span><strong>${esc(path.title)}</strong><small>${esc(path.duration)} →</small></a>`;
}

function curriculumCard(level){
  return `<article class="curriculum-level" data-level="${esc(level.id)}">
    <div class="curriculum-level-head"><span class="curriculum-number">${esc(level.number)}</span><div><span class="curriculum-stage">${esc(level.stage)}</span><h2>${esc(level.title)}</h2></div></div>
    <p>${esc(level.description)}</p>
    <div class="curriculum-for"><strong>Best for</strong><span>${esc(level.forWhom)}</span></div>
    <div class="curriculum-skills"><strong>Skills you build</strong><div>${level.skills.map(skill=>`<span>${esc(skill)}</span>`).join('')}</div></div>
    <div class="curriculum-paths">${level.paths.map(pathLink).join('')}</div>
    <p class="curriculum-ready"><strong>Move on when:</strong> ${esc(level.readyWhen)}</p>
  </article>`;
}

function renderOverview(){
  if(current().page!=='learn'||current().arg)return;
  const hero=document.querySelector('#main .page-hero');if(!hero)return;
  const existing=document.querySelector('.curriculum-intelligence');if(existing)return;
  const legacy=document.querySelector('.learning-lanes');if(legacy)legacy.hidden=true;
  const section=document.createElement('section');section.className='curriculum-intelligence';
  section.innerHTML=`<div class="container">
    <div class="curriculum-intro"><div><p class="eyebrow">AI Compass curriculum</p><h2>Learn in five levels, not fifty disconnected topics.</h2><p>${esc(C.promise)}</p></div><div class="curriculum-review"><strong>5</strong><span>progressive levels</span><small>Curriculum reviewed 17 Aug 2026</small></div></div>
    <nav class="curriculum-rail" aria-label="AI learning levels">${C.levels.map(level=>`<a href="#curriculum-${esc(level.id)}"><span>${esc(level.number)}</span>${esc(level.title)}</a>`).join('')}</nav>
    <div class="curriculum-grid">${C.levels.map(level=>curriculumCard(level).replace('class="curriculum-level"',`class="curriculum-level" id="curriculum-${esc(level.id)}"`)).join('')}</div>
    <div class="curriculum-note"><strong>You do not have to complete everything.</strong><p>Use the level that matches your current work. The curriculum is a progression map, not a certificate checklist.</p></div>
  </div>`;
  hero.insertAdjacentElement('afterend',section);
}

function renderPathContext(){
  const r=current();if(r.page!=='learn'||!r.arg)return;
  if(document.querySelector('.path-intelligence'))return;
  const meta=C.pathMeta[r.arg];if(!meta)return;
  const level=levelById(meta.level);const path=pathById(r.arg);if(!level||!path)return;
  const hero=document.querySelector('#main .page-hero');if(!hero)return;
  const next=meta.next?pathById(meta.next):null;
  const section=document.createElement('section');section.className='path-intelligence';
  const levelIndex=C.levels.findIndex(item=>item.id===level.id)+1;
  section.innerHTML=`<div class="container narrow">
    <div class="path-context-grid">
      <div class="path-position"><span>Level ${levelIndex} of ${C.levels.length}</span><strong>${esc(level.title)}</strong><p>${esc(level.description)}</p></div>
      <div class="path-prerequisite"><span>Before you start</span><strong>${esc(meta.prerequisite)}</strong></div>
    </div>
    <div class="path-outcomes"><div><p class="eyebrow">By the end</p><h2>You should be able to…</h2></div><ul>${meta.outcomes.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></div>
    <div class="path-progress-rail" aria-label="Curriculum progression">${C.levels.map((item,index)=>`<span class="${index+1<levelIndex?'done':index+1===levelIndex?'current':''}"><b>${esc(item.number)}</b>${esc(item.title)}</span>`).join('')}</div>
    ${next?`<div class="path-next"><span>Recommended next path</span><a href="#learn/${esc(next.id)}"><strong>${esc(next.title)}</strong><small>${esc(next.duration)} →</small></a></div>`:`<div class="path-next complete"><span>Curriculum destination</span><strong>You are at the enterprise-builder end of the current AI Compass curriculum.</strong><small>From here, choose guides by the system or problem you are actually building.</small></div>`}
  </div>`;
  hero.insertAdjacentElement('afterend',section);
}

function enhance(){renderOverview();renderPathContext();}
document.addEventListener('DOMContentLoaded',()=>setTimeout(enhance,40));
addEventListener('hashchange',()=>setTimeout(enhance,40));
})();