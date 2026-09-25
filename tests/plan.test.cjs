const test=require('node:test');
const assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');

test('the exam date defaults to the next JLPT: the first Sunday of July or December',()=>{
  const a=loadApp();a.reset();
  assert.equal(a.run('nextJlptDate("2026-09-19")'),'2026-12-06');
  assert.equal(a.run('nextJlptDate("2026-12-06")'),'2026-12-06');
  assert.equal(a.run('nextJlptDate("2026-12-07")'),'2027-07-04');
  assert.equal(a.run('nextJlptDate("2027-01-10")'),'2027-07-04');
  assert.equal(a.run('examDate()'),'2026-12-06');
  a.run('S.exam="2027-07-04";');assert.equal(a.run('examDate()'),'2027-07-04');
  a.run('S.exam="2026-02-30";');assert.equal(a.run('examDate()'),'2026-12-06');
});

test('the plan finds the pace that meets every pattern with two weeks left to review',()=>{
  const a=loadApp();a.reset({lv:'N2',newPerDay:3,maxRev:20});
  const plan=a.snapshot('examPlan()');
  assert.equal(plan.left,78);assert.equal(plan.total,252);assert.equal(plan.fresh,252);
  assert.equal(plan.buffer,14);assert.equal(plan.learnDays,64);assert.equal(plan.need,4);assert.equal(plan.suggest,5);
  assert.equal(plan.onTrack,false);
  a.run('S.q=null;buildToday();renderStudyHome(document.getElementById("today"));');
  const home=a.node('today').innerHTML;
  assert.match(home,/exam-plan is-behind/);assert.match(home,/data-plan-pace="5"/);assert.ok(home.includes('6 Dec 2026'));
  a.run('usePlanPace(5);');
  assert.equal(a.run('S.newPerDay'),5);assert.equal(a.run('S.maxRev'),20);
  assert.equal(a.run('examPlan().onTrack'),true);
  a.run('S.q.started=false;renderToday();');
  assert.match(a.node('today').innerHTML,/On track/);
});

test('studying both levels needs a faster pace and more room for reviews',()=>{
  const a=loadApp();a.reset({lv:'all',newPerDay:3,maxRev:20});
  const plan=a.snapshot('examPlan()');
  assert.equal(plan.total,445);assert.equal(plan.need,7);assert.equal(plan.suggest,10);
  a.run('usePlanPace(10);');
  assert.equal(a.run('S.newPerDay'),10);assert.equal(a.run('S.maxRev'),40);
  assert.equal(a.run('S.q.nw'),10,'today’s queue takes the new pace at once');
});

test('the plan speaks Thai, and says so when the exam date has passed',()=>{
  const a=loadApp();a.reset({lv:'N2',lang:'th'});
  a.run('buildToday();renderStudyHome(document.getElementById("today"));');
  assert.ok(a.node('today').innerHTML.includes('6 ธ.ค. 2569'));
  assert.ok(a.node('today').innerHTML.includes('แผนเตรียมสอบ'));
  a.run('S.lang="en";S.exam="2026-09-01";renderStudyHome(document.getElementById("today"));');
  assert.match(a.node('today').innerHTML,/has passed/);
});

test('backups keep the exam date and reject an impossible one',()=>{
  const a=loadApp();a.reset();
  a.run('S.exam="2027-07-04";var backup=JSON.parse(JSON.stringify(exportProgress()));');
  assert.equal(a.run('backup.exam'),'2027-07-04');
  assert.equal(a.run('normaliseBackup(backup).exam'),'2027-07-04');
  assert.throws(()=>a.run('backup.exam="2027-02-30";normaliseBackup(backup);'),/Invalid exam date/);
  assert.equal(a.run('normaliseBackup({box:{}}).exam'),undefined);
});
