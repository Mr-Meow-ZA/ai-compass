(()=>{
'use strict';
const cfg=window.AI_COMPASS_COMMUNITY_CONFIG||{};
const unavailable=reason=>({available:false,reason,ready:Promise.resolve(),identity:()=>({user:null,profile:null,role:'guest'}),client:null});
if(!cfg.enabled){window.AI_COMPASS_COMMUNITY=unavailable('Community is disabled.');return;}

let client=null;
let loadError=null;
let state={user:null,profile:null,role:'guest'};
const event=()=>document.dispatchEvent(new CustomEvent('ai-compass-community-auth',{detail:{...state}}));
const clean=v=>String(v??'').trim();
const fail=error=>{throw new Error(error?.message||'Community request failed.');};
const ids=items=>[...new Set((items||[]).filter(Boolean))];
const countBy=(items,key)=>{const out={};for(const item of items||[]){const value=item[key];out[value]=(out[value]||0)+1;}return out;};
const mapBy=(items,key='user_id')=>new Map((items||[]).map(item=>[item[key],item]));
const getClient=()=>{if(!client)throw new Error(loadError?.message||'Community client is still loading.');return client;};

function loadSupabase(){
  if(window.supabase?.createClient)return Promise.resolve(window.supabase);
  return new Promise((resolve,reject)=>{
    const existing=document.querySelector('script[data-ai-compass-supabase]');
    if(existing){
      existing.addEventListener('load',()=>window.supabase?.createClient?resolve(window.supabase):reject(new Error('Supabase client loaded without createClient.')),{once:true});
      existing.addEventListener('error',()=>reject(new Error('Could not load the community client library.')),{once:true});
      return;
    }
    const script=document.createElement('script');
    script.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    script.async=true;
    script.crossOrigin='anonymous';
    script.dataset.aiCompassSupabase='1';
    script.onload=()=>window.supabase?.createClient?resolve(window.supabase):reject(new Error('Supabase client loaded without createClient.'));
    script.onerror=()=>reject(new Error('Could not load the community client library.'));
    document.head.appendChild(script);
  });
}

async function refreshIdentity(){
  const c=getClient();
  const {data:{session}}=await c.auth.getSession();
  const user=session?.user||null;
  if(!user){state={user:null,profile:null,role:'guest'};event();return state;}
  const [{data:profile,error:profileError},{data:role,error:roleError}]=await Promise.all([
    c.from('ai_compass_profiles').select('user_id,username,display_name,bio,experience_level,avatar_url,status,joined_at,updated_at').eq('user_id',user.id).maybeSingle(),
    c.rpc('ai_compass_current_role')
  ]);
  if(profileError)fail(profileError);
  if(roleError)fail(roleError);
  state={user,profile:profile||null,role:role||'member'};
  event();
  return state;
}

const ready=(async()=>{
  try{
    const lib=await loadSupabase();
    client=lib.createClient(cfg.supabaseUrl,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    client.auth.onAuthStateChange(()=>setTimeout(()=>refreshIdentity().catch(error=>console.warn(error)),0));
    await refreshIdentity();
    const callback=/[?&]code=/.test(location.search)||/access_token=/.test(location.hash);
    if(callback&&state.user){history.replaceState({},'',`${location.pathname}#community`);}
  }catch(error){loadError=error;console.warn('AI Compass community identity init failed',error);}
})();

async function requestMagicLink(email){
  await ready;const c=getClient();
  const value=clean(email).toLowerCase();
  if(!/^\S+@\S+\.\S+$/.test(value))throw new Error('Enter a valid email address.');
  const {error}=await c.auth.signInWithOtp({email:value,options:{shouldCreateUser:true,emailRedirectTo:`${location.origin}${location.pathname}`}});
  if(error)fail(error);
  return true;
}
async function signOut(){await ready;const c=getClient();const {error}=await c.auth.signOut();if(error)fail(error);state={user:null,profile:null,role:'guest'};event();}

async function saveProfile(input){
  await ready;const c=getClient();
  if(!state.user)throw new Error('Sign in before creating a profile.');
  const payload={user_id:state.user.id,username:clean(input.username),display_name:clean(input.display_name)||'AI Compass member',bio:clean(input.bio),experience_level:input.experience_level||'beginner'};
  let result;
  if(state.profile)result=await c.from('ai_compass_profiles').update(payload).eq('user_id',state.user.id).select().single();
  else result=await c.from('ai_compass_profiles').insert(payload).select().single();
  if(result.error)fail(result.error);
  await refreshIdentity();
  return result.data;
}

async function loadProfiles(userIds){
  const c=getClient();const list=ids(userIds);if(!list.length)return new Map();
  const {data,error}=await c.from('ai_compass_profiles').select('user_id,username,display_name,bio,experience_level,avatar_url,status,joined_at').in('user_id',list);
  if(error)fail(error);return mapBy(data||[]);
}

async function loadForum(categoryId=''){
  await ready;const c=getClient();
  let threadQuery=c.from('ai_compass_forum_threads').select('*').order('is_pinned',{ascending:false}).order('last_activity_at',{ascending:false}).limit(80);
  if(categoryId)threadQuery=threadQuery.eq('category_id',categoryId);
  const [{data:categories,error:catError},{data:threads,error:threadError},{data:replies,error:replyError},{data:likes,error:likeError}]=await Promise.all([
    c.from('ai_compass_forum_categories').select('*').order('sort_order'),threadQuery,c.from('ai_compass_forum_replies').select('id,thread_id,author_id,status,created_at'),c.from('ai_compass_forum_thread_likes').select('thread_id,user_id')
  ]);
  if(catError)fail(catError);if(threadError)fail(threadError);if(replyError)fail(replyError);if(likeError)fail(likeError);
  const profiles=await loadProfiles((threads||[]).map(t=>t.author_id));
  return{categories:categories||[],threads:threads||[],profiles,replyCounts:countBy(replies||[],'thread_id'),likeCounts:countBy(likes||[],'thread_id'),categoryCounts:countBy(threads||[],'category_id')};
}

async function loadThread(threadId){
  await ready;const c=getClient();
  const {data:thread,error:threadError}=await c.from('ai_compass_forum_threads').select('*').eq('id',threadId).maybeSingle();
  if(threadError)fail(threadError);if(!thread)return null;
  const [{data:replies,error:replyError},{data:likes,error:likeError},{data:helpful,error:helpfulError},{data:category,error:catError}]=await Promise.all([
    c.from('ai_compass_forum_replies').select('*').eq('thread_id',threadId).order('created_at'),c.from('ai_compass_forum_thread_likes').select('thread_id,user_id').eq('thread_id',threadId),c.from('ai_compass_forum_reply_helpful').select('reply_id,user_id'),c.from('ai_compass_forum_categories').select('*').eq('id',thread.category_id).maybeSingle()
  ]);
  if(replyError)fail(replyError);if(likeError)fail(likeError);if(helpfulError)fail(helpfulError);if(catError)fail(catError);
  const profiles=await loadProfiles([thread.author_id,...(replies||[]).map(r=>r.author_id)]);
  let followed=false;
  if(state.user){const {data,error}=await c.from('ai_compass_forum_thread_follows').select('thread_id').eq('thread_id',threadId).eq('user_id',state.user.id).maybeSingle();if(error)fail(error);followed=!!data;}
  return{thread,replies:replies||[],likes:likes||[],helpful:helpful||[],profiles,category,followed};
}

async function createThread({category_id,title,body,linked_content_type=null,linked_content_id=null}){
  await ready;const c=getClient();if(!state.user||!state.profile)throw new Error('Complete your free profile before posting.');
  const {data,error}=await c.from('ai_compass_forum_threads').insert({author_id:state.user.id,category_id,title:clean(title),body:clean(body),linked_content_type,linked_content_id}).select().single();if(error)fail(error);return data;
}
async function createReply(threadId,body){await ready;const c=getClient();if(!state.user||!state.profile)throw new Error('Complete your free profile before replying.');const {data,error}=await c.from('ai_compass_forum_replies').insert({thread_id:threadId,author_id:state.user.id,body:clean(body)}).select().single();if(error)fail(error);return data;}
async function toggleThreadLike(threadId,liked){await ready;const c=getClient();if(!state.user)throw new Error('Sign in to like discussions.');const query=c.from('ai_compass_forum_thread_likes');const {error}=liked?await query.delete().eq('thread_id',threadId).eq('user_id',state.user.id):await query.insert({thread_id:threadId,user_id:state.user.id});if(error)fail(error);}
async function toggleHelpful(replyId,helpful){await ready;const c=getClient();if(!state.user)throw new Error('Sign in to mark replies helpful.');const query=c.from('ai_compass_forum_reply_helpful');const {error}=helpful?await query.delete().eq('reply_id',replyId).eq('user_id',state.user.id):await query.insert({reply_id:replyId,user_id:state.user.id});if(error)fail(error);}
async function toggleFollow(threadId,followed){await ready;const c=getClient();if(!state.user)throw new Error('Sign in to follow discussions.');const query=c.from('ai_compass_forum_thread_follows');const {error}=followed?await query.delete().eq('thread_id',threadId).eq('user_id',state.user.id):await query.insert({thread_id:threadId,user_id:state.user.id});if(error)fail(error);}
async function setAccepted(threadId,replyId){await ready;const c=getClient();if(!state.user)throw new Error('Sign in first.');const {error}=await c.from('ai_compass_forum_threads').update({accepted_reply_id:replyId||null}).eq('id',threadId);if(error)fail(error);}
async function reportContent({threadId=null,replyId=null,reason,details=''}){await ready;const c=getClient();if(!state.user)throw new Error('Sign in to report community content.');const {error}=await c.from('ai_compass_forum_reports').insert({reporter_id:state.user.id,thread_id:threadId,reply_id:replyId,reason,details:clean(details)});if(error)fail(error);}

async function loadModeration(){await ready;const c=getClient();if(!['moderator','admin'].includes(state.role))throw new Error('Moderator access required.');const {data:reports,error}=await c.from('ai_compass_forum_reports').select('*').eq('status','open').order('created_at');if(error)fail(error);return{reports:reports||[]};}
async function moderateReport(report,decision){
  await ready;const c=getClient();if(!state.user||!['moderator','admin'].includes(state.role))throw new Error('Moderator access required.');const now=new Date().toISOString();
  if(decision==='remove'){if(report.thread_id){const {error}=await c.from('ai_compass_forum_threads').update({status:'removed'}).eq('id',report.thread_id);if(error)fail(error);}if(report.reply_id){const {error}=await c.from('ai_compass_forum_replies').update({status:'removed'}).eq('id',report.reply_id);if(error)fail(error);}}
  const status=decision==='dismiss'?'dismissed':'resolved';const {error:reportError}=await c.from('ai_compass_forum_reports').update({status,reviewed_at:now,reviewed_by:state.user.id}).eq('id',report.id);if(reportError)fail(reportError);
  const targetType=report.thread_id?'thread':'reply';const targetId=report.thread_id||report.reply_id;const action=decision==='dismiss'?'dismiss-report':'resolve-report';const {error:logError}=await c.from('ai_compass_forum_moderation_actions').insert({moderator_id:state.user.id,target_type:targetType,target_id:targetId,action,note:decision==='remove'?'Reported content removed.':'Report dismissed after review.'});if(logError)fail(logError);
}

window.AI_COMPASS_COMMUNITY={available:true,get client(){return client;},ready,identity:()=>({...state}),refreshIdentity,requestMagicLink,signOut,saveProfile,loadForum,loadThread,createThread,createReply,toggleThreadLike,toggleHelpful,toggleFollow,setAccepted,reportContent,loadModeration,moderateReport};
})();
