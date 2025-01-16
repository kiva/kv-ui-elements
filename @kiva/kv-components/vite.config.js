import { defineConfig } from 'vite';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import noBundlePlugin from 'vite-plugin-no-bundle';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	resolve: {
		alias: {
			'#components': '/vue',
			'#utils': '/utils',
		},
	},
	build: {
		outDir: 'dist',
		cssCodeSplit: true,
		lib: {
			entry: 'index.js',
			formats: ['es'],
			fileName: (format, entryName) => {
				const suffix = format === 'es' ? '.js' : '.cjs';
				if (entryName.slice(-4) === '.vue') {
					return `${entryName.slice(0, -4)}${suffix}`;
				}
				return `${entryName}${suffix}`;
			},
		},
	},
	plugins: [
		vue(),
		noBundlePlugin(),
		libAssetsPlugin({
			name: '[name].[contenthash:8].[ext]',
			outputPath: 'kvui',
			publicUrl: 'https://www.kiva.org/',
		}),
	],
});
