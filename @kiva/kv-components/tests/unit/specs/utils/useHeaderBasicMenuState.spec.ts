import { useHeaderBasicMenuState } from '#utils/useHeaderBasicMenuState';

jest.useFakeTimers();

describe('useHeaderBasicMenuState', () => {
	it('opens a menu when a component is provided', () => {
		const {
			menuOpen, menuComponent, setMenu, markMounted,
		} = useHeaderBasicMenuState();
		markMounted();
		setMenu('aboutMenu', { name: 'AboutMenu' });
		jest.advanceTimersByTime(150);
		expect(menuOpen.value).toBe(true);
		expect(menuComponent.value).toEqual({ name: 'AboutMenu' });
	});

	it('closes the menu when called with no component', () => {
		const { menuOpen, setMenu, markMounted } = useHeaderBasicMenuState();
		markMounted();
		setMenu('aboutMenu', { name: 'AboutMenu' });
		jest.advanceTimersByTime(150);
		setMenu();
		jest.advanceTimersByTime(150);
		expect(menuOpen.value).toBe(false);
	});
});
