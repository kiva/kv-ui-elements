import { rem, em } from './util.js';
import designTokens from '../primitives.js';

const {
	fonts,
	fontSizes,
	fontWeights,
	letterSpacings,
	lineHeights,
	lineHeightsAbsolute,
	radii,
	semanticFontSizes,
	space,
} = designTokens;

/**
 * Calculates the necessary font adjustments for a fallback font to match
 * the appearance of a web font as closely as possible.
 * For more info, see https://developer.chrome.com/blog/font-fallbacks
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.ascent - The ascent value of the web font.
 * @param {number} params.descent - The descent value of the web font.
 * @param {number} params.lineGap - The line gap value of the web font.
 * @param {number} params.unitsPerEm - The units per em value of the web font.
 * @param {number} params.avgCharWidth - The average character width of the web font.
 * @param {number} params.fallbackUnitsPerEm - The units per em value of the fallback font.
 * @param {number} params.fallbackAvgCharWidth - The average character width of the fallback font.
 * @returns {Object} CSS properties for font adjustments to be spread into a @font-face rule.
 */
export const adjustFallbackFont = ({
	ascent,
	descent,
	lineGap,
	unitsPerEm,
	avgCharWidth = 1,
	fallbackUnitsPerEm = unitsPerEm,
	fallbackAvgCharWidth = avgCharWidth,
} = {}) => {
	const asPercent = (value) => `${value * 100}%`;
	// avgCharacterWidth of web font / avgCharacterWidth of fallback font
	const sizeAdjust = ((avgCharWidth / unitsPerEm) / (fallbackAvgCharWidth / fallbackUnitsPerEm));
	return {
		sizeAdjust: asPercent(sizeAdjust),
		// web font ascent / (web font UPM * size-adjust)
		ascentOverride: asPercent(ascent / (unitsPerEm * sizeAdjust)),
		// web font descent / (web font UPM * size-adjust)
		descentOverride: asPercent(descent / (unitsPerEm * sizeAdjust)),
		// web font lineGap / (web font UPM * size-adjust)
		lineGapOverride: asPercent(lineGap / (unitsPerEm * sizeAdjust)),
	};
};

