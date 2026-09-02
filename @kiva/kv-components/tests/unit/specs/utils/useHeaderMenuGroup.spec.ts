import { ref, shallowRef, nextTick } from 'vue';
import userEvent from '@testing-library/user-event';
import { useHeaderMenuGroup } from '#utils/useHeaderMenuGroup';
import { useHeaderMenuState } from '#utils/useHeaderMenuState';
import type { HeaderMenuPlacement } from '#utils/useHeaderMenuPlacement';
import type { PointerType } from '#utils/usePointerType';
import { MENU_OPEN_DELAY_MS } from '#utils/headerMenuTiming';
import withSetup from '../../utils/withSetup';

// Builds a group root holding one trigger button and one panel link, attached to the document.
function attachGroup(): { root: HTMLElement; trigger: HTMLElement; panelLink: HTMLElement } {
	const root = document.createElement('div');
	const trigger = document.createElement('button');
	trigger.setAttribute('aria-expanded', 'false');
	const panelLink = document.createElement('a');
	root.append(trigger, panelLink);
	document.body.appendChild(root);
	return { root, trigger, panelLink };
}

function pointerEnter(pointerType = 'mouse'): PointerEvent {
	const event = new Event('pointerenter');
	Object.defineProperty(event, 'pointerType', { value: pointerType });
	return event as PointerEvent;
}

function mountGroup(
	panelId: string,
	menus = useHeaderMenuState(ref<PointerType | null>('mouse')),
	placement: HeaderMenuPlacement | null = null,
) {
	const dom = attachGroup();
	const mounted = withSetup(() => useHeaderMenuGroup({
		panelId: ref(panelId), rootRef: shallowRef(dom.root), menus, placement,
	}));
	return {
		...dom, ...mounted, group: mounted.result, menus,
	};
}

