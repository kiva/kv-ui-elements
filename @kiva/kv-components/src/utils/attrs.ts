/**
 * Return input value as an array.
 */
function asArray(input) {
	if (!input) return [];
	return Array.isArray(input) ? input : [input];
}

/**
 * Separates class, style, and event listener attributes from other attributes. This allows the
 * classes and styles to be applied to the root element of a component while applying the other
 * attributes and listeners to the inner <input> element of the component. This is useful due to
 * the differences in how Vue 3 and Vue 2 use $attrs. Read more about those differences in
 * https://v3.vuejs.org/guide/migration/attrs-includes-class-style.html and
 * https://v3.vuejs.org/guide/migration/listeners-removed.html.
 *
 * Usage:
 *
 * <script>
 *   ...
 *   emits: ['eventName'],
 *   setup(props, context) {
 *     const { classes, styles, inputAttrs, inputListeners } = useAttrs(context, ['eventName']);
 *     return { classes, styles, inputAttrs, inputListeners };
 *   },
 *   ...
 * </script>
 *
 * <template>
 *   <div :class="classes" :style="styles">
 *     ...
 *     <input v-bind="inputAttrs" v-on="inputListeners">
 *     ...
 *   </div>
 * </template>
 *
 * @param   context        vue component context, from the second argument of the `setup()` function
 * @param   ownEvents      array of event name strings, same as the `emits` component option
 * @returns { classes, styles, inputAttrs, inputListeners }
 */
export function useAttrs({ attrs, listeners }, ownEvents = []) {
	const classes = asArray(attrs?.class);
	const styles = asArray(attrs?.style);

	const inputListeners = listeners ? { ...listeners } : {};
	ownEvents.forEach((event) => {
		delete inputListeners[event];
	});

	const inputAttrs = { ...attrs };
	delete inputAttrs.class;
	delete inputAttrs.style;

	return {
		classes,
		styles,
		inputAttrs,
		inputListeners,
	};
}
