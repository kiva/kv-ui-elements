import type { SearchSuggestion } from './typeaheadSearchEngine';

// Section render order for grouped suggestions. Copied verbatim from both app SearchBar files
// (cms-page-server/components/header/SearchBar.vue and ui/src/components/WwwFrame/SearchBar.vue),
// which are identical.
export const SECTION_ORDER: string[] = [
	'Gender',
	'Regions',
	'Countries and Territories',
	'United States',
	'U.S. cities',
	'Sectors',
	'Group or Individual',
	'Attributes',
	'User tags',
	'Partners',
	'Gifts',
];

export const MAX_PER_GROUP = 5;

// Hardcoded "Gifts" suggestions appended client-side in both apps (identical in both).
export const GIFT_SUGGESTIONS: SearchSuggestion[] = [
	{
		group: 'Gifts',
		label: 'Kiva Cards',
		keywords: ['gift card', 'kiva card', 'gift', 'gift certificate'],
		url: 'https://www.kiva.org/gifts/kiva-cards',
	},
	{
		group: 'Gifts',
		label: 'Kiva Store',
		keywords: ['gift card', 'kiva card', 'gift', 'gift certificate'],
		url: 'https://store.kiva.org',
	},
];
