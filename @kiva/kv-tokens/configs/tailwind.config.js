const plugin = require('tailwindcss/plugin');
const typographyPlugin = require('@tailwindcss/typography');
const kivaTypography = require('./kivaTypography');
const designtokens = require('../primitives.json');
const { rem } = require('./util');
const { hexToRGB } = require('../../kv-components/utils/themeUtils'); // TODO

const {
	fonts,
	fontWeights,
	borderWidths,
	breakpoints,
	colors,
	opacity,
	space,
	radii,
	zIndices,
} = designtokens;

const defaultTheme = designtokens.colors.theme.DEFAULT;
const darkTheme = designtokens.colors.theme.dark;

// function to allow background opacity and text opacity with tailwind colors
const withOpacity = (variableName) => ({ opacityValue }) => {
	if (opacityValue !== undefined) {
		return `rgba(var(${variableName}), ${opacityValue})`;
	}
	return `rgb(var(${variableName}))`;
};

const textColor = {
	'color-black': withOpacity('--text-color-black'),
	'color-white': withOpacity('--text-color-white'),
	'color-primary': withOpacity('--text-color-primary'),
	'color-primary-inverse': withOpacity('--text-color-primary-inverse'),
	'color-secondary': withOpacity('--text-color-secondary'),
	'color-tertiary': withOpacity('--text-color-tertiary'),
	'color-action': withOpacity('--text-color-action'),
	'color-action-highlight': withOpacity('--text-color-action-highlight'),
	'color-danger': withOpacity('--text-color-danger'),
	'color-danger-highlight': withOpacity('--text-color-danger-highlight'),
};

const backgroundColor = {
	black: withOpacity('--bg-black'),
	white: withOpacity('--bg-white'),
	primary: withOpacity('--bg-primary'),
	'primary-inverse': withOpacity('--bg-primary-inverse'),
	secondary: withOpacity('--bg-secondary'),
	tertiary: withOpacity('--bg-tertiary'),
	action: withOpacity('--bg-action'),
	'action-highlight': withOpacity('--bg-action-highlight'),
	danger: withOpacity('--bg-danger'),
	'danger-highlight': withOpacity('--bg-danger-highlight'),
	caution: withOpacity('--bg-caution'),
};

