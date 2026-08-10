'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');
const root=path.resolve(__dirname,'..');

const sandbox={
  window:{},
  document:{addEventListener(){},querySelectorAll(){return[]},getElementById(){return null}},
  location:{hash:'#home'},
  MutationObserver:class{observe(){}},
  requestAnimationFrame:fn=>fn(),
  console
};
sandbox.window.window=sandbox.window;
vm.createContext(sandbox);

const run=file=>vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),sandbox,{filename:file});
['data.js','news-refresh.js','knowledge.js','template-library.js','sector-starter-packs.js','education-starter-pack.js','visual-system.js'].forEach(run);

const D=sandbox.window.AI_COMPASS_DATA;
const F=sandbox.window.AI_COMPASS_FEED;
const V=sandbox.window.AI_COMPASS_VISUALS;
if(!D||!Array.isArray(D.articles))throw new Error('Article library did not load');
if(!F||!Array.isArray(F))throw new Error('News feed did not load');
if(!V||typeof V.artwork!=='function')throw new Error('Editorial visual API did not load');

const slugs=new Set();
for(const article of D.articles){
  if(!article.slug)throw new Error('Guide missing slug');
  if(slugs.has(article.slug))throw new Error(`Duplicate guide slug: ${article.slug}`);
  slugs.add(article.slug);
  const svg=V.artwork(article.slug,article.category,`Editorial illustration for ${article.title}`);
  if(!svg.includes('<svg')||!svg.includes('role="img"')||!svg.includes('aria-label='))throw new Error(`Invalid guide artwork: ${article.slug}`);
  if(/undefined|null/.test(svg))throw new Error(`Broken value in guide artwork: ${article.slug}`);
  const again=V.artwork(article.slug,article.category,`Editorial illustration for ${article.title}`);
  if(svg!==again)throw new Error(`Artwork must be deterministic: ${article.slug}`);
}

if(D.articles.length<28)throw new Error(`Guide preservation failure: expected at least 28 guides, found ${D.articles.length}`);

for(const item of F){
  if(!item.id||!item.url)continue;
  if(item.thumbnail){
    if(!/^https:\/\//.test(item.thumbnail))throw new Error(`Non-HTTPS news thumbnail: ${item.id}`);
    if(!item.thumbnailAlt)throw new Error(`Thumbnail missing alt text: ${item.id}`);
    if(!item.thumbnailCredit)throw new Error(`Thumbnail missing credit: ${item.id}`);
  }
  const fallback=V.artwork(item.id,item.category,`AI Compass editorial illustration for ${item.title}`);
  if(!fallback.includes('<svg'))throw new Error(`News fallback artwork failed: ${item.id}`);
}

const css=fs.readFileSync(path.join(root,'visual-system.css'),'utf8');
for(const selector of ['.guide-visual','.editorial-fallback','.article-visual','.path-visual']){
  if(!css.includes(selector))throw new Error(`Missing visual CSS contract: ${selector}`);
}

console.log(`Visual system OK: ${D.articles.length} guides preserved; ${F.length} feed items have official-image or editorial-fallback coverage.`);
