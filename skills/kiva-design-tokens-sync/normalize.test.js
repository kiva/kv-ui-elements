import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import {
	discoverCollections,
	extractTokensFromMode,
	buildCollectionDoc,
	run,
// eslint-disable-next-line import/extensions
} from './normalize.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(__dirname, 'test-fixtures');

test('discoverCollections finds single-file and multi-file collections', async () => {
	const collections = await discoverCollections(FIXTURES);
	const byName = Object.fromEntries(collections.map((c) => [c.name, c]));

	assert.ok(byName['single-mode'], 'single-file collection detected');
	assert.equal(byName['single-mode'].slug, 'single-mode');
	assert.equal(byName['single-mode'].modes.length, 1);

	assert.ok(byName['multi-mode'], 'multi-file collection detected');
	assert.equal(byName['multi-mode'].modes.length, 2);
	const modeNames = byName['multi-mode'].modes.map((m) => m.fileName).sort();
	assert.deepEqual(modeNames, ['mode-a.tokens.json', 'mode-b.tokens.json']);
});

test('extractTokensFromMode flattens nested paths and normalizes values', async () => {
	const data = {
		text: {
			primary: {
				$type: 'color',
				$value: {
					colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000',
				},
				$description: 'black text',
				$extensions: {
					'com.figma.variableId': 'VariableID:1:1',
					'com.figma.scopes': ['TEXT_FILL'],
					'com.figma.aliasData': {
						targetVariableName: 'color/neutral/black',
						targetVariableSetName: 'Global',
					},
				},
			},
		},
		size: {
			lg: {
				$type: 'number',
				$value: 16,
				$extensions: { 'com.figma.variableId': 'VariableID:2:1' },
			},
		},
		$extensions: { 'com.figma.modeName': 'Mode 1' },
	};

	const { modeName, tokens } = extractTokensFromMode(data);
	assert.equal(modeName, 'Mode 1');
	assert.deepEqual(tokens['text.primary'], {
		type: 'color',
		value: { hex: '#000000', alpha: 1 },
		description: 'black text',
		figmaId: 'VariableID:1:1',
		scopes: ['TEXT_FILL'],
		aliasOf: { name: 'color/neutral/black', collection: 'Global' },
	});
	assert.deepEqual(tokens['size.lg'], {
		type: 'number',
		value: 16,
		description: undefined,
		figmaId: 'VariableID:2:1',
		scopes: undefined,
		aliasOf: undefined,
	});
});

test('buildCollectionDoc merges modes under per-token entries', async () => {
	const collection = {
		name: 'multi-mode',
		slug: 'multi-mode',
		modes: [
			{ filePath: path.join(FIXTURES, 'multi-mode', 'mode-a.tokens.json'), fileName: 'mode-a.tokens.json' },
			{ filePath: path.join(FIXTURES, 'multi-mode', 'mode-b.tokens.json'), fileName: 'mode-b.tokens.json' },
		],
	};
	const doc = await buildCollectionDoc(collection);
	assert.equal(doc.collection, 'multi-mode');
	assert.equal(doc.displayName, 'multi-mode');
	assert.deepEqual(doc.modes, ['a', 'b']);
	assert.deepEqual(Object.keys(doc.tokens), ['bar']);
	assert.deepEqual(doc.tokens.bar.values, { a: 1, b: 2 });
	assert.equal(doc.tokens.bar.type, 'number');
});

test('run emits one JSON per collection plus catalog.md', async () => {
	const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'norm-'));
	try {
		const rawDir = path.join(tmp, 'raw');
		const outTokens = path.join(tmp, 'tokens');
		const catalog = path.join(tmp, 'catalog.md');
		await fs.mkdir(rawDir, { recursive: true });
		await fs.cp(FIXTURES, rawDir, { recursive: true });

		const report = await run({ rawDir, outTokensDir: outTokens, outCatalogPath: catalog });

		const files = (await fs.readdir(outTokens)).sort();
		assert.deepEqual(files, ['multi-mode.json', 'single-mode.json']);

		const multi = JSON.parse(await fs.readFile(path.join(outTokens, 'multi-mode.json'), 'utf8'));
		assert.equal(multi.collection, 'multi-mode');
		assert.equal(Object.keys(multi.tokens).length, 1);

		const catalogText = await fs.readFile(catalog, 'utf8');
		assert.match(catalogText, /single-mode/);
		assert.match(catalogText, /multi-mode/);

		assert.ok(report.collections.length === 2);
	} finally {
		await fs.rm(tmp, { recursive: true, force: true });
	}
});
