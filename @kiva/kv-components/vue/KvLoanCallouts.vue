<template>
	<div
		class="tw-overflow-hidden"
		style="width: inherit;"
	>
		<div
			class="
				tw-flex
				tw-whitespace-nowrap
				tw-w-full
				tw-h-4
			"
		>
			<span
				v-for="tag in callouts"
				:key="tag.label"
				:title="tag.label"
				class="
					loan-callout
					tw-text-ellipsis
					tw-overflow-hidden
					tw-rounded-full
					tw-font-medium
					tw-py-0.5
					tw-px-1
					tw-mr-0.5
					tw-mb-0.5
					tw-text-small
				"
				:class="{ 'tw-cursor-pointer hover:tw-underline': isClickable(tag) }"
				@click="clickCallout(tag)"
			>
				{{ tag.label }}
			</span>
		</div>
	</div>
</template>

<script>
import { toRefs } from 'vue-demi';

export default {
	name: 'KvLoanCallouts',
	props: {
		callouts: {
			type: Array,
			required: true,
		},
		enableClickable: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'click',
	],
	setup(props, { emit }) {
		const {
			enableClickable,
		} = toRefs(props);

		const isClickable = (tag) => {
			const clickableTypes = ['activity', 'sector', 'tag', 'theme'];
			const isClickableType = clickableTypes.includes(tag.type);

			return enableClickable.value && isClickableType && !!tag.id;
		};

		const clickCallout = (tag) => {
			if (isClickable(tag)) {
				emit('click', tag);
			}
		};

		return {
			isClickable,
			clickCallout,
		};
	},
};
</script>

<style scoped>
.loan-callout {
	background: #f1f1f1;
}
</style>
