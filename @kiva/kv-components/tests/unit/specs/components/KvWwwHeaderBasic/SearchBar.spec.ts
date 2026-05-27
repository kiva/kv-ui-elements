import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import SearchBar from '#components/KvWwwHeaderBasic/SearchBar.vue';

expect.extend(toHaveNoViolations);

const global = { provide: { $kvTrackEvent: () => {} } };

describe('SearchBar', () => {
	it('has no accessibility violations', async () => {
		const { container } = render(SearchBar, { global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('emits load-search-data on first focus', async () => {
		const { emitted, getByRole } = render(SearchBar, { global });
		await fireEvent.focus(getByRole('searchbox'));
		expect(emitted()['load-search-data']).toBeTruthy();
	});

	it('emits search-submit with a queryString payload on free-text enter', async () => {
		const { emitted, getByRole } = render(SearchBar, { global });
		const input = getByRole('searchbox');
		await fireEvent.update(input, 'coffee');
		await fireEvent.keyDown(input, { key: 'Enter' });
		const payload = emitted()['search-submit'][0][0] as any;
		expect(payload.query).toEqual({ queryString: 'coffee' });
	});
});
