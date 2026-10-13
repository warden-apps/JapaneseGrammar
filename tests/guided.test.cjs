const test=require('node:test'),assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');

test('furigana aligns readings to kanji and keeps okurigana as ordinary text',()=>{
 const a=loadApp();
 for(const [text,kana,parts] of [
  ['食べる','たべる',[['食','た'],['べる',null]]],
  ['申し込む','もうしこむ',[['申','もう'],['し',null],['込','こ'],['む',null]]],
  ['この店は安い上に、おいしい。','このみせはやすいうえに、おいしい。',[['この',null],['店','みせ'],['は',null],['安','やす'],['い',null],['上','うえ'],['に、おいしい。',null]]],
  ['コーヒーを飲んだ。','こーひーをのんだ。',[['コーヒーを',null],['飲','の'],['んだ。',null]]],
  ['3日間にわたって','みっかかんにわたって',[['3日間','みっかかん'],['にわたって',null]]],
  ['N2は難しい。','えぬにーはむずかしい。',[['N2',null],['は',null],['難','むずか'],['しい。',null]]],
  ['おいしい。','おいしい。',[['おいしい。',null]]]
 ])assert.deepEqual(a.snapshot(`alignFurigana(readingUnits(${JSON.stringify(text)}),${JSON.stringify(kana)})`),parts);
});

test('lessons retain useful content without repeated coaching instructions',()=>{
 const a=loadApp(),html=a.run('lessonCard(byId("n2a01"))');
 assert.match(html,/class="meaning-line"/);assert.match(html,/class="use-cue"/);assert.match(html,/data-phrase-index/);
 assert.doesNotMatch(html,/step-instruction|lesson-step-title|tap-hint|Remember this:|Get the idea|See it in a sentence|reading-text/);
 a.run('startStudy()');assert.doesNotMatch(a.node('today').innerHTML,/next-step-note/);
 assert.match(a.node('today').innerHTML,/aria-current="step"/);
});

test('every lesson phrase and completed authored exercise has nonempty offline kana',()=>{
 const a=loadApp();
 const readings=a.snapshot(`GRAMMAR.flatMap(phraseModels).map(e=>({j:e.j,r:sentenceReading(e.j,e.k)})).concat(MASTERY_EXERCISES.map(e=>({j:e.ja.replace('＿＿',e.answer),r:sentenceReading(e.ja.replace('＿＿',e.answer))})),JLPT_QUESTIONS.map(q=>({j:completedDrillSentence(q),r:sentenceReading(completedDrillSentence(q))})))`);
 for(const e of readings){assert.ok(e.r.trim(),e.j);assert.doesNotMatch(e.r,/[\p{Script=Han}々]/u,e.j);}
 assert.equal(a.run('sentenceReading("京都を訪れた際に、この写真を撮りました。")'),'きょうとをおとずれたさいに、このしゃしんをとりました。');
 assert.equal(a.run('sentenceReading("雨にもかかわらず、大勢の人が集まった。")'),'あめにもかかわらず、おおぜいのひとがあつまった。');
 assert.equal(a.run('Object.values(WORD_HELP_DATA.words).find(w=>w.s==="大勢").r'),'おおぜい');
 assert.match(a.run('sentenceReading("この教室では、生徒一人一人の理解度に応じて、宿題の量を変えている。")'),/ひとりひとり/);
 assert.match(a.run('exampleCard({j:"窓を開けたとたんに、冷たい風が入ってきた。",k:"",e:"",t:""},{p:""})'),/まどをあけたとたんに/);
});

test('question readings preserve blanks and do not include hidden answer parts',()=>{
 const a=loadApp();
 for(const q of a.snapshot('JLPT_QUESTIONS.filter(q=>q.kind==="choice")')){
  const r=a.run(`sentenceReading(${JSON.stringify(q.stem)})`);assert.ok(r.includes('＿＿'),q.id);
 }
 const q=a.snapshot('JLPT_QUESTIONS.find(q=>q.kind==="order")');
 const output=a.run(`drillPromptHTML(drillQuestion(${JSON.stringify(q.id)}),{})`);
 const reading=output.split('data-reading="')[1].split('"')[0];
 assert.equal((reading.match(/＿＿/g)||[]).length,3);assert.ok(reading.includes('★'));
});

test('new lessons advance meaning → example → quiz without awarding recall for navigation',()=>{
 const a=loadApp();a.reset();a.run('startStudy();');const first=a.run('S.q.q[0].id');
 assert.match(a.node('today').innerHTML,/id="lesson-next"/);assert.doesNotMatch(a.node('today').innerHTML,/id="got"/);
 assert.match(a.node('today').innerHTML,/data-guide-panel="1" hidden/);
 a.node('lesson-next').onclick();assert.equal(a.run('lessonStage()'),1);assert.equal(a.run('S.q.i'),0);
 assert.match(a.node('today').innerHTML,/data-guide-panel="0" hidden/);assert.equal(a.run(`boxOf('${first}')`),0);
 a.run('moveStudyHistory("daily",-1);');assert.equal(a.run('lessonStage()'),0);assert.equal(a.run('S.q.i'),0);
 a.node('lesson-next').onclick();const next=a.node('got').onclick;next();next();assert.equal(a.run('S.q.i'),1);assert.equal(a.run('S.q.q[S.q.i].id'),first);assert.equal(a.run('S.q.q[S.q.i].m'),'quiz');
 assert.equal(a.run('S.att[S.q.q[S.q.i].id]||0'),0);assert.equal(a.run('dayLedger().learned[S.q.q[S.q.i].id]'),1);
});

test('guided lesson position survives language, settings, pause and a saved reload',()=>{
 const a=loadApp();a.reset();a.run('startStudy();');a.node('lesson-next').onclick();const first=a.run('S.q.q[0].id');
 a.run('S.lang="th";updateStudyLanguage();setNewPatternLimit(20);');assert.equal(a.run('lessonStage()'),1);assert.equal(a.run('S.q.q[0].id'),first);
 a.run('S.q.started=false;save();startStudy();');assert.equal(a.run('lessonStage()'),1);
 const b=loadApp(a.snapshot('S'));assert.equal(b.run('lessonStage()'),1);assert.match(b.node('today').innerHTML,/id="got"/);
 a.run('moveDailyCard(-1,0,{id:"n2k01",m:"quiz"});');assert.equal(a.run('S.q.lessonStages[1]'),1);
});

test('normal due reviews skip introductory steps and keep the answer hidden',()=>{
 const a=loadApp();a.reset({newPerDay:0,box:{n2k01:3},last:{n2k01:'2026-09-01'}});a.run('startStudy();');
 assert.equal(a.run('S.q.q[0].m'),'quiz');assert.doesNotMatch(a.node('today').innerHTML,/id="lesson-next"|id="got"|data-guide-panel/);
 assert.equal(a.run('S.q.ans[0]'),undefined);assert.match(a.node('today').innerHTML,/data-toggle-reading/);
});
