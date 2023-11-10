import { wait, poll } from '../../util/poll';

describe('poll.ts', () => {
	it('should wait', async () => {
		const startTime = Date.now();
		await wait(100);
		const endTime = Date.now();
		expect(endTime - startTime).toBeGreaterThanOrEqual(100);
	});

	it('should poll', async () => {
		let count = 0;
		const result = await poll(
			async () => {
				count += 1;
				return count;
			},
			(arg) => arg >= 5,
			10,
			100,
		);
		expect(result).toEqual(5);
		expect(count).toEqual(5);
	});

	it('should throw if timeout', async () => {
		let count = 0;
		await expect(
			poll(
				async () => {
					count += 1;
					return count;
				},
				(arg) => arg >= 10,
				10,
				50,
			),
		).rejects.toThrow('Polling timed out');
		expect(count).toEqual(6);
	});
});