describe('useHeaderMenuGroup', () => {
	afterEach(() => {
		jest.useRealTimers();
		document.body.innerHTML = '';
	});

	it('toggle marks the group toggled in the shared state and approached', () => {
		const { group, menus } = mountGroup('panel-a');
		expect(group.toggled.value).toBe(false);
		expect(group.approached.value).toBe(false);
		group.toggle();
		expect(menus.toggledId.value).toBe('panel-a');
		expect(group.toggled.value).toBe(true);
		expect(group.approached.value).toBe(true);
		group.toggle();
		expect(group.toggled.value).toBe(false);
	});

	it('close only clears the shared state when this group is the toggled one', () => {
		const menus = useHeaderMenuState(ref<PointerType | null>('mouse'));
		const a = mountGroup('panel-a', menus);
		const b = mountGroup('panel-b', menus);
		a.group.toggle();
		b.group.close();
		expect(menus.toggledId.value).toBe('panel-a');
		a.group.close();
		expect(menus.toggledId.value).toBeNull();
	});

	it('exposes trigger attributes that toggle on click', () => {
		const { group } = mountGroup('panel-a');
		expect(group.trigger.value['aria-expanded']).toBe(false);
		expect(group.trigger.value['aria-controls']).toBe('panel-a');
		group.trigger.value.onClick(new MouseEvent('click'));
		expect(group.trigger.value['aria-expanded']).toBe(true);
		group.trigger.value.onClick(new MouseEvent('click'));
		expect(group.trigger.value['aria-expanded']).toBe(false);
	});

	it('toggle from a link prevents the navigation and toggles for a touch pointer', async () => {
		const pointerType = ref<PointerType | null>('touch');
		const { group, root } = mountGroup('panel-a', useHeaderMenuState(pointerType));
		const link = document.createElement('a');
		link.href = '/lend-by-category';
		root.appendChild(link);
		const clicks: MouseEvent[] = [];
		link.addEventListener('click', group.toggle);
		document.addEventListener('click', (event) => clicks.push(event as MouseEvent));
		await userEvent.setup().pointer({ keys: '[TouchA]', target: link });
		expect(clicks[0].defaultPrevented).toBe(true);
		expect(group.toggled.value).toBe(true);
	});

	it('toggle from a link does nothing for a mouse pointer so the link navigates', async () => {
		const { group, root } = mountGroup('panel-a');
		const link = document.createElement('a');
		link.href = '/lend-by-category';
		root.appendChild(link);
		const clicks: MouseEvent[] = [];
		link.addEventListener('click', group.toggle);
		document.addEventListener('click', (event) => clicks.push(event as MouseEvent));
		await userEvent.setup().click(link);
		expect(clicks[0].defaultPrevented).toBe(false);
		expect(group.toggled.value).toBe(false);
		expect(group.approached.value).toBe(false);
	});

	it('reports aria-expanded true while a hover open is showing the panel', () => {
		jest.useFakeTimers();
		const { group } = mountGroup('panel-a');
		group.onPointerEnter(pointerEnter());
		jest.advanceTimersByTime(MENU_OPEN_DELAY_MS);
		expect(group.toggled.value).toBe(false);
		expect(group.trigger.value['aria-expanded']).toBe(true);
		group.onPointerLeave();
		expect(group.trigger.value['aria-expanded']).toBe(false);
	});

	it('expanded follows a mouse hover that outlasts the intent delay', () => {
		jest.useFakeTimers();
		const { group } = mountGroup('panel-a');
		group.onPointerEnter(pointerEnter());
		expect(group.approached.value).toBe(true);
		jest.advanceTimersByTime(MENU_OPEN_DELAY_MS - 1);
		expect(group.expanded.value).toBe(false);
		jest.advanceTimersByTime(1);
		expect(group.expanded.value).toBe(true);
		group.onPointerLeave();
		expect(group.expanded.value).toBe(false);
	});

	it('stays expanded after the hover ends while the group is toggled', () => {
		jest.useFakeTimers();
		const { group } = mountGroup('panel-a');
		group.onPointerEnter(pointerEnter());
		jest.advanceTimersByTime(MENU_OPEN_DELAY_MS);
		group.toggle();
		group.onPointerLeave();
		expect(group.expanded.value).toBe(true);
	});

	it('does not arm hover intent for touch pointers', () => {
		jest.useFakeTimers();
		const { group } = mountGroup('panel-a');
		group.onPointerEnter(pointerEnter('touch'));
		jest.advanceTimersByTime(MENU_OPEN_DELAY_MS * 2);
		expect(group.approached.value).toBe(true);
		expect(group.expanded.value).toBe(false);
	});

	it('hovering a group clears whichever other group is toggled', () => {
		const menus = useHeaderMenuState(ref<PointerType | null>('mouse'));
		const a = mountGroup('panel-a', menus);
		const b = mountGroup('panel-b', menus);
		a.group.toggle();
		b.group.onPointerEnter(pointerEnter());
		expect(menus.toggledId.value).toBeNull();
		b.group.toggle();
		b.group.onPointerEnter(pointerEnter());
		expect(menus.toggledId.value).toBe('panel-b');
	});

	it('Escape clears the toggled group and focuses its trigger', () => {
		const { group, trigger } = mountGroup('panel-a');
		group.toggle();
		group.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
		expect(group.toggled.value).toBe(false);
		expect(document.activeElement).toBe(trigger);
	});

	it('ignores other keys and Escape on an untoggled group', () => {
		const { group, trigger } = mountGroup('panel-a');
		group.toggle();
		group.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(group.toggled.value).toBe(true);
		group.toggle();
		group.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
		expect(document.activeElement).not.toBe(trigger);
	});

	it('clears the toggle when focus leaves the group and keeps it when focus moves within', () => {
		const { group, panelLink } = mountGroup('panel-a');
		group.toggle();
		group.onFocusOut({ relatedTarget: panelLink } as unknown as FocusEvent);
		expect(group.toggled.value).toBe(true);
		group.onFocusOut({ relatedTarget: document.body } as unknown as FocusEvent);
		expect(group.toggled.value).toBe(false);
	});

	it.each([
		['null, as on a window blur', null],
		['the document, as when a press lands on nothing focusable', document],
	])('stays toggled when focus is lost to %s', (_name, relatedTarget) => {
		const { group } = mountGroup('panel-a');
		group.toggle();
		group.onFocusOut({ relatedTarget } as unknown as FocusEvent);
		expect(group.toggled.value).toBe(true);
	});

	it('clears the toggle on a press outside the group, but not on a press inside it', async () => {
		const user = userEvent.setup();
		const { group, panelLink } = mountGroup('panel-a');
		group.toggle();
		await nextTick();
		await user.click(panelLink);
		expect(group.toggled.value).toBe(true);
		await user.click(document.body);
		expect(group.toggled.value).toBe(false);
	});

	it('marks the group approached at mount when the pointer is already over it', () => {
		const dom = attachGroup();
		dom.root.matches = jest.fn((selector: string) => selector === ':hover');
		const menus = useHeaderMenuState(ref<PointerType | null>('mouse'));
		const { result } = withSetup(() => useHeaderMenuGroup({ panelId: ref('panel-a'), rootRef: shallowRef(dom.root), menus }));
		expect(result.approached.value).toBe(true);
	});

	it('marks the group approached on focusin', () => {
		const { group } = mountGroup('panel-a');
		group.onFocusIn();
		expect(group.approached.value).toBe(true);
	});

	it('registers its root for placement on mount and unregisters on unmount', () => {
		const unregister = jest.fn();
		const placement: HeaderMenuPlacement = { registerGroup: jest.fn(() => unregister) };
		const { root, app } = mountGroup('panel-a', useHeaderMenuState(ref<PointerType | null>('mouse')), placement);
		expect(placement.registerGroup).toHaveBeenCalledWith(root);
		app.unmount();
		expect(unregister).toHaveBeenCalledTimes(1);
	});

	it('clears its own toggle from the shared state on unmount', () => {
		const { group, menus, app } = mountGroup('panel-a');
		group.toggle();
		app.unmount();
		expect(menus.toggledId.value).toBeNull();
	});
});
