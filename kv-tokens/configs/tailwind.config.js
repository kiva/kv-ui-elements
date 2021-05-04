const plugin = require('tailwindcss/plugin');
const typographyPlugin = require('@tailwindcss/typography');
const kivaTypography = require('./kivaTypography.js');
const designtokens = require('../primitives.json');
const { rem } = require('./util');

const {
	fonts,
	fontWeights,
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
	corePlugins: {
		fontSize: false,
		lineHeight: false,
		letterSpacing: false,
		boxShadow: false,
	},
	theme: {
		screens: {
			md: rem(breakpoints.md),
			lg: rem(breakpoints.lg),
			xl: rem(breakpoints.xl),
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
			danger: {
				700: colors.danger['700'],
				DEFAULT: colors.danger.DEFAULT,
			},
		},
		spacing: {
			0: '0',
			0.5: rem(space['0.5']),
			1: rem(space['1']),
			2: rem(space['2']),
			3: rem(space['3']),
			4: rem(space['4']),
			6: rem(space['6']),
			8: rem(space['8']),
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
		container: (theme) => ({
			center: true,
			padding: theme('spacing.4'), // To add horizontal padding by default
		}),
		extend: {
			typography: kivaTypography.proseOverrides, // prose plugin overrides
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		},
	},
	plugins: [
		typographyPlugin, // prose plugin. See overrides in theme.extend.typography
		plugin(({ addBase, addUtilities }) => {
			const { webFonts, textStyles } = kivaTypography;
			addBase(webFonts);
			addBase({
				body: {
					...textStyles.textBase,
					color: textStyles.textBaseColor,
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
				a: {
					color: colors.brand.DEFAULT,
					textDecoration: 'none',
				},
				'a:hover, a:focus': {
					color: colors.brand['700'],
					textDecoration: 'underline',
				},
				'strong, b': {
					fontWeight: fontWeights.medium,
				},
				hr: {
					borderColor: colors.gray['500'],
					borderTopWidth: borderWidths.default,
				},
			});
			addUtilities({
				'.text-base': textStyles.textBase,
				'.text-h1': textStyles.textH1,
				'.text-h2': textStyles.textH2,
				'.text-h3': textStyles.textH3,
				'.text-h4': textStyles.textH4,
				'.text-subhead': textStyles.textSubhead,
				'.text-jumbo': textStyles.textJumbo,
				'.text-small': textStyles.textSmall,
			}, ['responsive']);
		}),
	],
};
