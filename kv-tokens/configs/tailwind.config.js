const plugin = require('tailwindcss/plugin');
const designtokens = require('../primitives.json');

const {
	fonts,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	borderWidths,
	breakpoints,
	colors,
	opacity,
	space,
	radii,
} = designtokens;

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			md: `${breakpoints.md / 16}rem`,
			lg: `${breakpoints.lg / 16}rem`,
			xl: `${breakpoints.xl / 16}rem`,
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
			// greenblue: {
			// 	DEFAULT: colors.greenBlue,
			// },
			red: {
				DEFAULT: colors.red,
				dark: colors.redDark,
			},
		},
		spacing: {
			0: '0',
			0.5: `${space['0.5'] / 16}rem`,
			1: `${space['1'] / 16}rem`,
			2: `${space['2'] / 16}rem`,
			3: `${space['3'] / 16}rem`,
			4: `${space['4'] / 16}rem`,
			6: `${space['6'] / 16}rem`,
			8: `${space['8'] / 16}rem`,
			16: `${space['16'] / 16}rem`,
		},
		fontFamily: {
			sans: [`${fonts.sans}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`],
		},
		fontSize: {
			sm: [`${fontSizes.sm / 16}rem`, { lineHeight: lineHeights.normal }],
			base: [`${fontSizes.base / 16}rem`, { lineHeight: lineHeights.normal }],
			lg: [`${fontSizes.lg / 16}rem`, { lineHeight: lineHeights.normal }],
			xl: [`${fontSizes.xl / 16}rem`, { lineHeight: lineHeights.tight }],
			'2xl': [`${fontSizes['2xl'] / 16}rem`, { lineHeight: lineHeights.tight }],
		},
		fontWeight: {
			book: `${fontWeights.book}`,
			medium: `${fontWeights.medium}`,
		},
		lineHeight: {
			none: '1',
			tight: `${lineHeights.tight}`,
			normal: `${lineHeights.normal}`,
		},
		letterSpacing: {
			normal: 0,
			tight: `${letterSpacings.tight}px`,
			tighter: `${letterSpacings.tighter}px`,
		},
		borderWidth: {
			DEFAULT: `${borderWidths.default / 16}rem`,
			0: '0px',
			// 2: '2px',
			// 4: '4px',
			// 8: '8px',
		},
		boxShadow: {},
		borderRadius: {
			none: '0px',
			// sm: '0.125rem',
			DEFAULT: `${radii.default / 16}rem`,
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
		container: (theme) => ({
			center: true,
			padding: theme('spacing.4'), // To add horizontal padding by default
		}),
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		},
	},
	plugins: [
		plugin(({ addBase, theme }) => {
			addBase({
				body: { fontWeight: theme('fontWeight.book') },
				h1: {
					fontSize: theme('fontSize.2xl'),
					lineHeight: theme('lineHeights.tight'),
					fontWeight: theme('fontWeight.medium'),
					marginBottom: theme('spacing.5'),
					letterSpacing: theme('letterSpacing.tighter'),
				},
				h2: {
					fontSize: theme('fontSize.xl'),
					lineHeight: theme('lineHeights.tight'),
					fontWeight: theme('fontWeight.medium'),
					marginBottom: theme('spacing.5'),
					letterSpacing: theme('letterSpacing.tight'),
				},
				h3: {
					fontSize: theme('fontSize.lg'),
					lineHeight: theme('lineHeights.normal'),
					fontWeight: theme('fontWeight.medium'),
					letterSpacing: theme('letterSpacing.tight'),
				},
			});
		}),
		plugin(({ addUtilities, theme }) => {
			addUtilities({
				'.h1': {
					fontSize: theme('fontSize.2xl'),
					lineHeight: theme('lineHeights.tight'),
					fontWeight: theme('fontWeight.medium'),
					marginBottom: theme('spacing.5'),
					letterSpacing: theme('letterSpacing.tighter'),
				},
				'.h2': {
					fontSize: theme('fontSize.xl'),
					lineHeight: theme('lineHeights.tight'),
					fontWeight: theme('fontWeight.medium'),
					marginBottom: theme('spacing.5'),
					letterSpacing: theme('letterSpacing.tight'),
				},
				'.h3': {
					fontSize: theme('fontSize.lg'),
					lineHeight: theme('lineHeights.normal'),
					fontWeight: theme('fontWeight.medium'),
					letterSpacing: theme('letterSpacing.tight'),
				},
			});
		}),
	],
};
