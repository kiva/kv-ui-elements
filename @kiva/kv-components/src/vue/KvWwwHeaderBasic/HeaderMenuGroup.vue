<template>
	<div class="menu-group tw-flex tw-items-center">
		<slot></slot>
		<div
			v-if="approached"
			:id="panelId"
			class="menu-panel"
			:class="panelClasses"
		>
			<slot name="panel"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { MENU_OPEN_DELAY_MS, MENU_CLOSE_FADE_MS } from '#utils/useHeaderMenuState';

/**
 * One menu group in KvWwwHeaderBasic's link bar: the trigger(s) in the default slot and a
 * lazily-mounted panel. The panel opens while the group is hovered or while a direct child
 * carries aria-expanded="true"; placement comes from the custom properties the placement pass
 * writes (--nav-height on the bar, --trigger-gap-left/right and --trigger-width on the group).
 */
export default {
	name: 'HeaderMenuGroup',
	props: {
		/**
		 * Mounts the panel slot; set on the group's first approach (pointerenter/focusin/touchstart).
		 */
		approached: { type: Boolean, default: false },
		/**
		 * Id for the panel element, referenced by the trigger's aria-controls.
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
	setup(props) {
		const menuOpenDelay = `${MENU_OPEN_DELAY_MS}ms`;
		const menuCloseFade = `${MENU_CLOSE_FADE_MS}ms`;

		const panelClasses = computed(() => ({
			'menu-panel--full': props.variant === 'full' || props.variant === 'drawer',
			'menu-panel--card': props.variant === 'card',
			'menu-panel--drawer': props.variant === 'drawer',
		}));

		return { menuOpenDelay, menuCloseFade, panelClasses };
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
 * aria-expanded="true". Opening waits out the shared delay, then fades in; closing holds
 * through the same delay, fades over the close-fade duration, then hides and collapses. The
 * :hover and :has() open conditions live in separate rules: an engine that cannot parse one
 * selector list drops only that rule.
 */
.menu-panel {
	@apply tw-absolute tw-bg-primary tw-overflow-y-auto tw-z-modal;
	top: var(--nav-height, 4rem);
	max-height: 0;
	visibility: hidden;
	opacity: 0;
	transition:
		opacity v-bind(menuCloseFade) ease v-bind(menuOpenDelay),
		visibility 0s calc(v-bind(menuOpenDelay) + v-bind(menuCloseFade)),
		max-height 0s calc(v-bind(menuOpenDelay) + v-bind(menuCloseFade)),
		min-height 0s calc(v-bind(menuOpenDelay) + v-bind(menuCloseFade));
}
.menu-group:hover > .menu-panel {
	visibility: visible;
	opacity: 1;
	max-height: calc(100dvh - var(--nav-height, 4rem));
	transition:
		opacity 300ms ease v-bind(menuOpenDelay),
		visibility 0s v-bind(menuOpenDelay),
		max-height 0s v-bind(menuOpenDelay),
		min-height 0s v-bind(menuOpenDelay);
}
.menu-group:has(> [aria-expanded="true"]) > .menu-panel {
	visibility: visible;
	opacity: 1;
	max-height: calc(100dvh - var(--nav-height, 4rem));
	transition:
		opacity 300ms ease v-bind(menuOpenDelay),
		visibility 0s v-bind(menuOpenDelay),
		max-height 0s v-bind(menuOpenDelay),
		min-height 0s v-bind(menuOpenDelay);
}

.menu-panel--full {
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
.menu-group:hover > .menu-panel--drawer,
.menu-group:has(> [aria-expanded="true"]) > .menu-panel--drawer {
	max-height: none;
	min-height: 100dvh;
}
</style>
