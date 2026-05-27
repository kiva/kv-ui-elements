import { ref, nextTick } from 'vue';
import { useTypeaheadSearch } from '#utils/useTypeaheadSearch';
import type { SearchSuggestion } from '#utils/typeaheadSearchEngine';

const suggestions: SearchSuggestion[] = [
	{ group: 'Countries and Territories', label: 'Peru', query: 'country=70' },
	{ group: 'Sectors', label: 'Personal Use', query: 'sector=11' },
];

describe('useTypeaheadSearch', () => {
	it('produces grouped results in SECTION_ORDER after a matching term', async () => {
		const source = ref(suggestions);
		const { term, groupedResults } = useTypeaheadSearch(source, '');
		term.value = 'pe';
		await nextTick();
		await new Promise((r) => { setTimeout(r, 0); });
		const groups = groupedResults.value.map((g) => g.group);
		expect(groups).toEqual(['Countries and Territories', 'Sectors']);
	});

	it('resolves a suggestion with a query into a /lend/filter payload', () => {
		const source = ref(suggestions);
		const { resolveSubmit } = useTypeaheadSearch(source, 'https://www.kiva.org');
		const payload = resolveSubmit(suggestions[0]);
		expect(payload.query).toEqual({ country: '70' });
		expect(payload.url).toContain('/lend');
		expect(payload.suggestion).toEqual(suggestions[0]);
	});

	it('resolves a free-text term into a queryString payload', () => {
		const source = ref(suggestions);
		const { resolveSubmit } = useTypeaheadSearch(source, '');
		const payload = resolveSubmit('coffee');
		expect(payload.query).toEqual({ queryString: 'coffee' });
		expect(payload.term).toBe('coffee');
	});

	it('uses a suggestion url directly when present (Gifts)', () => {
		const source = ref<SearchSuggestion[]>([]);
		const { resolveSubmit } = useTypeaheadSearch(source, '');
		const gift = { group: 'Gifts', label: 'Kiva Cards', url: 'https://www.kiva.org/gifts/kiva-cards' };
		const payload = resolveSubmit(gift);
		expect(payload.url).toBe('https://www.kiva.org/gifts/kiva-cards');
	});
});
