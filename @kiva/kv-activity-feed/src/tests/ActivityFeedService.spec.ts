import ActivityFeedService from '../index';

const mockFollow = jest.fn(() => Promise.resolve());
const mockAddActivity = jest.fn(() => Promise.resolve());
const mockGet = jest.fn(() => Promise.resolve({ results: [] }));

const mockFeed = jest.fn(() => ({
	follow: mockFollow,
	addActivity: mockAddActivity,
	get: mockGet,
}));

jest.mock('getstream', () => ({
	connect: jest.fn(() => ({
		feed: mockFeed,
	})),
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { connect } = require('getstream');

describe('StreamService', () => {
	let activityFeedService;

	beforeEach(() => {
		// Reset the mocks and create a new StreamService instance for each test
		jest.clearAllMocks();
		activityFeedService = new ActivityFeedService(
			'API_KEY',
			'AUTH_TOKEN',
			'APP_ID',
		);
	});

	describe('createUserFeed', () => {
		it('should create a user feed', () => {
			const userId = 'user123';
			const userFeed = activityFeedService.createUserFeed(userId);

			expect(userFeed).toBeDefined();
			expect(connect).toHaveBeenCalledWith(
				'API_KEY',
				'AUTH_TOKEN',
				'APP_ID',
			);
			expect(connect().feed).toHaveBeenCalledWith('user', userId);
		});
	});

	describe('followUser', () => {
		it('should follow another user', async () => {
			const targetSlug = 'user';
			const sourceUserId = 'user123';
			const targetUserId = 'user456';

			await activityFeedService.followUser(
				sourceUserId,
				targetSlug,
				targetUserId,
			);

			expect(connect().feed).toHaveBeenCalledWith('user', sourceUserId);
			expect(connect().feed('targetSlug').follow).toHaveBeenCalled();
		});
	});

	describe('addActivity', () => {
		it('should add an activity to the feed', async () => {
			const userFeed = activityFeedService.createUserFeed('user123');
			const targetSlug = 'user';
			const activity = {
				actor: 'user123',
				verb: 'post',
				object: 'message:1',
			};

			await ActivityFeedService.addActivity(userFeed, activity);

			expect(connect().feed).toHaveBeenCalled();
			expect(connect().feed(targetSlug).addActivity).toHaveBeenCalledWith(
				activity,
			);
		});
	});

	describe('getActivity', () => {
		it('should retrieve activities from the feed', async () => {
			const userFeed = activityFeedService.createUserFeed('user123');
			const params = { limit: 10 };
			const targetSlug = 'user';

			await ActivityFeedService.getActivity(userFeed, params);

			expect(connect().feed).toHaveBeenCalled();
			expect(connect().feed(targetSlug).get).toHaveBeenCalledWith(params);
		});
	});
});
