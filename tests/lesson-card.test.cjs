const test=require('node:test');
const assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

test('every lesson has a memory aid, and most have an easier-Japanese equivalent',()=>{
  const a=loadApp(),grammar=a.snapshot('GRAMMAR');
  for(const g of grammar){
    for(const k of ['se','st','en','th','lit_en','lit_th','note_en','note_th'])assert.ok(g[k]&&g[k].trim(),`${g.id} ${k}`);
    if(g.like)for(const k of ['like_en','like_th'])assert.ok(g[k]&&g[k].trim(),`${g.id} ${k}`);
    for(const e of g.ex)assert.ok(e.j&&e.k&&e.e&&e.t,`${g.id} example`);
  }
  assert.ok(grammar.filter(g=>g.like).length>300);
});

test('the lesson card shows meaning, memory aids, the rule, an example and the trap',()=>{
  const a=loadApp();a.reset({lang:'en'});
  const g=a.snapshot('byId("n2a01")'),card=a.run('lessonCard(byId("n2a01"),{compact:true})');
  for(const text of [g.se,g.en,g.lit_en,g.like,g.like_en,g.note_en,g.ex[0].e])assert.ok(card.includes(esc(text)),text);
  assert.doesNotMatch(card,/\d\d · /,'no numbered headings');
  a.run('S.lang="th";');
  const thai=a.run('lessonCard(byId("n2a01"),{compact:true})');
  for(const text of [g.st,g.th,g.lit_th,g.like_th,g.note_th,g.ex[0].t])assert.ok(thai.includes(esc(text)),text);
  for(const label of ['ความหมาย','จำง่าย ๆ','พูดง่าย ๆ ว่า','วิธีเชื่อม','ตัวอย่าง','ระวัง'])assert.ok(thai.includes(label),label);
});

test('a guided lesson keeps its own warning and still lists every example under More',()=>{
  const a=loadApp();a.reset({lang:'en'});
  const guide=a.snapshot('LESSON_GUIDES.n3a01'),g=a.snapshot('byId("n3a01")'),card=a.run('lessonCard(byId("n3a01"))');
  assert.ok(card.includes(esc(guide.watch_en)));
  assert.ok(card.includes(esc(guide.example.e)));
  for(const e of g.ex)assert.ok(card.includes(esc(e.e)),e.e);
  assert.ok(card.includes(esc(g.lit_en)));
});
