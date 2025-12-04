// eslint-disable-next-line import/prefer-default-export
export function throttle<T extends(...args: any[]) => any>(
	func: T,
	timeFrame: number): (...args: Parameters<T>) => void {
	let lastTime = 0;
	return function executedFunction(...args: Parameters<T>) {
		const now = new Date().getTime();
		if (now - lastTime >= timeFrame) {
			func(...args);
			lastTime = now;
		}
	};
}
