(()=>{
'use strict';

const D=window.AI_COMPASS_DATA;
if(!D||!Array.isArray(D.articles)||!Array.isArray(D.comparisons))return;

const verified='2026-08-12';
const guide=D.articles.find(item=>item.slug==='choose-your-first-ai-subscription');

if(guide){
  guide.updated='12 August 2026';
  guide.verified=verified;

  const decision=guide.sections?.find(section=>section.id==='decision');
  if(decision){
    decision.html=`<p>Do not begin with benchmark charts. Begin with the place where you work and the outcome you want. Most people should pay for <strong>one primary general-purpose service</strong>, keep free accounts on two alternatives, and only add a specialist subscription after a real limitation appears.</p>
<div class="callout"><strong>Fast recommendation:</strong><ul><li><strong>ChatGPT</strong> when you want a broad all-round workspace for writing, analysis, files, images, coding and connected tools.</li><li><strong>Claude</strong> when your work is dominated by long documents, careful writing, analysis and coding projects.</li><li><strong>Google AI Plus</strong> when you want the lower-cost paid Google AI tier and already value Gmail, Drive, NotebookLM and bundled storage; step up to <strong>Google AI Pro</strong> when you need higher Gemini limits, the Pro model and the larger bundle.</li><li><strong>Microsoft 365 Copilot</strong> when your organisation lives in Outlook, Teams, Word, Excel and SharePoint and has the required business licences; eligible Microsoft 365 users can also start with Copilot Chat at no additional Copilot licence cost.</li><li><strong>Perplexity Pro</strong> when web research and visible citations are the main job.</li><li><strong>GitHub Copilot or a dedicated coding agent</strong> when most of your AI time is spent inside repositories and an IDE.</li></ul></div>`;
  }

  const snapshot=guide.sections?.find(section=>section.id==='snapshot');
  if(snapshot){
    snapshot.html=`<p>The figures below are a starting point, not a promise. Providers change names, limits, regional availability and bundles frequently. Prices are shown in US dollars where the provider publishes a clear US price and were checked against official provider pages on 12 August 2026.</p>
<div class="table-wrap"><table><thead><tr><th>Service</th><th>Current paid starting point</th><th>Strongest fit</th><th>Important limitation</th></tr></thead><tbody>
<tr><td>ChatGPT Plus</td><td>$20/month</td><td>General-purpose personal AI workspace</td><td>Usage limits and model availability can change</td></tr>
<tr><td>Claude Pro</td><td>$20/month; $17/month equivalent with the $200 annual plan</td><td>Writing, long documents, analysis and Claude Code access</td><td>API usage is separate from the consumer plan</td></tr>
<tr><td>Google AI Plus</td><td>$9.99/month on the US plan page</td><td>Lower-cost Google AI bundle with 2 TB storage, Gemini and NotebookLM</td><td>Features, limits and bundles vary by country</td></tr>
<tr><td>Google AI Pro</td><td>$19.99/month on the US plan page</td><td>Higher Gemini limits, Pro-model access, Deep Research and a 5 TB Google bundle</td><td>Features, limits and bundles vary by country</td></tr>
<tr><td>Microsoft 365 Copilot</td><td>Copilot Chat is included for eligible Microsoft 365 users; full Microsoft 365 Copilot is $30/user/month paid yearly on the South Africa business page</td><td>Work grounded in Microsoft 365 organisational data</td><td>The full Copilot licence requires an eligible Microsoft 365 plan; agent usage can involve separate metered capacity</td></tr>
<tr><td>Perplexity Pro</td><td>$17/month when billed annually on the current Pro page; monthly and local pricing can differ</td><td>Web research with citations and multiple model choices</td><td>Citations still need to be opened and checked</td></tr>
</tbody></table></div>`;
  }

  const workflow=guide.sections?.find(section=>section.id==='workflow');
  if(workflow){
    workflow.html=`<h3>1. You want one service for almost everything</h3><p>Choose the product whose interface, file handling and connected tools remove the most friction. ChatGPT is usually the most complete all-round starting point. Claude is a strong alternative when writing quality, long-form reasoning or coding is more important than breadth of consumer integrations.</p>
<h3>2. You work inside Microsoft 365</h3><p>Start with Copilot Chat if your eligible Microsoft 365 account already includes it. The paid Microsoft 365 Copilot licence becomes more valuable when it can safely ground answers in the organisation's permitted email, meetings, documents and SharePoint content. It is much less compelling when the tenant is poorly organised, permissions are inconsistent or the user only wants a generic chatbot. The licence is only one part of the implementation.</p>
<h3>3. You work inside Google</h3><p>Google AI Plus is now the lower-cost paid entry point on Google's US plan page. Google AI Pro costs more but adds higher Gemini limits, Pro-model and Deep Research access, and a larger storage bundle. Compare the local bundle and the limits you actually need rather than assuming the more expensive tier is automatically better.</p>
<h3>4. You research all day</h3><p>Perplexity is designed around web search and citations. It is excellent for rapidly mapping a topic, locating primary sources and comparing claims. It should not replace opening the sources, checking dates and reading the evidence.</p>
<h3>5. You code all day</h3><p>A general subscription can help with code, but the decisive feature is often repository awareness, terminal access, diff review, pull requests and testing. Add a coding subscription only after deciding where the code will live and how changes will be reviewed.</p>`;
  }
}

const byName=name=>D.comparisons.find(item=>item.name===name);
const chatgpt=byName('ChatGPT Plus');
if(chatgpt)chatgpt.price='$20/month (official help page; checked 12 Aug 2026)';
const claude=byName('Claude Pro');
if(claude)claude.price='$20 monthly; $17/month equivalent on annual billing (official pricing; checked 12 Aug 2026)';
const google=byName('Google AI Pro');
if(google){
  google.name='Google AI Plus / Pro';
  google.bestFor='Google Workspace, NotebookLM and bundled-storage users';
  google.strengths=['Lower-cost Plus tier for everyday Google AI use','Pro tier adds higher Gemini limits and Pro-model access','NotebookLM, Google apps and bundled cloud storage'];
  google.caution='Plan names, limits, storage and included benefits vary by country';
  google.price='$9.99/month Plus; $19.99/month Pro on US plan page (checked 12 Aug 2026)';
}
const microsoft=byName('Microsoft 365 Copilot');
if(microsoft)microsoft.price='Copilot Chat included for eligible Microsoft 365 users; full Copilot $30/user/month paid yearly on SA page, excl. VAT (checked 12 Aug 2026)';
const perplexity=byName('Perplexity Pro');
if(perplexity)perplexity.price='$17/month when billed annually on current Pro page; monthly/local pricing varies (checked 12 Aug 2026)';
})();
