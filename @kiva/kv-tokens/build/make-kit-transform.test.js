import { test } from 'node:test';
import { strict as assert } from 'node:assert';

import {
	parseFrontmatter,
	shouldInclude,
	transformSkillBody,
	kitFilePath,
	buildOverview,
	buildSetup,
	extractDataThemeBlocks,
} from './make-kit-transform.js';

const SAMPLE = `---
name: spacing
description: Spacing system.
when_to_use: When spacing things.
make_kit:
  include: true
  category: foundations
  order: 30
---
# Kiva Spacing

Body text here.
`;

const EXCLUDED = `---
name: header-element-audit
description: Internal audit process.
when_to_use: Before the remap.
---
# Header audit

Internal only.
`;

test('parseFrontmatter splits data and body', () => {
	const { data, body } = parseFrontmatter(SAMPLE);
	assert.equal(data.name, 'spacing');
	assert.equal(data.make_kit.include, true);
	assert.equal(data.make_kit.category, 'foundations');
	assert.match(body, /^# Kiva Spacing/);
});

test('parseFrontmatter returns empty data when no frontmatter present', () => {
	const { data, body } = parseFrontmatter('# Just a body\n');
	assert.deepEqual(data, {});
	assert.equal(body, '# Just a body\n');
});

test('shouldInclude is true only when make_kit.include === true', () => {
	assert.equal(shouldInclude(parseFrontmatter(SAMPLE).data), true);
	assert.equal(shouldInclude(parseFrontmatter(EXCLUDED).data), false);
	assert.equal(shouldInclude({}), false);
});

test('transformSkillBody strips frontmatter and inserts the When to use lead line after the H1', () => {
	const { data, body } = parseFrontmatter(SAMPLE);
	const out = transformSkillBody(data, body);
	assert.doesNotMatch(out, /^---/);
	const lines = out.split('\n');
	assert.equal(lines[0], '# Kiva Spacing');
	assert.equal(lines[1], '');
	assert.equal(lines[2], '**When to use:** When spacing things.');
});

test('transformSkillBody leaves body unchanged when when_to_use is absent', () => {
	const out = transformSkillBody({ name: 'x' }, '# Title\n\nBody.\n');
	assert.doesNotMatch(out, /When to use/);
	assert.match(out, /^# Title/);
});

test('kitFilePath places a file under its category by name', () => {
	const { data } = parseFrontmatter(SAMPLE);
	assert.equal(kitFilePath(data), 'guidelines/foundations/spacing.md');
});

test('buildOverview links every skill, ordered by make_kit.order ascending', () => {
	const typography = {
		data: { name: 'typography', description: 'Type.', make_kit: { category: 'foundations', order: 20 } },
	};
	const spacing = {
		data: { name: 'spacing', description: 'Space.', make_kit: { category: 'foundations', order: 10 } },
	};
	const md = buildOverview([typography, spacing]);
	assert.ok(md.indexOf('spacing') < md.indexOf('typography'), 'lower order sorts first');
	assert.match(md, /\[spacing\]\(foundations\/spacing\.md\) — Space\./);
	assert.match(md, /\[typography\]\(foundations\/typography\.md\) — Type\./);
});

test('buildSetup documents the preset path and the compiled-CSS fallback', () => {
	const md = buildSetup();
	assert.match(md, /presets: \[tailwindConfig\]/);
	assert.match(md, /npm i -D tailwindcss/);
	assert.match(md, /tw-text-h1/);
	assert.match(md, /styles\.css/);
	assert.match(md, /foundations\/tailwind\.md/);
});

test('extractDataThemeBlocks returns only the [data-theme] blocks', () => {
	const css = ':root { --x: 1; }\n[data-theme="dark-green"] { --x: 2; }\n[data-theme="marigold"] { --x: 3; }';
	const out = extractDataThemeBlocks(css);
	assert.doesNotMatch(out, /:root/);
	assert.match(out, /\[data-theme="dark-green"\]/);
	assert.match(out, /\[data-theme="marigold"\]/);
});
