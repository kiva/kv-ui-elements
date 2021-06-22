<template>
	<div>
		<div
			role="tablist"
			class="
				tw-flex tw-overflow-auto tw-relative
				tw-gap-x-2.5 md:tw-gap-x-5 lg:tw-gap-x-6
				tw-mb-3 lg:tw-mb-4
			"
			@keydown="handleKeyDown"
		>
			<!-- @slot Tab Navigation -->
			<slot name="tabNav"></slot>

			<!-- indicator bar -->
			<div
				class="
					tw-absolute tw-bottom-0 tw-h-0.5 tw-left-0
					tw-origin-left tw-transition-all tw-bg-gray-800 tw-duration-300
				"
				:style="`
					width: 1px;
					transform: ${getIndicatorTransform()};
				`"
			></div>
		</div>
		<div class="tw-relative">
			<!-- @slot Tab Content -->
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
export default {
	provide() {
		return {
			// Since KvTab and KvTabPanel are tightly coupled to this component we provide
			// them with a shared context for setting and reading the state of our tabs
			$KvTabContext: this.tabContext,
		};
	},
	data() {
		return {
			tabContext: {
				selectedIndex: 0,
				setTab: this.setTab,
				navItems: [], // populated by KvTab
			},
			selectedTabResizeObserver: null,
		};
	},
	computed: {
		selectedTabEl() {
			const { navItems, selectedIndex } = this.tabContext;
			return navItems[selectedIndex]?.$el ?? null;
		},
	},
	mounted() {
		// check if any of the KvTab components are declaratively selected
		this.tabContext.navItems.forEach((navItem, index) => {
			if (navItem.selected) {
				this.setTab(index);
			}
		});

		// Tab size can change as @font-face fonts come in or
		// the screen breakpoint changes the font size. If this happens
		// we need to re-size and position the indicator bar.
		this.selectedTabResizeObserver = new ResizeObserver(() => {
			this.$forceUpdate();
		});
		this.selectedTabResizeObserver.observe(this.selectedTabEl);
	},
	beforeDestroy() {
		this.selectedTabResizeObserver.disconnect();
	},
	methods: {
		setTab(index) {
			this.tabContext.selectedIndex = index;
			/**
			 * Triggers when the selected tab changes
			 *
			 * @property {number} index Index of the newly selected tab
			 */
			this.$emit('tab-changed', index);
		},
		handleKeyDown(event) {
			const { navItems, selectedIndex } = this.tabContext;

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
				this.setTab(nextIndex);
				focusActiveTab();
			}

			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				const prevIndex = (selectedIndex - 1 + count) % count;
				this.setTab(prevIndex);
				focusActiveTab();
			}

			if (event.key === 'Home') {
				event.preventDefault();
				this.setTab(0);
				focusActiveTab();
			}

			if (event.key === 'End') {
				event.preventDefault();
				this.setTab(count - 1);
				focusActiveTab();
			}
		},
		getIndicatorTransform() {
			const selectedTabWidth = this.selectedTabEl?.clientWidth;
			const selectedTabOffsetLeft = this.selectedTabEl?.offsetLeft;
			if (selectedTabWidth) {
				return `scaleX(${selectedTabWidth}) translateX(${selectedTabOffsetLeft / selectedTabWidth}px)`;
			}
			return 'scaleX(0)';
		},
	},
};
</script>
