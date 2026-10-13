const test=require('node:test'),assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');
test('every lesson has translated phrase examples and formal rules stay in disclosure',()=>{
  const a=loadApp();const lessons=a.snapshot('GRAMMAR.map(g=>({id:g.id,models:phraseModels(g),card:lessonCard(g)}))');
  assert.equal(lessons.length,467);
  for(const l of lessons){assert.ok(l.models.length,l.id);for(const m of l.models){assert.ok(m.j&&m.e&&m.t,l.id);}assert.doesNotMatch(l.card,/Build it/);assert.ok(l.card.indexOf('phrase-section')<l.card.indexOf('lesson-more'));}
  const sai=a.snapshot('phraseModels(byId("n3a07"))');
  assert.deepEqual(sai.map(m=>m.chunk),['利用する際に','訪れた際に','申し込みの際に']);
  assert.match(sai[0].j,/利用する際に/);assert.match(sai[1].j,/訪れた際に/);
});
test('custom daily limit accepts 20 and 27, survives backup, and preserves completed work',()=>{
  const a=loadApp();a.reset();a.run('buildToday();S.q.i=2;S.q.ans[1]=0;dayLedger().done.n3a01=1;');
  const head=a.snapshot('S.q.q.slice(0,2)');
  assert.equal(a.run('setNewPatternLimit(20)'),true);assert.equal(a.run('S.newPerDay'),20);
  assert.deepEqual(a.snapshot('S.q.q.slice(0,2)'),head);assert.equal(a.run('S.q.ans[1]'),0);
  assert.equal(a.run('setNewPatternLimit(27)'),true);
  assert.equal(a.run('normaliseBackup(exportProgress()).newPerDay'),27);
  for(const bad of ['',-1,101,2.4,'abc',null]){assert.equal(a.run(`setNewPatternLimit(${JSON.stringify(bad)})`),false);}
  assert.equal(a.run('S.newPerDay'),27);
  assert.throws(()=>a.run('normaliseBackup({box:{},newPerDay:2.4})'),/Invalid setting/);
  assert.equal(a.run('setNewPatternLimit(0)'),true);
});
test('saved typed steps migrate without replacing questions or learning evidence',()=>{
  const a=loadApp();a.reset({box:{n3a01:2},att:{n3a01:1}});
  a.run('buildToday();S.q.q=[{id:"n3a01",m:"quiz"}];S.q.i=0;S.q.started=true;S.q.gen[0]=makeSpec(byId("n3a01"));S.q.gen[0].version=4;S.q.gen[0].recallFirst=true;');
  const before=a.snapshot('S.q.gen[0].opts');a.run('renderToday();');
  assert.deepEqual(a.snapshot('S.q.gen[0].opts'),before);assert.equal(a.run('S.q.gen[0].recallFirst'),false);
  assert.doesNotMatch(a.node('today').innerHTML,/daily-recall-input/);assert.equal(a.run('S.att.n3a01'),1);
});
test('offline lookup covers words and inflections, without altering Japanese text',()=>{
  const a=loadApp();const sentence='このサービスを利用する際に登録が必要です';
  const parts=a.snapshot(`wordParts(${JSON.stringify(sentence)})`),words=a.snapshot('WORD_HELP_DATA.words');
  assert.equal(parts.map(p=>p[0]).join(''),sentence);
  for(const key of ['利用','際','登録','必要']){const p=parts.find(p=>p[0]===key);assert.ok(p?.[1],key);assert.ok(words[p[1]].e.length,key);}
  assert.equal(words[parts.find(p=>p[0]==='際')[1]].r,'さい');
  const verb=Object.values(words).find(w=>w.s==='訪れ'&&w.b==='訪れる');assert.ok(verb);assert.equal(verb.r,'おとずれ');assert.ok(verb.e.length);
  assert.ok(Object.keys(words).length>3000);
});

test('combined language preferences migrate to English without losing progress',()=>{
  const a=loadApp({lang:'both',box:{n3a01:3},att:{n3a01:7},seen:{n3a01:1}});
  assert.equal(a.run('S.lang'),'en');assert.equal(a.run('S.box.n3a01'),3);assert.equal(a.run('S.att.n3a01'),7);
  assert.equal(a.run('normaliseBackup({box:{n3a01:3},lang:"both"}).lang'),'en');
  assert.equal(loadApp({lang:'th'}).run('S.lang'),'th');
});

test('daily Back uses read-only history and resumes the exact live question',()=>{
  const a=loadApp();a.reset();a.run('buildToday();S.q.started=true;');
  a.run('renderToday();');a.node('lesson-next').onclick();a.node('got').onclick();
  const queue=a.snapshot('S.q.q'),question=a.snapshot('S.q.gen[S.q.i]'),at=a.run('S.q.i');
  a.run('moveStudyHistory("daily",-1);');
  assert.equal(a.run('S.q.i'),at);assert.equal(a.run('S.q.backAt'),0);
  assert.match(a.node('today').innerHTML,/data-study-forward="daily"/);
  assert.doesNotMatch(a.node('today').innerHTML,/id="got"/);
  a.run('S.lang="th";updateStudyLanguage();');assert.equal(a.run('S.q.backAt'),0);
  a.run('moveStudyHistory("daily",1);');
  assert.equal(a.run('S.q.backAt'),undefined);assert.deepEqual(a.snapshot('S.q.gen[S.q.i]'),question);assert.deepEqual(a.snapshot('S.q.q'),queue);
  a.run('var sp=specAt(S.q.i);');
  a.click('today','.opt',{i:a.run('sp.opts.findIndex(o=>o.ok)')});a.click('today','[data-r]',{r:'good'});
  const evidence=a.snapshot('exportProgress()'),live=a.run('S.q.i');
  a.run('moveStudyHistory("daily",-1);');
  assert.match(a.node('today').innerHTML,/class="opt right" disabled/);
  assert.doesNotMatch(a.node('today').innerHTML,/data-r=/);
  a.run('moveStudyHistory("daily",1);');assert.equal(a.run('S.q.i'),live);assert.deepEqual(a.snapshot('exportProgress()'),evidence);
});

test('drill and training Back preserve live answers, options and scores',()=>{
  const a=loadApp();a.reset();a.run('drillState().scope="all";startDrill();submitDrill(drillQuestion(drillState().session.queue[0].id).answer);');
  a.documentClick({},['data-drill-next']);
  const drill=a.snapshot('drillState().session'),scores=a.snapshot('drillState().stats');
  a.run('moveStudyHistory("drill",-1);');assert.equal(a.run('drillState().session.i'),1);
  assert.doesNotMatch(a.node('today').innerHTML,/data-drill-next/);
  a.run('moveStudyHistory("drill",1);');assert.deepEqual(a.snapshot('drillState().session'),drill);assert.deepEqual(a.snapshot('drillState().stats'),scores);
  a.run('drillState().active=false;startTraining("mixed");answerTraining(trainingExercise(masteryState().session.queue[0].id).answer,false);');
  a.documentClick({},['data-next-training']);
  const training=a.snapshot('masteryState()');
  a.run('moveStudyHistory("training",-1);');assert.equal(a.run('masteryState().session.i'),1);assert.doesNotMatch(a.node('training').innerHTML,/data-answer=/);
  a.run('moveStudyHistory("training",1);');assert.deepEqual(a.snapshot('masteryState()'),training);
});
