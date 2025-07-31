/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import noBundlePlugin from 'vite-plugin-no-bundle';
import vue from '@vitejs/plugin-vue';
import vueLibCss from '@kiva/vite-plugin-vue-lib-css';

export default defineConfig({
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
				const suffix = format === 'es' ? '.js' : '.cjs';
				// Rename node_modules directory from bundled dependencies to avoid module resolution issues
				if (entryName.startsWith('node_modules')) {
					return `${entryName.replace('node_modules/', 'vendor/')}${suffix}`;
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
		noBundlePlugin(),
		// Ensure component css is imported into the final build
		vueLibCss(),
		// Generate type declarations for the final build
		dts({
			// Change the extension of vue files used for type declarations to .js
			beforeWriteFile(filePath, content) {
				// Search and replace .vue with .js for imported components in index.d.ts
				if (filePath.endsWith('index.d.ts')) {
					return {
						filePath,
						content: content.replace(/import (.*) from '(.*)\.vue'/g, 'import $1 from \'$2.js\''),
					};
				}

				// Return the original file content otherwise
				return {
					filePath,
					content,
				};
			},
			// Put all type declarations in a single file
			rollupTypes: true,
		}),
	],
});
