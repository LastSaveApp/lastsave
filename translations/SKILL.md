---
name: lastsave-translation
description: How to translate LastSave, the Windows game journal and backlog app, in the translations/ folder of LastSaveApp/lastsave. The rules a translation must follow (it fits the layout, it sounds native, it breaks nothing), the files of a language folder, and the checker. Use for any translation, new language, glossary or fix to a LastSave string.
---

# Translating LastSave

You are helping someone translate LastSave in `translations/`. A translation is done when it
**fits**, **sounds native** and **breaks nothing**. All three are mandatory. Read the folder's
`README.md` too: it is the human version of this file.

## The folder

- `en/` is the English source, one JSON file per part of the app (a namespace). It is read-only:
  never edit it, never propose changes to it.
- `<code>/` is one language, the same JSON files with the same keys, plus:
  - `language.json`: code, `name` (in itself), `englishName`, `status` (`official` or `community`),
    `maintainers`, `contributors`;
  - `GLOSSARY.md`: decided terms. **Read it before translating and follow it.** Add each term you
    decide, with the reason;
  - `STYLE.md`: register (formal or informal), capitals, punctuation, tone. **Read it first;**
  - `.source.json`: written by the tools. Never edit it by hand.
- `tools/check.mjs` is the checker. Run it after every change:
  `node translations/tools/check.mjs translations --lang=<code>` (Node 22.18+). Fix every error.
  `--format` rewrites the files in the house format.

## Rule 1 — It fits

LastSave is a dense desktop UI: buttons, chips, tabs, sidebar items, table headers, a small in-game
overlay. **No text may take more lines than its English.** One-line labels stay one line, and so do
one-line descriptions.

- Before translating a key, work out from its path where it appears. `actions.*`, `tabs.*`, `nav.*`,
  `labels.*`, `columns.*` and short values are controls with fixed width. `body`, `description` and
  `message` are text that wraps, but must not grow by a line.
- Too long? Use the shorter word a player would actually use. Shorter natural phrasing is the
  localization, not a compromise. Record it in `GLOSSARY.md`.
- Never abbreviate a verb ("Agr. juego"), never drop the meaning to save space, never ask for a
  smaller font.

## Rule 2 — It sounds native

- **Context first.** The same English word becomes different words in different places. "Played"
  can be a status, a column or a log line. Read the key path and its sibling keys before choosing.
- **The player's vocabulary.** Use the terms Steam, Xbox, PlayStation and Windows use in that
  language, and the gamer loanwords players really say (DLC, Clip, Launcher), as the glossary
  decides.
- **Rewrite, don't mirror.** Reorder, split or shorten a sentence when the language reads better
  that way. A list of examples usually reads better after the verb than before it.
- **Tone:** warm, playful, never guilt-tripping about a backlog or a dropped game. Savvy (the
  floppy-disk mascot) jokes: adapt the joke so it lands in that culture, or write a new one in the
  same spirit.
- **Windows paths** ("Settings › Gaming › Captures") use the exact labels of Windows in that
  language.
- **Never translated:** game, genre, platform, company and event names; brands (Steam, Epic, GOG,
  Xbox, PlayStation, Discord, IGDB, LastSave, Savvy); keyboard keys as printed (Shift, Enter,
  Ctrl); controller button names as the console prints them.

## Rule 3 — It breaks nothing

- **Same keys as English.** Translate values only. No new keys, no renamed keys. A missing key is
  allowed: the app falls back to English.
- **Placeholders byte for byte:** every `{{name}}`, `{{count}}`, `$t(...)` and tag (`<0>`, `<strong>`,
  `</1>`) from the English must appear unchanged. Their order may move.
- **Plurals follow the language's CLDR categories**, not English's. English has `_one`/`_other`.
  Spanish, Portuguese, French and Italian need `_one`, `_many` and `_other` (`_many` is for exact
  millions; when nothing special happens, copy `_other`). Other languages need `_few`, `_two` or
  `_zero`. The checker lists the forms a language needs; add them all.
- **Valid JSON**, UTF-8 without BOM, two-space indent, the English key order.

## When you are done

1. `node translations/tools/check.mjs translations --lang=<code>` reports 0 errors.
2. New terms are in `GLOSSARY.md`.
3. Leave `contributors` in `language.json` alone: the author of a merged pull request is added
   automatically.
4. In the pull request, say which parts of the app you translated or changed, so a reviewer who
   speaks the language can read them in context.
