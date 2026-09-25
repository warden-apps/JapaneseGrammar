const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {loadApp} = require('./legacy.test.cjs');

const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

test('the app exposes only Study, Library and Progress navigation', () => {
  const nav = html.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, 'primary navigation exists');
  const destinations = Array.from(nav.matchAll(/\bdata-p="([^"]+)"/g), m => m[1]);
  assert.deepEqual(destinations, ['p-today', 'p-list', 'p-rec']);
  for (const label of ['Study', 'Library', 'Progress']) assert.ok(nav.includes(label), label);
});

test('the Study landing page has one primary action and does not offer separate training modes', () => {
  const app = loadApp();
  app.reset();
  app.run('buildToday(); renderStudyHome(document.getElementById("today"));');
  const home = app.node('today').innerHTML + app.node('study-launch').innerHTML;
  const buttons = Array.from(home.matchAll(/<button\b[^>]*>/g), m => m[0]);
  const primary = buttons.filter(tag => /\bclass="[^"]*\bgo\b/.test(tag) && !/\bquiet\b/.test(tag));
  assert.equal(primary.length, 1, 'starting/resuming the daily queue should be the only primary action');
  assert.doesNotMatch(home, /\bdata-train=|\bdata-group-practice=|\bdata-pattern-practice=/);
});

test('starting Study resumes the existing daily queue without replacing learning evidence', () => {
  const app = loadApp();
  app.reset();
  app.run(`
    buildToday();
    S.q.i=1; S.q.started=false;
    var exercise=MASTERY_EXERCISES[0];
    recordTrainingAnswer(exercise,false,false);
  `);
  const queue = app.snapshot('S.q.q');
  const evidence = app.snapshot('S.mastery.items');
  const scheduled = app.snapshot('({box:S.box,last:S.last,att:S.att,cor:S.cor,promoted:S.promoted})');
  app.run('startStudy();');
  assert.equal(app.run('S.q.i'), 1);
  assert.equal(app.run('S.q.started'), true);
  assert.deepEqual(app.snapshot('S.q.q'), queue);
  assert.deepEqual(app.snapshot('S.mastery.items'), evidence);
  assert.deepEqual(app.snapshot('({box:S.box,last:S.last,att:S.att,cor:S.cor,promoted:S.promoted})'), scheduled);
});

test('ところだ teaches all three stages with the matching form and meaning', () => {
  const app = loadApp();
  app.reset({lang:'both'});
  const guide = app.snapshot('LESSON_GUIDES.n3a01');
  assert.deepEqual(guide.forms.map(f => f.form), ['Vる + ところだ', 'Vている + ところだ', 'Vた + ところだ']);
  assert.match(guide.forms[0].en, /about to/i);
  assert.match(guide.forms[1].en, /doing.*now/i);
  assert.match(guide.forms[2].en, /just finished/i);
  const card = app.run('lessonCard(byId("n3a01"))');
  for (const row of guide.forms) {
    for (const field of ['form','en']) assert.ok(card.includes(escapeHtml(row[field])), `missing ${row.form}: ${field}`);
  }
  app.run('S.lang="th";');
  const thaiCard = app.run('lessonCard(byId("n3a01"))');
  for (const row of guide.forms) assert.ok(thaiCard.includes(escapeHtml(row.th)), `missing Thai ${row.form}`);
  assert.doesNotMatch(card, /The current stage: just finished\./, 'a past-only comparison must not describe the whole three-form lesson');
});

test('short lesson guides have bilingual explanations and meaningful comparison targets', () => {
  const app = loadApp();
  const guides = app.snapshot('LESSON_GUIDES');
  const ids = new Set(app.snapshot('GRAMMAR.map(g => g.id)'));
  assert.ok(Object.keys(guides).length);
  for (const [id, guide] of Object.entries(guides)) {
    assert.ok(ids.has(id), `${id}: unknown lesson`);
    for (const field of ['meaning_en','meaning_th','cue_en','cue_th','watch_en','watch_th']) assert.ok(guide[field]?.trim(), `${id}: ${field}`);
    assert.ok(guide.forms.length, id);
    for (const form of guide.forms) {
      for (const field of ['form','en','th','example']) assert.ok(form[field]?.trim(), `${id}: form ${field}`);
    }
    for (const field of ['j','k','e','t']) assert.ok(guide.example[field]?.trim(), `${id}: example ${field}`);
    for (const comparison of guide.compare) {
      assert.ok(ids.has(comparison.id), `${id}: unknown comparison ${comparison.id}`);
      assert.ok(comparison.en?.trim() && comparison.th?.trim(), `${id}: comparisons need meanings, not bare pattern links`);
    }
  }
});

test('authored daily answers record training evidence once even when a saved answer is revisited', () => {
  const app = loadApp();
  app.reset();
  app.run(`
    var exercise=MASTERY_EXERCISES.find(e=>!JLPT_QUESTIONS.some(q=>q.kind==='choice'&&q.gid===e.gid)), grammar=byId(exercise.gid);
    S.q={date:today(),q:[{id:grammar.id,m:'quiz'}],i:0,right:0,asked:0,gen:{},ans:{},rate:{},again:{},started:true,fin:false,nw:0,rv:1};
    var spec=specAt(0);
    var exerciseId=spec.exerciseId;
    var correctOption=spec.opts.findIndex(o => o.ok);
  `);
  assert.ok(app.run('exerciseId'), 'the authored question must identify its learning record');
  app.click('today', '.opt', {i: String(app.run('correctOption'))});
  app.click('today', '.opt', {i: String(app.run('correctOption'))});
  assert.equal(app.run('S.mastery.items[exerciseId].attempts'), 1);
  assert.equal(app.run('S.mastery.items[exerciseId].correct'), 1);
  assert.equal(app.run('S.q.asked'), 1);
  app.run('renderToday();');
  assert.equal(app.run('S.mastery.items[exerciseId].attempts'), 1);
});

test('example sentences highlight their grammar, including split and inflected patterns', () => {
  const app = loadApp();
  const marked = (text, pattern) => app.run(`markGrammar(${JSON.stringify(text)}, ${JSON.stringify(pattern)})`);
  assert.equal(marked('たとえ雨が降っても、行きます。', 'たとえ〜ても'), '<mark>たとえ</mark>雨が降っ<mark>ても</mark>、行きます。');
  assert.equal(marked('今から出かけるところです。', '〜ところだ'), '今から出かける<mark>ところ</mark>です。');
  assert.equal(marked('この約束は決して忘れません。', '決して〜ない'), 'この約束は<mark>決して</mark>忘れ<mark>ません</mark>。');
  assert.equal(marked('本を読んでから寝る。', '〜てから'), '本を読ん<mark>でから</mark>寝る。');
  assert.equal(marked('こちらにお名前をお書きください。', 'お〜願う / お〜ください'), 'こちらにお名前を<mark>お</mark>書き<mark>ください</mark>。', 'the tightest match wins');
  assert.equal(marked('感謝を込めて書きます。', '〜をこめて'), '感謝<mark>を込めて</mark>書きます。', 'kana patterns match kanji spellings');
  assert.equal(marked('A&B<C>', '〜ところだ'), 'A&amp;B&lt;C&gt;', 'text without a match is still escaped');
  const coverage = app.snapshot(`(() => { let all = 0, hit = 0;
    GRAMMAR.forEach(g => g.ex.forEach(e => { all++; if (grammarMatch(e.j, g.p).length) hit++; }));
    return {all, hit}; })()`);
  assert.ok(coverage.hit / coverage.all > 0.95, `only ${coverage.hit}/${coverage.all} examples highlight their grammar`);
});
