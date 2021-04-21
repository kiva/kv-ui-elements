module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'../.eslintrc',
		'plugin:vue/recommended',
	],
	plugins: [
		'vue',
	],
	rules: {
		// disallow non-void html elements to be self-closing
		'vue/html-self-closing': ['error', {
			html: {
				normal: 'never'
			}
		}],
	},
};
