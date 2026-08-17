'use strict';
const {loadRuntimeData}=require('./load-runtime-data');

(async()=>{
const context=await loadRuntimeData({includeNews:true,includeFreshness:true});
const D=context.window.AI_COMPASS_DATA;
const F=context.window.AI_COMPASS_FEED;
const X=context.window.AI_COMPASS_DISCOVERY;
const FR=context.window.AI_COMPASS_FRESHNESS;
const errors=[];
const fixedNow=new Date('2026-08-17T12:00:00Z');

if(!FR?.policy)errors.push('Freshness policy did not load');
const currentVolatile=FR.assess({reviewed:'2026-08-17'},'tools','',fixedNow);
if(currentVolatile.status!=='current')errors.push(`Fresh volatile content should be current, got ${currentVolatile.status}`);
const warningVolatile=FR.assess({reviewed:'2026-07-10'},'tools','',fixedNow);
if(warningVolatile.status!=='warning')errors.push(`38-day volatile content should warn, got ${warningVolatile.status}`);
const staleVolatile=FR.assess({reviewed:'2026-06-20'},'tools','',fixedNow);
if(staleVolatile.status!=='stale')errors.push(`58-day volatile content should need review, got ${staleVolatile.status}`);
const recentNews=FR.assess({reviewed:'2026-08-05'},'news','',fixedNow);
if(recentNews.status!=='recent')errors.push(`12-day news should be recent, got ${recentNews.status}`);
const archivedNews=FR.assess({reviewed:'2026-07-20'},'news','',fixedNow);
if(archivedNews.status!=='archive')errors.push(`28-day news should archive, got ${archivedNews.status}`);
const durableWarning=FR.assess({reviewed:'2026-03-01'},'guides','example',fixedNow);
if(durableWarning.status!=='warning')errors.push(`169-day durable content should warn, got ${durableWarning.status}`);

const slugs=new Set((D?.articles||[]).map(item=>item.slug));
for(const slug of Object.keys(FR?.policy?.guideOverrides||{}))if(!slugs.has(slug))errors.push(`Freshness override references missing guide: ${slug}`);
for(const kind of ['tools','models','courses','resources']){
  for(const item of X?.[kind]||[]){
    const result=FR.assess(item,kind,item.id,fixedNow);
    if(result.status==='unknown')errors.push(`${kind} record has no reviewable date: ${item.id}`);
  }
}
for(const item of F||[]){
  const result=FR.assess(item,'news',item.id,fixedNow);
  if(result.status==='unknown')errors.push(`News record has no reviewable date: ${item.id}`);
}
const subscription=(D?.articles||[]).find(item=>item.slug==='choose-your-first-ai-subscription');
if(!subscription)errors.push('Subscription guide missing during freshness validation');
else{
  const result=FR.assess(subscription,'guides',subscription.slug,fixedNow);
  if(result.freshnessClass!=='volatile')errors.push(`Subscription guide should be volatile, got ${result.freshnessClass}`);
  if(result.status!=='current')errors.push(`Subscription guide should be current at release, got ${result.status}`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Freshness valid: news=${FR.policy.classes.news.warnAfterDays}/${FR.policy.classes.news.reviewEveryDays}d, volatile=${FR.policy.classes.volatile.warnAfterDays}/${FR.policy.classes.volatile.reviewEveryDays}d, durable=${FR.policy.classes.durable.warnAfterDays}/${FR.policy.classes.durable.reviewEveryDays}d; ${F.length} news items and ${X.tools.length+X.models.length+X.courses.length+X.resources.length} maintained discovery records assessable.`);
})().catch(error=>{console.error(error);process.exit(1)});
