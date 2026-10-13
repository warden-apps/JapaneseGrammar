/* Align a sentence's kana to its kanji. Existing kana stays ordinary text. */
function kanaKey(s){return String(s||'').normalize('NFKC').replace(/[ァ-ヶ]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-96);}).replace(/[^\p{Script=Hiragana}\p{Script=Katakana}ーa-zA-Z0-9]/gu,'');}
function readingUnits(text){
  return (String(text).match(/[A-Za-zＡ-Ｚａ-ｚ][A-Za-zＡ-Ｚａ-ｚ0-9０-９]*|[\p{Script=Han}々0-9０-９]+|[^\p{Script=Han}々A-Za-zＡ-Ｚａ-ｚ0-9０-９]+/gu)||[]).map(function(s){return {text:s,kanji:/[\p{Script=Han}々]/u.test(s),variable:/^[A-Za-zＡ-Ｚａ-ｚ0-9０-９]+$/u.test(s)};});
}
function alignFurigana(units,reading){
  var kana=kanaKey(reading),memo={};
  function visit(i,at){
    if(i===units.length)return at===kana.length?{cost:0,parts:[]}:null;
    var key=i+':'+at;if(Object.prototype.hasOwnProperty.call(memo,key))return memo[key];
    var u=units[i],tail,best=null;
    if(!u.kanji&&!u.variable){
      var plain=kanaKey(u.text),matches=[plain];
      if(plain==='ゖ')matches=['か','が','け'];
      matches.some(function(p){if(kana.slice(at,at+p.length)!==p)return false;tail=visit(i+1,at+p.length);if(tail){best={cost:tail.cost,parts:[[u.text,null]].concat(tail.parts)};return true;}return false;});
    }else{
      var preferred=kanaKey(u.preferred||(u.variable?u.text:'')),limit=Math.min(kana.length-at,Math.max(12,u.text.length*6));
      for(var n=1;n<=limit;n++){
        var part=kana.slice(at,at+n);tail=visit(i+1,at+n);if(!tail)continue;
        var cost=tail.cost+(preferred?(part===preferred?0:10+Math.abs(n-preferred.length)):1);
        if(!best||cost<best.cost)best={cost:cost,parts:[[u.text,u.kanji?part:null]].concat(tail.parts)};
      }
    }
    memo[key]=best;return best;
  }
  var result=visit(0,0);return result&&result.parts;
}
function applyFurigana(target,reading,on){
  target.querySelectorAll('ruby[data-furigana]').forEach(function(r){var rt=r.querySelector('rt');if(rt)rt.remove();r.replaceWith.apply(r,Array.from(r.childNodes));});
  target.normalize();target.classList.toggle('furigana-on',on);if(!on)return;
  // Decorate whole words first, keeping their dictionary IDs and click targets.
  if(typeof decorateJapanese==='function')decorateJapanese(target);
  var walker=document.createTreeWalker(target,NodeFilter.SHOW_TEXT),node,units=[];
  while((node=walker.nextNode())){
    if(node.parentElement.closest('rt'))continue;
    var word=node.parentElement.closest('[data-word-id]'),entry=word&&WORD_HELP_DATA.words[word.dataset.wordId];
    var parts=readingUnits(node.textContent),local=entry&&alignFurigana(parts,entry.r);
    var at=0;
    parts.forEach(function(p,i){p.start=node;p.end=node;p.from=at;at+=p.text.length;p.to=at;if(local)p.preferred=local[i][1];units.push(p);});
  }
  // Keep numeric counters together even when a dictionary button splits 3日間.
  var joined=[];
  units.forEach(function(u){
    var prev=joined[joined.length-1];
    if(prev&&/^[0-9０-９\p{Script=Han}々]+$/u.test(prev.text+u.text)&&/[0-9０-９]/.test(prev.text+u.text)){
      prev.text+=u.text;prev.end=u.end;prev.to=u.to;prev.kanji=prev.kanji||u.kanji;prev.variable=!prev.kanji;prev.preferred=null;
    }else joined.push(u);
  });
  var aligned=alignFurigana(joined,reading);
  // Work backwards so text-node offsets remain valid; preserve clickable words.
  for(var i=joined.length-1;i>=0;i--){
    var u=joined[i],r=aligned?aligned[i][1]:u.preferred;
    if(u.kanji&&r){
      var range=document.createRange(),ruby=document.createElement('ruby'),rt=document.createElement('rt');
      range.setStart(u.start,u.from);range.setEnd(u.end,u.to);
      ruby.dataset.furigana='';ruby.appendChild(range.extractContents());rt.textContent=r;ruby.appendChild(rt);range.insertNode(ruby);
    }
  }
  target.querySelectorAll('.jp-word').forEach(function(b){if(!b.textContent)b.remove();});
}
function toggleReading(button,on){
  var scope=button.closest('.reading-scope');if(!scope)return;
  if(on===undefined)on=button.getAttribute('aria-pressed')!=='true';
  scope.querySelectorAll('.reading-target').forEach(function(target){applyFurigana(target,button.dataset.reading,on);});
  button.setAttribute('aria-pressed',String(on));
}
