const path = require('path');

module.exports = {
	stories: [
		'../stories/Styleguide.stories.js', // show the base styleguide first
		'../stories/**/*.stories.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-storysource',
		'@storybook/addon-postcss',
	],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: 'javascript/auto'
		});
		config.module.rules.push({
			test: /\.postcss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: { importLoaders: 1, sourceMap: false },
				},
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								require('tailwindcss'),
								require('autoprefixer'),
							]
						}
					},
				}
			]
		});
		return config;
	},
}
