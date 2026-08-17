(()=>{
'use strict';
const ready=window.AI_COMPASS_CONTENT_READY||Promise.reject(new Error('Structured content loader did not start'));

window.AI_COMPASS_CONTENT_READY=ready.then(maintained=>{
  const discovery=maintained.discovery;
  const curriculum=maintained.curriculum;
  const news=maintained.newsIntelligence;
  if(!discovery||!curriculum||!news)throw new Error('Structured maintained content is incomplete');

  const reviewedDiscovery=items=>(items||[]).map(item=>({...item,reviewed:item.verified||item.reviewed||discovery.reviewed}));
  window.AI_COMPASS_DISCOVERY={
    ...discovery,
    tools:reviewedDiscovery(discovery.tools),
    models:reviewedDiscovery(discovery.models),
    courses:reviewedDiscovery(discovery.courses),
    resources:reviewedDiscovery(discovery.resources)
  };

  const library=window.AI_COMPASS_LIBRARY;
  if(!library||!Array.isArray(library.learningPaths))throw new Error('Learning library is unavailable when structured curriculum loads');
  const powerUserPath=curriculum.powerUserPath;
  if(!library.learningPaths.some(item=>item.id===powerUserPath.id)){
    const builderIndex=library.learningPaths.findIndex(item=>item.id==='build-agents');
    library.learningPaths.splice(builderIndex>=0?builderIndex:library.learningPaths.length,0,{...powerUserPath});
  }
  const {powerUserPath:ignoredPowerUserPath,...curriculumMeta}=curriculum;
  window.AI_COMPASS_CURRICULUM=curriculumMeta;

  const feed=window.AI_COMPASS_FEED||(window.AI_COMPASS_FEED=[]);
  const inferStatus=item=>{
    const text=`${item.title||''} ${item.dek||''} ${item.format||''}`.toLowerCase();
    if(/retir|stop working|sunset|deprecat/.test(text))return 'Retirement / migration';
    if(/limited|trusted partners|selected|pilot|preview|waitlist/.test(text))return 'Limited / preview';
    if(/rolling out|rollout|being updated/.test(text))return 'Rolling out';
    if(/available|launch|introduc|release/.test(text))return 'Available / announced';
    if(/research|paper|study|benchmark/.test(text))return 'Research';
    return 'Update';
  };
  const inferSignal=importance=>importance>=5?'Major':importance>=4?'High signal':importance>=3?'Worth knowing':'Context';
  const sourceQuality=item=>/official|help center|documentation|research paper|maintainer/i.test(`${item.sourceType||''}`)?'Primary source':'External reporting';
  for(const item of feed){
    const base=news.categoryDefaults[item.category]||{importance:2,why:'This is useful context, but its practical importance depends on whether it changes a capability, workflow, risk or decision you actually face.',audience:'Readers following the affected area',action:'Open the source, check the date and availability, and avoid changing a workflow based on the headline alone.'};
    const override=news.explicit[item.id]||{};
    item.intelligence={
      importance:override.importance||base.importance,
      signal:override.signal||inferSignal(override.importance||base.importance),
      status:override.status||inferStatus(item),
      sourceQuality:sourceQuality(item),
      why:override.why||base.why,
      audience:override.audience||base.audience,
      action:override.action||base.action,
      related:override.related||'',
      reviewed:item.verified||news.reviewed
    };
  }
  window.AI_COMPASS_NEWS_INTELLIGENCE={reviewed:news.reviewed,methodVersion:news.methodVersion,method:news.method};
  window.AI_COMPASS_STRUCTURED_CONTENT_STATUS={
    release:maintained.manifest.release,
    build:maintained.manifest.build,
    loadedCollections:maintained.manifest.sourceCollections.map(item=>item.id),
    loadedAt:new Date().toISOString()
  };
  return maintained;
});
})();
