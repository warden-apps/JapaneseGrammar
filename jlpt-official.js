/* Source: Official Worldwide Japanese-Language Proficiency Test Website
   (https://www.jlpt.jp/), The Japan Foundation / Japan Educational Exchanges
   and Services. N2 Official Practice Workbooks, published 2012 and 2018.
   Personal-study use: https://www.jlpt.jp/e/policy.html §1(1).
   Japanese prompts/options and keys are official. EN/TH explanations,
   translations, lesson tags and reconstructed complete orders are independent.
   Layout, spacing and blank labels are adapted; furigana is omitted.
   Publication year is NOT the date of the original test. */
var JLPT_OFFICIAL_SOURCES={
  2012:{title:'N2 Official Practice Workbook (2012)',url:'https://www.jlpt.jp/samples/sample2012/pdf/N2G.pdf',answers:'https://www.jlpt.jp/samples/sample2012/pdf/N2answer.pdf'},
  2018:{title:'N2 Official Practice Workbook Vol. 2 (2018)',url:'https://www.jlpt.jp/samples/sample2018/pdf/N2G.pdf',answers:'https://www.jlpt.jp/samples/sample2018/pdf/N2answer.pdf'}
};
(function(){
  function add(year,number,page,gids,data){
    var q=Object.assign({id:'official-'+year+'-n2-'+number,level:'N2',gid:gids[0],gids:gids,
      source:{edition:year,number:number,page:page,section:number<45?7:number<50?8:9}},data);
    JLPT_QUESTIONS.push(q);return q;
  }
  function choice(year,n,page,gids,stem,words,answer,en,th,te,tt,reasons){
    return add(year,n,page,gids,{kind:'choice',stem:stem,answer:answer-1,en:en,th:th,translation_en:te,translation_th:tt,
      options:words.map(function(text,i){return {text:text,en:i===answer-1?en:reasons[i][0],th:i===answer-1?th:reasons[i][1]};})});
  }
  function order(year,n,page,gids,before,words,sequence,star,after,en,th,te,tt){
    var parts=sequence.map(function(i){return words[i-1];});
    add(year,n,page,gids,{kind:'order',before:before,after:after,parts:parts,star:star,answer:sequence[star]-1,en:en,th:th,translation_en:te,translation_th:tt,
      options:words.map(function(text,i){var pos=sequence.indexOf(i+1)+1;return {text:text,en:'This part goes in position '+pos+'. Follow the connections in the complete sentence below.',th:'ส่วนนี้อยู่ตำแหน่งที่ '+pos+' ดูการเชื่อมในประโยคที่เรียงครบด้านล่าง'};})});
  }
  function passage(year,stem,rows){
    rows.forEach(function(r,i){var q=choice(year,50+i,year===2012?6:5,r.gids,stem,r.words,r.answer,r.en,r.th,r.te,r.tt,r.reasons);q.kind='text';q.passage='official-'+year+'-n2-passage';q.blank=i+1;});
  }
  choice(2018,33,1,['n3c14'],'卒業論文がなかなか書けなくて、一時は＿＿かけたが、何とか今日無事に提出することができた。',
    ['あきらめ','あきらめて','あきらめる','あきらめた'],1,
    'かける attaches to the ます stem: あきらめます → あきらめかけた. The writer nearly gave up, but eventually submitted the thesis.',
    'かける ต่อฐานรูป ます: あきらめます → あきらめかけた เกือบยอมแพ้ แต่สุดท้ายส่งวิทยานิพนธ์ได้',
    'I struggled to write my graduation thesis and nearly gave up, but somehow managed to submit it today.',
    'เขียนวิทยานิพนธ์ไม่คืบจนเกือบยอมแพ้ แต่ในที่สุดก็ส่งได้วันนี้',
    [null,['The て form does not attach to かける in this construction.','รูป て ไม่ใช้เชื่อมกับ かける ในโครงสร้างนี้'],['Remove る before adding かける to this ichidan verb.','กริยากลุ่มนี้ต้องตัด る ก่อนเติม かける'],['The past ending belongs on かけた, not on あきらめ.','รูปอดีตอยู่ที่ かけた ไม่ใช่เติม た ที่ あきらめ']]);
  choice(2018,34,1,['n2i01'],'子どものころ、母＿＿作ったハンバーグが大好きで、よく作ってもらった。',
    ['の','との','によって','にとって'],1,
    '母の作った modifies ハンバーグ. Inside this noun-modifying clause, の can mark the subject just like が: the hamburg steaks that Mum made.',
    '母の作った ขยาย ハンバーグ ภายในส่วนขยายนามนี้ の ใช้แทน が เพื่อชี้ประธานได้ คือแฮมเบิร์กที่แม่ทำ',
    'As a child I loved Mum’s hamburg steaks and often had her make them.',
    'ตอนเด็กชอบแฮมเบิร์กที่แม่ทำมาก จึงมักขอให้แม่ทำให้',
    [null,['との links a noun to another noun, as in 母との会話; it does not mark the maker before 作った.','との เชื่อมนาม เช่น 母との会話 ไม่ได้ชี้คนทำหน้า 作った'],['The agent use would need a passive verb: 母によって作られた.','ถ้าใช้ によって ชี้ผู้กระทำ ต้องเป็นรูปถูกกระทำ เช่น 母によって作られた'],['にとって introduces a viewpoint, not the subject of 作った.','にとって บอกมุมมอง ไม่ใช่ประธานของ 作った']]);
  choice(2018,35,1,['n3c29'],'多様な情報があふれる現代社会＿＿、大切なのは、膨大な情報の中から、自分に必要な情報を選ぶ力である。',
    ['に加えて','において','を基にして','を込めて'],2,
    '現代社会 is the setting in which this ability matters. N + において is a formal “in/at”, not a cause or method.',
    '現代社会 คือบริบทที่ทักษะนี้สำคัญ N + において เป็น “ใน/ที่” แบบเป็นทางการ ไม่ใช่สาเหตุหรือวิธีการ',
    'In modern society, flooded with information, what matters is the ability to select the information you need.',
    'ในสังคมปัจจุบันที่ข้อมูลล้นหลาม สิ่งสำคัญคือความสามารถในการเลือกข้อมูลที่จำเป็นต่อตนเอง',
    [['に加えて adds another item; no second item is being added to society.','に加えて ใช้เพิ่มอีกสิ่งหนึ่ง แต่ตรงนี้ไม่ได้เพิ่มอะไรต่อจากสังคม'],null,['を基にして means using something as a basis to create or judge something.','を基にして คือใช้เป็นพื้นฐานในการสร้างหรือตัดสินบางอย่าง'],['を込めて means putting a feeling or effort into an action.','を込めて คือใส่ความรู้สึกหรือความตั้งใจลงในการกระทำ']]);
  choice(2018,36,1,['n2i03'],'作文が得意な友達に「どうやったらうまくなれるの？」と聞いたら、「たくさん書けば＿＿うまくなるよ。」と言われた。',
    ['必ずしも','たとえ','そのうち','さっき'],3,
    'The friend predicts improvement after continued practice. そのうち means eventually/before long, without specifying exactly when.',
    'เพื่อนคาดว่าจะเก่งขึ้นถ้าฝึกต่อไป そのうち คือเดี๋ยวสักวัน/ในไม่ช้า โดยไม่ระบุเวลาแน่นอน',
    'When I asked a friend who writes well how to improve, they said, “Write a lot and you’ll get better eventually.”',
    'เมื่อถามเพื่อนที่เขียนเก่งว่าจะพัฒนาอย่างไร เพื่อนตอบว่า “เขียนเยอะ ๆ เดี๋ยวก็เก่งขึ้น”',
    [['必ずしも normally pairs with a negative judgment: not necessarily.','必ずしも มักตามด้วยการปฏิเสธ แปลว่าไม่จำเป็นว่าจะเป็นเช่นนั้นเสมอ'],['たとえ sets up an even-if condition, usually with ても; it is not a time adverb here.','たとえ ใช้ตั้งเงื่อนไขแม้ว่า มักคู่กับ ても ไม่ใช่คำบอกเวลา'],null,['さっき refers to a short time ago, but the improvement is in the future.','さっき คือเมื่อสักครู่ แต่การเก่งขึ้นยังอยู่ในอนาคต']]);
  choice(2018,37,1,['n2a17'],'看護師の仕事は夜勤もあって大変だが、自分でこの仕事を選んだ＿＿、がんばって続けたいと思う。',
    ['以上','とたん','あげくに','かのようで'],1,
    '選んだ以上 = now that I chose it myself. The second clause expresses the commitment that follows from that choice.',
    '選んだ以上 = ในเมื่อเลือกเองแล้ว ส่วนหลังจึงบอกความมุ่งมั่นที่จะรับผิดชอบต่อทางเลือกนั้น',
    'Nursing is tough, with night shifts too, but since I chose this work myself, I want to keep doing my best.',
    'งานพยาบาลลำบากและมีเวรกลางคืน แต่ในเมื่อเลือกเองแล้ว ก็อยากพยายามทำต่อไป',
    [null,['とたん introduces something sudden immediately after an action, not a considered commitment.','とたん บอกเหตุการณ์ฉับพลันทันทีหลังทำ ไม่ใช่ความตั้งใจจากการตัดสินใจ'],['あげくに introduces an eventual, usually unfortunate outcome after a process.','あげくに บอกผลสุดท้ายที่มักไม่ดีหลังผ่านกระบวนการ'],['かのようで means as if; the choice is a real fact, not a comparison.','かのようで คือราวกับว่า แต่ตรงนี้การเลือกเป็นเรื่องจริง ไม่ใช่การเปรียบเทียบ']]);
  choice(2018,38,1,['n3e01'],'（内線電話で）\n山田「はい、山田です。」\n木村「受付の木村ですが、X社の中川様が＿＿。」\n山田「わかりました。すぐ行きます。」',
    ['伺いました','お目にかかりました','ございました','お越しになりました'],4,
    'The visitor is the subject, marked by が. Respectfully describe the visitor’s arrival with お越しになりました.',
    'ผู้มาเยือนเป็นประธานที่ตามด้วย が จึงใช้รูปยกย่องการมาของเขาว่า お越しになりました',
    'On an internal call, reception tells Yamada that Mr/Ms Nakagawa from Company X has arrived. Yamada says they will come immediately.',
    'ทางโทรศัพท์ภายใน พนักงานต้อนรับแจ้งยามาดะว่าคุณนากางาวะจากบริษัท X มาถึงแล้ว ยามาดะตอบว่าจะไปทันที',
    [['伺う humbly describes your side visiting or asking; it does not honor the visitor as subject.','伺う ถ่อมตนเมื่อฝ่ายเรามาเยือนหรือถาม ไม่ได้ยกย่องผู้มาเยือนที่เป็นประธาน'],['お目にかかる is humble “meet”, not respectful “arrive”.','お目にかかる คือพบแบบถ่อมตน ไม่ใช่มาถึงแบบยกย่อง'],['ございます is polite あります and is not used for a person’s arrival.','ございます คือ あります แบบสุภาพ ไม่ใช้บอกการมาถึงของคน'],null]);
  choice(2018,39,2,['n3a25'],'人は一生のうちどのくらい寝ているのでしょうか。仮に一日８時間寝て、80歳まで生きる＿＿。すると、睡眠時間は約233,600時間で、約27年寝ている計算になります。',
    ['となりました','とします','とされていました','と見られます'],2,
    '仮に signals an assumption for a calculation. Plain form + とします = let us suppose that…; this is not a report about a known person.',
    '仮に บอกการสมมติเพื่อคำนวณ รูปธรรมดา + とします คือสมมติว่า ไม่ใช่รายงานข้อเท็จจริงของคนหนึ่ง',
    'How much of our lives do we sleep? Suppose we sleep eight hours a day and live to 80: that is about 233,600 hours, or 27 years.',
    'เรานอนนานเท่าไรในชีวิต สมมติว่านอนวันละแปดชั่วโมงและมีชีวิตถึง 80 ปี จะนอนประมาณ 233,600 ชั่วโมง หรือ 27 ปี',
    [['となりました announces a decided result, not an assumption for the following calculation.','となりました บอกผลที่ตกลงแล้ว ไม่ใช่สมมติเพื่อคำนวณ'],null,['とされていました reports a past accepted view, not the assumption being made now.','とされていました บอกความเห็นที่เคยยอมรับในอดีต ไม่ใช่การสมมติตอนนี้'],['と見られます reports an assessment based on evidence; 仮に asks us to assume a scenario.','と見られます คือประเมินจากหลักฐาน แต่ 仮に ชวนสมมติสถานการณ์']]);
  choice(2018,40,2,['n3a22'],'夢を語る＿＿誰でもできるが、実現させるのは簡単なことではない。',
    ['だけでは','だけなら','ためしか','ためには'],2,
    'だけなら limits the condition: if it is only talking about a dream, anyone can do it. Making it happen is the contrasting challenge.',
    'だけなら จำกัดเงื่อนไขว่า ถ้าแค่เล่าความฝันใครก็ทำได้ แต่การทำให้จริงเป็นเรื่องยาก',
    'Anyone can merely talk about a dream, but realizing it is not easy.',
    'ถ้าแค่พูดถึงความฝันใครก็ทำได้ แต่ทำให้เป็นจริงไม่ง่าย',
    [['だけでは usually leads to insufficiency; here 誰でもできる affirms that the limited action is easy.','だけでは มักนำไปสู่ความไม่เพียงพอ แต่ 誰でもできる ยืนยันว่าการทำแค่นี้ง่าย'],null,['ためしか does not form the needed conditional expression and しか requires a negative predicate.','ためしか ไม่ใช่เงื่อนไขที่ต้องการ และ しか ต้องใช้กับภาคแสดงปฏิเสธ'],['ためには introduces a purpose and requirements, not “if merely talking”.','ためには บอกสิ่งจำเป็นเพื่อเป้าหมาย ไม่ใช่ถ้าแค่พูด']]);
  choice(2018,41,2,['n3c32'],'（説明書で）\nエアコンを掃除するときは、安全上、必ずコンセントを＿＿してください。',
    ['抜いたことを','抜いたことが','抜いてからに','抜いてからは'],3,
    'The full expression is 抜いてからにしてください: make sure the cleaning happens after unplugging. てから gives the required sequence.',
    'ประโยคเต็มคือ 抜いてからにしてください ให้ทำความสะอาดหลังถอดปลั๊กแล้ว てから บอกลำดับที่จำเป็น',
    'For safety, be sure to unplug the air conditioner before cleaning it.',
    'เพื่อความปลอดภัย ต้องถอดปลั๊กเครื่องปรับอากาศก่อนทำความสะอาด',
    [['抜いたことをしてください does not express “do it after unplugging”.','抜いたことをしてください ไม่ได้บอกให้ทำหลังถอดปลั๊ก'],['ことが cannot connect to してください in this instruction.','ことが เชื่อมกับ してください ในคำสั่งนี้ไม่ได้'],null,['からは marks a topic after an event; the needed construction is てからにする.','からは ใช้ยกช่วงหลังเหตุการณ์เป็นหัวข้อ แต่ตรงนี้ต้องเป็น てからにする']]);
  choice(2018,42,2,['n3b13','n3b16'],'私はスピーチが苦手なのに、今度友達の結婚パーティーでスピーチを＿＿、困っている。',
    ['しにくくて','してほしくて','させてみたくて','することになってしまって'],4,
    'ことになる says it has been arranged; てしまう adds an unwelcome result. The speaker is troubled because they now have to give the speech.',
    'ことになる คือมีการกำหนดไว้แล้ว ส่วน てしまう เพิ่มความรู้สึกไม่พึงประสงค์ ผู้พูดลำบากใจเพราะต้องกล่าวสุนทรพจน์',
    'Although I am bad at speeches, I have ended up having to give one at a friend’s wedding party, and I am worried.',
    'ทั้งที่พูดสุนทรพจน์ไม่เก่ง กลับถูกกำหนดให้พูดในงานแต่งเพื่อน จึงลำบากใจ',
    [['しにくくて only says it is difficult to do; it misses the unwelcome arrangement despite 苦手なのに.','しにくくて แค่บอกว่าทำยาก ไม่ได้สื่อการถูกกำหนดให้ทำทั้งที่ไม่ถนัด'],['してほしくて means wanting someone else to give a speech.','してほしくて คืออยากให้คนอื่นพูด'],['させてみたくて means wanting to try making/letting someone do it.','させてみたくて คืออยากลองให้คนอื่นทำ'],null]);
  choice(2018,43,2,['b304'],'せっかく、夕日がきれいなことで有名なA海岸に来たのに、急に雨が降り出した。どうも夕日は＿＿。',
    ['見えてもしかたない','見られないことだった','見られそうにない','見えないことがあった'],3,
    'The rain is evidence for a negative outlook now: it looks unlikely that we can see the sunset. 見られる → 見られそうにない.',
    'ฝนเป็นหลักฐานให้คาดตอนนี้ว่าคงดูพระอาทิตย์ตกไม่ได้ 見られる → 見られそうにない',
    'We came all the way to A beach for its famous sunset, but it suddenly began raining. It looks as though we won’t get to see it.',
    'อุตส่าห์มาชายหาด A ที่ขึ้นชื่อเรื่องพระอาทิตย์ตก แต่ฝนเริ่มตกกะทันหัน ดูท่าว่าคงไม่ได้เห็นแล้ว',
    [['見えてもしかたない means seeing it would be pointless, not that seeing it is unlikely.','見えてもしかたない คือเห็นไปก็ไม่มีประโยชน์ ไม่ใช่คงมองไม่เห็น'],['見られないことだった does not make the required current prediction.','見られないことだった ไม่ได้สร้างการคาดการณ์สถานการณ์ปัจจุบัน'],null,['見えないことがあった describes past occasions, not today’s forecast.','見えないことがあった บอกบางครั้งในอดีต ไม่ใช่การคาดวันนี้']]);
  choice(2018,44,2,['b311'],'山川「中村くん、毎日ジョギング＿＿？」\n中村「うん、そうなんだよ。」\n山川「実は、ぼくもなんだよ。走るっていいよね。」',
    ['しない','しててもいい','しちゃえば','してるんだって'],4,
    'んだって? checks information heard from someone else: “I hear you jog every day?” うん、そうなんだ confirms it.',
    'んだって? ใช้ถามยืนยันเรื่องที่ได้ยินมา “ได้ยินว่าวิ่งทุกวันเหรอ” うん、そうなんだ ตอบรับข้อมูลนั้น',
    'Yamakawa asks whether it is true that Nakamura jogs every day. Nakamura confirms it, and Yamakawa says he does too.',
    'ยามาคาวะถามยืนยันว่าได้ยินนากามูระวิ่งทุกวัน นากามูระตอบว่าใช่ แล้วยามาคาวะบอกว่าตนก็เหมือนกัน',
    [['しない? invites someone to jog; the response here confirms an existing habit.','しない? เป็นคำชวน แต่นี่ตอบยืนยันนิสัยที่ทำอยู่แล้ว'],['しててもいい asks or gives permission, which the dialogue is not about.','しててもいい ถามหรือให้อนุญาต แต่บทสนทนานี้ไม่ได้พูดถึงการอนุญาต'],['しちゃえば suggests doing it; the speaker is checking something heard.','しちゃえば เสนอให้ทำ แต่ผู้พูดกำลังถามยืนยันเรื่องที่ได้ยิน'],null]);
  order(2018,45,3,['n2a09','n3f30'],'結婚生活を送る',['うえで','といえば','大切か','何が'],[1,4,3,2],2,'、相手への思いやりの気持ちを持つことだと思う。',
    'Keep 送るうえで together (“in married life”), then 何が大切か (“what matters”), then といえば. ★ is 大切か.',
    'เชื่อม 送るうえで (“ในการใช้ชีวิตคู่”) ตามด้วย 何が大切か (“อะไรสำคัญ”) แล้วจึง といえば ตรง ★ คือ 大切か',
    'If you ask what matters in married life, I think it is consideration for your partner.','ถ้าถามว่าอะไรสำคัญในการใช้ชีวิตคู่ ฉันคิดว่าคือความใส่ใจคู่ของเรา');
  order(2018,46,3,['n2a08'],'就職したときに',['ずっと','買って以来','かばんが','使っていた'],[2,1,4,3],2,'とうとう壊れたので、買い換えることにした。',
    '買って以来 starts the period; ずっと使っていた describes かばん. The bag is then marked が before 壊れた.',
    '買って以来 บอกจุดเริ่ม ส่วน ずっと使っていた ขยาย かばん แล้วใช้ が ชี้กระเป๋าที่ 壊れた',
    'The bag I had used ever since buying it when I started work finally broke, so I decided to replace it.','กระเป๋าที่ใช้มาตลอดตั้งแต่ซื้อตอนเริ่มทำงานพังในที่สุด จึงตัดสินใจซื้อใหม่');
  order(2018,47,3,['n3a27'],'登山には不思議な魅力がある。登っているときはこんなに',
    ['思うのに','二度としたくないと','苦しいことは','山を下りて何日かすると'],[3,2,1,4],2,'なぜかまた登りたくなる。',
    'Build the thought first: 苦しいことは二度としたくないと思う. のに contrasts that thought with wanting to climb again a few days later.',
    'ประกอบความคิดก่อน: 苦しいことは二度としたくないと思う แล้ว のに เชื่อมสิ่งที่ขัดกัน คือผ่านไปไม่กี่วันกลับอยากปีนอีก',
    'Climbing has a strange appeal: during the climb I think I never want to suffer like this again, yet a few days after descending I somehow want to climb again.',
    'การปีนเขามีเสน่ห์แปลก ๆ ตอนปีนคิดว่าจะไม่ทำอะไรทรมานแบบนี้อีก แต่ลงเขาได้ไม่กี่วันกลับอยากปีนอีก');
  order(2018,48,4,['n3a30','n3b02'],'彫刻家 川村たけるが作る動物の彫刻作品は、形はシンプル',
    ['動き出し','そうな','ながら','今にも'],[3,4,1,2],3,'生命力にあふれている。',
    'シンプルながら = although simple. 今にも動き出しそうな modifies 生命力: such vitality that the animals look ready to move.',
    'シンプルながら = แม้เรียบง่าย ส่วน 今にも動き出しそうな ขยาย 生命力 ว่ามีชีวิตชีวาจนดูเหมือนจะขยับได้เดี๋ยวนี้',
    'Kawamura Takeru’s animal sculptures have simple shapes but are full of life, as though about to move.',
    'ประติมากรรมสัตว์ของคาวามูระ ทาเครุมีรูปทรงเรียบง่าย แต่เปี่ยมชีวิตชีวาราวกับจะขยับได้');
  order(2018,49,4,['n2i04'],'ビジネスで成功できる人とできない人との違いは、どんなに大変な状況でもあきらめずに',
    ['かどうか','取り組める','にある','最後まで'],[4,2,1,3],3,'と思う。',
    '最後まで modifies 取り組める; かどうか turns it into “whether one can”. 違いは…にある locates the difference in that ability.',
    '最後まで ขยาย 取り組める แล้ว かどうか ทำให้เป็น “ทำได้หรือไม่” ส่วน 違いは…にある บอกว่าความต่างอยู่ตรงนั้น',
    'I think success in business depends on whether you can keep working to the end without giving up, however difficult things get.',
    'ฉันคิดว่าความต่างของคนที่สำเร็จในธุรกิจอยู่ที่มุ่งทำจนจบได้หรือไม่ โดยไม่ยอมแพ้แม้สถานการณ์ยากเพียงใด');
  var text18='以下は、雑誌のコラムである。\n\n日本発のトイレマーク\n\n公衆トイレの入り口に描かれている男女の絵のマーク。そのマークがあれば、文字で「トイレ」と書かれていなくても、そこがトイレであることがわかる。世界のあちこちで使われているこのトイレマークが実は日本で生まれたものだということを【1】。\nトイレマークが生まれたのは、1964年の東京オリンピックがきっかけだ。この東京オリンピックは、アルファベットを使わない国での初めての開催であったため、特に問題になったのが、言葉の壁だった。当時、日本国内の案内板は「お手洗い」などと日本語で書かれているものがほとんどだった。【2】、それでは世界90数か国から来日する選手たちに理解してもらえない。かといって、参加国すべての国の言葉で書くわけにもいかない。そこで、案内板作成者たちは、あらゆる国の選手が理解できるよう、絵で表すことを考えた。【3】、トイレマークなのだ。\nそのほかにも、食堂、シャワー、公衆電話等の施設や設備を表すマークや、水泳、バレーボール等の競技を表すマークも作られた。競技を表すマークは、この東京オリンピックで初めて全面的に導入され、高い評価を受けた。そして、その後のオリンピックでもデザインを変えながら毎回【4】。\nトイレマークに代表されるように、東京オリンピックをきっかけに日本で生まれたマークが、言葉の壁を越え、今や新たなコミュニケーション手段として、世界に広がっている。それは、あらゆる人にわかりやすくという思いが世界に届いた【5】。';
  passage(2018,text18,[
    {gids:['n2i09','n3e01'],words:['ご存じなわけだ','ご存じだろうか','ご存じのようだ','ご存じだからだろう'],answer:2,
      en:'The opening addresses the reader with a question: “Did you know…?” ご存じ is respectful “know”; だろうか makes the inquiry.',th:'เกริ่นด้วยการถามผู้อ่านว่า “ทราบหรือไม่” ご存じ คือรู้แบบยกย่อง และ だろうか ทำให้เป็นคำถาม',
      te:'Did you know that this restroom symbol, used around the world, was actually born in Japan?',tt:'ทราบหรือไม่ว่าป้ายห้องน้ำที่ใช้ทั่วโลกนี้เกิดขึ้นในญี่ปุ่น',
      reasons:[['わけだ draws a conclusion that the reader knows; the article is introducing information.','わけだ สรุปว่าผู้อ่านรู้อยู่แล้ว แต่บทความกำลังเกริ่นข้อมูล'],null,['ようだ guesses that the reader knows; the opening has no evidence for that guess.','ようだ คาดว่าผู้อ่านรู้ แต่ไม่มีหลักฐานให้คาดเช่นนั้น'],['だからだろう offers a probable cause; no result has been introduced that needs explaining.','だからだろう บอกสาเหตุที่คาดไว้ แต่ยังไม่มีผลใดให้หาเหตุผล']]},
    {gids:['b412'],words:['それに','しかし','または','それどころか'],answer:2,
      en:'The contrast is between the existing Japanese signs and foreign visitors being unable to understand them. しかし introduces that problem.',th:'ความขัดกันคือมีป้ายภาษาญี่ปุ่นอยู่แล้ว แต่ชาวต่างชาติอ่านไม่เข้าใจ จึงใช้ しかし',
      te:'However, those signs could not be understood by athletes coming from over 90 countries.',tt:'แต่ป้ายเหล่านั้นทำให้นักกีฬาจากกว่า 90 ประเทศเข้าใจไม่ได้',
      reasons:[['それに adds another supporting point, not the problem with the signs.','それに เพิ่มประเด็นสนับสนุน ไม่ใช่ปัญหาที่ขัดกับป้ายเดิม'],null,['または presents alternatives, not a contrast between situation and problem.','または เสนอทางเลือก ไม่ใช่ความขัดกันของสถานการณ์กับปัญหา'],['それどころか intensifies or overturns a previous claim; a straightforward contrast is needed here.','それどころか ยกระดับหรือกลับคำกล่าวก่อนหน้า แต่ตรงนี้ต้องการความขัดแย้งธรรมดา']]},
    {gids:['n2i07','n3c07'],words:['作成者が理解したのは','日本で考えられたのが','ここに生み出したのは','こうして生まれたのが'],answer:4,
      en:'こうして points back to the method just described. 生まれたのが introduces what resulted from that method, followed by its name.',th:'こうして อ้างกลับไปยังวิธีที่เล่ามา 生まれたのが ชี้สิ่งที่เกิดจากวิธีนั้น แล้วตามด้วยชื่อสิ่งนั้น',
      te:'What came into being in this way was the restroom symbol.',tt:'สิ่งที่เกิดขึ้นด้วยวิธีนี้ก็คือสัญลักษณ์ห้องน้ำ',
      reasons:[['The preceding sentence explains what the designers devised, not what they understood.','ประโยคก่อนบอกสิ่งที่ผู้สร้างคิดขึ้น ไม่ใช่สิ่งที่พวกเขาเข้าใจ'],['This focuses on Japan but loses the explicit connection to the process just described.','ตัวเลือกนี้เน้นญี่ปุ่น แต่ไม่เชื่อมกลับไปยังกระบวนการที่เพิ่งเล่าอย่างชัดเจน'],['生み出した is transitive; this wording does not supply the intended “what was born this way”.','生み出した เป็นสกรรมกริยา ถ้อยคำนี้ไม่สื่อว่า “สิ่งที่เกิดขึ้นด้วยวิธีนี้”'],null]},
    {gids:['n3b20','n2i02'],words:['使用されている','使用した点だ','使用していける','使用したいものだ'],answer:1,
      en:'The symbols are the topic, so use passive 使用される. ている describes the continuing practice at subsequent Olympics.',th:'หัวข้อคือสัญลักษณ์ จึงใช้ถูกกระทำ 使用される และ ている บอกการใช้อย่างต่อเนื่องในโอลิมปิกครั้งหลัง ๆ',
      te:'They have continued to be used at every subsequent Olympics, with changes to the designs.',tt:'มีการใช้ต่อมาในโอลิมปิกทุกครั้ง โดยปรับแบบไปด้วย',
      reasons:[null,['点だ means “the point is…” and needs a structure naming such a point.','点だ คือ “ประเด็นคือ…” ต้องมีโครงสร้างที่กำลังระบุประเด็น'],['使用していける says an agent can continue using something; the symbols are being used.','使用していける คือผู้กระทำสามารถใช้ต่อไปได้ แต่ตรงนี้สัญลักษณ์ถูกนำไปใช้'],['使用したいものだ expresses a wish, but the article reports actual use.','使用したいものだ แสดงความหวัง แต่บทความรายงานการใช้จริง']]},
    {gids:['n2d23'],words:['結果として表れるかもしれない','結果のはずだった','結果に違いない','結果でなければならなかった'],answer:3,
      en:'The spread has already happened. The writer confidently interprets it as the result of the wish to communicate clearly: に違いない.',th:'การแพร่หลายเกิดขึ้นแล้ว ผู้เขียนลงความเห็นอย่างมั่นใจว่าเป็นผลของความตั้งใจให้เข้าใจง่าย จึงใช้ に違いない',
      te:'It must be the result of the wish for clarity reaching people around the world.',tt:'ต้องเป็นผลจากความปรารถนาที่จะให้ทุกคนเข้าใจง่ายได้ส่งไปถึงผู้คนทั่วโลกแน่ ๆ',
      reasons:[['かもしれない predicts a possible manifestation, but the spread is already established.','かもしれない คาดว่าอาจปรากฏเป็นผล แต่การแพร่หลายเกิดขึ้นแล้ว'],['はずだった gives a past expectation, often contrasted with what actually happened.','はずだった คือความคาดหมายในอดีต มักขัดกับผลจริง'],null,['なければならなかった imposes a past necessity, not a confident interpretation.','なければならなかった บอกความจำเป็นในอดีต ไม่ใช่ความเห็นที่มั่นใจ']]}
  ]);
  // Workbook 2012. Option indices below follow the original, unshuffled key.
  choice(2012,33,1,['n2i06'],'A「もう無理だよ。私には５キロなんて走れないよ。」\nB「まだ500メートルだよ。なんでそうやってすぐ、もうだめ＿＿言うの。」',
    ['を','は','とか','とは'],3,
    'とか loosely quotes a remark, often with disapproval: saying things like “I can’t go on”. It fits B’s criticism of giving up so quickly.',
    'とか ยกคำพูดแบบไม่เจาะจง มักมีท่าทีไม่เห็นด้วย เช่นพูดอะไรทำนองว่า “ไม่ไหวแล้ว” เข้ากับการตำหนิที่ยอมแพ้เร็ว',
    'A says they cannot run five kilometres. B replies that it has only been 500 metres and asks why A immediately says things like “I can’t do it.”',
    'A บอกว่าวิ่งห้ากิโลไม่ไหว B ตอบว่าเพิ่ง 500 เมตร ทำไมรีบบอกทำนองว่าไม่ไหวแล้ว',
    [['を cannot directly quote the complete remark もうだめ before 言う.','を ใช้ยกคำพูดทั้งประโยค もうだめ หน้า 言う ไม่ได้'],['は alone does not supply the quotation marker.','は อย่างเดียวไม่ได้ทำหน้าที่เครื่องหมายคำพูด'],null,['とは gives contrastive/emphatic quotation, while this scolding construction calls for the loose quote とか言う.','とは เน้นหรือเปรียบต่างคำพูด แต่คำบ่นในที่นี้ใช้ とか言う ยกคำพูดทำนองนั้น']]);
  choice(2012,34,1,['n2a12'],'あれこれ悩んだ＿＿、ABC大学を志望校に決めた。',
    ['さきに','すえに','ところに','とおりに'],2,
    '悩んだ末に presents the decision reached after much deliberation. 末に can introduce a neutral or positive outcome.',
    '悩んだ末に บอกข้อสรุปหลังคิดหนักอยู่นาน 末に ใช้กับผลกลาง ๆ หรือดีก็ได้',
    'After considering various possibilities at length, I chose ABC University as my target school.',
    'หลังคิดไตร่ตรองหลายเรื่องอยู่นาน ก็ตัดสินใจเลือกมหาวิทยาลัย ABC เป็นเป้าหมาย',
    [['さきに is not the “after a long process” connector needed here.','さきに ไม่ใช่ตัวเชื่อมผลหลังผ่านกระบวนการยาวนานที่ต้องการ'],null,['ところに introduces an event entering a situation, not a decision reached through deliberation.','ところに บอกเหตุการณ์เข้ามาในจังหวะหนึ่ง ไม่ใช่ข้อสรุปจากการคิด'],['とおりに means following a model or instructions, not reaching a conclusion after worrying.','とおりに คือทำตามแบบหรือคำแนะนำ ไม่ใช่คิดหนักแล้วได้ข้อสรุป']]);
  choice(2012,35,1,['n3b22','n2a11'],'プリンターの調子が悪くなり、製造会社に電話で問い合わせたら、向こうの担当者に、あれこれ質問に答え＿＿あげく、対応できないと言われた。',
    ['させた','させられる','させる','させられた'],4,
    'The caller was made to answer: 答えさせられた (causative-passive, past). あげく follows that completed ordeal and introduces the disappointing result.',
    'ผู้โทรถูกให้ตอบคำถาม จึงเป็น 答えさせられた รูปถูกบังคับอดีต แล้ว あげく เชื่อมไปยังผลที่น่าผิดหวัง',
    'When I called the printer manufacturer about a fault, I was made to answer all sorts of questions, only to be told they could not help.',
    'โทรถามผู้ผลิตเรื่องเครื่องพิมพ์เสีย ถูกให้ตอบคำถามสารพัด สุดท้ายกลับบอกว่าช่วยไม่ได้',
    [['させた makes the caller the person who caused someone else to answer.','させた ทำให้ผู้โทรเป็นฝ่ายให้คนอื่นตอบ'],['The voice is right, but あげく needs the completed past form させられた here.','รูปถูกบังคับถูกแล้ว แต่หน้า あげく ในที่นี้ต้องเป็นอดีต させられた'],['させる is active causative and nonpast; neither fits the caller’s completed ordeal.','させる เป็นรูปให้คนอื่นทำและไม่ใช่อดีต ไม่ตรงกับสิ่งที่ผู้โทรประสบมา'],null]);
  choice(2012,36,1,['n3c05','n2c20'],'面倒だが、やはりこの仕事は断れない。引き受ける＿＿。',
    ['までもあるまい','こともない','はずもない','しかあるまい'],4,
    'しかあるまい is a formal “there is probably no choice but…”, equivalent here to しかないだろう. 断れない supplies the reason.',
    'しかあるまい คือคงไม่มีทางเลือกนอกจาก แบบทางการ คล้าย しかないだろう โดย 断れない เป็นเหตุผล',
    'It is a nuisance, but I cannot refuse this work after all. I suppose I have no choice but to accept it.',
    'แม้จะยุ่งยาก แต่คงปฏิเสธงานนี้ไม่ได้ คงไม่มีทางเลือกนอกจากรับไว้',
    [['までもあるまい says there is no need to go so far; that contradicts the inability to refuse.','までもあるまい บอกว่าไม่จำเป็นต้องถึงขั้นนั้น ขัดกับการปฏิเสธไม่ได้'],['こともない can deny the need to accept, not express being left with no choice.','こともない อาจบอกว่าไม่จำเป็นต้องรับ ไม่ใช่ไม่มีทางเลือก'],['はずもない says accepting is not expected, the opposite of the conclusion here.','はずもない บอกว่าไม่น่าจะรับ ซึ่งตรงข้ามกับข้อสรุป'],null]);
  choice(2012,37,1,['n3e02'],'山田監督の、「私、山田は、50年ぶりにふるさとに戻って＿＿。」というあいさつに、会場からは大きな拍手が起こった。',
    ['まいりました','いらっしゃいました','うかがいました','おいでになりました'],1,
    'The director describes his own return. 戻ってまいりました uses humble/polite まいる for coming; do not honor yourself with いらっしゃる.',
    'ผู้กำกับพูดถึงการกลับมาของตนเอง 戻ってまいりました ใช้ まいる ถ่อมตน/สุภาพ ไม่ใช้ いらっしゃる ยกย่องตนเอง',
    'The audience applauded loudly when Director Yamada greeted them, saying he had returned to his hometown after fifty years.',
    'ผู้ชมปรบมือดังเมื่อผู้กำกับยามาดะกล่าวทักทายว่าได้กลับบ้านเกิดหลังจาก 50 ปี',
    [null,['いらっしゃる honors the subject; here the speaker is the subject.','いらっしゃる ยกย่องประธาน แต่ประธานตรงนี้คือผู้พูดเอง'],['伺う means humbly visit/ask; 戻って伺う does not form the intended humble 戻ってくる.','伺う คือมาเยือน/ถามแบบถ่อมตน 戻って伺う ไม่ใช่รูปถ่อมตนของ 戻ってくる ที่ต้องการ'],['おいでになる honors another person, not the speaker’s own return.','おいでになる ยกย่องผู้อื่น ไม่ใช่การกลับมาของตนเอง']]);
  choice(2012,38,1,['a304'],'彼女の絵は、国内より＿＿海外での評価が高い。',
    ['まさか','たとえ','むしろ','かりに'],3,
    'よりむしろ shifts the comparison toward the more fitting side: her work is more highly regarded overseas than at home.',
    'よりむしろ เน้นฝั่งที่ตรงกว่าในการเปรียบเทียบ คือผลงานได้รับการยอมรับในต่างประเทศมากกว่าในประเทศ',
    'Her paintings are more highly regarded abroad than in her own country.',
    'ภาพวาดของเธอได้รับการยอมรับในต่างประเทศมากกว่าในประเทศตนเอง',
    [['まさか expresses disbelief or an unexpected possibility, not this comparison.','まさか แสดงความไม่เชื่อหรือความเป็นไปได้ที่คาดไม่ถึง ไม่ใช่การเปรียบเทียบนี้'],['たとえ introduces a hypothetical concession, normally with ても.','たとえ บอกเงื่อนไขสมมติแบบยอมรับ มักใช้กับ ても'],null,['かりに means hypothetically; the sentence states an actual comparison.','かりに คือสมมติว่า แต่ประโยคนี้เปรียบเทียบข้อเท็จจริง']]);
  choice(2012,39,1,['n2i02','n2i09'],'今年も卒業生を送り出した。次に会うときは、彼らも立派な大人に＿＿。',
    ['なるだろう','なっただろう','なっているだろう','なっていただろう'],3,
    'Take the viewpoint of the NEXT meeting: they will already be adults then. なっている describes the resulting state, and だろう predicts it.',
    'มองจากเวลาที่พบกันครั้งหน้า ตอนนั้นพวกเขาคงโตเป็นผู้ใหญ่แล้ว なっている บอกสภาพผลลัพธ์ และ だろう คาดการณ์',
    'We sent off another graduating class this year. By the next time we meet, they will probably have become fine adults.',
    'ปีนี้ส่งนักเรียนจบไปอีกกลุ่มแล้ว เมื่อพบกันครั้งหน้า พวกเขาคงเติบโตเป็นผู้ใหญ่ที่ดีแล้ว',
    [['なるだろう predicts the change itself; 次に会うとき asks for the state already reached by then.','なるだろう คาดการเปลี่ยนแปลงเอง แต่ 次に会うとき ต้องการสภาพที่ถึงแล้วตอนนั้น'],['なっただろう speculates about a past change, not the state at the next meeting.','なっただろう คาดเหตุการณ์อดีต ไม่ใช่สภาพเมื่อพบครั้งหน้า'],null,['なっていただろう looks back on a past resulting state; the viewpoint here is future.','なっていただろう มองย้อนสภาพในอดีต แต่จุดมองตรงนี้เป็นอนาคต']]);
  choice(2012,40,2,['n3a24'],'毎日＿＿どちらでもいいことばかりを日記に書いているのだが、それがストレス解消になっている。',
    ['書くとも書かないとも','書いたか書かなかったか','書いても書かなくても','書くとか書かないとか'],3,
    'AてもAなくても covers both possibilities: whether I write these things or not, either is fine. The clues are どちらでもいい.',
    'AてもAなくても ครอบคลุมทั้งสองกรณี จะเขียนหรือไม่เขียนก็ได้ คำใบ้คือ どちらでもいい',
    'Every day I write trivial things in my diary that could just as well go unwritten, but it relieves my stress.',
    'ทุกวันเขียนเรื่องเล็กน้อยในไดอารีที่ไม่เขียนก็ได้ แต่ช่วยคลายเครียดได้',
    [['とも…とも normally needs an expression such as 言えない; it does not connect to どちらでもいい this way.','とも…とも มักต้องตามด้วยเช่น 言えない ไม่เชื่อมกับ どちらでもいい แบบนี้'],['This asks whether something was written in the past, not whether doing it matters.','ถามว่าในอดีตเขียนหรือไม่ ไม่ใช่จะทำหรือไม่ทำก็ได้'],null,['とか lists statements or possibilities loosely; it does not make the paired concessive condition here.','とか ยกคำพูดหรือความเป็นไปได้แบบไม่เจาะจง ไม่ใช่เงื่อนไขสองฝั่งแบบนี้']]);
  choice(2012,41,2,['n2i05','n3e04'],'顔を洗うときには、せっけんを＿＿、さっと洗うのが肌にはよい。',
    ['使いすぎずに','使うにすぎず','使うにすぎなく','使いすぎもなくて'],1,
    '使いすぎる = use too much. Its negative ずに form is 使いすぎずに: wash without overusing soap. Do not confuse this with にすぎない (merely).',
    '使いすぎる = ใช้มากเกินไป รูปปฏิเสธ ずに คือ 使いすぎずに ล้างโดยไม่ใช้สบู่มากเกิน อย่าสับสนกับ にすぎない ที่แปลว่าเพียงแค่',
    'When washing your face, it is good for your skin to wash quickly without using too much soap.',
    'เวลาล้างหน้า การล้างเร็ว ๆ โดยไม่ใช้สบู่มากเกินไปดีต่อผิว',
    [null,['使うにすぎず means “merely use”, not “without using too much”.','使うにすぎず คือเพียงแค่ใช้ ไม่ใช่โดยไม่ใช้มากเกิน'],['にすぎない means merely; additionally its normal connective here would be にすぎず or にすぎなくて.','にすぎない แปลว่าเพียงแค่ อีกทั้งรูปเชื่อมปกติคือ にすぎず หรือ にすぎなくて'],['使いすぎもなくて does not form the intended verbal “without overusing”; use 使いすぎずに.','使いすぎもなくて ไม่ใช่รูปกริยาบอกโดยไม่ใช้มากเกินที่ต้องการ ต้องใช้ 使いすぎずに']]);
  choice(2012,42,2,['n2f02','n3c07'],'留学するまで、私は自分が見ている世界がすべてだと思っていた。実はそれが世界のほんの小さな一部分＿＿気付いていなかった。',
    ['でないことにしか','でしかないことに','にないことでしか','にしかないことで'],2,
    'Build two chunks: Nでしかない (is only N) + ことに気付く (notice the fact that). The speaker had not noticed that their world was only one tiny part.',
    'แบ่งสองส่วน: Nでしかない (เป็นเพียง N) + ことに気付く (สังเกตข้อเท็จจริงว่า) ผู้พูดยังไม่รู้ว่าโลกที่ตนเห็นเป็นแค่ส่วนเล็ก ๆ',
    'Until studying abroad, I thought the world I saw was everything; I had not realized it was only a tiny part of the world.',
    'ก่อนเรียนต่างประเทศคิดว่าโลกที่ตนเห็นคือทั้งหมด ยังไม่รู้ว่าจริง ๆ เป็นเพียงส่วนเล็ก ๆ ของโลก',
    [['This shifts しか to the noticing phrase and says “not a part”, changing the meaning.','ย้าย しか ไปจำกัดส่วนการสังเกต และบอกว่าไม่ใช่ส่วนหนึ่ง ทำให้ความหมายเปลี่ยน'],null,['にない describes absence in a location, not being merely a small part.','にない บอกว่าไม่มีอยู่ในสถานที่ ไม่ใช่เป็นเพียงส่วนเล็ก ๆ'],['にしかない describes existing only in a location; the sentence needs Nでしかない.','にしかない คือมีอยู่เฉพาะในสถานที่ แต่ตรงนี้ต้องเป็น Nでしかない']]);
  choice(2012,43,2,['n2d17'],'（会社で）\nA「あれ？ あそこにいるの、山田さんかな。」\nB「山田さんは出張中だよ。今ここに＿＿。」',
    ['いないわけじゃないよ','いるわけないじゃない','いたわけじゃないよ','いなかったわけじゃない'],2,
    '出張中 is evidence that Yamada cannot be here now. いるわけない is conversational いるわけがない; final じゃない seeks agreement.',
    '出張中 เป็นเหตุผลว่ายามาดะอยู่ที่นี่ตอนนี้ไม่ได้ いるわけない คือภาษาพูดของ いるわけがない ส่วน じゃない ท้ายประโยคชวนให้เห็นด้วย',
    'A wonders if that person is Yamada. B says Yamada is away on business, so there is no way they are here now.',
    'A สงสัยว่าคนตรงนั้นคือยามาดะหรือไม่ B บอกว่าไปทำงานต่างสถานที่อยู่ จึงไม่มีทางอยู่ที่นี่ตอนนี้',
    [['いないわけじゃない denies absence: it is not that Yamada is not here.','いないわけじゃない ปฏิเสธว่าไม่อยู่ คือไม่ใช่ว่าไม่ได้อยู่ที่นี่'],null,['いたわけじゃない denies a past situation; 今 asks about now.','いたわけじゃない ปฏิเสธเหตุการณ์อดีต แต่ 今 คือปัจจุบัน'],['いなかったわけじゃない is a double negative about past absence.','いなかったわけじゃない เป็นปฏิเสธซ้อนเรื่องการไม่อยู่ในอดีต']]);
  choice(2012,44,2,['n3b26'],'A「このタレント、最近よくテレビで見るね。」\nB「ほんと。この人を見ない日はない＿＿よね。」',
    ['と言ってもいいぐらいだ','と言ったらいいだけだ','と言ってもいいからだ','と言ったらいいことだ'],1,
    'と言ってもいいぐらいだ measures the extent: “so often you could even say…” It describes how frequently the celebrity appears.',
    'と言ってもいいぐらいだ บอกระดับว่าบ่อยจนพูดได้เลยว่า… ใช้อธิบายความถี่ที่คนดังปรากฏ',
    'A says this celebrity is on TV a lot lately. B agrees: you could almost say there is not a day without seeing them.',
    'A บอกว่าช่วงนี้เห็นคนดังคนนี้ในทีวีบ่อย B เห็นด้วยว่าแทบจะพูดได้ว่าไม่มีวันไหนไม่เห็นเลย',
    [null,['と言ったらいいだけだ means all one needs to do is say it, not an extent of frequency.','と言ったらいいだけだ คือแค่พูดอย่างนั้นก็พอ ไม่ได้บอกระดับความถี่'],['からだ supplies a reason; there is no preceding claim needing that reason.','からだ บอกเหตุผล แต่ไม่มีข้อกล่าวก่อนหน้าที่ต้องอธิบายด้วยเหตุผลนี้'],['と言ったらいいことだ is not the extent expression required here.','と言ったらいいことだ ไม่ใช่สำนวนบอกระดับที่ต้องการ']]);
  order(2012,45,3,['n2f16','n3c08'],'不調だった山中選手がついにゴールを決めた。彼に',
    ['したら','という','プレッシャーは','「もし、またミスをしたら」'],[1,4,2,3],2,'相当あったはずだ。',
    '彼にしたら gives his perspective. The quoted worry attaches to プレッシャー with という. ★ is という.',
    '彼にしたら บอกมุมมองของเขา คำพูดที่กังวลเชื่อมกับ プレッシャー ด้วย という จึงวาง という ที่ ★',
    'Yamanaka, who had been out of form, finally scored. From his perspective, the pressure of “What if I miss again?” must have been considerable.',
    'ยามานากะที่ฟอร์มไม่ดีทำประตูได้ในที่สุด สำหรับเขาคงมีแรงกดดันมากว่า “ถ้าพลาดอีกล่ะ”');
  order(2012,46,3,['n2i06','n3c07'],'「これは地元ではよく知られた料理で、このすっぱさがおいしい。ただ',
    ['なんていう','残念なのは','若者が最近','すっぱいのが苦手だ'],[2,4,1,3],2,'増えていることだね。」と田中さんは語る。',
    'Start with 残念なのは and finish with ことだ. Inside, すっぱいのが苦手だなんていう modifies 若者. ★ is なんていう.',
    'เริ่มด้วย 残念なのは แล้วจบด้วย ことだ ภายในมี すっぱいのが苦手だなんていう ขยาย 若者 ตรง ★ คือ なんていう',
    'Tanaka says this local dish’s sourness is delicious, but it is a pity that more young people now say they dislike sour things.',
    'ทานากะบอกว่าอาหารท้องถิ่นนี้อร่อยตรงรสเปรี้ยว แต่น่าเสียดายที่คนหนุ่มสาวบอกว่าไม่ชอบของเปรี้ยวมากขึ้น');
  order(2012,47,4,['n3a23'],'忘れられないプレゼントは、小学生のときに両親が買ってくれた自転車です。苦しい生活の中、',
    ['それだけで','どんな思いで','買ってくれたのかと','思うと'],[2,3,4,1],2,'涙が出ます。',
    'The embedded question is どんな思いで買ってくれたのか. と quotes that thought for 思う; 思うと introduces the resulting tears.',
    'คำถามซ้อนคือ どんな思いで買ってくれたのか ใช้ と อ้างความคิดกับ 思う แล้ว 思うと เชื่อมผลคือน้ำตาไหล',
    'I cannot forget the bicycle my parents bought me at primary-school age. Just thinking about their feelings in buying it despite hardship brings tears.',
    'ลืมจักรยานที่พ่อแม่ซื้อให้ตอนประถมไม่ได้ แค่คิดถึงความรู้สึกที่ซื้อให้ทั้งที่ลำบาก น้ำตาก็ไหล');
  order(2012,48,4,['n3b21'],'最近、子どもがピアノを習いたいと言いだした。わたしは、子どもが',
    ['したい','やりたい','やらせて','と思うことは'],[1,4,3,2],2,'と思っている。',
    '子どもがしたいと思うこと is what the child wants to do. The parent’s wish is やらせてやりたい: wanting to let the child do it. Keep the two people’s wishes separate.',
    '子どもがしたいと思うこと คือสิ่งที่ลูกอยากทำ ส่วนความปรารถนาของพ่อแม่คือ やらせてやりたい อยากให้ลูกได้ทำ แยกความต้องการของสองคนให้ออก',
    'Recently my child said they wanted piano lessons. I want to let my child do what they want to do.',
    'ช่วงนี้ลูกบอกว่าอยากเรียนเปียโน ฉันอยากให้ลูกได้ทำสิ่งที่อยากทำ');
  order(2012,49,4,['n3c17','n2d18'],'国民の、政治',
    ['初めて','に対する','があって','信頼'],[2,4,3,1],2,'政治家は指導力を発揮できるのだ。',
    '政治に対する modifies 信頼. 信頼があって初めて means only when that trust exists can politicians exercise leadership.',
    '政治に対する ขยาย 信頼 แล้ว 信頼があって初めて คือเมื่อมีความไว้วางใจนั้นก่อน นักการเมืองจึงจะแสดงภาวะผู้นำได้',
    'Only with the public’s trust in politics can politicians exercise leadership.',
    'นักการเมืองจะแสดงภาวะผู้นำได้ก็ต่อเมื่อประชาชนมีความไว้วางใจต่อการเมือง');
  var text12='以下は、雑誌のコラムである。\n\n日本の鉄道ファン\n\n鉄道ファンとは、鉄道が好きで鉄道に関することを趣味にしている人たちのことだ。鉄道ファンは単に「鉄」と言われたりもする。日本では、これまでは「鉄」といえば男性だと思われていたが、近年は女性のファンが急増しているらしい。\nところで、彼ら鉄道ファンたちは【1】趣味を楽しんでいるのだろうか。\n一言で鉄道ファンといってもその趣味の内容は多種多様だ。そして、電車に乗るのが好きな「鉄」は「乗り鉄」というように、それぞれの内容に対応した呼び名がある。「乗り鉄」【2】、写真を撮るのが好きな「撮り鉄」、車両や鉄道がある風景を描く「描き鉄」、鉄道の模型が好きな「模型鉄」などだ。\nある40代の「乗り鉄」の女性は鉄道の魅力を【3】語る。「窓の外の風景をながめていると旅の気分が味わえるし、車と違って座っているだけで目的地に着けるのがいい。」。「模型鉄」である30代の男性は、模型の魅力について「車両の形を見ているだけでうっとり。本物は買えないけど模型なら買えるし」と説明する。\nまた、最近急増している女性ファンには「ママ鉄」も多い。電車を見たがる子どもを連れて電車を見に行くうち、自分も鉄道ファンになってしまったという人たちだ。【4】の特徴は、他の「鉄」とは異なり、ホームではなく、電車が見えるところにある公園やレストランなど、子どもと一緒にゆっくり過ごせる場所で電車を見るという点である。\n鉄道ファンにはいろいろなタイプがあり、楽しみ方も【5】。';
  passage(2012,text12,[
    {gids:['n2i07'],words:['それほど','どのように','それでも','どちらの'],answer:2,
      en:'The question asks HOW fans enjoy their hobby. The following paragraphs answer it by describing several ways.',th:'คำถามถามว่าแฟนรถไฟสนุกกับงานอดิเรกอย่างไร ย่อหน้าถัดไปจึงอธิบายหลายวิธี',
      te:'So, how do these railway fans enjoy their hobby?',tt:'แล้วแฟนรถไฟเหล่านี้สนุกกับงานอดิเรกอย่างไร',
      reasons:[['それほど means to that extent, but no extent has been specified.','それほど คือถึงขนาดนั้น แต่ยังไม่ได้ระบุระดับใด'],null,['それでも means nevertheless; the sentence asks about methods, not persistence despite an obstacle.','それでも คือถึงอย่างนั้น แต่ประโยคถามวิธี ไม่ใช่ทำต่อแม้มีอุปสรรค'],['どちらの asks which of two and modifies a noun; the article has not introduced two hobbies to choose from.','どちらの ถามว่าอันไหนในสองอันและขยายนาม แต่ยังไม่มีงานอดิเรกสองแบบให้เลือก']]},
    {gids:['n2i08'],words:['にかわって','によって','のうえ','のほか'],answer:4,
      en:'乗り鉄 was already introduced. のほか adds the other kinds alongside it, followed by a list and など.',th:'กล่าวถึง 乗り鉄 ไปแล้ว のほか ใช้เพิ่มชนิดอื่นนอกเหนือจากนั้น ตามด้วยรายการและ など',
      te:'Besides people who enjoy riding trains, there are photographers, railway artists and model enthusiasts.',tt:'นอกจากคนชอบนั่งรถไฟ ยังมีคนชอบถ่ายรูป วาดภาพรถไฟ และสะสมแบบจำลอง',
      reasons:[['にかわって replaces one thing with another, but all these types coexist.','にかわって คือแทนที่ แต่ทุกกลุ่มนี้มีอยู่ร่วมกัน'],['によって gives a means, cause or variation, not addition to a list.','によって บอกวิธี สาเหตุ หรือความแตกต่าง ไม่ใช่เพิ่มในรายการ'],['のうえ does not express the straightforward “besides this type” needed here.','のうえ ไม่ได้บอก “นอกจากกลุ่มนี้” ตามที่ต้องการ'],null]},
    {gids:['n2i07'],words:['こう','そう','同様に','以上のように'],answer:1,
      en:'こう can point forward to the speaker’s exact words, which immediately follow. Do not choose そう just because both can translate as “like that”.',th:'こう ชี้ไปข้างหน้าถึงคำพูดที่จะตามมาทันทีได้ อย่าเลือก そう เพียงเพราะแปลคล้ายกัน',
      te:'A woman in her forties who enjoys riding trains describes their appeal as follows.',tt:'หญิงวัยสี่สิบที่ชอบนั่งรถไฟกล่าวถึงเสน่ห์ของรถไฟดังต่อไปนี้',
      reasons:[null,['そう normally refers to content already available in context; this quotation is being introduced now.','そう มักชี้เนื้อหาที่กล่าวไว้หรือรับรู้แล้ว แต่กำลังเริ่มยกคำพูดใหม่'],['同様に means similarly, but no prior person’s account is given as a comparison.','同様に คือในทำนองเดียวกัน แต่ยังไม่มีคำอธิบายของใครก่อนหน้าให้เทียบ'],['以上のように refers backward to an explanation above, not forward to the new quotation.','以上のように ชี้ย้อนคำอธิบายข้างต้น ไม่ใช่ไปยังคำพูดใหม่']]},
    {gids:['n2i07'],words:['鉄道ファン','女性ファン','彼女たち','大人たち'],answer:3,
      en:'彼女たち refers to the ママ鉄 just described. The detail about spending time with children belongs to this specific group, not all female fans.',th:'彼女たち อ้างถึง ママ鉄 ที่เพิ่งอธิบาย เรื่องใช้เวลากับลูกเป็นลักษณะของกลุ่มนี้ ไม่ใช่แฟนรถไฟหญิงทุกคน',
      te:'These mothers characteristically watch trains from parks or restaurants where they can relax with their children.',tt:'แม่กลุ่มนี้มักดูรถไฟจากสวนหรือร้านอาหารที่พักผ่อนกับลูกได้',
      reasons:[['鉄道ファン includes every kind, but this paragraph contrasts one subgroup with the others.','鉄道ファン รวมทุกกลุ่ม แต่ย่อหน้านี้แยกกลุ่มย่อยหนึ่งจากกลุ่มอื่น'],['女性ファン is too broad: the preceding sentences narrowed the topic to mothers who became fans through their children.','女性ファン กว้างเกินไป ก่อนหน้านี้เจาะจงแม่ที่เป็นแฟนรถไฟผ่านลูกแล้ว'],null,['大人たち includes men and other adults; it loses the specific antecedent ママ鉄.','大人たち รวมผู้ชายและผู้ใหญ่อื่น จึงไม่ตรงกับ ママ鉄 ที่อ้างถึง']]},
    {gids:['n2i07'],words:['さまざまだ','さまざまだと言われた','さまざまである点だ','さまざまだと思われている'],answer:1,
      en:'The closing sentence directly summarizes the varieties just described. There is no source of reported speech or outside opinion to add.',th:'ประโยคปิดสรุปความหลากหลายที่เล่ามาตรง ๆ ไม่มีแหล่งคำพูดหรือความเห็นภายนอกที่ต้องเพิ่ม',
      te:'There are many types of railway fan, and many ways to enjoy the hobby.',tt:'แฟนรถไฟมีหลายประเภท และมีวิธีเพลิดเพลินหลายแบบ',
      reasons:[null,['と言われた adds a past report by an unspecified speaker that the passage never introduced.','と言われた เพิ่มคำรายงานในอดีตจากคนที่บทความไม่ได้กล่าวถึง'],['点だ requires a topic whose point or feature is being identified; 楽しみ方も simply adds a parallel fact.','点だ ต้องมีหัวข้อที่กำลังระบุประเด็น แต่ 楽しみ方も เพียงเพิ่มข้อเท็จจริงที่ขนานกัน'],['と思われている reports a generally held belief; this conclusion follows directly from the examples.','と思われている รายงานความเชื่อทั่วไป แต่ข้อสรุปนี้มาจากตัวอย่างที่เพิ่งให้เอง']]}
  ]);
})();
