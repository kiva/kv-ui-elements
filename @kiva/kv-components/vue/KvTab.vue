<template>
	<button
		:id="`kv-tab-${this.for}`"
		class="tw-text-h3 tw-mb-1.5 tw-whitespace-nowrap"
		:class="{ 'tw-text-gray-300  hover:tw-text-action-700' : !isActive }"
		role="tab"
		:aria-selected="isActive"
		:aria-controls="`kv-tab-panel-${this.for}`"
		:tabindex="isActive ? null : -1"
		@click="handleTabClicked"
	>
		<slot></slot>
	</button>
</template>

<script>
export default {
	inject: ['$KvTabContext'],
	props: {
		/**
		 * A unique id which correspondes to an `id` property on the KvTabPanel it controls
		 * e.g., <kv-tab for="foo">... <kv-tab-panel id="foo">
		 * */
		for: {
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
	computed: {
		isActive() {
			const { navItems, selectedIndex } = this.$KvTabContext;
			return navItems[selectedIndex]?.for === this.for;
		},
		index() {
			const { navItems } = this.$KvTabContext;
			return navItems?.findIndex((navItem) => navItem.for === this.for);
		},
	},
	mounted() {
		this.$KvTabContext.navItems.push(this);
	},
	methods: {
		handleTabClicked() {
			this.$KvTabContext.setTab(this.index);
		},
	},
};
</script>
