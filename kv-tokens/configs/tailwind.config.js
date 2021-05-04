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

const remCalc = (px) => `${px / 16}rem`;

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
			md: remCalc(breakpoints.md),
			lg: remCalc(breakpoints.lg),
			xl: remCalc(breakpoints.xl),
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
			action: {
				700: colors.action['700'],
				DEFAULT: colors.action.DEFAULT,
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
			0.5: remCalc(space['0.5']),
			1: remCalc(space['1']),
			2: remCalc(space['2']),
			3: remCalc(space['3']),
			4: remCalc(space['4']),
			6: remCalc(space['6']),
			8: remCalc(space['8']),
			16: remCalc(space['16']),
		},
		fontFamily: {
			sans: [`${fonts.sans}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`],
		},
		fontWeight: {
			book: `${fontWeights.book}`,
			medium: `${fontWeights.medium}`,
		},
		borderWidth: {
			DEFAULT: remCalc(borderWidths.default),
			0: '0px',
			// 2: '2px',
			// 4: '4px',
			// 8: '8px',
		},
		borderRadius: {
			none: '0px',
			sm: remCalc(radii.sm),
			DEFAULT: remCalc(radii.default),
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
		plugin(({ addBase, addUtilities, theme }) => {
			const kivaWebFonts = [
				{
					'@font-face': {
						fontFamily: 'PostGrotesk',
						fontWeight: '400',
						fontStyle: 'normal',
						fontDisplay: 'swap',
						src: 'url(//www-kiva-org.freetls.fastly.net/static/fonts/PostGrotesk-Medium.592afe4.woff) format(\'woff\')',
					},
				},
				{
					'@font-face': {
						fontFamily: 'PostGrotesk',
						fontWeight: '400',
						fontStyle: 'italic',
						fontDisplay: 'swap',
						src: 'url(//www-kiva-org.freetls.fastly.net/static/fonts/PostGrotesk-MediumItalic.0953ed2.woff) format(\'woff\')',
					},
				},
				{
					'@font-face': {
						fontFamily: 'PostGrotesk',
						fontWeight: '300',
						fontStyle: 'normal',
						fontDisplay: 'swap',
						src: 'url(//www-kiva-org.freetls.fastly.net/static/fonts/PostGrotesk-Book.3b43709.woff) format(\'woff\')',
					},
				},
				{
					'@font-face': {
						fontFamily: 'PostGrotesk',
						fontWeight: '300',
						fontStyle: 'italic',
						fontDisplay: 'swap',
						src: 'url(//www-kiva-org.freetls.fastly.net/static/fonts/PostGrotesk-BookItalic.ec5d4ab.woff) format(\'woff\')',
					},
				},
			];
			addBase(kivaWebFonts);

			// Kiva Specific Typography
			const textBase = {
				fontWeight: theme('fontWeight.book'),
				fontSize: remCalc(fontSizes.base.DEFAULT),
				lineHeight: lineHeights.normal,
				'@screen lg': {
					fontSize: remCalc(fontSizes.base.lg),
				},
			};

			const textH1 = {
				fontSize: remCalc(fontSizes.h1.DEFAULT),
				fontWeight: fontWeights.medium,
				letterSpacing: remCalc(letterSpacings['-0.3']),
				lineHeight: lineHeights.tight,
				'@screen md': {
					fontSize: remCalc(fontSizes.h1.md),
					letterSpacing: remCalc(letterSpacings['-1']),
				},
				'@screen lg': {
					fontSize: remCalc(fontSizes.h1.lg),
					letterSpacing: remCalc(letterSpacings['-2']),
				},
			};

			const textH2 = {
				fontSize: remCalc(fontSizes.h2.DEFAULT),
				fontWeight: fontWeights.medium,
				letterSpacing: remCalc(letterSpacings['-1']),
				lineHeight: lineHeights.tight,
				'@screen md': {
					fontSize: remCalc(fontSizes.h2.md),
					letterSpacing: remCalc(letterSpacings['-1']),
				},
				'@screen lg': {
					fontSize: remCalc(fontSizes.h2.lg),
				},
			};

			const textH3 = {
				fontSize: remCalc(fontSizes.h3.DEFAULT),
				fontWeight: fontWeights.medium,
				letterSpacing: remCalc(letterSpacings['-1']),
				lineHeight: lineHeights.normal,
				'@screen md': {
					fontSize: remCalc(fontSizes.h3.md),
					letterSpacing: remCalc(letterSpacings['-0.3']),
				},
				'@screen lg': {
					fontSize: remCalc(fontSizes.h3.lg),
					letterSpacing: remCalc(letterSpacings['-1']),
				},
			};

			const textH4 = {
				fontSize: remCalc(fontSizes.h4.DEFAULT),
				fontWeight: fontWeights.medium,
				lineHeight: lineHeights.normal,
				textTransform: 'uppercase',
				'@screen md': {
					fontSize: remCalc(fontSizes.h4.md),
				},
				'@screen lg': {
					fontSize: remCalc(fontSizes.h4.lg),
				},
			};

			const textSubhead = {
				...textH3,
				fontWeight: fontWeights.book,
			};

			const textJumbo = {
				fontWeight: theme('fontWeight.medium'),
				fontSize: remCalc(fontSizes.jumbo.DEFAULT),
				letterSpacing: letterSpacings['-2'],
				lineHeight: lineHeights.tight,
				'@screen md': {
					fontSize: remCalc(fontSizes.jumbo.md),
				},
				'@screen lg': {
					fontSize: remCalc(fontSizes.jumbo.lg),
				},
			};

			addBase({
				body: textBase,
				h1: textH1,
				h2: textH2,
				h3: textH3,
				h4: textH4,
			});

			addUtilities({
				'.text-base': textBase,
				'.text-h1': textH1,
				'.text-h2': textH2,
				'.text-h3': textH3,
				'.text-h4': textH4,
				'.text-subhead': textSubhead,
				'.text-jumbo': textJumbo,
			}, ['responsive']);

			// Non-typography global stypes
			addBase({
				body: {
					color: colors.gray['800'],
				},
				'button:focus': {
					outline: 'revert', // undo tailwind button focus styling
				},
				a: {
					color: colors.brand.DEFAULT,
					textDecoration: 'none',
				},
				'a:hover': {
					color: colors.brand['700'],
					textDecoration: 'underline',
				},
				'a:focus': {
					color: colors.brand['700'],
					textDecoration: 'underline',
				},
			});
		}),
	],
};
