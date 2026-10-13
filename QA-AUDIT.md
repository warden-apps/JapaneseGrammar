# Bug, button and learning-flow audit

13 October 2026. Tests use isolated browser profiles and do not reset or replace
the user's stored progress. This is a bounded audit, not a guarantee of zero bugs.

## Fixed in this audit

- Word popups previously had Thai for only a few entries and always displayed
  English definitions underneath. All 3,446 bundled word forms now have Thai
  glosses, with one definition language at a time and a one-click popup switch.
  Common English homophone mismatches are corrected. Switching languages
  preserves furigana, example selection, guided study stage, learning evidence
  and focus return. The build rejects entries missing a Thai gloss.
- Reading disclosures could open empty in practice feedback, while main phrase
  cards had no sentence-reading control. All phrase cards and feedback now have
  offline kana. Reading now toggles furigana above kanji in the original sentence,
  without annotating existing kana. Word lookup stays clickable; pre-answer readings
  retain blanks and never reveal hidden parts. English/Thai switches retain the toggle.
- Repeated coaching text and headings are removed from lessons, leaving the meaning,
  key distinction, example and controls. The guided route still shows the current step.
- New lessons now have one visible focus at a time: Meaning → Example → Try,
  one next action, persistent stage state and Back from Example to Meaning.
  Extra explanations follow the primary action. Repeated taps cannot skip a quiz.
- Targeted practice could open an old random drill or a different saved session.
  It now opens the requested pattern and preserves previous unfinished work.
- Due targeted exercises could remain outside daily Study. They now enter the
  daily queue on later days, with the exact exercise needed to update the record.
- Correct optional daily practice could advance a level before its due date.
  Early success now leaves the schedule unchanged.
- Opening the relevant lesson or looking back at its answer did not mark a check
  as assisted. Those help paths now prevent unaided review credit.
- Changing settings while feedback was open could erase the current answer.
  Rebuilds now preserve the live question, feedback, answer and help flags.
- Moving/inserting targeted cards could discard cached questions or misalign
  help flags. All position-keyed records now move with their cards.
- A repeated training Next event could skip an unanswered question. It is guarded.
- Changing levels on a reference page could leave an empty pane; an incompatible
  saved practice session could override the selected level. Both are corrected.
- Copy reported success without waiting for the clipboard result. It now handles
  rejection, attempts a fallback, reports failure honestly and preserves restore drafts.
- A failed storage write could discard live question history. Data now remains
  in memory with a warning to export before closing the page.
- Newer storage snapshots and restored backups could retain obsolete fields
  from older state. They now replace the snapshot over clean defaults.
- Review forecasts used the calendar date instead of the selected study-day boundary.
- Audio failures were silent. Listen now reports unavailable/failed playback,
  including inside the word dialog. Actual audio requires a device voice.
- An obsolete self-rating-button setting had no effect on the current UI and
  was removed. Old backup settings remain import-compatible.
- The numerical strength display now says **Practice index**, with its limitations.
  Research notes distinguish supported principles from unvalidated app defaults.

## Automated coverage

The regression suite has **81 passing tests** across ten test files. The eight
browser suites are `browser-smoke`, `jlpt-browser`, `official-browser`,
`flow-browser`, `kanzen-browser`, `audit-browser`, `guided-browser` and
`word-help-browser` (all `.cjs` in `tests`).

| Surface | Controls and behavior checked |
| --- | --- |
| Navigation | Study, Library, Progress; N3/N2/all filters from Study and reference pages; compatible saved-session resume |
| Daily Study | Start, lesson → Try, choices, recall reveal/self-check, immediate feedback, Continue, Back/return, Pause/resume, round boundaries, repeat limits, saved answers after reload |
| Targeted practice | Correct pattern routing, choices, hints/reveal, feedback, Next, bounded retries, Done, preserved prior session, automatic later-day review |
| Random drill | Both scopes, empty studied pool, start/resume, sentence gaps, ★ order, contiguous passages, correct/wrong feedback, distractor details, related lesson links, Back, Pause, results |
| Library | Search and no-result state, all five filters, all 467 lesson sheets, all 981 phrase tabs and kanji-only furigana on/off, unchanged sentence text, hide/show, valid related targets, both close buttons and Escape |
| References | All 12 comparison groups, their lesson links and return buttons, seven form disclosures, all checklist chapters and support sections, chapter comparison links |
| Language and words | One-click English/Thai, selection and hidden-phrase preservation, word reading/meaning dialog, close button, Escape/focus return, offline dictionary |
| Settings | Every daily/review/day-start/theme preset, custom 27, invalid 101 rejected, persisted settings, pending feedback survives changes, obsolete setting absent |
| Backup and reset | Clipboard success and rejection, exact downloaded JSON, invalid restore leaves state intact, valid restore, reset cancelled/confirmed and recovery from backup, storage failure preserves memory |
| Layout and offline | Phone/desktop widths, dark/light, no horizontal overflow in tested flows, offline reload, dictionaries and all required scripts cached together |

The upload folder is checked against the source files and receives the same
regression tests plus browser checks for its packaged routes and offline assets.
See README for commands. `TEST_URL` selects the original or packaged app.

## Learning-method review

See [STUDY-METHOD.md](STUDY-METHOD.md) for five primary sources on spacing,
retrieval, explicit instruction, feedback and interleaved grammar practice.
The app's precise intervals, session length and index formula are design choices;
the app has not been evaluated in a learning trial. Initial practice, early
practice and assisted answers are kept distinct from due unaided checks.

## Limits

- Browser automation used Chrome on Windows, at phone and desktop viewport sizes.
  It does not establish native Safari/iOS/Android installation behavior.
- Speech calls and failure handling were tested with controlled APIs. Actual
  audibility and Japanese voice quality depend on the user's device.
- Tests validate content structure, references and official answer-key mapping.
  They cannot certify every original Japanese explanation or distractor.
- Thai glossary coverage and selected sense corrections are checked automatically;
  this does not constitute independent native-speaker review of every translation.
- Offline readings prefer authored kana; other readings are dictionary-derived
  with selected contextual corrections. They have not all had native-speaker review.
- Multiple choice and self-checks do not certify independent sentence production
  or an N2 score. No new mastery claim is inferred from a completed session.
- These suites cover control families and important state transitions, not every
  possible combination of browser, corrupted storage and simultaneous tab edits.
