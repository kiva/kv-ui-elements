const isProd = process.env.NODE_ENV === 'production';

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
		// // allow console during development
		'no-console': isProd ? ['warn', { allow: ['error'] }] : 'off',
	},
	root: true,
};
