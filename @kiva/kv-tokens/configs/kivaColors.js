const { hexToRGB } = require('./util');
const designtokens = require('../primitives.json');

const defaultTheme = designtokens.colors.theme.DEFAULT;
const darkTheme = designtokens.colors.theme.dark;

/**
 * An object containg CSS custom properties.
 * These properties can be set on the :root,
 * or inside a class like .theme-dark { ...customProperties }
 * within the tailwind.config file.
 */
const kivaThemes = {
	static: {
		'--text-black': hexToRGB(designtokens.colors.black),
		'--text-white': hexToRGB(designtokens.colors.white),
		'--text-brand': hexToRGB(designtokens.colors.brand.DEFAULT),

		'--bg-black': hexToRGB(designtokens.colors.black),
		'--bg-white': hexToRGB(designtokens.colors.white),
		'--bg-brand': hexToRGB(designtokens.colors.brand.DEFAULT),

		'--border-black': hexToRGB(designtokens.colors.black),
		'--border-white': hexToRGB(designtokens.colors.white),
		'--border-brand': hexToRGB(designtokens.colors.brand.DEFAULT),
	},
	default: {
		'--text-primary': hexToRGB(defaultTheme.text.primary),
		'--text-primary-inverse': hexToRGB(defaultTheme.text['primary-inverse']),
		'--text-secondary': hexToRGB(defaultTheme.text.secondary),
		'--text-tertiary': hexToRGB(defaultTheme.text.tertiary),
		'--text-accent': hexToRGB(defaultTheme.text.accent),
		'--text-action': hexToRGB(defaultTheme.text.action),
		'--text-action-highlight': hexToRGB(defaultTheme.text['action-highlight']),
		'--text-danger': hexToRGB(defaultTheme.text.danger),
		'--text-danger-highlight': hexToRGB(defaultTheme.text['danger-highlight']),

		'--bg-primary': hexToRGB(defaultTheme.background.primary),
		'--bg-primary-inverse': hexToRGB(defaultTheme.background['primary-inverse']),
		'--bg-secondary': hexToRGB(defaultTheme.background.secondary),
		'--bg-tertiary': hexToRGB(defaultTheme.background.tertiary),
		'--bg-accent': hexToRGB(defaultTheme.background.accent),
		'--bg-action': hexToRGB(defaultTheme.background.action),
		'--bg-action-highlight': hexToRGB(defaultTheme.background['action-highlight']),
		'--bg-danger': hexToRGB(defaultTheme.background.danger),
		'--bg-danger-highlight': hexToRGB(defaultTheme.background['danger-highlight']),
		'--bg-caution': hexToRGB(defaultTheme.background.caution),

		'--border-primary': hexToRGB(defaultTheme.border.primary),
		'--border-primary-inverse': hexToRGB(defaultTheme.border['primary-inverse']),
		'--border-secondary': hexToRGB(defaultTheme.border.secondary),
		'--border-tertiary': hexToRGB(defaultTheme.border.tertiary),
		'--border-accent': hexToRGB(defaultTheme.border.accent),
		'--border-action': hexToRGB(defaultTheme.border.action),
		'--border-action-highlight': hexToRGB(defaultTheme.border['action-highlight']),
		'--border-danger': hexToRGB(defaultTheme.border.danger),
		'--border-danger-highlight': hexToRGB(defaultTheme.border['danger-highlight']),
	},
	dark: {
		'--text-primary': hexToRGB(darkTheme.text.primary),
		'--text-primary-inverse': hexToRGB(darkTheme.text['primary-inverse']),
		'--text-secondary': hexToRGB(darkTheme.text.secondary),
		'--text-tertiary': hexToRGB(darkTheme.text.tertiary),
		'--text-accent': hexToRGB(darkTheme.text.accent),
		'--text-action': hexToRGB(darkTheme.text.action),
		'--text-action-highlight': hexToRGB(darkTheme.text['action-highlight']),
		'--text-danger': hexToRGB(darkTheme.text.danger),
		'--text-danger-highlight': hexToRGB(darkTheme.text['danger-highlight']),

		'--bg-primary': hexToRGB(darkTheme.background.primary),
		'--bg-primary-inverse': hexToRGB(darkTheme.background['primary-inverse']),
		'--bg-secondary': hexToRGB(darkTheme.background.secondary),
		'--bg-tertiary': hexToRGB(darkTheme.background.tertiary),
		'--bg-accent': hexToRGB(darkTheme.background.accent),
		'--bg-action': hexToRGB(darkTheme.background.action),
		'--bg-action-highlight': hexToRGB(darkTheme.background['action-highlight']),
		'--bg-danger': hexToRGB(darkTheme.background.danger),
		'--bg-danger-highlight': hexToRGB(darkTheme.background['danger-highlight']),
		'--bg-caution': hexToRGB(darkTheme.background.caution),

		'--border-primary': hexToRGB(darkTheme.border.primary),
		'--border-primary-inverse': hexToRGB(darkTheme.border['primary-inverse']),
		'--border-secondary': hexToRGB(darkTheme.border.secondary),
		'--border-tertiary': hexToRGB(darkTheme.border.tertiary),
		'--border-accent': hexToRGB(darkTheme.border.accent),
		'--border-action': hexToRGB(darkTheme.border.action),
		'--border-action-highlight': hexToRGB(darkTheme.border['action-highlight']),
		'--border-danger': hexToRGB(darkTheme.border.danger),
		'--border-danger-highlight': hexToRGB(darkTheme.border['danger-highlight']),
	},
};

