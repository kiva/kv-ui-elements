<template>
	<div>
		<div
			role="tablist"
			class="
				tw-flex tw-overflow-auto tw-relative
				tw-gap-x-2.5 md:tw-gap-x-5 lg:tw-gap-x-6
				tw-mb-3 lg:tw-mb-4
			"
			@keydown="handleKeyDown($event)"
		>
			<!-- @slot Tab Navigation -->
			<slot name="tabNav"></slot>

			<!-- indicator bar -->
			<div
				class="
					tw-absolute tw-bottom-0 tw-h-0.5 tw-left-0
					tw-bg-primary-inverse tw-rounded-full
					tw-origin-left tw-transition-all tw-duration-300
				"
				:style="`
					width: ${selectedTabEl ? selectedTabEl.clientWidth : 0}px;
					transform: ${selectedTabEl ? `translateX(${selectedTabEl.offsetLeft}px)` : null};
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
 *    <kv-tab for="foo">Foo</kv-tab>
 *    <kv-tab for="bar">Bar</kv-tab>
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
	getCurrentInstance,
	computed,
	onMounted,
	onBeforeUnmount,
	watch,
} from 'vue-demi';
import { useTabs } from './composables/useTabs.ts';

export default {
	emits: [
		'tab-changed',
	],
	setup(props, { emit }) {
		const selectedTabResizeObserver = ref(null);
		const {
			setIndex,
			navItems,
			selectedIndex,
		} = useTabs();

		const forceUpdate = () => {
			const instance = getCurrentInstance();
			if (instance) {
				instance.proxy.$forceUpdate();
			}
		};

		const selectedTabEl = computed(() => navItems.value[selectedIndex.value]?.$el ?? null);

		const setTab = (index) => {
			// tabContext.selectedIndex = index;
			setIndex(index);
			selectedTabEl.value.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

			/**
			 * Triggers when the selected tab changes
			 *
			 * @property {number} index Index of the newly selected tab
			 */
			emit('tab-changed', index);
		};

		const handleKeyDown = (event) => {
			const focusActiveTab = () => {
				const activeTab = navItems.value
					.find((navItem) => navItem.isActive);
				if (activeTab) {
					activeTab.$el?.focus();
				}
			};
			const count = navItems.value.length;

			if (event && event.key === 'ArrowRight') {
				event.preventDefault();
				const nextIndex = (selectedIndex.value + 1) % count;
				setTab(nextIndex);
				focusActiveTab();
			}

			if (event && event.key === 'ArrowLeft') {
				event.preventDefault();
				const prevIndex = (selectedIndex.value - 1 + count) % count;
				setTab(prevIndex);
				focusActiveTab();
			}

			if (event && event.key === 'Home') {
				event.preventDefault();
				setTab(0);
				focusActiveTab();
			}

			if (event && event.key === 'End') {
				event.preventDefault();
				setTab(count - 1);
				focusActiveTab();
			}
		};

		onMounted(() => {
			// check if any of the KvTab components are declaratively selected
			navItems.value.forEach((navItem, index) => {
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

			if (selectedTabEl.value) {
				selectedTabResizeObserver.value.observe(selectedTabEl.value);
			}
		});

		onBeforeUnmount(() => {
			selectedTabResizeObserver.value.disconnect();
		});

		watch(selectedIndex, () => {
			console.log(selectedIndex.value);
		});

		return {
			handleKeyDown,
			selectedTabEl,
		};
	},
};
</script>
