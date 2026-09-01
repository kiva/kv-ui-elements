<template>
	<div
		ref="root"
		class="menu-group tw-flex tw-items-center"
		@pointerenter="onPointerEnter"
		@pointerleave="onPointerLeave"
		@focusin="onFocusIn"
		@focusout="onFocusOut"
		@keydown="onKeydown"
	>
		<slot
			:trigger="trigger"
			:toggle="toggle"
			:expanded="expanded"
		></slot>
		<div
			:id="panelId"
			class="menu-panel"
			:class="`menu-panel--${variant}`"
		>
			<slot
				v-if="approached"
				name="panel"
				:close="close"
			></slot>
		</div>
	</div>
</template>

<script lang="ts">
import {
	ref, inject, watch, toRef,
} from 'vue';
import { HEADER_MENU_STATE } from '#utils/useHeaderMenuState';
import { HEADER_MENU_PLACEMENT } from '#utils/useHeaderMenuPlacement';
import { useHeaderMenuGroup } from '#utils/useHeaderMenuGroup';

/**
 * One menu group in KvWwwHeaderBasic's link bar: the trigger(s) in the default slot and a panel
 * whose content mounts on the group's first approach (pointer, focus or explicit open). The panel
 * opens while the group is hovered or while a direct child carries aria-expanded="true"; placement
 * comes from the custom properties the placement pass writes (--nav-height on the bar,
 * --trigger-gap-left/right and --trigger-width on the group).
 *
 * Emits `open` once when the menu becomes open (explicit toggle, or a mouse hover that outlasts
 * the intent delay) and `close` once when it is no longer open by either path.
 */
export default {
	name: 'HeaderMenuGroup',
	props: {
		/**
		 * Id for the panel element, referenced by the trigger's aria-controls. Also identifies the
		 * group in the shared expanded state.
		 */
		panelId: { type: String, required: true },
		/**
		 * Panel shape: 'full' spans the nav, 'drawer' is the full-screen mobile drawer, 'card'
		 * centers under the trigger and clamps to the nav's edges.
		 */
		variant: {
			type: String as () => 'full' | 'card' | 'drawer',
			default: 'card',
		},
	},
	emits: ['open', 'close'],
	setup(props, { emit }) {
		const menus = inject(HEADER_MENU_STATE);
		if (!menus) throw new Error('HeaderMenuGroup requires a HEADER_MENU_STATE provider');
		const placement = inject(HEADER_MENU_PLACEMENT, null);

		const root = ref<HTMLElement | null>(null);
		const group = useHeaderMenuGroup({
			panelId: toRef(props, 'panelId'),
			rootRef: root,
			menus,
			placement,
		});

		watch(group.opened, (isOpen) => emit(isOpen ? 'open' : 'close'), { flush: 'sync' });

		return { root, ...group };
	},
};
</script>

<style lang="postcss" scoped>
@screen md {
	.menu-group {
		align-self: stretch;
	}
	/* Hover bridge: an invisible strip, the trigger's width, from the trigger row's bottom edge to the nav's. */
	.menu-group:hover::after {
		content: '';
		@apply tw-absolute;
		top: 4rem;
		height: calc(var(--nav-height, 4rem) - 4rem);
		left: calc(var(--trigger-gap-left, 0px) - var(--trigger-width, 0px) / 2);
		width: var(--trigger-width, 0px);
	}
}

/*
 * Menu open state: the panel shows while the group is hovered or while a direct child carries
 * aria-expanded="true". Opening waits out --menu-open-delay, then fades in; closing holds through
 * the same delay, fades over --menu-close-fade, then hides and collapses.
 */
.menu-panel {
	@apply tw-absolute tw-bg-primary tw-overflow-y-auto tw-z-modal;
	top: var(--nav-height, 4rem);
	max-height: 0;
	visibility: hidden;
	opacity: 0;
	transition:
		opacity var(--menu-close-fade) ease var(--menu-open-delay),
		visibility 0s calc(var(--menu-open-delay) + var(--menu-close-fade)),
		max-height 0s calc(var(--menu-open-delay) + var(--menu-close-fade)),
		min-height 0s calc(var(--menu-open-delay) + var(--menu-close-fade));
}
.menu-group:is(:hover, :has(> [aria-expanded="true"])) > .menu-panel {
	visibility: visible;
	opacity: 1;
	max-height: calc(100dvh - var(--nav-height, 4rem));
	transition:
		opacity 300ms ease var(--menu-open-delay),
		visibility 0s var(--menu-open-delay),
		max-height 0s var(--menu-open-delay),
		min-height 0s var(--menu-open-delay);
}

.menu-panel--full,
.menu-panel--drawer {
	inset-inline: 0;
}
/*
 * Card panels center under their trigger and clamp flush to whichever nav edge centering would
 * cross; the 50% resolves against the panel's own width.
 */
.menu-panel--card {
	@apply tw-rounded-b tw-border tw-border-t-0 tw-border-tertiary;
	right: var(--trigger-gap-right, 0px);
	translate: clamp(calc(100% - var(--trigger-gap-left, 0px)), 50%, var(--trigger-gap-right, 0px)) 0;
	max-width: 100%;
}
.menu-panel--drawer {
	@apply tw-rounded-none;
}
.menu-group:is(:hover, :has(> [aria-expanded="true"])) > .menu-panel--drawer {
	max-height: none;
	min-height: 100dvh;
}
</style>
