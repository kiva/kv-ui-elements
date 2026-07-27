<template>
	<div
		ref="formContainerRef"
		class="kv-form-assembly-form tw-w-full"
		:data-testid="dataTestId"
		:aria-busy="isLoading"
	>
		<div
			v-if="isLoading"
			class="tw-w-full tw-flex tw-content-center tw-justify-center"
			style="min-height: 200px;"
		>
			<KvLoadingSpinner class="tw-self-center" />
		</div>
		<iframe
			v-if="iFrameSrc"
			ref="iFrameRef"
			class="tw-mx-auto tw-w-full"
			:src="iFrameSrc"
			:height="iFrameHeight"
			:title="title"
			frameborder="0"
		></iframe>
	</div>
</template>

<script setup lang="ts">
import {
	computed,
	onMounted,
	onUnmounted,
	ref,
	watchEffect,
} from 'vue';
import KvLoadingSpinner from './KvLoadingSpinner.vue';

// Both the src we build and the origin we accept messages from. Keep it a single
// constant — if these ever drift apart the component would render one form while
// trusting resize and submit messages from another.
const FA_ORIGIN = 'https://kiva.tfaforms.net';

/**
 * An analytics payload is usable when it looks like a kvTrackEvent tuple:
 * at minimum a string category and a string action.
 */
const isValidAnalytics = (analytics: unknown[] | null): boolean => Array.isArray(analytics)
	&& typeof analytics[0] === 'string'
	&& typeof analytics[1] === 'string';

const props = defineProps({
	/**
	 * The numeric FormAssembly form id. The iframe is not rendered until this is set.
	 */
	formAssemblyId: {
		type: Number,
		default: null,
	},
	/**
	 * Additional query params to add to the form url, should include leading ?
	 * FormAssembly uses these to prefill fields. Callers that need tracking ids in the
	 * form are responsible for resolving them and merging them in here.
	 */
	additionalQueryParams: {
		type: String,
		default: '',
	},
	/**
	 * Accessible name for the embedded form iframe. Describe the form's purpose,
	 * e.g. "Newsletter signup form".
	 */
	title: {
		type: String,
		default: 'FormAssembly form',
	},
});

/**
 * Emitted when the embedded form reports that it has finished loading.
 *
 * @event fa-form-loaded
 */
/**
 * Emitted when the embedded form is actually submitted. It does not fire while validation is
 * still failing, which makes it the strongest completion signal available — dismiss a modal on
 * this one. `analytics` is the raw array the FA form supplied (or null); `valid` reports whether
 * it is usable as an analytics event tuple.
 *
 * @event fa-form-submitted
 */
/**
 * Emitted when the form's page is torn down. Kiva's FormAssembly forms raise this from a
 * `beforeunload` handler, so despite the name it is the weaker signal: it also fires when the
 * user navigates away or a containing modal closes, and it does not fire at all when the form
 * shows an in-page thank you message instead of navigating to a dedicated thank you page.
 * Use it for teardown, not to confirm the user finished.
 *
 * @event fa-form-closed
 */
type FaFormEmits = {
	(e: 'fa-form-loaded'): void,
	(e: 'fa-form-submitted', payload: { analytics: unknown[] | null, valid: boolean }): void,
	(e: 'fa-form-closed'): void,
};

const emit = defineEmits<FaFormEmits>();

const isLoading = ref(true);
const formContainerRef = ref<HTMLElement | null>(null);
const iFrameRef = ref<HTMLIFrameElement | null>(null);

// Suffixed with the form id so a page embedding several forms gives automation a
// distinct handle for each. Template refs are per-instance and cannot collide, but
// these attributes are global to the document.
const dataTestId = computed(() => (props.formAssemblyId
	? `kv-form-assembly-form-${props.formAssemblyId}`
	: 'kv-form-assembly-form'));

const iFrameSrc = ref('');
const iFrameHeight = ref(500);

/**
 * Normalizes the caller-supplied query string. `additionalQueryParams` is expected to
 * include a leading `?` per the prop's docs, but a string without one is accepted too.
 * Coalesced because Vue applies a prop default only for `undefined` — a consumer binding
 * a computed that is briefly `null` would otherwise throw here and never render the form.
 */
const buildQueryString = (): string => {
	const params = new URLSearchParams((props.additionalQueryParams || '').replace(/^\?/, ''));
	const serialized = params.toString();
	return serialized ? `?${serialized}` : '';
};

const setFrameSrc = () => {
	if (typeof window === 'undefined' || !props?.formAssemblyId) return;
	iFrameSrc.value = `${FA_ORIGIN}/${props.formAssemblyId}${buildQueryString()}`;
};

// Deliberately not a computed: the src must only materialize on the client. Deriving it
// would put the iframe in the SSR markup and mismatch on hydration, and would start the
// cross-origin request during render. Gating on the container ref defers it to post-mount,
// while watchEffect still picks up later formAssemblyId / additionalQueryParams changes.
watchEffect(() => {
	if (formContainerRef.value) {
		setFrameSrc();
	}
});

/**
 * Events emitted via 'postMessage' embedded in form assembly
 * The js that emits these events is found in form assembly under the
 * form Properties > Custom Code
 * */
const handleIFrameMessage = (message: MessageEvent<{
	type: string,
	frameHeight: number,
	frameWidth: number,
	analytics?: unknown[]
}>) => {
	if (message.origin !== FA_ORIGIN) return;
	// Every embed on the page hears every FormAssembly frame's messages, so origin alone
	// would let one form resize its neighbour or fire its neighbour's submit. Match the
	// sender against our own frame. Skipped while contentWindow is unavailable, which
	// leaves the origin check as the floor rather than dropping messages outright.
	const frameWindow = iFrameRef.value?.contentWindow;
	if (frameWindow && message.source !== frameWindow) return;

	const messageDataType = message?.data?.type;

	if (messageDataType === 'fa_frame_loaded') {
		emit('fa-form-loaded');
		isLoading.value = false;
	}

	if (
		messageDataType === 'fa_frame_data'
		|| messageDataType === 'fa_form_page_change'
		|| messageDataType === 'fa_form_submitted'
	) {
		const initialHeight = message?.data?.frameHeight ?? 300;
		// add 30 pix to account for body margin applied within iframe
		iFrameHeight.value = initialHeight + 30;
	}

	if (messageDataType === 'fa_form_closed') {
		emit('fa-form-closed');
	}

	if (messageDataType === 'fa_form_submitted') {
		// Optional array defined in the FA form for analytics purposes,
		// e.g. ['category', 'action', 'label', 'property', 'value']
		const messageDataAnalytics = message?.data?.analytics ?? null;
		emit('fa-form-submitted', {
			analytics: messageDataAnalytics,
			valid: isValidAnalytics(messageDataAnalytics),
		});
	}
};

onMounted(() => {
	window.addEventListener('message', handleIFrameMessage);
});

onUnmounted(() => {
	window.removeEventListener('message', handleIFrameMessage);
});
</script>
