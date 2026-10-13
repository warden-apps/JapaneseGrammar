# 筋道 · Sujimichi — N2 grammar, with N3 support

A browser-based N3/N2 grammar trainer for English and Thai speakers. Start with
**Study → Start today’s study**. The app chooses reviews and introduces new
grammar one pattern at a time in short rounds. Everything runs locally in
the browser; progress stays in `localStorage` on the same device and origin.

## What changed

- **Guided Study (12 October 2026)**: a new pattern opens on Meaning, then Example,
  then Try it, with one main next button and a numbered route. Extra notes stay
  below the next action. Back returns from the example to its meaning; Pause,
  reload, language changes and settings preserve the current lesson stage.
  Due reviews go straight to a question. Navigation does not earn review credit.
- **Cleaner lessons**: repeated coaching paragraphs and section headings are
  removed. Meaning, the key distinction, examples and their controls stay visible;
  extra grammar notes remain optional. Study keeps its Meaning → Example → Try route.
- **Inline furigana**: Reading / คำอ่าน toggles kana directly above the sentence's
  kanji, leaving existing kana unannotated. Word lookup still works. Before answering,
  readings keep the blank or ★ slots; feedback annotates the completed sentence.
  The app bundles 1,738 offline readings, preferring authored kana and otherwise
  using Kuromoji/IPADIC with selected contextual corrections. Readings are not
  a claim of exhaustive native-speaker review; see DICTIONARY-NOTICES.md.
- **More color**: violet, mint and peach identify the learning stages, with a
  small garden illustration, clearer buttons and feedback. Light/dark themes,
  keyboard focus and reduced-motion preferences remain supported.
- **Book coverage audit**: all 156 rows in the supplied Shin Kanzen Master N2
  checklist link to lessons, with short English/Thai key clues. Added 22 support
  lessons for its later organization, sentence-building and passage topics, plus
  28 original practice questions. N2 study also includes mapped foundations
  labelled N3. The publisher's complete 211-form index and every book explanation
  are **not yet verified**. See [KANZEN-COVERAGE.md](KANZEN-COVERAGE.md).
- **One-click languages**: tap **English** or **ไทย** in the header or lesson
  sheet. Your current phrase, question and answers stay in place. Older combined
  language settings migrate to English; Thai remains one tap away.
- **Back in Study**: revisit earlier lessons and answers, then return to your
  current step. Daily study, random drills and targeted practice keep their
  scores and unfinished questions while you look back.
- **Reusable phrase examples**: after the short meaning, meet an example you
  can reuse. Switch example tabs, read the kana, listen, or hide the Japanese and say it from
  memory. Connection rules and longer explanations live under **Grammar notes
  & all forms**. All 467 entries use this presentation; 22 lessons have 46 newly
  authored phrase models with explicit situation labels. For 際に, dictionary,
  past and noun forms have separate examples. These are reusable teaching
  phrases, not statistically ranked “most frequent” sentences.
- **Tap word help**: underlined words in Japanese sentences and lesson headings
  open a reading/meaning dialog without leaving the page. The offline dictionary
  contains 3,446 surface forms, including inflected verbs, all with Thai meanings.
  Popups follow the selected English/Thai language and have their own one-click
  switch. Common dictionary homophone mismatches are corrected. Switching keeps
  your example, reading toggle and study position. See
  [DICTIONARY-NOTICES.md](DICTIONARY-NOTICES.md) for sources and licences.
- **No typed-answer prompts** in daily Study or targeted practice, including
  saved sessions. Choose an answer and get feedback. Later reviews still use
  new contexts and spaced scheduling; first-day success cannot promote the
  review level. Optional hide-and-say checks on lessons do not award mastery.
- **Your pace**: choose 20 new patterns/day or enter a custom whole number from
  0 to 100. The setting survives reload and progress backup/restore. Short
  rounds now offer **Another short round** or **Finish for now**. Progress shows
  essential stats first; detailed charts, topic lists and backup text collapse.
- **One study path**, with three navigation tabs: Study, Library and Progress.
  New lessons lead immediately to practice of the same pattern. Sessions pause
  at a natural stopping point. One optional Random JLPT drill sits below daily Study.
