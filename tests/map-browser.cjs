// Start node build/serve.cjs 8775 first. Requires Playwright and Chrome.
const assert = require('node:assert/strict');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const url = process.env.TEST_URL || 'http://127.0.0.1:8775';
(async () => {
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  try {
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const shot=name=>page.screenshot({path:path.join(__dirname,name+'.png'),fullPage:true});
    const noOverflow=async where=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,where+': no sideways scrolling');
    await page.goto(url);
    await page.waitForFunction(()=>typeof mapInit==='function');
    // A fresh install starts on N2, and the Library opens on the map.
    await page.locator('#nav [data-p="p-list"]').click();
    await page.locator('#gmap .gmap-canvas').waitFor();
    assert.equal(await page.locator('#lib-list').isVisible(),false);
    assert.equal(await page.locator('.gmap-family').count(),20);
    await page.waitForFunction(()=>document.querySelectorAll('.gmap-wires path').length===25);
    assert.equal(await page.locator('.gmap-hub small').innerText(),String(await page.evaluate(()=>pool().length)));
    await noOverflow('mobile overview');
    await shot('map-overview-mobile');
    // A topic opens as a tree; N3 foundations can be added from inside it.
    await page.locator('[data-map-family="cause"]').first().click();
    await page.locator('.fm-tree').waitFor();
    const n2Leaves=await page.locator('.fm-branch .fm-leaves>li:not(.fm-see)').count();
    assert.equal(n2Leaves,await page.evaluate(()=>mapFamilyIds(MAP_FAMILIES.cause).length));
    await page.locator('[data-map-levels]').click();
    assert.equal(await page.evaluate(()=>S.lv),'all');
    assert.equal(await page.locator('.fm-branch .fm-leaves>li:not(.fm-see)').count(),17);
    await noOverflow('mobile family');
    await shot('map-family-mobile');
    // A pattern opens its lesson, which shows its neighbours and leads back to its branch.
    await page.locator('.fm-leaf[data-detail="n3a14"]').click();
    await page.locator('#sheet.on .map-context').waitFor();
    await page.locator('#sheet .map-sib[data-detail="n3a13"]').click();
    await page.locator('#sbody .lesson-card[data-lesson="n3a13"]').waitFor();
    await page.locator('#sheet .map-crumb').click();
    await page.locator('#sheet.on').waitFor({state:'hidden'});
    await page.locator('#fm-cause-credit.is-focus').waitFor();
    const branchTop=await page.locator('#fm-cause-credit').evaluate(el=>el.getBoundingClientRect().top);
    assert.ok(branchTop>0&&branchTop<400,'the linked branch is scrolled into view');
    // Side-by-side comparison, then back to the same topic.
    await page.locator('#fm-cause-credit [data-simple-compare="causes"]').click();
    assert.equal(await page.locator('#training .comparison-entry').count(),6);
    await page.locator('#training [data-browse-library]').click();
    await page.locator('.fm-tree').waitFor();
    // Search shows the list; clearing it returns to the map.
    await page.locator('#q').fill('原因');
    assert.equal(await page.locator('#gmap').isVisible(),false);
    assert.ok(await page.locator('#list [data-id="n3a14"]').count());
    await page.locator('#q').fill('');
    await page.locator('#gmap .fm-tree').waitFor();
    // Map and list views are remembered.
    await page.locator('[data-lib="list"]').click();
    assert.equal(await page.locator('#list .grp').count(),20);
    await page.reload();
    await page.waitForFunction(()=>typeof mapInit==='function');
    assert.equal(await page.evaluate(()=>S.libView),'list');
    await page.locator('#nav [data-p="p-list"]').click();
    await page.locator('[data-lib="map"]').click();
    await page.locator('#gmap .gmap-canvas').waitFor();
    // Progress rows open their topic.
    await page.locator('#nav [data-p="p-rec"]').click();
    assert.equal(await page.locator('#brk .map-topic').count(),20);
    await page.locator('#brk [data-map-family="certainty"]').click();
    await page.locator('#p-list.on .fm[data-region="stance"]').waitFor();
    // Thai labels, dark theme and the wide logic-chart layout.
    await page.locator('#study-language').selectOption('th');
    assert.ok((await page.locator('#gmap').innerText()).includes('ได้ยินมาว่า'));
    await page.locator('#study-language').selectOption('en');
    await page.locator('#nav [data-p="p-rec"]').click();
    await page.locator('#segtheme [data-v="dark"]').click();
    await page.locator('#nav [data-p="p-list"]').click();
    await page.setViewportSize({width:1100,height:900});
    const [node,leaves]=await Promise.all([page.locator('#fm-certainty-heard .fm-bnode').boundingBox(),page.locator('#fm-certainty-heard .fm-leaves').boundingBox()]);
    assert.ok(leaves.x>node.x+node.width,'wide screens put patterns to the right of their branch');
    await shot('map-family-dark-desktop');
    await page.locator('[data-map-home]').click();
    await page.waitForFunction(()=>document.querySelectorAll('.gmap-wires path').length===25);
    await shot('map-overview-dark-desktop');
    await page.setViewportSize({width:390,height:844});
    await noOverflow('mobile after resize');
    // Works offline, including the new modules.
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
    await context.setOffline(true);await page.reload();
    await page.waitForFunction(()=>typeof GRAMMAR_MAP!=='undefined'&&typeof mapInit==='function');
    await page.locator('#nav [data-p="p-list"]').click();
    await page.locator('#gmap .gmap-canvas').waitFor();
    assert.deepEqual(errors,[]);
    console.log('PASS: map by default; wires; topic tree; N3 + N2 from a topic; lesson neighbours; crumb back to branch; comparison round trip; search/list/map; remembered view; Progress links; Thai; dark desktop logic chart; mobile width; offline.');
    await context.close();
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
