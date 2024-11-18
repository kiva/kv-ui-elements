const fs = require('node:fs');
const { generateExternalSVG } = require('../configs/kivaHeadingUnderline.cjs');

// Note: dir is relative to the root of the kv-tokens package
const dir = '../../dist/kvui';

// Create dist folder
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true });
}

// Generate Heading Underline SVG
const svg = generateExternalSVG();
fs.writeFileSync(`${dir}/heading-underline.svg`, svg);