- **Random JLPT drill**: **146 N2 questions: 44 official + 102 original**.
  The N2 pool has 110 sentence gaps, 19 four-part ★ sentence-order questions and
  17 passage blanks, linked to 123 target lesson entries. The complete bank has
  181 questions including the existing N3/mixed practice. Each round mixes up to
  ten eligible questions and includes an official question when scope permits.
  Select **Encountered in Study** or **All — studied or new**; the existing N3/N2
  filter also applies. Feedback appears immediately, including why the selected
  wrong option does not fit. Other distractors are explained on demand.
  The official questions are the complete grammar sections (Q33–54) from the
  N2 Official Practice Workbooks published in 2012 and 2018, selected from real
  tests. Japanese questions and official keys have source links; EN/TH feedback
  and translations are independent. This is a short drill, not a full mock exam.
  The bank does not yet cover every library entry. Publication years are not
  represented as the dates of the original exams.
- **Structured lessons**: meaning → reusable phrase → try it. Extra explanations
  and form rules stay collapsed. There are 69 authored short
  guides; the rest of the library uses the same layout with existing content.
- **55 original bilingual exercises**: 27 form drills, 24 contrast questions and
  4 dedicated recall prompts. Daily practice uses them where available.
- **12 comparison tables** with 58 rows showing what each form means and when to
  choose it. Library → Compare similar grammar opens these; seven form guides
  and the book checklist are optional reference tools under More tools.
- **Missed-answer review**: bounded same-session retries and saved sessions.
  Due targeted exercises return automatically in daily Study on later days,
  under the chosen level and review cap. A later unaided answer clears a mistake.
- Training retention grows only on a due date and at most once per study day.
  Hints, answer reveals and same-day retries cannot inflate it. Review intervals
  are 1, 3, 7 and 21 days. This is a simple study schedule, not an exam prediction.
- **467 library entries**: the earlier 14 added senses and 30 corrected/expanded
  lessons, nine support lessons for structures tested in N2 papers, and 22 later
  book-topic support lessons.
  The supplied Shin Kanzen list links to the app through 26 chapters and three
  supplemental groups. See [CONTENT-SOURCES.md](CONTENT-SOURCES.md) for sources,
  corrections and the limits of this review.
- Daily review prioritizes **new contexts** and rotates available questions.
  Choices are the default; using a hint or revealing an answer counts as help.
  First-day practice does not promote the review level. The home screen does
  not preview the next review answer. Daily review uses reveal-first
  self-assessment elsewhere. Random synonym distractors have been removed.
  Wrong answers cannot advance the review ladder; old unanswered quiz caches migrate.
- One-click English and Thai buttons in the header and lesson sheets,
  readable form labels, dark mode, downloadable
  backups and validated restore. Existing grammar IDs and storage key are preserved.

The new short-session evidence is separate from the existing daily review ladder.
Due targeted exercises feed into the daily queue; their exact saved question is
used so a later answer updates that exercise's record. One exercise per pattern
is reviewed per study day. See [STUDY-METHOD.md](STUDY-METHOD.md) for the research
behind the learning principles and the limits of the app's scores and schedule.
The 0–100 practice index is a heuristic, not a memory probability or N2 prediction.
Random drills save results and resume on reload but never promote daily review
levels. Their “encountered” scope uses Study encounters and historical review
evidence, not merely opening a Library entry or seeing it in a random drill.
Every tested target in a question and passage must be eligible before inclusion.
Official questions use their exam level even when testing a foundation pattern
labelled N3 in the library. All five official passage blanks stay together; the
feedback never discloses later blanks. Daily choices also check secondary targets.
New installations default to N2, three new patterns and twenty reviews per day.
Existing settings remain unchanged. Set new patterns to zero for a review-only day.

## Files

