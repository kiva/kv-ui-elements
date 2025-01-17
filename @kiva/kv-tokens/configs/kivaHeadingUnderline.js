import designTokens from '../primitives.js';
import { base64 } from './util.js';
import underlinePath from './underlinePath.js';

const { colors } = designTokens;
const svgOpenTag = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 921 16" preserveAspectRatio="none">';

/*
 * Generates an SVG string for brush-stroke underlines, with colors from each theme. This is
 * achieved by creating one path for the brush stroke, and then using multiple <use> elements to
 * reference the path and fill it with the desired color (a sprite sheet technique from
 * https://css-tricks.com/svg-fragment-identifiers-work/). The SVG is then used as a background
 * image, and can be referenced by the color hex code, e.g. `url('/kvui/heading-underline.svg#2AA967')`.
 * This allows us to use the same SVG for all themes, and change the color with CSS custom
 * properties, rather than having to generate a new SVG for each color.
 */
export function generateExternalSVG() {
	const { theme } = colors;
	const themeColors = Object.keys(theme)
		.filter((key) => theme[key]['heading-underline'])
		.flatMap((key) => Object.values(theme[key]['heading-underline']));
	const colorList = [...new Set(themeColors)];

	const colorDefs = colorList.map((color) => {
		return `<g id="${color.replace('#', '')}"><use href="#hu-path" fill="${color}" /></g>`;
	});
	return `${svgOpenTag}
		<defs>
			<style>
				g { display: none; }
				g:target { display: inline; }
			</style>
		</defs>
		${colorDefs.join('')}
		<symbol id="hu-path">
			${underlinePath}
		</symbol>
	</svg>`;
}

/*
 * Generates an inline-style SVG string for brush-stroke underlines, in one color only, to be used as a background image in css.
 *
 * THIS SHOULD ONLY BE USED FOR DEMO PURPOSES.
 *
 * This will greatly increase the size of your css file if used in production with multiple colors.
 */
export function generateInlineSVG(color) {
	const svg = `${svgOpenTag}
		<g fill="${color}">
			${underlinePath}
		</g>
	</svg>`;
	return `url('data:image/svg+xml;base64,${base64(svg)}')`;
}
