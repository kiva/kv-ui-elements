import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import SearchPanel from '#components/KvWwwHeaderBasic/MobileLendMenu/SearchPanel.vue';

expect.extend(toHaveNoViolations);

const global = { provide: { $kvTrackEvent: () => {} } };

describe('SearchPanel', () => {
	it('has no accessibility violations', async () => {
		const { container } = render(SearchPanel, { global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('forwards SearchBar load-search-data on first focus', async () => {
		const { emitted, getByRole } = render(SearchPanel, { global });
		await fireEvent.focus(getByRole('searchbox'));
		expect(emitted()['load-search-data']).toBeTruthy();
	});

	it('forwards SearchBar search-submit with a queryString payload on free-text enter', async () => {
		const { emitted, getByRole } = render(SearchPanel, { global });
		const input = getByRole('searchbox');
		await fireEvent.update(input, 'coffee');
		await fireEvent.keyDown(input, { key: 'Enter' });
		const payload = emitted()['search-submit'][0][0] as { query: Record<string, string> };
		expect(payload.query).toEqual({ queryString: 'coffee' });
	});
});
