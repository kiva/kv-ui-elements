module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'../.eslintrc.cjs',
		'plugin:vue/recommended',
	],
	plugins: [
		'vue',
	],
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
