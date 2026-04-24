// Emits dist/dtcg/tokens.json — a single deep-merged DTCG manifest of every
// source token under tokens/. Aliases (e.g. "{color.brand.DEFAULT}") and
// $type/$description metadata are preserved verbatim so external consumers
// (Figma plugins, alternative build pipelines, agent reference docs) get
// the canonical authored shape, not a transformed view of it.

import {
	mkdirSync, readFileSync, writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { findJsonFiles, mergeTokens } from './dtcg-merge.js';

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS_DIR = join(PACKAGE_ROOT, 'tokens');
const OUT_DIR = join(PACKAGE_ROOT, 'dist', 'dtcg');
const OUT_FILE = join(OUT_DIR, 'tokens.json');

const files = findJsonFiles(TOKENS_DIR);
const sources = files.map((path) => ({
	path: relative(PACKAGE_ROOT, path),
	contents: JSON.parse(readFileSync(path, 'utf8')),
}));

const merged = mergeTokens(sources);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, `${JSON.stringify(merged, null, '\t')}\n`, 'utf8');

process.stdout.write(`dtcg: wrote ${relative(PACKAGE_ROOT, OUT_FILE)} from ${files.length} source files\n`);
