const path = require('node:path');

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'../../.eslintrc.cjs',
		'plugin:vue/recommended',
	],
	ignorePatterns: [
		'dist/*',
		'vite.config.js',
	],
	plugins: [
		'vue',
	],
	settings: {
		'import/resolver': {
			alias: [
				['#components', path.resolve(__dirname, 'vue')],
				['#utils', path.resolve(__dirname, 'utils')],
			],
		},
	},
	rules: {
		'vue/html-indent': ['error', 'tab'],
		// disallow non-void html elements to be self-closing
		'vue/html-self-closing': ['error', {
			html: {
				normal: 'never',
			},
		}],
	},
};
