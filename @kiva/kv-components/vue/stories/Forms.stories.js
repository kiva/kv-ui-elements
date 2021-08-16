import KvCheckbox from '../KvCheckbox.vue';
import KvRadio from '../KvRadio.vue';
import KvSelect from '../KvSelect.vue';
import KvSwitch from '../KvSwitch.vue';
import KvTextInput from '../KvTextInput.vue';

import { Multiple as CheckboxDefault } from './KvCheckbox.stories';
import { Default as RadioDefault } from './KvRadio.stories';
import { Default as SelectDefault } from './KvSelect.stories';
import { Default as SwitchDefault } from './KvSwitch.stories';
import { Default as TextInputDefault } from './KvTextInput.stories';

export default {
	title: 'Forms',
	args: {
		checked: false,
		disabled: false,
		placeholder: '',
		valid: true,
		icon: null,
		type: 'text',
	},
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
		KvTextInput,
	},
	data: () => ({
		...CheckboxDefault(args, { argTypes }).data(),
		...RadioDefault(args, { argTypes }).data(),
		...SwitchDefault(args, { argTypes }).data(),
		...SelectDefault(args, { argTypes }).data(),
		...TextInputDefault(args, { argTypes }).data(),
	}),
	methods: {
		...CheckboxDefault(args, { argTypes }).methods,
		...RadioDefault(args, { argTypes }).methods,
		...SwitchDefault(args, { argTypes }).methods,
		...SelectDefault(args, { argTypes }).methods,
		...TextInputDefault(args, { argTypes }).methods,
	},
	template: `
		<div>
			${CheckboxDefault(args, { argTypes }).template}<br /><br />
			${RadioDefault(args, { argTypes }).template}<br /><br />
			${SwitchDefault(args, { argTypes }).template}<br /><br />
			${SelectDefault(args, { argTypes }).template}<br /><br />
			${TextInputDefault(args, { argTypes }).template}<br /><br />
		</div>`,
});

export const KitchenSink = Template.bind({});
