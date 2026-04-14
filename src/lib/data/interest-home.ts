import type { InterestArea } from '$lib/stores/interest';

export type HomePalette = {
	background: string;
	headerText: string;
	headerPillBg: string;
	headerPillText: string;
	noticeBg: string;
	noticeBorder: string;
	noticeAccent: string;
	cardBg: string;
	cardBorder: string;
	cardShadow: string;
	cardText: string;
	cardMuted: string;
	accent: string;
	accentStrong: string;
	accentSoft: string;
	accentText: string;
	rankingAccent: string;
};

export type HomeHeader = {
	emoji: string;
	label: string;
	interestCount: string;
};

export type HomeNotice = {
	icon: string;
	text: string;
	highlight: string;
	cta: string;
};

export type CardBadge =
	| {
			kind: 'text';
			text: string;
			tone?: 'default' | 'accent' | 'shorts';
	  }
	| {
			kind: 'logo';
			image: string;
			alt: string;
	  }
	| {
			kind: 'live';
			image: string;
			alt: string;
			suffix: string;
	  };

export type TextBadge = Extract<CardBadge, { kind: 'text' }>;
export type LogoBadge = Extract<CardBadge, { kind: 'logo' }>;
export type LiveBadge = Extract<CardBadge, { kind: 'live' }>;

type BaseCard = {
	id: string;
	column: 'left' | 'right';
	buttonLabel: string;
};

export type StoryCard = BaseCard & {
	type: 'story';
	badge: TextBadge;
	title: string;
	body: string;
	avatars: string[];
	meta: string;
};

export type ProductCard = BaseCard & {
	type: 'product';
	badge: TextBadge | LogoBadge;
	image: string;
	title: string;
	discount: string;
	price: string;
	avatars: string[];
	meta: string;
	chipStyle?: 'highlight';
};

export type ShortsCard = BaseCard & {
	type: 'shorts';
	badge: TextBadge;
	image: string;
	title: string;
	duration: string;
	avatars: string[];
	meta: string;
};

export type LiveCard = BaseCard & {
	type: 'live';
	badge: LiveBadge;
	image: string;
	title: string;
	discount: string;
	price: string;
	avatars: string[];
	meta: string;
	mediaCaption: string;
};

export type GalleryCard = BaseCard & {
	type: 'gallery';
	badge: TextBadge;
	image: string;
	title: string;
	avatars: string[];
	meta: string;
};

export type RankingCard = BaseCard & {
	type: 'ranking';
	badge: TextBadge;
	items: Array<{
		rank: number;
		label: string;
		views: string;
		image: string;
	}>;
};

export type FollowingCard = BaseCard & {
	type: 'following';
	badge: TextBadge;
	people: Array<{
		name: string;
		followers: string;
		image: string;
	}>;
};

export type InterestHomeCard =
	| StoryCard
	| ProductCard
	| ShortsCard
	| LiveCard
	| GalleryCard
	| RankingCard
	| FollowingCard;

export type InterestHomeTheme = {
	header: HomeHeader;
	notice: HomeNotice;
	palette: HomePalette;
	cards: InterestHomeCard[];
};

const makeupPalette: HomePalette = {
	background: '#ffd6eb',
	headerText: '#111111',
	headerPillBg: '#ffe8f4',
	headerPillText: '#ff5b8f',
	noticeBg: '#fff7ff',
	noticeBorder: '#2e76ff',
	noticeAccent: '#6a39ff',
	cardBg: 'rgba(255, 246, 250, 0.94)',
	cardBorder: 'rgba(255, 255, 255, 0.82)',
	cardShadow: '0 14px 28px rgba(220, 72, 132, 0.16)',
	cardText: '#191919',
	cardMuted: '#77707b',
	accent: '#ff5b8f',
	accentStrong: '#ff5e3a',
	accentSoft: '#fff1f6',
	accentText: '#ff4d88',
	rankingAccent: '#ff4b76'
};

const runningPalette: HomePalette = {
	background: '#d9f2ff',
	headerText: '#10222e',
	headerPillBg: '#eefaff',
	headerPillText: '#1580c8',
	noticeBg: '#f6fdff',
	noticeBorder: '#1595d9',
	noticeAccent: '#0f78c5',
	cardBg: 'rgba(248, 253, 255, 0.95)',
	cardBorder: 'rgba(255, 255, 255, 0.85)',
	cardShadow: '0 14px 28px rgba(39, 139, 196, 0.12)',
	cardText: '#162430',
	cardMuted: '#6f8291',
	accent: '#0a88cc',
	accentStrong: '#008bd7',
	accentSoft: '#edf7ff',
	accentText: '#1189d2',
	rankingAccent: '#1189d2'
};

const techPalette: HomePalette = {
	background: '#edf2ff',
	headerText: '#151a28',
	headerPillBg: '#f2f5ff',
	headerPillText: '#536cff',
	noticeBg: '#ffffff',
	noticeBorder: '#536cff',
	noticeAccent: '#2e55ff',
	cardBg: 'rgba(255, 255, 255, 0.96)',
	cardBorder: 'rgba(236, 239, 255, 0.95)',
	cardShadow: '0 16px 30px rgba(65, 86, 173, 0.12)',
	cardText: '#1b2030',
	cardMuted: '#72809a',
	accent: '#536cff',
	accentStrong: '#2451ff',
	accentSoft: '#eff3ff',
	accentText: '#4b63f3',
	rankingAccent: '#536cff'
};

