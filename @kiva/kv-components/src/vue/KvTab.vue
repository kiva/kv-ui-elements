<template>
	<button
		:id="`kv-tab-${forPanel}`"
		class="tw-text-h3 tw-mb-1.5 tw-whitespace-nowrap tw-text-left"
		:class="{ 'hover:tw-text-action' : !isActive,
			'md:tw-border-l-2 tw-border-transparent md:tw-pl-2' : vertical,
			'tw-text-action' : isActive && vertical
		}"
		role="tab"
		:aria-selected="isActive"
		:aria-controls="`kv-tab-panel-${forPanel}`"
		:tabindex="isActive ? null : -1"
		@click="handleTabClicked"
	>
		<slot></slot>
	</button>
</template>

<script lang="ts">
import {
	toRefs,
	inject,
	computed,
	onMounted,
	getCurrentInstance,
} from 'vue';

interface NavItem {
	forPanel?: string;
	[key: string]: any;
}

interface KvTabContext {
	navItems: NavItem[];
	selectedIndex: number;
	// eslint-disable-next-line no-unused-vars
	setTab: (index: number) => void;
}

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
		vertical: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const {
			forPanel,
		} = toRefs(props);

		const kvTabContext = inject<KvTabContext>('$KvTabContext');

		const isActive = computed(() => {
			let navItems = [];
			let selectedIndex = 0;
			if (kvTabContext) {
				navItems = kvTabContext.navItems;
				selectedIndex = kvTabContext.selectedIndex;
			}
			return navItems[selectedIndex]?.forPanel === forPanel.value;
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
