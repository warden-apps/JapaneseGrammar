/* One optional mixed drill, plus transfer/recall practice in the daily queue. */
function drillQuestion(id){return JLPT_QUESTIONS.find(function(q){return q.id===id;});}
function drillState(){
  if(!S.drill)S.drill={};
  var d=S.drill;
  if(!d.stats)d.stats={};if(!d.daily)d.daily={};if(!d.lastDaily)d.lastDaily={};
  if(!d.encountered)d.encountered={};
  if(d.scope!=='all')d.scope='studied';
  return d;
}
function encounteredInStudy(id){
  /* Historical box/answer evidence predates explicit encounter tracking.
     Opening a Library explanation alone (S.seen) is deliberately insufficient. */
  return !!(drillState().encountered[id]||boxOf(id)>0||(S.att[id]||0)>0);
}
function markStudyEncounter(id){drillState().encountered[id]=1;}
function questionTargets(q){return q.gids||[q.gid];}
function drillTargets(q){
  return q.passage?Array.from(new Set(JLPT_QUESTIONS.filter(function(x){return x.passage===q.passage;}).flatMap(questionTargets))):questionTargets(q);
}
function drillLevel(q){
  if(q.level)return q.level;
  var levels=Array.from(new Set(drillTargets(q).map(function(id){return byId(id).lv;})));
  return levels.length===1?levels[0]:'mixed';
}
function drillPool(scope){
  return JLPT_QUESTIONS.filter(function(q){return (S.lv==='all'||drillLevel(q)===S.lv)&&drillTargets(q).every(function(id){
    return byId(id)&&(scope==='all'||encounteredInStudy(id));
  });});
}
function drillSourceHTML(q,feedback){
  if(!q.source)return '<p class="question-source">'+tx('Original practice · '+drillLevel(q),'โจทย์ที่แอปเขียน · '+drillLevel(q))+'</p>';
  var s=JLPT_OFFICIAL_SOURCES[q.source.edition],url=s.url+'#page='+q.source.page;
  var h='<div class="question-source official-source"><span>'+tx('Official N2 · '+q.source.edition+' workbook · Q'+q.source.number,'ข้อสอบจริง N2 · หนังสือฝึกปี '+q.source.edition+' · ข้อ '+q.source.number)+'</span><a href="'+url+'" target="_blank" rel="noopener noreferrer">'+tx('Source: Official Worldwide Japanese-Language Proficiency Test Website','ที่มา: เว็บไซต์ทางการของการสอบ JLPT')+'</a>';
  if(feedback)h+='<p>'+tx('English/Thai explanation and translation by this app. Options may appear in a different order.','คำอธิบายและคำแปลอังกฤษ/ไทยเขียนโดยแอปนี้ ตัวเลือกอาจแสดงต่างลำดับจากต้นฉบับ')+'</p><a href="'+s.answers+'#page=1" target="_blank" rel="noopener noreferrer">'+tx('Official answer key · original option '+(q.answer+1),'เฉลยทางการ · ตัวเลือกเดิมข้อ '+(q.answer+1))+'</a>';
  return h+'</div>';
}
function drillType(q){return q.kind==='order'?tx('Sentence order · ★','เรียงประโยค · ★'):q.kind==='text'?tx('Grammar in a passage','ไวยากรณ์ในบทความ'):tx('Choose the grammar','เลือกไวยากรณ์');}
function drillLaunchHTML(){
  var d=drillState(),p=drillPool(d.scope),n=p.length,s=d.session,official=p.filter(function(q){return !!q.source;}).length;
  var resume=s&&s.i<s.queue.length&&s.scope===d.scope&&s.lv===S.lv;
  return '<section class="drill-launch"><div class="simple-kicker">'+tx('TEST YOUR GRAMMAR','ทดสอบไวยากรณ์')+'</div><h2>'+tx('Random JLPT drill','สุ่มโจทย์แนว JLPT')+'</h2><p>'+tx('Sentence gaps, ★ order and passages. Feedback after every answer.','เติมไวยากรณ์ เรียงประโยค ★ และบทความ เฉลยทันทีทุกข้อ')+'</p><label for="drill-scope">'+tx('Target grammar','ไวยากรณ์เป้าหมาย')+'</label><select id="drill-scope"><option value="studied"'+(d.scope==='studied'?' selected':'')+'>'+tx('Grammar I’ve studied','ไวยากรณ์ที่เคยเรียน')+'</option><option value="all"'+(d.scope==='all'?' selected':'')+'>'+tx('All — studied or new','ทั้งหมด ทั้งที่เรียนแล้วและยังไม่เรียน')+'</option></select><p class="drill-pool-note">'+tx(n+' available · '+official+' official + '+(n-official)+' original','มีโจทย์ '+n+' ข้อ · ข้อสอบจริง '+official+' ข้อ + โจทย์ที่แอปเขียน '+(n-official)+' ข้อ')+'</p><button class="go quiet" data-start-drill'+(!n?' disabled':'')+'>'+tx(resume?'Continue random drill':'Start random drill',resume?'ทำโจทย์สุ่มต่อ':'เริ่มสุ่มโจทย์')+' →</button>'+(!n?'<p class="gentle">'+tx('Study a pattern first, or select All.','เรียนไวยากรณ์ก่อน หรือเลือกทั้งหมด')+'</p>':'')+'<details class="optional-detail"><summary>'+tx('About these questions','เกี่ยวกับโจทย์')+'</summary><p>'+tx('Includes 44 N2 questions from the official 2012 and 2018 practice workbooks, which select questions used in real tests. Years refer to publication, not exam dates. Each question labels its source.','มี N2 ทางการ 44 ข้อจากหนังสือฝึกปี 2012 และ 2018 ซึ่งคัดเลือกโจทย์ที่เคยออกสอบจริง ปีคือปีพิมพ์ ไม่ใช่ปีสอบ แต่ละข้อระบุที่มา')+'</p><p>'+tx('Up to 10 questions per round, favoring less-practised items. This is a grammar drill, not a complete JLPT mock or scaled score. All tested targets must be encountered for Studied scope; distractors can be unfamiliar. The bank does not cover every lesson.','รอบละไม่เกิน 10 ข้อ เน้นข้อที่ฝึกน้อย เป็นการฝึกไวยากรณ์ ไม่ใช่ข้อสอบ JLPT เต็มชุดหรือคะแนนปรับมาตรฐาน โหมดเคยเรียนกำหนดว่าต้องเคยพบทุกไวยากรณ์เป้าหมาย ตัวลวงอาจยังไม่เคยเรียน คลังโจทย์ยังไม่ครอบคลุมทุกบท')+'</p><a href="https://www.jlpt.jp/e/samples/sampleindex.html" target="_blank" rel="noopener noreferrer">'+tx('Official workbooks','หนังสือฝึกทางการ')+'</a> · <a href="https://www.jlpt.jp/e/policy.html" target="_blank" rel="noopener noreferrer">'+tx('Source and reuse terms','ที่มาและข้อกำหนดการใช้')+'</a></details></section>';
}
var homeWithoutDrill=renderStudyHome;
renderStudyHome=function(el){homeWithoutDrill(el);el.innerHTML+=drillLaunchHTML();};

