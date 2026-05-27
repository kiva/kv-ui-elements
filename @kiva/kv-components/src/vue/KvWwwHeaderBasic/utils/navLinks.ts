export interface NavLink {
	id: string;
	label: string;
	href: string;
	track: [string, string];
	// 'always' shows for everyone; 'visitor' only when logged out; 'loggedIn' only when logged in.
	visibility: 'always' | 'visitor' | 'loggedIn';
}

// Top-level text links in the desktop bar (Lend/About are dropdowns; Support Kiva is a button — handled separately).
export const PRIMARY_LINKS: NavLink[] = [
	{
		id: 'partner',
		label: 'Partner',
		href: '/about/partner-with-us',
		track: ['TopNav', 'click-Partner'],
		visibility: 'always',
	},
	{
		id: 'borrow',
		label: 'Borrow',
		href: '/borrow',
		track: ['TopNav', 'click-Borrow'],
		visibility: 'visitor',
	},
];
