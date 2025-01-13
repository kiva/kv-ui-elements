import path from 'node:path';

export default {
	stories: [
		'../stories/StyleguidePrimitives.stories.js', // show the base styleguide first
		'../stories/**/*.stories.@(js|jsx|ts|tsx)'
	],

	staticDirs: [
		'../../../../dist',
	],

	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-a11y",
		"@storybook/addon-storysource",
		{
			name: '@storybook/addon-styling-webpack',
			options: {
				rules: [
					// Replaces existing CSS rules to support PostCSS
					{
						test: /\.css$/,
						use: [
							'style-loader',
							{
								loader: 'css-loader',
								options: { importLoaders: 1, url: false }
							},
							{
								// Gets options from `postcss.config.js` in your project root
								loader: 'postcss-loader',
								options: { implementation: require.resolve('postcss') }
							}
						],
					}
				]
			}
		}
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
		config.resolve.alias = {
			...config.resolve.alias,
			'~/node_modules': path.resolve(__dirname, '../../../../node_modules/'),
			'#components': path.resolve(__dirname, '../../vue'),
			'#utils': path.resolve(__dirname, '../../utils'),
		};
		return config;
	},

	framework: {
		name: '@storybook/vue3-webpack5',
		options: {}
	},
	core: {
		builder: '@storybook/builder-webpack5'
	},
	docs: {
		autodocs: true,
		defaultName: 'Kv Components',
	}
};
