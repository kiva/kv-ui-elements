import { connect, StreamClient, EnrichedActivity } from 'getstream';
import parseError from './utils/parseError';

/**
 * Type wrapper for the Stream activity type
 */
export type Activity = EnrichedActivity|undefined;

/**
 * Abstracts the functionality for the 3rd party Stream service
 */
export default class ActivityFeedService {
	/**
	 * The in memory instance of the Stream client
	 */
	private client: StreamClient|undefined = undefined;

	/**
	 * Creates an instance of ActivityFeedService
	 *
	 * @param apiKey The Stream service API key
	 * @param userToken The current user token generated server-side
	 * @param appId The Stream service env-specific APP ID
	 */
	constructor(apiKey: string, userToken: string, appId: string) {
		try {
			this.client = connect(apiKey, userToken, appId);
		} catch (error) {
			parseError(error);
		}
	}

	/**
	 * Gets an activity based on the provided activity ID
	 *
	 * @param activityId The activity ID returned from Stream
	 * @returns The activity data with recent reactions
	 */
	async getActivity(activityId: string): Promise<Activity> {
		let activity: Activity;

		try {
			activity = (await this.client?.getActivities({ ids: [activityId], withRecentReactions: true }))?.results[0];
		} catch (error) {
			parseError(error);
		}

		return activity;
	}

	/**
	 * Adds a comment for the current user for the provided activity ID
	 *
	 * @param activityId The activity ID returned from Stream
	 * @param text The text of the user comment
	 * @returns Whether the comment was added successfully
	 */
	async addComment(activityId: string, text: string): Promise<boolean> {
		let success = false;

		try {
			await this.client?.reactions.add('comment', activityId, { text });
			success = true;
		} catch (error) {
			parseError(error);
		}

		return success;
	}
}
