<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-gap-2 tw-flex tw-flex-col tw-items-end md:tw-hidden tw-font-medium tw-p-2.5">
		<KvMaterialIcon
			v-if="isMobile"
			:icon="mdiClose"
			class="tw-cursor-pointer"
			@click="$emit('closing-menu')"
		/>
		<KvAccordionItem
			id="accordion-take-action-menu"
			open
			class="tw-w-full tw-border-b-0"
		>
			<template #header>
				<h3 class="tw-pb-0.5">
					Take action
				</h3>
			</template>
			<div class="tw-flex tw-flex-col tw-gap-2 tw-pl-1">
				<div
					v-for="item in menuItems"
					:key="item.title"
					v-kv-track-event="['TopNav', `click-${item.trackEvent}`]"
				>
					<a
						:href="item.url"
						class="mobile-link"
					>
						{{ item.title }}
					</a>
					<p class="tw-text-secondary tw-font-book">
						{{ item.description }}
					</p>
				</div>
			</div>
		</KvAccordionItem>
		<KvAccordionItem
			id="accordion-about-menu"
			class="tw-w-full tw-pb-1"
		>
			<template #header>
				<h3 class="tw-pb-0.5">
					About
				</h3>
			</template>
			<div class="tw-flex tw-flex-col tw-gap-2 tw-pb-2 tw-pl-1">
				<a
					v-kv-track-event="['TopNav', 'click-About-About us']"
					href="/about"
					class="mobile-link"
				>About us</a>
				<a
					v-kv-track-event="['TopNav', 'click-About-How Kiva works']"
					href="/about/how"
					class="mobile-link"
				>How Kiva works</a>
				<a
					v-kv-track-event="['TopNav', 'click-About-Where Kiva works']"
					href="/about/where-kiva-works"
					class="mobile-link"
				>Where Kiva works</a>
				<a
					v-kv-track-event="['TopNav', 'click-About-Impact']"
					href="/impact"
					class="mobile-link"
				>Impact</a>
				<a
					v-kv-track-event="['TopNav', 'click-About-Leadership']"
					href="/about/leadership"
					class="mobile-link"
				>Leadership</a>
				<a
					v-kv-track-event="['TopNav', 'click-About-Finances']"
					href="/about/finances"
					class="mobile-link"
				>Finances</a>
				<a
					v-kv-track-event="['TopNav', 'click-About-Press']"
					href="/about/press-center"
					class="mobile-link"
				>Press</a>
				<a
					v-kv-track-event="['TopNav', 'click-About-Due diligence']"
					href="/about/due-diligence"
					class="mobile-link"
				>Due diligence</a>
			</div>
		</KvAccordionItem>
	</nav>
</template>

<script lang="ts">
import { mdiClose } from '@mdi/js';
import KvAccordionItem from '../KvAccordionItem.vue';
import KvMaterialIcon from '../KvMaterialIcon.vue';

export default {
	name: 'KvHeaderMobileMenu',
	components: {
		KvAccordionItem,
		KvMaterialIcon,
	},
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
	data() {
		return {
			mdiClose,
			menuItems: [
				{
					title: 'Choose someone to help',
					description: 'Make a direct impact for someone in need',
					url: '/lend-by-category',
					trackEvent: 'menu-choose-someone-to-help',
				},
				{
					title: 'Donate to Kiva',
					description: 'Help us change lives and tackle inequality',
					url: '/donate/supportus',
					trackEvent: 'Support-Kiva',
				},
				{
					title: 'Partner with us',
					description: 'Drive global impact aligned with your organization’s goals',
					url: '/about/partner-with-us',
					trackEvent: 'About-Partner with us',
				},
				{
					title: 'Buy a Kiva Card',
					description: 'Give the gift of lending to others',
					url: '/portfolio/kiva-card',
					trackEvent: 'menu-buy-kiva-card',
				},
			],
		};
	},
};
</script>

<style lang="postcss" scoped>

.mobile-link {
	@apply tw-text-primary hover:tw-text-action tw-no-underline hover:tw-underline;
}
</style>
