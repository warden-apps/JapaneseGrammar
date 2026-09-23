const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
(async()=>{
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
    await context.addInitScript(()=>{if(!localStorage.getItem('sujimichi.v4'))localStorage.setItem('sujimichi.v4',JSON.stringify({lv:'all'}));});
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    const shot=name=>page.screenshot({path:path.join(__dirname,name+'.png'),fullPage:true});
    await page.goto(process.env.TEST_URL||'http://127.0.0.1:8775');
    await page.waitForFunction(()=>typeof drillInit==='function');
    assert.equal(await page.locator('#drill-scope option').count(),2);
    assert.ok(await page.locator('[data-start-drill]').isDisabled());
    await page.locator('#drill-scope').selectOption('all');
    await shot('jlpt-home-mobile');
    await page.locator('[data-start-drill]').click();
    const queue=await page.evaluate(()=>JSON.stringify(S.drill.session.queue));
    const seen=new Set();
    for(let i=0;i<10;i++){
      const current=await page.evaluate(()=>{const s=S.drill.session;return drillQuestion(s.queue[s.i].id);});
      seen.add(current.kind);
      assert.equal(await page.locator('[data-drill-answer]').count(),4);
      assert.equal(await page.locator('.pane.on .simple-feedback').count(),0);
      if(!i||current.kind==='order'||current.kind==='text')await shot('jlpt-'+current.kind+'-mobile');
      await page.locator(`[data-drill-answer="${i===0?(current.answer+1)%4:current.answer}"]`).click();
      await page.locator('#today .simple-feedback').waitFor();
      assert.ok((await page.locator('#today .simple-feedback h2').innerText()).includes(i===0?'Not quite':'Correct'));
      assert.equal(await page.locator('[data-drill-answer]:disabled').count(),4);
      if(i===0){
        await shot('jlpt-feedback-mobile');
        await page.reload();await page.locator('#today .simple-feedback').waitFor();
        assert.equal(await page.evaluate(()=>JSON.stringify(S.drill.session.queue)),queue);
        assert.equal(await page.evaluate(id=>S.drill.stats[id].attempts,current.id),1);
        await page.locator('[data-pause-drill]').click();
        assert.ok((await page.locator('[data-start-drill]').innerText()).includes('Continue'));
        await page.locator('[data-start-drill]').click();
        await page.locator('#today .simple-feedback').waitFor();
      }
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      await page.locator('[data-drill-next]').click();
    }
    assert.deepEqual(seen,new Set(['choice','order','text']));
    assert.ok((await page.locator('.drill-result h1').innerText()).includes('9 / 10'));
    assert.equal(await page.evaluate(()=>Object.keys(S.box).length),0,'random practice does not fake daily mastery');
    await page.locator('[data-pause-drill]').click();
    await page.locator('#drill-scope').selectOption('studied');
    assert.ok(await page.locator('[data-start-drill]').isDisabled(),'random exposure is not Study exposure');
    await page.locator('[data-start-study]').click();
    await page.locator('#quit').click();
    assert.ok(await page.locator('[data-start-drill]').isEnabled());
    await page.locator('[data-start-drill]').click();
    assert.ok(await page.evaluate(()=>S.drill.session.queue.every(item=>drillQuestion(item.id).gid==='n3a01')));
    await page.locator('#study-language').selectOption('th');
    assert.ok((await page.locator('#today').innerText()).includes('โจทย์สุ่ม'));
    await page.locator('#study-language').selectOption('en');
    await page.locator('[data-pause-drill]').click();
    // Simulate a scheduled later review in this isolated test browser.
    await page.evaluate(()=>{
      S.box.n3a01=2;S.att.n3a01=1;S.last.n3a01=addStudyDays(today(),-3);S.newPerDay=0;S.day=null;
      S.q={date:today(),q:[{id:'n3a01',m:'quiz'}],i:0,right:0,asked:0,gen:{},ans:{},rate:{},again:{},started:true,fin:false,nw:0,rv:1};
      save();renderToday();
    });
    await page.locator('#daily-recall-input').waitFor();
    assert.equal(await page.locator('#today .opt').count(),0);
    await shot('jlpt-daily-recall-mobile');
    await page.locator('#daily-recall-input').fill(await page.evaluate(()=>specAt(0).key));
    await page.locator('#daily-recall-form button').click();
    await page.locator('#today .simple-feedback').waitFor();
    await page.locator('#today [data-r]').click();
    assert.equal(await page.evaluate(()=>boxOf('n3a01')),3);
    await page.evaluate(()=>{
      S.q={date:today(),q:[{id:'n3a01',m:'quiz'}],i:0,right:0,asked:0,gen:{},ans:{},rate:{},again:{},started:true,fin:false,nw:0,rv:1};save();renderToday();
    });
    await page.locator('#daily-recall-input').fill('別の表現');
    await page.locator('#daily-recall-form button').click();
    assert.ok((await page.locator('#today').innerText()).includes('may still be valid Japanese'));
    assert.ok(await page.evaluate(()=>S.q.assisted[0]));
    const correct=await page.evaluate(()=>specAt(0).opts.findIndex(o=>o.ok));
    await page.locator('#today .opt').nth(correct).click();
    await page.locator('#today [data-r]').click();
    assert.equal(await page.evaluate(()=>boxOf('n3a01')),1);
    await page.locator('#quit').click();
    await page.locator('#drill-scope').selectOption('all');
    await page.locator('[data-start-drill]').click();
    await page.setViewportSize({width:1100,height:900});
    await shot('jlpt-drill-desktop');
    await page.locator('#nav [data-p="p-rec"]').click();
    const backup=JSON.parse(await page.locator('#bk').inputValue());
    assert.equal(backup.v,7);assert.ok(Object.keys(backup.drill.stats).length);
    await page.locator('#segtheme [data-v="dark"]').click();
    await page.locator('#nav [data-p="p-today"]').click();
    await shot('jlpt-drill-dark');
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
    await context.setOffline(true);await page.reload();
    await page.waitForFunction(()=>typeof JLPT_QUESTIONS!=='undefined'&&JLPT_QUESTIONS.length>=60);
    assert.equal(await page.locator('[data-drill-answer]').count(),4);
    assert.deepEqual(errors,[]);
    console.log('PASS: both scopes; all three formats; immediate feedback; resume; linked passages; Study-only encounters; Thai; typed daily recall; assisted-review scheduling; backup; mobile/desktop/dark; offline drill.');
    await context.close();
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
