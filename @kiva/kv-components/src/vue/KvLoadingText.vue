<template>
	<div class="kv-loading-text">
		<div
			v-for="n in lineCount"
			:key="n"
			class="kv-loading-text-line"
			:class="{'extra-line': n !== 1}"
		>
			<div class="kv-loading-text-placeholder">
				<kv-loading-placeholder />
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';

const props = defineProps({
	/**
	 * Number of loading text lines to render. When greater than 1,
	 * the final line renders at 70% width to mimic wrapped text.
	 * Values below 1, fractions, and non-numbers render a single line.
	 */
	lines: {
		type: Number,
		default: 1,
	},
});

const lineCount = computed(() => {
	const whole = Math.floor(props.lines);
	return Number.isFinite(whole) && whole > 1 ? whole : 1;
});
</script>

<style lang="postcss" scoped>
.kv-loading-text-line {
	width: 100%;

	&.extra-line:last-of-type {
		width: 70%;
	}

	.kv-loading-text-placeholder {
		display: inline-block;
		vertical-align: baseline;
		width: 100%;
		height: 0.7em;
		height: 1cap;
	}
}
</style>
