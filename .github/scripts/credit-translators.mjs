#!/usr/bin/env node
/**
 * Adds the author of a merged translation pull request to the contributors of each language it
 * changed: `translations/<code>/language.json`. Those lists are the credits LastSave shows in
 * Settings → About.
 *
 *   node .github/scripts/credit-translators.mjs <github-login> <changed-file>...
 *
 * A person in `language.json` is a plain name or `{ "name": "…", "github": "…" }`; the author is added
 * as `{ "github": login }`. Credits are only ever added: someone already listed by that login or
 * name, or a maintainer of the language, is left as they are (compared without case or "@"). English,
 * the checker and a language without a language.json are skipped. Prints what it changed; the
 * workflow commits it.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [login, ...files] = process.argv.slice(2);
if (!login) {
  console.error('usage: credit-translators.mjs <github-login> <changed-file>...');
  process.exit(2);
}

const LANGUAGE_CODE = /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/u;
const id = (name) => String(name).trim().replace(/^@/u, '').toLowerCase();
/** Every way a listed person can be the author: their login, or their name. */
const identities = (person) =>
  typeof person === 'string' ? [id(person)] : [person?.github, person?.name].filter(Boolean).map(id);

const codes = new Set(
  files
    .map((file) => file.split('/'))
    .filter((parts) => parts[0] === 'translations' && parts.length > 2 && parts[1] !== 'en' && LANGUAGE_CODE.test(parts[1]))
    .map((parts) => parts[1]),
);

for (const code of codes) {
  const path = join('translations', code, 'language.json');
  if (!existsSync(path)) continue;
  const file = JSON.parse(readFileSync(path, 'utf8'));
  const maintainers = Array.isArray(file.maintainers) ? file.maintainers : [];
  const contributors = Array.isArray(file.contributors) ? file.contributors : [];
  if ([...maintainers, ...contributors].some((person) => identities(person).includes(id(login)))) {
    console.log(`${code}: ${login} is already credited`);
    continue;
  }
  file.contributors = [...contributors, { github: login }];
  writeFileSync(path, `${JSON.stringify(file, null, 2)}\n`);
  console.log(`${code}: credited ${login}`);
}
