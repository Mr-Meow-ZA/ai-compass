(()=>{
'use strict';
const D=window.AI_COMPASS_DATA;
if(!D||!Array.isArray(D.articles))return;
const item={
  slug:'small-business-ai-starter-pack',
  title:'A practical AI starter pack for small businesses',
  excerpt:'A low-risk way for small teams to choose useful AI jobs, run measurable pilots, protect business information and scale only what proves its value.',
  type:'Sector starter pack',category:'workflows',level:'Beginner',readTime:18,date:'2026-08-08',featured:true,source:'AI Compass',
  tags:['small business','SMB','productivity','adoption','workflows','governance','evaluation'],
  sections:[
    {title:'Start with five jobs, not fifty tools',id:'five-jobs',html:'<p>Small teams usually get more value from improving a few repeated jobs than from testing every new AI product. Start with work that is frequent, reviewable and reversible: customer-reply drafts, marketing variants, recurring admin, spreadsheet analysis and source-backed research.</p><p>For documents, spreadsheets and meetings, use the <a href="#article/ai-for-documents-spreadsheets-meetings">AI Compass office-work guide</a> as the detailed companion.</p>'},
    {title:'Choose pilots with a value-risk matrix',id:'value-risk',html:'<p>Score candidate use cases on expected value and consequence of error. Prefer repeated tasks that are easy to compare with the current method, based on approved information, reviewable before publication or action, and reversible when something goes wrong.</p><p>NIST\'s Generative AI Profile treats adoption as an ongoing risk-management process rather than assuming a capable model is automatically a safe workflow.</p>'},
    {title:'Set a simple information boundary',id:'information-boundary',html:'<p>Before the first pilot, define which information staff may use in each approved AI service. Base the rule on the service terms, account configuration, privacy duties and customer commitments. Public, internal, confidential and restricted information should not all be treated the same way.</p><p>Collect only the information the task actually needs, and use higher scrutiny for consequential or sensitive workflows.</p>'},
    {title:'Run a two-week measurable pilot',id:'pilot',html:'<ol class="steps"><li>Choose one repeated job and record current time and quality issues.</li><li>Test three to ten representative examples, including a difficult case.</li><li>Keep AI output as a draft during the pilot.</li><li>Measure total time including prompting, corrections and review.</li><li>Record material errors, unsupported claims and escalations.</li><li>Keep, change or stop the workflow based on evidence.</li></ol><p>Use the <a href="#article/evaluate-ai-output-scorecard">AI Compass output scorecard</a> for a consistent review.</p>'},
    {title:'Standardise only after it works',id:'standardise',html:'<p>Turn a successful pilot into a small operating procedure: approved inputs, a maintained prompt or template, required review, escalation conditions and a named owner. The <a href="#article/reusable-prompt-template-library">reusable prompt template library</a> provides structures for recurring jobs.</p><div class="callout"><strong>Version the workflow:</strong> record the instruction version, tool or model, test date and representative examples that must continue to pass.</div>'},
    {title:'Automate in layers',id:'automation',html:'<p>Do not jump from a successful chat to a fully autonomous agent. First standardise the manual AI-assisted workflow. Automate predictable steps next, then add model judgement only where rules are insufficient. Put approval gates before consequential changes or outbound messages.</p><p>The <a href="#article/automation-workflow-or-agent">automation, workflow or agent guide</a> explains the architecture choice.</p>'},
    {title:'A 30-day adoption plan',id:'thirty-days',html:'<div class="table-wrap"><table><thead><tr><th>Week</th><th>Goal</th></tr></thead><tbody><tr><td>1</td><td>List repeated jobs, set information rules and select one pilot.</td></tr><tr><td>2</td><td>Run the pilot with human review and measure total effort.</td></tr><tr><td>3</td><td>Standardise the winning workflow and its review rule.</td></tr><tr><td>4</td><td>Train the team, review failures and choose the next pilot.</td></tr></tbody></table></div><p>AI adoption is not the goal by itself; the goal is a better business process with acceptable risk and measurable value. For team-wide controls, continue with the <a href="#article/ai-governance-starter-kit">AI governance starter kit</a>.</p>'}
  ],
  sources:[
    {title:'OpenAI — Identifying and scaling AI use cases',url:'https://openai.com/business/guides-and-resources/identifying-and-scaling-ai-use-cases/',publisher:'OpenAI'},
    {title:'OpenAI — Think Bigger: How Small Teams Win with ChatGPT',url:'https://openai.com/business/guides-and-resources/chatgpt-business-smb-guide/',publisher:'OpenAI'},
    {title:'NIST — Generative AI Profile',url:'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence',publisher:'NIST'},
    {title:'OECD.AI — AI Principles overview',url:'https://oecd.ai/en/principles',publisher:'OECD'},
    {title:'Microsoft — Microsoft 365 Copilot Business FAQ',url:'https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-business-faq',publisher:'Microsoft'}
  ],
  updated:'8 August 2026'
};
if(!D.articles.some(article=>article.slug===item.slug))D.articles.push(item);
})();
