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
	border-color: #19653e;
	border-width: 2px;
	outline: none;
}
.kv-datepicker .dp__theme_light {
	--dp-primary-color: #19653e;
	--dp-secondary-color: #9E9E9E;
	--dp-icon-color: #19653e;
	--dp-hover-icon-color: #19653e;
	--dp-border-radius: 0.25rem;
	--dp-border-color-focus: #19653e;
	--dp-font-family: inherit, 'Postgrotesk', sans-serif;
	--dp-primary-text-color: #fff;
	--dp-border-color: #c4c4c4;
	--dp-hover-color: #fff;
	--dp-background-color: #fff;
	--dp-text-color: #273a43;
	--dp-menu-border-color: #273a43;
	--dp-disabled-color: #273a43;
	--dp-disabled-color-text: #fff;
	--dp-success-color: #19653e;
	--dp-danger-color: #E0988D;
	--dp-highlight-color: #19653e;
	--dp-cell-border-radius: 0.25rem;
	--dp-loader: #19653e;
	--dp-range-between-dates-background-color: #1d7748;
	--dp-range-between-dates-text-color: #fff;
	--dp-range-between-border-color: #1d7748;
}
</style>
