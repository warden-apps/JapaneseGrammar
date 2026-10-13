// Original Thai learner glosses and corrections to ambiguous dictionary matches.
// Run directly to enrich the bundled data, or via make-word-help.cjs on a rebuild.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function loadThai(){
  const raw={};
  for(const [i,line] of fs.readFileSync(path.join(__dirname,'word-thai.tsv'),'utf8').split(/\r?\n/).entries()){
    if(!line||line.startsWith('#'))continue;
    const parts=line.split('\t');
    if(parts.length!==2||!parts[0]||!parts[1]||raw[parts[0]])throw Error('Invalid or duplicate Thai entry on line '+(i+1));
    raw[parts[0]]=parts[1];
  }
  const resolved={};
  function resolve(key,seen=[]){
    if(resolved[key])return resolved[key];
    if(!raw[key]||seen.includes(key))throw Error('Missing or cyclic Thai alias: '+key);
    const value=raw[key].startsWith('=')?resolve(raw[key].slice(1),seen.concat(key)):raw[key];
    if(!/[ก-๙]/u.test(value))throw Error('Missing Thai text: '+key);
    return resolved[key]=value;
  }
  Object.keys(raw).forEach(key=>resolve(key));return resolved;
}
// Prefer the grammar/ordinary vocabulary sense actually used in the app.
// These corrections replace unrelated homophone senses, not the Japanese sentence.
const english={
  'いる':'to be; to exist (people or animals); after ～て, ongoing action or state',
  'よう':'manner; appearance; ～ようだ: seems; ～ように: so that / as',
  'こと':'thing; matter; nominalizes an action or clause',
  'もの':'thing; object; in grammar, expresses reasons, feelings or general truths',
  'わけ':'reason; conclusion drawn from the situation; meaning depends on the grammar ending',
  'ボタン':'button (on clothing or a device)',
  '人手':'workers; helping hands; manpower',
  'ママ':'mum; mom; mother (casual)',
  'たとえ':'even if; no matter how (with ～ても)',
  'がたい':'difficult to do (psychologically or by its nature)',
  'がち':'tending to; often doing (usually something undesirable)',
  'くる':'to come; after ～て, movement toward the speaker or change up to now',
  'いく':'to go; after ～て, movement away or change continuing from now',
  'いう':'to say; to call; called',
  'よい':'good; suitable',
  'よく':'often; well; a lot',
  'また':'again; also; another time',
  'タイ':'Thailand; Thai',
  'たち':'plural suffix for people or living things',
  'たび':'each time; whenever (in ～たびに)',
  'ごと':'each; every',
  'おき':'at intervals of (in ～おきに)',
  'せい':'because of; fault or cause of an undesirable result',
  'おかげ':'thanks to; help or cause of a beneficial result',
  'おく':'to put; after ～て, do in advance or leave in a state',
  'つける':'to attach; to put on; to switch on (a light or appliance)',
  'つけ':'switching on; in つけっぱなし: leaving switched on',
  'ついで':'taking the opportunity to do something else while doing the main action',
  'みる':'to see; after ～て, to try doing',
  'ほう':'side; direction; one option in a comparison',
  'くらい':'about; to the extent of; at least',
  'にくい':'hard to do (after a verb stem)',
  'やすい':'easy to do (after a verb stem); cheap (安い)',
  'きる':'to cut; after a verb stem, to do completely',
  'きり':'only; ever since doing (in ～たきり)',
  'ざる':'literary negative form; ～ざるを得ない: have no choice but to do',
  'しょうが':'in しょうがない: cannot be helped; ～てしょうがない: extremely',
  'じまい':'ending up; ～ずじまい: ending without doing',
  'いつか':'sometime; someday',
  'いくら':'how much; no matter how much (with ～ても)',
  'いま':'now; at present',
  'うえ':'above; in grammar, in addition / after / in doing',
  'かた':'way of doing; person (polite)',
  'かえす':'to return; to give back; to send back',
  '行ける':'to be able to go',
  '眠れる':'to be able to sleep',
  'はいれる':'to be able to enter',
  'せる':'causative ending: make or let someone do',
  'てる':'colloquial contraction of ～ている',
  'おる':'to be; humble form used in ～ております',
  'ます':'polite verb ending',
  'すごい':'amazing; impressive; very (casual)',
  'が':'subject marker; but (joining clauses)',
  'の':'possessive or modifying particle; clause nominalizer',
  'で':'at; by; with; because of (particle)',
  'ば':'if (conditional ending)',
  'てこ':'lever; as part of ～てこそ: only by doing',
  'そ':'part of demonstratives such as その (that)',
  'ほかなる':'in ～にほかならない: nothing other than',
  'だめ':'not allowed; no good; does not work',
  'を通じて':'through; via; throughout',
  'と同時に':'at the same time as; just as',
  '差し上げる':'to give (humble, when giving to someone respected)',
  'あめ':'rain (雨); candy (飴), depending on the written form',
  'せんせい':'teacher; instructor; respectful title for a professional',
  'しよう':'use; usage (使用); as しよう: let us do / I will do',
  'しんじん':'newcomer; new employee',
  'からす':'crow (カラス); in ～からして: even / judging from',
  'たばかる':'in ～たばかり: have just done',
  '際す':'in ～に際して: on the occasion of; when (formal)',
  'だける':'only; as much as; in ～だけに: precisely because / as expected',
  'しだく':'as soon as; depending on (次第)',
  'しなす':'part of しなさい: do ... (instruction to someone junior)',
  '日間':'a period of ... days',
  '揚げたて':'freshly deep-fried',
  '炊きたて':'freshly cooked (rice)'
};
const baseCorrections={'たばかる':['ばかり','ばかり'],'際す':['際する','さいする'],'だける':['だけ','だけ'],'しだく':['次第','しだい'],'しなす':['する','する'],'増え':['増える','ふえる']};
function addThai(data){
  const thai=loadThai(),missing=[];
  for(const w of Object.values(data.words)){
    const key=w.thaiKey||w.b;
    if(!thai[key]){missing.push(key);continue;}
    w.t=thai[key];
    if(english[key]){w.e=[english[key]];w.glossSource='app';}
    if(baseCorrections[key]){w.thaiKey=key;[w.b,w.br]=baseCorrections[key];}
  }
  if(missing.length)throw Error('Add Thai glosses before rebuilding: '+[...new Set(missing)].join(', '));
  data.version=2;data.thai={date:'2026-10-13',forms:Object.keys(data.words).length,source:'Original app learner glosses; see DICTIONARY-NOTICES.md'};
  return data;
}
if(require.main===module){
  const context={};vm.runInNewContext(fs.readFileSync(path.join(root,'word-help-data.js'),'utf8'),context);
  const data=addThai(context.WORD_HELP_DATA);
  fs.writeFileSync(path.join(root,'word-help-data.js'),'/* JMdict / EDRDG: CC BY-SA 4.0. App-authored Thai glosses and corrections. Readings: IPADIC. See DICTIONARY-NOTICES.md. */\nvar WORD_HELP_DATA='+JSON.stringify(data)+';\n');
  console.log('Thai added to '+data.thai.forms+' word forms.');
}
module.exports={loadThai,addThai};
