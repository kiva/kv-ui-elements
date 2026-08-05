import { ref } from 'vue';
import KvFormAssemblyForm from '../KvFormAssemblyForm.vue';
import KvFormAssemblyFormDocsMdx from './KvFormAssemblyFormDocs.mdx';

export default {
	title: 'Forms/KvFormAssemblyForm',
	component: KvFormAssemblyForm,
	parameters: {
		docs: {
			page: KvFormAssemblyFormDocsMdx,
			title: 'Kv Form Assembly Form Docs',
		},
		chromatic: {
			// Every story embeds a live third-party form, so snapshots would diff
			// on content we do not control.
			disableSnapshot: true,
		},
	},
	argTypes: {
		formAssemblyId: {
			control: 'number',
			description: 'The numeric FormAssembly form id',
		},
		additionalQueryParams: {
			control: 'text',
			description: 'Extra query params appended to the form url, including the leading ?',
		},
		title: {
			control: 'text',
			description: 'Accessible name for the embedded iframe',
		},
	},
};

// Component Overview - Simple examples of each type (CSF format)
export const ComponentOverview = {
	render: () => ({
		components: { KvFormAssemblyForm },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<p class="tw-text-small tw-mb-3">
					A FormAssembly form embedded by id. The spinner shows until the embed is ready.
				</p>
				<kv-form-assembly-form
					:form-assembly-id="658"
					title="Example FormAssembly form"
				/>
			</div>
		`,
	}),
};

// All Variations - Comprehensive view of all style and functional variants
export const AllVariations = {
	render: () => ({
		components: { KvFormAssemblyForm },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 tw-gap-8">
					<div>
						<h3 class="tw-text-h4 tw-mb-2">Plain embed</h3>
						<p class="tw-text-small tw-mb-3">Only a form id is supplied.</p>
						<kv-form-assembly-form
							:form-assembly-id="658"
							title="Plain FormAssembly form"
						/>
					</div>
					<div>
						<h3 class="tw-text-h4 tw-mb-2">With prefilled query params</h3>
						<p class="tw-text-small tw-mb-3">
							additionalQueryParams prefills fields, and must include the leading ?.
						</p>
						<kv-form-assembly-form
							:form-assembly-id="658"
							additional-query-params="?tfa_4211=user@example.com"
							title="Prefilled FormAssembly form"
						/>
					</div>
				</div>
			</div>
		`,
	}),
};

export const PrefilledFields = {
	render: () => ({
		components: { KvFormAssemblyForm },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-small tw-mb-3">
					Anything the host application wants inside the form — prefilled values, campaign ids,
					tracking identifiers — arrives as query params. The component does not interpret them,
					it only normalizes the string and appends it to the form url.
				</p>
				<kv-form-assembly-form
					:form-assembly-id="658"
					additional-query-params="?tfa_4211=user@example.com&tfa_4264=12345"
					title="Prefilled FormAssembly form"
				/>
			</div>
		`,
	}),
};

export const LoadingAndResize = {
	render: () => ({
		components: { KvFormAssemblyForm },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-small tw-mb-3">
					A loading spinner occupies at least 200px until the embed is ready — either the form posts
					fa_frame_loaded, or the iframe's own load event acts as the fallback.
					The iframe then resizes to each reported height as the user pages through the form.
				</p>
				<kv-form-assembly-form
					:form-assembly-id="658"
					title="Resizing FormAssembly form"
					@fa-form-loaded="onLoaded"
				/>
			</div>
		`,
		methods: {
			onLoaded() {
				console.log('fa-form-loaded');
			},
		},
	}),
};

// Submission payload - shows how the component reports a submit.
// Form 661's Custom Code posts an `isValid` flag plus the `selectedValues` the
// user chose; the component derives `valid` from `isValid` (falling back to the
// analytics tuple for legacy forms) and passes `selectedValues` through.
export const SubmissionPayload = {
	render: () => ({
		components: { KvFormAssemblyForm },
		setup() {
			const lastSubmission = ref(null);
			const onSubmitted = (payload) => {
				lastSubmission.value = payload;
			};
			return { lastSubmission, onSubmitted };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-small tw-mb-3">
					Submit the form to see the parsed <code>fa-form-submitted</code> payload.
					<code>valid</code> comes from the form's <code>isValid</code> flag (falling back
					to the analytics tuple for legacy forms) and <code>selectedValues</code> carries
					the values the form reported.
				</p>
				<kv-form-assembly-form
					:form-assembly-id="661"
					title="Annual lender goal feedback"
					@fa-form-submitted="onSubmitted"
				/>
				<pre
					v-if="lastSubmission"
					class="tw-mt-3 tw-bg-white tw-rounded tw-p-2 tw-text-small tw-whitespace-pre-wrap"
				>{{ JSON.stringify(lastSubmission, null, 2) }}</pre>
			</div>
		`,
	}),
};

// Default story - interactive playground
export const Default = {
	args: {
		formAssemblyId: 658,
		additionalQueryParams: '',
		title: 'FormAssembly form',
	},
	render: (args) => ({
		components: { KvFormAssemblyForm },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<kv-form-assembly-form
					v-bind="args"
					@fa-form-loaded="onLoaded"
					@fa-form-submitted="onSubmitted"
					@fa-form-closed="onClosed"
				/>
			</div>
		`,
		methods: {
			onLoaded() {
				console.log('fa-form-loaded');
			},
			onSubmitted(payload) {
				// only fires once validation passes — the reliable completion signal
				console.log('fa-form-submitted', payload);
			},
			onClosed() {
				// sent from a beforeunload handler in the form's Custom Code, so it also
				// fires on navigation or modal close
				console.log('fa-form-closed');
			},
		},
	}),
};
