const assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},timezoneId:'Asia/Tokyo',reducedMotion:'reduce'});
  await context.addInitScript(()=>{
   const RealDate=Date;let time=RealDate.parse(localStorage.getItem('test-clock')||'2026-11-03T03:00:00Z');
   window.Date=class extends RealDate{constructor(...args){super(...(args.length?args:[time]));}static now(){return time;}};
   window.setStudyTestDay=iso=>{time=RealDate.parse(iso);localStorage.setItem('test-clock',iso);clearCaches();};
  });
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(10000);
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8775/');await page.locator('[data-start-study]').waitFor();
  await page.evaluate(()=>{
   S.newPerDay=0;S.box.n2a25=4;S.last.n2a25=today();S.q=null;S.day=null;buildToday();markStudyEncounter('n2a25');
   const d=drillState();d.scope='all';d.session={version:1,scope:'all',lv:'N2',queue:[{id:'j18',options:[3,1,0,2]}],i:0,answers:{}};save();renderToday();
  });
  await page.locator('[data-start-drill]').click();await page.locator('[data-drill-answer="1"]').click();
  assert.match(await page.locator('#today .simple-feedback h2').innerText(),/Not quite/);
  assert.equal(await page.locator('[data-drill-answer]:disabled').count(),4);
  assert.deepEqual(await page.evaluate(()=>drillState().reviews.j18),{last:'2026-11-03',due:'2026-11-04'});
  await page.locator('#study-language [data-study-language="th"]').click();
  assert.match(await page.locator('#today .simple-feedback h2').innerText(),/ยังไม่ถูก/);
  await page.reload();await page.locator('#today .simple-feedback').waitFor();
  assert.equal(await page.evaluate(()=>drillState().stats.j18.attempts),1);
  await page.locator('[data-drill-next]').click();await page.locator('[data-pause-drill]').click();
  assert.equal(await page.evaluate(()=>remaining()),0,'Not pushed straight back into the same-day queue');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await context.setOffline(true);await page.evaluate(()=>setStudyTestDay('2026-11-04T03:00:00Z'));await page.reload();
  await page.locator('[data-start-study]').click();
  assert.equal(await page.evaluate(()=>specAt(S.q.i).jlptId),'j18');
  const index=await page.evaluate(()=>specAt(S.q.i).opts.findIndex(o=>o.ok));await page.locator('#today .opt').nth(index).click();
  assert.match(await page.locator('#today .simple-feedback h2').innerText(),/ถูกต้อง/);
  await page.locator('#today [data-r]').click();
  assert.equal(await page.evaluate(()=>!!drillState().reviews.j18),false);
  assert.equal(await page.evaluate(()=>S.box.n2a25),4);assert.equal(await page.evaluate(()=>S.last.n2a25),'2026-11-03');
  // Completed repair and its history survive offline reload and backup export.
  await page.reload();assert.equal(await page.evaluate(()=>!!exportProgress().drill.reviews.j18),false);
  assert.equal(await page.evaluate(()=>exportProgress().drill.lastPractised.j18),'2026-11-04');
  await page.evaluate(()=>{
   const d=drillState();d.active=false;d.scope='all';d.session={version:1,i:0};save();renderToday();
  });
  await page.locator('[data-start-drill]').click();assert.equal(await page.locator('[data-drill-answer]').count(),4);
  // A due passage remains intact in the mixed round, with no later-blank leakage.
  await page.evaluate(()=>{
   const d=drillState();d.session=null;d.reviews['kanzen-text-2']={last:'2026-11-02',due:'2026-11-03'};startDrill();
  });
  assert.deepEqual(await page.evaluate(()=>drillState().session.queue.slice(0,3).map(q=>q.id)),['kanzen-text-1','kanzen-text-2','kanzen-text-3']);
  await page.locator('[data-drill-answer="0"]').click();
  assert.match(await page.locator('.passage-text').innerText(),/【2】/);assert.match(await page.locator('.passage-text').innerText(),/【3】/);
  await page.locator('[data-drill-next]').click();
  const q=await page.evaluate(()=>drillQuestion(drillState().session.queue[drillState().session.i].id));
  await page.locator(`[data-drill-answer="${q.answer}"]`).click();
  assert.equal(await page.evaluate(()=>!!drillState().reviews['kanzen-text-2']),false);
  await page.screenshot({path:path.join(__dirname,'learning-review-thai-mobile.png'),fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.setViewportSize({width:1280,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  console.log('PASS: delayed drill repairs in daily Study, score and Thai feedback, offline day rollover, no early promotion, backup/reload, malformed-session recovery, intact passage repairs, mobile/desktop.');
  await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
