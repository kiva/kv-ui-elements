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

const hexToRGB = (hex) => {
	let r = 0;
	let g = 0;
	let	b = 0;

	if (hex.length === 4) { // 3 digits
		r = `0x${hex[1]}${hex[1]}`;
		g = `0x${hex[2]}${hex[2]}`;
		b = `0x${hex[3]}${hex[3]}`;
	} else if (hex.length === 7) { // 6 digits
		r = `0x${hex[1]}${hex[2]}`;
		g = `0x${hex[3]}${hex[4]}`;
		b = `0x${hex[5]}${hex[6]}`;
	}
	return { r, g, b };
};

module.exports = {
	buildTailwindClassName,
	headerNumberCase,
	kebabCase,
	removeObjectProperty,
	hexToRGB,
};
