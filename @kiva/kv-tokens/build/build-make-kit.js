// Emits dist/make-kit/ — a Figma Make–shaped kit built from the design-system
// skill files under docs/skills/. Guideline files are transformed copies of the
// opted-in skills; styles.css is the compiled Tailwind preset (base layer +
// token-backed utilities + the tw-text-* type system + theme vars). Requires
// dist/css/tokens.css and dist/js/tokens.js to exist (run after build:tokens).

import {
	mkdirSync, readdirSync, readFileSync, writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

import { tailwindConfig } from '../index.js';
import { buildColorChoices } from '../configs/kivaColors.js';
import designTokens from '../dist/js/tokens.js';
import {
	parseFrontmatter,
	shouldInclude,
	transformSkillBody,
	kitFilePath,
	buildOverview,
	buildSetup,
	extractDataThemeBlocks,
} from './make-kit-transform.js';
import buildSafelist from './make-kit-safelist.js';

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = join(PACKAGE_ROOT, 'docs', 'skills');
const KIT_DIR = join(PACKAGE_ROOT, 'dist', 'make-kit');
const GUIDELINES_DIR = join(KIT_DIR, 'guidelines');
const TOKENS_CSS = join(PACKAGE_ROOT, 'dist', 'css', 'tokens.css');
const STYLES_OUT = join(KIT_DIR, 'styles.css');

// Read every skill, parse its frontmatter, and keep only the opted-in ones.
// Array methods (not for...of) to satisfy the repo's airbnb no-restricted-syntax rule.
const included = readdirSync(SKILLS_DIR)
	.filter((file) => file.endsWith('.md'))
	.map((file) => parseFrontmatter(readFileSync(join(SKILLS_DIR, file), 'utf8')))
	.filter(({ data }) => shouldInclude(data));

// One guideline file per included skill.
included.forEach(({ data, body }) => {
	const outPath = join(KIT_DIR, kitFilePath(data));
	mkdirSync(dirname(outPath), { recursive: true });
	writeFileSync(outPath, transformSkillBody(data, body), 'utf8');
});

// Routing + setup documents.
mkdirSync(GUIDELINES_DIR, { recursive: true });
// Guidelines.md is the entry file Figma Make creates and reads first; our router replaces it.
writeFileSync(join(GUIDELINES_DIR, 'Guidelines.md'), buildOverview(included), 'utf8');
writeFileSync(join(GUIDELINES_DIR, 'setup.md'), buildSetup(), 'utf8');

// Style context: compile the Kiva Tailwind preset into a full stylesheet, then append the
// non-default theme blocks (the compile only emits the default-theme :root).
const safelist = buildSafelist({
	spaceKeys: Object.keys(designTokens.space),
	radiusKeys: Object.keys(designTokens.radii),
	zKeys: Object.keys(designTokens.zIndices),
	textColors: Object.keys(buildColorChoices('text')),
	bgColors: Object.keys(buildColorChoices('background')),
	borderColors: Object.keys(buildColorChoices('border')),
});

const compiled = await postcss([tailwindcss({
	presets: [tailwindConfig],
	content: [{ raw: '', extension: 'html' }],
	safelist,
})]).process('@tailwind base;\n@tailwind components;\n@tailwind utilities;\n', { from: undefined });

const themeBlocks = extractDataThemeBlocks(readFileSync(TOKENS_CSS, 'utf8'));
writeFileSync(
	STYLES_OUT,
	`${compiled.css}\n\n/* Non-default themes (from @kiva/kv-tokens dist/css/tokens.css) */\n${themeBlocks}\n`,
	'utf8',
);

process.stdout.write(
	`make-kit: wrote ${included.length} guideline files + Guidelines, setup, styles.css `
	+ `to ${relative(PACKAGE_ROOT, KIT_DIR)}\n`,
);
