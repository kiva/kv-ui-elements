/* eslint-disable no-new */
import { connect } from 'getstream';
import ActivityFeedService from '../index';
import * as parseError from '../utils/parseError';

const mockActivity = { id: 'asd' };

const mockGetActivities = jest.fn(() => Promise.resolve({ results: [mockActivity] }));
const mockAddComment = jest.fn();

const mockClient = {
	getActivities: mockGetActivities,
	reactions: {
		add: mockAddComment,
	},
};

jest.mock('getstream', () => ({
	connect: jest.fn(() => mockClient),
}));

const API_KEY = 'API_KEY';
const AUTH_TOKEN = 'AUTH_TOKEN';
const APP_ID = 'APP_ID';

describe('StreamService', () => {
	let spyParseError: jest.SpyInstance;

	beforeEach(() => {
		spyParseError = jest.spyOn(parseError, 'default').mockImplementation(() => {});
	});

	afterEach(jest.clearAllMocks);

	describe('constructor', () => {
		it('should create instance', async () => {
			new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID);

			expect(connect).toHaveBeenCalledWith(API_KEY, AUTH_TOKEN, APP_ID);
		});

		it('should handle exception', async () => {
			(connect as jest.Mock).mockImplementationOnce(() => { throw new Error(); });

			new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID);

			expect(spyParseError).toHaveBeenCalledTimes(1);
		});
	});

	describe('getActivity', () => {
		it('should get activity', async () => {
			const ID = 'test';
			const result = await (new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID)).getActivity(ID);

			expect(result).toBe(mockActivity);
			expect(mockGetActivities).toHaveBeenCalledWith({ ids: [ID], withRecentReactions: true });
		});

		it('should handle exception', async () => {
			mockGetActivities.mockImplementationOnce(() => { throw new Error(); });
			const ID = 'test';
			const result = await (new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID)).getActivity(ID);

			expect(result).toBe(undefined);
			expect(spyParseError).toHaveBeenCalledTimes(1);
		});
	});

	describe('addComment', () => {
		it('should add comment', async () => {
			const ID = 'test';
			const TEXT = 'asd';
			const result = await (new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID)).addComment(ID, TEXT);

			expect(result).toBe(true);
			expect(mockAddComment).toHaveBeenCalledWith('comment', ID, { text: TEXT });
		});

		it('should handle exception', async () => {
			mockAddComment.mockImplementationOnce(() => { throw new Error(); });
			const result = await (new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID)).addComment('test', 'asd');

			expect(result).toBe(false);
			expect(spyParseError).toHaveBeenCalledTimes(1);
		});
	});
});
