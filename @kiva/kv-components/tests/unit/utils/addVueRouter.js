/* eslint-disable import/no-extraneous-dependencies */
import { isVue3 } from 'vue-demi';
import * as VueRouter from 'vue-router';

export default function addVueRouter(testingLibraryOptions, vueRouterOptions) {
	const opts = { ...testingLibraryOptions };

	if (isVue3) {
		// create opts.global.plugins array if it does not exist
		opts.global = opts.global ?? {};
		opts.global.plugins = opts.global.plugins ?? [];

		// add Vue Router to plugins array
		opts.global.plugins.push(VueRouter.createRouter(vueRouterOptions ?? {
			history: VueRouter.createWebHashHistory(),
			routes: [{ path: '/:path(.*)', component: {} }],
		}));
	} else {
		const VueRouterDefault = VueRouter.default;
		opts.routes = new VueRouterDefault(vueRouterOptions);
	}

	return opts;
}
