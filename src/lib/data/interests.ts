export type InterestShape = 'orb' | 'pebble' | 'hex' | 'clover' | 'tilted-quad' | 'pill';

export type InterestDefinition = {
	id: string;
	label: string;
	emoji: string;
	badge: string;
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
	width: 1540,
	height: 1680
};

export const SELECTABLE_IDS = ['makeup', 'running', 'tech'] as const;

export const INTERESTS: InterestDefinition[] = [
	{
		id: 'makeup',
		label: '메이크업',
		emoji: '💄',
		badge: '지금 선택 가능',
		shape: 'clover',
		x: 280,
		y: 360,
		width: 330,
		height: 300,
		rotation: -8,
		enabled: true,
		fillStart: '#ff4fc4',
		fillEnd: '#ff2758'
	},
	{
		id: 'playlist',
		label: '플레이리스트',
		emoji: '🎧',
		badge: 'comming soon',
		shape: 'pebble',
		x: 790,
		y: 320,
		width: 360,
		height: 320,
		rotation: -2,
		enabled: false,
		fillStart: '#393939',
		fillEnd: '#272727'
	},
	{
		id: 'running',
		label: '러닝',
		emoji: '🔥',
		badge: '지금 선택 가능',
		shape: 'hex',
		x: 1240,
		y: 390,
		width: 320,
		height: 300,
		rotation: 14,
		enabled: true,
		fillStart: '#ff7a18',
		fillEnd: '#ffb347'
	},
	{
		id: 'idol',
		label: '아이돌 덕질',
		emoji: '🎤',
		badge: 'comming soon',
		shape: 'orb',
		x: 150,
		y: 740,
		width: 300,
		height: 310,
		rotation: 7,
		enabled: false,
		fillStart: '#3a3a3a',
		fillEnd: '#2b2b2b'
	},
	{
		id: 'boardgame',
		label: '보드게임',
		emoji: '🎲',
		badge: 'comming soon',
		shape: 'clover',
		x: 760,
		y: 760,
		width: 360,
		height: 320,
		rotation: 11,
		enabled: false,
		fillStart: '#3a3a3a',
		fillEnd: '#272727'
	},
	{
		id: 'home',
		label: '집 꾸미기',
		emoji: '🪴',
		badge: 'comming soon',
		shape: 'pill',
		x: 1310,
		y: 770,
		width: 310,
		height: 300,
		rotation: 5,
		enabled: false,
		fillStart: '#3a3a3a',
		fillEnd: '#2d2d2d'
	},
	{
		id: 'tech',
		label: '테크',
		emoji: '💻',
		badge: '지금 선택 가능',
		shape: 'orb',
		x: 620,
		y: 1120,
		width: 380,
		height: 340,
		rotation: -6,
		enabled: true,
		fillStart: '#2f9bff',
		fillEnd: '#2048ff'
	},
	{
		id: 'beauty',
		label: '뷰티툴',
		emoji: '🫧',
		badge: 'comming soon',
		shape: 'clover',
		x: 1140,
		y: 1160,
		width: 320,
		height: 300,
		rotation: -4,
		enabled: false,
		fillStart: '#3a3a3a',
		fillEnd: '#2a2a2a'
	},
	{
		id: 'furniture',
		label: '가구 수집',
		emoji: '🪑',
		badge: 'comming soon',
		shape: 'tilted-quad',
		x: 220,
		y: 1420,
		width: 320,
		height: 280,
		rotation: -9,
		enabled: false,
		fillStart: '#373737',
		fillEnd: '#262626'
	},
	{
		id: 'phone',
		label: '폰 꾸미기',
		emoji: '📱',
		badge: 'comming soon',
		shape: 'pebble',
		x: 850,
		y: 1460,
		width: 380,
		height: 320,
		rotation: 8,
		enabled: false,
		fillStart: '#3a3a3a',
		fillEnd: '#272727'
	}
];
