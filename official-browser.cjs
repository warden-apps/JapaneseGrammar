const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
(async()=>{
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    const shot=name=>page.screenshot({path:path.join(__dirname,name+'.png'),fullPage:true});
    await page.goto(process.env.TEST_URL||'http://127.0.0.1:8775');
    await page.waitForFunction(()=>typeof JLPT_OFFICIAL_SOURCES!=='undefined');
    assert.equal(await page.evaluate(()=>S.lv),'N2');
    await page.locator('#drill-scope').selectOption('all');
    assert.match(await page.locator('.drill-pool-note').innerText(),/118.*44 official.*74 original/);
    assert.equal(await page.locator('#drill-scope option').count(),2);
    await shot('n2-home-mobile');
    await page.locator('[data-start-drill]').click();
    assert.ok(await page.evaluate(()=>S.drill.session.queue.some(x=>drillQuestion(x.id).source)));
    // Deterministic isolated fixture: exercise an official order and all five passage blanks.
    await page.evaluate(()=>{
      const ids=['official-2012-n2-48',50,51,52,53,54].map(x=>typeof x==='string'?x:'official-2018-n2-'+x);
      S.drill.session={version:1,scope:'all',lv:'N2',queue:ids.map(id=>({id,options:[3,1,0,2]})),i:0,answers:{},created:today()};
      S.drill.active=true;save();renderToday();
    });
    assert.equal(await page.locator('.star-slot').count(),1);
    assert.match(await page.locator('#today .question-source').innerText(),/Official N2.*2012.*Q48/);
    await shot('n2-official-order-mobile');
    for(let i=0;i<6;i++){
      const q=await page.evaluate(()=>drillQuestion(S.drill.session.queue[S.drill.session.i].id));
      if(i){
        assert.match(await page.locator('.current-blank').innerText(),new RegExp('【'+i+'】'));
        assert.equal(await page.locator('.passage-filled').count(),i-1);
        assert.equal(await page.locator('.passage-blank').count(),6-i);
        if(i===1)await shot('n2-official-passage-mobile');
      }
      await page.locator(`[data-drill-answer="${i===0?0:q.answer}"]`).click();
      await page.locator('.simple-feedback').waitFor();
      if(!i){
        assert.match(await page.locator('.simple-feedback').innerText(),/Not quite/);
        assert.match((await page.locator('.completed-order').innerText()).replace(/\s/g,''),/したいと思うことはやらせてやりたい/);
        await page.locator('.simple-feedback details').last().locator('summary').click();
        assert.ok(await page.locator('.simple-feedback a[href*="N2answer.pdf"]').isVisible());
        await shot('n2-official-feedback-mobile');
        await page.reload();await page.locator('.simple-feedback').waitFor();
        assert.equal(await page.evaluate(()=>S.drill.stats['official-2012-n2-48'].attempts),1);
      }
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      await page.locator('[data-drill-next]').click();
    }
    assert.match(await page.locator('.drill-result h1').innerText(),/5 \/ 6/);
    await page.locator('[data-pause-drill]').click();
    await page.locator('[data-start-drill]').click();
    await page.locator('#study-language').selectOption('th');
    assert.match(await page.locator('#today').innerText(),/โจทย์สุ่ม/);
    await page.setViewportSize({width:1100,height:900});await shot('n2-official-desktop');
    await page.locator('#nav [data-p="p-rec"]').click();
    await page.locator('#segtheme [data-v="dark"]').click();
    await page.locator('#nav [data-p="p-today"]').click();await shot('n2-official-dark');
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
    await context.setOffline(true);await page.reload();
    await page.waitForFunction(()=>typeof JLPT_QUESTIONS!=='undefined'&&JLPT_QUESTIONS.length===153);
    assert.equal(await page.locator('[data-drill-answer]').count(),4);
    assert.equal(await page.evaluate(()=>drillPool('all').length),118);
    assert.deepEqual(errors,[]);
    console.log('PASS: N2 default; 118 eligible; source badges; official order/key; five-blank passage; wrong/correct feedback; resume; Thai; mobile/desktop/dark; all new modules offline.');
    await context.close();
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
