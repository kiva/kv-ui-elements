<template>
	<transition
		@enter="enter"
		@leave="leave"
	>
		<slot></slot>
	</transition>
</template>

<script>
import {
	toRefs,
} from 'vue';
import { expand, collapse } from '../utils/expander';

export default {
	props: {
		property: {
			type: String,
			default: 'height',
		},
		delay: {
			type: Number,
			default: 500,
		},
		easing: {
			type: String,
			default: 'ease',
		},
		skipEnter: {
			type: Boolean,
			default: false,
		},
		skipLeave: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const {
			property,
			delay,
			easing,
			skipEnter,
			skipLeave,
		} = toRefs(props);

		const enter = (el, done) => {
			if (skipEnter.value) {
				return done();
			}

			expand(el, {
				property: property.value,
				delay: delay.value,
				easing: easing.value,
				done,
			});

			return true;
		};

		const leave = (el, done) => {
			if (skipLeave.value) {
				return done();
			}

			collapse(el, {
				property: property.value,
				delay: delay.value,
				easing: easing.value,
				done,
			});

			return true;
		};

		return {
			enter,
			leave,
		};
	},
};
</script>
