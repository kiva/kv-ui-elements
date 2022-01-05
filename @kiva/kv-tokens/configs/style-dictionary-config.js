module.exports = {
	source: ['./primitives.json'],
	platforms: {
		scss: {
			transformGroup: 'scss',
			buildPath: 'dist/scss/',
			files: [
				{
					format: 'scss/variables',
					destination: '_variables.scss',
				},
			],
		},
		css: {
			transformGroup: 'css',
			buildPath: 'dist/css/',
			files: [
				{
					format: 'css/variables',
					destination: 'variables.css',
				},
			],
		},
	},
};
