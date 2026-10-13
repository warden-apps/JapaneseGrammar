const test=require('node:test'),assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');
const {addThai,loadThai}=require('../build/add-thai-word-help.cjs');

test('every bundled word has a maintained Thai meaning, including inflected forms',()=>{
 const a=loadApp(),data=a.snapshot('WORD_HELP_DATA'),thai=loadThai();
 assert.ok(Object.keys(data.words).length>3400);
 for(const [id,w] of Object.entries(data.words)){
  assert.match(w.t,/[ก-๙]/u,`${id}: ${w.s}`);
  assert.equal(w.t,thai[w.thaiKey||w.b],`${id}: ${w.s}`);
 }
 const visit=Object.values(data.words).find(w=>w.s==='訪れ');
 assert.equal(visit.b,'訪れる');assert.match(visit.t,/เยือน/);
 assert.deepEqual(addThai(structuredClone(data)),data,'Rebuilding must preserve IDs, readings and glosses');
 assert.throws(()=>addThai({words:{missing:{b:'UNTRANSLATED'}}}),/Add Thai glosses/);
});

test('common words and grammar helpers do not inherit unrelated homophone meanings',()=>{
 const words=loadApp().snapshot('Object.values(WORD_HELP_DATA.words)');
 for(const [base,th,en,wrong] of [
  ['ボタン',/ปุ่ม/,/button/,/peony/],
  ['人手',/กำลังคน/,/workers/,/starfish/],
  ['こと',/เรื่อง/,/matter/,/koto|zither/],
  ['よう',/ดูเหมือน/,/seems/,/drunk/],
  ['たとえ',/แม้/,/even if/,/example/],
  ['わけ',/เหตุผล/,/reason/,/divide/]
 ]){
  const matches=words.filter(w=>w.b===base);assert.ok(matches.length,base);
  for(const w of matches){assert.match(w.t,th);assert.match(w.e.join(' '),en);assert.doesNotMatch(w.e.join(' '),wrong);}
 }
 assert.equal(words.some(w=>['たばかる','だける','しだく'].includes(w.b)),false);
});

test('word popup shows one definition language and keeps Japanese reading and base form',()=>{
 const a=loadApp();a.run('var testWord={s:"訪れた",b:"訪れる",r:"おとずれた",br:"おとずれる",e:["to visit"],t:"ไปเยือน; เยี่ยมเยียน"};');
 a.run('S.lang="th"');let html=a.run('wordHelpHTML(testWord,"sample")');
 assert.match(html,/ไปเยือน; เยี่ยมเยียน/);assert.doesNotMatch(html,/to visit|Dictionary form/);
 assert.match(html,/lang="th" aria-pressed="true"/);assert.match(html,/おとずれた/);assert.match(html,/訪れる/);
 a.run('S.lang="en"');html=a.run('wordHelpHTML(testWord,"sample")');
 assert.match(html,/to visit/);assert.doesNotMatch(html,/ไปเยือน|เยี่ยมเยียน/);
 assert.match(html,/lang="en" aria-pressed="true"/);
 // Data is rendered as text, including future manually authored definitions.
 a.run('testWord.e=["<em>visit & see</em>"]');assert.match(a.run('wordHelpHTML(testWord,"sample")'),/&lt;em&gt;visit &amp; see&lt;\/em&gt;/);
});
