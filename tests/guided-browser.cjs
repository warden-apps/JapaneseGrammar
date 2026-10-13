const assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(e.message));
  const shot=name=>page.screenshot({path:path.join(__dirname,name+'.png'),fullPage:true});
  const baseText=loc=>loc.evaluate(el=>{const copy=el.cloneNode(true);copy.querySelectorAll('rt').forEach(n=>n.remove());return copy.textContent;});
  async function checkReading(button){
   const target=button.locator('xpath=ancestor::*[contains(concat(" ",normalize-space(@class)," ")," reading-scope ")][1]').locator('.reading-target');
   const before=await baseText(target);await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true');
   assert.equal(await baseText(target),before);if(/[\p{Script=Han}々]/u.test(before))assert.ok(await target.locator('ruby').count());
   assert.equal(await target.locator('ruby').evaluateAll(nodes=>nodes.every(r=>/^[\p{Script=Han}々0-9０-９]+$/u.test(r.firstChild.textContent)&&r.querySelector('rt').textContent.trim())),true);
   return target;
  }
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8775');await page.locator('[data-start-study]').waitFor();await shot('guided-home-mobile');
  await page.locator('[data-start-study]').click();
  const first=await page.evaluate(()=>S.q.q[S.q.i].id);
  assert.equal(await page.locator('#today .meaning-section').isVisible(),true);assert.equal(await page.locator('#today .phrase-section').isVisible(),false);
  assert.equal(await page.locator('#today .primary-study:visible').count(),1);assert.equal(await page.locator('#today [data-study-back]').isDisabled(),true);
  await shot('guided-meaning-mobile');
  await page.locator('#lesson-next').click();assert.equal(await page.locator('#today .meaning-section').isVisible(),false);
  assert.equal(await page.locator('#today .phrase-section').isVisible(),true);assert.equal(await page.evaluate(()=>lessonStage()),1);
  const reading=page.locator('#today .phrase-panel:not([hidden]) .sentence-reading');
  await reading.focus();await page.keyboard.press('Enter');assert.equal(await reading.getAttribute('aria-pressed'),'true');
  assert.ok(await page.locator('#today .phrase-panel:not([hidden]) ruby').count());
  await page.keyboard.press('Space');assert.equal(await reading.getAttribute('aria-pressed'),'false');
  assert.equal(await page.locator('#today .phrase-panel:not([hidden]) ruby').count(),0);await checkReading(reading);
  const stageEvidence=await page.evaluate(()=>JSON.stringify({box:S.box,att:S.att,cor:S.cor,i:S.q.i}));
  await page.locator('#study-language [data-study-language="th"]').click();assert.equal(await reading.getAttribute('aria-pressed'),'true');assert.match(await reading.innerText(),/คำอ่าน/);
  assert.ok(await page.locator('#today .phrase-panel:not([hidden]) ruby').count());
  await shot('guided-reading-thai-mobile');
  await page.locator('#today .phrase-panel:not([hidden]) [data-cover-phrase]').click();assert.equal(await reading.isVisible(),false);
  await page.locator('#today .phrase-panel:not([hidden]) [data-cover-phrase]').click();assert.equal(await reading.isVisible(),true);
  assert.equal(await page.evaluate(()=>JSON.stringify({box:S.box,att:S.att,cor:S.cor,i:S.q.i})),stageEvidence);
  await page.locator('#quit').click();await page.locator('[data-start-study]').click();assert.equal(await page.evaluate(()=>lessonStage()),1);
  await page.reload();await page.locator('#got').waitFor();assert.equal(await page.evaluate(()=>S.q.q[S.q.i].id),first);
  await page.locator('#today [data-study-back]').click();await page.locator('#lesson-next').waitFor();assert.equal(await page.evaluate(()=>S.q.i),0);
  await page.locator('#study-language [data-study-language="en"]').click();await page.locator('#lesson-next').click();
  await shot('guided-example-mobile');await page.locator('#got').click();
  await page.locator('#today .opt').first().waitFor();assert.equal(await page.locator('#today .lesson-card').count(),0);
  assert.match(await page.locator('#today [aria-current="step"]').innerText(),/Try it/);
  const promptReading=page.locator('#today .question-reading .sentence-reading');const prompt=await checkReading(promptReading);
  assert.match(await baseText(prompt),/＿＿/);
  const wrong=await page.evaluate(()=>specAt(S.q.i).opts.findIndex(o=>!o.ok));await page.locator('#today .opt').nth(wrong).click();
  const feedbackReading=page.locator('#today .simple-feedback .sentence-reading');const feedback=await checkReading(feedbackReading);
  assert.doesNotMatch(await baseText(feedback),/＿＿/);
  await shot('guided-feedback-mobile');
  assert.equal(await page.evaluate(id=>S.att[id],first),1);await page.locator('#today [data-r]').click();assert.equal(await page.evaluate(id=>S.box[id],first),1);
  // Reading also annotates prompts and completed targeted-practice feedback.
  await page.evaluate(()=>practiceOnePattern('n3a05'));const trainingPrompt=await checkReading(page.locator('#training .sentence-reading'));
  assert.match(await baseText(trainingPrompt),/＿＿/);
  await page.locator('#training .opt').first().click();const trained=page.locator('#training .simple-feedback .sentence-reading');
  const trainingFeedback=await checkReading(trained);assert.doesNotMatch(await baseText(trainingFeedback),/＿＿/);
  await page.locator('#nav [data-p="p-rec"]').click();await page.locator('#segtheme [data-v="dark"]').click();
  await page.locator('#nav [data-p="p-today"]').click();await shot('guided-dark-mobile');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.setViewportSize({width:1280,height:900});await shot('guided-home-desktop');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await context.setOffline(true);await page.reload();await page.waitForFunction(()=>typeof SENTENCE_READINGS!=='undefined');
  await page.evaluate(()=>openDetail('n3a07'));const offline=page.locator('#sbody .phrase-panel:not([hidden]) .sentence-reading');
  const offlineSentence=await checkReading(offline);assert.ok((await offlineSentence.locator('rt').allTextContents()).includes('さい'));
  // Kanji remains a working word-lookup target even with ruby annotations.
  await offlineSentence.locator('.jp-word').filter({hasText:'利用'}).first().click();
  assert.equal(await page.locator('.word-reading').innerText(),'りよう');await page.locator('[data-close-word]').click();
  await context.setOffline(false);await page.locator('#sbody .d-close-top').click();
  await page.evaluate(()=>{S.lang='en';document.documentElement.dataset.theme='light';openDetail(GRAMMAR.find(g=>g.p==='〜上に').id);});
  await checkReading(page.locator('#sbody .phrase-panel:not([hidden]) .sentence-reading'));await shot('clean-library-furigana');
  const css=await page.evaluate(async()=>await (await fetch('study.css')).text());assert.match(css,/learning-route/);
  const counter=await page.evaluate(()=>{
   const target=document.createElement('p');target.lang='ja';target.textContent='3日間にわたって会議が行われた。';
   for(let i=0;i<3;i++){applyFurigana(target,'みっかかんにわたってかいぎがおこなわれた。',true);if(target.querySelector('rt').textContent!=='みっかかん')throw Error('Counter reading was split');applyFurigana(target,'',false);}
   return {text:target.textContent,nested:!!target.querySelector('.jp-word .jp-word'),empty:[...target.querySelectorAll('.jp-word')].some(b=>!b.textContent)};
  });
  assert.deepEqual(counter,{text:'3日間にわたって会議が行われた。',nested:false,empty:false});
  assert.deepEqual(errors,[]);
  console.log('PASS: clean ordered study; inline kanji-only furigana via mouse/keyboard/Thai; hide-and-say; Back/pause/reload; unchanged navigation evidence; prompt blanks; feedback; phone/desktop/dark; offline furigana and word lookup.');
  await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
