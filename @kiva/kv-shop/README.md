# kv-shop

A library of methods and components related to the Kiva Shop.

## Install

Deployed:

```bash
npm i @kiva/kv-shop
```

Local:

```bash
# Open kv-ui-elements folder in Terminal
npm link -w @kiva/kv-shop

# Open target local project folder in Terminal
npm link @kiva/kv-shop
```

Extra step for Nuxt local development:

```ts
// Open nuxt.config.ts in target project and add with your username
...
vite: {
    optimizeDeps: {
      exclude: ['@kiva/kv-shop'],
    },
    server: {
      fs: {
        allow: ['/Users/username/kiva/kv-ui-elements'],
      },
    },
  },
...
```

## One-time checkout

`useOneTimeCheckout` is the shop half of an in-context checkout. The form is kv-components'
`KvCheckoutLightbox`; the host composes the two and puts `KvPaymentSelect` in the lightbox's `payment`
slot. The composable watches the basket (credit already applied comes off the total), fetches the
Braintree token, hands the drop-in to kv-shop only when a deposit is due, reports a checkout that does
not come back `COMPLETED` as an error, and fires the guest Meta sign-up event once the transaction
carrying it completed. Routing after success or after a validation failure is the host's.

```vue
<kv-checkout-lightbox
	:visible="open"
	:loading="adding"
	:is-logged-in="isLoggedIn"
	:totals-loaded="checkout.totalsLoaded.value"
	:deposit-required="checkout.depositRequired.value"
	:payment-ready="checkout.transactionsEnabled.value"
	:paying="checkout.paying.value"
	:app-uri="config.APP_URI"
	:kv-track-function="$kvTrackEvent"
	category="basket"
	id-prefix="basket-checkout"
	v-model:email="checkout.guestEmail.value"
	v-model:terms-agreement="checkout.termsAgreement.value"
	v-model:email-updates="checkout.emailUpdates.value"
	@submit="checkout.submit"
	@lightbox-closed="open = false"
>
	<template #totals>
		<my-totals-list @changed="checkout.refreshTotals" />
	</template>
	<template #payment>
		<kv-payment-select
			v-if="checkout.dropInAuthToken.value"
			:amount="checkout.totalDue.value"
			:auth-token="checkout.dropInAuthToken.value"
			drop-in-name="basket-checkout"
			flow="checkout"
			:google-pay-merchant-id="config.GOOGLE_PAY_MERCHANT_ID"
			@transactions-enabled="checkout.transactionsEnabled.value = $event"
			@error="showTipMsg($event, 'error')"
		/>
	</template>
</kv-checkout-lightbox>
```

```ts
const checkout = useOneTimeCheckout({
	apollo,
	visible: open,
	loading: adding,
	isLoggedIn,
	braintreeTokenKey: config.BRAINTREE_TOKEN_KEY,
	dropInName: 'basket-checkout',
	kvTrackFunction: $kvTrackEvent,
	category: 'basket',
	onComplete: (result) => emit('checkoutComplete', result),
	onError: (message) => showTipMsg(message, 'error'),
});
```

Options: `valetInviter`, `deactivateRedirect`, `failedValidationRedirect` (optional path for a guest whose
email already has an account; by default `onError` receives the `shop.failedCheckoutValidation` error and
the host decides where to route). `trackGuestEmailSignUp` and `watchBasketTotals(apollo, { fetchPolicy })`
are exported for hosts that need them on their own.

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Contribution Guidelines

This project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
