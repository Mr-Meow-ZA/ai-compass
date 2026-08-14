(()=>{
'use strict';
const L=window.AI_COMPASS_LIBRARY;
if(!L||!Array.isArray(L.references)||!Array.isArray(L.tips))return;

const references=[
  {
    term:'Content provenance (C2PA)',
    slug:'content-provenance-c2pa',
    definition:'Cryptographically verifiable metadata that records information about where a digital asset came from and how it was changed. C2PA is an open technical standard used for Content Credentials and other provenance systems.',
    why:'Provenance provides evidence about an asset’s history; it does not prove that the content itself is true. Metadata can also be absent, stripped or unsupported, so missing credentials are not proof of human authorship.',
    tags:['provenance','media','safety','standards'],
    source:'Coalition for Content Provenance and Authenticity (C2PA)',
    sourceUrl:'https://spec.c2pa.org/specifications/',
    verified:'2026-08-14'
  },
  {
    term:'Open-weight model',
    slug:'open-weight-model',
    definition:'A model whose learned parameters or weights are available to download or use under stated terms. Access to weights alone does not automatically make the full AI system open source.',
    why:'Check the licence, training-data information, code and use restrictions instead of treating “open weights” and “open source” as interchangeable labels.',
    tags:['models','open-source','licensing'],
    source:'Open Source Initiative — Open Source AI Definition 1.0',
    sourceUrl:'https://opensource.org/ai/open-source-ai-definition',
    verified:'2026-08-14'
  }
];

for(const item of references){
  const index=L.references.findIndex(entry=>entry.slug===item.slug||entry.term===item.term);
  if(index>=0)L.references[index]={...L.references[index],...item};else L.references.push(item);
}

const tip={
  id:'provenance-is-a-signal',
  title:'Treat provenance marks as evidence, not a verdict',
  summary:'A watermark or signed credential can be useful evidence about processing history, but neither its presence nor its absence settles authorship or truthfulness by itself.',
  category:'Verification',
  level:'Beginner',
  example:'Check the provenance mark, then verify the publisher, date and underlying claim. Do not treat a missing mark as proof that a person created the content.',
  related:'evaluate-ai-output-scorecard'
};
const tipIndex=L.tips.findIndex(entry=>entry.id===tip.id);
if(tipIndex>=0)L.tips[tipIndex]={...L.tips[tipIndex],...tip};else L.tips.push(tip);
})();
