import KvCartPill from '../KvCartPill.vue';

export default {
	title: 'KvCartPill',
	component: KvCartPill,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		borrowerName: '',
		showBg: false,
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCartPill },
	setup() { return { args }; },
	template: `
		<div>
			<kv-cart-pill :borrower-name="borrowerName" :show-bg="showBg" />
		</div>
	`,
	data() {
		return {
			borrowerName: args.borrowerName,
			showBg: args.showBg,
		};
	},
});

export const Default = DefaultTemplate.bind({});

export const WithSecondaryBackground = DefaultTemplate.bind({});
WithSecondaryBackground.args = {
	showBg: true,
};
export const PillWithBorrower = DefaultTemplate.bind({});
PillWithBorrower.args = {
	borrowerName: 'Maria',
};
