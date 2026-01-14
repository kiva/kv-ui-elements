// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import path, { dirname, join } from 'node:path';
import vue from '@vitejs/plugin-vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);

export default {
	stories: [
		'../stories/StyleguidePrimitives.stories.js', // show the base styleguide first
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
		'../stories/**/*.mdx'
	],

	staticDirs: [
		'../../../../../dist',
		'../stories/assets',
	],

	addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-a11y"), getAbsolutePath("@storybook/addon-docs")],

	framework: {
		name: getAbsolutePath("@storybook/vue3-vite"),
		options: {}
	},

	// docs: {
    //   defaultName: 'Kv Components'
    // },

	async viteFinal(config) {
		// Customize Vite config for Storybook
		config.resolve.alias = {
			...config.resolve.alias,
			'~/node_modules': path.resolve(__dirname, '../../../../node_modules/'),
			'#components': path.resolve(__dirname, '../../vue'),
			'#utils': path.resolve(__dirname, '../../utils'),
			'#fixtures': path.resolve(__dirname, '../../../tests/fixtures'),
		};

		// Ensure Vue plugin runs before other plugins for .vue file processing
		config.plugins = config.plugins || [];
		const hasVuePlugin = config.plugins.some(p => p && p.name === 'vite:vue');
		if (!hasVuePlugin) {
			config.plugins.unshift(vue());
		}

		// Force SVGs to be served as URLs, not inlined as base64
		config.build = config.build || {};
		config.build.assetsInlineLimit = 0; // Never inline assets, always use URLs

		return config;
	},
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}
