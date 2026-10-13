# Word-help dictionary

Japanese-English definitions in `word-help-data.js` are derived from **JMdict**,
copyright the Electronic Dictionary Research and Development Group (EDRDG).
This derived dictionary data is distributed under **Creative Commons
Attribution-ShareAlike 4.0**. This notice does not change the licences of the
app's other materials.

- [JMdict project](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project)
- [EDRDG copyright and licence statement](https://www.edrdg.org/edrdg/licence.html)
- [CC BY-SA 4.0 licence](https://creativecommons.org/licenses/by-sa/4.0/)
- [JSON distribution: jmdict-simplified](https://github.com/scriptin/jmdict-simplified)
- Source release: `3.6.2+20261005200550` (English dictionary).

Changes: selected entries for words appearing in this app, limited each entry
to a small number of senses, normalized readings to hiragana, and attached
surface forms to dictionary forms. Common homophone mismatches were corrected
for the app's vocabulary and grammar usage, such as ボタン (button), 人手
(helping hands), こと and よう. These corrected English entries have
`glossSource: "app"` in the data.

All **3,446 bundled word forms** have Thai learner glosses, maintained in
`build/word-thai.tsv`. These Thai explanations were authored for this app;
they are not an official Thai edition of JMdict or imported JTDic definitions.
The glossary uses explicit aliases for spelling variants and shared meanings,
and short usage notes for grammar words. Names have Thai name labels; a few
partial tokens identify themselves as fragments that need the whole word.
The Thai glossary and English corrections are also distributed under
**CC BY-SA 4.0**. They have not received an independent native-speaker review.
Dictionary entries can have several senses; not every listed sense necessarily
fits the current sentence.

Tokenization and surface readings were prepared with **kuromoji.js 0.1.2**
(Apache License 2.0), using its IPADIC dictionary. The tokenizer itself is a
build-time tool and is not loaded in the browser. The applicable full notices
are in [licenses/kuromoji-NOTICE.md](licenses/kuromoji-NOTICE.md) and
[licenses/kuromoji-APACHE-2.0.txt](licenses/kuromoji-APACHE-2.0.txt).

To rebuild after changing Japanese content, obtain the source dictionary and
kuromoji package, then run `node build/make-word-help.cjs <jmdict.json> <kuromoji-directory>`.
That build applies `build/add-thai-word-help.cjs` and refuses to write a dictionary
with missing Thai entries. After editing only the glossary, run
`node build/add-thai-word-help.cjs`; this preserves the existing word IDs,
sentence token boundaries and readings. Repeated enrichment is idempotent.
Full-sentence readings in `sentence-readings.js` preserve the app's authored kana
where available and fill other sentences using Kuromoji/IPADIC. They are stored
offline, with punctuation and question blanks preserved. Rebuild with
`node build/make-sentence-readings.cjs <kuromoji-directory>`. Automated readings
can require editorial correction for ambiguous words or names.
No network requests, account, or API key are used for word lookups in the app.
