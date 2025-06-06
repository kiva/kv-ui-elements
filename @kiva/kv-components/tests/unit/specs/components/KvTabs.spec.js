import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import '../../../../__mocks__/ResizeObserver';
import KvTab from '#components/KvTab.vue';
import KvTabPanel from '#components/KvTabPanel.vue';
import KvTabs from '#components/KvTabs.vue';
import KvButton from '#components/KvButton.vue';
import addVueRouter from '../../utils/addVueRouter';

// jsdom does not include scrollIntoView, so define it to avoid errors when switching tabs
window.HTMLElement.prototype.scrollIntoView = () => {};

function renderOneTabSet() {
	return render({
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
}
describe('KvTabs', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = renderOneTabSet();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('renders with a role of "tablist", "tab", & "tabpanel"', async () => {
		const { getByRole, getAllByRole } = renderOneTabSet();
		expect(getByRole('tablist')).toBeDefined();
		expect(getAllByRole('tab').length).toBe(4);
		// expect(getByRole('tabpanel')).toBeDefined(); // TODO: make sure first panel reveals itself
	});

	// TODO: it renders with the first slide active by default

	it('switches between tab panels when tabs are clicked', async () => {
		const { getByText } = renderOneTabSet();

		// Click third tab and expect the third panel to be visible
		await fireEvent.click(getByText('Third'));
		expect(getByText('First Panel')).not.toBeVisible();
		expect(getByText('Third Panel')).toBeVisible();

		// Click first tab and expect the first panel to be visible
		await fireEvent.click(getByText('First'));
		expect(getByText('First Panel')).toBeVisible();
		expect(getByText('Third Panel')).not.toBeVisible();
	});

	it('switches between tab panels when the left and right arrows are pressed', async () => {
		const { findByText } = renderOneTabSet();

		// Focus on the first tab
		const firstTab = await findByText('First');
		firstTab.focus();

		// Press arrow right twice and expect the third tab panel to be visible
		userEvent.keyboard('{ArrowRight}{ArrowRight}');
		expect(await findByText('Third Panel')).toBeVisible();

		// Press arrow left once and expect the second tab panel to be visible
		userEvent.keyboard('{ArrowLeft}');
		expect(await findByText('Second Panel', { exact: false })).toBeVisible();
	});

	it('goes to first panel when home key is pressed and last panel when end key is pressed', async () => {
		const { findByText } = renderOneTabSet();

		// Focus on the first tab
		const firstTab = await findByText('First');
		firstTab.focus();

		// Press arrow right once and expect the second tab panel to be visible
		userEvent.keyboard('{ArrowRight}');
		expect(await findByText('Second Panel', { exact: false })).toBeVisible();

		// Press end key and expect the fourth panel to be visible
		userEvent.keyboard('{End}');
		expect(await findByText('Fourth Panel')).toBeVisible();

		// Press home key and expect the first panel to be visible
		userEvent.keyboard('{Home}');
		expect(await findByText('First Panel')).toBeVisible();
	});

	it('verifies setTab method when called by a ref', async () => {
		const {
			getByRole,
			getAllByRole,
			getByText,
		} = render({
			components: {
				KvTabs,
				KvTab,
				KvTabPanel,
				KvButton,
			},
			data() {
				return { selectedIndexCheck: null };
			},
			template: `
				<div data-testid="tabContainer">
					<kv-tabs @tab-changed="handleTabChanged" data-testid="tabInstance" ref="tabsRef">
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
					<kv-button @click.native.prevent="setTabButtonClick(1)" role="tabSetButton">Set Tab</kv-button>
					<p>Tab index is {{ selectedIndexCheck }}</p>
				</div>
			`,
			methods: {
				handleTabChanged() {
					this.selectedIndexCheck = this?.$refs?.tabsRef?.tabContext?.selectedIndex;
				},
				setTabButtonClick() {
					this?.$refs?.tabsRef?.tabContext?.setTab(0);
				},
			},
		}, addVueRouter());

		// check for our elements
		expect(getByRole('tabSetButton')).toBeDefined();
		expect(getByRole('tablist')).toBeDefined();
		expect(getAllByRole('tab').length).toBe(4);

		// Click third tab and expect the third panel to be visible
		await fireEvent.click(getByText('Third'));
		expect(getByText('First Panel')).not.toBeVisible();
		expect(getByText('Third Panel')).toBeVisible();
		// Test access and updating of property ref
		// expect the selected index value to be set to our new tab index
		expect(getByText('Tab index is 2')).toBeVisible();

		// click the button to test our ref method
		await userEvent.click(getByText('Set Tab'));
		expect(getByText('Third Panel')).not.toBeVisible();
		expect(getByText('First Panel')).toBeVisible();
		// Test access and updating of property ref
		// expect the selected index value to be set to our new tab index
		expect(getByText('Tab index is 0')).toBeVisible();
	});
});
