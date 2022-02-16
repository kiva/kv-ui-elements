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

module.exports = {
	buildTailwindClassName,
	headerNumberCase,
	kebabCase,
	removeObjectProperty,
};
