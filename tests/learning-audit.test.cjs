const test=require('node:test'),assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');
function question(a,id){a.run(`drillState().scope='all';drillState().active=true;drillState().session={version:1,scope:'all',lv:S.lv,queue:[{id:${JSON.stringify(id)},options:[2,0,3,1]}],i:0,answers:{}};`);}

test('all 181 questions correctly score every option, give feedback, and ignore a second answer',()=>{
 const a=loadApp(),bank=a.snapshot('JLPT_QUESTIONS');assert.equal(bank.length,181);
 for(const q of bank)for(let pick=0;pick<4;pick++){
  a.reset();question(a,q.id);a.run(`submitDrill(${pick});submitDrill(${(pick+1)%4});`);
  assert.deepEqual(a.snapshot(`drillState().stats[${JSON.stringify(q.id)}]`),{attempts:1,correct:pick===q.answer?1:0,last:a.run('today()')},q.id);
  assert.equal(a.run('drillState().session.answers[0].correct'),pick===q.answer,q.id);
  assert.match(a.node('today').innerHTML,/role="status"/);assert.deepEqual(a.snapshot('S.box'),{});
  assert.equal(a.run(`!!drillState().reviews[${JSON.stringify(q.id)}]`),pick!==q.answer);
 }
});

test('missed drill questions return later; same-day success and help cannot clear them',()=>{
 const a=loadApp();a.reset({lv:'N2'});question(a,'j18');a.run('submitDrill(1)');
 assert.deepEqual(a.snapshot('drillState().reviews.j18'),{last:'2026-09-19',due:'2026-09-20'});
 question(a,'j18');a.run('submitDrill(0)');assert.equal(a.run('drillReviewDue("j18")'),false);assert.ok(a.run('drillState().reviews.j18'));
 a.setTime('2026-09-20T12:00:00');assert.equal(a.run('drillReviewDue("j18")'),true);
 for(let i=0;i<25;i++)assert.equal(a.run('makeDrillQueue("all")[0].id'),'j18');
 question(a,'j18');a.run('openDetail("n2a25");closeSheet();submitDrill(0)');
 assert.equal(a.run('drillState().reviews.j18.due'),'2026-09-21');
 a.setTime('2026-09-21T12:00:00');question(a,'j18');a.run('submitDrill(0)');assert.equal(a.run('!!drillState().reviews.j18'),false);
});

test('due passage mistakes return as a complete ordered unit within the round cap',()=>{
 const a=loadApp();a.reset({lv:'N2'});a.run('drillState().reviews["kanzen-text-2"]={last:"2026-09-17",due:"2026-09-18"};');
 for(let n=0;n<50;n++){
  const queue=a.snapshot('makeDrillQueue("all")');assert.ok(queue.length<=10);assert.equal(new Set(queue.map(x=>x.id)).size,queue.length);
  assert.deepEqual(queue.slice(0,3).map(x=>x.id),['kanzen-text-1','kanzen-text-2','kanzen-text-3']);
  const qs=queue.map(x=>a.snapshot(`drillQuestion(${JSON.stringify(x.id)})`));
  assert.ok(qs.some(q=>q.source));assert.deepEqual([...new Set(qs.map(q=>q.kind))].sort(),['choice','order','text']);
  for(const q of qs.filter(q=>q.passage)){
   const expected=a.snapshot(`JLPT_QUESTIONS.filter(q=>q.passage===${JSON.stringify(q.passage)}).map(q=>q.id)`);
   const start=queue.findIndex(x=>x.id===expected[0]);assert.deepEqual(queue.slice(start,start+expected.length).map(x=>x.id),expected);
  }
 }
});

test('known sentence-gap mistakes enter daily Study but unseen grammar and wrong levels do not',()=>{
 const a=loadApp();a.reset({lv:'N2',newPerDay:0});question(a,'j18');a.run('submitDrill(1)');
 a.setTime('2026-09-20T12:00:00');a.run('drillState().active=false;buildToday();');assert.equal(a.run('remaining()'),0);
 a.run('markStudyEncounter("n2a25");buildToday(true);');assert.equal(a.run('S.q.q[0].jlptId'),'j18');
 assert.equal(a.run('specAt(0).jlptId'),'j18');
 a.run('S.lv="N3";buildToday(true);');assert.equal(a.run('remaining()'),0);
 a.run('S.lv="N2";S.maxRev=0;buildToday(true);');assert.equal(a.run('remaining()'),0);
 a.run('S.maxRev=20;buildToday(true);startStudy(true);');
 a.click('today','.opt',{i:a.run('specAt(0).opts.findIndex(o=>o.ok)')});a.click('today','[data-r]',{r:'good'});
 assert.equal(a.run('!!drillState().reviews.j18'),false);a.run('buildToday(true);');assert.equal(a.run('remaining()'),0);
});

