const comments = [
	{
		created_at: '2024-02-01T20:12:31.398932Z',
		updated_at: '2024-02-01T20:12:31.398932Z',
		id: 'dade3812-6aa0-4c32-90ea-2366dab178a1',
		kind: 'comment',
		activity_id: 'efb2dbfe-c12a-11ee-9fbc-065afce7d41d',
		text: 'another guest comment',
		user: {
			publicLenderId: 'Nathan2352',
			name: 'Nathan',
			image: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg', // eslint-disable-line max-len
		},
		parent: '',
		latest_children: {
			like: [
				{
					created_at: '2024-02-28T20:04:21.445272Z',
					updated_at: '2024-02-28T20:04:21.445272Z',
					id: '290a6c07-143a-416e-b016-ac0d9ac8ad91',
					user: {
						created_at: '2024-02-28T19:09:54.093757Z',
						updated_at: '2024-02-28T19:09:54.093757Z',
						publicLenderId: 'Jess1234',
						name: 'Jess',
						image: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg', // eslint-disable-line max-len
					},
					kind: 'like',
					activity_id: 'efb2dbfe-c12a-11ee-9fbc-065afce7d41d',
					parent: '6384df77-d7c4-4ea9-b1b9-ef1c76a054a2',
					latest_children: {},
					children_counts: {},
				},
			],
			comment: [
				{
					created_at: '2024-02-28T20:04:21.445272Z',
					updated_at: '2024-02-28T20:04:21.445272Z',
					id: '290a6c07-143a-416e-b016-ac0d9ac8ad92',
					user: {
						publicLenderId: 'Casey1234',
						name: 'Casey',
						image: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg', // eslint-disable-line max-len
					},
					kind: 'comment',
					activity_id: 'efb2dbfe-c12a-11ee-9fbc-065afce7d41d',
					text: 'child comment',
					parent: '6384df77-d7c4-4ea9-b1b9-ef1c76a054a2',
					latest_children: {
						comment: [
							{
								created_at: '2024-02-28T20:04:21.445272Z',
								updated_at: '2024-02-28T20:04:21.445272Z',
								id: '290a6c07-143a-416e-b016-ac0d9ac8ad93',
								user: {
									publicLenderId: 'Sarah1234',
									name: 'Sarah',
									image: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg', // eslint-disable-line max-len
								},
								kind: 'comment',
								activity_id: 'efb2dbfe-c12a-11ee-9fbc-065afce7d41d',
								text: 'child comment reply',
								parent: '6384df77-d7c4-4ea9-b1b9-ef1c76a054a2',
								latest_children: {},
								children_counts: {},
							},
						],
					},
					children_counts: {
						comment: 1,
					},
				},
				{
					created_at: '2024-02-28T20:04:21.445272Z',
					updated_at: '2024-02-28T20:04:21.445272Z',
					id: '290a6c07-143a-416e-b016-ac0d9ac8ad90',
					user: {
						publicLenderId: 'Sophie1234',
						name: 'Sophie',
						image: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg', // eslint-disable-line max-len
					},
					kind: 'comment',
					activity_id: 'efb2dbfe-c12a-11ee-9fbc-065afce7d41d',
					text: 'second child comment',
					parent: '6384df77-d7c4-4ea9-b1b9-ef1c76a054a2',
					latest_children: {
						like: [
							{
								created_at: '2024-02-28T20:04:21.445272Z',
								updated_at: '2024-02-28T20:04:21.445272Z',
								id: '290a6c07-143a-416e-b016-ac0d9ac8ad99',
								user: {
									created_at: '2024-02-28T19:09:54.093757Z',
									updated_at: '2024-02-28T19:09:54.093757Z',
									publicLenderId: 'Jess1234',
									name: 'Jess',
									image: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg', // eslint-disable-line max-len
								},
								kind: 'like',
								activity_id: 'efb2dbfe-c12a-11ee-9fbc-065afce7d41d',
								parent: '6384df77-d7c4-4ea9-b1b9-ef1c76a054a2',
								latest_children: {},
								children_counts: {},
							},
						],
					},
					children_counts: {},
				},
			],
		},
		children_counts: {
			comment: 1,
			like: 1,
		},
	},
	{
		created_at: '2024-02-01T20:11:23.931133Z',
		updated_at: '2024-02-01T20:11:23.931133Z',
		id: '3de615bb-0d48-4a69-9004-141ee26985eb',
		kind: 'comment',
		activity_id: 'efb2dbfe-c12a-11ee-9fbc-065afce7d41d',
		text: 'test as visitor',
		user: {
			created_at: '2024-02-28T19:09:54.093757Z',
			updated_at: '2024-02-28T19:09:54.093757Z',
			publicLenderId: 'Lauren1234',
			name: '',
			image: '',
		},
		parent: '',
		latest_children: {},
		children_counts: {},
		is_liked: true,
	},
	{
		created_at: '2024-02-01T20:06:46.651764Z',
		updated_at: '2024-02-01T20:06:46.651764Z',
		id: 'e1db4420-159e-4ba2-aab9-704d1cc56dae',
		user: {
			created_at: '2024-02-28T19:09:54.093757Z',
			updated_at: '2024-02-28T19:09:54.093757Z',
			publicLenderId: 'Todd1234',
			name: 'Todd',
			image: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg', // eslint-disable-line max-len
		},
		kind: 'comment',
		activity_id: 'efb2dbfe-c12a-11ee-9fbc-065afce7d41d',
		text: 'comment test forever!',
		parent: '',
		latest_children: {},
		children_counts: {},
	},
];

export default comments;
