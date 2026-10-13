# Grammar coverage and source review

## Shin Kanzen Master N2 audit — 11 October 2026

**Status: supplied checklist mapped; full printed index and every book explanation
not verified.** Do not describe this as a complete digital edition or 211/211 check.

The [publisher's book page](https://www.3anet.co.jp/np/books/3602/), ISBN
9784883195657, advertises 211 grammar forms. Its public contents list the main
chapters and later topic headings, but not a complete itemized index of all forms
and explanations. Chapter 21 is absent from that web table of contents; its mapping
uses the user's supplied list. The discontinued publisher companion's 198 forms
are a different scope, not a replacement for the book's 211-form claim.

- All 156 rows in the supplied chapter/supplement checklist link to 171 existing
  app lessons. Grouped variants and repeated senses make these counts different
  from the publisher's grammar-form count.
- `kanzen-cues.js` adds a short original English/Thai choosing cue to every mapped
  lesson. Cues highlight attachment, scope, viewpoint, tone, or a useful contrast;
  they are tendencies to check in context, not one-keyword answer tricks.
- `kanzen-content.js` adds 22 original support lessons: seven organization topics,
  three sentence-building skills and twelve passage-grammar skills matching the
  public topic headings. Each has two original translated examples, key clues,
  notes and links to related grammar. These are topic introductions, not proof of
  every subpoint covered in those book sections. Grammar-properties guidance also
  covers negative endings, question words, numbers, noun modifiers and fixed pairs.
- Expanded 上で to include dictionary-form “in doing”, with its own phrase tab;
  expanded ところだった to include negative verbs; clarified 得る readings and
  exposed the というわけではない, おかげだ, せいだ and perspective にしても variants.
- N2 daily study/library eligibility now includes book-mapped lessons with an N3
  label. Their original IDs, level labels and saved progress remain intact.
- `kanzen-practice.js` adds 28 original items: 22 contextual choices, three ★ order
  questions and three connected passage blanks. These are independent exercises,
  not questions reproduced from this textbook or presented as official exams.
  Current totals: **467 library entries; 146 N2 questions (44 official, 102 original);
  181 questions across the full bank.** The 22 skill lessons are not 22 newly
  discovered missing grammar forms.

For the underlying teaching concepts, primary references include the
[Japan Foundation grammar series](https://www.jpf.go.jp/j/project/japanese/teach/tsushin/grammar/backnumber.html),
[its discussion of time in Japanese](https://www.jpf.go.jp/j/project/japanese/teach/tsushin/language/202206.html),
and [Tokyo University of Foreign Studies grammar modules](https://www.coelang.tufs.ac.jp/mt/ja/gmod/).
Examples, cues and translations were independently written; they have not received
external linguistic review. The publisher page verifies scope, not these wordings.

The pasted vocabulary glosses, every printed explanation, and the book's mock
exams are **not** claimed to have been reproduced or exhaustively audited. Word
lookup supplies dictionary help in the app's sentences. A clear copy of the book's
complete 索引 (index) is needed to finish form-by-form verification; section pages
would also be needed to check all of the book's teaching subpoints.

See [KANZEN-COVERAGE.md](KANZEN-COVERAGE.md) for the row-by-row mapping and limits.

## Phrase-first learning and word help — 11 October 2026

All 467 lessons now lead with translated example phrases. Existing lesson
examples remain available as tabs; connection formulas are optional reference.
`phrase-content.js` adds 46 original models for 22 lessons, prioritizing the
first N2 sequence plus 際に and the three stages of ところだ. Situation labels
distinguish different attachments: 利用する際に, 訪れた際に and 申し込みの際に,
for example. The models are authored teaching choices, not verbatim textbook
sentences or a corpus-based ranking of “most used” phrases. The other lessons
reuse their existing authored examples; every possible attachment has not been
given a new phrase model in this revision.

For 際に, formal contexts, verb dictionary/past forms and noun + の were checked
against [Japanese teacher Tanosuke's explanation](https://tanosuke.com/sai/).
The [Japan Foundation grammar index](https://www.kyozai.jpf.go.jp/kyozai/grammar/text/kanalist/ja/render.do)
also includes 際 / 際に / 際は. Existing source notes below still apply to the
rest of the grammar content. New sentences and English/Thai translations were
written independently; there has been no external linguistic review.

Word help uses a local subset of the EDRDG **JMdict** English dictionary,
distributed as jmdict-simplified release `3.6.2+20261005200550`, with token
boundaries and surface readings from kuromoji/IPADIC. It covers over 3,300 word
forms in app content. Most definitions are English; a few common terms have
original Thai notes. Dictionary senses are listed without claiming automatic
context disambiguation. Some proper names have only a reading. See
[DICTIONARY-NOTICES.md](DICTIONARY-NOTICES.md) for attribution, licences,
transformation details and rebuilding. Lookups work offline and send no text
to a remote dictionary service.

Typing has been removed from daily and targeted practice, including old saved
typed-recall steps. Choices are the default, while hints/reveals still count as
help. Optional hide-and-say practice does not change scores or review levels.
Custom daily limits accept integers 0–100 and preserve existing daily ledgers.

## Official N2 expansion — 23 September 2026

At this stage, the N2 drill contained **118 questions: 44 official and 74 original**.
The complete bank was 153 questions including the existing N3/mixed material.
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
