/**
 * Provisional mock feed activity data. Likely to change as we develop the comments feature.
 */

const comments = {
	activities: [
		{
			actor: {
				created_at: '2024-01-23T20:38:36.661529Z',
				updated_at: '2024-01-23T20:38:36.977252Z',
				id: 'john',
				data: {
					handle: '@john',
					name: 'John',
					profileImage: 'https://via.placeholder.com/50x50',
				},
			},
			latest_children: {
				comment: {
					actor: {
						created_at: '2024-01-23T20:38:36.661529Z',
						updated_at: '2024-01-23T20:38:36.977252Z',
						id: 'eric',
						data: {
							handle: '@BaxEr',
							name: 'Eric',
							profileImage: 'https://via.placeholder.com/50x50',
						},
					},
					foreign_id: '',
					id: '7105f366-bfb1-11ee-8378-06b39a842511',
					object: '2',
					origin: 'user:eric',
					target: '',
					time: '2024-01-30T20:52:12.139608',
					tweet: 'Child - Cool stuff!',
					verb: 'tweet',
				},
			},
			foreign_id: '',
			id: 'a7105f366-bfb1-11ee-8378-06b39a842567',
			object: '2',
			origin: 'user:eric',
			target: '',
			time: '2024-01-30T20:52:12.139608',
			tweet: 'Cool stuff!',
			verb: 'tweet',
		},
		{
			actor: {
				created_at: '2024-01-23T20:38:36.661529Z',
				updated_at: '2024-01-23T20:38:36.977252Z',
				id: 'Leah',
				data: {
					handle: '@leah',
					name: 'Leah',
					profileImage: 'https://via.placeholder.com/50x50',
				},
			},
			latest_children: null,
			foreign_id: '',
			id: '70eee8b6-bfb1-11ee-a4b5-020077c2d353',
			object: '2',
			origin: 'user:leah',
			target: '',
			time: '2024-01-30T20:52:11.988601',
			tweet: 'Cool stuff!',
			verb: 'tweet',
		},
	],
	activity_count: 2,
	actor_count: 1,
	created_at: '2024-01-30T20:19:43.482141',
	group: 'tweet_2024-01-30',
	id: '71064c67-bfb1-11ee-8080-80007706b6fd',
	updated_at: '2024-01-30T20:52:12.141885',
	verb: 'tweet',
};

export default comments;
