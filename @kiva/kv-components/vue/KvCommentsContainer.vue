<template>
	<div>
		<h3>Comment Container Placeholder</h3>
		<p v-if="activityId">
			Comment functionality coming soon!
		</p>
		<p
			v-else
			class="tw-text-desert-rose"
		>
			Activity ID missing
		</p>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * The activity ID for the comments
		 */
		activityId: {
			type: String,
			default: '',
		},
	},
};
</script>
