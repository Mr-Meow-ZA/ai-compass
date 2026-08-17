'use strict';
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const errors=[];
const required=(condition,message)=>{if(!condition)errors.push(message)};
const index=read('index.html');
const manifest=JSON.parse(read('content/manifest.json'));
const config=read('community-config.js');
const data=read('community-data.js');
const ui=read('community.js');
const migration=read('supabase/migrations/20260818003000_ai_compass_community_forum.sql');
const hardening=read('supabase/migrations/20260818003200_ai_compass_forum_function_hardening.sql');

required(/sb_publishable_[A-Za-z0-9_-]+/.test(config),'Community config must use a Supabase publishable key.');
required(!/sb_secret_|service_role/i.test(config),'Community browser config must never contain a secret/service-role key.');
required(config.includes("enabled:true"),'Community must be explicitly feature-enabled on the community branch.');
required(index.includes('community.css'),'Community stylesheet is not registered.');
required(data.includes('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/'),'Community data layer must lazy-load the pinned-major Supabase browser client.');
required(data.includes("script.async=true"),'Community library should load asynchronously so it cannot block the editorial site.');
required(index.indexOf('community-config.js')<index.indexOf('community-data.js'),'Community config must load before community-data.js.');
required(index.indexOf('community-data.js')<index.indexOf('community.js'),'Community data layer must load before community UI.');
for(const file of ['community-config.js','community-data.js','community.js'])required(manifest.runtimeModules.some(module=>module.path===file),`${file} is missing from the runtime manifest.`);

const tables=['ai_compass_profiles','ai_compass_user_roles','ai_compass_forum_categories','ai_compass_forum_threads','ai_compass_forum_replies','ai_compass_forum_thread_likes','ai_compass_forum_reply_helpful','ai_compass_forum_thread_follows','ai_compass_forum_reports','ai_compass_forum_moderation_actions'];
for(const table of tables){
 required(migration.includes(`create table public.${table}`),`Missing community table ${table}.`);
 required(migration.includes(`alter table public.${table} enable row level security`),`RLS is not enabled for ${table}.`);
}
required((migration.match(/\('(?:beginner-help|ai-for-work|prompting-research|automation-workflows|agents-orchestration|coding-builders|models-local-ai|courses-learning|enterprise-ai|showcase|general)'/g)||[]).length===11,'Expected all 11 forum categories to be seeded.');
required(migration.includes("interval '10 minutes'")&&migration.includes("interval '5 minutes'"),'Forum anti-spam rate guards are missing.');
required(migration.includes('ai_compass_forum_reports_one_target'),'Report target integrity constraint is missing.');
required(migration.includes('ai_compass_forum_threads_accepted_reply_fk'),'Accepted-answer relationship is missing.');
required(hardening.includes('security invoker'),'Identity helpers must be hardened to security-invoker mode.');
for(const fn of ['ai_compass_guard_profile_update','ai_compass_guard_thread_insert','ai_compass_guard_thread_update','ai_compass_guard_reply_insert','ai_compass_guard_reply_update','ai_compass_touch_thread_from_reply'])required(hardening.includes(`revoke execute on function public.${fn}()`),`Trigger function ${fn} remains browser-callable.`);

for(const routeMarker of ['#community/thread/','#community/category/','#community/profile','#community/new','#community/moderation'])required(ui.includes(routeMarker),`Community route marker missing: ${routeMarker}`);
required(ui.includes("bodyText=value=>esc(value).replace"),'Community post body rendering must escape user text before adding line breaks.');
required(data.includes('signInWithOtp'),'Community auth must use passwordless email magic links.');
required(data.includes('emailRedirectTo:`${location.origin}${location.pathname}`'),'Magic-link redirects must stay on the current AI Compass origin.');
required(data.includes("ai_compass_current_role"),'Community client must resolve the server-side role helper.');
required(data.includes("ai_compass_forum_reports"),'Community client must support reporting.');
required(data.includes("ai_compass_forum_moderation_actions"),'Community client must log moderation actions.');

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Community contracts valid: ${tables.length} RLS tables, 11 categories, lazy client load, passwordless auth, reporting and moderation.`);
