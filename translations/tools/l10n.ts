// Generated from @lastsave/l10n in the LastSave app repository. Do not edit here: changes are
// made there and come back with the next export.
/**
 * @lastsave/l10n — what makes a translation of LastSave valid, measured against its English source.
 *
 * Used in three places, which is why it is a package and why it is ONE file with no dependencies
 * and no relative imports:
 *   - the desktop renderer, for each language's completeness in the language selector;
 *   - `pnpm l10n:check` (`bin/check.mjs`) and the desktop test suite, which fail on a broken language;
 *   - the CI of the public `translations/` folder in `LastSaveApp/lastsave`, which receives a copy of
 *     this file and runs it with plain Node (22.18+ strips the types; nothing here needs more than
 *     that — no enums, no namespaces, no parameter properties).
 *
 * The vocabulary:
 *   - a **catalog** is one namespace file (`library.json`), a tree of strings;
 *   - a **bundle** is every namespace of one language;
 *   - a **unit** is one translatable thing: a plain key, or a plural group (`games_one` + `games_other`
 *     in English is ONE unit, which Spanish fills with `_one`, `_many` and `_other`).
 *
 * The rules are the ones in the `lastsave-localization` skill, Rule 3:
 *   - every key exists in English, and is a string;
 *   - every placeholder of the English (`{{var}}`, `$t(...)`, `<tag>`) appears in the translation
 *     unchanged, in any order — except `{{count}}` inside a plural form, which a language may spell
 *     out ("Un juego");
 *   - a plural group the translation starts has every form its language needs, as
 *     `Intl.PluralRules(lng)` says — Spanish needs `_many`, without which i18next shows the raw key
 *     for a million;
 *   - a missing key is NOT an error: it falls back to English, and only lowers completeness.
 */

export type Catalog = { [key: string]: string | Catalog };
export type Bundle = Record<string, Catalog>;

/**
 * Namespaces that exist only in English and are never translated: the Language Studio's own UI,
 * which is a tool for translators and reads the same for all of them. They count for no language's
 * completeness, and a language folder that has one is refused.
 */
export const SOURCE_ONLY_NAMESPACES: readonly string[] = ['studio'];

export type IssueKind =
  | 'unknownNamespace'
  | 'unknownKey'
  | 'notString'
  | 'empty'
  | 'placeholders'
  | 'pluralForms'
  | 'stale';

export interface Issue {
  kind: IssueKind;
  severity: 'error' | 'warning';
  /** `namespace:dotted.key`, or the namespace alone for `unknownNamespace`. */
  key: string;
  message: string;
}

export interface Completeness {
  translated: number;
  total: number;
  /** 0–1. A language with no units at all (an empty English) counts as complete. */
  ratio: number;
}

export interface LanguageReport {
  language: string;
  issues: Issue[];
  completeness: Completeness;
  byNamespace: Record<string, Completeness>;
}

/** CLDR's plural categories, in the order a catalog lists them. */
export const PLURAL_FORMS = ['zero', 'one', 'two', 'few', 'many', 'other'] as const;
export type PluralForm = (typeof PLURAL_FORMS)[number];

const PLURAL_SUFFIX = /^(.*)_(zero|one|two|few|many|other)$/u;

// ─── Catalog plumbing ──────────────────────────────────────────────────────────

/** Every leaf of a catalog as `dotted.path → value`. Non-string leaves are kept so they can be reported. */
export function flattenCatalog(catalog: Catalog, prefix = ''): Map<string, unknown> {
  const out = new Map<string, unknown>();
  for (const [key, value] of Object.entries(catalog)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      for (const [childPath, childValue] of flattenCatalog(value as Catalog, path)) out.set(childPath, childValue);
    } else {
      out.set(path, value);
    }
  }
  return out;
}

/** `games_other` → `{ base: 'games', form: 'other' }`; a non-plural key → `null`. */
export function splitPluralKey(key: string): { base: string; form: PluralForm } | null {
  const match = PLURAL_SUFFIX.exec(key);
  return match ? { base: match[1] ?? '', form: match[2] as PluralForm } : null;
}

