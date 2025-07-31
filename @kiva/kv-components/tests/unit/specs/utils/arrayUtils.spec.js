import { groupBy, sortBy } from '../../../../utils/arrayUtils';

describe('groupBy', () => {
	it('groups objects by the specified key', () => {
		const data = [
			{ type: 'fruit', name: 'apple' },
			{ type: 'fruit', name: 'banana' },
			{ type: 'vegetable', name: 'carrot' },
			{ type: 'fruit', name: 'pear' },
			{ type: 'vegetable', name: 'lettuce' },
		];
		const grouped = groupBy(data, 'type');
		expect(grouped).toEqual({
			fruit: [
				{ type: 'fruit', name: 'apple' },
				{ type: 'fruit', name: 'banana' },
				{ type: 'fruit', name: 'pear' },
			],
			vegetable: [
				{ type: 'vegetable', name: 'carrot' },
				{ type: 'vegetable', name: 'lettuce' },
			],
		});
	});

	it('returns an empty object for an empty array', () => {
		expect(groupBy([], 'type')).toEqual({});
	});
});

describe('sortBy', () => {
	it('sorts objects by the specified key in ascending order', () => {
		const data = [
			{ id: 3, name: 'c' },
			{ id: 1, name: 'a' },
			{ id: 2, name: 'b' },
		];
		const sorted = data.sort(sortBy('id'));
		expect(sorted).toEqual([
			{ id: 1, name: 'a' },
			{ id: 2, name: 'b' },
			{ id: 3, name: 'c' },
		]);
	});

	it('sorts objects by string key in ascending order', () => {
		const data = [
			{ id: 1, name: 'c' },
			{ id: 2, name: 'a' },
			{ id: 3, name: 'b' },
		];
		const sorted = data.sort(sortBy('name'));
		expect(sorted).toEqual([
			{ id: 2, name: 'a' },
			{ id: 3, name: 'b' },
			{ id: 1, name: 'c' },
		]);
	});
});
