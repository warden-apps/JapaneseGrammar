// Start node build/serve.cjs 8775 first. Requires Playwright and Chrome.
const assert = require('node:assert/strict');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const url = process.env.TEST_URL || 'http://127.0.0.1:8775';
(async () => {
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  try {
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
    // Existing users retain their previous all-level preference.
    await context.addInitScript(()=>{if(!localStorage.getItem('sujimichi.v4'))localStorage.setItem('sujimichi.v4',JSON.stringify({lv:'all'}));});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const shot=name=>page.screenshot({path:path.join(__dirname,name+'.png'),fullPage:true});
    await page.goto(url);
    await page.waitForFunction(()=>typeof simpleInit==='function');
    assert.equal(await page.locator('#nav button').count(),3);
    assert.equal(await page.locator('.pane.on .primary-study').count(),1);
    assert.equal(await page.locator('#training [data-start-study]').count(),0);
    await shot('simple-home-mobile');
    await page.locator('#today [data-start-study]').click();
    assert.equal(await page.locator('#today .form-row').count(),3);
    assert.equal(await page.locator('#today .lesson-more').getAttribute('open'),null);
    assert.equal(await page.locator('#today .lesson-contrast').getAttribute('open'),null);
    assert.ok((await page.locator('#today').innerText()).includes('just about to start'));
    await shot('simple-lesson-mobile');
    const firstId=await page.evaluate(()=>S.q.q[S.q.i].id);
    await page.locator('#got').click();
    assert.equal(await page.evaluate(()=>S.q.q[S.q.i].id),firstId,'learn, then immediately practise the same grammar');
    await shot('simple-question-mobile');
    const wrong=await page.evaluate(()=>S.q.gen[S.q.i].opts.findIndex(o=>!o.ok));
    await page.locator('#today .opt').nth(wrong).click();
    assert.equal(await page.locator('#today .simple-feedback').count(),1);
    await page.reload();
    await page.locator('#today .simple-feedback').waitFor();
    const attempts=await page.evaluate(()=>S.att[S.q.q[S.q.i].id]);
    await page.locator('#today [data-r="again"]').click();
    assert.equal(attempts,1);
    assert.equal(await page.evaluate(id=>S.box[id],firstId),1);
    // Complete the short daily session, including reveal-first recall entries.
    for(let n=0;n<16;n++){
      if(await page.locator('#today [data-rest-study]').count())break;
      if(await page.locator('#today [data-start-study]').count())break;
      if(await page.locator('#got').count()){await page.locator('#got').click();continue;}
      if(await page.locator('#recall-reveal').count()){await page.locator('#recall-reveal').click();continue;}
      if(await page.locator('[data-daily-choices]').count()){await page.locator('[data-daily-choices]').click();continue;}
      if(await page.locator('#today [data-r]').count()){await page.locator('#today [data-r]').click();continue;}
      const correct=await page.evaluate(()=>S.q.gen[S.q.i].opts.findIndex(o=>o.ok));
      await page.locator('#today .opt').nth(correct).click();
    }
    if(await page.locator('[data-rest-study]').count())await page.locator('[data-rest-study]').click();
    await page.locator('#nav [data-p="p-list"]').click();
    await page.locator('#p-list [data-view="groups"]').click();
    await page.locator('[data-simple-compare="causes"]').click();
    assert.equal(await page.locator('.comparison-entry').count(),6);
    for(const label of ['Caused by','Thanks to','blame','public notice'])assert.ok((await page.locator('#training').innerText()).includes(label));
    await shot('simple-causes-mobile');
    await page.setViewportSize({width:1100,height:900});
    await shot('simple-causes-desktop');
    await page.locator('.comparison-pattern').first().click();
    await page.locator('#sheet.on').waitFor();
    assert.ok(await page.locator('#sbody .lesson-card').count());
    await page.locator('.d-close-top').click();
    await page.locator('#study-language').selectOption('th');
    assert.ok((await page.locator('#training').innerText()).includes('ต้องขอบคุณ'));
    await page.locator('#study-language').selectOption('en');
    await page.locator('[data-browse-library]').click();
    await page.locator('#p-list .library-links details summary').click();
    await page.locator('#p-list [data-view="coverage"]').click();
    const chapter=page.locator('.coverage-chapter').nth(15);
    await chapter.locator('summary').click();
    assert.ok((await chapter.innerText()).includes('Because'));
    await chapter.locator('[data-simple-compare="causes"]').click();
    assert.equal(await page.locator('.comparison-entry').count(),6);
    await page.locator('#nav [data-p="p-list"]').click();
    await page.locator('#q').fill('ところだ');
    await page.locator('#list [data-id="n3a01"]').click();
    await page.locator('[data-study-pattern="n3a01"]').click();
    assert.ok(await page.locator('#training .sentence-card').count());
    await page.locator('#training .training-actions summary').click();
    await page.locator('#training [data-help="reveal"]').click();
    assert.ok(await page.locator('#training .simple-feedback').count());
    await page.locator('#nav [data-p="p-today"]').click();
    assert.ok((await page.locator('#today [data-start-study]').innerText()).includes('saved'));
    await page.locator('#today [data-start-study]').click();
    await page.locator('#training .simple-feedback').waitFor();
    await page.locator('#nav [data-p="p-rec"]').click();
    const exported=JSON.parse(await page.locator('#bk').inputValue());
    assert.equal(exported.v,7);assert.ok(Object.keys(exported.mastery.items).length);
    const download=page.waitForEvent('download');await page.locator('#bkdownload').click();
    assert.match((await download).suggestedFilename(),/^sujimichi-progress-/);
    await page.locator('#segtheme [data-v="dark"]').click();
    await page.locator('#nav [data-p="p-today"]').click();
    await shot('simple-dark-desktop');
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
    await context.setOffline(true);await page.reload();
    await page.waitForFunction(()=>typeof LESSON_GUIDES!=='undefined'&&Object.keys(LESSON_GUIDES).length>=38);
    assert.equal(await page.locator('#nav button').count(),3);
    assert.deepEqual(errors,[]);
    console.log('PASS: one Study action; 3-part ところ; lesson→practice; error scheduling; saved answers; short session; cause meanings; Thai/English; chapter comparisons; targeted practice; backup download; dark/mobile layout; offline reload.');
    await context.close();
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
