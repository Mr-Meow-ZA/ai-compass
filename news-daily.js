(()=>{
'use strict';
const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
const items=[
  {
    id:'openai-cursor-contract-wind-down',
    title:'OpenAI plans to end model access for Cursor after its SpaceX acquisition',
    dek:'OpenAI says it has notified SpaceX that it intends to wind down the contract supplying OpenAI models to Cursor, with a proposed shutoff date of November 12, 2026. OpenAI says the decision follows Cursor\'s change of control and concerns about enforcing its terms with SpaceX. Cursor users should treat the date as a migration signal rather than assume every model disappears immediately: OpenAI says the parties still have a notice period, and Reuters reports Cursor is continuing discussions with OpenAI.',
    source:'OpenAI',sourceType:'Official company announcement',category:'Business',format:'Daily brief',date:'2026-08-28',readTime:'4 min',
    url:'https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/',contextUrl:'https://www.reuters.com/business/media-telecom/openai-end-partnership-with-spacexs-cursor-2026-08-29/',verified:'2026-08-30',visual:'developer-blue'
  },
  {
    id:'tencent-hy4-preview-open-weights',
    title:'Tencent releases Hy4 preview as an Apache-2.0 open-weight flagship model',
    dek:'Tencent has released Hy4 preview and an FP8 variant with model weights under Apache 2.0. The Mixture-of-Experts model has 770B backbone parameters with 49B activated per token and a 1M-token context window, with deployment recipes for vLLM and SGLang. Tencent’s benchmark and internal preference results remain vendor evidence; the durable signal is a very large permissively licensed model with practical self-hosting support.',
    source:'Tencent',sourceType:'Official model release',category:'OpenSource',format:'Daily brief',date:'2026-08-28',readTime:'4 min',
    url:'https://huggingface.co/tencent/Hy4-preview',verified:'2026-08-29',visual:'models-blue'
  },
  {
    id:'anthropic-model-hardware-standard-preview',
    title:'Anthropic previews a Model Hardware Standard for agents controlling physical devices',
    dek:'Anthropic has opened a research preview of Model Hardware Standard (MHS), a shared specification intended to let AI agents operate multiple scientific and manufacturing instruments such as microscopes, liquid handlers and robotic arms. The preview is initially limited to selected labs and manufacturers, so this is an interoperability signal rather than a mature universal standard.',
    source:'Anthropic',sourceType:'Official research preview',category:'Agents',format:'Daily brief',date:'2026-08-27',readTime:'4 min',
    url:'https://www.anthropic.com/news/model-hardware-standard-research-preview',verified:'2026-08-28',visual:'developer-blue'
  },
  {
    id:'gemini-omni-1-1-flash-developer-controls',
    title:'Google makes Gemini Omni 1.1 Flash production-ready for generative video developers',
    dek:'Google has introduced Gemini Omni 1.1 Flash with additional creative controls and says the model is now production-ready through the Gemini API in Google AI Studio. The release matters mainly to builders of generative-video workflows; Google’s performance and quality claims remain vendor evidence until broader independent testing is available.',
    source:'Google',sourceType:'Official developer announcement',category:'Models',format:'Daily brief',date:'2026-08-27',readTime:'4 min',
    url:'https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/',verified:'2026-08-28',visual:'models-blue'
  },
  {
    id:'azure-repos-copilot-code-review-preview',
    title:'GitHub Copilot Code Review enters public preview for Azure Repos',
    dek:'Microsoft has opened GitHub Copilot Code Review to Azure DevOps customers in public preview, with organization/project/repository controls, custom instructions, automatic PR review policies, Managed DevOps Pool support and project-level cost attribution. Rollout is gradual and self-hosted agents are not currently supported.',
    source:'Microsoft',sourceType:'Official Azure DevOps announcement',category:'Products',format:'Daily brief',date:'2026-08-26',readTime:'4 min',
    url:'https://devblogs.microsoft.com/devops/copilot-code-reviews-for-azure-repos-public-preview/',verified:'2026-08-27',visual:'developer-blue'
  },
  {
    id:'perplexity-portable-computer-local-first-agent',
    title:'Perplexity launches Portable Computer for local-first agent workflows',
    dek:'Perplexity has launched a version of Computer that runs its orchestrator, planner, tool routing, task queue, local search and supported models on NVIDIA DGX Spark, keeping on-device work local and allowing optional cloud escalation when authorized. It is currently available to Pro and Max subscribers on DGX Spark, with RTX PC support planned.',
    source:'Perplexity',sourceType:'Official product announcement',category:'Products',format:'Daily brief',date:'2026-08-25',readTime:'4 min',
    url:'https://www.perplexity.ai/hub/blog/introducing-portable-computer-for-local-first-ai',verified:'2026-08-27',visual:'hardware-blue'
  },
  {
    id:'gemini-3-5-transcribe',
    title:'Google introduces Gemini 3.5 Transcribe for real-time speech-to-text',
    dek:'Google says Gemini 3.5 Transcribe is its most precise speech-to-text model yet, designed to turn noisy or disfluent audio into polished, formatted text for real-time voice interactions. The announcement is a model release, not proof that every existing Gemini surface exposes the same transcription controls.',
    source:'Google',sourceType:'Official announcement',category:'Models',format:'Daily brief',date:'2026-08-26',readTime:'3 min',
    url:'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/',verified:'2026-08-26',visual:'models-blue'
  },
  {
    id:'openai-admin-plugin-work-codex',
    title:'OpenAI adds an Admin plugin for ChatGPT Work and Codex',
    dek:'OpenAI has introduced an Admin plugin that lets authorized workspace administrators inspect adoption and usage, manage members and groups, review permissions and usage limits, and automate selected recurring admin workflows from ChatGPT Work and Codex. The plugin works within the admin’s existing role and permissions rather than granting broader access.',
    source:'OpenAI',sourceType:'Official announcement',category:'Business',format:'Daily brief',date:'2026-08-25',readTime:'4 min',
    url:'https://openai.com/index/introducing-admin-plugin/',verified:'2026-08-26',visual:'enterprise-blue'
  },
  {
    id:'openai-jalapeno-inference-chip',
    title:'OpenAI publishes first performance results for its Jalapeño inference chip',
    dek:'OpenAI says its first custom inference chip, Jalapeño, delivered a better combination of latency and performance per watt across GPT-OSS 120B, DeepSeek R1 670B and Kimi K2.5 1T in its testing. The published comparisons are OpenAI-run results and should be treated as vendor evidence until broader independent testing is available.',
    source:'OpenAI',sourceType:'Official engineering results',category:'Products',format:'Daily brief',date:'2026-08-25',readTime:'5 min',
    url:'https://openai.com/index/jalapeno-first-results/',verified:'2026-08-26',visual:'hardware-blue'
  }
];
for(const item of items){
  const existing=feed.findIndex(entry=>entry.id===item.id||entry.url===item.url);
  if(existing>=0)feed[existing]={...feed[existing],...item};else feed.unshift(item);
}
})();