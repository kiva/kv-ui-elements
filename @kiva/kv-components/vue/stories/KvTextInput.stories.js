import { mdiMagnify } from '@mdi/js';
import { nanoid } from 'nanoid';
import KvTextInput from '../KvTextInput';

export default {
	title: 'Forms/KvTextInput',
	component: KvTextInput,
};

const DefaultTemplate = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvTextInput,
	},
	data: () => ({
		textInputModel: '1640 Riverside Drive',
		uuid: `kvt-${nanoid(10)}`,
	}),
	template: `
		<div>
			<label
				:for="uuid"
				class="tw-text-h4 tw-block tw-pb-1"
			>
				Street Address
			</label>
			<kv-text-input
				:id="uuid"
				:disabled="disabled"
				:placeholder="placeholder"
				:valid="valid"
				:icon="icon"
				:canClear="canClear"
				v-model="textInputModel"
				@input="onInput"
				style="width: 25rem;"
			/>
		</div>`,
	methods: {
		onInput(e) {
			console.log(e);
		},
	},
});

export const Default = DefaultTemplate.bind({});

export const WithoutVModelTemplate = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvTextInput,
	},
	data: () => ({
		textInputModel: '1640 Riverside Drive',
	}),
	template: `
		<div>
			<label
				for="without-v-model-id"
				class="tw-text-h4 tw-block tw-pb-1"
			>
				Street Address
			</label>
			<kv-text-input
				id="without-v-model-id"
				@input="(val) => textInputModel = val"
				:modelValue="textInputModel"
				style="width: 25rem;"
			/>
		</div>`,
});

export const Invalid = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvTextInput,
	},
	data: () => ({
		textInputModel: '',
	}),
	template: `
		<div>
			<label
				for="text-input-error-id"
				class="tw-text-h4 tw-block tw-pb-1"
			>
				Street Address
			</label>
			<kv-text-input
				id="text-input-error-id"
				:valid="false"
				style="width: 25rem;"
			>
				<template #error>Something went wrong. Learn more at this <a href="https://www.example.com">link</a></template>
			</kv-text-input>
		</div>`,
	methods: {
		onInput(e) {
			console.log(e);
		},
	},
});

export const LabelHidden = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvTextInput,
	},
	template: `
		<div>
			<label
				for="hidden-label-example"
				class="tw-sr-only"
			>
				Street Address
			</label>
			<kv-text-input
				id="hidden-label-example"
				style="width: 25rem;"
			/>
		</div>`,
});

export const WidthSet = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvTextInput,
	},
	data: () => ({
		textInputModel: '1640 Riverside Drive',
	}),
	template: `
		<div class="w-full">
			<label
				for="width-set-id"
				class="tw-text-h4 tw-block tw-pb-1"
			>
				Street Address
			</label>
			<kv-text-input
				id="width-set-id"
				v-model="textInputModel"
				class="tw-w-full"
			/>
		</div>`,
});

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
	disabled: true,
};

export const Icon = DefaultTemplate.bind({});
Icon.args = {
	icon: mdiMagnify,
};

export const canClear = DefaultTemplate.bind({});
canClear.args = {
	canClear: true,
};

export const PlaceholderText = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvTextInput,
	},
	template: `
		<div>
			<label
				for="placeholder-example"
				class="tw-text-h4 tw-block tw-pb-1"
			>
				Telephone Number
			</label>
			<kv-text-input
				id="placeholder-example"
				placeholder="(555) 555-5555"
				style="width: 25rem;"
			/>
		</div>`,
});
