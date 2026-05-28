<template>
	<div class="tw-flex tw-flex-col tw-items-stretch tw-font-medium tw-p-2.5 md:tw-hidden">
		<kv-accordion-item
			id="kv-www-header-basic-about"
			class="tw-w-full tw-border-b-0"
		>
			<template #header>
				<span class="tw-text-button tw-pb-0.5">
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
			class="tw-flex tw-flex-col tw-gap-2 tw-pt-1.5"
		>
			<a
				href="/about/partner-with-us"
				class="mobile-link"
				@click="onLinkClick('click-Partner')"
			>Partner</a>
			<a
				href="/donate/supportus"
				class="mobile-link"
				@click="onLinkClick('click-Support-Kiva')"
			>Support Kiva</a>
			<a
				href="/borrow"
				class="mobile-link"
				@click="onLinkClick('click-Borrow')"
			>Borrow</a>
		</nav>
	</div>
</template>

<script lang="ts">
import { inject } from 'vue';
import KvAccordionItem from '#components/KvAccordionItem.vue';
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
	},
	emits: ['closing-menu'],
	setup(_props, { emit }) {
		const $kvTrackEvent = inject<TrackEvent>('$kvTrackEvent', () => {});

		function onClose(): void {
			emit('closing-menu');
		}

		function onLinkClick(action: string): void {
			$kvTrackEvent('TopNav', action);
			emit('closing-menu');
		}

		return { onClose, onLinkClick };
	},
};
</script>

<style lang="postcss" scoped>
.mobile-link {
	@apply tw-text-primary hover:tw-text-action tw-no-underline hover:tw-underline;
}
</style>
