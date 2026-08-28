(()=>{
'use strict';
const ready=window.AI_COMPASS_CONTENT_READY||Promise.resolve();
ready.then(()=>{
  const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
  const item={
    id:'qwen38-flash-next-architecture',
    title:'Qwen3.8-Flash-Next previews the architecture Qwen says is headed toward Qwen4',
    dek:'Qwen has released Qwen3.8-Flash-Next, an open-weight architecture preview combining a 125B sparse main model with 51B parameters of N-gram lookup memory, Qwen Sparse Attention, gated residuals and a revised Muon-based training recipe. Qwen reports roughly one ninth the training cost of Qwen3.7-Plus; that efficiency figure remains a vendor claim pending independent reproduction.',
    source:'Qwen Team',sourceType:'Official model release and architecture report',category:'Models',format:'Deep analysis',date:'2026-08-26',readTime:'16 min',
    url:'https://qwen.ai/blog?id=qwen3.8-flash-next',verified:'2026-08-28',visual:'models-blue',
    intelligence:{importance:5,signal:'Major',status:'Open-weight architecture preview',sourceQuality:'Primary source',why:'The release is more than a model refresh: Qwen is testing a different efficiency recipe built around sparse attention, sparse experts and large lookup memory, and explicitly presents it as a preview of architecture intended for Qwen4.',audience:'Model researchers, AI builders, local-AI users and teams tracking inference economics',action:'Read the architecture details, separate hosted Flash from open Flash-Next, and wait for independent quality, latency, memory and power measurements before treating the cost claims as settled.',related:'qwen38-flash-next-architecture-explained',reviewed:'2026-08-28'}
  };
  const i=feed.findIndex(x=>x.id===item.id||x.url===item.url);
  if(i>=0)feed[i]={...feed[i],...item};else feed.unshift(item);

  // Release audit: every article added in the 28 Aug release must remain routable through the guide directory.
  const expected=['personal-ai-attention-things-superhuman','personal-ai-capture-tana-capacities-amplenote','ai-calendar-autonomy-reclaim-morgen-motion-sunsama-akiflow','personal-ai-observe-before-asking-monarch','personal-ai-intent-home-assistant','personal-ai-automation-admin-trap','personal-ai-design-playbook','qwen38-flash-next-architecture-explained','n-gram-embeddings-explained-llm-memory'];
  const articles=window.AI_COMPASS_DATA?.articles||[];
  const missing=expected.filter(slug=>!articles.some(a=>a.slug===slug));
  if(missing.length)console.error('AI Compass release visibility audit failed: missing articles',missing);
});
})();
