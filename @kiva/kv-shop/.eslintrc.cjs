module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	ignorePatterns: [
		'dist/*',
	],
	plugins: [
		'@typescript-eslint',
		'vue',
	],
	extends: [
		'../../.eslintrc.cjs',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:vue/recommended',
		'@vue/typescript/recommended',
	],
	rules: {
		'vue/html-indent': ['error', 'tab'],
		// disallow non-void html elements to be self-closing
		'vue/html-self-closing': ['error', {
			html: {
				normal: 'never',
			},
		}],
		// allow imports without file extensions
		'import/extensions': 'off',
		// allow non-default exports in files with single export
		'import/prefer-default-export': 'off',
		// allow `any` type
		'@typescript-eslint/no-explicit-any': ['off'],
	},
};
