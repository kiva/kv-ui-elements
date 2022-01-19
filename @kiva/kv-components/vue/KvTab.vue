<template>
	<button
		:id="`kv-tab-${forPanel}`"
		class="tw-text-h3 tw-mb-1.5 tw-whitespace-nowrap"
		:class="{ 'hover:tw-text-action-highlight' : !isActive }"
		role="tab"
		:aria-selected="isActive"
		:aria-controls="`kv-tab-panel-${forPanel}`"
		:tabindex="isActive ? null : -1"
		@click="handleTabClicked()"
	>
		<slot></slot>
	</button>
</template>

<script>
import {
	toRefs,
	computed,
	onMounted,
	getCurrentInstance,
} from 'vue-demi';
import { useTabs } from './composables/useTabs.ts';

export default {
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
	emits: [
		'tab-changed',
	],
	setup(props) {
		const {
			forPanel,
		} = toRefs(props);
		const {
			tabContext,
			setIndex,
			setItems,
		} = useTabs();

		const isActive = computed(() => {
			const active = tabContext.navItems[tabContext.selectedIndex]?.forPanel === forPanel.value;
			return active;
		});

		const selectedTabEl = computed(() => {
			const selected = tabContext.navItems[tabContext.selectedIndex]?.$el ?? null;
			return selected;
		});

		const index = computed(() => {
			const indexOutput = tabContext.navItems?.findIndex(
				(navItem) => navItem.forPanel === forPanel.value,
			);
			return indexOutput;
		});

		const setTab = (indexInput) => {
			setIndex(indexInput);
			selectedTabEl.value.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		};

		const handleTabClicked = () => {
			setTab(index.value);
		};
		onMounted(() => {
			const instance = getCurrentInstance();
			setItems(instance.proxy);
		});
		return {
			isActive,
			handleTabClicked,
		};
	},
};
</script>
