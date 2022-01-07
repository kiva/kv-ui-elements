<template>
	<button
		:id="`kv-tab-${forPanel}`"
		class="tw-text-h3 tw-mb-1.5 tw-whitespace-nowrap"
		:class="{ 'hover:tw-text-action-highlight' : !isActive }"
		role="tab"
		:aria-selected="isActive"
		:aria-controls="`kv-tab-panel-${forPanel}`"
		:tabindex="isActive ? null : -1"
		@click="handleTabClicked"
	>
		<slot></slot>
	</button>
</template>

<script>
import {
	toRefs,
	inject,
	computed,
	onMounted,
	getCurrentInstance,
} from 'vue-demi';

export default {
	inject: ['$KvTabContext'],
	props: {
		/**
		 * A unique id which correspondes to an `id` property on the KvTabPanel it controls
		 * e.g., <kv-tab for="foo">... <kv-tab-panel id="foo">
		 * */
		forPanel: {
			type: String,
			required: true,
		},
		/**
		 * The tab should be initially selected.
		 * */
		selected: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const {
			forPanel,
		} = toRefs(props);

		const kvTabContext = inject('$KvTabContext');

		const isActive = computed(() => {
			let navItems = [];
			let selectedIndex = 0;
			if (kvTabContext) {
				navItems = kvTabContext.navItems;
				selectedIndex = kvTabContext.selectedIndex;
			}
			return navItems[selectedIndex]?.for === forPanel.value;
		});

		const index = computed(() => {
			let navItems = [];
			if (kvTabContext) {
				navItems = kvTabContext.navItems;
			}
			return navItems?.findIndex((navItem) => navItem.forPanel === forPanel.value);
		});

		const handleTabClicked = () => {
			kvTabContext.setTab(index.value);
		};

		onMounted(() => {
			const instance = getCurrentInstance();
			kvTabContext.navItems.push(instance.proxy);
		});

		return {
			isActive,
			handleTabClicked,
		};
	},
};
</script>
