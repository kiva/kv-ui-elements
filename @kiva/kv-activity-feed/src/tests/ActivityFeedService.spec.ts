import { StreamChat } from 'stream-chat';
import ActivityFeedService from '../index';
import * as parseError from '../utils/parseError';

const messages = [
	{
		id: '3638ef05-85dc-4836-b7df-f5d5085a7f36',
		text: 'sadasd',
		user: {
			publicLenderId: 'Jess1234',
		},
		latest_reactions: [
			{
				user: {
					publicLenderId: 'Jess1234',
				},
				type: 'love',
			},
		],
	},
	{
		id: '53e30b71-9d50-4cc0-ae03-790bf56f8b3b',
		text: 'second reply',
		user: {
			publicLenderId: 'Jess1234',
		},
		parentId: '3638ef05-85dc-4836-b7df-f5d5085a7f36',
	},
];

const mockConnectUser = jest.fn(() => Promise.resolve());
const mockChannelWatch = jest.fn(() => Promise.resolve());
const mockSendMessage = jest.fn();
const mockSendReaction = jest.fn();
const mockDeleteReaction = jest.fn();
const mockChannel = jest.fn(() => ({
	watch: mockChannelWatch,
	sendMessage: mockSendMessage,
	sendReaction: mockSendReaction,
	deleteReaction: mockDeleteReaction,
	state: { messages },
}));
const mockDisconnectUser = jest.fn();

const API_KEY = 'API_KEY';
const AUTH_TOKEN = 'AUTH_TOKEN';

const initService = async () => {
	return new ActivityFeedService().init(
		API_KEY,
		AUTH_TOKEN,
		'123',
		'456',
		'789',
		'challenge',
	);
};

describe('StreamService', () => {
	let spyParseError: jest.SpyInstance;
	let spyGetInstance: jest.SpyInstance;

	beforeEach(() => {
		spyParseError = jest.spyOn(parseError, 'default').mockImplementation(() => {});
		spyGetInstance = jest.spyOn(StreamChat, 'getInstance').mockImplementation(() => ({
			connectUser: mockConnectUser,
			channel: mockChannel,
			disconnectUser: mockDisconnectUser,
		} as any));
	});

	afterEach(jest.clearAllMocks);

	describe('init', () => {
		it('should create instance', async () => {
			await initService();

			expect(spyGetInstance).toHaveBeenCalledWith(API_KEY);
			expect(mockConnectUser).toHaveBeenCalledWith({ id: '123', publicLenderId: '456' }, AUTH_TOKEN);
			expect(mockChannel).toHaveBeenCalledWith('challenge', '789');
			expect(mockChannelWatch).toHaveBeenCalledTimes(1);
		});

		it('should handle exception', async () => {
			spyGetInstance.mockImplementationOnce(() => { throw new Error(); });

			await initService();

			expect(spyParseError).toHaveBeenCalledTimes(1);
		});
	});

	describe('getComments', () => {
		it('should return custom comment array', async () => {
			const result = (await initService())?.getComments();

			expect(result).toEqual([
				{
					id: '3638ef05-85dc-4836-b7df-f5d5085a7f36',
					text: 'sadasd',
					publicLenderId: 'Jess1234',
					children: {
						comment: [
							{
								id: '53e30b71-9d50-4cc0-ae03-790bf56f8b3b',
								text: 'second reply',
								publicLenderId: 'Jess1234',
								children: {
									comment: [],
									like: [],
								},
							},
						],
						like: [{ publicLenderId: 'Jess1234' }],
					},
				},
			]);
		});
	});

	describe('disconnect', () => {
		it('should call disconnect', async () => {
			const service = await initService();
			service?.disconnect();

			expect(mockDisconnectUser).toHaveBeenCalledTimes(1);
		});
	});

	describe('addComment', () => {
		it('should add comment', async () => {
			const ID = 'test';
			const TEXT = 'asd';
			await (await initService())?.addComment(TEXT, ID);

			expect(mockSendMessage).toHaveBeenCalledWith({ text: TEXT, parentId: ID });
		});

		it('should handle exception', async () => {
			const ID = 'test';
			const TEXT = 'asd';
			mockSendMessage.mockImplementationOnce(() => { throw new Error(); });
			await (await initService())?.addComment(TEXT, ID);

			expect(spyParseError).toHaveBeenCalledTimes(1);
		});
	});

	describe('addReaction', () => {
		it('should add reaction', async () => {
			const ID = 'test';
			await (await initService())?.addReaction(ID);

			expect(mockSendReaction).toHaveBeenCalledWith(ID, { type: 'love' }, { enforce_unique: true });
		});

		it('should handle exception', async () => {
			const ID = 'test';
			mockSendReaction.mockImplementationOnce(() => { throw new Error(); });
			await (await initService())?.addReaction(ID);

			expect(spyParseError).toHaveBeenCalledTimes(1);
		});
	});

	describe('removeReaction', () => {
		it('should remove reaction', async () => {
			const ID = 'test';
			await (await initService())?.removeReaction(ID);

			expect(mockDeleteReaction).toHaveBeenCalledWith(ID, 'love');
		});

		it('should handle exception', async () => {
			const ID = 'test';
			mockDeleteReaction.mockImplementationOnce(() => { throw new Error(); });
			await (await initService())?.removeReaction(ID);

			expect(spyParseError).toHaveBeenCalledTimes(1);
		});
	});
});
