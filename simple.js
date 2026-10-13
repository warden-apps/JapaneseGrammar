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
function hasSavedPractice(){var s=masteryState().session;return !!(s&&s.i<s.queue.length&&s.queue.slice(s.i).every(function(item){var e=trainingExercise(item.id);return e&&inStudyLevel(byId(e.gid),S.lv);}));}
function renderStudyHome(el){
  var resume=hasSavedPractice(), remainingCount=remaining(), complete=!remainingCount||S.q.fin;
  var done=Object.keys(dayLedger().done).length;
  var h='<div class="study-home"><div class="home-meta"><span class="simple-kicker">'+tx('YOUR DAILY GRAMMAR GARDEN','สวนไวยากรณ์ประจำวัน')+'</span><button class="pace-chip" data-open-settings>'+S.newPerDay+' '+tx('new / day','รูปใหม่ / วัน')+' ↗</button></div><div class="home-heading"><h1>'+tx(complete&&!resume?'You’re all set.':'Make it stick.',complete&&!resume?'พร้อมสำหรับรอบถัดไปแล้ว':'จำได้ ใช้เป็น')+'</h1><div class="study-sprout" aria-hidden="true">'+plantSVG(done?4:3,70)+'</div></div>';
  h+='<p class="study-intro">'+tx(complete&&!resume?'Today’s study is complete.':'One pattern at a time.',complete&&!resume?'เรียนครบแล้วสำหรับวันนี้':'เรียนทีละรูป')+'</p>';
  h+=learningRoute(-1);
  if(resume||!complete) h+='<button class="go primary-study" id="start" data-start-study>'+tx(resume?'Continue your saved session':S.q.i>0?'Continue study':'Start today’s study',resume?'ฝึกต่อจากที่บันทึกไว้':S.q.i>0?'เรียนต่อ':'เริ่มเรียนวันนี้')+' →</button>';
  else h+='<button class="go primary-study" data-browse-library>'+tx('Browse the library','เปิดคลังไวยากรณ์')+'</button>';
  if(done)h+='<p class="today-credit">'+done+' '+tx((done===1?'pattern':'patterns')+' practised today.','รูปที่ฝึกแล้ววันนี้')+'</p>';
  h+='</div>';
  el.innerHTML=h;
}
function startStudy(preferDaily){
  drillState().active=false;
  if(!preferDaily&&hasSavedPractice()){TRAIN_VIEW='session';showTraining();return;}
  TRAIN_VIEW='home';buildToday();
  if(!S.q.started){S.q.simpleFrom=S.q.i;S.q.simpleEnd=Math.min(S.q.q.length,S.q.i+SIMPLE_SESSION_SIZE);}
  S.q.started=true;save();activateSimplePane('p-today');renderToday();window.scrollTo(0,0);
}
renderToday=function(){
  buildToday();renderStudyLaunch();updBadge();
  var el=document.getElementById('today');
  if(S.q.started&&historyIndex(S.q)<S.q.i)return renderStudyHistory(el,'daily',S.q);
  if(!S.q.started||S.q.fin||!S.q.q.length)return renderStudyHome(el);
  if(S.q.i>=S.q.q.length){S.q.fin=true;S.q.started=false;markStudied();save();return renderStudyHome(el);}
  var nextCard=S.q.q[S.q.i];
  if(S.q.simpleEnd&&(S.q.i>=S.q.simpleEnd||(nextCard&&nextCard.m==='learn'&&S.q.i===S.q.simpleEnd-1&&S.q.i>(S.q.simpleFrom||0)))){
    el.innerHTML='<div class="session-rest"><div class="round-flower" aria-hidden="true">✿</div><div class="simple-kicker">'+tx('ROUND COMPLETE','จบรอบแล้ว')+'</div><h1>'+tx('A little more familiar.','คุ้นเคยขึ้นอีกนิดแล้ว')+'</h1><p>'+tx('Your progress is saved. Keep your rhythm, or take a break.','บันทึกให้แล้ว จะฝึกต่อหรือพักก่อนก็ได้')+'</p><button class="go primary-study" data-next-round>'+tx('Another short round','ต่ออีกรอบสั้น ๆ')+' →</button><button class="text-btn round-stop" data-rest-study>'+tx('Finish for now','พอแค่นี้ก่อน')+'</button></div>';return;
  }
  return stepView(el);
};
headBar=function(){
  var from=S.q.simpleFrom||0,end=S.q.simpleEnd||S.q.q.length;
  var item=S.q.q[S.q.i],learning=item&&(item.m==='learn'||dayLedger().learned[item.id]);
  return studyHeader('daily',S.q.i,tx('Today’s round','รอบเรียนวันนี้'))+'<div class="prog" role="progressbar" aria-label="'+tx('Round progress','ความคืบหน้าของรอบ')+'" aria-valuemin="0" aria-valuemax="'+Math.max(1,end-from)+'" aria-valuenow="'+Math.min(end-from,S.q.i-from)+'"><i style="width:'+Math.min(100,(S.q.i-from)/Math.max(1,end-from)*100)+'%"></i></div>'+(learning?learningRoute(item.m==='learn'?lessonStage():2):'');
};
function lessonStage(){return S.q&&(S.q.lessonStages||{})[S.q.i]===1?1:0;}
function learningRoute(active){
  return '<ol class="learning-route" aria-label="'+tx('Learning steps','ขั้นตอนการเรียน')+'">'+[['Meaning','ความหมาย'],['Example','ตัวอย่าง'],['Try it','ลองทำ']].map(function(label,i){return '<li class="learn-stop step-'+i+(i===active?' current':i<active?' complete':'')+'"'+(i===active?' aria-current="step"':'')+'><span class="learn-number" aria-hidden="true">'+(i<active?'✓':i+1)+'</span><span>'+tx(label[0],label[1])+'</span></li>';}).join('')+'</ol>';
}
function historyIndex(s){return Number.isInteger(s.backAt)&&s.backAt>=0&&s.backAt<s.i?s.backAt:s.i;}
function noteReferenceUse(id){
  // Reading a relevant answer is useful learning, but is not an unaided check.
  var changed=false,q=S.q,item=q&&q.q[q.i],sp=q&&(q.gen||{})[q.i];
  var question=sp&&sp.jlptId&&drillQuestion(sp.jlptId);
  var targets=question?questionTargets(question):item?[item.id]:[];
  if(item&&item.m==='quiz'&&(q.ans||{})[q.i]===undefined&&targets.indexOf(id)>=0){
    if(!q.assisted)q.assisted={};if(!q.assisted[q.i]){q.assisted[q.i]=true;changed=true;}
  }
  var s=masteryState().session,e=s&&s.queue[s.i]&&trainingExercise(s.queue[s.i].id);
  if(e&&e.gid===id&&!s.results[s.i]&&s.current&&!s.current.reference){s.current.reference=true;changed=true;}
  if(changed)save();
}
function moveDailyCard(from,to,card){
  // Reindex saved questions with their cards, including help flags and answers.
  var q=S.q,rows=q.q.map(function(c,i){return {card:c,old:i};});
  var row=from<0?{card:card,old:-1}:rows.splice(from,1)[0];rows.splice(to,0,row);
  ['gen','ans','rate','reveals','assisted','lessonStages'].forEach(function(key){var previous=q[key]||{},next={};rows.forEach(function(r,i){if(r.old>=0&&Object.prototype.hasOwnProperty.call(previous,r.old))next[i]=previous[r.old];});q[key]=next;});
  q.q=rows.map(function(r){return r.card;});delete q.backAt;
}
function studyHeader(scope,index,label){
  var pause=scope==='daily'?'id="quit"':scope==='drill'?'data-pause-drill':'data-view="home"';
  var canStepBack=scope==='daily'&&S.q&&historyIndex(S.q)===S.q.i&&S.q.q[S.q.i]&&S.q.q[S.q.i].m==='learn'&&lessonStage()>0;
  return '<div class="drill-hd study-controls"><button class="chip" data-study-back="'+scope+'"'+(!index&&!canStepBack?' disabled':'')+'>← '+tx('Back','ย้อนกลับ')+'</button><span class="cnt">'+label+'</span><button class="chip" '+pause+'>'+tx('Pause','พัก')+'</button></div>';
}
function historyNext(scope,s){
  return '<button class="go primary-study" data-study-forward="'+scope+'">'+tx(historyIndex(s)+1<s.i?'Next':'Return to current step',historyIndex(s)+1<s.i?'ถัดไป':'กลับไปขั้นที่กำลังทำ')+' →</button>';
}
function moveStudyHistory(scope,direction){
  var s=scope==='daily'?S.q:scope==='drill'?drillState().session:masteryState().session;
  if(scope==='daily'&&s&&historyIndex(s)===s.i&&s.q[s.i]&&s.q[s.i].m==='learn'&&lessonStage()>0&&direction<0){s.lessonStages[s.i]=0;save();renderToday();window.scrollTo(0,0);return;}
  if(!s||!s.i)return;
  var at=historyIndex(s)+direction;
  if(at>=s.i)delete s.backAt;else s.backAt=Math.max(0,at);
  save();if(scope==='training')renderTraining();else renderToday();window.scrollTo(0,0);
}
function renderStudyHistory(el,scope,s){
  // The history cursor never moves the live queue or records another attempt.
  var at=historyIndex(s),item=(scope==='daily'?s.q:s.queue)[at],g,sp,ex,result;
  var h=studyHeader(scope,at,tx('Earlier step ','ขั้นก่อนหน้า ')+(at+1))+'<p class="history-note">'+tx('Looking back · your current step is saved.','กำลังย้อนดู · บันทึกขั้นที่กำลังทำไว้แล้ว')+'</p>';
  if(scope==='daily'){
    g=byId(item.id);sp=s.gen[at];
    noteReferenceUse(g.id);
    if(item.m==='learn'||!sp)h+=lessonCard(g);
    else {
      h+=questionHTML(g,sp)+'<div class="opts">';
      (sp.opts||[]).forEach(function(o,n){h+='<button class="opt'+(o.ok?' right':n===s.ans[at]?' wrong':' dim')+'" disabled>'+esc(o.t)+'</button>';});
      h+='</div>';ex=sp.example||g.ex[sp.exIdx]||g.ex[0];
      h+=briefFeedback(g,sp,ex,!!(sp.opts[s.ans[at]]&&!sp.opts[s.ans[at]].ok));
    }
  }else{
    var e=trainingExercise(item.id);g=byId(e.gid);result=s.results[at];
    noteReferenceUse(g.id);
    h+='<p class="simple-prompt">'+tx(e.prompt_en,e.prompt_th)+'</p><div class="question-sentence" lang="ja">'+esc(e.ja)+'</div>';
    h+=briefFeedback(g,{why_en:e.why_en,why_th:e.why_th},{j:e.ja.replace('＿＿',e.answer),e:e.en,t:e.th},!!(result&&!result.correct));
  }
  el.innerHTML=h+historyNext(scope,s);if(scope==='daily')wireHead();
}
function selectPhrase(card,index){
  card.querySelectorAll('.phrase-tab').forEach(function(t){var on=+t.dataset.phraseIndex===index;t.classList.toggle('selected',on);t.setAttribute('aria-pressed',String(on));});
  card.querySelectorAll('.phrase-panel').forEach(function(p){p.hidden=+p.dataset.phrasePanel!==index;});
}
function coverPhrase(panel,covered){
  panel.querySelector('.phrase-japanese').hidden=covered;panel.querySelector('.phrase-memory').hidden=!covered;
  var reading=panel.querySelector('.sentence-reading');if(reading)reading.hidden=covered;
  var b=panel.querySelector('[data-cover-phrase]');b.setAttribute('aria-pressed',String(covered));b.textContent=simpleText(covered?'Show phrase':'Hide & say it',covered?'เปิดดูสำนวน':'ซ่อนแล้วลองพูด');
}

