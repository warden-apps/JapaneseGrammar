const test=require('node:test');
const assert=require('node:assert/strict');
const {loadApp}=require('./legacy.test.cjs');

// Independently transcribed from page 1 of each official N2 answer-key PDF.
const officialKeys={
  2012:[3,2,4,4,1,3,3,3,1,2,2,1,2,1,4,3,3,2,4,1,3,1],
  2018:[1,1,2,3,1,4,2,2,3,4,3,4,3,4,1,2,3,2,2,4,1,3]
};
test('all 44 official N2 answers match the published answer keys, with precise provenance',()=>{
  const a=loadApp(),bank=a.snapshot('JLPT_QUESTIONS');
  assert.equal(bank.filter(q=>q.source).length,44);
  for(const [year,answers] of Object.entries(officialKeys)){
    answers.forEach((answer,index)=>{
      const n=33+index,q=bank.find(q=>q.id===`official-${year}-n2-${n}`);
      assert.ok(q);assert.equal(q.answer+1,answer,q.id);
      assert.equal(q.source.number,n);assert.equal(q.source.edition,+year);
      assert.equal(q.source.section,n<45?7:n<50?8:9);
      assert.equal(q.level,'N2');
      assert.ok(q.source.page>=1&&q.source.page<=7);
      if(q.kind==='order')assert.equal(q.parts[q.star],q.options[q.answer].text,q.id);
    });
  }
  assert.equal(bank.filter(q=>q.id.startsWith('n2-transfer-')).length,48);
  assert.ok(bank.filter(q=>q.id.startsWith('n2-transfer-')).every(q=>!q.source&&q.level==='N2'));
});
test('N2 is the fresh default and official exam level does not hide questions tagged to foundation lessons',()=>{
  const a=loadApp();assert.equal(a.run('S.lv'),'N2');
  assert.equal(a.run('drillPool("all").length'),118);
  assert.equal(a.run('drillPool("all").filter(q=>q.source).length'),44);
  assert.ok(a.run('drillPool("all").some(q=>q.source&&byId(q.gid).lv==="N3")'));
  const b=loadApp({lv:'N3'});assert.equal(b.run('S.lv'),'N3');
  assert.equal(b.run('drillPool("all").filter(q=>q.source).length'),0);
});
test('studied official questions require all tested structures, and daily practice respects secondary prerequisites',()=>{
  const a=loadApp();a.reset({lv:'N2'});
  a.run('markStudyEncounter("n3b13");');
  assert.ok(a.run('!drillPool("studied").some(q=>q.id==="official-2018-n2-42")'));
  for(let n=0;n<8;n++)assert.notEqual(a.run('makeSpec(byId("n3b13")).jlptId'),'official-2018-n2-42');
  a.run('markStudyEncounter("n3b16");');
  assert.ok(a.run('drillPool("studied").some(q=>q.id==="official-2018-n2-42")'));
  assert.ok(a.run('questionTargets(drillQuestion("official-2018-n2-42")).every(encounteredInStudy)'));
});
test('five-blank official passages are eligible as a whole and remain contiguous in mixed N2 rounds',()=>{
  const a=loadApp();a.reset({lv:'N2'});
  a.run('var t=drillTargets(drillQuestion("official-2018-n2-50"));t.slice(1).forEach(markStudyEncounter);');
  assert.equal(a.run('drillPool("studied").filter(q=>q.passage==="official-2018-n2-passage").length'),0);
  a.run('markStudyEncounter(t[0]);');
  assert.equal(a.run('drillPool("studied").filter(q=>q.passage==="official-2018-n2-passage").length'),5);
  const bank=a.snapshot('JLPT_QUESTIONS');let passages=0;
  for(let i=0;i<100;i++){
    const questions=a.snapshot('makeDrillQueue("all")').map(x=>bank.find(q=>q.id===x.id));
    assert.equal(questions.length,10);assert.equal(new Set(questions.map(q=>q.id)).size,10);
    assert.ok(questions.some(q=>q.source));assert.equal(new Set(questions.map(q=>q.kind)).size,3);
    questions.forEach((q,at)=>{
      if(q.source&&q.blank===1){
        passages++;
        assert.deepEqual(questions.slice(at,at+5).map(x=>[x.passage,x.blank]),[1,2,3,4,5].map(n=>[q.passage,n]));
      }
    });
  }
  assert.ok(passages>0);
});
test('official sentence-order feedback assembles coherent full sequences, including the two different desires in 2012 Q48',()=>{
  const a=loadApp();
  const orders={
    '2012-45':[1,4,2,3],'2012-46':[2,4,1,3],'2012-47':[2,3,4,1],'2012-48':[1,4,3,2],'2012-49':[2,4,3,1],
    '2018-45':[1,4,3,2],'2018-46':[2,1,4,3],'2018-47':[3,2,1,4],'2018-48':[3,4,1,2],'2018-49':[4,2,1,3]
  };
  for(const [key,seq] of Object.entries(orders)){
    const [year,n]=key.split('-'),q=a.snapshot(`drillQuestion('official-${year}-n2-${n}')`);
    assert.deepEqual(q.parts,seq.map(i=>q.options[i-1].text));
  }
  assert.match(a.run('completedDrillSentence(drillQuestion("official-2012-n2-48"))'),/子どもがしたいと思うことはやらせてやりたい/);
});
test('official question attribution is visible, keys appear after answering, and explanations never solve later passage blanks',()=>{
  const a=loadApp();a.reset({lv:'N2'});
  a.run('var q=drillQuestion("official-2018-n2-50");');
  const before=a.run('drillSourceHTML(q,false)'),after=a.run('drillFeedback(q,0)');
  assert.match(before,/Official N2.*2018.*Q50/);assert.match(before,/N2G.pdf#page=5/);
  assert.doesNotMatch(before,/N2answer.pdf/);assert.match(after,/N2answer.pdf/);
  assert.match(after,/by this app/);
  assert.doesNotMatch(after,/結果に違いない|使用されている|こうして生まれたのが/);
  a.run('var last=drillQuestion("official-2018-n2-54");var session={queue:[50,51,52,53,54].map(n=>({id:"official-2018-n2-"+n,options:[0,1,2,3]})),i:4,answers:{0:{pick:0,correct:false},1:{pick:1,correct:true},2:{pick:3,correct:true},3:{pick:0,correct:true}}};');
  const prompt=a.run('drillPromptHTML(last,session)');
  assert.match(prompt,/ご存じだろうか/);assert.match(prompt,/【5】/);assert.doesNotMatch(prompt,/結果に違いない/);
});
test('v7 backup retains new official/original attempts and daily source labels survive review rendering',()=>{
  const a=loadApp();a.reset({lv:'N2'});
  a.run('drillState().stats["official-2018-n2-33"]={attempts:2,correct:1,last:today()};drillState().daily["n2-transfer-01"]=3;');
  assert.deepEqual(a.snapshot('normaliseBackup(exportProgress()).drill.stats'),a.snapshot('S.drill.stats'));
  assert.equal(a.run('normaliseBackup(exportProgress()).drill.daily["n2-transfer-01"]'),3);
  a.run('var q=drillQuestion("official-2018-n2-33"),g=byId(q.gid),sp={jlptId:q.id,kind:"cloze",ct:q.stem.replace("＿＿","\\u0001"),key:q.options[q.answer].text,opts:q.options.map((o,i)=>({t:o.text,ok:i===q.answer}))};');
  assert.match(a.run('questionHTML(g,sp)'),/Official N2/);
});
