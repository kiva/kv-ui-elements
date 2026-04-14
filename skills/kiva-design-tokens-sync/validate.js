/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_KNOWN_DEPRECATED = ['Alias - Color (deprecated)'];
const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

function validateValue(type, value) {
	if (type === 'color') {
		if (!value || typeof value !== 'object') return 'color value not an object';
		if (!HEX_RE.test(value.hex)) return `invalid hex: ${JSON.stringify(value.hex)}`;
		if (typeof value.alpha !== 'number' || !Number.isFinite(value.alpha) || value.alpha < 0 || value.alpha > 1) {
			return `invalid alpha: ${JSON.stringify(value.alpha)}`;
		}
		return null;
	}
	if (type === 'number') {
		if (typeof value !== 'number' || !Number.isFinite(value)) {
			return `not a finite number: ${JSON.stringify(value)}`;
		}
		return null;
	}
	return null;
}

function aliasNameToKey(name) {
	return name.replace(/\//g, '.');
}

function normalizeCollectionName(name) {
	return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function resolveCollection(byNormalizedName, name) {
	return byNormalizedName.get(normalizeCollectionName(name));
}

function walkAliasChain(byNormalizedName, alias, mode, seen) {
	const targetDoc = resolveCollection(byNormalizedName, alias.collection);
	if (!targetDoc) return null;
	const targetKey = aliasNameToKey(alias.name);
	const targetToken = targetDoc.tokens[targetKey];
	if (!targetToken) return `alias target not found: ${alias.collection} / ${targetKey}`;
	const id = `${alias.collection}:${targetKey}`;
	if (seen.has(id)) return `cycle detected through ${id}`;
	const next = targetToken.aliasOf?.[mode];
	if (next) {
		const s = new Set(seen);
		s.add(id);
		return walkAliasChain(byNormalizedName, next, mode, s);
	}
	return null;
}

export function validate(docs, options = {}) {
	const deprecatedSource = options.knownDeprecatedCollections ?? DEFAULT_KNOWN_DEPRECATED;
	const knownDeprecated = new Set(deprecatedSource.map(normalizeCollectionName));
	const byNormalizedName = new Map(docs.map((d) => [normalizeCollectionName(d.displayName), d]));
	const issues = [];

	for (const doc of docs) {
		const modeSet = new Set(doc.modes);

		for (const [key, token] of Object.entries(doc.tokens)) {
			for (const mode of modeSet) {
				if (!(mode in token.values)) {
					issues.push({
						severity: 'warn',
						kind: 'partial-coverage',
						collection: doc.displayName,
						token: key,
						missingMode: mode,
					});
				}
			}

			for (const [mode, value] of Object.entries(token.values)) {
				const reason = validateValue(token.type, value);
				if (reason) {
					issues.push({
						severity: 'error',
						kind: 'invalid-value',
						collection: doc.displayName,
						token: key,
						mode,
						reason,
					});
				}
			}

			if (token.aliasOf) {
				for (const [mode, alias] of Object.entries(token.aliasOf)) {
					const normalizedTarget = normalizeCollectionName(alias.collection);
					if (!byNormalizedName.has(normalizedTarget)) {
						if (!knownDeprecated.has(normalizedTarget)) {
							issues.push({
								severity: 'error',
								kind: 'unknown-alias-collection',
								collection: doc.displayName,
								token: key,
								mode,
								target: alias,
							});
						}
						continue;
					}
					const seed = new Set([`${normalizeCollectionName(doc.displayName)}:${key}`]);
					const chainIssue = walkAliasChain(byNormalizedName, alias, mode, seed);
					if (chainIssue) {
						issues.push({
							severity: 'error',
							kind: 'broken-alias-chain',
							collection: doc.displayName,
							token: key,
							mode,
							reason: chainIssue,
						});
					}
				}
			}
		}
	}

	return { issues };
}

export function formatIssues(issues) {
	if (issues.length === 0) return 'No validation issues.';
	const byKind = new Map();
	for (const i of issues) {
		if (!byKind.has(i.kind)) byKind.set(i.kind, []);
		byKind.get(i.kind).push(i);
	}
	const lines = [`${issues.length} validation issue(s):`];
	for (const [kind, list] of byKind) {
		lines.push(`  [${kind}] ${list.length}`);
		for (const i of list.slice(0, 5)) {
			const detail = i.reason ?? i.missingMode ?? (i.target && `${i.target.collection} / ${i.target.name}`);
			lines.push(`    ${i.collection} · ${i.token}${i.mode ? ` (${i.mode})` : ''} — ${detail}`);
		}
		if (list.length > 5) lines.push(`    ... and ${list.length - 5} more`);
	}
	return lines.join('\n');
}

export async function loadAndValidate(tokensDir) {
	const files = (await fs.readdir(tokensDir)).filter((f) => f.endsWith('.json'));
	const docs = [];
	for (const f of files) {
		docs.push(JSON.parse(await fs.readFile(path.join(tokensDir, f), 'utf8')));
	}
	return validate(docs);
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const here = path.dirname(fileURLToPath(import.meta.url));
	const tokensDir = path.resolve(here, '..', 'kiva-design-tokens', 'references', 'tokens');
	loadAndValidate(tokensDir)
		.then(({ issues }) => {
			console.log(formatIssues(issues));
			const errors = issues.filter((i) => i.severity === 'error').length;
			process.exit(errors > 0 ? 1 : 0);
		})
		.catch((err) => {
			console.error('Validator failed:', err);
			process.exit(2);
		});
}