/** The plural forms i18next will ask for in `language` (cardinal rules, i18next JSON v4). */
export function requiredPluralForms(language: string): PluralForm[] {
  const categories = new Intl.PluralRules(language).resolvedOptions().pluralCategories as string[];
  return PLURAL_FORMS.filter((form) => categories.includes(form));
}

interface SourceIndex {
  /** Plain (non-plural) keys and their English text. */
  plain: Map<string, string>;
  /** Plural groups: base key → English text per form. */
  plurals: Map<string, Map<PluralForm, string>>;
}

function indexSource(catalog: Catalog): SourceIndex {
  const plain = new Map<string, string>();
  const plurals = new Map<string, Map<PluralForm, string>>();
  const flat = flattenCatalog(catalog);
  for (const [key, value] of flat) {
    if (typeof value !== 'string') continue;
    const plural = splitPluralKey(key);
    // A key only counts as plural when English itself has the group (`_one` or `_other`), so a
    // literal key that happens to end in "_other" is not mistaken for one.
    if (plural && (flat.has(`${plural.base}_other`) || flat.has(`${plural.base}_one`))) {
      const forms = plurals.get(plural.base) ?? new Map<PluralForm, string>();
      forms.set(plural.form, value);
      plurals.set(plural.base, forms);
    } else {
      plain.set(key, value);
    }
  }
  return { plain, plurals };
}

// ─── Placeholders ──────────────────────────────────────────────────────────────

const PLACEHOLDER = /\{\{\s*([^}]*?)\s*\}\}|\$t\(([^)]*)\)|<(\/?)([a-zA-Z0-9]+)\s*(\/?)>/gu;

/**
 * The placeholders of a string, normalized and sorted: `{{name}}` (format kept, spacing dropped),
 * `$t(ns:key)`, and `<tag>`, `</tag>`, `<tag/>`. A multiset: a tag used twice appears twice.
 */
export function extractPlaceholders(text: string): string[] {
  const found: string[] = [];
  for (const match of text.matchAll(PLACEHOLDER)) {
    if (match[1] !== undefined) found.push(`{{${match[1].replace(/\s*,\s*/gu, ', ')}}}`);
    else if (match[2] !== undefined) found.push(`$t(${match[2].trim()})`);
    else found.push(`<${match[3] ?? ''}${match[4] ?? ''}${match[5] ?? ''}>`);
  }
  return found.sort();
}

/** What the translation lacks and what it added, compared with its English. */
export function comparePlaceholders(
  source: string,
  target: string,
  options: { countOptional?: boolean } = {},
): { missing: string[]; extra: string[] } {
  const remaining = extractPlaceholders(target);
  const missing: string[] = [];
  for (const token of extractPlaceholders(source)) {
    const index = remaining.indexOf(token);
    if (index >= 0) remaining.splice(index, 1);
    else if (!(options.countOptional && token === '{{count}}')) missing.push(token);
  }
  const extra = remaining.filter((token) => !(options.countOptional && token === '{{count}}'));
  return { missing, extra };
}

// ─── Stale strings ─────────────────────────────────────────────────────────────

/**
 * FNV-1a, 32 bits, as 8 hex chars. Not security: a fingerprint of the English a translation was
 * made from, small and synchronous so it runs the same in the renderer, Node and CI.
 */
