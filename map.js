/* Grammar map: the library arranged by meaning instead of by textbook label.
   Overview (five regions → twenty families) → one family as a tree
   (branches → patterns) → the usual lesson sheet. The same placement groups
   the list view, adds "On the grammar map" to every lesson and drives the
   Progress topic breakdown. Content lives in map-content.js. */
var MAP_STATE={family:null};
var MAP_G={},MAP_HOME={},MAP_SEE={},MAP_ORDER={},MAP_FAMILIES={},MAP_REGIONS={};
(function(){
  var n=0;
  GRAMMAR.forEach(function(g){MAP_G[g.id]=g;});
  GRAMMAR_MAP_REGIONS.forEach(function(r){MAP_REGIONS[r.id]=r;});
  GRAMMAR_MAP.forEach(function(f){
    MAP_FAMILIES[f.id]=f;
    f.branches.forEach(function(b){
      b.ids.forEach(function(id){MAP_HOME[id]={family:f,branch:b};MAP_ORDER[id]=n++;});
      (b.see||[]).forEach(function(id){(MAP_SEE[id]=MAP_SEE[id]||[]).push({family:f,branch:b});});
    });
  });
  /* Topic names are searchable too: "cause", "เหตุผล" or 原因 find the family. */
  GRAMMAR.forEach(function(g){
    var h=MAP_HOME[g.id];
    if(h&&SIDX[g.id]!==undefined)SIDX[g.id]+=(' '+[h.family.en,h.family.th,h.family.ja,h.branch.en,h.branch.th].join(' ')).toLowerCase();
  });
})();

function mapInPool(id){var g=MAP_G[id];return !!g&&(S.lv==='all'||g.lv===S.lv);}
function mapStarted(id){return boxOf(id)>0||(S.att[id]||0)>0;}
function mapFamilyIds(f){
  var out=[];f.branches.forEach(function(b){b.ids.forEach(function(id){if(mapInPool(id))out.push(id);});});return out;
}
function mapStats(ids){
  var s={total:ids.length,started:0,solid:0};
  ids.forEach(function(id){if(mapStarted(id))s.started++;if(boxOf(id)>=5)s.solid++;});return s;
}
function mapPct(n,d){return d?Math.round(n/d*100):0;}
function mapGlyph(f){return '<span class="gmap-glyph" lang="ja" aria-hidden="true">'+esc(f.glyph)+'</span>';}
function mapPath(f,b){return tx(f.en,f.th)+' › '+tx(b.en,b.th);}
function mapSide(regionId){
  for(var i=0;i<GRAMMAR_MAP_REGIONS.length;i++)if(GRAMMAR_MAP_REGIONS[i].id===regionId)return i%2?'right':'left';
  return 'left';
}

