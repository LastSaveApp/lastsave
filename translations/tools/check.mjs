#!/usr/bin/env node
// Generated from @lastsave/l10n in the LastSave app repository. Do not edit here: changes are
// made there and come back with the next export.
/**
 * lastsave-l10n-check — checks every translation in a locales folder against its English.
 *
 *   node bin/check.mjs <locales-dir> [--lang=es,pt-BR] [--fix-plurals] [--format] [--write-source] [--strict]
 *
 * `<locales-dir>` holds `en/` and one folder per language, each with the same `<namespace>.json`
 * files. In the app that is `apps/desktop/src/renderer/app/i18n/locales`; in the public repo it is
 * `translations/`, where `tools/` (this script) sits beside the languages. Files that are not
 * namespaces are skipped: `language.json`, anything starting with `_` (`_context.json`) or `.`
 * (`.source.json`, the stale-string lock).
 *
 *   --fix-plurals   add the plural forms a language needs (`_many` in Spanish) by copying `_other`
 *   --format        rewrite each file in English key order, two-space indent
 *   --write-source  record the current English of every translated key in `.source.json`
 *                   (run it after reviewing a language; later English edits then show as stale)
 *   --strict        warnings fail too (stale, empty, unformatted)
 *
 * Exits 1 when any error remains. Needs Node 22.18+ (it imports the TypeScript source directly).
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { buildSourceLock, checkLanguage, fillPluralForms, formatCatalog } from './l10n.ts';

const args = process.argv.slice(2);
const root = args.find((arg) => !arg.startsWith('--'));
const flag = (name) => args.includes(`--${name}`);
const only = args.find((arg) => arg.startsWith('--lang='))?.slice('--lang='.length).split(',');

if (!root) {
  console.error('usage: check.mjs <locales-dir> [--lang=es] [--fix-plurals] [--format] [--write-source] [--strict]');
  process.exit(2);
}

const localesDir = resolve(root);
const isNamespaceFile = (name) => name.endsWith('.json') && name !== 'language.json' && !name.startsWith('_') && !name.startsWith('.');

function readBundle(dir) {
  const bundle = {};
  const raw = {};
  for (const file of readdirSync(dir).filter(isNamespaceFile).sort()) {
    const text = readFileSync(join(dir, file), 'utf8');
    const ns = file.slice(0, -'.json'.length);
    if (text.charCodeAt(0) === 0xfeff) throw new Error(`${join(dir, file)} starts with a BOM; save it as UTF-8 without BOM`);
    try {
      bundle[ns] = JSON.parse(text);
    } catch (error) {
      throw new Error(`${join(dir, file)} is not valid JSON: ${error.message}`);
    }
    raw[ns] = text;
  }
  return { bundle, raw };
}

const english = readBundle(join(localesDir, 'en')).bundle;
// A language is a folder named with a language code (`es`, `pt-BR`), so `tools/` beside them in the
// public folder is not one.
const isLanguageCode = (name) => /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(name);
const languages = readdirSync(localesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'en' && isLanguageCode(entry.name))
  .map((entry) => entry.name)
  .filter((name) => !only || only.includes(name));

let errors = 0;
let warnings = 0;

for (const language of languages) {
  const dir = join(localesDir, language);
  let loaded;
  try {
    loaded = readBundle(dir);
  } catch (error) {
    console.log(`\n✗ ${language}: ${error.message}`);
    errors += 1;
    continue;
  }
  const { bundle, raw } = loaded;

  if (flag('fix-plurals')) {
    for (const [ns, catalog] of Object.entries(bundle)) {
      if (!english[ns]) continue;
      const { catalog: fixed, added } = fillPluralForms(language, english[ns], catalog);
      if (added.length > 0) {
        bundle[ns] = fixed;
        writeFileSync(join(dir, `${ns}.json`), formatCatalog(english[ns], fixed));
        raw[ns] = formatCatalog(english[ns], fixed);
        console.log(`  ${language}/${ns}.json: added ${added.length} plural form(s)`);
      }
    }
  }

  if (flag('format')) {
    for (const [ns, catalog] of Object.entries(bundle)) {
      if (!english[ns]) continue;
      const formatted = formatCatalog(english[ns], catalog);
      if (formatted !== raw[ns]) {
        writeFileSync(join(dir, `${ns}.json`), formatted);
        raw[ns] = formatted;
      }
    }
  }

  const lockFile = join(dir, '.source.json');
  if (flag('write-source')) {
    writeFileSync(lockFile, `${JSON.stringify(buildSourceLock(english, bundle), null, 2)}\n`);
  }
  const lock = existsSync(lockFile) ? JSON.parse(readFileSync(lockFile, 'utf8')) : undefined;

  const report = checkLanguage(language, english, bundle, lock);
  const issues = [...report.issues];
  for (const [ns, catalog] of Object.entries(bundle)) {
    if (english[ns] && formatCatalog(english[ns], catalog) !== raw[ns]) {
      issues.push({ kind: 'format', severity: 'warning', key: ns, message: 'not in English key order / house format (run with --format)' });
    }
  }
  if (!existsSync(join(dir, 'language.json'))) {
    issues.push({ kind: 'metadata', severity: 'warning', key: 'language.json', message: 'missing (name, status, maintainers, contributors)' });
  }

  const languageErrors = issues.filter((issue) => issue.severity === 'error');
  const languageWarnings = issues.filter((issue) => issue.severity === 'warning');
  errors += languageErrors.length;
  warnings += languageWarnings.length;

  const percent = Math.floor(report.completeness.ratio * 1000) / 10;
  const mark = languageErrors.length > 0 ? '✗' : '✓';
  console.log(`\n${mark} ${language} — ${percent}% (${report.completeness.translated}/${report.completeness.total}), ${languageErrors.length} error(s), ${languageWarnings.length} warning(s)`);
  for (const issue of [...languageErrors, ...languageWarnings]) {
    console.log(`  ${issue.severity === 'error' ? 'error' : 'warn '} ${issue.kind.padEnd(16)} ${issue.key}  ${issue.message}`);
  }
}

if (languages.length === 0) console.log('No translations found next to en/.');
const failed = errors > 0 || (flag('strict') && warnings > 0);
console.log(`\n${errors} error(s), ${warnings} warning(s).`);
process.exit(failed ? 1 : 0);
