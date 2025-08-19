<template>
	<div class="pulsing-dot">
		<div
			class="pulsing-dot__ring"
			:class="pulseColorClass"
		></div>
		<div
			class="pulsing-dot__circle"
			:class="dotColorClass"
		></div>
	</div>
</template>

<script>
export default {
	name: 'KvPulsingDot',
	props: {
		dotColorClass: {
			type: String,
			default: 'tw-bg-brand',
		},
		pulseColorClass: {
			type: String,
			default: 'tw-border-brand',
		},
	},
	setup() {
		return {};
	},
};
</script>

<style lang="postcss" scoped>
.pulsing-dot {
	@apply tw-relative;
}

.pulsing-dot__circle {
	@apply tw-w-1 tw-h-1 tw-rounded-full;
}

.pulsing-dot__ring {
	@apply tw-border-solid tw-border-2;
	@apply tw-h-1.5 tw-w-1.5 tw-rounded-full tw-absolute;
	left: -2px;
	top: -2px;
	animation: pulsate 1s ease-out;
	animation-iteration-count: infinite;
	opacity: 0.0
}

@keyframes pulsate {
	0% {transform: scale(0.1, 0.1); opacity: 0.0;}
	50% {opacity: 1.0;}
	100% {transform: scale(1.2, 1.2); opacity: 0.0;}
}
</style>
