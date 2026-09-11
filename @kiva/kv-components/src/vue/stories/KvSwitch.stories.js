import KvSwitch from '../KvSwitch.vue';
import KvSwitchDocsMdx from './KvSwitchDocs.mdx';

export default {
	title: 'Forms/KvSwitch',
	component: KvSwitch,
	parameters: {
		docs: {
			page: KvSwitchDocsMdx,
			title: 'Kv Switch Docs',
		},
	},
	args: {
		disabled: false,
		size: 'default',
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['default', 'small'],
		},
		disabled: {
			control: 'boolean',
		},
	},
};

const Template = (args) => ({
	components: {
		KvSwitch,
	},
	setup() {
		return { args };
	},
	data: () => ({
		switchExampleModel: false,
	}),
	template: `
		<div>
			<kv-switch
				:disabled="args.disabled"
				:size="args.size"
				v-model="switchExampleModel"
				@change="onChange"
			>
				Switch is switched: {{switchExampleModel}}
			</kv-switch>
		</div>`,
	methods: {
		onChange(e) {
			console.log(e);
		},
	},
});

// Component Overview - Simple examples of each size (CSF format)
export const ComponentOverview = {
	render: () => ({
		components: { KvSwitch },
		data() {
			return {
				defaultModel: true,
				smallModel: true,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-flex tw-gap-8 tw-items-center tw-justify-center">
					<div class="tw-text-center">
						<kv-switch v-model="defaultModel">Default</kv-switch>
					</div>
					<div class="tw-text-center">
						<kv-switch size="small" v-model="smallModel">Small</kv-switch>
					</div>
				</div>
			</div>
		`,
	}),
};

// All Variations - Both sizes across on, off, and disabled states
export const AllVariations = {
	render: () => ({
		components: { KvSwitch },
		data() {
			return {
				defaultOn: true,
				defaultOff: false,
				smallOn: true,
				smallOff: false,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
					<div>
						<h3 class="tw-text-upper tw-mb-4 tw-font-medium">Default</h3>
						<div class="tw-flex tw-flex-col tw-gap-4">
							<kv-switch v-model="defaultOn">On</kv-switch>
							<kv-switch v-model="defaultOff">Off</kv-switch>
							<kv-switch disabled :model-value="false">Disabled</kv-switch>
						</div>
					</div>
					<div>
						<h3 class="tw-text-upper tw-mb-4 tw-font-medium">Small</h3>
						<div class="tw-flex tw-flex-col tw-gap-4">
							<kv-switch size="small" v-model="smallOn">On</kv-switch>
							<kv-switch size="small" v-model="smallOff">Off</kv-switch>
							<kv-switch size="small" disabled :model-value="false">Disabled</kv-switch>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
};

export const Small = () => ({
	components: {
		KvSwitch,
	},
	data: () => ({
		switchExampleModel: false,
	}),
	template: `
		<div>
			<kv-switch size="small" v-model="switchExampleModel">
				Switch is switched: {{switchExampleModel}}
			</kv-switch>
		</div>`,
});

export const WithoutVModel = (args) => ({
	components: {
		KvSwitch,
	},
	setup() {
		return { args };
	},
	data: () => ({
		switchExampleModel: false,
	}),
	template: `
		<div>
			<kv-switch
				:modelValue="switchExampleModel"
				@update:modelValue="(val) => switchExampleModel = val"
				:disabled="args.disabled"
			>
				Switch is switched: {{switchExampleModel}}
			</kv-switch>
		</div>`,
});
