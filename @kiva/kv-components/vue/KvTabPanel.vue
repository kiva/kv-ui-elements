<template>
	<transition
		enter-active-class="tw-transition-opacity tw-duration-700"
		leave-active-class=""
		enter-class="tw-opacity-0 tw-absolute tw-top-0"
		enter-to-class="tw-opacity-full"
		leave-class=""
		leave-to-class="tw-opacity-0 tw-absolute tw-top-0"
	>
		<div
			v-show="isActive"
			:id="`kv-tab-panel-${id}`"
			:key="`kv-tab-panel-${id}`"
			role="tabpanel"
			:aria-hidden="!isActive"
			:aria-labelledby="`kv-tab-${id}`"
			tabindex="0"
		>
			<slot></slot>
		</div>
	</transition>
</template>

<script>
import {
	computed,
	toRefs,
} from 'vue-demi';
import { useTabs } from './composables/useTabs.ts';

export default {
	props: {
		/**
		 * A unique id which correspondes to a `for` property on the KvTab which controls it
		 * e.g., <kv-tab for="foo">... <kv-tab-panel id="foo">
		 * */
		id: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const {
			id,
		} = toRefs(props);
		const { tabContext } = useTabs();

		const isActive = computed(() => {
			const active = tabContext.navItems[tabContext.selectedIndex]?.forPanel === id.value;
			return active;
		});

		return {
			isActive,
		};
	},
};
</script>
