const options = [
	{
		id: 1,
		value: 'opt1',
	},
	{
		id: 2,
		value: 'opt2',
	},
	{
		id: 3,
		value: 'opt3',
	},
	{
		id: 4,
		value: 'opt4',
	},
	{
		id: 5,
		value: 'opt5',
	},
	{
		id: 6,
		value: 'opt6',
	},
	{
		id: 7,
		value: 'opt7',
	},
];
const price = [
	{
		id: 0,
		name: 'Any',
		array: [],
	},
	{
		id: 1,
		name: '$0 to 4999',
		array: [0, 4999],
	},
	{
		id: 2,
		name: '$5000 to 9999',
		array: [5000, 9999],
	},
	{
		id: 3,
		name: '$10000,39999',
		array: [10000, 39999],
	},
	{
		id: 4,
		name: 'More then $40000',
		array: [40000, 9999999999],
	},
];

export { options, price };
