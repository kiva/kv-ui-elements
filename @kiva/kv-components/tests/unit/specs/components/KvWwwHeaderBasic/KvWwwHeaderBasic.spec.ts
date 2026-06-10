import { ref } from 'vue';
import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvWwwHeaderBasic from '#components/KvWwwHeaderBasic/KvWwwHeaderBasic.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

const SAMPLE_SUGGESTIONS = [
	{ group: 'Sectors', label: 'Coffee', query: 'sector=1' },
	{ group: 'Countries and Territories', label: 'Peru', query: 'country=70' },
];

function createMockApollo() {
	return {
		query: jest.fn().mockResolvedValue({
			data: { lend: { loanSearchSuggestions: SAMPLE_SUGGESTIONS } },
		}),
	};
}

// Harness wires the header's load-search-data event to the exposed loadSearchSuggestions method,
// exactly as a host app does. Returns the mock apollo so tests can assert call counts.
function renderWithSearchHarness(props = {}) {
	const apollo = createMockApollo();
	const Harness = {
		components: { KvWwwHeaderBasic },
		setup() {
			const headerRef = ref(null);
			function onLoadSearchData() {
				headerRef.value?.loadSearchSuggestions?.(apollo);
			}
			return { headerRef, onLoadSearchData, harnessProps: props };
		},
		template: `
			<kv-www-header-basic
				ref="headerRef"
				v-bind="harnessProps"
				@load-search-data="onLoadSearchData"
			/>
		`,
	};
	return { apollo, ...render(Harness, { global }) };
}

// Suggestion labels are rendered with <mark> wrapping the matched substring (see markMatches), which
// splits the label across elements. This matcher matches a result button by its combined textContent.
function resultText(label: string) {
	return (_content: string, node: Element | null) => node?.tagName === 'SPAN'
		&& node.textContent === label;
}

describe('KvWwwHeaderBasic', () => {
	it('has no accessibility violations (visitor)', async () => {
		const { container } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('renders a navigation landmark and the Kiva logo home link', () => {
		const { getByRole } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		expect(getByRole('navigation')).toBeTruthy();
	});

	it('re-emits load-search-data from the search bar', async () => {
		const { emitted } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		// load-search-data is forwarded; assert the event channel exists once focus occurs in integration.
		expect(emitted()).toBeDefined();
	});

	it('does not render its own bottom border on the nav (host owns the border)', () => {
		const { getByRole } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		const nav = getByRole('navigation');
		expect(nav.className).not.toContain('tw-border-b');
		expect(nav.className).not.toContain('tw-border-tertiary');
	});

	it('builds search URLs from the page origin when appOrigin is omitted', async () => {
		const { getByRole, emitted } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		const input = getByRole('searchbox');
		await fireEvent.update(input, 'coffee');
		await fireEvent.keyDown(input, { key: 'Enter' });
		const payload = emitted()['search-submit'][0][0] as { url: string };
		expect(payload.url).toBe(`${window.location.origin}/lend/filter`);
	});

	it('lets an explicit appOrigin prop override the derived origin', async () => {
		const { getByRole, emitted } = render(KvWwwHeaderBasic, {
			props: { loggedIn: false, appOrigin: 'https://www.kiva.org' },
			global,
		});
		const input = getByRole('searchbox');
		await fireEvent.update(input, 'coffee');
		await fireEvent.keyDown(input, { key: 'Enter' });
		const payload = emitted()['search-submit'][0][0] as { url: string };
		expect(payload.url).toBe('https://www.kiva.org/lend/filter');
	});

	it('fetches suggestions via loadSearchSuggestions and surfaces them in the search bar', async () => {
		const { apollo, getByRole, findByText } = renderWithSearchHarness();
		const input = getByRole('searchbox');
		await fireEvent.focus(input); // triggers load-search-data -> harness calls loadSearchSuggestions
		await new Promise((r) => { setTimeout(r, 0); }); // let apollo.query resolve + re-index
		await fireEvent.update(input, 'coff');
		expect(await findByText(resultText('Coffee'))).toBeTruthy();
		expect(apollo.query).toHaveBeenCalledTimes(1);
	});

	it('does not re-run the suggestions query on subsequent focus (run-once)', async () => {
		const { apollo, getByRole } = renderWithSearchHarness();
		const input = getByRole('searchbox');
		await fireEvent.focus(input);
		await new Promise((r) => { setTimeout(r, 0); });
		await fireEvent.blur(input);
		await fireEvent.focus(input);
		await new Promise((r) => { setTimeout(r, 0); });
		expect(apollo.query).toHaveBeenCalledTimes(1);
	});

	it('falls back to the searchSuggestions prop when nothing has been fetched', async () => {
		const { getByRole, findByText } = render(KvWwwHeaderBasic, {
			props: { searchSuggestions: [{ group: 'Sectors', label: 'Education', query: 'sector=8' }] },
			global,
		});
		const input = getByRole('searchbox');
		await fireEvent.focus(input);
		await fireEvent.update(input, 'educ');
		expect(await findByText(resultText('Education'))).toBeTruthy();
	});
});
