(()=>{
'use strict';
const API='https://lnmgieielbqqqvboonzj.supabase.co/functions/v1/ai-compass-admin';
const TOKEN_KEY='aiCompassAdminToken';
const D=window.AI_COMPASS_DATA||{articles:[]};
const qs=id=>document.getElementById(id);
const loginPanel=qs('loginPanel'),editorPanel=qs('editorPanel'),account=qs('account');
const loginForm=qs('loginForm'),emailInput=qs('email'),passwordInput=qs('password');
const loginStatus=qs('loginStatus'),editorStatus=qs('editorStatus'),accountEmail=qs('accountEmail');
const guideSelect=qs('guideSelect'),currentImage=qs('currentImage'),sourcePill=qs('sourcePill'),dimensionsPill=qs('dimensionsPill');
const fileInput=qs('fileInput'),qualityNote=qs('qualityNote'),publishBtn=qs('publishBtn'),resetPreviewBtn=qs('resetPreviewBtn'),revertBtn=qs('revertBtn'),logoutBtn=qs('logoutBtn');
let token=sessionStorage.getItem(TOKEN_KEY)||'';
let overrides=new Map();
let selectedFile=null;
let objectUrl='';

function localSrc(slug){return `assets/guides/${encodeURIComponent(slug)}.webp`}
function setStatus(node,message,type=''){node.textContent=message||'';node.className=`status${type?` ${type}`:''}${message?'':' hidden'}`}
function clearObjectUrl(){if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=''}}
async function api(action,{method='GET',body=null,auth=false}={}){
  const headers={};
  if(auth&&token)headers.Authorization=`Bearer ${token}`;
  if(body&&!(body instanceof FormData))headers['Content-Type']='application/json';
  const res=await fetch(`${API}?action=${encodeURIComponent(action)}`,{method,headers,body:body instanceof FormData?body:(body?JSON.stringify(body):null),cache:'no-store'});
  const data=await res.json().catch(()=>({}));
  if(res.status===401&&auth){sessionStorage.removeItem(TOKEN_KEY);token='';showLogin();throw new Error('Your admin session expired. Sign in again.');}
  if(!res.ok)throw new Error(data.error||`Request failed (${res.status})`);
  return data;
}
function showLogin(){loginPanel.classList.remove('hidden');editorPanel.classList.add('hidden');account.classList.add('hidden');passwordInput.value='';}
function showEditor(email){loginPanel.classList.add('hidden');editorPanel.classList.remove('hidden');account.classList.remove('hidden');accountEmail.textContent=email||'';}
function populateGuides(){guideSelect.innerHTML='';D.articles.forEach((item,index)=>{const o=document.createElement('option');o.value=item.slug;o.textContent=`${index+1}. ${item.title}`;guideSelect.appendChild(o)});}
async function loadManifest(){const data=await api('manifest');overrides=new Map((data.images||[]).map(x=>[x.slug,x]));renderCurrent();}
function renderCurrent(){
  const slug=guideSelect.value;if(!slug)return;
  clearObjectUrl();selectedFile=null;fileInput.value='';publishBtn.disabled=true;resetPreviewBtn.disabled=true;qualityNote.textContent='';dimensionsPill.classList.add('hidden');
  const row=overrides.get(slug);currentImage.src=row?.public_url||localSrc(slug);sourcePill.textContent=row?'Custom upload':'Site default';revertBtn.disabled=!row;setStatus(editorStatus,'');
}
async function inspectFile(file){
  clearObjectUrl();selectedFile=null;publishBtn.disabled=true;resetPreviewBtn.disabled=true;qualityNote.className='quality';
  if(!file)return;
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)){qualityNote.textContent='Use JPEG, PNG or WebP.';qualityNote.classList.add('bad');return;}
  if(file.size>8*1024*1024){qualityNote.textContent='Image is larger than 8 MB.';qualityNote.classList.add('bad');return;}
  objectUrl=URL.createObjectURL(file);
  const img=new Image();
  img.onload=()=>{
    const ratio=img.naturalWidth/img.naturalHeight;
    dimensionsPill.textContent=`${img.naturalWidth} × ${img.naturalHeight}`;dimensionsPill.classList.remove('hidden');
    if(img.naturalWidth<800||img.naturalHeight<450){qualityNote.textContent='This image is quite small. Use at least 800 × 450 for a sharper website thumbnail.';qualityNote.classList.add('warn');}
    else if(ratio<1.4||ratio>2.1){qualityNote.textContent='This image is not a typical landscape thumbnail and may crop heavily on guide cards.';qualityNote.classList.add('warn');}
    else{qualityNote.textContent='Image size and shape look suitable for a guide thumbnail.';qualityNote.classList.add('good');}
    selectedFile=file;currentImage.src=objectUrl;sourcePill.textContent='Preview — not published';publishBtn.disabled=false;resetPreviewBtn.disabled=false;
  };
  img.onerror=()=>{qualityNote.textContent='Could not read this image.';qualityNote.classList.add('bad');};
  img.src=objectUrl;
}

loginForm.addEventListener('submit',async e=>{
  e.preventDefault();setStatus(loginStatus,'Signing in…');
  try{const data=await api('login',{method:'POST',body:{email:emailInput.value,password:passwordInput.value}});token=data.token;sessionStorage.setItem(TOKEN_KEY,token);passwordInput.value='';showEditor(data.email);await loadManifest();setStatus(loginStatus,'');}
  catch(err){setStatus(loginStatus,err.message||'Sign in failed','error');}
});
guideSelect.addEventListener('change',renderCurrent);
fileInput.addEventListener('change',()=>inspectFile(fileInput.files?.[0]||null));
resetPreviewBtn.addEventListener('click',renderCurrent);
publishBtn.addEventListener('click',async()=>{
  if(!selectedFile)return;publishBtn.disabled=true;setStatus(editorStatus,'Uploading and publishing…');
  try{const form=new FormData();form.append('slug',guideSelect.value);form.append('file',selectedFile,selectedFile.name);const data=await api('upload',{method:'POST',body:form,auth:true});await loadManifest();setStatus(editorStatus,'Image published. The public Guides page will use it on the next refresh.','ok');currentImage.src=data.url;}
  catch(err){setStatus(editorStatus,err.message||'Upload failed','error');publishBtn.disabled=false;}
});
revertBtn.addEventListener('click',async()=>{
  if(!overrides.has(guideSelect.value))return;
  if(!confirm('Use the original site image for this guide?'))return;
  revertBtn.disabled=true;setStatus(editorStatus,'Reverting…');
  try{await api('revert',{method:'POST',body:{slug:guideSelect.value},auth:true});await loadManifest();setStatus(editorStatus,'Reverted to the site default image.','ok');}
  catch(err){setStatus(editorStatus,err.message||'Could not revert','error');revertBtn.disabled=false;}
});
logoutBtn.addEventListener('click',async()=>{try{if(token)await api('logout',{method:'POST',auth:true});}catch{}sessionStorage.removeItem(TOKEN_KEY);token='';showLogin();});

async function init(){
  populateGuides();
  if(!D.articles.length){setStatus(loginStatus,'Guide data could not be loaded.','error');return;}
  if(!token){showLogin();return;}
  try{const me=await api('me',{auth:true});showEditor(me.email);await loadManifest();}
  catch{showLogin();}
}
init();
})();