import KvButton from '#components/KvButton';
import KvToast from '#components/KvToast';

export default {
	title: 'KvToast',
	component: KvToast,
	args: {
		message: 'Successfully added to basket!',
		persist: false,
		type: 'confirmation',
	},
	argTypes: {
		message: {
			control: 'text',
		},
		type: {
			options: ['confirmation', 'warning', 'error'],
			control: 'select',
		},
		persist: {
			control: 'boolean',
		},
		hideDelay: {
			control: 'number',
		},
	},
};

const Template = (templateArgs, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvToast,
		KvButton,
	},
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div>
			<kv-button @click="showToast(message, args.type, persist, hideDelay)">Show Toast</kv-button>

			<!-- div below is a kludge for storybook docs -->
			<div class="tw-fixed tw-z-toast tw-inset-0 tw-pointer-events-none">
				<div class="tw-fixed tw-left-0 tw-right-0 tw-top-2 tw-pointer-events-auto">
					<kv-toast ref="toastRef" @close="onClose" />
				</div>
			</div>
		</div>`,
	methods: {
		showToast(messageInput, type, persistInput, hideDelay) {
			this.$refs.toastRef.show(messageInput, type, persistInput, hideDelay);
		},
		onClose() {
		},
	},
});

export const typeConfirmation = Template.bind({});
typeConfirmation.args = { type: 'confirmation' };

export const typeWarning = Template.bind({});
typeWarning.args = { type: 'warning' };

export const typeError = Template.bind({});
typeError.args = { type: 'error' };

export const withLongTextAndHtml = Template.bind({});
withLongTextAndHtml.args = { message: 'This is a nice long content that could <b>live here</b> to show the spacing respect. This is a nice <a href="https://www.example.com">long content</a> that could live here to <i>show the spacing</i> respect.' };

export const persist = Template.bind({});
persist.args = { persist: true };

export const hideDelay = Template.bind({});
hideDelay.args = { hideDelay: 10000 };

const KivaLogoTemplate = (templateArgs, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvToast,
		KvButton,
	},
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div>
			<kv-button @click="showToast(message, args.type, persist)">Show Toast</kv-button>

			<!-- div below is a kludge for storybook docs -->
			<div class="tw-fixed tw-z-toast tw-inset-0 tw-pointer-events-none">
				<div class="tw-fixed tw-left-0 tw-right-0 tw-top-2 tw-pointer-events-auto">
					<kv-toast ref="toastRef" @close="onClose">
						<template #toastContent>
							<div>
								Welcome to Lending home! We’re doing something new based on your feedback this year. <button class="tw-text-action">Read more here</button>
							</div>
						</template>
					</kv-toast>
				</div>
			</div>
		</div>`,
	methods: {
		showToast(messageInput, type, persistInput) {
			this.$refs.toastRef.show(messageInput, type, persistInput);
		},
		onClose() {
		},
	},
});
export const typeKivaLogo = KivaLogoTemplate.bind({});
typeKivaLogo.args = { type: 'kiva-logo', message: '' };
