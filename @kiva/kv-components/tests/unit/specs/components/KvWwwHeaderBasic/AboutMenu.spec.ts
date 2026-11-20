import { render } from '@testing-library/vue';
import AboutMenu from '#components/KvWwwHeaderBasic/AboutMenu.vue';

const global = { provide: { $kvTrackEvent: () => {} } };

describe('AboutMenu', () => {
	it('renders About links as a navigation list', () => {
		const { getAllByRole } = render(AboutMenu, { global });
		expect(getAllByRole('link').length).toBeGreaterThan(0);
	});

	it('does not include "Partner with us" (now a top-level nav link)', () => {
		const { queryByText } = render(AboutMenu, { global });
		expect(queryByText('Partner with us')).toBeNull();
	});
});
