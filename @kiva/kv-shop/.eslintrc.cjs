module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
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
	},
};
