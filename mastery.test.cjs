const test = require('node:test');
const assert = require('node:assert/strict');
const {loadApp} = require('./legacy.test.cjs');

function trainingApp() {
  const app = loadApp();
  app.reset();
  assert.equal(app.run('typeof recordTrainingAnswer'), 'function', 'the app must load its training module');
  app.run('masteryState();');
  return app;
}

test('authored exercises, comparison groups, form guidance and chapter links are internally complete', () => {
  const app = loadApp();
  const content = app.snapshot('({grammar:GRAMMAR,exercises:MASTERY_EXERCISES,groups:MASTERY_GROUPS,forms:MASTERY_FORM_GUIDE,coverage:COVERAGE})');
  const grammarIds = new Set(content.grammar.map(g => g.id));
  assert.equal(grammarIds.size, content.grammar.length, 'grammar IDs must stay unique for saved progress');
  const groupIds = new Set(content.groups.map(g => g.id));
  const exerciseIds = new Set(content.exercises.map(e => e.id));
  assert.equal(exerciseIds.size, content.exercises.length);
  for (const kind of ['form', 'contrast', 'recall']) assert.ok(content.exercises.some(e => e.kind === kind), `${kind} needs practice`);
  for (const e of content.exercises) {
    assert.ok(grammarIds.has(e.gid), `${e.id}: missing grammar ${e.gid}`);
    assert.ok(groupIds.has(e.group), `${e.id}: missing comparison group`);
    assert.ok(['form', 'contrast', 'recall'].includes(e.kind), `${e.id}: unknown question kind`);
    for (const field of ['prompt_en', 'prompt_th', 'ja', 'kana', 'answer', 'why_en', 'why_th', 'en', 'th', 'hint_en', 'hint_th']) {
      assert.ok(typeof e[field] === 'string' && e[field].trim(), `${e.id}: missing ${field}`);
    }
    assert.equal(e.ja.split('＿＿').length, 2, `${e.id}: sentence must have one blank`);
    assert.equal(e.kana.split('＿＿').length, 2, `${e.id}: reading must have one blank`);
    assert.ok(e.options.length >= 2, `${e.id}: needs contrast options`);
    assert.equal(new Set(e.options).size, e.options.length, `${e.id}: duplicate choices`);
    assert.equal(e.options.filter(o => o === e.answer).length, 1, `${e.id}: exactly one keyed answer`);
  }
  for (const group of content.groups) {
    assert.deepEqual(group.members.map(m => m.id), group.ids, `${group.id}: member indexes disagree`);
    for (const member of group.members) {
      assert.ok(grammarIds.has(member.id), `${group.id}: broken comparison link`);
      for (const field of ['cue_en','cue_th','before_en','before_th','after_en','after_th']) assert.ok(member[field], `${group.id}: ${field}`);
    }
  }
  assert.ok(content.forms.length);
  for (const form of content.forms) {
    assert.ok(form.rule_en && form.rule_th && form.trap_en && form.trap_th && form.examples.length, form.id);
    for (const example of form.examples) assert.ok(example.from && example.to && example.en && example.th, form.id);
  }
  for (let chapter = 1; chapter <= 26; chapter++) assert.ok(content.coverage.some(c => c.chapter === chapter), `missing chapter ${chapter}`);
  for (const chapter of content.coverage) {
    assert.ok(chapter.title && chapter.items.length);
    for (const item of chapter.items) {
      assert.ok(item.label && item.ids.length, `empty chapter ${chapter.chapter} item`);
      for (const id of item.ids) assert.ok(grammarIds.has(id), `chapter ${chapter.chapter}: missing ${id}`);
    }
  }
});

test('a mistake stays on the repair list through same-day retries and clears after a later unaided success', () => {
  const app = trainingApp();
  app.run(`var e=MASTERY_EXERCISES[0]; recordTrainingAnswer(e,false,false);`);
  assert.equal(app.run('masteryState().items[e.id].stage'), 0);
  assert.equal(app.run('masteryState().items[e.id].mistake'), true);
  app.run(`recordTrainingAnswer(e,true,false); recordTrainingAnswer(e,true,false);`);
  assert.equal(app.run('masteryState().items[e.id].stage'), 0);
  assert.equal(app.run('masteryState().items[e.id].mistake'), true);
  assert.equal(app.run('masteryState().items[e.id].due'), '2026-09-19');
  assert.equal(app.run('trainingMistakes().length'), 1);
  app.setTime('2026-09-20T12:00:00');
  app.run('recordTrainingAnswer(e,true,false);');
  const record = app.snapshot('masteryState().items[e.id]');
  assert.equal(record.stage, 1);
  assert.equal(record.mistake, false);
  assert.equal(record.due, '2026-09-21');
  assert.equal(record.attempts, 4);
  assert.equal(record.correct, 3);
  assert.equal(app.run('trainingMistakes().length'), 0);
});

