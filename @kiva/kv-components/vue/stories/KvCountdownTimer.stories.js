import KvCountdownTimer from '../KvCountdownTimer.vue';

export default {
	title: 'KvCountdownTimer',
	component: KvCountdownTimer,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: {
			KvCountdownTimer,
		},
		template: `
			<kv-countdown-timer
				:ms-left="msLeft"
			/>
		`,
	});
	template.args = args;
	return template;
};

export const Seconds = story({ msLeft: 1000 * 10 });

// One second less than 24 hours (since we don't show days in timer)
export const Tomorrow = story({ msLeft: 1000 * 60 * 60 * 24 - 1000 });

export const Expired = story({ msLeft: 0 });
