import KvWwwHeader from '../KvWwwHeader.vue';
import KvPageContainer from '../KvPageContainer.vue';

export default {
	title: 'KvWwwHeader',
	component: KvWwwHeader,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		loggedIn: {
			control: {
				type: 'boolean',
			},
		},
		basketCount: {
			control: {
				type: 'number',
			},
		},
		loginUrl: {
			control: {
				type: 'text',
			},
		},
		balance: {
			control: {
				type: 'number',
			},
		},
		isTrustee: {
			control: {
				type: 'boolean',
			},
		},
		isBorrower: {
			control: {
				type: 'boolean',
			},
		},
		isBasketDataLoading: {
			control: {
				type: 'boolean',
			},
		},
		isUserDataLoading: {
			control: {
				type: 'boolean',
			},
		},
		myDashboardUrl: {
			control: {
				type: 'text',
			},
		},
		lenderName: {
			control: {
				type: 'text',
			},
		},
		lenderImageUrl: {
			control: {
				type: 'text',
			},
		},
		showMGUpsellLink: {
			control: {
				type: 'boolean',
			},
		},
	},
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvWwwHeader, KvPageContainer },
		setup() { return { args: { ..._args } }; },
		provide: {
			$kvTrackEvent: (category, action, label) => {
				// eslint-disable-next-line no-console
				console.log(`${category}, ${action}, ${label}`);
			},
		},
		template: `
			<div class="tw-relative" :style="args.cssVars">
				<kv-www-header v-bind="args" />
				<kv-page-container>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie tellus quis auctor luctus. Fusce consequat sit amet tortor sit amet euismod. Proin finibus blandit tortor scelerisque facilisis. Duis in euismod justo. Nam efficitur eu metus quis cursus. Duis a ligula nisi. Duis ligula eros, pharetra interdum malesuada vitae, feugiat quis ligula. Fusce non vestibulum elit, sed vehicula augue. Sed tellus dui, vestibulum in gravida eget, gravida a arcu. Duis sed sapien cursus velit bibendum auctor non a eros. Donec libero odio, fermentum faucibus justo vel, efficitur malesuada velit. Morbi odio ligula, congue id odio in, ornare bibendum turpis. Nunc consectetur imperdiet rutrum. Ut posuere turpis ac lacinia finibus. Proin velit arcu, ultrices vitae lacinia quis, tincidunt at justo.</p>
					<p>Morbi volutpat eget enim eu tristique. Suspendisse potenti. Vivamus mollis purus magna, nec suscipit purus tempor id. Nulla porta ipsum sit amet sollicitudin accumsan. Cras pulvinar fringilla ullamcorper. Praesent sit amet sapien metus. Morbi volutpat tortor sed eros mattis ultricies. Duis convallis finibus lacus, a tempus felis pretium in. Ut eu est sem. Ut auctor ullamcorper dignissim. Praesent quis ullamcorper dui, ac sodales mi. Nullam volutpat augue vulputate congue suscipit. Praesent consectetur sem libero, id pharetra urna porttitor nec. Praesent vitae orci neque. Nam a diam orci.</p>
					<p>Integer ultrices eros non libero volutpat congue. Mauris tortor sapien, eleifend sed tortor id, interdum laoreet purus. Quisque eget velit eget odio aliquet iaculis. Nam sagittis enim sit amet tellus euismod, vitae semper odio ullamcorper. Vestibulum vel placerat mauris. Nunc vitae orci ut felis euismod semper. Nunc eget luctus turpis. Integer semper, libero eu cursus imperdiet, purus nisl interdum leo, vitae tempor ipsum arcu a elit. Phasellus interdum bibendum dui, sed sagittis massa. Integer orci leo, sollicitudin quis tellus at, pellentesque egestas enim. Donec consectetur diam rhoncus justo venenatis facilisis. Ut sapien nisl, posuere vitae vulputate vel, aliquam vitae ex. Ut imperdiet sagittis mollis. Quisque urna dolor, viverra eu posuere ac, iaculis malesuada ex. Suspendisse id volutpat risus.</p>
					<p>Suspendisse porta eget lectus ac aliquet. In diam tellus, fermentum ac lacus egestas, pharetra eleifend mi. Aliquam arcu libero, dictum at commodo non, laoreet eu nibh. Aliquam blandit fermentum mi vel lacinia. Quisque varius libero in tempus viverra. Quisque vel felis velit. In dapibus magna eu venenatis imperdiet. Pellentesque interdum hendrerit enim et eleifend. Integer vitae quam vitae tortor ornare finibus ut nec lacus. Morbi at orci lacus.</p>
					<p>Nunc efficitur accumsan finibus. Pellentesque fermentum dui in tincidunt hendrerit. Integer faucibus sit amet nunc id faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin congue nisi eget neque suscipit, sit amet sagittis orci tempus. Maecenas porttitor ipsum in commodo rhoncus. Etiam condimentum euismod nulla sit amet vestibulum.</p>
					<p>Vivamus non lobortis massa. Vivamus condimentum ligula et dolor venenatis dictum. Praesent pharetra libero ipsum, vel gravida lectus dictum eget. Vivamus lobortis elementum ante eget sodales. Suspendisse fermentum faucibus porta. Quisque finibus arcu commodo justo lobortis, et dignissim libero laoreet. Integer id diam augue. Mauris finibus consectetur leo, nec lobortis ligula facilisis scelerisque. Maecenas aliquet id nisi non fermentum. Phasellus quis erat imperdiet, molestie elit ac, fringilla quam. Praesent ut nulla nec nibh luctus tempor.</p>
					<p>Suspendisse potenti. Cras sed cursus neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse placerat ac ligula ut rhoncus. Fusce mollis, metus vitae laoreet condimentum, augue justo dignissim leo, in vestibulum neque justo a arcu. Aliquam vestibulum tempus faucibus. Aliquam at nisl ligula. Integer dui sem, tempus et volutpat ut, pulvinar id tortor. Integer in nisl at nunc accumsan fermentum venenatis a felis. Morbi tincidunt dictum malesuada. Fusce non mauris eget nulla fermentum mollis vitae eget diam. Sed efficitur justo eget elit semper lacinia. Donec nibh metus, condimentum sit amet sapien at, pellentesque faucibus enim. Pellentesque enim diam, scelerisque id consequat nec, mollis eu libero. In semper elementum dolor ut vehicula.</p>
					<p>Phasellus dapibus, purus a aliquet ullamcorper, mi ante malesuada nunc, tempor iaculis arcu metus nec risus. Maecenas ullamcorper velit eget bibendum euismod. Aliquam pretium varius arcu luctus molestie. Mauris metus elit, sollicitudin vitae ipsum a, molestie ornare diam. Nulla facilisi. Ut at interdum libero. Sed feugiat, dolor in porttitor ultrices, mauris dui pulvinar ligula, ultrices egestas leo felis non mi. Nullam ligula nibh, fringilla ac metus sit amet, egestas mollis nunc. Fusce vulputate tempor semper. Integer rutrum volutpat metus, et porttitor eros euismod sit amet. Vestibulum finibus, nisl efficitur pretium maximus, massa velit posuere nulla, vehicula facilisis eros justo in arcu. Sed imperdiet justo varius ligula egestas, eget elementum massa feugiat. Pellentesque eu mauris tellus. Donec eu risus id quam malesuada facilisis. Vestibulum nibh elit, pellentesque in lacinia sed, fringilla sed est. Suspendisse vulputate lacus purus, quis dapibus libero hendrerit eu.</p>
					<p>Donec eu dignissim risus. Donec vestibulum erat non mollis efficitur. Fusce justo leo, cursus vel tristique a, consectetur sed ligula. Vivamus egestas leo sed nisi ultricies, eu pharetra mauris hendrerit. Duis quis vulputate est. Quisque fringilla finibus diam, at laoreet tellus tincidunt ut. Praesent rhoncus, sem ut condimentum ultrices, sem arcu condimentum velit, eget gravida lorem felis vitae est.</p>
					<p>Etiam ut fermentum enim, ac dignissim lorem. Mauris pretium posuere nisl in accumsan. Ut sollicitudin aliquet sem ac tempor. Mauris ac sagittis odio. Duis in pulvinar sapien. Nulla ut dui vel lorem feugiat finibus non non quam. Etiam vitae velit vel elit bibendum vulputate. Nulla placerat purus eu tincidunt tincidunt. Praesent non porttitor velit. Nam eu egestas tellus. Quisque iaculis arcu sem, quis sodales libero molestie eget. Phasellus efficitur, purus posuere rutrum tristique, urna urna aliquet odio, vel tincidunt odio justo ac turpis. Pellentesque nec dui nec tellus consectetur dapibus nec non sapien.</p>
				</kv-page-container>
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story();

export const LoggedIn = story({
	loggedIn: true,
	basketCount: 3,
	loginUrl: 'https://www.kiva.org/login',
	balance: 100,
	isTrustee: false,
	myDashboardUrl: '/kiva-circles',
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	showMGUpsellLink: true,
});

export const LoadingUserData = story({
	loggedIn: true,
	isBasketDataLoading: true,
	isUserDataLoading: true,
	cssVars: {
		'--user-avatar-display': 'none',
	},
});
