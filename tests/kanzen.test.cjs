const test=require('node:test'),assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');

test('all supplied checklist rows resolve to lessons with bilingual cues and examples',()=>{
  const a=loadApp(),groups=a.snapshot('COVERAGE'),lessons=a.snapshot('GRAMMAR');
  assert.equal(groups.length,29);assert.equal(groups.reduce((n,c)=>n+c.items.length,0),156);
  assert.equal(new Set(lessons.map(g=>g.id)).size,lessons.length);
  const ids=new Set(groups.flatMap(g=>g.items.flatMap(r=>r.ids)));
  assert.equal(ids.size,171);
  for(const id of ids){
    const g=lessons.find(g=>g.id===id);assert.ok(g,id);
    const cue=a.snapshot(`KANZEN_CUES['${id}']`);assert.ok(cue[0]?.trim()&&cue[1]?.trim(),id);
    assert.ok(cue[0].length<260,id+' cue must stay brief');
    assert.ok(g.ex.length>=2,id);for(const e of g.ex)for(const k of ['j','k','e','t'])assert.ok(e[k],id+' '+k);
  }
  assert.equal(a.run('KANZEN_AUDIT.fullIndexVerified'),false);
});

test('all public later topic headings have support lessons and new-context practice',()=>{
  const a=loadApp(),skills=a.snapshot('KANZEN_SKILLS'),bank=a.snapshot('JLPT_QUESTIONS');
  assert.equal(skills.length,22);
  assert.deepEqual(['organize','sentence','passage'].map(s=>skills.filter(x=>x.section===s).length),[7,3,12]);
  for(const s of skills){
    assert.ok(s.links.length,s.id);for(const id of s.links)assert.ok(a.run(`byId('${id}')`),id);
    const g=a.snapshot(`byId('${s.id}')`);assert.equal(g.lv,'N2');assert.ok(g.bookSkill);assert.equal(g.ex.length,2);
    assert.ok(bank.some(q=>q.gid===s.id&&q.kind==='choice'),s.id+' daily choice');
    assert.match(a.run(`lessonCard(byId('${s.id}'))`),/class="use-cue"/);
  }
  const added=bank.filter(q=>q.id.startsWith('kanzen-'));
  assert.equal(added.length,28);assert.ok(added.every(q=>!q.source&&q.level==='N2'));
  assert.deepEqual(['choice','order','text'].map(k=>added.filter(q=>q.kind===k).length),[22,3,3]);
});

test('N2 study includes every mapped book lesson while preserving foundations and saved evidence',()=>{
  const old={lang:'th',lv:'N2',box:{n3a07:3},att:{n3a07:7},seen:{n3a07:1}};
  const a=loadApp(old),ids=a.snapshot('pool().map(g=>g.id)');
  for(const id of a.snapshot('Array.from(KANZEN_N2_IDS)'))assert.ok(ids.includes(id),id);
  assert.equal(ids[0],'n2a01');assert.equal(a.run('byId("n3a07").lv'),'N3');
  assert.equal(a.run('S.box.n3a07'),3);assert.equal(a.run('S.att.n3a07'),7);assert.equal(a.run('S.lang'),'th');
  a.run('S.lv="N3"');assert.ok(a.snapshot('pool()').every(g=>g.lv==='N3'));
});

test('new lessons give daily choices and studied-only drills require actual study exposure',()=>{
  const a=loadApp();a.reset({lv:'N2'});
  assert.ok(!a.snapshot('drillPool("studied")').some(q=>q.id.startsWith('kanzen-')));
  a.run('markStudyEncounter("n2k15");');
  assert.ok(a.snapshot('drillPool("studied")').some(q=>q.id==='kanzen-choice-15'));
  assert.ok(!a.snapshot('drillPool("studied")').some(q=>q.passage==='kanzen-meetings'));
  a.run('markStudyEncounter("n2k18");markStudyEncounter("n2k20");');
  assert.equal(a.snapshot('drillPool("studied")').filter(q=>q.passage==='kanzen-meetings').length,3);
  for(const {id} of a.snapshot('KANZEN_SKILLS')){
    const q=a.snapshot(`makeSpec(byId('${id}'))`);assert.ok(q,id);assert.equal(q.opts.length,4,id);
  }
});

test('上で exposes both attachments as phrase tabs and coverage does not claim full-book verification',()=>{
  const a=loadApp(),models=a.snapshot('phraseModels(byId("n2a09"))');
  assert.ok(models.some(m=>m.j.includes('した上で')));assert.ok(models.some(m=>m.j.includes('する上で')));
  a.run('renderCoverage(document.getElementById("training"));');
  const html=a.node('training').innerHTML;
  assert.match(html,/156 supplied checklist rows/);assert.match(html,/Full book verification is pending/);
  assert.equal((html.match(/class="coverage-skills"/g)||[]).length,3);
  a.run('S.lang="th";renderCoverage(document.getElementById("training"));');
  assert.match(a.node('training').innerHTML,/ยังตรวจยืนยันครบทั้งเล่มไม่ได้/);
});
