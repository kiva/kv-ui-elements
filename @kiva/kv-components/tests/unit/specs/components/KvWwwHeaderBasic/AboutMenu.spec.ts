import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import AboutMenu from '#components/KvWwwHeaderBasic/AboutMenu.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

describe('AboutMenu', () => {
	it('has no accessibility violations', async () => {
		const { container } = render(AboutMenu, { global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('renders About links as a navigation list', () => {
		const { getAllByRole } = render(AboutMenu, { global });
		expect(getAllByRole('link').length).toBeGreaterThan(0);
	});
});
