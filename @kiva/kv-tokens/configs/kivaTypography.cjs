const { rem, em } = require('./util.cjs');
const designtokens = require('../primitives.json');

const {
	fonts,
	fontSizes,
	fontWeights,
	letterSpacings,
	lineHeights,
	radii,
	space,
} = designtokens;

/**
 WEB FONT DEFINITIONS
*/
const webFonts = [
	// Note corresponding font weight in Tailwind is "normal"
	{
		'@font-face': {
			fontFamily: 'PostGrotesk',
			fontWeight: '400',
			fontStyle: 'normal',
			fontDisplay: 'swap',
			// eslint-disable-next-line max-len
			src: 'url(//www-kiva-org.freetls.fastly.net/static/fonts/PostGrotesk-Medium.8c8a585.woff2) format(\'woff2\')',
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
			src: 'url(//www-kiva-org.freetls.fastly.net/static/fonts/PostGrotesk-MediumItalic.133f41d.woff2) format(\'woff2\')',
		},
	},
	// Note corresponding font weight in Tailwind is "light"
	{
		'@font-face': {
			fontFamily: 'PostGrotesk',
			fontWeight: '300',
			fontStyle: 'normal',
			fontDisplay: 'swap',
			src: 'url(//www-kiva-org.freetls.fastly.net/static/fonts/PostGrotesk-Book.246fc8e.woff2) format(\'woff2\')',
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
			src: 'url(//www-kiva-org.freetls.fastly.net/static/fonts/PostGrotesk-BookItalic.4d06d39.woff2) format(\'woff2\')',
		},
	},
];

/** BASE TEXT COLOR */
const textBaseColor = 'rgb(var(--text-primary))';

/**
 REUSABLE TYPE STYLES
*/
const textStyles = (() => {
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
		letterSpacing: em(letterSpacings['-0.3'], fontSizes.h3.sm),
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
		textDecoration: 'none',
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
	};
})();

/**
 CUSTOMIZING THE PROSE PLUGIN

Styles here are MERGED with the plugin styling.
`false` removes that rule or ruleset which means our base styles will be used

See plugin styling here:
https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
*/

const proseOverrides = () => ({
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

module.exports = {
	webFonts,
	textBaseColor,
	textStyles,
	proseOverrides,
};
