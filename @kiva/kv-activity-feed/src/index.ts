import {
	connect,
	StreamClient,
	GetFeedOptions,
	NewActivity,
	StreamFeed,
	FeedAPIResponse,
	Activity,
	APIResponse,
} from 'getstream';
import parseError from './utils/parseError';

class ActivityFeedService {
	private client: StreamClient;

	/**
	 * Creates an instance of StreamService.
	 *
	 * @param {string} apiKey - The GetStream.io API key.
	 * @param {string} authToken - The auth user token.
	 * @param {string} appId - The GetStream.io App id.
	 */
	constructor(apiKey: string, authToken: string, appId: string) {
		try {
			this.client = connect(apiKey, authToken, appId);
		} catch (error) {
			parseError(error);
		}
	}

	createUserFeed(userId: string): StreamFeed {
		try {
			return this.client.feed('user', userId);
		} catch (error) {
			parseError(error);
		}
	}

	followUser(
		sourceUserId: string,
		targetSlug: string,
		targetUserId: string,
		options: { limit?: number } = {},
	): Promise<APIResponse> {
		const sourceFeed = this.createUserFeed(sourceUserId);
		const targetFeed = this.createUserFeed(targetUserId);

		try {
			return sourceFeed.follow(targetSlug, targetFeed, options);
		} catch (error) {
			parseError(error);
		}
	}

	static addActivity(
		feed: StreamFeed,
		activity: NewActivity,
	): Promise<Activity> {
		try {
			return feed.addActivity(activity);
		} catch (error) {
			parseError(error);
		}
	}

	static getActivity(
		feed: StreamFeed,
		params: GetFeedOptions,
	): Promise<FeedAPIResponse> {
		try {
			return feed.get(params);
		} catch (error) {
			parseError(error);
		}
	}
}

export default ActivityFeedService;
