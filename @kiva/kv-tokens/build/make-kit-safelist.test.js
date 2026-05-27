import { test } from 'node:test';
import { strict as assert } from 'node:assert';

import buildSafelist from './make-kit-safelist.js';

const fixture = {
	spaceKeys: ['0.5', '4', '16'],
	radiusKeys: ['xs', 'md'],
	zKeys: ['modal', 'tooltip'],
	textColors: ['primary', 'secondary'],
	bgColors: ['primary', 'action'],
	borderColors: ['action'],
};

test('buildSafelist includes spacing utilities across families and scale keys', () => {
	const sl = buildSafelist(fixture);
	assert.ok(sl.includes('tw-p-4'));
	assert.ok(sl.includes('tw-gap-0.5'));
	assert.ok(sl.includes('tw-mt-16'));
});

test('buildSafelist includes radius, themable color, z-index, and type utilities', () => {
	const sl = buildSafelist(fixture);
	assert.ok(sl.includes('tw-rounded')); // DEFAULT
	assert.ok(sl.includes('tw-rounded-md'));
	assert.ok(sl.includes('tw-bg-primary'));
	assert.ok(sl.includes('tw-text-secondary'));
	assert.ok(sl.includes('tw-border-action'));
	assert.ok(sl.includes('tw-z-modal'));
	assert.ok(sl.includes('tw-text-h1')); // semantic type utility (fixed list)
});

test('buildSafelist returns a unique, non-empty string array', () => {
	const sl = buildSafelist(fixture);
	assert.ok(sl.length > 0);
	assert.equal(sl.length, new Set(sl).size, 'no duplicates');
	assert.ok(sl.every((s) => typeof s === 'string'));
});
