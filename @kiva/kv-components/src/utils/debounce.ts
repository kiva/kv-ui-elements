/**
 * Debounce function to limit firing of a function
 *
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns - The debounced function
 */

export const debounce = <T extends (...args: any[]) => any>(
	fn: T,
	delay: number,
): ((...args: Parameters<T>) => void) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
};
