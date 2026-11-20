import { render, fireEvent } from '@testing-library/vue';
import SearchBar from '#components/KvWwwHeaderBasic/SearchBar.vue';

const global = { provide: { $kvTrackEvent: () => {} } };

describe('SearchBar', () => {
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