```
index.html                  original library, daily queue and reference UI
grammar-expansion.js         corrected/added lessons and chapter coverage
mastery-content.js           authored exercises, comparisons and form guides
mastery.js                   short sessions, retention, repair list and backups
mastery.css                  responsive training styles
lesson-guides.js             38 structured lessons and three stage exercises
comparison-guides.js         concise meanings and choosing cues for similar forms
simple.js                    unified Study flow and concise lesson/reference UI
simple.css                   simplified responsive layouts
jlpt-content.js              61 original JLPT-style questions with EN/TH feedback
n2-exam-lessons.js           nine concise support lessons for N2 exam structures
jlpt-official.js             44 official N2 questions with source metadata
jlpt-n2-practice.js          48 additional original N2 transfer questions
kanzen-content.js           22 book-topic support lessons and targeted corrections
kanzen-cues.js              bilingual key clues and N2 book eligibility
kanzen-practice.js          28 original skill-practice questions
KANZEN-COVERAGE.md          supplied checklist mapping and verification limits
jlpt.js                      random drill, scope, resume and daily retrieval
jlpt.css                     question, feedback and recall layouts
phrase-content.js            46 reusable models across 22 lessons
flow.css                     phrase-first Study, progress and word-help styles
word-help.js                 accessible offline reading/meaning dialog
sentence-readings.js         offline full-sentence kana readings
furigana.js                  kanji-only ruby alignment and reading toggle
study.css                    colorful guided Study presentation
word-help-data.js            generated dictionary subset and token boundaries
DICTIONARY-NOTICES.md        attribution and dictionary reuse terms
licenses/                   full notices for dictionary tooling/data
build/make-word-help.cjs     regenerates word help after content changes
build/word-thai.tsv          maintained Thai glossary and explicit spelling aliases
build/add-thai-word-help.cjs applies Thai glosses and English sense corrections
CONTENT-SOURCES.md          content audit and source notes
manifest.json               Add to Home Screen metadata (Android + Chrome)
sw.js                       offline cache
apple-touch-icon.png        iOS home-screen icon (180x180)
favicon.ico                 browser tab icon
icons/                      PNG/SVG icons + the paper-grain tile
build/make-icons.pl         regenerates every icon from one 16x16 pixel grid
build/make-paper.pl         regenerates the paper texture
build/serve.pl              local server, for testing the way Pages serves it
build/serve.cjs             dependency-free Node local server
tests/                     regressions and browser smoke checks
```

All paths are relative, so this works both at a domain root and under
`username.github.io/repo-name/`.

## Publishing

Publish `index.html`, all root JavaScript and CSS files, `sw.js`,
the manifest and icons together. For GitHub Pages, enable Settings → Pages →
deploy from branch. No hosting account is required to use the app locally.
Do not publish `.backups/`; it contains the previous source for rollback, not progress.
Tests and build scripts are optional for hosting. `references/jlpt/` contains
source PDFs for auditing; the app links to the official site and does not need
these PDFs at runtime. Personal-study reuse follows the JLPT site's §1(1);
consult its source terms before distributing or charging for copied material.

**Bump `CACHE` in `sw.js`** every time you publish. The worker caches a complete
version atomically, so offline operation includes the new modules. Reopen or
reload after the updated worker installs. Updating files does not erase progress.

To test locally first — the service worker and the manifest need a real
`http://` origin, so opening `index.html` off disk is not a sufficient check:

```bash
node build/serve.cjs 8775
```

Open **http://127.0.0.1:8775**. This avoids AnkiConnect's usual port, 8765.
There is no build step or runtime dependency.
The existing Perl server remains available if preferred.

## Validation

```bash
node --test tests/legacy.test.cjs tests/mastery.test.cjs tests/simplify.test.cjs tests/jlpt.test.cjs tests/official.test.cjs tests/flow.test.cjs tests/kanzen.test.cjs tests/audit.test.cjs tests/guided.test.cjs tests/word-help.test.cjs
```

The 81 regressions cover existing queue limits and migrations, wrong-answer
handling, study-day boundaries, backups, training retention, duplicate submissions,
session resume, content references, the single Study entry point and all three
ところだ forms, drill scope, passage eligibility, answer feedback, question
rotation, assisted recall and v7 backups. New checks match all official answers
to independently transcribed PDF keys, verify full ★ orders, five-blank grouping,
source labels, secondary prerequisites and the N2 default. Phrase/lookup checks
also cover saved-session migration and custom daily-limit backup validation.
They need only Node's
built-in modules. Automated checks do not replace independent linguistic review.