/**
 WEB FONT DEFINITIONS
*/
export const webFonts = [
	/**
	 * Fallback for Dovetail MVB Medium
	 *
	 * Dovetail MVB Medium metrics:
	 * - ascent: 1081
	 * - descent: -253
	 * - lineGap: 0
	 * - unitsPerEm: 1000
	 * - xWidthAvg: 453
	 *
	 * Georgia metrics:
	 * - unitPerEm: 2048
	 * - xWidthAvg: 913
	 */
	{
		'@font-face': {
			fontFamily: 'dovetail-mvb-fallback',
			src: 'local("Georgia")',
			...adjustFallbackFont({
				ascent: 1081,
				descent: 253,
				lineGap: 0,
				unitsPerEm: 1000,
				avgCharWidth: 453,
				fallbackUnitsPerEm: 2048,
				fallbackAvgCharWidth: 913,
			}),
		},
	},
	/**
	 * Fallback for Dovetail MVB Medium Italic
	 *
	 * Dovetail MVB Medium Italic metrics:
	 * - ascent: 1081
	 * - descent: -253
	 * - lineGap: 0
	 * - unitsPerEm: 1000
	 * - xWidthAvg: 430
	 *
	 * Georgia Italic metrics:
	 * - unitPerEm: 2048
	 * - xWidthAvg: 931
	 */
	{
		'@font-face': {
			fontFamily: 'dovetail-mvb-fallback',
			src: 'local("Georgia Italic")',
			fontStyle: 'italic',
			...adjustFallbackFont({
				ascent: 1081,
				descent: 253,
				lineGap: 0,
				unitsPerEm: 1000,
				avgCharWidth: 430,
				fallbackUnitsPerEm: 2048,
				fallbackAvgCharWidth: 931,
			}),
		},
	},
	// Note corresponding font weight in Tailwind is "normal"
	{
		'@font-face': {
			fontFamily: 'PostGrotesk',
			fontWeight: '400',
			fontStyle: 'normal',
			fontDisplay: 'swap',
			// eslint-disable-next-line max-len
			src: 'url(//www.kiva.org/kvui/PostGrotesk-Medium.woff2) format(\'woff2\')',
		},
	},
	/**
	 * Fallback for Post Grotesk Medium
	 *
	 * Post Grotesk Medium metrics:
	 * - ascent:948
	 * - descent: -262
	 * - lineGap: 0
	 * - unitsPerEm: 1000
	 * - xWidthAvg: 451
	 *
	 * Arial Bold metrics:
	 * - unitsPerEm: 2048
	 * - xWidthAvg: 983
	 */
	{
		'@font-face': {
			fontFamily: 'PostGrotesk-fallback',
			src: 'local("Arial Bold")',
			fontWeight: '400',
			...adjustFallbackFont({
				ascent: 948,
				descent: 262,
				lineGap: 0,
				unitsPerEm: 1000,
				avgCharWidth: 451,
				fallbackUnitsPerEm: 2048,
				fallbackAvgCharWidth: 983,
			}),
		},
	},
	// Note corresponding font weight in Tailwind is "normal"
	{
		'@font-face': {
			fontFamily: 'PostGrotesk',
			fontWeight: '400',
			fontStyle: 'italic',
			fontDisplay: 'swap',
			// eslint-disable-next-line max-len
			src: 'url(//www.kiva.org/kvui/PostGrotesk-MediumItalic.woff2) format(\'woff2\')',
		},
	},
	/**
	 * Fallback for Post Grotesk Medium Italic
	 *
	 * Post Grotesk Medium Italic metrics:
	 * - ascent: 949
	 * - descent: -259
	 * - lineGap: 0
	 * - unitsPerEm: 1000
	 * - xWidthAvg: 451
	 *
	 * Arial Bold Italic metrics:
	 * - unitsPerEm: 2048
	 * - xWidthAvg: 983
	 */
	{
		'@font-face': {
			fontFamily: 'PostGrotesk-fallback',
			src: 'local("Arial Bold Italic")',
			fontWeight: '400',
			fontStyle: 'italic',
			...adjustFallbackFont({
				ascent: 949,
				descent: 259,
				lineGap: 0,
				unitsPerEm: 1000,
				avgCharWidth: 451,
				fallbackUnitsPerEm: 2048,
				fallbackAvgCharWidth: 983,
			}),
		},
	},
	// Note corresponding font weight in Tailwind is "light"
	{
		'@font-face': {
			fontFamily: 'PostGrotesk',
			fontWeight: '300',
			fontStyle: 'normal',
			fontDisplay: 'swap',
			src: 'url(//www.kiva.org/kvui/PostGrotesk-Book.woff2) format(\'woff2\')',
		},
	},
	/**
	 * Fallback for Post Grotesk Book
	 *
	 * Post Grotesk Book metrics:
	 * - ascent: 927
	 * - descent: -252
	 * - lineGap: 0
	 * - unitsPerEm: 1000
	 * - xWidthAvg: 440
	 *
	 * Arial metrics:
	 * - unitsPerEm: 2048
	 * - xWidthAvg: 913
	 */
	{
		'@font-face': {
			fontFamily: 'PostGrotesk-fallback',
			src: 'local("Arial")',
			fontWeight: '300',
			...adjustFallbackFont({
				ascent: 927,
				descent: 252,
				lineGap: 0,
				unitsPerEm: 1000,
				avgCharWidth: 440,
				fallbackUnitsPerEm: 2048,
				fallbackAvgCharWidth: 913,
			}),
		},
	},
	// Note corresponding font weight in Tailwind is "light"
	{
		'@font-face': {
			fontFamily: 'PostGrotesk',
			fontWeight: '300',
			fontStyle: 'italic',
			fontDisplay: 'swap',
			// eslint-disable-next-line max-len
			src: 'url(//www.kiva.org/kvui/PostGrotesk-BookItalic.woff2) format(\'woff2\')',
		},
	},
	/**
	 * Fallback for Post Grotesk Book Italic
	 *
	 * Post Grotesk Book Italic metrics:
	 * - ascent: 927
	 * - descent: -251
	 * - lineGap: 0
	 * - unitsPerEm: 1000
	 * - xWidthAvg: 439
	 *
	 * Arial Italic metrics:
	 * - unitsPerEm: 2048
	 * - xWidthAvg: 913
	 */
	{
		'@font-face': {
			fontFamily: 'PostGrotesk-fallback',
			src: 'local("Arial Italic")',
			fontWeight: '300',
			fontStyle: 'italic',
			...adjustFallbackFont({
				ascent: 927,
				descent: 251,
				lineGap: 0,
				unitsPerEm: 1000,
				avgCharWidth: 439,
				fallbackUnitsPerEm: 2048,
				fallbackAvgCharWidth: 913,
			}),
		},
	},
];

