/* One study path; structured lessons; reference tools stay in the library.
   The v4 storage key and old schedulers remain compatible with existing data. */
var SIMPLE_LIBRARY_VIEW='groups';
var SIMPLE_SESSION_SIZE=6;
var originalStepView=stepView;
var originalQuestionHTML=questionHTML;
var originalTrainingSession=renderTrainingSession;
function simpleText(en,th){return S.lang==='th'?(th||en):en;}
function tx(en,th){return esc(simpleText(en,th));}
function lessonGuide(g){return typeof LESSON_GUIDES!=='undefined'?LESSON_GUIDES[g.id]:null;}
function simpleGroups(){return typeof SIMPLE_COMPARISONS==='undefined'?[]:SIMPLE_COMPARISONS;}
function groupForGrammar(id){return simpleGroups().find(function(group){return group.members.some(function(m){return m.id===id;});});}
function activateSimplePane(pane,nav){
  document.querySelectorAll('.pane').forEach(function(p){p.classList.toggle('on',p.id===pane);});
  document.querySelectorAll('#nav button').forEach(function(b){b.classList.toggle('on',b.dataset.p===(nav||pane));});
}
function showLibrarySection(view){
  TRAIN_VIEW=view||'groups';SIMPLE_LIBRARY_VIEW=TRAIN_VIEW;
  activateSimplePane('p-train','p-list');renderTraining();window.scrollTo(0,0);
}
showTraining=function(){
  if(TRAIN_VIEW==='home'){activateSimplePane('p-today');renderToday();}
  else if(TRAIN_VIEW==='session'){activateSimplePane('p-train','p-today');renderTraining();}
  else showLibrarySection(TRAIN_VIEW);
  window.scrollTo(0,0);
};
renderStudyLaunch=function(){document.getElementById('study-launch').innerHTML='';};
function hasSavedPractice(){var s=masteryState().session;return !!(s&&s.i<s.queue.length);}
function renderStudyHome(el){
  var resume=hasSavedPractice(), remainingCount=remaining(), complete=!remainingCount||S.q.fin;
  var h='<div class="study-home"><div class="simple-kicker">'+tx('YOUR NEXT STEP','ขั้นต่อไปของคุณ')+'</div><h1>'+tx(complete&&!resume?'Enough for today.':'Daily study',complete&&!resume?'วันนี้พอแค่นี้ก่อน':'เรียนประจำวัน')+'</h1>';
  h+='<p class="study-intro">'+tx(complete&&!resume?'Your scheduled cards are done. Come back for your next review.':'Review what’s due, then learn one pattern at a time.',complete&&!resume?'ทบทวนตามรอบครบแล้ว กลับมาทบทวนรอบถัดไปได้เลย':'ทบทวนข้อที่ถึงรอบ แล้วเรียนไวยากรณ์ใหม่ทีละรูป')+'</p>';
  if(resume||!complete) h+='<button class="go primary-study" id="start" data-start-study>'+tx(resume?'Continue your saved session':S.q.i>0?'Continue study':'Start today’s study',resume?'ฝึกต่อจากที่บันทึกไว้':S.q.i>0?'เรียนต่อ':'เริ่มเรียนวันนี้')+' →</button><p class="session-size">'+tx('Up to 6 short steps. Pause whenever you need.','ไม่เกิน 6 ขั้นสั้น ๆ พักได้ทุกเมื่อ')+'</p>';
  else h+='<button class="go primary-study" data-browse-library>'+tx('Browse the library','เปิดคลังไวยากรณ์')+'</button>';
  h+='</div>';
  el.innerHTML=h;
}
function startStudy(){
  if(hasSavedPractice()){TRAIN_VIEW='session';showTraining();return;}
  TRAIN_VIEW='home';buildToday();
  if(!S.q.started){S.q.simpleFrom=S.q.i;S.q.simpleEnd=Math.min(S.q.q.length,S.q.i+SIMPLE_SESSION_SIZE);}
  S.q.started=true;save();activateSimplePane('p-today');renderToday();window.scrollTo(0,0);
}
renderToday=function(){
  buildToday();renderStudyLaunch();updBadge();
  var el=document.getElementById('today');
  if(hasSavedPractice()||!S.q.started||S.q.fin||!S.q.q.length)return renderStudyHome(el);
  if(S.q.i>=S.q.q.length){S.q.fin=true;S.q.started=false;markStudied();save();return renderStudyHome(el);}
  var nextCard=S.q.q[S.q.i];
  if(S.q.simpleEnd&&(S.q.i>=S.q.simpleEnd||(nextCard&&nextCard.m==='learn'&&S.q.i===S.q.simpleEnd-1&&S.q.i>(S.q.simpleFrom||0)))){
    el.innerHTML='<div class="session-rest"><div class="simple-kicker">'+tx('SESSION COMPLETE','จบรอบนี้แล้ว')+'</div><h1>'+tx('That’s a good stopping point.','พักตรงนี้ได้เลย')+'</h1><p>'+tx('Your progress is saved. The next session will pick up here.','บันทึกให้แล้ว รอบถัดไปจะต่อจากตรงนี้')+'</p><button class="go primary-study" data-rest-study>'+tx('Finish for now','พอแค่นี้ก่อน')+'</button></div>';return;
  }
  return stepView(el);
};
headBar=function(){
  var from=S.q.simpleFrom||0,end=S.q.simpleEnd||S.q.q.length;
  return '<div class="drill-hd"><span class="cnt">'+tx('Step ','ขั้นที่ ')+(S.q.i-from+1)+' / '+Math.max(1,end-from)+'</span><button class="chip" id="quit">'+tx('Pause','พัก')+'</button></div><div class="prog"><i style="width:'+Math.min(100,(S.q.i-from)/Math.max(1,end-from)*100)+'%"></i></div>';
};