// function to allow background opacity and text opacity with tailwind colors
// https://www.youtube.com/watch?v=MAtaT8BZEAo
const withOpacity = (variableName) => ({ opacityValue }) => {
	if (opacityValue !== undefined) {
		return `rgba(var(${variableName}), ${opacityValue})`;
	}
	return `rgb(var(${variableName}))`;
};

/**
 * These are used to set Tailwind config properties so you can write classes like
 * tw-text-primary, tw-border-primary, etc.
 * The values (e.g., --text-primary) need to match the keys in the kivaThemes object above.
 */
const tailwindProperties = {
	textColor: {
		// static
		transparent: 'transparent',
		current: 'currentColor',
		black: withOpacity('--text-black'),
		white: withOpacity('--text-white'),
		brand: withOpacity('--text-brand'),

		// themable
		primary: withOpacity('--text-primary'),
		'primary-inverse': withOpacity('--text-primary-inverse'),
		secondary: withOpacity('--text-secondary'),
		tertiary: withOpacity('--text-tertiary'),
		accent: withOpacity('--text-accent'),
		action: withOpacity('--text-action'),
		'action-highlight': withOpacity('--text-action-highlight'),
		danger: withOpacity('--text-danger'),
		'danger-highlight': withOpacity('--text-danger-highlight'),
	},
	backgroundColor: {
		// static
		transparent: 'transparent',
		current: 'currentColor',
		black: withOpacity('--bg-black'),
		white: withOpacity('--bg-white'),

		// themable
		brand: withOpacity('--bg-brand'),
		primary: withOpacity('--bg-primary'),
		'primary-inverse': withOpacity('--bg-primary-inverse'),
		secondary: withOpacity('--bg-secondary'),
		tertiary: withOpacity('--bg-tertiary'),
		accent: withOpacity('--bg-accent'),
		action: withOpacity('--bg-action'),
		'action-highlight': withOpacity('--bg-action-highlight'),
		danger: withOpacity('--bg-danger'),
		'danger-highlight': withOpacity('--bg-danger-highlight'),
		caution: withOpacity('--bg-caution'),
	},
	borderColor: {
		// static
		transparent: 'transparent',
		current: 'currentColor',
		black: withOpacity('--border-black'),
		white: withOpacity('--border-white'),
		brand: withOpacity('--border-brand'),

		// themable
		primary: withOpacity('--border-primary'),
		'primary-inverse': withOpacity('--border-primary-inverse'),
		secondary: withOpacity('--border-secondary'),
		tertiary: withOpacity('--border-tertiary'),
		accent: withOpacity('--border-accent'),
		action: withOpacity('--border-action'),
		'action-highlight': withOpacity('--border-action-highlight'),
		danger: withOpacity('--border-danger'),
		'danger-highlight': withOpacity('--border-danger-highlight'),
	},
};

module.exports = {
	kivaThemes,
	tailwindProperties,
};
