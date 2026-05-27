// Generates a Tailwind safelist (array of fully `tw-`-prefixed class strings) from the
// Kiva token scales, so the compiled Make-kit stylesheet includes every token-backed
// utility regardless of Tailwind's JIT content scanning. Pure: takes scale/color keys,
// returns string[]. Scope is intentionally limited to Kiva-specific, token-backed
// utilities (not all of stock Tailwind) to bound the output size.

const SPACING_FAMILIES = [
	'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
	'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
	'gap', 'gap-x', 'gap-y', 'space-x', 'space-y',
	'w', 'h', 'min-w', 'min-h', 'max-w',
	'top', 'right', 'bottom', 'left', 'inset',
];

const RADIUS_CORNERS = ['', '-t', '-r', '-b', '-l', '-tl', '-tr', '-br', '-bl'];

// Semantic type utilities are defined in the preset's addUtilities (not in the token
// scales), so they are listed explicitly. Keep in sync with configs/tailwind.config.js.
const TYPE_UTILITIES = [
	'base', 'h1', 'h2', 'h3', 'h4', 'h5', 'subhead', 'jumbo', 'small', 'link', 'blockquote',
	'display', 'headline', 'headline-two', 'subheadline', 'title', 'button-link', 'upper',
	'caption', 'label',
];

const FONT_FAMILIES = ['sans', 'serif'];
const FONT_WEIGHTS = ['light', 'normal', 'medium', 'book'];

export default function buildSafelist({
	spaceKeys = [], radiusKeys = [], zKeys = [], textColors = [], bgColors = [], borderColors = [],
}) {
	const out = [];

	SPACING_FAMILIES.forEach((fam) => spaceKeys.forEach((k) => out.push(`tw-${fam}-${k}`)));

	// tw-rounded (DEFAULT) + each radius key across corners.
	RADIUS_CORNERS.forEach((corner) => {
		out.push(`tw-rounded${corner}`);
		radiusKeys.forEach((k) => out.push(`tw-rounded${corner}-${k}`));
	});

	textColors.forEach((c) => {
		out.push(`tw-text-${c}`);
		out.push(`tw-placeholder-${c}`);
	});
	bgColors.forEach((c) => out.push(`tw-bg-${c}`));
	borderColors.forEach((c) => {
		out.push(`tw-border-${c}`);
		out.push(`tw-divide-${c}`);
		out.push(`tw-ring-${c}`);
	});

	TYPE_UTILITIES.forEach((t) => out.push(`tw-text-${t}`));
	FONT_FAMILIES.forEach((f) => out.push(`tw-font-${f}`));
	FONT_WEIGHTS.forEach((w) => out.push(`tw-font-${w}`));
	zKeys.forEach((z) => out.push(`tw-z-${z}`));
	out.push('tw-shadow', 'tw-shadow-lg', 'tw-opacity-low', 'tw-border');

	return [...new Set(out)];
}
