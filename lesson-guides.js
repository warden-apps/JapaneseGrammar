/* Short, original lesson cards. A form row is a usable pattern, not an
   exhaustive list of every construction. Existing grammar IDs remain stable. */
var LESSON_GUIDES = {};
var LESSON_GUIDE_SOURCES = [
  {title:'Japan Foundation: three stages with ところ',url:'https://www.kyozai.jpf.go.jp/kyozai/material/BMA00036/ja/render.do'},
  {title:'Japan Foundation: うちに / ないうちに',url:'https://www.kyozai.jpf.go.jp/kyozai/material/BMA00065/ja/render.do'},
  {title:'Japan Foundation: とたん',url:'https://www.jpf.go.jp/j/project/japanese/teach/tsushin/grammar/200906.html'},
  {title:'Japan Foundation: こと expressions',url:'https://www.jpf.go.jp/j/project/japanese/teach/tsushin/grammar/201203.html'},
  {title:'MLC Japanese School: によって',url:'https://www.mlcjapanese.co.jp/n3_04_05.html'},
  {title:'MLC Japanese School: わけだ',url:'https://www.mlcjapanese.co.jp/n3_014.html'},
  {title:'MLC Japanese School: わけにはいかない',url:'https://www.mlcjapanese.co.jp/img/wakeniwaikanai_n3_answer.pdf'},
  {title:'Japanese teacher Tanosuke: ようものなら',url:'https://tanosuke.com/youmononara'}
];
(function(){
  function form(pattern,en,th,example){return {form:pattern,en:en,th:th,example:example};}
  function compare(id,en,th){return {id:id,en:en,th:th};}
  function guide(id,meaning_en,meaning_th,cue_en,cue_th,forms,example,watch_en,watch_th,comparisons){
    LESSON_GUIDES[id]={meaning_en:meaning_en,meaning_th:meaning_th,cue_en:cue_en,cue_th:cue_th,forms:forms,
      example:{j:example[0],k:example[1],e:example[2],t:example[3]},watch_en:watch_en,watch_th:watch_th,compare:comparisons};
  }

  guide('n3a01','About to do / doing right now / just finished.','กำลังจะทำ / กำลังทำอยู่ / เพิ่งทำเสร็จ',
    'Change the verb form to show the exact stage.','เปลี่ยนรูปกริยาเพื่อบอกว่าอยู่ขั้นไหน',[
      form('Vる + ところだ','Dictionary form → just about to start.','รูปพจนานุกรม → กำลังจะเริ่ม','今から食べるところだ。'),
      form('Vている + ところだ','ている form → doing it right now.','รูป ている → กำลังทำอยู่ตอนนี้','今、食べているところだ。'),
      form('Vた + ところだ','Past form → just finished now.','รูปอดีต → เพิ่งทำเสร็จตอนนี้','今、食べたところだ。')
    ],['今から夕飯を作るところです。','いまからゆうはんをつくるところです。','I am just about to make dinner.','กำลังจะทำมื้อเย็นพอดี'],
    '食べる is before; 食べている is during; 食べた is after.','食べる คือก่อนทำ / 食べている คือระหว่างทำ / 食べた คือทำเสร็จแล้ว',[
      compare('n3a02','たばかり: “recent” can mean days or months ago.','たばかり: “เพิ่ง” อาจผ่านมาหลายวันหรือหลายเดือนแล้ว'),
      compare('n3a06','最中に: another event happens during the activity.','最中に: มีอีกเหตุการณ์เกิดขึ้นระหว่างที่กำลังทำ')]);
  guide('n3a02','Have only recently done something.','เพิ่งทำบางอย่างมาไม่นาน',
    'It still feels recent to the speaker.','ผู้พูดยังรู้สึกว่าเพิ่งเกิดขึ้น',[
      form('Vた + ばかりだ','Use the past form, even for recent changes.','ใช้รูปอดีต แม้เป็นการเปลี่ยนแปลงที่เพิ่งเกิด','引っ越したばかりだ。'),
      form('Vた + ばかりの + N','Describe a person or thing just after an action.','ขยายนามที่เพิ่งผ่านการกระทำนั้น','買ったばかりの靴')
    ],['先月入社したばかりです。','せんげつにゅうしゃしたばかりです。','I only joined the company last month.','เพิ่งเข้าบริษัทเมื่อเดือนที่แล้ว'],
    '“Recent” is subjective; it does not always mean a few minutes.','“เพิ่ง” ขึ้นกับความรู้สึก ไม่จำเป็นต้องไม่กี่นาที',[
      compare('n3a01','たところ: the immediate just-finished stage.','たところ: ช่วงทันทีหลังทำเสร็จ'),
      compare('n2a14','ばかりに: one regrettable cause, not recent time.','ばかりに: เพียงเพราะเหตุหนึ่ง ไม่ใช่ “เพิ่ง”')]);
  guide('n3a03','While a chance remains; a change while doing something.','ขณะที่ยังมีโอกาส; เกิดการเปลี่ยนแปลงระหว่างทำ',
    'Use the opportunity before the situation changes.','ใช้โอกาสก่อนสถานการณ์จะเปลี่ยน',[
      form('Vている / Vない + うちに','While still doing / before doing.','ขณะที่ยังทำ / ก่อนจะทำ','忘れないうちに書く。'),
      form('いA / なAな / Nの + うちに','While that state still holds.','ขณะที่ยังอยู่ในสภาพนั้น','元気なうちに旅行する。'),
      form('Vている + うちに','A change develops during the activity.','เกิดการเปลี่ยนแปลงระหว่างทำ','話しているうちに仲よくなった。')
    ],['暗くならないうちに帰ろう。','くらくならないうちにかえろう。','Let’s go home before it gets dark.','กลับก่อนที่จะมืดกันเถอะ'],
    'ないうちに = before it happens, not after it stops.','ないうちに = ก่อนจะเกิด ไม่ใช่หลังจากหยุดแล้ว',[
      compare('n3a04','間に simply locates an event inside a time span.','間に บอกว่าเหตุการณ์อยู่ภายในช่วงเวลา')]);
  guide('n3a04','Throughout a period / at some point during it.','ตลอดช่วงเวลา / ณ เวลาหนึ่งภายในช่วงนั้น',
    'The tiny に changes the time relationship.','に ตัวเดียวเปลี่ยนความสัมพันธ์ของเวลา',[
      form('Vている / Nの + 間','The other action lasts throughout the span.','อีกการกระทำดำเนินตลอดช่วงนั้น','休みの間、ずっと家にいた。'),
      form('Vている / Nの + 間に','Something happens within the span.','เกิดบางอย่างภายในช่วงนั้น','休みの間に本を一冊読んだ。')
    ],['私が寝ている間に、雪が降った。','わたしがねているあいだに、ゆきがふった。','It snowed while I was asleep.','หิมะตกตอนที่ฉันหลับอยู่'],
    '間 = a continuing span; 間に = an occurrence inside it.','間 = ตลอดช่วง / 間に = เหตุการณ์ภายในช่วง',[
      compare('n3a03','うちに often adds “before this chance disappears”.','うちに มักเพิ่มความรู้สึกว่า “ก่อนโอกาสจะหมด”')]);
  guide('n3a05','The instant A happened, B suddenly happened.','ทันทีที่ A เกิด B ก็เกิดขึ้นฉับพลัน',
    'One finished action triggers a sudden event.','ทำอย่างหนึ่งเสร็จแล้วเกิดเรื่องฉับพลัน',[
      form('Vた + とたん（に）','Past form → an immediate event follows.','รูปอดีต → ตามด้วยเหตุการณ์ทันที','立ち上がったとたん、めまいがした。')
    ],['外に出たとたん、雨が降り出した。','そとにでたとたん、あめがふりだした。','The instant I stepped outside, it started raining.','พอก้าวออกไปข้างนอก ฝนก็ตกทันที'],
    'The ending describes an event, not your promise or request.','ส่วนหลังเล่าเหตุการณ์ ไม่ใช่คำสัญญาหรือคำขอ',[
      compare('n2a03','次第 fits a planned “as soon as” action.','次第 เหมาะกับแผนว่าจะทำทันทีที่พร้อม'),
      compare('n2a07','かと思ったら highlights a quick, surprising change.','かと思ったら เน้นการเปลี่ยนอย่างรวดเร็วจนประหลาดใจ')]);
  guide('n3a06','In the very middle of an activity.','ระหว่างที่กำลังทำอยู่พอดี',
    'Something happens while the activity is still running.','มีบางอย่างเกิดขณะกิจกรรมยังดำเนินอยู่',[
      form('Vている + 最中に','Use the ongoing ている form.','ใช้รูป ている ที่กำลังทำอยู่','話している最中に'),
      form('Nの + 最中に','A noun names the activity.','ใช้คำนามระบุกิจกรรม','会議の最中に')
    ],['会議の最中に、電話が鳴った。','かいぎのさいちゅうに、でんわがなった。','The phone rang in the middle of the meeting.','โทรศัพท์ดังระหว่างประชุมอยู่พอดี'],
    'With verbs, use している最中, not した最中.','ถ้าเป็นกริยา ใช้ している最中 ไม่ใช่ した最中',[
      compare('n3a01','ているところだ simply tells what you are doing now.','ているところだ บอกว่าตอนนี้กำลังทำอะไร'),
      compare('n3a05','とたん is immediately after, not in the middle.','とたん คือทันทีหลังทำ ไม่ใช่ระหว่างทำ')]);
  guide('n3a07','When doing something; on an occasion.','เมื่อทำบางอย่าง; ในโอกาสนั้น',
    'A formal “when”, useful in instructions.','“เมื่อ” แบบทางการ มักพบในคำแนะนำ',[
      form('Vる / Vた + 際に','Use dictionary or past form for the occasion.','ใช้รูปพจนานุกรมหรืออดีตระบุโอกาส','利用する際に'),
      form('Nの + 際に','Connect the noun with の.','เชื่อมคำนามด้วย の','申し込みの際に')
    ],['申し込みの際に、住所を確認してください。','もうしこみのさいに、じゅうしょをかくにんしてください。','Please check your address when applying.','ตอนสมัคร กรุณาตรวจสอบที่อยู่'],
    'Formal occasions suit 際に; everyday chat usually uses とき.','際に เหมาะกับโอกาสทางการ บทสนทนาทั่วไปมักใช้ とき',[
      compare('n2a01','に際して frames the start of an important occasion.','に際して กล่าวถึงตอนเริ่มโอกาสสำคัญ')]);
  guide('n3a08','Only after doing A did B become clear or possible.','ต้องทำ A ก่อน จึงเข้าใจหรือทำ B ได้',
    'The experience unlocks a new realization or ability.','ประสบการณ์ทำให้เพิ่งเข้าใจหรือทำได้',[
      form('Vて + はじめて','Use te form; then give the new result.','ใช้รูป て แล้วบอกผลที่เพิ่งเกิด','使ってはじめてわかった。')
    ],['自分で作ってはじめて、難しさがわかった。','じぶんでつくってはじめて、むずかしさがわかった。','Only after making it myself did I understand the difficulty.','พอลองทำเองถึงรู้ว่ามันยาก'],
    'It is more than simple order: B needed the experience of A.','ไม่ใช่แค่ลำดับเวลา ต้องมี A ก่อนจึงเกิด B',[
      compare('n3c32','てから only says A comes before B.','てから เพียงบอกว่าทำ A ก่อน B')]);

  guide('n3a13','Because of something unwelcome; blame the cause.','เพราะสิ่งที่ไม่ดี; โทษสาเหตุ',
    'The result is usually a problem.','ผลที่ตามมามักเป็นปัญหา',[
      form('V普通形 / いA + せいで','Use the plain verb or i-adjective as it is.','ใช้กริยารูปธรรมดาหรือคุณศัพท์ い ได้เลย','寝坊したせいで遅れた。'),
      form('なAな / Nの + せいで','Na-adjective → な; noun → の.','คุณศัพท์ な ใช้ な / นามใช้ の','雨のせいで中止になった。'),
      form('〜せいか','The cause is a guess.','ยังไม่แน่ใจว่านี่คือสาเหตุ','疲れたせいか、眠い。')
    ],['寝坊したせいで、朝ご飯を食べられなかった。','ねぼうしたせいで、あさごはんをたべられなかった。','Because I overslept, I could not eat breakfast.','เพราะตื่นสายเลยไม่ได้กินข้าวเช้า'],
    'せいで blames; せいか leaves the cause uncertain.','せいで โทษสาเหตุ / せいか ยังไม่แน่ใจสาเหตุ',[
      compare('n3a14','おかげで usually credits a helpful cause.','おかげで มักยกความดีให้สิ่งที่ช่วย')]);
  guide('n3a14','Thanks to a helpful cause.','เพราะสิ่งที่ช่วยให้เกิดผลดี',
    'Give credit for a welcome result.','ยกความดีให้สาเหตุของผลที่ต้องการ',[
      form('V普通形 / いA + おかげで','Use the plain form before おかげで.','ใช้รูปธรรมดาหน้า おかげで','教えてくれたおかげで'),
      form('なAな / Nの + おかげで','Na-adjective → な; noun → の.','คุณศัพท์ な ใช้ な / นามใช้ の','先生のおかげで')
    ],['友達が手伝ってくれたおかげで、早く終わった。','ともだちがてつだってくれたおかげで、はやくおわった。','Thanks to my friend’s help, I finished early.','เพื่อนช่วยเลยเสร็จเร็ว'],
    'Usually positive; sarcastic contexts can reverse the tone.','มักเป็นบวก แต่ใช้ประชดให้กลับน้ำเสียงได้',[
      compare('n3a13','せいで usually blames a harmful cause.','せいで มักโทษสาเหตุที่ทำให้เกิดผลเสีย')]);
  guide('n3a16','Because… (a personal explanation or excuse).','เพราะว่า... (อธิบายเหตุผลส่วนตัวหรือแก้ตัว)',
    'Explain why you could not act as expected.','อธิบายว่าทำไมทำไม่ได้ตามที่คาด',[
      form('V普通形 / いA + もので','Use the plain form.','ใช้รูปธรรมดา','道が混んでいたもので'),
      form('なAな / Nな + もので','Both na-adjectives and nouns use な here.','ตรงนี้ทั้งคุณศัพท์ な และนามใช้ な','初めてなもので'),
      form('〜ものだから / 〜もの','ものだから explains; もの is casual.','ものだから อธิบายเหตุผล / もの เป็นภาษากันเอง','眠いんだもの。')
    ],['すみません。道が混んでいたもので。','すみません。みちがこんでいたもので。','Sorry, the roads were congested.','ขอโทษนะ พอดีรถติด'],
    'Remember noun + な: 新人なもので, not 新人のもので.','จำ นาม + な: 新人なもので ไม่ใช่ 新人のもので',[
      compare('n2f18','につき gives a formal public notice, not a personal excuse.','につき ใช้แจ้งเหตุในประกาศ ไม่ใช่คำแก้ตัวส่วนตัว')]);
  guide('n3c18','Due to / by means of / depending on / by an agent.','เนื่องจาก / โดยวิธี / ขึ้นอยู่กับ / โดยผู้กระทำ',
    'Read the result to identify which meaning fits.','ดูส่วนหลังเพื่อเลือกความหมายที่ตรง',[
      form('Nによって + 結果','Cause → a result occurs.','สาเหตุ → เกิดผลตามมา','台風によって木が倒れた。'),
      form('Nによって + 解決・実現','Method → achieve something through it.','วิธี → ทำให้บางอย่างสำเร็จ','対話によって解決する。'),
      form('Nによって + 違う・変わる','Dependence → the result varies.','ขึ้นอยู่กับ → ผลต่างกันไป','店によって値段が違う。'),
      form('人によって + 受身','Agent → the creator/doer in a passive sentence.','ผู้กระทำ → ใช้ในประโยคถูกกระทำ','この絵は妹によって描かれた。')
    ],['店によって、同じ本の値段が違う。','みせによって、おなじほんのねだんがちがう。','The price of the same book differs by shop.','หนังสือเล่มเดียวกันราคาต่างกันตามร้าน'],
    'Before a noun, use による: 台風による被害.','ถ้าขยายนามใช้ による: 台風による被害',[
      compare('n2a04','N次第 means the outcome depends on N.','N次第 เน้นว่าผลขึ้นอยู่กับ N'),
      compare('n3a13','せいで adds blame; causal によって is more neutral.','せいで เพิ่มการโทษ ส่วน によって บอกเหตุเป็นกลางกว่า')]);
  guide('n2a13','So intensely… that an unusual result followed.','...มากจนเกิดผลผิดจากปกติ',
    'An excessive feeling or action causes the result.','ความรู้สึกหรือการกระทำที่มากเกินทำให้เกิดผล',[
      form('Vる / Vた + あまり','An action or feeling goes too far.','ทำหรือรู้สึกมากเกินไป','考えすぎるあまり'),
      form('Nの + あまり','Name the intense feeling.','ใช้คำนามระบุความรู้สึกรุนแรง','緊張のあまり'),
      form('あまりの + N + に','Put あまりの before the intensity noun.','วาง あまりの หน้านามที่บอกความรุนแรง','あまりの暑さに')
    ],['緊張のあまり、自分の名前を忘れそうになった。','きんちょうのあまり、じぶんのなまえをわすれそうになった。','I was so nervous I nearly forgot my own name.','ตื่นเต้นมากจนเกือบลืมชื่อตัวเอง'],
    'This is “so much that”, not あまり〜ない (“not very”).','นี่คือ “มากจน” ไม่ใช่ あまり〜ない ที่แปลว่า “ไม่ค่อย”',[
      compare('n2a14','ばかりに focuses on regrettable cause, not intensity.','ばかりに เน้นสาเหตุที่น่าเสียดาย ไม่ใช่ระดับความมาก')]);
  guide('n2f18','Due to… in notices; also per person/unit.','เนื่องจาก...ในประกาศ; อีกความหมายคือ ต่อคน/หน่วย',
    'A reason or a unit? The noun decides.','เป็นเหตุผลหรือหน่วยนับ ดูคำนามข้างหน้า',[
      form('理由のN + につき','Formal notice: due to this situation.','ประกาศทางการ: เนื่องจากสถานการณ์นี้','点検中につき、使用禁止。'),
      form('数量・単位 + につき','Per person, item, hour, or other unit.','ต่อคน ชิ้น ชั่วโมง หรือหน่วยอื่น','一人につき一枚')
    ],['一人につき一枚、カードを配ります。','ひとりにつきいちまい、カードをくばります。','We will hand out one card per person.','จะแจกบัตรคนละหนึ่งใบ'],
    '雨天につき = due to rain; 一人につき = per person.','雨天につき = เนื่องจากฝน / 一人につき = ต่อคน',[
      compare('n3a16','もので explains your personal circumstances.','もので อธิบายสถานการณ์ส่วนตัว')]);
  guide('n2a14','All because of one cause, an unfortunate result followed.','เพียงเพราะเหตุเดียว กลับเกิดผลน่าเสียดาย',
    'Regret that this one thing caused the trouble.','เสียดายที่เรื่องนี้เรื่องเดียวทำให้เกิดปัญหา',[
      form('V普通形 / いA + ばかりに','Attach to the regretted cause.','ต่อกับสาเหตุที่รู้สึกเสียดาย','鍵を忘れたばかりに'),
      form('なAな / Nである + ばかりに','Na-adjective → な; noun → である.','คุณศัพท์ な ใช้ な / นามใช้ である','正直なばかりに')
    ],['鍵を忘れたばかりに、家に入れなかった。','かぎをわすれたばかりに、いえにはいれなかった。','Just because I forgot my key, I could not get inside.','แค่ลืมกุญแจ ก็เข้าบ้านไม่ได้เลย'],
    'The result is regrettable; do not use it for sincere gratitude.','ผลน่าเสียดาย ไม่ใช้แทนความขอบคุณจริงใจ',[
      compare('n3a13','せいで blames a cause without the “this one thing” focus.','せいで โทษสาเหตุโดยไม่จำเป็นต้องเน้นว่าเพียงเรื่องเดียว'),
      compare('n3a02','たばかり means recently did, not because.','たばかり คือเพิ่งทำ ไม่ใช่เพราะ')]);
  guide('n2a15','Precisely because A, the result is especially strong.','ก็เพราะ A ผลจึงยิ่งเด่นชัด',
    'That fact makes the result all the more significant.','ข้อเท็จจริงนั้นทำให้ผลยิ่งชัดหรือรู้สึกแรงขึ้น',[
      form('V普通形 / いA + だけに','The cause strengthens the result.','สาเหตุทำให้ผลยิ่งแรงขึ้น','期待していただけに'),
      form('なAな / N + だけに','Na-adjective keeps な; a noun attaches directly.','คุณศัพท์ な คง な ไว้ / คำนามต่อได้เลย','専門家だけに')
    ],['楽しみにしていただけに、中止は残念だ。','たのしみにしていただけに、ちゅうしはざんねんだ。','Because I had really looked forward to it, the cancellation is especially disappointing.','เพราะรอคอยมาก พอยกเลิกเลยยิ่งเสียดาย'],
    'The intensified result can be good or bad.','ผลที่ยิ่งเด่นชัดเป็นเรื่องดีหรือร้ายก็ได้',[
      compare('n2a14','ばかりに singles out a regrettable cause.','ばかりに เจาะจงสาเหตุที่ทำให้เกิดเรื่องน่าเสียดาย'),
      compare('n2d13','だけあって often praises a result that meets expectations.','だけあって มักชมผลที่สมกับความคาดหมาย')]);
  guide('n2g08','Since this is one good reason, let’s…','ในเมื่อมีเหตุผลนี้ ก็...กันเถอะ',
    'Give a reason, then suggest or decide something.','ยกเหตุผลแล้วเสนอหรือตัดสินใจทำบางอย่าง',[
      form('V普通形 / いA + ことだし','Often follows も to suggest another reason.','มักมี も เพื่อสื่อว่าเป็นอีกเหตุผลหนึ่ง','雨もやんだことだし'),
      form('なAな / Nの + ことだし','Na-adjective → な; noun → の.','คุณศัพท์ な ใช้ な / นามใช้ の','休みのことだし')
    ],['雨もやんだことだし、外を歩こう。','あめもやんだことだし、そとをあるこう。','The rain has stopped, so let’s take a walk outside.','ฝนก็หยุดแล้ว ไปเดินเล่นข้างนอกกันเถอะ'],
    'It presents a reason, often with others left unstated.','ยกเหตุผลหนึ่งขึ้นมา โดยมักมีเหตุผลอื่นที่ไม่ได้พูดด้วย',[
      compare('n3a16','もので often explains an excuse for what happened.','もので มักใช้แก้ตัวหรืออธิบายเหตุที่เกิดไปแล้ว')]);

  guide('n3b08','That explains it; so naturally…','มิน่าล่ะ; อย่างนี้นี่เอง',
    'A new fact makes the result understandable.','ข้อมูลใหม่ทำให้เข้าใจผลที่เกิดขึ้น',[
      form('V普通形 / いA + わけだ','Draw a conclusion from the facts.','สรุปจากข้อเท็จจริง','忙しいわけだ。'),
      form('なAな / Nである + わけだ','Connect a state or identity.','เชื่อมสภาพหรือสถานะ','上手なわけだ。')
    ],['駅が近いんですね。便利なわけです。','えきがちかいんですね。べんりなわけです。','So the station is nearby. That explains why it is convenient.','สถานีอยู่ใกล้นี่เอง มิน่าถึงสะดวก'],
    'わけだ explains a conclusion; it does not mean “maybe”.','わけだ อธิบายข้อสรุป ไม่ได้แปลว่า “อาจจะ”',[
      compare('n3b05','はずだ predicts what you expect from the facts.','はずだ คาดสิ่งที่น่าจะเป็นจากข้อเท็จจริง'),
      compare('n3b09','わけではない rejects or limits a conclusion.','わけではない ปฏิเสธหรือจำกัดข้อสรุป')]);
  guide('n3b09','It does not mean that; not necessarily or not entirely.','ไม่ได้หมายความว่า; ไม่เสมอไปหรือไม่ทั้งหมด',
    'Correct an overgeneralization or mistaken conclusion.','แก้ความเข้าใจที่เหมารวมหรือสรุปผิด',[
      form('V普通形 / いA + わけではない','Deny or qualify the claim before わけ.','ปฏิเสธหรือจำกัดข้อความหน้า わけ','嫌いなわけではない。'),
      form('なAな / Nである + わけではない','Use な for a na-adjective.','คุณศัพท์ な ใช้ な','簡単なわけではない。')
    ],['毎日日本語を話しているわけではない。','まいにちにほんごをはなしているわけではない。','It is not that I speak Japanese every day.','ไม่ได้พูดภาษาญี่ปุ่นทุกวันหรอก'],
    'わけではない does not make the action impossible.','わけではない ไม่ได้บอกว่ากริยานั้นเป็นไปไม่ได้',[
      compare('n2d17','わけがない strongly rejects the possibility.','わけがない ยืนยันหนักแน่นว่าเป็นไปไม่ได้'),
      compare('n2c28','とは限らない means a claim is not always true.','とは限らない บอกว่าข้อความหนึ่งไม่จริงเสมอไป')]);
  guide('n2d17','There is no way that…','ไม่มีทางที่จะ...',
    'Reject the possibility with strong confidence.','ปฏิเสธความเป็นไปได้อย่างมั่นใจมาก',[
      form('V普通形 / いA + わけがない','Strongly deny the preceding claim.','ปฏิเสธข้อความข้างหน้าอย่างหนักแน่น','一分で終わるわけがない。'),
      form('なAな / Nである + わけがない','Connect a state or identity.','เชื่อมสภาพหรือสถานะ','簡単なわけがない。')
    ],['百ページもある。一分で読めるわけがない。','ひゃくページもある。いっぷんでよめるわけがない。','There are a hundred pages. There is no way I can read it in a minute.','มีตั้งร้อยหน้า ไม่มีทางอ่านจบในนาทีเดียว'],
    'がない = no possibility; ではない = not that conclusion.','がない = ไม่มีทาง / ではない = ไม่ใช่ข้อสรุปนั้น',[
      compare('n3b09','わけではない gives a weaker, qualified denial.','わけではない ปฏิเสธแบบมีขอบเขต ไม่หนักแน่นว่าเป็นไปไม่ได้'),
      compare('n3c06','わけにはいかない means duty or circumstances prevent an action.','わけにはいかない คือหน้าที่หรือสถานการณ์ทำให้ทำไม่ได้')]);
  guide('n3c06','I cannot do that because of responsibility or circumstances.','ทำแบบนั้นไม่ได้เพราะหน้าที่หรือสถานการณ์',
    'Possible physically, but not acceptable in this situation.','ทำได้ทางกายภาพ แต่สถานการณ์นี้ทำไม่ได้',[
      form('Vる + わけにはいかない','Dictionary form → cannot do it.','รูปพจนานุกรม → ทำไม่ได้','秘密を話すわけにはいかない。'),
      form('Vない + わけにはいかない','Negative form → cannot avoid doing it.','รูปปฏิเสธ → ไม่ทำไม่ได้','謝らないわけにはいかない。')
    ],['約束したので、今さら断るわけにはいかない。','やくそくしたので、いまさらことわるわけにはいかない。','I promised, so I cannot refuse now.','สัญญาไปแล้ว จะมาปฏิเสธตอนนี้ไม่ได้'],
    '行くわけにはいかない = cannot go; 行かないわけにはいかない = must go.','行くわけにはいかない = ไปไม่ได้ / 行かないわけにはいかない = ต้องไป',[
      compare('n2c14','ないわけにはいかない highlights an obligation to act.','ないわけにはいかない เน้นว่าจำเป็นต้องทำ'),
      compare('n2b28','ようがない means there is no method available.','ようがない คือไม่มีวิธีให้ทำได้')]);
  guide('n2c14','I have to do it; I cannot avoid the obligation.','จำเป็นต้องทำ; หลีกเลี่ยงหน้าที่ไม่ได้',
    '“Cannot NOT do” means you must do it.','“ไม่ทำไม่ได้” ก็คือต้องทำ',[
      form('Vない + わけにはいかない','Keep ない before わけ.','ต้องมี ない อยู่หน้า わけ','返さないわけにはいかない。')
    ],['借りたお金は返さないわけにはいかない。','かりたおかねはかえさないわけにはいかない。','I have to return the money I borrowed.','เงินที่ยืมมาต้องคืน จะไม่คืนไม่ได้'],
    'Removing ない reverses the message from “must” to “cannot”.','ตัด ない แล้วความหมายกลับจาก “ต้องทำ” เป็น “ทำไม่ได้”',[
      compare('n3c06','Vるわけにはいかない means you cannot do the action.','Vるわけにはいかない คือทำกริยานั้นไม่ได้'),
      compare('n2c13','ざるを得ない often stresses having no alternative.','ざるを得ない มักเน้นว่าไม่มีทางเลือกอื่น')]);

  guide('n3c25','A general truth, a remembered habit, or a strong feeling.','ธรรมชาติทั่วไป นิสัยในอดีต หรือความรู้สึกแรงกล้า',
    'Check tense and context: ものだ has several jobs.','ดูกาลและบริบท เพราะ ものだ ใช้ได้หลายแบบ',[
      form('Vる + ものだ','General tendency: that is how things are.','แนวโน้มทั่วไป: เป็นธรรมดาที่จะเป็นแบบนั้น','誰でも失敗するものだ。'),
      form('Vた + ものだ','Look back on a repeated past habit.','รำลึกสิ่งที่เคยทำเป็นประจำ','よくここで遊んだものだ。'),
      form('いA / なAな + ものだ','Express a strong observation or feeling.','แสดงความรู้สึกหรือข้อสังเกตอย่างหนักแน่น','時間がたつのは早いものだ。')
    ],['初めての仕事は、緊張するものだ。','はじめてのしごとは、きんちょうするものだ。','It is natural to feel nervous at your first job.','งานแรกก็ตื่นเต้นเป็นธรรมดา'],
    'Vたものだ often recalls the past; it is not ordinary advice.','Vたものだ มักรำลึกอดีต ไม่ใช่คำแนะนำทั่วไป',[
      compare('n2c21','ことだ gives practical advice about what to do.','ことだ แนะนำว่าควรทำอะไร'),
      compare('n2d16','たいものだ expresses a wish, not a past habit.','たいものだ บอกความอยาก ไม่ใช่นิสัยในอดีต')]);
  guide('n2d16','Used to do… / would really like to do…','เมื่อก่อนเคยทำ... / อยากทำ...จริง ๆ',
    'One extra い changes memory into desire.','เพิ่ม い ตัวเดียว เปลี่ยนจากความทรงจำเป็นความอยาก',[
      form('Vた + ものだ','Past form → a remembered habit.','รูปอดีต → นิสัยที่นึกย้อนไป','よく旅行したものだ。'),
      form('Vたい + ものだ','Want-to form → a heartfelt wish.','รูปอยากทำ → ความปรารถนาจากใจ','また旅行したいものだ。')
    ],['いつか日本を一周したいものだ。','いつかにほんをいっしゅうしたいものだ。','I would love to travel all around Japan someday.','สักวันอยากเที่ยวรอบญี่ปุ่นให้ได้จริง ๆ'],
    'したものだ = used to do; したいものだ = would love to do.','したものだ = เคยทำ / したいものだ = อยากทำจริง ๆ',[
      compare('n3c25','ものだ also expresses general truths and feelings.','ものだ ยังใช้บอกธรรมชาติทั่วไปและความรู้สึกได้')]);
  guide('n2c21','You should do this; you should avoid that.','ควรทำสิ่งนี้; ควรเลี่ยงสิ่งนั้น',
    'Give a practical rule for reaching a goal.','แนะนำวิธีปฏิบัติเพื่อไปถึงเป้าหมาย',[
      form('Vる + ことだ','Dictionary form → advice to do it.','รูปพจนานุกรม → แนะนำให้ทำ','毎日練習することだ。'),
      form('Vない + ことだ','Negative form → advice not to do it.','รูปปฏิเสธ → แนะนำว่าอย่าทำ','一度に覚えようとしないことだ。')
    ],['覚えたければ、声に出して使うことだ。','おぼえたければ、こえにだしてつかうことだ。','If you want to remember it, you should use it aloud.','ถ้าอยากจำได้ ควรลองใช้โดยพูดออกเสียง'],
    'This advice can sound instructive; use care with superiors.','คำแนะนำนี้อาจฟังเหมือนสั่งสอน ระวังเมื่อใช้กับผู้ใหญ่',[
      compare('n2c22','ことはない means there is no need to do it.','ことはない คือไม่จำเป็นต้องทำ'),
      compare('n2f10','ものではない gives a general warning about behavior.','ものではない เตือนพฤติกรรมตามหลักทั่วไป')]);
  guide('n2c22','There is no need to do that.','ไม่จำเป็นต้องทำแบบนั้น',
    'Remove the pressure; the action is unnecessary.','ลดความกดดัน บอกว่าไม่ต้องทำก็ได้',[
      form('Vる + ことはない','Dictionary form → no need.','รูปพจนานุกรม → ไม่จำเป็น','心配することはない。')
    ],['時間はまだある。急ぐことはない。','じかんはまだある。いそぐことはない。','There is still time. There is no need to rush.','ยังมีเวลา ไม่จำเป็นต้องรีบ'],
    'Vることはない = no need; Vたことがない = never experienced.','Vることはない = ไม่จำเป็น / Vたことがない = ไม่เคยมีประสบการณ์',[
      compare('n3c26','たことがない describes a missing past experience.','たことがない บอกว่าไม่เคยทำมาก่อน'),
      compare('n2d17','わけがない means impossible, not unnecessary.','わけがない คือเป็นไปไม่ได้ ไม่ใช่ไม่จำเป็น')]);
  guide('n2d12','No way! / I absolutely refuse.','ไม่มีทาง! / ไม่ทำเด็ดขาด',
    'A forceful negative, even without a negative verb.','ปฏิเสธแรง แม้กริยาจะไม่ใช่รูปปฏิเสธ',[
      form('Vる + ものか','Reject a possibility emotionally.','ปฏิเสธความเป็นไปได้อย่างมีอารมณ์','一日で終わるものか。'),
      form('Vる + ものか','Refuse to do something firmly.','ยืนยันหนักแน่นว่าจะไม่ทำ','二度と行くものか。')
    ],['あんな店に二度と行くものか。','あんなみせににどといくものか。','There is no way I am ever going to that shop again.','ไม่มีทางไปร้านแบบนั้นอีกเด็ดขาด'],
    'It is usually a rhetorical rejection, not a real question.','มักเป็นคำปฏิเสธเชิงคำถาม ไม่ได้ถามเพื่อขอคำตอบ',[
      compare('n2d17','わけがない also denies possibility, with an explanatory tone.','わけがない ก็ปฏิเสธความเป็นไปได้ แต่เน้นเหตุผลมากกว่า'),
      compare('n2c20','まい can express a decision not to do something.','まい ใช้บอกความตั้งใจว่าจะไม่ทำได้')]);

  guide('n3b01','I hear that…; information from another source.','ได้ยินมาว่า...; ข้อมูลจากแหล่งอื่น',
    'Report what you heard or read.','บอกต่อสิ่งที่ได้ยินหรืออ่านมา',[
      form('V普通形 + そうだ','Use the whole plain verb, including its tense.','ใช้กริยารูปธรรมดาทั้งคำ รวมทั้งกาลด้วย','来るそうだ。／来たそうだ。'),
      form('いA + そうだ','Keep the final い.','คง い ท้ายคำไว้','おいしいそうだ。'),
      form('なAだ / Nだ + そうだ','Keep だ when reporting a noun or na-adjective.','คง だ ไว้เมื่อบอกต่อคำนามหรือคุณศัพท์ な','元気だそうだ。')
    ],['店の人によると、明日は休みだそうです。','みせのひとによると、あしたはやすみだそうです。','According to the staff, the shop is closed tomorrow.','พนักงานบอกว่าร้านจะหยุดพรุ่งนี้'],
    'おいしいそうだ = heard it is tasty; おいしそうだ = looks tasty.','おいしいそうだ = ได้ยินว่าอร่อย / おいしそうだ = ดูน่าอร่อย',[
      compare('n3b02','Appearance そう removes い or uses a verb stem.','そう แบบลักษณะที่เห็นตัด い หรือใช้รากกริยา'),
      compare('n3b04','らしい may summarize a report or an inference.','らしい อาจสรุปข้อมูลที่ได้ยินหรือข้อสันนิษฐาน')]);
  guide('n3b02','Looks…; seems about to happen.','ดูท่าจะ...; เหมือนใกล้จะเกิด',
    'Judge from visible signs or your present impression.','ตัดสินจากสิ่งบ่งชี้หรือความรู้สึกตอนนี้',[
      form('Vます語幹 + そうだ','Remove ます → looks likely to happen.','ตัด ます → ดูท่าจะเกิด','雨が降りそうだ。'),
      form('いA（いを取る）+ そうだ','Remove final い → looks that way.','ตัด い ท้ายคำ → ดูเป็นแบบนั้น','おいしそうだ。'),
      form('なA + そうだ','Use the adjective stem; no な or だ.','ใช้รากคุณศัพท์ ไม่เติม な หรือ だ','元気そうだ。')
    ],['このかばんは重そうだ。','このかばんはおもそうだ。','This bag looks heavy.','กระเป๋าใบนี้ดูหนัก'],
    'Special forms: いい → よさそう; ない → なさそう.','รูปพิเศษ: いい → よさそう / ない → なさそう',[
      compare('n3b01','Reportative そう keeps the full plain sentence.','そう แบบบอกต่อใช้ประโยครูปธรรมดาทั้งประโยค'),
      compare('n3b03','ようだ also permits noun comparisons: 猫のようだ.','ようだ เปรียบกับคำนามได้ด้วย เช่น 猫のようだ')]);
  guide('n3b03','Seems to be… / is like…','ดูเหมือนว่า... / เหมือนกับ...',
    'Use clues to infer, or compare one thing with another.','อนุมานจากหลักฐาน หรือเปรียบสิ่งหนึ่งกับอีกสิ่ง',[
      form('V普通形 / いA + ようだ','Infer from clues.','อนุมานจากสิ่งบ่งชี้','誰か来たようだ。'),
      form('なAな / Nの + ようだ','Na-adjective → な; noun → の.','คุณศัพท์ な ใช้ な / นามใช้ の','静かなようだ。／猫のようだ。'),
      form('V普通形 / いA / なA / N + みたいだ','Casual alternative; nouns need no の.','แบบกันเอง นามไม่ต้องมี の','猫みたいだ。')
    ],['玄関に靴がある。誰か来ているようだ。','げんかんにくつがある。だれかきているようだ。','There are shoes at the entrance. It seems someone is here.','มีรองเท้าอยู่ตรงทางเข้า ดูเหมือนจะมีคนมา'],
    '猫のようだ, but 猫みたいだ: do not carry の across.','猫のようだ แต่ 猫みたいだ อย่าย้าย の ไปด้วย',[
      compare('n3b02','そうだ emphasizes an impression or impending event.','そうだ เน้นลักษณะที่ดูเป็นหรือเหตุที่ใกล้เกิด'),
      compare('n3b04','Nらしい can mean “typical of N”, not merely similar.','Nらしい อาจหมายถึง “สมกับเป็น N” ไม่ใช่แค่คล้าย')]);
  guide('n3b04','Apparently… / typical of…','ได้ข่าวว่า/ดูเหมือนว่า... / สมกับเป็น...',
    'Separate an uncertain report from a characteristic quality.','แยกการรายงานแบบไม่ยืนยัน กับลักษณะที่สมกับสิ่งนั้น',[
      form('V普通形 / いA / なA / N + らしい','Report or infer without directly asserting it.','บอกต่อหรืออนุมานโดยไม่ยืนยันตรง ๆ','明日は休みらしい。'),
      form('N + らしい','Typical qualities of that noun.','ลักษณะที่สมกับคำนามนั้น','春らしい天気')
    ],['今日は春らしい暖かさだ。','きょうははるらしいあたたかさだ。','Today has the warmth you expect in spring.','วันนี้อุ่นสมกับเป็นฤดูใบไม้ผลิ'],
    'らしい does not mean a fixed level of doubt or “half-belief”.','らしい ไม่ได้กำหนดระดับความสงสัยหรือแปลว่าเชื่อครึ่งเดียว',[
      compare('n3b01','そうだ explicitly passes on a reported message.','そうだ แบบบอกต่อถ่ายทอดข้อมูลที่ได้รับมา'),
      compare('n3b03','Nのようだ says “like N”; Nらしい says “typical of N”.','Nのようだ คือเหมือน N / Nらしい คือสมกับเป็น N')]);
  guide('n3b05','It should be so, based on the facts.','ตามข้อเท็จจริงแล้วน่าจะเป็นอย่างนั้น',
    'Facts or arrangements support your expectation.','มีข้อเท็จจริงหรือกำหนดการรองรับความคาดหมาย',[
      form('V普通形 / いA + はずだ','Expect the preceding claim to be true.','คาดว่าข้อความข้างหน้าน่าจะเป็นจริง','もう着いているはずだ。'),
      form('なAな / Nの + はずだ','Na-adjective → な; noun → の.','คุณศัพท์ な ใช้ な / นามใช้ の','休みのはずだ。'),
      form('〜はずがない','Facts make it seem impossible.','ข้อเท็จจริงทำให้เห็นว่าไม่น่าเป็นไปได้','知っているはずがない。')
    ],['九時に開くので、もう開いているはずだ。','くじにあくので、もうあいているはずだ。','It opens at nine, so it should be open by now.','เปิดเก้าโมง ตอนนี้ก็น่าจะเปิดแล้ว'],
    '“Should be true” is an expectation, not advice or a wish.','“น่าจะเป็นจริง” คือความคาดหมาย ไม่ใช่คำแนะนำหรือความอยาก',[
      compare('n3b30','べきだ means someone should do something.','べきだ คือใครควรทำอะไร'),
      compare('n3b08','わけだ explains a conclusion: “that is why”.','わけだ อธิบายข้อสรุปว่า “มิน่าล่ะ”')]);

  guide('n2a03','As soon as it is ready, do the next action.','ทันทีที่พร้อม ให้ทำขั้นต่อไป',
    'Promise or request an immediate next step.','สัญญาหรือขอให้ทำขั้นถัดไปทันที',[
      form('Vます語幹 + 次第','Remove ます, then add 次第.','ตัด ます แล้วเติม 次第','分かり次第、知らせる。'),
      form('動作のN + 次第','Some action nouns also work: arrival, preparation.','นามบอกการกระทำบางคำก็ใช้ได้ เช่น การมาถึง','到着次第、連絡する。')
    ],['結果が分かり次第、メールします。','けっかがわかりしだい、メールします。','I will email you as soon as I know the result.','รู้ผลเมื่อไรจะส่งอีเมลทันที'],
    'This 次第 takes a stem: 分かり, not 分かる or 分かった.','次第 แบบนี้ใช้ราก 分かり ไม่ใช่ 分かる หรือ 分かった',[
      compare('n2a04','天気次第 = depends on the weather, not “as soon as”.','天気次第 = ขึ้นอยู่กับอากาศ ไม่ใช่ทันทีที่'),
      compare('n3a05','とたん describes a sudden event after Vた.','とたん เล่าเหตุฉับพลันหลัง Vた')]);
  guide('n2a04','The outcome depends on…','ผลขึ้นอยู่กับ...',
    'Name the factor that decides the outcome.','ระบุปัจจัยที่กำหนดผล',[
      form('N + 次第だ','End a sentence: it depends on N.','จบประโยคว่าขึ้นอยู่กับ N','予算次第だ。'),
      form('N + 次第で + 結果','Link the deciding factor to its result.','เชื่อมปัจจัยกับผลที่เปลี่ยนตาม','予算次第で変わる。')
    ],['泊まるホテルは予算次第です。','とまるホテルはよさんしだいです。','Which hotel we stay at depends on our budget.','จะพักโรงแรมไหนขึ้นอยู่กับงบ'],
    'A deciding factor such as 天気 or 予算 signals “depends on”.','ปัจจัยอย่าง 天気 หรือ 予算 บอกความหมายว่า “ขึ้นอยู่กับ”',[
      compare('n2a03','分かり次第 means as soon as you find out.','分かり次第 คือทันทีที่รู้'),
      compare('n3c18','によって can describe variation, causes, methods, or agents.','によって บอกความต่าง สาเหตุ วิธี หรือผู้กระทำได้')]);
  guide('n2a09','After completing… / when doing…','หลังทำเสร็จ... / ในการทำ...',
    'Past form gives order; dictionary form gives a viewpoint.','รูปอดีตบอกลำดับ รูปพจนานุกรมบอกขอบเขตการทำ',[
      form('Vた / Nの + 上で','Finish this first, then take the next step.','ทำสิ่งนี้ก่อน แล้วทำขั้นต่อไป','確認した上で申し込む。'),
      form('Vる + 上で','In doing this; concerning this activity.','ในการทำสิ่งนี้; เกี่ยวกับกิจกรรมนี้','働く上で大切なこと')
    ],['説明を読んだ上で、申し込んでください。','せつめいをよんだうえで、もうしこんでください。','Please read the explanation before applying.','กรุณาอ่านคำอธิบายก่อนสมัคร'],
    '読んだ上で = after reading; 読む上で = when/in reading.','読んだ上で = หลังอ่าน / 読む上で = ในการอ่าน',[
      compare('n3c32','てから gives straightforward sequence.','てから บอกลำดับก่อนหลังทั่วไป'),
      compare('n2b11','上に adds another fact: “on top of that”.','上に เพิ่มข้อมูลว่า “แถมยัง”')]);

  guide('n2b03','If only I could do it…','ถ้าทำได้จริง ๆ ก็อยาก...',
    'Imagine an ability that is hard to make real.','สมมติความสามารถที่ยากจะเป็นจริง',[
      form('V可能形 + ものなら','Potential form → an unlikely possibility.','รูปสามารถ → เงื่อนไขที่เป็นไปได้ยาก','戻れるものなら、戻りたい。')
    ],['やり直せるものなら、もう一度挑戦したい。','やりなおせるものなら、もういちどちょうせんしたい。','If I could start over, I would like to try again.','ถ้าเริ่มใหม่ได้ ก็อยากลองอีกครั้ง'],
    'This wish uses potential: できるものなら, not しようものなら.','ความปรารถนาแบบนี้ใช้รูปสามารถ できるものなら ไม่ใช่ しようものなら',[
      compare('n2g11','Volitional + ものなら warns of a bad consequence.','รูปชักชวน + ものなら เตือนว่าจะเกิดผลเสีย')]);
  guide('n2g11','If someone were to do that, trouble would follow.','ถ้าขืนทำแบบนั้น จะเกิดเรื่องตามมา',
    'Picture a risky action and its bad consequence.','สมมติการกระทำที่เสี่ยงแล้วบอกผลเสีย',[
      form('V意向形 + ものなら','Volitional form: 書こう, 食べよう, しよう.','รูปชักชวน/ตั้งใจ: 書こう, 食べよう, しよう','秘密を話そうものなら')
    ],['ここで転ぼうものなら、大けがをする。','ここでころぼうものなら、おおけがをする。','If you were to fall here, you would be seriously injured.','ถ้าขืนล้มตรงนี้ จะบาดเจ็บหนักเอา'],
    'Volitional form here does not mean you want the bad event.','รูปชักชวนตรงนี้ไม่ได้แปลว่าอยากให้เหตุร้ายเกิด',[
      compare('n2b03','Potential + ものなら imagines “if I could”.','รูปสามารถ + ものなら สมมติว่า “ถ้าทำได้”')]);
  guide('n2a20','Although A is true, the expected result did not follow.','แม้ A จะจริง แต่ผลไม่ได้เป็นไปตามคาด',
    'Admit the first fact, then add the unresolved contrast.','ยอมรับข้อแรก แล้วบอกสิ่งที่ยังขัดกัน',[
      form('V普通形 / いA + ものの','Use a plain-form clause.','ใช้ประโยครูปธรรมดา','買ったものの、使っていない。'),
      form('なAな / Nである + ものの','Na-adjective → な; noun → である.','คุณศัพท์ な ใช้ な / นามใช้ である','便利なものの、高い。')
    ],['単語は覚えたものの、会話では使えない。','たんごはおぼえたものの、かいわではつかえない。','Although I memorized the words, I cannot use them in conversation.','จำคำศัพท์ได้แล้ว แต่ใช้ตอนสนทนาไม่ได้'],
    'Both clauses describe facts; this is not an “even if” condition.','สองส่วนบอกข้อเท็จจริง ไม่ใช่เงื่อนไขสมมติ “ต่อให้”',[
      compare('n3a27','のに is common in conversation and can show disappointment.','のに ใช้บ่อยในบทสนทนา และอาจสื่อความผิดหวัง'),
      compare('n2a27','としても means even if a condition holds.','としても คือถึงแม้เงื่อนไขนั้นจะเป็นจริง')]);
  /* Nine structures the official N2 grammar sections rely on: noun clauses,
     states, passage links and sentence endings. */
  guide('n2i01','Inside a description of a noun, の can replace が.','ในส่วนที่ขยายคำนาม ใช้ の แทน が ได้',
    'Find the noun being described first; the の belongs to the words in front of it.','หาคำนามที่ถูกขยายก่อน の อยู่ในส่วนขยายที่อยู่หน้าคำนามนั้น',[
      form('Nが + V普通形 + N','The usual form: が marks who does it.','แบบปกติ: が บอกว่าใครทำ','父が作った椅子'),
      form('Nの + V普通形 + N','Same meaning: inside the description, の can replace が.','ความหมายเดียวกัน: ในส่วนขยายใช้ の แทน が ได้','父の作った椅子'),
      form('Nの + いA / なAな + N','It works with adjectives too.','ใช้กับคุณศัพท์ได้ด้วย','窓の大きい部屋')
    ],['父の作った椅子は丈夫だ。','ちちのつくったいすはじょうぶだ。','The chair my father made is sturdy.','เก้าอี้ที่พ่อทำแข็งแรง'],
    'Only inside a description of a noun. A sentence on its own needs が: 父が作った, never ×父の作った.','ใช้ได้เฉพาะในส่วนที่ขยายคำนาม ประโยคเดี่ยว ๆ ต้องใช้ が: 父が作った ไม่ใช่ ×父の作った',[]);
  guide('n2i02','Something changed, and the result is still there.','มีบางอย่างเปลี่ยนไป และผลยังคงอยู่',
    'Ask what kind of verb it is: a change, or an action that takes time?','ดูว่ากริยาเป็นแบบไหน: การเปลี่ยนแปลง หรือการกระทำที่ใช้เวลา',[
      form('変化のV + ている','Verbs of change (開く, 結婚する, 来る): the result remains.','กริยาที่บอกการเปลี่ยนแปลง (開く 結婚する 来る): ผลยังคงอยู่','窓が開いている。'),
      form('動作のV + ている','Action verbs (読む, 食べる): doing it right now.','กริยากิจกรรม (読む 食べる): กำลังทำอยู่','本を読んでいる。'),
      form('未来の時 + なっている','With a future time: will already have become.','กับเวลาในอนาคต: ถึงตอนนั้นจะเป็นแล้ว','来年は大学生になっている。')
    ],['窓が開いている。','まどがあいている。','The window is open.','หน้าต่างเปิดอยู่'],
    '結婚している means “is married”, not “is getting married”. 来ている means “is here”, not “is coming”.','結婚している แปลว่า “แต่งงานแล้ว” ไม่ใช่ “กำลังแต่งงาน” ส่วน 来ている แปลว่า “มาถึงแล้ว” ไม่ใช่ “กำลังมา”',[
      compare('n3b18','てある: someone left it that way on purpose.','てある: มีคนทำทิ้งไว้แบบนั้นโดยตั้งใจ'),
      compare('n3a01','ているところだ: in the middle of doing it right now.','ているところだ: กำลังอยู่ระหว่างทำพอดี')]);
  guide('n2i03','Sooner or later; sometime soon.','เดี๋ยวสักวัน / อีกไม่นาน',
    'No exact time: something will happen after a while.','ไม่ระบุเวลาแน่นอน แค่บอกว่าผ่านไปสักพักจะเกิดขึ้น',[
      form('そのうち + 変化','A change that will come with time.','การเปลี่ยนแปลงที่จะมาถึงเมื่อเวลาผ่านไป','そのうち慣れるよ。'),
      form('そのうち + 予定','A vague plan or a polite promise.','แผนหรือคำสัญญาแบบสุภาพที่ไม่ระบุเวลา','そのうち、また連絡します。')
    ],['そのうち、この仕事にも慣れるよ。','そのうち、このしごとにもなれるよ。','You will get used to this job before long.','เดี๋ยวก็ชินกับงานนี้เอง'],
    'そのうち stands alone. A verb + うちに means “while” or “before it changes”: 若いうちに.','そのうち ใช้เดี่ยว ๆ ส่วน กริยา + うちに แปลว่า “ระหว่างที่” หรือ “ก่อนที่จะเปลี่ยน” เช่น 若いうちに',[
      compare('n3a03','うちに joins a verb or adjective: while it lasts, or before it changes.','うちに ต่อกับกริยาหรือคุณศัพท์: ระหว่างที่ยังเป็นอยู่ หรือก่อนจะเปลี่ยน'),
      compare('a410','やがて: in time; calmer and more literary.','やがて: เมื่อเวลาผ่านไป สงบและเป็นภาษาเขียนกว่า')]);
  guide('n2i04','Whether or not.','…หรือไม่',
    'Put a yes-or-no question inside a longer sentence.','ใส่คำถามแบบใช่หรือไม่ใช่ไว้ในประโยคที่ยาวขึ้น',[
      form('V普通形 / いA + かどうか','Verbs and い-adjectives use the plain form.','กริยาและคุณศัพท์ い ใช้รูปธรรมดา','行けるかどうか'),
      form('なA / N + かどうか','Drop だ: 正確かどうか, 本当かどうか.','ตัด だ ออก: 正確かどうか 本当かどうか','本当かどうか'),
      form('疑問詞 … + か','With a question word, use plain か.','ถ้ามีคำคำถาม ใช้ か เฉย ๆ','いつ行くか')
    ],['参加できるかどうか、明日連絡します。','さんかできるかどうか、あしたれんらくします。','I will let you know tomorrow whether I can come.','พรุ่งนี้จะแจ้งว่าเข้าร่วมได้หรือไม่'],
    'Not ×いつ行くかどうか: a question word already makes it a question.','ไม่ใช่ ×いつ行くかどうか เพราะมีคำคำถามอยู่แล้ว',[]);
  guide('n2i05','Too much / without overdoing it.','…เกินไป / โดยไม่…เกินไป',
    'ます-stem or adjective stem + すぎる.','ฐานของรูป ます หรือรากคุณศัพท์ + すぎる',[
      form('Vます語幹 + すぎる','Do too much: 飲みすぎる, 働きすぎる.','ทำมากเกินไป: 飲みすぎる 働きすぎる','飲みすぎた。'),
      form('いA（い）/ なA + すぎる','Too …: 高すぎる, 静かすぎる.','…เกินไป: 高すぎる 静かすぎる','この服は高すぎる。'),
      form('〜すぎずに','Without overdoing it.','โดยไม่…เกินไป','無理しすぎずに続ける。')
    ],['昨日はコーヒーを飲みすぎた。','きのうはコーヒーをのみすぎた。','I drank too much coffee yesterday.','เมื่อวานดื่มกาแฟมากเกินไป'],
    'It changes like 食べる: すぎない, すぎて, すぎた. Do not confuse it with にすぎない (merely).','ผันแบบ 食べる: すぎない すぎて すぎた อย่าสับสนกับ にすぎない (เป็นเพียง)',[
      compare('b415','にすぎない: merely; no more than.','にすぎない: เป็นเพียง…เท่านั้น')]);
  guide('n2i06','Says something like…','พูดทำนองว่า…',
    'Quote words loosely, often with doubt or disapproval.','ยกคำพูดแบบหลวม ๆ มักแฝงความสงสัยหรือไม่เห็นด้วย',[
      form('「…」とか言う','Quote vaguely: something like that.','ยกคำพูดแบบคลุมเครือ: ประมาณนั้น','「忙しい」とか言って'),
      form('「…」なんていう + N','Describe a noun, with surprise or disapproval.','ขยายคำนาม แฝงความแปลกใจหรือไม่เห็นด้วย','「無料」なんていう話')
    ],['彼は「面倒だ」とか言って、手伝わなかった。','かれは「めんどうだ」とかいって、てつだわなかった。','He said something like “It’s a hassle” and did not help.','เขาพูดทำนองว่า “ยุ่งยาก” แล้วก็ไม่ช่วย'],
    'Plain と is a neutral quote. とか and なんて add the speaker’s attitude.','と ธรรมดาเป็นการยกคำพูดแบบกลาง ๆ ส่วน とか และ なんて เพิ่มท่าทีของผู้พูด',[
      compare('n2g04','なんて after a sentence can also show surprise.','なんて ท้ายประโยคใช้แสดงความประหลาดใจได้ด้วย')]);
  guide('n2i07','Following the links in a passage.','การตามคำชี้และการเชื่อมในบทความ',
    'For each こ/そ word or pronoun, find what it points to.','สำหรับคำชี้ こ/そ และสรรพนามแต่ละตัว ให้หาว่ามันชี้ไปที่อะไร',[
      form('こう / このように','Often points forward, to what is about to be said.','มักชี้ไปข้างหน้า ถึงสิ่งที่กำลังจะพูด','先生はこう言った。「…」'),
      form('そう / そのように','Points back, to what was just said.','ชี้ย้อนกลับ ถึงสิ่งที่เพิ่งพูดไป','私もそう思う。'),
      form('彼ら / 彼女たち','Must match the group just described.','ต้องตรงกับกลุ่มที่เพิ่งพูดถึง','子どもたちは…。彼らは…')
    ],['先生はこう言った。「毎日少しずつ続けましょう。」','せんせいはこういった。「まいにちすこしずつつづけましょう。」','The teacher said this: “Keep at it, a little every day.”','ครูพูดไว้ว่า “ทำต่อไปทุกวัน ทีละนิดนะ”'],
    'In passage questions, ask what each sentence does: an example, a reason or the conclusion.','ในข้อสอบบทความ ให้ถามว่าแต่ละประโยคทำหน้าที่อะไร: ยกตัวอย่าง ให้เหตุผล หรือสรุป',[]);
  guide('n2i08','Besides; as well as.','นอกจาก…แล้ว',
    'Name one item, then add others.','บอกสิ่งหนึ่งก่อน แล้วเพิ่มสิ่งอื่นตามมา',[
      form('N + のほか（に）… も','Add more: X, and also Y.','เพิ่ม: X แล้วยังมี Y ด้วย','英語のほかに、タイ語も'),
      form('N + のほか（に）… ない','With a negative: nothing but X.','กับรูปปฏิเสธ: ไม่มีอะไรนอกจาก X','彼のほかに頼れる人はいない。')
    ],['英語のほかに、タイ語も話せます。','えいごのほかに、タイごもはなせます。','Besides English, I can also speak Thai.','นอกจากภาษาอังกฤษแล้ว ยังพูดภาษาไทยได้ด้วย'],
    'のほか adds to X; にかわって replaces X.','のほか เพิ่มจาก X ส่วน にかわって แทนที่ X',[
      compare('b309','に代わって: in place of X, not as well as X.','に代わって: แทน X ไม่ใช่เพิ่มจาก X')]);
  guide('n2i09','Probably… / I wonder if…','คงจะ… / …หรือเปล่านะ',
    'Without か it guesses; with か it asks or wonders.','ไม่มี か คือการคาดเดา มี か คือการถามหรือสงสัย',[
      form('V普通形 / いA + だろう','A guess: the plain form of でしょう.','การคาดเดา เป็นรูปธรรมดาของ でしょう','明日は晴れるだろう。'),
      form('なA / N + だろう','Drop だ: 静かだろう, 雨だろう.','ตัด だ ออก: 静かだろう 雨だろう','明日は雨だろう。'),
      form('〜だろうか','Wondering, or asking the reader in writing.','สงสัย หรือถามผู้อ่านในงานเขียน','本当だろうか。')
    ],['明日は晴れるだろう。','あしたははれるだろう。','It will probably be sunny tomorrow.','พรุ่งนี้อากาศคงจะแจ่มใส'],
    'だろう is not only for the future: 昨日は寒かっただろう. Do not confuse it with hearsay そうだ.','だろう ไม่ได้ใช้กับอนาคตเท่านั้น เช่น 昨日は寒かっただろう อย่าสับสนกับ そうだ (ได้ยินมาว่า)',[
      compare('n3b05','はずだ: should be so, backed by facts.','はずだ: น่าจะเป็นอย่างนั้น โดยมีข้อเท็จจริงรองรับ'),
      compare('n3b01','そうだ: I heard it; not my own guess.','そうだ: ได้ยินมา ไม่ใช่การเดาของตัวเอง')]);
})();

