// Pure, deterministic transforms that turn skill files (frontmatter + markdown)
// into Figma Make guideline files. No filesystem IO lives here — see
// build-make-kit.js for the orchestration. Mirrors the dtcg-merge.js / build-dtcg.js
// split so the logic is unit-testable in isolation.

import { parse as parseYaml } from 'yaml';

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

function ensureTrailingNewline(text) {
	return text.endsWith('\n') ? text : `${text}\n`;
}

// Split a "--- yaml --- body" document into parsed data + remaining body.
// Returns empty data (and the raw text as body) when there is no frontmatter.
export function parseFrontmatter(raw) {
	const match = FRONTMATTER.exec(raw);
	if (!match) {
		return { data: {}, body: raw };
	}
	const [, yamlBlock, body] = match;
	return { data: parseYaml(yamlBlock) ?? {}, body };
}

// A skill is included in the kit only when it explicitly opts in.
export function shouldInclude(data) {
	return data?.make_kit?.include === true;
}

// Relative path of a skill's guideline file inside the kit.
export function kitFilePath(data) {
	const category = data?.make_kit?.category ?? 'foundations';
	return `guidelines/${category}/${data.name}.md`;
}

// Strip frontmatter (already separated) and fold when_to_use into a lead line
// directly under the body's first H1. Make weights "when to use" semantics.
export function transformSkillBody(data, body) {
	const trimmed = body.replace(/^\n+/, '');
	const whenToUse = data?.when_to_use?.trim();
	if (!whenToUse) {
		return ensureTrailingNewline(trimmed);
	}
	const lines = trimmed.split('\n');
	const h1Index = lines.findIndex((line) => /^#\s+/.test(line));
	const insertAt = h1Index === -1 ? 0 : h1Index + 1;
	lines.splice(insertAt, 0, '', `**When to use:** ${whenToUse}`);
	return ensureTrailingNewline(lines.join('\n'));
}

function sortSkills(skills) {
	return [...skills].sort((a, b) => {
		const ao = a.data?.make_kit?.order ?? Number.MAX_SAFE_INTEGER;
		const bo = b.data?.make_kit?.order ?? Number.MAX_SAFE_INTEGER;
		if (ao !== bo) {
			return ao - bo;
		}
		return a.data.name.localeCompare(b.data.name);
	});
}

// The root routing document Figma Make reads first.
export function buildOverview(skills) {
	const links = sortSkills(skills).map(({ data }) => {
		const category = data?.make_kit?.category ?? 'foundations';
		return `- [${data.name}](${category}/${data.name}.md) — ${data.description}`;
	});
	return ensureTrailingNewline([
		'# Kiva Design System — Guidelines',
		'',
		"Guidelines for building with Kiva's design system in Figma Make. Each file below "
			+ 'covers one foundation; read the one relevant to the decision you are making. '
			+ 'Style context (CSS custom properties for every token) is in `../styles.css`. '
			+ 'Read `setup.md` first for how to consume the system.',
		'',
		'## Foundations',
		'',
		...links,
	].join('\n'));
}

// Technical setup: how a Make project consumes the kit. Make kits currently support only
// React codebases, so the compiled stylesheet (a drop-in file) is the primary path; the
// Tailwind preset is an optional path for apps that build Tailwind themselves.
export function buildSetup() {
	return ensureTrailingNewline([
		'# Setup',
		'',
		"**When to use:** Read this first, before generating any UI, to consume Kiva's "
			+ 'design system correctly.',
		'',
		"Kiva's design system is a Tailwind CSS v3 preset, compiled to a full stylesheet that "
			+ 'ships as `../styles.css` (base layer, token-backed utilities, the `tw-text-*` '
			+ 'type system, and themable color variables).',
		'',
		'## Primary: use the compiled stylesheet',
		'',
		'Link `../styles.css` into the app and apply its `tw-`-prefixed classes directly — '
			+ '`tw-p-4`, `tw-text-h1`, `tw-bg-primary`, `tw-rounded-md`, etc. This needs no '
			+ "build step and works regardless of the app's framework or CSS setup.",
		'',
		'- Every utility carries a `tw-` prefix (e.g. `tw-bg-primary`, `tw-mb-2`).',
		'- Use the semantic type utilities (`tw-text-h1`, `tw-text-display`, `tw-text-caption`, '
			+ '…) for text — there is no `tw-text-lg`-style sizing.',
		'- Colors are themable: the default theme is in `:root`; set `data-theme="…"` on a '
			+ 'container to switch (theme variables ship in `../styles.css`).',
		'- The foundation guidelines explain which class/token to choose for a given decision.',
		'',
		'## Optional: install the Kiva Tailwind preset',
		'',
		'If the generated app builds Tailwind itself and can add the package, this gives the '
			+ 'full preset (utilities generated on demand rather than shipped):',
		'',
		'1. Install: `npm i -D tailwindcss@^3 @kiva/kv-tokens @tailwindcss/typography`.',
		'2. `tailwind.config.js`:',
		'',
		'```js',
		"import { tailwindConfig } from '@kiva/kv-tokens';",
		'',
		'export default {',
		'\tpresets: [tailwindConfig],',
		"\tcontent: ['./src/**/*.{js,jsx,ts,tsx,html}'],",
		'};',
		'```',
		'',
		'3. Import `@tailwind base; @tailwind components; @tailwind utilities;` in your root CSS.',
		'',
		'The same `tw-` prefix and semantic type utilities apply. See `foundations/tailwind.md` '
			+ 'for the full mechanics.',
	].join('\n'));
}

// Pull the non-default `[data-theme="…"] { … }` blocks out of the compiled token CSS so
// they can be appended to the compiled Tailwind output (which only emits the default :root).
export function extractDataThemeBlocks(css) {
	const matches = css.match(/\[data-theme="[^"]+"\]\s*\{[^}]*\}/g) || [];
	return matches.join('\n\n');
}
