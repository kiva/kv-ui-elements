import { abc, startsWith, indexIn } from '../../../../utils/comparators';

describe('abc', () => {
	it('sorts strings alphabetically', () => {
		const arr = ['banana', 'apple', 'cherry'];
		arr.sort(abc());
		expect(arr).toEqual(['apple', 'banana', 'cherry']);
	});

	it('sorts objects alphabetically by key', () => {
		const arr = [
			{ name: 'banana' },
			{ name: 'apple' },
			{ name: 'cherry' },
		];
		arr.sort(abc('name'));
		expect(arr).toEqual([
			{ name: 'apple' },
			{ name: 'banana' },
			{ name: 'cherry' },
		]);
	});
});

describe('startsWith', () => {
	it('sorts strings that start with query first', () => {
		const arr = ['banana', 'apple', 'apricot', 'cherry'];
		arr.sort(startsWith('ap'));
		expect(arr.slice(0, 2)).toEqual(['apple', 'apricot']);
	});

	it('sorts objects that start with query first by key', () => {
		const arr = [
			{ name: 'banana' },
			{ name: 'apple' },
			{ name: 'apricot' },
			{ name: 'cherry' },
		];
		arr.sort(startsWith('ap', 'name'));
		expect(arr.slice(0, 2)).toEqual([
			{ name: 'apple' },
			{ name: 'apricot' },
		]);
	});
});

describe('indexIn', () => {
	it('sorts array to match the order in the list', () => {
		const list = ['a', 'b', 'c', 'd'];
		const arr = ['d', 'a', 'c'];
		arr.sort(indexIn(list));
		expect(arr).toEqual(['a', 'c', 'd']);
	});

	it('sorts objects to match the order in the list by key', () => {
		const list = ['a', 'b', 'c', 'd'];
		const arr = [
			{ letter: 'd' },
			{ letter: 'a' },
			{ letter: 'c' },
		];
		arr.sort(indexIn(list, 'letter'));
		expect(arr).toEqual([
			{ letter: 'a' },
			{ letter: 'c' },
			{ letter: 'd' },
		]);
	});

	it('throws if list is not an array', () => {
		expect(() => indexIn('not-an-array')).toThrow(TypeError);
	});
});
