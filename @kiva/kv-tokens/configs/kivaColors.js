const { hexToRGB } = require('./util');
const designtokens = require('../primitives.json');

const defaultTheme = designtokens.colors.theme.DEFAULT;
const darkTheme = designtokens.colors.theme.dark;
const mintTheme = designtokens.colors.theme.mint;

/**
 * Loops through a theme object and builds a set of CSS custom properties
 * These custom properties can then be set on the :root, or a component.
 * They will be referenced by Tailwind classes.
 */
const buildCSSCustomPropertiesFromTheme = (theme) => {
	const customProperties = {};
	const themeCategories = Object.keys(theme);

	themeCategories.forEach((category) => {
		let twPrefix = category;
		if (category === 'background') {
			twPrefix = 'bg';
		}

		const properties = Object.keys(theme[category]);
		properties.forEach((property) => {
			customProperties[`--${twPrefix}-${property}`] = hexToRGB(theme[category][property]);
		});
	});
	return customProperties;
};

/**
 * An object containing CSS custom properties for all themes in our primitives file.
 */
const kivaThemes = {
	static: {
		'--text-black': hexToRGB(designtokens.colors.black),
		'--text-white': hexToRGB(designtokens.colors.white),
		'--text-brand': hexToRGB(designtokens.colors.brand.DEFAULT),

		'--bg-black': hexToRGB(designtokens.colors.black),
		'--bg-white': hexToRGB(designtokens.colors.white),
		'--bg-brand': hexToRGB(designtokens.colors.brand.DEFAULT),

		'--border-black': hexToRGB(designtokens.colors.black),
		'--border-white': hexToRGB(designtokens.colors.white),
		'--border-brand': hexToRGB(designtokens.colors.brand.DEFAULT),
	},
	default: buildCSSCustomPropertiesFromTheme(defaultTheme),
	dark: buildCSSCustomPropertiesFromTheme(darkTheme),
	mint: buildCSSCustomPropertiesFromTheme(mintTheme),
};

// function to allow background opacity and text opacity with tailwind colors
// https://www.youtube.com/watch?v=MAtaT8BZEAo
const withOpacity = (variableName) => ({ opacityValue }) => {
	if (opacityValue !== undefined) {
		return `rgba(var(${variableName}), ${opacityValue})`;
	}
	return `rgb(var(${variableName}))`;
};

const buildTailwindProperty = (prefix) => {
	let twPrefix = prefix;
	if (prefix === 'background') {
		twPrefix = 'bg';
	}

	const property = {
		// static properties that never change
		transparent: 'transparent',
		current: 'currentColor',
		black: withOpacity(`--${twPrefix}-black`),
		white: withOpacity(`--${twPrefix}-white`),
		brand: withOpacity(`--${twPrefix}-brand`),
	};

	// themable properties
	//  Read from the default theme since it will have all of the keys
	Object.keys(defaultTheme[prefix]).forEach((key) => {
		property[key] = withOpacity(`--${twPrefix}-${key}`);
	});
	return property;
};

/**
 * These are used to set Tailwind config properties so you can write classes like
 * tw-text-primary, tw-border-primary, etc.
 * The values (e.g., --text-primary) need to match the keys in the kivaThemes object above.
 */
const tailwindProperties = {
	textColor: buildTailwindProperty('text'),
	backgroundColor: buildTailwindProperty('background'),
	borderColor: buildTailwindProperty('border'),
};

module.exports = {
	kivaThemes,
	tailwindProperties,
};
