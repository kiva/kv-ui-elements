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
	'storybook-dark-mode',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\,css&/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer')
            ]
          }
        }
      ],
      include: path.resolve(__dirname, '../'),
    })
    return config
  }
}
