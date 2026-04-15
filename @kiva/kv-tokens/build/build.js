import fs from 'node:fs';
import { generateExternalSVG } from '../configs/kivaHeadingUnderline.js';

// Note: dir is relative to the root of the kv-tokens package
const dir = '../../dist/kvui';

// Create dist folder
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true });
}

// Copy fonts to dist folder
const fontsDir = './assets/fonts';
const fontFiles = fs.readdirSync(fontsDir).filter((file) => file.endsWith('.woff2'));
fontFiles.forEach((file) => {
	const srcPath = `${fontsDir}/${file}`;
	const destPath = `${dir}/${file}`;
	fs.copyFileSync(srcPath, destPath);
});

// Generate Heading Underline SVG
const svg = generateExternalSVG();
fs.writeFileSync(`${dir}/heading-underline.svg`, svg);