test('question rotation shares exposure across daily Study and random drills',()=>{
 const a=loadApp();a.reset({lv:'N2'});a.run('drillState().stats.j18={attempts:50,correct:50,last:"2026-09-18"};');
 for(let i=0;i<15;i++)assert.equal(a.run('makeSpec(byId("n2a25")).jlptId'),'n2-transfer-22');
 a.run('drillState().daily["n2-transfer-22"]=100;');assert.equal(a.run('makeSpec(byId("n2a25")).jlptId'),'j18');
 a.run('drillState().lastPractised.j18=today();');assert.equal(a.run('makeSpec(byId("n2a25")).jlptId'),'n2-transfer-22');
});

test('a saved daily question practised in a drill just now cannot earn a retention promotion',()=>{
 const a=loadApp();a.reset({lv:'N2',newPerDay:0,box:{n2a25:3},last:{n2a25:'2026-09-01'}});
 a.run('buildToday();startStudy(true);var saved=specAt(S.q.i);');const id=a.run('saved.jlptId');
 question(a,id);a.run(`submitDrill(drillQuestion(${JSON.stringify(id)}).answer);drillState().active=false;renderToday();`);
 a.click('today','.opt',{i:a.run('saved.opts.findIndex(o=>o.ok)')});a.click('today','[data-r]',{r:'good'});
 assert.equal(a.run('S.box.n2a25'),3);assert.equal(a.run('S.last.n2a25'),'2026-09-01');assert.equal(a.run('S.q.rate[0]'),'practice');
});

test('review due dates and exposure survive backups; invalid dates reject without changing progress',()=>{
 const a=loadApp();a.reset();question(a,'j18');a.run('submitDrill(1);var backup=exportProgress();');
 assert.deepEqual(a.snapshot('normaliseBackup(backup).drill.reviews'),a.snapshot('drillState().reviews'));
 assert.deepEqual(a.snapshot('normaliseBackup(backup).drill.lastPractised'),a.snapshot('drillState().lastPractised'));
 const old=a.snapshot('backup');delete old.drill.reviews;delete old.drill.lastPractised;
 assert.deepEqual(a.snapshot(`normaliseBackup(${JSON.stringify(old)}).drill.reviews`),{});
 const before=a.snapshot('S');assert.throws(()=>a.run('backup=JSON.parse(JSON.stringify(backup));backup.drill.reviews.j18.due="2026-02-30";normaliseBackup(backup);'),/Invalid drill review date/);
 assert.deepEqual(a.snapshot('S'),before);
 const loaded=loadApp(JSON.parse(a.storage.get('sujimichi.v4')));assert.deepEqual(loaded.snapshot('drillState().reviews'),a.snapshot('drillState().reviews'));
});

test('a malformed saved drill cannot break the launch card or skip unanswered questions',()=>{
 const a=loadApp();a.reset();a.run('drillState().scope="all";drillState().session={version:1,i:0};');
 assert.doesNotThrow(()=>a.run('drillLaunchHTML();startDrill();'));assert.equal(a.run('validDrillSession(drillState().session)'),true);
 a.run('drillState().session.i=2;');assert.equal(a.run('validDrillSession(drillState().session)'),false);
 a.run('startDrill();');assert.equal(a.run('drillState().session.i'),0);
 a.run('drillState().session.queue[0]=null;');assert.equal(a.run('validDrillSession(drillState().session)'),false);
});

test('authored choice questions use distinct completed sentences and do not copy lesson examples',()=>{
 const a=loadApp(),questions=a.snapshot('JLPT_QUESTIONS.filter(q=>q.kind==="choice"&&!q.source).map(q=>({id:q.id,s:completedDrillSentence(q),examples:phraseModels(byId(q.gid)).map(m=>m.j)}))');
 const normalize=s=>s.replace(/[\s。、！？]/g,''),seen=new Set();
 for(const q of questions){const key=normalize(q.s);assert.ok(!seen.has(key),q.id);seen.add(key);assert.ok(!q.examples.some(s=>normalize(s)===key),q.id);}
});

test('word lookup does not guess single-kana particles as unrelated inflected verbs',()=>{
 const a=loadApp(),parts=a.snapshot('wordParts("駅にXYZとABCで")');
 assert.equal(parts.map(p=>p[0]).join(''),'駅にXYZとABCで');assert.ok(parts.find(([s,id])=>s==='駅'&&id));
 assert.equal(parts.some(([s,id])=>['に','と','で'].includes(s)&&id),false);
});

test('older drill history still protects against treating a same-day question as fresh',()=>{
 const a=loadApp();a.reset();a.run('drillState().stats.j18={attempts:1,correct:1,last:today()};delete drillState().lastPractised;');
 assert.equal(a.run('questionPractisedToday("j18")'),true);
 a.setTime('2026-09-20T12:00:00');assert.equal(a.run('questionPractisedToday("j18")'),false);
});
