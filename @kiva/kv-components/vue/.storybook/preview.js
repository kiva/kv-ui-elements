import './tailwind.css';
import { addons } from '@storybook/preview-api';
import KvThemeProvider from '../KvThemeProvider.vue';
import { defaultTheme, darkTheme } from '@kiva/kv-tokens/configs/kivaColors.cjs';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import VueRouter from 'vue-router';

// Add vue composition api
Vue.use(VueCompositionApi);

Vue.use(VueRouter);

const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	options: {
		storySort: {
			order: ['Base Styling', '*'],
		},
	},
}

// Listen for events from the dark mode plugin
// https://github.com/hipstersmoothie/storybook-dark-mode#events
const channel = addons.getChannel();

// Wrap all stories with the kv-theme-provider component
const decorators = [(story) => ({
	components: { story, KvThemeProvider },
	template: '<kv-theme-provider :theme="theme"><story /></kv-theme-provider>',
	data() {
		return {
			theme: {}
		}
	},
	methods: {
		setTheme(darkMode) {
			darkMode ? this.theme = darkTheme : this.theme = defaultTheme
		}
	},
	mounted() {
		channel.on('DARK_MODE', this.setTheme);
	},
	destroyed() {
		channel.off('DARK_MODE', this.setTheme);
	},
	router: new VueRouter(),
})];

const preview = {
	parameters,
	decorators,
};

export default preview;
