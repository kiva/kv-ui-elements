/**
 * Debounce function to limit firing of a function
 *
 * @param {Function} fn - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */

export const debounce = <T extends (...args: any[]) => any>(
	fn: T,
	delay: number,
): ((...args: Parameters<T>) => void) => {
	let timeout: NodeJS.Timeout | null = null;
	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
};
