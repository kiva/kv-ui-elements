import { isVue3 } from 'vue-demi';

// Adds listeners to the testing library options for the currently running Vue version
export default function addListeners(testingLibraryOptions, listeners) {
	const opts = { ...testingLibraryOptions };

	if (isVue3) {
		// create opts.attrs if it does not exist
		opts.attrs = opts.attrs ?? {};

		// add each listener to opts.attrs
		Object.keys(listeners).forEach((key) => {
			// Convert listener name for Vue 3, e.g. input => onInput
			const name = `on${key.charAt(0).toUpperCase()}${key.slice(1)}`;
			opts.attrs[name] = listeners[key];
		});
	} else {
		opts.listeners = {
			...listeners,
		};
	}

	return opts;
}
