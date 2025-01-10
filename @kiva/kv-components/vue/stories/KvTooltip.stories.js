import KvTooltip from '../KvTooltip';

export default {
	title: 'KvTooltip',
	component: KvTooltip,
};

export const Default = () => ({
	components: {
		KvTooltip,
	},
	template: `
		<div>
			<button id="my-cool-btn">Hover of Focus Me!</button>
			<kv-tooltip controller="my-cool-btn">
				<template #title>
					What is an Experimental Field Partner?
				</template>
				If a Field Partner is labeled as Experimental, this means that Kiva has
				required only a comparatively light level of due diligence and
				monitoring, in exchange for only allowing this Field Partner access to a
				small amount of funding through Kiva at any given time.
			</kv-tooltip>
		</div>
	`,
});
