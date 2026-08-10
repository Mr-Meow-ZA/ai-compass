const fs=require('fs');
const path=require('path');
const vm=require('vm');
const sharp=require('sharp');
const context={window:{}};
vm.createContext(context);
for(const file of ['data.js','knowledge.js','template-library.js','sector-starter-packs.js','education-starter-pack.js','content.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const articles=context.window.AI_COMPASS_DATA?.articles||[];
if(articles.length<28)throw new Error(`Expected at least 28 guides, found ${articles.length}`);
const outDir=path.join(process.cwd(),'assets','guides');fs.mkdirSync(outDir,{recursive:true});

// These are pre-generated editorial candidates. The build downloads them once, normalises them,
// and commits the resulting WebP files so production never depends on a runtime image service.
const candidates=[
['documents, spreadsheets and meetings','https://design.canva.ai/79FP8vkdXIKYDMc'],
['scorecard','https://design.canva.ai/0E_4Z8lXCoM71HZ'],
['automation, workflow or agent','https://design.canva.ai/zMKbUFsvuzPZs76'],
['governance','https://design.canva.ai/eQVQd6Eb5x9UNrg'],
['multimodal','https://design.canva.ai/4a1H8pFOP5rAZfy'],
['subscription','https://design.canva.ai/cgYQopCmVb7uujt'],
['github','https://design.canva.ai/6SKFK2Eqg1_t-6d'],
['obsidian','https://design.canva.ai/qU3Ceo9Z4HzzILN'],
['prompting','https://design.canva.ai/YosflNWUE3DFAWZ'],
['reusable ai skills','https://design.canva.ai/1B1tyDlBn3aZfBM'],
['mcp','https://design.canva.ai/yrBs0FCDJ_rHAOE'],
['orchestration','https://design.canva.ai/OLzkdxSCzCBRaGI'],
['rag vs','https://design.canva.ai/USluf3oQXbR_Nbz'],
['knowledge base','https://design.canva.ai/6tnHJxhxRGQFZVi'],
['hugging face','https://design.canva.ai/QujX70CjTh9x3n0'],
['local','https://design.canva.ai/VKB51mISvwDL7GF'],
['coding assistant','https://design.canva.ai/TIuBKtg8Ez8By08'],
['repository','https://design.canva.ai/2fte0RH8rbU8m02'],
['research','https://design.canva.ai/ydrXFlp-Rn3ItBc'],
['privacy','https://design.canva.ai/F6IqVZLei9ruanr'],
['content website','https://design.canva.ai/tevszde3F762qXb'],
['guardrail','https://design.canva.ai/C0mLmshMlIKBefh'],
['benchmark','https://design.canva.ai/IkxnRttPA2mcv9c'],
['news','https://design.canva.ai/43pdiBEA_8IS9QR'],
['template','https://design.canva.ai/tJAoSWeHncofuX0'],
['small business','https://design.canva.ai/Is3QjvF_pSaq9yP'],
['operations','https://design.canva.ai/TEehszWxWrpgAFf'],
['educator','https://design.canva.ai/uEX0gf1taSawmAD']
];
const used=new Set();
function findArticle(match){
  const m=match.toLowerCase();
  const aliases={
    'rag vs':['rag-vs','long context'],
    'coding assistant':['coding assistant','code assistant'],
    'content website':['content','website'],
    'reusable ai skills':['reusable','skills'],
    'educator':['educator','education']
  };
  const needles=aliases[m]||[m];
  let article=articles.find(a=>!used.has(a.slug)&&needles.every(n=>`${a.slug} ${a.title} ${a.excerpt}`.toLowerCase().includes(n)));
  if(!article&&needles.length>1)article=articles.find(a=>!used.has(a.slug)&&needles.some(n=>`${a.slug} ${a.title} ${a.excerpt}`.toLowerCase().includes(n)));
  if(!article)throw new Error(`No unmatched guide found for candidate: ${match}`);
  used.add(article.slug);return article;
}
async function ingest(match,url){
  const article=findArticle(match);
  const res=await fetch(url,{redirect:'follow',headers:{'User-Agent':'AI-Compass-editorial-asset-ingest/1.0'}});
  if(!res.ok)throw new Error(`${article.slug}: HTTP ${res.status}`);
  const input=Buffer.from(await res.arrayBuffer());
  if(input.length<10000)throw new Error(`${article.slug}: candidate image too small (${input.length})`);
  const file=path.join(outDir,`${article.slug}.webp`);
  await sharp(input).resize(960,540,{fit:'cover',position:'attention'}).webp({quality:84,effort:5}).toFile(file);
  const meta=await sharp(file).metadata();
  if(meta.width!==960||meta.height!==540)throw new Error(`${article.slug}: invalid output dimensions`);
  return {slug:article.slug,title:article.title,file:`assets/guides/${article.slug}.webp`,sourceCandidate:url,provenance:'AI-generated for AI Compass',width:meta.width,height:meta.height,bytes:fs.statSync(file).size};
}
(async()=>{
  const items=[];
  for(let i=0;i<candidates.length;i++){console.log(`[${i+1}/${candidates.length}] ${candidates[i][0]}`);items.push(await ingest(...candidates[i]));}
  if(items.length!==28||used.size!==28)throw new Error(`Expected 28 unique guide assets; got ${items.length}/${used.size}`);
  fs.writeFileSync(path.join(outDir,'manifest.json'),JSON.stringify({version:2,count:items.length,generatedFor:'AI Compass',runtimeGeneration:false,items},null,2)+'\n');
  console.log('Stored 28 pre-generated guide images as first-party WebP assets.');
})().catch(err=>{console.error(err);process.exit(1)});
