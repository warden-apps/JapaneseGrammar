// Build offline kana readings. Existing authored readings take precedence.
// Usage: node build/make-sentence-readings.cjs [path/to/kuromoji]
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const dir=path.resolve(process.argv[2]||path.join(root,'tmp/dictionary/node_modules/kuromoji'));
const kuromoji=require(dir),app=require('../tests/legacy.test.cjs').loadApp();
const corpus=app.snapshot('({grammar:GRAMMAR,models:GRAMMAR.flatMap(phraseModels),guides:LESSON_GUIDES,comparisons:SIMPLE_COMPARISONS,exercises:MASTERY_EXERCISES,questions:JLPT_QUESTIONS,completed:JLPT_QUESTIONS.map(completedDrillSentence)})');
const texts=new Map(),authored=new Map();
function add(s,k){if(typeof s!=='string'||!/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(s))return;texts.set(s,true);if(k&&k.trim())authored.set(s,k.trim());}
function walk(o){if(!o||typeof o!=='object')return;if(o.j)add(o.j,o.k);if(o.ja)add(o.ja,o.kana);for(const [k,v] of Object.entries(o)){if(['stem','before','after','example','answer','chunk'].includes(k)&&typeof v==='string')add(v);if(typeof v==='object')walk(v);}}
walk(corpus);corpus.completed.forEach(s=>add(s));
corpus.questions.filter(q=>q.kind==='order').forEach(q=>add(q.before+q.parts.map((_,i)=>i===q.star?'★':'＿＿').join(' ')+q.after));
const hira=s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96));
kuromoji.builder({dicPath:path.join(dir,'dict')}).build((err,t)=>{
 if(err)throw err;
 // Reviewed contextual phrases that IPADIC otherwise segments/read incorrectly.
 const corrections={'一人一人':'ひとりひとり','一人暮らし':'ひとりぐらし','一人につき':'ひとりにつき','一人として':'ひとりとして','一人では':'ひとりでは','一人で':'ひとりで','一人だ':'ひとりだ','二人で':'ふたりで','一日中':'いちにちじゅう','大勢の人':'おおぜいのひと','初めての方':'はじめてのかた'};
 const read=s=>{for(const [from,to] of Object.entries(corrections))s=s.split(from).join(to);return t.tokenize(s).map(w=>w.surface_form==='日本'?'にほん':/[\p{Script=Han}々]/u.test(w.surface_form)?hira(w.reading||w.surface_form):w.surface_form).join('');};
 // Preserve authored context readings while filling only the blank's answer.
 corpus.exercises.forEach(e=>authored.set(e.ja.replace('＿＿',e.answer),e.kana.replace('＿＿',read(e.answer))));
 const readings={};for(const s of texts.keys())readings[s]=authored.get(s)||read(s);
 for(const [s,k] of authored)readings[s]=k;
 const unresolved=Object.entries(readings).filter(([s,k])=>/[\p{Script=Han}々]/u.test(k));
 fs.writeFileSync(path.join(root,'sentence-readings.js'),'/* Authored kana + Kuromoji/IPADIC-derived readings. See DICTIONARY-NOTICES.md. */\nvar SENTENCE_READINGS='+JSON.stringify(readings)+';\n');
 console.log(Object.keys(readings).length+' offline readings; '+unresolved.length+' contain unresolved kanji.');
 if(unresolved.length)console.log(JSON.stringify(unresolved,null,2));
});