function makeDrillQueue(scope){
  var d=drillState(),p=drillPool(scope),units={choice:[],order:[],text:[]},seen={};
  p.forEach(function(q){
    if(q.passage){if(seen[q.passage])return;seen[q.passage]=1;units.text.push(p.filter(function(x){return x.passage===q.passage;}));}
    else units[q.kind].push([q]);
  });
  Object.keys(units).forEach(function(k){shuffle(units[k]);units[k].sort(function(a,b){
    function uses(u){return Math.max.apply(null,u.map(function(q){return (d.stats[q.id]||{}).attempts||0;}));}
    return uses(a)-uses(b);
  });});
  var out=[],kinds=shuffle(['choice','order','text']);
  // Include a real test item whenever scope permits. Whole passages remain a unit.
  var officialUnits=Object.values(units).flat().filter(function(u){return !!u[0].source;});
  shuffle(officialUnits);officialUnits.sort(function(a,b){return Math.max.apply(null,a.map(function(q){return (d.stats[q.id]||{}).attempts||0;}))-Math.max.apply(null,b.map(function(q){return (d.stats[q.id]||{}).attempts||0;}));});
  if(officialUnits.length){var first=officialUnits[0];units[first[0].kind].splice(units[first[0].kind].indexOf(first),1);first.forEach(function(q){out.push({id:q.id,options:shuffle([0,1,2,3])});});}
  // Reserve one unit of each missing format before filling spare places.
  // Otherwise two five-blank official passages can consume an entire round.
  kinds.forEach(function(k){
    if(out.some(function(item){return drillQuestion(item.id).kind===k;})||!units[k].length)return;
    var unit=units[k][0];if(out.length+unit.length>10)return;
    units[k].shift();unit.forEach(function(q){out.push({id:q.id,options:shuffle([0,1,2,3])});});
  });
  while(out.length<10){
    var added=false;
    kinds.forEach(function(k){if(!units[k].length)return;var unit=units[k][0];if(out.length+unit.length>10)return;
      units[k].shift();unit.forEach(function(q){out.push({id:q.id,options:shuffle([0,1,2,3])});});added=true;
    });
    if(!added)break;
  }
  return out;
}
function startDrill(){
  var d=drillState(),s=d.session;
  if(!s||s.i>=s.queue.length||s.scope!==d.scope||s.lv!==S.lv){
    var queue=makeDrillQueue(d.scope);if(!queue.length)return;
    d.session={version:1,scope:d.scope,lv:S.lv,queue:queue,i:0,answers:{},created:today()};
  }
  d.active=true;save();activateSimplePane('p-today');renderToday();window.scrollTo(0,0);
}
function validDrillSession(s){
  return s&&s.version===1&&Array.isArray(s.queue)&&s.queue.length>0&&s.queue.length<=10&&
    Number.isInteger(s.i)&&s.i>=0&&s.i<=s.queue.length&&s.answers&&typeof s.answers==='object'&&!Array.isArray(s.answers)&&
    Object.keys(s.answers).every(function(k){var a=s.answers[k];return Number.isInteger(+k)&&+k>=0&&+k<s.queue.length&&a&&Number.isInteger(a.pick)&&a.pick>=0&&a.pick<4&&typeof a.correct==='boolean';})&&
    s.queue.every(function(item){return drillQuestion(item.id)&&Array.isArray(item.options)&&item.options.length===4&&new Set(item.options).size===4&&item.options.every(function(n){return Number.isInteger(n)&&n>=0&&n<4;});});
}
function completedDrillSentence(q){
  if(q.kind==='order')return q.before+q.parts.join('')+q.after;
  if(q.kind==='choice')return q.stem.replace('＿＿',q.options[q.answer].text);
  var text=q.stem;
  JLPT_QUESTIONS.filter(function(x){return x.passage===q.passage;}).forEach(function(x){text=text.replace('【'+x.blank+'】',x.options[x.answer].text);});
  return text;
}
function drillPromptHTML(q,session){
  if(q.kind==='order')return '<p class="gentle">'+tx('Arrange all four parts in your head. Which part belongs at ★?','ลองเรียงทั้งสี่ส่วนในใจ ส่วนไหนอยู่ตรง ★?')+'</p><div class="question-sentence order-sentence" lang="ja">'+esc(q.before)+q.parts.map(function(p,i){return '<span class="order-slot'+(i===q.star?' star-slot':'')+'">'+(i===q.star?'★':'＿＿')+'</span>';}).join(' ')+esc(q.after)+'</div>';
  var text=esc(q.stem);
  if(q.kind==='text'){
    /* Earlier answers provide their completed context; later blanks stay blank.
       Never disclose a future answer while explaining the current blank. */
    JLPT_QUESTIONS.filter(function(x){return x.passage===q.passage;}).forEach(function(x){
      var pos=session.queue.findIndex(function(item){return item.id===x.id;});
      var done=pos>=0&&pos<session.i&&session.answers[pos];
      text=text.replace('【'+x.blank+'】',done?'<span class="passage-filled">'+esc(x.options[x.answer].text)+'</span>':'<span class="passage-blank'+(x.id===q.id?' current-blank':'')+'">【'+x.blank+'】</span>');
    });
    return '<p class="gentle">'+tx('Read the whole passage. Answer blank ','อ่านทั้งบทความ แล้วตอบช่องที่ ')+q.blank+'.</p><div class="question-sentence passage-text" lang="ja">'+text+'</div>';
  }
  return '<p class="gentle">'+tx('Choose the most natural expression for this context.','เลือกสำนวนที่เป็นธรรมชาติที่สุดในบริบทนี้')+'</p><div class="question-sentence" lang="ja">'+text.replace('＿＿','<span class="blank">＿＿</span>')+'</div>';
}
function drillFeedback(q,pick){
  var correct=pick===q.answer;
  var h='<section class="simple-feedback '+(correct?'is-correct':'needs-review')+'" role="status"><h2>'+tx(correct?'Correct':'Not quite',correct?'ถูกต้อง':'ยังไม่ถูก')+' · <span lang="ja">'+esc(q.options[q.answer].text)+'</span></h2><p>'+tx(q.en,q.th)+'</p>';
  if(!correct)h+='<div class="picked-reason"><b lang="ja">'+esc(q.options[pick].text)+'</b><p>'+tx(q.options[pick].en,q.options[pick].th)+'</p></div>';
  if(q.kind==='order')h+='<div class="completed-order" lang="ja">'+esc(q.before)+q.parts.map(function(part,i){return '<span'+(i===q.star?' class="correct-star"':'')+'>'+esc(part)+'</span>';}).join(' ')+esc(q.after)+'</div>';
  else if(q.kind==='choice')h+='<p lang="ja" class="feedback-jp">'+esc(completedDrillSentence(q))+'</p>';
  h+='<p class="gentle">'+tx(q.translation_en,q.translation_th)+'</p><details class="optional-detail"><summary>'+tx('Why not the others?','ทำไมตัวเลือกอื่นไม่เหมาะ?')+'</summary>';
  q.options.forEach(function(o,i){if(i!==q.answer)h+='<div class="option-reason"><b lang="ja">'+esc(o.text)+'</b><p>'+tx(o.en,o.th)+'</p></div>';});
  h+='</details>';
  questionTargets(q).forEach(function(id){h+='<button class="text-btn feedback-lesson" data-detail="'+id+'">'+tx('Review: ','ทบทวน: ')+esc(byId(id).p)+'</button>';});
  if(q.source)h+='<details class="optional-detail"><summary>'+tx('Official source & answer key','ต้นฉบับและเฉลยทางการ')+'</summary>'+drillSourceHTML(q,true)+'</details>';
  return h+'</section>';
}
function submitDrill(pick){
  var d=drillState(),s=d.session;if(!validDrillSession(s)||s.i>=s.queue.length||s.answers[s.i])return;
  if(!Number.isInteger(pick)||pick<0||pick>3)return;
  var q=drillQuestion(s.queue[s.i].id),correct=pick===q.answer;
  s.answers[s.i]={pick:pick,correct:correct};
  var r=d.stats[q.id]||{attempts:0,correct:0};r.attempts++;if(correct)r.correct++;r.last=today();d.stats[q.id]=r;
  /* Random-drill success never promotes a daily card or marks it encountered in Study. */
  save();renderToday();
  var feedback=document.querySelector('#today .simple-feedback');if(feedback)feedback.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function renderDrill(el){
  var d=drillState(),s=d.session;
  if(!validDrillSession(s)){d.active=false;d.session=null;save();return renderToday();}
  if(s.i>=s.queue.length){
    var right=Object.keys(s.answers).filter(function(i){return s.answers[i].correct;}).length;
    var missed=[];s.queue.forEach(function(item,i){if(s.answers[i]&&!s.answers[i].correct){var g=byId(drillQuestion(item.id).gid);if(missed.indexOf(g)<0)missed.push(g);}});
    el.innerHTML='<section class="drill-result"><div class="simple-kicker">'+tx('DRILL COMPLETE','จบรอบฝึก')+'</div><h1>'+right+' / '+s.queue.length+'</h1><p>'+tx('Correct in this practice round. This is not a JLPT score.','จำนวนข้อถูกในรอบนี้ ไม่ใช่คะแนน JLPT')+'</p>'+(missed.length?'<h2>'+tx('Worth another look','รูปที่ควรทบทวน')+'</h2>'+missed.map(function(g){return '<button class="text-btn missed-pattern" data-detail="'+g.id+'">'+esc(g.p)+'</button>';}).join(''):'<p>'+tx('Next time you will get another mix.','ครั้งต่อไปจะได้โจทย์อีกชุด')+'</p>')+'<button class="go primary-study" data-pause-drill>'+tx('Back to Study','กลับไปหน้าเรียน')+'</button></section>';return;
  }
  var item=s.queue[s.i],q=drillQuestion(item.id),a=s.answers[s.i];
  var h='<div class="drill-hd"><span class="cnt">'+tx('Random drill ','โจทย์สุ่ม ')+(s.i+1)+' / '+s.queue.length+'</span><button class="chip" data-pause-drill>'+tx('Pause','พัก')+'</button></div><div class="simple-kicker">'+drillType(q)+'</div>'+drillSourceHTML(q,false)+drillPromptHTML(q,s)+'<div class="opts drill-options">';
  item.options.forEach(function(n,i){var cls=a?(n===q.answer?' right':n===a.pick?' wrong':' dim'):'';
    h+='<button class="drill-option'+cls+'" data-drill-answer="'+n+'"'+(a?' disabled':'')+'><span class="option-number">'+(i+1)+'</span><span lang="ja">'+esc(q.options[n].text)+'</span>'+(a&&n===q.answer?'<span class="answer-mark">✓</span>':a&&n===a.pick?'<span class="answer-mark">×</span>':'')+'</button>';
  });h+='</div>';
  if(a)h+=drillFeedback(q,a.pick)+'<button class="go primary-study" data-drill-next>'+tx(s.i+1===s.queue.length?'See results':'Next question',s.i+1===s.queue.length?'ดูผล':'ข้อต่อไป')+' →</button>';
  el.innerHTML=h;
}
var todayWithoutDrill=renderToday;
renderToday=function(){
  var d=drillState();
  if(d.active&&d.session&&d.session.lv!==S.lv){d.active=false;save();}
  if(d.active)return renderDrill(document.getElementById('today'));
  return todayWithoutDrill();
};

/* Daily study: use new contexts, rotate examples, and retrieve without choices
   on later attempts. Old answered caches remain intact. */
var previousMakeSpec=makeSpec;
var questionWithoutSource=questionHTML;
questionHTML=function(g,sp){
  var q=sp.jlptId&&drillQuestion(sp.jlptId);
  return (q&&q.source?drillSourceHTML(q,false):'')+questionWithoutSource(g,sp);
};
makeSpec=function(g,base){
  var d=drillState(),bank=JLPT_QUESTIONS.filter(function(q){return q.kind==='choice'&&q.gid===g.id&&questionTargets(q).every(function(id){return id===g.id||encounteredInStudy(id);});});
  var spec;
  if(bank.length){
    shuffle(bank);bank.sort(function(a,b){return ((d.daily[a.id]||0)+(d.lastDaily[g.id]===a.id?10000:0))-((d.daily[b.id]||0)+(d.lastDaily[g.id]===b.id?10000:0));});
    var q=bank[0];spec={version:4,jlptId:q.id,kind:'cloze',key:q.options[q.answer].text,ct:q.stem.replace('＿＿','\u0001'),exIdx:0,
      why_en:q.en,why_th:q.th,example:{j:completedDrillSentence(q),k:'',e:q.translation_en,t:q.translation_th},
      opts:shuffle(q.options.map(function(o,i){return {t:o.text,ok:i===q.answer};}))};
  }else{
    /* Choose the least-used legacy authored question, avoiding the last prompt
       if another exists. Entries with no authored choices retain honest recall. */
    var authored=MASTERY_EXERCISES.filter(function(e){return e.gid===g.id;});
    if(authored.length){shuffle(authored);authored.sort(function(a,b){return ((d.daily[a.id]||0)+(d.lastDaily[g.id]===a.id?10000:0))-((d.daily[b.id]||0)+(d.lastDaily[g.id]===b.id?10000:0));});
      var e=authored[0];spec={version:4,exerciseId:e.id,kind:'cloze',key:e.answer,ct:e.ja.replace('＿＿','\u0001'),exIdx:0,prompt_en:e.prompt_en,prompt_th:e.prompt_th,why_en:e.why_en,why_th:e.why_th,
        example:{j:e.ja.replace('＿＿',e.answer),k:'',e:e.en,t:e.th},opts:shuffle(e.options.map(function(t){return {t:t,ok:t===e.answer};}))};
    }else spec=previousMakeSpec(g,base);
  }
  spec.version=4;spec.recallFirst=spec.kind==='cloze'&&((S.att[g.id]||0)>0||boxOf(g.id)>1);
  return spec;
};
specAt=function(i){
  if(S.q.gen[i]&&(S.q.gen[i].version===4||S.q.ans[i]!==undefined))return S.q.gen[i];
  var g=byId(S.q.q[i].id);if(!g)return null;
  S.q.gen[i]=makeSpec(g);save();return S.q.gen[i];
};
function recordDailyAttempt(g,sp,correct){
  var d=drillState(),id=sp.jlptId||sp.exerciseId;
  markStudyEncounter(g.id);
  if(id){d.daily[id]=(d.daily[id]||0)+1;d.lastDaily[g.id]=id;}
  if(sp.exerciseId){var e=trainingExercise(sp.exerciseId);if(e)recordTrainingAnswer(e,correct,!!(S.q.assisted||{})[S.q.i]||!!dayLedger().learned[g.id]);}
}
function dailyRating(g,r){
  if(r==='again')return r;
  if((S.q.assisted||{})[S.q.i])return 'again';
  if(dayLedger().learned[g.id])return 'hard';
  return r;
}
var dailyStepWithoutRecall=stepView;
stepView=function(el){
  var item=S.q.q[S.q.i],g=item&&byId(item.id);if(!g)return dailyStepWithoutRecall(el);
  markStudyEncounter(g.id);
  if(item.m==='learn')return dailyStepWithoutRecall(el);
  var sp=specAt(S.q.i);
  if(!sp||!sp.recallFirst||S.q.ans[S.q.i]!==undefined||(S.q.assisted||{})[S.q.i])return dailyStepWithoutRecall(el);
  el.innerHTML=headBar()+questionHTML(g,sp)+'<form id="daily-recall-form" class="daily-recall-form"><label for="daily-recall-input">'+tx('Recall the missing grammar before looking at choices.','ลองนึกไวยากรณ์ที่หายไปก่อนดูตัวเลือก')+'</label><input id="daily-recall-input" lang="ja" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="'+tx('Type the missing expression','พิมพ์ไวยากรณ์ที่หายไป')+'"><button class="go primary-study" type="submit">'+tx('Check answer','ตรวจคำตอบ')+'</button></form><p id="daily-recall-notice" role="status"></p><button class="text-btn" data-daily-choices>'+tx('I need the choices','ขอดูตัวเลือก')+'</button>';
  wireHead();save();
  document.getElementById('daily-recall-form').onsubmit=function(event){event.preventDefault();if(event.isComposing)return;checkDailyRecall(document.getElementById('daily-recall-input').value);};
};
function dailyChoices(){
  if(!S.q||S.q.ans[S.q.i]!==undefined)return;
  if(!S.q.assisted)S.q.assisted={};S.q.assisted[S.q.i]=true;save();renderToday();
}
function checkDailyRecall(value){
  if(!S.q||S.q.ans[S.q.i]!==undefined)return;
  var sp=specAt(S.q.i),normal=normaliseAnswer(value);if(!normal)return;
  var at=sp.opts.findIndex(function(o){return normaliseAnswer(o.t)===normal;});
  if(at<0){
    dailyChoices();var notice=document.createElement('p');notice.className='gentle';notice.setAttribute('role','status');
    notice.textContent=simpleText('That expression is outside this question’s answer set; it may still be valid Japanese. Use the choices to check the intended distinction. This attempt counts as assisted.','สำนวนนี้อยู่นอกชุดคำตอบของข้อนี้ แต่อาจเป็นภาษาญี่ปุ่นที่ใช้ได้ ลองดูตัวเลือกเพื่อเทียบความต่าง รอบนี้นับว่าใช้ตัวช่วย');
    document.getElementById('today').prepend(notice);return;
  }
  var i=S.q.i,g=byId(S.q.q[i].id),ok=sp.opts[at].ok;
  S.q.ans[i]=at;S.q.asked++;if(ok)S.q.right++;
  S.att[g.id]=(S.att[g.id]||0)+1;if(ok)S.cor[g.id]=(S.cor[g.id]||0)+1;S.seen[g.id]=1;
  recordDailyAttempt(g,sp,ok);save();renderToday();
}
var feedbackWithoutDrill=verdictHTML;
verdictHTML=function(g,ex,rated){
  var sp=S.q.gen[S.q.i]||{},pick=S.q.ans[S.q.i],q=sp.jlptId&&drillQuestion(sp.jlptId);
  if(!q||pick===undefined)return feedbackWithoutDrill(g,ex,rated);
  var selected=q.options.findIndex(function(o){return o.text===sp.opts[pick].t;}),ok=sp.opts[pick].ok;
  var note=(S.q.assisted||{})[S.q.i]?tx('Choices helped this time. This will return for recall.','รอบนี้ใช้ตัวเลือกช่วย จะกลับมาให้ลองนึกเองอีกครั้ง'):dayLedger().learned[g.id]?tx('First practice done. A later review checks whether it stayed with you.','ฝึกครั้งแรกแล้ว รอบทบทวนภายหลังจะตรวจว่ายังจำได้หรือไม่'):'';
  return drillFeedback(q,selected)+(note?'<p class="gentle">'+note+'</p>':'')+'<button class="go primary-study" data-r="'+(ok?'good':'again')+'">'+tx('Continue','ต่อไป')+' →</button>';
};

/* Backups include question exposure and results, but imported sessions restart. */
var backupWithoutDrill=normaliseBackup,exportWithoutDrill=exportProgress;
normaliseBackup=function(o){
  var out=backupWithoutDrill(o),d=o.drill;
  out.drill={scope:'studied',stats:{},daily:{},lastDaily:{},encountered:{}};
  if(d===undefined)return out;
  function obj(v){return v&&typeof v==='object'&&!Array.isArray(v);}
  function count(v){return Number.isSafeInteger(v)&&v>=0;}
  if(!obj(d)||!['studied','all'].includes(d.scope))throw new Error('Invalid drill settings');
  out.drill.scope=d.scope;
  ['stats','daily','lastDaily','encountered'].forEach(function(k){if(!obj(d[k]))throw new Error('Invalid drill record');});
  Object.keys(d.stats).forEach(function(id){if(!drillQuestion(id))return;var r=d.stats[id];if(!obj(r)||!count(r.attempts)||!count(r.correct)||r.correct>r.attempts||typeof r.last!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(r.last)||isNaN(Date.parse(r.last)))throw new Error('Invalid drill score');out.drill.stats[id]={attempts:r.attempts,correct:r.correct,last:r.last};});
  Object.keys(d.daily).forEach(function(id){if(!drillQuestion(id)&&!trainingExercise(id))return;if(!count(d.daily[id]))throw new Error('Invalid daily exposure');out.drill.daily[id]=d.daily[id];});
  Object.keys(d.lastDaily).forEach(function(id){if(!byId(id))return;var q=drillQuestion(d.lastDaily[id])||trainingExercise(d.lastDaily[id]);if(!q||q.gid!==id)throw new Error('Invalid daily question');out.drill.lastDaily[id]=q.id;});
  Object.keys(d.encountered).forEach(function(id){if(!byId(id))return;if(d.encountered[id]!==1)throw new Error('Invalid Study encounter');out.drill.encountered[id]=1;});
  return out;
};
exportProgress=function(){var out=exportWithoutDrill(),d=drillState();out.v=7;out.drill={scope:d.scope,stats:d.stats,daily:d.daily,lastDaily:d.lastDaily,encountered:d.encountered};return out;};
function drillInit(){
  document.addEventListener('change',function(event){if(event.target.id==='drill-scope'){drillState().scope=event.target.value==='all'?'all':'studied';save();renderToday();}});
  document.addEventListener('click',function(event){
    var b=event.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-start-drill')){startDrill();return;}
    if(b.hasAttribute('data-pause-drill')){drillState().active=false;save();renderToday();window.scrollTo(0,0);return;}
    if(b.hasAttribute('data-drill-answer')){submitDrill(Number(b.dataset.drillAnswer));return;}
    if(b.hasAttribute('data-drill-next')){var s=drillState().session;if(validDrillSession(s)&&s.answers[s.i]){s.i++;save();renderToday();window.scrollTo(0,0);}return;}
    if(b.hasAttribute('data-daily-choices')){dailyChoices();return;}
  });
}
