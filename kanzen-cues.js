/* Original bilingual retrieval cues. These summarize a use, not every exception. */
(function(){
  var rows=`
n3a07|A formal occasion: 利用する際に = when using; 訪れた際に = when you visited.|โอกาสแบบทางการ: 利用する際に เมื่อใช้; 訪れた際に เมื่อได้ไปเยือน
n2a01|A significant occasion, often with preparation or a formal action.|โอกาสสำคัญ มักมีการเตรียมหรือการกระทำอย่างเป็นทางการ
n2e04|The start of something important; often a positive undertaking.|เมื่อเริ่มสิ่งสำคัญ มักเป็นกิจกรรมที่ตั้งใจทำในทางบวก
n3a05|A happened → B suddenly happened. B is usually unexpected, not a request.|เกิด A แล้ว B เกิดทันทีโดยมักไม่คาดคิด ไม่ใช่คำขอให้ทำ B
n2a07|An observed action or state changes immediately; often a surprising switch.|สิ่งที่สังเกตเปลี่ยนทันที มักเปลี่ยนแบบน่าประหลาดใจ
n2a06|A had barely happened when B happened. Repeat the same verb: 着くか着かないか.|A แทบจะยังไม่เสร็จก็เกิด B ใช้กริยาเดิมสองครั้ง เช่น 着くか着かないか
n3a06|Right in the middle of an ongoing activity, often when interrupted.|อยู่ระหว่างทำสิ่งหนึ่งพอดี มักมีเหตุมาแทรก
n3a03|Use the opportunity before the current state changes: 熱いうちに.|ทำตอนที่สภาพยังเอื้อ ก่อนจะเปลี่ยน เช่น 熱いうちに ตอนยังร้อน
n2h01|A change develops while another activity continues; no deliberate deadline.|เกิดการเปลี่ยนแปลงระหว่างทำอีกสิ่งหนึ่ง ไม่ใช่กำหนดให้รีบทำ
n2c09|A change keeps going, usually in an unwelcome direction.|เปลี่ยนไปเรื่อย ๆ โดยมักเป็นทางที่ไม่ต้องการ
n2c08|One-way change keeps progressing; it can be good or bad.|เปลี่ยนไปทิศทางเดียวต่อเนื่อง ใช้ได้ทั้งดีและไม่ดี
n3b27|About to act, or trying to act: the action is not yet completed.|กำลังจะทำหรือพยายามจะทำ การกระทำยังไม่เสร็จ
n2c07|A gradual change is underway now: 改善しつつある.|การเปลี่ยนแปลงกำลังดำเนินอยู่ เช่น 改善しつつある กำลังดีขึ้น
n2h02|Two actions by the same subject happen together; a written alternative to ながら.|ประธานเดียวกันทำสองอย่างพร้อมกัน คล้าย ながら แต่เป็นภาษาเขียนกว่า
n3a08|Only after A did B become possible or clear: 失ってはじめて分かった.|ต้องเกิด A ก่อนจึงทำหรือเข้าใจ B ได้ เช่น เสียไปแล้วจึงเข้าใจ
n2a09|確認した上で = check first, then act. 生活する上で = in living, not after living.|確認した上で ตรวจแล้วค่อยทำ; 生活する上で ในการใช้ชีวิต ไม่ใช่หลังใช้ชีวิต
n2a03|As soon as A finishes, do B. Use the verb stem: 分かり次第連絡します.|ทันทีที่ A เสร็จจะทำ B ใช้ฐานกริยา เช่น 分かり次第連絡します
n2a08|A started a state or repeated activity that has continued since then.|A เป็นจุดเริ่มของสภาพหรือกิจกรรมที่ต่อเนื่องมาจนถึงตอนนี้
n2g10|Ever since that starting event; emphasizes the whole period up to now.|นับตั้งแต่เหตุการณ์เริ่มต้นนั้น เน้นช่วงเวลายาวมาจนถึงตอนนี้
n2a05|A must be completed first; otherwise B cannot happen.|ต้องทำ A ให้เสร็จก่อน ไม่เช่นนั้นทำ B ไม่ได้
n2e03|Name a representative example first, then include the rest of its group.|ยกตัวอย่างเด่นขึ้นก่อน แล้วรวมสิ่งอื่นในกลุ่มด้วย
n2d15|Even this basic example supports the judgment: 名前からして難しい.|แม้แต่ตัวอย่างพื้นฐานนี้ก็เป็นเช่นนั้น เช่น แค่ชื่อก็ยากแล้ว
n2d27|Judge from a clue: 態度からして = judging from the attitude.|ใช้สิ่งหนึ่งเป็นเบาะแสตัดสิน เช่น 態度からして ดูจากท่าที
n2d21|Across an entire span of time or area: 三日間にわたって.|ครอบคลุมช่วงเวลาหรือพื้นที่ทั้งหมด เช่น ตลอดสามวัน
n2b06|一年を通して = throughout the year; 友人を通して = via a friend.|一年を通して ตลอดปี; 友人を通して ผ่านเพื่อนเป็นสื่อกลาง
n2h03|The full visible or possible range: 見渡す限り = as far as the eye can see.|ขอบเขตทั้งหมดที่มองเห็นหรือทำได้ เช่น 見渡す限り สุดสายตา
n2h04|Do as much as the ability or desire allows: できるだけ、好きなだけ.|ทำเต็มขอบเขตที่ทำได้หรืออยากทำ เช่น できるだけ、好きなだけ
n2h05|Restrict an offer or permission to this group or occasion: 本日に限り.|จำกัดข้อเสนอหรือสิทธิ์เฉพาะกลุ่มหรือโอกาสนี้ เช่น เฉพาะวันนี้
n2e14|B remains true as long as condition A holds.|ตราบที่เงื่อนไข A ยังเป็นจริง B ก็ยังเป็นจริง
n2g14|Limit a claim to what you know or checked: 私が知る限りでは.|จำกัดคำกล่าวแค่ข้อมูลที่รู้หรือตรวจแล้ว เช่น เท่าที่ฉันรู้
n2b17|Context decides: only X; just when things go wrong; or X would never do that.|ดูบริบท: เฉพาะ X; ดันเกิดตอน X; หรือเชื่อว่า X ไม่มีทางทำแบบนั้น
n2b18|The range extends beyond A to other groups too.|ขอบเขตไม่ได้จำกัดแค่ A แต่รวมกลุ่มอื่นด้วย
n2b14|Formal “not only A but also B”; often paired with も.|ไม่เพียง A แต่ยัง B แบบเป็นทางการ มักใช้กับ も
n2b13|Add a further, often surprising fact: not only A, even B.|เพิ่มข้อเท็จจริงที่มักน่าประหลาดใจ: ไม่เพียง A แม้แต่ B ด้วย
n2b15|Treat A as obvious, then add B: not just A, of course, but B too.|ถือว่า A เป็นเรื่องแน่นอนอยู่แล้ว แล้วเพิ่ม B เข้าไป
n2b11|Add another fact in the same positive or negative direction.|เพิ่มข้อเท็จจริงอีกอย่างในทางดีหรือไม่ดีเหมือนกัน
n3f21|The subject matter of information or discussion; before a noun: に関する.|หัวข้อของข้อมูลหรือการสนทนา ขยายนามใช้ に関する
n2b10|An issue around which discussion, debate or conflict takes place.|ประเด็นที่มีการอภิปราย โต้แย้ง หรือความขัดแย้งเกิดขึ้นรอบ ๆ
n2c01|Single out a field of strength: 料理にかけては = when it comes to cooking skill.|ยกด้านที่เก่งเป็นพิเศษ เช่น 料理にかけては เมื่อพูดถึงฝีมือทำอาหาร
n3c17|A target (先生に対して) or a contrast between clauses; read both sides.|เป้าหมายที่กระทำต่อ เช่น 先生に対して หรือเปรียบต่างสองข้อความ ต้องดูทั้งสองฝั่ง
n2f15|An action responds to a request, expectation or demand.|การกระทำเพื่อตอบสนองคำขอ ความคาดหวัง หรือความต้องการ
n2b07|Use material as the starting point for creating something new.|ใช้ข้อมูลหรือสิ่งหนึ่งเป็นต้นแบบสร้างสิ่งใหม่
n2b08|Use a fact, rule or evidence as the basis for a decision or action.|ใช้ข้อเท็จจริง กฎ หรือหลักฐานเป็นฐานตัดสินหรือทำ
n2b09|Follow the course of a route, plan, wish or policy.|ทำไปตามเส้นทาง แผน ความประสงค์ หรือนโยบาย
n2c03|Under someone’s guidance or under certain conditions.|ภายใต้การชี้นำของใคร หรือภายใต้เงื่อนไขบางอย่าง
n2c12|Designed for an audience; 向き means suitable for, without necessarily being designed for them.|ออกแบบมาเพื่อกลุ่มเป้าหมาย ส่วน 向き คือเหมาะกับ ไม่จำเป็นต้องตั้งใจทำให้กลุ่มนั้น
n2b23|As A gradually changes, B changes with it; not a one-time “when”.|เมื่อ A ค่อย ๆ เปลี่ยน B ก็เปลี่ยนตาม ไม่ใช่เหตุการณ์ครั้งเดียว
n2b24|Change in step with A, or follow an instruction: context separates the two uses.|เปลี่ยนไปตาม A หรือทำตามคำสั่ง ต้องดูบริบทเพื่อแยกสองความหมาย
n2b25|One change accompanies or brings another; often formal developments.|การเปลี่ยนแปลงหนึ่งเกิดพร้อมหรือนำไปสู่อีกอย่าง มักใช้เรื่องทางการ
n3c20|Together with a person, alongside another action, or changing together; check what precedes it.|ร่วมกับคน ควบคู่การกระทำ หรือเปลี่ยนตามกัน ต้องดูสิ่งที่เชื่อมข้างหน้า
n2a04|The outcome depends on X: 結果は努力次第だ. Different from stem + 次第 “as soon as”.|ผลขึ้นอยู่กับ X เช่น ผลขึ้นกับความพยายาม ต่างจากฐานกริยา + 次第 ที่แปลว่าทันที
n2d20|Adjust the response to match a need, level or condition.|ปรับสิ่งที่จะทำให้เหมาะกับความต้องการ ระดับ หรือเงื่อนไข
n2f17|Whenever a trigger occurs, a thought or feeling returns.|ทุกครั้งที่มีสิ่งกระตุ้น ความคิดหรือความรู้สึกนั้นก็เกิดขึ้น
n2b16|List mixed examples, often with a feeling of being busy or overwhelmed.|ยกหลายตัวอย่างปะปนกัน มักสื่อความวุ่นวายหรือรับมือไม่ไหว
n2g02|Try two descriptions because neither alone says it perfectly.|ลองอธิบายสองแบบ เพราะคำเดียวอาจยังไม่ตรงทั้งหมด
n2a26|Whichever alternative applies, the same conclusion holds: AにせよBにせよ.|ไม่ว่าจะเป็นทางเลือก A หรือ B ข้อสรุปก็เหมือนกัน
n2f27|Give examples before a general noun: 茶や水といった飲み物.|ยกตัวอย่างแล้วตามด้วยนามรวม เช่น เครื่องดื่มอย่างชาและน้ำ
n2c04|A category is not a restriction: 年齢を問わず.|หมวดนั้นไม่ใช่ข้อจำกัด เช่น ไม่จำกัดอายุ
n2f13|The result or rule is independent of a condition: 天候にかかわらず.|ผลหรือกฎไม่ขึ้นกับเงื่อนไขนั้น เช่น ไม่ว่าสภาพอากาศเป็นอย่างไร
n2f08|Act without caring about something normally worth considering.|ทำโดยไม่สนสิ่งที่ปกติควรคำนึงถึง
n2c05|Leave A undecided or aside, then evaluate B.|พัก A ไว้ก่อนหรือยังไม่ตัดสิน แล้วกล่าวถึง B
n2g01|Set one topic aside to move to a more relevant one.|พักหัวข้อหนึ่งไว้เพื่อเข้าสู่เรื่องที่เกี่ยวข้องกว่า
n2d17|Reject the possibility itself: that cannot possibly be true.|ปฏิเสธความเป็นไปได้โดยตรง: ไม่มีทางเป็นจริง
n2c27|Circumstances leave no room for that activity: 忙しくて旅行どころではない.|สถานการณ์ไม่เอื้อให้ทำเรื่องนั้น เช่น ยุ่งจนไม่ใช่เวลาจะเที่ยว
n2a24|Replace an expectation with the opposite or something much more extreme.|สิ่งจริงตรงข้ามกับที่คาด หรือรุนแรงเกินกว่านั้นมาก
n2d12|An emphatic “no way”: reject an idea or firmly refuse to act.|ไม่มีทางแบบหนักแน่น ใช้ปฏิเสธความคิดหรือยืนยันว่าไม่ทำ
n3b09|Limit a statement, rather than deny every case: not necessarily / not entirely.|จำกัดคำกล่าว ไม่ได้ปฏิเสธทุกกรณี: ไม่จำเป็นต้องเป็นเช่นนั้นทั้งหมด
n2f29|That condition alone does not guarantee the conclusion.|เงื่อนไขนั้นเพียงอย่างเดียวไม่ได้รับประกันข้อสรุป
n2h06|Define or explain a term: Xとは、Yのことだ.|นิยามหรืออธิบายคำ เช่น X คือสิ่งที่เรียกว่า Y
n3f30|Pick up a mentioned topic and introduce an association.|หยิบหัวข้อที่กล่าวถึงมาโยงเรื่องที่นึกถึง
n2h07|Concede a description with a reservation: 安いといえば安いが…|ยอมรับคำอธิบายแบบมีข้อแม้ เช่น จะว่าถูกก็ถูกอยู่ แต่…
b411|A mentioned word brings a familiar example to mind.|คำที่กล่าวถึงทำให้นึกถึงตัวอย่างที่คุ้นเคย
n2g12|When this particular subject arises, someone’s usual attitude changes.|พอเป็นเรื่องนี้โดยเฉพาะ ท่าทีของใครก็เปลี่ยนจากปกติ
n2h08|Highlight an extreme impression, often too strong to describe fully.|เน้นความรู้สึกที่มากจนแทบอธิบายไม่หมด
n2a19|A is true, yet B goes against the expectation it creates.|A เป็นจริง แต่ B ขัดกับสิ่งที่ควรคาดจาก A
n2a20|Acknowledge A as fact, then state a contrasting result or limitation.|ยอมรับว่า A เป็นจริง แล้วบอกผลหรือข้อจำกัดที่สวนทาง
n3a30|Although the same person or thing has A, it also has contrasting B.|ทั้งที่คนหรือสิ่งเดียวกันมี A กลับมี B ที่ขัดกันด้วย
n2e05|Acknowledge something, but act against it: 悪いと知りつつ.|ทั้งที่รับรู้อย่างหนึ่งกลับทำสวนทาง เช่น รู้ว่าไม่ดีแต่ยังทำ
n3f31|Correct the impression created by a label: “I say X, but only…”|แก้ภาพที่ผู้ฟังอาจเข้าใจจากคำหนึ่ง เช่น บอกว่า X ก็จริง แต่แค่…
n2a25|“Just because A” does not justify B; often followed by a negative judgment.|เพียงเพราะ A ไม่ได้แปลว่าควรสรุป B มักตามด้วยคำตัดสินปฏิเสธ
n3a25|Set a hypothetical premise and consider its consequence.|ตั้งสมมติฐานแล้วพิจารณาผลที่ตามมา
n2b04|Once the situation becomes real, a consequence or response follows.|เมื่อสถานการณ์กลายเป็นจริง ผลหรือการตอบสนองจึงตามมา
n2b03|An unlikely possibility, often a wish: 戻れるものなら戻りたい.|สิ่งที่เป็นไปได้ยาก มักใช้บอกความอยาก เช่น ถ้าย้อนกลับได้ก็อยากกลับ
n2g11|Volitional verb + ものなら: if this happened, serious trouble would follow.|กริยารูปตั้งใจ + ものなら ถ้าเกิดขึ้นละก็จะมีปัญหาหนักตามมา
n2b02|Unless A is satisfied, B is impossible or cannot be judged.|ถ้าไม่ทำ A ก็ทำหรือตัดสิน B ไม่ได้
n2h09|A is indispensable: without A, the following result cannot work.|A ขาดไม่ได้ ถ้าไม่มี A ผลต่อไปก็เกิดไม่ได้
n2a27|Even if the hypothetical case is true, the conclusion stays the same.|แม้สมมติฐานจะจริง ข้อสรุปก็ยังเหมือนเดิม
n3c18|Check the role: cause, method, passive agent, or variation depending on X.|ดูหน้าที่: สาเหตุ วิธี ผู้กระทำในประโยคถูกกระทำ หรือความต่างตาม X
n3a16|Explain personal circumstances, often to soften an excuse; もの is more casual.|อธิบายเหตุส่วนตัว มักใช้แก้ตัวอย่างนุ่มนวล ส่วน もの กันเองกว่า
n3a14|Credit a cause for a welcome result. Irony is possible in context.|ยกความดีให้เหตุที่ทำให้เกิดผลดี บางบริบทใช้ประชดได้
n3a13|Blame a cause for an unwelcome result; せいか means perhaps because.|โทษสาเหตุของผลเสีย ส่วน せいか คืออาจเป็นเพราะ
n2a13|An excessive feeling or state causes a result: 緊張のあまり忘れた.|ความรู้สึกหรือสภาพมากเกินไปจนเกิดผล เช่น ตื่นเต้นจนลืม
n2f18|A concise, formal reason in a notice: 工事中につき立入禁止.|เหตุแบบกระชับในประกาศทางการ เช่น ห้ามเข้าเนื่องจากก่อสร้าง
n2g08|Give one reason among others for a suggestion or decision.|ยกเหตุผลหนึ่งจากหลายเหตุเพื่อเสนอหรือตัดสินใจ
n2a16|Predict from a particular person’s known character or habits.|คาดจากนิสัยหรือพฤติกรรมที่รู้อยู่แล้วของคนนั้น
n2a15|Precisely because A, the result or feeling is especially strong or expected.|เพราะเป็น A ผลหรือความรู้สึกจึงยิ่งแรงหรือเป็นไปตามคาด
n2a14|Focus regret on one cause of an unfortunate outcome.|เสียดายที่เหตุเพียงอย่างเดียวทำให้เกิดผลเสีย
n3a17|Given your commitment or situation, a responsibility or resolve follows.|เมื่อรับปากหรืออยู่ในสถานการณ์นี้ ก็มีหน้าที่หรือความมุ่งมั่นตามมา
n2a17|Now that A is a fact, a natural duty or conclusion follows.|เมื่อ A เป็นจริงแล้ว หน้าที่หรือข้อสรุปที่ควรเป็นก็ตามมา
n2f38|Formal resolve or obligation once a decision has been made.|ความตั้งใจหรือหน้าที่แบบทางการ เมื่อได้ตัดสินใจแล้ว
n2d03|Hard to accept, believe or forget; usually not a lack of physical skill.|ยากที่จะยอมรับ เชื่อ หรือลืม มักไม่ใช่เพราะขาดทักษะทางกาย
n3c06|You could physically do it, but duty or circumstances prevent you.|ทำได้ทางกาย แต่หน้าที่หรือสถานการณ์ทำให้ทำไม่ได้
n2c17|A polite or formal “cannot do that”; not ordinary lack of ability.|ทำเช่นนั้นให้ไม่ได้อย่างสุภาพหรือทางการ ไม่ใช่บอกว่าไม่มีทักษะทั่วไป
n2b28|There is no method or necessary information to do it.|ไม่มีวิธีหรือข้อมูลที่จำเป็นจะทำสิ่งนั้น
n2c18|Possibility: 起こり得る. Read 得る as える or うる, but 得ない only as えない.|ความเป็นไปได้ เช่น 起こり得る; 得る อ่าน える หรือ うる แต่ 得ない อ่าน えない เท่านั้น
n3a29|The result differs from what the degree or situation would suggest.|ผลต่างจากที่คาดตามระดับหรือสถานการณ์นั้น
n3f24|Given this stated person, status or fact, the result is surprising.|เมื่อเทียบกับคน สถานะ หรือข้อเท็จจริงที่ระบุ ผลดูผิดคาด
n2d13|The good result lives up to the effort, reputation or experience.|ผลดีสมกับความพยายาม ชื่อเสียง หรือประสบการณ์
n3c19|Name the role or capacity in which someone acts.|บอกบทบาทหรือฐานะที่ใช้ทำสิ่งหนึ่ง
n3c30|Evaluate something from someone’s standpoint: 私にとって大切だ.|ประเมินจากมุมมองของคนหนึ่ง เช่น สำคัญสำหรับฉัน
n2f16|Imagine how the situation looks or feels from another person’s position.|ลองมองหรือรู้สึกจากจุดยืนของอีกคน
n3c33|You did A and discovered B as its result; not just any chronological “when”.|ทำ A แล้วพบผล B ไม่ใช่เมื่อที่บอกลำดับเวลาใด ๆ
n3c34|After A, an expected next event has not happened; the state remains.|หลัง A แล้วเหตุที่คาดว่าจะตามมาไม่เกิด สภาพยังคงเดิม
n2a11|After a lengthy process, an unwelcome or disappointing result.|หลังผ่านกระบวนการยาวนาน สุดท้ายได้ผลไม่ดีหรือน่าผิดหวัง
n2a12|A long process reaches its conclusion; the result need not be bad.|กระบวนการยาวนานลงเอยด้วยข้อสรุป ผลไม่จำเป็นต้องแย่
n2f31|Nearly happened, but did not: 忘れるところだった; negative verbs also work.|เกือบเกิดแต่ไม่เกิด เช่น 忘れるところだった; ใช้กริยาปฏิเสธข้างหน้าได้ด้วย
n2g03|The chance passed and you ended up never doing it: 行かずじまい.|โอกาสผ่านไป สุดท้ายไม่ได้ทำ เช่น 行かずじまい
n2d14|Treat something as a low bar or small matter: 名前ぐらい書ける.|ถือว่าเป็นเรื่องเล็กหรือขั้นต่ำ เช่น แค่ชื่อก็เขียนได้
n2g04|Downplay or distance yourself from a thing: 私なんか. Tone can sound dismissive.|ลดความสำคัญหรือถ่อมตัว เช่น 私なんか; น้ำเสียงอาจฟังดูดูถูกได้
n2e02|Emphasize how far someone goes, sometimes questioning that extreme effort.|เน้นว่าทำถึงขนาดนั้น บางครั้งสื่อว่าไม่คุ้มจะทำขนาดนี้
n2g05|Number + として + negative: not even one exception.|จำนวน + として + ปฏิเสธ คือไม่มีแม้แต่หนึ่งที่เป็นข้อยกเว้น
n2b21|Even this unexpected or extreme example is true, so lesser cases are implied.|แม้แต่ตัวอย่างที่คาดไม่ถึงหรือสุดขั้วยังเป็นจริง จึงสื่อถึงกรณีอื่นด้วย
n2b01|Only this one condition needs to be met: お金さえあれば.|ขอเพียงเงื่อนไขเดียวนี้เป็นจริง เช่น ขอแค่มีเงิน
n2f22|Determined to do B, even by taking an extreme measure A.|ตั้งใจจะทำ B ให้ได้ แม้ต้องใช้วิธี A ที่สุดโต่ง
n2g13|Infer an explanation from what you observe; it is not direct knowledge.|คาดเหตุอธิบายจากสิ่งที่สังเกต ไม่ใช่รู้โดยตรง
n2c16|A bad outcome could realistically happen; a warning, not inability.|มีโอกาสเกิดผลเสียจริง เป็นคำเตือน ไม่ใช่ทำไม่ได้
n2a18|A risk of an unwelcome event; common in reports and warnings.|ความเสี่ยงที่เหตุไม่ดีอาจเกิด มักใช้ในรายงานและคำเตือน
n2c20|Context decides: a prediction that it will not happen, or resolve not to do it.|ดูบริบทว่าเป็นการคาดว่าจะไม่เกิด หรือความตั้งใจว่าจะไม่ทำ
n2g06|A cautious positive opinion: よいのではあるまいか ≈ perhaps it is good.|เสนอความเห็นเชิงบวกอย่างระวัง เช่น よいのではあるまいか อาจจะดีก็ได้
n3b06|Strong confidence based on reasons: “must be”, not an obligation to act.|มั่นใจจากเหตุผลว่าเป็นอย่างนั้นแน่ ไม่ใช่ต้องทำตามหน้าที่
n2d09|Formal strong certainty; similar to に違いない.|ความมั่นใจมากแบบทางการ ใกล้กับ に違いない
n2c15|A firm, often subjective “of course it must be”.|มั่นใจหนักแน่นว่าแน่นอนอยู่แล้ว มักเป็นความเชื่อส่วนตัว
n3c25|A general tendency or an emotional reflection; context determines the use.|แนวโน้มทั่วไปหรือความรู้สึกสะท้อนใจ ต้องดูบริบท
n2c26|Judge a situation as fitting a description: それは無責任というものだ.|ประเมินว่าสถานการณ์นั้นสมควรเรียกเช่นนี้ เช่น นั่นเรียกว่าไร้ความรับผิดชอบ
n2c24|Limit the importance or amount: merely / no more than.|จำกัดความสำคัญหรือปริมาณว่าเป็นเพียงเท่านั้น
n2c25|Identify the real explanation or identity emphatically: nothing other than.|ย้ำตัวตนหรือสาเหตุแท้จริงว่าไม่มีอะไรอื่นนอกจากสิ่งนี้
n2e11|A is preferable or safest, though not strictly required.|A ดีกว่าหรือปลอดภัยที่สุด แต่ไม่ใช่ข้อบังคับเด็ดขาด
n3c05|No available alternative except this action.|ไม่มีทางเลือกอื่นนอกจากทำสิ่งนี้
n2f33|No other course remains; close to しかない, with a more formal tone.|ไม่เหลือทางอื่น ใกล้กับ しかない แต่เป็นทางการกว่า
n3b30|What someone ought to do, based on a norm or judgment.|สิ่งที่ควรทำตามหลักหรือคำตัดสิน
n3f04|What someone ought not do. This is stronger than “no need”.|สิ่งที่ไม่ควรทำ แรงกว่าไม่จำเป็นต้องทำ
n2f34|An emphatic invitation for us to act together; often a speech or appeal.|ชวนให้พวกเราลงมือร่วมกันอย่างหนักแน่น มักใช้ในคำปราศรัย
n2c21|Practical advice for a situation: 毎日練習することだ.|แนะนำวิธีทำในสถานการณ์หนึ่ง เช่น ควรฝึกทุกวัน
n2h14|Advice framed as a general social principle or proper conduct.|คำแนะนำที่อ้างหลักทั่วไปของสังคมหรือการประพฤติที่เหมาะสม
n2f10|General advice against an action; can sound parental or admonishing.|หลักทั่วไปว่าไม่ควรทำ อาจฟังเหมือนผู้ใหญ่ตักเตือน
n2c22|Reassure someone that an action is unnecessary, not forbidden.|บอกให้สบายใจว่าไม่จำเป็นต้องทำ ไม่ได้ห้ามทำ
n2f35|Weigh doing something against not doing it; the decision is still open.|ลังเลว่าจะทำหรือไม่ทำ ยังไม่ได้ตัดสินใจ
n2b26|A feeling or sensation is very strong and hard to bear.|ความรู้สึกหรืออาการแรงจนทนแทบไม่ไหว
n2b27|An uncontrollably strong feeling or state; しょうがない is more conversational.|ความรู้สึกหรือสภาพแรงจนห้ามไม่ได้ しょうがない เป็นภาษาพูดกว่า
n2d06|A feeling or thought arises so strongly that you cannot stop it.|ความรู้สึกหรือความคิดเกิดขึ้นเองแรงจนห้ามไม่ได้
n2b22|An inner urge makes you act: 笑わずにはいられない = cannot help laughing.|แรงผลักจากข้างในทำให้ต้องทำ เช่น กลั้นหัวเราะไม่ได้
n2c14|Cannot NOT do it: social duty makes the action necessary.|ไม่ทำไม่ได้ หน้าที่หรือสังคมทำให้จำเป็นต้องทำ
n2c13|Reluctantly do it because circumstances leave no choice; する → せざる.|จำใจทำเพราะสถานการณ์ไม่เหลือทางเลือก する เปลี่ยนเป็น せざる
n2g09|Express a heartfelt or general wish, rather than an immediate request.|บอกความปรารถนาจากใจหรือโดยทั่วไป ไม่ใช่คำขอเฉพาะหน้าทันที
n2d16|Past verb + ものだ recalls something you used to do, often nostalgically.|กริยาอดีต + ものだ ย้อนนึกถึงสิ่งที่เคยทำ มักมีความคิดถึง
n2g07|Wish for a difficult possibility: “Isn’t there some way to…?”|หวังให้สิ่งที่ยากเป็นไปได้: ไม่มีทางที่จะ…ได้บ้างหรือ
n2d11|A quality gives you a strong impression: 心に響くものがある.|คุณสมบัติบางอย่างทำให้รู้สึกชัด เช่น มีบางอย่างที่สะเทือนใจ
n2h10|React with admiration or surprise; distinct from practical advice ことだ.|แสดงความชื่นชมหรือประหลาดใจ ต่างจาก ことだ ที่ให้คำแนะนำ
n2g15|How much / how many…! Express emotion, not a question expecting a number.|มากแค่ไหนหรือกี่ครั้งกันนะ! แสดงอารมณ์ ไม่ใช่ถามเพื่อเอาตัวเลข
n2h12|A written instruction: Vること = do; Vないこと = do not.|คำสั่งที่เขียนไว้ Vること ให้ทำ; Vないこと ห้ามทำ
n2e09|Without doing A, B happens; a formal alternative to ないで.|เกิด B โดยไม่ได้ทำ A เป็นทางการกว่า ないで
a421|State your emotional reaction first: 驚いたことに = to my surprise.|เกริ่นความรู้สึกก่อน เช่น 驚いたことに ที่น่าประหลาดใจคือ
n3g05|Admit A is true, then add a limitation: 読むことは読んだが…|ยอมรับว่า A จริง แล้วมีข้อแม้ เช่น อ่านก็อ่านแล้ว แต่…
n3b10|Report what was heard, or state what something implies; context decides.|รายงานสิ่งที่ได้ยิน หรือบอกข้อสรุปที่สื่อ ต้องดูบริบท
n3g09|Pass on a reported message politely: 明日は休みとのことです.|ถ่ายทอดข้อความที่ได้รับมาอย่างสุภาพ เช่น ได้แจ้งว่าพรุ่งนี้หยุด
n3b08|The facts explain the result: “That explains why…”|ข้อเท็จจริงอธิบายผลได้: มิน่าล่ะถึง…
n2d08|Draw or restate a logical conclusion: つまり…というわけだ.|สรุปหรือกล่าวข้อสรุปตามเหตุผลใหม่ เช่น กล่าวคือ…นั่นเอง
n2h13|Use an observed feature or fact as the source of an inference or name.|ใช้ลักษณะหรือข้อเท็จจริงเป็นที่มาของการอนุมานหรือชื่อ
n3f15|A fact gives the reason for a conclusion, discovery or name.|ข้อเท็จจริงเป็นเหตุให้สรุป ค้นพบ หรือตั้งชื่อ
n2h11|List things people say or do, often with annoyance or criticism.|ยกหลายสิ่งที่คนพูดหรือทำ มักแฝงความรำคาญหรือตำหนิ
n2e12|Only this; a formal restriction, often on notices.|เฉพาะสิ่งนี้ เป็นคำจำกัดแบบทางการ มักอยู่ในประกาศ
`;
  rows.trim().split('\n').forEach(function(line){var x=line.split('|');KANZEN_CUES[x[0]]=[x[1],x[2]];});
})();

/* Book coverage and broad JLPT tags are different classifications. */
var KANZEN_N2_IDS=new Set(COVERAGE.flatMap(function(c){return c.items.flatMap(function(r){return r.ids;});}).concat(KANZEN_SKILLS.map(function(s){return s.id;})));
function inStudyLevel(g,level){return level==='all'||g.lv===level||(level==='N2'&&KANZEN_N2_IDS.has(g.id));}
