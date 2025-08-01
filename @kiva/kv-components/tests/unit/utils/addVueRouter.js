/* eslint-disable import/no-extraneous-dependencies */
import { createRouter, createWebHistory } from 'vue-router';

export default function addVueRouter(testingLibraryOptions, vueRouterOptions) {
	const opts = { ...testingLibraryOptions };

	// create opts.global.plugins array if it does not exist
	opts.global = opts.global ?? {};
	opts.global.plugins = opts.global.plugins ?? [];

	// add Vue Router to plugins array
	opts.global.plugins.push(createRouter(vueRouterOptions ?? {
		history: createWebHistory(),
		routes: [{ path: '/:path(.*)', component: {} }],
	}));

	return opts;
}
