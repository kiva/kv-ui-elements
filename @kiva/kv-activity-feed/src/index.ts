import {
	Channel,
	DefaultGenerics,
	FormatMessageResponse,
	StreamChat,
} from 'stream-chat';
import parseError from './utils/parseError';

type ActivityFeedChannel = 'challenge';

type ActivityFeedReaction = 'add-comment' | 'like-comment' | 'reply-comment';

const LIKE = 'love';

type ActivityFeedLike = typeof LIKE;

export interface ActivityFeedReactionPayload {
	id?: string;
	isChild?: boolean;
	reaction?: ActivityFeedReaction;
	value?: boolean | string;
}

export interface ActivityFeedChannelMessage {
	id: string;
	text: string;
	publicLenderId: string;
	children: {
		comment: ActivityFeedChannelMessage[],
		like: { publicLenderId?: string }[],
	}
}

export default class ActivityFeedService {
	/**
	 * The in-memory instance of the Stream client
	 */
	private client: StreamChat|undefined;

	/**
	 * The in-memory instance of the current chat channel
	 */
	private channel: Channel<DefaultGenerics>|undefined;

	/**
	 * The in-memory instance of the channel websocket listener
	 */
	private listener: { unsubscribe: () => void }|undefined;

	/**
	 * Creates instance of Steam Chat and opens user websocket connection
	 *
	 * @param apiKey The Stream service API key
	 * @param userToken The current user token generated server-side
	 * @param userId The ID of the user
	 * @param publicLenderId The public lender ID of the user
	 * @param activityId The ID of the current activity
	 * @param channelType The channel type of the current activity
	 * @returns The current instance of ActivityFeedService or undefined
	 */
	async init(
		apiKey: string,
		userToken: string,
		userId: string,
		publicLenderId: string,
		activityId: string,
		channelType: ActivityFeedChannel,
		callback: (messages: ActivityFeedChannelMessage[]) => void,
	) {
		try {
			this.client = StreamChat.getInstance(apiKey);
			// Connect the current user with open websocket connection
			await this.client.connectUser({
				id: userId,
				publicLenderId,
			}, userToken);
			this.channel = this.client?.channel(channelType, activityId);
			// Enable watching events for the current user
			await this.channel?.watch();
			// Respond to websocket messages
			this.listener = this.channel.on(() => callback(this.getComments()));
			return this;
		} catch (error) {
			parseError(error);
		}
		return undefined;
	}

	/**
	 * Gets the latest comments from the current channel
	 *
	 * @returns A list of custom comment objects
	 */
	getComments() {
		const createMessage = (m: FormatMessageResponse<DefaultGenerics>) => ({
			id: m.id ?? '',
			text: m.text ?? '',
			publicLenderId: m.user?.publicLenderId as string ?? '',
			children: {
				comment: [],
				like: m.latest_reactions?.filter((r) => r.type === LIKE).map((r) => ({
					publicLenderId: r.user?.publicLenderId as string ?? '',
				})) ?? [],
			},
		});
		// Start with top level comments and reactions
		const messages = this.channel?.state.messages
			.filter((m) => !m.parentId)
			.map<ActivityFeedChannelMessage>(createMessage);
		// Loop again to get first-level child comments
		this.channel?.state.messages.filter((m) => !!m.parentId).forEach((m) => {
			const parent = messages?.find((p) => p.id === m.parentId);
			if (parent) {
				parent.children.comment.push(createMessage(m));
			}
		});
		return messages;
	}

	/**
	 * Disconnects the user from stream chat
	 */
	async disconnect() {
		await this.client?.disconnectUser();
		this.listener.unsubscribe();
	}

	/**
	 * Adds a comment for the current user to the current channel
	 *
	 * @param text The text of the comment
	 * @param parentId The parent ID for a reply
	 */
	async addComment(text: string, parentId?: string) {
		try {
			await this.channel?.sendMessage({ text, parentId });
		} catch (error) {
			parseError(error);
		}
	}

	/**
	 * Adds a reaction for the provided message ID
	 *
	 * @param messageId The ID of the message
	 * @param type The type of the reaction
	 */
	async addReaction(messageId: string, type: ActivityFeedLike = LIKE) {
		try {
			await this.channel?.sendReaction(messageId, { type }, { enforce_unique: true });
		} catch (error) {
			parseError(error);
		}
	}

	/**
	 * Removes a reaction for the provided message ID
	 *
	 * @param messageId The ID of the message
	 * @param type The type of the reaction
	 */
	async removeReaction(messageId: string, type: ActivityFeedLike = LIKE) {
		try {
			await this.channel?.deleteReaction(messageId, type);
		} catch (error) {
			parseError(error);
		}
	}
}
