<template>
	<div :class="vertical ? 'md:tw-flex' : ''">
		<div
			role="tablist"
			class="
				tw-flex tw-overflow-auto tw-relative
				tw-gap-x-2.5 md:tw-gap-x-5 lg:tw-gap-x-6
				tw-mb-3 lg:tw-mb-4
			"
			:class="{'md:tw-flex-col md:tw-mr-3' : vertical}"
			@keydown="handleKeyDown($event)"
		>
			<!-- @slot Tab Navigation -->
			<slot
				name="tabNav"
			></slot>

			<!-- indicator bar -->
			<div
				class="
					tw-absolute tw-bottom-0 tw-h-0.5 tw-left-0
					tw-bg-primary-inverse tw-rounded-full
					tw-origin-left tw-transition-all tw-duration-300
				"
				:class="{ 'tw-hidden md:tw-block tw-top-0 md:tw-bg-action' : vertical}"
				:style="`
					width: ${indicatorStyle.width}px;
					height: ${indicatorStyle.height};
					transform: ${indicatorStyle.transform};
				`"
			></div>
		</div>
		<div class="tw-relative">
			<!-- @slot Tab Panels -->
			<slot name="tabPanels"></slot>
		</div>
	</div>
</template>

<script lang="ts">
/**
 * Components for implementing a tab UI pattern. Requires KvTab and KvTabPanel components.
 *
 * Keyboard navigation and aria roles + attributes handled according to
 * https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html
 *
 * Usage:
 *
 * ```
 *  <kv-tabs>
 *   <template #tabNav>
 *    <kv-tab for-panel="foo">Foo</kv-tab>
 *    <kv-tab for-panel="bar">Bar</kv-tab>
 *   </template>
 *   <template #tabPanels>
 *    <kv-tab-panel id="foo">Foo content</kv-tab-panel>
 *    <kv-tab-panel id="bar">Bar content</kv-tab-panel>
 *   </template>
 *  </kv-tabs>
 * ```
 */
import {
	ref,
	reactive,
	provide,
	computed,
	watch,
	nextTick,
	onMounted,
	onBeforeUnmount,
	type ComponentPublicInstance,
} from 'vue';

interface TabNavItem extends ComponentPublicInstance {
	forPanel?: string;
	isActive?: boolean;
	selected?: boolean;
}

interface TabContext {
	selectedIndex: number;
	// eslint-disable-next-line no-unused-vars
	setTab: ((index: number) => void) | null;
	navItems: TabNavItem[];
}

export default {
	props: {
		vertical: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const tabContext: TabContext = reactive({
			selectedIndex: 0,
			setTab: null,
			navItems: [],
		});
		const selectedTabResizeObserver = ref<ResizeObserver | null>(null);

		const selectedTabEl = computed(() => {
			const { navItems, selectedIndex } = tabContext;
			return navItems[selectedIndex]?.$el ?? null;
		});

		const indicatorStyle = reactive({
			width: 3,
			height: '0.25rem',
			transform: '',
		});

		const updateIndicator = () => {
			const el = selectedTabEl.value;
			if (!el) return;
			if (!props.vertical) {
				indicatorStyle.width = el.clientWidth;
				indicatorStyle.height = '0.25rem';
				indicatorStyle.transform = `translateX(${el.offsetLeft}px)`;
			} else {
				indicatorStyle.width = 3;
				indicatorStyle.height = `${el.clientHeight}px`;
				indicatorStyle.transform = `translateY(${el.offsetTop}px)`;
			}
		};

		const setTab = (index) => {
			tabContext.selectedIndex = index;
			selectedTabEl.value.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

			/**
			 * Triggers when the selected tab changes
			 *
			 * @property {number} index Index of the newly selected tab
			 */
			emit('tab-changed', index);
		};

		tabContext.setTab = setTab; // setTab definition in tab context
		provide('$KvTabContext', tabContext);

		const handleKeyDown = (event) => {
			const { navItems, selectedIndex } = tabContext;

			const focusActiveTab = () => {
				const activeTab = navItems
					.find((navItem) => navItem.isActive);
				if (activeTab) {
					activeTab.$el?.focus();
				}
			};
			const count = navItems.length;

			if (event.key === 'ArrowRight') {
				event.preventDefault();
				const nextIndex = (selectedIndex + 1) % count;
				setTab(nextIndex);
				focusActiveTab();
			}

			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				const prevIndex = (selectedIndex - 1 + count) % count;
				setTab(prevIndex);
				focusActiveTab();
			}

			if (event.key === 'Home') {
				event.preventDefault();
				setTab(0);
				focusActiveTab();
			}

			if (event.key === 'End') {
				event.preventDefault();
				setTab(count - 1);
				focusActiveTab();
			}
		};

		// Tab size can change as @font-face fonts come in or
		// the screen breakpoint changes the font size. If this happens
		// we need to re-size and position the indicator bar.
		const observeSelectedTab = () => {
			selectedTabResizeObserver.value?.disconnect();
			if (selectedTabEl.value) {
				selectedTabResizeObserver.value = new ResizeObserver(() => {
					updateIndicator();
				});
				selectedTabResizeObserver.value.observe(selectedTabEl.value);
			}
		};

		watch(selectedTabEl, () => {
			observeSelectedTab();
			nextTick(updateIndicator);
		});

		onMounted(() => {
			// check if any of the KvTab components are declaratively selected
			tabContext.navItems.forEach((navItem, index) => {
				if (navItem.selected) {
					setTab(index);
				}
			});

			updateIndicator();
			observeSelectedTab();
			window.addEventListener('resize', updateIndicator);
		});

		onBeforeUnmount(() => {
			selectedTabResizeObserver.value?.disconnect();
			window.removeEventListener('resize', updateIndicator);
		});

		return {
			handleKeyDown,
			indicatorStyle,
			tabContext,
		};
	},
};
</script>
