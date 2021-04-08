const designtokens = require('../primitives.json');
const plugin = require('tailwindcss/plugin');

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
	radii
} = designtokens;

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			md: `${breakpoints.md / 16}rem`,
			lg: `${breakpoints.lg / 16}rem`,
			xl: `${breakpoints.xl / 16}rem`
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: {
				darkest: colors.gray0,
				dark: colors.gray1,
				DEFAULT: colors.gray2,
				light: colors.gray3,
				lightest: colors.gray4
			},
			green: {
				110: colors.green['110'],
				105: colors.green['105'],
				DEFAULT: colors.green.DEFAULT,
				95: colors.green['95'],
				85: colors.green['85'],
				70: colors.green['70'],
				50: colors.green['50'],
				30: colors.green['30'],
				10: colors.green['10'],
				5: colors.green['5'],
			},
			greenblue: {
				DEFAULT: colors.greenBlue
			},
			red: {
				DEFAULT: colors.red,
				dark: colors.redDark,
			}
		},
		spacing: {
			0: '0',
			1: `${space.gapDemi / 16}rem`,
			2: `${space.gapShort / 16}rem`,
			3: `${space.gapTall / 16}rem`,
			4: `${space.gapExtraTall / 16}rem`,
			5: `${space.gapGrande / 16}rem`,
			6: `${space.gapExtraGrande / 16}rem`,
			7: `${space.gapVenti / 16}rem`,
			8: `${space.gapTrenta / 16}rem`,
		},
		fontFamily: {
			sans: [`${fonts.sans}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`],
			// mono: [`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`]
		},
		fontSize: {
			sm: [`${fontSizes.sm / 16}rem`, { lineHeight: lineHeights.normal }],
			base: [`${fontSizes.base / 16}rem`, { lineHeight: lineHeights.normal }],
			lg: [`${fontSizes.lg / 16}rem`, { lineHeight: lineHeights.normal }],
			xl: [`${fontSizes.xl / 16}rem`, { lineHeight: lineHeights.tight }],
			'2xl': [`${fontSizes['2xl'] / 16}rem`, { lineHeight: lineHeights.tight }],
		},
		fontWeight: {
			book: fontWeights.book,
			medium: fontWeights.medium,
		},
		lineHeight: {
			none: 1,
			tight: lineHeights.tight,
			normal: lineHeights.normal
		},
		letterSpacing: {
			normal: 0,
			tight: `${letterSpacings.tight}px`,
			tighter: `${letterSpacings.tighter}px`
		},
		borderWidth: {
			DEFAULT: `${borderWidths.default / 16}rem`,
			0: '0px',
			// 2: '2px',
			// 4: '4px',
			// 8: '8px',
		},
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
			'0': '0',
			'low': `${opacity.low}`,
			'full': '1',
		},
		container: (theme) => ({
			center: true,
			padding: theme('spacing.4'), // To add horizontal padding by default
		}),
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		}
	},
	plugins: [
		plugin(function ({ addBase, theme }) {
			addBase({
				'body': { fontWeight: theme('fontWeight.book') },
				'h1': {
					fontSize: theme('fontSize.2xl'),
					lineHeight: theme('lineHeights.tight'),
					fontWeight: theme('fontWeight.medium'),
					marginBottom: theme('spacing.5'),
					letterSpacing: theme('letterSpacing.tighter')
				},
				'h2': {
					fontSize: theme('fontSize.xl'),
					lineHeight: theme('lineHeights.tight'),
					fontWeight: theme('fontWeight.medium'),
					marginBottom: theme('spacing.5'),
					letterSpacing: theme('letterSpacing.tight')
				},
				'h3': {
					fontSize: theme('fontSize.lg'),
					lineHeight: theme('lineHeights.normal'),
					fontWeight: theme('fontWeight.medium'),
					letterSpacing: theme('letterSpacing.tight')
				}
			})
		}),
		plugin(function ({ addUtilities, theme }) {
			addUtilities({
				'.h1': {
					fontSize: theme('fontSize.2xl'),
					lineHeight: theme('lineHeights.tight'),
					fontWeight: theme('fontWeight.medium'),
					marginBottom: theme('spacing.5'),
					letterSpacing: theme('letterSpacing.tighter')
				},
				'.h2': {
					fontSize: theme('fontSize.xl'),
					lineHeight: theme('lineHeights.tight'),
					fontWeight: theme('fontWeight.medium'),
					marginBottom: theme('spacing.5'),
					letterSpacing: theme('letterSpacing.tight')
				},
				'.h3': {
					fontSize: theme('fontSize.lg'),
					lineHeight: theme('lineHeights.normal'),
					fontWeight: theme('fontWeight.medium'),
					letterSpacing: theme('letterSpacing.tight')
				}
			})
		})
	]
}
