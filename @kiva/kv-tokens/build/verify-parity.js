// Temporary parity verifier: confirms the SD-generated nested default export
// matches the hand-authored primitives.js default export. Deleted after the
// old file is removed in Phase 6.

import legacy from '../primitives.js';
import generated from '../dist/js/tokens.js';

const diff = (a, b, path = '') => {
	if (a === b) return null;
	if (typeof a !== typeof b) return `${path}: type ${typeof a} vs ${typeof b}`;
	if (a === null || b === null || typeof a !== 'object') {
		return `${path}: ${JSON.stringify(a)} !== ${JSON.stringify(b)}`;
	}
	const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
	// eslint-disable-next-line no-restricted-syntax
	for (const k of keys) {
		if (!(k in a)) return `${path}.${k}: missing in legacy`;
		if (!(k in b)) return `${path}.${k}: missing in generated`;
		const d = diff(a[k], b[k], `${path}.${k}`);
		if (d) return d;
	}
	return null;
};

const result = diff(legacy, generated, 'tokens');
if (result) {
	console.error('✗ parity check FAILED');
	console.error(result);
	process.exit(1);
}
console.log('✓ parity check passed');
