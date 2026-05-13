export type InterestShape =
	| 'orb'
	| 'pebble'
	| 'hex'
	| 'clover'
	| 'four-leaf'
	| 'tilted-quad'
	| 'pill';

export type InterestDefinition = {
	id: string;
	label: string;
	emoji: string;
	badge: string;
	labelFontSize?: number;
	shape: InterestShape;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	enabled: boolean;
	fillStart: string;
	fillEnd: string;
};

export const MAX_SELECTIONS = 5;

export const WORLD_SIZE = {
	width: 760,
	height: 760
};

const INTERESTS_BASE: InterestDefinition[] = [
	{
		id: 'makeup',
		label: '메이크업',
		emoji: '💄',
		badge: '12.2K 참여 중',
		labelFontSize: 28,
		shape: 'clover',
		x: 340,
		y: -120,
		width: 297,
		height: 276,
		rotation: -11,
		enabled: true,
		fillStart: '#ff4fc4',
		fillEnd: '#ff2758'
	},
	{
		id: 'tech',
		label: '테크',
		emoji: '💻 👩‍💻 🖥️',
		badge: '12.2K 참여 중',
		labelFontSize: 30,
		shape: 'hex',
		x: 196,
		y: 126,
		width: 297,
		height: 271,
		rotation: 12,
		enabled: true,
		fillStart: '#17d0c1',
		fillEnd: '#2257ff'
	},
	{
		id: 'home',
		label: '방꾸미기',
		emoji: '🪴',
		badge: '4.4M 참여 중',
		labelFontSize: 26,
		shape: 'hex',
		x: 478,
		y: 156,
		width: 268,
		height: 244,
		rotation: 8,
		enabled: true,
		fillStart: '#6faa7a',
		fillEnd: '#4d7863'
	},
	{
		id: 'running',
		label: '러닝',
		emoji: '🏃‍♀️🏃‍♂️',
		badge: '12.2K 참여 중',
		labelFontSize: 30,
		shape: 'orb',
		x: 238,
		y: 420,
		width: 289,
		height: 271,
		rotation: 4,
		enabled: true,
		fillStart: '#a8d400',
		fillEnd: '#59a400'
	},
	{
		id: 'fashion',
		label: '패션',
		emoji: '👗',
		badge: '12.2K 참여 중',
		labelFontSize: 28,
		shape: 'clover',
		x: 528,
		y: 490,
		width: 273,
		height: 252,
		rotation: 3,
		enabled: true,
		fillStart: '#f08f73',
		fillEnd: '#bf6656'
	}
];

export const INTERESTS: InterestDefinition[] = INTERESTS_BASE.map((interest) => ({
	...interest,
	enabled: true
}));

export const SELECTABLE_IDS: string[] = [];
