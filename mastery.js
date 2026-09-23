/* Short, authored retrieval practice. No network, accounts or paid services. */
var TRAINING_VERSION=1;
var TRAIN_VIEW='home';
var TRAIN_GROUP=null;
var TRAIN_INTERVALS=[0,1,3,7,21];

function masteryState(){
  if(!S.mastery||typeof S.mastery!=='object') S.mastery={};
  if(!S.mastery.items) S.mastery.items={};
  if(!S.mastery.days) S.mastery.days={};
  return S.mastery;
}
function tr(en,th){
  return (showEN()?'<span>'+esc(en)+'</span>':'')+(showTH()?'<span lang="th" class="thai">'+esc(th)+'</span>':'');
}
function trainingExercise(id){return MASTERY_EXERCISES.find(function(e){return e.id===id;});}
function trainingEligible(){return MASTERY_EXERCISES.filter(function(e){var g=byId(e.gid);return g&&(S.lv==='all'||g.lv===S.lv);});}
function trainingDue(e){var r=masteryState().items[e.id];return !r||!r.due||r.due<=today();}
function trainingMistakes(){return trainingEligible().filter(function(e){return (masteryState().items[e.id]||{}).mistake;});}
function addStudyDays(date,n){var d=new Date(date+'T12:00:00');d.setDate(d.getDate()+n);return fmt(d);}
function normaliseAnswer(value){return String(value).normalize('NFKC').replace(/[\s。．.!！?？〜～]/g,'').trim();}

/* A same-day retry is useful practice, but never evidence of long-term recall. */
function recordTrainingAnswer(exercise,correct,assisted){
  var m=masteryState(), d=today(), r=m.items[exercise.id]||{attempts:0,correct:0,stage:0,mistake:false};
  r.attempts++;r.last=d;
  if(correct) r.correct++;
  if(!correct){r.stage=0;r.mistake=true;r.creditDay=d;r.due=d;}
  else if(assisted){r.due=d;r.creditDay=d;}
  else if(r.creditDay!==d&&(!r.due||r.due<=d)){
    r.stage=Math.min(4,r.stage+1);r.creditDay=d;r.mistake=false;r.due=addStudyDays(d,TRAIN_INTERVALS[r.stage]);
  }
  m.items[exercise.id]=r;
  m.days[d]=(m.days[d]||0)+1;
  /* Bound daily history, retain per-exercise learning evidence. */
  Object.keys(m.days).sort().slice(0,-400).forEach(function(day){delete m.days[day];});
  markStudied();save();return r;
}