test('using help does not earn retention, including an unhinted repeat later that same day', () => {
  const app = trainingApp();
  app.run('var e=MASTERY_EXERCISES[0]; recordTrainingAnswer(e,true,true);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 0);
  app.run('recordTrainingAnswer(e,true,false);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 0);
  app.setTime('2026-09-20T12:00:00');
  app.run('recordTrainingAnswer(e,true,false);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 1);
});

test('retention advances once per study day and retains an appropriate next-review date', () => {
  const app = trainingApp();
  app.run('var e=MASTERY_EXERCISES[0]; recordTrainingAnswer(e,true,false); recordTrainingAnswer(e,true,false);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 1);
  assert.equal(app.run('trainingDue(e)'), false);
  app.setTime('2026-09-20T12:00:00');
  assert.equal(app.run('trainingDue(e)'), true);
  app.run('recordTrainingAnswer(e,true,false);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 2);
  assert.equal(app.run('masteryState().items[e.id].due'), '2026-09-23');
  app.setTime('2026-09-23T12:00:00');
  app.run('recordTrainingAnswer(e,true,false);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 3);
  assert.equal(app.run('masteryState().items[e.id].due'), '2026-09-30');
});

test('voluntary early practice cannot compress the scheduled retention interval', () => {
  const app = trainingApp();
  app.run('var e=MASTERY_EXERCISES[0]; recordTrainingAnswer(e,true,false);');
  app.setTime('2026-09-20T12:00:00');
  app.run('recordTrainingAnswer(e,true,false);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 2);
  assert.equal(app.run('masteryState().items[e.id].due'), '2026-09-23');
  app.setTime('2026-09-21T12:00:00');
  app.run('recordTrainingAnswer(e,true,false);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 2);
  assert.equal(app.run('masteryState().items[e.id].due'), '2026-09-23');
  assert.equal(app.run('masteryState().items[e.id].attempts'), 3);
  app.run('recordTrainingAnswer(e,false,false);');
  assert.equal(app.run('masteryState().items[e.id].stage'), 0, 'an early mistake should still reset retention');
  assert.equal(app.run('masteryState().items[e.id].due'), '2026-09-21');
});

test('answer submission is idempotent and missed questions receive only one session retry', () => {
  const app = trainingApp();
  app.run(`startTraining('form'); var s=masteryState().session; var first=trainingExercise(s.queue[0].id);`);
  const baseLength = app.run('s.queue.length');
  assert.ok(baseLength > 0 && baseLength <= 6);
  app.run(`answerTraining('incorrect',false); answerTraining('incorrect',false);`);
  assert.equal(app.run('masteryState().items[first.id].attempts'), 1);
  assert.equal(app.run('s.queue.length'), baseLength + 1);
  assert.equal(app.run('s.retries.length'), 1);
  assert.equal(app.run('Object.keys(s.results).length'), 1);
  app.run('s.i=s.queue.length-1; s.current=null; renderTraining(); answerTraining("still incorrect",false);');
  assert.equal(app.run('s.queue.length'), baseLength + 1);
  assert.equal(app.run('masteryState().items[first.id].attempts'), 2);
});

test('recall help is counted as assisted and reveal is never counted as a correct answer', () => {
  const app = trainingApp();
  app.run(`startTraining('recall'); var s=masteryState().session; var e=trainingExercise(s.queue[0].id);`);
  assert.equal(app.run('s.current.choices'), false);
  app.documentClick({help: 'choices'});
  app.run('answerTraining(e.answer,false);');
  assert.equal(app.run('s.results[0].assisted'), true);
  assert.equal(app.run('s.results[0].correct'), true);
  assert.equal(app.run('masteryState().items[e.id].stage'), 0);
  app.documentClick({}, ['data-next-training']);
  app.documentClick({help: 'reveal'});
  assert.equal(app.run('s.results[1].assisted'), true);
  assert.equal(app.run('s.results[1].correct'), false);
});

test('an in-progress training session resumes from localStorage without duplicating attempts', () => {
  const firstApp = trainingApp();
  firstApp.run(`startTraining('form'); var s=masteryState().session; var e=trainingExercise(s.queue[0].id); answerTraining(e.answer,false);`);
  const state = JSON.parse(firstApp.storage.get('sujimichi.v4'));
  const exerciseId = firstApp.run('e.id');
  const secondApp = loadApp(state);
  secondApp.run(`startTraining('mixed'); var s=masteryState().session; answerTraining(trainingExercise(s.queue[0].id).answer,false);`);
  assert.equal(secondApp.run('s.i'), 0);
  assert.equal(secondApp.run('s.mode'), 'form');
  assert.equal(secondApp.snapshot('S.mastery.items')[exerciseId].attempts, 1);
  assert.equal(secondApp.run('Object.keys(s.results).length'), 1);
});

test('v6 backup round-trips retention and repair evidence and rejects corrupt exercise counters', () => {
  const app = trainingApp();
  app.run(`var e=MASTERY_EXERCISES[0]; recordTrainingAnswer(e,false,false); var f=MASTERY_EXERCISES[1]; recordTrainingAnswer(f,true,false);`);
  const exported = app.snapshot('exportProgress()');
  app.run(`var incoming = JSON.parse(${JSON.stringify(JSON.stringify(exported))});`);
  assert.deepEqual(app.snapshot('normaliseBackup(incoming).mastery'), exported.mastery);
  app.run('incoming.mastery.items[e.id].correct=100;');
  const before = app.snapshot('S');
  assert.throws(() => app.run('normaliseBackup(incoming)'));
  assert.deepEqual(app.snapshot('S'), before);
});

test('typed recall ignores harmless spacing and full-width punctuation but preserves the Japanese answer', () => {
  const app = trainingApp();
  assert.equal(app.run(`normaliseAnswer('　食べる 。 ')`), '食べる');
  assert.equal(app.run(`normaliseAnswer('ﾃｽﾄ！')`), 'テスト');
  assert.notEqual(app.run(`normaliseAnswer('食べた')`), app.run(`normaliseAnswer('食べる')`));
});
