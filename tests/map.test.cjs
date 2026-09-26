const test = require('node:test');
const assert = require('node:assert/strict');
const {loadApp} = require('./legacy.test.cjs');

const count = (html, needle) => html.split(needle).length - 1;

test('every library entry has exactly one home on the grammar map', () => {
  const app = loadApp();
  const {grammar, map, regions, comparisons} = app.snapshot(`({
    grammar: GRAMMAR.map(g => g.id), map: GRAMMAR_MAP, regions: GRAMMAR_MAP_REGIONS,
    comparisons: SIMPLE_COMPARISONS.map(c => c.id)
  })`);
  const known = new Set(grammar), home = new Map(), regionIds = new Set(regions.map(r => r.id));
  assert.equal(regionIds.size, regions.length);
  for (const region of regions) for (const field of ['ja', 'en', 'th']) assert.ok(region[field]?.trim(), `${region.id}: ${field}`);
  assert.equal(new Set(map.map(f => f.id)).size, map.length, 'family IDs are unique');
  for (const family of map) {
    assert.ok(regionIds.has(family.region), `${family.id}: unknown region`);
    for (const field of ['glyph', 'ja', 'en', 'th', 'q_en', 'q_th']) assert.ok(family[field]?.trim(), `${family.id}: ${field}`);
    assert.equal([...family.glyph].length, 1, `${family.id}: the glyph is one character`);
    assert.equal(new Set(family.branches.map(b => b.id)).size, family.branches.length, `${family.id}: branch IDs are unique`);
    for (const branch of family.branches) {
      const where = `${family.id}.${branch.id}`;
      assert.ok(branch.en?.trim() && branch.th?.trim(), `${where}: bilingual label`);
      assert.ok(branch.ids.length, `${where}: a branch needs its own patterns`);
      if (branch.compare) assert.ok(comparisons.includes(branch.compare), `${where}: unknown comparison ${branch.compare}`);
      for (const id of branch.ids) {
        assert.ok(known.has(id), `${where}: unknown entry ${id}`);
        assert.ok(!home.has(id), `${id} is placed twice (${home.get(id)} and ${where})`);
        home.set(id, where);
      }
      for (const id of branch.see || []) {
        assert.ok(known.has(id), `${where}: unknown cross-link ${id}`);
        assert.ok(!branch.ids.includes(id), `${where}: ${id} links to its own branch`);
      }
    }
  }
  assert.deepEqual(grammar.filter(id => !home.has(id)), [], 'unplaced entries');
  assert.equal(home.size, grammar.length);
  for (const family of map) for (const branch of family.branches) for (const id of branch.see || []) {
    assert.notEqual(home.get(id), `${family.id}.${branch.id}`, `${id}: a cross-link must point away from its home`);
  }
});

test('the Library opens on the map; searching shows the list and clearing returns to the map', () => {
  const app = loadApp();
  app.reset({lv: 'all'});
  app.run('drawList();');
  assert.equal(app.node('gmap').hidden, false);
  assert.equal(app.node('lib-list').hidden, true);
  const overview = app.node('gmap').innerHTML;
  assert.equal(count(overview, 'data-map-family='), 20, 'twenty topic buttons');
  assert.equal(count(overview, 'class="gmap-region"'), 5, 'five regions');
  assert.match(overview, /<small>445<\/small>/, 'the hub counts the whole library');
  app.node('q').value = 'ところだ';
  app.run('drawList();');
  assert.equal(app.node('gmap').hidden, true);
  assert.equal(app.node('lib-list').hidden, false);
  assert.match(app.node('list').innerHTML, /data-id="n3a01"/);
  app.node('q').value = '';
  app.run('drawList();');
  assert.equal(app.node('gmap').hidden, false, 'an empty search returns to the saved view');
  app.documentClick({lib: 'list'});
  assert.equal(app.run('S.libView'), 'list', 'the chosen view is remembered');
  assert.equal(app.node('gmap').hidden, true);
});

test('the list groups every entry under its map topic, once, with its level', () => {
  const app = loadApp();
  app.reset({lv: 'all', lang: 'en'});
  app.run('S.libView="list"; drawList();');
  const list = app.node('list').innerHTML;
  const ids = app.snapshot('GRAMMAR.map(g => g.id)');
  for (const id of ids) assert.equal(count(list, `data-id="${id}"`), 1, `${id} appears once`);
  assert.equal(count(list, 'class="grp"'), 20, 'one group per topic');
  assert.ok(list.indexOf('The instant it happens') < list.indexOf('data-id="n2e13"'), 'branch captions introduce their rows');
  assert.match(list, /<span class="row-lv">N2<\/span>/);
  assert.ok(list.indexOf('>Time<') < list.indexOf('>Cause<'), 'topics follow the map order');
  app.run('S.lv="N3"; drawList();');
  assert.equal(count(app.node('list').innerHTML, 'data-id='), app.run('pool().length'), 'the level filter still applies');
});

