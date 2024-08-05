const isProd = process.env.NODE_ENV === 'production';

const path = require('path');

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
	},
	rules: {
		// tabs not spaces
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
		// allow debugger during development
		'no-debugger': isProd ? 'error' : 'off',
		// allow console during development
		'no-console': isProd ? ['warn', { allow: ['error'] }] : 'off',
		// max line length 120
		'max-len': ['error', { code: 120, ignoreComments: true }],
		// allow no return statement
		'consistent-return': 'off',
		// allow curly brackets around arrow function bodies
		'arrow-body-style': 'off',
	},
	overrides: [
		{
			files: ['*.stories.*', '*.spec.*'],
			rules: {
				// disable max length errors for stories and tests
				'max-len': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['~/node_modules', path.resolve(__dirname, './node_modules/')],
				],
				extensions: ['.ts', '.js', '.json'],
			},
		},
	},
	root: true,
};
