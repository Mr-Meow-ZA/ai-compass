import fs from 'node:fs/promises';
import path from 'node:path';

const root=process.cwd();
const ops=JSON.parse(await fs.readFile(path.join(root,'content/editorial/news-operations.json'),'utf8'));
const outDir=path.join(root,'.newsroom');
await fs.mkdir(outDir,{recursive:true});

const decode=s=>String(s||'')
  .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'")
  .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ');
const plain=html=>decode(String(html||'')
  .replace(/<script\b[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi,' ')
  .replace(/<svg\b[\s\S]*?<\/svg>/gi,' ')
  .replace(/<[^>]+>/g,' ')
  .replace(/\s+/g,' ')
  .trim());
const dateHints=text=>{
  const patterns=[
    /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},\s+20\d{2}\b/gi,
    /\b\d{1,2}\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+20\d{2}\b/gi,
    /\b20\d{2}-\d{2}-\d{2}\b/g,
    /\b20\d{2}\/\d{2}\/\d{2}\b/g
  ];
  const found=[];
  for(const re of patterns) for(const m of text.matchAll(re)) if(!found.includes(m[0])) found.push(m[0]);
  return found.slice(0,8);
};

const sources=[];
for(const src of ops.primarySources||[]){
  const record={name:src.name,url:src.url,topics:src.topics||[],ok:false,status:null,finalUrl:null,error:null,links:[],pageText:''};
  try{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),15000);
    const res=await fetch(src.url,{
      redirect:'follow',
      signal:controller.signal,
      headers:{'user-agent':'AI-Compass-Newsroom/1.0 (+https://ai-compass-hub.vercel.app)','accept':'text/html,application/xhtml+xml'}
    });
    clearTimeout(timer);
    record.status=res.status;
    record.finalUrl=res.url;
    if(!res.ok) throw new Error('HTTP '+res.status);
    const html=await res.text();
    record.ok=true;
    record.pageText=plain(html).slice(0,60000);
    const seen=new Set();
    const re=/<a\b[^>]*href\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;
    for(const m of html.matchAll(re)){
      let href=m[2];
      let title=plain(m[3]);
      if(!title||title.length<3||title.length>300) continue;
      try{href=new URL(href,res.url).href}catch{continue}
      if(!/^https?:\/\//.test(href)) continue;
      const key=title+'|'+href;
      if(seen.has(key)) continue;
      seen.add(key);
      const start=Math.max(0,m.index-400), end=Math.min(html.length,m.index+m[0].length+1400);
      const context=plain(html.slice(start,end)).slice(0,1800);
      record.links.push({title,url:href,dateHints:dateHints(context),context});
      if(record.links.length>=180) break;
    }
  }catch(err){
    record.error=String(err?.message||err);
  }
  sources.push(record);
}
const payload={
  generatedAt:new Date().toISOString(),
  purpose:'Deterministic official-source snapshot for the AI Compass autonomous newsroom. Use it for discovery, then open canonical source pages for verification.',
  sources
};
await fs.writeFile(path.join(outDir,'source-sweep.json'),JSON.stringify(payload,null,2));
const ok=sources.filter(s=>s.ok).length;
console.log(`Newsroom source sweep captured ${ok}/${sources.length} primary-source index pages.`);
if(ok<5){
  console.error('Too few primary-source pages were reachable for a credible newsroom sweep.');
  process.exit(1);
}
