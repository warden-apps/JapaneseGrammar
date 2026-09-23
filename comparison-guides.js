/* Original, compact EN/TH comparisons. Cues describe the featured use, not every
   possible meaning. Repeated IDs are intentional when one lesson has several forms. */
var SIMPLE_COMPARISONS = [
  {
    id:'causes',title_en:'Why did it happen?',title_th:'เกิดขึ้นเพราะอะไร?',chapters:[16],
    decision_en:'Choose your angle: neutral cause, personal explanation, gratitude, blame, extreme feeling, or public notice.',
    decision_th:'เลือกมุมที่อยากสื่อ: เหตุทั่วไป เหตุผลส่วนตัว ขอบคุณ โทษ รู้สึกมากจนเกิดผล หรือประกาศ',
    members:[
      {id:'n3c18',label:'〜によって',meaning_en:'Caused by',meaning_th:'เกิดจาก',use_en:'Describe an external cause and its result neutrally.',use_th:'บอกเหตุภายนอกกับผลที่เกิด โดยไม่เน้นขอบคุณหรือโทษ',example:{j:'台風によって、電車が止まった。',k:'たいふうに よって、でんしゃが とまった。',e:'The typhoon caused the trains to stop.',t:'รถไฟหยุดวิ่งเนื่องจากพายุไต้ฝุ่น'}},
      {id:'n3a16',label:'〜ものだから／もので／もの',meaning_en:'Because… (my explanation)',meaning_th:'ก็เพราะว่า…',use_en:'Explain your circumstances; often soften an excuse. Sentence-final もの is casual.',use_th:'อธิบายเหตุส่วนตัว มักใช้แก้ตัวให้นุ่มลง ส่วน もの ท้ายประโยคเป็นภาษากันเอง',example:{j:'電車が遅れたものだから、遅刻しました。',k:'でんしゃが おくれた ものだから、ちこくしました。',e:'I was late because my train was delayed.',t:'มาสายเพราะรถไฟล่าช้าน่ะครับ'}},
      {id:'n3a14',label:'〜おかげで',meaning_en:'Thanks to',meaning_th:'ต้องขอบคุณ…',use_en:'Give credit for a good result.',use_th:'ยกความดีให้สิ่งที่ทำให้เกิดผลดี',example:{j:'先生のおかげで、文法が分かるようになった。',k:'せんせいの おかげで、ぶんぽうが わかる ように なった。',e:'Thanks to my teacher, I began to understand grammar.',t:'เพราะคุณครูช่วย จึงเริ่มเข้าใจไวยากรณ์'}},
      {id:'n3a13',label:'〜せいで',meaning_en:'Because of… (blame)',meaning_th:'เป็นเพราะ… (โทษ)',use_en:'Blame something for a bad result.',use_th:'โทษสิ่งที่ทำให้เกิดผลเสีย',example:{j:'寝不足のせいで、集中できない。',k:'ねぶそくの せいで、しゅうちゅう できない。',e:'I cannot concentrate because I have not slept enough.',t:'เพราะนอนไม่พอ จึงไม่มีสมาธิ'}},
      {id:'n2a13',label:'〜あまり／あまりの〜に',meaning_en:'So much… that…',meaning_th:'…มากจน…',use_en:'An extreme feeling or state causes a result.',use_th:'ความรู้สึกหรือสภาพรุนแรงมากจนเกิดผลตามมา',example:{j:'緊張のあまり、言葉が出なかった。',k:'きんちょうの あまり、ことばが でなかった。',e:'I was so nervous that I could not get any words out.',t:'ประหม่ามากจนพูดอะไรไม่ออก'}},
      {id:'n2f18',label:'〜につき（理由）',meaning_en:'Due to (public notice)',meaning_th:'เนื่องจาก (ประกาศ)',use_en:'Give a brief, formal reason on a sign or notice.',use_th:'บอกเหตุผลสั้น ๆ อย่างเป็นทางการบนป้ายหรือประกาศ',example:{j:'工事中につき、この入口は使えません。',k:'こうじちゅうに つき、この いりぐちは つかえません。',e:'This entrance is unavailable due to construction.',t:'ทางเข้านี้ใช้งานไม่ได้เนื่องจากกำลังก่อสร้าง'}}
    ]
  },
  {
    id:'reasoning',title_en:'What follows from this reason?',title_th:'เหตุผลนี้นำไปสู่ข้อสรุปแบบไหน?',chapters:[17],
    decision_en:'Look at the ending: a suggestion, a prediction, a stronger feeling, regret, or a commitment.',
    decision_th:'ดูท้ายประโยคว่าเป็นคำชวน การคาดเดา ความรู้สึกที่ยิ่งมากขึ้น ความเสียดาย หรือความรับผิดชอบ',
    members:[
      {id:'n2g08',label:'〜ことだし',meaning_en:'Since… (among other reasons)',meaning_th:'ในเมื่อ…ด้วย',use_en:'Offer one reason for a suggestion or decision.',use_th:'ยกเหตุผลหนึ่งมาประกอบคำชวนหรือการตัดสินใจ',example:{j:'雨もやんだことだし、散歩に行こう。',k:'あめも やんだ ことだし、さんぽに いこう。',e:'The rain has stopped, so let us go for a walk.',t:'ในเมื่อฝนก็หยุดแล้ว ไปเดินเล่นกันเถอะ'}},
      {id:'n2a16',label:'〜のことだから',meaning_en:'Knowing that person…',meaning_th:'เป็นคนนี้แล้ว คง…',use_en:'Predict from someone’s familiar character or habits.',use_th:'เดาจากนิสัยที่เรารู้จักดีของคนนั้น',example:{j:'まじめな彼のことだから、もう準備しただろう。',k:'まじめな かれの ことだから、もう じゅんびしただろう。',e:'Knowing how conscientious he is, he has probably prepared already.',t:'เป็นเขาที่จริงจังแบบนั้น คงเตรียมเรียบร้อยแล้ว'}},
      {id:'n2a15',label:'〜だけに',meaning_en:'All the more because',meaning_th:'ยิ่ง…เพราะว่า…',use_en:'The reason makes the result or feeling especially strong.',use_th:'เหตุผลนั้นทำให้ผลหรือความรู้สึกยิ่งแรงขึ้น',example:{j:'楽しみにしていただけに、中止は残念だ。',k:'たのしみに していた だけに、ちゅうしは ざんねんだ。',e:'Because I had been looking forward to it, the cancellation is especially disappointing.',t:'ยิ่งตั้งตารอ ก็ยิ่งเสียดายที่ถูกยกเลิก'}},
      {id:'n2a14',label:'〜ばかりに',meaning_en:'Just because… (unfortunate result)',meaning_th:'เพียงเพราะ…เลยแย่',use_en:'Regret the particular cause of an unwanted result.',use_th:'เสียดายเหตุหนึ่งที่ทำให้เกิดผลไม่พึงประสงค์',example:{j:'一度うそをついたばかりに、信用を失った。',k:'いちど うそを ついた ばかりに、しんようを うしなった。',e:'Just because I lied once, I lost their trust.',t:'เพียงเพราะโกหกครั้งเดียว เลยเสียความเชื่อใจไป'}},
      {id:'n3a17',label:'〜からには',meaning_en:'Now that… I must…',meaning_th:'ในเมื่อ…แล้ว ก็ต้อง…',use_en:'A fact or decision brings responsibility or determination.',use_th:'ข้อเท็จจริงหรือการตัดสินใจนำมาซึ่งหน้าที่หรือความตั้งใจ',example:{j:'約束したからには、最後まで手伝う。',k:'やくそくした からには、さいごまで てつだう。',e:'Now that I have promised, I will help until the end.',t:'ในเมื่อสัญญาแล้ว ก็จะช่วยจนถึงที่สุด'}}
    ]
  },
  {
    id:'action-stage',title_en:'Before, during, or just finished?',title_th:'ก่อนทำ กำลังทำ หรือเพิ่งเสร็จ?',chapters:[2,20,28],
    decision_en:'The verb before ところ chooses the stage. たばかり means recent in your own sense of time.',
    decision_th:'รูปกริยาหน้า ところ เป็นตัวเลือกช่วงเวลา ส่วน たばかり คือเพิ่งเกิดในความรู้สึกเรา',
    members:[
      {id:'n3a01',label:'V辞書形＋ところだ',meaning_en:'Just about to do',meaning_th:'กำลังจะทำพอดี',use_en:'The action has not started yet.',use_th:'ยังไม่ได้เริ่มทำ',example:{j:'今から晩ご飯を作るところです。',k:'いまから ばんごはんを つくる ところです。',e:'I am just about to make dinner.',t:'กำลังจะทำอาหารเย็นพอดี'}},
      {id:'n3a01',label:'Vている＋ところだ',meaning_en:'Right in the middle',meaning_th:'กำลังทำอยู่พอดี',use_en:'The action is happening now.',use_th:'กำลังทำสิ่งนั้นอยู่ตอนนี้',example:{j:'今、晩ご飯を作っているところです。',k:'いま、ばんごはんを つくっている ところです。',e:'I am in the middle of making dinner.',t:'ตอนนี้กำลังทำอาหารเย็นอยู่พอดี'}},
      {id:'n3a01',label:'Vた＋ところだ',meaning_en:'Just finished doing',meaning_th:'เพิ่งทำเสร็จเมื่อกี้',use_en:'Focus on the immediate completion of the action.',use_th:'เน้นจังหวะที่เพิ่งทำเสร็จทันที',example:{j:'今、晩ご飯を作ったところです。',k:'いま、ばんごはんを つくった ところです。',e:'I have just finished making dinner.',t:'เพิ่งทำอาหารเย็นเสร็จเมื่อกี้'}},
      {id:'n3a02',label:'Vた＋ばかりだ',meaning_en:'Only recently did',meaning_th:'เพิ่งทำมาไม่นาน',use_en:'It feels recent; the time gap can be longer.',use_th:'รู้สึกว่าเพิ่งเกิด แม้เวลาจริงอาจผ่านมานานกว่าเมื่อกี้',example:{j:'先月、日本に来たばかりです。',k:'せんげつ、にほんに きた ばかりです。',e:'I only came to Japan last month.',t:'เพิ่งมาญี่ปุ่นเมื่อเดือนที่แล้วเอง'}}
    ]
  },
  {
    id:'wake',title_en:'One わけ, five different messages',title_th:'わけ คำเดียว แต่สื่อได้ห้าแบบ',chapters:[12,18,25,28],
    decision_en:'Read both negatives: cannot go and cannot NOT go mean opposite things.',
    decision_th:'ดูคำปฏิเสธทั้งสองจุด: ไปไม่ได้ กับ ไม่ไปไม่ได้ มีความหมายตรงข้ามกัน',
    members:[
      {id:'n3b08',label:'〜わけだ',meaning_en:'That explains it',meaning_th:'มิน่าล่ะ',use_en:'New information makes the result understandable.',use_th:'ข้อมูลใหม่ทำให้เข้าใจว่าเหตุใดจึงเป็นแบบนั้น',example:{j:'駅まで五分か。便利なわけだ。',k:'えきまで ごふんか。べんりな わけだ。',e:'Five minutes to the station? No wonder it is convenient.',t:'ถึงสถานีในห้านาทีเหรอ มิน่าล่ะถึงสะดวก'}},
      {id:'n3b09',label:'〜わけではない',meaning_en:'It is not that…',meaning_th:'ไม่ได้หมายความว่า…',use_en:'Reject an assumption without denying everything.',use_th:'ปฏิเสธข้อสรุปบางอย่าง โดยไม่ได้ปฏิเสธทั้งหมด',example:{j:'嫌いなわけではないが、毎日は食べない。',k:'きらいな わけでは ないが、まいにちは たべない。',e:'It is not that I dislike it, but I do not eat it every day.',t:'ไม่ได้ไม่ชอบหรอก แต่ไม่ได้กินทุกวัน'}},
      {id:'n2d17',label:'〜わけがない',meaning_en:'There is no way',meaning_th:'ไม่มีทางเป็นไปได้',use_en:'Strongly deny that something could be true.',use_th:'ปฏิเสธหนักแน่นว่าเรื่องนั้นเป็นไปไม่ได้',example:{j:'まだ一歳なのに、漢字が読めるわけがない。',k:'まだ いっさいなのに、かんじが よめる わけが ない。',e:'At only one year old, there is no way the child can read kanji.',t:'เพิ่งขวบเดียวเอง ไม่มีทางอ่านคันจิได้หรอก'}},
      {id:'n3c06',label:'V辞書形＋わけにはいかない',meaning_en:'Cannot responsibly do it',meaning_th:'ทำไม่ได้เพราะมีเหตุจำเป็น',use_en:'An obligation or principle stops you from doing it.',use_th:'หน้าที่หรือหลักการทำให้ทำสิ่งนั้นไม่ได้',example:{j:'明日は試験だから、遊ぶわけにはいかない。',k:'あしたは しけんだから、あそぶ わけには いかない。',e:'I have an exam tomorrow, so I cannot afford to go out for fun.',t:'พรุ่งนี้มีสอบ จะไปเที่ยวเล่นไม่ได้'}},
      {id:'n2c14',label:'Vない＋わけにはいかない',meaning_en:'Cannot avoid doing it',meaning_th:'ไม่ทำไม่ได้ ยังไงก็ต้องทำ',use_en:'An obligation stops you from skipping the action.',use_th:'มีหน้าที่ทำให้ละเว้นสิ่งนั้นไม่ได้',example:{j:'大事な会議なので、行かないわけにはいかない。',k:'だいじな かいぎなので、いかない わけには いかない。',e:'It is an important meeting, so I have to go.',t:'เป็นประชุมสำคัญ ไม่ไปไม่ได้'}}
    ]
  },
  {
    id:'cannot',title_en:'What kind of “cannot”?',title_th:'“ทำไม่ได้” เพราะอะไร?',chapters:[18],
    decision_en:'Find the obstacle: understanding, polite refusal, missing means, circumstances, or no room for it.',
    decision_th:'หาอุปสรรค: เข้าใจยาก ปฏิเสธสุภาพ ไม่มีวิธี หน้าที่ไม่เอื้อ หรือไม่มีเวลาและใจจะทำ',
    members:[
      {id:'n2d03',label:'〜がたい',meaning_en:'Hard to accept or do',meaning_th:'ยากจะทำหรือยอมรับ',use_en:'Often a mental or emotional difficulty, not a missing skill.',use_th:'มักยากด้านความคิดหรือความรู้สึก ไม่ใช่ขาดทักษะ',example:{j:'彼の説明は理解しがたい。',k:'かれの せつめいは りかいしがたい。',e:'His explanation is difficult to understand.',t:'คำอธิบายของเขายากจะเข้าใจ'}},
      {id:'n2c17',label:'〜かねる',meaning_en:'Cannot (polite refusal)',meaning_th:'ไม่สามารถ (ปฏิเสธสุภาพ)',use_en:'Politely say you cannot comply in this situation.',use_th:'บอกอย่างสุภาพว่าทำตามคำขอในกรณีนี้ไม่ได้',example:{j:'そのご依頼はお受けしかねます。',k:'その ごいらいは おうけしかねます。',e:'I am afraid we cannot accept that request.',t:'เกรงว่าจะไม่สามารถรับคำขอนั้นได้'}},
      {id:'n2b28',label:'〜ようがない',meaning_en:'No way to do it',meaning_th:'ไม่มีวิธีที่จะทำ',use_en:'A necessary means or piece of information is missing.',use_th:'ขาดวิธีหรือข้อมูลที่จำเป็นต่อการทำ',example:{j:'住所が分からず、手紙を送りようがない。',k:'じゅうしょが わからず、てがみを おくりようが ない。',e:'Without knowing the address, I have no way to send a letter.',t:'ไม่รู้ที่อยู่ เลยไม่มีทางส่งจดหมายได้'}},
      {id:'n3c06',label:'〜わけにはいかない',meaning_en:'Cannot under these obligations',meaning_th:'ทำไม่ได้เพราะหน้าที่',use_en:'Doing it would conflict with a duty or principle.',use_th:'ถ้าทำจะขัดกับหน้าที่หรือหลักการ',example:{j:'約束があるので、先に帰るわけにはいかない。',k:'やくそくが あるので、さきに かえる わけには いかない。',e:'I have made a commitment, so I cannot leave first.',t:'มีสัญญาที่ให้ไว้ เลยกลับก่อนไม่ได้'}},
      {id:'n2c27',label:'〜どころではない',meaning_en:'No time or room for',meaning_th:'ไม่มีเวลาหรือใจจะทำ',use_en:'A pressing situation leaves no room for that activity.',use_th:'มีสถานการณ์เร่งด่วนจนไม่อยู่ในสภาพจะทำสิ่งนั้น',example:{j:'締め切り前で、旅行どころではない。',k:'しめきりまえで、りょこうどころでは ない。',e:'With the deadline approaching, I have no time to think about a trip.',t:'ใกล้ถึงกำหนดส่งแล้ว ไม่มีเวลามาคิดเรื่องเที่ยวหรอก'}}
    ]
  },
  {
    id:'unavoidable',title_en:'What makes you do it?',title_th:'อะไรทำให้ต้องทำ?',chapters:[23,25],
    decision_en:'Distinguish duty, outside pressure, an uncontrollable reaction, and the only remaining option.',
    decision_th:'แยกหน้าที่ แรงบังคับจากสถานการณ์ ปฏิกิริยาที่ห้ามไม่ได้ และทางเลือกสุดท้าย',
    members:[
      {id:'n2c14',label:'〜ないわけにはいかない',meaning_en:'Must, because of duty',meaning_th:'ต้องทำเพราะมีหน้าที่',use_en:'Skipping it would break an obligation or expectation.',use_th:'ถ้าไม่ทำจะขัดกับหน้าที่หรือสิ่งที่คนอื่นคาดหวัง',example:{j:'招待されたので、返事をしないわけにはいかない。',k:'しょうたいされたので、へんじを しない わけには いかない。',e:'I was invited, so I must send a reply.',t:'ได้รับคำเชิญมา จะไม่ตอบกลับก็ไม่ได้'}},
      {id:'n2c13',label:'〜ざるを得ない',meaning_en:'Forced to, reluctantly',meaning_th:'จำต้องทำอย่างไม่เต็มใจ',use_en:'Circumstances force an unwanted action.',use_th:'สถานการณ์บังคับให้ทำสิ่งที่ไม่อยากทำ',example:{j:'大雨で、試合を中止せざるを得なかった。',k:'おおあめで、しあいを ちゅうしせざるを えなかった。',e:'The heavy rain forced us to cancel the match.',t:'ฝนตกหนักจนจำต้องยกเลิกการแข่งขัน'}},
      {id:'n2b22',label:'〜ずにはいられない',meaning_en:'Cannot help doing',meaning_th:'อดทำไม่ได้',use_en:'A feeling or reaction is too strong to suppress.',use_th:'ความรู้สึกหรือปฏิกิริยาแรงจนห้ามตัวเองไม่ได้',example:{j:'その話が面白くて、笑わずにはいられなかった。',k:'その はなしが おもしろくて、わらわずには いられなかった。',e:'The story was so funny that I could not help laughing.',t:'เรื่องนั้นตลกมากจนอดหัวเราะไม่ได้'}},
      {id:'n3c05',label:'〜しかない',meaning_en:'The only option left',meaning_th:'เหลือทางเดียวคือ…',use_en:'State the remaining option; regret is not required.',use_th:'บอกทางเลือกที่เหลือ ไม่จำเป็นต้องไม่เต็มใจ',example:{j:'終電がないので、タクシーで帰るしかない。',k:'しゅうでんが ないので、タクシーで かえるしか ない。',e:'There are no more trains, so the only option is to take a taxi home.',t:'รถไฟเที่ยวสุดท้ายหมดแล้ว เหลือแค่กลับแท็กซี่'}}
    ]
  },
  {
    id:'evidence',title_en:'How do you know?',title_th:'รู้ได้อย่างไร?',chapters:[22],
    decision_en:'First ask whether you heard it, saw signs, inferred it, or expected it from facts.',
    decision_th:'ถามก่อนว่าได้ยินมา เห็นท่าที อนุมานเอง หรือคาดตามข้อมูลที่รู้',
    members:[
      {id:'n3b01',label:'普通形＋そうだ（伝聞）',meaning_en:'I heard that…',meaning_th:'ได้ยินมาว่า…',use_en:'Report information received from a source.',use_th:'บอกต่อข้อมูลที่ได้รับจากแหล่งหนึ่ง',example:{j:'天気予報によると、明日は雨が降るそうだ。',k:'てんきよほうに よると、あしたは あめが ふるそうだ。',e:'According to the forecast, it will rain tomorrow.',t:'ตามพยากรณ์อากาศ ได้ยินว่าพรุ่งนี้ฝนจะตก'}},
      {id:'n3b02',label:'Vます語幹＋そうだ（様態）',meaning_en:'Looks about to…',meaning_th:'ดูท่าจะ…',use_en:'Judge from current signs; the event has not happened yet.',use_th:'ดูจากสัญญาณตอนนี้ เหตุการณ์ยังไม่เกิด',example:{j:'空が暗い。雨が降りそうだ。',k:'そらが くらい。あめが ふりそうだ。',e:'The sky is dark. It looks as if it is going to rain.',t:'ท้องฟ้ามืด ดูท่าฝนจะตก'}},
      {id:'n3b03',label:'〜ようだ／〜みたいだ',meaning_en:'It seems, from clues',meaning_th:'จากสิ่งที่เห็น ดูเหมือน…',use_en:'Draw a conclusion from evidence; みたい is more casual.',use_th:'สรุปจากหลักฐาน ส่วน みたい เป็นกันเองกว่า',example:{j:'道がぬれている。雨が降ったようだ。',k:'みちが ぬれている。あめが ふった ようだ。',e:'The road is wet. It seems that it rained.',t:'ถนนเปียกอยู่ ดูเหมือนฝนจะตกไปแล้ว'}},
      {id:'n3b04',label:'〜らしい',meaning_en:'Apparently…',meaning_th:'เห็นว่า… / ดูเหมือน…',use_en:'Present indirect information or a tentative inference.',use_th:'บอกข้อมูลทางอ้อมหรือข้อคาดเดาแบบไม่ยืนยันเต็มที่',example:{j:'友達の話では、あの店は安いらしい。',k:'ともだちの はなしでは、あの みせは やすいらしい。',e:'From what my friend says, that shop is apparently inexpensive.',t:'จากที่เพื่อนเล่า เห็นว่าร้านนั้นราคาถูก'}},
      {id:'n3b05',label:'〜はずだ',meaning_en:'Should be, given the facts',meaning_th:'น่าจะเป็นตามข้อมูล',use_en:'Expect a result because known facts support it.',use_th:'คาดผลเพราะข้อมูลที่รู้สนับสนุน ไม่ใช่คำสั่งว่าควรทำ',example:{j:'九時に出たなら、もう着いているはずだ。',k:'くじに でたなら、もう ついている はずだ。',e:'If he left at nine, he should have arrived by now.',t:'ถ้าออกมาตอนเก้าโมง ตอนนี้ก็น่าจะถึงแล้ว'}}
    ]
  },
  {
    id:'conditionals',title_en:'Which “if” fits your message?',title_th:'“ถ้า” แบบไหนตรงใจ?',chapters:[15],
    decision_en:'A reliable result: と. A condition: ば. After it happens: たら. Given that plan: なら.',
    decision_th:'ผลที่เกิดตามปกติใช้ と เงื่อนไขใช้ ば เมื่อเกิดแล้วใช้ たら ถ้าพูดถึงแผนนั้นใช้ なら',
    members:[
      {id:'n3a23',label:'〜と（条件）',meaning_en:'Whenever X, Y follows',meaning_th:'พอ X ก็เกิด Y',use_en:'A regular or automatic result; not a personal request.',use_th:'ผลปกติหรืออัตโนมัติ ไม่ใช่คำขอส่วนตัว',example:{j:'このボタンを押すと、ドアが開きます。',k:'この ボタンを おすと、ドアが あきます。',e:'When you press this button, the door opens.',t:'พอกดปุ่มนี้ ประตูก็เปิด'}},
      {id:'n3a20',label:'〜ば',meaning_en:'If the condition is met',meaning_th:'ถ้าเงื่อนไขเป็นจริง',use_en:'Focus on the condition needed for the result.',use_th:'เน้นเงื่อนไขที่จะทำให้เกิดผล',example:{j:'時間があれば、参加できます。',k:'じかんが あれば、さんかできます。',e:'If I have time, I can participate.',t:'ถ้ามีเวลาก็เข้าร่วมได้'}},
      {id:'n3a21',label:'〜たら',meaning_en:'If / once it happens',meaning_th:'ถ้า / เมื่อเกิดแล้ว',use_en:'The next action follows X; requests and plans can follow.',use_th:'ทำสิ่งต่อไปหลัง X เกิด ตามด้วยคำขอหรือแผนได้',example:{j:'駅に着いたら、電話してください。',k:'えきに ついたら、でんわしてください。',e:'Please call me when you arrive at the station.',t:'พอถึงสถานีแล้วช่วยโทรมานะ'}},
      {id:'n3a22',label:'〜なら',meaning_en:'If that is your plan',meaning_th:'ถ้าจะทำอย่างนั้นล่ะก็',use_en:'Respond to information with advice; your advice may apply beforehand.',use_th:'รับข้อมูลแล้วแนะนำ โดยสิ่งที่แนะนำอาจต้องทำก่อน',example:{j:'京都に行くなら、先にホテルを予約したほうがいい。',k:'きょうとに いくなら、さきに ホテルを よやくした ほうが いい。',e:'If you are going to Kyoto, you should book a hotel first.',t:'ถ้าจะไปเกียวโต ควรจองโรงแรมไว้ก่อน'}}
    ]
  },
  {
    id:'contrast',title_en:'Although… but what is the point?',title_th:'“ทั้งที่…” แต่อยากเน้นอะไร?',chapters:[14],
    decision_en:'Disappointment, formal contradiction, concession, a smaller reality, or rejecting a reason?',
    decision_th:'ผิดหวัง ขัดกับที่คาดแบบทางการ ยอมรับแต่มีอีกด้าน จริงน้อยกว่าที่คิด หรือปฏิเสธเหตุผล?',
    members:[
      {id:'n3a27',label:'〜のに',meaning_en:'Even though… (unexpected)',meaning_th:'ทั้งที่…แต่กลับ…',use_en:'Show surprise or disappointment at an unexpected result.',use_th:'แสดงความแปลกใจหรือผิดหวังกับผลที่ไม่ตรงคาด',example:{j:'早く寝たのに、まだ眠い。',k:'はやく ねたのに、まだ ねむい。',e:'Even though I went to bed early, I am still sleepy.',t:'ทั้งที่นอนเร็ว แต่ยังง่วงอยู่เลย'}},
      {id:'n2a19',label:'〜にもかかわらず',meaning_en:'Despite… (formal)',meaning_th:'แม้ว่า… (ทางการ)',use_en:'Formally state a result that contradicts the circumstances.',use_th:'บอกผลที่ขัดกับสถานการณ์อย่างเป็นทางการ',example:{j:'大雨にもかかわらず、多くの人が集まった。',k:'おおあめにも かかわらず、おおくの ひとが あつまった。',e:'Despite the heavy rain, many people gathered.',t:'แม้ฝนตกหนัก ผู้คนจำนวนมากก็ยังมารวมตัวกัน'}},
      {id:'n2a20',label:'〜ものの',meaning_en:'Although true, still…',meaning_th:'ถึงจะจริง แต่ก็ยัง…',use_en:'Accept the first fact, then explain its limitation; often written.',use_th:'ยอมรับข้อเท็จจริงแรก แล้วบอกข้อจำกัด มักใช้ในงานเขียน',example:{j:'本を買ったものの、まだ読んでいない。',k:'ほんを かった ものの、まだ よんでいない。',e:'Although I bought the book, I have not read it yet.',t:'ถึงจะซื้อหนังสือมาแล้ว แต่ก็ยังไม่ได้อ่าน'}},
      {id:'n3f31',label:'〜といっても',meaning_en:'Though I say X…',meaning_th:'ถึงจะบอกว่า X ก็เถอะ',use_en:'Scale back the image that the word X suggests.',use_th:'ลดภาพที่คนฟังอาจนึกจากคำว่า X',example:{j:'料理ができるといっても、卵を焼くくらいだ。',k:'りょうりが できると いっても、たまごを やく くらいだ。',e:'I say I can cook, but I can only do things like fry eggs.',t:'ถึงบอกว่าทำอาหารได้ ก็แค่ทอดไข่ประมาณนั้น'}},
      {id:'n2a25',label:'〜からといって',meaning_en:'Just because X, not Y',meaning_th:'แค่เพราะ X ไม่ได้แปลว่า Y',use_en:'Reject the idea that X alone justifies a conclusion.',use_th:'ค้านว่ามีแค่ X ก็ยังสรุปเป็น Y ไม่ได้',example:{j:'安いからといって、必要のない物まで買わないで。',k:'やすいからと いって、ひつようの ない ものまで かわないで。',e:'Do not buy things you do not need just because they are cheap.',t:'อย่าซื้อแม้แต่ของที่ไม่จำเป็นเพียงเพราะราคาถูก'}}
    ]
  },
  {
    id:'mono-koto',title_en:'もの or こと: what are you doing?',title_th:'もの หรือ こと: กำลังสื่ออะไร?',chapters:[23,24,26,27],
    decision_en:'Advice for now, a written rule, a general norm, a reflection, or a remembered habit?',
    decision_th:'แนะนำตอนนี้ เขียนกฎ บอกหลักทั่วไป สะท้อนความรู้สึก หรือรำลึกสิ่งที่เคยทำ?',
    members:[
      {id:'n2c21',label:'V辞書形／Vない＋ことだ',meaning_en:'You should / should not',meaning_th:'ควรทำ / ไม่ควรทำ',use_en:'Give practical advice for the person’s situation.',use_th:'แนะนำวิธีปฏิบัติสำหรับสถานการณ์ของคนนั้น',example:{j:'覚えたいなら、毎日少しずつ復習することだ。',k:'おぼえたいなら、まいにち すこしずつ ふくしゅうする ことだ。',e:'If you want to remember it, you should review a little each day.',t:'ถ้าอยากจำได้ ก็ควรทบทวนวันละนิดทุกวัน'}},
      {id:'n2h12',label:'V辞書形／Vない＋こと',meaning_en:'Written rule: do / do not',meaning_th:'กฎ: ให้ทำ / ห้ามทำ',use_en:'Write an instruction; no だ at the end.',use_th:'ใช้เขียนข้อปฏิบัติ ไม่เติม だ ท้ายประโยค',example:{j:'教室では、携帯電話を使わないこと。',k:'きょうしつでは、けいたいでんわを つかわない こと。',e:'Do not use mobile phones in the classroom.',t:'ห้ามใช้โทรศัพท์มือถือในห้องเรียน'}},
      {id:'n2h14',label:'V辞書形＋ものだ',meaning_en:'People ought to…',meaning_th:'คนเราควร…',use_en:'Give a general social principle; can sound like a lecture.',use_th:'บอกหลักปฏิบัติทั่วไป อาจฟังเหมือนกำลังสั่งสอน',example:{j:'人に助けてもらったら、お礼を言うものだ。',k:'ひとに たすけて もらったら、おれいを いう ものだ。',e:'When someone helps you, you should thank them.',t:'เมื่อใครช่วยเรา ก็ควรขอบคุณเขา'}},
      {id:'n3c25',label:'〜ものだ（感慨）',meaning_en:'How…! (reflecting)',meaning_th:'ช่าง…จริง ๆ (รำพึง)',use_en:'Reflect on an experience or a general truth.',use_th:'รำพึงถึงประสบการณ์หรือความจริงทั่วไป',example:{j:'久しぶりに会うと、子供の成長は早いものだと感じる。',k:'ひさしぶりに あうと、こどもの せいちょうは はやい ものだと かんじる。',e:'Seeing them after a long time, I feel how quickly children grow.',t:'พอเจอกันหลังจากนานแล้ว ก็รู้สึกว่าเด็กโตเร็วจริง ๆ'}},
      {id:'n2d16',label:'Vた＋ものだ',meaning_en:'Used to… (remembering)',meaning_th:'เมื่อก่อนเคย… (รำลึก)',use_en:'Look back on a repeated past habit, not one event.',use_th:'นึกถึงสิ่งที่เคยทำบ่อยในอดีต ไม่ใช่เหตุการณ์ครั้งเดียว',example:{j:'学生のころは、よく夜遅くまで話したものだ。',k:'がくせいの ころは、よく よる おそくまで はなした ものだ。',e:'In our student days, we often used to talk late into the night.',t:'สมัยเป็นนักเรียน เคยคุยกันจนดึกบ่อย ๆ'}}
    ]
  },
  {
    id:'limits',title_en:'What kind of limit?',title_th:'จำกัดแบบไหน?',chapters:[4,5],
    decision_en:'Eligible group, continuing condition, limited information, fullest extent, or inconvenient timing?',
    decision_th:'จำกัดกลุ่ม เงื่อนไขที่ยังอยู่ ข้อมูลที่มี เต็มขอบเขต หรือดันเกิดผิดจังหวะ?',
    members:[
      {id:'n2h05',label:'〜に限り',meaning_en:'Only for this group/case',meaning_th:'เฉพาะกลุ่มหรือกรณีนี้',use_en:'Announce who or what qualifies; formal.',use_th:'ประกาศว่ากลุ่มหรือกรณีใดได้สิทธิ ใช้แบบทางการ',example:{j:'会員に限り、入場は無料です。',k:'かいいんに かぎり、にゅうじょうは むりょうです。',e:'Admission is free for members only.',t:'เข้าฟรีเฉพาะสมาชิกเท่านั้น'}},
      {id:'n2e14',label:'〜限り（は）',meaning_en:'As long as',meaning_th:'ตราบใดที่',use_en:'The result holds while the condition stays true.',use_th:'ผลยังเป็นแบบนั้นตราบที่เงื่อนไขยังจริง',example:{j:'元気な限り、働き続けたい。',k:'げんきな かぎり、はたらきつづけたい。',e:'As long as I am healthy, I want to keep working.',t:'ตราบใดที่ยังแข็งแรง ก็อยากทำงานต่อ'}},
      {id:'n2g14',label:'〜限りでは',meaning_en:'As far as I know',meaning_th:'เท่าที่รู้หรือเช็กมา',use_en:'Limit your claim to the information you have.',use_th:'จำกัดข้อสรุปไว้แค่ข้อมูลที่ตัวเองมี',example:{j:'調べた限りでは、間違いは見つからなかった。',k:'しらべた かぎりでは、まちがいは みつからなかった。',e:'As far as I checked, I found no mistakes.',t:'เท่าที่ตรวจสอบมา ไม่พบข้อผิดพลาด'}},
      {id:'n2h03',label:'〜限り（最大の範囲）',meaning_en:'To the fullest extent',meaning_th:'ให้เต็มที่เท่าที่ทำได้',use_en:'Use the whole available amount or ability.',use_th:'ใช้ปริมาณหรือความสามารถทั้งหมดที่มี',example:{j:'できる限り、分かりやすく説明します。',k:'できる かぎり、わかりやすく せつめいします。',e:'I will explain as clearly as I can.',t:'จะอธิบายให้เข้าใจง่ายที่สุดเท่าที่ทำได้'}},
      {id:'n2b17',label:'〜に限って（悪いタイミング）',meaning_en:'Just when… (bad timing)',meaning_th:'ดันเป็นตอนที่…พอดี',use_en:'Something inconvenient happens at exactly the wrong time.',use_th:'เรื่องไม่สะดวกดันเกิดในจังหวะที่ไม่อยากให้เกิด',example:{j:'急いでいるときに限って、バスが来ない。',k:'いそいでいる ときに かぎって、バスが こない。',e:'It is just when I am in a hurry that the bus fails to come.',t:'พอรีบทีไร รถเมล์ก็ดันไม่มาสักที'}}
    ]
  },
  {
    id:'change',title_en:'How is the change happening?',title_th:'เปลี่ยนไปในลักษณะไหน?',chapters:[2,9],
    decision_en:'Two things change together, a process brings effects, a change is underway, or one trend continues?',
    decision_th:'สองอย่างเปลี่ยนตามกัน กระบวนการพาผลตามมา กำลังเปลี่ยนอยู่ หรือเปลี่ยนไปทางเดียวเรื่อย ๆ?',
    members:[
      {id:'n2b23',label:'〜につれて',meaning_en:'As X changes, so does Y',meaning_th:'ยิ่ง X เปลี่ยน Y ก็เปลี่ยนตาม',use_en:'Two changes develop together, usually naturally.',use_th:'สองอย่างเปลี่ยนตามกัน โดยมากเป็นไปตามธรรมชาติ',example:{j:'日本語が分かるにつれて、ドラマが楽しくなった。',k:'にほんごが わかるに つれて、ドラマが たのしく なった。',e:'As I understood more Japanese, dramas became more enjoyable.',t:'ยิ่งเข้าใจภาษาญี่ปุ่นมากขึ้น ก็ยิ่งสนุกกับละคร'}},
      {id:'n2b25',label:'〜に伴って',meaning_en:'Along with / as a consequence',meaning_th:'ควบคู่กับ / ตามผลของ',use_en:'A broader development brings an associated change; often formal.',use_th:'การเปลี่ยนแปลงใหญ่ทำให้มีการเปลี่ยนที่เกี่ยวข้อง มักเป็นทางการ',example:{j:'人口の増加に伴って、学校も増えた。',k:'じんこうの ぞうかに ともなって、がっこうも ふえた。',e:'As the population grew, the number of schools also increased.',t:'โรงเรียนเพิ่มขึ้นตามการเพิ่มของประชากร'}},
      {id:'n2c07',label:'〜つつある',meaning_en:'Gradually changing now',meaning_th:'กำลังเปลี่ยนไปทีละน้อย',use_en:'Focus on one change currently in progress; often written.',use_th:'เน้นการเปลี่ยนหนึ่งอย่างที่กำลังดำเนินอยู่ มักใช้ในงานเขียน',example:{j:'この町の人口は減りつつある。',k:'この まちの じんこうは へりつつ ある。',e:'The population of this town is gradually decreasing.',t:'ประชากรของเมืองนี้กำลังค่อย ๆ ลดลง'}},
      {id:'n2c08',label:'〜一方だ',meaning_en:'Keeps changing one way',meaning_th:'มีแต่จะ…ขึ้นเรื่อย ๆ',use_en:'The trend keeps moving in one direction, good or bad.',use_th:'แนวโน้มเปลี่ยนไปทางเดียวต่อเนื่อง จะดีหรือร้ายก็ได้',example:{j:'この町の便利さは増す一方だ。',k:'この まちの べんりさは ます いっぽうだ。',e:'This town just keeps becoming more convenient.',t:'เมืองนี้มีแต่จะสะดวกขึ้นเรื่อย ๆ'}},
      {id:'n2c09',label:'〜ばかりだ（変化）',meaning_en:'Keeps changing (usually unwanted)',meaning_th:'เปลี่ยนเรื่อย ๆ (มักไม่พึงประสงค์)',use_en:'In this use, often stress a worsening, unwanted trend.',use_th:'ความหมายนี้มักเน้นแนวโน้มไม่พึงประสงค์ที่ยิ่งแย่ลง',example:{j:'何もしなければ、問題は増えるばかりだ。',k:'なにもしなければ、もんだいは ふえる ばかりだ。',e:'If we do nothing, the problems will only keep increasing.',t:'ถ้าไม่ทำอะไร ปัญหาก็มีแต่จะเพิ่มขึ้น'}}
    ]
  }
];
