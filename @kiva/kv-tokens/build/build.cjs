const fs = require('node:fs');
const primitives = require('../primitives.json');
const { generateExternalSVG } = require('../configs/kivaHeadingUnderline.cjs');
const { flattenJSON } = require('../configs/util.cjs');

// Note: dir is relative to the root of the kv-tokens package
const dir = '../../dist/kvui';

// Create dist folder
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true });
}

// Generate Heading Underline SVG
const svg = generateExternalSVG();
fs.writeFileSync(`${dir}/heading-underline.svg`, svg);

// Generate SCSS variables
const today = new Date().toUTCString();
const variables = flattenJSON(primitives);
const scss = Object.keys(variables)
	.map((key) => `$${key.toLowerCase().replace('.', '-')}: ${variables[key]};`)
	.join('\n');
const withComment = `// Do not edit directly.\n// Generated on ${today}. \n\n${scss}\n`;
fs.writeFileSync(`${dir}/tw-exported-vars.scss`, withComment);