function cleanConnection(g){
  /* Keep symbolic optional particles; remove prose annotations from the quick
     view. The unmodified rule remains available under More details. */
  var conn=g.conn.replace(/Vます形[（(]ますを取る[）)]/g,'Vます語幹');
  conn=conn.replace(/[（(]([^）)]*)[）)]/g,function(full,text){return /^[にはでももとがを]?$/u.test(text)?full:'';});
  conn=connectionPlain(conn,S.lang==='th'?'th':'en');
  return conn.replace(/／/g,' / ').replace(/＋/g,' + ');
}
function sentenceReading(text,hint){
  if(hint&&hint.trim())return hint;
  if(typeof SENTENCE_READINGS!=='undefined'&&SENTENCE_READINGS[text])return SENTENCE_READINGS[text];
  if(typeof wordParts==='function')return String(text||'').split(/([\p{Script=Han}々〆ヶ\p{Script=Hiragana}\p{Script=Katakana}ー]+)/u).map(function(run){return wordParts(run).map(function(p){var w=p[1]&&WORD_HELP_DATA.words[p[1]];return /[\p{Script=Han}々]/u.test(p[0])&&w&&w.r?w.r:p[0];}).join('');}).join('');
  return text||'';
}
function readingDisclosure(text,hint,extraClass){
  var reading=sentenceReading(text,hint);
  return '<button type="button" class="chip reading-toggle sentence-reading '+(extraClass||'')+'" data-toggle-reading data-reading="'+esc(reading)+'" aria-pressed="false"><span class="reading-icon" aria-hidden="true">あ</span> '+tx('Reading','คำอ่าน')+'</button>';
}
function exampleCard(e,g,extras){
  var sentence=esc(e.j), parts=forms(g.p);
  var target=parts.find(function(p){return e.j.indexOf(p)>=0;});
  if(target) sentence=sentence.replace(esc(target),'<mark>'+esc(target)+'</mark>');
  var h='<div class="simple-example reading-scope"><div lang="ja" class="example-jp reading-target">'+sentence+'</div><p>'+tx(e.e,e.t)+'</p>';
  if(extras!==false)h+=readingDisclosure(e.j,e.k,'example-extras');
  return h+'</div>';
}
function lessonCard(g,options){
  options=options||{};var guide=lessonGuide(g), models=phraseModels(g),guided=Number.isInteger(options.stage),stage=options.stage;
  var h='<article class="lesson-card" data-lesson="'+g.id+'"><header class="lesson-title"><span class="tag '+g.lv+'">'+g.lv+'</span><h1 lang="ja">'+esc(g.p)+'</h1></header>';
  var cue=KANZEN_CUES[g.id]||(guide?[guide.cue_en,guide.cue_th]:null);
  h+='<section class="meaning-section" data-guide-panel="0"'+(guided&&stage!==0?' hidden':'')+'><p class="meaning-line">'+tx(guide?guide.meaning_en:g.se,guide?guide.meaning_th:g.st)+'</p>';
  if(cue)h+='<p class="use-cue">'+tx(cue[0],cue[1])+'</p>';
  h+='</section>';
  h+='<section class="phrase-section" data-guide-panel="1"'+(guided&&stage!==1?' hidden':'')+'><div class="phrase-tabs" role="group" aria-label="'+tx('Example phrases','สำนวนตัวอย่าง')+'">';
  models.forEach(function(m,i){h+='<button class="phrase-tab'+(!i?' selected':'')+'" data-phrase-index="'+i+'" aria-pressed="'+(!i)+'">'+tx(m.label_en||'Example '+(i+1),m.label_th||'ตัวอย่าง '+(i+1))+'</button>';});
  h+='</div><div class="phrase-panels">';models.forEach(function(m,i){h+=phrasePanel(g,m,i);});h+='</div></section>';
  return h+(guided?'':lessonReference(g))+'</article>';
}
function lessonReference(g){
  var guide=lessonGuide(g),h='<div class="lesson-reference">';
  var skill=KANZEN_SKILLS.find(function(s){return s.id===g.id;});
  if(skill)h+='<details class="optional-detail"><summary>'+tx('Related grammar','ไวยากรณ์ที่เกี่ยวข้อง')+'</summary>'+skill.links.map(function(id){var related=byId(id);return related?'<button class="coverage-link" data-detail="'+id+'">'+esc(related.p)+' ↗</button>':'';}).join('')+'</details>';
  if(guide&&guide.compare&&guide.compare.length){
    h+='<details class="optional-detail lesson-contrast"><summary>'+tx('How is it different from similar grammar?','ต่างจากไวยากรณ์ที่คล้ายกันอย่างไร?')+'</summary>';
    guide.compare.forEach(function(other){var target=byId(other.id);if(target)h+='<div class="distinction-row"><button data-detail="'+other.id+'" lang="ja">'+esc(target.p)+'</button><p>'+tx(other.en,other.th)+'</p></div>';});h+='</details>';
  }
  h+='<details class="optional-detail lesson-more"><summary>'+tx('Grammar notes & all forms','คำอธิบายและรูปเชื่อมทั้งหมด')+'</summary><div class="extra-notes"><p>'+tx(g.en,g.th)+'</p><p>'+tx(g.note_en,g.note_th)+'</p>'+(g.bookSkill?'':'<h3>'+tx('Connection reference','อ้างอิงวิธีเชื่อม')+'</h3><p>'+esc(g.conn)+'</p>');
  if(guide)guide.forms.forEach(function(row){h+='<div class="reference-form"><b>'+esc(row.form)+'</b><p>'+tx(row.en,row.th)+'</p><p lang="ja">'+esc(row.example)+'</p></div>';});
  if(S.lang==='both')h+='<details><summary>Thai explanation · คำอธิบายภาษาไทย</summary><p lang="th">'+esc(g.th)+'</p><p lang="th">'+esc(g.note_th)+'</p></details>';
  g.ex.slice(1).forEach(function(ex){h+=exampleCard(ex,g);});
  h+='</div></details></div>';return h;
}
miniConnection=function(g){
  var m=phraseModels(g)[0];return '<div class="simple-connection" lang="ja">'+esc(m.chunk||m.j)+'</div>';
};
function phraseModels(g){
  if(typeof PHRASE_MODELS!=='undefined'&&PHRASE_MODELS[g.id])return PHRASE_MODELS[g.id].concat((g.kanzenExtraExamples||[]).map(function(e,i){return Object.assign({label_en:g.id==='n2a09'?'In doing (Vる)':'Example '+(PHRASE_MODELS[g.id].length+i+1),label_th:g.id==='n2a09'?'ในการทำ (Vる)':'ตัวอย่าง '+(PHRASE_MODELS[g.id].length+i+1)},e);}));
  var guide=lessonGuide(g),examples=(guide?[guide.example]:[]).concat(g.ex),seen={};
  return examples.filter(function(e){if(seen[e.j])return false;seen[e.j]=1;return true;}).map(function(e,i){return Object.assign({label_en:'Example '+(i+1),label_th:'ตัวอย่าง '+(i+1)},e);});
}
function phrasePanel(g,m,i){
  return '<div class="phrase-panel reading-scope" data-phrase-panel="'+i+'"'+(i?' hidden':'')+'><div class="phrase-japanese">'+(m.chunk?'<p class="phrase-chunk" lang="ja">'+esc(m.chunk)+'</p>':'')+'<p class="phrase-sentence reading-target" lang="ja">'+esc(m.j)+'</p></div><p class="phrase-translation">'+tx(m.e,m.t)+'</p><div class="phrase-actions">'+readingDisclosure(m.j,m.k,'phrase-reading')+'<button class="chip" data-say-phrase="'+g.id+'" data-model="'+i+'">▷ '+tx('Listen','ฟัง')+'</button><button class="chip" data-cover-phrase aria-pressed="false">'+tx('Hide & say it','ซ่อนแล้วลองพูด')+'</button></div><p class="phrase-memory" hidden>'+tx('Say it, then reveal.','ลองพูด แล้วเปิดดู')+'</p></div>';
}
stepView=function(el){
  var item=S.q.q[S.q.i],g=item&&byId(item.id);
  if(!g||item.m!=='learn')return originalStepView(el);
  var stage=lessonStage(),cursor=S.q.i;
  el.innerHTML=headBar()+lessonCard(g,{stage:stage})+'<button class="go primary-study lesson-next" id="'+(stage===0?'lesson-next':'got')+'">'+(stage===0?tx('Next: example','ต่อไป: ตัวอย่าง'):tx('Next: try it','ต่อไป: ลองทำ'))+' →</button><details class="guided-extras"><summary>'+tx('Details','เพิ่มเติม')+'</summary>'+lessonReference(g)+'</details>';
  wireHead();S.seen[g.id]=1;save();
  if(stage===0){document.getElementById('lesson-next').onclick=function(){if(S.q.i!==cursor||lessonStage()!==0)return;if(!S.q.lessonStages)S.q.lessonStages={};S.q.lessonStages[S.q.i]=1;save();renderToday();window.scrollTo(0,0);};return;}
  document.getElementById('got').onclick=function(){
    if(S.q.i!==cursor||lessonStage()!==1)return;
    if(boxOf(g.id)===0){S.box[g.id]=1;S.last[g.id]=today();}
    dayLedger().learned[g.id]=1;
    /* Old saved queues may batch all lessons before the quizzes. Move this
       pattern's unanswered quiz beside its lesson; preserve answered history. */
    var at=S.q.i, next=S.q.q.findIndex(function(c,index){return index>at&&c.id===g.id&&c.m==='quiz'&&S.q.ans[index]===undefined;});
    if(next>at+1)moveDailyCard(next,at+1);
    if(S.q.simpleEnd===at+1)S.q.simpleEnd++;
    S.q.i++;save();renderToday();window.scrollTo(0,0);
  };
};
openDetail=function(id){
  var g=byId(id);if(!g)return;noteReferenceUse(id);openId=id;S.seen[id]=1;save();
  var group=groupForGrammar(id);
  document.getElementById('sbody').innerHTML='<div class="lesson-toolbar"><div class="language-switch" role="group" aria-label="Explanation language"><button data-study-language="en" lang="en">English</button><button data-study-language="th" lang="th">ไทย</button></div><button class="d-close d-close-top" aria-label="Close lesson">×</button></div>'+lessonCard(g)+
    (group?'<button class="text-btn" data-simple-compare="'+group.id+'">'+tx('Compare this family','เทียบรูปในกลุ่มเดียวกัน')+' →</button>':'')+
    '<button class="go primary-study" data-study-pattern="'+id+'">'+tx('Practise this pattern','ฝึกไวยากรณ์นี้')+'</button><button class="d-close">'+tx('Close','ปิด')+'</button>';
  var si=document.getElementById('sheetin');si.dataset.lv=g.lv;si.dataset.lang=S.lang;si.scrollTop=0;
  sheet.classList.add('on');document.body.style.overflow='hidden';
  syncLanguageButtons();
};
questionHTML=function(g,sp){
  var h='<div class="simple-kicker">'+tx(sp.kind==='recall'?'RECALL IT':'TRY IT',sp.kind==='recall'?'ลองนึกเอง':'ลองทำ')+'</div>';
  if(sp.kind==='recall'||sp.kind==='sense') return h+'<h1 class="recall-meaning">'+tx(g.se,g.st)+'</h1><p class="gentle">'+tx('Say a pattern and a short sentence. Then reveal the target.','ลองพูดไวยากรณ์และแต่งประโยคสั้น ๆ แล้วค่อยเปิดคำตอบ')+'</p>';
  if(sp.prompt_en)h+='<p class="simple-prompt">'+tx(sp.prompt_en,sp.prompt_th)+'</p>';
  h+='<div class="reading-scope question-reading"><div class="question-sentence reading-target" lang="ja">'+esc(sp.ct).replace('\u0001','<span class="blank">＿＿</span>')+'</div>'+readingDisclosure(sp.ct.replace('\u0001','＿＿'))+'</div>';
  return h;
};
function briefFeedback(g,sp,ex,wrong){
  var guide=lessonGuide(g),self=sp.kind==='recall',h='<div class="simple-feedback '+(wrong?'needs-review':'is-correct')+'"><h2>'+tx(self?'Compare with the model':wrong?'Here’s the difference':'That fits.',self?'เทียบกับตัวอย่าง':wrong?'ดูความต่างตรงนี้':'ใช่เลย')+'</h2>';
  if(self)h+='<p class="gentle">'+tx('Self-check: the app cannot judge your spoken sentence. A matching meaning alone does not prove the grammar fits.','ตรวจเอง: แอปตรวจประโยคที่คุณพูดไม่ได้ ความหมายคล้ายกันอย่างเดียวไม่ได้ยืนยันว่าใช้ไวยากรณ์ถูก')+'</p>';
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
  var count=groups.reduce(function(n,c){return n+c.items.length;},0);
  var h=libraryBack()+'<h1>'+tx('Book checklist','รายการจากหนังสือ')+'</h1><p>'+tx('Shin Kanzen Master N2 · grammar','Shin Kanzen Master N2 · ไวยากรณ์')+'</p>';
  h+='<div class="source-note kanzen-audit"><b>'+tx(count+' supplied checklist rows linked to lessons', 'เชื่อมรายการที่ส่งมาทั้ง '+count+' แถวกับบทเรียนแล้ว')+'</b><p>'+tx('Also included: 22 support lessons for the publisher’s later grammar, sentence and passage topics. N2 study includes the book’s N3-labelled foundations.','เพิ่มบทเรียนเสริม 22 บทตามหัวข้อทบทวนไวยากรณ์ การเรียงประโยค และไวยากรณ์ในข้อความที่สำนักพิมพ์ระบุ โหมด N2 รวมพื้นฐานในหนังสือที่แอปติดป้าย N3 ด้วย')+'</p><p class="verification-limit">'+tx('Full book verification is pending. The publisher advertises 211 forms, but its public contents do not expose the complete printed index or every explanation. App lesson counts are not textbook form counts.','ยังตรวจยืนยันครบทั้งเล่มไม่ได้ สำนักพิมพ์ระบุ 211 รูป แต่สารบัญสาธารณะไม่มีดัชนีฉบับพิมพ์ครบหรือคำอธิบายทุกจุด จำนวนบทเรียนในแอปไม่ใช่จำนวนรูปในหนังสือ')+'</p></div>';
  groups.forEach(function(c){
    var compare=simpleGroups().find(function(g){return (g.chapters||[]).indexOf(c.chapter)>=0;});
    h+='<details class="coverage-chapter"><summary>'+esc(c.chapter)+'. '+esc(c.title)+'</summary><div class="group-body">';
    if(compare)h+='<button class="compare-chapter" data-simple-compare="'+compare.id+'">'+tx('Explain the differences in this chapter','อธิบายความต่างในบทนี้')+' →</button>';
    var seen={};c.items.forEach(function(item){item.ids.forEach(function(id){if(seen[id])return;seen[id]=true;var g=byId(id),cue=KANZEN_CUES[id];h+='<button class="meaning-index-row" data-detail="'+id+'"><span lang="ja">'+esc(g.p)+'</span><span>'+tx(cue?cue[0]:g.se,cue?cue[1]:g.st)+'</span></button>';});});h+='</div></details>';
  });
  [['organize','Organize similar grammar · A–G','จัดระบบไวยากรณ์ที่คล้ายกัน · A–G'],['sentence','Build a sentence · 3 skills','เรียงประโยค · 3 ทักษะ'],['passage','Grammar across a passage · 12 skills','ไวยากรณ์ในข้อความ · 12 ทักษะ']].forEach(function(section){
    h+='<details class="coverage-skills"><summary>'+tx(section[1],section[2])+'</summary><div class="group-body">';
    KANZEN_SKILLS.filter(function(s){return s.section===section[0];}).forEach(function(s){h+='<button class="meaning-index-row" data-detail="'+s.id+'"><span>'+esc(s.label)+'. '+tx(s.title_en,s.title_th)+'</span><span>'+tx(KANZEN_CUES[s.id][0],KANZEN_CUES[s.id][1])+'</span></button>';});h+='</div></details>';
  });
  h+='<details class="optional-detail"><summary>'+tx('Sources & verification notes','แหล่งอ้างอิงและขอบเขตการตรวจสอบ')+'</summary><p>'+tx('Checked 11 October 2026 against the supplied checklist and publisher’s public contents (ISBN 9784883195657). Chapter 21 follows your list because that heading is absent from the publisher’s web contents. Original explanations and practice, not reproduced book pages. Full printed-index verification and external linguistic review remain outstanding.','ตรวจเมื่อ 11 ตุลาคม 2026 กับรายการที่ส่งมาและสารบัญสาธารณะของสำนักพิมพ์ (ISBN 9784883195657) บท 21 ตามรายการของคุณ เพราะหัวข้อนี้ไม่ปรากฏบนเว็บสำนักพิมพ์ คำอธิบายและแบบฝึกเขียนใหม่ ไม่ใช่หน้าหนังสือ ยังต้องตรวจดัชนีฉบับพิมพ์ครบและให้ผู้เชี่ยวชาญตรวจภาษา')+'</p><p><a href="'+esc(KANZEN_AUDIT.publisher)+'" target="_blank" rel="noopener noreferrer">'+tx('Publisher: book and contents','สำนักพิมพ์: หนังสือและสารบัญ')+'</a> · <a href="KANZEN-COVERAGE.md" target="_blank" rel="noopener">'+tx('Detailed coverage audit','รายละเอียดการตรวจความครอบคลุม')+'</a></p>';
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
  if(historyIndex(s)<s.i)return renderStudyHistory(el,'training',s);
  if(s.i>=s.queue.length){el.innerHTML='<div class="session-rest"><h1>'+tx('Practice complete.','ฝึกเสร็จแล้ว')+'</h1><p>'+tx('Your missed answers are saved for review.','บันทึกข้อที่พลาดไว้ให้ทบทวนแล้ว')+'</p><button class="go primary-study" data-finish="home">'+tx('Done for now','พอแค่นี้ก่อน')+'</button></div>';return;}
  originalTrainingSession(el);
  /* Keep the established session engine; replace its presentation with one
     prompt, an answer, and optional support. */
  var item=s.queue[s.i],e=trainingExercise(item.id),r=s.results[s.i];
  var prompt=el.querySelector('.training-prompt');if(prompt)prompt.innerHTML=tx(e.prompt_en,e.prompt_th);
  var head=el.querySelector('.drill-hd');if(head)head.outerHTML=studyHeader('training',s.i,(s.i+1)+' / '+s.queue.length);
  var next=el.querySelector('[data-next-training]');if(next)next.textContent=simpleText('Next →','ข้อต่อไป →');
  var feedback=el.querySelector('.training-feedback');
  if(r&&feedback){feedback.outerHTML=briefFeedback(byId(e.gid),{why_en:e.why_en,why_th:e.why_th},{j:e.ja.replace('＿＿',e.answer),k:'',e:e.en,t:e.th},!r.correct)+(r.assisted?'<p class="gentle">'+tx('Practised with help. Try again later without the explanation.','ฝึกโดยใช้ตัวช่วย ครั้งต่อไปลองตอบโดยไม่ดูคำอธิบาย')+'</p>':'');}
  var actions=el.querySelector('.training-actions');
  if(actions){if(r)actions.remove();else actions.innerHTML='<details class="optional-detail"><summary>'+tx('Need help?','ขอตัวช่วย')+'</summary><div class="help-choices">'+(!s.current.hint?'<button class="text-btn" data-help="hint">'+tx('Hint','คำใบ้')+'</button>':'')+(!s.current.choices?'<button class="text-btn" data-help="choices">'+tx('Show choices','ดูตัวเลือก')+'</button>':'')+'<button class="text-btn" data-help="reveal">'+tx('Show answer','ดูคำตอบ')+'</button></div></details>';}
};

