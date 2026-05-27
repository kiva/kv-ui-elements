<template>
	<nav
		class="tw-flex tw-flex-col tw-items-start tw-font-medium tw--mt-0.5 tw-pb-0.5 tw-px-2.5"
	>
		<kv-header-menu-link
			:href="myDashboardUrl"
			class="md:tw-hidden"
			@click="onLinkClick('click-Dashboard')"
		>
			My Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/portfolio"
			@click="onLinkClick('click-Portfolio-Portfolio')"
		>
			Portfolio
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/teams/my-teams"
			@click="onLinkClick('click-Portfolio-My teams')"
		>
			My Teams
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/portfolio/donations"
			@click="onLinkClick('click-Portfolio-Donations')"
		>
			Donations
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/settings"
			@click="onLinkClick('click-Portfolio-Settings')"
		>
			Settings
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="isBorrower"
			href="/my/borrower"
			@click="onLinkClick('click-Portfolio-My borrower dashboard')"
		>
			Borrower Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="isTrustee"
			href="/my/trustee"
			@click="onLinkClick('click-Portfolio-My Trustee dashboard')"
		>
			Trustee Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/ui-logout"
			class="tw-border-t tw-border-secondary tw-w-full"
			@click="onLinkClick('click-Portfolio-Sign out')"
		>
			Sign out
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

export default {
	name: 'MyKivaMenu',
	components: { KvHeaderMenuLink },
	props: {
		// Accepts the orchestrator's user props; loggedIn/userId are part of the shared menu contract.
		loggedIn: {
			type: Boolean,
			default: false,
		},
		userId: {
			type: Number,
			default: null,
		},
		isBorrower: {
			type: Boolean,
			default: false,
		},
		isTrustee: {
			type: Boolean,
			default: false,
		},
		myDashboardUrl: {
			type: String,
			default: '/mykiva',
		},
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

		return { onLinkClick };
	},
};
</script>
