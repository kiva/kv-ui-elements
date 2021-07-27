import KvCheckbox from '../KvCheckbox.vue';
import KvRadio from '../KvRadio.vue';
import KvSelect from '../KvSelect.vue';
import KvSwitch from '../KvSwitch.vue';

import { Default as CheckboxDefault } from './KvCheckbox.stories';
import { Default as RadioDefault } from './KvRadio.stories';
import { Default as SwitchDefault } from './KvSwitch.stories';

export default {
	title: 'Forms/KitchenSink',
};

const Template = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvCheckbox,
		KvRadio,
		KvSelect,
		KvSwitch,
	},
	data: () => ({
		...CheckboxDefault(args, { argTypes }).data(),
		...RadioDefault(args, { argTypes }).data(),
		...SwitchDefault(args, { argTypes }).data(),
	}),
	methods: {
		...CheckboxDefault(args, { argTypes }).methods,
		...RadioDefault(args, { argTypes }).methods,
		...SwitchDefault(args, { argTypes }).methods,
	},
	template: `
		<div>
			${CheckboxDefault(args, { argTypes }).template}
			${RadioDefault(args, { argTypes }).template}
			${SwitchDefault(args, { argTypes }).template}
		</div>`,
});

export const Default = Template.bind({});
