const test=require('node:test'),assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');

function daily(a,id='n2k01',box=2,last='2026-09-01'){
 a.reset();a.run(`S.box['${id}']=${box};S.last['${id}']='${last}';practiceOnePattern('${id}');`);
}
function correct(a){a.click('today','.opt',{i:String(a.run('specAt(S.q.i).opts.findIndex(o=>o.ok)'))});}

test('targeted practice leaves an old drill and opens the requested daily card',()=>{
 const a=loadApp();a.reset();a.run('drillState().scope="all";startDrill();');
 const saved=a.snapshot('drillState().session');a.run('practiceOnePattern("n2k01");');
 assert.equal(a.run('drillState().active'),false);assert.equal(a.run('S.q.q[S.q.i].id'),'n2k01');
 assert.match(a.node('today').innerHTML,/class="opt/);assert.doesNotMatch(a.node('today').innerHTML,/data-drill-answer/);
 assert.deepEqual(a.snapshot('drillState().session'),saved);
});

test('a different targeted session preserves the old session for later resumption',()=>{
 const a=loadApp();a.reset();a.run('startTraining("mixed",null,"n3a01");');
 const old=a.snapshot('masteryState().session');a.run('practiceOnePattern("n2a03");');
 assert.equal(a.run('trainingExercise(masteryState().session.queue[0].id).gid'),'n2a03');
 assert.deepEqual(a.snapshot('masteryState().pausedSessions[0]'),old);
 a.run('masteryState().session.i=masteryState().session.queue.length;');a.documentClick({finish:'home'},['data-finish']);
 assert.deepEqual(a.snapshot('masteryState().session'),old);
 a.run('practiceOnePattern("n2k01");');assert.equal(a.run('S.q.q[S.q.i].id'),'n2k01');
 assert.match(a.node('today').innerHTML,/class="opt/);
});

test('correct daily practice before the due date leaves the schedule unchanged',()=>{
 const a=loadApp();daily(a,'n2k01',4,'2026-09-18');correct(a);a.click('today','[data-r]',{r:'good'});
 assert.equal(a.run('S.box.n2k01'),4);assert.equal(a.run('S.last.n2k01'),'2026-09-18');
 assert.equal(a.run('S.q.rate[0]'),'practice');
});

test('opening a relevant lesson before answering prevents an unaided daily promotion',()=>{
 const a=loadApp();daily(a);a.run('openDetail("n2k01");closeSheet();');
 assert.equal(a.run('S.q.assisted[S.q.i]'),true);correct(a);a.click('today','[data-r]',{r:'good'});
 assert.equal(a.run('S.box.n2k01'),1);assert.equal(a.run('S.q.rate[0]'),'again');
});

test('looking back at a relevant answer counts as help but unrelated references do not',()=>{
 const a=loadApp();daily(a);a.run('openDetail("n2k02");closeSheet();');
 assert.equal(a.run('!!(S.q.assisted||{})[S.q.i]'),false);
 a.run('moveDailyCard(-1,0,{id:"n2k01",m:"learn"});S.q.i=1;moveStudyHistory("daily",-1);');
 assert.equal(a.run('S.q.assisted[1]'),true);assert.equal(a.run('S.q.i'),1);
});

test('a relevant lesson reference also prevents targeted exercise retention credit',()=>{
 const a=loadApp();a.reset();a.run('startTraining("mixed",null,"n2a03");renderTraining();openDetail("n2a03");closeSheet();var exercise=trainingExercise(masteryState().session.queue[0].id);answerTraining(exercise.answer,false);');
 assert.equal(a.run('masteryState().session.results[0].assisted'),true);
 assert.equal(a.run('masteryState().items[exercise.id].stage'),0);
});

test('changing settings keeps pending feedback and counts the answer only once',()=>{
 const a=loadApp();daily(a);a.run('S.q.assisted[0]=true;');correct(a);
 const question=a.snapshot('S.q.gen[0]'),answer=a.run('S.q.ans[0]'),attempts=a.run('S.att.n2k01');
 a.run('setNewPatternLimit(20);S.maxRev=60;buildToday(true);');
 assert.deepEqual(a.snapshot('S.q.gen[0]'),question);assert.equal(a.run('S.q.ans[0]'),answer);
 assert.equal(a.run('S.q.assisted[0]'),true);assert.equal(a.run('S.q.q.filter(c=>c.id==="n2k01"&&c.m==="quiz").length'),1);
 correct(a);assert.equal(a.run('S.att.n2k01'),attempts);
 a.click('today','[data-r]',{r:'good'});assert.equal(a.run('S.q.i'),1);assert.equal(a.run('S.box.n2k01'),1);
});

test('queue insertions and moves preserve saved options, answers and help on their cards',()=>{
 const a=loadApp();daily(a);a.run('S.q.assisted[0]=true;');const question=a.snapshot('S.q.gen[0]');
 a.run('moveDailyCard(-1,0,{id:"n2k02",m:"quiz"});');
 assert.deepEqual(a.snapshot('S.q.gen[1]'),question);assert.equal(a.run('S.q.assisted[1]'),true);
 a.run('moveDailyCard(1,0);');assert.deepEqual(a.snapshot('S.q.gen[0]'),question);assert.equal(a.run('S.q.assisted[0]'),true);
});

test('double tapping training Next cannot skip an unanswered exercise',()=>{
 const a=loadApp();a.reset();a.run('startTraining("mixed");answerTraining(trainingExercise(masteryState().session.queue[0].id).answer,false);');
 a.documentClick({},['data-next-training']);a.documentClick({},['data-next-training']);
 assert.equal(a.run('masteryState().session.i'),1);
});

test('failed storage writes leave all live session data available for recovery',()=>{
 const a=loadApp();daily(a);a.run('S.q.gen[3]={version:3,kind:"recall",opts:[]};');
 const before=a.snapshot('S.q');a.context.localStorage.setItem=()=>{throw new Error('QuotaExceededError');};a.run('save();');
 assert.deepEqual(a.snapshot('S.q'),before);assert.equal(a.run('_saveFail'),true);
 assert.equal(a.run('exportProgress().box.n2k01'),2);
});

test('newer snapshots replace removed state instead of resurrecting reset sessions',()=>{
 const a=loadApp();a.reset();a.run('startTraining("mixed");drillState().scope="all";startDrill();save();');
 a.storage.set('sujimichi.v4',JSON.stringify({t:a.run('_stamp')+1,box:{},lang:'th',days:[]}));
 assert.equal(a.run('reloadIfNewer()'),true);assert.equal(a.run('S.lang'),'th');
 assert.equal(a.run('!!S.mastery'),false);assert.equal(a.run('!!S.drill'),false);
 a.run('buildToday();renderToday();');assert.equal(a.run('hasSavedPractice()'),false);
});

test('Copy reports asynchronous failure and preserves a restore draft',async()=>{
 const a=loadApp(),b=a.node('bkcopy'),bk=a.node('bk');bk.removeAttribute('readonly');bk.value='restore draft';
 a.context.navigator.clipboard={writeText:async()=>{throw new Error('denied');}};a.context.document.execCommand=()=>false;
 await b.listeners.click.call(b);assert.match(b.textContent,/Copy unavailable/);assert.equal(bk.hasAttribute('readonly'),false);assert.equal(bk.value,'restore draft');
 a.context.navigator.clipboard.writeText=async()=>{};await b.listeners.click.call(b);assert.equal(b.textContent,'Copied ✓');
});

test('study-method notes and practice index disclose the limits in both languages',()=>{
 const a=loadApp();a.run('drawRecord();');assert.match(a.node('study-method-body').innerHTML,/not validated memory measurements/);
 assert.match(a.run('strengthBlock("n2a03")'),/not a recall probability/);
 a.run('S.lang="th";drawRecord();');assert.match(a.node('study-method-body').innerHTML,/งานวิจัย/);
});

test('targeted mistakes automatically return as the matching daily exercise on a later day',()=>{
 const a=loadApp();a.reset({lv:'N2',newPerDay:0});
 a.run('startTraining("mixed",null,"n2a03");var missed=trainingExercise(masteryState().session.queue[0].id);answerTraining("",true);');
 a.run('buildToday(true);');assert.equal(a.run('S.q.q.length'),0,'same-day session retry already covers this');
 a.setTime('2026-09-20T12:00:00');a.run('masteryState().session=null;buildToday();startStudy();');
 assert.equal(a.run('S.q.q[0].exerciseId'),a.run('missed.id'));assert.equal(a.run('specAt(0).exerciseId'),a.run('missed.id'));
 correct(a);a.click('today','[data-r]',{r:'good'});
 assert.equal(a.run('masteryState().items[missed.id].mistake'),false);
 assert.equal(a.run('masteryState().items[missed.id].stage'),1);
 a.run('buildToday(true);');assert.equal(a.run('remaining()'),0);
});

test('successful targeted exercises reappear only when due and respect the level filter',()=>{
 const a=loadApp();a.reset({lv:'N2',newPerDay:0});
 a.run('var e=MASTERY_EXERCISES.find(e=>e.gid==="n2a03");S.mastery.items={};S.mastery.items[e.id]={attempts:2,correct:2,stage:2,mistake:false,last:today(),due:"2026-09-22"};');
 a.setTime('2026-09-20T12:00:00');a.run('buildToday();');assert.equal(a.run('remaining()'),0);
 a.setTime('2026-09-22T12:00:00');a.run('buildToday();');assert.equal(a.run('S.q.q[0].exerciseId'),a.run('e.id'));
 a.run('S.lv="N3";buildToday(true);');assert.equal(a.run('remaining()'),0);
});