/** BASE TEXT COLOR */
export const textBaseColor = 'rgb(var(--text-primary))';

/**
 REUSABLE TYPE STYLES
*/
export const textStyles = (() => {
	const textJumbo = {
		fontFamily: fonts.serif,
		fontWeight: fontWeights.medium,
		fontSize: rem(fontSizes.jumbo.sm),
		letterSpacing: letterSpacings['-1'],
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.jumbo.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.jumbo.lg),
		},
	};

	const textH1 = {
		fontFamily: fonts.serif,
		fontSize: rem(fontSizes.h1.sm),
		fontWeight: fontWeights.medium,
		letterSpacing: em(letterSpacings['-0.5'], fontSizes.h1.md),
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.h1.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h1.lg),
		},
	};

	const textH2 = {
		fontFamily: fonts.serif,
		fontSize: rem(fontSizes.h2.sm),
		fontWeight: fontWeights.medium,
		letterSpacing: em(letterSpacings.normal, fontSizes.h2.sm),
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.h2.md),
			letterSpacing: em(letterSpacings['-0.3'], fontSizes.h2.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h2.lg),
			letterSpacing: em(letterSpacings['-0.3'], fontSizes.h2.lg),
			lineHeight: lineHeights['nearly-none'],
		},
	};

	const textH3 = {
		fontSize: rem(fontSizes.h3.sm),
		fontWeight: fontWeights.normal,
		letterSpacing: em(letterSpacings['-1'], fontSizes.h3.sm),
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.h3.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h3.lg),
		},
	};

	const textH4 = {
		fontSize: rem(fontSizes.h4.sm),
		fontWeight: fontWeights.normal,
		lineHeight: lineHeights.normal,
		textTransform: 'uppercase',
		'@screen md': {
			fontSize: rem(fontSizes.h4.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h4.lg),
		},
	};

	const textH5 = {
		fontFamily: fonts.sans,
		fontSize: rem(fontSizes.h4.sm),
		fontWeight: fontWeights.normal,
		letterSpacing: em(letterSpacings.normal, fontSizes.subhead.sm),
		lineHeight: lineHeights['nearly-none'],
	};

	const textSubhead = {
		fontFamily: fonts.sans,
		fontSize: rem(fontSizes.subhead.sm),
		fontWeight: fontWeights.light,
		letterSpacing: em(letterSpacings.normal, fontSizes.subhead.sm),
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.subhead.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.subhead.lg),
		},
	};

	const textBase = {
		fontWeight: fontWeights.light,
		fontSize: rem(fontSizes.base.sm),
		letterSpacing: em(letterSpacings.normal, fontSizes.base.sm),
		lineHeight: lineHeights.normal,
		'@screen lg': {
			fontSize: rem(fontSizes.base.lg),
			letterSpacing: em(letterSpacings.normal, fontSizes.base.sm),
		},
	};

	const textSmall = {
		fontSize: rem(fontSizes.small.sm),
		lineHeight: lineHeights.normal,
		'@screen lg': {
			fontSize: rem(fontSizes.small.lg),
		},
	};

	const textLink = {
		color: 'rgb(var(--text-action))',
		textDecoration: 'underline',
		'&:hover, &:focus': {
			color: 'rgb(var(--text-action-highlight))',
			textDecoration: 'underline',
		},
	};

	const textPlaceholder = {
		color: 'rgb(var(--text-tertiary))',
		opacity: 1,
		fontWeight: fontWeights.light,
	};

	const textBlockquote = {
		fontFamily: fonts.serif,
		fontSize: rem(fontSizes.h2.sm),
		fontStyle: 'italic',
		fontWeight: fontWeights.medium,
		letterSpacing: em(letterSpacings['-0.5'], fontSizes.h2.sm),
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.h2.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h2.lg),
		},
	};

	const textDisplay = {
		fontFamily: fonts.serif,
		fontWeight: fontWeights.medium,
		fontSize: rem(semanticFontSizes.jumbo.sm),
		letterSpacing: em(letterSpacings['-400'], semanticFontSizes.jumbo.sm),
		lineHeight: em(lineHeightsAbsolute.jumbo.sm, semanticFontSizes.jumbo.sm),
		'@screen md': {
			fontSize: rem(semanticFontSizes.jumbo.md),
			letterSpacing: em(letterSpacings['-500'], semanticFontSizes.jumbo.md),
			lineHeight: em(lineHeightsAbsolute.jumbo.md, semanticFontSizes.jumbo.md),
		},
		'@screen lg': {
			fontSize: rem(semanticFontSizes.jumbo.lg),
			letterSpacing: em(letterSpacings['-600'], semanticFontSizes.jumbo.lg),
			lineHeight: em(lineHeightsAbsolute.jumbo.lg, semanticFontSizes.jumbo.lg),
		},
	};

	const textHeadline = {
		fontFamily: fonts.serif,
		fontWeight: fontWeights.medium,
		fontSize: rem(semanticFontSizes.h1.sm),
		letterSpacing: em(letterSpacings['-200'], semanticFontSizes.h1.sm),
		lineHeight: em(lineHeightsAbsolute.h1.sm, semanticFontSizes.h1.sm),
		'@screen md': {
			fontSize: rem(semanticFontSizes.h1.md),
			letterSpacing: em(letterSpacings['-200'], semanticFontSizes.h1.md),
		},
		'@screen lg': {
			fontSize: rem(semanticFontSizes.h1.lg),
			letterSpacing: em(letterSpacings['-300'], semanticFontSizes.h1.lg),
			lineHeight: em(lineHeightsAbsolute.h1.lg, semanticFontSizes.h1.lg),
		},
	};

	const textSubHeadline = {
		fontFamily: fonts.serif,
		fontWeight: fontWeights.medium,
		fontSize: rem(semanticFontSizes.h2.sm),
		letterSpacing: em(letterSpacings['-100'], semanticFontSizes.h2.sm),
		lineHeight: em(lineHeightsAbsolute.h2.sm, semanticFontSizes.h2.sm),
		'@screen md': {
			fontSize: rem(semanticFontSizes.h2.md),
			letterSpacing: em(letterSpacings['-100'], semanticFontSizes.h2.md),
		},
		'@screen lg': {
			fontSize: rem(semanticFontSizes.h2.lg),
			letterSpacing: em(letterSpacings['-200'], semanticFontSizes.h2.lg),
			lineHeight: em(lineHeightsAbsolute.h2.lg, semanticFontSizes.h2.lg),
		},
	};

	const textTitle = {
		fontFamily: fonts.sans,
		fontWeight: fontWeights.medium,
		fontSize: rem(semanticFontSizes.h3.sm),
		letterSpacing: em(letterSpacings.normal, semanticFontSizes.h3.sm),
		lineHeight: em(lineHeightsAbsolute.h3.sm, semanticFontSizes.h3.sm),
		'@screen md': {
			fontSize: rem(semanticFontSizes.h3.md),
		},
		'@screen lg': {
			fontSize: rem(semanticFontSizes.h3.lg),
			lineHeight: em(lineHeightsAbsolute.h3.lg, semanticFontSizes.h3.lg),
		},
	};

	const textButtonLink = {
		fontFamily: fonts.sans,
		fontWeight: fontWeights.medium,
		fontSize: rem(semanticFontSizes.button.button),
		letterSpacing: em(letterSpacings.normal, semanticFontSizes.button.button),
		lineHeight: em(lineHeightsAbsolute.button.sm, semanticFontSizes.button.button),
	};

	const textUpper = {
		fontFamily: fonts.sans,
		fontWeight: fontWeights.medium,
		fontSize: rem(semanticFontSizes.small.small),
		letterSpacing: em(letterSpacings.normal, semanticFontSizes.small.small),
		lineHeight: em(lineHeightsAbsolute.upper.sm, semanticFontSizes.small.small),
		textTransform: 'uppercase',
	};

	const textLabel = {
		fontFamily: fonts.sans,
		fontWeight: fontWeights.medium,
		fontSize: rem(semanticFontSizes.small.small),
		letterSpacing: em(letterSpacings.normal, semanticFontSizes.small.small),
		lineHeight: em(lineHeightsAbsolute.label.sm, semanticFontSizes.small.small),
	};

	const textCaption = {
		fontFamily: fonts.sans,
		fontWeight: fontWeights.normal,
		fontSize: rem(semanticFontSizes.small.small),
		letterSpacing: em(letterSpacings.normal, semanticFontSizes.small.small),
		lineHeight: em(lineHeightsAbsolute.caption.sm, semanticFontSizes.small.small),
	};

	return {
		textJumbo,
		textH1,
		textH2,
		textH3,
		textH4,
		textH5,
		textSubhead,
		textBase,
		textSmall,
		textLink,
		textPlaceholder,
		textBlockquote,
		textDisplay,
		textHeadline,
		textSubHeadline,
		textTitle,
		textButtonLink,
		textUpper,
		textLabel,
		textCaption,
	};
})();

