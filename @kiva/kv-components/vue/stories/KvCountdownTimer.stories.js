import KvCountdownTimer from '../KvCountdownTimer.vue';

export default {
	title: 'KvCountdownTimer',
	component: KvCountdownTimer,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		setup() { return { args: { ...templateArgs } }; },
		components: {
			KvCountdownTimer,
		},
		template: `
			<kv-countdown-timer
				v-bind="args"
			/>
		`,
	});
	template.args = args;
	return template;
};

export const Seconds = story({ msLeft: 1000 * 10 });

export const Tomorrow = story({ msLeft: 1000 * 60 * 60 * 24 });

export const Expired = story({ msLeft: 0 });

export const Overmorrow = story({ msLeft: 1000 * 60 * 60 * 48 });
