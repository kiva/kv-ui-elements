const plugin = require('tailwindcss/plugin');
const typographyPlugin = require('@tailwindcss/typography');
const kivaTypography = require('./kivaTypography');
const { defaultTheme, buildColorChoices, buildTailwindColorObjectFromTokens } = require('./kivaColors');
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
	zIndices,
} = designtokens;

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
			md: rem(breakpoints.md.value),
			lg: rem(breakpoints.lg.value),
			xl: rem(breakpoints.xl.value),
			print: { raw: 'print' }, // https://tailwindcss.com/docs/breakpoints#styling-for-print
		},
		colors: {
			// static colors
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black.value,
			white: colors.white.value,
			brand: buildTailwindColorObjectFromTokens(colors.brand),
			// themable colors are defined in the 'extend' section as custom properties
		},
		spacing: {
			0: '0',
			0.5: rem(space['0.5'].value),
			1: rem(space['1'].value),
			1.5: rem(space['1.5'].value),
			2: rem(space['2'].value),
			2.5: rem(space['2.5'].value),
			3: rem(space['3'].value),
			3.5: rem(space['3.5'].value),
			4: rem(space['4'].value),
			4.5: rem(space['4.5'].value),
			5: rem(space['5'].value),
			6: rem(space['6'].value),
			7: rem(space['7'].value),
			8: rem(space['8'].value),
			9: rem(space['9'].value),
			10: rem(space['10'].value),
			11: rem(space['11'].value),
			12: rem(space['12'].value),
			13: rem(space['13'].value),
			14: rem(space['14'].value),
			15: rem(space['15'].value),
			16: rem(space['16'].value),
		},
		fontFamily: {
			sans: [`${fonts.sans.value}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`],
		},
		fontWeight: {
			book: `${fontWeights.book.value}`,
			medium: `${fontWeights.medium.value}`,
		},
		borderWidth: {
			DEFAULT: rem(borderWidths.default.value),
			0: '0px',
			2: '2px',
			// 4: '4px',
			// 8: '8px',
		},
		borderRadius: {
			none: '0px',
			sm: rem(radii.sm.value),
			DEFAULT: rem(radii.default.value),
			// md: '0.375rem',
			lg: rem(radii.lg.value),
			// xl: '0.75rem',
			// '2xl': '1rem',
			// '3xl': '1.5rem',
			full: '500rem',
		},
		opacity: {
			0: '0',
			low: `${opacity.low.value}`,
			full: '1',
		},
		zIndex: {
			hide: zIndices.hide.value,
			auto: 'auto',
			base: zIndices.base.value,
			1: zIndices['1'].value,
			2: zIndices['2'].value,
			3: zIndices['3'].value,
			4: zIndices['4'].value,
			5: zIndices['5'].value,
			docked: zIndices.docked.value,
			dropdown: zIndices.dropdown.value,
			sticky: zIndices.sticky.value,
			banner: zIndices.banner.value,
			overlay: zIndices.overlay.value,
			modal: zIndices.modal.value,
			popover: zIndices.popover.value,
			skipLink: zIndices.skipLink.value,
			toast: zIndices.toast.value,
			tooltip: zIndices.tooltip.value,
			troposphere: zIndices.troposphere.value,
			stratosphere: zIndices.stratosphere.value,
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
			// Color options since we aren't using the normal Tailwind color system.
			textColor: buildColorChoices('text'),
			placeholderColor: buildColorChoices('text'),
			backgroundColor: buildColorChoices('background'),
			gradientColorStops: buildColorChoices('background'),
			borderColor: buildColorChoices('border'),
			divideColor: buildColorChoices('border'),
			ringColor: buildColorChoices('border'),
			ringOffsetColor: buildColorChoices('border'),
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
					'-webkit-font-smoothing': 'antialiased',
					'-moz-osx-font-smoothing': 'grayscale',
					'text-rendering': 'optimizeLegibility',
				},
				button: { fontWeight: fontWeights.book.value },
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
					fontWeight: fontWeights.medium.value,
				},
				hr: {
					borderColor: colors.gray['500'].value,
					borderTopWidth: borderWidths.default.value,
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
				'.text-subhead': textStyles.textSubhead,
				'.text-jumbo': textStyles.textJumbo,
				'.text-small': textStyles.textSmall,
				'.text-link': textStyles.textLink,
			}, ['responsive']);
		}),
	],
};
