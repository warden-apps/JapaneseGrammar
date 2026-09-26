/* The exam plan: a countdown to the JLPT and the daily pace that meets every
   pattern at the chosen level in time, keeping the last two weeks for review.
   The JLPT is held on the first Sunday of July and of December. */
var PLAN_PACES=[3,5,10,15];
var PLAN_REVIEW_LIMITS=[20,40,60,999];
var PLAN_MONTHS_EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var PLAN_MONTHS_TH=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

function planValidDate(s){return typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&fmt(new Date(s+'T12:00:00'))===s;}
function firstSunday(year,month){var d=new Date(year,month,1,12);d.setDate(1+(7-d.getDay())%7);return fmt(d);}
function nextJlptDate(from){
  var y=+from.slice(0,4);
  return [firstSunday(y,6),firstSunday(y,11),firstSunday(y+1,6),firstSunday(y+1,11)].find(function(d){return d>=from;});
}
function examDate(){return planValidDate(S.exam)?S.exam:nextJlptDate(today());}
function planDate(s){
  var d=new Date(s+'T12:00:00');
  return S.lang==='th'?d.getDate()+' '+PLAN_MONTHS_TH[d.getMonth()]+' '+(d.getFullYear()+543):d.getDate()+' '+PLAN_MONTHS_EN[d.getMonth()]+' '+d.getFullYear();
}
function examPlan(){
  var exam=examDate(),left=dayGap(today(),exam),p=pool(),total=p.length;
  var fresh=p.filter(function(g){return boxOf(g.id)===0;}).length;
  /* Keep up to two weeks at the end for review only. */
  var buffer=Math.min(14,Math.max(0,Math.floor(left/5))),learnDays=Math.max(1,left-buffer);
  var need=fresh?Math.ceil(fresh/learnDays):0,pace=S.newPerDay||0,daysAtPace=pace?Math.ceil(fresh/pace):Infinity;
  return {exam:exam,left:left,total:total,started:total-fresh,fresh:fresh,buffer:buffer,learnDays:learnDays,
    deadline:addStudyDays(today(),learnDays-1),need:need,pace:pace,
    finish:pace&&fresh?addStudyDays(today(),daysAtPace-1):null,onTrack:!fresh||daysAtPace<=learnDays,
    suggest:PLAN_PACES.find(function(v){return v>=need;})||PLAN_PACES[PLAN_PACES.length-1]};
}
/* Each pattern is met once and reviewed about four times (1, 3, 7, 21 days):
   roughly three minutes a day for every new pattern per day. */