/* ---------- library: map or list ---------- */
/* Searching always shows the list; clearing the search returns to the saved view. */
function libraryMode(){return qbox.value.trim()?'list':(S.libView==='list'?'list':'map');}
var listWithoutMap=drawList;
drawList=function(){
  var mode=libraryMode(),map=document.getElementById('gmap'),list=document.getElementById('lib-list');
  if(map)map.hidden=mode!=='map';
  if(list)list.hidden=mode!=='list';
  document.querySelectorAll('#lib-switch [data-lib]').forEach(function(b){
    b.classList.toggle('on',b.dataset.lib===mode);b.setAttribute('aria-pressed',String(b.dataset.lib===mode));
  });
  if(mode==='map')renderGrammarMap();else drawLibraryList();
};
function mapRow(g){
  return '<button class="row '+masteryClass(boxOf(g.id))+' '+strClass(g.id)+'" data-id="'+g.id+'" data-lv="'+g.lv+'"><span class="row-bar"></span>'+
    '<span class="row-txt"><span class="row-p" lang="ja">'+esc(g.p)+'</span><span class="row-g">'+tx(g.se,g.st)+'</span></span>'+
    '<span class="row-lv">'+g.lv+'</span>'+strChip(g.id)+'</button>';
}
function drawLibraryList(){
  var term=qbox.value.trim().toLowerCase(),c=filterCounts();
  document.querySelectorAll('#filters button').forEach(function(x){
    x.classList.toggle('on',x.dataset.f===LISTF);
    if(!x.querySelector('.cnt'))x.insertAdjacentHTML('beforeend','<span class="cnt"></span>');
    x.querySelector('.cnt').textContent=c[x.dataset.f];
  });
  var items=pool().filter(passFilter).filter(function(g){return !term||SIDX[g.id].indexOf(term)>-1;});
  var byStrength=LISTF==='weak';
  items.sort(byStrength?function(a,b){return strength(a.id)-strength(b.id);}:function(a,b){return (MAP_ORDER[a.id]||0)-(MAP_ORDER[b.id]||0);});
  var box=document.getElementById('list');
  if(!items.length){
    box.innerHTML='<div class="empty">'+(byStrength?'苦手はまだありません<br>'+tx('Nothing below 60 yet — answer some questions first','ยังไม่มีข้อที่ต่ำกว่า 60 ลองตอบคำถามก่อน'):'該当なし<br>'+tx('No match','ไม่พบ'))+'</div>';
    return;
  }
  var groups=[],index={};
  items.forEach(function(g){
    var home=MAP_HOME[g.id],key=home?home.family.id:'';
    if(!index[key]){index[key]={family:home&&home.family,items:[]};groups.push(index[key]);}
    index[key].items.push(g);
  });
  var h='';
  groups.forEach(function(group){
    var f=group.family,branch=null;
    h+='<div class="grp"'+(f?' data-region="'+f.region+'"':'')+'><div class="grp-hd">'+(f?mapGlyph(f):'')+'<h2>'+(f?tx(f.en,f.th):'')+'</h2><div class="rule"></div><span class="n">'+group.items.length+'</span></div>';
    group.items.forEach(function(g){
      var home=MAP_HOME[g.id];
      if(!byStrength&&home&&home.branch!==branch){branch=home.branch;h+='<div class="grp-sub">'+tx(branch.en,branch.th)+'</div>';}
      h+=mapRow(g);
    });
    h+='</div>';
  });
  box.innerHTML=h;
}

