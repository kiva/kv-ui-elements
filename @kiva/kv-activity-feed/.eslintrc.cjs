module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'../../.eslintrc.cjs',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
	],
	rules: {
		// allow imports without file extensions
		'import/extensions': 'off',
		// allow `any` type
		'@typescript-eslint/no-explicit-any': ['off'],
	},
};
