'use strict';
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const configSource=fs.readFileSync(path.join(root,'community-config.js'),'utf8');
const url=configSource.match(/supabaseUrl:'([^']+)'/)?.[1];
const key=configSource.match(/publishableKey:'([^']+)'/)?.[1];
if(!url||!key){console.error('Could not read public Supabase community config');process.exit(1);}

const headers={apikey:key,'Content-Type':'application/json','Prefer':'return=minimal'};
async function request(pathname,options={}){return fetch(`${url}/rest/v1/${pathname}`,{...options,headers:{...headers,...(options.headers||{})}});}
async function expectDenied(label,pathname,body){
  const response=await request(pathname,{method:'POST',body:JSON.stringify(body)});
  if(response.status<400){console.error(`${label}: anonymous mutation unexpectedly succeeded (${response.status})`);process.exitCode=1;return;}
  console.log(`${label}: denied as expected (${response.status}).`);
}

(async()=>{
  const categories=await request('ai_compass_forum_categories?select=id&is_active=eq.true');
  if(!categories.ok){console.error(`Anonymous category read failed: ${categories.status}`);process.exit(1);}
  const categoryRows=await categories.json();
  if(categoryRows.length!==11){console.error(`Expected 11 public categories, received ${categoryRows.length}`);process.exit(1);}
  console.log(`Anonymous public read OK: ${categoryRows.length} categories.`);

  const fakeUser='00000000-0000-0000-0000-000000000001';
  await expectDenied('Thread insert','ai_compass_forum_threads',{category_id:'general',author_id:fakeUser,title:'Anonymous write should fail',body:'This row must never be created by the anonymous API role.'});
  await expectDenied('Content follow insert','ai_compass_content_follows',{user_id:fakeUser,content_type:'guide',content_id:'build-agent-orchestration'});
  await expectDenied('Learning progress insert','ai_compass_learning_progress',{user_id:fakeUser,path_id:'ai-power-user',step_slug:'prompting-for-reliable-results'});

  if(process.exitCode)process.exit(process.exitCode);
  console.log('Anonymous Community/My Compass RLS API checks passed.');
})().catch(error=>{console.error(error);process.exit(1)});
