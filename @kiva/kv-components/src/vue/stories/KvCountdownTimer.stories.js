import { add } from 'date-fns';
import KvCountdownTimer from '../KvCountdownTimer.vue';

export default {
	title: 'Interface Elements/KvCountdownTimer',
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

export const Seconds = story({ deadline: add(new Date(), { seconds: 10 }) });

export const Tomorrow = story({ deadline: add(new Date(), { days: 1 }) });

export const Expired = story({ deadline: new Date() });

export const Overmorrow = story({ deadline: add(new Date(), { days: 2 }) });
