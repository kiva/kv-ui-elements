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
			alias: {
				map: [
					['#components', path.resolve(__dirname, 'src/vue')],
					['#utils', path.resolve(__dirname, 'src/utils')],
					['#fixtures', path.resolve(__dirname, 'tests/fixtures')],
				],
				extensions: ['.ts', '.js', '.json', '.vue'],
			},
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
		'import/prefer-default-export': 'off',
	},
};
