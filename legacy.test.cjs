const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

// Exercise the actual app scripts and delegated click handlers. The DOM here
// only supplies the rendering surface; no scheduling or persistence is mocked.
function loadApp(initialState) {
  const nodes = new Map();
  const storage = new Map();
  if (initialState) storage.set('sujimichi.v4', JSON.stringify(initialState));
  let time = new Date('2026-09-19T12:00:00').getTime();
  const element = (id = '') => {
    const attrs = new Map(id === 'bk' ? [['readonly', 'readonly']] : []);
    const classes = new Set();
    return {
      id, style: {}, dataset: {}, listeners: {}, value: '', textContent: '', innerHTML: '',
      classList: {
        add(...names) { names.forEach(n => classes.add(n)); },
        remove(...names) { names.forEach(n => classes.delete(n)); },
        contains(n) { return classes.has(n); },
        toggle(n, force) {
          const next = force === undefined ? !classes.has(n) : force;
          if (next) classes.add(n); else classes.delete(n);
          return next;
        }
      },
      addEventListener(type, callback) { this.listeners[type] = callback; },
      setAttribute(n, v) { attrs.set(n, v); },
      removeAttribute(n) { attrs.delete(n); },
      hasAttribute(n) { return attrs.has(n); },
      getAttribute(n) { return attrs.get(n) || null; },
      querySelector() { return null; }, querySelectorAll() { return []; },
      appendChild() {}, remove() {}, select() {}, setSelectionRange() {},
      focus() {}, scrollIntoView() {}, click() { this.listeners.click?.call(this, {target: this}); },
      closest() { return null; }
    };
  };
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, element(id));
    return nodes.get(id);
  };
  class StudyDate extends Date {
    constructor(...args) { super(...(args.length ? args : [time])); }
    static now() { return time; }
  }
  const context = {
    console, Date: StudyDate, URL, Blob, setTimeout() {}, clearTimeout() {}, setInterval() {},
    requestAnimationFrame(fn) { fn(); }, confirm() { return true; }, alert() {},
    localStorage: { getItem: k => storage.get(k) || null, setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) },
    navigator: {}, location: { protocol: 'file:', pathname: '/index.html' },
    document: {
      hidden: false, activeElement: null, body: element('body'), documentElement: element('html'),
      listeners: {}, getElementById: node,
      querySelector(selector) { return selector === 'nav button[data-p="p-train"]' ? node('nav-train') : null; },
      querySelectorAll() { return []; }, createElement: element,
      addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); },
      execCommand() { return true; }
    },
    addEventListener() {}, scrollTo() {}, matchMedia() { return {matches: false, addEventListener() {}}; }
  };
  context.window = context;
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const src = match[1].match(/\bsrc=["']([^"']+)["']/);
    if (src && /^https?:/.test(src[1])) continue;
    const source = src ? fs.readFileSync(path.join(root, src[1].split('?')[0]), 'utf8') : match[2];
    vm.runInContext(source, context, {filename: src ? src[1] : 'index.html'});
  }
  function run(code) { return vm.runInContext(code, context); }
  function snapshot(code) { return JSON.parse(run(`JSON.stringify(${code})`)); }
  function reset(extra = {}) {
    const state = {
      box: {}, last: {}, seen: {}, lapse: {}, att: {}, cor: {}, promoted: {}, mastery: {},
      days: [], lang: 'en', lv: 'all', newPerDay: 3, maxRev: 40, rateBtns: 4,
      theme: 'light', dayStart: 4, q: null, day: null, ...extra
    };
    run(`S=${JSON.stringify(state)}; clearCaches();`);
  }
  function click(id, selector, dataset) {
    const target = {dataset, closest: s => s === selector ? target : null};
    node(id).listeners.click.call(node(id), {target});
  }
  function documentClick(dataset = {}, attributes = []) {
    const target = {dataset, hasAttribute: name => attributes.includes(name), closest: s => s === 'button' ? target : null};
    for (const listener of context.document.listeners.click || []) listener({target});
  }
  return {context, node, run, snapshot, reset, click, documentClick, storage, setTime(iso) { time = new Date(iso).getTime(); run('clearCaches()'); }};
}

