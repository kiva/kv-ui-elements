import { test } from 'node:test';
import { strict as assert } from 'node:assert';

import { mergeTokens } from './dtcg-merge.js';

test('merges disjoint top-level keys from multiple sources', () => {
	const result = mergeTokens([
		{
			path: 'a.json',
			contents: { color: { red: { $type: 'color', $value: '#f00' } } },
		},
		{
			path: 'b.json',
			contents: {
				space: { 1: { $type: 'dimension', $value: { value: 4, unit: 'px' } } },
			},
		},
	]);

	assert.equal(result.color.red.$value, '#f00');
	assert.equal(result.space[1].$value.value, 4);
});

test('merges nested keys at the same branch without collision', () => {
	const result = mergeTokens([
		{
			path: 'theme-default.json',
			contents: {
				theme: { DEFAULT: { text: { primary: { $type: 'color', $value: '#000' } } } },
			},
		},
		{
			path: 'theme-dark.json',
			contents: {
				theme: { dark: { text: { primary: { $type: 'color', $value: '#fff' } } } },
			},
		},
	]);

	assert.equal(result.theme.DEFAULT.text.primary.$value, '#000');
	assert.equal(result.theme.dark.text.primary.$value, '#fff');
});

test('preserves alias references as literal strings', () => {
	const result = mergeTokens([
		{
			path: 'core.json',
			contents: { color: { brand: { $type: 'color', $value: '#2AA967' } } },
		},
		{
			path: 'semantic.json',
			contents: {
				theme: { DEFAULT: { primary: { $type: 'color', $value: '{color.brand}' } } },
			},
		},
	]);

	assert.equal(result.theme.DEFAULT.primary.$value, '{color.brand}');
});

test('preserves $type and $description metadata', () => {
	const result = mergeTokens([
		{
			path: 'a.json',
			contents: {
				color: {
					red: {
						$type: 'color',
						$value: '#f00',
						$description: 'danger signal',
					},
				},
			},
		},
	]);

	assert.equal(result.color.red.$type, 'color');
	assert.equal(result.color.red.$description, 'danger signal');
});

test('preserves dimension $value object shape (does not unwrap)', () => {
	const result = mergeTokens([
		{
			path: 'a.json',
			contents: {
				space: { 1: { $type: 'dimension', $value: { value: 4, unit: 'px' } } },
			},
		},
	]);

	assert.deepEqual(result.space[1].$value, { value: 4, unit: 'px' });
});

test('throws on leaf collision with both source paths in the message', () => {
	assert.throws(
		() => mergeTokens([
			{
				path: 'a.json',
				contents: { color: { brand: { $type: 'color', $value: '#000' } } },
			},
			{
				path: 'b.json',
				contents: { color: { brand: { $type: 'color', $value: '#fff' } } },
			},
		]),
		(err) => {
			assert.match(err.message, /collision/);
			assert.match(err.message, /color\.brand/);
			assert.match(err.message, /a\.json/);
			assert.match(err.message, /b\.json/);
			return true;
		},
	);
});

test('leaves $value untouched when it is the literal string "0"', () => {
	// Guard against a naive `!$value` check treating falsy values as missing.
	const result = mergeTokens([
		{
			path: 'a.json',
			contents: { opacity: { none: { $type: 'opacity', $value: 0 } } },
		},
	]);

	assert.equal(result.opacity.none.$value, 0);
});

test('returns an empty object for empty input', () => {
	assert.deepEqual(mergeTokens([]), {});
});

test('merges three sources sharing the same branch', () => {
	const result = mergeTokens([
		{ path: 'a.json', contents: { color: { a: { $type: 'color', $value: '#a' } } } },
		{ path: 'b.json', contents: { color: { b: { $type: 'color', $value: '#b' } } } },
		{ path: 'c.json', contents: { color: { c: { $type: 'color', $value: '#c' } } } },
	]);

	assert.deepEqual(Object.keys(result.color).sort(), ['a', 'b', 'c']);
});
