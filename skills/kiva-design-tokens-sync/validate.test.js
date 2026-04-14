import { test } from 'node:test';
import assert from 'node:assert/strict';
// eslint-disable-next-line import/extensions
import { validate } from './validate.js';

const KNOWN_DEPRECATED = ['Alias - Color (deprecated)'];

const COLOR_BLACK = { hex: '#000000', alpha: 1 };
const COLOR_GREEN = { hex: '#223829', alpha: 1 };

function makeDoc(overrides) {
	return {
		collection: 'test',
		displayName: 'Test',
		modes: ['a'],
		tokens: {},
		...overrides,
	};
}

test('validate flags tokens with modes missing from values', () => {
	const doc = makeDoc({
		modes: ['a', 'b'],
		tokens: {
			foo: { type: 'number', values: { a: 1 } },
		},
	});
	const { issues } = validate([doc]);
	const partial = issues.filter((i) => i.kind === 'partial-coverage');
	assert.equal(partial.length, 1);
	assert.equal(partial[0].missingMode, 'b');
});

test('validate flags invalid hex colors and non-finite numbers', () => {
	const doc = makeDoc({
		tokens: {
			'bad.color': { type: 'color', values: { a: { hex: 'not-hex', alpha: 1 } } },
			'bad.alpha': { type: 'color', values: { a: { hex: '#000000', alpha: 2 } } },
			'bad.num': { type: 'number', values: { a: Infinity } },
		},
	});
	const { issues } = validate([doc]);
	const kinds = issues.filter((i) => i.kind === 'invalid-value').map((i) => i.token);
	assert.deepEqual(kinds.sort(), ['bad.alpha', 'bad.color', 'bad.num']);
});

test('validate flags alias pointing to unknown collection (not in deprecated allowlist)', () => {
	const alias = makeDoc({
		displayName: 'Alias',
		tokens: {
			x: {
				type: 'color',
				values: { a: COLOR_BLACK },
				aliasOf: { a: { name: 'color.y', collection: 'Ghost' } },
			},
		},
	});
	const { issues } = validate([alias], { knownDeprecatedCollections: KNOWN_DEPRECATED });
	const unknowns = issues.filter((i) => i.kind === 'unknown-alias-collection');
	assert.equal(unknowns.length, 1);
	assert.equal(unknowns[0].target.collection, 'Ghost');
});

test('validate tolerates aliases to the known-deprecated collection', () => {
	const doc = makeDoc({
		tokens: {
			x: {
				type: 'color',
				values: { a: COLOR_BLACK },
				aliasOf: {
					a: { name: 'c.y', collection: 'Alias - Color (deprecated)' },
				},
			},
		},
	});
	const { issues } = validate([doc], { knownDeprecatedCollections: KNOWN_DEPRECATED });
	assert.equal(issues.filter((i) => i.kind === 'unknown-alias-collection').length, 0);
});

test('validate flags alias target name that does not exist in target collection', () => {
	const global = makeDoc({
		displayName: 'Global',
		tokens: {
			'color.real': { type: 'color', values: { a: COLOR_BLACK } },
		},
	});
	const alias = makeDoc({
		displayName: 'Alias',
		tokens: {
			x: {
				type: 'color',
				values: { a: COLOR_BLACK },
				aliasOf: { a: { name: 'color/missing', collection: 'Global' } },
			},
		},
	});
	const { issues } = validate([global, alias]);
	const broken = issues.filter((i) => i.kind === 'broken-alias-chain');
	assert.equal(broken.length, 1);
	assert.match(broken[0].reason, /not found/);
});

test('validate resolves alias path with slashes to dot-notation key', () => {
	const global = makeDoc({
		displayName: 'Global',
		tokens: {
			'color.eco-green.4': { type: 'color', values: { a: COLOR_GREEN } },
		},
	});
	const alias = makeDoc({
		displayName: 'Alias',
		tokens: {
			x: {
				type: 'color',
				values: { a: COLOR_GREEN },
				aliasOf: {
					a: { name: 'color/eco-green/4', collection: 'Global' },
				},
			},
		},
	});
	const { issues } = validate([global, alias]);
	assert.equal(issues.filter((i) => i.kind === 'broken-alias-chain').length, 0);
});

test('validate detects alias cycles', () => {
	const a = makeDoc({
		displayName: 'A',
		tokens: {
			x: {
				type: 'color',
				values: { a: COLOR_BLACK },
				aliasOf: { a: { name: 'y', collection: 'B' } },
			},
		},
	});
	const b = makeDoc({
		displayName: 'B',
		tokens: {
			y: {
				type: 'color',
				values: { a: COLOR_BLACK },
				aliasOf: { a: { name: 'x', collection: 'A' } },
			},
		},
	});
	const { issues } = validate([a, b]);
	const cycles = issues.filter((i) => i.kind === 'broken-alias-chain' && /cycle/i.test(i.reason));
	assert.ok(cycles.length >= 1, 'expected a cycle issue');
});
