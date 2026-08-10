'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');
const root=path.resolve(__dirname,'..');

const sandbox={
  window:{},
  document:{addEventListener(){},querySelectorAll(){return[]},getElementById(){return null}},
  location:{hash:'#home',href:'https://ai-compass-hub.vercel.app/#home'},
  URL,
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
if(!V||typeof V.photoFor!=='function'||typeof V.picture!=='function')throw new Error('Photographic visual API did not load');

const photoKeys=Object.keys(V.photos||{});
if(photoKeys.length<8)throw new Error(`Expected at least 8 curated photographic sources, found ${photoKeys.length}`);
for(const key of photoKeys){
  const photo=V.photos[key];
  if(!photo.base||!/^https:\/\//.test(photo.base))throw new Error(`Invalid photo source: ${key}`);
  if(!photo.source||!/^https:\/\//.test(photo.source))throw new Error(`Photo provenance missing: ${key}`);
  if(!photo.credit||!photo.alt)throw new Error(`Photo metadata incomplete: ${key}`);
}

const slugs=new Set();
for(const article of D.articles){
  if(!article.slug)throw new Error('Guide missing slug');
  if(slugs.has(article.slug))throw new Error(`Duplicate guide slug: ${article.slug}`);
  slugs.add(article.slug);
  const photo=V.photoFor(article);
  const html=V.picture(photo,`Photo selected for ${article.title}`,'guide-photo');
  if(!html.includes('<img')||!html.includes('class="editorial-photo"'))throw new Error(`Guide photo markup failed: ${article.slug}`);
  if(!html.includes('alt=')||!html.includes('loading=')||!html.includes('visual-credit'))throw new Error(`Guide photo accessibility/provenance failed: ${article.slug}`);
  if(!html.includes('https://'))throw new Error(`Guide photo is not HTTPS: ${article.slug}`);
  if(/undefined|null/.test(html))throw new Error(`Broken value in guide photo markup: ${article.slug}`);
}

if(D.articles.length<28)throw new Error(`Guide preservation failure: expected at least 28 guides, found ${D.articles.length}`);

for(const item of F){
  if(!item.id||!item.url)continue;
  if(item.thumbnail){
    if(!/^https:\/\//.test(item.thumbnail))throw new Error(`Non-HTTPS news thumbnail: ${item.id}`);
    if(!item.thumbnailAlt)throw new Error(`Thumbnail missing alt text: ${item.id}`);
    if(!item.thumbnailCredit)throw new Error(`Thumbnail missing credit: ${item.id}`);
  }
  const photo=V.photoFor(item.id,item.category);
  const fallback=V.picture(photo,`Contextual editorial photograph for ${item.title}`,'news-photo');
  if(!fallback.includes('<img'))throw new Error(`News photographic fallback failed: ${item.id}`);
}

const js=fs.readFileSync(path.join(root,'visual-system.js'),'utf8');
if(js.includes('class="editorial-svg"'))throw new Error('Legacy vector renderer remains in visual-system.js');
const css=fs.readFileSync(path.join(root,'visual-system.css'),'utf8');
for(const selector of ['.guide-visual','.editorial-photo','.visual-credit','.editorial-fallback','.article-visual','.path-visual','.hero-photo']){
  if(!css.includes(selector))throw new Error(`Missing visual CSS contract: ${selector}`);
}

console.log(`Photographic visual system OK: ${D.articles.length} guides preserved; ${photoKeys.length} curated sources; ${F.length} feed items covered.`);
