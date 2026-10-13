// Uses an isolated browser profile. Reset/restore never touch the user's data.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8775');
  await page.locator('[data-start-study]').waitFor();
  assert.equal(await page.locator('[data-start-drill]').isDisabled(),true);
  for(const lv of ['all','N3','N2']){await page.locator('#lvpick [data-lv="'+lv+'"]').click();assert.equal(await page.evaluate(()=>S.lv),lv);}
  await page.locator('#nav [data-p="p-list"]').click();
  await page.locator('#q').fill('no-such-pattern-87654');assert.equal(await page.locator('#list [data-id]').count(),0);
  await page.locator('#q').fill('');
  for(const f of ['weak','learn','done','new','all']){await page.locator('[data-f="'+f+'"]').click();assert.equal(await page.evaluate(()=>LISTF),f);}
  const lessons=await page.evaluate(()=>{
   let tabs=0;
   for(const g of GRAMMAR){
    openDetail(g.id);const body=document.getElementById('sbody');
    if(!body.querySelector('[data-study-pattern="'+g.id+'"]'))throw Error('Missing practice action '+g.id);
    const buttons=[...body.querySelectorAll('[data-phrase-index]')];
    if(!buttons.length)throw Error('No phrase '+g.id);
    for(const b of buttons){
     b.click();tabs++;const panels=body.querySelectorAll('.phrase-panel:not([hidden])');
     if(panels.length!==1||panels[0].dataset.phrasePanel!==b.dataset.phraseIndex)throw Error('Broken phrase tab '+g.id);
     const reading=panels[0].querySelector('.sentence-reading'),sentence=panels[0].querySelector('.reading-target'),original=sentence.textContent;
     reading.click();if(reading.getAttribute('aria-pressed')!=='true')throw Error('Broken reading '+g.id);
     const copy=sentence.cloneNode(true);copy.querySelectorAll('rt').forEach(n=>n.remove());if(copy.textContent!==original)throw Error('Reading changed sentence '+g.id);
     for(const ruby of sentence.querySelectorAll('ruby')){const base=ruby.cloneNode(true);base.querySelectorAll('rt').forEach(n=>n.remove());if(!/^[\p{Script=Han}々0-9０-９]+$/u.test(base.textContent)||!ruby.querySelector('rt').textContent.trim())throw Error('Reading added above kana '+g.id);}
     const bare=sentence.cloneNode(true);bare.querySelectorAll('ruby').forEach(n=>n.remove());if(/[\p{Script=Han}々]/u.test(bare.textContent))throw Error('Missing kanji reading '+g.id);
     if(/[\p{Script=Han}々]/u.test(original)&&!sentence.querySelector('ruby'))throw Error('No furigana '+g.id);
     reading.click();if(sentence.querySelector('ruby')||sentence.textContent!==original||reading.getAttribute('aria-pressed')!=='false')throw Error('Reading did not turn off '+g.id);
    }
    const cover=body.querySelector('.phrase-panel:not([hidden]) [data-cover-phrase]');cover.click();
    if(!body.querySelector('.phrase-panel:not([hidden]) .phrase-japanese').hidden)throw Error('Cover failed '+g.id);cover.click();
    for(const b of body.querySelectorAll('[data-detail]'))if(!byId(b.dataset.detail))throw Error('Broken lesson link');
   }
   closeSheet();return {lessons:GRAMMAR.length,tabs};
  });
  assert.equal(lessons.lessons,467);console.log('PASS: '+lessons.lessons+' lesson sheets and '+lessons.tabs+' phrase tabs, hide/show controls and related links.');
  await page.locator('#p-list [data-view="groups"]').click();
  const groups=await page.evaluate(()=>simpleGroups().map(g=>g.id));
  for(const id of groups){
   await page.locator('[data-simple-compare="'+id+'"]').click();assert.ok(await page.locator('.comparison-entry').count());
   await page.locator('.comparison-pattern').first().click();await page.locator('#sheet.on').waitFor();await page.locator('.d-close').last().click();
   await page.locator('[data-all-comparisons]').click();
  }
  await page.locator('[data-browse-library]').click();
  await page.locator('#p-list .library-links details summary').click();
  await page.locator('#p-list [data-view="forms"]').click();assert.ok((await page.locator('#training').innerText()).length>500);
  for(const lv of ['N3','N2']){await page.locator('#lvpick [data-lv="'+lv+'"]').click();assert.ok((await page.locator('.pane.on').innerText()).length>500,'level switch must not empty reference page');}
  for(const d of await page.locator('#training details').all()){const wasOpen=await d.getAttribute('open')!==null;await d.locator('summary').first().click();assert.equal(await d.getAttribute('open')!==null,!wasOpen);}
  await page.locator('[data-browse-library]').click();await page.locator('#p-list [data-view="coverage"]').click();
  for(const d of await page.locator('.coverage-chapter,.coverage-skills').all()){
   await d.locator('summary').click();await d.locator('[data-detail]').first().click();await page.locator('#sheet.on').waitFor();await page.locator('.d-close-top').click();
  }
  console.log('PASS: all comparison groups, form disclosures and chapter/support sections open their lesson links.');
  await page.evaluate(()=>openDetail('n3a07'));
  // Audio wiring is tested with deterministic speech APIs; actual voices depend on the device.
  await page.evaluate(()=>{
   window.testSpeech=[];window.SpeechSynthesisUtterance=class{constructor(t){this.text=t;}};Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){},getVoices(){return [{lang:'ja-JP'}];},speak(u){testSpeech.push({text:u.text,lang:u.lang});u.onstart&&u.onstart();}}});
  });
  await page.locator('#sbody .phrase-panel:not([hidden]) [data-say-phrase]').click();
  assert.equal(await page.evaluate(()=>testSpeech[0].lang),'ja-JP');assert.match(await page.locator('#audio-status').innerText(),/Playing/);
  const word=page.locator('#sbody .phrase-panel:not([hidden]) .jp-word').first();await word.click();
  await page.locator('[data-listen-word]').click();assert.equal(await page.evaluate(()=>testSpeech.length),2);
  await page.locator('[data-close-word]').click();assert.equal(await page.locator('#word-help-dialog').getAttribute('open'),null);
  await page.evaluate(()=>Object.defineProperty(window,'speechSynthesis',{configurable:true,value:undefined}));
  await page.locator('#sbody .phrase-panel:not([hidden]) [data-say-phrase]').click();assert.match(await page.locator('#audio-status').innerText(),/unavailable/);
  await page.keyboard.press('Escape');assert.equal(await page.locator('#sheet').getAttribute('class'),'sheet');
  await page.locator('#nav [data-p="p-rec"]').click();
  for(const [seg,field] of [['segnew','newPerDay'],['segrev','maxRev'],['segday','dayStart'],['segtheme','theme']]){
   for(const b of await page.locator('#'+seg+' button').all()){
    const v=await b.getAttribute('data-v');await b.click();assert.equal(String(await page.evaluate(f=>S[f],field)),v);
   }
  }
  assert.equal(await page.locator('#segrate').count(),0);
  await page.locator('#custom-new').fill('27');await page.locator('#custom-new-form button').click();assert.equal(await page.evaluate(()=>S.newPerDay),27);
  await page.locator('#custom-new').fill('101');await page.locator('#custom-new-form button').click();assert.equal(await page.evaluate(()=>S.newPerDay),27);
  await page.locator('#study-method summary').click();assert.match(await page.locator('#study-method-body').innerText(),/not validated/);
  await page.locator('#study-language [data-study-language="th"]').click();assert.match(await page.locator('#study-method-body').innerText(),/งานวิจัย/);
  await page.locator('#study-language [data-study-language="en"]').click();
  await page.locator('#segtheme [data-v="dark"]').click();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:path.join(__dirname,'audit-method-mobile.png'),fullPage:true});
  await page.locator('#backup-editor summary').click();
  const backup=await page.locator('#bk').inputValue();
  await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied');}}});document.execCommand=()=>false;});
  await page.locator('#bkcopy').click();await page.waitForFunction(()=>document.getElementById('bkcopy').textContent.includes('unavailable'));
  await page.evaluate(()=>navigator.clipboard.writeText=async text=>{window.copiedBackup=text;});await page.locator('#bkcopy').click();
  await page.waitForFunction(()=>document.getElementById('bkcopy').textContent.includes('Copied'));assert.equal(await page.evaluate(()=>copiedBackup),backup);
  const downloadPromise=page.waitForEvent('download');await page.locator('#bkdownload').click();const download=await downloadPromise;
  assert.deepEqual(JSON.parse(fs.readFileSync(await download.path(),'utf8')),JSON.parse(backup));
  await page.locator('#bkload').click();await page.locator('#bk').fill('{invalid');await page.locator('#bkload').click();
  assert.equal(await page.evaluate(()=>S.newPerDay),27);assert.equal(await page.locator('#bk').inputValue(),'{invalid');
  await page.locator('#bk').fill(backup);await page.locator('#bkload').click();assert.equal(await page.locator('#bk').getAttribute('readonly'),'readonly');
  const resetDetails=page.locator('details').filter({has:page.locator('#reset')});await resetDetails.locator('summary').click();
  const beforeReset=await page.evaluate(()=>JSON.stringify(S.seen));page.once('dialog',d=>d.dismiss());await page.locator('#reset').click();
  assert.equal(await page.evaluate(()=>JSON.stringify(S.seen)),beforeReset);
  page.once('dialog',d=>d.accept());await page.locator('#reset').click();assert.equal(await page.evaluate(()=>Object.keys(S.seen).length),0);
  await page.locator('#bkload').click();await page.locator('#bk').fill(backup);await page.locator('#bkload').click();
  assert.equal(await page.evaluate(()=>JSON.stringify(S.seen)),beforeReset);
  console.log('PASS: settings, custom validation, EN/TH method notes, themes, audio routing/failure, word close, clipboard success/failure, download, invalid/valid restore, reset cancel/confirm and recovery.');
  await page.evaluate(()=>{drillState().scope='all';startDrill();openDetail('n2k01');});
  const oldDrill=await page.evaluate(()=>JSON.stringify(drillState().session));await page.locator('[data-study-pattern="n2k01"]').click();
  assert.equal(await page.evaluate(()=>drillState().active),false);assert.equal(await page.evaluate(()=>JSON.stringify(drillState().session)),oldDrill);
  const id=await page.evaluate(()=>S.q.q[S.q.i].id);assert.equal(id,'n2k01');
  const correct=await page.evaluate(()=>specAt(S.q.i).opts.findIndex(o=>o.ok));await page.locator('#today .opt').nth(correct).click();
  const saved=await page.evaluate(()=>JSON.stringify({sp:specAt(S.q.i),answer:S.q.ans[S.q.i],att:S.att.n2k01}));
  await page.locator('#nav [data-p="p-rec"]').click();await page.locator('#segnew [data-v="20"]').click();
  await page.locator('#nav [data-p="p-today"]').click();await page.locator('#today [data-r]').waitFor();
  assert.equal(await page.evaluate(()=>JSON.stringify({sp:specAt(S.q.i),answer:S.q.ans[S.q.i],att:S.att.n2k01})),saved);
  await page.reload();await page.locator('#today [data-r]').waitFor();
  assert.equal(await page.evaluate(()=>JSON.stringify({sp:specAt(S.q.i),answer:S.q.ans[S.q.i],att:S.att.n2k01})),saved);
  await page.locator('#today [data-r]').click();
  await page.evaluate(()=>practiceOnePattern('n2a03'));await page.locator('#training .sentence-card').waitFor();
  await page.locator('#lvpick [data-lv="N3"]').click();await page.locator('.study-home').waitFor();
  assert.equal(await page.evaluate(()=>hasSavedPractice()),false,'incompatible saved session must not take over Study');
  await page.locator('#lvpick [data-lv="N2"]').click();await page.locator('[data-start-study]').click();await page.locator('#training .sentence-card').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.setViewportSize({width:1280,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  console.log('PASS: targeted practice exits saved drill, pending feedback survives settings and reload, phone/desktop width, no uncaught page errors.');
  await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
