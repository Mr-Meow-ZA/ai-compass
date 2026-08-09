(()=>{
'use strict';

const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const verified='2026-08-09';

const additions=[
  {
    id:'openai-atlas-retirement',
    title:'OpenAI retires Atlas as browser-agent work moves into ChatGPT and Codex',
    dek:'OpenAI says Atlas is scheduled to stop working on 9 August 2026 and advises users to save important browser data while browser-based agent capabilities move into supported ChatGPT and Codex experiences.',
    source:'OpenAI',
    sourceType:'Official help article',
    category:'Products',
    format:'Service update',
    date:'2026-08-09',
    readTime:'4 min',
    url:'https://help.openai.com/en/articles/20001371',
    verified,
    visual:'browser-blue'
  },
  {
    id:'openai-academic-researchers',
    title:'OpenAI launches ChatGPT for Academic Researchers',
    dek:'A new program is starting with 10,000 researchers and is intended to expand to 100,000 through 2027, providing selected academic researchers access to frontier models, research tools and collaborative workspaces.',
    source:'OpenAI',
    sourceType:'Official announcement',
    category:'Research',
    format:'Announcement',
    date:'2026-07-29',
    readTime:'8 min',
    url:'https://openai.com/index/chatgpt-for-academic-researchers/',
    verified,
    visual:'grid-blue'
  },
  {
    id:'deepmind-gemini-flash-cyber',
    title:'Google DeepMind introduces Gemini 3.5 Flash Cyber for defensive security',
    dek:'Google DeepMind describes a security-specialised model for finding, validating and patching vulnerabilities. Initial access is deliberately limited to governments and trusted partners through CodeMender because of dual-use risk.',
    source:'Google DeepMind',
    sourceType:'Official announcement',
    category:'Safety',
    format:'Model announcement',
    date:'2026-07-21',
    readTime:'10 min',
    url:'https://deepmind.google/blog/introducing-gemini-3-5-flash-cyber/',
    verified,
    visual:'shield-blue',
    thumbnail:'https://lh3.googleusercontent.com/2SfaBZi2B77t3_nwlhziN5pvSi_icX_e1ZTzjad6m5rBFfQLKWVxDOb_TPjJXz-e_mn_vMaPBHaYPaAUzmfUt9DwpBiq_gCLWYnAmGFhhLU9huogog%3Dw1440-h810-n-nu',
    thumbnailAlt:'Gemini 3.5 Flash Cyber title graphic beside a blue shield',
    thumbnailCredit:'Google DeepMind',
    thumbnailSource:'https://deepmind.google/blog/introducing-gemini-3-5-flash-cyber/'
  }
];

const updates={
  'anthropic-teachers':{
    verified,
    thumbnail:'https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fc39f489c0763bac41638f8ea29a0ae1335c3ecb2-1200x630.jpg&w=3840',
    thumbnailAlt:'Introducing Claude for Teachers announcement artwork',
    thumbnailCredit:'Anthropic',
    thumbnailSource:'https://www.anthropic.com/news/claude-for-teachers'
  }
};

for(const item of feed){
  if(updates[item.id])Object.assign(item,updates[item.id]);
}
for(const item of additions.slice().reverse()){
  const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url);
  if(existing>=0)feed[existing]={...feed[existing],...item};
  else feed.unshift(item);
}

const byUrl=new Map(feed.filter(item=>item.url).map(item=>[item.url.replace(/\/$/,''),item]));
const formatVerified=value=>{
  try{return new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'short',year:'numeric'}).format(new Date(`${value}T12:00:00`))}
  catch{return value}
};

function enhanceNews(root=document){
  root.querySelectorAll?.('.news-item h3 a[href]').forEach(link=>{
    const url=link.href.replace(/\/$/,'');
    const item=byUrl.get(url);
    if(!item)return;
    const content=link.closest('h3')?.parentElement;
    if(!content)return;

    if(item.thumbnail&&!content.querySelector('.news-thumbnail')){
      const figure=document.createElement('figure');
      figure.className='news-thumbnail';
      const anchor=document.createElement('a');
      anchor.href=item.url;
      anchor.target='_blank';
      anchor.rel='noopener noreferrer';
      anchor.setAttribute('aria-label',`Open ${item.title} at ${item.source}`);
      const img=document.createElement('img');
      img.src=item.thumbnail;
      img.alt=item.thumbnailAlt||'';
      img.loading='lazy';
      img.decoding='async';
      img.addEventListener('error',()=>figure.hidden=true,{once:true});
      anchor.appendChild(img);
      figure.appendChild(anchor);
      if(item.thumbnailCredit){
        const caption=document.createElement('figcaption');
        const credit=document.createElement('a');
        credit.href=item.thumbnailSource||item.url;
        credit.target='_blank';
        credit.rel='noopener noreferrer';
        credit.textContent=`Image: ${item.thumbnailCredit}`;
        caption.appendChild(credit);
        figure.appendChild(caption);
      }
      content.insertBefore(figure,content.firstChild);
    }

    if(item.verified){
      const meta=content.querySelector('.meta-row');
      if(meta&&!meta.querySelector('.news-verified')){
        const stamp=document.createElement('span');
        stamp.className='news-verified';
        stamp.textContent=`Verified ${formatVerified(item.verified)}`;
        meta.appendChild(stamp);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  enhanceNews();
  const app=document.getElementById('app');
  if(app)new MutationObserver(()=>enhanceNews(app)).observe(app,{childList:true,subtree:true});
});
})();
