import KvLendCta from '../KvLendCta';

export default {
	title: 'KvLendCta',
	component: KvLendCta,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLendCta },
		setup() { return { args: { ...templateArgs } }; },
		template: `
			<div style="width: 300px;">
				<kv-lend-cta
					v-bind="args"
				/>
			</div>
		`,
	});
	template.args = args;
	return template;
};

const kvTrackFunction = () => { };

const secondaryButtonHandler = () => { console.log('secondary button handler'); };

export const Loading = story({ isLoading: true, kvTrackFunction });

export const Adding = story({ isLoading: false, isAdding: true, kvTrackFunction });

export const Basketed = story({
	isLoading: false,
	loan: { id: 1 },
	basketItems: [
		{
			__typename: 'LoanReservation',
			id: 1,
		},
	],
	kvTrackFunction,
});

export const BasketedWithSecondaryAction = story({
	isLoading: false,
	loan: { id: 1 },
	basketItems: [
		{
			__typename: 'LoanReservation',
			id: 1,
		},
	],
	externalLinks: true,
	kvTrackFunction,
	secondaryButtonHandler,
});

export const Funded = story({
	isLoading: false,
	loan: { status: 'funded' },
	kvTrackFunction,
});

export const NonActionable = story({
	isLoading: false,
	loan: { status: 'refunded' },
	kvTrackFunction,
});

export const Dropdown = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '150.00',
	},
	kvTrackFunction,
});

export const HugeAmount = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '12850.00',
	},
	kvTrackFunction,
	enableHugeAmount: true,
	isVisitor: false,
});

export const HugeAmountUnder1000 = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '850.00',
	},
	kvTrackFunction,
	enableHugeAmount: true,
	isVisitor: false,
});

export const FiveDollar = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '150.00',
	},
	enableFiveDollarsNotes: true,
	kvTrackFunction,
});

export const FiveDollarsSelected = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '150.00',
	},
	enableFiveDollarsNotes: true,
	fiveDollarsSelected: true,
	kvTrackFunction,
});

export const LessThan25 = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '20.00',
	},
	kvTrackFunction,
});

export const Non25Increments = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '30.00',
	},
	kvTrackFunction,
});

export const LendAgain = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '150.00',
		userProperties: { lentTo: true },
	},
	kvTrackFunction,
});

export const ViewLoan = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '150.00',
	},
	kvTrackFunction,
	showViewLoan: true,
});

export const ViewLoanFunded = story({
	isLoading: false,
	loan: { status: 'funded' },
	kvTrackFunction,
	showViewLoan: true,
});

export const WithPresetOptions = story({
	isLoading: false,
	loan: {
		id: 1,
		name: 'John',
		unreservedAmount: '150.00',
		borrowerCount: 1,
	},
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsGroup = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '150.00',
		borrowerCount: 2,
	},
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsEqualThanLastAmount = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '75.00',
		borrowerCount: 2,
	},
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsLessThanLastAmount = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '50.00',
		borrowerCount: 2,
	},
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsLessThan25 = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '10.00',
		borrowerCount: 2,
	},
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsLessThan50 = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '40.00',
		borrowerCount: 2,
	},
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsLessThan100 = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '80.00',
		borrowerCount: 2,
	},
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsLessThan200 = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '190.00',
		borrowerCount: 2,
	},
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsHugeAmount = story({
	isLoading: false,
	loan: {
		id: 1,
		unreservedAmount: '12850.00',
	},
	kvTrackFunction,
	enableHugeAmount: true,
	isVisitor: false,
	showPresetAmounts: true,
});

export const WithPresetOptionsLoading = story({
	isLoading: true,
	kvTrackFunction,
	loan: {
		id: 1,
		unreservedAmount: '150.00',
		borrowerCount: 2,
	},
	showPresetAmounts: true,
});

export const WithPresetOptionsAdding = story({
	isLoading: false,
	isAdding: true,
	kvTrackFunction,
	loan: {
		id: 1,
		unreservedAmount: '150.00',
		borrowerCount: 2,
	},
	showPresetAmounts: true,
});

export const WithPresetOptionsBasketed = story({
	isLoading: false,
	loan: { id: 1 },
	basketItems: [
		{
			__typename: 'LoanReservation',
			id: 1,
		},
	],
	showPresetAmounts: true,
	kvTrackFunction,
});

export const WithPresetOptionsBasketedWithSecondaryAction = story({
	isLoading: false,
	loan: { id: 1 },
	basketItems: [
		{
			__typename: 'LoanReservation',
			id: 1,
		},
	],
	externalLinks: true,
	kvTrackFunction,
	secondaryButtonHandler,
	showPresetAmounts: true,
});

export const WithPresetOptionsFunded = story({
	isLoading: false,
	loan: { status: 'funded' },
	kvTrackFunction,
	showPresetAmounts: true,
});

export const WithPresetOptionsNonActionable = story({
	isLoading: false,
	loan: { status: 'refunded' },
	kvTrackFunction,
	showPresetAmounts: true,
});
