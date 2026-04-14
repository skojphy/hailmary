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
	height: 1700
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
		x: 122,
		y: 274,
		width: 250,
		height: 232,
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
		x: 381,
		y: 238,
		width: 244,
		height: 216,
		rotation: -2,
		enabled: false,
		fillStart: '#6857d9',
		fillEnd: '#3f3ba8'
	},
	{
		id: 'running-crew',
		label: '러닝 크루',
		emoji: '🔥 🏃🏃 🔥',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'tilted-quad',
		x: 625,
		y: 286,
		width: 220,
		height: 206,
		rotation: 14,
		enabled: false,
		fillStart: '#ff8a30',
		fillEnd: '#d85a22'
	},
	{
		id: 'idol',
		label: '아이돌 덕질',
		emoji: '🎤',
		badge: '4.4M 참여 중',
		labelFontSize: 26,
		shape: 'orb',
		x: 103,
		y: 505,
		width: 216,
		height: 200,
		rotation: 7,
		enabled: false,
		fillStart: '#d35ac4',
		fillEnd: '#8e46a0'
	},
	{
		id: 'tech',
		label: '테크',
		emoji: '💻 👩‍💻 🖥️',
		badge: '12.2K 참여 중',
		labelFontSize: 30,
		shape: 'clover',
		x: 360,
		y: 516,
		width: 238,
		height: 222,
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
		x: 620,
		y: 518,
		width: 214,
		height: 198,
		rotation: 5,
		enabled: false,
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
		x: 234,
		y: 753,
		width: 260,
		height: 228,
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
		x: 516,
		y: 750,
		width: 214,
		height: 196,
		rotation: -4,
		enabled: false,
		fillStart: '#d8768e',
		fillEnd: '#9e5ca8'
	},
	{
		id: 'bakery',
		label: '빵지순례',
		emoji: '🥐',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'tilted-quad',
		x: 106,
		y: 982,
		width: 214,
		height: 206,
		rotation: -9,
		enabled: false,
		fillStart: '#c98a54',
		fillEnd: '#8d5d39'
	},
	{
		id: 'phone',
		label: '폰 꾸미기',
		emoji: '📱',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'pebble',
		x: 351,
		y: 989,
		width: 248,
		height: 218,
		rotation: 8,
		enabled: false,
		fillStart: '#8f78d9',
		fillEnd: '#5b56b8'
	},
	{
		id: 'early-adopter-2',
		label: '얼리어답터',
		emoji: '🕊️',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'orb',
		x: 606,
		y: 970,
		width: 206,
		height: 198,
		rotation: -4,
		enabled: false,
		fillStart: '#6967d8',
		fillEnd: '#4740a8'
	},
	{
		id: 'tech-2',
		label: '테크',
		emoji: '💻 👩‍💻 🖥️',
		badge: '12.2K 참여 중',
		labelFontSize: 30,
		shape: 'clover',
		x: 174,
		y: 1278,
		width: 238,
		height: 224,
		rotation: 7,
		enabled: false,
		fillStart: '#1bd0c2',
		fillEnd: '#2a72ea'
	},
	{
		id: 'running-crew-2',
		label: '러닝 크루',
		emoji: '🔥 🏃🏃 🔥',
		badge: '4.4M 참여 중',
		labelFontSize: 28,
		shape: 'tilted-quad',
		x: 455,
		y: 1274,
		width: 228,
		height: 210,
		rotation: 12,
		enabled: false,
		fillStart: '#ff8d32',
		fillEnd: '#d45a22'
	},
	{
		id: 'idol-2',
		label: '아이돌 덕질',
		emoji: '🎤',
		badge: '4.4M 참여 중',
		labelFontSize: 26,
		shape: 'orb',
		x: 650,
		y: 1516,
		width: 214,
		height: 198,
		rotation: 9,
		enabled: false,
		fillStart: '#cf61c1',
		fillEnd: '#8d49a1'
	},
	{
		id: 'beauty-2',
		label: '뷰티',
		emoji: '✨',
		badge: '12.2K 참여 중',
		labelFontSize: 28,
		shape: 'clover',
		x: 410,
		y: 1510,
		width: 230,
		height: 206,
		rotation: 1,
		enabled: false,
		fillStart: '#d97492',
		fillEnd: '#9a5cad'
	}
];
