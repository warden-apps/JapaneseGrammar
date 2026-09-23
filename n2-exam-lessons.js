/* Short original support lessons for structures tested in the official N2
   grammar sections. N2 is the exam context, not a claim of exclusive level. */
(function(){
  function lesson(id,p,conn,en,th,cue,cueth,watch,watchth,examples){
    var ex=examples.map(function(x){return {j:x[0],k:x[1],e:x[2],t:x[3]};});
    var g={id:id,lv:'N2',cat:'N2試験の基礎・文脈',p:p,conn:conn,se:en,st:th,en:en,th:th,note_en:watch,note_th:watchth,ex:ex};
    GRAMMAR.push(g);SHORT[id]=[en,th];
    LESSON_GUIDES[id]={meaning_en:en,meaning_th:th,cue_en:cue,cue_th:cueth,
      forms:[{form:conn,en:cue,th:cueth,example:ex[0].j}],example:ex[0],watch_en:watch,watch_th:watchth,compare:[]};
  }
  lesson('n2i01','名詞を修飾する節の「の」','Nが／Nの + 普通形 + 名詞',
    'Inside a clause describing a noun, の can mark the subject instead of が.','ในอนุประโยคขยายนาม の ใช้ชี้ประธานแทน が ได้',
    'First find the noun being described.','หานามที่ถูกขยายก่อน',
    '父の作った椅子 = 父が作った椅子. This does not mean が can always become の: the clause must modify a noun, and ambiguity or the construction can restrict the substitution.',
    '父の作った椅子 = 父が作った椅子 ไม่ได้แปลว่าเปลี่ยน が เป็น の ได้ทุกที่ ต้องอยู่ในส่วนขยายนาม และบางโครงสร้างหรือความกำกวมอาจทำให้เปลี่ยนไม่ได้',
    [['父の作った椅子は丈夫だ。','ちちのつくったいすはじょうぶだ。','The chair my father made is sturdy.','เก้าอี้ที่พ่อทำแข็งแรง'],['窓の大きい部屋を探している。','まどのおおきいへやをさがしている。','I am looking for a room with large windows.','กำลังหาห้องที่มีหน้าต่างใหญ่']]);
  lesson('n2i02','〜ている（結果の状態）','変化のVて + いる',
    'A change has happened, and its result holds at the reference time.','เกิดการเปลี่ยนแปลงแล้ว และผลยังคงอยู่ ณ เวลาที่กล่าวถึง',
    'ている is not always “doing right now”. Check the verb and the reference time.','ている ไม่ได้แปลว่ากำลังทำเสมอ ดูชนิดกริยาและเวลาที่อ้างถึง',
    '開く is the change; 開いている is the resulting open state. With a future time, なっている can mean “will already have become”. With an activity verb such as 読む, ている can instead be ongoing.',
    '開く คือการเปิด ส่วน 開いている คือสภาพที่เปิดอยู่ ถ้าเป็นเวลาอนาคต なっている อาจแปลว่าตอนนั้นจะกลายเป็นแล้ว แต่กริยากิจกรรมเช่น 読む ใช้ ている บอกกำลังทำได้',
    [['窓が開いている。','まどがあいている。','The window is open.','หน้าต่างเปิดอยู่'],['来年の今ごろは、大学生になっているだろう。','らいねんのいまごろは、だいがくせいになっているだろう。','By this time next year, I will probably be a university student.','ช่วงนี้ปีหน้าคงเป็นนักศึกษาแล้ว']]);
  lesson('n2i03','そのうち','そのうち + 変化・出来事',
    'Eventually / before long; the exact time is unspecified.','เดี๋ยวสักวัน / ในไม่ช้า โดยไม่ระบุเวลาแน่นอน',
    'Something will happen after some time passes.','เวลาผ่านไปสักพักแล้วจะเกิดบางอย่าง',
    'そのうち is an adverb. Vるうちに instead attaches to an activity or state and means “while/before that situation changes”. Do not confuse the similar-looking forms.',
    'そのうち เป็นคำวิเศษณ์ ส่วน Vるうちに เชื่อมกับกิจกรรมหรือสภาพ บอกระหว่างนั้น/ก่อนสภาพเปลี่ยน อย่าสับสนเพราะหน้าตาคล้ายกัน',
    [['そのうち、この仕事にも慣れるよ。','そのうち、このしごとにもなれるよ。','You will get used to this job before long.','เดี๋ยวก็ชินกับงานนี้'],['そのうち、また連絡します。','そのうち、またれんらくします。','I will get in touch again sometime.','ไว้จะติดต่อไปอีกครั้ง']]);
  lesson('n2i04','〜かどうか','普通形 + かどうか（N・ナAは「だ」を取る）',
    'Whether or not: place a yes/no question inside a larger sentence.','…หรือไม่ นำคำถามแบบใช่/ไม่ใช่เข้าไปเป็นส่วนหนึ่งของประโยค',
    'Treat the whole question as one chunk before 分かる, 調べる or a similar expression.','มองคำถามทั้งก้อนเป็นหนึ่งส่วน ก่อน 分かる、調べる หรือสำนวนที่คล้ายกัน',
    '行くかどうか = whether to go. With a question word, use plain か instead: いつ行くか, not いつ行くかどうか. In noun/adjective predicates, omit だ before かどうか.',
    '行くかどうか = จะไปหรือไม่ ถ้ามีคำถามอย่าง いつ ใช้ か เช่น いつ行くか ไม่ใช่ いつ行くかどうか นามและคุณศัพท์ な ตัด だ ก่อน かどうか',
    [['参加できるかどうか、明日連絡します。','さんかできるかどうか、あしたれんらくします。','I will let you know tomorrow whether I can attend.','พรุ่งนี้จะแจ้งว่าเข้าร่วมได้หรือไม่'],['この情報が正確かどうか調べよう。','このじょうほうがせいかくかどうかしらべよう。','Let us check whether this information is accurate.','ตรวจสอบกันว่าข้อมูลนี้ถูกต้องหรือไม่']]);
  lesson('n2i05','〜すぎる / 〜すぎずに','Vます語幹 + すぎる／すぎずに',
    'Do too much / without doing too much.','ทำมากเกินไป / โดยไม่ทำมากเกินไป',
    'Use the stem: 飲みます → 飲みすぎる → 飲みすぎずに.','ใช้ฐานรูป ます: 飲みます → 飲みすぎる → 飲みすぎずに',
    'V-stem + すぎる means excess. Plain V/N + にすぎない means merely or no more than. Similar sound, different connection and meaning. すぎる conjugates as an ichidan verb.',
    'ฐานกริยา + すぎる คือเกินไป ส่วน Vรูปธรรมดา/N + にすぎない คือเพียงแค่ เสียงคล้ายแต่เชื่อมและหมายความต่างกัน すぎる ผันแบบกริยากลุ่มสอง',
    [['昨日はコーヒーを飲みすぎた。','きのうはコーヒーをのみすぎた。','I drank too much coffee yesterday.','เมื่อวานดื่มกาแฟมากเกินไป'],['無理をしすぎずに、少しずつ進めよう。','むりをしすぎずに、すこしずつすすめよう。','Let us proceed gradually without pushing ourselves too hard.','ค่อย ๆ ทำไปโดยไม่ฝืนตัวเองมากเกินไป']]);
  lesson('n2i06','〜とか言う / 〜なんていう','引用する言葉 + とか言う／なんていう',
    'Say things like…; quote a remark with some distance or emotion.','พูดอะไรทำนองว่า… ยกคำพูดโดยเว้นระยะหรือแสดงความรู้สึก',
    'Find the quoted words, then the person or action they describe.','หาคำพูดที่ถูกยกมา แล้วดูว่าขยายคนหรือการกระทำใด',
    'とか loosely quotes. なんていう often adds surprise or disapproval; it can modify a noun. Neutral と is also a quotation marker, but these forms add the speaker’s stance.',
    'とか ยกคำพูดแบบไม่เจาะจง なんていう มักเพิ่มความประหลาดใจหรือไม่เห็นด้วย และขยายนามได้ ส่วน と เป็นเครื่องหมายคำพูดกลาง ๆ แต่รูปเหล่านี้เพิ่มท่าทีผู้พูด',
    [['彼は「面倒だ」とか言って、手伝わなかった。','かれは「めんどうだ」とかいって、てつだわなかった。','He said something like “It’s a bother” and did not help.','เขาพูดทำนองว่า “ยุ่งยาก” แล้วไม่ช่วย'],['「勉強しなくていい」なんていう話を信じないで。','「べんきょうしなくていい」なんていうはなしをしんじないで。','Do not believe claims like “You do not need to study.”','อย่าเชื่อเรื่องทำนองว่า “ไม่ต้องเรียนก็ได้”']]);
  lesson('n2i07','文章のつながり・指示語','こう・そう・どのように・彼ら／彼女たち',
    'Follow what each word points to and what each sentence does in the passage.','ตามให้ทันว่าแต่ละคำอ้างถึงอะไร และแต่ละประโยคทำหน้าที่ใดในบทความ',
    'Ask: looking backward, introducing what follows, asking how, or summarizing?','ถามตัวเองว่า ชี้ย้อนหลัง เกริ่นสิ่งที่จะตามมา ถามวิธี หรือสรุป',
    'こう can introduce an upcoming quotation; そう commonly refers to available context. A pronoun must match the specific group just described, not merely a nearby noun. A conclusion can state the writer’s own summary without adding hearsay.',
    'こう ใช้เกริ่นคำพูดที่จะตามมาได้ そう มักชี้บริบทที่มีอยู่แล้ว สรรพนามต้องตรงกลุ่มที่อธิบาย ไม่ใช่แค่นามที่อยู่ใกล้ บทสรุปอาจสรุปตรง ๆ โดยไม่ต้องเพิ่มว่าได้ยินมา',
    [['先生はこう言った。「毎日少しずつ続けましょう。」','せんせいはこういった。「まいにちすこしずつつづけましょう。」','The teacher said this: “Keep at it a little every day.”','ครูพูดดังนี้ว่า “ทำต่อไปวันละนิดนะ”'],['子どもたちは公園に集まった。彼らはそこで遊んだ。','こどもたちはこうえんにあつまった。かれらはそこであそんだ。','The children gathered in the park. They played there.','เด็ก ๆ มารวมกันที่สวน พวกเขาเล่นกันที่นั่น']]);
  lesson('n2i08','〜のほか','N + のほか（に）',
    'Besides / in addition to that item.','นอกจากสิ่งนั้นแล้ว ยังมีอย่างอื่น',
    'A known item comes first; additional examples follow.','เริ่มด้วยสิ่งที่กล่าวถึงแล้ว ตามด้วยตัวอย่างเพิ่มเติม',
    'In a list, のほか adds items alongside the first one. にかわって replaces it. The negative pattern ほかに…ない has a different limiting use.',
    'ในรายการ のほか เพิ่มสิ่งที่มีควบคู่กับอันแรก ส่วน にかわって แทนที่อันแรก รูปปฏิเสธ ほかに…ない มีการใช้จำกัดอีกแบบ',
    [['英語のほかに、タイ語も話せます。','えいごのほかに、タイごもはなせます。','Besides English, I can also speak Thai.','นอกจากอังกฤษแล้ว ยังพูดไทยได้'],['会場には学生のほか、教師も来ていた。','かいじょうにはがくせいのほか、きょうしもきていた。','Besides students, teachers had also come to the venue.','นอกจากนักเรียนแล้ว ครูก็มาที่งานด้วย']]);
  lesson('n2i09','〜だろう / 〜だろうか','普通形 + だろう（か）（N・ナAは「だ」を取る）',
    'Probably… / I wonder whether…','คงจะ… / จะ…หรือไม่',
    'Without か, predict; with か, pose a question or wonder.','ไม่มี か คือคาดการณ์ มี か คือถามหรือสงสัย',
    'Context decides the time; だろう does not automatically mean future. だろうか can address the reader in writing. Do not confuse this with hearsay そうだ or a past expectation はずだった.',
    'บริบทกำหนดเวลา だろう ไม่ได้เป็นอนาคตเสมอ だろうか ใช้ถามผู้อ่านในงานเขียนได้ ต่างจาก そうだ ที่ได้ยินมา และ はずだった ที่เคยคาดไว้',
    [['明日は晴れるだろう。','あしたははれるだろう。','It will probably be sunny tomorrow.','พรุ่งนี้อากาศคงแจ่มใส'],['この町の名前の由来をご存じだろうか。','このまちのなまえのゆらいをごぞんじだろうか。','Do you know the origin of this town’s name?','ทราบที่มาของชื่อเมืองนี้หรือไม่']]);
})();
