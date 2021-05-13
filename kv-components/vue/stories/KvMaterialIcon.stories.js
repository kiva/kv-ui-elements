import KvMaterialIcon from '../KvMaterialIcon.vue';

function getFilenames(r) {
	return r.keys().map((filename) => {
		let str = filename;
		str = str.substring(2); // remove ./
		str = str.substring(0, str.length - 4); // remove .ext
		return str;
	});
}

export default {
	title: 'KvMaterialIcon',
	component: KvMaterialIcon,
	argTypes: {
		name: {
			control: {
				disable: true, // disable the list of all icons since we only use them on one story
			},
		},
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<kv-material-icon
			:name="name"
		/>`,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
	name: 'Cart',
};
Default.argTypes = {
	name: {
		control: {
			type: 'select',
			options: getFilenames(require.context('vue-material-design-icons/', true, /\.vue$/)),
			disable: false,
		},
	},
};

export const Common = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div class="flex gap-1">
			<kv-material-icon
				v-for="name in [
					'AlertCircleOutline',
					'ArrowDown',
					'ArrowBottomLeft',
					'ArrowLeft',
					'ArrowTopLeft',
					'ArrowUp',
					'ArrowTopRight',
					'ArrowRight',
					'ArrowBottomRight',
					'ChevronLeft',
					'ChevronRight',
					'ChevronDown',
					'ChevronUp',
					'Close',
					'Magnify',
				]"
				:key="name"
				:name="name"
			/>
		</div>
	`,
});

export const Colored = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div>
			<p class="mb-2">Use text-color to set the icon color</p>
			<kv-material-icon
				name="Check"
				class="text-brand-500"
			/>
			<kv-material-icon
				name="AlertCircleOutline"
				class="text-danger"
			/>
		</div>`,
});

export const InlineWithText = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<a href="#" class="inline-flex">
			<span class="text-h4">He went thataway</span>
			<kv-material-icon class="w-2.5" name="ChevronRight" />
		</a>`,
});

export const Sizing = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div>
			<p class="mb-2">Icons can be sized using any of the standard sizing classes (.w-2, .w-3, .w-full, etc.). By default they are 24 x 24 (.w-3).</p>
			<kv-material-icon class="bg-gray-100 w-2" name="ChevronRight" />
			<kv-material-icon class="bg-gray-100 w-4" name="ChevronRight" />
			<kv-material-icon class="bg-gray-100 w-8" name="ChevronRight" />
			<kv-material-icon class="bg-gray-100 w-16" name="ChevronRight" />
		</div>`,
});

export const WithAccessibleText = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div>
			<p class="mb-2">If you don't include text and your icon is not decorative, be sure to include screen-reader text</p>
			<button class="rounded-sm bg-gray-100 hover:bg-gray-300 p-1 inline-flex">
				<kv-material-icon class="w-3" name="Close" />
				<span class="sr-only">Close modal</span>
			</button>
		</div>`,
});

export const StarsDemo = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div class="flex">
			<button
				v-for="i in 5"
				:key="i"
				@click="rating = i"
				class="text-black hover:text-action-700"
			>
				<kv-material-icon :name="getStarIcon(i)"/>
				<span class="sr-only">Set rating to {{i}}</span>
			</button>
		</div>`,
	data() {
		return {
			rating: 2,
		};
	},
	methods: {
		getStarIcon(index) {
			return this.rating >= index ? 'Star' : 'StarOutline';
		},
	},
});
