import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import MobileMenu from '#components/KvWwwHeaderBasic/MobileMenu.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

describe('MobileMenu', () => {
	it('has no accessibility violations', async () => {
		const { container } = render(MobileMenu, { global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('renders Partner, Support Kiva and Borrow links', () => {
		// Exact text: the reused AboutMenu also contains a "Partner with us" link, so /partner/i is ambiguous.
		const { getByText } = render(MobileMenu, { global });
		expect(getByText('Partner').getAttribute('href')).toBe('/about/partner-with-us');
		expect(getByText('Support Kiva').getAttribute('href')).toBe('/donate/supportus');
		expect(getByText('Borrow').getAttribute('href')).toBe('/borrow');
	});

	it('emits closing-menu when the close button is clicked', async () => {
		const { emitted, getByRole } = render(MobileMenu, { global });
		await fireEvent.click(getByRole('button', { name: /close/i }));
		expect(emitted()['closing-menu']).toBeTruthy();
	});
});
