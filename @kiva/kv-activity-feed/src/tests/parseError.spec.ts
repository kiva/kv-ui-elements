import { SiteError, FeedError } from 'getstream';
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

	it('logs error message from Error instance', () => {
		const errorInstance = new Error('This is an error message');
		parseError(errorInstance);

		expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred in StreamService lib:', 'This is an error message');
	});

	it('logs error message from SiteError instance', () => {
		const siteErrorInstance = new SiteError('This is a SiteError message');
		parseError(siteErrorInstance);

		expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred in StreamService lib:', 'This is a SiteError message');
	});

	it('logs error message from FeedError instance', () => {
		const feedErrorInstance = new FeedError('This is a FeedError message');
		parseError(feedErrorInstance);

		expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred in StreamService lib:', 'This is a FeedError message');
	});

	it('logs the entire object if it is not an instance of Error, SiteError, or FeedError', () => {
		const nonErrorObject = { message: 'This is not an error' };
		parseError(nonErrorObject);

		expect(consoleErrorSpy).toHaveBeenCalledWith('An unknown error occurred in StreamService lib:', nonErrorObject);
	});
});
