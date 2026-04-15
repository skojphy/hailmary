import type { InterestArea } from '$lib/stores/interest';

export type HomePalette = {
	background: string;
	backgroundGradient: string;
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
	backgroundGradient: 'linear-gradient(180deg, #f4bee5 0%, #f6adc9 58%, #f8eef2 100%)',
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
	background: '#ccecff',
	backgroundGradient: 'linear-gradient(180deg, #7eb8ea 0%, #94c7ef 52%, #c7e1f3 100%)',
	headerText: '#111111',
	headerPillBg: '#e8f5ff',
	headerPillText: '#ff6065',
	noticeBg: '#f7fbff',
	noticeBorder: '#3b82ff',
	noticeAccent: '#6a3dff',
	cardBg: 'rgba(243, 250, 255, 0.92)',
	cardBorder: 'rgba(255, 255, 255, 0.86)',
	cardShadow: '0 14px 28px rgba(58, 132, 214, 0.14)',
	cardText: '#1b1b1b',
	cardMuted: '#65717f',
	accent: '#4f7df0',
	accentStrong: '#ff5a42',
	accentSoft: '#ecf6ff',
	accentText: '#5b86d9',
	rankingAccent: '#3380ff'
};

const techPalette: HomePalette = {
	background: '#dce5f6',
	backgroundGradient: 'linear-gradient(180deg, #cad3e6 0%, #d2dcef 54%, #edf2f9 100%)',
	headerText: '#111111',
	headerPillBg: '#eef2fa',
	headerPillText: '#ff6065',
	noticeBg: '#f7faff',
	noticeBorder: '#7b8ec8',
	noticeAccent: '#5973d9',
	cardBg: 'rgba(246, 250, 255, 0.92)',
	cardBorder: 'rgba(255, 255, 255, 0.84)',
	cardShadow: '0 14px 28px rgba(91, 116, 168, 0.14)',
	cardText: '#222222',
	cardMuted: '#6f7689',
	accent: '#6d7fc4',
	accentStrong: '#ff5c44',
	accentSoft: '#edf3ff',
	accentText: '#6b8fca',
	rankingAccent: '#2b7cff'
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

const techAvatars = [
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
	'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
	'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80'
];

const runningAvatars = [
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
	'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=120&q=80',
	'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80'
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
				badge: { kind: 'logo', image: '/interest-home/super.png', alt: '슈퍼딜' },
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
				badge: { kind: 'logo', image: '/interest-home/selecti.png', alt: 'Selecti' },
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
					image: '/interest-home/live.png',
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
			interestCount: '9,281명 관심'
		},
		notice: {
			icon: '✦',
			text: '유진님,',
			highlight: '초보 러너 잇템',
			cta: '구경하기'
		},
		palette: runningPalette,
		cards: [
			{
				id: 'rn-story',
				type: 'story',
				column: 'left',
				badge: { kind: 'text', text: '🏆 인기글' },
				title: '러닝 초보자를 위한 필수 아이템 모음!!',
				body: '내돈내산 초보 러너 아이템을 모아봤습니다. 운동 처음 하신다구요? 그럼 이것부터 챙기면 좋아요...',
				avatars: runningAvatars,
				meta: '24,910명이 봄',
				buttonLabel: '더 많은 인기글 보기'
			},
			{
				id: 'rn-super',
				type: 'product',
				column: 'right',
				badge: { kind: 'logo', image: '/interest-home/super.png', alt: '슈퍼딜' },
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
				title: 'LightSpray Cloudmonst...',
				discount: '24%',
				price: '281,500원',
				avatars: runningAvatars,
				meta: '192명이 구매',
				buttonLabel: '더 많은 슈퍼딜 보기'
			},
			{
				id: 'rn-select',
				type: 'product',
				column: 'left',
				badge: { kind: 'logo', image: '/interest-home/selecti.png', alt: 'Selecti' },
				image:
					'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
				title: '아디다스 스트랩 무릎 보...',
				discount: '12%',
				price: '19,400원',
				avatars: runningAvatars,
				meta: '331명이 구매',
				chipStyle: 'highlight',
				buttonLabel: '더 많은 셀렉티 보기'
			},
			{
				id: 'rn-shorts',
				type: 'shorts',
				column: 'right',
				badge: { kind: 'text', text: 'Shorts', tone: 'shorts' },
				image:
					'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80',
				title: '레이싱 경기장 달리기, 본노의 질주',
				duration: '00:24',
				avatars: runningAvatars,
				meta: '1,215명이 봄',
				buttonLabel: '더 많은 숏츠 보기'
			},
			{
				id: 'rn-live',
				type: 'live',
				column: 'left',
				badge: {
					kind: 'live',
					image: '/interest-home/live.png',
					alt: 'LIVE',
					suffix: '공구 · 경매'
				},
				image:
					'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
				title: '아디다스 언더웨어 리뷰...',
				discount: '26%',
				price: '52,400원',
				avatars: runningAvatars,
				meta: '391개 구매',
				mediaCaption: '500개 한정\n공동구매',
				buttonLabel: '더 많은 라이브 보기'
			},
			{
				id: 'rn-gallery',
				type: 'gallery',
				column: 'right',
				badge: { kind: 'text', text: '📸 갤러리' },
				image:
					'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=900&q=80',
				title: '오늘도 러닝 완료! 날씨는 아주 좋음!',
				avatars: runningAvatars,
				meta: '4,112명이 봄',
				buttonLabel: '더 많은 사진 보기'
			},
			{
				id: 'rn-following',
				type: 'following',
				column: 'left',
				badge: { kind: 'text', text: '💘 TOP 인플루언서' },
				people: [
					{
						name: '기안84',
						followers: '49,241명',
						image:
							'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '션',
						followers: '12,913명',
						image:
							'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '박보검나웃겨',
						followers: '89,483명',
						image:
							'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '운동 많이된다',
						followers: '1,512명',
						image:
							'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=240&q=80'
					}
				],
				buttonLabel: '더 많은 인플루언서 보기'
			},
			{
				id: 'rn-ranking',
				type: 'ranking',
				column: 'right',
				badge: { kind: 'text', text: '🔥 Hot 키워드' },
				items: [
					{
						rank: 1,
						label: '러닝화',
						views: '2.9K 조회',
						image:
							'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=180&q=80'
					},
					{
						rank: 2,
						label: '선글라스',
						views: '1.1K 조회',
						image:
							'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=180&q=80'
					},
					{
						rank: 3,
						label: '러닝캡',
						views: '0.6K 조회',
						image:
							'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=180&q=80'
					}
				],
				buttonLabel: '더 많은 키워드 보기'
			}
		]
	},
	tech: {
		header: {
			emoji: '🖥️',
			label: '테크',
			interestCount: '25,103명 관심'
		},
		notice: {
			icon: '✦',
			text: '유진님, 요즘',
			highlight: '데스크 셋업템',
			cta: '구경하기'
		},
		palette: techPalette,
		cards: [
			{
				id: 'te-story',
				type: 'story',
				column: 'left',
				badge: { kind: 'text', text: '🏆 인기글' },
				title: '붉은 사막 굴러가는 최소 사양 노트북 추천',
				body: '요즘 핫한 붉은 사막 플레이하시려면 최소 이정도 사양은 갖춰야 합니다. 실제로 돌려본 기준으로 정리했어요...',
				avatars: techAvatars,
				meta: '624,910명이 봄',
				buttonLabel: '더 많은 인기글 보기'
			},
			{
				id: 'te-super',
				type: 'product',
				column: 'right',
				badge: { kind: 'logo', image: '/interest-home/super.png', alt: '슈퍼딜' },
				image:
					'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
				title: 'LG 32G600A 32인치 게...',
				discount: '26%',
				price: '416,200원',
				avatars: techAvatars,
				meta: '463명이 구매',
				buttonLabel: '더 많은 슈퍼딜 보기'
			},
			{
				id: 'te-select',
				type: 'product',
				column: 'left',
				badge: { kind: 'logo', image: '/interest-home/selecti.png', alt: 'Selecti' },
				image:
					'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
				title: '무선 마우스 충전식 마우...',
				discount: '14%',
				price: '25,200원',
				avatars: techAvatars,
				meta: '1,210명이 구매',
				chipStyle: 'highlight',
				buttonLabel: '더 많은 셀렉티 보기'
			},
			{
				id: 'te-shorts',
				type: 'shorts',
				column: 'right',
				badge: { kind: 'text', text: 'Shorts', tone: 'shorts' },
				image:
					'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
				title: '닌텐도 스위치2, 케이스 하나로 분위기 전환',
				duration: '00:31',
				avatars: techAvatars,
				meta: '35,912명이 봄',
				buttonLabel: '더 많은 숏츠 보기'
			},
			{
				id: 'te-live',
				type: 'live',
				column: 'left',
				badge: {
					kind: 'live',
					image: '/interest-home/live.png',
					alt: 'LIVE',
					suffix: '공구 · 경매'
				},
				image:
					'https://images.unsplash.com/photo-1516321310764-8d2e29b0f9f1?auto=format&fit=crop&w=900&q=80',
				title: '[잇섭의 힛IT슈] 최고의 W...',
				discount: '14%',
				price: '466,500원',
				avatars: techAvatars,
				meta: '486개 구매',
				mediaCaption: '500개 한정\n공동구매',
				buttonLabel: '더 많은 라이브 보기'
			},
			{
				id: 'te-gallery',
				type: 'gallery',
				column: 'right',
				badge: { kind: 'text', text: '📸 갤러리' },
				image:
					'https://images.unsplash.com/photo-1616588589676-62b3bd2f190f?auto=format&fit=crop&w=900&q=80',
				title: '내가 직접 꾸민 게이밍룸과 데스크테리어',
				avatars: techAvatars,
				meta: '1,990명이 봄',
				buttonLabel: '더 많은 사진 보기'
			},
			{
				id: 'te-following',
				type: 'following',
				column: 'left',
				badge: { kind: 'text', text: '💘 TOP 인플루언서' },
				people: [
					{
						name: '잇섭',
						followers: '49,241명',
						image:
							'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '귀곰',
						followers: '12,913명',
						image:
							'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '젠슨황',
						followers: '428,948명',
						image:
							'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=80'
					},
					{
						name: '팀쿡',
						followers: '982,151명',
						image:
							'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80'
					}
				],
				buttonLabel: '더 많은 인플루언서 보기'
			},
			{
				id: 'te-ranking',
				type: 'ranking',
				column: 'right',
				badge: { kind: 'text', text: '🔥 Hot 키워드' },
				items: [
					{
						rank: 1,
						label: 'LG그램',
						views: '2.9K 조회',
						image:
							'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=180&q=80'
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