function cleanConnection(g){
  /* Keep symbolic optional particles; remove prose annotations from the quick
     view. The unmodified rule remains available under More details. */
  var conn=g.conn.replace(/Vます形[（(]ますを取る[）)]/g,'Vます語幹');
  conn=conn.replace(/[（(]([^）)]*)[）)]/g,function(full,text){return /^[にはでももとがを]?$/u.test(text)?full:'';});
  conn=connectionPlain(conn,S.lang==='th'?'th':'en');
  return conn.replace(/／/g,' / ').replace(/＋/g,' + ');
}
/* Mark the grammar inside an example sentence. Split patterns (たとえ〜ても,
   〜ば〜ほど) match part by part, in order. The last part may be inflected
   (ところです, てしまいました, 決して…ません), the first may be voiced
   (読んでも), and common kana parts may be written in kanji (込めて, 言えば). */
var GRAMMAR_KANJI=[['こめ','込め'],['こむ','込む'],['ぬき','抜き'],['ぬく','抜く'],['あう','合う'],['あげ','上げ'],['つづけ','続け'],['おわ','終わ'],['かぎり','限り'],['いえば','言えば'],['いうと','言うと'],['いって','言って'],['ちがい','違い'],['違い','ちがい'],['過ぎ','すぎ'],['はじめ','始め']];
var GRAMMAR_A_TO_I={'か':'き','が':'ぎ','さ':'し','た':'ち','な':'に','ば':'び','ま':'み','ら':'り','わ':'い'};
var GRAMMAR_ONBIN={'う':['い','っ'],'く':['き','い'],'ぐ':['ぎ','い'],'す':['し'],'つ':['ち','っ'],'ぬ':['に','ん'],'ぶ':['び','ん'],'む':['み','ん'],'る':['り','っ']};
var KANJI_CHAR=/[一-鿿]/;
function grammarInflections(seg){
  var out=[seg];
  function add(s){if(s&&(s.length>=2||KANJI_CHAR.test(s)||seg.length<=2)&&out.indexOf(s)<0)out.push(s);}
  GRAMMAR_KANJI.forEach(function(pair){if(seg.indexOf(pair[0])>-1)add(seg.replace(pair[0],pair[1]));});
  out.slice().forEach(function(s){
    var at=s.indexOf('です');if(at>1)add(s.slice(0,at));
    if(/ではない/.test(s)){add(s.replace('ではない','ではありません'));add(s.replace('ではない','じゃない'));}
    if(/ない$/.test(s)){
      var base=s.slice(0,-2),last=base.slice(-1);
      add(base);add(base+'なかっ');add(base+'ず');
      add((GRAMMAR_A_TO_I[last]?base.slice(0,-1)+GRAMMAR_A_TO_I[last]:base)+'ません');
    }
    if(/いい$/.test(s))add(s.slice(0,-2));
    if(/だ$/.test(s))add(s.slice(0,-1));
    if(/ている$/.test(s))add(s.slice(0,-2));
    if(/する$/.test(s)){add(s.slice(0,-2)+'し');add(s.slice(0,-2)+'す');add(s.slice(0,-2)+'さ');}
    if(/くる$/.test(s)){add(s.slice(0,-2)+'き');add(s.slice(0,-2)+'こ');}
    var end=s.slice(-1);
    if(GRAMMAR_ONBIN[end]&&s.length>1){add(s.slice(0,-1));GRAMMAR_ONBIN[end].forEach(function(k){add(s.slice(0,-1)+k);});}
    if(/い$/.test(s))add(s.slice(0,-1));
    if(/て$/.test(s)&&s.length>=3)add(s.slice(0,-1));
    if(/に$/.test(s)&&s.length>=4)add(s.slice(0,-1));
  });
  return out;
}
function grammarCandidates(p){
  var alts=[],out=[],seen={};
  String(p).split(/\s*[／\/]\s*/).forEach(function(part){
    alts.push(part.replace(/[（(][^）)]*[）)]/g,''));
    alts.push(part.replace(/[（(]([ぁ-ん]{1,4})[）)]/g,'$1').replace(/[（(][^）)]*[）)]/g,''));
    (part.match(/[（(][^）)]*〜[^）)]*[）)]/g)||[]).forEach(function(inner){alts.push(inner.slice(1,-1));});
  });
  function push(segs){var key=segs.join('〜');if(segs.length&&!seen[key]){seen[key]=1;out.push(segs);}}
  alts.forEach(function(alt){
    var segs=alt.replace(/^[\s〜]+/,'').split('〜').map(function(s){return s.trim();}).filter(Boolean);
    if(!segs.length)return;
    var head=segs[0].charAt(0),rest=segs[0].slice(1),firsts=[segs[0]],voice={'て':'で','た':'だ'};
    if(voice[head])firsts.push(voice[head]+rest);
    if(head==='と'&&segs[0].length>=3)firsts.push('ど'+rest);
    if(/^[てた]/.test(segs[0])&&segs[0].length>=3)firsts.push(rest);
    if(/^[をにの]/.test(segs[0])&&segs[0].length>=4)firsts.push(rest);
    firsts.forEach(function(first){
      var mid=[first].concat(segs.slice(1,-1));
      if(segs.length===1)grammarInflections(first).forEach(function(f){push([f]);});
      else grammarInflections(segs[segs.length-1]).forEach(function(last){push(mid.concat([last]));});
    });
  });
  return out;
}
function grammarMatch(text,p){
  var best=null,core=Math.max.apply(null,String(p).split(/\s*[／\/]\s*/).map(function(alt){return alt.replace(/[（(][^）)]*[）)]/g,'').replace(/[〜\s]/g,'').length;}));
  grammarCandidates(p).forEach(function(segs){
    /* Try each start of the first part and keep the tightest complete match:
       in お名前をお書きください the お of お書き belongs to the pattern. */
    for(var start=text.indexOf(segs[0]);start>-1;start=text.indexOf(segs[0],start+1)){
      var spans=[[start,start+segs[0].length]],len=segs[0].length,at=spans[0][1],ok=true;
      for(var i=1;i<segs.length&&ok;i++){
        var found=text.indexOf(segs[i],at);
        if(found<0){ok=false;break;}
        spans.push([found,found+segs[i].length]);len+=segs[i].length;at=found+segs[i].length;
      }
      if(!ok)break;
      if(len<2&&core>1&&!KANJI_CHAR.test(text.slice(start,start+len)))return;
      var width=at-start;
      if(!best||len>best.len||(len===best.len&&width<best.width))best={len:len,width:width,spans:spans};
      if(segs.length===1)break;
    }
  });
  return best?best.spans:[];
}
function markGrammar(text,p){
  var h='',at=0;
  (p?grammarMatch(text,p):[]).forEach(function(span){h+=esc(text.slice(at,span[0]))+'<mark>'+esc(text.slice(span[0],span[1]))+'</mark>';at=span[1];});
  return h+esc(text.slice(at));
}
function exampleCard(e,g,extras){
  var sentence=markGrammar(e.j,g.p);
  var h='<div class="simple-example"><div lang="ja" class="example-jp">'+sentence+'</div><p>'+tx(e.e,e.t)+'</p>';
  if(extras!==false) h+='<details class="optional-detail example-extras"><summary>'+tx(S.lang==='both'?'Reading & Thai':'Reading','คำอ่าน')+'</summary><p lang="ja">'+esc(e.k||'')+'</p>'+(S.lang==='both'?'<p lang="th">'+esc(e.t)+'</p>':'')+'</details>';
  return h+'</div>';
}
/* Two memory aids from the lesson data: a picture of how the pattern is
   built, and the same idea in easier Japanese. */
