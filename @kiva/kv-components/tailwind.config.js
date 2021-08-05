const resolveConfig = require('tailwindcss/resolveConfig'); // eslint-disable-line import/no-extraneous-dependencies
const sharedConfig = require('@kiva/kv-tokens/configs/tailwind.config');
const { textStyles } = require('@kiva/kv-tokens/configs/kivaTypography');
/* eslint-disable-next-line */
const plugin = require('tailwindcss/plugin'); // TODO
const {
	headerNumberCase, kebabCase, buildTailwindClassName, hexToRGB,
} = require('./utils/themeUtils');

const tokens = require('../kv-tokens/primitives.json');

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

const defaultTheme = tokens.colors.theme.DEFAULT;
const darkTheme = tokens.colors.theme.dark;
function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`;
		}
		return `rgb(var(${variableName}), ${opacityValue})`;
	};
}

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
	theme: { // MOVE ALL OF THIS INTO TOKENS CONFIG AND BUMP IT
		extend: {
			typography: kivaTypography.proseOverrides, // prose plugin overrides
			textColor: {
				'color-primary': withOpacity('--text-color-primary'),
				'color-secondary': withOpacity('--text-color-secondary'),
				'color-action': withOpacity('--text-color-action'),
				'action-hover': withOpacity('--text-color-action-hover'),
			},
			backgroundColor: {
				primary: defaultTheme.background.primary,
				secondary: defaultTheme.background.primary,
			},
		},
	},
	plugins: [ // MOVE ALL OF THIS INTO TOKENS CONFIG AND BUMP IT
		plugin(({ addBase, addUtilities }) => {
			addBase({
				':root': {
					'--text-color-primary': hexToRGB(defaultTheme.text.primary),
					'--text-color-secondary': hexToRGB(defaultTheme.text.secondary),
					'--text-color-action': hexToRGB(defaultTheme.text.action),
					'--text-color-action-hover': hexToRGB(defaultTheme.text['action-hover']),
				},
				body: {
					color: withOpacity('--text-color-primary'),
				},
			});
			addUtilities({
				'.theme-dark': {
					'--text-color-primary': hexToRGB(darkTheme.text.primary),
					'--text-color-secondary': hexToRGB(darkTheme.text.secondary),
					'--text-color-action': hexToRGB(darkTheme.text.action),
					'--text-color-action-hover': hexToRGB(darkTheme.text['action-hover']),
					color: 'var(--text-color-primary)',
				},
			});
		}),
	],
};
