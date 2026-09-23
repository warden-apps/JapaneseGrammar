const test=require('node:test');
const assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');
function daily(app,id='n3a01'){
  app.run(`S.q={date:today(),q:[{id:'${id}',m:'quiz'}],i:0,right:0,asked:0,gen:{},ans:{},rate:{},again:{},started:true,fin:false,nw:0,rv:1};dayLedger();`);
}

test('all JLPT formats contain four distinct options, feedback and valid lesson links',()=>{
  const a=loadApp(),bank=a.snapshot('JLPT_QUESTIONS'),grammar=a.snapshot('GRAMMAR');
  const ids=new Set(grammar.map(g=>g.id));
  assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
  assert.ok(bank.length>=60);
  for(const kind of ['choice','order','text'])assert.ok(bank.some(q=>q.kind===kind));
  for(const q of bank){
    assert.ok(ids.has(q.gid),q.id);
    for(const key of ['en','th','translation_en','translation_th'])assert.ok(q[key]?.trim(),`${q.id} ${key}`);
    assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options.map(o=>o.text)).size,4,q.id);
    assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
    q.options.forEach(o=>{assert.ok(o.text&&o.en&&o.th,q.id);});
    if(q.kind==='choice'){
      assert.equal(q.stem.split('＿＿').length,2,q.id);
      assert.ok(!grammar.find(g=>g.id===q.gid).ex.some(e=>e.j===q.stem.replace('＿＿',q.options[q.answer].text)),`${q.id} must transfer to a new context`);
    }
    if(q.kind==='order'){assert.equal(q.parts.length,4);assert.equal(q.options[q.answer].text,q.parts[q.star]);}
    if(q.kind==='text')assert.ok(q.stem.includes(`【${q.blank}】`));
  }
});
test('studied scope excludes Library-only and drill-only exposure; an empty pool stays empty',()=>{
  const a=loadApp();a.reset({seen:{n3a01:1}});
  assert.equal(a.run('drillPool("studied").length'),0);
  a.run('drillState().scope="all";startDrill();submitDrill(0);');
  assert.equal(a.run('drillPool("studied").length'),0);
  a.run('markStudyEncounter("n3a01");');
  assert.ok(a.run('drillPool("studied").length')>0);
  assert.ok(a.run('drillPool("studied").every(q=>q.gid==="n3a01")'));
  a.run('S.box.n2a03=2;');assert.ok(a.run('encounteredInStudy("n2a03")'));
});
test('passages require every tested grammar to be eligible and both levels have all formats',()=>{
  const a=loadApp();a.reset();
  a.run('markStudyEncounter("n3a02");');
  assert.ok(a.run('!drillPool("studied").some(q=>q.passage==="jt01")'));
  a.run('markStudyEncounter("n2h01");');
  assert.equal(a.run('drillPool("studied").filter(q=>q.passage==="jt01").length'),2);
  for(const lv of ['N3','N2']){
    a.run(`S.lv='${lv}';`);
    assert.ok(a.run(`drillPool('all').every(q=>drillLevel(q)==='${lv}')`));
    for(const k of ['choice','order','text'])assert.ok(a.run(`drillPool('all').some(q=>q.kind==='${k}')`),`${lv} ${k}`);
  }
});
test('random rounds mix formats, keep passage blanks adjacent, avoid duplicates and favor unused items',()=>{
  const a=loadApp();a.reset();
  for(let run=0;run<20;run++){
    const queue=a.snapshot('makeDrillQueue("all")');
    assert.equal(queue.length,10);assert.equal(new Set(queue.map(x=>x.id)).size,10);
    const bank=a.snapshot('JLPT_QUESTIONS');
    assert.deepEqual(new Set(queue.map(x=>bank.find(q=>q.id===x.id).kind)),new Set(['choice','order','text']));
    queue.forEach((x,i)=>{
      assert.deepEqual(x.options.slice().sort(),[0,1,2,3]);
      const q=bank.find(q=>q.id===x.id);
      if(q.kind==='text'&&q.blank===1)assert.equal(bank.find(q=>q.id===queue[i+1].id).passage,q.passage);
    });
  }
  a.run('drillState().stats.j01={attempts:99,correct:50,last:today()};');
  assert.ok(a.run('!makeDrillQueue("all").some(x=>x.id==="j01")'));
});
test('answering gives immediate feedback, ignores duplicate taps, resumes exactly and does not promote daily grammar',()=>{
  const a=loadApp();a.reset();a.run('drillState().scope="all";startDrill();var item=drillState().session.queue[0], q=drillQuestion(item.id);');
  const before=a.snapshot('({box:S.box,att:S.att,cor:S.cor,promoted:S.promoted})');
  a.run('submitDrill(q.answer);submitDrill((q.answer+1)%4);');
  assert.equal(a.run('drillState().stats[q.id].attempts'),1);
  assert.equal(a.run('drillState().stats[q.id].correct'),1);
  assert.match(a.node('today').innerHTML,/role="status"/);assert.match(a.node('today').innerHTML,/Correct/);
  assert.deepEqual(a.snapshot('({box:S.box,att:S.att,cor:S.cor,promoted:S.promoted})'),before);
  const resumed=loadApp(JSON.parse(a.storage.get('sujimichi.v4')));
  assert.deepEqual(resumed.snapshot('S.drill.session'),a.snapshot('S.drill.session'));
  assert.match(resumed.node('today').innerHTML,/Correct/);
});
test('passage feedback never gives away the next blank and earlier answers become reading context',()=>{
  const a=loadApp();a.reset();
  a.run('drillState().session={version:1,scope:"all",lv:"all",queue:[{id:"jt02-1",options:[0,1,2,3]},{id:"jt02-2",options:[0,1,2,3]}],i:0,answers:{}};');
  let h=a.run('drillPromptHTML(drillQuestion("jt02-1"),drillState().session)');
  assert.match(h,/【1】/);assert.match(h,/【2】/);assert.doesNotMatch(h,/次第/);
  assert.doesNotMatch(a.run('drillFeedback(drillQuestion("jt02-1"),0)'),/次第/);
  a.run('drillState().session.answers[0]={pick:1,correct:false};drillState().session.i=1;');
  h=a.run('drillPromptHTML(drillQuestion("jt02-2"),drillState().session)');
  assert.match(h,/に限らず/);assert.match(h,/【2】/);
});
test('daily practice rotates contexts and records only one exposure per submitted answer',()=>{
  const a=loadApp();a.reset();daily(a);
  a.run('var first=specAt(0), firstId=first.jlptId, answer=first.opts.findIndex(o=>o.ok);');
  a.click('today','.opt',{i:String(a.run('answer'))});a.click('today','.opt',{i:String(a.run('answer'))});
  assert.equal(a.run('drillState().daily[firstId]'),1);assert.equal(a.run('S.att.n3a01'),1);
  assert.notEqual(a.run('makeSpec(byId("n3a01")).jlptId'),a.run('firstId'));
  assert.equal(a.run('makeSpec(byId("n3a01")).recallFirst'),true);
});
test('later daily reviews hide choices until recall and a typed correct answer survives reload',()=>{
  const a=loadApp();a.reset({box:{n3a01:2},att:{n3a01:1},last:{n3a01:'2026-09-17'}});daily(a);
  a.run('renderToday();');assert.match(a.node('today').innerHTML,/daily-recall-input/);
  assert.doesNotMatch(a.node('today').innerHTML,/class="opt"/);
  a.run('checkDailyRecall(" "+specAt(0).key+"。");checkDailyRecall(specAt(0).key);');
  assert.equal(a.run('S.q.asked'),1);assert.equal(a.run('S.att.n3a01'),2);
  assert.match(a.node('today').innerHTML,/Correct/);
  const b=loadApp(JSON.parse(a.storage.get('sujimichi.v4')));
  assert.equal(b.run('S.q.asked'),1);assert.match(b.node('today').innerHTML,/Correct/);
});
test('first-day success and assisted recall do not promote memory; later unaided recall does',()=>{
  const a=loadApp();a.reset({box:{n3a01:1}});daily(a);
  a.run('dayLedger().learned.n3a01=1;var sp=specAt(0);');
  a.click('today','.opt',{i:String(a.run('sp.opts.findIndex(o=>o.ok)'))});
  a.click('today','[data-r]',{r:'good'});assert.equal(a.run('boxOf("n3a01")'),1);
  const b=loadApp();b.reset({box:{n3a01:2},att:{n3a01:1},last:{n3a01:'2026-09-17'}});daily(b);
  b.run('dailyChoices();var sp=specAt(0);');
  b.click('today','.opt',{i:String(b.run('sp.opts.findIndex(o=>o.ok)'))});b.click('today','[data-r]',{r:'good'});
  assert.equal(b.run('boxOf("n3a01")'),1);assert.equal(b.run('S.q.again.n3a01'),1);
  const c=loadApp();c.reset({box:{n3a01:2},att:{n3a01:1},last:{n3a01:'2026-09-17'}});daily(c);
  c.run('checkDailyRecall(specAt(0).key);');c.click('today','[data-r]',{r:'good'});
  assert.equal(c.run('boxOf("n3a01")'),3);
});
test('v7 backups preserve drill evidence, import no stale session and reject malformed evidence atomically',()=>{
  const a=loadApp();a.reset();a.run('drillState().scope="all";markStudyEncounter("n3a01");startDrill();submitDrill(0);var backup=JSON.parse(JSON.stringify(exportProgress()));var restored=normaliseBackup(backup);');
  assert.equal(a.run('backup.v'),7);assert.deepEqual(a.snapshot('restored.drill.stats'),a.snapshot('S.drill.stats'));
  assert.deepEqual(a.snapshot('restored.drill.encountered'),{n3a01:1});assert.equal(a.run('restored.drill.session'),undefined);
  const before=a.snapshot('S');
  assert.throws(()=>a.run('backup.drill.stats.j01={attempts:1,correct:2,last:today()};normaliseBackup(backup);'),/Invalid drill score/);
  assert.deepEqual(a.snapshot('S'),before);
  assert.deepEqual(a.snapshot('normaliseBackup({box:{}}).drill'),{scope:'studied',stats:{},daily:{},lastDaily:{},encountered:{}});
});
test('Study home does not disclose the next review answer, and level changes pause an incompatible drill',()=>{
  const a=loadApp();a.reset({box:{n3a01:2},newPerDay:0});daily(a);
  a.run('S.q.started=false;renderToday();');
  assert.doesNotMatch(a.node('today').innerHTML,/ところだ|About to do/);
  a.run('drillState().scope="all";startDrill();S.lv="N2";renderToday();');
  assert.equal(a.run('drillState().active'),false);
  a.run('startDrill();');
  assert.ok(a.run('drillState().session.queue.every(item=>drillLevel(drillQuestion(item.id))==="N2")'));
});