/* ---------- the map ---------- */
function renderGrammarMap(){
  var el=document.getElementById('gmap');if(!el)return;
  var f=MAP_STATE.family&&MAP_FAMILIES[MAP_STATE.family];
  el.innerHTML=f?mapFamilyHTML(f):mapOverviewHTML();
  if(!f)mapScheduleWires();
}
function mapOverviewHTML(){
  var sides={left:'',right:''};
  GRAMMAR_MAP_REGIONS.forEach(function(r){
    var h='<section class="gmap-region" data-region="'+r.id+'"><h3 class="gmap-rname"><span lang="ja">'+esc(r.ja)+'</span> '+tx(r.en,r.th)+'</h3>';
    GRAMMAR_MAP.forEach(function(f){
      if(f.region!==r.id)return;
      var st=mapStats(mapFamilyIds(f));
      var label=tx(f.en,f.th)+'. '+tx(f.q_en,f.q_th)+' '+st.total+' '+tx('patterns','รูป')+', '+st.started+' '+tx('started','เริ่มแล้ว')+'.';
      h+='<button class="gmap-family'+(st.total?'':' is-empty')+'" data-map-family="'+f.id+'" aria-label="'+esc(label)+'">'+mapGlyph(f)+
        '<span class="gmap-ftext"><span class="gmap-fname">'+tx(f.en,f.th)+'</span><span class="gmap-fq">'+tx(f.q_en,f.q_th)+'</span></span>'+
        '<span class="gmap-fcount">'+st.total+'<span class="gmap-funit"> '+tx('patterns','รูป')+'</span></span><span class="gmap-fbar" aria-hidden="true"><i style="width:'+mapPct(st.started,st.total)+'%"></i></span></button>';
    });
    sides[mapSide(r.id)]+=h+'</section>';
  });
  return '<p class="gmap-lede">'+tx('Grammar grouped by what you want to say. Pick a topic to see every pattern in it and how they differ.','ไวยากรณ์จัดกลุ่มตามสิ่งที่อยากสื่อ เลือกหัวข้อเพื่อดูทุกรูปในกลุ่มและความต่างของแต่ละรูป')+'</p>'+
    '<div class="gmap-canvas" role="group" aria-label="'+esc(tx('Grammar map','แผนผังไวยากรณ์'))+'"><svg class="gmap-wires" aria-hidden="true" focusable="false"></svg>'+
    '<div class="gmap-side left">'+sides.left+'</div>'+
    '<div class="gmap-hub" aria-hidden="true"><span lang="ja">文法</span><small>'+pool().length+'</small></div>'+
    '<div class="gmap-side right">'+sides.right+'</div></div>'+
    '<p class="gmap-foot">'+tx('The line under each topic fills as you start its patterns. The level buttons at the top choose N3, N2 or both.','เส้นใต้แต่ละหัวข้อจะเต็มขึ้นเมื่อเริ่มเรียนรูปในหัวข้อนั้น ปุ่มระดับด้านบนใช้เลือก N3, N2 หรือทั้งสองระดับ')+'</p>';
}
function mapLeaf(id,crossLink){
  var g=MAP_G[id],home=MAP_HOME[id],band=bandIdx(strength(id));
  return '<li'+(crossLink?' class="fm-see"':'')+'><button class="fm-leaf" data-detail="'+id+'">'+
    '<span class="fm-dot s'+band+'" aria-hidden="true"></span>'+
    '<span class="fm-lp" lang="ja">'+esc(g.p)+'</span><span class="fm-lm">'+tx(g.se,g.st)+'</span>'+
    (crossLink?'<span class="fm-also">'+tx('Main entry: ','หัวข้อหลัก: ')+esc(home.family.glyph)+' '+mapPath(home.family,home.branch)+'</span>':'')+
    '<span class="fm-lv">'+g.lv+'<span class="sr-only">, '+esc(BANDS[band][2])+'</span></span></button></li>';
}
function mapFamilyHTML(f){
  var r=MAP_REGIONS[f.region],i=GRAMMAR_MAP.indexOf(f),n=GRAMMAR_MAP.length;
  var prev=GRAMMAR_MAP[(i+n-1)%n],next=GRAMMAR_MAP[(i+1)%n],st=mapStats(mapFamilyIds(f)),hidden=0;
  var h='<article class="fm" data-region="'+f.region+'">'+
    '<div class="fm-nav"><button class="chip" data-map-home>← '+tx('All topics','ทุกหัวข้อ')+'</button><span class="fm-step">'+
      '<button class="chip" data-map-family="'+prev.id+'" aria-label="'+esc(tx('Previous topic: ','หัวข้อก่อนหน้า: ')+tx(prev.en,prev.th))+'">‹ <span lang="ja">'+esc(prev.glyph)+'</span></button>'+
      '<span>'+(i+1)+' / '+n+'</span>'+
      '<button class="chip" data-map-family="'+next.id+'" aria-label="'+esc(tx('Next topic: ','หัวข้อถัดไป: ')+tx(next.en,next.th))+'"><span lang="ja">'+esc(next.glyph)+'</span> ›</button></span></div>'+
    '<header class="fm-head"><span class="fm-glyph" lang="ja" aria-hidden="true">'+esc(f.glyph)+'</span><div class="fm-title">'+
      '<p class="fm-region"><span lang="ja">'+esc(r.ja)+'</span> · '+tx(r.en,r.th)+'</p>'+
      '<h1 id="fm-title" tabindex="-1">'+tx(f.en,f.th)+' <span class="fm-ja" lang="ja">'+esc(f.ja)+'</span></h1>'+
      '<p class="fm-q">'+tx(f.q_en,f.q_th)+'</p>'+
      '<p class="fm-meta">'+st.total+' '+tx('patterns','รูป')+' · '+st.started+' '+tx('started','เริ่มแล้ว')+'</p></div></header>'+
    '<ol class="fm-tree">';
  f.branches.forEach(function(b){
    var own=b.ids.filter(mapInPool),see=(b.see||[]).filter(mapInPool);
    hidden+=b.ids.length-own.length;
    if(!own.length&&!see.length)return;
    h+='<li class="fm-branch" id="fm-'+f.id+'-'+b.id+'"><div class="fm-bnode"><h2>'+tx(b.en,b.th)+'</h2><span class="fm-bcount">'+own.length+'</span>'+
      (b.compare?'<button class="fm-compare" data-simple-compare="'+b.compare+'">'+tx('Compare side by side','เทียบทีละรูป')+' ↔</button>':'')+
      '</div><ul class="fm-leaves">';
    own.forEach(function(id){h+=mapLeaf(id,false);});
    see.forEach(function(id){h+=mapLeaf(id,true);});
    h+='</ul></li>';
  });
  h+='</ol>';
  if(!st.total)h+='<p class="empty">'+tx('No '+S.lv+' patterns in this topic.','หัวข้อนี้ไม่มีรูประดับ '+S.lv)+'</p>';
  if(hidden)h+='<p class="fm-levels">'+tx(hidden+' more '+(S.lv==='N2'?'N3':'N2')+' patterns belong here.','ยังมีรูประดับ '+(S.lv==='N2'?'N3':'N2')+' ในหัวข้อนี้อีก '+hidden+' รูป')+
    ' <button class="text-btn" data-map-levels>'+tx('Show N3 + N2','แสดง N3 + N2')+'</button></p>';
  h+='<p class="fm-legend"><span class="fm-dot s0" aria-hidden="true"></span>'+tx('not started','ยังไม่เริ่ม')+
    '<span class="fm-dots" aria-hidden="true"><span class="fm-dot s1"></span><span class="fm-dot s2"></span><span class="fm-dot s3"></span><span class="fm-dot s4"></span></span>'+tx('practised: shaky → solid','ฝึกแล้ว: ยังไม่แม่น → แม่นยำ')+'</p>';
  return h+'</article>';
}

