const resolveConfig = require('tailwindcss/resolveConfig'); // eslint-disable-line import/no-extraneous-dependencies
const { textStyles } = require('@kiva/kv-tokens/configs/kivaTypography.cjs');
const sharedConfig = require('@kiva/kv-tokens/configs/tailwind.config.cjs');
const {
	headerNumberCase, kebabCase, buildTailwindClassName,
} = require('./utils/themeUtils.cjs');

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
// generated dynamically and Tailwind won't see those class names in any files otherwise.
const backgroundColor = buildValuesFromThemeObj(theme.backgroundColor);
const borderColor = buildValuesFromThemeObj(theme.borderColor);
const ringColor = buildValuesFromThemeObj(theme.ringColor);
const textColor = buildValuesFromThemeObj(theme.textColor);
const space = buildValuesFromThemeObj(theme.spacing);
const kivaTypography = Object.keys(textStyles).map((key) => headerNumberCase(kebabCase(key)).replace('text-', ''));
const fontWeight = buildValuesFromThemeObj(theme.fontWeight);
const radii = buildValuesFromThemeObj(theme.borderRadius);
const opacity = buildValuesFromThemeObj(theme.opacity);
const zIndices = buildValuesFromThemeObj(theme.zIndex);
const boxShadows = buildValuesFromThemeObj(theme.boxShadow);

const safelist = [
	...backgroundColor.map((color) => buildTailwindClassName(`${themePrefix}bg`, color)),
	...borderColor.map((color) => buildTailwindClassName(`${themePrefix}border`, color)),
	...ringColor.map((color) => buildTailwindClassName(`${themePrefix}ring`, color)),
	...textColor.map((color) => buildTailwindClassName(`${themePrefix}text`, color)),
	...space.map((spaceVal) => buildTailwindClassName(`${themePrefix}w`, spaceVal)),
	...kivaTypography.map((type) => buildTailwindClassName(`${themePrefix}text`, type)),
	...fontWeight.map((weight) => buildTailwindClassName(`${themePrefix}font`, weight)),
	...radii.map((radius) => buildTailwindClassName(`${themePrefix}radius`, radius)),
	...opacity.map((opacityVal) => buildTailwindClassName(`${themePrefix}opacity`, opacityVal)),
	...zIndices.map((zIndex) => buildTailwindClassName(`${themePrefix}z`, zIndex)),
	...boxShadows.map((boxShadow) => buildTailwindClassName(`${themePrefix}shadow`, boxShadow)),
];

module.exports = {
	presets: [sharedConfig],
	content: [
		'./vue/**/*.vue',
		'./vue/stories/**/*.stories.js',
		'./utils/**/*.js',
	],
	safelist,
};
