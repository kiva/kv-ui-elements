import { ref } from 'vue';
import KvCheckoutLightbox from '../KvCheckoutLightbox.vue';
import KvButton from '../KvButton.vue';
import KvCheckoutLightboxDocsMdx from './KvCheckoutLightboxDocs.mdx';

export default {
	title: 'Checkout/KvCheckoutLightbox',
	component: KvCheckoutLightbox,
	parameters: {
		layout: 'fullscreen',
		docs: {
			page: KvCheckoutLightboxDocsMdx,
			title: 'KvCheckoutLightbox Docs',
			// one iframe per story, so an open lightbox can't cover the docs page or lock its scroll
			story: {
				inline: false,
				height: '640px',
			},
		},
	},
	args: {
		visible: true,
		loading: false,
		preventClose: false,
		title: 'Finalize your impact',
		isLoggedIn: false,
		totalsLoaded: true,
		depositRequired: false,
		paymentReady: false,
		paying: false,
		submitLabel: 'Submit my contribution',
		category: 'storybook',
	},
};

// The host side of the contract, stubbed: totals and a payment form through slots, the guest
// fields through v-models, and a log of what the lightbox emits.
const Template = (args) => ({
	components: { KvCheckoutLightbox, KvButton },
	setup() {
		const open = ref(args.visible);
		const email = ref('');
		const terms = ref(false);
		const updates = ref(false);
		const events = ref([]);
		const log = (line) => events.value.unshift(`${new Date().toLocaleTimeString()} ${line}`);
		const track = (...tuple) => log(`track ${JSON.stringify(tuple)}`);
		return {
			args, email, events, log, open, terms, track, updates,
		};
	},
	template: `
		<div class="tw-p-4">
			<kv-button @click="open = true">Open checkout</kv-button>
			<p class="tw-mt-2 tw-text-small">Guest fields: {{ email || '(no email)' }}, terms {{ terms }}, updates {{ updates }}</p>
			<pre class="tw-mt-2 tw-p-2 tw-bg-secondary tw-text-small" style="max-height: 240px; overflow: auto;">{{ events.join('\\n') }}</pre>

			<kv-checkout-lightbox
				v-bind="args"
				:visible="open"
				:kv-track-function="track"
				v-model:email="email"
				v-model:terms-agreement="terms"
				v-model:email-updates="updates"
				@submit="log('emit submit')"
				@lightbox-closed="open = false; log('emit lightbox-closed')"
			>
				<template #loading>
					<p class="tw-text-center" role="status">Adding to basket…</p>
				</template>
				<template #totals>
					<h3 class="tw-text-title tw-text-left tw-mb-1">Summary</h3>
					<p class="tw-text-left">Loans: $25.00</p>
					<p class="tw-text-left">Credit applied: -$25.00</p>
					<p class="tw-text-left tw-mb-2">Amount due: {{ args.depositRequired ? '$25.00' : '$0.00' }}</p>
				</template>
				<template #payment>
					<div class="tw-border tw-border-gray-300 tw-rounded tw-p-2 tw-mb-2 tw-text-center tw-text-small">
						Payment form goes here (KvPaymentSelect in kv-shop)
					</div>
				</template>
				<template #before-submit>
					<p class="tw-text-caption tw-mb-1">By submitting you will be funding this loan.</p>
				</template>
			</kv-checkout-lightbox>
		</div>
	`,
});

/** A signed-out visitor whose credit covers the basket: guest fields, no payment form. */
export const Default = Template.bind({});

/** Something is still owed and the host's payment method is ready, so the form can be submitted. */
export const DepositDue = Template.bind({});
DepositDue.args = { depositRequired: true, paymentReady: true };

/** Something is still owed but the payment method is not ready yet, so submit stays disabled. */
export const AwaitingPayment = Template.bind({});
AwaitingPayment.args = { depositRequired: true, paymentReady: false };

/** A signed-in lender: no guest fields, submit available as soon as the totals are known. */
export const SignedIn = Template.bind({});
SignedIn.args = { isLoggedIn: true, depositRequired: true, paymentReady: true };

/** The host is still preparing the basket: the loading slot shows and the lightbox is locked. */
export const Loading = Template.bind({});
Loading.args = { loading: true };

/** The host is carrying out the submit: the button spins and the lightbox is locked. */
export const Paying = Template.bind({});
Paying.args = { isLoggedIn: true, paying: true };
