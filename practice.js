/* Real practice for every pattern.
   Authored questions come first: the JLPT bank, then the written exercises.
   Every other pattern gets two kinds of question built from its own lesson:
     meaning  an example with the grammar marked: choose what it means
     pick     the same kind of example with the grammar blanked and the
              translation shown: choose the grammar that fills the gap
   Wrong options come from other branches of the grammar map. Anything in the
   answer's own branch, comparison table or "tell it apart" list is left out,
   so a wrong option never means the same thing as the right one. */
var PRACTICE_VERSION=5;
var PRACTICE_INDEX=null;
var PRACTICE_STOP={the:1,and:1,for:1,not:1,but:1,you:1,with:1,that:1,this:1,one:1,its:1,are:1,was:1,has:1,have:1,had:1,been:1,from:1,what:1,when:1,than:1,more:1,just:1,very:1,some:1,someone:1,something:1,thing:1,things:1,all:1,any:1,can:1,will:1,would:1,your:1,out:1,own:1,get:1,got:1,way:1,too:1,also:1,even:1,only:1,into:1,who:1,how:1,don:1,didn:1,isn:1,doesn:1,off:1,let:1,like:1,such:1,being:1,both:1,each:1,does:1,did:1,done:1,doing:1,make:1,made:1,use:1,used:1,said:1,say:1,there:1,then:1,now:1,here:1};

function practiceIndex(){
  if(PRACTICE_INDEX)return PRACTICE_INDEX;
  var home={},near={};
  function link(a,b){if(a===b)return;(near[a]=near[a]||{})[b]=1;(near[b]=near[b]||{})[a]=1;}
  function linkAll(ids){ids.forEach(function(a){ids.forEach(function(b){link(a,b);});});}
  (typeof GRAMMAR_MAP==='undefined'?[]:GRAMMAR_MAP).forEach(function(f){f.branches.forEach(function(b){
    b.ids.forEach(function(id){home[id]={family:f.id,branch:f.id+'/'+b.id};});
    /* "see" lists a second meaning of an entry that lives in another branch */
    linkAll(b.ids.concat(b.see||[]));
  });});
  simpleGroups().forEach(function(group){linkAll(group.members.map(function(m){return m.id;}));});
  GRAMMAR.forEach(function(g){var guide=lessonGuide(g);(guide&&guide.compare||[]).forEach(function(o){link(g.id,o.id);});});
  PRACTICE_INDEX={home:home,near:near};
  return PRACTICE_INDEX;
}
function practiceWords(g){
  /* Content words of the short meaning, roughly stemmed: seems → seem. */
  return String(g.se||'').toLowerCase().split(/[^a-z]+/).filter(function(w){return w.length>2&&!PRACTICE_STOP[w];})
    .map(function(w){return w.length>5?w.replace(/(ing|ed|es|s)$/,''):w;});
}
/* Adverbs and connectors are single words; everything else attaches to a word. */
function practiceWordish(g){return g.cat==='副詞'||g.cat==='接続詞';}
/* Wrong options: never a near-synonym, preferably the same level, and one from
   the answer's own family when possible so the choice still takes thought. */
