import parseError from '../utils/parseError';

describe('parseError', () => {
	let consoleErrorSpy: jest.SpyInstance;

	beforeEach(() => {
		consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
	});

	afterEach(() => {
		// Restore the original console.error after each test
		consoleErrorSpy.mockRestore();
	});

	it('should log error message from Error instance', () => {
		const errorInstance = new Error('This is an error message');
		parseError(errorInstance);

		expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred in StreamService lib:', 'This is an error message');
	});

	it('should log the entire object if the error has a message', () => {
		const nonErrorObject = { message: 'This is not an error' };
		parseError(nonErrorObject);

		expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred in StreamService lib:', nonErrorObject);
	});
});
