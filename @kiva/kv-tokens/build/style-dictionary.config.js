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
			transforms: ['attribute/cti', 'name/camel', 'kiva/dimension-to-number'],
			buildPath: 'dist/js/',
			files: [
				{
					destination: 'tokens.js',
					format: 'kiva/js-tokens',
				},
			],
		},
		css: {
			transforms: ['attribute/cti'],
			buildPath: 'dist/css/',
			files: [
				{
					destination: 'tokens.css',
					format: 'kiva/css-themes',
				},
			],
		},
	},
};
