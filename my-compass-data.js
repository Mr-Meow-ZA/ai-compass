(()=>{
'use strict';
const community=()=>window.AI_COMPASS_COMMUNITY;
const fail=error=>{throw new Error(error?.message||'My Compass request failed.');};
const user=()=>community()?.identity?.().user||null;
const client=()=>{const c=community()?.client;if(!c)throw new Error('My Compass is still connecting.');return c;};
const requireUser=()=>{const u=user();if(!u)throw new Error('Sign in to use My Compass.');return u;};
const validType=value=>['guide','tool','model','course','resource','learning-path'].includes(value);
const cleanId=value=>String(value||'').trim();

async function ready(){const api=community();if(!api?.available)throw new Error(api?.reason||'Community account services are unavailable.');await api.ready;if(!api.client)throw new Error('Community account services could not connect.');return api;}

async function contentState(contentType,contentId){
  await ready();if(!validType(contentType))throw new Error('Unsupported content type.');const id=cleanId(contentId);const c=client();const u=user();
  const countQuery=c.from('ai_compass_content_likes').select('*',{count:'exact',head:true}).eq('content_type',contentType).eq('content_id',id);
  const tasks=[countQuery];
  if(u){
    tasks.push(c.from('ai_compass_content_likes').select('content_id').eq('user_id',u.id).eq('content_type',contentType).eq('content_id',id).maybeSingle());
    tasks.push(c.from('ai_compass_content_follows').select('content_id').eq('user_id',u.id).eq('content_type',contentType).eq('content_id',id).maybeSingle());
  }
  const results=await Promise.all(tasks);for(const result of results)if(result.error)fail(result.error);
  return{likes:results[0].count||0,liked:u?!!results[1].data:false,followed:u?!!results[2].data:false};
}

async function toggleLike(contentType,contentId,liked){
  await ready();const u=requireUser();if(!validType(contentType))throw new Error('Unsupported content type.');const id=cleanId(contentId);const q=client().from('ai_compass_content_likes');
  const {error}=liked?await q.delete().eq('user_id',u.id).eq('content_type',contentType).eq('content_id',id):await q.insert({user_id:u.id,content_type:contentType,content_id:id});if(error)fail(error);
}
async function toggleFollow(contentType,contentId,followed){
  await ready();const u=requireUser();if(!validType(contentType))throw new Error('Unsupported content type.');const id=cleanId(contentId);const q=client().from('ai_compass_content_follows');
  const {error}=followed?await q.delete().eq('user_id',u.id).eq('content_type',contentType).eq('content_id',id):await q.insert({user_id:u.id,content_type:contentType,content_id:id});if(error)fail(error);
}

async function pathProgress(pathId){
  await ready();const u=user();if(!u)return[];const {data,error}=await client().from('ai_compass_learning_progress').select('path_id,step_slug,completed_at,updated_at').eq('user_id',u.id).eq('path_id',cleanId(pathId)).order('completed_at');if(error)fail(error);return data||[];
}
async function setStep(pathId,stepSlug,completed){
  await ready();const u=requireUser();const c=client();const path=cleanId(pathId);const step=cleanId(stepSlug);
  if(completed){const now=new Date().toISOString();const {error}=await c.from('ai_compass_learning_progress').upsert({user_id:u.id,path_id:path,step_slug:step,completed_at:now,updated_at:now},{onConflict:'user_id,path_id,step_slug'});if(error)fail(error);}
  else{const {error}=await c.from('ai_compass_learning_progress').delete().eq('user_id',u.id).eq('path_id',path).eq('step_slug',step);if(error)fail(error);}
}
async function myState(){
  await ready();const u=requireUser();const c=client();const [{data:follows,error:followError},{data:progress,error:progressError},{data:likes,error:likeError}]=await Promise.all([
    c.from('ai_compass_content_follows').select('content_type,content_id,created_at').eq('user_id',u.id).order('created_at',{ascending:false}),
    c.from('ai_compass_learning_progress').select('path_id,step_slug,completed_at,updated_at').eq('user_id',u.id).order('completed_at',{ascending:false}),
    c.from('ai_compass_content_likes').select('content_type,content_id,created_at').eq('user_id',u.id).order('created_at',{ascending:false})
  ]);if(followError)fail(followError);if(progressError)fail(progressError);if(likeError)fail(likeError);return{follows:follows||[],progress:progress||[],likes:likes||[]};
}

async function linkedThreads(contentType,contentId){
  await ready();const c=client();const id=cleanId(contentId);const {data:threads,error}=await c.from('ai_compass_forum_threads').select('*').eq('linked_content_type',contentType).eq('linked_content_id',id).order('last_activity_at',{ascending:false}).limit(12);if(error)fail(error);if(!threads?.length)return{threads:[],profiles:new Map(),replyCounts:{}};
  const authorIds=[...new Set(threads.map(t=>t.author_id).filter(Boolean))];const threadIds=threads.map(t=>t.id);
  const [{data:profiles,error:profileError},{data:replies,error:replyError}]=await Promise.all([
    authorIds.length?c.from('ai_compass_profiles').select('user_id,username,display_name,experience_level,status').in('user_id',authorIds):Promise.resolve({data:[],error:null}),
    c.from('ai_compass_forum_replies').select('thread_id').in('thread_id',threadIds)
  ]);if(profileError)fail(profileError);if(replyError)fail(replyError);const profileMap=new Map((profiles||[]).map(p=>[p.user_id,p]));const replyCounts={};for(const reply of replies||[])replyCounts[reply.thread_id]=(replyCounts[reply.thread_id]||0)+1;return{threads,profiles:profileMap,replyCounts};
}

window.AI_COMPASS_MY_COMPASS={ready,contentState,toggleLike,toggleFollow,pathProgress,setStep,myState,linkedThreads};
})();