function lessonHooks(g){
  var h='';
  if(g.lit_en)h+='<div class="lesson-hook hook-picture"><b>'+tx('Remember it','จำง่าย ๆ')+'</b><p>'+tx(g.lit_en,g.lit_th)+'</p></div>';
  if(g.like)h+='<div class="lesson-hook hook-like"><b>'+tx('In easier Japanese','พูดง่าย ๆ ว่า')+'</b><p><span class="like-jp" lang="ja">≈ '+esc(g.like)+'</span><span class="like-note">'+tx(g.like_en,g.like_th)+'</span></p></div>';
  return h?'<div class="lesson-hooks">'+h+'</div>':'';
}
function lessonCard(g,options){
  options=options||{};var guide=lessonGuide(g), e=guide?guide.example:g.ex[0];
  var h='<article class="lesson-card" data-lesson="'+g.id+'"><header class="lesson-title"><span class="tag '+g.lv+'">'+g.lv+'</span><h1 lang="ja">'+esc(g.p)+'</h1></header>';
  h+='<section class="lesson-meaning"><h2>'+tx('Meaning','ความหมาย')+'</h2><p class="meaning-line">'+tx(guide?guide.meaning_en:g.se,guide?guide.meaning_th:g.st)+'</p>';
  h+='<p class="use-cue">'+(guide?tx(guide.cue_en,guide.cue_th):tx(g.en,g.th))+'</p>'+lessonHooks(g)+'</section>';
  h+='<section class="lesson-forms"><h2>'+tx('Build it','วิธีเชื่อม')+'</h2>';
  if(guide){h+='<div class="form-rows">';guide.forms.forEach(function(row){h+='<div class="form-row"><div class="form-code" lang="ja">'+esc(row.form)+'</div><div class="form-meaning">'+tx(row.en,row.th)+'</div>'+(row.example?'<div class="form-model" lang="ja">'+esc(row.example)+'</div>':'')+'</div>';});h+='</div>';}
  else h+='<div class="form-rows"><div class="form-row fallback-rule"><div class="form-code">'+esc(cleanConnection(g))+'</div></div></div>';
  h+='</section><section class="lesson-example"><h2>'+tx('Example','ตัวอย่าง')+'</h2>'+exampleCard(e,g)+'</section>';
  if(guide&&guide.compare&&guide.compare.length){
    h+=options.compact?'<details class="optional-detail lesson-contrast"><summary>'+tx('Compare similar grammar','เทียบกับไวยากรณ์ที่คล้ายกัน')+'</summary>':'<section class="lesson-contrast"><h2>'+tx('Tell it apart','แยกให้ออก')+'</h2>';
    guide.compare.forEach(function(other){var target=byId(other.id);if(target)h+='<div class="distinction-row"><button data-detail="'+other.id+'" lang="ja">'+esc(target.p)+'</button><p>'+tx(other.en,other.th)+'</p></div>';});h+=options.compact?'</details>':'</section>';
  }
  /* The traps: the guide's own warning when there is one, otherwise the usage notes. */
  var watchEn=guide&&guide.watch_en?guide.watch_en:g.note_en,watchTh=guide&&guide.watch_en?guide.watch_th:g.note_th;
  if(watchEn)h+='<p class="watch-line"><b>'+tx('Watch out: ','ระวัง: ')+'</b>'+tx(watchEn,watchTh)+'</p>';
  h+='<details class="optional-detail lesson-more"><summary>'+tx('More examples & the full rule','ตัวอย่างเพิ่มเติมและกฎฉบับเต็ม')+'</summary><div class="extra-notes">';
  if(g.ex.length>1){h+='<h3>'+tx('More examples','ตัวอย่างเพิ่มเติม')+'</h3>';g.ex.forEach(function(ex){if(ex!==e)h+=exampleCard(ex,g);});}
  if(guide)h+='<h3>'+tx('Meaning & usage','ความหมายและวิธีใช้')+'</h3><p>'+tx(g.en,g.th)+'</p><p>'+tx(g.note_en,g.note_th)+'</p>';
  h+='<h3>'+tx('Full connection rule','วิธีเชื่อมฉบับเต็ม')+'</h3><p lang="ja">'+esc(g.conn)+'</p>';
  if(S.lang==='both')h+='<details><summary>Thai explanation · คำอธิบายภาษาไทย</summary><p lang="th">'+esc(g.th)+'</p><p lang="th">'+esc(g.note_th)+'</p>'+(g.lit_th?'<p lang="th">'+esc(g.lit_th)+'</p>':'')+'</details>';
  h+='</div></details></article>';return h;
}
miniConnection=function(g){
  var guide=lessonGuide(g);
  if(!guide)return '<div class="simple-connection">'+esc(cleanConnection(g))+'</div>';
  return '<div class="form-rows">'+guide.forms.map(function(f){return '<div class="form-row"><div class="form-code">'+esc(f.form)+'</div><div>'+tx(f.en,f.th)+'</div></div>';}).join('')+'</div>';
};
stepView=function(el){
  var item=S.q.q[S.q.i],g=item&&byId(item.id);
  if(!g||item.m!=='learn')return originalStepView(el);
  el.innerHTML=headBar()+lessonCard(g,{compact:true})+'<button class="go primary-study" id="got">'+tx('Try it now','ลองทำเลย')+' →</button>';
  wireHead();S.seen[g.id]=1;save();
  document.getElementById('got').onclick=function(){
    if(boxOf(g.id)===0){S.box[g.id]=1;S.last[g.id]=today();}
    dayLedger().learned[g.id]=1;
    /* Old saved queues may batch all lessons before the quizzes. Move this
       pattern's unanswered quiz beside its lesson; preserve answered history. */
    var at=S.q.i, next=S.q.q.findIndex(function(c,index){return index>at&&c.id===g.id&&c.m==='quiz'&&S.q.ans[index]===undefined;});
    if(next>at+1){var card=S.q.q.splice(next,1)[0];S.q.q.splice(at+1,0,card);['gen','ans','rate','reveals'].forEach(function(key){var map=S.q[key]||{};Object.keys(map).forEach(function(k){if(+k>at)delete map[k];});});}
    if(S.q.simpleEnd===at+1)S.q.simpleEnd++;
    S.q.i++;save();renderToday();window.scrollTo(0,0);
  };
};
openDetail=function(id){
  var g=byId(id);if(!g)return;openId=id;S.seen[id]=1;save();
  var group=groupForGrammar(id);
  document.getElementById('sbody').innerHTML='<button class="d-close d-close-top" aria-label="Close lesson">×</button>'+lessonCard(g)+
    (group?'<button class="text-btn" data-simple-compare="'+group.id+'">'+tx('Compare this family','เทียบรูปในกลุ่มเดียวกัน')+' →</button>':'')+
    '<button class="go primary-study" data-study-pattern="'+id+'">'+tx('Practise this pattern','ฝึกไวยากรณ์นี้')+'</button><button class="d-close">'+tx('Close','ปิด')+'</button>';
  var si=document.getElementById('sheetin');si.dataset.lv=g.lv;si.dataset.lang=S.lang;si.scrollTop=0;
  sheet.classList.add('on');document.body.style.overflow='hidden';
};
questionHTML=function(g,sp){
  var h='<div class="simple-kicker">'+tx(sp.kind==='recall'?'RECALL IT':'TRY IT',sp.kind==='recall'?'ลองนึกเอง':'ลองทำ')+'</div>';
  if(sp.kind==='recall'||sp.kind==='sense') return h+'<h1 class="recall-meaning">'+tx(g.se,g.st)+'</h1><p class="gentle">'+tx('Say a pattern and a short sentence. Then reveal the target.','ลองพูดไวยากรณ์และแต่งประโยคสั้น ๆ แล้วค่อยเปิดคำตอบ')+'</p>';
  if(sp.prompt_en)h+='<p class="simple-prompt">'+tx(sp.prompt_en,sp.prompt_th)+'</p>';
  h+='<div class="question-sentence" lang="ja">'+esc(sp.ct).replace('\u0001','<span class="blank">＿＿</span>')+'</div>';
  return h;
};
function briefFeedback(g,sp,ex,wrong){
  var guide=lessonGuide(g),h='<div class="simple-feedback '+(wrong?'needs-review':'is-correct')+'"><h2>'+tx(wrong?'Here’s the difference':'That fits.',wrong?'ดูความต่างตรงนี้':'ใช่เลย')+'</h2>';
  h+=exampleCard(ex,g);
  if(guide)h+='<div class="feedback-point"><b>'+tx('Key idea','หลักสำคัญ')+'</b><p>'+tx(guide.cue_en,guide.cue_th)+'</p></div>';
  if(sp.why_en)h+='<details class="optional-detail"'+(wrong?' open':'')+'><summary>'+tx('Why this answer?','ทำไมจึงตอบแบบนี้?')+'</summary><p>'+tx(sp.why_en,sp.why_th)+'</p></details>';
  h+='<button class="text-btn" data-detail="'+g.id+'">'+tx('See the short lesson','ดูบทเรียนสั้น')+'</button></div>';return h;
}
verdictHTML=function(g,ex,rated){
  var sp=S.q.gen[S.q.i]||{}, pick=S.q.ans[S.q.i], wrong=pick!==undefined&&sp.opts&&!sp.opts[pick].ok;
  return briefFeedback(g,sp,ex,wrong)+'<button class="go primary-study" data-r="'+(wrong?'again':'good')+'">'+tx('Continue','ต่อไป')+' →</button>';
};
exBlock=function(e,style){return '<div'+(style?' style="'+esc(style)+'"':'')+'>'+exampleCard(e,{p:''})+'</div>';};

