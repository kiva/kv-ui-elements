const { rem, em } = require('./util');
const designtokens = require('../primitives.json');

const {
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

/** BASE TEXT COLOR */
const textBaseColor = 'rgb(var(--text-primary))';

/**
 REUSABLE TYPE STYLES
*/
const textStyles = (() => {
	const textJumbo = {
		fontWeight: fontWeights.medium,
		fontSize: rem(fontSizes.jumbo.sm),
		letterSpacing: letterSpacings['-2'],
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.jumbo.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.jumbo.lg),
		},
	};

	const textH1 = {
		fontSize: rem(fontSizes.h1.sm),
		fontWeight: fontWeights.medium,
		letterSpacing: em(letterSpacings['-0.3'], fontSizes.h1.sm),
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.h1.md),
			letterSpacing: em(letterSpacings['-1'], fontSizes.h1.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h1.lg),
			letterSpacing: em(letterSpacings['-2'], fontSizes.h1.lg),
		},
	};

	const textH2 = {
		fontSize: rem(fontSizes.h2.sm),
		fontWeight: fontWeights.medium,
		letterSpacing: em(letterSpacings['-1'], fontSizes.h2.sm),
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.h2.md),
			letterSpacing: em(letterSpacings['-1'], fontSizes.h2.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h2.lg),
			letterSpacing: em(letterSpacings['-1'], fontSizes.h2.lg),
			lineHeight: lineHeights.normal,
		},
	};

	const textH3 = {
		fontSize: rem(fontSizes.h3.sm),
		fontWeight: fontWeights.medium,
		letterSpacing: em(letterSpacings['-1'], fontSizes.h3.sm),
		lineHeight: lineHeights.tight,
		'@screen md': {
			fontSize: rem(fontSizes.h3.md),
			letterSpacing: em(letterSpacings['-0.3'], fontSizes.h3.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h3.lg),
			letterSpacing: em(letterSpacings['-1'], fontSizes.h3.lg),
		},
	};

	const textH4 = {
		fontSize: rem(fontSizes.h4.sm),
		fontWeight: fontWeights.medium,
		lineHeight: lineHeights.normal,
		textTransform: 'uppercase',
		'@screen md': {
			fontSize: rem(fontSizes.h4.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h4.lg),
		},
	};

	const textSubhead = {
		fontSize: rem(fontSizes.subhead.sm),
		fontWeight: fontWeights.book,
		letterSpacing: em(letterSpacings['-0.5'], fontSizes.subhead.sm),
		lineHeight: lineHeights.normal,
		'@screen md': {
			fontSize: rem(fontSizes.subhead.md),
			letterSpacing: em(letterSpacings['-0.5'], fontSizes.subhead.md),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.subhead.lg),
			letterSpacing: em(letterSpacings['-0.5'], fontSizes.subhead.lg),
		},
	};

	const textBase = {
		fontWeight: fontWeights.book,
		fontSize: rem(fontSizes.base.sm),
		lineHeight: lineHeights.normal,
		'@screen lg': {
			fontSize: rem(fontSizes.base.lg),
		},
	};

	const textSmall = {
		fontWeight: fontWeights.medium,
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

	return {
		textJumbo,
		textH1,
		textH2,
		textH3,
		textH4,
		textSubhead,
		textBase,
		textSmall,
		textLink,
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
			'ol > li::before': {
				fontWeight: false,
				color: false,
			},
			'ul > li::before': {
				backgroundColor: textBaseColor,
			},
			hr: {
				borderColor: false,
			},
			blockquote: {
				...textStyles.textSubhead,
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
			h1: textStyles.textH1,
			h2: textStyles.textH2,
			h3: textStyles.textH3,
			h4: textStyles.textH4,
			'figure figcaption': textStyles.textSmall,
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
				marginTop: rem(space[4]),
				marginBottom: rem(space[4]),
			},
			blockquote: {
				marginTop: rem(space[4]),
				marginBottom: rem(space[4]),
				padding: `0 0 0 ${rem(space['6'])}`,
			},
			h1: {
				fontSize: false,
				marginTop: '0',
				marginBottom: rem(space[4]),
				color: textBaseColor,
			},
			h2: {
				fontSize: false,
				marginTop: rem(space[4]),
				marginBottom: rem(space[4]),
				color: textBaseColor,
			},
			h3: {
				fontSize: false,
				marginTop: rem(space[4]),
				marginBottom: rem(space[2]),
				color: textBaseColor,
			},
			h4: {
				marginTop: false,
				marginBottom: rem(space[4]),
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
				marginTop: rem(space[4]),
			},
			code: false,
			'h2 code': false,
			'h3 code': false,
			pre: {
				color: 'rgb(var(--text-primary))',
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
				marginTop: rem(space[4]),
				marginBottom: rem(space[4]),
			},
			ul: {
				marginTop: rem(space[4]),
				marginBottom: rem(space[4]),
			},
			li: {
				marginTop: rem(space[2]),
				marginBottom: rem(space[2]),
			},
			'ul > li::before': {
				width: em(6, 16),
				height: em(6, 16),
				top: '0.5em',
				left: em(4, 16),
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
	// Our typography breakpoints are handled elsewhere.
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
