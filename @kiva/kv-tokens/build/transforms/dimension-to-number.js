// Transform: dimension objects -> raw numeric value.
// DTCG encodes dimensions as { value: 16, unit: 'px' }; legacy primitives.js
// stored them as raw numbers. Strip the unit for JS output.

const dimensionToNumberTransform = {
	name: 'kiva/dimension-to-number',
	type: 'value',
	transitive: true,
	filter: (token) => token.$type === 'dimension' || token.type === 'dimension',
	transform: (token) => {
		const v = token.$value ?? token.value;
		if (v && typeof v === 'object' && 'value' in v) return v.value;
		return v;
	},
};

export default dimensionToNumberTransform;
