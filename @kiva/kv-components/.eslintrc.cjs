const path = require('node:path');

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'../../.eslintrc.cjs',
		'plugin:vue/recommended',
		'@vue/eslint-config-typescript',
	],
	ignorePatterns: [
		'dist/*',
		'vite.config.js',
	],
	plugins: [
		'vue',
		'@typescript-eslint',
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
		// Disable file extension requirement for TypeScript files
		'import/extensions': ['error', 'ignorePackages', {
			'js': 'never',
			'ts': 'never',
			'vue': 'always',
		}],
	},
};
