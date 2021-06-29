import KvLightbox from '../KvLightbox.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvLightbox',
	component: KvLightbox,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		visible: true,
		title: 'Lightbox Title',
		variant: 'lightbox',
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvLightbox, KvButton },
	template: `
		<div>
			<kv-button @click="isLightboxVisible = true;">Show lightbox</kv-button>

			<p>Reprehenderit dolore anim voluptate non ad ipsum. Deserunt incididunt minim cillum dolore nulla aliquip Lorem quis est minim ullamco laborum veniam. Officia Lorem pariatur pariatur ex pariatur anim adipisicing ad dolore esse qui non. Elit cillum sunt sint esse velit. Eiusmod laborum non et anim irure culpa anim consectetur sit dolore aute. Deserunt proident qui aliquip sint quis eu veniam aute sit nostrud officia esse.
			Et adipisicing ea veniam aute aliqua Lorem ea ex adipisicing magna adipisicing pariatur sit ullamco. Consectetur ipsum nostrud sunt tempor proident reprehenderit consectetur enim elit nisi cupidatat labore anim. Occaecat enim ad ex dolor laborum elit sint laboris est. Incididunt aliquip cupidatat eiusmod Lorem nostrud pariatur ad non anim voluptate cillum fugiat id. Irure aliquip amet pariatur Lorem Lorem ut adipisicing minim excepteur ad. Ullamco in est aliquip sit exercitation dolor.
			Consectetur magna Lorem reprehenderit occaecat. Duis commodo ad ea eiusmod consequat. Sit cupidatat irure cillum veniam officia cillum mollit sunt reprehenderit enim pariatur pariatur. Reprehenderit in sunt eiusmod mollit velit laborum qui eiusmod eu pariatur et proident ullamco. Labore proident cillum consequat occaecat duis ipsum ex sit fugiat. Est dolore ea excepteur enim laboris sunt officia cillum nisi.
			Magna sint laboris duis ipsum laboris velit dolor sunt consectetur. Deserunt tempor et occaecat exercitation. Reprehenderit adipisicing minim cupidatat consectetur nostrud nostrud culpa pariatur qui in cupidatat. Veniam adipisicing pariatur pariatur consectetur reprehenderit consectetur. Exercitation est aliqua consectetur labore qui id laboris proident sint labore ex.
			Irure sunt fugiat aliqua qui adipisicing ipsum in Lorem consectetur aliquip Lorem pariatur. Consectetur ex esse elit voluptate est qui duis magna tempor id duis. Nisi commodo esse qui minim aliquip. Voluptate ex ut cillum elit velit incididunt ea laborum culpa amet. Id dolore excepteur non id consequat commodo nisi aliquip non sunt laboris est labore labore. Labore esse ad nostrud culpa proident sit aute esse elit do. Pariatur aliqua quis fugiat culpa irure nisi occaecat ut est sint anim esse cillum.
			Occaecat incididunt commodo incididunt magna dolor nisi nisi proident dolore enim ut reprehenderit. Ipsum enim consectetur est cillum irure est voluptate fugiat elit. Magna culpa quis sunt eiusmod id.
			Sint in nisi non laborum tempor quis do et. Labore incididunt reprehenderit officia mollit sunt. Elit veniam ullamco id amet commodo incididunt dolor ut irure reprehenderit sit Lorem amet. Quis proident mollit officia veniam sunt tempor aliquip eiusmod anim nostrud id Lorem mollit est. Dolor nisi aute enim nostrud culpa incididunt occaecat anim esse consequat sunt. Nostrud voluptate laborum aute tempor laboris in nostrud proident eu aliqua elit.
			Ad elit deserunt officia non est exercitation fugiat exercitation exercitation dolore. Sunt est consequat ut officia officia esse consequat enim exercitation sit cillum commodo nulla reprehenderit. Quis eu laborum ea enim ipsum exercitation elit nisi id dolore. Cillum quis cillum anim adipisicing ad incididunt laboris dolor magna. Elit voluptate anim minim excepteur incididunt commodo nulla mollit ullamco sunt in aliqua ullamco.
			Laborum non proident ut aliquip aliqua commodo officia ea duis culpa tempor eiusmod. Pariatur incididunt non eu officia culpa adipisicing. Consequat consectetur cupidatat labore proident nostrud eiusmod tempor ex duis pariatur ullamco nisi voluptate incididunt. Laborum veniam qui cillum do cillum eu irure proident aliquip ad proident consectetur. Do reprehenderit aute veniam minim duis. Proident incididunt nostrud quis dolore cupidatat ex. Eiusmod deserunt aliqua cillum reprehenderit reprehenderit.
			Qui nulla laboris id ipsum labore. Reprehenderit reprehenderit irure ut esse sint incididunt occaecat consequat velit. Do sunt anim culpa excepteur dolor ex nulla incididunt voluptate. Id proident ipsum aliqua irure ex exercitation culpa enim sunt. Voluptate laboris id nulla ullamco magna deserunt cillum nisi.
			</p>

			<kv-lightbox
				:visible="isLightboxVisible"
				:title="title"
				:variant="variant"
				@lightbox-closed="isLightboxVisible = false"
			>
				<p>Lorem ipsum aliquip labore commodo anim elit amet cupidatat do ex ipsum. Consectetur excepteur ea anim velit reprehenderit qui aliquip ullamco aliquip irure dolor ex. Occaecat excepteur enim eu incididunt ut consectetur aliqua magna et. Reprehenderit duis ex excepteur sit et cupidatat cillum cillum adipisicing ut adipisicing minim ad.</p>
				<p>Et id excepteur cillum quis. Culpa dolore eiusmod ex officia ea deserunt. Aliquip velit deserunt Lorem nisi mollit aliquip esse quis. Lorem aliquip ex id reprehenderit irure cillum elit aliqua laboris fugiat aliquip irure. Nostrud irure est anim qui eu in eu quis cupidatat. Fugiat officia aliqua laborum in incididunt tempor anim ex velit qui magna. Cillum minim commodo pariatur ex cillum sit.</p>
				<template #controls>
					<kv-button variant="secondary">Button 1</kv-button>
					<kv-button>Button 2</kv-button>
				</template>
			</kv-lightbox>
		</div>
	`,
	data() {
		return {
			isLightboxVisible: true,
		};
	},
});

export const Default = DefaultTemplate.bind({});

export const Dialog = DefaultTemplate.bind({});
Default.args = {
	title: 'Dialog Title',
	variant: 'dialog',
};
