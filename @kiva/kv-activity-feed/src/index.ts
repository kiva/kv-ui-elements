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

export class ActivityFeedService {
	private client: StreamClient;

	/**
	 * Creates an instance of StreamService.
	 *
	 * @param {string} apiKey - The GetStream.io API key.
	 * @param {string} authToken - The auth user token.
	 * @param {string} appId - The GetStream.io App id.
	 */
	constructor(apiKey: string, authToken: string, appId: string) {
		this.client = connect(apiKey, authToken, appId);
	}

	createUserFeed(userId: string): StreamFeed {
		return this.client.feed('user', userId);
	}

	followUser(
		sourceUserId: string,
		targetSlug: string,
		targetUserId: string,
		options: { limit?: number } = {}
	): Promise<APIResponse> {
		const sourceFeed = this.createUserFeed(sourceUserId);
		const targetFeed = this.createUserFeed(targetUserId);

		return sourceFeed.follow(targetSlug, targetFeed, options);
	}

	static addActivity(
		feed: StreamFeed,
		activity: NewActivity
	): Promise<Activity> {
		return feed.addActivity(activity);
	}

	static getActivity(
		feed: StreamFeed,
		params: GetFeedOptions
	): Promise<FeedAPIResponse> {
		return feed.get(params);
	}
}
