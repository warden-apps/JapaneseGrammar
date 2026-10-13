// Build once; browsers need only word-help-data.js, not Node or the full dictionaries.
// Usage: node build/make-word-help.cjs path/to/jmdict.json path/to/kuromoji
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const dictFile=path.resolve(process.argv[2]||'tmp/dictionary/jmdict/jmdict-eng-3.6.2.json');
const tokenizerDir=path.resolve(process.argv[3]||'tmp/dictionary/node_modules/kuromoji');
const dictionary=JSON.parse(fs.readFileSync(dictFile,'utf8'));
const kuromoji=require(tokenizerDir);
const toHira=s=>(s||'').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96));
const overrides={
  '大勢':['おおぜい','many people; a crowd (as in 大勢の人)','คนจำนวนมาก เช่น 大勢の人'],
  '際':['さい','occasion; in ～際に: a formal “when”','โอกาส; ใน ～際に คือ “เมื่อ” แบบทางการ'],
  '京都':['きょうと','Kyoto, a city in Japan','เกียวโต เมืองในญี่ปุ่น'],
  '東京':['とうきょう','Tokyo, the capital of Japan','โตเกียว เมืองหลวงของญี่ปุ่น'],
  '利用':['りよう','use; utilization','การใช้'],
  '登録':['とうろく','registration; signing up','การลงทะเบียน'],
  '必要':['ひつよう','necessary; needed','จำเป็น'],
  '写真':['しゃしん','photograph; picture','รูปถ่าย'],
  '訪れる':['おとずれる','to visit','ไปเยือน'],
  '確認':['かくにん','checking; confirmation','การตรวจสอบ / ยืนยัน'],
  '住所':['じゅうしょ','address','ที่อยู่'],
  '申し込み':['もうしこみ','application; signing up','การสมัคร'],
  '場合':['ばあい','case; situation','กรณี / สถานการณ์'],
  '次第':['しだい','circumstances; in ～次第: as soon as; in ～次第だ: depends on','ใน ～次第: ทันทีที่ / ใน ～次第だ: ขึ้นอยู่กับ']
};
const potentials={'会える':'会う','作れる':'作る','勝てる':'勝つ','取り組める':'取り組む','味わえる':'味わう','帰れる':'帰る','かえれる':'帰る','戻せる':'戻す','戻れる':'戻る','断れる':'断る','書ける':'書く','楽しめる':'楽しむ','歩ける':'歩く','聞き取れる':'聞き取る','ききとれる':'聞き取る','語れる':'語る','読み込める':'読み込む','買える':'買う','走れる':'走る','送れる':'送る','過ごせる':'過ごす','やり直せる':'やり直す','やりなおせる':'やり直す','とべる':'飛ぶ'};
const aliases={'お待ち':'待つ','お答え':'答える','お忙しい':'忙しい','おかけ':'かける','を通じて':'通じる','に関する':'関する','と同時に':'同時','揚げたて':'揚げる'};
const index=new Map();
for(const w of dictionary.words){for(const f of [...w.kanji,...w.kana]){if(!index.has(f.text))index.set(f.text,[]);index.get(f.text).push(w);}}
const filenames=fs.readdirSync(root).filter(n=>(n.endsWith('.js')||n==='index.html')&&!['word-help-data.js','word-help.js','sentence-readings.js'].includes(n));
const runs=new Set();
for(const n of filenames)for(const m of fs.readFileSync(path.join(root,n),'utf8').matchAll(/[\p{Script=Han}々〆ヶ\p{Script=Hiragana}\p{Script=Katakana}ー]+/gu))runs.add(m[0]);
kuromoji.builder({dicPath:path.join(tokenizerDir,'dict')}).build((err,tokenizer)=>{
  if(err)throw err;
  const words={},segments={};let serial=0,missing=new Set();
  function entry(token){
    const base=token.basic_form==='*'?token.surface_form:token.basic_form;
    const lookupBase=potentials[base]||aliases[base]||base;
    let reading=toHira(token.reading),source=index.get(lookupBase)||index.get(token.surface_form)||[];
    source=source.slice().sort((a,b)=>Number(b.kanji.some(k=>k.common)||b.kana.some(k=>k.common))-Number(a.kanji.some(k=>k.common)||a.kana.some(k=>k.common)));
    const matches=source.filter(w=>!reading||w.kana.some(k=>k.text===reading)||base!==token.surface_form);
    const selected=(matches.length?matches:source).slice(0,2);
    const senses=[];
    for(const w of selected)for(const s of w.sense){
      if(s.appliesToKanji[0]!=='*'&&!s.appliesToKanji.includes(lookupBase))continue;
      if(lookupBase===token.surface_form&&reading&&s.appliesToKana[0]!=='*'&&!s.appliesToKana.includes(reading))continue;
      const gloss=s.gloss.filter(g=>g.lang==='eng').slice(0,3).map(g=>g.text).join('; ');
      if(gloss&&!senses.includes(gloss))senses.push(gloss);
    }
    const custom=overrides[base];
    if(!reading&&selected[0])reading=selected[0].kana[0].text;
    if(custom&&base===token.surface_form)reading=custom[0];
    if(!reading&&!senses.length)return null;
    const definitions=custom?[custom[1]]:senses.slice(0,3);
    if(potentials[base]&&definitions.length)definitions[0]='Can / be able to: '+definitions[0].replace(/^to /,'');
    const item={s:token.surface_form,b:base,r:reading,e:definitions,t:custom?custom[2]:'',br:custom?custom[0]:lookupBase===base?selected[0]?.kana[0]?.text||'':'',ids:selected.map(w=>w.id)};
    if(!item.e.length)missing.add(base);
    const key=JSON.stringify(item);if(!entry.ids.has(key)){const id=String(++serial);entry.ids.set(key,id);words[id]=item;}return entry.ids.get(key);
  }
  entry.ids=new Map();
  for(const run of runs){
    const tokens=tokenizer.tokenize(run);const parts=tokens.map(t=>{
      if(!/[\p{Script=Han}々]/u.test(t.surface_form)&&!['名詞','動詞','形容詞','副詞','接続詞'].includes(t.pos))return [t.surface_form,null];
      return [t.surface_form,entry(t)];
    });
    if(parts.some(p=>p[1]))segments[run]=parts;
  }
  const output=require('./add-thai-word-help.cjs').addThai({version:1,date:dictionary.dictDate,words,segments});
  fs.writeFileSync(path.join(root,'word-help-data.js'),'/* JMdict / EDRDG: CC BY-SA 4.0. App-authored Thai glosses and corrections. Readings: IPADIC. See DICTIONARY-NOTICES.md. */\nvar WORD_HELP_DATA='+JSON.stringify(output)+';\n');
  fs.writeFileSync(path.join(root,'tmp/dictionary/missing-glosses.json'),JSON.stringify([...missing].sort(),null,2));
  console.log(`${Object.keys(words).length} word forms, ${Object.keys(segments).length} text segments; ${missing.size} lemmas with readings only.`);
});
