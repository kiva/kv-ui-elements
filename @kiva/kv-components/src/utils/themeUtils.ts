export const headerNumberCase = (str: string) => str
	.replace('h-1', 'h1')
	.replace('h-2', 'h2')
	.replace('h-3', 'h3')
	.replace('h-4', 'h4')
	.replace('h-5', 'h5');

export const buildTailwindClassName = (prefix: string, value: string) => {
	let name = `${prefix}-${value}`;
	name = name.replace('-DEFAULT', '');
	return name;
};

export const kebabCase = (str: string) => str.split('').map((letter, idx) => (letter.toUpperCase() === letter
	? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
	: letter)).join('');

export const removeObjectProperty = (object: Object, key: string) => {
	const ret = { ...object };
	delete ret[key];
	return ret;
};
