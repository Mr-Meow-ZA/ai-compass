(()=>{
'use strict';
const C=()=>window.AI_COMPASS_COMMUNITY;
const MC=()=>window.AI_COMPASS_MY_COMPASS;
const route=()=>{const raw=(location.hash||'#home').slice(1).split('?')[0];const parts=raw.split('/').filter(Boolean);return{page:parts[0]||'home'};};
const show=(message,type='success')=>{let node=document.getElementById('myCompassNotice');if(!node){node=document.createElement('div');node.id='myCompassNotice';node.className='community-notice';document.body.appendChild(node);}node.className=`community-notice ${type}`;node.textContent=message;node.classList.add('show');clearTimeout(window.__mcAccountNotice);window.__mcAccountNotice=setTimeout(()=>node.classList.remove('show'),3800);};

function section(){
  if(route().page!=='my-compass'||document.querySelector('.my-account-settings'))return;
  const ident=C()?.identity?.();if(!ident?.user)return;
  const main=document.getElementById('main');if(!main||!main.querySelector('.my-compass-summary'))return;
  const node=document.createElement('section');node.className='content-section tinted my-account-settings';
  node.innerHTML=`<div class="container"><div class="section-heading"><div><p class="eyebrow">Account & privacy</p><h2>Your AI Compass data stays scoped to AI Compass.</h2><p>Export your profile, learning and community state at any time. Because the Supabase sign-in identity is shared with other personal apps, deleting AI Compass data does not delete the shared authentication identity.</p></div></div><div class="my-account-grid"><article><span>Export</span><h3>Download my AI Compass data</h3><p>Creates a JSON file containing your AI Compass profile, likes, follows, learning progress and your own forum activity.</p><button type="button" data-mc-account="export">Export my data</button></article><article class="danger-zone"><span>Profile deletion</span><h3>Delete AI Compass profile & private state</h3><p>Removes your AI Compass profile, likes, follows, learning progress and personal community preferences. Existing public forum contributions remain in place without a public profile so other people’s replies are not destroyed.</p><button type="button" data-mc-account="delete">Review deletion</button></article></div></div>`;
  main.appendChild(node);
}

function deletionDialog(){
  document.querySelector('.my-account-modal')?.remove();
  const modal=document.createElement('div');modal.className='community-modal my-account-modal';
  modal.innerHTML=`<div role="dialog" aria-modal="true" aria-labelledby="myDeleteTitle"><button class="modal-close" type="button" data-mc-account="cancel" aria-label="Close">×</button><p class="eyebrow">AI Compass data deletion</p><h2 id="myDeleteTitle">Delete this AI Compass profile?</h2><div class="my-delete-summary"><p><strong>This removes:</strong> your public AI Compass profile, content likes/follows, private learning progress, thread follows/likes/helpful votes and reports you submitted.</p><p><strong>This does not remove:</strong> the shared Supabase authentication identity or your existing public forum threads/replies. Those contributions remain but no longer resolve to a public AI Compass profile.</p><p>Moderator/admin profiles cannot use self-service deletion until a role handoff is reviewed.</p></div><label>Type <code>DELETE AI COMPASS</code> to confirm<input id="myDeleteConfirm" autocomplete="off"></label><button class="button danger" type="button" data-mc-account="confirm-delete" disabled>Delete AI Compass profile & private state</button></div>`;
  document.body.appendChild(modal);modal.querySelector('#myDeleteConfirm')?.focus();
  modal.querySelector('#myDeleteConfirm')?.addEventListener('input',event=>{const button=modal.querySelector('[data-mc-account="confirm-delete"]');button.disabled=event.target.value.trim()!=='DELETE AI COMPASS';});
}

async function exportData(){
  const data=await MC().exportMyData();
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`ai-compass-data-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);show('AI Compass data export created.');
}
async function deleteData(){
  const button=document.querySelector('[data-mc-account="confirm-delete"]');if(button)button.disabled=true;
  await MC().deleteMyProfileData();
  document.querySelector('.my-account-modal')?.remove();
  await C().signOut();
  show('AI Compass profile and private state deleted. Your shared sign-in identity was preserved.');
  location.hash='#community/profile';
}

async function click(event){const el=event.target.closest('[data-mc-account]');if(!el)return;try{const action=el.dataset.mcAccount;if(action==='export')return await exportData();if(action==='delete')return deletionDialog();if(action==='cancel')return document.querySelector('.my-account-modal')?.remove();if(action==='confirm-delete')return await deleteData();}catch(error){show(error.message||'Account action failed.','error');if(el)el.disabled=false;}}

document.addEventListener('click',click);document.addEventListener('DOMContentLoaded',()=>setTimeout(section,650));addEventListener('hashchange',()=>setTimeout(section,650));document.addEventListener('ai-compass-community-auth',()=>setTimeout(section,320));
})();
