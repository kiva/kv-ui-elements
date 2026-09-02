<template>
	<kv-theme-provider :theme="themeStyle">
		<div
			class="kv-datepicker"
			:class="theme"
		>
			<div class="kv-datepicker__content">
				<vue-date-picker
					v-model="selectedDate"
					v-bind="$attrs"
					:auto-apply="true"
					@update:model-value="handleDateChange"
				>
					<!--
						Render the calendar icon ourselves so it carries intrinsic width/height.
						VueDatePicker's built-in icon <svg> has a viewBox but no dimensions, so it is
						sized only by `.dp__input_icons` in the library's main.css. A consumer that
						lazily loads this component (e.g. a client-rendered route with code-split CSS)
						paints the markup before that CSS arrives, so the display:block SVG balloons to
						the full input width for a frame, then snaps to 16px. Inline dimensions apply
						with the DOM regardless of when CSS loads, eliminating that flash. Consumers can
						still override the icon via the same `input-icon` slot.
					-->
					<template #input-icon>
						<slot name="input-icon">
							<svg
								class="dp__icon"
								viewBox="0 0 32 32"
								fill="currentColor"
								stroke-width="0"
								aria-hidden="true"
								style="box-sizing: content-box; width: 1rem; height: 1rem; padding: 6px 12px;"
							>
								<!-- eslint-disable max-len -->
								<path d="M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z" />
								<path d="M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" />
								<path d="M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" />
								<path d="M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z" />
								<!-- eslint-enable max-len -->
							</svg>
						</slot>
					</template>
				</vue-date-picker>
			</div>
		</div>
	</kv-theme-provider>
</template>

<script lang="ts">
import { computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import {
	defaultTheme,
	greenLightTheme,
	greenDarkTheme,
	marigoldLightTheme,
	stoneLightTheme,
} from '@kiva/kv-tokens';
import KvThemeProvider from './KvThemeProvider.vue';

export default {
	name: 'KvDatePicker',
	components: {
		KvThemeProvider,
		VueDatePicker,
	},
	inheritAttrs: false,
	props: {
		modelValue: {
			type: [Date, String, Number, Array],
			default: null,
		},

		theme: {
			type: String,
			default: 'default',
			validator(value: string) {
				return [
					'default', 'greenLight', 'greenDark', 'marigoldLight', 'stoneLight',
				].includes(value);
			},
		},
	},
	emits: [
		'update:model-value',
		'change',
	],
	setup(props) {
		const themeStyle = computed(() => {
			switch (props.theme) {
				case 'default':
					return defaultTheme;
				case 'greenDark':
					return greenDarkTheme;
				case 'greenLight':
					return greenLightTheme;
				case 'marigoldLight':
					return marigoldLightTheme;
				case 'stoneLight':
					return stoneLightTheme;
				default:
					return defaultTheme;
			}
		});

		return { themeStyle };
	},
	data() {
		return {
			selectedDate: null,
		};
	},
	watch: {
		modelValue: {
			handler(newValue) {
				this.selectedDate = newValue;
			},
			immediate: true,
		},
	},
	methods: {
		handleDateChange(value) {
			this.selectedDate = value;
			this.$emit('update:model-value', value);
			this.$emit('change', value);
		},
	},
};
</script>

<style>
.kv-datepicker .dp__input {
	font-family: inherit;
	font-weight: inherit;
	height: 3rem;
}

.kv-datepicker .dp__input:focus-within,
.kv-datepicker .dp__input:focus-visible {
	border-color: rgb(var(--bg-action));
	border-width: 2px;
	outline: none;
}

.kv-datepicker .dp__disabled {
	color: rgb(var(--text-tertiary));
}

/* Default theme */
.kv-datepicker .dp__theme_light {
	--dp-primary-color: rgb(var(--bg-primary-inverse));
	--dp-secondary-color: rgb(var(--bg-tertiary));
	--dp-icon-color: rgb(var(--bg-action));
	--dp-hover-icon-color: rgb(var(--bg-action));
	--dp-border-radius: 0.25rem;
	--dp-border-color-focus: rgb(var(--bg-action-highlight));
	--dp-font-family: inherit, 'Postgrotesk', sans-serif;
	--dp-primary-text-color: rgb(var(--text-primary-inverse));
	--dp-border-color: rgb(var(--bg-tertiary));
	--dp-hover-color: rgb(var(--bg-tertiary));
	--dp-background-color: rgb(var(--bg-primary));
	--dp-text-color: rgb(var(--text-primary));
	--dp-menu-border-color: rgb(var(--bg-primary-inverse));
	--dp-disabled-color: rgb(var(--bg-tertiary), 25%);
	--dp-disabled-color-text: rgb(var(--bg-tertiary));
	--dp-success-color: rgb(var(--bg-action));
	--dp-danger-color: rgb(var(--bg-danger));
	--dp-highlight-color: rgb(var(--bg-action));
	--dp-cell-border-radius: 0.25rem;
	--dp-loader: rgb(var(--bg-action));
	--dp-range-between-dates-background-color: rgb(var(--bg-action));
	--dp-range-between-dates-text-color: rgb(var(--bg-primary));
	--dp-range-between-border-color: rgb(var(--bg-action));
}
</style>
