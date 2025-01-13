<template>
	<component
		:is="tag"
		ref="buttonRef"
		:to="to"
		:disabled="state === 'disabled'"
		class="tw-text-h4 tw-text-link"
		:class="{
			'tw-opacity-low tw-pointer-events-none': state === 'disabled',
			'tw-group tw-inline-flex tw-items-center tw-gap-x-0.5': icon
		}"
		@click="onClick"
	>
		<slot></slot>
		<kv-material-icon
			v-if="icon"
			:icon="icon"
			class="
				tw-w-1.5 tw-h-1.5 md:tw-w-2 md:tw-h-2
				tw-transition-transform tw-ease-in-out tw-duration-200
				group-hover:tw-translate-x-[0.125rem] group-focus:tw-translate-x-[0.125rem]
			"
		/>
	</component>
</template>

<script>
import {
	computed,
	onMounted,
	ref,
	toRefs,
	watch,
} from 'vue-demi';
import KvMaterialIcon from '#components/KvMaterialIcon';

/**
 * A component for displaying a stylized button or link with or without an icon
 */
export default {
	components: {
		KvMaterialIcon,
	},
	props: {
		/**
		 * Use if linking to a Vue route
		 * */
		to: {
			type: [String, Object],
			default: null,
		},
		/**
		 * Use if linking to an external link or old-stack page
		 * */
		href: {
			type: String,
			default: null,
		},
		/**
		 * SVG path data passed in from an imported @mdi/js module.
		 * ```
		 * import { mdiArrowRight } from '@mdi/js';
		 * data() { return { mdiArrowRight } };
		 * <kv-text-link :icon="mdiArrowRight" />`
		 * ```
		 * */
		icon: {
			type: String,
			default: '',
		},
		/**
		 * State of the button
		 * @values '', disabled
		 * */
		state: {
			type: String,
			default: '',
			validator(value) {
				return ['', 'disabled'].includes(value);
			},
		},
	},
	emits: [
		'click',
	],
	setup(props, { emit }) {
		const {
			to,
			href,
		} = toRefs(props);

		const buttonRef = ref(null);

		const tag = computed(() => {
			if (to.value) {
				return 'router-link';
			}
			if (href.value) {
				return 'a';
			}
			return 'button';
		});

		const onClick = (event) => {
			// emit a vue event and prevent native event
			// so we don't have to write @click.native in our templates
			if (tag.value === 'button') {
				event.preventDefault();
				/**
				 * Fired when the button is clicked
				 *
				 * @event click
				 * @param {Event}
				 */
				emit('click', event);
			}
		};

		const setHref = () => {
			// if the component is a router-link, router-link will set the href
			// if the href is passed as a prop, use that instead
			if (href.value) {
				buttonRef.value.href = href.value;
			}
		};

		watch(href, () => setHref());
		onMounted(() => setHref());

		return {
			tag,
			onClick,
			buttonRef,
			setHref,
		};
	},
};
</script>
