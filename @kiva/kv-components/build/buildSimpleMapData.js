/**
 * Generates two data files used by KvSimpleMap:
 *
 *   src/data/simpleMapCountryPaths.ts  — ISO-2 → SVG-path-key mapping
 *   src/data/simpleMapCentroids.ts     — ISO-2 → { cx, cy, xMax, yMax } (bbox midpoint + bottom-right corner, SVG coords)
 *
 * Inputs:
 *   src/data/simpleMapPaths.ts                                  (already copied)
 *   ../../../ZeroStateAnimations/src/app/components/animated-world-map.tsx
 *     (read once for its hand-curated id↔pathKey COUNTRIES array)
 *
 * Run manually after either input changes:
 *   node build/buildSimpleMapData.js
 *
 * The bbox-midpoint is a deliberate approximation for camera-pan targets, not
 * a true cartographic centroid. Multipolygon countries (Russia, Fiji, etc.)
 * may land their midpoint somewhere unexpected; consumers can override with
 * an explicit cx/cy on the country object.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname);
const PKG_ROOT = path.resolve(HERE, '..');
const SRC_TSX = path.resolve(
	PKG_ROOT,
	'../../ZeroStateAnimations/src/app/components/animated-world-map.tsx',
);
const PATHS_FILE = path.resolve(PKG_ROOT, 'src/data/simpleMapPaths.ts');
const OUT_COUNTRY_PATHS = path.resolve(PKG_ROOT, 'src/data/simpleMapCountryPaths.ts');
const OUT_CENTROIDS = path.resolve(PKG_ROOT, 'src/data/simpleMapCentroids.ts');

// ── Step 1: parse COUNTRIES array out of the source TSX ─────────────────────
async function readCountryPaths() {
	const tsx = await fs.readFile(SRC_TSX, 'utf8');
	const start = tsx.indexOf('const COUNTRIES');
	if (start === -1) throw new Error('Could not locate COUNTRIES array in source');
	// Match every `{ id: 'XX', key: 'pYYYY' }` occurrence after `const COUNTRIES`
	const slice = tsx.slice(start);
	const re = /\{\s*id:\s*'([A-Z]{2})'\s*,\s*key:\s*'([^']+)'\s*\}/g;
	const out = [];
	let m;
	// eslint-disable-next-line no-cond-assign
	while ((m = re.exec(slice)) !== null) {
		out.push({ id: m[1], key: m[2] });
	}
	if (out.length < 100) {
		throw new Error(`Suspiciously few countries parsed (${out.length})`);
	}
	return out;
}

// ── Step 2: import the paths module to get d-strings ────────────────────────
async function readPaths() {
	// Dynamic import the .ts file via a transient .mjs shim so Node can read it
	// without a TypeScript compiler. The TS file uses only `export default {...}`,
	// no annotations — so swap the extension and import.
	const tsSource = await fs.readFile(PATHS_FILE, 'utf8');
	const shim = path.resolve(HERE, '.simpleMapPaths.shim.mjs');
	await fs.writeFile(shim, tsSource);
	try {
		const mod = await import(`${shim}?cachebust=${Date.now()}`);
		return mod.default;
	} finally {
		await fs.unlink(shim).catch(() => {});
	}
}

function round2(n) {
	return Math.round(n * 100) / 100;
}

// ── Step 3: bbox-midpoint of a path ─────────────────────────────────────────
// Paths use only absolute commands: M, L, H, V, Z. Multipolygons appear as
// repeated M sub-paths within one d-string — bbox naturally covers them all.
function pathCentroid(d) {
	let minX = Infinity;
	let maxX = -Infinity;
	let minY = Infinity;
	let maxY = -Infinity;
	let cx = 0;
	let cy = 0;

	const tokenRe = /([MLHVZ])([^MLHVZ]*)/g;
	let m;
	// eslint-disable-next-line no-cond-assign
	while ((m = tokenRe.exec(d)) !== null) {
		const cmd = m[1];
		const args = m[2].trim().split(/[\s,]+/).filter(Boolean).map(Number);
		if (cmd === 'M' || cmd === 'L') {
			for (let i = 0; i + 1 < args.length; i += 2) {
				cx = args[i];
				cy = args[i + 1];
				if (cx < minX) minX = cx;
				if (cx > maxX) maxX = cx;
				if (cy < minY) minY = cy;
				if (cy > maxY) maxY = cy;
			}
		} else if (cmd === 'H') {
			// eslint-disable-next-line no-restricted-syntax
			for (const x of args) {
				cx = x;
				if (cx < minX) minX = cx;
				if (cx > maxX) maxX = cx;
			}
		} else if (cmd === 'V') {
			// eslint-disable-next-line no-restricted-syntax
			for (const y of args) {
				cy = y;
				if (cy < minY) minY = cy;
				if (cy > maxY) maxY = cy;
			}
		}
		// Z: no-op for bbox
	}

	if (!Number.isFinite(minX)) return null;
	return {
		cx: round2((minX + maxX) / 2),
		cy: round2((minY + maxY) / 2),
		xMax: round2(maxX),
		yMax: round2(maxY),
	};
}

// ── Step 4: validate against source-of-truth FEATURED centroids ─────────────
// Source hardcoded these for the 5 markets; computed bbox-midpoint should be
// close (within ~30 SVG units, which is much smaller than the country itself).
const FEATURED_TRUTH = {
	KE: { cx: 784, cy: 346 },
	PE: { cx: 370, cy: 388 },
	KH: { cx: 1035, cy: 280 },
	SN: { cx: 595, cy: 272 },
	TZ: { cx: 778, cy: 362 },
};

function validate(centroids) {
	const issues = [];
	// eslint-disable-next-line no-restricted-syntax
	for (const [iso, truth] of Object.entries(FEATURED_TRUTH)) {
		const got = centroids[iso];
		if (!got) {
			issues.push(`${iso}: missing`);
			// eslint-disable-next-line no-continue
			continue;
		}
		const dx = Math.abs(got.cx - truth.cx);
		const dy = Math.abs(got.cy - truth.cy);
		if (dx > 50 || dy > 50) {
			issues.push(
				`${iso}: bbox-midpoint (${got.cx}, ${got.cy}) drifts >50 from hardcoded (${truth.cx}, ${truth.cy})`,
			);
		}
	}
	if (issues.length) {
		console.warn('[buildSimpleMapData] centroid validation warnings:');
		// eslint-disable-next-line no-restricted-syntax
		for (const line of issues) console.warn(`  - ${line}`);
	} else {
		console.log('[buildSimpleMapData] centroid validation OK against 5 hardcoded markets');
	}
}

// ── Step 5: emit the two files ──────────────────────────────────────────────
function formatCountryPaths(entries) {
	const body = entries
		.map(({ id, key }) => `\t{ id: '${id}', key: '${key}' },`)
		.join('\n');
	return `// Auto-generated by build/buildSimpleMapData.js — do not edit by hand.
// Maps ISO-2 country codes to their corresponding SVG path key in simpleMapPaths.

export interface CountryPathEntry {
	id: string;
	key: string;
}

const simpleMapCountryPaths: CountryPathEntry[] = [
${body}
];

export default simpleMapCountryPaths;
`;
}

function formatCentroids(centroidsByIso) {
	// Emit each entry as a multi-line object — airbnb's object-curly-newline
	// requires line breaks once an object has 4+ properties.
	const body = Object.entries(centroidsByIso)
		.map(([id, {
			cx, cy, xMax, yMax,
		}]) => [
			`\t${id}: {`,
			`\t\tcx: ${cx},`,
			`\t\tcy: ${cy},`,
			`\t\txMax: ${xMax},`,
			`\t\tyMax: ${yMax},`,
			'\t},',
		].join('\n'))
		.join('\n');
	return `// Auto-generated by build/buildSimpleMapData.js — do not edit by hand.
// Bounding-box midpoint and bottom-right corner per ISO-2 country in the SVG
// coordinate space (1300.02 × 571.784). cx/cy drives camera pan targets;
// xMax/yMax anchors the popup at the country's bottom-right.

export interface Centroid {
	cx: number;
	cy: number;
	xMax: number;
	yMax: number;
}

const simpleMapCentroids: Record<string, Centroid> = {
${body}
};

export default simpleMapCentroids;
`;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
	const [countryPaths, paths] = await Promise.all([readCountryPaths(), readPaths()]);
	console.log(`[buildSimpleMapData] parsed ${countryPaths.length} countries from source`);

	const centroids = {};
	const missing = [];
	// eslint-disable-next-line no-restricted-syntax
	for (const { id, key } of countryPaths) {
		const d = paths[key];
		if (!d) {
			missing.push(`${id} (${key})`);
			// eslint-disable-next-line no-continue
			continue;
		}
		const c = pathCentroid(d);
		if (!c) {
			missing.push(`${id} (${key}) — empty bbox`);
			// eslint-disable-next-line no-continue
			continue;
		}
		centroids[id] = c;
	}
	if (missing.length) {
		console.warn(`[buildSimpleMapData] ${missing.length} entries skipped:`, missing);
	}

	validate(centroids);

	await fs.writeFile(OUT_COUNTRY_PATHS, formatCountryPaths(countryPaths));
	await fs.writeFile(OUT_CENTROIDS, formatCentroids(centroids));
	console.log(`[buildSimpleMapData] wrote ${OUT_COUNTRY_PATHS}`);
	console.log(`[buildSimpleMapData] wrote ${OUT_CENTROIDS}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
