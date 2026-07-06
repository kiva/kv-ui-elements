// url=https://www.figma.com/design/TPmBUB4olYPMF6glEhBGDG/Ecosystem-2026--WIP-?node-id=20280-98&m=dev
// source=src/vue/KvButton.vue
// component=KvButton
//
// NOTE (CIT-4435, Code-Connect-only): authored from the code component while the
// design team finalizes the Figma component. Before `figma connect publish`, confirm
// the Figma property NAMES/VALUES below against the real component via
// `get_context_for_code_connect` and fill in the url above. The emitted snippet
// (the <KvButton …> output) is code-derived and does not change on reconciliation.
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma property names assumed; confirm on reconcile. Values are exhaustive per KvButton.vue.
const variant = instance.getEnum('Variant', {
	Primary: 'primary',
	Secondary: 'secondary',
	Link: 'link',
	Danger: 'danger',
	Ghost: 'ghost',
	Caution: 'caution',
});

const state = instance.getEnum('State', {
	Default: '',
	Active: 'active',
	Disabled: 'disabled',
	Loading: 'loading',
});

const size = instance.getEnum('Size', {
	Default: 'default',
	Small: 'small',
});

const label = instance.getString('Label');

export default {
	example: figma.code`
		<KvButton
			variant="${variant}"
			${state ? figma.code`state="${state}"` : ''}
			${size !== 'default' ? figma.code`size="${size}"` : ''}
		>
			${label}
		</KvButton>
	`,
	imports: ["import { KvButton } from '@kiva/kv-components'"],
	id: 'kv-button',
	metadata: { nestable: true },
};
