import KvLocationSelector from '../KvLocationSelector.vue';

const regions = [
	{
		region: 'Africa',
		countries: [
			{
				__typename: 'Country',
				name: 'Burkina Faso',
				region: 'Africa',
				isoCode: 'BF',
				numLoansFundraising: 43,
			},
			{
				__typename: 'Country',
				name: 'Congo (DRC)',
				region: 'Africa',
				isoCode: 'CD',
				numLoansFundraising: 42,
			},
			{
				__typename: 'Country',
				name: 'Egypt',
				region: 'Africa',
				isoCode: 'EG',
				numLoansFundraising: 13,
			},
			{
				__typename: 'Country',
				name: 'Ghana',
				region: 'Africa',
				isoCode: 'GH',
				numLoansFundraising: 54,
			},
			{
				__typename: 'Country',
				name: 'Kenya',
				region: 'Africa',
				isoCode: 'KE',
				numLoansFundraising: 1046,
			},
			{
				__typename: 'Country',
				name: 'Liberia',
				region: 'Africa',
				isoCode: 'LR',
				numLoansFundraising: 117,
			},
		],
		numLoansFundraising: 2095,
	},
	{
		region: 'North America',
		countries: [
			{
				__typename: 'Country',
				name: 'Dominican Republic',
				region: 'North America',
				isoCode: 'DO',
				numLoansFundraising: 14,
			},
			{
				__typename: 'Country',
				name: 'Mexico',
				region: 'North America',
				isoCode: 'MX',
				numLoansFundraising: 7,
			},
			{
				__typename: 'Country',
				name: 'Puerto Rico',
				region: 'North America',
				isoCode: 'PR',
				numLoansFundraising: 2,
			},
			{
				__typename: 'Country',
				name: 'United States',
				region: 'North America',
				isoCode: 'US',
				numLoansFundraising: 8,
			},
		],
		numLoansFundraising: 31,
	},
];

export default {
	title: 'KvLocationSelector',
	component: KvLocationSelector,
	argTypes: {
		regions: {
			control: {
				type: 'select',
				options: regions,
			},
		},
		activeIsoCodes: {
			control: {
				type: 'select',
				options: [],
			},
		},
	},
};

const Template = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvLocationSelector,
	},
	template: `
			<kv-location-selector
				:regions="regions"
				:active-iso-codes="activeIsoCodes"
			/>
		`,
});

export const Default = Template.bind({});
Default.args = {
	regions,
};
