import fs from 'node:fs/promises';
import vm from 'node:vm';

const log=JSON.parse(await fs.readFile('content/editorial/news-scan-log.json','utf8'));
if(log.result!=='publish'||!Array.isArray(log.publishedIds)||log.publishedIds.length===0){
  console.log('No published IDs in this run; source-date verification not required.');
  process.exit(0);
}

const code=await fs.readFile('news-daily.js','utf8');
const context={window:{}};
vm.createContext(context);
vm.runInContext(code,context,{filename:'news-daily.js'});
const feed=context.window.AI_COMPASS_FEED||[];

const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
const short=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const variants=iso=>{
  const m=String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(!m)return[];
  const y=Number(m[1]),mo=Number(m[2]),d=Number(m[3]);
  const dd=String(d).padStart(2,'0'), mm=String(mo).padStart(2,'0');
  return [
    iso,`${y}/${mm}/${dd}`,`${months[mo-1]} ${d}, ${y}`,`${short[mo-1]} ${d}, ${y}`,
    `${d} ${months[mo-1]} ${y}`,`${dd} ${months[mo-1]} ${y}`,`${d} ${short[mo-1]} ${y}`,
    `/${y}/${mm}/${dd}/`
  ];
};
const plain=html=>String(html||'')
  .replace(/<script\b[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi,' ')
  .replace(/<[^>]+>/g,' ')
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&')
  .replace(/\s+/g,' ');

const errors=[];
for(const id of log.publishedIds){
  const item=feed.find(x=>x.id===id);
  if(!item){errors.push(`${id}: missing from news-daily.js`);continue}
  if(!item.url){errors.push(`${id}: missing canonical URL`);continue}
  if(!/^\d{4}-\d{2}-\d{2}$/.test(item.date||'')){errors.push(`${id}: invalid article date ${item.date||'missing'}`);continue}
  try{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),15000);
    const res=await fetch(item.url,{redirect:'follow',signal:controller.signal,headers:{'user-agent':'AI-Compass-Newsroom/1.0 (+https://ai-compass-hub.vercel.app)','accept':'text/html,application/xhtml+xml'}});
    clearTimeout(timer);
    if(!res.ok){errors.push(`${id}: canonical source returned HTTP ${res.status}`);continue}
    const html=await res.text();
    const text=plain(html);
    const evidence=variants(item.date).some(v=>text.includes(v)||String(res.url).includes(v));
    if(!evidence) errors.push(`${id}: claimed publication date ${item.date} was not found on canonical source ${item.url}`);
  }catch(err){
    errors.push(`${id}: could not verify canonical source: ${err?.message||err}`);
  }
}
if(errors.length){
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Verified canonical source dates for ${log.publishedIds.length} published newsroom item(s).`);
