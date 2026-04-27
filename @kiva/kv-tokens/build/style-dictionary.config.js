// Build-time token generation only. This file is not part of the published runtime surface.
import StyleDictionary from 'style-dictionary';
import jsTokensFormat from './formats/js-tokens.js';
import cssThemesFormat from './formats/css-themes.js';
import dimensionToNumberTransform from './transforms/dimension-to-number.js';

StyleDictionary.registerFormat(jsTokensFormat);
StyleDictionary.registerFormat(cssThemesFormat);
StyleDictionary.registerTransform(dimensionToNumberTransform);

export default {
	source: ['tokens/**/*.json'],
	platforms: {
		js: {
			transforms: ['attribute/cti', 'name/kebab', 'kiva/dimension-to-number'],
			buildPath: 'dist/js/',
			files: [
				{
					destination: 'tokens.js',
					format: 'kiva/js-tokens',
				},
			],
		},
		css: {
			transforms: ['attribute/cti', 'name/kebab'],
			buildPath: 'dist/css/',
			files: [
				{
					destination: 'tokens.css',
					format: 'kiva/css-themes',
				},
			],
		},
		scss: {
			transforms: ['attribute/cti', 'name/kebab', 'kiva/dimension-to-number'],
			buildPath: 'dist/scss/',
			files: [
				{
					destination: 'tokens.scss',
					format: 'scss/variables',
					options: { outputReferences: false },
				},
			],
		},
	},
};
