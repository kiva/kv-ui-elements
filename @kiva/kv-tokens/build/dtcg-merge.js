// Pure merge logic for the raw DTCG manifest. Kept side-effect free so the
// CLI wrapper (build-dtcg.js) and the test suite share the same code path.

import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const isLeaf = (node) => node && typeof node === 'object' && '$value' in node;

export function findJsonFiles(rootDir) {
	const out = [];
	const walk = (dir) => {
		readdirSync(dir).forEach((entry) => {
			const full = join(dir, entry);
			if (statSync(full).isDirectory()) {
				walk(full);
			} else if (entry.endsWith('.json')) {
				out.push(full);
			}
		});
	};
	walk(rootDir);
	return out.sort();
}

// Deep-merges DTCG token sources into a single object. Throws if two source
// files both define a leaf at the same path — the canonical source must not
// have ambiguous duplicates.
export function mergeTokens(sources) {
	const out = {};
	const provenance = new Map();

	const walk = (node, path, fromFile) => {
		if (isLeaf(node)) {
			const pathKey = path.join('.');
			if (provenance.has(pathKey)) {
				throw new Error(
					`Leaf token collision at "${pathKey}" — defined in both `
					+ `${provenance.get(pathKey)} and ${fromFile}`,
				);
			}
			let cursor = out;
			for (let i = 0; i < path.length - 1; i += 1) {
				cursor[path[i]] = cursor[path[i]] ?? {};
				cursor = cursor[path[i]];
			}
			cursor[path[path.length - 1]] = node;
			provenance.set(pathKey, fromFile);
			return;
		}
		if (node && typeof node === 'object' && !Array.isArray(node)) {
			Object.keys(node).forEach((key) => walk(node[key], [...path, key], fromFile));
		}
	};

	sources.forEach(({ path, contents }) => {
		walk(contents, [], path);
	});

	return out;
}
