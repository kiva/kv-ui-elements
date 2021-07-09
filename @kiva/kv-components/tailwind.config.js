const sharedConfig = require('@kiva/kv-tokens/configs/tailwind.config');

module.exports = {
	mode: 'jit',
	presets: [sharedConfig],
	purge: [
		'./vue/**/*.vue',
		'./vue/stories/**/*.stories.js',
		'./utils/**/*.js',
	],
};
