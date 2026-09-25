const test=require('node:test');
const assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');
function daily(app,id){
  app.run(`S.q={date:today(),q:[{id:'${id}',m:'quiz'}],i:0,right:0,asked:0,gen:{},ans:{},rate:{},again:{},started:true,fin:false,nw:0,rv:1};dayLedger();`);
}
function unauthored(app){
  return app.snapshot(`GRAMMAR.filter(function(g){return !JLPT_QUESTIONS.some(function(q){return q.gid===g.id;})&&!MASTERY_EXERCISES.some(function(e){return e.gid===g.id;});}).map(function(g){return g.id;})`);
}

test('every pattern gets an objective question; authored questions still come first',()=>{
  const a=loadApp();a.reset();
  const kinds=a.snapshot('GRAMMAR.map(function(g){return makeSpec(g).kind;})');
  assert.ok(!kinds.includes('recall'),'no pattern is left with only a self-check');
  assert.equal(a.run('makeSpec(byId("n3a01")).kind'),'cloze');
  const free=unauthored(a);
  assert.ok(free.length>250,'most patterns rely on generated questions');
  for(const id of free)assert.ok(['meaning','pick'].includes(a.run(`makeSpec(byId('${id}')).kind`)),id);
});

test('wrong options never share the answer’s branch, comparison table or "tell it apart" list',()=>{
  const a=loadApp();a.reset();
  const near=a.snapshot('practiceIndex().near'),home=a.snapshot('practiceIndex().home');
  for(const id of unauthored(a))for(const att of [0,1]){
    a.run(`S.att['${id}']=${att};`);
    const sp=a.snapshot(`makePracticeSpec(byId('${id}'))`);
    assert.equal(sp.opts.length,4,id);
    assert.equal(sp.opts.filter(o=>o.ok).length,1,id);
    assert.equal(sp.opts.find(o=>o.ok).gid,id);
    assert.equal(new Set(sp.opts.map(o=>o.gid)).size,4,id);
    const branches=new Set();
    for(const o of sp.opts.filter(o=>!o.ok)){
      assert.ok(!(near[id]||{})[o.gid],`${id}: ${o.gid} is too close in meaning`);
      assert.notEqual(home[o.gid].branch,home[id].branch,`${id}: ${o.gid} shares its branch`);
      assert.ok(!branches.has(home[o.gid].branch),`${id}: two wrong options from one branch`);
      branches.add(home[o.gid].branch);
    }
  }
});

test('a gap question puts the grammar back exactly where it came from',()=>{
  const a=loadApp();a.reset();
  let picks=0;
  for(const id of unauthored(a)){
    a.run(`S.att['${id}']=1;`);
    const sp=a.snapshot(`makePracticeSpec(byId('${id}'))`);
    if(sp.kind!=='pick')continue;picks++;
    const parts=sp.ct.split('\u0001'),keys=sp.key.split('…');
    assert.equal(parts.length,keys.length+1,id);
    assert.equal(parts.reduce((s,p,i)=>s+p+(keys[i]||''),''),sp.example.j,id);
    assert.ok(sp.opts.every(o=>a.run(`byId('${o.gid}').p`)===o.t),id);
  }
  assert.ok(picks>250,`only ${picks} gap questions`);
  /* The gap takes the verb ending with it instead of splitting a word. */
  assert.equal(a.run('practiceBlank("忙しくて、結局会えずじまいだった。","〜ずじまいだ").ct'),'忙しくて、結局会え\u0001。');
  assert.equal(a.run('practiceBlank("この店は値段のわりにおいしい。","〜わりに(は)").ct'),'この店は値段の\u0001おいしい。');
});

test('the first question after a lesson checks the meaning on an example the card did not show',()=>{
  const a=loadApp();a.reset({box:{n2g03:1}});daily(a,'n2g03');
  for(let n=0;n<20;n++){
    a.run('S.q.gen={};dayLedger().learned.n2g03=1;');
    const sp=a.snapshot('specAt(0)');
    assert.equal(sp.kind,'meaning');assert.equal(sp.exIdx,1);
  }
  a.run('S.q.gen={};S.att.n2g03=1;');
  assert.equal(a.run('specAt(0).kind'),'pick');
});

test('a wrong answer explains both choices and brings the pattern back; a right one moves it up',()=>{
  const a=loadApp();a.reset({box:{n2g03:2},att:{n2g03:2},last:{n2g03:'2026-09-15'}});daily(a,'n2g03');
  a.run('renderToday();var sp=specAt(0);');
  assert.match(a.node('today').innerHTML,/practice-opt/);
  assert.doesNotMatch(a.node('today').innerHTML,/recall-reveal/);
  const wrong=a.run('sp.opts.findIndex(o=>!o.ok)'),other=a.run(`byId(sp.opts[${wrong}].gid).p`);
  a.click('today','.opt',{i:String(wrong)});
  const verdict=a.node('verdict').innerHTML;
  assert.match(verdict,/Not quite/);assert.ok(verdict.includes('ずじまい'));assert.ok(verdict.includes(other.replace(/[<>&]/g,'')));
  assert.match(verdict,/data-r="again"/);
  assert.equal(a.run('S.att.n2g03'),3);assert.equal(a.run('S.cor.n2g03||0'),0);
  a.click('today','[data-r]',{r:'again'});
  assert.equal(a.run('boxOf("n2g03")'),1);assert.equal(a.run('S.q.q.length'),2);
  assert.equal(a.run('S.q.q[1].id'),'n2g03');

  const b=loadApp();b.reset({box:{n2g03:2},att:{n2g03:2},last:{n2g03:'2026-09-15'}});daily(b,'n2g03');
  b.run('renderToday();var sp=specAt(0);');
  b.click('today','.opt',{i:String(b.run('sp.opts.findIndex(o=>o.ok)'))});
  assert.match(b.node('verdict').innerHTML,/Correct/);
  b.click('today','[data-r]',{r:'good'});
  assert.equal(b.run('boxOf("n2g03")'),3);
});

test('answered practice survives a reload and meanings follow the chosen language',()=>{
  const a=loadApp();a.reset({box:{n2g03:2},att:{n2g03:0},last:{n2g03:'2026-09-15'}});daily(a,'n2g03');
  a.run('renderToday();var sp=specAt(0);');
  assert.equal(a.run('sp.kind'),'meaning');
  assert.ok(a.node('today').innerHTML.includes('never got to do it'));
  a.run('S.lang="th";renderToday();');
  assert.ok(a.node('today').innerHTML.includes('สุดท้ายก็ไม่ได้'));
  assert.ok(a.node('today').innerHTML.includes('แปลว่าอะไร'));
  a.click('today','.opt',{i:String(a.run('sp.opts.findIndex(o=>o.ok)'))});
  const b=loadApp(JSON.parse(a.storage.get('sujimichi.v4')));
  assert.equal(b.run('S.q.ans[0]'),a.run('sp.opts.findIndex(o=>o.ok)'));
  assert.match(b.node('today').innerHTML,/ถูกต้อง/);
  assert.deepEqual(b.snapshot('specAt(0)'),a.snapshot('sp'));
});
