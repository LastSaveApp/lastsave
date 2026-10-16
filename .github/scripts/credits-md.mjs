#!/usr/bin/env node
/**
 * Writes `translations/CREDITS.md` from every `translations/<code>/language.json`: each language and
 * the people who made it, the same list LastSave shows in Settings → About → Translations. Never
 * edited by hand — the workflow runs this whenever a language.json changes on main.
 *
 *   node .github/scripts/credits-md.mjs
 *
 * A person in `language.json` is a plain name or `{ "name": "…", "github": "…" }`. English comes
 * first (the original), then official languages, then community ones, each group by English name.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'translations';
const LANGUAGE_CODE = /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/u;
const STATUS_LABEL = { source: 'Original', official: 'Official', community: 'Community' };
const STATUS_ORDER = { source: 0, official: 1, community: 2 };

const id = (value) => String(value).trim().replace(/^@/u, '').toLowerCase();

function person(entry) {
  if (typeof entry === 'string') return entry.trim() ? { name: entry.trim() } : null;
  if (!entry || typeof entry !== 'object') return null;
  const name = typeof entry.name === 'string' && entry.name.trim() ? entry.name.trim() : undefined;
  const github = typeof entry.github === 'string' && entry.github.trim() ? entry.github.trim().replace(/^@/u, '') : undefined;
  return name || github ? { name, github } : null;
}

/** Each person once, maintainers first: by GitHub login or name, without case or "@". */
function people(file) {
  const seen = new Set();
  const list = [];
  for (const entry of [...(file.maintainers ?? []), ...(file.contributors ?? [])]) {
    const who = person(entry);
    if (!who) continue;
    const ids = [who.github, who.name].filter(Boolean).map(id);
    if (ids.some((key) => seen.has(key))) continue;
    ids.forEach((key) => seen.add(key));
    list.push(who);
  }
  return list;
}

const line = (who) => {
  const link = who.github ? `[@${who.github}](https://github.com/${who.github})` : '';
  if (who.name && link) return `- ${who.name} (${link})`;
  return `- ${who.name ?? link}`;
};

const languages = readdirSync(ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && LANGUAGE_CODE.test(entry.name) && existsSync(join(ROOT, entry.name, 'language.json')))
  .map((entry) => ({ code: entry.name, ...JSON.parse(readFileSync(join(ROOT, entry.name, 'language.json'), 'utf8')) }))
  .sort((a, b) => (STATUS_ORDER[a.status] ?? 3) - (STATUS_ORDER[b.status] ?? 3) || String(a.englishName).localeCompare(String(b.englishName)));

const sections = languages.map((language) => {
  const title = language.name && language.name !== language.englishName ? `${language.name} (${language.englishName})` : language.name ?? language.code;
  const credits = people(language);
  return [`## ${title} · ${STATUS_LABEL[language.status] ?? 'Community'}`, '', ...(credits.length > 0 ? credits.map(line) : ['- Waiting for its first translator']), ''].join('\n');
});

const text = [
  '# Translation credits',
  '',
  'Everyone who made LastSave speak their language. Thank you. 💙',
  '',
  'This file is written from each language\'s `language.json`, the same list LastSave shows in',
  '**Settings → About → Translations**. Do not edit it: whoever gets a translation merged is added',
  'automatically. Want your name here? Read the [guide](README.md).',
  '',
  ...sections,
].join('\n');

writeFileSync(join(ROOT, 'CREDITS.md'), text);
console.log(`CREDITS.md: ${languages.length} languages`);
