export const publicLenderId = 'Jess1234';

export const comments = [
	{
		id: 'a86167d1-8222-42a8-a53b-e16d3955efa8',
		publicLenderId,
		children: {
			comment: [
				{
					id: '7634a90c-04a8-457b-9849-2ac48d3f44e0',
					publicLenderId,
					children: {
						comment: [],
						like: [
							{
								publicLenderId,
							},
						],
					},
					text: 'First reply',
				},
			],
			like: [
				{
					publicLenderId,
				},
			],
		},
		text: 'First comment',
	},
	{
		id: '2507fcb5-12c8-4b1c-aedc-822492021584',
		publicLenderId,
		text: 'Second comment',
	},
];
