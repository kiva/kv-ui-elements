import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyKivaMenu from '#components/KvWwwHeaderBasic/MyKivaMenu.vue';

expect.extend(toHaveNoViolations);

function renderMenu(props = {}, track = () => {}) {
	return render(MyKivaMenu, {
		props: { loggedIn: true, myDashboardUrl: '/mykiva', ...props },
		global: { provide: { $kvTrackEvent: track } },
	});
}

describe('MyKivaMenu', () => {
	it('has no accessibility violations', async () => {
		const { container } = renderMenu({
			isBorrower: true, isTrustee: true, trusteeId: 77, mostRecentBorrowedLoanId: 123,
		});
		expect(await axe(container)).toHaveNoViolations();
	});

	it('links to the dashboard url', () => {
		const { getByText } = renderMenu();
		expect(getByText('My Dashboard').getAttribute('href')).toBe('/mykiva');
	});

	it('renders the borrower block with loan links when a borrowed loan id is present', () => {
		const { getByRole } = renderMenu({ isBorrower: true, mostRecentBorrowedLoanId: 123 });
		expect(getByRole('link', { name: 'My borrower dashboard' }).getAttribute('href')).toBe('/my/borrower');
		expect(getByRole('link', { name: 'My loan page' }).getAttribute('href')).toBe('/lend/123');
		expect(getByRole('link', { name: 'My conversations' }).getAttribute('href'))
			.toBe('/lend-classic/123#loanComments');
	});

	it('hides loan + conversations links when no borrowed loan id', () => {
		const { getByRole, queryByRole } = renderMenu({ isBorrower: true, mostRecentBorrowedLoanId: null });
		expect(getByRole('link', { name: 'My borrower dashboard' })).toBeTruthy();
		expect(queryByRole('link', { name: 'My loan page' })).toBeNull();
		expect(queryByRole('link', { name: 'My conversations' })).toBeNull();
	});

	it('renders the full trustee block for a trustee who is not a borrower', () => {
		const { getByRole } = renderMenu({ isTrustee: true, trusteeId: 77 });
		expect(getByRole('link', { name: 'My Trustee loans' }).getAttribute('href'))
			.toBe('/lend?trustee=77&status=fundraising&sortBy=newest');
		expect(getByRole('link', { name: 'My public Trustee page' }).getAttribute('href')).toBe('/trustees/77');
		expect(getByRole('link', { name: 'My Trustee dashboard' }).getAttribute('href')).toBe('/my/trustee');
	});

	it('hides trustee loans + public page when the user is also a borrower, keeps the trustee dashboard', () => {
		const { getByRole, queryByRole } = renderMenu({
			isBorrower: true, isTrustee: true, trusteeId: 77, mostRecentBorrowedLoanId: 123,
		});
		expect(queryByRole('link', { name: 'My Trustee loans' })).toBeNull();
		expect(queryByRole('link', { name: 'My public Trustee page' })).toBeNull();
		expect(getByRole('link', { name: 'My Trustee dashboard' })).toBeTruthy();
		expect(getByRole('link', { name: 'My borrower dashboard' })).toBeTruthy();
	});

	it('renders no borrower or trustee links for a plain logged-in lender', () => {
		const { queryByRole } = renderMenu();
		expect(queryByRole('link', { name: 'My borrower dashboard' })).toBeNull();
		expect(queryByRole('link', { name: 'My Trustee dashboard' })).toBeNull();
		expect(queryByRole('link', { name: 'My Trustee loans' })).toBeNull();
	});

	it('tracks the legacy event label and closes the menu on link click', async () => {
		const track = jest.fn();
		const { getByRole, emitted } = renderMenu({ isBorrower: true, mostRecentBorrowedLoanId: 123 }, track);
		await fireEvent.click(getByRole('link', { name: 'My loan page' }));
		expect(track).toHaveBeenCalledWith('TopNav', 'click-Portfolio-My loan page');
		expect(emitted()['closing-menu']).toBeTruthy();
	});
});
