'use strict';
const {loadRuntimeData}=require('./load-runtime-data');
const fs=require('fs');
const path=require('path');

(async()=>{
const context=await loadRuntimeData();
const D=context.window.AI_COMPASS_DATA;
const L=context.window.AI_COMPASS_LIBRARY;
const manifest=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../content/manifest.json'),'utf8'));
const errors=[];
if(!D||!Array.isArray(D.articles))errors.push('AI_COMPASS_DATA.articles is missing');
if(!L||!Array.isArray(L.learningPaths))errors.push('AI_COMPASS_LIBRARY.learningPaths is missing');
const slugs=new Set();
for(const article of D.articles||[]){
  if(!article.slug||!article.title||!article.excerpt)errors.push(`Incomplete article metadata: ${article.slug||article.title||'unknown'}`);
  if(slugs.has(article.slug))errors.push(`Duplicate article slug: ${article.slug}`);
  slugs.add(article.slug);
  if(!Array.isArray(article.sections)||article.sections.length<2)errors.push(`Article needs at least two sections: ${article.slug}`);
  if(!Array.isArray(article.sources)||article.sources.length===0)errors.push(`Article has no sources: ${article.slug}`);
  for(const source of article.sources||[])if(!/^https:\/\//.test(source.url||''))errors.push(`Invalid source URL in ${article.slug}: ${source.url||'missing'}`);
}
if((D.articles||[]).length<41)errors.push(`Guide preservation failure: expected at least 41 guides, found ${(D.articles||[]).length}`);
const enterpriseSlugs=['design-an-enterprise-ai-architecture','build-a-trustworthy-enterprise-rag-system','build-an-enterprise-ai-evaluation-framework','secure-enterprise-ai-agents-with-identity-and-least-privilege','enterprise-ai-development-lifecycle'];
for(const requiredSlug of ['create-professional-dashboards-with-ai','build-an-ai-powered-executive-presentation','build-a-smart-excel-tracker-with-ai','build-your-first-ai-assisted-workflow-automation','build-a-professional-infographic-with-ai','build-a-professional-research-report-with-ai','build-agent-orchestration','build-and-test-agentic-ai-at-work',...enterpriseSlugs]){
  if(!slugs.has(requiredSlug))errors.push(`Required guide missing: ${requiredSlug}`);
}
for(const slug of ['build-agent-orchestration','build-and-test-agentic-ai-at-work']){
 const g=(D.articles||[]).find(x=>x.slug===slug);if(g?.verified!=='2026-08-17')errors.push(`Agentic guide verification date missing: ${slug}`);if((g?.sources||[]).length<5)errors.push(`Agentic guide source set incomplete: ${slug}`);
}
for(const slug of enterpriseSlugs){
 const g=(D.articles||[]).find(x=>x.slug===slug);if(g?.verified!=='2026-08-17')errors.push(`Enterprise builder guide verification date missing: ${slug}`);if((g?.sources||[]).length<5)errors.push(`Enterprise builder guide source set incomplete: ${slug}`);
}
const enterprisePath=(L.learningPaths||[]).find(item=>item.id==='enterprise-ai-builder');
if(!enterprisePath)errors.push('Enterprise AI builder learning path did not load');
if((enterprisePath?.steps||[]).length<8)errors.push('Enterprise AI builder learning path is incomplete');
for(const expected of ['build-agent-orchestration','design-an-enterprise-ai-architecture','build-a-trustworthy-enterprise-rag-system','build-an-enterprise-ai-evaluation-framework','secure-enterprise-ai-agents-with-identity-and-least-privilege','enterprise-ai-development-lifecycle'])if(!enterprisePath?.steps?.includes(expected))errors.push(`Enterprise AI builder path missing: ${expected}`);
const powerUserPath=(L.learningPaths||[]).find(item=>item.id==='ai-power-user');
if(!powerUserPath)errors.push('AI Power User learning path did not load');
if((powerUserPath?.steps||[]).length!==6)errors.push('AI Power User learning path must contain six lessons');
for(const expected of ['prompting-for-reliable-results','research-with-ai-and-verify-sources','create-reusable-ai-skills','build-first-rag-knowledge-base','automation-workflow-or-agent','evaluate-ai-output-scorecard'])if(!powerUserPath?.steps?.includes(expected))errors.push(`AI Power User path missing: ${expected}`);
const infographicGuide=(D.articles||[]).find(item=>item.slug==='build-a-professional-infographic-with-ai');
if(infographicGuide?.verified!=='2026-08-17')errors.push('Infographic guide verification date is missing');
if((infographicGuide?.sources||[]).length<4)errors.push('Infographic guide source set is incomplete');
const researchGuide=(D.articles||[]).find(item=>item.slug==='build-a-professional-research-report-with-ai');
if(researchGuide?.verified!=='2026-08-16')errors.push('Research report guide verification date is missing');
if((researchGuide?.sources||[]).length<3)errors.push('Research report guide source set is incomplete');
const subscriptionGuide=(D.articles||[]).find(item=>item.slug==='choose-your-first-ai-subscription');
const subscriptionSnapshot=subscriptionGuide?.sections?.find(section=>section.id==='snapshot')?.html||'';
if(subscriptionGuide?.verified!=='2026-08-12')errors.push('Subscription guide freshness overlay did not load');
if(!subscriptionSnapshot.includes('Google AI Plus')||!subscriptionSnapshot.includes('$9.99/month'))errors.push('Subscription guide is missing verified Google AI Plus entry pricing');
if(!(D.comparisons||[]).some(item=>item.name==='Google AI Plus / Pro'))errors.push('Subscription comparison freshness overlay did not load');
const dashboardGuide=(D.articles||[]).find(item=>item.slug==='create-professional-dashboards-with-ai');
if(dashboardGuide?.verified!=='2026-08-13')errors.push('Dashboard guide verification date is missing');
if((dashboardGuide?.sources||[]).length<4)errors.push('Dashboard guide source set is incomplete');
const dashboardHtml=(dashboardGuide?.sections||[]).map(section=>section.html||'').join('\n');
for(const token of ['dashboard-guide-hero','dashboard-gallery','mobile-comparison','quality-ladder','prompt-stack']) if(!dashboardHtml.includes(token))errors.push(`Dashboard guide contract missing: ${token}`);
for(const pathItem of L.learningPaths||[]){if(!pathItem.steps?.length)errors.push(`Learning path has no steps: ${pathItem.id}`);for(const slug of pathItem.steps||[])if(!slugs.has(slug))errors.push(`Learning path ${pathItem.id} references missing article ${slug}`);}
for(const tip of L.tips||[])if(!slugs.has(tip.related))errors.push(`Tip ${tip.id} references missing article ${tip.related}`);
const terms=new Set();
for(const item of L.references||[]){const key=(item.term||'').toLowerCase();if(!key)errors.push('Reference term is missing');if(terms.has(key))errors.push(`Duplicate reference term: ${item.term}`);terms.add(key);if(item.sourceUrl&&!/^https:\/\//.test(item.sourceUrl))errors.push(`Invalid reference source URL: ${item.term}`);}
for(const [slug,date] of [['content-provenance-c2pa','2026-08-14'],['open-weight-model','2026-08-14'],['structured-outputs','2026-08-15']]){const item=(L.references||[]).find(entry=>entry.slug===slug);if(!item)errors.push(`Maintained reference missing: ${slug}`);if(item?.verified!==date||!item?.source||!item?.sourceUrl)errors.push(`Maintained reference metadata incomplete: ${slug}`);}
for(const tipId of ['provenance-is-a-signal','schema-before-ai-extraction'])if(!(L.tips||[]).some(item=>item.id===tipId))errors.push(`Maintained tip did not load: ${tipId}`);
const structuredStatus=context.window.AI_COMPASS_STRUCTURED_CONTENT_STATUS;
if(structuredStatus?.release!==manifest.release||structuredStatus?.build!==manifest.build)errors.push(`Structured content runtime identity mismatch: expected ${manifest.release}/${manifest.build}, found ${structuredStatus?.release||'missing'}/${structuredStatus?.build||'missing'}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Content valid: ${D.articles.length} guides, ${L.learningPaths.length} paths, ${L.tips.length} tips, ${L.references.length} reference terms.`);
})().catch(error=>{console.error(error);process.exit(1)});
