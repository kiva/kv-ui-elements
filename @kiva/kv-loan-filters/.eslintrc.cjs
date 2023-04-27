module.exports = {
	extends: [
		'../../.eslintrc.cjs',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
	],
	rules: {
		// allow imports without file extensions
		'import/extensions': 'off',
	},
};
