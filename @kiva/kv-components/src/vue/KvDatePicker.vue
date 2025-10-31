<template>
	<kv-theme-provider :theme="themeStyle">
		<div
			class="kv-datepicker"
			:class="theme"
		>
			<div
				v-if="datepickerComponent"
				class="kv-datepicker__content"
			>
				<component
					:is="datepickerComponent"
					:key="componentKey"
					v-model="selectedDate"
					v-bind="$attrs"
					:auto-apply="true"
					@update:model-value="handleDateChange"
				/>
			</div>
			<div
				v-else
				class="kv-datepicker__loading"
			>
				Loading...
			</div>
		</div>
	</kv-theme-provider>
</template>

<script lang="ts">
import { markRaw, computed } from 'vue';

import {
	defaultTheme,
	greenLightTheme,
	greenDarkTheme,
	marigoldLightTheme,
	stoneLightTheme,
	stoneDarkTheme,
} from '@kiva/kv-tokens';
import KvThemeProvider from './KvThemeProvider.vue';

export default {
	name: 'KvDatePicker',
	components: {
		KvThemeProvider,
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
					'default', 'greenLight', 'greenDark', 'marigoldLight', 'stoneLight', 'stoneDark',
				].includes(value);
			},
		},
	},
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
				case 'stoneDark':
					return stoneDarkTheme;
				default:
					return defaultTheme;
			}
		});

		return { themeStyle };
	},
	data() {
		return {
			datepickerComponent: null,
			datepickerPromise: null,
			selectedDate: null,
			componentKey: 0,
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
	mounted() {
		this.loadDatepicker();
	},
	methods: {
		async loadDatepicker() {
			if (this.datepickerComponent) return;
			if (this.datepickerPromise) return this.datepickerPromise;

			this.datepickerPromise = Promise.all([
				import('@vuepic/vue-datepicker'),
				import('@vuepic/vue-datepicker/dist/main.css' as any)])
				.then(async ([module]) => {
					this.datepickerComponent = markRaw(module.default);
					await this.$nextTick();
				});

			return this.datepickerPromise;
		},
		handleDateChange(value) {
			this.selectedDate = value;
			this.$emit('update:model-value', value);
			this.$emit('change', value);
		},
	},
};
</script>

<style>
.kv-datepicker__loading {
	padding: 20px;
	text-align: center;
	color: var(--text-secondary);
}

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
