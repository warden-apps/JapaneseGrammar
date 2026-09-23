# 筋道 · Sujimichi — N2 grammar, with N3 support

**Uploading this app to GitHub?** Follow [UPLOAD.md](UPLOAD.md) for uploading,
optional GitHub Pages setup and moving your existing study progress.

A browser-based N3/N2 grammar trainer for English and Thai speakers. Start with
**Study → Start today’s study**. The app chooses reviews and introduces new
grammar one pattern at a time, with up to six short steps per session. Everything runs locally in
the browser; progress stays in `localStorage` on the same device and origin.

## What changed

- **One study path**, with three navigation tabs: Study, Library and Progress.
  New lessons lead immediately to practice of the same pattern. Sessions pause
  at a natural stopping point. One optional Random JLPT drill sits below daily Study.
- **Random JLPT drill**: **118 N2 questions: 44 official + 74 original**.
  The N2 pool has 88 sentence gaps, 16 four-part ★ sentence-order questions and
  14 passage blanks, linked to 101 target lesson entries. The complete bank has
  153 questions including the existing N3/mixed practice. Each round mixes up to
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
- **Structured lessons**: Meaning → Build it → One example. Extra explanations,
  readings and additional examples stay collapsed. There are 47 authored short
  guides; the rest of the library uses the same layout with existing content.
- **55 original bilingual exercises**: 27 form drills, 24 contrast questions and
  4 dedicated recall prompts. Daily practice uses them where available.
- **12 comparison tables** with 58 rows showing what each form means and when to
  choose it. Library → Compare similar grammar opens these; seven form guides
  and the book checklist are optional reference tools under More tools.
- **Repair list** for missed answers, bounded same-session retries, hints, typed
  recall, and automatically saved sessions. A later unaided answer clears a mistake.
- Training retention grows only on a due date and at most once per study day.
  Hints, answer reveals and same-day retries cannot inflate it. Review intervals
  are 1, 3, 7 and 21 days. This is a simple study schedule, not an exam prediction.
- **445 library entries**: the earlier 14 added senses and 30 corrected/expanded
  lessons, plus nine short support lessons for structures tested in the N2 papers.
  The supplied Shin Kanzen list links to the app through 26 chapters and three
  supplemental groups. See [CONTENT-SOURCES.md](CONTENT-SOURCES.md) for sources,
  corrections and the limits of this review.
- Daily review prioritizes **new contexts**, rotates available questions and asks
  for **typed recall before choices** on later attempts. Choosing to see options
  counts as help and brings the card back; first-day practice does not promote
  its review level. The home screen no longer previews the next review answer.
  Unrecognized free-text answers are not declared ungrammatical: the learner is
  directed to the authored answer set. Daily review uses reveal-first
  self-assessment elsewhere. Random synonym distractors have been removed.
  Wrong answers cannot advance the review ladder; old unanswered quiz caches migrate.
- Global English/Thai controls (English + Thai on tap keeps the first view short),
  readable form labels, dark mode, downloadable
  backups and validated restore. Existing grammar IDs and storage key are preserved.

The new short-session evidence is separate from the existing daily review ladder.
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
jlpt.js                      random drill, scope, resume and daily retrieval
jlpt.css                     question, feedback and recall layouts
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
Tests and build scripts are optional for hosting. Downloaded source PDFs are
omitted from this upload package; the app links to the official site and does
not need these PDFs at runtime. Personal-study reuse follows the JLPT site's §1(1);
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
node --test tests/legacy.test.cjs tests/mastery.test.cjs tests/simplify.test.cjs tests/jlpt.test.cjs tests/official.test.cjs
```

The 44 regressions cover existing queue limits and migrations, wrong-answer
handling, study-day boundaries, backups, training retention, duplicate submissions,
session resume, content references, the single Study entry point and all three
ところだ forms, drill scope, passage eligibility, answer feedback, question
rotation, assisted recall and v7 backups. New checks match all official answers
to independently transcribed PDF keys, verify full ★ orders, five-blank grouping,
source labels, secondary prerequisites and the N2 default. They need only Node's
built-in modules. Automated checks do not replace independent linguistic review.

With Playwright and Chrome available, start the local server and run
`node tests/browser-smoke.cjs`, `node tests/jlpt-browser.cjs` and
`node tests/official-browser.cjs`.
Set `PLAYWRIGHT_PATH` if the package is outside
Node's normal search path; `BROWSER_CHANNEL` defaults to `chrome`. The smoke check
covers the guided lesson/practice sequence, session limits, answer persistence,
comparisons, coverage, language switching, saved practice, backups, desktop/dark
and phone layouts, and an actual offline reload. The second suite covers all
three JLPT formats, both scopes, immediate feedback, daily typed recall and
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
and settings. Copy/paste also works. To restore, click Restore, paste the JSON
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
keeps the answered head of the queue and re-plans only the tail, and tops new
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