function startTraining(mode,group,gid){
  var m=masteryState();
  if(m.session&&m.session.i<m.session.queue.length){TRAIN_VIEW='session';showTraining();return;}
  var candidates=gid?MASTERY_EXERCISES.slice():trainingEligible();
  if(group) candidates=candidates.filter(function(e){return e.group===group;});
  if(gid) candidates=candidates.filter(function(e){return e.gid===gid;});
  if(mode==='mistakes') candidates=candidates.filter(function(e){return (m.items[e.id]||{}).mistake;});
  if(mode==='form'||mode==='contrast') candidates=candidates.filter(function(e){return e.kind===mode;});
  if(!candidates.length){TRAIN_VIEW='home';showTraining();return;}
  shuffle(candidates);
  candidates.sort(function(a,b){
    function priority(e){var r=m.items[e.id];return r&&r.mistake?0:r&&trainingDue(e)?1:!r?2:3;}
    return priority(a)-priority(b);
  });
  /* Interleave skills in a mixed session, rather than drilling one meaning six times. */
  if(mode==='mixed'&&!group&&!gid){
    var first=[];
    ['form','contrast','recall'].forEach(function(kind){var e=candidates.find(function(x){return x.kind===kind;});if(e) first.push(e);});
    candidates=first.concat(candidates.filter(function(e){return first.indexOf(e)<0;}));
  }
  var selected=candidates.slice(0,6);
  m.session={version:TRAINING_VERSION,mode:mode,lv:S.lv,queue:selected.map(function(e){return {id:e.id,retry:false};}),base:selected.length,i:0,results:{},retries:[],created:today()};
  TRAIN_VIEW='session';save();showTraining();
}
function showTraining(){
  document.querySelector('nav button[data-p="p-train"]').click();
  renderTraining();window.scrollTo(0,0);
}
function renderStudyLaunch(){
  var el=document.getElementById('study-launch');if(!el) return;
  if(S.q&&S.q.started&&!S.q.fin){el.innerHTML='';return;}
  var m=masteryState(), session=m.session, active=session&&session.i<session.queue.length;
  var n=trainingMistakes().length, practiced=m.days[today()]||0;
  el.innerHTML='<div class="coach-hero"><div class="eyebrow">YOUR GRAMMAR GYM</div><h1>'+tr('Make it stick.','จำให้ได้ ใช้ให้เป็น')+'</h1>'+
    '<p>'+tr('One small session: choose the meaning, build the form, recall it yourself.','ฝึกสั้น ๆ เลือกความหมาย ผันรูป แล้วลองนึกเอง')+'</p>'+
    '<button class="go" data-train="'+(active?'resume':'mixed')+'">'+tr(active?'Continue your session':'Start a 6-question session',active?'ฝึกต่อจากเดิม':'เริ่มฝึก 6 ข้อ')+' <span aria-hidden="true">→</span></button>'+
    '<div class="hero-meta"><span>'+practiced+' attempts today</span><button class="text-btn" data-view="mistakes">'+n+' to revisit</button></div>'+
    '<p class="gentle">'+tr('Forgetting is a cue to practise—not a personal failure.','ลืมได้ เป็นสัญญาณให้ฝึกซ้ำ ไม่ใช่ความผิดของคุณ')+'</p></div>'+
    '<div class="section-label">'+tr('Your spaced review','ทบทวนตามรอบ')+'</div>';
}

