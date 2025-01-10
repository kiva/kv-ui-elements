import { defineConfig } from 'vite';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import noBundlePlugin from 'vite-plugin-no-bundle';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	build: {
		outDir: 'dist',
		minify: false,
		cssCodeSplit: true,
		lib: {
			entry: 'index.js',
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				'@kiva/kv-tokens',
				'@mdi/js',
				'@vueuse',
				'aria-hidden',
				'change-case',
				'date-fns',
				'embla-carousel',
				'embla-carousel-autoplay',
				'embla-carousel-fade',
				'focus-trap',
				'moment',
				'nanoid',
				'numeral',
				'popper.js',
				'vue',
			],
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