/* ---------- moving around ---------- */
function mapScrollTo(el){
  if(!el||!el.getBoundingClientRect)return;
  var hdr=document.querySelector('.hdr'),offset=hdr&&hdr.getBoundingClientRect?hdr.getBoundingClientRect().height:0;
  window.scrollTo(0,Math.max(0,el.getBoundingClientRect().top+(window.scrollY||0)-offset-10));
}
/* Rendering never scrolls (a lesson closing redraws the map in place);
   only moving to another topic does. */
function openMapFamily(familyId,branchId){
  if(!MAP_FAMILIES[familyId])return;
  if(openId)closeSheet();
  MAP_STATE.family=familyId;
  if(qbox.value)qbox.value='';
  if(S.libView==='list'){S.libView='map';save();}
  activateSimplePane('p-list');
  drawList();
  var target=branchId&&document.getElementById('fm-'+familyId+'-'+branchId);
  if(target&&target.classList){target.classList.add('is-focus');mapScrollTo(target);return;}
  mapScrollTo(document.getElementById('gmap'));
  var title=document.getElementById('fm-title');
  if(title&&title.focus)title.focus({preventScroll:true});
}
function closeMapFamily(){
  var from=MAP_STATE.family;MAP_STATE.family=null;
  drawList();
  var button=document.querySelector('.gmap-family[data-map-family="'+from+'"]');
  if(button&&button.focus){mapScrollTo(button.closest('.gmap-region')||button);button.focus({preventScroll:true});}
}