function trainingTile(action,title,th,desc,descTh,number){
  return '<button class="training-tile" '+action+'><span class="tile-number">'+number+'</span><b>'+tr(title,th)+'</b><span class="tile-desc">'+tr(desc,descTh)+'</span><span class="tile-arrow" aria-hidden="true">↗</span></button>';
}
function renderTraining(){
  var el=document.getElementById('training');if(!el) return;
  var m=masteryState();
  if(TRAIN_VIEW==='session'&&m.session) return renderTrainingSession(el);
  if(TRAIN_VIEW==='groups') return renderTrainingGroups(el);
  if(TRAIN_VIEW==='forms') return renderFormGuide(el);
  if(TRAIN_VIEW==='coverage') return renderCoverage(el);
  if(TRAIN_VIEW==='mistakes') return renderMistakes(el);
  var eligible=trainingEligible(), n=trainingMistakes().length, due=eligible.filter(function(e){return m.items[e.id]&&trainingDue(e);}).length;
  var solid=eligible.filter(function(e){return (m.items[e.id]||{}).stage>=3;}).length;
  var active=m.session&&m.session.i<m.session.queue.length;
  el.innerHTML='<div class="training-heading"><div class="eyebrow">LESS READING. MORE RETRIEVING.</div><h1>'+tr('Train the tricky parts','ฝึกจุดที่สับสน')+'</h1><p>'+tr('Short practice with a reason for every answer.','ฝึกทีละนิด พร้อมเหตุผลของทุกคำตอบ')+'</p></div>'+
    '<div class="training-stats"><div><b>'+due+'</b><span>Due · ถึงรอบ</span></div><div><b>'+n+'</b><span>Revisit · ฝึกซ้ำ</span></div><div><b>'+solid+'</b><span>Retained · จำข้ามวัน</span></div></div>'+
    '<button class="go" data-train="'+(active?'resume':'mixed')+'">'+tr(active?'Resume saved session':'Mix it up · 6 questions',active?'ฝึกต่อจากที่บันทึกไว้':'ฝึกคละ 6 ข้อ')+'</button>'+
    (active?'<p class="gentle">'+tr('Your '+m.session.lv+' session is saved. Resume it, or end it before choosing a different drill. Completed answers are kept.','บันทึกรอบ '+m.session.lv+' ไว้แล้ว ฝึกต่อหรือจบรอบก่อนเลือกแบบอื่น ผลที่ตอบแล้วจะยังอยู่')+' <button class="text-btn" data-finish="home">End this session · จบรอบนี้</button></p>':'')+
    '<div class="training-grid">'+
    trainingTile('data-train="form"','Build the form','ฝึกเชื่อมรูป','What goes before it?','ข้างหน้าต้องใช้รูปอะไร?','01')+
    trainingTile('data-train="contrast"','Tell them apart','แยกความต่าง','Same translation, different job.','แปลคล้ายกัน แต่ใช้ต่างกัน','02')+
    trainingTile('data-train="recall"','Recall without choices','นึกเองโดยไม่มีตัวเลือก','Type the missing Japanese.','พิมพ์ภาษาญี่ปุ่นในช่องว่าง','03')+
    trainingTile('data-view="mistakes"','My repair list','ข้อที่ต้องฝึกซ้ำ','Missed answers come back here.','รวมข้อที่ยังสับสนไว้ที่นี่','04')+'</div>'+
    '<div class="section-label">'+tr('Look it up, then try it','ดูหลักสั้น ๆ แล้วลองทำ')+'</div><div class="resource-links">'+
    '<button data-view="groups">'+tr('Confusing grammar, side by side','เทียบไวยากรณ์ที่สับสน')+' <span>→</span></button>'+
    '<button data-view="forms">'+tr('Word-form cheat sheet','สรุปการผันและเชื่อมคำ')+' <span>→</span></button>'+
    '<button data-view="coverage">'+tr('Shin Kanzen list & sources','รายการ Shin Kanzen และแหล่งอ้างอิง')+' <span>→</span></button></div>'+
    '<p class="gentle">'+tr(eligible.length+' authored exercises in this level filter. “Retained” means unaided success on at least 3 separate study days; it is not a JLPT score.', 'ตัวกรองนี้มีแบบฝึก '+eligible.length+' ข้อ “จำข้ามวัน” คือทำได้โดยไม่ดูตัวช่วยอย่างน้อย 3 วันเรียนแยกกัน ไม่ใช่คะแนน JLPT')+'</p>';
}
function trainingBack(){return '<button class="chip training-back" data-view="home">← '+(showEN()?'Training home':'หน้าฝึก')+'</button>';}
function renderTrainingSession(el){
  var s=masteryState().session;
  if(s.i>=s.queue.length){
    var results=Object.values(s.results), first=results.filter(function(r){return !r.retry;}), clean=first.filter(function(r){return r.correct&&!r.assisted;}).length;
    el.innerHTML='<div class="training-finish"><div class="eyebrow">A SMALL SESSION, WELL SPENT</div>'+plantSVG(4,100)+'<h1>'+tr('Practice complete','ฝึกจบแล้ว')+'</h1><div class="finish-score">'+clean+' <span>/ '+s.base+'</span></div><p>'+tr('First attempts answered without help.','จำนวนข้อที่ตอบได้เองในครั้งแรก')+'</p><p class="gentle">'+tr('Same-day retries help you learn. A later-day check shows what stayed.','การทำซ้ำวันนี้ช่วยให้เรียนรู้ การทบทวนวันถัดไปช่วยเช็กว่าจำได้จริงไหม')+'</p><button class="go" data-finish="home">'+tr('Done for now','พอแค่นี้ก่อน')+'</button><button class="go quiet" data-finish="mistakes">'+tr('See what to revisit','ดูข้อที่ต้องฝึกซ้ำ')+'</button></div>';
    return;
  }
  var item=s.queue[s.i], e=trainingExercise(item.id);if(!e){s.i++;save();return renderTrainingSession(el);}
  var r=s.results[s.i], recall=s.mode==='recall'||e.kind==='recall';
  if(!s.current||s.current.index!==s.i){s.current={index:s.i,hint:false,choices:!recall,reveal:false,typed:'',options:shuffle(e.options.slice())};save();}
  var c=s.current, g=byId(e.gid);
  var h='<div class="drill-hd"><button class="chip" data-view="home">Pause · พัก</button><span class="cnt">'+(s.i+1)+' / '+s.queue.length+'</span><span class="tag '+g.lv+'">'+g.lv+'</span></div><div class="prog"><i style="width:'+(s.i/s.queue.length*100)+'%"></i></div>'+
    '<div class="eyebrow">'+(item.retry?'TRY AGAIN · ลองใหม่':(recall?'RECALL':e.kind==='form'?'BUILD THE FORM':'SPOT THE DIFFERENCE'))+'</div>'+
    '<div class="training-prompt">'+tr(e.prompt_en,e.prompt_th)+'</div><div class="sentence-card"><div class="ex-j" lang="ja">'+esc(e.ja).replace('＿＿','<span class="blank">＿＿</span>')+'</div>'+
    '<details class="reading-help"><summary>Reading · คำอ่าน</summary><div lang="ja">'+esc(e.kana)+'</div></details></div>';
  if(!r){
    if(c.hint) h+='<div class="training-hint">'+tr(e.hint_en,e.hint_th)+'</div>';
    if(c.choices){h+='<div class="opts">';c.options.forEach(function(option,i){h+='<button class="opt" data-answer="'+i+'" lang="ja">'+esc(option)+'</button>';});h+='</div>';}
    else h+='<form id="training-answer-form"><label for="training-answer">'+tr('Fill the blank in Japanese','เติมช่องว่างเป็นภาษาญี่ปุ่น')+'</label><div class="answer-input-row"><input id="training-answer" type="text" lang="ja" autocomplete="off" autocorrect="off" spellcheck="false" value="'+esc(c.typed)+'" placeholder="日本語…"><button class="chip" type="submit">Check</button></div></form>';
    h+='<div class="training-actions">'+(!c.hint?'<button class="text-btn" data-help="hint">Hint · คำใบ้</button>':'')+(!c.choices?'<button class="text-btn" data-help="choices">Show choices · ดูตัวเลือก</button>':'')+'<button class="text-btn" data-help="reveal">Teach me this one · ดูเฉลย</button></div>';
  }else{
    h+='<div class="training-feedback '+(r.correct?'is-correct':'is-learning')+'" role="status"><b>'+tr(r.correct?(r.assisted?'Correct with help':'You got it'):'Let’s repair this',r.correct?(r.assisted?'ถูกแล้ว โดยมีตัวช่วย':'ถูกต้อง'):'มาฝึกข้อนี้อีกนิด')+'</b>'+
      (!r.correct&&r.answer?'<p>'+tr('Your answer: '+r.answer,'คำตอบของคุณ: '+r.answer)+'</p>':'')+
      '<p class="answer-jp" lang="ja">'+esc(e.ja.replace('＿＿',e.answer))+'</p>'+tr(e.en,e.th)+'<div class="feedback-rule">'+tr(e.why_en,e.why_th)+'</div>'+
      '<p class="gentle">'+tr(r.assisted?'Using help is learning. This attempt does not increase retained strength.':r.correct?'We will check this again on a later day.':'This stays on your repair list. A later unaided answer can clear it.',r.assisted?'ใช้ตัวช่วยได้ ข้อนี้ยังไม่นับว่าเป็นการจำได้เอง':r.correct?'จะนำกลับมาทบทวนอีกในวันถัดไป':'ข้อนี้อยู่ในรายการฝึกซ้ำ ตอบได้เองในวันถัดไปจึงจะเอาออก')+'</p></div>'+
      '<div class="training-actions"><button class="text-btn" data-detail="'+e.gid+'">Pattern & examples</button><button class="text-btn" data-compare="'+e.group+'">Compare similar grammar</button><button class="text-btn" data-training-audio="'+e.id+'">▷ Listen</button></div><button class="go" data-next-training>Next · ข้อต่อไป →</button>';
  }
  el.innerHTML=h;
  var input=document.getElementById('training-answer');if(input) input.addEventListener('input',function(){s.current.typed=input.value;save();});
}
function answerTraining(answer,revealed){
  var s=masteryState().session;if(!s||s.results[s.i]||s.i>=s.queue.length) return;
  var item=s.queue[s.i], e=trainingExercise(item.id), c=s.current;
  var correct=!revealed&&normaliseAnswer(answer)===normaliseAnswer(e.answer);
  var assisted=!!(revealed||c.hint||((s.mode==='recall'||e.kind==='recall')&&c.choices));
  s.results[s.i]={id:e.id,correct:correct,assisted:assisted,answer:answer,retry:item.retry};
  recordTrainingAnswer(e,correct,assisted);
  if((!correct||assisted)&&!item.retry&&s.retries.indexOf(e.id)<0&&s.retries.length<3){
    s.queue.push({id:e.id,retry:true});s.retries.push(e.id);
  }
  save();renderTraining();renderStudyLaunch();
}