module.exports = {loadApp};
if (require.main === module) {
test('rebuilding a partly completed day preserves answers and does not grant another new batch', () => {
  const app = loadApp();
  app.reset();
  app.run(`
    buildToday();
    var first = S.q.q[0].id;
    S.box[first] = 1;
    S.last[first] = today();
    dayLedger().learned[first] = 1;
    S.q.i = 1;
    S.q.ans[0] = 2;
    S.q.rate[0] = 'good';
  `);
  const committed = app.snapshot('S.day.newIds');
  app.run('buildToday(true); buildToday(true);');
  assert.deepEqual(app.snapshot('S.day.newIds'), committed);
  assert.equal(app.run('S.q.i'), 1);
  assert.equal(app.run('S.q.q[0].id'), committed[0]);
  assert.equal(app.run('S.q.ans[0]'), 2);
  assert.equal(app.run('S.q.rate[0]'), 'good');
  assert.equal(app.run('S.q.q.filter(c => c.m === "learn").length'), 3);
});

test('switching JLPT filters cannot silently grant another daily allowance', () => {
  const app = loadApp();
  app.reset({lv: 'N3'});
  app.run('buildToday();');
  const firstBatch = app.snapshot('S.day.newIds');
  app.run('S.lv="N2"; buildToday(true); S.lv="all"; buildToday(true);');
  assert.deepEqual(app.snapshot('S.day.newIds'), firstBatch);
  assert.equal(new Set(app.snapshot('S.day.newIds')).size, 3);
});

test('a wrong quiz answer cannot be promoted by pressing Good', () => {
  const app = loadApp();
  app.reset();
  app.run(`
    var id = GRAMMAR[0].id;
    S.box[id] = 3; S.last[id] = '2026-09-01';
    S.q = {date: today(), q:[{id:id,m:'quiz'}], i:0, right:0, asked:0,
      gen:{0:{kind:'sense',exIdx:0,opts:[{t:'wrong',ok:false},{t:GRAMMAR[0].p,ok:true}]}},
      ans:{}, rate:{}, again:{}, started:true, fin:false, nw:0, rv:1};
  `);
  app.click('today', '.opt', {i: '0'});
  app.click('today', '[data-r]', {r: 'good'});
  assert.equal(app.run('S.box[id]'), 1);
  assert.equal(app.run('S.q.rate[0]'), 'again');
  assert.equal(app.run('S.lapse[id]'), 1);
  assert.ok(app.run('!dayLedger().done[id]'));
  assert.ok(app.run('S.q.q.some((item,index) => index > 0 && item.id === id)'));
});

test('same-day repetitions do not inflate the spacing ladder, including recovery after a miss', () => {
  const app = loadApp();
  app.reset();
  app.run(`var id=GRAMMAR[0].id; S.box[id]=3; S.last[id]='2026-09-01'; applyRating(id,'good');`);
  assert.equal(app.run('S.box[id]'), 4);
  app.run(`applyRating(id,'good'); applyRating(id,'easy');`);
  assert.equal(app.run('S.box[id]'), 4);
  app.run(`applyRating(id,'again'); applyRating(id,'good');`);
  assert.equal(app.run('S.box[id]'), 1);
  assert.equal(app.run(`whenLabel(id,'good')`), app.run(`whenLabel(id,'hard')`), 'rating labels must reflect the same-day promotion guard');
  app.setTime('2026-09-20T12:00:00');
  app.run(`applyRating(id,'good');`);
  assert.equal(app.run('S.box[id]'), 2);
});

test('streak follows the configured study-day boundary before 4am', () => {
  const app = loadApp();
  app.reset({days: ['2026-09-17'], dayStart: 4});
  app.setTime('2026-09-19T02:00:00');
  assert.equal(app.run('today()'), '2026-09-18');
  assert.equal(app.run('streak()'), 1);
  app.run('markStudied();');
  assert.equal(app.run('streak()'), 2);
});

test('old backups restore with valid defaults, while malformed backups leave live progress intact', () => {
  const app = loadApp();
  app.reset();
  const id = app.run('GRAMMAR[0].id');
  const valid = {v: 4, box: {[id]: 2}, last: {[id]: '2026-09-18'}, att: {[id]: 4}, cor: {[id]: 3}, days: ['2026-09-18']};
  app.run(`var backupFixture = JSON.parse(${JSON.stringify(JSON.stringify(valid))});`);
  const restored = app.snapshot('normaliseBackup(backupFixture)');
  assert.equal(restored.box[id], 2);
  assert.equal(restored.cor[id], 3);
  assert.ok(restored.mastery && typeof restored.mastery === 'object');
  const before = app.snapshot('S');
  for (const malformed of [{box: []}, {box: {[id]: -1}}, {box: {[id]: 9}}, {box: {[id]: 2}, att: {[id]: -3}}, {box: {[id]: 2}, days: 'yesterday'}]) {
    app.run(`backupFixture = JSON.parse(${JSON.stringify(JSON.stringify(malformed))});`);
    assert.throws(() => app.run('normaliseBackup(backupFixture)'));
    assert.deepEqual(app.snapshot('S'), before);
  }
});

test('backup export and restore retain learning evidence and user settings', () => {
  const app = loadApp();
  app.reset({lang: 'th', lv: 'N2', newPerDay: 3, maxRev: 20, theme: 'dark', dayStart: 7});
  app.run(`var id=GRAMMAR[0].id; S.box[id]=2; S.promoted[id]='2026-09-18'; drawRecord();`);
  const exported = JSON.parse(app.node('bk').value);
  assert.ok(exported.v >= 6);
  assert.deepEqual(exported.promoted, app.snapshot('S.promoted'));
  assert.deepEqual(exported.mastery, app.snapshot('S.mastery'));
  app.run(`var backupFixture = JSON.parse(${JSON.stringify(JSON.stringify(exported))});`);
  const restored = app.snapshot('normaliseBackup(backupFixture)');
  for (const key of ['lang', 'lv', 'newPerDay', 'maxRev', 'theme', 'dayStart']) {
    assert.equal(restored[key], app.run(`S.${key}`), key);
  }
  assert.deepEqual(restored.promoted, exported.promoted);
  app.reset();
  app.node('bk').removeAttribute('readonly');
  app.node('bk').value = JSON.stringify(exported);
  app.node('bkload').click();
  assert.deepEqual(app.snapshot('S.promoted'), exported.promoted);
  assert.deepEqual(app.snapshot('S.box'), exported.box);
  for (const key of ['lang', 'lv', 'newPerDay', 'maxRev', 'theme', 'dayStart']) {
    assert.equal(app.run(`S.${key}`), restored[key], `actual restore: ${key}`);
  }
});

test('a malformed restore cannot partially overwrite current progress before reporting an error', () => {
  const app = loadApp();
  app.reset();
  app.run(`var id=GRAMMAR[0].id; S.box[id]=4; S.att[id]=8; S.cor[id]=7; save();`);
  const before = app.snapshot('S');
  const id = app.run('id');
  app.node('bk').removeAttribute('readonly');
  app.node('bk').value = JSON.stringify({v:6, box:{[id]:1}, att:{[id]:-2}});
  app.node('bkload').click();
  assert.deepEqual(app.snapshot('S'), before);
});

test('automatically generated questions do not label interchangeable change patterns as wrong', () => {
  const app = loadApp();
  app.reset();
  const result = app.snapshot(`(() => {
    const g = byId('n2b23');
    return Array.from({length:50}, () => makeSpec(g));
  })()`);
  for (const question of result) {
    assert.ok(question, 'every studied pattern needs a usable question');
    if (question.opts) {
      assert.equal(new Set(question.opts.map(o => o.t)).size, question.opts.length);
      if (question.kind === 'cloze' && question.ct.includes('時間が経つ')) {
        assert.ok(!question.opts.some(o => !o.ok && /にしたがって|とともに|に伴って/.test(o.t)), 'valid synonyms must not be marked incorrect');
      }
    }
  }
});

test('an unanswered quiz cached by the old app is replaced without erasing its queue progress', () => {
  const app = loadApp({
    box:{n3a01:2}, last:{n3a01:'2026-09-18'}, seen:{n3a01:1}, lapse:{}, att:{}, cor:{}, days:[],
    lang:'en',lv:'all',newPerDay:3,maxRev:40,rateBtns:4,theme:'light',dayStart:4,
    q:{date:'2026-09-19',q:[{id:'n3a01',m:'quiz'}],i:0,right:0,asked:0,again:{},ans:{},rate:{},
      started:true,fin:false,nw:0,rv:1,
      gen:{0:{kind:'sense',exIdx:0,opts:[{t:'legacy random answer',ok:true},{t:'legacy synonym',ok:false}]}}}
  });
  assert.equal(app.run('S.q.q[0].id'), 'n3a01');
  assert.equal(app.run('S.q.i'), 0);
  assert.ok(app.run(`!S.q.gen[0].opts.some(o => o.t === 'legacy synonym')`));
  assert.equal(app.run('S.q.asked'), 0);
});
}
