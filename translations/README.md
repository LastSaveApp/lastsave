# 🌍 Translate LastSave

LastSave speaks English and, from 0.6.0, Spanish. This folder is where every other language
lives, and where you can help LastSave speak yours — or make one that already ships sound better.

Everything in `translations/` is [MIT-licensed](LICENSE). The rest of this repository is not.

## Two ways in

**1. LastSave Language Studio — no Git needed.** It comes with LastSave 0.6.0 and later:
**Settings → General → Language Studio**, or its own shortcut in the Start menu. It opens beside the app and shows the
texts of the screen you are on. Type a translation and you see it in the app at once. Alt + click
any text in the app to jump to it. It tells you when a text does not fit, saves as you go, and
**Send translation → Send to LastSave** delivers your work to the team with your name for the
credits.

**2. A pull request here.** Fork this repository, edit `translations/<code>/`, and open a pull
request. The check below runs on it automatically. The Studio's **Send translation → Propose on
GitHub** walks you through this with a folder it exports for you.

## What is in here

| Folder | What it is |
|---|---|
| `en/` | The English, one JSON file per part of the app. **Read-only**: it is copied from the app on every update, so a change made here is overwritten. |
| `<code>/` | One language (`es`, `pt-BR`, …): the same JSON files, translated, plus `language.json`, `GLOSSARY.md`, `STYLE.md` and `.source.json`. |
| `tools/` | The checker. It is copied from the app too. |
| `SKILL.md` | The rules below, written for an AI assistant if you use one. |
| `CREDITS.md` | Everyone who translated LastSave, written from the `language.json` files. |

- **`language.json`**: the language's code, its name in itself and in English, its status,
  maintainers and contributors. Those lists are the credits in LastSave (**Settings → About →
  Translations**). A person is a name (`"Ana"`) or a name with a GitHub account
  (`{ "name": "Ana López", "github": "ana-dev" }`).
- **`GLOSSARY.md`**: the terms that are decided, like «Biblioteca», «Logros» and «Launcher».
  Every screen follows it.
- **`STYLE.md`**: how the language sounds: formal or informal, capitals, punctuation, tone.
- **`.source.json`**: the English each string was translated from. When the English changes, the
  checker marks that string **stale** so it gets another look. Leave the file to the tools.

## Starting a new language

1. Create `translations/<code>/` with the language's code: `fr`, `de`, `pt-BR`, `ja`…
2. Add `language.json`:
   ```json
   {
     "code": "fr",
     "name": "Français",
     "englishName": "French",
     "status": "community",
     "maintainers": [{ "name": "Your name", "github": "your-github-name" }],
     "contributors": []
   }
   ```
3. Copy the files you want to translate from `en/` and translate the values. Never the keys.
   A missing file or key is fine: the app shows English there until someone translates it.
4. Start a `GLOSSARY.md` with the words you decide on. Look at `es/GLOSSARY.md` for the shape.

A community language appears in LastSave's language list once **half of the app** is translated,
marked "Community" with how complete it is.

## The three rules

**It fits.** No text takes more lines than its English. A button stays one line, a one-line
description stays one line. When a translation is too long, find the shorter word a player would
actually use («Ajustes», not «Configuración»). Do not abbreviate. The Studio's fit check shows
every text that grew.

**It sounds native, not translated.** Rewrite the sentence the way your language says it. Use the
words players and Steam use in your language. Keep LastSave's tone: warm, playful, never making
anyone feel bad about a long backlog. Savvy's jokes can be replaced by a joke that works in your
language.

**It breaks nothing.**
- Every `{{placeholder}}`, `$t(...)` and `<tag>` from the English stays, unchanged. Their order can
  change.
- Plurals follow your language, not English: Spanish needs `_one`, `_many` and `_other`, where
  English has `_one` and `_other`. The checker says which forms your language needs.
- Same keys as English, valid JSON, UTF-8, two-space indent.

**Never translated:** game, genre, platform and company names. Brands: Steam, Epic, GOG, Xbox,
LastSave, Savvy. Keyboard keys as printed (Shift, Enter, Ctrl). The slogan ("Track it. Finish it.
Remember it.") is written by the team for each language, so it is not in these files.

## Check your work

With [Node.js](https://nodejs.org) 22.18 or newer, from the repository root:

```bash
node translations/tools/check.mjs translations
```

It lists, per language, its completeness, then every error (a missing placeholder, a missing plural
form, a key that is not in English, broken JSON) and every warning (a stale string, a file not in
the house format). Add `--format` to rewrite your files in the house format, and `--lang=fr` to
check only one language. Errors fail the pull request; warnings do not.

## Credits

Everyone who translates is credited in LastSave, in **Settings → About → Translations**, and
here in [CREDITS.md](CREDITS.md):

- **A pull request here:** when it is merged, your GitHub name is added to `contributors` in the
  `language.json` of each language it changed. Nothing to do on your side.
- **The Studio's Send to LastSave:** the name you type when you send is added when the team brings
  your work in.

Translators also get the 🌍 Translator role on [Discord](https://discord.gg/cgTuQXwvA4): say hi and
ask for it.

## Reviews

**Spanish** is an official language: the team maintains it, and a change to it is approved by its
maintainer. **Community** languages are maintained by the people in their `language.json`. Every
language is reviewed by someone who speaks it before it ships. If nobody on the team does, a second
speaker from the community is asked.

Translations ship with LastSave's next release. They are never sent to the app over the internet.

## License

The files in `translations/` are under the [MIT License](LICENSE). By opening a pull request or
sending a translation from the Studio, you agree that your contribution is released under that
license and can ship in LastSave.

Questions? Ask on [Discord](https://discord.gg/cgTuQXwvA4) or open an
[issue](https://github.com/LastSaveApp/lastsave/issues/new?template=translation.yml).