With Playwright and Chrome available, start the local server and run
`node tests/browser-smoke.cjs`, `node tests/jlpt-browser.cjs` and
`node tests/official-browser.cjs`. The redesign is covered by
`node tests/flow-browser.cjs`, including word help, Escape/focus, phrase tabs,
custom settings, progress preservation and offline dictionary lookup.
`node tests/kanzen-browser.cjs` checks the book audit, new skill lessons,
their daily practice, language switching and offline availability.
`node --test tests/audit.test.cjs` checks additional scheduling, help tracking,
session routing, persistence and clipboard regressions. `node tests/audit-browser.cjs`
exercises all 467 lesson sheets and 981 phrase tabs, the comparison/reference
controls, settings, backup/restore, reset, audio error handling and saved feedback.
See [QA-AUDIT.md](QA-AUDIT.md) for the audit scope and remaining limitations.
`node tests/guided-browser.cjs` checks the Meaning → Example → Try sequence,
mouse/keyboard kanji-only furigana, word lookup, numeric counters, blank preservation,
feedback readings, guided-stage persistence and offline assets in both languages.
`node tests/word-help-browser.cjs` checks Thai definitions, switching within the
popup, inflected forms, keyboard focus after the lesson redraws, unchanged
study evidence, and offline use in mobile, desktop and dark layouts.
Set `PLAYWRIGHT_PATH` if the package is outside
Node's normal search path; `BROWSER_CHANNEL` defaults to `chrome`. The smoke check
covers the guided lesson/practice sequence, session limits, answer persistence,
comparisons, coverage, language switching, saved practice, backups, desktop/dark
and phone layouts, and an actual offline reload. The second suite covers all
three JLPT formats, both scopes, immediate feedback, daily tap-based review and
offline drill resume. The third suite checks the fresh N2 default, official
source/answer links, all five passage blanks, source-aware feedback and the full
expanded bank offline. `TEST_URL` overrides the server URL.

## Add to Home Screen

- **iPhone** — open in Safari (not Chrome), Share → Add to Home Screen.
- **Android** — Chrome menu → Install app / Add to Home Screen.

Installation makes the app convenient to launch. Browser storage can still be
cleared or evicted; installing is not a substitute for a backup.

Progress belongs to the current device/browser/origin. **Progress → Download
progress backup** saves a JSON file containing both review and training evidence
and settings. Copy/paste also works. To restore, expand **Copy or restore a backup**,
click Restore, paste the JSON
text and click Restore again. v4/v5/v6 backups remain supported; v7 also saves
drill results, question exposure and Study encounters. Invalid backups
are rejected before changing live progress. Imported backups restart an unfinished
session; normal reloads resume it. Moving from a hosted URL to localhost does not
automatically transfer browser storage—use a backup to move your progress.

## The daily queue

`S.day` is the ledger for today and is the source of truth:

| field     | meaning                                        |
|-----------|------------------------------------------------|
| `newIds`  | patterns handed out as new today — never shrinks |
| `learned` | new patterns you reached practice for           |
| `done`    | patterns that got a rating (except もう一度)     |
| `extra`   | extra allowance recorded by earlier app versions |

`S.q` — the queue on screen — is only a view of that ledger and gets rebuilt
whenever the level chip, a setting, or a new day changes the picture. A rebuild
keeps the answered head and any live generated question/feedback, re-plans the
remaining tail, and tops new
cards up to `newPerDay - newIds.length`. That is what stops a rebuild from
dealing a second batch or throwing away a session in progress.

## Icons

Both the app icon and the plant that grows on the 今日 screen come from the same
16x16 grid, edited as ASCII in `build/make-icons.pl` and `index.html`. Every PNG
is that grid at an **integer** scale, centred with background padding to reach
the exact size a platform wants — at a fractional scale the pixels come out
uneven and the art goes soft.

```bash
perl build/make-icons.pl
perl build/make-paper.pl
```