/* The three stages need an immediate form check, not only self-rated recall. */
[
  {id:'sf01',answer:'食べる',ja:'今から昼ご飯を＿＿ところです。',kana:'いまからひるごはんを＿＿ところです。',
    prompt_en:'You have not started eating. Say that you are just about to eat.',prompt_th:'ยังไม่ได้เริ่มกิน บอกว่ากำลังจะเริ่มกินพอดี',
    en:'I am just about to eat lunch.',th:'กำลังจะกินมื้อกลางวันพอดี',
    why_en:'Dictionary form 食べる means the action has not started. 食べている is in progress; 食べた is finished.',why_th:'รูปพจนานุกรม 食べる คือยังไม่เริ่ม 食べている คือกำลังทำ และ 食べた คือเสร็จแล้ว'},
  {id:'sf02',answer:'食べている',ja:'今、昼ご飯を＿＿ところです。',kana:'いま、ひるごはんを＿＿ところです。',
    prompt_en:'You are in the middle of eating lunch. Choose the form for an action in progress.',prompt_th:'กำลังกินมื้อกลางวันอยู่ เลือกรูปที่บอกว่ากำลังทำ',
    en:'I am in the middle of eating lunch.',th:'กำลังกินมื้อกลางวันอยู่พอดี',
    why_en:'ている + ところ means the action is in progress. 食べる would mean before starting; 食べた would mean after finishing.',why_th:'ている + ところ คือกำลังทำ 食べる คือก่อนเริ่ม และ 食べた คือหลังทำเสร็จ'},
  {id:'sf03',answer:'食べた',ja:'たった今、昼ご飯を＿＿ところです。',kana:'たったいま、ひるごはんを＿＿ところです。',
    prompt_en:'You have just finished lunch. Choose the form for the moment immediately after finishing.',prompt_th:'เพิ่งกินมื้อกลางวันเสร็จ เลือกรูปที่บอกว่าเสร็จเมื่อครู่นี้',
    en:'I have just finished eating lunch.',th:'เพิ่งกินมื้อกลางวันเสร็จเมื่อครู่นี้',
    why_en:'た-form 食べた marks the finished action. 食べる is before it; 食べている is during it.',why_th:'รูป た คือ 食べた บอกว่าเสร็จแล้ว 食べる คือก่อนทำ และ 食べている คือระหว่างทำ'}
].forEach(function(e){
  MASTERY_EXERCISES.push(Object.assign({gid:'n3a01',group:'window',kind:'form',options:['食べる','食べている','食べた'],hint_en:'Before → dictionary form; during → ている; after → た.',hint_th:'ก่อนทำ → รูปพจนานุกรม / ระหว่างทำ → ている / เสร็จแล้ว → た'},e));
});