function practiceDistractors(g,n){
  var ix=practiceIndex(),home=ix.home[g.id]||{},near=ix.near[g.id]||{},words=practiceWords(g);
  var pool=GRAMMAR.filter(function(o){
    if(o.id===g.id||near[o.id])return false;
    var h=ix.home[o.id];if(h&&home.branch&&h.branch===home.branch)return false;
    return !practiceWords(o).some(function(w){return words.indexOf(w)>=0;});
  });
  var out=[],used={},branches={},type=practiceWordish(g);
  words.forEach(function(w){used[w]=1;});
  function take(list,k){
    shuffle(list).forEach(function(o){
      if(k<=0||out.indexOf(o)>=0)return;
      /* Wrong options should not resemble each other either: one per branch. */
      var b=(ix.home[o.id]||{}).branch;
      if((b&&branches[b])||practiceWords(o).some(function(w){return used[w];}))return;
      out.push(o);if(b)branches[b]=1;practiceWords(o).forEach(function(w){used[w]=1;});k--;
    });
  }
  function sameType(o){return practiceWordish(o)===type;}
  take(pool.filter(function(o){var h=ix.home[o.id];return h&&home.family&&h.family===home.family&&o.lv===g.lv&&sameType(o);}),1);
  take(pool.filter(function(o){return o.lv===g.lv&&sameType(o);}),n-out.length);
  take(pool.filter(sameType),n-out.length);
  take(pool.slice(),n-out.length);
  return out.slice(0,n);
}
var PRACTICE_ENDING=/^(?:[っん]?[ただてで]|く|ら|す)?(?:ない|なかった|ないで|ます|ました|ません|ましょう|です|でした|だった|だろう|でしょう|ている|ていた|ています|ていない|てください|ください|なさい|なった|なる|た|て|る|よ|ね)*(?=[。、！？!?」』）)\s]|$)/;
function practiceBlank(j,p){
  var spans=grammarMatch(j,p);if(!spans.length)return null;
  /* The gap takes the verb ending too, so it never splits a word: 会え＿＿。 not 会え＿＿った。 */
  var last=spans[spans.length-1],tail=j.slice(last[1]).match(PRACTICE_ENDING);
  if(tail&&tail[0])spans[spans.length-1]=[last[0],last[1]+tail[0].length];
  var ct='',at=0,len=0;
  spans.forEach(function(s){ct+=j.slice(at,s[0])+'\u0001';at=s[1];len+=s[1]-s[0];});
  ct+=j.slice(at);
  /* A gap that swallows the sentence tests nothing. */
  if(len/j.length>0.75)return null;
  return {ct:ct,key:spans.map(function(s){return j.slice(s[0],s[1]);}).join('…')};
}
function practiceExampleIndex(g){
  /* Right after the lesson, practise on an example the card did not show. */
  var shown=dayLedger().learned[g.id]&&!lessonGuide(g)?0:-1,choices=[];
  g.ex.forEach(function(e,i){if(i!==shown||g.ex.length===1)choices.push(i);});
  return choices[Math.floor(Math.random()*choices.length)];
}
function makePracticeSpec(g){
  var wrong=practiceDistractors(g,3);if(wrong.length<3)return null;
  var att=S.att[g.id]||0,exIdx=practiceExampleIndex(g),ex=g.ex[exIdx],blank=null;
  /* First meet the meaning, then alternate: fill the gap, check the meaning. */
  if(att%2===1){
    blank=practiceBlank(ex.j,g.p);
    if(!blank)for(var i=0;i<g.ex.length&&!blank;i++){blank=practiceBlank(g.ex[i].j,g.p);if(blank){exIdx=i;ex=g.ex[i];}}
  }
  var opts=shuffle([{gid:g.id,ok:true}].concat(wrong.map(function(o){return {gid:o.id,ok:false};})));
  opts.forEach(function(o){var x=byId(o.gid);o.t=blank?x.p:x.se;});
  var spec={version:PRACTICE_VERSION,gen:1,kind:blank?'pick':'meaning',exIdx:exIdx,example:ex,opts:opts};
  if(blank){spec.ct=blank.ct;spec.key=blank.key;}
  return spec;
}

var makeSpecWithoutPractice=makeSpec;
makeSpec=function(g,base){
  var spec=makeSpecWithoutPractice(g,base);
  if(spec&&spec.kind==='recall'){var made=makePracticeSpec(g);if(made)spec=made;}
  if(spec)spec.version=PRACTICE_VERSION;
  return spec;
};
specAt=function(i){
  if(S.q.gen[i]&&(S.q.gen[i].version===PRACTICE_VERSION||S.q.ans[i]!==undefined))return S.q.gen[i];
  var g=byId(S.q.q[i].id);if(!g)return null;
  S.q.gen[i]=makeSpec(g);save();return S.q.gen[i];
};

