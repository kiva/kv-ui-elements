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
				:transition-type="args.transitionType"
				:popup-class="args.popupClass"
				:range="args.range"
				@change="onDateChange"
				@show="onShow"
				@hide="onHide"
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
 * Example of custom theming using CSS variables.
 *
 * The datepicker can be fully customized by overriding CSS custom properties.
 * This example shows how to apply a custom color scheme.
 *
 *
 */
export const WithCustomTheme = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvDatePicker },
	data() {
		return {
			selectedDate: null,
		};
	},
	setup() { return { args }; },
	mounted() {
		this.applyCustomTheme();
	},
	beforeUnmount() {
		this.removeCustomTheme();
	},
	methods: {
		applyCustomTheme() {
			// Create a style element with custom theme
			const style = document.createElement('style');
			style.id = 'kv-datepicker-custom-theme';
			style.textContent = `
				.kv-datepicker .dp__theme_light {
					--dp-primary-color: #78C79F;
					--dp-primary-text-color: #FFF;
					--dp-border-color: #000;
					--dp-border-color-focus: #78C79F;
					--dp-hover-color: #FFF;
					--dp-background-color: #FFF;
					--dp-text-color: #273A43;
					--dp-menu-border-color: #273A43;
					--dp-disabled-color: #273A43;
					--dp-disabled-color-text: #FFF;
					--dp-success-color: #223829;
					--dp-danger-color: #A24536;
					--dp-icon-color: #78C79F;
					--dp-highlight-color: #223829;
					--dp-font-family: inherit;
					--dp-border-radius: 8px;
					--dp-cell-border-radius: 6px;
					--dp-font-family: system-ui, sans-serif;
				}
			`;
			document.head.appendChild(style);
		},
		removeCustomTheme() {
			const style = document.getElementById('kv-datepicker-custom-theme');
			if (style) {
				style.remove();
			}
		},
	},
	template: `
		<div>
			<div class="tw-mb-4 tw-p-4 tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-lg">
				<h3 class="tw-text-lg tw-font-semibold tw-text-red-800 tw-mb-2">
					Custom Theme Example
				</h3>
				<p class="tw-text-sm tw-text-red-700 tw-mb-3">
					This example shows the datepicker with a custom theme applied using CSS variables.
				</p>
				<div class="tw-bg-white tw-p-3 tw-rounded tw-text-xs tw-overflow-x-auto tw-border">
					<code class="tw-text-red-600">
						.kv-datepicker .dp__theme_light {<br>
						&nbsp;&nbsp;--dp-primary-color: #78C79F;<br>
						&nbsp;&nbsp;--dp-primary-text-color: #FFF;<br>
						&nbsp;&nbsp;--dp-border-color: #000;<br>
						&nbsp;&nbsp;--dp-border-color-focus: #78C79F;<br>
						&nbsp;&nbsp;--dp-hover-color: #FFF;<br>
						&nbsp;&nbsp;--dp-background-color: #FFF;<br>
						&nbsp;&nbsp;--dp-text-color: #273A43;<br>
						&nbsp;&nbsp;--dp-menu-border-color: #273A43;<br>
						&nbsp;&nbsp;--dp-disabled-color: #273A43;<br>
						&nbsp;&nbsp;--dp-disabled-color-text: #FFF;<br>
						&nbsp;&nbsp;--dp-success-color: #223829;<br>
						&nbsp;&nbsp;--dp-danger-color: #A24536;<br>
						&nbsp;&nbsp;--dp-icon-color: #78C79F;<br>
						&nbsp;&nbsp;--dp-highlight-color: #223829;<br>
						&nbsp;&nbsp;--dp-border-radius: 8px;<br>
						&nbsp;&nbsp;--dp-cell-border-radius: 6px;<br>
						&nbsp;&nbsp;--dp-font-family: system-ui, sans-serif;<br>
						}
					</code>
				</div>
			</div>
			
			<label class="tw-text-h4 tw-block tw-pb-1">
				Select Date (Custom Theme)
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
				:popup-class="args.popupClass"
				style="width: 25rem;"
			/>
			<div class="tw-mt-4 tw-text-sm tw-text-gray-600">
				Selected: {{ selectedDate ? new Date(selectedDate).toLocaleString() : 'None' }}
			</div>
		</div>`,
});

WithCustomTheme.args = {
	placeholder: 'Select a date with a custom theme...',
	format: 'MM/dd/yyyy',
	modelType: 'timestamp',
	locale: 'en',
	enableTimePicker: false,
	transitionType: 'slide',
};