/* ---------- wires between hub, regions and topics ---------- */
var _mapWireTimer=null,_mapObserver=null;
function mapScheduleWires(){
  if(typeof requestAnimationFrame==='function')requestAnimationFrame(drawMapWires);
  var canvas=document.querySelector('.gmap-canvas');
  if(canvas&&typeof ResizeObserver==='function'){
    if(_mapObserver)_mapObserver.disconnect();
    _mapObserver=new ResizeObserver(function(){drawMapWires();});
    _mapObserver.observe(canvas);
  }
}
function drawMapWires(){
  var canvas=document.querySelector('.gmap-canvas');
  if(!canvas||!canvas.getBoundingClientRect)return;
  var svg=canvas.querySelector('.gmap-wires'),hub=canvas.querySelector('.gmap-hub'),box=canvas.getBoundingClientRect();
  if(!svg||!hub||!box.width)return;
  var hb=hub.getBoundingClientRect(),hx=hb.left+hb.width/2-box.left,hy=hb.top+hb.height/2-box.top,paths='';
  function p(n){return Math.round(n*10)/10;}
  canvas.querySelectorAll('.gmap-region').forEach(function(region){
    var buttons=Array.prototype.slice.call(region.querySelectorAll('.gmap-family'));if(!buttons.length)return;
    var left=region.parentNode.classList.contains('left'),rid=region.getAttribute('data-region');
    var rects=buttons.map(function(b){return b.getBoundingClientRect();});
    var edge=left?Math.max.apply(null,rects.map(function(r){return r.right;}))-box.left:Math.min.apply(null,rects.map(function(r){return r.left;}))-box.left;
    var gap=left?(hb.left-box.left)-edge:edge-(hb.right-box.left),spine=edge+(left?1:-1)*Math.max(6,gap*0.45);
    var ys=rects.map(function(r){return r.top+r.height/2-box.top;}),ay=(ys[0]+ys[ys.length-1])/2,mid=(hx+spine)/2,rad=7;
    paths+='<path class="w-trunk r-'+rid+'" d="M'+p(hx)+' '+p(hy)+'C'+p(mid)+' '+p(hy)+' '+p(mid)+' '+p(ay)+' '+p(spine)+' '+p(ay)+'"/>';
    ys.forEach(function(y,i){
      var end=left?rects[i].right-box.left:rects[i].left-box.left,dir=left?-1:1,dy=y-ay;
      if(Math.abs(dy)<rad){paths+='<path class="w-twig r-'+rid+'" d="M'+p(spine)+' '+p(ay)+'L'+p(end)+' '+p(y)+'"/>';return;}
      var sy=dy>0?1:-1;
      paths+='<path class="w-twig r-'+rid+'" d="M'+p(spine)+' '+p(ay)+'V'+p(y-sy*rad)+'Q'+p(spine)+' '+p(y)+' '+p(spine+dir*rad)+' '+p(y)+'H'+p(end)+'"/>';
    });
  });
  svg.setAttribute('viewBox','0 0 '+p(box.width)+' '+p(box.height));
  svg.setAttribute('width',p(box.width));svg.setAttribute('height',p(box.height));
  svg.innerHTML=paths;
}

