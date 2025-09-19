import KvDatePicker from '../KvDatePicker.vue';

/**
 * KvDatePicker is a wrapper around @vuepic/vue-datepicker that provides
 * a consistent interface for date selection in Kiva applications.
 *
 * The component supports various date formats, time pickers, date ranges,
 * and can be fully customized through CSS variables.
 *
 * @component KvDatePicker
 *
 */
export default {
	title: 'Forms/KvDatePicker',
	component: KvDatePicker,
	argTypes: {
		modelType: {
			control: 'select',
			options: ['timestamp', 'format', 'iso'],
			description: 'The format of the returned date value',
		},
		locale: {
			control: 'select',
			options: ['en', 'es', 'fr', 'de', 'ja', 'zh'],
			description: 'The locale for date formatting',
		},
		format: {
			control: 'text',
			description: 'The date format string (when modelType is "format")',
		},
		enableTimePicker: {
			control: 'boolean',
			description: 'Enable time picker functionality',
		},
		is24: {
			control: 'boolean',
			description: 'Use 24-hour format for time picker',
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the date picker',
		},
		readonly: {
			control: 'boolean',
			description: 'Make the date picker readonly',
		},
		transitionType: {
			control: 'select',
			options: ['fade', 'slide', ''],
			description: 'Animation type for picker transitions',
		},
		range: {
			control: 'boolean',
			description: 'Enable date range selection',
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
					KvDatePicker provides a date selection interface with support for:

					- Single date selection
					- Date ranges
					- Time picker
					- Multiple formats: Timestamp, formatted string, or ISO string
					- Localization: Support for multiple languages
					- Custom theming: Fully customizable via CSS variables

					The component automatically loads the @vuepic/vue-datepicker library
					and its styles when first used.
				`,
			},
		},
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvDatePicker },
	data() {
		return {
			selectedDate: null,
		};
	},
	setup() { return { args }; },
	methods: {
		onDateChange(date) {
			console.log('Date changed:', date);
		},
		onOpen() {
			console.log('Date picker open');
		},
		onClose() {
			console.log('Date picker closed');
		},
	},
	template: `
		<div>
			<label class="tw-text-h4 tw-block tw-pb-1">
				Select Date
			</label>
			<kv-date-picker
				v-model="selectedDate"
				:placeholder="args.placeholder"
				:format="args.format"
				:model-type="args.modelType"
				:locale="args.locale"
				:min-date="args.minDate"
				:max-date="args.maxDate"
				:disabled-dates="args.disabledDates"
				:enable-time-picker="args.enableTimePicker"
				:is24="args.is24"
				:disabled="args.disabled"
				:readonly="args.readonly"
				:popup-class="args.popupClass"
				:range="args.range"
				:theme="args.theme"
				:hide-input-icon="args.hideInputIcon"
				@change="onDateChange"
				@open="onOpen"
				@closed="onClose"
				style="width: 25rem;"
			/>
			<div class="tw-mt-4 tw-text-sm tw-text-gray-600">
				Selected: {{ selectedDate ? (Array.isArray(selectedDate) ? selectedDate.map(d => new Date(d).toLocaleDateString()).join(' - ') : new Date(selectedDate).toLocaleString()) : 'None' }}
			</div>
		</div>`,

});

/**
 * Default date picker with basic functionality.
 *

 */
export const Default = DefaultTemplate.bind({});
Default.args = {
	placeholder: 'Select a date...',
	format: 'MM/dd/yyyy',
	modelType: 'timestamp',
	locale: 'en',
	enableTimePicker: false,
};

/**
 * Date picker with time selection enabled.
 *

 */
export const WithTimePicker = DefaultTemplate.bind({});
WithTimePicker.args = {
	placeholder: 'Select date and time...',
	format: 'MM/dd/yyyy HH:mm',
	modelType: 'timestamp',
	is24: false,
	enableTimePicker: true,
};

/**
 * Date picker with 24-hour time format.
 *
 */
export const TwentyFourHour = DefaultTemplate.bind({});
TwentyFourHour.args = {
	placeholder: 'Select date and time (24h)...',
	format: 'MM/dd/yyyy HH:mm',
	modelType: 'timestamp',
	enableTimePicker: true,
	is24: true,
};

/**
 * Date picker with hidden input icon.
 *
 * This example shows how to hide the calendar icon in the input field
 * using the hide-input-icon prop.
 */
export const HiddenIcon = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvDatePicker },
	data() {
		return {
			selectedDate: null,
		};
	},
	setup() { return { args }; },
	template: `
	<div>
			<div class="tw-space-y-4">
				<div>
					<label class="tw-text-h4 tw-block tw-pb-1">
						With Icon (Default)
					</label>
					<kv-date-picker
						v-model="selectedDate"
						:placeholder="args.placeholder"
						:format="args.format"
						:model-type="args.modelType"
						:locale="args.locale"
						:enable-time-picker="args.enableTimePicker"
						:is24="args.is24"
						:disabled="args.disabled"
						:readonly="args.readonly"
						:transition-type="args.transitionType"
						:hide-input-icon="false"
						style="width: 25rem;"
					/>
				</div>

				<div>
					<label class="tw-text-h4 tw-block tw-pb-1">
						Without Icon (Hidden)
					</label>
					<kv-date-picker
						v-model="selectedDate"
						:placeholder="args.placeholder"
						:format="args.format"
						:model-type="args.modelType"
						:locale="args.locale"
						:enable-time-picker="args.enableTimePicker"
						:is24="args.is24"
						:disabled="args.disabled"
						:readonly="args.readonly"
						:transition-type="args.transitionType"
						:hide-input-icon="true"
						style="width: 25rem;"
					/>
				</div>
			</div>

			<div class="tw-mt-4 tw-text-sm tw-text-gray-600">
				Selected: {{ selectedDate ? new Date(selectedDate).toLocaleString() : 'None' }}
			</div>
		</div>`,
});

HiddenIcon.args = {
	placeholder: 'Select a date...',
	format: 'MM/dd/yyyy',
	modelType: 'timestamp',
	locale: 'en',
	enableTimePicker: false,
};

/**
 * Date range picker for selecting start and end dates.
 *

 */
export const DateRange = DefaultTemplate.bind({});
DateRange.args = {
	placeholder: 'Select date range...',
	format: 'MM/dd/yyyy',
	modelType: 'timestamp',
	range: true,
};

/**
 * Date picker with min/max date constraints.
 *

 */
export const WithMinMaxDates = DefaultTemplate.bind({});
WithMinMaxDates.args = {
	placeholder: 'Select date (with constraints)...',
	format: 'MM/dd/yyyy',
	modelType: 'timestamp',
	minDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
	maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};

/**
 * Examples of different date formats supported by the component.
 *

 */
export const DifferentFormats = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvDatePicker },
	data() {
		return {
			formats: [
				{ name: 'US Format', format: 'MM/dd/yyyy', value: null },
				{ name: 'European Format', format: 'dd/MM/yyyy', value: null },
				{ name: 'ISO Format', format: 'yyyy-MM-dd', value: null },
				{ name: 'Full Date', format: 'EEEE, MMMM do, yyyy', value: null },
			],
		};
	},
	setup() { return { args }; },
	template: `
		<div class="tw-space-y-4">
			<div
				v-for="format in formats"
				:key="format.name"
				class="tw-border tw-border-gray-200 tw-p-4 tw-rounded"
			>
				<label class="tw-text-h4 tw-block tw-pb-1">
					{{ format.name }}
				</label>
				<kv-date-picker
					v-model="format.value"
					:format="format.format"
					:model-type="args.modelType"
					:locale="args.locale"
					placeholder="Select date..."
					style="width: 25rem;"
				/>
				<div class="tw-mt-2 tw-text-sm tw-text-gray-600">
					Selected: {{ format.value ? new Date(format.value).toLocaleString() : 'None' }}
				</div>
			</div>
		</div>`,
});

/**
 * Examples of different locales supported by the component.
 *

 */
export const DifferentLocales = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvDatePicker },
	data() {
		return {
			locales: [
				{ name: 'English', locale: 'en', value: null },
				{ name: 'Spanish', locale: 'es', value: null },
				{ name: 'French', locale: 'fr', value: null },
				{ name: 'German', locale: 'de', value: null },
				{ name: 'Japanese', locale: 'ja', value: null },
			],
		};
	},
	setup() { return { args }; },
	template: `
		<div class="tw-space-y-4">
			<div
				v-for="locale in locales"
				:key="locale.name"
				class="tw-border tw-border-gray-200 tw-p-4 tw-rounded"
			>
				<label class="tw-text-h4 tw-block tw-pb-1">
					{{ locale.name }}
				</label>
				<kv-date-picker
					v-model="locale.value"
					:locale="locale.locale"
					:format="args.format"
					:model-type="args.modelType"
					placeholder="Select date..."
					style="width: 25rem;"
				/>
				<div class="tw-mt-2 tw-text-sm tw-text-gray-600">
					Selected: {{ locale.value ? new Date(locale.value).toLocaleString(locale.locale) : 'None' }}
				</div>
			</div>
		</div>`,
});

/**
 * Examples of different component states (normal, disabled, readonly).
 *
 */
export const States = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvDatePicker },
	data() {
		return {
			normalDate: null,
			disabledDate: null,
			readonlyDate: null,
		};
	},
	setup() { return { args }; },
	template: `
		<div class="tw-space-y-4">
			<div class="tw-border tw-border-gray-200 tw-p-4 tw-rounded">
				<label class="tw-text-h4 tw-block tw-pb-1">
					Normal
				</label>
				<kv-date-picker
					v-model="normalDate"
					:format="args.format"
					placeholder="Select date..."
					style="width: 25rem;"
				/>
			</div>

			<div class="tw-border tw-border-gray-200 tw-p-4 tw-rounded">
				<label class="tw-text-h4 tw-block tw-pb-1">
					Disabled
				</label>
				<kv-date-picker
					v-model="disabledDate"
					:format="args.format"
					:disabled="true"
					placeholder="Disabled datepicker"
					style="width: 25rem;"
				/>
			</div>

			<div class="tw-border tw-border-gray-200 tw-p-4 tw-rounded">
				<label class="tw-text-h4 tw-block tw-pb-1">
					Readonly
				</label>
				<kv-date-picker
					v-model="readonlyDate"
					:format="args.format"
					:readonly="true"
					placeholder="Readonly datepicker"
					style="width: 25rem;"
				/>
			</div>
		</div>`,
});

/**
 * Examples of different model types for date values.
 *
 *
 */
export const ModelTypes = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvDatePicker },
	data() {
		return {
			timestampDate: null,
			formatDate: null,
			isoDate: null,
		};
	},
	setup() { return { args }; },
	template: `
		<div class="tw-space-y-4">
			<div class="tw-border tw-border-gray-200 tw-p-4 tw-rounded">
				<label class="tw-text-h4 tw-block tw-pb-1">
					Timestamp
				</label>
				<kv-date-picker
					v-model="timestampDate"
					:model-type="'timestamp'"
					placeholder="Select date..."
					style="width: 25rem;"
				/>
				<div class="tw-mt-2 tw-text-sm tw-text-gray-600">
					Value: {{ timestampDate }}
				</div>
			</div>

			<div class="tw-border tw-border-gray-200 tw-p-4 tw-rounded">
				<label class="tw-text-h4 tw-block tw-pb-1">
					Format
				</label>
				<kv-date-picker
					v-model="formatDate"
					:model-type="'format'"
					:format="'MM/dd/yyyy'"
					placeholder="Select date..."
					style="width: 25rem;"
				/>
				<div class="tw-mt-2 tw-text-sm tw-text-gray-600">
					Value: {{ formatDate }}
				</div>
			</div>

			<div class="tw-border tw-border-gray-200 tw-p-4 tw-rounded">
				<label class="tw-text-h4 tw-block tw-pb-1">
					ISO
				</label>
				<kv-date-picker
					v-model="isoDate"
					:model-type="'iso'"
					placeholder="Select date..."
					style="width: 25rem;"
				/>
				<div class="tw-mt-2 tw-text-sm tw-text-gray-600">
					Value: {{ isoDate }}
				</div>
			</div>
		</div>`,
});

/**
 * Showcase of all available themes for the date picker.
 *
 * This example demonstrates how the datepicker looks across all supported themes:
 * default, greenLight, greenDark, marigoldLight, stoneLight, and stoneDark.
 */
export const AllThemes = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvDatePicker },
	data() {
		return {
			themes: [
				{ name: 'Default', theme: 'default', value: null },
				{ name: 'Green Light', theme: 'greenLight', value: null },
				{ name: 'Green Dark', theme: 'greenDark', value: null },
				{ name: 'Marigold Light', theme: 'marigoldLight', value: null },
				{ name: 'Stone Light', theme: 'stoneLight', value: null },
				{ name: 'Stone Dark', theme: 'stoneDark', value: null },
			],
		};
	},
	setup() { return { args }; },
	template: `
		<div class="tw-space-y-6">
			<div
				v-for="theme in themes"
				:key="theme.name"
				class="tw-border tw-border-gray-200 tw-p-6 tw-rounded-lg"
			>
				<h3 class="tw-text-lg tw-font-semibold tw-mb-4 tw-text-gray-800">
					{{ theme.name }} Theme
				</h3>
				<kv-date-picker
					v-model="theme.value"
					:theme="theme.theme"
					:placeholder="args.placeholder"
					:format="args.format"
					:model-type="args.modelType"
					:locale="args.locale"
					:enable-time-picker="args.enableTimePicker"
					:is24="args.is24"
					:disabled="args.disabled"
					:readonly="args.readonly"
					:transition-type="args.transitionType"
					style="width: 25rem;"
				/>
				<div class="tw-mt-3 tw-text-sm tw-text-gray-600">
					Selected: {{ theme.value ? new Date(theme.value).toLocaleString() : 'None' }}
				</div>
			</div>
		</div>`,
});

AllThemes.args = {
	placeholder: 'Select a date...',
	format: 'MM/dd/yyyy',
	modelType: 'timestamp',
	locale: 'en',
	enableTimePicker: false,
};
