/* eslint-disable no-new */
import { connect } from 'getstream';
import ActivityFeedService from '../index';
import * as parseError from '../utils/parseError';

const mockActivity = { id: 'asd' };

const mockUserGetOrCreate = jest.fn();
const mockUserUpdate = jest.fn();
const mockUser = jest.fn(() => ({
	getOrCreate: mockUserGetOrCreate,
	update: mockUserUpdate,
}));
const mockGetActivities = jest.fn(() => Promise.resolve({ results: [mockActivity] }));
const mockAddComment = jest.fn();
const mockAddLikeToComment = jest.fn();
const mockRemoveReaction = jest.fn();

const mockClient = {
	user: mockUser,
	getActivities: mockGetActivities,
	reactions: {
		add: mockAddComment,
		addChild: mockAddLikeToComment,
		delete: mockRemoveReaction,
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

	describe('getOrCreateUser', () => {
		it('should call expected user methods', async () => {
			const userId = 1;
			const publicLenderId = '2';
			await (new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID)).getOrCreateUser(userId, publicLenderId);

			expect(mockUser).toHaveBeenCalledWith(userId.toString());
			expect(mockUserGetOrCreate).toHaveBeenCalledWith({ publicLenderId });
		});
	});

	describe('updateUser', () => {
		it('should call user update', async () => {
			const userId = 1;
			const publicLenderId = '2';
			await (new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID)).updateUser(userId, publicLenderId);

			expect(mockUser).toHaveBeenCalledWith(userId.toString());
			expect(mockUserUpdate).toHaveBeenCalledWith({ publicLenderId });
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

	describe('addLikeToComment', () => {
		it('should call add to like comment method', async () => {
			const commentId = 'test';
			await (new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID)).addLikeToComment(commentId);

			expect(mockAddLikeToComment).toHaveBeenCalledTimes(1);
			expect(mockAddLikeToComment).toHaveBeenCalledWith('like', commentId);
		});
	});

	describe('removeReaction', () => {
		it('should call remove reaction method', async () => {
			const reactionId = 'test';
			await (new ActivityFeedService(API_KEY, AUTH_TOKEN, APP_ID)).removeReaction(reactionId);

			expect(mockRemoveReaction).toHaveBeenCalledTimes(1);
			expect(mockRemoveReaction).toHaveBeenCalledWith(reactionId);
		});
	});
});
