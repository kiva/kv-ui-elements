const designtokens = require('../primitives.json');

const defaultTheme = designtokens.colors.theme.DEFAULT;
const darkTheme = designtokens.colors.theme.dark;
const { hexToRGB } = require('../../kv-components/utils/themeUtils'); // TODO

// function to allow background opacity and text opacity with tailwind colors
const withOpacity = (variableName) => ({ opacityValue }) => {
	if (opacityValue !== undefined) {
		return `rgba(var(${variableName}), ${opacityValue})`;
	}
	return `rgb(var(${variableName}))`;
};

// a set of CSS custom properties
const kivaThemes = {
	static: {
		'--text-color-black': hexToRGB(designtokens.colors.black),
		'--text-color-white': hexToRGB(designtokens.colors.white),
		'--bg-black': hexToRGB(designtokens.colors.black),
		'--bg-white': hexToRGB(designtokens.colors.white),
		'--border-color-black': hexToRGB(designtokens.colors.black),
		'--border-color-white': hexToRGB(designtokens.colors.white),
	},
	default: {
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
		'--bg-tertiary': hexToRGB(defaultTheme.background.tertiary),
		'--bg-action': hexToRGB(defaultTheme.background.action),
		'--bg-action-highlight': hexToRGB(defaultTheme.background['action-highlight']),
		'--bg-danger': hexToRGB(defaultTheme.background.danger),
		'--bg-danger-highlight': hexToRGB(defaultTheme.background['danger-highlight']),
		'--bg-caution': hexToRGB(defaultTheme.background.caution),

		'--border-color-primary': hexToRGB(defaultTheme.border.primary),
		'--border-color-primary-inverse': hexToRGB(defaultTheme.border['primary-inverse']), // Q: maybe  just 'color-inverse'?
		'--border-color-secondary': hexToRGB(defaultTheme.border.secondary),
		'--border-color-tertiary': hexToRGB(defaultTheme.border.tertiary),
		'--border-color-action': hexToRGB(defaultTheme.border.action),
		'--border-color-action-highlight': hexToRGB(defaultTheme.border['action-highlight']),
		'--border-color-danger': hexToRGB(defaultTheme.border.danger),
		'--border-color-danger-highlight': hexToRGB(defaultTheme.border['danger-highlight']),
	},
	dark: {
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
		'--bg-tertiary': hexToRGB(darkTheme.background.tertiary),
		'--bg-action': hexToRGB(darkTheme.background.action),
		'--bg-action-highlight': hexToRGB(darkTheme.background['action-highlight']),
		'--bg-danger': hexToRGB(darkTheme.background.danger),
		'--bg-danger-highlight': hexToRGB(darkTheme.background['danger-highlight']),
		'--bg-caution': hexToRGB(darkTheme.background.caution),

		'--border-color-primary': hexToRGB(darkTheme.border.primary),
		'--border-color-primary-inverse': hexToRGB(darkTheme.border['primary-inverse']), // Q: maybe  just 'color-inverse'?
		'--border-color-secondary': hexToRGB(darkTheme.border.secondary),
		'--border-color-tertiary': hexToRGB(darkTheme.border.tertiary),
		'--border-color-action': hexToRGB(darkTheme.border.action),
		'--border-color-action-highlight': hexToRGB(darkTheme.border['action-highlight']),
		'--border-color-danger': hexToRGB(darkTheme.border.danger),
		'--border-color-danger-highlight': hexToRGB(darkTheme.border['danger-highlight']),
	},
};

// tailwind specific properties that reference the css custom properties in kivaThemes
const tailwindProperties = {
	textColor: {
		'color-transparent': 'transparent',
		'color-current': 'currentColor',
		'color-black': withOpacity('--text-color-black'),
		'color-white': withOpacity('--text-color-white'),
		'color-brand': withOpacity('--text-color-brand'),
		// themable
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
		transparent: 'transparent',
		current: 'currentColor',
		black: withOpacity('--bg-black'),
		white: withOpacity('--bg-white'),
		brand: withOpacity('--bg-brand'),
		primary: withOpacity('--bg-primary'),
		'primary-inverse': withOpacity('--bg-primary-inverse'),
		secondary: withOpacity('--bg-secondary'),
		tertiary: withOpacity('--bg-tertiary'),
		action: withOpacity('--bg-action'),
		'action-highlight': withOpacity('--bg-action-highlight'),
		danger: withOpacity('--bg-danger'),
		'danger-highlight': withOpacity('--bg-danger-highlight'),
		caution: withOpacity('--bg-caution'),
	},
	borderColor: {
		'color-transparent': 'transparent',
		'color-current': 'currentColor',
		'color-black': withOpacity('--border-color-black'),
		'color-white': withOpacity('--border-color-white'),
		'color-brand': withOpacity('--border-color-brand'),
		// themable
		'color-primary': withOpacity('--border-color-primary'),
		'color-primary-inverse': withOpacity('--border-color-primary-inverse'),
		'color-secondary': withOpacity('--border-color-secondary'),
		'color-tertiary': withOpacity('--border-color-tertiary'),
		'color-action': withOpacity('--border-color-action'),
		'color-action-highlight': withOpacity('--border-color-action-highlight'),
		'color-danger': withOpacity('--border-color-danger'),
		'color-danger-highlight': withOpacity('--border-color-danger-highlight'),
	},
};

module.exports = {
	kivaThemes,
	tailwindProperties,
};
