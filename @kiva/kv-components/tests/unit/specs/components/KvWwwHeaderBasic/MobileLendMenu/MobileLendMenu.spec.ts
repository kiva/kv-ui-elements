import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import MobileLendMenu from '#components/KvWwwHeaderBasic/MobileLendMenu/MobileLendMenu.vue';

expect.extend(toHaveNoViolations);

// KvTabs uses scrollIntoView + ResizeObserver to position its indicator; both are jsdom gaps.
Element.prototype.scrollIntoView = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

// kv-track-event directive is registered globally in the host apps; stub it so render doesn't warn.
const global = {
	provide: { $kvTrackEvent: () => {} },
	directives: { 'kv-track-event': {} },
};

const categories = [
	{ name: 'Agriculture', url: '/lend-by-category/agriculture' },
	{ name: 'Education', url: '/lend-by-category/education' },
];

const regions = [
	{ name: 'Africa', countries: [{ isoCode: 'ke', name: 'Kenya', count: 12 }] },
];

describe('MobileLendMenu', () => {
	it('has no accessibility violations', async () => {
		const { container } = render(MobileLendMenu, {
			global,
			props: { categories, regions },
		});
		expect(await axe(container)).toHaveNoViolations();
	});

	it('renders Categories, Regions, and Search tabs by default (no MyKiva when logged-out)', () => {
		const { getByRole, queryByRole } = render(MobileLendMenu, {
			global,
			props: { categories, regions },
		});
		expect(getByRole('tab', { name: 'Categories' })).toBeInTheDocument();
		expect(getByRole('tab', { name: 'Regions' })).toBeInTheDocument();
		expect(getByRole('tab', { name: 'Search' })).toBeInTheDocument();
		expect(queryByRole('tab', { name: 'MyKiva' })).toBeNull();
	});

	it('renders the MyKiva tab when a userId is supplied', () => {
		const { getByRole } = render(MobileLendMenu, {
			global,
			props: { categories, regions, userId: 1234 },
		});
		expect(getByRole('tab', { name: 'MyKiva' })).toBeInTheDocument();
	});

	it('renders the category list in the Categories panel', () => {
		const { getByText } = render(MobileLendMenu, {
			global,
			props: { categories, regions },
		});
		expect(getByText('Agriculture')).toBeInTheDocument();
		// Footer links retained for parity with KvLendListMenu.
		expect(getByText('All categories')).toBeInTheDocument();
		expect(getByText('All loans')).toBeInTheDocument();
		expect(getByText('Recommended by lenders')).toBeInTheDocument();
	});

	it('switches to the Search panel and surfaces the search input', async () => {
		const { getByRole } = render(MobileLendMenu, {
			global,
			props: { categories, regions },
		});
		await fireEvent.click(getByRole('tab', { name: 'Search' }));
		// SearchPanel embeds SearchBar; the input is a native search element.
		expect(getByRole('searchbox')).toBeInTheDocument();
	});
});