function planMinutes(pace){return Math.max(5,Math.round(pace*3/5)*5);}
function examPlanHTML(){
  var pl=examPlan(),level=S.lv==='all'?'N3 + N2':S.lv,pct=pl.total?Math.round(pl.started/pl.total*100):0;
  var h='<section class="exam-plan'+(pl.onTrack?'':' is-behind')+'"><div class="simple-kicker">'+tx('EXAM PLAN','แผนเตรียมสอบ')+'</div>';
  h+='<div class="plan-head"><div><b>'+tx('JLPT '+(S.lv==='N3'?'N3':'N2')+' exam','สอบ JLPT '+(S.lv==='N3'?'N3':'N2'))+'</b><span>'+esc(planDate(pl.exam))+'</span></div>';
  h+='<div class="plan-days"><b>'+Math.max(0,pl.left)+'</b><span>'+tx(pl.left===1?'day left':'days left','วันก่อนสอบ')+'</span></div></div>';
  h+='<div class="plan-bar" aria-hidden="true"><i style="width:'+pct+'%"></i></div>';
  h+='<p class="plan-count">'+tx(pl.started+' of '+pl.total+' patterns started · '+level,'เริ่มเรียนแล้ว '+pl.started+' จาก '+pl.total+' รูป · '+level)+'</p>';
  if(pl.left<0){
    h+='<p>'+tx('That exam date has passed. Set your next exam date in Progress.','วันสอบนี้ผ่านไปแล้ว ตั้งวันสอบครั้งถัดไปได้ที่หน้าความคืบหน้า')+'</p>';
  }else if(!pl.fresh){
    h+='<p>'+tx('You have met every pattern at this level. Keep doing your reviews every day until the exam.','คุณเรียนครบทุกรูปในระดับนี้แล้ว ทบทวนทุกวันต่อไปจนถึงวันสอบ')+'</p>';
  }else if(pl.onTrack){
    h+='<p>'+tx('On track. At '+pl.pace+' new patterns a day you will have met them all by '+planDate(pl.finish)+', with '+dayGap(pl.finish,pl.exam)+' days left for review.',
      'ทันแผน เรียนวันละ '+pl.pace+' รูป จะเรียนครบภายใน '+planDate(pl.finish)+' และเหลือเวลาทบทวน '+dayGap(pl.finish,pl.exam)+' วัน')+'</p>';
  }else{
    h+='<p>'+(pl.pace?tx('At '+pl.pace+' new patterns a day you would meet the last one on '+planDate(pl.finish)+'. ','ถ้าเรียนวันละ '+pl.pace+' รูป จะเรียนรูปสุดท้ายวันที่ '+planDate(pl.finish)+' '):'')+
      tx('To meet all '+pl.fresh+' remaining patterns by '+planDate(pl.deadline)+' and keep the last '+pl.buffer+' days for review, learn at least '+pl.need+' a day.',
        'ถ้าจะเรียนอีก '+pl.fresh+' รูปให้ครบภายใน '+planDate(pl.deadline)+' และเก็บ '+pl.buffer+' วันสุดท้ายไว้ทบทวน ต้องเรียนอย่างน้อยวันละ '+pl.need+' รูป')+'</p>';
    h+='<button class="go quiet plan-pace" data-plan-pace="'+pl.suggest+'">'+tx('Learn '+pl.suggest+' a day','เรียนวันละ '+pl.suggest+' รูป')+'</button>';
    if(pl.need>PLAN_PACES[PLAN_PACES.length-1])h+='<p class="gentle">'+tx('Even 15 a day will not cover everything in time. Put the N2 patterns first by choosing N2 at the top.','แม้วันละ 15 รูปก็ยังไม่ทัน ให้เลือก N2 ด้านบนเพื่อเรียนรูป N2 ก่อน')+'</p>';
  }
  if(pl.left>=0&&pl.fresh)h+='<p class="gentle">'+tx('About '+planMinutes(pl.onTrack?pl.pace:pl.suggest)+' minutes a day once reviews build up. No app can promise a pass, but meeting every pattern early and reviewing it on schedule gives you the best chance.',
    'ประมาณวันละ '+planMinutes(pl.onTrack?pl.pace:pl.suggest)+' นาทีเมื่อรอบทบทวนเริ่มสะสม ไม่มีแอปไหนรับประกันว่าสอบผ่าน แต่การเรียนให้ครบเร็วและทบทวนตามรอบคือโอกาสที่ดีที่สุด')+'</p>';
  return h+'</section>';
}
function usePlanPace(pace){
  if(PLAN_PACES.indexOf(pace)<0)return;
  S.newPerDay=pace;
  /* Reviews grow with the pace: about four per new pattern each day. */
  S.maxRev=Math.max(S.maxRev||0,PLAN_REVIEW_LIMITS.find(function(v){return v>=pace*4;})||999);
  save();buildToday(true);renderToday();drawRecord();updBadge();
}

var homeWithoutPlan=renderStudyHome;
renderStudyHome=function(el){
  homeWithoutPlan(el);
  var at=el.innerHTML.indexOf('<section class="drill-launch"');
  el.innerHTML=at<0?el.innerHTML+examPlanHTML():el.innerHTML.slice(0,at)+examPlanHTML()+el.innerHTML.slice(at);
};
var recordWithoutPlan=drawRecord;
drawRecord=function(){
  recordWithoutPlan();
  var input=document.getElementById('exam-date');if(input&&input!==document.activeElement)input.value=examDate();
};

/* Backups carry the exam date; older backups simply have none. */
var exportWithoutPlan=exportProgress,backupWithoutPlan=normaliseBackup;
exportProgress=function(){var out=exportWithoutPlan();if(planValidDate(S.exam))out.exam=S.exam;return out;};
normaliseBackup=function(o){
  var out=backupWithoutPlan(o);
  if(o.exam!==undefined){if(!planValidDate(o.exam))throw new Error('Invalid exam date');out.exam=o.exam;}
  return out;
};
function planInit(){
  var input=document.getElementById('exam-date');
  if(input){input.value=examDate();input.addEventListener('change',function(){if(!planValidDate(input.value))return;S.exam=input.value;save();renderToday();drawRecord();});}
  document.addEventListener('click',function(event){
    var b=event.target.closest('button');if(!b)return;
    if(b.dataset.planPace){usePlanPace(Number(b.dataset.planPace));return;}
  });
}
