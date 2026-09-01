import {
	createApp, defineComponent, h, ref, nextTick, type App,
} from 'vue';
import { fireEvent } from '@testing-library/dom';
import { useHeaderMenuGroup } from '#utils/useHeaderMenuGroup';
import { useHeaderMenuState } from '#utils/useHeaderMenuState';
import type { HeaderMenuPlacement } from '#utils/useHeaderMenuPlacement';
import { MENU_OPEN_DELAY_MS } from '#utils/headerMenuTiming';

// Runs the composable inside a real component instance so its lifecycle hooks attach to an
// active instance instead of warning.
function withSetup<T>(composable: () => T): { result: T; app: App } {
	let result!: T;
	const app = createApp(defineComponent({
		setup() {
			result = composable();
			return () => h('div');
		},
	}));
	app.mount(document.createElement('div'));
	return { result, app };
}

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

function mountGroup(panelId: string, menus = useHeaderMenuState(), placement: HeaderMenuPlacement | null = null) {
	const dom = attachGroup();
	const mounted = withSetup(() => useHeaderMenuGroup({
		panelId: ref(panelId), rootRef: ref(dom.root), menus, placement,
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

	it('toggle expands the group in the shared state and marks it approached', () => {
		const { group, menus } = mountGroup('panel-a');
		expect(group.expanded.value).toBe(false);
		expect(group.approached.value).toBe(false);
		group.toggle();
		expect(menus.expandedId.value).toBe('panel-a');
		expect(group.expanded.value).toBe(true);
		expect(group.approached.value).toBe(true);
		group.toggle();
		expect(group.expanded.value).toBe(false);
	});

	it('close only clears the shared state when this group is the expanded one', () => {
		const menus = useHeaderMenuState();
		const a = mountGroup('panel-a', menus);
		const b = mountGroup('panel-b', menus);
		a.group.toggle();
		b.group.close();
		expect(menus.expandedId.value).toBe('panel-a');
		a.group.close();
		expect(menus.expandedId.value).toBeNull();
	});

	it('exposes trigger attributes that toggle on click and on a prevented touchstart', () => {
		const { group } = mountGroup('panel-a');
		expect(group.trigger.value['aria-expanded']).toBe(false);
		expect(group.trigger.value['aria-controls']).toBe('panel-a');
		group.trigger.value.onClick();
		expect(group.trigger.value['aria-expanded']).toBe(true);
		const touch = { preventDefault: jest.fn() } as unknown as TouchEvent;
		group.trigger.value.onTouchstart(touch);
		expect(touch.preventDefault).toHaveBeenCalled();
		expect(group.expanded.value).toBe(false);
	});

	it('opened follows a mouse hover that outlasts the intent delay', () => {
		jest.useFakeTimers();
		const { group } = mountGroup('panel-a');
		group.onPointerEnter(pointerEnter());
		expect(group.approached.value).toBe(true);
		jest.advanceTimersByTime(MENU_OPEN_DELAY_MS - 1);
		expect(group.opened.value).toBe(false);
		jest.advanceTimersByTime(1);
		expect(group.opened.value).toBe(true);
		group.onPointerLeave();
		expect(group.opened.value).toBe(false);
	});

	it('stays opened after the hover ends while the group is expanded', () => {
		jest.useFakeTimers();
		const { group } = mountGroup('panel-a');
		group.onPointerEnter(pointerEnter());
		jest.advanceTimersByTime(MENU_OPEN_DELAY_MS);
		group.toggle();
		group.onPointerLeave();
		expect(group.opened.value).toBe(true);
	});

	it('does not arm hover intent for touch pointers', () => {
		jest.useFakeTimers();
		const { group } = mountGroup('panel-a');
		group.onPointerEnter(pointerEnter('touch'));
		jest.advanceTimersByTime(MENU_OPEN_DELAY_MS * 2);
		expect(group.approached.value).toBe(true);
		expect(group.opened.value).toBe(false);
	});

	it('hovering a group collapses whichever other group is expanded', () => {
		const menus = useHeaderMenuState();
		const a = mountGroup('panel-a', menus);
		const b = mountGroup('panel-b', menus);
		a.group.toggle();
		b.group.onPointerEnter(pointerEnter());
		expect(menus.expandedId.value).toBeNull();
		b.group.toggle();
		b.group.onPointerEnter(pointerEnter());
		expect(menus.expandedId.value).toBe('panel-b');
	});

	it('Escape collapses the expanded group and focuses its trigger', () => {
		const { group, trigger } = mountGroup('panel-a');
		group.toggle();
		group.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
		expect(group.expanded.value).toBe(false);
		expect(document.activeElement).toBe(trigger);
	});

	it('ignores other keys and Escape on a collapsed group', () => {
		const { group, trigger } = mountGroup('panel-a');
		group.toggle();
		group.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(group.expanded.value).toBe(true);
		group.toggle();
		group.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
		expect(document.activeElement).not.toBe(trigger);
	});

	it('collapses when focus leaves the group and stays expanded when it moves within', () => {
		const { group, panelLink } = mountGroup('panel-a');
		group.toggle();
		group.onFocusOut({ relatedTarget: panelLink } as unknown as FocusEvent);
		expect(group.expanded.value).toBe(true);
		group.onFocusOut({ relatedTarget: document.body } as unknown as FocusEvent);
		expect(group.expanded.value).toBe(false);
	});

	it('collapses on a pointerdown outside the group while expanded', async () => {
		const { group, panelLink } = mountGroup('panel-a');
		group.toggle();
		await nextTick();
		fireEvent.pointerDown(panelLink);
		expect(group.expanded.value).toBe(true);
		fireEvent.pointerDown(document.body);
		expect(group.expanded.value).toBe(false);
	});

	it('marks the group approached on focusin', () => {
		const { group } = mountGroup('panel-a');
		group.onFocusIn();
		expect(group.approached.value).toBe(true);
	});

	it('registers its root for placement on mount and unregisters on unmount', () => {
		const unregister = jest.fn();
		const placement: HeaderMenuPlacement = { registerGroup: jest.fn(() => unregister) };
		const { root, app } = mountGroup('panel-a', useHeaderMenuState(), placement);
		expect(placement.registerGroup).toHaveBeenCalledWith(root);
		app.unmount();
		expect(unregister).toHaveBeenCalledTimes(1);
	});

	it('clears its own expanded state from the shared state on unmount', () => {
		const { group, menus, app } = mountGroup('panel-a');
		group.toggle();
		app.unmount();
		expect(menus.expandedId.value).toBeNull();
	});
});
