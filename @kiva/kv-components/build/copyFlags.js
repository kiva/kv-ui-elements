import fs from 'node:fs/promises';
import path from 'node:path';

// Copy flag icons to the Vue component
async function copyFlags() {
	const flagIconPath = import.meta.resolve('flag-icons/flags');
	const src = flagIconPath.replace('file://', '');
	const dest = path.resolve(import.meta.dirname, '../vue/KvFlag/flags');
	await fs.cp(src, dest, { recursive: true });
}
copyFlags();
