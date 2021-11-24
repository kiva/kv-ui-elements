const { hexToRGB } = require('./util');
const designtokens = require('../primitives.json');

const {
	DEFAULT: defaultThemeTokens,
	dark: darkThemeTokens,
	'dark-green': darkGreenThemeTokens,
	mint: mintThemeTokens,
} = designtokens.colors.theme;

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
			customProperties[`--${twPrefix}-${property}`] = hexToRGB(theme[category][property].value);
		});
	});
	return customProperties;
};

const defaultTheme = buildCSSVarsFromTokens(defaultThemeTokens);
const darkTheme = buildCSSVarsFromTokens(darkThemeTokens);
const mintTheme = buildCSSVarsFromTokens(mintThemeTokens);
const darkGreenTheme = buildCSSVarsFromTokens(darkGreenThemeTokens);

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
const buildColorChoices = (themeProperty) => {
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

/**
 * Reshapes an object from
 * {
 *   brand: {
 *     100: {
 *       value: "somehex"
 *     },
 *     200: {
 *       value: "somehex"
 *     }
 *     ...
 *   }
 * }
 *
 * to
 *
 * {
 *   brand: {
 *     100: "somehex",
 *     200: "somehex"
 *     ...
 *   }
 * }
*/

const buildTailwindColorObjectFromTokens = (tokenGroup) => {
	const ret = {};
	Object.keys(tokenGroup).forEach((group) => {
		ret[group] = tokenGroup[group].value;
	});
	return ret;
};

module.exports = {
	buildColorChoices,
	buildTailwindColorObjectFromTokens,
	defaultTheme,
	darkTheme,
	darkGreenTheme,
	mintTheme,
};
