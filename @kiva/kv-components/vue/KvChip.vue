<template>
	<div class="tw-inline-flex">
		<button
			class="
			chip
			tw-bg-tertiary
			tw-items-center
			tw-flex
			tw-flex-row
			tw-whitespace-nowrap
			"
			@click="handleClick"
		>
			<div class="tw-text-small">
				{{ title }}
			</div>
			<div class="close-button-container tw-text-right">
				<kv-material-icon
					name="small-x"
					class="close-button tw-fill-gray-600"
					:from-sprite="true"
				/>
			</div>
		</button>
	</div>
</template>
<script>
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvChip',
	components: { KvMaterialIcon },
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	methods: {
		handleClick() {
			this.$emit('click-chip');
		},
	},
};
</script>

<style lang="scss" scoped>

	.chip {
		border-radius: rem-calc(4);
		cursor: pointer;
		height: rem-calc(32);
		margin-bottom: rem-calc(6);
		margin-right: rem-calc(6);
		padding-bottom: rem-calc(8);
		padding-left: rem-calc(12);
		padding-top: rem-calc(9);
		padding-right: rem-calc(11.6);
		transition: background-color 0.15s linear;
		user-select: none;

		.close-button-container {
			margin-left: rem-calc(11.6);
			padding-top: rem-calc(1);

			.close-button {
				height: rem-calc(9.5);
				width: rem-calc(9.5);
			}
		}
	}

</style>