const avatars = [
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
	'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80'
];

const makeupAvatars = [
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
	'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=120&q=80',
	'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80'
];

export const interestHomeThemes: Record<InterestArea, InterestHomeTheme> = {
	makeup: {
		header: {
			emoji: '💄',
			label: '메이크업',
			interestCount: '398,581명 관심'
		},
		notice: {
			icon: '✦',
			text: '유진님, 요즘',
			highlight: '20대를',
			cta: '구경하기'
		},
		palette: makeupPalette,
		cards: [
			{
				id: 'mk-story',
				type: 'story',
				column: 'left',
				badge: { kind: 'text', text: '🏆 인기글' },
				title: '내돈내산 장원영 Pick 틴트 정보 공유',
				body: '제가 가본 곳중에 제일 괜찮은 곳을 뽑아보았는데요. 맛피자의 가장 맛있는데, 위치는 용산 쪽이라 접근성도 좋았어요...',
				avatars: makeupAvatars,
				meta: '24,910명이 봄',
				buttonLabel: '더 많은 인기글 보기'
			},
			{
				id: 'mk-super',
				type: 'product',
				column: 'right',
				badge: { kind: 'logo', image: '/interest-home/makeup/badge-superdeal.svg', alt: '슈퍼딜' },
				image:
					'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
				title: '구달 청귤비타C잡티케어...',
				discount: '72%',
				price: '36,200원',
				avatars: makeupAvatars,
				meta: '331명이 구매',
				buttonLabel: '더 많은 슈퍼딜 보기'
			},
			{
				id: 'mk-select',
				type: 'product',
				column: 'left',
				badge: { kind: 'logo', image: '/interest-home/makeup/badge-selecti.svg', alt: 'Selecti' },
				image:
					'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=600&q=80',
				title: '미니 실리콘 립 브러쉬 컨...',
				discount: '32%',
				price: '1,565원',
				avatars: makeupAvatars,
				meta: '331명이 구매',
				chipStyle: 'highlight',
				buttonLabel: '더 많은 셀렉티 보기'
			},
			{
				id: 'mk-shorts',
				type: 'shorts',
				column: 'right',
				badge: { kind: 'text', text: 'Shorts', tone: 'shorts' },
				image:
					'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
				title: '유리숍 공동개발! 바닐라코 틴트 라이브🔥',
				duration: '00:28',
				avatars: makeupAvatars,
				meta: '3,981명이 봄',
				buttonLabel: '더 많은 숏츠 보기'
			},
			{
				id: 'mk-live',
				type: 'live',
				column: 'left',
				badge: {
					kind: 'live',
					image: '/interest-home/makeup/badge-live.svg',
					alt: 'LIVE',
					suffix: '공구 · 경매'
				},
				image:
					'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
				title: '뷰티차트×에스티 로더 2...',
				discount: '34%',
				price: '243,100원',
				avatars: makeupAvatars,
				meta: '391개 구매',
				mediaCaption: '500개 한정\n공동구매',
				buttonLabel: '더 많은 라이브 보기'
			},
			{
				id: 'mk-gallery',
				type: 'gallery',
				column: 'right',
				badge: { kind: 'text', text: '📸 갤러리' },
				image:
					'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
				title: '이 립컬러...진짜 맑죠... 베리베리 매우 맑아....',
				avatars: makeupAvatars,
				meta: '4,112명이 봄',
				buttonLabel: '더 많은 사진 보기'
			},
			{
				id: 'mk-following',
				type: 'following',
				column: 'left',
				badge: { kind: 'text', text: '💘 TOP 인플루언서' },
				people: [
					{
						name: '덕키비키',
						followers: '49,241명',
						image:
							'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '썸머',
						followers: '12,913명',
						image:
							'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '뚜비',
						followers: '89,483명',
						image:
							'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '아기명수',
						followers: '1,512명',
						image:
							'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=240&q=80'
					}
				],
				buttonLabel: '더 많은 인플루언서 보기'
			},
			{
				id: 'mk-ranking',
				type: 'ranking',
				column: 'right',
				badge: { kind: 'text', text: '🔥 Hot 키워드' },
				items: [
					{
						rank: 1,
						label: '장원영',
						views: '2.9K 조회',
						image:
							'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=180&q=80'
					},
					{
						rank: 2,
						label: '맥북 프로',
						views: '1.1K 조회',
						image:
							'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=180&q=80'
					},
					{
						rank: 3,
						label: '로지텍',
						views: '0.6K 조회',
						image:
							'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=180&q=80'
					}
				],
				buttonLabel: '더 많은 키워드 보기'
			}
		]
	},
	running: {
		header: {
			emoji: '🏃',
			label: '러닝',
			interestCount: '287,442명 관심'
		},
		notice: {
			icon: '✦',
			text: '민수님, 요즘',
			highlight: 'PB 갱신템',
			cta: '둘러보기'
		},
		palette: runningPalette,
		cards: [
			{
				id: 'rn-story',
				type: 'story',
				column: 'left',
				badge: { kind: 'text', text: '🏅 인기글' },
				title: '10K PB 달성한 러너의 회복 루틴',
				body: '서브50 노리면서 가장 체감 좋았던 회복법이랑, 기록 다음날 꼭 챙긴 식단을 적어봤어요.',
				avatars,
				meta: '18,204명이 봄',
				buttonLabel: '더 많은 인기글 보기'
			},
			{
				id: 'rn-shorts',
				type: 'shorts',
				column: 'right',
				badge: { kind: 'text', text: 'Shorts', tone: 'shorts' },
				image:
					'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=600&q=80',
				title: '5km 20분대 진입하는 호흡 템포 훈련',
				duration: '00:21',
				avatars,
				meta: '8,331명이 봄',
				buttonLabel: '더 많은 숏츠 보기'
			},
			{
				id: 'rn-product',
				type: 'product',
				column: 'left',
				badge: { kind: 'text', text: '러닝딜', tone: 'accent' },
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
				title: '레이스 데이용 초경량 러닝화 스페셜 딜',
				discount: '24%',
				price: '129,000원',
				avatars,
				meta: '410명이 구매',
				buttonLabel: '더 많은 러닝딜 보기'
			},
			{
				id: 'rn-ranking',
				type: 'ranking',
				column: 'right',
				badge: { kind: 'text', text: '⚡ 이번주 키워드' },
				items: [
					{ rank: 1, label: '알파플라이', views: '3.4K 조회', image: 'https://placehold.co/92x92/d8f0ff/0f78c5?text=A' },
					{ rank: 2, label: '한강런', views: '2.1K 조회', image: 'https://placehold.co/92x92/e3f6ff/33a2ff?text=B' },
					{ rank: 3, label: '젤', views: '1.7K 조회', image: 'https://placehold.co/92x92/d0ecff/007bc4?text=C' }
				],
				buttonLabel: '더 많은 키워드 보기'
			}
		]
	},
	tech: {
		header: {
			emoji: '💻',
			label: '테크',
			interestCount: '512,903명 관심'
		},
		notice: {
			icon: '✦',
			text: '지훈님, 오늘',
			highlight: '책상 셋업템',
			cta: '보러가기'
		},
		palette: techPalette,
		cards: [
			{
				id: 'te-banner',
				type: 'product',
				column: 'left',
				badge: { kind: 'text', text: '데스크딜', tone: 'accent' },
				image:
					'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=80',
				title: '책상 셋업 끝내는 27인치 4K 모니터 특가',
				discount: '18%',
				price: '329,000원',
				avatars,
				meta: '220명이 구매',
				buttonLabel: '더 많은 장비 보기'
			},
			{
				id: 'te-shorts',
				type: 'shorts',
				column: 'right',
				badge: { kind: 'text', text: 'Shorts', tone: 'shorts' },
				image:
					'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
				title: '맥북 초보가 켜면 삶이 편해지는 설정 5개',
				duration: '00:31',
				avatars,
				meta: '9,812명이 봄',
				buttonLabel: '더 많은 숏츠 보기'
			},
			{
				id: 'te-following',
				type: 'following',
				column: 'left',
				badge: { kind: 'text', text: '👨‍💻 팔로잉 크리에이터' },
				people: [
					{ name: '맥북오너', followers: '120,001명', image: avatars[0] },
					{ name: '얼리어답터', followers: '84,210명', image: avatars[1] },
					{ name: '데스크테리어', followers: '44,102명', image: avatars[2] },
					{ name: '기계식덕후', followers: '23,901명', image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=120&q=80' }
				],
				buttonLabel: '더 많은 인플루언서 보기'
			},
			{
				id: 'te-ranking',
				type: 'ranking',
				column: 'right',
				badge: { kind: 'text', text: '📈 Hot 키워드' },
				items: [
					{ rank: 1, label: 'M4', views: '5.2K 조회', image: 'https://placehold.co/92x92/dce3ff/5165ff?text=M4' },
					{ rank: 2, label: '키보드', views: '3.3K 조회', image: 'https://placehold.co/92x92/e9edff/7d8fff?text=K' },
					{ rank: 3, label: '에어팟', views: '2.4K 조회', image: 'https://placehold.co/92x92/e3f0ff/53a1ff?text=A' }
				],
				buttonLabel: '더 많은 키워드 보기'
			}
		]
	}
};

export const interestHeaderMeta = Object.fromEntries(
	Object.entries(interestHomeThemes).map(([key, value]) => [
		key,
		{
			emoji: value.header.emoji,
			label: value.header.label,
			interestCount: value.header.interestCount,
			palette: value.palette
		}
	])
) as Record<
	InterestArea,
	{
		emoji: string;
		label: string;
		interestCount: string;
		palette: HomePalette;
	}
>;