/**
 CUSTOMIZING THE PROSE PLUGIN

Styles here are MERGED with the plugin styling.
`false` removes that rule or ruleset which means our base styles will be used

See plugin styling here:
https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
*/

export const proseOverrides = () => ({
	DEFAULT: {
		css: [{
			color: false,
			maxWidth: false,
			a: false,
			strong: false,
			b: false,
			'ol > li::marker': {
				fontWeight: false,
				color: false,
			},
			'ul > li::marker': {
				color: false,
				fontSize: textStyles.textSubhead.fontSize,
				lineHeight: 1,
			},
			hr: {
				borderColor: false,
			},
			blockquote: {
				fontWeight: false,
				fontStyle: 'italic',
				color: false,
				borderLeftWidth: false,
				borderLeftColor: false,
				position: 'relative',
			},
			'blockquote p:first-of-type::before': {
				fontSize: '3em',
				lineHeight: 1,
				color: 'rgb(var(--text-tertiary))',
				position: 'absolute',
				top: em(-2, 16),
				left: 0,
			},
			'blockquote p:last-of-type::after': {
				visibility: 'hidden',
			},
			h1: false,
			h2: false,
			h3: false,
			h4: false,
			figcaption: {
				fontSize: false,
				lineHeight: false,
			},
			code: {
				color: false,
			},
			'a code': false,
			pre: false,
		},
		// prose spacing
		{
			fontSize: false,
			lineHeight: false,
			p: {
				marginTop: rem(space[2]),
				marginBottom: rem(space[2]),
			},
			blockquote: {
				marginTop: rem(space[2]),
				marginBottom: rem(space[2]),
				padding: `0 0 0 ${rem(space['6'])}`,
			},
			h1: {
				fontSize: false,
				letterSpacing: false,
				marginTop: '0',
				marginBottom: rem(space[2]),
				color: textBaseColor,
			},
			h2: {
				fontSize: false,
				letterSpacing: false,
				marginTop: rem(space[2]),
				marginBottom: rem(space[2]),
				color: textBaseColor,
			},
			h3: {
				fontSize: false,
				letterSpacing: false,
				marginTop: rem(space[2]),
				marginBottom: rem(space[2]),
				color: textBaseColor,
			},
			h4: {
				letterSpacing: false,
				marginTop: false,
				marginBottom: rem(space[2]),
				color: textBaseColor,
			},
			h5: {
				letterSpacing: false,
				marginTop: false,
				marginBottom: rem(space[2]),
				color: textBaseColor,
			},
			img: false,
			video: false,
			figure: {
				marginTop: rem(space[4]),
				marginBottom: rem(space[4]),
			},
			'figure > *': {
				marginTop: '0',
				marginBottom: '0',
			},
			'figure figcaption': {
				fontSize: false,
				lineHeight: false,
				marginTop: rem(space[2]),
			},
			code: false,
			'code::before': false,
			'code::after': false,
			'h2 code': false,
			'h3 code': false,
			pre: {
				color: 'rgb(var(--text-primary-inverse))',
				backgroundColor: 'rgb(var(--bg-primary-inverse))',
				marginTop: rem(space[4]),
				marginBottom: rem(space[4]),
				borderRadius: rem(radii.sm),
				paddingTop: rem(space[2]),
				paddingRight: rem(space[3]),
				paddingBottom: rem(space[2]),
				paddingLeft: rem(space[3]),
				overflowY: 'auto',
			},
			'pre code': false,
			ol: {
				marginTop: rem(space[2]),
				marginBottom: rem(space[2]),
				paddingLeft: em(18, 16),
			},
			'ol > li': {
				paddingLeft: em(10, 16),
			},
			ul: {
				marginTop: rem(space[2]),
				marginBottom: rem(space[2]),
				paddingLeft: em(18, 16),
			},
			'ul > li': {
				paddingLeft: em(10, 16),
			},
			li: {
				marginTop: rem(space[2]),
				marginBottom: rem(space[2]),
			},
			'> ul > li p': {
				marginTop: em(12, 16),
				marginBottom: em(12, 16),
			},
			'> ul > li > *:first-child': {
				marginTop: rem(space[2]),
			},
			'> ul > li > *:last-child': {
				marginBottom: rem(space[2]),
			},
			'> ol > li > *:first-child': {
				marginTop: rem(space[2]),
			},
			'> ol > li > *:last-child': {
				marginBottom: rem(space[2]),
			},
			'ul ul, ul ol, ol ul, ol ol': {
				marginTop: 0,
				marginBottom: 0,
			},
			hr: {
				marginTop: rem(space['6']),
				marginBottom: rem(space['6']),
			},
			'hr + *': {
				marginTop: '0',
			},
			'h2 + *': {
				marginTop: '0',
			},
			'h3 + *': {
				marginTop: '0',
			},
			'h4 + *': {
				marginTop: '0',
			},
			// TODO: Once table styling is specced out we can fill this in
			table: false,
			'thead th': false,
			'thead th:first-child': false,
			'thead th:last-child': false,
			'tbody td': false,
			'tbody td:first-child': false,
			'tbody td:last-child': false,
		},
		{
			'> :first-child': {
				marginTop: '0',
			},
			'> :last-child': {
				marginBottom: '0',
			},
		},
		],
	},
	// Our typography breakpoints are handled by our default styles (e.g. textH1, textBase, etc.).
	// No need to use `<div class="prose prose-sm prose-lg prose-xl">. Only <div class="prose">
	sm: false,
	lg: false,
	xl: false,
	'2xl': false,
});
