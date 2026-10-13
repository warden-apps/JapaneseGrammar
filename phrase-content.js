/* Original, reusable model phrases. These are teaching choices, not corpus
   frequency rankings. The rest of the library uses its existing examples. */
var PHRASE_MODELS={};
(function(){
  function add(id,rows){PHRASE_MODELS[id]=rows.map(function(r){return {label_en:r[0],label_th:r[1],chunk:r[2],j:r[3],e:r[4],t:r[5]};});}
  add('n3a07',[
    ['Before / when doing','ก่อนทำ / เมื่อจะทำ','利用する際に','このサービスを利用する際に、登録が必要です。','You need to register when using this service.','เมื่อจะใช้บริการนี้ จำเป็นต้องลงทะเบียน'],
    ['After / on that occasion','เมื่อทำแล้ว / ในโอกาสนั้น','訪れた際に','京都を訪れた際に、この写真を撮りました。','I took this photo when I visited Kyoto.','ถ่ายรูปนี้ตอนที่ไปเยือนเกียวโต'],
    ['With a noun','ใช้กับคำนาม','申し込みの際に','申し込みの際に、住所を確認してください。','Please check your address when applying.','ตอนสมัคร กรุณาตรวจสอบที่อยู่']
  ]);
  add('n3a01',[
    ['About to','กำลังจะ','食べるところ','今から昼ご飯を食べるところです。','I am just about to have lunch.','กำลังจะกินมื้อเที่ยงพอดี'],
    ['Right now','กำลังทำอยู่','食べているところ','今、昼ご飯を食べているところです。','I am having lunch right now.','ตอนนี้กำลังกินมื้อเที่ยงอยู่'],
    ['Just finished','เพิ่งทำเสร็จ','食べたところ','ちょうど昼ご飯を食べたところです。','I have just finished lunch.','เพิ่งกินมื้อเที่ยงเสร็จพอดี']
  ]);
  add('n2a01',[
    ['Starting something','เมื่อเริ่มทำ','入学するに際して','入学するに際して、必要な書類をそろえた。','Before starting school, I gathered the required documents.','ก่อนเข้าเรียน ได้เตรียมเอกสารที่จำเป็นให้ครบ'],
    ['An occasion','โอกาสสำคัญ','出発に際して','出発に際して、皆様にお礼を申し上げます。','As we depart, I would like to thank everyone.','ในโอกาสที่จะออกเดินทาง ขอขอบคุณทุกท่าน']
  ]);
  add('n2a02',[
    ['Before doing','ก่อนทำ','出発するに先立って','出発するに先立って、天気を確認した。','Before departing, I checked the weather.','ก่อนออกเดินทาง ได้ตรวจสอบสภาพอากาศ'],
    ['Before an event','ก่อนเหตุการณ์','会議に先立って','会議に先立って、資料を配ります。','We will hand out the materials before the meeting.','จะแจกเอกสารก่อนการประชุม']
  ]);
  add('n2a03',[
    ['As soon as ready','ทันทีที่พร้อม','分かり次第','詳しいことが分かり次第、ご連絡します。','I will contact you as soon as I know the details.','ทราบรายละเอียดเมื่อไร จะติดต่อไปทันที'],
    ['As soon as finished','ทันทีที่เสร็จ','終わり次第','会議が終わり次第、そちらに向かいます。','I will head over as soon as the meeting ends.','ประชุมเสร็จเมื่อไร จะไปหาทันที']
  ]);
  add('n2a04',[
    ['It depends on…','ขึ้นอยู่กับ…','天気次第','明日の予定は天気次第です。','Tomorrow’s plans depend on the weather.','แผนพรุ่งนี้ขึ้นอยู่กับสภาพอากาศ'],
    ['Depending on…','แล้วแต่…','結果次第で','試験の結果次第で、進路を決めます。','I will decide my next step depending on the exam results.','จะตัดสินใจเส้นทางต่อไปตามผลสอบ']
  ]);
  add('n2a05',[
    ['Do this first','ต้องทำสิ่งนี้ก่อน','確認してからでないと','予定を確認してからでないと、返事ができません。','I cannot answer until I check my schedule.','ต้องเช็กตารางก่อน จึงจะตอบได้'],
    ['Try it first','ต้องลองก่อน','使ってからでないと','実際に使ってからでないと、よさは分からない。','You cannot appreciate it until you actually try it.','ต้องลองใช้จริงก่อน จึงจะรู้ว่าดีอย่างไร']
  ]);
  add('n2a06',[
    ['Almost simultaneous','แทบจะพร้อมกัน','座るか座らないかのうちに','彼は座るか座らないかのうちに、眠ってしまった。','He fell asleep almost before he had sat down.','เขานั่งลงแทบไม่ทัน ก็หลับไปแล้ว'],
    ['Barely finished','แทบจะทันที','終わるか終わらないかのうちに','授業が終わるか終わらないかのうちに、学生たちは教室を出た。','The students left almost before class had ended.','คาบเรียนแทบยังไม่ทันจบ นักศึกษาก็ออกจากห้องแล้ว']
  ]);
  add('n2a07',[
    ['A sudden switch','เปลี่ยนฉับพลัน','泣いたかと思ったら','子どもは泣いたかと思ったら、もう笑っている。','The child was crying a moment ago and is already laughing.','เด็กเพิ่งร้องไห้อยู่แท้ ๆ ตอนนี้กลับหัวเราะแล้ว'],
    ['Quick change','เปลี่ยนอย่างรวดเร็ว','やんだかと思うと','雨がやんだかと思うと、また降り出した。','Just when the rain seemed to stop, it started again.','ฝนเพิ่งหยุดได้ครู่เดียว ก็ตกอีกแล้ว']
  ]);
  add('n2a08',[
    ['Ever since','ตั้งแต่…มาตลอด','日本に来て以来','日本に来て以来、毎日日本語を使っています。','I have used Japanese every day since coming to Japan.','ตั้งแต่มาญี่ปุ่น ก็ใช้ภาษาญี่ปุ่นทุกวัน'],
    ['Since meeting','ตั้งแต่ได้พบ','会って以来','初めて会って以来、ずっと友達です。','We have been friends ever since we first met.','เป็นเพื่อนกันมาตั้งแต่พบกันครั้งแรก']
  ]);
  add('n2a09',[
    ['After checking','หลังจากตรวจสอบ','確認した上で','内容を確認した上で、署名してください。','Please sign after checking the contents.','กรุณาตรวจสอบเนื้อหาก่อน แล้วจึงลงชื่อ'],
    ['For doing something','ในการทำบางอย่าง','生活する上で','日本で生活する上で、日本語は役に立ちます。','Japanese is useful for living in Japan.','ภาษาญี่ปุ่นมีประโยชน์ในการใช้ชีวิตที่ญี่ปุ่น']
  ]);
  add('n2a10',[
    ['An interruption','มีเรื่องเข้ามาพอดี','出かけようとしているところに','出かけようとしているところに、電話がかかってきた。','A call came just as I was about to leave.','กำลังจะออกไปพอดี ก็มีโทรศัพท์เข้ามา'],
    ['Someone arrives','มีคนมาพอดี','困っているところへ','道に迷って困っているところへ、友達が来た。','A friend arrived while I was lost and stuck.','ตอนกำลังหลงทางและไม่รู้จะทำอย่างไร เพื่อนก็มาพอดี']
  ]);
  add('n2a11',[
    ['An unfortunate ending','ลงเอยไม่ดี','迷ったあげく','さんざん迷ったあげく、何も買わなかった。','After a lot of indecision, I ended up buying nothing.','ลังเลอยู่นาน สุดท้ายก็ไม่ได้ซื้ออะไรเลย'],
    ['After a struggle','หลังผ่านความลำบาก','苦労のあげく','苦労のあげく、計画は中止になった。','After all that effort, the plan was cancelled.','ลำบากมาตั้งมาก สุดท้ายแผนก็ถูกยกเลิก']
  ]);
  add('n2a12',[
    ['A considered decision','หลังคิดอย่างรอบคอบ','考えた末に','よく考えた末に、留学することにした。','After thinking it through, I decided to study abroad.','หลังคิดอย่างรอบคอบ ก็ตัดสินใจไปเรียนต่างประเทศ'],
    ['After discussion','หลังการหารือ','話し合いの末に','長い話し合いの末に、結論が出た。','After a long discussion, we reached a conclusion.','หลังหารือกันอยู่นาน ในที่สุดก็ได้ข้อสรุป']
  ]);
  add('n2a13',[
    ['An overwhelming feeling','รู้สึกมากเกินไปจน','緊張のあまり','緊張のあまり、名前を忘れてしまった。','I was so nervous that I forgot the name.','ประหม่ามากจนลืมชื่อไปเลย'],
    ['An extreme degree','มากจนเกินไป','あまりの暑さに','あまりの暑さに、外に出る気がしない。','It is so hot that I do not feel like going outside.','ร้อนมากจนไม่อยากออกไปข้างนอก']
  ]);
  add('n2a14',[
    ['One regrettable cause','เพราะเหตุเดียวที่น่าเสียดาย','忘れたばかりに','鍵を忘れたばかりに、家に入れなかった。','Just because I forgot my key, I could not get inside.','เพียงเพราะลืมกุญแจ ก็เข้าบ้านไม่ได้'],
    ['A quality causes trouble','คุณสมบัติที่กลับสร้างปัญหา','正直なばかりに','正直なばかりに、損をすることもある。','Sometimes being honest is the very thing that puts you at a disadvantage.','บางครั้งก็เสียเปรียบเพียงเพราะเป็นคนซื่อสัตย์']
  ]);
  add('n2a15',[
    ['All the more disappointing','ยิ่งผิดหวัง','楽しみにしていただけに','楽しみにしていただけに、中止は残念です。','The cancellation is all the more disappointing because I was looking forward to it.','เพราะตั้งตารอมาก พอยกเลิกจึงยิ่งเสียดาย'],
    ['Exactly because','ก็เพราะ…จึงยิ่ง','専門家だけに','彼は専門家だけに、説明が分かりやすい。','Precisely because he is an expert, his explanations are easy to understand.','เพราะเขาเป็นผู้เชี่ยวชาญ จึงอธิบายได้เข้าใจง่าย']
  ]);
  add('n2a16',[
    ['Knowing that person','เพราะรู้จักนิสัยคนนั้น','彼のことだから','まじめな彼のことだから、きっと約束を守るだろう。','Knowing how serious he is, I am sure he will keep his promise.','เขาเป็นคนจริงจังขนาดนั้น คงรักษาสัญญาแน่'],
    ['A familiar habit','นิสัยที่รู้อยู่แล้ว','母のことだから','心配性の母のことだから、何度も電話してくるだろう。','Knowing how much my mother worries, she will probably call repeatedly.','แม่เป็นคนขี้ห่วง คงโทรมาหลายรอบแน่']
  ]);
  add('n2a17',[
    ['A commitment','เมื่อรับปากแล้ว','約束した以上','約束した以上、最後までやります。','Since I promised, I will see it through.','ในเมื่อรับปากแล้ว ก็จะทำจนจบ'],
    ['Given your role','ในเมื่ออยู่ในฐานะนี้','学生である以上','学生である以上、勉強をおろそかにはできない。','As a student, I cannot neglect my studies.','ในเมื่อเป็นนักเรียน ก็ละเลยการเรียนไม่ได้']
  ]);
  add('n2a18',[
    ['A possible problem','อาจเกิดปัญหา','遅れるおそれがある','大雪で電車が遅れるおそれがあります。','Heavy snow may cause train delays.','หิมะตกหนักอาจทำให้รถไฟล่าช้า'],
    ['A risk','ความเสี่ยง','故障のおそれがある','そのまま使うと、故障のおそれがあります。','Continuing to use it like that may cause a breakdown.','หากใช้ต่อไปแบบนั้น อาจทำให้เครื่องเสียได้']
  ]);
  add('n2a19',[
    ['Despite a fact','ทั้งที่มีข้อเท็จจริงนี้','雨にもかかわらず','雨にもかかわらず、大勢の人が集まった。','Despite the rain, many people gathered.','ทั้งที่ฝนตก ก็มีคนมารวมตัวกันมากมาย'],
    ['Despite doing','ทั้งที่ทำแล้ว','注意したにもかかわらず','何度も注意したにもかかわらず、彼は同じ間違いをした。','Although he had been warned repeatedly, he made the same mistake.','ทั้งที่เตือนหลายครั้ง เขาก็ยังทำผิดแบบเดิม']
  ]);
  add('n2a20',[
    ['Although I did','ทำแล้วก็จริง แต่…','買ったものの','本を買ったものの、まだ読んでいない。','I bought the book, but I have not read it yet.','ซื้อหนังสือมาแล้วก็จริง แต่ยังไม่ได้อ่าน'],
    ['Although it is','เป็นแบบนั้นก็จริง แต่…','便利なものの','このアプリは便利なものの、使い方が難しい。','This app is useful, but it is difficult to use.','แอปนี้สะดวกก็จริง แต่วิธีใช้ยาก']
  ]);
})();
