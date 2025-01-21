import { defineConfig } from 'vite';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import noBundlePlugin from 'vite-plugin-no-bundle';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	resolve: {
		alias: {
			'#components': '/src/vue',
			'#utils': '/src/utils',
		},
	},
	build: {
		outDir: 'dist',
		// Ensure that separate css files are created for each component with styles
		cssCodeSplit: true,
		// Enable Vite library mode
		lib: {
			entry: 'src/index.js',
			formats: ['es'],
			fileName: (format, entryName) => {
				// Since we have declared type: module in package.json, we use .js for ES modules and .cjs for CommonJS modules
				let suffix = format === 'es' ? '.js' : '.cjs';
				// Entries in node_modules won't have a packge.json file, so we need to use .mjs for ES modules
				if (entryName.includes('node_modules') && format === 'es') {
					suffix = '.mjs';
				}
				// Remove .vue extension from entryName for SFCs
				if (entryName.slice(-4) === '.vue') {
					return `${entryName.slice(0, -4)}${suffix}`;
				}
				// Return default entryName
				return `${entryName}${suffix}`;
			},
		},
	},
	plugins: [
		// Support Vue 3 single-file components
		vue(),
		// Make the output match the src file structure instead of bundling into one large file
		noBundlePlugin({
			// Dependencies that should be included in the final build. Update package.json bundledDependencies when changing this list.
			internal: [
				'aria-hidden',
				'embla-carousel',
				'embla-carousel-autoplay',
				'embla-carousel-fade',
				'popper.js',
			],
		}),
		// Ensure assets are created in the dist folder when using Vite library mode
		libAssetsPlugin({
			name: '[name].[contenthash:8].[ext]',
			outputPath: 'kvui',
			publicUrl: 'https://www.kiva.org/',
		}),
	],
});
