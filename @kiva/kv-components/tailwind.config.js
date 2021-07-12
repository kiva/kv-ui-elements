const resolveConfig = require('tailwindcss/resolveConfig'); // eslint-disable-line import/no-extraneous-dependencies
const sharedConfig = require('@kiva/kv-tokens/configs/tailwind.config');
const { textStyles } = require('@kiva/kv-tokens/configs/kivaTypography');
const { headerNumberCase, kebabCase, buildTailwindClassName } = require('./utils/themeUtils');

const config = resolveConfig(sharedConfig);
const { theme } = config;
const themePrefix = config.prefix;

function buildValuesFromThemeObj(initialObj) {
	const arr = [];
	const iterate = (obj, prefix = '') => {
		Object.keys(obj).forEach((key) => {
			if (typeof obj[key] === 'object') {
				iterate(obj[key], key);
			} else {
				const niceKey = prefix ? `${prefix}-${key}` : key;
				arr.push(niceKey);
			}
		});
	};
	iterate(initialObj);
	return arr;
}

// Safelist classes used on our Styleguide Primitives story since it gets
// generated dynamically and JIT purge won't see those class names.
const colors = buildValuesFromThemeObj(theme.colors);
const space = buildValuesFromThemeObj(theme.spacing);
const kivaTypography = Object.keys(textStyles).map((key) => headerNumberCase(kebabCase(key)).replace('text-', ''));
const fontWeight = buildValuesFromThemeObj(theme.fontWeight);
const radii = buildValuesFromThemeObj(theme.borderRadius);
const opacity = buildValuesFromThemeObj(theme.opacity);
const zIndices = buildValuesFromThemeObj(theme.zIndex);

const safelist = [
	...colors.map((color) => buildTailwindClassName(`${themePrefix}bg`, color)),
	...space.map((spaceVal) => buildTailwindClassName(`${themePrefix}w`, spaceVal)),
	...kivaTypography.map((type) => buildTailwindClassName(`${themePrefix}text`, type)),
	...fontWeight.map((weight) => buildTailwindClassName(`${themePrefix}font`, weight)),
	...radii.map((radius) => buildTailwindClassName(`${themePrefix}radius`, radius)),
	...opacity.map((opacityVal) => buildTailwindClassName(`${themePrefix}opacity`, opacityVal)),
	...zIndices.map((zIndex) => buildTailwindClassName(`${themePrefix}z`, zIndex)),
];

module.exports = {
	mode: 'jit',
	presets: [sharedConfig],
	purge: {
		content: [
			'./vue/**/*.vue',
			'./vue/stories/**/*.stories.js',
			'./utils/**/*.js',
		],
		safelist,
	},
};
