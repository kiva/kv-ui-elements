import {
	createApp, defineComponent, h, type App,
} from 'vue';

// Runs a composable inside a mounted component instance and returns its result with the app.
export default function withSetup<T>(composable: () => T): { result: T; app: App } {
	let result!: T;
	const app = createApp(defineComponent({
		setup() {
			result = composable();
			return () => h('div');
		},
	}));
	app.mount(document.createElement('div'));
	return { result, app };
}