function renderTrainingGroups(el){
  var groups=MASTERY_GROUPS.filter(function(group){return group.ids.some(function(id){return S.lv==='all'||byId(id).lv===S.lv;});});
  var s=masteryState().session;
  var h=trainingBack()+(s&&s.i<s.queue.length?'<button class="chip" data-train="resume">Resume session →</button>':'')+'<h1>'+tr('Similar ≠ interchangeable','คล้ายกัน ≠ ใช้แทนกันได้เสมอ')+'</h1><p class="gentle">'+tr('Look at the word before, the situation, and what comes after.','ดูคำข้างหน้า สถานการณ์ และข้อความที่ตามมา')+'</p>';
  groups.forEach(function(group){
    h+='<details class="compare-group" '+(TRAIN_GROUP===group.id?'open':'')+'><summary>'+tr(group.title,group.th)+'</summary><div class="group-body"><p>'+tr(group.rule_en,group.rule_th)+'</p>';
    group.members.forEach(function(member){var g=byId(member.id);h+='<div class="compare-member"><button class="text-btn compare-pattern" data-detail="'+g.id+'" lang="ja">'+esc(g.p)+' ↗</button><div class="compare-cue">'+tr(member.cue_en,member.cue_th)+'</div><div class="connection-pair"><div><b>BEFORE · ข้างหน้า</b>'+tr(member.before_en,member.before_th)+'</div><div><b>AFTER · ข้างหลัง</b>'+tr(member.after_en,member.after_th)+'</div></div></div>';});
    h+='<button class="go quiet" data-group-practice="'+group.id+'">'+tr('Try this distinction','ลองฝึกความต่างนี้')+'</button></div></details>';
  });el.innerHTML=h;
}
function connectionPlain(conn,lang){
  var labels=lang==='th'?
    [['V辞書形','กริยารูปพจนานุกรม'],['V普通形','กริยารูปธรรมดา'],['普通形','รูปธรรมดา'],['Vます語幹','ตัด ます ออกจากกริยารูป ます'],['Vます形','กริยารูป ます'],['Vます','กริยารูป ます'],['Vた','กริยารูป た'],['Vている','กริยารูป ている'],['Vて','กริยารูป て'],['Vない','กริยารูป ない'],['イA','คำคุณศัพท์ い'],['ナA','คำคุณศัพท์ な'],['N','คำนาม']]:
    [['V辞書形','dictionary-form verb'],['V普通形','plain-form verb'],['普通形','plain form'],['Vます語幹','verb stem (remove ます)'],['Vます形','ます-form verb'],['Vます','ます-form verb'],['Vた','た-form verb'],['Vている','ている-form verb'],['Vて','て-form verb'],['Vない','ない-form verb'],['イA','い-adjective'],['ナA','な-adjective'],['N','noun']];
  var out=conn;labels.forEach(function(pair){out=out.split(pair[0]).join(pair[1]);});return out;
}
function miniConnection(g){
  var h='<div class="connection-helper"><div class="eyebrow">HOW TO ATTACH IT · วิธีเชื่อม</div>';
  h+=tr(connectionPlain(g.conn,'en'),connectionPlain(g.conn,'th'));
  var member;MASTERY_GROUPS.some(function(group){member=group.members.find(function(m){return m.id===g.id;});return !!member;});
  if(member) h+='<div class="connection-pair"><div><b>BEFORE</b>'+tr(member.before_en,member.before_th)+'</div><div><b>AFTER</b>'+tr(member.after_en,member.after_th)+'</div></div>';
  return h+'<button class="text-btn" data-open-forms>'+tr('Help with these forms →','วิธีผันรูปเหล่านี้ →')+'</button></div>';
}
function renderFormGuide(el){
  var h=trainingBack()+'<h1>'+tr('The form comes first','เริ่มจากรูปคำ')+'</h1><p>'+tr('Use the connection rule of each pattern. A translation alone cannot tell you which form to attach.','ดูวิธีเชื่อมของแต่ละไวยากรณ์ แค่คำแปลยังบอกไม่ได้ว่าต้องใช้รูปอะไร')+'</p>';
  MASTERY_FORM_GUIDE.forEach(function(f,i){h+='<details class="compare-group" '+(i===0?'open':'')+'><summary>'+tr(f.title,f.th)+'</summary><div class="group-body"><p>'+tr(f.rule_en,f.rule_th)+'</p>';f.examples.forEach(function(e){h+='<div class="form-example"><div lang="ja">'+esc(e.from)+' <span>→</span> <b>'+esc(e.to)+'</b></div>'+tr(e.en,e.th)+'</div>';});h+='<p class="training-hint">'+tr(f.trap_en,f.trap_th)+'</p></div></details>';});
  h+='<button class="go" data-train="form">'+tr('Practise attaching the forms','ลองฝึกเชื่อมรูป')+'</button>';el.innerHTML=h;
}
function renderMistakes(el){
  var list=trainingMistakes(), h=trainingBack()+'<h1>'+tr('Your repair list','รายการฝึกซ้ำของคุณ')+'</h1><p>'+tr('A mistake tells us what to practise next. Clear it with an unaided answer on a later study day.','ข้อที่พลาดบอกว่าควรฝึกอะไรต่อ ตอบได้เองในวันเรียนถัดไปจึงจะนำออกจากรายการ')+'</p>';
  if(!list.length) h+='<div class="empty-state">'+plantSVG(2,80)+tr('Nothing here yet. Try a short session to find your tricky spots.','ยังไม่มีข้อที่ต้องฝึกซ้ำ ลองฝึกสั้น ๆ เพื่อหาจุดที่ยังสับสน')+'<button class="go quiet" data-train="mixed">Start a session</button></div>';
  else {h+='<button class="go" data-train="mistakes">'+tr('Repair up to 6 questions','ฝึกซ้ำไม่เกิน 6 ข้อ')+'</button>';list.forEach(function(e){h+='<div class="mistake-card"><button class="text-btn" data-detail="'+e.gid+'">'+esc(byId(e.gid).p)+'</button><div lang="ja">'+esc(e.ja)+'</div><details><summary>Quick reminder · ทบทวนสั้น ๆ</summary>'+tr(e.why_en,e.why_th)+'</details></div>';});}
  el.innerHTML=h;
}
function renderCoverage(el){
  var groups=typeof COVERAGE==='undefined'?[]:COVERAGE, count=0, started=0;
  groups.forEach(function(c){c.items.forEach(function(item){count++;if(item.ids.every(function(id){return boxOf(id)>0;})) started++;});});
  var h=trainingBack()+'<h1>'+tr('Your list, connected','เชื่อมรายการเข้ากับบทเรียน')+'</h1><p>'+tr('Shin Kanzen Master N2 coverage guide','คู่มือเทียบรายการ Shin Kanzen Master N2')+'</p>'+
    '<div class="source-note">'+tr('The publisher confirms the book and most chapter headings. This is an independent study companion with original examples. The supplied list is not an official JLPT syllabus; level labels can overlap.','ตรวจสอบหนังสือและหัวข้อส่วนใหญ่จากสำนักพิมพ์แล้ว แอปนี้เป็นคู่มือฝึกอิสระ ใช้ตัวอย่างที่เขียนใหม่ รายการที่ส่งมาไม่ใช่หลักสูตรทางการของ JLPT และบางรูปพบได้หลายระดับ')+'</div><p class="gentle">'+started+' / '+count+' mapped entries started · '+GRAMMAR.length+' total library entries. '+tr('Chapter labels follow your supplied list. This page includes both N3 and N2 links.','ชื่อบทตามรายการที่คุณส่งมา หน้านี้รวมลิงก์ทั้ง N3 และ N2')+'</p>';
  groups.forEach(function(c){h+='<details class="coverage-chapter"><summary><span class="chapter-num">'+esc(c.chapter)+'</span>'+esc(c.title)+'<span class="coverage-count">'+c.items.length+'</span></summary><div class="group-body">';c.items.forEach(function(item){h+='<div class="coverage-item"><b lang="ja">'+esc(item.label)+'</b><div>';item.ids.forEach(function(id){var g=byId(id);if(g) h+='<button class="coverage-link" data-detail="'+id+'">'+(boxOf(id)>0?'◐ ':'○ ')+esc(g.p)+' <small>'+g.lv+'</small> ↗</button>';});h+='</div></div>';});h+='</div></details>';});
  h+='<details class="compare-group"><summary>Sources & corrections · แหล่งข้อมูล</summary><div class="group-body"><p>'+tr('Useful corrections: 一方だ can describe positive change; わけにはいかない means cannot do, while ないわけにはいかない means must do. たとえ means even if in conditional sentences, not for example.','ข้อควรแก้: 一方だ ใช้กับการเปลี่ยนแปลงเชิงบวกได้ わけにはいかない คือทำไม่ได้ แต่ ないわけにはいかない คือต้องทำ ในประโยคเงื่อนไข たとえ แปลว่าแม้ว่า ไม่ใช่ยกตัวอย่าง')+'</p>';
  var sources=(typeof CONTENT_SOURCES==='undefined'?[]:CONTENT_SOURCES).concat(typeof MASTERY_SOURCES==='undefined'?[]:MASTERY_SOURCES);
  sources.forEach(function(source){h+='<p><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.title)+'</a>'+(source.note?'<br><small>'+esc(source.note)+'</small>':'')+'</p>';});
  h+='</div></details>';el.innerHTML=h;
}

/* Backup validation runs completely before mutating live progress. */
function normaliseBackup(o){
  if(!o||typeof o!=='object'||Array.isArray(o)||!o.box) throw new Error('Not a progress backup');
  var out={}, mapNames=['box','last','lapse','att','cor','seen','promoted'];
  function obj(value){return !!value&&typeof value==='object'&&!Array.isArray(value);}
  function date(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!isNaN(Date.parse(value));}
  mapNames.forEach(function(name){
    var value=o[name]===undefined?{}:o[name];if(!obj(value)) throw new Error('Invalid '+name);
    out[name]={};Object.keys(value).forEach(function(id){
      if(!byId(id)) return;var v=value[id];
      if(name==='last'||name==='promoted'){if(!date(v)) throw new Error('Invalid date');}
      else if(!Number.isSafeInteger(v)||v<0||(name==='box'&&v>5)) throw new Error('Invalid count');
      out[name][id]=v;
    });
  });
  if(o.days!==undefined&&(!Array.isArray(o.days)||!o.days.every(date))) throw new Error('Invalid study days');
  out.days=(o.days||[]).slice(-400);out.day=null;
  if(o.day!==undefined&&o.day!==null){
    var d=o.day;if(!obj(d)||!date(d.d)||!Array.isArray(d.newIds)||!d.newIds.every(function(id){return typeof id==='string';})||!obj(d.done)||!obj(d.learned)||!Number.isSafeInteger(d.extra)||d.extra<0) throw new Error('Invalid daily ledger');
    out.day={d:d.d,newIds:d.newIds.filter(byId),done:{},learned:{},extra:Math.min(d.extra,1000)};
    ['done','learned'].forEach(function(k){Object.keys(d[k]).forEach(function(id){if(byId(id)&&d[k][id])out.day[k][id]=1;});});
  }
  out.mastery={items:{},days:{}};
  if(o.mastery!==undefined){
    if(!obj(o.mastery)||!obj(o.mastery.items)||!obj(o.mastery.days)) throw new Error('Invalid training record');
    Object.keys(o.mastery.items).forEach(function(id){
      if(!trainingExercise(id)) return;var r=o.mastery.items[id];
      if(!obj(r)||!Number.isSafeInteger(r.attempts)||r.attempts<0||!Number.isSafeInteger(r.correct)||r.correct<0||r.correct>r.attempts||!Number.isInteger(r.stage)||r.stage<0||r.stage>4||typeof r.mistake!=='boolean') throw new Error('Invalid exercise record');
      var clean={attempts:r.attempts,correct:r.correct,stage:r.stage,mistake:r.mistake};
      ['last','due','creditDay'].forEach(function(k){if(r[k]!==undefined){if(!date(r[k]))throw new Error('Invalid training date');clean[k]=r[k];}});out.mastery.items[id]=clean;
    });
    Object.keys(o.mastery.days).forEach(function(d){var n=o.mastery.days[d];if(!date(d)||!Number.isSafeInteger(n)||n<0)throw new Error('Invalid training history');out.mastery.days[d]=n;});
    // Sessions are resumable locally; imports restart them to avoid stale question IDs.
  }
  var choices={lang:['both','en','th'],lv:['all','N3','N2'],theme:['light','dark','auto'],newPerDay:[0,3,5,10,15],maxRev:[20,40,60,999],rateBtns:[2,4],dayStart:[0,4,7]};
  Object.keys(choices).forEach(function(k){if(o[k]!==undefined){if(choices[k].indexOf(o[k])<0)throw new Error('Invalid setting');out[k]=o[k];}});
  return out;
}
function exportProgress(){
  var out={v:6};['box','last','lapse','att','cor','days','seen','day','promoted','lang','lv','theme','newPerDay','maxRev','rateBtns','dayStart'].forEach(function(k){if(S[k]!==undefined)out[k]=S[k];});
  var m=masteryState();out.mastery={items:m.items,days:m.days};return out;
}
function updateStudyLanguage(){
  document.documentElement.lang=S.lang==='th'?'th':'en';
  document.getElementById('study-language').value=S.lang;
  lt.textContent=langLabel();lt.classList.toggle('on',S.lang!=='both');
  renderToday();renderPrac();drawList();drawRecord();renderTraining();if(openId)openDetail(openId);
}
function masteryInit(){
  masteryState();
  document.getElementById('study-language').value=S.lang;
  document.getElementById('study-language').addEventListener('change',function(e){S.lang=e.target.value;save();updateStudyLanguage();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&openId)closeSheet();});
  document.getElementById('bkdownload').addEventListener('click',function(){
    var blob=new Blob([JSON.stringify(exportProgress(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob);
    var a=document.createElement('a');a.href=url;a.download='sujimichi-progress-'+today()+'.json';a.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);
  });
  document.getElementById('training').addEventListener('submit',function(e){if(e.target.id==='training-answer-form'){e.preventDefault();var input=document.getElementById('training-answer');if(input.value.trim())answerTraining(input.value,false);}});
  document.addEventListener('click',function(event){
    var b=event.target.closest('button');if(!b)return;
    if(b.dataset.train){
      if(b.dataset.train==='resume'){TRAIN_VIEW='session';showTraining();}
      else startTraining(b.dataset.train);return;
    }
    if(b.dataset.view){TRAIN_VIEW=b.dataset.view;showTraining();return;}
    if(b.dataset.detail){openDetail(b.dataset.detail);return;}
    if(b.hasAttribute('data-open-forms')){closeSheet();TRAIN_VIEW='forms';showTraining();return;}
    if(b.dataset.compare){TRAIN_GROUP=b.dataset.compare;TRAIN_VIEW='groups';showTraining();return;}
    if(b.dataset.groupPractice){startTraining('mixed',b.dataset.groupPractice);return;}
    if(b.dataset.patternPractice){closeSheet();startTraining('mixed',null,b.dataset.patternPractice);return;}
    if(b.dataset.trainingAudio){var ex=trainingExercise(b.dataset.trainingAudio);speak(ex.ja.replace('＿＿',ex.answer));return;}
    var s=masteryState().session;
    if(b.dataset.finish){masteryState().session=null;TRAIN_VIEW=b.dataset.finish;save();showTraining();renderStudyLaunch();return;}
    if(!s||s.i>=s.queue.length)return;
    if(b.hasAttribute('data-next-training')){s.i++;s.current=null;save();renderTraining();window.scrollTo(0,0);return;}
    if(b.dataset.help){
      if(b.dataset.help==='reveal'){answerTraining('',true);return;}
      s.current[b.dataset.help]=true;save();renderTraining();return;
    }
    if(b.dataset.answer!==undefined){answerTraining(s.current.options[+b.dataset.answer],false);return;}
  });
  renderStudyLaunch();renderTraining();
}
