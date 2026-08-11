(()=>{
'use strict';
const D=window.AI_COMPASS_DATA||{articles:[]};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bySlug=slug=>D.articles.find(item=>item.slug===slug);

// Review-build overrides use the exact artwork supplied by the site owner.
// They are intentionally isolated here so no generated/vector fallback can replace them.
const REVIEW_ASSETS={
  'ai-for-documents-spreadsheets-meetings':'https://media.canva.com/v2/image-resize/format:JPG/height:112/quality:75/uri:ifs%3A%2F%2FM%2F98389228-c16f-4d37-9395-a1ae3d0db18f/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAANRm5G-25B8A3gOgeAVa5XtIwxiIzffYGfhZnbzAfeyC&exp=1786440426&osig=AAAAAAAAAAAAAAAAAAAAANuGj8j09JfpXxY0rRsfnxFYttUPykxak9c8W2SkoBuQ&signer=media-rpc&x-canva-quality=thumbnail',
  'evaluate-ai-output-scorecard':'https://media.canva.com/v2/image-resize/format:JPG/height:112/quality:75/uri:ifs%3A%2F%2FM%2F4492273b-5db8-429f-8e75-8503cec69266/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAHuuQY29bVTWoj-mCcmzdhHJRycAC2pEv6Ed-_ct1sDR&exp=1786440623&osig=AAAAAAAAAAAAAAAAAAAAAKVe4OoI3blvFGsodq-t3dbaIFaRWp7QQFz5Ku7CWwMS&signer=media-rpc&x-canva-quality=thumbnail',
  'choose-your-first-ai-subscription':'https://media.canva.com/v2/image-resize/format:JPG/height:112/quality:75/uri:ifs%3A%2F%2FM%2F26c909fd-401a-4326-b78f-3bacf0493fdf/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAIa9rZUdio3HsKykHn7ZdNavCSE8s9Hf-y6K2pPtiakg&exp=1786438597&osig=AAAAAAAAAAAAAAAAAAAAANWVpj5iTNB7_72zmB4Zhtfw0sWfxwVOeZbYpHQXiPmV&signer=media-rpc&x-canva-quality=thumbnail',
  'multimodal-ai-practical-guide':'https://media.canva.com/v2/image-resize/format:JPG/height:133/quality:75/uri:ifs%3A%2F%2FM%2F2022c06c-507e-4cf6-aacf-259df7dbebe9/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAE2qeg4BFeyuqVaA_Zxiql4Gx-fzuFcvaAQ21b1Wqv9m&exp=1786440468&osig=AAAAAAAAAAAAAAAAAAAAAKEeuzwoIyvbk6mgzKhqEfSH12ppu5Wjb9OGZLJqyJY0&signer=media-rpc&x-canva-quality=thumbnail',
  'ai-governance-starter-kit':'https://media.canva.com/v2/image-resize/format:JPG/height:112/quality:75/uri:ifs%3A%2F%2FM%2Fcc9ffe67-2a0c-46bc-a78f-ca7a1ae9115a/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAMPFnfhd2ZkXPblI6nlc8odvnbHN_FZ87Tr3gM0HIIEV&exp=1786438676&osig=AAAAAAAAAAAAAAAAAAAAAG21l6cX81bZahfU8gMuaHFuV_t-WzUVorFcljdJV7n-&signer=media-rpc&x-canva-quality=thumbnail',
  'connect-ai-to-github':'https://media.canva.com/v2/image-resize/format:JPG/height:133/quality:75/uri:ifs%3A%2F%2FM%2F0a8becc4-b4f1-43a6-ba22-e9622b8f5ee0/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAB-ALQ05Pzi-gs49H6sRfX2KioUvT0pNLD4fiS3HltWy&exp=1786440696&osig=AAAAAAAAAAAAAAAAAAAAAD1wzlKIku2BG2LO6RtzajnRjhffmg-Z9mOQNY5ynI-9&signer=media-rpc&x-canva-quality=thumbnail',
  'obsidian-ai-second-brain':'https://media.canva.com/v2/image-resize/format:JPG/height:133/quality:75/uri:ifs%3A%2F%2FM%2Fb8934465-29cc-4a30-8bb1-3981422d66e5/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAFIo6xSNDvUE2gmbXAaDFhx9EotA5uDTtg1qfUePXBci&exp=1786440768&osig=AAAAAAAAAAAAAAAAAAAAAJtmWuC8VpwtMXcqPdEqfKRtEy3KIW9ZwZkV_HIvUIi-&signer=media-rpc&x-canva-quality=thumbnail',
  'understand-hugging-face':'https://media.canva.com/v2/image-resize/format:JPG/height:111/quality:75/uri:ifs%3A%2F%2FM%2Fcdefbf40-37a2-40a5-a4ca-310380f0f47b/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAANTBpkb7VqorQbOKklqhbF1YqFdtcECRgm44AhmKR9iT&exp=1786438232&osig=AAAAAAAAAAAAAAAAAAAAADd3DUO5dhGcMAXps8RlmUmAdOo-mxuG-v8EgqJfdlSK&signer=media-rpc&x-canva-quality=thumbnail',
  'build-first-rag-knowledge-base':'https://media.canva.com/v2/image-resize/format:JPG/height:111/quality:75/uri:ifs%3A%2F%2FM%2Fee940891-3b1a-4eca-aac8-e529ee089c94/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAPuDFJPiIDdzFxKeqSpcEcEZR1kOeDhAGhydNJpc8YM-&exp=1786439786&osig=AAAAAAAAAAAAAAAAAAAAAKAZwFjL3sBNqW5MJHZGOavbNkEJoaW0PE4xnine4CHj&signer=media-rpc&x-canva-quality=thumbnail',
  'create-reusable-ai-skills':'https://media.canva.com/v2/image-resize/format:JPG/height:111/quality:75/uri:ifs%3A%2F%2FM%2F31a1ad2e-9e27-4188-a2fc-c23ba555ac65/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAALHMkd0D5kONHcAiVQosGiLXD3cgo67lzWgf4numgLcX&exp=1786440821&osig=AAAAAAAAAAAAAAAAAAAAAOMzD82IwoGiDuwFAA9K225WR3iifRnFFNqMmbVuBjLl&signer=media-rpc&x-canva-quality=thumbnail'
};

const src=slug=>REVIEW_ASSETS[slug]||`assets/guides/${encodeURIComponent(slug)}.webp`;
function applyFigure(figure,item){
  if(!figure||!item||figure.dataset.customGuideAsset===item.slug)return;
  const img=figure.querySelector('img');if(!img)return;
  img.src=src(item.slug);img.removeAttribute('srcset');img.removeAttribute('sizes');img.removeAttribute('referrerpolicy');
  img.alt=`Guide thumbnail illustrating ${item.title}`;
  img.loading=figure.closest('.article-visual')?'eager':'lazy';img.decoding='async';img.style.objectPosition='50% 50%';
  const credit=figure.querySelector('.visual-credit');if(credit)credit.innerHTML=REVIEW_ASSETS[item.slug]?'AI Compass guide artwork':'AI-generated for AI Compass';
  figure.dataset.customGuideAsset=item.slug;
}
function enhance(root=document){
  root.querySelectorAll?.('.guide-card-link[href^="#article/"]').forEach(link=>{const slug=decodeURIComponent(link.getAttribute('href').split('/').pop()||'');const item=bySlug(slug);if(item)applyFigure(link.querySelector('.editorial-photo-frame'),item)});
  const match=(location.hash||'').match(/^#article\/([^?]+)/);if(match){const item=bySlug(decodeURIComponent(match[1]));if(item)applyFigure(root.querySelector?.('.article-summary .editorial-photo-frame'),item)}
}
let queued=false;function queue(root=document){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;enhance(root)})}
document.addEventListener('DOMContentLoaded',()=>{queue();const app=document.getElementById('app');if(app)new MutationObserver(()=>queue(app)).observe(app,{childList:true,subtree:true});window.addEventListener('hashchange',()=>queue())});
window.AI_COMPASS_GUIDE_ASSETS={src};
})();
