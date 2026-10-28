/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'tsup';

/**
 * Browser bundle for consumers that cannot resolve npm modules: a classic <script> loaded from a CDN
 * (the monolith's View.tpl) or inlined by mcp-web-publisher's analytics loader.
 *
 * Unlike dist/index.cjs, which leaves `web-vitals` as an external `require()`, this build inlines it,
 * so the file runs as-is in a browser and exposes every export on `window.kvAnalytics`.
 *
 * Kept out of the main `tsup` CLI build (and named so tsup does not auto-load it) because the
 * ESM/CJS builds consumed by ui and cms-page-server must keep their current shape.
 */
export default defineConfig({
	entry: { browser: 'src/index.ts' },
	format: ['iife'],
	globalName: 'kvAnalytics',
	platform: 'browser',
	target: 'es2018',
	noExternal: ['web-vitals'],
	minify: true,
	outDir: 'dist',
	clean: false,
});
