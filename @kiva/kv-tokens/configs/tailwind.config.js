import plugin from 'tailwindcss/plugin.js';
import typographyPlugin from '@tailwindcss/typography';
import {
	proseOverrides,
	textBaseColor,
	textStyles,
	webFonts,
} from './kivaTypography.js';
import { defaultTheme, buildColorChoices } from './kivaColors.js';
import designTokens from '../primitives.js';
import { rem } from './util.js';

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
} = designTokens;

export default {
	content: ['./**.*.js'],
	prefix: 'tw-', // prefixes all tailwinds classes with tw. e.g., 'tw-flex tw-mb-2'
	corePlugins: {
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
			// static colors
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			brand: colors.brand,
			'eco-green': colors['eco-green'],
			marigold: colors.marigold,
			'desert-rose': colors['desert-rose'],
			stone: colors.stone,
			gray: colors.gray,
			social: colors.social,
			// themable colors are defined in the 'extend' section as custom properties
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
			5.5: rem(space['5.5']),
			6: rem(space['6']),
			6.5: rem(space['6.5']),
			7: rem(space['7']),
			7.5: rem(space['7.5']),
			8: rem(space['8']),
			8.5: rem(space['8.5']),
			9: rem(space['9']),
			9.5: rem(space['9.5']),
			10: rem(space['10']),
			10.5: rem(space['10.5']),
			11: rem(space['11']),
			11.5: rem(space['11.5']),
			12: rem(space['12']),
			12.5: rem(space['12.5']),
			13: rem(space['13']),
			13.5: rem(space['13.5']),
			14: rem(space['14']),
			14.5: rem(space['14.5']),
			15: rem(space['15']),
			15.5: rem(space['15.5']),
			16: rem(space['16']),
		},
		fontFamily: {
			sans: [fonts.sans],
			serif: [fonts.serif],
		},
		fontWeight: {
			// Keeping "book" defined here for backwards compatibility
			book: `${fontWeights.light}`,
			light: `${fontWeights.light}`,
			normal: `${fontWeights.normal}`,
			medium: `${fontWeights.medium}`,
		},
		borderWidth: {
			DEFAULT: rem(borderWidths.default),
			0: '0px',
			2: '2px',
			4: '4px',
			8: '8px',
		},
		borderRadius: {
			none: '0px',
			xs: rem(radii.xs),
			sm: rem(radii.sm),
			md: rem(radii.md),
			DEFAULT: rem(radii.default),
			lg: rem(radii.lg),
			xl: rem(radii.xl),
			full: '500rem',
		},
		opacity: {
			0: '0',
			10: '0.1',
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
		boxShadow: {
			DEFAULT: '0 1px 4px 0 rgb(0 0 0 / 0.08)',
			lg: '0 4px 12px rgba(0, 0, 0, 0.08)',
		},
		extend: {
			typography: proseOverrides, // prose plugin overrides
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
			// Color options since we aren't using the normal Tailwind color system.
			textColor: buildColorChoices('text'),
			placeholderColor: buildColorChoices('text'),
			backgroundColor: buildColorChoices('background'),
			gradientColorStops: buildColorChoices('background'),
			borderColor: {
				DEFAULT: 'currentColor',
				...buildColorChoices('border'),
			},
			divideColor: buildColorChoices('border'),
			ringColor: buildColorChoices('border'),
			ringOffsetColor: buildColorChoices('border'),
		},
	},
	plugins: [
		typographyPlugin, // prose plugin. See overrides in theme.extend.typography
		plugin(({ addBase, addUtilities }) => {
			addBase(webFonts);
			addBase({
				body: {
					...textStyles.textBase,
					color: textBaseColor,
					'-webkit-font-smoothing': 'antialiased',
					'-moz-osx-font-smoothing': 'grayscale',
					'text-rendering': 'optimizeLegibility',
				},
				button: { fontWeight: 'inherit' },
				h1: textStyles.textH1,
				h2: textStyles.textH2,
				h3: textStyles.textH3,
				h4: textStyles.textH4,
				h5: textStyles.textH5,
				small: textStyles.textSmall,
				code: {
					fontSize: '0.875em',
				},
				blockquote: textStyles.textBlockquote,
				'figure figcaption': textStyles.textBase,
				'button:focus': {
					outline: 'revert', // undo tailwind button focus styling
				},
				a: textStyles.textLink,
				'strong, b': {
					fontWeight: fontWeights.normal,
				},
				hr: {
					borderColor: colors.gray['500'],
					borderTopWidth: borderWidths.default,
				},
				'input::-webkit-input-placeholder, textarea::-webkit-input-placeholder': textStyles.textPlaceholder,
				'input::-moz-placeholder, textarea::-moz-placeholder': textStyles.textPlaceholder,
				'input::-ms-input-placeholder, textarea::-ms-input-placeholder': textStyles.textPlaceholder,
				'input:-ms-input-placeholder, textarea:-ms-input-placeholder': textStyles.textPlaceholder,
				'input::placeholder, textarea::placeholder': textStyles.textPlaceholder,
			});
			addBase({
				// add our default theme CSS color properties to the root
				// so they'll available for Tailwind classes
				':root': defaultTheme, // themable colors
			});
			addUtilities({
				'.text-base': textStyles.textBase,
				'.text-h1': textStyles.textH1,
				'.text-h2': textStyles.textH2,
				'.text-h3': textStyles.textH3,
				'.text-h4': textStyles.textH4,
				'.text-h5': textStyles.textH5,
				'.text-subhead': textStyles.textSubhead,
				'.text-jumbo': textStyles.textJumbo,
				'.text-small': textStyles.textSmall,
				'.text-link': textStyles.textLink,
				'.text-blockquote': textStyles.textBlockquote,
			}, ['responsive']);
		}),
	],
};
