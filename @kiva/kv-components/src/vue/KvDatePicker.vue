<template>
	<div class="kv-datepicker">
		<div
			v-if="datepickerComponent"
			class="kv-datepicker__content"
		>
			<component
				:is="datepickerComponent"
				:key="componentKey"
				v-model="selectedDate"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
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
</template>

<script>
import { markRaw } from 'vue';

export default {
	name: 'KvDatePicker',
	inheritAttrs: false,
	props: {
		modelValue: {
			type: [Date, String, Number, Array],
			default: null,
		},
		placeholder: {
			type: String,
			default: 'Select date...',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
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
				import('@vuepic/vue-datepicker/dist/main.css')])
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
	--dp-hover-color: rgb(var(--bg-primary));
	--dp-background-color: rgb(var(--bg-primary));
	--dp-text-color: rgb(var(--text-primary));
	--dp-menu-border-color: rgb(var(--bg-primary-inverse));
	--dp-disabled-color: rgb(var(--bg-primary));
	--dp-disabled-color-text: rgb(var(--text-secondary));
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
