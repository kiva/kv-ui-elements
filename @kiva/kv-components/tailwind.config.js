const resolveConfig = require('tailwindcss/resolveConfig'); // eslint-disable-line import/no-extraneous-dependencies
/* eslint-disable-next-line */
const plugin = require('tailwindcss/plugin'); // TODO
const { textStyles } = require('../kv-tokens/configs/kivaTypography'); // TODO no
const sharedConfig = require('../kv-tokens/configs/tailwind.config'); // TODO: no
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

// function to allow background opacity and text opacity with tailwind colors
const withOpacity = (variableName) => ({ opacityValue }) => {
	if (opacityValue !== undefined) {
		return `rgba(var(${variableName}), ${opacityValue})`;
	}
	return `rgb(var(${variableName}))`;
};

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
	theme: { // TODO: MOVE ALL OF THIS INTO TOKENS CONFIG
		extend: {
			typography: kivaTypography.proseOverrides, // prose plugin overrides
			textColor: {
				'color-primary': withOpacity('--text-color-primary'),
				'color-primary-inverse': withOpacity('--text-color-primary-inverse'),
				'color-secondary': withOpacity('--text-color-secondary'),
				'color-tertiary': withOpacity('--text-color-tertiary'),
				'color-action': withOpacity('--text-color-action'),
				'color-action-highlight': withOpacity('--text-color-action-highlight'),
				'color-danger': withOpacity('--text-color-danger'),
				'color-danger-highlight': withOpacity('--text-color-danger-highlight'),
			},
			backgroundColor: {
				primary: withOpacity('--bg-primary'),
				'primary-inverse': withOpacity('--bg-primary-inverse'),
				secondary: withOpacity('--bg-secondary'),
				action: withOpacity('--bg-action'),
				'action-highlight': withOpacity('--bg-action-highlight'),
				danger: withOpacity('--bg-danger'),
				'danger-highlight': withOpacity('--bg-danger-highlight'),
				caution: withOpacity('--bg-caution'),
			},
		},
	},
	plugins: [ // MOVE ALL OF THIS INTO TOKENS CONFIG AND BUMP IT
		plugin(({ addBase, addUtilities }) => {
			addBase({
				':root': {
					'--text-color-primary': hexToRGB(defaultTheme.text.primary),
					'--text-color-primary-inverse': hexToRGB(defaultTheme.text['primary-inverse']), // Q: maybe  just 'color-inverse'?
					'--text-color-secondary': hexToRGB(defaultTheme.text.secondary),
					'--text-color-tertiary': hexToRGB(defaultTheme.text.tertiary),
					'--text-color-action': hexToRGB(defaultTheme.text.action),
					'--text-color-action-highlight': hexToRGB(defaultTheme.text['action-highlight']),
					'--text-color-danger': hexToRGB(defaultTheme.text.danger),
					'--text-color-danger-highlight': hexToRGB(defaultTheme.text['danger-highlight']),
					'--bg-primary': hexToRGB(defaultTheme.background.primary),
					'--bg-primary-inverse': hexToRGB(defaultTheme.background['primary-inverse']), // Q: maybe just 'color-inverse'?
					'--bg-secondary': hexToRGB(defaultTheme.background.secondary),
					'--bg-action': hexToRGB(defaultTheme.background.action),
					'--bg-action-highlight': hexToRGB(defaultTheme.background['action-highlight']),
					'--bg-danger': hexToRGB(defaultTheme.background.danger),
					'--bg-danger-highlight': hexToRGB(defaultTheme.background['danger-highlight']),
					'--bg-caution': hexToRGB(defaultTheme.background.caution),
				},
				body: {
					color: 'rgb(var(--text-color-primary))',
				},
			});
			addUtilities({
				'.theme-dark': {
					'--text-color-primary': hexToRGB(darkTheme.text.primary),
					'--text-color-primary-inverse': hexToRGB(darkTheme.text['primary-inverse']), // Q: maybe just 'color-inverse' ?
					'--text-color-secondary': hexToRGB(darkTheme.text.secondary),
					'--text-color-tertiary': hexToRGB(darkTheme.text.tertiary),
					'--text-color-action': hexToRGB(darkTheme.text.action),
					'--text-color-action-highlight': hexToRGB(darkTheme.text['action-highlight']),
					'--text-color-danger': hexToRGB(darkTheme.text.danger),
					'--text-color-danger-highlight': hexToRGB(darkTheme.text['danger-highlight']),
					'--bg-primary': hexToRGB(darkTheme.background.primary),
					'--bg-primary-inverse': hexToRGB(darkTheme.background['primary-inverse']), // Q: maybe just 'color-inverse' ?
					'--bg-secondary': hexToRGB(darkTheme.background.secondary),
					'--bg-action': hexToRGB(darkTheme.background.action),
					'--bg-action-highlight': hexToRGB(darkTheme.background['action-highlight']),
					'--bg-danger': hexToRGB(darkTheme.background.danger),
					'--bg-danger-highlight': hexToRGB(darkTheme.background['danger-highlight']),
					'--bg-caution': hexToRGB(darkTheme.background.caution),
					color: 'rgb(var(--text-color-primary))',
				},
			});
		}),
	],
};
