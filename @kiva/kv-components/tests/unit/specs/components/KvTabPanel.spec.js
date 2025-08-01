import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import '../../../../__mocks__/ResizeObserver';
import KvTab from '#components/KvTab.vue';
import KvTabPanel from '#components/KvTabPanel.vue';
import KvTabs from '#components/KvTabs.vue';

describe('KvTabPanel', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render({
			components: { KvTabs, KvTab, KvTabPanel },
			template: `
				<kv-tabs>
					<template #tabNav>
						<kv-tab forPanel="demo-1-first">First</kv-tab>
						<kv-tab forPanel="demo-1-second">Second</kv-tab>
						<kv-tab forPanel="demo-1-third">Third</kv-tab>
						<kv-tab forPanel="demo-1-forth">Fourth is longer</kv-tab>
					</template>
					<template #tabPanels>
						<kv-tab-panel id="demo-1-first"><p>First Panel</p></kv-tab-panel>
						<kv-tab-panel id="demo-1-second"><p>Second Panel has <br>longer<br>content</p></kv-tab-panel>
						<kv-tab-panel id="demo-1-third"><p>Third Panel</p></kv-tab-panel>
						<kv-tab-panel id="demo-1-forth"><p>Fourth Panel</p></kv-tab-panel>
					</template>
				</kv-tabs>
			`,
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
