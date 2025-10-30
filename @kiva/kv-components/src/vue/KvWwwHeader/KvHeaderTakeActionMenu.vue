<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-start tw-font-medium tw-px-2.5">
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-choose-someone-to-help']"
			href="/lend-by-category"
		>
			<div>
				<p>Choose someone to help</p>
				<p class="tw-text-small tw-text-secondary">
					Make a direct impact for someone in need
				</p>
			</div>
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-Support-Kiva']"
			href="/donate/supportus"
		>
			<div>
				<p>Donate to Kiva</p>
				<p class="tw-text-small tw-text-secondary">
					Help us change lives and tackle inequality
				</p>
			</div>
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-Partner with us']"
			href="/about/partner-with-us"
		>
			<div>
				<p>Partner with us</p>
				<p class="tw-text-small tw-text-secondary">
					Drive global impact aligned with your organization’s goals
				</p>
			</div>
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-buy-kiva-card']"
			href="/gifts/kiva-cards"
		>
			<div>
				<p>Buy a Kiva Card</p>
				<p class="tw-text-small tw-text-secondary">
					Give the gift of lending to others
				</p>
			</div>
		</kv-header-menu-link>
	</nav>
</template>

<script>
import KvHeaderMenuLink from './KvHeaderMenuLink.vue';

export default {
	components: {
		KvHeaderMenuLink,
	},
};
</script>
