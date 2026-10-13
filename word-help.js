/* Local word help. Clicks never submit an answer or change study progress. */
var WORD_SURFACES=null,WORD_HELP_RETURN=null,WORD_HELP_ID=null,WORD_HELP_SCOPE=null,WORD_HELP_INDEX=0;
function wordParts(text){
  if(typeof WORD_HELP_DATA==='undefined')return [[text,null]];
  if(WORD_HELP_DATA.segments[text])return WORD_HELP_DATA.segments[text];
  if(!WORD_SURFACES){WORD_SURFACES={};Object.keys(WORD_HELP_DATA.words).forEach(function(id){var w=WORD_HELP_DATA.words[id];if(!WORD_SURFACES[w.s])WORD_SURFACES[w.s]=id;});}
  var out=[],plain='';
  for(var i=0;i<text.length;){var id=null,len=0;for(var n=Math.min(24,text.length-i);n>0;n--){var key=text.slice(i,i+n);if(WORD_SURFACES[key]){id=WORD_SURFACES[key];len=n;break;}}
    if(id){if(plain){out.push([plain,null]);plain='';}out.push([text.slice(i,i+len),id]);i+=len;}else{plain+=text[i];i++;}}
  if(plain)out.push([plain,null]);return out;
}
function decorateJapanese(root){
  if(!root||!root.querySelectorAll||typeof WORD_HELP_DATA==='undefined')return;
  var scopes=[];if(root.matches&&root.matches('[lang="ja"],.ex-j'))scopes.push(root);
  root.querySelectorAll('[lang="ja"],.ex-j').forEach(function(el){scopes.push(el);});
  scopes.forEach(function(scope){
    if(scope.closest('button,a,input,textarea,[data-word-id],#word-help-dialog,.reading-help,.example-extras,.form-code'))return;
    var walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT),nodes=[],node;
    while((node=walker.nextNode()))if(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(node.textContent)&&!node.parentElement.closest('button,a,[data-word-id],ruby,rt'))nodes.push(node);
    nodes.forEach(function(textNode){
      var frag=document.createDocumentFragment(),changed=false;
      var pieces=textNode.textContent.split(/([\p{Script=Han}々〆ヶ\p{Script=Hiragana}\p{Script=Katakana}ー]+)/u);
      pieces.forEach(function(piece){wordParts(piece).forEach(function(p){
        if(!p[1]){frag.appendChild(document.createTextNode(p[0]));return;}
        var b=document.createElement('button');b.type='button';b.className='jp-word';b.dataset.wordId=p[1];b.textContent=p[0];b.setAttribute('aria-label',p[0]+' · '+simpleText('reading and meaning','คำอ่านและความหมาย'));frag.appendChild(b);changed=true;
      });});if(changed)textNode.replaceWith(frag);
    });
  });
}
function wordHelpHTML(word,id){
  var thai=S.lang==='th';
  var definitions=thai
    ? '<p class="word-definitions" lang="th">'+esc(word.t||'ยังไม่มีคำแปลไทยสำหรับคำนี้')+'</p>'
    : (word.e.length?'<ul class="word-definitions" lang="en">'+word.e.map(function(s){return '<li>'+esc(s)+'</li>';}).join('')+'</ul>':'<p class="word-definitions" lang="en">Reading available; no English definition for this entry.</p>');
  return '<div class="word-toolbar"><div class="language-switch" role="group" aria-label="'+tx('Meaning language','ภาษาของคำแปล')+'"><button type="button" data-study-language="en" lang="en" aria-pressed="'+!thai+'">English</button><button type="button" data-study-language="th" lang="th" aria-pressed="'+thai+'">ไทย</button></div><button type="button" class="word-close" data-close-word aria-label="'+tx('Close word help','ปิดคำศัพท์')+'">×</button></div>'+
    '<div class="word-heading"><div><h2 id="word-help-title" lang="ja">'+esc(word.s)+'</h2><p class="word-reading" lang="ja">'+esc(word.r||'')+'</p></div></div>'+
    (word.b!==word.s?'<p class="word-base">'+tx('Dictionary form: ','รูปพจนานุกรม: ')+'<b lang="ja">'+esc(word.b)+'</b> '+esc(word.br)+'</p>':'')+
    definitions+'<div class="word-footer"><button type="button" class="chip" data-listen-word="'+esc(id)+'">▷ '+tx('Listen','ฟัง')+'</button><a href="DICTIONARY-NOTICES.md" target="_blank" rel="noopener">JMdict / EDRDG · CC BY-SA</a></div>';
}
function openWordHelp(id,opener){
  var word=WORD_HELP_DATA.words[id];if(!word)return;
  var dialog=document.getElementById('word-help-dialog');WORD_HELP_RETURN=opener;WORD_HELP_ID=id;
  WORD_HELP_SCOPE=opener&&opener.closest('#sbody,.pane')||document.body;
  WORD_HELP_INDEX=visibleWordButtons().indexOf(opener);
  dialog.innerHTML=wordHelpHTML(word,id);
  if(!dialog.open)dialog.showModal();dialog.querySelector('[data-close-word]').focus();
}
function refreshWordHelp(){
  var dialog=document.getElementById('word-help-dialog');if(!dialog||!dialog.open||!WORD_HELP_ID)return;
  var language=document.activeElement&&document.activeElement.dataset.studyLanguage;
  dialog.innerHTML=wordHelpHTML(WORD_HELP_DATA.words[WORD_HELP_ID],WORD_HELP_ID);
  var focus=dialog.querySelector(language?'[data-study-language="'+S.lang+'"]':'[data-close-word]');
  focus.focus({preventScroll:true});
}
function returnWordFocus(){
  // Switching languages redraws the lesson. Find its replacement word button.
  var target=WORD_HELP_RETURN;
  if(!target||!target.isConnected||!target.getClientRects().length){
    decorateJapanese(WORD_HELP_SCOPE);
    var matches=visibleWordButtons();target=matches[WORD_HELP_INDEX]||matches[0];
  }
  if(target)target.focus({preventScroll:true});
}
function visibleWordButtons(){
  return Array.from(WORD_HELP_SCOPE.querySelectorAll('[data-word-id]')).filter(function(b){return b.dataset.wordId===WORD_HELP_ID&&b.getClientRects().length;});
}
function closeWordHelp(){document.getElementById('word-help-dialog').close();}
function wordHelpInit(){
  if(typeof MutationObserver==='undefined')return;
  var dialog=document.createElement('dialog');dialog.id='word-help-dialog';dialog.setAttribute('aria-labelledby','word-help-title');document.body.appendChild(dialog);
  document.addEventListener('click',function(e){
    var w=e.target.closest('[data-word-id]');if(w){e.preventDefault();e.stopPropagation();openWordHelp(w.dataset.wordId,w);return;}
    if(e.target.closest('[data-close-word]')){closeWordHelp();return;}
    var listen=e.target.closest('[data-listen-word]');if(listen){var item=WORD_HELP_DATA.words[listen.dataset.listenWord];speak(item.r||item.s);return;}
    if(e.target===dialog){var r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeWordHelp();}
  },true);
  dialog.addEventListener('close',returnWordFocus);
  // Escape belongs to the top dialog; do not also close the underlying lesson.
  document.addEventListener('keydown',function(e){if(dialog.open&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();closeWordHelp();}},true);
  var observer=new MutationObserver(function(mutations){
    observer.disconnect();var roots=new Set();mutations.forEach(function(m){if(m.target.closest&&m.target.closest('#word-help-dialog'))return;if(m.type==='characterData')roots.add(m.target.parentElement);else m.addedNodes.forEach(function(n){if(n.nodeType===1)roots.add(n);else if(n.nodeType===3)roots.add(n.parentElement);});});
    roots.forEach(decorateJapanese);observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  });
  decorateJapanese(document.body);observer.observe(document.body,{childList:true,subtree:true,characterData:true});
}
