const headerNumberCase = (str) => str
	.replace('h-1', 'h1')
	.replace('h-2', 'h2')
	.replace('h-3', 'h3')
	.replace('h-4', 'h4')
	.replace('h-5', 'h5');

const buildTailwindClassName = (prefix, value) => {
	let name = `${prefix}-${value}`;
	name = name.replace('-DEFAULT', '');
	return name;
};

const kebabCase = (str) => str.split('').map((letter, idx) => (letter.toUpperCase() === letter
	? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
	: letter)).join('');

const removeObjectProperty = (object, key) => {
	const ret = { ...object };
	delete ret[key];
	return ret;
};

function hexToRGB(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	const replacedHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(replacedHex);
	return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

module.exports = {
	buildTailwindClassName,
	headerNumberCase,
	kebabCase,
	removeObjectProperty,
	hexToRGB,
};
