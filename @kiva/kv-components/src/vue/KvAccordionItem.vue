<template>
	<div
		class="tw-border-b tw-border-tertiary tw-relative last:tw-border-b-0"
	>
		<button
			class="tw-w-full tw-flex tw-justify-between tw-items-center tw-py-1.5 tw-px-0
				tw-text-left disabled:tw-cursor-not-allowed disabled:tw-opacity-low
				hover:tw-text-action-highlight focus:tw-text-action-highlight"
			:disabled="disabled"
			:aria-controls="`kv-accordion-${id}`"
			:aria-expanded="isOpen ? 'true' : 'false'"
			@click.prevent="toggle"
		>
			<span class="tw-flex-1">
				<slot name="header"></slot>
			</span>
			<kv-material-icon
				class="tw-h-3 tw-w-3 tw-transition tw-transform tw-duration-500 tw-ease"
				:class="{ 'tw-rotate-180' : isOpen }"
				:icon="mdiChevronDown"
			/>
		</button>
		<kv-expandable>
			<div
				v-show="isOpen"
				:id="`kv-accordion-${id}`"
				:aria-hidden="isOpen ? 'false' : 'true'"
			>
				<slot></slot>
			</div>
		</kv-expandable>
	</div>
</template>

<script>
// Accordion a11y resources
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
// https://www.aditus.io/patterns/accordion/
// Future improvement
// Currently the slot content is inside the button, which means h2, h3 etc. won't be
// navigatable via headings. See https://daverupert.com/2019/12/why-details-is-not-an-accordion/
// h2 + button // ✅ H1 will show up when navigating by headings
// button + h2 // ❌ H1 will not show up when navigating by headings
// Perhaps we could do some magic DOM reordering via this.$slots.header or
// pass a prop like 'tag' that sets the parent node of the button. <accordion tag="h3">...

import {
	ref,
	toRefs,
} from 'vue';
import { mdiChevronDown } from '@mdi/js';
import KvExpandable from './KvExpandable.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	components: {
		KvMaterialIcon,
		KvExpandable,
	},
	props: {
		/**
	 * Unique id. used for a11y
	* */
		id: {
			type: String,
			required: true,
			validator: (v) => v.length > 0 && !/\s/g.test(v), // must be a valid html5 id
		},
		/**
	 	* Whether the body is shown initially
		* */
		open: {
			type: Boolean,
			default: false,
		},
		/**
		 * Whether the accordion can be toggled
		* */
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'toggle',
	],
	setup(props, { emit }) {
		const {
			open,
			disabled,
		} = toRefs(props);

		const isOpen = ref(open.value);

		const toggle = () => {
			if (!disabled.value) {
				isOpen.value = !isOpen.value;
				/**
				 * Fires when the accordion has been toggled.
				 * Contains an object with a boolean 'open' property of the current open
				 * state of the accordion
				 * @event toggle
				 * @type {Event}
				 */
				emit('toggle', { open: isOpen.value });
			}
		};

		const expand = () => {
			if (!disabled.value) {
				isOpen.value = true;
			}
		};

		const collapse = () => {
			if (!disabled.value) {
				isOpen.value = false;
			}
		};

		return {
			collapse,
			expand,
			isOpen,
			mdiChevronDown,
			toggle,
		};
	},
};
</script>