const borderColor = {
	'color-black': withOpacity('--border-color-black'),
	'color-white': withOpacity('--border-color-white'),
	'color-primary': withOpacity('--border-color-primary'),
	'color-primary-inverse': withOpacity('--border-color-primary-inverse'),
	'color-secondary': withOpacity('--border-color-secondary'),
	'color-tertiary': withOpacity('--border-color-tertiary'),
	'color-action': withOpacity('--border-color-action'),
	'color-action-highlight': withOpacity('--border-color-action-highlight'),
	'color-danger': withOpacity('--border-color-danger'),
	'color-danger-highlight': withOpacity('--border-color-danger-highlight'),
};

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	prefix: 'tw-', // prefixes all tailwinds classes with tw. e.g., 'tw-flex tw-mb-2'
	corePlugins: {
		boxShadow: false,
		container: false,
		fontSize: false,
		letterSpacing: false,
		lineHeight: false,
	},
	theme: {
		screens: {
			md: rem(breakpoints.md),
			lg: rem(breakpoints.lg),
			xl: rem(breakpoints.xl),
			print: { raw: 'print' }, // https://tailwindcss.com/docs/breakpoints#styling-for-print
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: {
				800: colors.gray['800'],
				500: colors.gray['500'],
				300: colors.gray['300'],
				100: colors.gray['100'],
				50: colors.gray['50'],
			},
			brand: {
				700: colors.brand['700'],
				650: colors.brand['650'],
				DEFAULT: colors.brand.DEFAULT,
				550: colors.brand['550'],
				500: colors.brand['500'],
				400: colors.brand['400'],
				300: colors.brand['300'],
				200: colors.brand['200'],
				100: colors.brand['100'],
				50: colors.brand['50'],
			},

			// action: {
			// 	700: colors.action['700'],
			// 	DEFAULT: colors.action.DEFAULT,
			// },
			// caution: {
			// 	DEFAULT: colors.caution.DEFAULT,
			// },
			// danger: {
			// 	700: colors.danger['700'],
			// 	DEFAULT: colors.danger.DEFAULT,
			// },
		},
		spacing: {
			0: '0',
			0.5: rem(space['0.5']),
			1: rem(space['1']),
			1.5: rem(space['1.5']),
			2: rem(space['2']),
			2.5: rem(space['2.5']),
			3: rem(space['3']),
			3.5: rem(space['3.5']),
			4: rem(space['4']),
			4.5: rem(space['4.5']),
			5: rem(space['5']),
			6: rem(space['6']),
			7: rem(space['7']),
			8: rem(space['8']),
			9: rem(space['9']),
			10: rem(space['10']),
			11: rem(space['11']),
			12: rem(space['12']),
			13: rem(space['13']),
			14: rem(space['14']),
			15: rem(space['15']),
			16: rem(space['16']),
		},
		fontFamily: {
			sans: [`${fonts.sans}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`],
		},
		fontWeight: {
			book: `${fontWeights.book}`,
			medium: `${fontWeights.medium}`,
		},
		borderWidth: {
			DEFAULT: rem(borderWidths.default),
			0: '0px',
			// 2: '2px',
			// 4: '4px',
			// 8: '8px',
		},
		borderRadius: {
			none: '0px',
			sm: rem(radii.sm),
			DEFAULT: rem(radii.default),
			// md: '0.375rem',
			// lg: '0.5rem',
			// xl: '0.75rem',
			// '2xl': '1rem',
			// '3xl': '1.5rem',
			full: '500rem',
		},
		opacity: {
			0: '0',
			low: `${opacity.low}`,
			full: '1',
		},
		zIndex: {
			hide: zIndices.hide,
			auto: 'auto',
			base: zIndices.base,
			1: zIndices['1'],
			2: zIndices['2'],
			3: zIndices['3'],
			4: zIndices['4'],
			5: zIndices['5'],
			docked: zIndices.docked,
			dropdown: zIndices.dropdown,
			sticky: zIndices.sticky,
			banner: zIndices.banner,
			overlay: zIndices.overlay,
			modal: zIndices.modal,
			popover: zIndices.popover,
			skipLink: zIndices.skipLink,
			toast: zIndices.toast,
			tooltip: zIndices.tooltip,
			troposphere: zIndices.troposphere,
			stratosphere: zIndices.stratosphere,
		},
		extend: {
			typography: kivaTypography.proseOverrides, // prose plugin overrides
			height: {
				40: rem(320),
				57.5: rem(460),
			},
			minHeight: (theme) => ({
				...theme('spacing'),
				'half-screen': '50vh',
			}),
			minWidth: (theme) => ({
				...theme('spacing'),
				'1/2': '50%',
			}),
			keyframes: {
				ripple: {
					'0%': {
						transform: 'translateX(-50%) translateY(-50%) scale(1)',
						opacity: 0.3,
					},
					'100%': {
						transform: 'translateX(-50%) translateY(-50%) scale(15)',
						opacity: 0,
					},
				},
			},
			animation: {
				ripple: 'ripple 750ms ease-out 1 forwards',
				'spin-eased': 'spin 1.5s ease-in-out infinite',
			},
			// theming
			textColor,
			backgroundColor,
			borderColor,
			divideColor: borderColor,
			ringColor: borderColor,
			// end theming
		},
	},
	plugins: [
		typographyPlugin, // prose plugin. See overrides in theme.extend.typography
		plugin(({ addBase, addUtilities }) => {
			const { webFonts, textStyles, textBaseColor } = kivaTypography;
			addBase(webFonts);
			addBase({
				body: {
					...textStyles.textBase,
					color: textBaseColor,
				},
				h1: textStyles.textH1,
				h2: textStyles.textH2,
				h3: textStyles.textH3,
				h4: textStyles.textH4,
				small: textStyles.textSmall,
				code: {
					fontSize: '0.875em',
				},
				'button:focus': {
					outline: 'revert', // undo tailwind button focus styling
				},
				a: textStyles.textLink,
				'strong, b': {
					fontWeight: fontWeights.medium,
				},
				hr: {
					borderColor: colors.gray['500'],
					borderTopWidth: borderWidths.default,
				},
			});
			// Theming
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
					color: 'rgb(var(--text-color-primary))',
				},
			});
			// end theming
			addUtilities({
				'.text-base': textStyles.textBase,
				'.text-h1': textStyles.textH1,
				'.text-h2': textStyles.textH2,
				'.text-h3': textStyles.textH3,
				'.text-h4': textStyles.textH4,
				'.text-subhead': textStyles.textSubhead,
				'.text-jumbo': textStyles.textJumbo,
				'.text-small': textStyles.textSmall,
				'.text-link': textStyles.textLink,
			}, ['responsive']);
		}),
	],
};
