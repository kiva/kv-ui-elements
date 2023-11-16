/* eslint-disable no-await-in-loop */

/**
 * Wait for a specified number of milliseconds
 *
 * @param ms - number of milliseconds to wait
 * @returns - a promise that resolves after the specified number of milliseconds
 */
export function wait(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Poll the fn callback until the fnCondition callback returns true
 *
 * @param fn - function to poll
 * @param fnCondition - function to check for completed status, called with the result of fn. Should return true when polling should stop.
 * @param interval - how often to poll (ms)
 * @param timeout - how long to allow polling to continue (ms)
 * @returns - the final result of fn
 */
export async function poll<TResult>(
	fn: () => Promise<TResult>,
	fnCondition: (arg: TResult) => boolean,
	interval: number,
	timeout: number,
) {
	// establish endtime based on timeout
	const endTime = Date.now() + timeout;

	// start polling
	let result = await fn();

	while (!fnCondition(result)) {
		// check for timeout
		if (Date.now() > endTime) {
			throw new Error('Polling timed out');
		}

		// wait an interval before checking again
		await wait(interval);
		result = await fn();
	}

	// return the final result
	return result;
}