function practiceOptionHTML(sp,o){
  var x=byId(o.gid)||{p:o.t,se:o.t,st:o.t};
  return sp.kind==='pick'?'<span lang="ja">'+esc(x.p)+'</span>':tx(x.se,x.st);
}
function practiceQuestionHTML(g,sp){
  var ex=sp.example||g.ex[sp.exIdx]||g.ex[0];
  if(sp.kind==='pick')return '<div class="simple-kicker">'+tx('FILL THE GAP','เติมช่องว่าง')+'</div><p class="gentle">'+tx('Which grammar fits the gap?','ไวยากรณ์ไหนเติมช่องนี้ได้?')+'</p><div class="question-sentence" lang="ja">'+esc(sp.ct).split('\u0001').join('<span class="blank">＿＿</span>')+'</div><p class="question-translation">'+tx(ex.e,ex.t)+'</p>';
  var marked=grammarMatch(ex.j,g.p).length>0;
  return '<div class="simple-kicker">'+tx('WHAT DOES IT MEAN?','แปลว่าอะไร?')+'</div><p class="gentle">'+tx(marked?'What does the marked grammar mean in this sentence?':'What does this grammar mean in the sentence below?',marked?'ไวยากรณ์ที่ขีดเส้นไว้ในประโยคนี้แปลว่าอะไร?':'ไวยากรณ์นี้ในประโยคด้านล่างแปลว่าอะไร?')+'</p>'+(marked?'':'<p class="practice-target" lang="ja">'+esc(g.p)+'</p>')+'<div class="question-sentence" lang="ja">'+markGrammar(ex.j,g.p)+'</div>';
}
function practiceStepView(el,g,sp){
  var i=S.q.i,prev=S.q.ans[i],ex=sp.example||g.ex[sp.exIdx]||g.ex[0];
  var h=headBar()+practiceQuestionHTML(g,sp)+'<div class="opts practice-options">';
  sp.opts.forEach(function(o,n){
    var cls='opt practice-opt'+(sp.kind==='pick'?' pick-opt':' meaning-opt');
    if(prev!==undefined)cls+=o.ok?' right':(n===prev?' wrong':' dim');
    h+='<button class="'+cls+'" data-i="'+n+'"'+(prev!==undefined?' disabled':'')+'>'+practiceOptionHTML(sp,o)+'</button>';
  });
  h+='</div><div class="verdict'+(prev!==undefined?' on':'')+'" id="verdict">'+(prev!==undefined?verdictHTML(g,ex,S.q.rate[i]):'')+'</div>';
  el.innerHTML=h;wireHead();
  if(prev!==undefined)wireVerdict(g);
}
var stepViewWithoutPractice=stepView;
stepView=function(el){
  var item=S.q.q[S.q.i],g=item&&byId(item.id);
  if(!g||item.m==='learn')return stepViewWithoutPractice(el);
  var sp=specAt(S.q.i);
  if(!sp||!sp.gen)return stepViewWithoutPractice(el);
  markStudyEncounter(g.id);
  practiceStepView(el,g,sp);
};

function practiceMemoryHTML(g){
  var h='';
  if(g.lit_en)h+='<div class="feedback-point"><b>'+tx('Remember it','จำง่าย ๆ')+'</b><p>'+tx(g.lit_en,g.lit_th)+'</p></div>';
  if(g.like)h+='<div class="feedback-point"><b>'+tx('In easier Japanese','พูดง่าย ๆ ว่า')+'</b><p><span lang="ja">≈ '+esc(g.like)+'</span> · '+tx(g.like_en,g.like_th)+'</p></div>';
  return h;
}
function practiceFeedback(g,sp,pick){
  var chosen=sp.opts[pick],ok=!!(chosen&&chosen.ok),ex=sp.example||g.ex[sp.exIdx]||g.ex[0];
  var h='<section class="simple-feedback '+(ok?'is-correct':'needs-review')+'" role="status"><h2>'+tx(ok?'Correct':'Not quite',ok?'ถูกต้อง':'ยังไม่ถูก')+' · <span lang="ja">'+esc(g.p)+'</span></h2><p class="meaning-line">'+tx(g.se,g.st)+'</p>';
  h+=exampleCard(ex,g);
  if(!ok&&chosen){var other=byId(chosen.gid);if(other)h+='<div class="picked-reason"><b>'+tx('Your answer','คำตอบของคุณ')+'</b><p>'+(sp.kind==='pick'?'<span lang="ja">'+esc(other.p)+'</span> = '+tx(other.se,other.st):'“'+tx(other.se,other.st)+'” = <span lang="ja">'+esc(other.p)+'</span>')+'</p></div>';}
  h+=practiceMemoryHTML(g);
  h+='<details class="optional-detail"><summary>'+tx('What the other choices mean','ตัวเลือกอื่นแปลว่าอะไร')+'</summary>';
  sp.opts.forEach(function(o,n){if(o.ok||n===pick)return;var x=byId(o.gid);if(x)h+='<div class="option-reason"><b lang="ja">'+esc(x.p)+'</b><p>'+tx(x.se,x.st)+'</p></div>';});
  h+='</details><button class="text-btn" data-detail="'+g.id+'">'+tx('See the short lesson','ดูบทเรียนสั้น')+'</button></section>';
  return h;
}
var verdictWithoutPractice=verdictHTML;
verdictHTML=function(g,ex,rated){
  var sp=S.q.gen[S.q.i]||{},pick=S.q.ans[S.q.i];
  if(!sp.gen||pick===undefined)return verdictWithoutPractice(g,ex,rated);
  var ok=!!(sp.opts[pick]&&sp.opts[pick].ok);
  var note=dayLedger().learned[g.id]&&ok?'<p class="gentle">'+tx('First practice done. A later review checks whether it stayed with you.','ฝึกครั้งแรกแล้ว รอบทบทวนภายหลังจะตรวจว่ายังจำได้หรือไม่')+'</p>':'';
  return practiceFeedback(g,sp,pick)+note+'<button class="go primary-study" data-r="'+(ok?'good':'again')+'">'+tx('Continue','ต่อไป')+' →</button>';
};
