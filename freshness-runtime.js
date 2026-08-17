(()=>{
'use strict';
const ready=window.AI_COMPASS_CONTENT_READY||Promise.reject(new Error('Structured content is not ready'));
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

window.AI_COMPASS_CONTENT_READY=ready.then(maintained=>{
  const policy=maintained.freshness;
  if(!policy?.classes||!policy?.collectionDefaults)throw new Error('Freshness policy is unavailable');

  const parseDate=value=>{
    if(!value)return null;
    const raw=String(value).trim();
    const iso=/^\d{4}-\d{2}-\d{2}$/.test(raw)?`${raw}T12:00:00Z`:raw;
    const date=new Date(iso);
    return Number.isNaN(date.getTime())?null:date;
  };
  const formatDate=value=>{
    const date=value instanceof Date?value:parseDate(value);
    if(!date)return'';
    try{return new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(date)}catch{return String(value||'')}
  };
  const reviewedValue=item=>item?.verified||item?.reviewed||item?.updated||item?.date||'';
  const classFor=(kind,id='')=>{
    if(kind==='guides'&&id&&policy.guideOverrides?.[id])return policy.guideOverrides[id];
    return policy.collectionDefaults[kind]||'durable';
  };
  const assess=(item,kind,id='',now=new Date())=>{
    const freshnessClass=classFor(kind,id);
    const rules=policy.classes[freshnessClass]||policy.classes.durable;
    const reviewed=reviewedValue(item);
    const reviewedDate=parseDate(reviewed);
    if(!reviewedDate)return{freshnessClass,status:'unknown',label:'Review date not recorded',reviewed:'',ageDays:null};
    const ageDays=Math.max(0,Math.floor((now.getTime()-reviewedDate.getTime())/86400000));
    let status='current',label='Current';
    if(freshnessClass==='news'){
      if(ageDays>rules.reviewEveryDays){status='archive';label='Archive';}
      else if(ageDays>rules.warnAfterDays){status='recent';label='Recent';}
    }else if(ageDays>rules.reviewEveryDays){status='stale';label='Needs review';}
    else if(ageDays>rules.warnAfterDays){status='warning';label='Review soon';}
    return{freshnessClass,status,label,reviewed,ageDays};
  };
  const metaText=(item,kind,id='')=>{
    const result=assess(item,kind,id);
    if(!result.reviewed)return result.label;
    const verb=kind==='news'?'checked':'reviewed';
    return `${result.label} · ${verb} ${formatDate(result.reviewed)}`;
  };
  const badge=(item,kind,id='')=>{
    const result=assess(item,kind,id);
    return `<span class="freshness-badge freshness-${esc(result.status)}" title="Freshness class: ${esc(result.freshnessClass)}"><strong>${esc(result.label)}</strong>${result.reviewed?`<small>${kind==='news'?'Checked':'Reviewed'} ${esc(formatDate(result.reviewed))}</small>`:''}</span>`;
  };
  const collectionBadge=(kind,reviewed)=>badge({reviewed},kind);
  window.AI_COMPASS_FRESHNESS={policy,assess,metaText,badge,collectionBadge,formatDate,classFor};
  return maintained;
});
})();
