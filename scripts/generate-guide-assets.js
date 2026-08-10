const fs=require('fs');
const path=require('path');
const vm=require('vm');

const context={window:{}};
vm.createContext(context);
for(const file of ['data.js','knowledge.js','template-library.js','sector-starter-packs.js','education-starter-pack.js','content.js']){
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}
const articles=context.window.AI_COMPASS_DATA?.articles||[];
if(articles.length<28)throw new Error(`Expected at least 28 guides, found ${articles.length}`);

const outDir=path.join(process.cwd(),'assets','guides');
fs.mkdirSync(outDir,{recursive:true});

function seed(value){let h=2166136261;for(const c of value){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return Math.abs(h>>>0)}
function scene(article){
  const t=`${article.slug} ${article.title} ${article.excerpt}`.toLowerCase();
  if(t.includes('documents')||t.includes('spreadsheet')||t.includes('meeting'))return 'a professional desk combining a printed report, spreadsheet analysis on a laptop, and meeting action notes, with human hands checking evidence';
  if(t.includes('scorecard')||t.includes('evaluate'))return 'an analyst comparing several AI outputs against a structured quality scorecard, evidence markers and pass/fail review notes';
  if(t.includes('automation')||t.includes('workflow or agent'))return 'three clearly different levels of automation represented by a fixed process line, a human-supervised AI workflow, and a bounded autonomous agent, all in one coherent real-world operations scene';
  if(t.includes('governance'))return 'a small leadership team reviewing an AI risk register, approval gates and policy controls around a shared table, calm and practical rather than legalistic';
  if(t.includes('multimodal'))return 'one creator workstation handling an image, audio waveform, video timeline and text document together, showing multimodal analysis in a realistic studio';
  if(t.includes('subscription')||t.includes('plan'))return 'a person comparing several neutral AI service options on a laptop with a simple decision matrix, budget notes and feature trade-offs, no provider logos';
  if(t.includes('github')&&t.includes('connect'))return 'a developer connecting an AI coding assistant to a version-controlled repository, with a visible diff review and test status on dual monitors, no logos';
  if(t.includes('obsidian')||t.includes('second brain'))return 'a calm personal knowledge workspace with linked notes, folders and a graph-like knowledge structure on screen, showing an AI-assisted second brain without branded UI';
  if(t.includes('prompt'))return 'a close editorial view of a carefully structured AI instruction being refined from rough notes into a clear goal, context, constraints and acceptance criteria, no readable text';
  if(t.includes('skills'))return 'a modular toolkit of reusable AI workflow components being assembled by a professional, each component representing instructions, references and validation steps';
  if(t.includes('mcp'))return 'a central AI assistant securely connected through narrow adapters to files, calendar, code and database tools, shown as a realistic systems architecture scene rather than an infographic';
  if(t.includes('orchestration'))return 'an operations control desk coordinating several specialised AI agents with clear handoffs, shared state and one human supervisor, no robots';
  if(t.includes('rag-vs')||t.includes('long context'))return 'two contrasting research workspaces: one retrieves a few precise source documents while the other handles one very large context pack, visually comparing retrieval versus long-context reasoning';
  if(t.includes('rag')||t.includes('knowledge base'))return 'a searchable knowledge base built from verified documents flowing through indexing into evidence-backed answers, represented as a realistic research workstation with source documents';
  if(t.includes('hugging face'))return 'an open-source machine learning workbench comparing models, datasets and demos on a developer workstation, community-oriented and vendor-neutral';
  if(t.includes('local')||t.includes('locally'))return 'a compact desktop workstation running an AI model locally with no cloud connection, visible GPU hardware, privacy-focused home-lab atmosphere';
  if(t.includes('coding')||t.includes('code assistant'))return 'a software developer reviewing AI-assisted code changes on two monitors with a clear diff, tests and terminal output, realistic engineering workspace';
  if(t.includes('repository')||t.includes('repositories'))return 'a maintainer auditing an open-source repository for documentation, recent commits, licences, issues and security signals before adoption';
  if(t.includes('research')||t.includes('sources'))return 'a researcher tracing an AI-generated claim back to primary papers and official sources, with multiple documents open and evidence being cross-checked';
  if(t.includes('privacy'))return 'a professional redacting sensitive identifiers and secrets from a document before sending it to an AI tool, security-conscious but non-alarmist';
  if(t.includes('content')&&t.includes('website'))return 'an editorial production workflow where researched source material moves through drafting, review, image selection and final website publishing with clear human approval';
  if(t.includes('guardrail'))return 'a production AI agent operating inside visible permission boundaries with approval gates, monitoring and rollback controls, overseen by an engineer';
  if(t.includes('benchmark'))return 'a careful model evaluation lab comparing benchmark charts with real task examples and caveat notes, emphasising measurement rather than leaderboard hype';
  if(t.includes('news'))return 'an editor at a clean technology news desk separating primary announcements from analysis, checking dates and sources before publishing a concise briefing';
  if(t.includes('small business'))return 'a small business owner at a real desk identifying one high-value AI use case with customer work, invoices and a simple pilot plan, practical and approachable';
  if(t.includes('operations'))return 'an operations engineer in a modern industrial control environment reviewing procedures, handover notes and live performance information with AI assistance';
  if(t.includes('educator')||t.includes('education'))return 'a teacher guiding students in a modern classroom while using AI as a supervised learning aid, with student thinking and human teaching clearly central';
  return `a premium editorial scene that clearly communicates this AI guide: ${article.title}`;
}

function prompt(article){
  return [
    `Standalone 16:9 editorial thumbnail for the guide “${article.title}”.`,
    `Guide purpose: ${article.excerpt}`,
    `Scene: ${scene(article)}.`,
    'Professional technology publication photography or photoreal editorial illustration, realistic people and materials when relevant, strong single focal idea, sophisticated natural lighting, clean composition, restrained navy blue and warm neutral palette, useful at small card size.',
    'No text, no letters, no logos, no brand marks, no website UI, no infographic, no vector diagram, no glowing brain, no generic humanoid robot, no cyberpunk neon, no hologram hands, no clutter.',
    'Keep the key subject inside the central 80 percent so responsive crops remain useful.'
  ].join(' ');
}

async function download(article){
  const p=prompt(article);
  const url=`https://image.pollinations.ai/prompt/${encodeURIComponent(p)}?width=1280&height=720&model=flux&nologo=true&seed=${seed(article.slug)}`;
  const file=path.join(outDir,`${article.slug}.jpg`);
  let last;
  for(let attempt=1;attempt<=4;attempt++){
    try{
      const res=await fetch(url,{headers:{'User-Agent':'AI-Compass-editorial-asset-build/1.0'}});
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      const buf=Buffer.from(await res.arrayBuffer());
      if(buf.length<25000)throw new Error(`image too small (${buf.length} bytes)`);
      if(buf[0]!==0xff||buf[1]!==0xd8)throw new Error('response is not JPEG');
      fs.writeFileSync(file,buf);
      return {slug:article.slug,title:article.title,excerpt:article.excerpt,file:`assets/guides/${article.slug}.jpg`,prompt:p,bytes:buf.length,generatedAt:new Date().toISOString()};
    }catch(err){last=err;console.warn(`${article.slug}: attempt ${attempt} failed: ${err.message}`);await new Promise(r=>setTimeout(r,attempt*3000));}
  }
  throw new Error(`${article.slug}: ${last?.message||'generation failed'}`);
}

(async()=>{
  const manifest=[];
  for(let i=0;i<articles.length;i++){
    const article=articles[i];
    console.log(`[${i+1}/${articles.length}] ${article.slug}`);
    manifest.push(await download(article));
    await new Promise(r=>setTimeout(r,800));
  }
  fs.writeFileSync(path.join(outDir,'manifest.json'),JSON.stringify({version:1,count:manifest.length,items:manifest},null,2)+'\n');
  console.log(`Generated ${manifest.length} first-party guide images.`);
})().catch(err=>{console.error(err);process.exit(1)});
