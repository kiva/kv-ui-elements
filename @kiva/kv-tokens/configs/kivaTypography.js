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
		fontWeight: fontWeights.medium.value,
		fontSize: rem(fontSizes.jumbo.sm.value),
		letterSpacing: letterSpacings['-2'].value,
		lineHeight: lineHeights.tight.value,
		'@screen md': {
			fontSize: rem(fontSizes.jumbo.md.value),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.jumbo.lg.value),
		},
	};

	const textH1 = {
		fontSize: rem(fontSizes.h1.sm.value),
		fontWeight: fontWeights.medium.value,
		letterSpacing: em(letterSpacings['-0.3'].value, fontSizes.h1.sm.value),
		lineHeight: lineHeights.tight.value,
		'@screen md': {
			fontSize: rem(fontSizes.h1.md.value),
			letterSpacing: em(letterSpacings['-1'].value, fontSizes.h1.md.value),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h1.lg.value),
			letterSpacing: em(letterSpacings['-2'].value, fontSizes.h1.lg.value),
		},
	};

	const textH2 = {
		fontSize: rem(fontSizes.h2.sm.value),
		fontWeight: fontWeights.medium.value,
		letterSpacing: em(letterSpacings['-1'].value, fontSizes.h2.sm.value),
		lineHeight: lineHeights.tight.value,
		'@screen md': {
			fontSize: rem(fontSizes.h2.md.value),
			letterSpacing: em(letterSpacings['-1'].value, fontSizes.h2.md).value,
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h2.lg.value),
			letterSpacing: em(letterSpacings['-1'].value, fontSizes.h2.lg.value),
			lineHeight: lineHeights.normal.value,
		},
	};

	const textH3 = {
		fontSize: rem(fontSizes.h3.sm.value),
		fontWeight: fontWeights.medium.value,
		letterSpacing: em(letterSpacings['-1'].value, fontSizes.h3.sm).value,
		lineHeight: lineHeights.tight.value,
		'@screen md': {
			fontSize: rem(fontSizes.h3.md.value),
			letterSpacing: em(letterSpacings['-0.3'].value, fontSizes.h3.md.value),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h3.lg.value),
			letterSpacing: em(letterSpacings['-1'].value, fontSizes.h3.lg.value),
		},
	};

	const textH4 = {
		fontSize: rem(fontSizes.h4.sm.value),
		fontWeight: fontWeights.medium.value,
		lineHeight: lineHeights.normal.value,
		textTransform: 'uppercase',
		'@screen md': {
			fontSize: rem(fontSizes.h4.md.value),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.h4.lg.value),
		},
	};

	const textSubhead = {
		fontSize: rem(fontSizes.subhead.sm.value),
		fontWeight: fontWeights.book.value,
		letterSpacing: em(letterSpacings['-0.5'].value, fontSizes.subhead.sm.value),
		lineHeight: lineHeights.normal.value,
		'@screen md': {
			fontSize: rem(fontSizes.subhead.md.value),
			letterSpacing: em(letterSpacings['-0.5'].value, fontSizes.subhead.md.value),
		},
		'@screen lg': {
			fontSize: rem(fontSizes.subhead.lg.value),
			letterSpacing: em(letterSpacings['-0.5'].value, fontSizes.subhead.lg.value),
		},
	};

	const textBase = {
		fontWeight: fontWeights.book.value,
		fontSize: rem(fontSizes.base.sm.value),
		lineHeight: lineHeights.normal.value,
		'@screen lg': {
			fontSize: rem(fontSizes.base.lg.value),
		},
	};

	const textSmall = {
		fontSize: rem(fontSizes.small.sm.value),
		lineHeight: lineHeights.normal.value,
		'@screen lg': {
			fontSize: rem(fontSizes.small.lg.value),
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
		fontWeight: fontWeights.book.value,
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
		textPlaceholder,
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
				marginTop: rem(space[4].value),
				marginBottom: rem(space[4].value),
			},
			blockquote: {
				marginTop: rem(space[4].value),
				marginBottom: rem(space[4].value),
				padding: `0 0 0 ${rem(space[6].value)}`,
			},
			h1: {
				fontSize: false,
				marginTop: '0',
				marginBottom: rem(space[4].value),
				color: textBaseColor,
			},
			h2: {
				fontSize: false,
				marginTop: rem(space[4].value),
				marginBottom: rem(space[4].value),
				color: textBaseColor,
			},
			h3: {
				fontSize: false,
				marginTop: rem(space[4].value),
				marginBottom: rem(space[2].value),
				color: textBaseColor,
			},
			h4: {
				marginTop: false,
				marginBottom: rem(space[4].value),
				color: textBaseColor,
			},
			img: false,
			video: false,
			figure: {
				marginTop: rem(space[4].value),
				marginBottom: rem(space[4].value),
			},
			'figure > *': {
				marginTop: '0',
				marginBottom: '0',
			},
			'figure figcaption': {
				fontSize: false,
				lineHeight: false,
				marginTop: rem(space[4].value),
			},
			code: false,
			'code::before': false,
			'code::after': false,
			'h2 code': false,
			'h3 code': false,
			pre: {
				color: 'rgb(var(--text-primary-inverse))',
				backgroundColor: 'rgb(var(--bg-primary-inverse))',
				marginTop: rem(space[4].value),
				marginBottom: rem(space[4].value),
				borderRadius: rem(radii.sm.value),
				paddingTop: rem(space[2].value),
				paddingRight: rem(space[3].value),
				paddingBottom: rem(space[2].value),
				paddingLeft: rem(space[3].value),
				overflowY: 'auto',
			},
			'pre code': false,
			ol: {
				marginTop: rem(space[4].value),
				marginBottom: rem(space[4].value),
			},
			ul: {
				marginTop: rem(space[4].value),
				marginBottom: rem(space[4].value),
			},
			li: {
				marginTop: rem(space[2].value),
				marginBottom: rem(space[2].value),
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
				marginTop: rem(space[2].value),
			},
			'> ul > li > *:last-child': {
				marginBottom: rem(space[2].value),
			},
			'> ol > li > *:first-child': {
				marginTop: rem(space[2].value),
			},
			'> ol > li > *:last-child': {
				marginBottom: rem(space[2].value),
			},
			'ul ul, ul ol, ol ul, ol ol': {
				marginTop: 0,
				marginBottom: 0,
			},
			hr: {
				marginTop: rem(space[6].value),
				marginBottom: rem(space[6]).value,
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
