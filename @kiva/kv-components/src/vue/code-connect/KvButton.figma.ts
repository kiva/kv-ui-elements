// url=https://www.figma.com/design/TPmBUB4olYPMF6glEhBGDG/Ecosystem-2026--WIP-?node-id=20280-98&m=dev
// source=src/vue/KvButton.vue
// component=KvButton
//
// Reconciled against the published "KvButton (WIP)" component (CIT-4435) via
// get_context_for_code_connect: Figma property names AND enum values are lowercase,
// `label` is a nested TEXT layer (read with findText, not a component property), and
// Figma's `hover` state has no KvButton prop value so it maps to the default (no attr).
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma variant values are lowercase and match the code prop values 1:1.
const variant = instance.getEnum('variant', {
	primary: 'primary',
	secondary: 'secondary',
	danger: 'danger',
	link: 'link',
	ghost: 'ghost',
	caution: 'caution',
});

// `hover` is a visual-only Figma state with no KvButton equivalent -> render as default ('').
const state = instance.getEnum('state', {
	default: '',
	active: 'active',
	disabled: 'disabled',
	loading: 'loading',
	hover: '',
});

const size = instance.getEnum('size', {
	default: 'default',
	small: 'small',
});

// `label` is a nested TEXT layer, not a component property — read its text content.
const label = instance.findText('label').textContent;

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
