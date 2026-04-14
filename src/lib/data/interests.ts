export type InterestShape = 'orb' | 'pebble' | 'hex' | 'clover' | 'tilted-quad' | 'pill';

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

export const MAX_SELECTIONS = 3;

export const WORLD_SIZE = {
	width: 760,
	height: 2220
};

export const SELECTABLE_IDS = ['makeup', 'running', 'tech'] as const;

export const INTERESTS: InterestDefinition[] = [
	{
		id: 'makeup',
		label: '메이크업',
		emoji: '💄',
		badge: '12.2K 참여 중',
		labelFontSize: 28,
		shape: 'clover',
		x: 124,
		y: 296,
		width: 266,
		height: 246,
		rotation: -8,
		enabled: true,
		fillStart: '#ff4fc4',
		fillEnd: '#ff2758'
	},
	{
		id: 'early-adopter',
		label: '얼리어답터',
		emoji: '🕊️',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'pebble',
		x: 438,
		y: 282,
		width: 270,
		height: 232,
		rotation: -2,
		enabled: false,
		fillStart: '#373737',
		fillEnd: '#2f2f2f'
	},
	{
		id: 'running-crew',
		label: '러닝 크루',
		emoji: '🔥 🏃🏃 🔥',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'tilted-quad',
		x: 692,
		y: 306,
		width: 244,
		height: 226,
		rotation: 14,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#2f2f2f'
	},
	{
		id: 'idol',
		label: '아이돌 덕질',
		emoji: '🎤',
		badge: '4.4M 참여 중',
		labelFontSize: 26,
		shape: 'orb',
		x: 94,
		y: 642,
		width: 232,
		height: 214,
		rotation: 7,
		enabled: false,
		fillStart: '#373737',
		fillEnd: '#2e2e2e'
	},
	{
		id: 'tech',
		label: '테크',
		emoji: '💻 👩‍💻 🖥️',
		badge: '12.2K 참여 중',
		labelFontSize: 30,
		shape: 'clover',
		x: 388,
		y: 622,
		width: 254,
		height: 238,
		rotation: -6,
		enabled: true,
		fillStart: '#17d0c1',
		fillEnd: '#2257ff'
	},
	{
		id: 'home',
		label: '집 꾸미기',
		emoji: '🕊️',
		badge: '4.4M 참여 중',
		labelFontSize: 26,
		shape: 'orb',
		x: 678,
		y: 650,
		width: 230,
		height: 214,
		rotation: 5,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#303030'
	},
	{
		id: 'running',
		label: '러닝',
		emoji: '🏃‍♀️🏃‍♂️',
		badge: '12.2K 참여 중',
		labelFontSize: 30,
		shape: 'orb',
		x: 306,
		y: 930,
		width: 282,
		height: 246,
		rotation: -4,
		enabled: true,
		fillStart: '#a8d400',
		fillEnd: '#59a400'
	},
	{
		id: 'beauty',
		label: '뷰티',
		emoji: '✨',
		badge: '12.2K 참여 중',
		labelFontSize: 28,
		shape: 'clover',
		x: 566,
		y: 978,
		width: 230,
		height: 212,
		rotation: -4,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#303030'
	},
	{
		id: 'bakery',
		label: '빵지순례',
		emoji: '🥐',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'tilted-quad',
		x: 92,
		y: 1268,
		width: 230,
		height: 222,
		rotation: -9,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#2f2f2f'
	},
	{
		id: 'phone',
		label: '폰 꾸미기',
		emoji: '📱',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'pebble',
		x: 390,
		y: 1328,
		width: 278,
		height: 236,
		rotation: 8,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#2f2f2f'
	},
	{
		id: 'early-adopter-2',
		label: '얼리어답터',
		emoji: '🕊️',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'orb',
		x: 700,
		y: 1382,
		width: 220,
		height: 214,
		rotation: -4,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#303030'
	},
	{
		id: 'tech-2',
		label: '테크',
		emoji: '💻 👩‍💻 🖥️',
		badge: '12.2K 참여 중',
		labelFontSize: 30,
		shape: 'clover',
		x: 212,
		y: 1758,
		width: 246,
		height: 236,
		rotation: 7,
		enabled: false,
		fillStart: '#393939',
		fillEnd: '#2f2f2f'
	},
	{
		id: 'running-crew-2',
		label: '러닝 크루',
		emoji: '🔥 🏃🏃 🔥',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'tilted-quad',
		x: 522,
		y: 1748,
		width: 252,
		height: 232,
		rotation: 12,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#2f2f2f'
	},
	{
		id: 'idol-2',
		label: '아이돌 덕질',
		emoji: '🎤',
		badge: '4.4M 참여 중',
		labelFontSize: 26,
		shape: 'orb',
		x: 754,
		y: 1930,
		width: 228,
		height: 212,
		rotation: 9,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#303030'
	},
	{
		id: 'beauty-2',
		label: '뷰티',
		emoji: '✨',
		badge: '12.2K 참여 중',
		labelFontSize: 28,
		shape: 'clover',
		x: 456,
		y: 2068,
		width: 250,
		height: 224,
		rotation: 1,
		enabled: false,
		fillStart: '#383838',
		fillEnd: '#303030'
	}
];
