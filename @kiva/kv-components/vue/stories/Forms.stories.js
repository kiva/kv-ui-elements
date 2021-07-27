import KvCheckbox from '../KvCheckbox.vue';
import KvRadio from '../KvRadio.vue';
import KvSelect from '../KvSelect.vue';
import KvSwitch from '../KvSwitch.vue';

import { Default as CheckboxDefault } from './KvCheckbox.stories';
import { Default as RadioDefault } from './KvRadio.stories';
import { Default as SelectDefault } from './KvSelect.stories';
import { Default as SwitchDefault } from './KvSwitch.stories';

export default {
	title: 'Forms',
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
		...SelectDefault(args, { argTypes }).data(),
	}),
	methods: {
		...CheckboxDefault(args, { argTypes }).methods,
		...RadioDefault(args, { argTypes }).methods,
		...SwitchDefault(args, { argTypes }).methods,
		...SelectDefault(args, { argTypes }).methods,
	},
	template: `
		<div>
			${CheckboxDefault(args, { argTypes }).template}<br /><br />
			${RadioDefault(args, { argTypes }).template}<br /><br />
			${SwitchDefault(args, { argTypes }).template}<br /><br />
			${SelectDefault(args, { argTypes }).template}<br /><br />
		</div>`,
});

export const KitchenSink = Template.bind({});
