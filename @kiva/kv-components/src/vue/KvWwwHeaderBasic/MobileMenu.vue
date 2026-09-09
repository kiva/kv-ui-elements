<template>
	<div
		id="header-basic-mobile-about-container"
		class="tw-flex tw-flex-col tw-items-stretch tw-font-medium tw-p-2.5 md:tw-hidden"
	>
		<kv-accordion-item
			id="kv-www-header-basic-about"
			class="about-accordion tw-w-full tw-border-b-0"
			@toggle="onAboutToggle"
		>
			<template #header>
				<span class="tw-text-title tw-pb-0.5">
					About
				</span>
			</template>
			<about-menu
				is-mobile
				@closing-menu="onClose"
			/>
		</kv-accordion-item>
		<nav
			aria-label="Mobile menu"
			class="tw-flex tw-flex-col tw-gap-3 tw-pt-2.5"
		>
			<a
				href="/about/partner-with-us"
				class="mobile-link tw-text-title"
				@click="onLinkClick('click-Partner')"
			>Partner with us</a>
			<a
				href="/donate/supportus"
				class="mobile-link tw-text-title"
				@click="onLinkClick('click-Support-Kiva')"
			>{{ showMajorGiftsExp ? 'Give' : 'Support Kiva' }}</a>
			<a
				v-if="showMajorGiftsExp"
				:href="majorGiftsLink.href"
				class="mobile-link tw-text-title"
				@click="onLinkClick(majorGiftsLink.track[1])"
			>{{ majorGiftsLink.label }}</a>
			<a
				href="/borrow"
				class="mobile-link tw-text-title"
				@click="onLinkClick('click-Borrow')"
			>Borrow</a>
		</nav>
	</div>
</template>

<script lang="ts">
import { inject } from 'vue';
import KvAccordionItem from '#components/KvAccordionItem.vue';
import { MAJOR_GIFTS_LINK } from '#utils/headerNavLinks';
import AboutMenu from './AboutMenu.vue';

interface TrackEvent {
	// eslint-disable-next-line no-unused-vars
	(category: string, action: string, label?: string, value?: number): void;
}

export default {
	name: 'MobileMenu',
	components: { KvAccordionItem, AboutMenu },
	props: {
		loggedIn: {
			type: Boolean,
			default: false,
		},
		loginUrl: {
			type: String,
			default: '/ui-login',
		},
		isMobile: {
			type: Boolean,
			default: false,
		},
		showMajorGiftsExp: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['closing-menu'],
	setup(_props, { emit }) {
		const $kvTrackEvent = inject<TrackEvent>('$kvTrackEvent', () => {});

		function onClose(): void {
			emit('closing-menu');
		}

		// Track only the expand (not collapse), mirroring the desktop About dropdown's hover-About-menu
		// event so "About opened" is captured consistently across viewports.
		function onAboutToggle({ open }: { open: boolean }): void {
			if (open) $kvTrackEvent('TopNav', 'hover-About-menu', 'About');
		}

		function onLinkClick(action: string): void {
			$kvTrackEvent('TopNav', action);
			emit('closing-menu');
		}

		return {
			majorGiftsLink: MAJOR_GIFTS_LINK, onClose, onAboutToggle, onLinkClick,
		};
	},
};
</script>

<style lang="postcss" scoped>
.mobile-link {
	@apply tw-text-primary hover:tw-text-action tw-no-underline hover:tw-underline;
}

#header-basic-mobile-about-container :deep(button) {
	@apply tw-py-0;
}
#header-basic-mobile-about-container :deep(nav) {
	@apply tw-pb-0;
}
.about-accordion :deep(nav) {
	@apply tw-mt-1.5;
}
.about-accordion :deep(nav a) {
	@apply tw-ml-2;
}
</style>
