import KvTabs from '../KvTabs.vue';
import KvTab from '../KvTab.vue';
import KvTabPanel from '../KvTabPanel.vue';

export default {
	title: 'KvTabs',
	component: KvTabs,
};

export const DefaultTemplate = () => ({
	components: { KvTabs, KvTab, KvTabPanel },
	template: `
		<kv-tabs @tab-changed="handleTabChanged">
			<template #tabNav>
				<kv-tab for="demo-1-first">First</kv-tab>
				<kv-tab for="demo-1-second">Second</kv-tab>
				<kv-tab for="demo-1-third">Third</kv-tab>
				<kv-tab for="demo-1-forth">Forth is longer</kv-tab>
			</template>
			<template #tabPanels>
				<kv-tab-panel id="demo-1-first"><p>First Panel</p></kv-tab-panel>
				<kv-tab-panel id="demo-1-second"><p>Second Panel has <br>longer<br>content</p></kv-tab-panel>
				<kv-tab-panel id="demo-1-third"><p>Third Panel</p></kv-tab-panel>
				<kv-tab-panel id="demo-1-forth"><p>Forth Panel</p></kv-tab-panel>
			</template>
		</kv-tabs>
	`,
	methods: {
		handleTabChanged(index) {
			console.log(index);
		},
	},
});

export const InitialTabSelection = () => ({
	components: { KvTabs, KvTab, KvTabPanel },
	template: `
		<kv-tabs @tab-changed="handleTabChanged">
			<template #tabNav>
				<kv-tab for="demo-2-first">First tab name</kv-tab>
				<kv-tab for="demo-2-second" :selected="true">Second is initially selected</kv-tab>
				<kv-tab for="demo-2-third">Third tab name</kv-tab>
				<kv-tab for="demo-2-forth">Forth tab name is quite long</kv-tab>
			</template>
			<template #tabPanels>
				<kv-tab-panel id="demo-2-first"><p>First Panel</p></kv-tab-panel>
				<kv-tab-panel id="demo-2-second"><p>Second Panel has <br>longer<br>content</p></kv-tab-panel>
				<kv-tab-panel id="demo-2-third"><p>Third Panel</p></kv-tab-panel>
				<kv-tab-panel id="demo-2-forth"><p>Forth Panel</p></kv-tab-panel>
			</template>
		</kv-tabs>
	`,
	methods: {
		handleTabChanged(index) {
			console.log(index);
		},
	},
});

export const MultipleOnAPage = () => ({
	components: { KvTabs, KvTab, KvTabPanel },
	template: `
		<div>
			<div class="tw-mb-8">
				${DefaultTemplate().template}
			</div>
			<div class="tw-mb-8">
				${InitialTabSelection().template}
			</div>
		</div>
	`,
	methods: {
		handleTabChanged(index) {
			console.log(index);
		},
	},
});
