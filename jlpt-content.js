/* Original JLPT-style practice, not copied examination questions.
   Each distractor has a contextual explanation. Options are shuffled at runtime.
   Study levels follow the app's library; no official exhaustive grammar list exists. */
var JLPT_QUESTIONS=[];
var JLPT_FORMAT_SOURCE='https://www.jlpt.jp/e/guideline/testsections.html';
(function(){
  function option(text,en,th){return {text:text,en:en,th:th};}
  function choice(id,gid,stem,answers,en,th,translationEn,translationTh){
    JLPT_QUESTIONS.push({id:id,gid:gid,kind:'choice',stem:stem,options:answers,answer:0,en:en,th:th,translation_en:translationEn,translation_th:translationTh});
  }
  var o=option;
  choice('j01','n3a01','A「資料はもう送りましたか。」\nB「いいえ。今から＿＿ところです。」',[
    o('送る','Dictionary form + ところ: the action is about to start.','รูปพจนานุกรม + ところ: กำลังจะเริ่มทำ'),
    o('送っている','This puts the action in progress, but 今から places its start after now.','รูปนี้คือกำลังทำอยู่ แต่ 今から บอกว่าจะเริ่มจากตอนนี้'),
    o('送った','This says it has just finished, contradicting いいえ and 今から.','แปลว่าเพิ่งทำเสร็จ ขัดกับ いいえ และ 今から'),
    o('送っていた','This describes a past ongoing action, not the next action.','เป็นการกระทำที่ดำเนินอยู่ในอดีต ไม่ใช่สิ่งที่กำลังจะทำ')],
    '今から is the clue: the sending has not started. Use Vる + ところ.','คำใบ้คือ 今から: ยังไม่ได้ส่ง จึงใช้ Vる + ところ',
    'A: Have you sent the documents? B: No. I am about to send them now.','A: ส่งเอกสารแล้วหรือยัง B: ยัง ตอนนี้กำลังจะส่ง');
  choice('j02','n3a01','A「報告は終わりましたか。」\nB「まだです。今ちょうど半分です。まだ報告を＿＿ところなんです。」',[
    o('している','The report is halfway through, so it is in progress now.','รายงานไปได้ครึ่งหนึ่ง จึงกำลังดำเนินอยู่'),
    o('した','This says the report has just finished, contradicting まだ and 半分.','บอกว่าเพิ่งรายงานเสร็จ ขัดกับ まだ และ 半分'),
    o('する','This says the report is about to start, but it is already halfway through.','บอกว่ากำลังจะเริ่มรายงาน แต่ตรงนี้รายงานไปครึ่งหนึ่งแล้ว'),
    o('していた','This locates the ongoing reporting in the past, not the current stage signalled by 今.','บอกการรายงานที่ดำเนินอยู่ในอดีต ไม่ใช่ขั้นปัจจุบันที่ 今 ระบุ')],
    'Vている + ところ identifies what someone is doing at that moment.','Vている + ところ บอกสิ่งที่กำลังทำ ณ ขณะนั้น',
    'A: Is the report finished? B: Not yet. I am halfway through, still giving it.','A: รายงานเสร็จหรือยัง B: ยัง เพิ่งได้ครึ่งหนึ่ง ยังรายงานอยู่');
  choice('j03','n3a02','この町には半年前に引っ越してきた＿＿なので、まだ知らない場所が多い。',[
    o('ばかり','The speaker treats six months as recent; たばかり allows that viewpoint.','ผู้พูดรู้สึกว่าหกเดือนยังไม่นาน たばかり ใช้ตามความรู้สึกนี้ได้'),
    o('ところ','たところ describes the immediate stage after an action, not six months later.','たところ คือจังหวะเพิ่งเสร็จทันที ไม่ใช่ผ่านมาหกเดือน'),
    o('最中','最中 is the middle of an activity, not a completed move.','最中 คือระหว่างทำ ไม่ใช่ย้ายเสร็จแล้ว'),
    o('うち','たうちなので does not express having recently moved.','たうちなので ไม่ใช้บอกว่าเพิ่งย้ายมา')],
    'Recent in the speaker’s mind is not the same as “seconds ago.”','ความรู้สึกว่าเพิ่งเกิด ไม่จำเป็นต้องหมายถึงไม่กี่วินาทีที่แล้ว',
    'I only moved here six months ago, so there are still many places I do not know.','ฉันเพิ่งย้ายมาเมื่อหกเดือนก่อน จึงยังมีหลายที่ที่ไม่รู้จัก');
  choice('j04','n3a03','忘れない＿＿、聞いた住所をメモしておこう。',[
    o('うちに','Act before the current state changes: before you forget.','ทำก่อนสภาพเปลี่ยน คือก่อนที่จะลืม'),
    o('たびに','This would mean every time you do not forget, not before forgetting.','จะกลายเป็นทุกครั้งที่ไม่ลืม ไม่ใช่ก่อนลืม'),
    o('とたんに','とたん normally follows a past verb for a sudden event.','とたん โดยปกติต่อกริยารูป た เพื่อบอกเหตุการณ์ฉับพลัน'),
    o('次第','This planned “as soon as” use needs a verb stem, not 忘れない.','次第 ที่แปลว่าทันทีที่ ต้องต่อฐานกริยา ไม่ใช่ 忘れない')],
    'Vないうちに means to use the opportunity before something happens.','Vないうちに คือทำก่อนที่เหตุการณ์นั้นจะเกิดขึ้น',
    'I will note down the address I heard before I forget it.','จดที่อยู่ที่ได้ยินไว้ก่อนจะลืมดีกว่า');
  choice('j05','n3a04','私が留守にしている＿＿、荷物が一つ届いた。',[
    o('間に','One delivery occurred within the period of absence.','มีพัสดุมาถึงหนึ่งครั้งภายในช่วงที่ไม่อยู่'),
    o('間','Without に, this normally describes something continuing throughout that time.','ถ้าไม่มี に มักบอกการกระทำที่ต่อเนื่องตลอดช่วงนั้น'),
    o('たび','This would need a repeated event and normally たびに; this is one absence and one delivery.','たびに ใช้กับเหตุการณ์ที่เกิดซ้ำ แต่ตรงนี้เป็นการไม่อยู่และการส่งของครั้งหนึ่ง'),
    o('ところ','The sentence needs a time span containing an event, not an action-stage noun here.','ตรงนี้ต้องการช่วงเวลาที่เหตุการณ์เกิดขึ้น ไม่ใช่คำนามบอกขั้นของการกระทำ')],
    'Look at the result: a single occurrence inside a time window → 間に.','ดูผลที่ตามมา: เกิดหนึ่งเหตุการณ์ภายในช่วงเวลา จึงใช้ 間に',
    'A package arrived while I was away.','มีพัสดุมาถึงหนึ่งชิ้นตอนที่ฉันไม่อยู่');
  choice('j06','n3a05','窓を開けた＿＿、強い風で机の紙が全部飛んでしまった。',[
    o('とたん','Opening the window triggered a sudden, unplanned event.','ทันทีที่เปิดหน้าต่าง ก็เกิดเหตุไม่คาดคิด'),
    o('次第','The planned-action use is 開け次第, and the result here is accidental.','แบบที่ใช้กับแผนต้องเป็น 開け次第 และผลตรงนี้เป็นอุบัติเหตุ'),
    o('最中に','開けた最中 is not the connection for an action in progress.','開けた最中 ไม่ใช่รูปเชื่อมสำหรับเหตุการณ์ที่กำลังดำเนินอยู่'),
    o('たびに','This would require a habitual repeated result, rather than this one mishap.','รูปนี้จะบอกผลที่เกิดซ้ำทุกครั้ง ไม่ใช่เหตุพลาดครั้งนี้')],
    'Past action + とたん marks the abrupt event immediately after it.','กริยารูป た + とたん บอกเหตุการณ์ฉับพลันที่เกิดทันทีหลังจากนั้น',
    'The moment I opened the window, a gust blew all the papers off the desk.','ทันทีที่เปิดหน้าต่าง ลมแรงก็พัดกระดาษบนโต๊ะปลิวหมด');
  choice('j07','n3a14','先生が毎日練習に付き合ってくださった＿＿、自信を持って発表できた。本当に感謝している。',[
    o('おかげで','The final sentence explicitly expresses gratitude for helpful support.','ประโยคท้ายแสดงความขอบคุณต่อความช่วยเหลืออย่างชัดเจน'),
    o('せいで','This normally assigns blame; it conflicts with the sincere thanks here.','โดยปกติใช้โทษสาเหตุ ขัดกับการขอบคุณอย่างจริงใจตรงนี้'),
    o('にもかかわらず','This would make the success happen despite the help.','รูปนี้จะกลายเป็นสำเร็จทั้งที่ได้รับความช่วยเหลือ'),
    o('ばかりに','This typically regrets a cause leading to an unwelcome result.','มักเสียดายที่สาเหตุหนึ่งนำไปสู่ผลเสีย')],
    'The deciding clue is gratitude, not merely a positive verb.','คำใบ้ตัดสินคือความขอบคุณ ไม่ใช่เพียงกริยาที่ดูเป็นบวก',
    'Thanks to my teacher practising with me daily, I presented confidently. I am truly grateful.','เพราะอาจารย์ช่วยซ้อมทุกวัน จึงนำเสนอได้อย่างมั่นใจ รู้สึกขอบคุณจริง ๆ');
  choice('j08','n3a13','夜中まで隣の部屋がうるさかった＿＿、よく眠れず、今日は頭が痛い。',[
    o('せいで','The speaker blames the noise for unwanted consequences.','ผู้พูดโทษเสียงดังที่ทำให้เกิดผลเสีย'),
    o('おかげで','This usually gives credit; no grateful or ironic framing is supplied.','มักยกความดีให้สาเหตุ แต่ตรงนี้ไม่มีบริบทขอบคุณหรือประชด'),
    o('一方で','This contrasts two aspects; it does not express the causal blame requested by the sentence.','ใช้เปรียบสองด้าน ไม่ได้บอกการโทษสาเหตุแบบประโยคนี้'),
    o('ためなら','This means “if it is for the sake of,” not a cause of sleeplessness.','แปลว่าถ้าเพื่อสิ่งนั้น ไม่ใช่สาเหตุที่นอนไม่หลับ')],
    'せいで links an unwelcome result to the cause the speaker blames.','せいで เชื่อมผลที่ไม่พึงประสงค์กับสาเหตุที่ผู้พูดโทษ',
    'Because the room next door was noisy until midnight, I slept badly and have a headache today.','เพราะห้องข้าง ๆ เสียงดังถึงเที่ยงคืน จึงนอนไม่พอและวันนี้ปวดหัว');
  choice('j09','n3b09','この店の料理が嫌いな＿＿。ただ、今日は家で食べたいだけだ。',[
    o('わけではない','The speaker corrects an overgeneralization: it is not that they dislike the food.','ผู้พูดแก้ความเข้าใจเหมารวมว่าไม่ได้เกลียดอาหารที่นี่'),
    o('わけだ','This concludes that the speaker dislikes the food, contradicting ただ…だけ.','สรุปว่าผู้พูดไม่ชอบอาหาร ขัดกับการชี้แจงว่า ただ…だけ'),
    o('わけにはいかない','This concerns being unable to act due to circumstances, not qualifying a preference.','ใช้เมื่อทำไม่ได้เพราะข้อจำกัด ไม่ใช่ชี้แจงความชอบ'),
    o('ことはない','嫌いなことはない is not the pattern for the intended partial denial.','嫌いなことはない ไม่ใช่สำนวนปฏิเสธบางส่วนที่ต้องการตรงนี้')],
    'ただ…だけ limits the claim: declining the restaurant does not mean disliking it.','ただ…だけ จำกัดความหมาย: ไม่ไปกินไม่ได้แปลว่าไม่ชอบร้าน',
    'It is not that I dislike the food here. I just want to eat at home today.','ไม่ได้ไม่ชอบอาหารร้านนี้ แค่วันนี้อยากกินที่บ้าน');
  choice('j10','n3b11','毎日練習を続けたら、以前は読めなかった漢字も読める＿＿。',[
    o('ようになった','A newly acquired ability follows the potential form 読める.','ความสามารถที่เกิดขึ้นใหม่ ใช้ต่อรูปสามารถ 読める'),
    o('ことにした','This is a personal decision, not the acquisition of an ability.','เป็นการตัดสินใจ ไม่ใช่การเกิดความสามารถใหม่'),
    o('つもりだった','This is a past intention, not an actual change in ability.','เป็นความตั้งใจในอดีต ไม่ใช่ความสามารถที่เปลี่ยนจริง'),
    o('ところだった','This means being on the point of doing something, not a lasting acquired skill.','บอกจังหวะกำลังจะทำ ไม่ใช่ทักษะที่ทำได้แล้ว')],
    'Look for a change from unable to able: potential form + ようになる.','ดูการเปลี่ยนจากทำไม่ได้เป็นทำได้: รูปสามารถ + ようになる',
    'After practising every day, I became able to read kanji that I could not read before.','พอฝึกทุกวัน ก็อ่านคันจิที่เมื่อก่อนอ่านไม่ได้ได้แล้ว');
  choice('j11','n3b13','健康のために、私は今日から毎晩歩く＿＿。誰かに言われたのではなく、自分で決めた。',[
    o('ことにした','The explicit 自分で決めた identifies a personal decision.','自分で決めた บอกชัดว่าตัดสินใจเอง'),
    o('ことになった','This frames a decision as an arrangement or outcome, not the personal choice emphasized here.','บอกเป็นข้อตกลงหรือผลที่ถูกกำหนด ไม่เน้นตัดสินใจเองแบบนี้'),
    o('ようになった','This describes a change in habit/ability, not making the decision now.','เป็นการเปลี่ยนนิสัยหรือความสามารถ ไม่ใช่เพิ่งตัดสินใจ'),
    o('ことがある','This means the action sometimes happens, not a newly made decision.','หมายถึงมีบางครั้งที่ทำ ไม่ใช่การตัดสินใจใหม่')],
    'The question is who makes the decision: ことにする foregrounds the decision-maker’s choice.','ประเด็นคือใครตัดสินใจ: ことにする เน้นการเลือกของเจ้าตัว',
    'For my health, I decided to walk every evening from today. It was my own decision.','เพื่อสุขภาพ ฉันตัดสินใจเดินทุกเย็นตั้งแต่วันนี้ เป็นการตัดสินใจของฉันเอง');
  choice('j12','n3c06','私はこの店の責任者だ。問題を知りながら、何もしないで帰る＿＿。',[
    o('わけにはいかない','Responsibility prevents the speaker from leaving without acting.','ความรับผิดชอบทำให้กลับไปโดยไม่ทำอะไรไม่ได้'),
    o('わけではない','This merely denies a description; it does not express the obligation.','เพียงปฏิเสธคำอธิบาย ไม่ได้บอกภาระหน้าที่'),
    o('ことはない','This says leaving is unnecessary, rather than unacceptable because of responsibility.','หมายถึงไม่จำเป็นต้องกลับ ไม่ใช่กลับไม่ได้เพราะหน้าที่'),
    o('しかない','This says leaving is the only choice, reversing the intended obligation.','หมายถึงมีทางเลือกเดียวคือต้องกลับ ตรงข้ามกับหน้าที่ตรงนี้')],
    'The barrier is responsibility, not physical inability.','สิ่งที่ขัดขวางคือหน้าที่ ไม่ใช่ความสามารถทางร่างกาย',
    'I am responsible for this shop. Knowing about the problem, I cannot just go home without doing anything.','ฉันเป็นผู้รับผิดชอบร้านนี้ รู้ปัญหาแล้วจะกลับโดยไม่ทำอะไรไม่ได้');
  choice('j13','n3c19','私は通訳＿＿会議に参加した。発言者の言葉を別の言語に訳すのが仕事だった。',[
    o('として','This names the role in which the speaker participated.','บอกบทบาทที่ผู้พูดเข้าร่วม'),
    o('にとって','This introduces someone’s viewpoint, not the role they performed.','บอกมุมมอง ไม่ใช่บทบาทหน้าที่'),
    o('によって','This marks means, cause or agent, not “in the role of.”','บอกวิธี สาเหตุ หรือผู้กระทำ ไม่ใช่ในบทบาท'),
    o('に対して','This directs an action or attitude toward someone; it does not name one’s role.','บอกการกระทำหรือท่าทีต่อบางคน ไม่ใช่บทบาทตนเอง')],
    'Role → として. Evaluation from someone’s standpoint → にとって.','บทบาทใช้ として ส่วนการประเมินจากมุมมองใครใช้ にとって',
    'I attended the meeting as an interpreter; my job was translating the speakers’ words.','ฉันร่วมประชุมในฐานะล่าม มีหน้าที่แปลคำพูดของผู้พูด');
  choice('j14','n3c30','毎日この駅を使う私＿＿、エレベーターができたことは大きな助けだ。',[
    o('にとって','This evaluates the benefit from the speaker’s standpoint.','ประเมินประโยชน์จากมุมมองของผู้พูด'),
    o('に比べて','This compares something with me; the sentence evaluates how useful the elevator is for me.','รูปนี้เปรียบกับฉัน แต่ประโยคต้องการประเมินว่าลิฟต์มีประโยชน์สำหรับฉันอย่างไร'),
    o('に応じて','This means adapting according to something, not evaluating a benefit.','แปลว่าปรับตามบางสิ่ง ไม่ใช่ประเมินประโยชน์'),
    o('を通じて','This identifies a route or medium, not whose viewpoint matters.','บอกช่องทางหรือสื่อ ไม่ใช่มุมมองของใคร')],
    '大きな助け is an evaluation. にとって tells us for whom it is true.','大きな助け เป็นการประเมิน にとって บอกว่าสำหรับใคร',
    'For me, who uses this station every day, the new elevator is a great help.','สำหรับฉันที่ใช้สถานีนี้ทุกวัน ลิฟต์ใหม่ช่วยได้มาก');
  choice('j15','n2a03','結果が分かり＿＿、こちらからすぐにご連絡します。',[
    o('次第','Verb stem + 次第 introduces the next planned action.','ฐานกริยา + 次第 บอกแผนว่าจะทำทันทีหลังจากนั้น'),
    o('とたん','This needs 分かったとたん and usually introduces a sudden event.','ต้องเป็น 分かったとたん และมักบอกเหตุการณ์ฉับพลัน'),
    o('最中','This needs a different connection and means in the middle of.','ต้องเชื่อมอีกรูป และหมายถึงระหว่างทำ'),
    o('以来','This needs 分かって以来 for “since finding out,” not a future promise.','ต้องเป็น 分かって以来 คือหลังจากรู้มาตลอด ไม่ใช่คำสัญญาในอนาคต')],
    'Both sides matter: 分かり is a verb stem, and ご連絡します is a promise.','ดูทั้งสองด้าน: 分かり เป็นฐานกริยา และ ご連絡します เป็นคำสัญญา',
    'As soon as we know the result, we will contact you.','ทันทีที่ทราบผล ทางเราจะติดต่อไป');
  choice('j16','n2a20','説明書を最後まで読んだ＿＿、使い方はまだよく分からない。',[
    o('ものの','The expected understanding did not follow, although the manual was read.','แม้อ่านแล้ว แต่ความเข้าใจที่คาดหวังยังไม่เกิด'),
    o('おかげで','This would credit reading for not understanding.','จะกลายเป็นยกความดีให้การอ่านที่ทำให้ไม่เข้าใจ'),
    o('上で','This presents reading as preparation for a deliberate next action, not an unmet result.','บอกอ่านเป็นขั้นเตรียมก่อนการกระทำต่อไป ไม่ใช่ผลที่ไม่เป็นตามคาด'),
    o('からには','This sets up a commitment or natural obligation, not this contrasting fact.','บอกข้อผูกมัดหรือสิ่งที่ควรทำ ไม่ใช่ข้อเท็จจริงที่ขัดกันนี้')],
    'A is true, yet its expected result has not happened: ものの.','A จริง แต่ผลที่คาดจาก A ยังไม่เกิด ใช้ ものの',
    'Although I read the manual to the end, I still do not really understand how to use it.','แม้อ่านคู่มือจนจบ ก็ยังไม่ค่อยเข้าใจวิธีใช้');
  choice('j17','n2a24','彼は休む＿＿、昼休みにも仕事を続けていた。',[
    o('どころか','The reality goes in the opposite direction: far from resting, he kept working.','ความจริงตรงข้าม: อย่าว่าแต่พักเลย ยังทำงานต่อ'),
    o('ものの','休むものの would concede that he does rest, which conflicts with the contrast here.','休むものの ยอมรับว่าได้พัก แต่ขัดกับบริบทนี้'),
    o('に限り','This requires a noun and limits eligibility, not an overturned expectation.','ต่อคำนามและจำกัดสิทธิ์ ไม่ใช่หักความคาดหมาย'),
    o('おかげで','This credits resting as a helpful cause; it does not reverse the claim.','ยกการพักเป็นสาเหตุที่ดี ไม่ได้หักล้างว่าพัก')],
    'どころか overturns the proposed description. It does not admit it first.','どころか หักล้างคำอธิบายแรก ไม่ได้ยอมรับก่อน',
    'Far from taking a rest, he continued working even during lunch.','อย่าว่าแต่พักเลย แม้แต่ช่วงพักเที่ยงเขาก็ยังทำงาน');
  choice('j18','n2a25','値段が高い＿＿、必ず品質がよいとは限らない。',[
    o('からといって','This rejects an automatic inference from price to quality.','ปฏิเสธการสรุปจากราคาไปเป็นคุณภาพโดยอัตโนมัติ'),
    o('からには','This introduces a commitment or expected consequence, not a rejection of the inference.','บอกข้อผูกมัดหรือผลที่ควรเกิด ไม่ใช่ปฏิเสธข้อสรุป'),
    o('だけあって','This would support the expectation of good quality.','จะสนับสนุนความคาดหมายว่าคุณภาพดี'),
    o('ばかりに','This expresses regret about a cause leading to a bad result.','เสียดายที่สาเหตุนำไปสู่ผลเสีย')],
    'からといって often pairs with a negative conclusion such as とは限らない.','からといって มักตามด้วยข้อสรุปเชิงปฏิเสธ เช่น とは限らない',
    'Just because something is expensive does not mean its quality is always good.','เพียงเพราะราคาแพง ไม่ได้แปลว่าคุณภาพจะดีเสมอ');
  choice('j19','n2b02','実物を見＿＿、買うかどうか決められません。',[
    o('ないことには','A necessary step is missing, so the decision cannot be made.','ยังขาดขั้นที่จำเป็น จึงตัดสินใจไม่ได้'),
    o('たばかりに','This would regret having seen it, not require seeing it first.','จะเสียดายที่ได้เห็น ไม่ใช่บอกว่าต้องเห็นก่อน'),
    o('るどころか','This means far from seeing, not unless one sees.','หมายถึงอย่าว่าแต่เห็นเลย ไม่ใช่ถ้าไม่เห็นก็'),
    o('るものの','This concedes that one sees it, rather than making it a prerequisite.','ยอมรับว่าเห็นแล้ว ไม่ใช่กำหนดว่าต้องเห็นก่อน')],
    'Vないことには + a negative result means “unless this happens, I cannot…”','Vないことには + ผลปฏิเสธ หมายถึงถ้าไม่ทำสิ่งนี้ ก็ไม่สามารถ…',
    'Unless I see the actual item, I cannot decide whether to buy it.','ถ้ายังไม่เห็นของจริง ก็ตัดสินใจไม่ได้ว่าจะซื้อหรือไม่');
  choice('j20','n2b03','時間を戻せる＿＿、あの日の発言を取り消したい。',[
    o('ものなら','Potential form + ものなら imagines a difficult or impossible possibility.','รูปสามารถ + ものなら สมมติสิ่งที่ทำได้ยากหรือเป็นไปไม่ได้'),
    o('ようものなら','The threat pattern needs a volitional form, such as 戻そうものなら.','แบบบอกผลร้ายต้องต่อรูปตั้งใจ เช่น 戻そうものなら'),
    o('ばかりに','This regrets an actual cause rather than imagining an impossible ability.','เสียดายสาเหตุที่เกิดขึ้น ไม่ใช่สมมติความสามารถที่เป็นไปไม่ได้'),
    o('上で','This means after doing something as preparation, not “if it were possible.”','บอกหลังทำเป็นขั้นเตรียม ไม่ใช่ถ้าทำได้')],
    '戻せる is potential. The speaker wishes for an unreal possibility.','戻せる เป็นรูปสามารถ ผู้พูดปรารถนาสิ่งที่เป็นไปไม่ได้จริง',
    'If I could turn back time, I would take back what I said that day.','ถ้าย้อนเวลาได้ ก็อยากถอนคำพูดในวันนั้น');
  choice('j21','n2b18','この講座は学生＿＿、社会人も受けられる。',[
    o('に限らず','The second group is included: not limited to students.','รวมคนทำงานด้วย ไม่ได้จำกัดแค่นักเรียน'),
    o('に限り','This restricts the course to students, contradicting 社会人も.','จำกัดเฉพาะนักเรียน ขัดกับ 社会人も'),
    o('に限って','This singles students out; it does not add another eligible group.','เจาะจงนักเรียน ไม่ได้เพิ่มอีกกลุ่มที่เข้าร่วมได้'),
    o('に限る','This says students are best / the limit, not that others can also attend.','หมายถึงนักเรียนดีที่สุดหรือเป็นขอบเขต ไม่ใช่คนอื่นก็เข้าเรียนได้')],
    'The も in 社会人も signals expansion beyond the first category.','も ใน 社会人も บอกว่าขยายไปนอกกลุ่มแรก',
    'This course is open not only to students but also to working adults.','หลักสูตรนี้ไม่ได้จำกัดเฉพาะนักเรียน คนทำงานก็เรียนได้');
  choice('j22','n2b23','山を登る＿＿、空気が冷たくなってきた。',[
    o('につれて','Two changes progress together: increasing altitude and decreasing temperature.','สองอย่างเปลี่ยนไปด้วยกัน: สูงขึ้นและอากาศเย็นลง'),
    o('に先立って','This means before climbing, but the cooling happens as the climb progresses.','หมายถึงก่อนปีน แต่ความเย็นเกิดตามความสูงที่เพิ่ม'),
    o('に反して','This marks contradiction, not parallel gradual changes here.','บอกความขัดแย้ง ไม่ใช่การเปลี่ยนแปลงคู่กันตรงนี้'),
    o('を問わず','This normally attaches to a noun and means regardless of a category.','โดยปกติต่อคำนาม แปลว่าไม่ว่าประเภทใด')],
    'A changing process accompanies another changing process.','กระบวนการหนึ่งเปลี่ยนไปพร้อมกับอีกกระบวนการ',
    'As we climbed the mountain, the air became colder.','ยิ่งปีนเขาขึ้นไป อากาศก็ยิ่งเย็นลง');
  choice('j23','n2c13','電車がすべて止まってしまったので、高いがタクシーを使わ＿＿。',[
    o('ざるを得ない','使わ is the negative stem: circumstances leave no alternative.','使わ เป็นฐานปฏิเสธ สถานการณ์ทำให้ไม่มีทางเลือกอื่น'),
    o('ずにはいられない','This expresses an uncontrollable urge, not a forced practical choice.','บอกความรู้สึกที่อดทำไม่ได้ ไม่ใช่ทางเลือกที่จำเป็นตามสถานการณ์'),
    o('ないことはない','This says using it is possible, rather than unavoidable.','บอกว่าใช้ได้อยู่ ไม่ได้บอกว่าจำเป็นต้องใช้'),
    o('ないわけがない','This asserts there is no possibility of not using it, rather than the standard forced-choice expression.','เป็นการยืนยันว่าไม่มีทางไม่ใช้ ไม่ใช่สำนวนปกติสำหรับจำใจทำ')],
    'External circumstances force an unwanted choice: ざるを得ない.','สถานการณ์ภายนอกบังคับให้เลือกสิ่งที่ไม่อยากทำ ใช้ ざるを得ない',
    'All trains have stopped, so I have no choice but to take an expensive taxi.','รถไฟหยุดทั้งหมด จึงไม่มีทางเลือกนอกจากใช้แท็กซี่แม้จะแพง');
  choice('j24','n2c14','あれだけ助けてもらったのだから、お礼を言わ＿＿。',[
    o('ないわけにはいかない','Cannot avoid thanking → must thank, because of the social obligation.','ไม่ขอบคุณไม่ได้ คือจำเป็นต้องขอบคุณตามมารยาท'),
    o('ないほうがいい','This recommends not thanking the person, reversing the social obligation.','แนะนำว่าไม่ขอบคุณจะดีกว่า ตรงข้ามกับหน้าที่ทางมารยาท'),
    o('ないつもりだ','This expresses an intention not to thank, contrary to the stated reason.','ตั้งใจว่าจะไม่ขอบคุณ ขัดกับเหตุผลที่ระบุ'),
    o('ないことにした','This says the speaker decided not to thank, reversing the intended obligation.','ตัดสินใจว่าจะไม่ขอบคุณ ตรงข้ามกับความจำเป็นตรงนี้')],
    'Keep both negatives: 言わない + わけにはいかない reverses “cannot do.”','ต้องอ่านปฏิเสธสองชั้น: 言わない + わけにはいかない ทำให้กลายเป็นต้องพูด',
    'After receiving so much help, I cannot fail to say thank you.','ได้รับความช่วยเหลือขนาดนั้น จะไม่กล่าวขอบคุณไม่ได้');
  choice('j25','n2c16','このまま確認せずに薬を飲むと、重大な事故につながり＿＿。',[
    o('かねない','Verb stem + かねない warns that an undesirable result is possible.','ฐานกริยา + かねない เตือนว่าอาจเกิดผลร้าย'),
    o('かねる','This means being unable or unwilling to do something, not a risk of it happening.','หมายถึงไม่สามารถหรือไม่สะดวกทำ ไม่ใช่เสี่ยงที่จะเกิด'),
    o('ようがない','This denies any possibility/means; it reverses the warning.','ปฏิเสธว่ามีวิธีหรือโอกาสเกิด ตรงข้ามกับคำเตือน'),
    o('がたい','This says it is difficult to do, not that the accident might occur.','บอกว่าทำได้ยาก ไม่ใช่อาจเกิดอุบัติเหตุ')],
    'The negative-looking ない in かねない does not mean “cannot”: it signals a risk.','แม้มี ない แต่ かねない ไม่ได้แปลว่าทำไม่ได้ หมายถึงเสี่ยงที่จะเกิด',
    'Taking the medicine without checking could lead to a serious accident.','ถ้ากินยาโดยไม่ตรวจสอบ อาจนำไปสู่อุบัติเหตุร้ายแรง');
  choice('j26','n2c17','申し訳ありませんが、個人情報に関するご質問にはお答えし＿＿。',[
    o('かねます','A polite refusal: we cannot answer that request.','เป็นการปฏิเสธอย่างสุภาพว่าไม่สามารถตอบได้'),
    o('かねません','This means we might answer, which reverses the refusal.','แปลว่าอาจตอบได้ กลับความหมายของการปฏิเสธ'),
    o('がちです','This describes a tendency to answer, not declining the request.','บอกแนวโน้มว่าจะตอบ ไม่ใช่ปฏิเสธคำขอ'),
    o('つつあります','This says answering is in progress, not a refusal.','บอกว่ากำลังดำเนินการตอบ ไม่ใช่ปฏิเสธ')],
    'かねる is often used to decline a request politely; かねない has a different meaning.','かねる มักใช้ปฏิเสธคำขออย่างสุภาพ ความหมายต่างจาก かねない',
    'We are sorry, but we cannot answer questions concerning personal information.','ขออภัย ไม่สามารถตอบคำถามเกี่ยวกับข้อมูลส่วนบุคคลได้');
  choice('j27','n2c22','まだ締め切りまで一か月あるのだから、そんなに急ぐ＿＿。',[
    o('ことはない','The speaker reassures the listener that rushing is unnecessary.','ผู้พูดปลอบว่าไม่จำเป็นต้องรีบ'),
    o('わけがない','This denies the possibility of rushing rather than its necessity.','ปฏิเสธความเป็นไปได้ที่จะรีบ ไม่ใช่ความจำเป็น'),
    o('しかない','This says there is no choice but to hurry, contradicting the reassurance.','บอกว่ามีแต่ต้องรีบ ขัดกับการปลอบใจ'),
    o('べきだ','This recommends hurrying, the opposite of the intended advice.','แนะนำว่าควรรีบ ตรงข้ามกับคำแนะนำนี้')],
    'No need to do something is different from being unable to do it.','ไม่จำเป็นต้องทำ ต่างจากไม่สามารถทำได้',
    'There is still a month until the deadline, so there is no need to rush so much.','ยังเหลืออีกเดือนกว่าจะถึงกำหนด ไม่จำเป็นต้องรีบขนาดนั้น');
  choice('j28','n2d17','鍵は私が持っているし、窓も全部閉まっている。誰も中に入れる＿＿。',[
    o('わけがない','The evidence leads to a strong denial of the possibility of entry.','หลักฐานนำไปสู่การปฏิเสธว่าไม่มีทางเข้าได้'),
    o('わけではない','This is a limited denial, not the strong impossibility asserted by 誰も and the evidence.','ปฏิเสธเพียงบางส่วน ไม่ใช่ความเป็นไปไม่ได้ที่ 誰も และหลักฐานเน้น'),
    o('わけにはいかない','This describes social constraints rather than the physical impossibility inferred here.','เป็นข้อจำกัดทางสังคม ไม่ใช่การอนุมานว่าเข้าไม่ได้จริง'),
    o('ことはない','This would say entering is unnecessary, not impossible.','จะหมายถึงไม่จำเป็นต้องเข้า ไม่ใช่เข้าไม่ได้')],
    'わけがない rejects a possibility based on the speaker’s reasoning.','わけがない ปฏิเสธความเป็นไปได้ตามเหตุผลของผู้พูด',
    'I have the key and all the windows are closed. There is no way anyone can get inside.','ฉันถือกุญแจและหน้าต่างปิดหมด ไม่มีทางที่ใครจะเข้าไปได้');
  choice('j29','n2d20','この教室では、生徒一人一人の理解度＿＿、宿題の量を変えている。',[
    o('に応じて','The amount is deliberately adjusted to each learner’s level.','ปรับปริมาณอย่างตั้งใจตามความเข้าใจของแต่ละคน'),
    o('を問わず','This means regardless of understanding, reversing the tailoring described.','หมายถึงไม่ว่าความเข้าใจเป็นอย่างไร ตรงข้ามกับการปรับให้เหมาะ'),
    o('に反して','This means against the level, not in accordance with it.','หมายถึงสวนทาง ไม่ใช่ให้เหมาะกับระดับ'),
    o('に先立って','This means before something; understanding level is the standard, not an event.','หมายถึงก่อนเหตุการณ์ แต่ระดับความเข้าใจเป็นเกณฑ์ ไม่ใช่เหตุการณ์')],
    'A deliberate adjustment according to a standard → に応じて.','ปรับอย่างตั้งใจตามเกณฑ์หนึ่ง ใช้ に応じて',
    'In this class, the amount of homework is adjusted to each student’s understanding.','ห้องเรียนนี้ปรับปริมาณการบ้านตามความเข้าใจของนักเรียนแต่ละคน');
  choice('j30','n2f18','【入口の掲示】設備点検＿＿、本日は午後三時で閉館いたします。',[
    o('につき','A concise formal notice gives the reason for closure.','ประกาศทางการแบบสั้นให้เหตุผลของการปิด'),
    o('ものだから','This requires 設備点検なものだから and sounds like a personal explanation.','ต้องเป็น 設備点検なものだから และฟังเป็นคำอธิบายส่วนตัว'),
    o('ばかりに','This expresses regret about a cause; it is not this neutral administrative notice.','แสดงความเสียดายต่อสาเหตุ ไม่ใช่ประกาศธุรการที่เป็นกลางนี้'),
    o('にとって','This introduces a viewpoint, not the reason for closing.','บอกมุมมอง ไม่ใช่เหตุผลที่ปิด')],
    'Noun + につき is used for brief reasons in formal notices.','คำนาม + につき ใช้บอกเหตุผลสั้น ๆ ในประกาศทางการ',
    'Notice: Due to an equipment inspection, we will close at 3 p.m. today.','ประกาศ: เนื่องจากตรวจสอบอุปกรณ์ วันนี้จะปิดเวลา 15.00 น.');

  choice('j31','n3a01','A「コピーはもう終わりましたか。」\nB「はい。たった今、全部＿＿ところです。」',[
    o('終わった','はい and たった今 locate the action immediately after completion.','はい และ たった今 บอกว่าการกระทำเพิ่งเสร็จทันที'),
    o('終わる','This would put completion in the future, contrary to はい.','ทำให้เสร็จในอนาคต ขัดกับ はい'),
    o('終わっている','This describes a continuing state rather than the immediate completion stage.','บอกสภาพที่ดำเนินอยู่ ไม่ใช่จังหวะเพิ่งเสร็จทันที'),
    o('終わらない','This negates completion, contradicting the answer.','ปฏิเสธว่าเสร็จ ขัดกับคำตอบ')],
    'Vた + ところ is the point just after an action finishes.','Vた + ところ คือจังหวะทันทีหลังการกระทำเสร็จ',
    'A: Is the copying finished? B: Yes, it all finished just now.','A: ถ่ายเอกสารเสร็จหรือยัง B: เสร็จหมดเมื่อกี้พอดี');
  choice('j32','n3a02','彼は二か月前に入社した＿＿だから、まだ社内のルールに慣れていない。',[
    o('ばかり','The speaker considers two months to be a short time for adjusting to a new job.','ผู้พูดมองว่าสองเดือนยังเป็นเวลาสั้นสำหรับการปรับตัวในงานใหม่'),
    o('ところ','たところ refers to the immediate moment after joining, not two months later.','たところ คือจังหวะเพิ่งเข้าทำงานทันที ไม่ใช่ผ่านมาสองเดือน'),
    o('最中','He has already joined; he is not in the middle of the joining action.','เข้าทำงานแล้ว ไม่ได้กำลังดำเนินการเข้า'),
    o('ついで','This means taking an opportunity to do another action, not recent experience.','หมายถึงถือโอกาสทำอีกอย่าง ไม่ใช่ประสบการณ์ที่เพิ่งเกิด')],
    'たばかり measures recency from the speaker’s viewpoint.','たばかり วัดความรู้สึกว่าเพิ่งเกิดจากมุมมองผู้พูด',
    'He joined only two months ago, so he is not yet used to the company rules.','เขาเพิ่งเข้าทำงานสองเดือน จึงยังไม่ชินกับกฎบริษัท');
  choice('j33','n3a03','空が明るい＿＿、山を下りてしまおう。暗くなると道が見えなくなる。',[
    o('うちに','Use the remaining daylight before the condition changes.','ใช้ช่วงที่ยังสว่างก่อนสภาพเปลี่ยน'),
    o('たびに','This means every time it is light, rather than before today’s light disappears.','หมายถึงทุกครั้งที่สว่าง ไม่ใช่ก่อนความสว่างวันนี้จะหมด'),
    o('からには','This frames an obligation from the fact, not the closing time window explained next.','เป็นข้อผูกมัดจากข้อเท็จจริง ไม่ใช่ช่วงโอกาสที่กำลังจะหมดตามประโยคถัดไป'),
    o('にもかかわらず','This means despite the daylight, whereas daylight is the opportunity to use.','หมายถึงทั้งที่สว่าง แต่ตรงนี้ความสว่างเป็นโอกาสที่ต้องใช้')],
    'The next sentence explains the deadline: once dark, the path will be hard to see.','ประโยคถัดไปอธิบายเส้นตาย: พอมืดจะมองทางไม่เห็น',
    'Let us finish descending while it is still light. Once it gets dark, we cannot see the path.','ลงเขาให้เสร็จตอนยังสว่างเถอะ พอมืดจะมองทางไม่เห็น');

  function order(id,gid,before,parts,after,star,en,th,te,tt){
    JLPT_QUESTIONS.push({id:id,gid:gid,kind:'order',before:before,parts:parts,after:after,star:star,
      options:parts.map(function(p,i){return o(p,i===star?'This occupies ★ in the completed sentence.':'This belongs in position '+(i+1)+', not ★.',i===star?'ส่วนนี้อยู่ตรง ★ ในประโยคที่เรียงถูก':'ส่วนนี้อยู่ตำแหน่งที่ '+(i+1)+' ไม่ใช่ ★');}),answer:star,en:en,th:th,translation_en:te,translation_th:tt});
  }
  order('jo01','n3a01','今、',['出かける','ところ','なので','少し'],'待ってください。',2,
    '出かけるところ names the stage. なので connects that situation to the request; 少し modifies 待って.','出かけるところ บอกจังหวะกำลังจะออก なので เชื่อมเหตุผล และ 少し ขยาย 待って',
    'I am just about to leave, so please wait a little.','ตอนนี้กำลังจะออกไป ช่วยรอสักครู่');
  order('jo02','n3a03','元気な',['うちに','海外へ行って','みたいと','思っている'],'。',1,
    '元気な + うちに sets the time window. 行ってみたい means wanting to try going; と connects that thought to 思っている.','元気な + うちに บอกช่วงที่ยังแข็งแรง 行ってみたい คืออยากลองไป และ と เชื่อมความคิดกับ 思っている',
    'I am thinking that I would like to try going abroad while I am healthy.','ฉันคิดว่าอยากลองไปต่างประเทศตอนที่ยังแข็งแรง');
  order('jo03','n3a14','あなたが',['手伝って','くれた','おかげで','予定より'],'早く終わった。',2,
    '手伝ってくれた describes help received. The whole clause attaches to おかげで; 予定より modifies 早く.','手伝ってくれた บอกว่าได้รับความช่วยเหลือ ทั้งประโยคต่อกับ おかげで และ 予定より ขยาย 早く',
    'Thanks to your help, we finished earlier than planned.','เพราะคุณช่วย จึงเสร็จเร็วกว่าที่วางแผนไว้');
  order('jo04','n3b09','甘い物が',['嫌いな','わけでは','ないが','今は'],'食べたくない。',1,
    'A な-adjective uses な before わけ. Keep わけではない together; が introduces the contrasting situation now.','คุณศัพท์ な ต้องมี な หน้า わけ จับ わけではない ไว้ด้วยกัน แล้ว が เชื่อมสิ่งที่ขัดกันตอนนี้',
    'It is not that I dislike sweets, but I do not want any right now.','ไม่ได้ไม่ชอบของหวาน แต่ตอนนี้ไม่อยากกิน');
  order('jo05','n3c06','責任者として、',['この問題を','放って','おく','わけには'],'いかない。',2,
    'この問題を is the object of 放っておく. The dictionary form おく connects to わけにはいかない.','この問題を เป็นกรรมของ 放っておく รูปพจนานุกรม おく ต่อกับ わけにはいかない',
    'As the person responsible, I cannot leave this problem unattended.','ในฐานะผู้รับผิดชอบ จะปล่อยปัญหานี้ไว้ไม่ได้');
  order('jo06','n3c19','この仕事では、',['通訳としての','経験が','役に立つ','ことが'],'多い。',1,
    'Use としての before a noun: 通訳としての経験. 役に立つことが多い means it is often useful.','ใช้ としての หน้าคำนาม: 通訳としての経験 ส่วน 役に立つことが多い คือมักเป็นประโยชน์',
    'In this job, experience as an interpreter is often useful.','ในงานนี้ ประสบการณ์ในฐานะล่ามมักเป็นประโยชน์');
  order('jo07','n2a03','詳しい日程が',['決まり','次第','参加者に','お知らせ'],'します。',2,
    '決まり is the stem for 次第. 参加者に marks the recipients; お知らせします is the promised action.','決まり เป็นฐานกริยาที่ต่อ 次第 ส่วน 参加者に คือผู้รับข้อมูล และ お知らせします เป็นการกระทำที่สัญญาไว้',
    'As soon as the detailed schedule is decided, we will inform the participants.','ทันทีที่กำหนดตารางอย่างละเอียดแล้ว จะแจ้งผู้เข้าร่วม');
  order('jo08','n2a25','有名な大学を',['出た','からといって','仕事ができる','とは'],'限らない。',2,
    '出たからといって sets up the rejected inference. 仕事ができる is the proposition qualified by とは限らない.','出たからといって ตั้งข้อสรุปที่กำลังปฏิเสธ ส่วน 仕事ができる เป็นข้อความที่ とは限らない จำกัดความ',
    'Graduating from a famous university does not necessarily mean being good at the job.','จบมหาวิทยาลัยดังไม่ได้แปลว่าจะทำงานเก่งเสมอไป');
  order('jo09','n2b02','実際に',['使って','みない','ことには','便利かどうか'],'分からない。',1,
    '使ってみる means try using. Its negative 使ってみない joins ことには; the following clause is negative.','使ってみる คือลองใช้ รูปปฏิเสธ 使ってみない ต่อกับ ことには และประโยคหลังเป็นปฏิเสธ',
    'Unless you actually try using it, you cannot know whether it is convenient.','ถ้าไม่ลองใช้จริง ก็ไม่รู้ว่าสะดวกหรือไม่');
  order('jo10','n2c13','予算が足りず、',['計画を','変更','せざるを','得ない'],'状況だ。',2,
    'する has the exceptional form せざる, not しざる. Keep せざるを得ない together before 状況.','する เปลี่ยนเป็น せざる เป็นข้อยกเว้น ไม่ใช่ しざる จับ せざるを得ない ไว้หน้าคำว่า 状況',
    'With an insufficient budget, we are in a situation where we have to change the plan.','งบไม่พอ จึงอยู่ในสถานการณ์ที่จำเป็นต้องเปลี่ยนแผน');
  order('jo11','n2d20','利用者の',['希望に応じて','内容を変更','することが','できます'],'。',1,
    '利用者の希望に応じて gives the standard for adjustment. Keep 変更する and ことができます connected.','利用者の希望に応じて ให้เกณฑ์การปรับ ต้องเชื่อม 変更する และ ことができます ให้ต่อกัน',
    'The content can be changed according to users’ wishes.','สามารถปรับเนื้อหาตามความต้องการของผู้ใช้ได้');
  order('jo12','n2b18','この催しは、',['子どもに','限らず','大人も','楽しめる'],'内容になっている。',2,
    '子どもに限らず expands the group. 大人も is the additional subject, and 楽しめる modifies 内容.','子どもに限らず ขยายกลุ่ม 大人も เป็นประธานที่เพิ่มเข้ามา และ 楽しめる ขยาย 内容',
    'This event offers content that adults as well as children can enjoy.','งานนี้มีเนื้อหาที่ไม่เพียงเด็ก แต่ผู้ใหญ่ก็สนุกได้');

  function passage(id,stem,items){
    items.forEach(function(q,index){JLPT_QUESTIONS.push({id:id+'-'+(index+1),passage:id,blank:index+1,gid:q.gid,kind:'text',stem:stem,
      options:q.options,answer:0,en:q.en,th:q.th,translation_en:q.te,translation_th:q.tt});});
  }
  passage('jt01','半年前、仕事のためにこの町へ引っ越してきた。まだ引っ越してきた【1】で、知り合いも少なかった。\nそこで週末の料理教室に参加した。最初は緊張したが、毎週通う【2】、少しずつ友達が増えた。今では週末が楽しみだ。',[
    {gid:'n3a02',options:[o('ばかり','The writer still considers the move recent after six months.','แม้ผ่านไปหกเดือน ผู้เขียนยังรู้สึกว่าเพิ่งย้ายมา'),o('ところ','The passage says six months ago, not the immediate moment after moving.','บทความบอกว่าหกเดือนก่อน ไม่ใช่จังหวะเพิ่งย้ายเสร็จ'),o('最中','The move is already complete.','การย้ายเสร็จไปแล้ว'),o('一方','This does not express the writer’s feeling of recency.','รูปนี้ไม่ได้บอกความรู้สึกว่าเพิ่งเกิด')],en:'Use the earlier time reference, 半年前. たばかり permits subjective recency.',th:'ใช้ข้อมูล 半年前 ตอนต้น たばかり บอกความรู้สึกว่าเพิ่งเกิดได้',te:'I had only recently moved and did not know many people.',tt:'รู้สึกว่าเพิ่งย้ายมา จึงยังรู้จักคนไม่มาก'},
    {gid:'n2h01',options:[o('うちに','Friendships developed gradually during repeated attendance.','มิตรภาพค่อย ๆ เกิดขึ้นระหว่างที่ไปเรียนเป็นประจำ'),o('前に','This puts the increase before attendance, contrary to the story.','ทำให้เพื่อนเพิ่มก่อนเข้าเรียน ขัดกับเรื่อง'),o('ために','This would make increasing friends a direct stated purpose; 増えた reports a developing result.','รูปนี้จะเน้นจุดประสงค์ แต่ 増えた รายงานผลที่ค่อย ๆ เกิดขึ้น'),o('かわりに','This means instead of attending, contradicting 毎週通う.','หมายถึงแทนการเข้าเรียน ขัดกับการไปทุกสัปดาห์')],en:'少しずつ and 今では show a change developing over time, the change sense of うちに.',th:'少しずつ และ 今では แสดงการเปลี่ยนที่ค่อย ๆ เกิดขึ้น เป็นอีกความหมายของ うちに',te:'As I kept attending every week, I gradually made more friends.',tt:'ระหว่างที่ไปทุกสัปดาห์ ก็ค่อย ๆ มีเพื่อนเพิ่มขึ้น'}
  ]);
  passage('jt02','来月、図書館で新しい読書会を始めます。参加できるのは学生だけではありません。学生【1】、社会人の方も歓迎します。\n開催日は現在調整中です。詳しい日程が決まり【2】、図書館のウェブサイトでお知らせします。',[
    {gid:'n2b18',options:[o('に限らず','The previous and following sentences both include non-students.','ทั้งประโยคก่อนและหลังรวมคนที่ไม่ใช่นักเรียนด้วย'),o('に限り','This restricts participation to students, contradicting the passage.','จำกัดเฉพาะนักเรียน ขัดกับบทความ'),o('に限って','This singles out students instead of widening eligibility.','เจาะจงนักเรียน ไม่ใช่ขยายผู้มีสิทธิ์'),o('に限ると','This means if restricted to students; it does not connect the inclusive announcement.','หมายถึงถ้าจำกัดแค่นักเรียน ไม่เข้ากับประกาศที่รวมทุกกลุ่ม')],en:'Read across sentences: 学生だけではありません and 社会人も both require inclusion.',th:'อ่านข้ามประโยค: 学生だけではありません และ 社会人も ต่างบอกว่ารวมกลุ่มอื่น',te:'Working adults, not only students, are welcome.',tt:'ยินดีต้อนรับทั้งคนทำงานและนักเรียน'},
    {gid:'n2a03',options:[o('次第','The schedule is not yet decided; the notice promises what will happen afterward.','ยังไม่กำหนดวันแน่นอน ประกาศสัญญาว่าจะทำอะไรทันทีหลังทราบ'),o('とたん','The connection is 決まったとたん, and it would not normally introduce this promise.','ต้องเป็น 決まったとたん และปกติไม่ตามด้วยคำสัญญานี้'),o('ながら','This describes simultaneous actions, not a later announcement after confirmation.','บอกทำพร้อมกัน ไม่ใช่แจ้งหลังยืนยันแล้ว'),o('つつ','This describes simultaneous actions, not the required as-soon-as procedure.','บอกทำพร้อมกัน ไม่ใช่ขั้นตอนทันทีที่ทราบ')],en:'調整中 tells you this is future planning. 決まり次第 + お知らせします is the sequence.',th:'調整中 บอกว่ายังเป็นแผนในอนาคต ลำดับคือ 決まり次第 แล้ว お知らせします',te:'As soon as the dates are decided, we will announce them on the library website.',tt:'ทันทีที่กำหนดวันได้แล้ว จะแจ้งบนเว็บไซต์ห้องสมุด'}
  ]);
  passage('jt03','料理教室の先生に、パン作りを教わった。説明を一度聞いた【1】、一人ではうまく作れなかった。\nしかし、先生は失敗した理由を一緒に考え、何度も練習に付き合ってくれた。その【2】、今では自分でおいしく焼ける。本当にありがたい。',[
    {gid:'n2a20',options:[o('ものの','Hearing the explanation did not bring the expected successful result.','แม้ฟังคำอธิบายแล้ว แต่ผลสำเร็จที่คาดยังไม่เกิด'),o('おかげで','This would thank the explanation for the failure.','จะกลายเป็นขอบคุณคำอธิบายที่ทำให้ล้มเหลว'),o('上は','This would lead to an obligation or resolve, not a failed result.','มักตามด้วยหน้าที่หรือความตั้งใจ ไม่ใช่ผลที่ล้มเหลว'),o('たびに','一度 and the single failed attempt do not describe a repeated every-time relation.','一度 และการลองครั้งนั้นไม่ได้บอกความสัมพันธ์ที่เกิดทุกครั้ง')],en:'The first attempt contrasts with the expected result of hearing an explanation.',th:'ความพยายามครั้งแรกขัดกับผลที่คาดจากการได้ฟังคำอธิบาย',te:'Although I heard the explanation once, I could not make it well on my own.',tt:'แม้ฟังคำอธิบายแล้วครั้งหนึ่ง แต่ทำเองยังไม่สำเร็จ'},
    {gid:'n3a14',options:[o('おかげで','その points back to the teacher’s repeated help; the ending expresses thanks.','その ชี้กลับไปที่ความช่วยเหลือหลายครั้ง และตอนท้ายขอบคุณ'),o('せいで','This would blame the helpful teacher, conflicting with 本当にありがたい.','จะกลายเป็นโทษอาจารย์ที่ช่วย ขัดกับ 本当にありがたい'),o('かわりに','This expresses exchange or substitution, not the helpful cause.','บอกการแลกเปลี่ยนหรือแทนกัน ไม่ใช่สาเหตุที่ช่วยให้สำเร็จ'),o('わりに','This signals a result unexpected relative to a standard, not the gratitude here.','บอกผลที่ผิดคาดเมื่อเทียบเกณฑ์ ไม่ใช่ความขอบคุณตรงนี้')],en:'Resolve その using the previous sentence: the help is the cause being credited.',th:'อ่าน その โดยย้อนประโยคก่อน: ความช่วยเหลือคือสาเหตุที่กำลังยกความดีให้',te:'Thanks to that help, I can now bake it deliciously on my own.',tt:'เพราะความช่วยเหลือนั้น ตอนนี้จึงอบให้อร่อยได้เอง'}
  ]);
  passage('jt04','新しい学習アプリを選ぶとき、私は広告だけで決めない。有名だからといって、自分に合う【1】からだ。\nまず無料版を使ってみる。実際に試してみない【2】、毎日続けられるかどうか分からないと思う。',[
    {gid:'n3b09',options:[o('わけではない','The writer rejects the inference that popularity guarantees personal fit.','ผู้เขียนปฏิเสธข้อสรุปว่ามีชื่อเสียงแล้วจะเหมาะกับตนเสมอ'),o('わけがない','This would insist that a famous app cannot suit the writer at all.','จะยืนยันว่าแอปดังไม่มีทางเหมาะกับผู้เขียนเลย'),o('に違いない','This asserts confidence that it suits the writer, contradicting the doubt.','มั่นใจว่าเหมาะ ขัดกับความสงสัยในเรื่อง'),o('はずだ','This expects suitability, contrary to rejecting advertisement-based judgments.','คาดว่าต้องเหมาะ ขัดกับการไม่ตัดสินตามโฆษณา')],en:'The next paragraph recommends trying it: the claim is uncertainty, not impossibility.',th:'ย่อหน้าต่อไปแนะนำให้ลอง จึงเป็นความไม่แน่นอน ไม่ใช่ไม่มีทางเหมาะ',te:'Being famous does not mean it necessarily suits me.',tt:'มีชื่อเสียงไม่ได้แปลว่าจะเหมาะกับฉันเสมอไป'},
    {gid:'n2b02',options:[o('ことには','A trial is a necessary condition before the writer can judge.','ต้องลองก่อนจึงจะตัดสินได้'),o('うちに','This means before trying, but the conclusion says judgment needs a trial.','หมายถึงก่อนลอง แต่ข้อสรุปบอกว่าต้องลองก่อน'),o('かわりに','This means instead of trying, the opposite of the recommendation.','หมายถึงแทนการลอง ตรงข้ามกับคำแนะนำ'),o('ままに','This does not create the unless-condition required by 分からない.','ไม่สร้างเงื่อนไขถ้าไม่…ก็…ไม่ได้ ที่ 分からない ต้องการ')],en:'試してみないことには matches the negative result 分からない and explains the free trial.',th:'試してみないことには เข้ากับผลปฏิเสธ 分からない และอธิบายเหตุผลที่ลองเวอร์ชันฟรี',te:'Unless I actually try it, I cannot tell whether I can keep using it daily.',tt:'ถ้าไม่ลองจริง ก็ไม่รู้ว่าจะใช้ต่อทุกวันได้หรือไม่'}
  ]);
  passage('jt05','【市民センターからのお知らせ】\n設備の点検【1】、明日は全館を休館いたします。ご不便をおかけしますが、ご理解ください。\n来週からは新しい運動教室も始まります。経験や体力には個人差があるため、一人一人の体力【2】運動の量を調整します。初めての方も安心してご参加ください。',[
    {gid:'n2f18',options:[o('につき','A formal notice gives an administrative reason for closure.','ประกาศทางการให้เหตุผลในการปิดอาคาร'),o('を問わず','This means regardless of inspection, not because of it.','หมายถึงไม่ว่าจะตรวจหรือไม่ ไม่ใช่เพราะการตรวจ'),o('に限らず','This adds more categories, not a reason for closure.','เพิ่มหมวดอื่น ไม่ได้บอกเหตุผลที่ปิด'),o('に応じて','This means adjusting according to inspection, not the notice’s reason.','หมายถึงปรับตามการตรวจ ไม่ใช่เหตุผลในประกาศ')],en:'The genre and following closure notice favor noun + につき.',th:'รูปแบบประกาศและประโยคปิดอาคารที่ตามมา ใช้คำนาม + につき',te:'The entire building will close tomorrow for equipment inspection.',tt:'พรุ่งนี้ปิดทั้งอาคารเนื่องจากตรวจสอบอุปกรณ์'},
    {gid:'n2d20',options:[o('に応じて','The preceding sentence explains why the amount must be tailored individually.','ประโยคก่อนอธิบายว่าทำไมต้องปรับปริมาณเฉพาะแต่ละคน'),o('にかかわらず','This ignores individual strength, contradicting the stated reason.','ไม่คำนึงถึงกำลังแต่ละคน ขัดกับเหตุผลที่ระบุ'),o('に反して','This means against individual strength, not accommodating it.','หมายถึงสวนทางกับกำลัง ไม่ใช่ปรับให้เหมาะ'),o('を除いて','This excludes strength instead of using it as a standard.','ตัดกำลังออกจากการพิจารณา แทนที่จะใช้เป็นเกณฑ์')],en:'個人差 and 調整 together identify an adjustment to each person’s needs.',th:'個人差 และ 調整 บอกว่าปรับให้เหมาะกับแต่ละคน',te:'We will adjust the amount of exercise according to each person’s strength.',tt:'จะปรับปริมาณการออกกำลังกายตามกำลังของแต่ละคน'}
  ]);
  passage('jt06','祖母が初めてスマートフォンを買った。最初は電話をかけるのも難しそうだったが、毎日練習し、今では写真も送れる【1】。\n昨日、祖母から「返事が遅くなってごめんね」と言われた。私は「急いで返事をする【2】よ。時間があるときに送ってね」と答えた。',[
    {gid:'n3b11',options:[o('ようになった','The passage moves from difficulty to a new ability through practice.','เรื่องเปลี่ยนจากทำลำบากเป็นความสามารถใหม่จากการฝึก'),o('ことにした','This is a decision, not the acquired ability shown by 送れる.','เป็นการตัดสินใจ ไม่ใช่ความสามารถที่ 送れる แสดง'),o('つもりだった','This describes a past intention, not her present ability.','เป็นความตั้งใจในอดีต ไม่ใช่ความสามารถตอนนี้'),o('わけがない','This denies the new ability, contradicting 今では and practice.','ปฏิเสธความสามารถใหม่ ขัดกับ 今では และการฝึก')],en:'Track the change from 最初 to 今では; 送れる is potential.',th:'ตามการเปลี่ยนจาก 最初 ไป 今では และ 送れる เป็นรูปสามารถ',te:'She has now become able to send photos too.',tt:'ตอนนี้คุณยายส่งรูปได้แล้วด้วย'},
    {gid:'n2c22',options:[o('ことはない','The next sentence gives permission to reply when convenient, so there is no need to hurry.','ประโยคถัดไปให้ตอบเมื่อสะดวก จึงไม่จำเป็นต้องรีบ'),o('しかない','This insists that hurrying is the only option, contradicting the reassurance.','ยืนยันว่ามีแต่ต้องรีบ ขัดกับการปลอบ'),o('べきだ','This says she should hurry, contrary to 時間があるとき.','บอกว่าควรรีบ ขัดกับให้ทำเมื่อมีเวลา'),o('に違いない','This predicts that she will hurry instead of reassuring her.','คาดว่าเธอจะรีบ ไม่ใช่ปลอบว่าไม่ต้องรีบ')],en:'Use the following sentence as evidence: 時間があるとき removes urgency.',th:'ใช้ประโยคถัดไปเป็นหลักฐาน: 時間があるとき บอกว่าไม่เร่งด่วน',te:'There is no need to reply in a hurry; send it when you have time.',tt:'ไม่จำเป็นต้องรีบตอบ ส่งมาเมื่อมีเวลาก็ได้'}
  ]);
  passage('jt07','来週から旅行に出る。ずっと行きたかった町なので、体が元気な【1】、自分の足でゆっくり歩いてみたい。\n一週間家を空けるため、庭の花が心配だ。そこで友人にお願いした。私が留守にしている【2】、一度だけ花に水をやりに来てくれるそうだ。',[
    {gid:'n3a03',options:[o('うちに','The writer wants to use the opportunity while still healthy.','ผู้เขียนอยากใช้โอกาสตอนที่ยังแข็งแรง'),o('たびに','This means every time healthy, not before the opportunity is lost.','หมายถึงทุกครั้งที่แข็งแรง ไม่ใช่ก่อนหมดโอกาส'),o('ために','This gives a purpose/reason, not the limited opportunity conveyed here.','บอกจุดประสงค์หรือเหตุผล ไม่ใช่ช่วงโอกาสที่ยังเหลือ'),o('ように','This would create “so that I am healthy,” not while still healthy.','จะหมายถึงเพื่อให้แข็งแรง ไม่ใช่ตอนที่ยังแข็งแรง')],en:'元気なうちに focuses on using a condition that will not necessarily last forever.',th:'元気なうちに เน้นใช้โอกาสจากสภาพที่อาจไม่ได้คงอยู่ตลอดไป',te:'While I am healthy, I want to walk around the town on my own feet.',tt:'ตอนยังแข็งแรง อยากเดินชมเมืองด้วยตัวเอง'},
    {gid:'n3a04',options:[o('間に','A single watering visit happens within the week away.','มารดน้ำหนึ่งครั้งภายในสัปดาห์ที่ไม่อยู่'),o('間','This usually calls for an activity throughout the absence, conflicting with 一度だけ.','มักบอกกิจกรรมตลอดช่วงที่ไม่อยู่ ขัดกับ 一度だけ'),o('たびに','This would make it a repeated action on each absence, rather than one future trip.','เป็นการทำซ้ำทุกครั้งที่ไม่อยู่ ไม่ใช่ทริปครั้งนี้'),o('前に','This puts the visit before the absence, rather than during the time when the flowers need care.','ทำให้มาเยี่ยมก่อนไม่อยู่ แทนที่จะมาในช่วงที่ดอกไม้ต้องการคนดูแล')],en:'一度だけ is crucial: an event occurs within a time span → 間に.',th:'一度だけ สำคัญ: เกิดเหตุการณ์หนึ่งครั้งในช่วงเวลา จึงใช้ 間に',te:'My friend will come just once to water the flowers while I am away.',tt:'เพื่อนจะมารดน้ำให้หนึ่งครั้งตอนที่ฉันไม่อยู่'}
  ]);
  passage('jt08','先月、私は毎朝バスで通勤するのをやめて、自転車を使う【1】。運動不足が気になって、自分でそう決めた。\nただ、毎日必ず自転車に乗る【2】。雨の日は今までどおりバスを使っている。無理をせずに続けたいからだ。',[
    {gid:'n3b13',options:[o('ことにした','The next sentence explicitly says the writer made the decision.','ประโยคถัดไปบอกชัดว่าผู้เขียนตัดสินใจเอง'),o('ことにされた','This suggests someone imposed the decision, conflicting with 自分で.','เหมือนคนอื่นกำหนดให้ ขัดกับ 自分で'),o('ようにしていた','This describes an earlier maintained habit, rather than the decision made last month.','เป็นนิสัยที่พยายามทำอยู่ก่อน ไม่ใช่การตัดสินใจเมื่อเดือนก่อน'),o('ところだった','This places the action just about to happen, not a lasting choice.','บอกจังหวะกำลังจะทำ ไม่ใช่การเลือกที่ใช้ต่อไป')],en:'自分でそう決めた makes the decision-maker explicit: ことにした.',th:'自分でそう決めた ระบุคนตัดสินใจชัด จึงใช้ ことにした',te:'I decided to commute by bicycle instead of the bus.',tt:'ฉันตัดสินใจเดินทางไปทำงานด้วยจักรยานแทนรถเมล์'},
    {gid:'n3b09',options:[o('わけではない','Rainy days provide an exception to the claim “every day without fail.”','วันที่ฝนตกเป็นข้อยกเว้นของคำว่าใช้ทุกวันแน่นอน'),o('わけだ','This would conclude that the writer rides every single day, contradicted by rainy-day bus trips.','จะสรุปว่าผู้เขียนขี่ทุกวันแน่นอน ขัดกับที่ใช้รถเมล์ในวันฝนตก'),o('しかない','This says there is no alternative, contradicted by the bus on rainy days.','หมายถึงไม่มีทางเลือกอื่น ขัดกับที่ขึ้นรถเมล์วันฝนตก'),o('べきだ','This recommends riding every day, contrary to the flexible routine described.','แนะนำให้ขี่ทุกวัน ขัดกับกิจวัตรที่ยืดหยุ่นในเรื่อง')],en:'ただ introduces a limitation, and the next sentence gives the exception.',th:'ただ บอกข้อจำกัด และประโยคถัดไปให้ข้อยกเว้น',te:'It is not that I ride my bicycle every single day.',tt:'ไม่ได้หมายความว่าขี่จักรยานทุกวันโดยไม่มีข้อยกเว้น'}
  ]);
})();
