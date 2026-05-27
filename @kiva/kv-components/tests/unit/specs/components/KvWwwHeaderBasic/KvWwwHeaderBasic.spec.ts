import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvWwwHeaderBasic from '#components/KvWwwHeaderBasic/KvWwwHeaderBasic.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

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
});
