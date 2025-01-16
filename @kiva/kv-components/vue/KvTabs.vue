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
					width: ${selectedTabEl && !vertical ? selectedTabEl.clientWidth : 3}px;
					height: ${selectedTabEl && vertical ? `${selectedTabEl.clientHeight}px` : '0.25rem'};
					transform: ${selectedTabEl && !vertical ? `translateX(${selectedTabEl.offsetLeft}px)`
				: selectedTabEl ? `translateY(${selectedTabEl.offsetTop}px)` : null};
				`"
			></div>
		</div>
		<div class="tw-relative">
			<!-- @slot Tab Panels -->
			<slot name="tabPanels"></slot>
		</div>
	</div>
</template>

<script>
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
	onMounted,
	getCurrentInstance,
	onBeforeUnmount,
} from 'vue-demi';

export default {
	props: {
		vertical: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const tabContext = reactive({
			selectedIndex: 0,
			setTab: null,
			navItems: [],
		});
		const selectedTabResizeObserver = ref(null);

		const selectedTabEl = computed(() => {
			const { navItems, selectedIndex } = tabContext;
			return navItems[selectedIndex]?.$el ?? null;
		});

		const forceUpdate = () => {
			const instance = getCurrentInstance();
			if (instance) {
				instance.proxy.$forceUpdate();
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

		onMounted(() => {
			// check if any of the KvTab components are declaratively selected
			tabContext.navItems.forEach((navItem, index) => {
				if (navItem.selected) {
					setTab(index);
				}
			});

			// Tab size can change as @font-face fonts come in or
			// the screen breakpoint changes the font size. If this happens
			// we need to re-size and position the indicator bar.
			selectedTabResizeObserver.value = new ResizeObserver(() => {
				forceUpdate();
			});
			selectedTabResizeObserver.value.observe(selectedTabEl.value);
		});

		onBeforeUnmount(() => {
			selectedTabResizeObserver.value.disconnect();
		});

		return {
			handleKeyDown,
			selectedTabEl,
			tabContext,
		};
	},
};
</script>
