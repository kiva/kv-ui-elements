import SearchEngine, { type SearchSuggestion } from '#utils/typeaheadSearchEngine';

const data: SearchSuggestion[] = [
	{ group: 'Countries and Territories', label: 'Philippines', query: 'country=29' },
	{ group: 'Countries and Territories', label: 'Peru', query: 'country=70' },
	{ group: 'Sectors', label: 'Agriculture', query: 'sector=1' },
	{
		group: 'Gifts', label: 'Kiva Cards', url: 'https://www.kiva.org/gifts/kiva-cards', keywords: ['gift', 'gift card'],
	},
];

describe('SearchEngine', () => {
	it('returns an empty array before reset is called', async () => {
		const engine = new SearchEngine();
		await expect(engine.search('phil')).resolves.toEqual([]);
	});

	it('matches on label and ranks startsWith first', async () => {
		const engine = new SearchEngine();
		engine.reset(data);
		const results = await engine.search('pe');
		expect(results[0].label).toBe('Peru');
	});

	it('matches on keywords', async () => {
		const engine = new SearchEngine();
		engine.reset(data);
		const results = await engine.search('gift card');
		expect(results.some((r) => r.label === 'Kiva Cards')).toBe(true);
	});

	it('returns no matches for an unrelated query', async () => {
		const engine = new SearchEngine();
		engine.reset(data);
		await expect(engine.search('zzzzz')).resolves.toEqual([]);
	});
});
