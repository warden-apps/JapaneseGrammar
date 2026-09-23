# Grammar coverage and source review

## Official N2 expansion — 23 September 2026

The current N2 drill contains **118 questions: 44 official and 74 original**.
The complete bank is 153 questions including the existing N3/mixed material.
This expansion prioritizes N2, as requested. It adds no N3 examination questions.

| Official N2 workbook | Included section | Questions | Verified key |
| --- | --- | --- | --- |
| [2012 publication](https://www.jlpt.jp/samples/sample2012/pdf/N2G.pdf) | Grammar Q7–9, items 33–54 | 12 choice + 5 order + 5 passage blanks | [Answer PDF, p. 1](https://www.jlpt.jp/samples/sample2012/pdf/N2answer.pdf) |
| [2018 publication, Vol. 2](https://www.jlpt.jp/samples/sample2018/pdf/N2G.pdf) | Grammar Q7–9, items 33–54 | 12 choice + 5 order + 5 passage blanks | [Answer PDF, p. 1](https://www.jlpt.jp/samples/sample2018/pdf/N2answer.pdf) |

Source: Official Worldwide Japanese-Language Proficiency Test Website
(https://www.jlpt.jp/), operated by The Japan Foundation / Japan Educational
Exchanges and Services. The [workbook introduction](https://www.jlpt.jp/e/samples/sampleindex.html)
states that these books select questions used in real tests since the 2010
revision. The dates above are **publication dates**, not claims about which
exam session first used a question.

The [site policy §1(1)](https://www.jlpt.jp/e/policy.html) explicitly permits
copying, adapting and translating for personal study. Its §1(4) separately
permits attributed reproduction for Japanese education when no fee is charged
for the produced teaching materials, with third-party exceptions. The workbook
page marks specific N2 reading sections as third-party works; neither edition's
N2 grammar sections Q7–9 are in those marked lists. No commercial textbook
exercises or unofficial recalled-paper collections were used.

The Japanese prompts and four options were transcribed against rendered PDF
pages. The answer indices were checked against the rendered official keys and
stored in a separate regression fixture. All ten sentence orders were assembled
and checked as full sentences, including the child's wish vs. the parent's wish
in 2012 Q48. Presentation changes: normalized spacing, omitted furigana, numbered
passage blanks 1–5, responsive layout and shuffled displayed option order. The
original item numbers and answer indices remain in metadata. Source links open
the exact PDF page; official answer-key links appear in feedback.

English/Thai explanations, translations, distractor reasons, full-order
reconstructions and lesson tagging are **independent app content**, not an
official translation or explanation. A source label distinguishes official
items from the 48 additional original N2 questions in `jlpt-n2-practice.js`.
Nine original support lessons bring the library to 445 entries and concise
lesson guides to 47. They cover structures actually needed for N2 questions,
including basic clause structure, aspect and passage reference; the N2 label
does not mean those structures are exclusive to N2.

N2 eligibility uses the exam level even when a tested foundation lesson is
labelled N3. Studied scope checks **all** tagged targets; five-blank passages
remain a single unit. At least one official question is included whenever
eligible, while unused or less-used items receive priority within the format
groups. Rounds reserve available formats before filling remaining places, so
two long passages cannot crowd out sentence gaps and ★ questions. New installs
start at N2; existing preferences and progress are preserved.

N2 currently contains 88 sentence gaps, 16 order questions and 14 passage blanks,
linked to 101 distinct target lessons. This remains a finite practice bank, not
complete coverage of all library entries or a full scored JLPT mock. The
independent explanations have not had an external specialist review.

## Earlier random drill and daily retrieval update — 21 September 2026

The official N2/N3 grammar formats are selecting a grammar form, sentence
composition, and text grammar. The first version followed those formats with original
material: 33 sentence-gap questions, 12 four-part ★ questions and eight short
passages with two linked blanks each. At that stage no official question text or
textbook exercise had been imported. [Official JLPT test composition](https://www.jlpt.jp/e/guideline/testsections.html),
[official N2 item purposes](https://jlpt.jp/e/guideline/pdf/n2_e.pdf),
[official sample-question guidance](https://www.jlpt.jp/e/samples/forlearners.html).

That first bank had 61 questions across 30 target entries, not a question for every
one of the then 436 library entries. The bank includes Japanese context, four choices,
English/Thai explanations and translations. Distractor feedback refers to the
particular context rather than claiming a grammatical form is universally wrong.
Sentence-order feedback displays the complete order; passage feedback leaves
later blanks unanswered. “Studied” scope requires every tested target in a
passage to have been encountered, while distractors may be unfamiliar.

Daily Study uses these new sentence contexts where available and rotates among
authored alternatives. Later reviews begin with recall, without a title or
answer preview. Assisted answers and immediate post-lesson success do not
promote the daily review level. Other library entries keep authored legacy
questions or a clearly labelled self-assessment. This is a learning design,
not a guarantee of memorization, exam readiness or a professionally calibrated
JLPT score. The new content has structural and browser tests; these do not
substitute for a full independent linguistic review.

Reviewed 19–20 September 2026. The app's explanations, English/Thai translations and added examples are original learning material, not excerpts from the textbook.

## What can be trusted in the pasted list?

The book is **Shin Kanzen Master Bunpō**, 新完全マスター文法 日本語能力試験 N2. The publisher confirms the title, 211 grammar forms, meaning-based organization and separate practice for sentence construction and text grammar. The pasted chapter sequence broadly matches its public contents. The public page skips chapter 21 in the displayed sequence, so that chapter's mapping follows the user's supplied list. This is not a page-by-page verification of a physical edition. [Publisher's book page](https://www.3anet.co.jp/np/books/3602/)

The pasted English glosses contain mistakes and oversimplifications. They are useful as a checklist, not as authoritative usage rules. No URL identifying the original list author was supplied. The JLPT itself does not publish an exhaustive vocabulary/kanji/grammar list; the app's N3/N2 labels are learning guidance, not an official syllabus. [JLPT official FAQ](https://www.jlpt.jp/e/faq/)

## Coverage delivered

`grammar-expansion.js` maps every grammar line in the supplied chapters 1–26 and the three supplementary grammar lists. It reuses stable lesson IDs where the expression was already present. Multiple variants and senses may share a row, and repeated textbook checklist items point to the same lesson rather than duplicating saved progress.

- Original app: **422 entries**. With the expansion: **436 entries**.
- **14 new lessons**, each with English and Thai meaning, connection, usage guidance, compact recall cue and at least two original Japanese examples with kana and both translations.
- **30 existing lessons updated**, including connector corrections, clarified meanings, missing variants and additional examples.
- **26 chapter groups + 3 supplement groups**, containing **156 checklist rows** (141 in chapters 1–26) and **171 distinct lesson IDs**.
- Existing IDs are preserved. A newly separated sense starts as a new lesson; progress on old lessons remains associated with the old IDs.

| New ID | Missing form or focused sense |
| --- | --- |
| n2h01 | うちに: a change develops during an activity |
| n2h02 | つつ: two actions in parallel |
| n2h03 | 限り: the fullest extent or range |
| n2h04 | だけ: as much as one can/wants |
| n2h05 | に限り: formal restriction |
| n2h06 | とは: definition |
| n2h07 | といえば…が: qualified admission |
| n2h08 | といったら: strong emotional emphasis |
| n2h09 | を抜きにしては: an essential condition |
| n2h10 | ことだ: emotional evaluation |
| n2h11 | だの…だの: example listing |
| n2h12 | こと: written instruction or rule |
| n2h13 | ところから: reasoning from a feature/fact |
| n2h14 | ものだ: advice based on a general principle |

The vocabulary lists and page-specific word glosses were not imported as grammar lessons. The “grammar properties” headings (fact versus feeling, perspective, polarity, what follows, fixed combinations) and sentence-construction headings describe ways to practise; they are not additional standalone grammar forms. This checklist does not claim to reproduce all 211 forms or every exercise in the book.

## Important corrections

| Issue in the pasted gloss or existing app | How to understand it |
| --- | --- |
| 一方だ labelled negative | It describes change in one direction; an improving situation is possible. The existing lesson already correctly included improvement. |
| うちに given one main explanation | Acting before an opportunity ends and a change happening during an activity are taught separately. [Japan Foundation](https://www.kyozai.jpf.go.jp/kyozai/material/BMA00065/ja/render.do) |
| “からでないと” | The checklist uses the complete target **Vてからでないと / Vてからでなければ**. |
| をめぐって requires a plural subject | Multiple parties are common in disputes, but grammatical number is not a rule. |
| ものなら simply “if one does” | This sense generally imagines an unlikely possibility; ようものなら introduces an unwelcome consequence. [Shogakukan Digital Daijisen](https://kotobank.jp/word/ものなら-646356) |
| まい and ではあるまいか treated as the same negative guess | まい can express prediction or resolve. ではあるまいか is a rhetorical, tentative suggestion. Connections are corrected, including the required の with verbal clauses. [Shogakukan Digital Daijisen](https://kotobank.jp/word/まい-632809) |
| ようか…まいか called “no intention” | It expresses indecision about whether to act. |
| わけにはいかない versus ないわけにはいかない | The negative verb reverses the logic: cannot do versus cannot avoid doing. |
| にしては/わりに called specific/general “words” | These concern the expectation used as a standard, not a universal word-type sorting rule. |
| どころか and どころではない merged in English | The former can mean “far from X; actually Y”; the latter commonly says the circumstances do not allow X. They keep separate lessons. |
| “もの = emotion, こと = emotion” | These forms have several distinct functions. Norms, reflection, memories, advice and rules need separate contexts. [Japan Foundation on もの](https://www.jpf.go.jp/j/project/japanese/teach/tsushin/grammar/201206.html) |
| つつ treated only as contrast | Simultaneous action, contrast and つつある change are distinguished. [Shogakukan Digital Daijisen](https://kotobank.jp/word/つつ-571855) |
| 限り meanings merged | Maximum range, continuing condition and information boundary are distinguished. [Shogakukan Digital Daijisen](https://kotobank.jp/word/限り-459951) |
| たとえ translated “for example” in vocabulary | Modern たとえ…ても means “even if.” “For example” is **例えば**. The faulty vocabulary gloss was not imported. [Shogakukan Digital Daijisen](https://kotobank.jp/word/仮令-491149) |

Existing overstatements were also softened: the result of たとたん need not always be past tense; 最中 need not include an interruption; ようとする does not imply failure; 向き need not describe an accidental fit; てまで need not always express disapproval; fixed 何かにつけ can introduce an action; and とみえる is not restricted to visually observing another person. The mismatched negative example under positive というものだ was replaced.

## Verification and limits

The expansion passes JavaScript syntax checking. A Node VM loaded the original dataset and expansion, checked every coverage reference, detected duplicate IDs, and verified required lesson fields, short cues and all four example fields. All 436 entries have at least two examples; all 156 coverage rows resolve; no duplicate IDs or missing references were found.

Source metadata is available in `CONTENT_SOURCES` for the app to display. Publisher and dictionary pages corroborate structure and the specific distinctions identified above; they do not certify every sentence in the app. This is a targeted content review, not a claim that every inherited lesson has undergone a full professional linguistic review. The original explanations prioritize useful tendencies without presenting every exception as a beginner rule.

The publisher's teaching guide also recommends comparing similar forms and then creating example sentences, supporting the app's shift toward active practice. [Publisher's teaching guide](https://plus.3anet.co.jp/japanese-edu/koza009-01/)
