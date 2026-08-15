(()=>{
'use strict';
const L=window.AI_COMPASS_LIBRARY;
if(!L||!Array.isArray(L.references)||!Array.isArray(L.tips))return;

const reference={
  term:'Structured Outputs',
  slug:'structured-outputs',
  definition:'A way to constrain an AI model response to a developer-supplied schema, such as JSON Schema, so downstream software receives predictable fields and types instead of loosely formatted prose.',
  why:'Structured outputs are useful for extraction, routing and multi-step workflows because they reduce format ambiguity. They do not guarantee that the values themselves are factually correct, so applications should still validate data, permissions and business rules before acting.',
  tags:['automation','developers','reliability','structured data'],
  source:'OpenAI — Structured Outputs',
  sourceUrl:'https://openai.com/index/introducing-structured-outputs-in-the-api/',
  verified:'2026-08-15'
};
const referenceIndex=L.references.findIndex(entry=>entry.slug===reference.slug||entry.term===reference.term);
if(referenceIndex>=0)L.references[referenceIndex]={...L.references[referenceIndex],...reference};else L.references.push(reference);

const tip={
  id:'schema-before-ai-extraction',
  title:'Define the schema before asking AI to extract data',
  summary:'For workflow automation, decide the exact fields, types, allowed values and missing-data behavior first; then constrain the model to that structure and validate the values before any action runs.',
  category:'Automation',
  level:'Intermediate',
  example:'Instead of “read this request and tell me what to do,” require fields such as requestType, owner, dueDate, confidence and needsHumanReview. Reject or route records that fail validation.',
  related:'build-your-first-ai-assisted-workflow-automation'
};
const tipIndex=L.tips.findIndex(entry=>entry.id===tip.id);
if(tipIndex>=0)L.tips[tipIndex]={...L.tips[tipIndex],...tip};else L.tips.push(tip);
})();