test('topic names are searchable in English, Thai and Japanese', () => {
  const app = loadApp();
  for (const term of ['thanks or blame', 'ขอบคุณ หรือ โทษ', '原因']) {
    assert.ok(app.run(`SIDX.n3a14.indexOf(${JSON.stringify(term.toLowerCase())}) > -1`), term);
  }
});

test('a topic opens as a tree of every pattern, honours the level filter and offers comparisons', () => {
  const app = loadApp();
  app.reset({lv: 'all', lang: 'en'});
  app.documentClick({mapFamily: 'cause'});
  assert.equal(app.run('MAP_STATE.family'), 'cause');
  const tree = app.node('gmap').innerHTML;
  const family = app.snapshot('MAP_FAMILIES.cause');
  for (const branch of family.branches) {
    assert.match(tree, new RegExp(`id="fm-cause-${branch.id}"`), branch.id);
    for (const id of branch.ids) assert.equal(count(tree, `data-detail="${id}"`), 1, `${id} is a leaf`);
    for (const id of branch.see || []) assert.match(tree, new RegExp(`class="fm-see"><button class="fm-leaf" data-detail="${id}"`), `${id} is a cross-link`);
  }
  assert.match(tree, /data-simple-compare="causes"/, 'branches link to their side-by-side table');
  assert.match(tree, /Why did it happen\?/);
  app.run('S.lv="N2"; drawList();');
  const n2 = app.node('gmap').innerHTML;
  assert.doesNotMatch(n2, /data-detail="n3a14"/, 'N3 entries are hidden on the N2 filter');
  assert.match(n2, /data-map-levels/, 'hidden entries are announced with a way to show them');
  app.documentClick({}, ['data-map-home']);
  assert.equal(app.run('MAP_STATE.family'), null);
  assert.match(app.node('gmap').innerHTML, /gmap-canvas/);
});

test('lessons show where they sit on the map and link to nearby patterns', () => {
  const app = loadApp();
  app.reset({lv: 'all', lang: 'en'});
  const card = app.run('lessonCard(byId("n3a14"))');
  assert.match(card, /On the grammar map/);
  assert.match(card, /data-map-family="cause" data-map-branch="credit"/);
  assert.match(card, /Cause › Thanks or blame/);
  assert.match(card, /class="map-sib" data-detail="n3a13"/, 'the sibling in the same branch');
  assert.ok(card.indexOf('map-context') < card.indexOf('</article>'), 'the section sits inside the lesson card');
  const multi = app.run('lessonCard(byId("n3a15"))');
  assert.match(multi, /data-map-family="means" data-map-branch="purpose"/, 'a second meaning links to its other branch');
  const compact = app.run('lessonCard(byId("n3a14"),{compact:true})');
  assert.match(compact, /class="map-crumb-line"/);
  assert.doesNotMatch(compact, /map-context/, 'the study step stays short');
  app.run('S.lang="th";');
  assert.match(app.run('lessonCard(byId("n3a14"))'), /สาเหตุ › ขอบคุณ หรือ โทษ/);
});

test('Progress breaks study down by map topic and links back to the map', () => {
  const app = loadApp();
  app.reset({lv: 'all', lang: 'en'});
  app.run(`S.box.n3a14=5; S.last.n3a14=today(); S.box.n3a13=2; S.last.n3a13=today(); drawRecord();`);
  const rows = app.node('brk').innerHTML;
  assert.equal(count(rows, 'class="brk-row map-topic"'), 20);
  assert.match(rows, /data-map-family="cause"[\s\S]*?<span class="brk-n">2\/17<\/span>/, 'started / total for the topic');
  assert.match(rows, /data-map-family="cause"[\s\S]*?class="solid" style="width:6%"/, 'review level 5 is shown separately');
  app.documentClick({mapFamily: 'cause'});
  assert.equal(app.run('MAP_STATE.family'), 'cause');
});

test('the map view preference stays out of backups', () => {
  const app = loadApp();
  app.reset({lv: 'all'});
  app.run('S.libView="list";');
  assert.equal(app.run('exportProgress().libView'), undefined);
});