function practiceOnePattern(id){
  if(!byId(id))return;
  closeSheet();
  drillState().active=false;
  if(MASTERY_EXERCISES.some(function(e){return e.gid===id;})){startTraining('mixed',null,id);return;}
  /* A reference entry without authored choices still supports one honest
     recall check through the established daily engine. */
  buildToday();var future=S.q.q.findIndex(function(c,i){return i>=S.q.i&&c.id===id;});
  if(future<0)moveDailyCard(-1,S.q.i,{id:id,m:'quiz'});
  else if(future>S.q.i)moveDailyCard(future,S.q.i);
  S.q.fin=false;S.q.started=false;startStudy(true);
}
var recordWithoutMethod=drawRecord;
drawRecord=function(){
  recordWithoutMethod();
  document.getElementById('study-method-title').textContent=simpleText('How study works','วิธีเรียนในแอป');
  document.getElementById('study-method-body').innerHTML='<ol><li>'+tx('Understand the meaning, use and example. Open Grammar notes when the connection is unclear.','เข้าใจความหมาย วิธีใช้ และตัวอย่าง เปิดคำอธิบายไวยากรณ์เมื่อยังไม่แน่ใจรูปเชื่อม')+'</li><li>'+tx('Try before checking. Read why the answer fits and why your choice did not. Help is welcome; it does not count as an unaided review.','ลองตอบก่อนดูเฉลย อ่านเหตุผลว่าทำไมข้อนี้จึงถูกหรือผิด ใช้ตัวช่วยได้ แต่ไม่นับเป็นการทบทวนที่จำได้เอง')+'</li><li>'+tx('Return on later days. Due reviews mix patterns; available questions rotate contexts. First-day and early extra practice do not move the review level up.','กลับมาทบทวนในวันถัดไป ข้อที่ถึงรอบจะสลับไวยากรณ์และบริบทตามโจทย์ที่มี การฝึกวันแรกหรือก่อนถึงรอบไม่เพิ่มระดับทบทวน')+'</li></ol><p>'+tx('Optional: make one sentence about your own life. Choices check recognition; the app cannot judge your speech or prove that you can use the grammar independently.','ถ้าอยากฝึกเพิ่ม ลองแต่งหนึ่งประโยคเกี่ยวกับชีวิตตัวเอง ตัวเลือกวัดการจำแนกคำตอบ แอปตรวจการพูดหรือยืนยันว่าใช้ไวยากรณ์เองได้ไม่ได้')+'</p><p class="gentle">'+tx('Spacing, retrieval, explicit explanation, feedback and mixed practice have research support. This app itself has not been tested in a learning trial. Its 1 / 3 / 7 / 21-day intervals and practice index are design defaults, not validated memory measurements.','งานวิจัยสนับสนุนการเว้นระยะทบทวน การนึกคำตอบ คำอธิบายที่ชัดเจน ผลตอบกลับ และการฝึกสลับรูปแบบ แต่ยังไม่มีการทดลองประสิทธิผลของแอปนี้ รอบ 1 / 3 / 7 / 21 วันและดัชนีการฝึกเป็นค่าที่กำหนด ไม่ใช่ค่าความจำที่ผ่านการตรวจสอบ')+'</p><a href="STUDY-METHOD.md" target="_blank" rel="noopener">'+tx('Research & limits','งานวิจัยและข้อจำกัด')+' ↗</a>';
};
function simpleInit(){
  document.documentElement.lang=S.lang==='th'?'th':'en';
  document.addEventListener('click',function(event){
    var b=event.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-toggle-reading')){toggleReading(b);return;}
    if(b.dataset.studyBack){moveStudyHistory(b.dataset.studyBack,-1);return;}
    if(b.dataset.studyForward){moveStudyHistory(b.dataset.studyForward,1);return;}
    if(b.hasAttribute('data-start-study')){startStudy();return;}
    if(b.hasAttribute('data-next-round')){S.q.simpleFrom=S.q.i;S.q.simpleEnd=Math.min(S.q.q.length,S.q.i+SIMPLE_SESSION_SIZE);save();renderToday();window.scrollTo(0,0);return;}
    if(b.hasAttribute('data-open-settings')){activateSimplePane('p-rec');drawRecord();document.getElementById('custom-new').focus();document.getElementById('custom-new-form').scrollIntoView({block:'center'});return;}
    if(b.hasAttribute('data-phrase-index')){selectPhrase(b.closest('.lesson-card'),+b.dataset.phraseIndex);return;}
    if(b.dataset.sayPhrase){var model=phraseModels(byId(b.dataset.sayPhrase))[+b.dataset.model];speak(model.j);return;}
    if(b.hasAttribute('data-cover-phrase')){var panel=b.closest('.phrase-panel');coverPhrase(panel,!panel.querySelector('.phrase-japanese').hidden);return;}
    if(b.hasAttribute('data-rest-study')){S.q.started=false;save();renderToday();return;}
    if(b.hasAttribute('data-browse-library')){activateSimplePane('p-list');drawList();window.scrollTo(0,0);return;}
    if(b.hasAttribute('data-all-comparisons')){TRAIN_GROUP=null;showLibrarySection('groups');return;}
    if(b.dataset.simpleCompare){if(openId)closeSheet();TRAIN_GROUP=b.dataset.simpleCompare;showLibrarySection('groups');return;}
    if(b.dataset.studyPattern){practiceOnePattern(b.dataset.studyPattern);return;}
  });
}
