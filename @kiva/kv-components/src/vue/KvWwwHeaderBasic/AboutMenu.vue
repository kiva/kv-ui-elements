<template>
	<nav
		class="tw-flex tw-flex-col tw-items-start tw-font-medium"
		:class="isMobile ? 'tw-px-0' : 'tw--mt-0.5 tw-pb-0.5 tw-px-2.5'"
	>
		<kv-header-menu-link
			v-for="link in links"
			:key="link.href"
			:href="link.href"
			@click="onLinkClick(link.action)"
		>
			{{ link.label }}
		</kv-header-menu-link>
	</nav>
</template>

<script lang="ts">
import { inject } from 'vue';
import KvHeaderMenuLink from '#components/KvWwwHeader/KvHeaderMenuLink.vue';

interface TrackEvent {
	// eslint-disable-next-line no-unused-vars
	(category: string, action: string, label?: string, value?: number): void;
}

interface AboutLink {
	label: string;
	href: string;
	action: string;
}

// Ported from KvWwwHeader/KvHeaderAboutMenu.vue, minus "Partner with us" — that is now a top-level nav link.
const ABOUT_LINKS: AboutLink[] = [
	{ label: 'About us', href: '/about', action: 'click-About-About us' },
	{ label: 'How Kiva works', href: '/about/how', action: 'click-About-How Kiva works' },
	{ label: 'Where Kiva works', href: '/about/where-kiva-works', action: 'click-About-Where Kiva works' },
	{ label: 'Impact', href: '/impact', action: 'click-About-Impact' },
	{ label: 'Leadership', href: '/about/leadership', action: 'click-About-Leadership' },
	{ label: 'Finances', href: '/about/finances', action: 'click-About-Finances' },
	{ label: 'Press', href: '/about/press-center', action: 'click-About-Press' },
	{ label: 'Due diligence', href: '/about/due-diligence', action: 'click-About-Due diligence' },
];

export default {
	name: 'AboutMenu',
	components: { KvHeaderMenuLink },
	props: {
		isMobile: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['closing-menu'],
	setup(_props, { emit }) {
		const $kvTrackEvent = inject<TrackEvent>('$kvTrackEvent', () => {});

		function onLinkClick(action: string): void {
			$kvTrackEvent('TopNav', action);
			emit('closing-menu');
		}

		return { links: ABOUT_LINKS, onLinkClick };
	},
};
</script>