export function hashText(text: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/** `ns:key → hash of its English`, the `.source.json` a language keeps beside its files. */
export type SourceLock = Record<string, string>;

/**
 * The lock for the units `target` translates, against the CURRENT English: written when a translator
 * says "these are reviewed" (`--write-source`). A plural group is locked on its English `_other`.
 */
export function buildSourceLock(source: Bundle, target: Bundle): SourceLock {
  const lock: SourceLock = {};
  for (const [ns, catalog] of Object.entries(target)) {
    const english = source[ns];
    if (!english) continue;
    const index = indexSource(english);
    const flat = flattenCatalog(catalog);
    for (const [key, value] of flat) {
      if (typeof value !== 'string' || value === '') continue;
      const plural = splitPluralKey(key);
      if (plural && index.plurals.has(plural.base)) {
        const forms = index.plurals.get(plural.base);
        const englishText = forms?.get('other') ?? forms?.get('one');
        if (englishText !== undefined) lock[`${ns}:${plural.base}`] = hashText(englishText);
      } else if (index.plain.has(key)) {
        lock[`${ns}:${key}`] = hashText(index.plain.get(key) ?? '');
      }
    }
  }
  return Object.fromEntries(Object.entries(lock).sort(([a], [b]) => a.localeCompare(b)));
}

// ─── The check ─────────────────────────────────────────────────────────────────

function ratio(translated: number, total: number): Completeness {
  return { translated, total, ratio: total === 0 ? 1 : translated / total };
}

/**
 * Checks one language against English. `lock` is the language's `.source.json`, when it has one;
 * without it nothing can be called stale.
 */
export function checkLanguage(language: string, source: Bundle, target: Bundle, lock?: SourceLock): LanguageReport {
  const issues: Issue[] = [];
  const required = requiredPluralForms(language);
  const byNamespace: Record<string, Completeness> = {};
  let translatedTotal = 0;
  let unitTotal = 0;

  for (const ns of Object.keys(target)) {
    if (!source[ns]) {
      issues.push({ kind: 'unknownNamespace', severity: 'error', key: ns, message: `"${ns}.json" has no English counterpart` });
    } else if (SOURCE_ONLY_NAMESPACES.includes(ns)) {
      issues.push({ kind: 'unknownNamespace', severity: 'error', key: ns, message: `"${ns}.json" is English only and is not translated` });
    }
  }

  for (const [ns, english] of Object.entries(source)) {
    if (SOURCE_ONLY_NAMESPACES.includes(ns)) continue;
    const index = indexSource(english);
    const flat = target[ns] ? flattenCatalog(target[ns]) : new Map<string, unknown>();
    const seenPluralBases = new Set<string>();
    let translated = 0;

    for (const [key, value] of flat) {
      const id = `${ns}:${key}`;
      if (typeof value !== 'string') {
        issues.push({ kind: 'notString', severity: 'error', key: id, message: 'value is not a string' });
        continue;
      }
      const plural = splitPluralKey(key);
      if (plural && index.plurals.has(plural.base)) {
        seenPluralBases.add(plural.base);
        // `_zero` is i18next's own form for a count of 0, used in any language whose English has it.
        const zeroFromEnglish = plural.form === 'zero' && index.plurals.get(plural.base)?.has('zero');
        if (!required.includes(plural.form) && !zeroFromEnglish) {
          issues.push({ kind: 'unknownKey', severity: 'error', key: id, message: `"${language}" has no "${plural.form}" plural form` });
          continue;
        }
        const forms = index.plurals.get(plural.base);
        const englishText = forms?.get(plural.form) ?? forms?.get('other') ?? '';
        reportText(issues, id, englishText, value, true);
        continue;
      }
      if (!index.plain.has(key)) {
        issues.push({ kind: 'unknownKey', severity: 'error', key: id, message: 'not in English (renamed or removed?)' });
        continue;
      }
      if (reportText(issues, id, index.plain.get(key) ?? '', value, false)) translated += 1;
      const locked = lock?.[id];
      if (locked && locked !== hashText(index.plain.get(key) ?? '')) {
        issues.push({ kind: 'stale', severity: 'warning', key: id, message: 'the English changed since this was translated' });
      }
    }

    for (const base of seenPluralBases) {
      const id = `${ns}:${base}`;
      const missing = required.filter((form) => !flat.has(`${base}_${form}`));
      if (missing.length > 0) {
        issues.push({
          kind: 'pluralForms',
          severity: 'error',
          key: id,
          message: `missing ${missing.map((form) => `_${form}`).join(', ')} (i18next shows the raw key for those counts)`,
        });
      } else {
        translated += 1;
      }
      const englishOther = index.plurals.get(base)?.get('other');
      const locked = lock?.[id];
      if (locked && englishOther !== undefined && locked !== hashText(englishOther)) {
        issues.push({ kind: 'stale', severity: 'warning', key: id, message: 'the English changed since this was translated' });
      }
    }

    const units = index.plain.size + index.plurals.size;
    byNamespace[ns] = ratio(translated, units);
    translatedTotal += translated;
    unitTotal += units;
  }

  return { language, issues, completeness: ratio(translatedTotal, unitTotal), byNamespace };
}

/** Adds the issues of one translated string; true when it counts as translated. */
function reportText(issues: Issue[], id: string, english: string, value: string, isPlural: boolean): boolean {
  if (value.trim() === '' && english.trim() !== '') {
    issues.push({ kind: 'empty', severity: 'warning', key: id, message: 'empty (English is shown)' });
    return false;
  }
  const { missing, extra } = comparePlaceholders(english, value, { countOptional: isPlural });
  if (missing.length > 0 || extra.length > 0) {
    const parts = [
      missing.length > 0 ? `missing ${missing.join(' ')}` : '',
      extra.length > 0 ? `unexpected ${extra.join(' ')}` : '',
    ].filter(Boolean);
    issues.push({ kind: 'placeholders', severity: 'error', key: id, message: parts.join('; ') });
  }
  return true;
}

/** Completeness alone, for the language selector. Same counting as `checkLanguage`. */
export function languageCompleteness(language: string, source: Bundle, target: Bundle): Completeness {
  return checkLanguage(language, source, target).completeness;
}

// ─── Fixes ─────────────────────────────────────────────────────────────────────

/**
 * Fills the plural forms a language needs and the translation lacks, by copying its `_other` (or,
 * failing that, any form it has). Right for Spanish/Portuguese `_many`, which only differs for exact
 * millions; a translator can refine it afterwards. Returns the new catalog and the keys it added.
 */
export function fillPluralForms(language: string, english: Catalog, target: Catalog): { catalog: Catalog; added: string[] } {
  const required = requiredPluralForms(language);
  const index = indexSource(english);
  const added: string[] = [];
  const result = structuredClone(target);

  const visit = (node: Catalog, prefix: string): void => {
    const keys = Object.keys(node);
    const bases = new Set<string>();
    for (const key of keys) {
      const plural = splitPluralKey(key);
      const path = prefix ? `${prefix}.${plural?.base ?? key}` : (plural?.base ?? key);
      if (plural && index.plurals.has(path)) bases.add(plural.base);
      const child = node[key];
      if (child !== undefined && typeof child === 'object') visit(child, prefix ? `${prefix}.${key}` : key);
    }
    for (const base of bases) {
      const donor = node[`${base}_other`] ?? keys.filter((key) => splitPluralKey(key)?.base === base).map((key) => node[key])[0];
      if (typeof donor !== 'string') continue;
      for (const form of required) {
        if (node[`${base}_${form}`] === undefined) {
          node[`${base}_${form}`] = donor;
          added.push(prefix ? `${prefix}.${base}_${form}` : `${base}_${form}`);
        }
      }
    }
  };
  visit(result, '');
  return { catalog: result, added };
}

/**
 * A translation serialized the house way: English key order (keys English lacks go last), plural
 * forms in CLDR order where the English group sits, two-space indent, trailing newline. Diffs of a
 * translation PR then line up with the English file.
 */
export function formatCatalog(english: Catalog, target: Catalog): string {
  return `${JSON.stringify(orderLike(english, target), null, 2)}\n`;
}

function orderLike(english: Catalog, target: Catalog): Catalog {
  const ordered: Catalog = {};
  const placed = new Set<string>();
  const place = (key: string): void => {
    const value = target[key];
    if (value === undefined || placed.has(key)) return;
    const shape = english[key];
    ordered[key] = typeof value === 'object' && shape !== undefined && typeof shape === 'object' ? orderLike(shape, value) : value;
    placed.add(key);
  };
  for (const key of Object.keys(english)) {
    const plural = splitPluralKey(key);
    if (plural) {
      for (const form of PLURAL_FORMS) place(`${plural.base}_${form}`);
    } else {
      place(key);
    }
  }
  for (const key of Object.keys(target)) place(key);
  return ordered;
}