/* ---------- lessons: where this pattern lives ---------- */
function mapContextHTML(id){
  var home=MAP_HOME[id];if(!home)return '';
  var f=home.family,b=home.branch,near=b.ids.concat(b.see||[]).filter(function(x){return x!==id&&MAP_G[x];});
  var h='<section class="map-context" data-region="'+f.region+'"><h2>'+tx('On the grammar map','ตำแหน่งในแผนผังไวยากรณ์')+'</h2>'+
    '<button class="map-crumb" data-map-family="'+f.id+'" data-map-branch="'+b.id+'">'+mapGlyph(f)+'<span>'+mapPath(f,b)+'</span><span class="map-go" aria-hidden="true">→</span></button>';
  if(near.length){
    h+='<p class="map-near-label">'+tx('Nearby patterns — tap one to compare:','รูปใกล้เคียง แตะเพื่อเทียบ:')+'</p><div class="map-near">';
    near.forEach(function(x){var g=MAP_G[x];h+='<button class="map-sib" data-detail="'+x+'"><span lang="ja">'+esc(g.p)+'</span><small>'+tx(g.se,g.st)+' · '+g.lv+'</small></button>';});
    h+='</div>';
  }
  (MAP_SEE[id]||[]).forEach(function(place){
    h+='<p class="map-also">'+tx('A second meaning also appears under ','ความหมายที่สองอยู่ในหัวข้อ ')+'<button class="text-btn" data-map-family="'+place.family.id+'" data-map-branch="'+place.branch.id+'">'+esc(place.family.glyph)+' '+mapPath(place.family,place.branch)+'</button></p>';
  });
  return h+'</section>';
}
function mapCrumbLine(id){
  var home=MAP_HOME[id];if(!home)return '';
  return '<p class="map-crumb-line" data-region="'+home.family.region+'">'+mapGlyph(home.family)+'<span>'+mapPath(home.family,home.branch)+'</span></p>';
}
var lessonCardWithoutMap=lessonCard;
lessonCard=function(g,options){
  var h=lessonCardWithoutMap(g,options);
  if(!MAP_HOME[g.id])return h;
  if(options&&options.compact){var head=h.indexOf('</header>');return head<0?h:h.slice(0,head+9)+mapCrumbLine(g.id)+h.slice(head+9);}
  var end=h.lastIndexOf('</article>');
  return end<0?h+mapContextHTML(g.id):h.slice(0,end)+mapContextHTML(g.id)+h.slice(end);
};

/* ---------- progress: one row per family ---------- */
var recordWithoutMap=drawRecord;
drawRecord=function(){
  recordWithoutMap();
  var el=document.getElementById('brk');if(!el)return;
  var h='<p class="map-topics-key"><span class="map-key started"></span>'+tx('started','เริ่มแล้ว')+'<span class="map-key solid"></span>'+tx('review level 5','ทบทวนระดับ 5')+'</p>';
  GRAMMAR_MAP.forEach(function(f){
    var st=mapStats(mapFamilyIds(f));if(!st.total)return;
    h+='<button class="brk-row map-topic" data-region="'+f.region+'" data-map-family="'+f.id+'">'+mapGlyph(f)+'<span class="brk-nm">'+tx(f.en,f.th)+'</span>'+
      '<span class="brk-tr" aria-hidden="true"><i class="started" style="width:'+mapPct(st.started,st.total)+'%"></i><i class="solid" style="width:'+mapPct(st.solid,st.total)+'%"></i></span>'+
      '<span class="brk-n">'+st.started+'/'+st.total+'</span></button>';
  });
  el.innerHTML=h;
};

function mapInit(){
  /* The search box was bound to the original list renderer; route it through the library. */
  if(qbox.removeEventListener)qbox.removeEventListener('input',listWithoutMap);
  qbox.addEventListener('input',function(){drawList();});
  document.addEventListener('click',function(event){
    var b=event.target.closest('button');if(!b)return;
    if(b.dataset.lib){
      if(b.dataset.lib==='map'&&qbox.value)qbox.value='';
      if(S.libView!==b.dataset.lib){S.libView=b.dataset.lib;save();}
      drawList();return;
    }
    if(b.dataset.mapFamily){openMapFamily(b.dataset.mapFamily,b.dataset.mapBranch);return;}
    if(b.hasAttribute('data-map-home')){closeMapFamily();return;}
    if(b.hasAttribute('data-map-levels')){var all=document.querySelector('#lvpick [data-lv="all"]');if(all)all.click();return;}
  });
  window.addEventListener('resize',function(){clearTimeout(_mapWireTimer);_mapWireTimer=setTimeout(drawMapWires,120);});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(drawMapWires);
  drawList();
}