function libraryBack(){return '<button class="chip library-back" data-browse-library>← '+tx('Library','คลังไวยากรณ์')+'</button>';}
function simpleComparison(group){
  var h='<section class="simple-comparison" data-comparison="'+group.id+'"><h1>'+tx(group.title_en,group.title_th)+'</h1><p class="comparison-decision">'+tx(group.decision_en,group.decision_th)+'</p><div class="comparison-table"><div class="comparison-header"><span>'+tx('Pattern','ไวยากรณ์')+'</span><span>'+tx('Means','ความหมาย')+'</span><span>'+tx('Choose it when…','ใช้เมื่อ…')+'</span></div>';
  group.members.forEach(function(m){h+='<div class="comparison-entry"><div class="comparison-line"><button class="comparison-pattern" data-detail="'+m.id+'" lang="ja">'+esc(m.label)+'</button><div class="comparison-meaning">'+tx(m.meaning_en,m.meaning_th)+'</div><div class="comparison-use">'+tx(m.use_en,m.use_th)+'</div></div><details class="optional-detail"><summary>'+tx('Show example','ดูตัวอย่าง')+'</summary>'+exampleCard(m.example,{p:m.label})+'</details></div>';});
  return h+'</div></section>';
}
renderTrainingGroups=function(el){
  var groups=simpleGroups(),selected=TRAIN_GROUP&&groups.find(function(g){return g.id===TRAIN_GROUP;});
  var h=libraryBack();
  if(selected){h+='<button class="chip" data-all-comparisons>'+tx('All comparisons','กลุ่มเปรียบเทียบทั้งหมด')+'</button>'+simpleComparison(selected);}
  else {h+='<h1>'+tx('Same translation. Different use.','แปลคล้ายกัน ใช้ต่างกัน')+'</h1><p class="gentle">'+tx('Choose the meaning you keep mixing up.','เลือกกลุ่มความหมายที่ยังสับสน')+'</p><div class="comparison-index">';groups.forEach(function(group){h+='<button data-simple-compare="'+group.id+'"><b>'+tx(group.title_en,group.title_th)+'</b><span>'+group.members.map(function(m){return esc(m.label);}).join(' · ')+'</span></button>';});h+='</div>';}
  el.innerHTML=h;
};
var originalRenderFormGuide=renderFormGuide;
renderFormGuide=function(el){originalRenderFormGuide(el);var button=el.querySelector('[data-train]');if(button)button.remove();};
trainingBack=libraryBack;
var originalRenderCoverage=renderCoverage;
renderCoverage=function(el){
  var groups=typeof COVERAGE==='undefined'?[]:COVERAGE;
  var h=libraryBack()+'<h1>'+tx('Book checklist','รายการจากหนังสือ')+'</h1><p class="gentle">'+tx('A reference index. Use Compare for the differences between similar meanings.','หน้านี้เป็นดัชนีอ้างอิง ใช้หน้าเปรียบเทียบเพื่อดูความต่างของรูปที่แปลคล้ายกัน')+'</p>';
  groups.forEach(function(c){
    var compare=simpleGroups().find(function(g){return (g.chapters||[]).indexOf(c.chapter)>=0;});
    h+='<details class="coverage-chapter"><summary>'+esc(c.chapter)+'. '+esc(c.title)+'</summary><div class="group-body">';
    if(compare)h+='<button class="compare-chapter" data-simple-compare="'+compare.id+'">'+tx('Explain the differences in this chapter','อธิบายความต่างในบทนี้')+' →</button>';
    var seen={};c.items.forEach(function(item){item.ids.forEach(function(id){if(seen[id])return;seen[id]=true;var g=byId(id),guide=lessonGuide(g);h+='<button class="meaning-index-row" data-detail="'+id+'"><span lang="ja">'+esc(g.p)+'</span><span>'+tx(guide?guide.meaning_en:g.se,guide?guide.meaning_th:g.st)+'</span></button>';});});h+='</div></details>';
  });
  h+='<details class="optional-detail"><summary>'+tx('Sources & verification notes','แหล่งอ้างอิงและขอบเขตการตรวจสอบ')+'</summary><p>'+tx('Independent explanations. The supplied list broadly matches the publisher’s contents, but its translations required corrections. JLPT levels are study guidance.','คำอธิบายเขียนใหม่โดยอิสระ รายการที่ส่งมาสอดคล้องกับสารบัญของสำนักพิมพ์เป็นส่วนใหญ่ แต่ต้องแก้คำแปลหลายจุด ระดับ JLPT เป็นแนวทางเรียน')+'</p>';
  (typeof CONTENT_SOURCES==='undefined'?[]:CONTENT_SOURCES).forEach(function(source){h+='<p><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.title)+'</a></p>';});el.innerHTML=h+'</details>';
};
renderTraining=function(){
  var el=document.getElementById('training');if(!el)return;
  if(TRAIN_VIEW==='session'&&masteryState().session)return renderTrainingSession(el);
  if(TRAIN_VIEW==='groups')return renderTrainingGroups(el);
  if(TRAIN_VIEW==='forms')return renderFormGuide(el);
  if(TRAIN_VIEW==='coverage')return renderCoverage(el);
  if(TRAIN_VIEW==='mistakes')return renderMistakes(el);
  el.innerHTML='';
};
renderTrainingSession=function(el){
  var s=masteryState().session;
  if(s.i>=s.queue.length){el.innerHTML='<div class="session-rest"><h1>'+tx('Practice complete.','ฝึกเสร็จแล้ว')+'</h1><p>'+tx('Your missed answers are saved for review.','บันทึกข้อที่พลาดไว้ให้ทบทวนแล้ว')+'</p><button class="go primary-study" data-finish="home">'+tx('Done for now','พอแค่นี้ก่อน')+'</button></div>';return;}
  originalTrainingSession(el);
  /* Keep the established session engine; replace its presentation with one
     prompt, an answer, and optional support. */
  var item=s.queue[s.i],e=trainingExercise(item.id),r=s.results[s.i];
  var prompt=el.querySelector('.training-prompt');if(prompt)prompt.innerHTML=tx(e.prompt_en,e.prompt_th);
  var head=el.querySelector('.drill-hd');if(head)head.innerHTML='<button class="chip" data-view="home">'+tx('Pause','พัก')+'</button><span class="cnt">'+(s.i+1)+' / '+s.queue.length+'</span>';
  var feedback=el.querySelector('.training-feedback');
  if(r&&feedback){feedback.outerHTML=briefFeedback(byId(e.gid),{why_en:e.why_en,why_th:e.why_th},{j:e.ja.replace('＿＿',e.answer),k:'',e:e.en,t:e.th},!r.correct);}
  var actions=el.querySelector('.training-actions');
  if(actions){if(r)actions.remove();else actions.innerHTML='<details class="optional-detail"><summary>'+tx('Need help?','ขอตัวช่วย')+'</summary><div class="help-choices">'+(!s.current.hint?'<button class="text-btn" data-help="hint">'+tx('Hint','คำใบ้')+'</button>':'')+(!s.current.choices?'<button class="text-btn" data-help="choices">'+tx('Show choices','ดูตัวเลือก')+'</button>':'')+'<button class="text-btn" data-help="reveal">'+tx('Show answer','ดูคำตอบ')+'</button></div></details>';}
};

function practiceOnePattern(id){
  closeSheet();
  if(MASTERY_EXERCISES.some(function(e){return e.gid===id;})){startTraining('mixed',null,id);return;}
  /* A reference entry without authored choices still supports one honest
     recall check through the established daily engine. */
  buildToday();var future=S.q.q.findIndex(function(c,i){return i>=S.q.i&&c.id===id;});
  if(future<0){S.q.q.splice(S.q.i,0,{id:id,m:'quiz'});['gen','ans','rate','reveals'].forEach(function(k){var map=S.q[k]||{};Object.keys(map).forEach(function(n){if(+n>=S.q.i)delete map[n];});});}
  else if(future>S.q.i){var card=S.q.q.splice(future,1)[0];S.q.q.splice(S.q.i,0,card);['gen','ans','rate','reveals'].forEach(function(k){var map=S.q[k]||{};Object.keys(map).forEach(function(n){if(+n>=S.q.i)delete map[n];});});}
  S.q.fin=false;S.q.started=false;startStudy();
}
/* Static labels in index.html carry data-th (and data-en when the original is
   bilingual). English shows data-en or the original; "both" keeps the original. */
function localizeStatic(){
  document.querySelectorAll('[data-th]').forEach(function(el){
    if(el.getAttribute('data-both')===null)el.setAttribute('data-both',el.innerHTML);
    var en=el.getAttribute('data-en');
    if(S.lang==='th')el.textContent=el.getAttribute('data-th');
    else if(S.lang==='en'&&en!==null)el.textContent=en;
    else el.innerHTML=el.getAttribute('data-both');
  });
  document.querySelectorAll('[data-th-placeholder]').forEach(function(el){
    if(el.getAttribute('data-both-placeholder')===null)el.setAttribute('data-both-placeholder',el.getAttribute('placeholder')||'');
    el.setAttribute('placeholder',S.lang==='th'?el.getAttribute('data-th-placeholder'):el.getAttribute('data-both-placeholder'));
  });
}
var languageWithoutStatic=updateStudyLanguage;
updateStudyLanguage=function(){languageWithoutStatic();localizeStatic();};
function simpleInit(){
  localizeStatic();
  document.documentElement.lang=S.lang==='th'?'th':'en';
  var option=document.querySelector('#study-language option[value="both"]');if(option)option.textContent='English + Thai on tap';
  document.addEventListener('click',function(event){
    var b=event.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-start-study')){startStudy();return;}
    if(b.hasAttribute('data-rest-study')){S.q.started=false;save();renderToday();return;}
    if(b.hasAttribute('data-browse-library')){activateSimplePane('p-list');drawList();window.scrollTo(0,0);return;}
    if(b.hasAttribute('data-all-comparisons')){TRAIN_GROUP=null;showLibrarySection('groups');return;}
    if(b.dataset.simpleCompare){if(openId)closeSheet();TRAIN_GROUP=b.dataset.simpleCompare;showLibrarySection('groups');return;}
    if(b.dataset.studyPattern){practiceOnePattern(b.dataset.studyPattern);return;}
  });
}
