import fs from 'node:fs/promises';
import path from 'node:path';

// Copy flag icons to the Vue component directory
async function copyFlags() {
	const flagIconPath = import.meta.resolve('flag-icons/flags');
	const src = flagIconPath.replace('file://', '');
	const dest = path.resolve(import.meta.dirname, '../src/vue/flags');
	await fs.cp(src, dest, { recursive: true });
}
copyFlags();
