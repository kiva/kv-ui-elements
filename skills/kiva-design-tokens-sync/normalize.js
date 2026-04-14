/* eslint-disable import/extensions */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate, formatIssues } from './validate.js';

const TOKENS_EXT = '.tokens.json';

function collectionNameFromFile(fileName) {
	return fileName.slice(0, -TOKENS_EXT.length);
}

function slugify(name) {
	return name
		.toLowerCase()
		.replace(/[\s_]+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

export async function discoverCollections(rawDir) {
	const entries = await fs.readdir(rawDir, { withFileTypes: true });
	const collections = [];

	for (const entry of entries) {
		if (entry.name.startsWith('.')) continue;
		const fullPath = path.join(rawDir, entry.name);

		if (entry.isFile() && entry.name.endsWith(TOKENS_EXT)) {
			const displayName = collectionNameFromFile(entry.name);
			collections.push({
				name: displayName,
				slug: slugify(displayName),
				modes: [{ filePath: fullPath, fileName: entry.name }],
			});
		} else if (entry.isDirectory()) {
			const modeEntries = await fs.readdir(fullPath, { withFileTypes: true });
			const modeFiles = modeEntries
				.filter((e) => e.isFile() && e.name.endsWith(TOKENS_EXT))
				.map((e) => ({ filePath: path.join(fullPath, e.name), fileName: e.name }))
				.sort((a, b) => a.fileName.localeCompare(b.fileName));
			if (modeFiles.length === 0) continue;
			collections.push({
				name: entry.name,
				slug: slugify(entry.name),
				modes: modeFiles,
			});
		}
	}

	const slugs = new Set();
	for (const c of collections) {
		if (slugs.has(c.slug)) {
			throw new Error(`Slug collision: ${c.slug} (from ${c.name})`);
		}
		slugs.add(c.slug);
	}

	return collections.sort((a, b) => a.name.localeCompare(b.name));
}

function isTokenLeaf(obj) {
	return obj && typeof obj === 'object' && '$type' in obj && '$value' in obj;
}

function normalizeValue(type, value) {
	if (type === 'color' && value && typeof value === 'object') {
		return { hex: value.hex, alpha: value.alpha };
	}
	return value;
}

function normalizeAliasData(aliasData) {
	if (!aliasData) return undefined;
	return {
		name: aliasData.targetVariableName,
		collection: aliasData.targetVariableSetName,
	};
}

function walkTokens(node, pathParts, out) {
	for (const [key, child] of Object.entries(node)) {
		if (key === '$extensions') continue;
		if (!child || typeof child !== 'object') continue;
		const nextPath = [...pathParts, key];
		if (isTokenLeaf(child)) {
			const ext = child.$extensions ?? {};
			// eslint-disable-next-line no-param-reassign
			out[nextPath.join('.')] = {
				type: child.$type,
				value: normalizeValue(child.$type, child.$value),
				description: child.$description,
				figmaId: ext['com.figma.variableId'],
				scopes: ext['com.figma.scopes'],
				aliasOf: normalizeAliasData(ext['com.figma.aliasData']),
			};
		} else {
			walkTokens(child, nextPath, out);
		}
	}
}

export function extractTokensFromMode(data) {
	const modeName = data?.$extensions?.['com.figma.modeName'];
	const tokens = {};
	walkTokens(data, [], tokens);
	return { modeName, tokens };
}

export async function buildCollectionDoc(collection) {
	const modes = [];
	const byToken = new Map();

	for (const mode of collection.modes) {
		const raw = JSON.parse(await fs.readFile(mode.filePath, 'utf8'));
		const { modeName, tokens } = extractTokensFromMode(raw);
		const effectiveMode = modeName ?? path.basename(mode.fileName, TOKENS_EXT);
		modes.push(effectiveMode);

		for (const [key, token] of Object.entries(tokens)) {
			if (!byToken.has(key)) {
				byToken.set(key, {
					type: token.type,
					values: {},
					descriptions: {},
					figmaIds: new Set(),
					scopes: new Set(),
					aliasOf: {},
				});
			}
			const entry = byToken.get(key);
			entry.values[effectiveMode] = token.value;
			if (token.description !== undefined) {
				entry.descriptions[effectiveMode] = token.description;
			}
			if (token.figmaId) entry.figmaIds.add(token.figmaId);
			if (token.scopes) token.scopes.forEach((s) => entry.scopes.add(s));
			if (token.aliasOf) entry.aliasOf[effectiveMode] = token.aliasOf;
		}
	}

	const tokens = {};
	for (const [key, entry] of byToken.entries()) {
		const descriptionValues = Object.values(entry.descriptions);
		const description = descriptionValues[0];
		const out = {
			type: entry.type,
			values: entry.values,
		};
		if (description !== undefined) out.description = description;
		if (entry.figmaIds.size > 0) [out.figmaId] = [...entry.figmaIds];
		if (entry.scopes.size > 0) out.scopes = [...entry.scopes];
		if (Object.keys(entry.aliasOf).length > 0) out.aliasOf = entry.aliasOf;
		tokens[key] = out;
	}

	return {
		collection: collection.slug,
		displayName: collection.name,
		source: {
			rawFiles: collection.modes.map((m) => m.fileName),
		},
		modes,
		tokens,
	};
}

function renderCatalog(docs) {
	const lines = ['# Kiva Design Tokens — Catalog', ''];
	lines.push(
		`Snapshot contains ${docs.length} collection${docs.length === 1 ? '' : 's'}. `
			+ 'Each section below summarizes a collection; load its JSON for detail.',
	);
	lines.push('');
	for (const doc of docs) {
		const tokenCount = Object.keys(doc.tokens).length;
		const modeLabel = doc.modes.length === 1 ? '1 mode' : `${doc.modes.length} modes (${doc.modes.join(', ')})`;
		lines.push(`## ${doc.displayName} — ${tokenCount} tokens, ${modeLabel}`);
		lines.push('');
		if (doc.purpose) {
			lines.push(doc.purpose);
			lines.push('');
		}
		if (doc.modeNote) {
			lines.push(`**Modes:** ${doc.modeNote}`);
			lines.push('');
		}
		if (doc.warnings && doc.warnings.length) {
			for (const w of doc.warnings) {
				lines.push(`> ⚠️ ${w}`);
			}
			lines.push('');
		}
		lines.push(`→ \`references/tokens/${doc.collection}.json\``);
		lines.push('');
	}
	return lines.join('\n');
}

async function loadCollectionNotes(notesPath) {
	try {
		const raw = await fs.readFile(notesPath, 'utf8');
		return JSON.parse(raw);
	} catch (err) {
		if (err.code === 'ENOENT') return {};
		throw err;
	}
}

function mergeNotes(doc, note) {
	if (!note) return doc;
	const out = { ...doc };
	if (note.purpose) out.purpose = note.purpose;
	if (note.modeNote) out.modeNote = note.modeNote;
	if (note.warnings) out.warnings = note.warnings;
	return out;
}

export async function run({
	rawDir, outTokensDir, outCatalogPath, notesPath,
}) {
	await fs.mkdir(outTokensDir, { recursive: true });
	const collections = await discoverCollections(rawDir);
	const notes = notesPath ? await loadCollectionNotes(notesPath) : {};
	const docs = [];
	for (const c of collections) {
		const rawDoc = await buildCollectionDoc(c);
		const doc = mergeNotes(rawDoc, notes[rawDoc.collection]);
		const outFile = path.join(outTokensDir, `${doc.collection}.json`);
		await fs.writeFile(outFile, `${JSON.stringify(doc, null, 2)}\n`);
		docs.push(doc);
	}
	await fs.writeFile(outCatalogPath, renderCatalog(docs));
	const { issues } = validate(docs);
	return {
		collections: docs.map((d) => ({
			slug: d.collection,
			displayName: d.displayName,
			modes: d.modes,
			tokenCount: Object.keys(d.tokens).length,
		})),
		issues,
	};
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const here = path.dirname(fileURLToPath(import.meta.url));
	const tokensRoot = path.resolve(here, '..', 'kiva-design-tokens', 'references');
	const rawDir = path.join(tokensRoot, 'raw');
	const outTokensDir = path.join(tokensRoot, 'tokens');
	const outCatalogPath = path.join(tokensRoot, 'catalog.md');
	const notesPath = path.join(here, 'collection-notes.json');
	run({
		rawDir, outTokensDir, outCatalogPath, notesPath,
	})
		.then((report) => {
			console.log('Coverage report:');
			for (const c of report.collections) {
				const modesLabel = `[${c.modes.join(', ')}]`;
				console.log(
					`  ${c.displayName}: ${c.tokenCount} tokens, ${c.modes.length} mode(s) ${modesLabel}`,
				);
			}
			console.log('');
			console.log(formatIssues(report.issues));
		})
		.catch((err) => {
			console.error('Normalizer failed:', err);
			process.exit(1);
		});
}
