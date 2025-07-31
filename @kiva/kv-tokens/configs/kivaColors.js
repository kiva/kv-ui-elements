import designTokens from '../primitives.js';
import { hexToRGB } from './util.js';

const {
	DEFAULT: defaultThemeTokens,
	'green-light': greenLightThemeTokens,
	'green-dark': greenDarkThemeTokens,
	'marigold-light': marigoldLightThemeTokens,
	'stone-light': stoneLightThemeTokens,
	'stone-dark': stoneDarkThemeTokens,
	dark: darkThemeTokens,
	'dark-green': darkGreenThemeTokens,
	'eco-forest': ecoForestThemeTokens,
	mint: mintThemeTokens,
	'dark-mint': darkMintThemeTokens,
	'dark-stone': darkStoneThemeTokens,
} = designTokens.colors.theme;

/**
 * Loops through a theme object and builds a set of CSS custom properties
 * They will be referenced by Tailwind classes.
 */
const buildCSSVarsFromTokens = (theme) => {
	const customProperties = {};
	const themeCategories = Object.keys(theme);

	themeCategories.forEach((category) => {
		let twPrefix = category;
		if (category === 'background') {
			twPrefix = 'bg';
		}

		const properties = Object.keys(theme[category]);
		properties.forEach((property) => {
			const key = `--${twPrefix}-${property}`;
			if (category === 'heading-underline') {
				customProperties[key] = `url('/kvui/heading-underline.svg${theme[category][property]}')`;
			} else {
				customProperties[key] = hexToRGB(theme[category][property]);
			}
		});
	});
	return customProperties;
};

export const defaultTheme = buildCSSVarsFromTokens(defaultThemeTokens);
export const greenLightTheme = buildCSSVarsFromTokens(greenLightThemeTokens);
export const greenDarkTheme = buildCSSVarsFromTokens(greenDarkThemeTokens);
export const marigoldLightTheme = buildCSSVarsFromTokens(marigoldLightThemeTokens);
export const stoneLightTheme = buildCSSVarsFromTokens(stoneLightThemeTokens);
export const stoneDarkTheme = buildCSSVarsFromTokens(stoneDarkThemeTokens);
export const darkTheme = buildCSSVarsFromTokens(darkThemeTokens);
export const mintTheme = buildCSSVarsFromTokens(mintThemeTokens);
export const darkGreenTheme = buildCSSVarsFromTokens(darkGreenThemeTokens);
export const darkMintTheme = buildCSSVarsFromTokens(darkMintThemeTokens);
export const darkStoneTheme = buildCSSVarsFromTokens(darkStoneThemeTokens);
export const ecoForestTheme = buildCSSVarsFromTokens(ecoForestThemeTokens);

// function to allow background opacity and text opacity with tailwind colors
// https://www.youtube.com/watch?v=MAtaT8BZEAo
const withOpacity = (variableName) => ({ opacityValue }) => {
	if (opacityValue !== undefined) {
		return `rgba(var(${variableName}), ${opacityValue})`;
	}
	return `rgb(var(${variableName}))`;
};

/**
 * By default, Tailwind creates classes automatically for coloring text, backgrounds,
 * borders, etc. using its color system.
 * Since we're not using the built-in color system, we need tell Tailwind the names of our colors
 * and point them to a CSS custom property name.
 *
 * This function loops through the categories in our default theme,
 * and returns a set of names and points them to the appropriate CSS property. e.g.,
 * {
 *   'text-primary': 'rgb(var(--text-primary))',
 *   'text-secondary': 'rgb(var(--text-secondary))',
 *   ...
 *   'bg-primary': 'rgb(var(--bg-primary))',
 *   'bg-secondary': 'rgb(var(--bg-secondary))',
 *   ...
 *   'border-primary': 'rgb(var(--border-primary))',
 *   ...
 * }
 */
export const buildColorChoices = (themeProperty) => {
	let twPrefix = themeProperty;
	if (themeProperty === 'background') {
		twPrefix = 'bg';
	}

	const property = {};
	// themable properties
	// Read from the default theme since it will have all of the keys
	Object.keys(defaultThemeTokens[themeProperty]).forEach((key) => {
		property[key] = withOpacity(`--${twPrefix}-${key}`);
	});
	return property;
};
