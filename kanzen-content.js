/* Original teaching material. The publisher's contents establishes TOPIC scope,
   not a licence to reproduce the book, nor verification of its full 211-item index. */
var KANZEN_AUDIT={date:'2026-10-11',isbn:'9784883195657',publisher:'https://www.3anet.co.jp/np/books/3602/',
  fullIndexVerified:false,advertisedForms:211,chapter21Source:'User-supplied checklist; omitted from the publisher web contents',
  scope:'Chapters 1–26 and the supplied supplements; all 22 later topic headings have original support lessons. Full printed index and every textbook explanation remain unverified.'};
var KANZEN_SKILLS=[];
var KANZEN_CUES={};
(function(){
  function example(x){return {j:x[0],k:x[1],e:x[2],t:x[3]};}
  function skill(n,section,label,p,en,th,cue,cueth,watch,watchth,examples,links){
    var id='n2k'+String(n).padStart(2,'0'),ex=examples.map(example);
    GRAMMAR.push({id:id,lv:'N2',cat:'N2 文の組み立て・文脈',p:p,conn:ex[0].j,se:en,st:th,en:en,th:th,note_en:watch,note_th:watchth,ex:ex,bookSkill:true});SHORT[id]=[en,th];
    LESSON_GUIDES[id]={meaning_en:en,meaning_th:th,cue_en:cue,cue_th:cueth,forms:[],example:ex[0],watch_en:watch,watch_th:watchth,compare:[]};
    KANZEN_SKILLS.push({id:id,section:section,label:label,title_en:en,title_th:th,links:links});
    KANZEN_CUES[id]=[cue,cueth];
  }
  skill(1,'organize','A','元の動詞と文法表現','Recognize the verb inside a grammar expression.','จำกริยาต้นทางในสำนวนไวยากรณ์',
    'A familiar verb can become a relation: 沿う → に沿って. Check what it connects.','กริยาที่คุ้นเคยอาจกลายเป็นคำเชื่อมความสัมพันธ์ เช่น 沿う → に沿って',
    'The original verb is a memory aid, not a complete definition. に沿って follows a route or policy; に基づいて uses evidence or a rule as a basis. Before a noun, use forms such as 方針に沿った計画 and 調査に基づく報告.',
    'กริยาต้นทางช่วยจำ แต่ไม่ใช่นิยามทั้งหมด に沿って คือไปตามทางหรือแนวทาง ส่วน に基づいて ใช้ข้อมูลหรือกฎเป็นฐาน ขยายนามใช้เช่น 方針に沿った計画 และ 調査に基づく報告',
    [['方針に沿って、計画を立てた。','ほうしんにそって、けいかくをたてた。','We made a plan in line with the policy.','วางแผนให้สอดคล้องกับนโยบาย'],['調査に基づく報告を読んだ。','ちょうさにもとづくほうこくをよんだ。','I read a report based on an investigation.','อ่านรายงานที่อ้างอิงจากการสำรวจ']],['n2b08','n2b09','n2d20']);
  skill(2,'organize','B','「いう・する」の働き','Separate quotation, naming and hypothetical framing.','แยกการอ้างคำพูด การเรียกชื่อ และการสมมติ',
    'という can label content; とすると can set an assumption. Neither always describes literal speech or action.','という ใช้ระบุชื่อหรือเนื้อหา ส่วน とすると ใช้ตั้งสมมติฐาน ไม่ได้แปลว่าพูดหรือทำตรง ๆ เสมอ',
    'Compare 花という店 (a shop called Hana), 行かないということだ (report or interpretation), and 行くとすると (supposing we go). Read the whole construction before translating いう or する.',
    'เทียบ 花という店 คือร้านชื่อฮานะ 行かないということだ อาจเป็นการรายงานหรือสรุป และ 行くとすると คือสมมติว่าจะไป ต้องอ่านทั้งสำนวนก่อนแปล いう หรือ する',
    [['「空」という店で昼ご飯を食べた。','「そら」というみせでひるごはんをたべた。','I had lunch at a shop called Sora.','กินมื้อกลางวันที่ร้านชื่อโซระ'],['電車で行くとすると、何時に出ればいいですか。','でんしゃでいくとすると、なんじにでればいいですか。','If we go by train, what time should we leave?','สมมติว่าไปโดยรถไฟ ควรออกกี่โมง']],['n3c08','n3a25','n2f28']);
  skill(3,'organize','C','古い否定・助言の形','Decode older forms that survive in modern grammar.','อ่านรูปเก่าที่ยังอยู่ในไวยากรณ์ปัจจุบัน',
    'ず / ぬ usually carry negative meaning; べき gives a norm; まい needs context.','ず / ぬ มักเป็นปฏิเสธ べき บอกสิ่งที่ควรทำ ส่วน まい ต้องดูบริบท',
    '行かず ≈ 行かないで; 知らぬ ≈ 知らない. する becomes せず and せざるを得ない, not しざる. べき is related to older べし. まい can be a negative prediction or a decision not to act.',
    '行かず ใกล้กับ 行かないで และ 知らぬ คือ 知らない ส่วน する เปลี่ยนเป็น せず และ せざるを得ない ไม่ใช่ しざる รูป べき มาจาก べし และ まい อาจเป็นการคาดว่าไม่หรือความตั้งใจว่าจะไม่',
    [['何も言わずに、部屋を出た。','なにもいわずに、へやをでた。','I left the room without saying anything.','ออกจากห้องโดยไม่พูดอะไร'],['予定を変更せざるを得ない。','よていをへんこうせざるをえない。','We have no choice but to change the plan.','ไม่มีทางเลือกนอกจากเปลี่ยนแผน']],['n3e04','n2f36','n3b30','n2c20','n2c13']);
  skill(4,'organize','D','もの・ことを見分ける','Choose the whole expression, not just もの or こと.','เลือกจากสำนวนทั้งชุด ไม่ใช่ดูแค่ もの หรือ こと',
    'ものだ can state a general truth; ことだ can advise one person. The verb ending changes the job.','ものだ อาจบอกหลักทั่วไป ส่วน ことだ อาจแนะนำเฉพาะคน รูปกริยาที่เชื่อมทำให้หน้าที่เปลี่ยน',
    'Do not assign one English word to every もの or こと. Contrast よく遊んだものだ (memory), 無理をしないことだ (advice), and 無理をすることはない (no need). Each complete ending has its own function.',
    'อย่าแปล もの หรือ こと เหมือนกันทุกครั้ง เทียบ よく遊んだものだ คือความทรงจำ 無理をしないことだ คือคำแนะนำ และ 無理をすることはない คือไม่จำเป็นต้องฝืน แต่ละสำนวนทำหน้าที่ต่างกัน',
    [['昔は、この公園でよく遊んだものだ。','むかしは、このこうえんでよくあそんだものだ。','I used to play in this park a lot.','เมื่อก่อนเคยเล่นที่สวนนี้บ่อย ๆ'],['疲れているなら、無理をしないことだ。','つかれているなら、むりをしないことだ。','If you are tired, you should not push yourself.','ถ้าเหนื่อยก็ไม่ควรฝืนตัวเอง']],['n3c25','n2c21','n2c22','n2h10','n2h12']);
  skill(5,'organize','E','わけ・ところを見分ける','Track logic with わけ and stages or circumstances with ところ.','ใช้ わけ ดูเหตุผล และ ところ ดูจังหวะหรือสถานการณ์',
    'Move the negative and you change the logic: 行くわけにはいかない ≠ 行かないわけにはいかない.','ย้ายตำแหน่งปฏิเสธแล้วความหมายเปลี่ยน: 行くわけにはいかない ไม่เหมือน 行かないわけにはいかない',
    'わけだ draws a conclusion; わけがない rejects a possibility; わけではない limits a claim. ところだ describes a stage, たところ introduces a discovered result, and どころではない says circumstances do not allow it.',
    'わけだ ใช้สรุป わけがない บอกว่าเป็นไปไม่ได้ わけではない จำกัดคำกล่าว ส่วน ところだ บอกจังหวะ たところ บอกผลที่พบ และ どころではない คือสถานการณ์ไม่เอื้อให้ทำ',
    [['約束したので、行かないわけにはいかない。','やくそくしたので、いかないわけにはいかない。','I promised, so I have to go.','สัญญาไว้แล้ว จึงจำเป็นต้องไป'],['今、出かけるところです。','いま、でかけるところです。','I am just about to go out.','กำลังจะออกไปพอดี']],['n3b08','n3b09','n3c06','n2c14','n3a01','n3c33']);
  skill(6,'organize','F','対になる表現・助詞','Read paired expressions as a single frame.','อ่านสำนวนคู่เป็นโครงเดียวกัน',
    'Look for the partner: さえ…ば, にせよ…にせよ, ようか…まいか.','มองหาคู่ของมัน เช่น さえ…ば にせよ…にせよ และ ようか…まいか',
    'The repeated endings organize alternatives, emphasis or conditions. 行くにせよ行かないにせよ covers both choices; 行こうか行くまいか describes hesitation. さえ can also mean even without a conditional ending.',
    'ส่วนท้ายที่เป็นคู่จัดทางเลือก เน้น หรือบอกเงื่อนไข 行くにせよ行かないにせよ ครอบคลุมทั้งไปและไม่ไป ส่วน 行こうか行くまいか คือลังเล และ さえ ถ้าไม่มีเงื่อนไขก็อาจแปลว่าแม้แต่',
    [['参加するにせよ、しないにせよ、今日中に知らせてください。','さんかするにせよ、しないにせよ、きょうじゅうにしらせてください。','Whether you join or not, please let us know today.','จะเข้าร่วมหรือไม่ก็ตาม กรุณาแจ้งภายในวันนี้'],['住所さえ分かれば、送れます。','じゅうしょさえわかれば、おくれます。','As long as I know the address, I can send it.','ขอแค่รู้ที่อยู่ก็ส่งได้']],['n2a26','n2b01','n2b21','n2f35','n2h11']);
  skill(7,'organize','G','文法の性質をチェック','Check the subject, attitude and ending before choosing.','ดูผู้กระทำ น้ำเสียง และส่วนท้ายก่อนเลือก',
    'Ask: fact or judgment? whose viewpoint? welcome or unwelcome result?','ถามตัวเองว่าเป็นข้อเท็จจริงหรือความเห็น มุมมองใคร และผลดีหรือไม่ดี',
    'These are useful tendencies, not rules for guessing from one keyword. かねない commonly warns of an unwelcome result. わけにはいかない concerns obligations. A form such as ないことには normally needs a negative or restrictive consequence.',
    'นี่เป็นแนวโน้มช่วยคิด ไม่ใช่กฎให้เดาจากคำเดียว かねない มักเตือนผลเสีย わけにはいかない เกี่ยวกับข้อผูกมัด และ ないことには มักตามด้วยผลปฏิเสธหรือข้อจำกัด',
    [['このままでは、事故が起こりかねない。','このままでは、じこがおこりかねない。','If this continues, an accident could happen.','ถ้ายังเป็นแบบนี้อาจเกิดอุบัติเหตุ'],['実物を見ないことには、判断できない。','じつぶつをみないことには、はんだんできない。','I cannot judge without seeing the actual item.','ถ้าไม่ได้เห็นของจริงก็ยังตัดสินไม่ได้']],['n2c16','n3c06','n2b02']);
  skill(8,'sentence','1','文の組み立て：決まった形','Build fixed chunks before solving the ★ position.','จับกลุ่มสำนวนให้ได้ก่อนหาตำแหน่ง ★',
    'Join inseparable pieces first, then read the complete sentence.','จับส่วนที่ต้องอยู่ติดกันก่อน แล้วอ่านประโยคทั้งประโยค',
    'In an order question, use every piece once. Lock chunks such as よく考えた上で or 賛成かどうか, attach their particles, then locate ★. A phrase that sounds good alone may not fit the full sentence.',
    'โจทย์เรียงประโยคต้องใช้ทุกชิ้นครั้งเดียว จับกลุ่มเช่น よく考えた上で หรือ 賛成かどうか แล้วเชื่อมคำช่วยก่อนหาตำแหน่ง ★ สำนวนที่ฟังดีเดี่ยว ๆ อาจไม่เข้าประโยคทั้งหมด',
    [['よく考えた上で、返事をします。','よくかんがえたうえで、へんじをします。','I will answer after thinking it through.','จะตอบหลังจากคิดให้รอบคอบ'],['参加するかどうか、まだ決めていない。','さんかするかどうか、まだきめていない。','I have not decided whether to participate.','ยังไม่ตัดสินใจว่าจะเข้าร่วมหรือไม่']],['n2a09','n2i04','n2a26']);
  skill(9,'sentence','2','文の組み立て：名詞を説明する','Find the noun and keep its description in front of it.','หานามหลัก แล้ววางส่วนขยายไว้ข้างหน้า',
    'If a noun follows, check the noun-modifying form: に関する記事, に基づく判断.','ถ้าตามด้วยนาม ต้องใช้รูปขยายนาม เช่น に関する記事 และ に基づく判断',
    'Japanese relative clauses go before their noun: 昨日買った本. Many grammar expressions change before a noun: に対して → に対する, によって → による, に応じて → に応じた. Do not add の mechanically.',
    'อนุประโยคขยายนามอยู่หน้านาม เช่น 昨日買った本 หลายสำนวนเปลี่ยนรูปก่อนนาม เช่น に対して → に対する によって → による และ に応じて → に応じた อย่าเติม の ทุกกรณี',
    [['環境に関する記事を読んだ。','かんきょうにかんするきじをよんだ。','I read an article about the environment.','อ่านบทความเกี่ยวกับสิ่งแวดล้อม'],['これは、姉が作ったかばんです。','これは、あねがつくったかばんです。','This is the bag my older sister made.','นี่คือกระเป๋าที่พี่สาวทำ']],['n3f21','n3c17','n3c18','n2d20','n2i01']);
  skill(10,'sentence','3','文の組み立て：否定の位置','Keep the negative with the expression it belongs to.','วางปฏิเสธให้ตรงกับส่วนที่ต้องการปฏิเสธ',
    'Count what is being denied, not just how many times ない appears.','ดูว่าปฏิเสธอะไร ไม่ใช่นับจำนวน ない อย่างเดียว',
    'しか…ない means only; 必ずしも…ない means not necessarily. わけではない partly rejects a claim, while ないわけではない can admit some truth. In ★ questions, first connect the phrase that requires a negative ending.',
    'しか…ない คือมีเพียง 必ずしも…ない คือไม่จำเป็นเสมอไป わけではない ปฏิเสธคำกล่าวบางส่วน ส่วน ないわけではない อาจยอมรับว่ามีบ้าง โจทย์ ★ ให้จับคู่ส่วนที่ต้องใช้ท้ายปฏิเสธก่อน',
    [['高い物が必ずしもいいとは限らない。','たかいものがかならずしもいいとはかぎらない。','Expensive things are not necessarily good.','ของแพงไม่ได้ดีเสมอไป'],['今日は千円しか持っていない。','きょうはせんえんしかもっていない。','I only have one thousand yen with me today.','วันนี้พกเงินมาเพียงพันเยน']],['n3b09','n2c28','n2c14','n2g05']);
  skill(11,'passage','1','文の始めと終わり','Make the ending answer the sentence opening.','ให้ส่วนท้ายตอบรับกับส่วนต้นของประโยค',
    'When the opening promises a reason, finish with a reason.','ถ้าขึ้นต้นว่าจะอธิบายเหตุผล ท้ายประโยคต้องให้เหตุผล',
    'A long clause can hide the frame. 理由は…からだ explains why; 問題は…ことだ identifies a problem; 大切なのは…ことだ names what matters. Check the main predicate after reading the middle.',
    'อนุประโยคยาวอาจทำให้ลืมกรอบประโยค 理由は…からだ อธิบายเหตุผล 問題は…ことだ ระบุปัญหา และ 大切なのは…ことだ บอกสิ่งสำคัญ อ่านตรงกลางแล้วกลับมาดูภาคแสดงหลัก',
    [['この町に住む理由は、駅が近いからだ。','このまちにすむりゆうは、えきがちかいからだ。','I live in this town because the station is nearby.','เหตุผลที่อยู่เมืองนี้คือสถานีอยู่ใกล้'],['大切なのは、毎日少しずつ続けることだ。','たいせつなのは、まいにちすこしずつつづけることだ。','What matters is continuing a little every day.','สิ่งสำคัญคือทำต่อไปวันละนิด']],['a326','a435','n3c07']);
  skill(12,'passage','2','時制と基準の時間','Judge time relative to the event being described.','เทียบเวลากับเหตุการณ์ที่กำลังกล่าวถึง',
    'Vるとき can be before completion; Vたとき can be after completion, even in a future story.','Vるとき อาจเป็นก่อนทำเสร็จ ส่วน Vたとき อาจเป็นหลังทำเสร็จ แม้พูดถึงอนาคต',
    'Do not translate every た as past relative to now. In 来年日本に行ったとき, the visit is future but treated as reached before the next action. Distinguish ongoing ている from a resulting state and keep reported events on their timeline.',
    'อย่าแปล た ทุกตัวว่าเป็นอดีตเทียบกับตอนนี้ 来年日本に行ったとき คือปีหน้าหลังไปถึงญี่ปุ่นแล้วจึงทำอีกอย่าง ต้องแยก ている ที่กำลังทำกับผลที่คงอยู่ และดูเวลาของเหตุการณ์ที่รายงาน',
    [['来年日本に行ったとき、友人に会うつもりだ。','らいねんにほんにいったとき、ゆうじんにあうつもりだ。','When I visit Japan next year, I plan to meet a friend there.','ปีหน้าเมื่อไปถึงญี่ปุ่นแล้ว ตั้งใจจะพบเพื่อน'],['家を出るとき、窓を閉めた。','いえをでるとき、まどをしめた。','I closed the window as I was about to leave home.','ปิดหน้าต่างตอนกำลังจะออกจากบ้าน']],['n2i02','n3b15','n3a01']);
  skill(13,'passage','3','文章の条件表現','Choose the conditional that fits the sequence and intention.','เลือกเงื่อนไขให้ตรงกับลำดับและความตั้งใจ',
    'Advice about a proposed action often uses なら; a step after completion often uses たら.','แนะนำเรื่องที่อีกฝ่ายเสนอ มักใช้ なら ส่วนขั้นหลังทำเสร็จมักใช้ たら',
    'と commonly gives automatic results; たら can introduce a completed trigger, a discovery or an instruction. なら takes a premise and does not require X to happen before Y. ば has restrictions depending on the subjects and actions; these forms are not freely interchangeable.',
    'と มักบอกผลอัตโนมัติ たら ใช้หลังเหตุเงื่อนไขเสร็จแล้ว บอกสิ่งที่พบหรือสั่งได้ ส่วน なら รับประเด็นสมมติ ไม่จำเป็นต้องเกิด X ก่อน Y และ ば มีข้อจำกัดตามประธานกับการกระทำ จึงใช้แทนกันทุกที่ไม่ได้',
    [['京都へ行くなら、この地図を持っていくといい。','きょうとへいくなら、このちずをもっていくといい。','If you are going to Kyoto, take this map.','ถ้าจะไปเกียวโต เอาแผนที่นี้ไปก็ดี'],['駅に着いたら、電話してください。','えきについたら、でんわしてください。','Please call me when you arrive at the station.','ถึงสถานีแล้วกรุณาโทรมา']],['n3a20','n3a21','n3a22','n3a23']);
  skill(14,'passage','4','自動詞・他動詞と視点','Keep track of what changes and who causes it.','ติดตามว่าสิ่งใดเปลี่ยน และใครเป็นผู้ทำให้เปลี่ยน',
    'ドアが開く: the door opens. ドアを開ける: someone opens it.','ドアが開く คือประตูเปิด ส่วน ドアを開ける คือมีคนเปิดประตู',
    'Choose the verb together with its participants. 自動詞 focus on an event or state; 他動詞 take a direct object. Particles help, but を can also mark a route. てある often describes an intentional preparation, whereas ている can describe the resulting state itself.',
    'เลือกกริยาพร้อมผู้เกี่ยวข้อง 自動詞 เน้นเหตุการณ์หรือสภาพ ส่วน 他動詞 มีกรรมตรง คำช่วยช่วยแยกได้ แต่ を อาจบอกเส้นทางด้วย รูป てある มักบอกผลจากการเตรียมไว้ และ ている อาจบอกสภาพผลลัพธ์',
    [['風で窓が開いた。','かぜでまどがあいた。','The window opened in the wind.','หน้าต่างเปิดเพราะลม'],['暑かったので、私が窓を開けた。','あつかったので、わたしがまどをあけた。','It was hot, so I opened the window.','อากาศร้อน ฉันจึงเปิดหน้าต่าง']],['n2i02','n3b18','n3b17']);
  skill(15,'passage','5','てくる・ていくと視点','Follow movement or change toward and away from the viewpoint.','ดูการเคลื่อนหรือเปลี่ยนแปลงเข้าใกล้หรือออกจากจุดมอง',
    'てきた often leads up to now; ていく often extends onward from now.','てきた มักต่อเนื่องมาถึงตอนนี้ ส่วน ていく มักต่อไปจากตอนนี้',
    'These endings also express physical direction and doing something before returning or leaving. Place the viewpoint first: 近づいてくる comes toward it. Do not choose only by English past/future tense.',
    'สองรูปนี้ยังบอกทิศทางจริง และการทำสิ่งหนึ่งแล้วกลับมาหรือออกไปได้ ต้องกำหนดจุดมองก่อน เช่น 近づいてくる คือเข้ามาใกล้ อย่าเลือกจากอดีตหรืออนาคตภาษาอังกฤษอย่างเดียว',
    [['日本語が少しずつ分かってきた。','にほんごがすこしずつわかってきた。','I have gradually begun to understand Japanese.','ค่อย ๆ เริ่มเข้าใจภาษาญี่ปุ่นมากขึ้นมาถึงตอนนี้'],['これからも日本語を勉強していく。','これからもにほんごをべんきょうしていく。','I will keep studying Japanese from now on.','จากนี้จะเรียนภาษาญี่ปุ่นต่อไป']],['n3b15']);
  skill(16,'passage','6','受身・使役・使役受身と視点','Separate receiving an action, causing it and being made to do it.','แยกถูกกระทำ ให้ทำ และถูกบังคับให้ทำ',
    'Who acts? Who gives the instruction? Who is affected?','ใครลงมือ ใครสั่ง และใครได้รับผล',
    'The same participants can appear with different subjects. 説明させた makes or lets someone explain; 説明させられた presents the person made to explain. A passive can keep the affected person as the topic. Causative does not always imply force; context can indicate permission.',
    'คนกลุ่มเดิมอาจเป็นประธานคนละคน 説明させた คือให้หรืออนุญาตให้อธิบาย ส่วน 説明させられた คือถูกให้ทำ รูปถูกกระทำช่วยคงผู้ได้รับผลเป็นหัวข้อ และ使役 ไม่ได้หมายถึงบังคับเสมอไป อาจเป็นการอนุญาตตามบริบท',
    [['部長は私に計画を説明させた。','ぶちょうはわたしにけいかくをせつめいさせた。','The manager had me explain the plan.','หัวหน้าให้ฉันอธิบายแผน'],['私は部長に計画を説明させられた。','わたしはぶちょうにけいかくをせつめいさせられた。','I was made to explain the plan by the manager.','ฉันถูกหัวหน้าให้ต้องอธิบายแผน']],['n3b20','n3b21','n3b22']);
  skill(17,'passage','7','授受表現と視点','Keep the giver, receiver and speaker’s viewpoint aligned.','ให้ผู้ให้ ผู้รับ และมุมมองผู้พูดตรงกัน',
    'くれる: someone helps my side. もらう: the receiver is the subject.','くれる คือคนอื่นช่วยฝ่ายฉัน ส่วน もらう ให้ผู้รับเป็นประธาน',
    '先生が教えてくれた and 私は先生に教えてもらった describe the same helpful action from different grammatical subjects. もらう can also describe a third-person receiver; it does not require 私 as subject. あげる takes the helper as subject. Polite alternatives include くださる and いただく; choose them according to the social relationship.',
    '先生が教えてくれた กับ 私は先生に教えてもらった อาจเป็นเหตุการณ์เดียวกัน แต่ประธานต่างกัน もらう ใช้กับผู้รับที่เป็นบุคคลที่สามได้ ไม่จำเป็นต้องเป็น 私 ส่วน あげる ให้ผู้ช่วยเป็นประธาน รูปสุภาพเช่น くださる และ いただく ต้องเลือกตามความสัมพันธ์',
    [['友人が駅まで迎えに来てくれた。','ゆうじんがえきまでむかえにきてくれた。','My friend came to the station to pick me up.','เพื่อนมารับฉันที่สถานี'],['私は友人に駅まで迎えに来てもらった。','わたしはゆうじんにえきまでむかえにきてもらった。','I had my friend come and pick me up at the station.','ฉันให้เพื่อนมารับที่สถานี']],['n3b19','n3e01','n3e02']);
  skill(18,'passage','8','こ・そ・あの指示','Find the exact idea or object a demonstrative points to.','หาสิ่งหรือใจความที่คำชี้เฉพาะอ้างถึง',
    'この needs a noun; これ stands alone. そう can refer to an entire idea.','この ต้องมีนามตามหลัง ส่วน これ อยู่เดี่ยวได้ และ そう อาจอ้างถึงทั้งใจความ',
    'In discourse, そ often refers to something introduced by the other person or earlier text. こ can present the writer’s current focus; あ can evoke shared knowledge. These are contextual tendencies, not simply physical distance rules.',
    'ในบทสนทนาหรือบทความ そ มักอ้างสิ่งที่อีกฝ่ายหรือข้อความก่อนหน้ากล่าวถึง こ อาจยกสิ่งที่ผู้เขียนกำลังเน้น ส่วน あ อาจอ้างสิ่งที่รู้ร่วมกัน จึงไม่ได้ขึ้นกับระยะทางจริงอย่างเดียว',
    [['新しい方法を試した。その方法は簡単だった。','あたらしいほうほうをためした。そのほうほうはかんたんだった。','I tried a new method. That method was easy.','ลองวิธีใหม่ วิธีนั้นง่าย'],['「毎日続けるのが大切だ。」「私もそう思います。」','「まいにちつづけるのがたいせつだ。」「わたしもそうおもいます。」','“Continuing every day matters.” “I think so too.”','“การทำต่อเนื่องทุกวันสำคัญ” “ฉันก็คิดอย่างนั้น”']],['n2i07']);
  skill(19,'passage','9','は・がと情報の流れ','Distinguish the topic from the person or thing being identified.','แยกหัวข้อที่พูดถึงกับคนหรือสิ่งที่กำลังระบุ',
    'A who/what question often identifies its answer with が; は can keep a topic or set a contrast.','คำถามว่าใครหรืออะไร มักระบุคำตอบด้วย が ส่วน は คงหัวข้อหรือสร้างการเปรียบต่างได้',
    'Do not use “old = は, new = が” as an absolute rule. が marks the subject inside many relative clauses; は can contrast even new information. Read what the question asks and what the surrounding sentences already discuss.',
    'อย่าใช้กฎว่าข้อมูลเก่าต้อง は ใหม่ต้อง が ตายตัว が เป็นประธานในส่วนขยายนามได้บ่อย และ は อาจใช้เทียบข้อมูลใหม่ ต้องดูคำถามและสิ่งที่ประโยครอบข้างกำลังพูดถึง',
    [['「誰が予約しましたか。」「私が予約しました。」','「だれがよやくしましたか。」「わたしがよやくしました。」','“Who made the reservation?” “I did.”','“ใครจองไว้” “ฉันเป็นคนจอง”'],['田中さんは学生です。弟も学生です。','たなかさんはがくせいです。おとうともがくせいです。','Tanaka is a student. His younger brother is a student too.','คุณทานากะเป็นนักเรียน น้องชายของเขาก็เป็นนักเรียน']],['n2i01','n2i07']);
  skill(20,'passage','10','接続表現の選び方','Name the relation between two sentences before choosing a connector.','บอกความสัมพันธ์ระหว่างสองประโยคก่อนเลือกคำเชื่อม',
    'Cause → result; expectation → contrast; claim → example.','เหตุ → ผล ความคาดหมาย → สิ่งที่ขัดกัน คำกล่าว → ตัวอย่าง',
    'だから / そのため give a consequence; しかし / ところが introduce contrast; 例えば gives an example; つまり restates or summarizes. A shared topic alone does not tell you which relation is intended.',
    'だから / そのため บอกผล しかし / ところが บอกความขัดกัน 例えば ยกตัวอย่าง และ つまり กล่าวใหม่หรือสรุป การพูดเรื่องเดียวกันอย่างเดียวไม่พอจะตัดสินคำเชื่อม',
    [['雨が強くなった。そのため、試合は中止になった。','あめがつよくなった。そのため、しあいはちゅうしになった。','The rain got heavier. As a result, the match was cancelled.','ฝนแรงขึ้น ผลคือการแข่งขันถูกยกเลิก'],['十分に練習した。しかし、本番では緊張した。','じゅうぶんにれんしゅうした。しかし、ほんばんではきんちょうした。','I practised enough. However, I was nervous at the performance.','ฝึกมาเพียงพอ แต่ตอนแสดงจริงกลับตื่นเต้น']],['a330','a327','a329','a324']);
  skill(21,'passage','11','省略・繰り返し・言い換え','Recover omitted subjects and connect paraphrases.','เติมประธานที่ละไว้ และเชื่อมคำกล่าวซ้ำความหมายเดิม',
    'Ask who is still acting, and whether a new phrase names the same thing.','ดูว่าใครยังเป็นคนทำ และคำใหม่อ้างสิ่งเดิมหรือไม่',
    'Japanese often leaves a recoverable subject unstated. Do not invent a new actor just because the next sentence has no name. つまり can restate an earlier idea; repeated nouns may be shortened to それ or その方法. Confirm the intended referent from meaning.',
    'ภาษาญี่ปุ่นมักละประธานที่เข้าใจได้ อย่าเปลี่ยนผู้กระทำเองเพราะประโยคถัดไปไม่มีชื่อ つまり อาจกล่าวใจความเดิมใหม่ และนามที่ซ้ำอาจย่อเป็น それ หรือ その方法 ต้องดูความหมายเพื่อหาสิ่งที่อ้างถึง',
    [['美咲は駅に着いた。すぐに母に電話した。','みさきはえきについた。すぐにははにでんわした。','Misaki arrived at the station. She immediately called her mother.','มิซากิถึงสถานีแล้ว เธอโทรหาแม่ทันที'],['この店は年中無休だ。つまり、毎日開いている。','このみせはねんじゅうむきゅうだ。つまり、まいにちあいている。','This shop has no regular days off. In other words, it opens every day.','ร้านนี้ไม่มีวันหยุด กล่าวคือเปิดทุกวัน']],['a324','a325','n2i07']);
  skill(22,'passage','12','文体をそろえる','Keep the narrator’s sentence endings consistent.','ใช้ระดับภาษาของผู้เล่าให้สม่ำเสมอ',
    'Check the main sentence endings: です・ます or だ・である.','ดูท้ายประโยคหลักว่าใช้ です・ます หรือ だ・である',
    'Quoted speech can have a different style from the narrator. A plain verb inside a noun-modifying clause is also normal in a polite sentence: 私が買った本です. Consistency concerns the relevant narrator or speaker, not making every verb polite.',
    'คำพูดที่ยกมาอาจใช้ต่างระดับกับผู้เล่า และกริยารูปธรรมดาในส่วนขยายนามใช้ในประโยคสุภาพได้ เช่น 私が買った本です ความสม่ำเสมอคือระดับของผู้เล่าหรือผู้พูดคนนั้น ไม่ใช่ผันทุกกริยาให้สุภาพ',
    [['この施設は無料です。月曜日は休みです。','このしせつはむりょうです。げつようびはやすみです。','This facility is free to use. It is closed on Mondays.','สถานที่นี้ใช้บริการฟรี หยุดวันจันทร์'],['この施設は無料である。月曜日は休みである。','このしせつはむりょうである。げつようびはやすみである。','This facility is free to use. It is closed on Mondays. (Formal written style.)','สถานที่นี้ใช้บริการฟรี หยุดวันจันทร์ (ภาษาเขียนทางการ)']],['n3e03','n2i01']);

  LESSON_GUIDES.n2k07.forms=[
    {form:'ないことには → できない／分からない',en:'A required negative or limiting consequence: without checking, you cannot know.',th:'ผลตามหลังเป็นปฏิเสธหรือข้อจำกัด: ถ้าไม่ตรวจก็ไม่รู้',example:'確認しないことには、分からない。'},
    {form:'疑問詞 + …ことか',en:'A question word can intensify emotion without requesting an answer.',th:'คำแสดงคำถามอาจใช้เน้นอารมณ์ ไม่ได้ต้องการคำตอบ',example:'何度やり直したことか。'},
    {form:'数量 + として + 否定',en:'A number plus として needs a negative conclusion: not even one exception.',th:'จำนวน + として ต้องตามด้วยผลปฏิเสธ: ไม่มีข้อยกเว้นแม้แต่หนึ่ง',example:'一人として反対しなかった。'},
    {form:'に関する／に対する／による + 名詞',en:'Before a noun, use the noun-modifying form rather than the connective form.',th:'หน้านามใช้รูปขยายนาม ไม่ใช่รูปเชื่อมไปภาคแสดง',example:'環境に関する記事を読んだ。'},
    {form:'必ずしも … ない',en:'Match both halves. This denies “always”, not every individual case.',th:'ดูสองฝั่งให้ตรงกัน ปฏิเสธว่าเสมอ ไม่ใช่ทุกกรณีเป็นไปไม่ได้',example:'安い物が必ずしも悪いとは限らない。'}
  ];
  function patch(id,fields,extra){var g=GRAMMAR.find(function(x){return x.id===id;});Object.assign(g,fields);if(extra){var ex=example(extra);g.ex.push(ex);g.kanzenExtraExamples=(g.kanzenExtraExamples||[]).concat([ex]);}if(fields.se||fields.st)SHORT[id]=[g.se,g.st];}
  patch('n2a09',{conn:'Vた／Nの + 上で（先に済ませる）／V辞書形 + 上で（その活動に関して）',en:'After doing something as a basis; or, with a dictionary verb, in the course of doing it.',th:'หลังทำสิ่งหนึ่งเพื่อเป็นฐาน หรือเมื่อเชื่อมกริยารูปพจนานุกรมคือในการทำสิ่งนั้น',note_en:'Vた + 上で: complete a prerequisite first. Vる + 上で: something matters in doing that activity. Compare 確認した上で送る (check, then send) with 生活する上で必要だ (needed for living).',note_th:'Vた + 上で คือทำขั้นแรกให้เสร็จก่อน ส่วน Vる + 上で คือสิ่งที่สำคัญในการทำกิจกรรมนั้น เช่น 確認した上で送る ตรวจแล้วค่อยส่ง แต่ 生活する上で必要だ คือจำเป็นในการใช้ชีวิต'},['外国で生活する上で、言葉は大切だ。','がいこくでせいかつするうえで、ことばはたいせつだ。','Language matters when living abroad.','ภาษาสำคัญต่อการใช้ชีวิตในต่างประเทศ']);
  if(LESSON_GUIDES.n2a09){LESSON_GUIDES.n2a09.forms.push({form:'Vる + 上で',en:'In doing this activity; not “after”.',th:'ในการทำกิจกรรมนี้ ไม่ใช่หลังทำ',example:'外国で生活する上で、言葉は大切だ。'});LESSON_GUIDES.n2a09.meaning_en='After doing; or in doing an activity (check the verb form).';LESSON_GUIDES.n2a09.meaning_th='หลังทำ หรือในการทำกิจกรรม (ดูรูปกริยา)';}
  patch('n2f31',{conn:'V辞書形／Vない + ところだった',note_en:'An event nearly happened but was avoided; negative verbs are possible too. 忘れるところだった = nearly forgot; 間に合わないところだった = nearly failed to make it. Context can also describe what one was about to do, without a bad outcome.',note_th:'เหตุการณ์เกือบเกิดแต่หลีกเลี่ยงได้ ใช้กริยาปฏิเสธได้ เช่น 忘れるところだった เกือบลืม และ 間に合わないところだった เกือบมาไม่ทัน บางบริบทบอกสิ่งที่กำลังจะทำเฉย ๆ โดยไม่จำเป็นต้องเป็นผลเสีย'},['もう少しで締め切りに間に合わないところだった。','もうすこしでしめきりにまにあわないところだった。','I nearly failed to meet the deadline.','เกือบจะทำไม่ทันกำหนดแล้ว']);
  patch('n2f16',{p:'〜にしたら / 〜にすれば / 〜にしてみれば / 〜にしても（立場）'});
  patch('n2c18',{conn:'Vます語幹 + 得る（える・うる）／得ない（えない）',note_en:'Possibility, not a person’s learned ability. Plain affirmative: える or うる. Negative: えない; polite: えます; past: えた. Do not form うない or うます.',note_th:'บอกความเป็นไปได้ ไม่ใช่ความสามารถที่ฝึกได้ รูปบอกเล่าธรรมดาอ่าน える หรือ うる แต่ปฏิเสธเป็น えない สุภาพเป็น えます และอดีตเป็น えた ไม่ใช้ うない หรือ うます'});
  patch('n3b09',{p:'〜わけではない / 〜というわけではない'});
  patch('n3a14',{p:'〜おかげで / 〜おかげだ'});
  patch('n3a13',{p:'〜せいで / 〜せいか / 〜せいだ'});
  patch('n2a09',{se:'after doing; in doing (check the form)',st:'หลังทำ; ในการทำ (ดูรูปกริยา)'});
})();
