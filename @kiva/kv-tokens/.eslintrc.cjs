module.exports = {
	extends: [
		'../../.eslintrc.cjs',
	],
	overrides: [
		{
			files: ['build/**/*.js'],
			rules: {
				// Build scripts may import dev-only tooling; package runtime exports still use the inherited rule.
				'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
			},
		},
	],
	rules: {
		'import/extensions': ['error', 'always'],
	},
};
