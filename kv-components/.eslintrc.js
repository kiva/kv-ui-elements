const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'plugin:vue/recommended',
		'airbnb-base',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	plugins: [
		'vue',
	],
	rules: {
		// tabs not spaces
		'indent': ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
		'vue/html-indent': ['error', 'tab'],
		// allow debugger during development
		'no-debugger': isProd ? 'error' : 'off',
		// // allow console during development
		'no-console': isProd ? ['warn', { allow: ['error'] }] : 'off',
		// disallow non-void html elements to be self-closing
		'vue/html-self-closing': ['error', {
			html: {
				normal: 'never'
			}
		}],
	},
};
