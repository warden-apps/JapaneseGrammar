/* The grammar map: every library entry sorted by what it lets you say.
   Region → family → branch → pattern. Each entry has exactly one home branch
   ("ids"). "see" adds a cross-link where a second meaning of the same entry
   belongs, and "compare" opens the matching side-by-side table. Families are
   listed in display order; regions alternate between the map's two sides. */
var GRAMMAR_MAP_REGIONS = [
  {id:'events',  ja:'出来事', en:'Time & events',    th:'เวลาและเหตุการณ์'},
  {id:'logic',   ja:'論理',   en:'Logic & links',    th:'ตรรกะและการเชื่อม'},
  {id:'focus',   ja:'範囲',   en:'Focus & framing',  th:'ขอบเขตและมุมมอง'},
  {id:'stance',  ja:'気持ち', en:'Speaker’s stance', th:'ท่าทีของผู้พูด'},
  {id:'toolkit', ja:'部品',   en:'Sentence toolkit', th:'เครื่องมือประโยค'}
];

var GRAMMAR_MAP = [
  /* ---------- 出来事 Time & events ---------- */
  {id:'time', region:'events', glyph:'時', ja:'時・タイミング', en:'Time', th:'เวลา',
    q_en:'When does it happen?', q_th:'เกิดขึ้นเมื่อไร?', branches:[
    {id:'instant', en:'The instant it happens', th:'ทันทีที่เกิดขึ้น',
      ids:['n3a05','n2a06','n2e13','n2a03','n2a07','n2f26','a408','a419','a301']},
    {id:'during', en:'While · during', th:'ระหว่างที่ · ขณะที่',
      ids:['n3a03','n2h01','n3a04','n3a06','n3c31','n2h02','n3a10','b314']},
    {id:'span', en:'Throughout · from… to…', th:'ตลอด · ตั้งแต่…ถึง…',
      ids:['n3f06','n3f10','n2d21'], see:['n2b06']},
    {id:'occasion', en:'At that moment · on the occasion', th:'ตอนนั้นพอดี · ในโอกาส',
      ids:['n3a07','n2a01','n2e04','n2a10']},
    {id:'order', en:'Before, after, ever since', th:'ก่อน · หลัง · ตั้งแต่นั้นมา',
      ids:['n3c32','n2a02','n2a05','n2a09','n2a08','n2g10','n3a08','n2d18','n3e05','n3c33']},
    {id:'every', en:'Every time · sometimes', th:'ทุกครั้ง · บางครั้ง',
      ids:['n3a11','n3a12','n2f17','b408','n3c26']},
    {id:'words', en:'Time words', th:'คำบอกเวลา',
      ids:['a313','a411','a314','a410','n2i03','a409','a412','a317']}
  ]},
  {id:'stages', region:'events', glyph:'段', ja:'動作の段階', en:'Stages', th:'ขั้นตอน',
    q_en:'How far along is the action?', q_th:'การกระทำไปถึงขั้นไหนแล้ว?', branches:[
    {id:'point', en:'About to · doing · just did', th:'กำลังจะ · กำลังทำ · เพิ่งทำ', compare:'action-stage',
      ids:['n3a01','n3a02','n3f27','n2f31','a420']},
    {id:'startend', en:'Start · keep going · finish', th:'เริ่ม · ทำต่อ · ทำจนจบ',
      ids:['n3c11','n3c12','n3c14','n3c13','n3f01','n2d04','n3f34']},
    {id:'leftover', en:'Done, and left that way', th:'ทำไว้ · ปล่อยค้างไว้',
      ids:['n3b16','n3b17','n3b18','n2i02','n3a09','n2c11']},
    {id:'ending', en:'How it ended up', th:'สุดท้ายลงเอยอย่างไร',
      ids:['n2a11','n2a12','n3f12','n2g03','a311','a312']}
  ]},
  {id:'change', region:'events', glyph:'変', ja:'変化・傾向', en:'Change', th:'เปลี่ยนแปลง',
    q_en:'How is it changing, or how does it tend to be?', q_th:'เปลี่ยนไปอย่างไร หรือมีแนวโน้มแบบไหน?', branches:[
    {id:'become', en:'Becoming different', th:'กลายเป็น · ค่อยๆ เปลี่ยน',
      ids:['n3b11','n3b12','n3b15','n3f23']},
    {id:'decide', en:'Decided by me, or for me', th:'ตัดสินใจเอง หรือ ถูกกำหนด',
      ids:['n3b13','n3b14','n3f16']},
    {id:'together', en:'Changing together', th:'เปลี่ยนไปพร้อมกัน', compare:'change',
      ids:['n2b23','n2b24','n2b25','n3c20','n3b24']},
    {id:'trend', en:'A steady trend', th:'แนวโน้มที่ต่อเนื่อง', compare:'change',
      ids:['n2c07','n2c08','n2c09','n2f37']},
    {id:'tendency', en:'Tends to · full of · a touch of', th:'มักจะ · เต็มไปด้วย · ออกจะ…',
      ids:['n3c22','n2c06','n3c23','n3c21','n2d07']}
  ]},

  /* ---------- 論理 Logic & links ---------- */
  {id:'cause', region:'logic', glyph:'因', ja:'原因・理由', en:'Cause', th:'สาเหตุ',
    q_en:'Why did it happen?', q_th:'ทำไมจึงเกิดขึ้น?', branches:[
    {id:'plain', en:'Plain cause and result', th:'สาเหตุและผลทั่วไป',
      ids:['n3a15','n3f15','n2h13','n2f18'], see:['n3c18']},
    {id:'credit', en:'Thanks or blame', th:'ขอบคุณ หรือ โทษ', compare:'causes',
      ids:['n3a14','n3a13']},
    {id:'excuse', en:'My reason or excuse', th:'เหตุผลส่วนตัว · ข้ออ้าง', compare:'causes',
      ids:['n3a16','n2g08']},
    {id:'extreme', en:'Too much, or one small thing', th:'มากเกินไป · เพียงเพราะเรื่องเดียว', compare:'causes',
      ids:['n2a13','n2a14','n2a15']},
    {id:'sothen', en:'Since that is so, then…', th:'ในเมื่อ… ก็ต้อง…', compare:'reasoning',
      ids:['n3a17','n2a17','n2f38','n2a16']},
    {id:'trigger', en:'What set it off', th:'จุดเริ่มต้นของเรื่อง',
      ids:['n2d22','n2f03']}
  ]},
  {id:'condition', region:'logic', glyph:'条', ja:'条件・仮定', en:'If…', th:'เงื่อนไข',
    q_en:'Under what condition?', q_th:'ถ้า… แล้วจะเป็นอย่างไร?', branches:[
    {id:'four', en:'The four basic “if”s', th:'“ถ้า” 4 แบบพื้นฐาน', compare:'conditionals',
      ids:['n3a23','n3a20','n3a21','n3a22','n3a26']},
    {id:'suppose', en:'Supposing · in case', th:'สมมุติว่า · เผื่อว่า',
      ids:['n3a25','b315','n2b04']},
    {id:'onlyif', en:'Only if · unless', th:'ต้อง… ถึงจะ · ถ้าไม่…',
      ids:['n2b01','n2b02','n2h09'], see:['n2e14','n2a05']},
    {id:'trouble', en:'Keep this up and there’s trouble', th:'ถ้ายังเป็นแบบนี้ต่อไป แย่แน่',
      ids:['n2d24','n2f23','n2g11','n2d25']},
    {id:'ifonly', en:'If only…', th:'ถ้าเพียงแต่…',
      ids:['n2b03','n3f03']}
  ]},
  {id:'contrast', region:'logic', glyph:'逆', ja:'逆接・対比', en:'Although', th:'ขัดแย้ง',
    q_en:'Although…, but…?', q_th:'แม้ว่า… แต่…?', branches:[
    {id:'although', en:'Although (it is true)', th:'แม้ว่า (เป็นความจริง)', compare:'contrast',
      ids:['n3a27','n2a19','n2a20','n3a30','n2e05','n2a28','n3f31','n3g05','n2h07']},
    {id:'critical', en:'Although (and I disapprove)', th:'ทั้งๆ ที่… (ตำหนิ)',
      ids:['n3a28','b407']},
    {id:'evenif', en:'Even if · no matter how', th:'ถึงแม้ว่า · ไม่ว่าจะ…แค่ไหน',
      ids:['n3a24','n3f08','n2a27','n2a26','n2e08']},
    {id:'unexpected', en:'Not what you would expect', th:'ผิดจากที่คาดไว้',
      ids:['n3a29','n3f24','n2a23','a403']},
    {id:'twosides', en:'On the other hand', th:'ในทางกลับกัน · อีกด้านหนึ่ง',
      ids:['n2a21','b414','n2a22','a413'], see:['n3c17']},
    {id:'notmean', en:'That doesn’t mean… · far from it', th:'ไม่ได้แปลว่า… · ไม่ใช่แค่นั้น',
      ids:['n2a25','n2a24','a422']}
  ]},
  {id:'adding', region:'logic', glyph:'加', ja:'添加・例示', en:'And also', th:'เพิ่มเติม',
    q_en:'What else? Which examples?', q_th:'มีอะไรอีก? ยกตัวอย่างอะไร?', branches:[
    {id:'notonly', en:'Not only… but also', th:'ไม่เพียงแต่… ยัง…',
      ids:['n3f07','n2b13','n2b14','n2b11','n2b12','n2b15','n2e03','n2i08']},
    {id:'examples', en:'Listing examples', th:'ยกตัวอย่าง',
      ids:['n2f27','n2b16','n2h11','n2d26','b308','n2g02']},
    {id:'instead', en:'Instead · in place of', th:'แทน · แทนที่',
      ids:['n3f11','b309']}
  ]},
  {id:'connectors', region:'logic', glyph:'繋', ja:'接続詞', en:'Connectors', th:'คำเชื่อม',
    q_en:'How does the next sentence link?', q_th:'ประโยคถัดไปเชื่อมกันอย่างไร?', branches:[
    {id:'more', en:'And what’s more', th:'ยิ่งไปกว่านั้น',
      ids:['a425','a426','a427','a315','a434']},
    {id:'but', en:'But · and yet', th:'แต่ · ทั้งๆ ที่',
      ids:['a327','a428','b412','a433','a310']},
    {id:'so', en:'Because · so', th:'เพราะ · ดังนั้น',
      ids:['a326','a435','a330','a432','a429']},
    {id:'sumup', en:'In other words · in short', th:'กล่าวคือ · สรุปคือ',
      ids:['a324','a325','a430','a416','a329']},
    {id:'or', en:'Or', th:'หรือ',
      ids:['a328','a424']},
    {id:'aside', en:'By the way', th:'อนึ่ง · พูดถึง…',
      ids:['a423','a431']}
  ]},

  /* ---------- 範囲 Focus & framing ---------- */
  {id:'limits', region:'focus', glyph:'限', ja:'限定・強調', en:'Only · even', th:'เฉพาะ · แม้แต่',
    q_en:'Only this? Even that?', q_th:'แค่นี้? แม้แต่สิ่งนั้น?', branches:[
    {id:'only', en:'Only · nothing else', th:'เท่านั้น · แค่',
      ids:['n2e12','n2f01','n3c34','n3e06']},
    {id:'kagiri', en:'The 限り family', th:'กลุ่ม 限り', compare:'limits',
      ids:['n2e14','n2g14','n2h03','n2h05','n2b17','n2b18']},
    {id:'even', en:'Even (an extreme example)', th:'แม้แต่ (ตัวอย่างสุดขั้ว)',
      ids:['n2b21','n2e02','n2f22','n2d15']},
    {id:'precisely', en:'Precisely because · only by', th:'เพราะ… นี่แหละ · ต้อง… ถึงจะ',
      ids:['n2b19','n2b20','n2d28'], see:['n2d18']},
    {id:'belittle', en:'Just… (playing it down)', th:'แค่… (ดูแคลน)',
      ids:['n2g04','n2d14']}
  ]},
  {id:'degree', region:'focus', glyph:'度', ja:'程度・比較', en:'Degree', th:'ระดับ',
    q_en:'How much? Compared with what?', q_th:'มากแค่ไหน? เทียบกับอะไร?', branches:[
    {id:'extent', en:'To the extent that', th:'ถึงขนาดที่',
      ids:['n3b26','n3c24','n2f04','a320','a418'], see:['n2a13']},
    {id:'compare', en:'Comparing', th:'การเปรียบเทียบ',
      ids:['n3b25','n3f22','b313','n3g08','n3f32','a304','n3g06']},
    {id:'amount', en:'At most · at least · a little', th:'อย่างมาก · อย่างน้อย · นิดเดียว',
      ids:['a316','a406','a405','a417','b312','n2h04','a306']}
  ]},
  {id:'viewpoint', region:'focus', glyph:'点', ja:'話題・観点', en:'Topic & view', th:'หัวข้อ · มุมมอง',
    q_en:'About what? From whose view?', q_th:'เรื่องอะไร? มองจากมุมของใคร?', branches:[
    {id:'about', en:'About · toward', th:'เกี่ยวกับ · ต่อ',
      ids:['n3c16','n3f21','n3c17','n2b10','n2f14','n3f26']},
    {id:'speaking', en:'Speaking of · when it comes to', th:'พูดถึง · ถ้าเป็นเรื่อง…',
      ids:['n3f30','b411','n2g12','n2c01']},
    {id:'view', en:'From someone’s point of view', th:'ในมุมมองของ…',
      ids:['n3c30','n3c19','n2f16','n2c02','b405']},
    {id:'judging', en:'Judging from', th:'ดูจาก… แล้ว',
      ids:['n2b05','n2d27','n2f32']},
    {id:'regardless', en:'Regardless · setting aside', th:'ไม่ว่า… · ไม่นับ…',
      ids:['n2c04','n2f13','n2f08','n2c05','n2g01','b406','n2f19']},
    {id:'setting', en:'In · at · under (formal)', th:'ใน · ที่ · ภายใต้ (ทางการ)',
      ids:['n3c29','n2d19','n2c03']}
  ]},
  {id:'means', region:'focus', glyph:'基', ja:'手段・基準・目的', en:'Means & purpose', th:'วิธี · จุดประสงค์',
    q_en:'How, based on what, and for what?', q_th:'ทำอย่างไร อิงอะไร เพื่ออะไร?', branches:[
    {id:'means', en:'By means of · with', th:'โดย · ผ่าน · ด้วย',
      ids:['n3c18','n2b06','n2d01']},
    {id:'basis', en:'Based on · in line with', th:'ตาม · อิงจาก',
      ids:['n2b07','n2b08','n2b09','n3f33','n2f07']},
    {id:'respond', en:'Depending on · in response to', th:'ขึ้นอยู่กับ · ตอบสนองต่อ',
      ids:['n2d20','n2f15','n2a04','n3g07']},
    {id:'purpose', en:'In order to · so that', th:'เพื่อ · เพื่อให้',
      ids:['n3a18','n3a19','b409','n2c12'], see:['n3a15']}
  ]},

  /* ---------- 気持ち Speaker’s stance ---------- */
  {id:'certainty', region:'stance', glyph:'推', ja:'推量・伝聞', en:'How sure', th:'ความมั่นใจ',
    q_en:'How do you know? How sure are you?', q_th:'รู้ได้อย่างไร? มั่นใจแค่ไหน?', branches:[
    {id:'heard', en:'I heard that…', th:'ได้ยินมาว่า…', compare:'evidence',
      ids:['n3b01','n3b04','n3b10','n3g09','n3g04','b311','n3f25']},
    {id:'looks', en:'It looks like…', th:'ดูเหมือนว่า…', compare:'evidence',
      ids:['n3b02','n3b03','b302','n2g13','n2c10','b304','n3f17','n2d05','n3c35','n3f09']},
    {id:'maybe', en:'Maybe · probably', th:'อาจจะ · น่าจะ',
      ids:['n3b07','n2i09','b301','n2d10','n2g06','n2f30','a303','a414','a402','a415']},
    {id:'sure', en:'Surely · it must be', th:'ต้อง… แน่ๆ',
      ids:['n3b05','n3b06','n2d23','n2d09','n2c15']},
    {id:'risk', en:'Something bad might happen', th:'อาจเกิดเรื่องไม่ดี',
      ids:['n2a18','n2c16']},
    {id:'noway', en:'Surely not · no way', th:'คงไม่ · ไม่มีทาง',
      ids:['n2c20','n2d17','n2c19','n2d12','a302']}
  ]},
  {id:'judging', region:'stance', glyph:'判', ja:'評価・判断', en:'Judging', th:'การประเมิน',
    q_en:'What do you make of it?', q_th:'คิดเห็นต่อเรื่องนั้นอย่างไร?', branches:[
    {id:'so', en:'Which means… · no wonder', th:'แปลว่า… · มิน่าล่ะ', compare:'wake',
      ids:['n3b08','n2d08','n2f28']},
    {id:'natural', en:'As you would expect', th:'สมกับ · เป็นธรรมดา', compare:'mono-koto',
      ids:['n2d13','a307','n2f09','n2f24','n2c26','n2h14','n3c25']},
    {id:'merely', en:'Nothing but · merely', th:'เป็นแค่ · ไม่ใช่อื่นใดนอกจาก',
      ids:['n2c24','b415','n2f02','n2c25']},
    {id:'best', en:'The best · worth it · at least', th:'ดีที่สุด · คุ้มค่า · ยังดีที่',
      ids:['n2e10','n2e11','n2f05','n2e07']},
    {id:'pointless', en:'No point · no need', th:'ไม่มีประโยชน์ · ไม่จำเป็น',
      ids:['b307','b401','n2c22','n2c23']}
  ]},
  {id:'must', region:'stance', glyph:'義', ja:'義務・可能', en:'Must · can', th:'ต้อง · ทำได้',
    q_en:'Must you? Can you?', q_th:'ต้องทำไหม? ทำได้ไหม?', branches:[
    {id:'must', en:'Must · no choice', th:'ต้อง · ไม่มีทางเลือก', compare:'unavoidable',
      ids:['n3c01','n3c02','n2c14','n2c13','n3c05','n2f33','n2h12']},
    {id:'should', en:'Should · shouldn’t', th:'ควร · ไม่ควร',
      ids:['n3b30','n3f04','n2f10']},
    {id:'may', en:'May · needn’t · must not', th:'ทำได้ · ไม่ต้อง · ห้าม',
      ids:['n3c04','n3c03','n3f29','n2f12']},
    {id:'can', en:'Can or can’t (and why)', th:'ทำได้ หรือ ไม่ได้ (เพราะอะไร)', compare:'cannot',
      ids:['n2c18','n3c06','n2c17','n2d03','n2b28','n2e06','n2c27']},
    {id:'notnow', en:'Can’t keep doing this', th:'มัวแต่… อยู่ไม่ได้แล้ว',
      ids:['n2f25','b402','b403']}
  ]},
  {id:'will', region:'stance', glyph:'意', ja:'意志・希望・助言', en:'Will & advice', th:'ตั้งใจ · แนะนำ',
    q_en:'What do you want or suggest?', q_th:'อยากทำ อยากให้ หรือแนะนำอะไร?', branches:[
    {id:'intend', en:'I intend · I’m trying', th:'ตั้งใจ · พยายาม',
      ids:['n3b28','b305','n3b27','b303','n2f35'], see:['n2c20','n3b13']},
    {id:'want', en:'I want (you) to…', th:'อยาก · อยากให้…',
      ids:['n3b23','n3g01','n2g09','n2g07']},
    {id:'advice', en:'Advice & invitations', th:'คำแนะนำ · การชักชวน', compare:'mono-koto',
      ids:['n3c27','n3b29','n3f02','n2c21','n2f34']}
  ]},
  {id:'feelings', region:'stance', glyph:'情', ja:'感情', en:'Feelings', th:'ความรู้สึก',
    q_en:'How strongly do you feel?', q_th:'รู้สึกแรงแค่ไหน?', branches:[
    {id:'canthold', en:'Can’t hold it in', th:'กลั้นไว้ไม่อยู่',
      ids:['n2b26','n2b27','n2d06','n2b22']},
    {id:'exclaim', en:'How very…!', th:'ช่าง… เหลือเกิน!',
      ids:['n2f06','n2g15','n2h10','n2h08','n2d11']},
    {id:'memory', en:'Memories & regrets', th:'ความหลัง · ความเสียดาย',
      ids:['n2d16','n3e07'], see:['n3c25']},
    {id:'attitude', en:'Words that show your attitude', th:'คำบอกท่าทีของผู้พูด',
      ids:['a404','a309','a308','a401','a407','a318','a319','a421']}
  ]},

  /* ---------- 部品 Sentence toolkit ---------- */
  {id:'people', region:'toolkit', glyph:'人', ja:'授受・敬語', en:'Who & how polite', th:'ใครกับใคร · ความสุภาพ',
    q_en:'Who does it for whom, and how politely?', q_th:'ใครทำให้ใคร และสุภาพแค่ไหน?', branches:[
    {id:'favours', en:'Favours, passive & causative', th:'ทำให้ · ถูกกระทำ · ให้ทำ',
      ids:['n3b19','n3b20','n3b21','n3b22']},
    {id:'others', en:'What others feel or want', th:'ความรู้สึกของคนอื่น',
      ids:['n3c10','n3c28']},
    {id:'keigo', en:'Polite language (keigo)', th:'ภาษาสุภาพ (เคโงะ)',
      ids:['n3e01','n3e02','n3e03','n2e01','n3g02','n2f20']},
    {id:'orders', en:'Orders', th:'คำสั่ง',
      ids:['n3g03','b410','b306']}
  ]},
  {id:'negation', region:'toolkit', glyph:'否', ja:'否定', en:'Negatives', th:'การปฏิเสธ',
    q_en:'Not at all, or not exactly?', q_th:'ไม่เลย หรือ ไม่ใช่เสียทีเดียว?', branches:[
    {id:'notatall', en:'Not at all · never', th:'ไม่… เลย · ไม่เคย',
      ids:['a321','a322','a323','n3f13','n2g05']},
    {id:'hardly', en:'Hardly · rarely · not very', th:'แทบไม่ · นานๆ ครั้ง · ไม่ค่อย',
      ids:['n3f18','n2f21','n3f05','a305','n3f35']},
    {id:'partial', en:'Not exactly · not always', th:'ไม่ใช่ว่า · ไม่เสมอไป', compare:'wake',
      ids:['n3b09','n2c28','n3f19','n2f11','n2f29']},
    {id:'without', en:'Without doing', th:'โดยไม่…',
      ids:['n3e04','n2e09','n2d02','n2f36']}
  ]},
  {id:'building', region:'toolkit', glyph:'構', ja:'文の組み立て', en:'Building blocks', th:'ส่วนประกอบประโยค',
    q_en:'Which pieces build a sentence?', q_th:'ประโยคประกอบขึ้นจากอะไร?', branches:[
    {id:'nouns', en:'Turning words into nouns', th:'ทำให้เป็นคำนาม',
      ids:['n3c07','n3c09','n3f28']},
    {id:'quote', en:'Quoting & defining', th:'อ้างถึง · ให้นิยาม',
      ids:['n3c08','n2h06','n2i06','b404']},
    {id:'verbs', en:'Verb add-ons', th:'คำเสริมท้ายกริยา',
      ids:['n3e08','n3e09','n3f20','n2i05','n3c15']},
    {id:'questions', en:'Questions & checking', th:'คำถาม · ถามย้ำ',
      ids:['n2i04','b310','b413','n3f14']},
    {id:'reading', en:'Reading longer sentences', th:'อ่านประโยคยาว',
      ids:['n2i01','n2i07']}
  ]}
];
