<script lang="ts">
	import { page } from '$app/state';
	import { Check, ChevronRight, Home, PackageCheck, ShoppingCart, Sparkles } from 'lucide-svelte';

	type RoomSize = 'small' | 'medium' | 'large';
	type Budget = 'starter' | 'balanced' | 'premium';
	type ApplianceStatus = 'none' | 'partial' | 'ready';
	type Experience = 'first' | 'some' | 'pro';

	type Product = {
		id: string;
		name: string;
		category: string;
		group: string;
		price: number;
		image: string;
		tags: string[];
		reason: string;
		baseMatch: number;
		roomBoost?: Partial<Record<RoomSize, number>>;
		budgetBoost?: Partial<Record<Budget, number>>;
		applianceBoost?: Partial<Record<ApplianceStatus, number>>;
		experienceBoost?: Partial<Record<Experience, number>>;
	};

	type MatchedProduct = Product & {
		match: number;
	};

	const interestId = $derived(page.params.interest_id ?? 'living-alone');
	const isTravelThread = $derived(interestId === 'early-adopter-2');
	const isLivingThread = $derived(interestId === 'living-alone');
	const query = $derived(
		page.url.searchParams.get('q') || (isTravelThread ? '스페인 여행 가고 싶어' : '자취 필수템')
	);

	let roomSize = $state<RoomSize>('small');
	let budgetAmount = $state(240000);
	let appliances = $state<ApplianceStatus>('partial');
	let experience = $state<Experience>('first');
	let selectedIds = $state<string[]>([]);
	let cartAdded = $state(false);
	let isGenerating = $state(false);
	let hasGenerated = $state(true);
	let showFilters = $state(false);
	let generatedSignature = $state('');

	const livingProducts: Product[] = [
		{
			id: 'folding-dryer',
			name: '접이식 스테인리스 빨래건조대',
			category: '생활',
			group: '생활 루틴',
			price: 32900,
			image:
				'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=700&q=80',
			tags: ['원룸', '공간절약', '빨래'],
			reason: '좁은 방에서도 접어서 보관하기 쉬워요.',
			baseMatch: 86,
			roomBoost: { small: 7, medium: 4 },
			budgetBoost: { starter: 4, balanced: 5 },
			experienceBoost: { first: 4 }
		},
		{
			id: 'laundry-basket',
			name: '2단 분리형 빨래바구니',
			category: '생활',
			group: '생활 루틴',
			price: 21900,
			image:
				'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=700&q=80',
			tags: ['분리수거', '세탁', '좁은공간'],
			reason: '빨래와 수건을 분리해두기 좋아 생활 루틴이 빨리 잡혀요.',
			baseMatch: 82,
			roomBoost: { small: 5, medium: 4 },
			budgetBoost: { starter: 5, balanced: 4 },
			experienceBoost: { first: 3 }
		},
		{
			id: 'trash-set',
			name: '슬림 분리수거함 3종 세트',
			category: '생활',
			group: '생활 루틴',
			price: 28900,
			image:
				'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80',
			tags: ['분리수거', '슬림형', '생활필수'],
			reason: '좁은 주방 옆에도 세워둘 수 있어 생활 동선이 깔끔해져요.',
			baseMatch: 79,
			roomBoost: { small: 5, medium: 3 },
			budgetBoost: { starter: 4, balanced: 4 },
			experienceBoost: { first: 3 }
		},
		{
			id: 'shower-caddy',
			name: '무타공 욕실 샤워 캐디',
			category: '생활',
			group: '생활 루틴',
			price: 16900,
			image:
				'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
			tags: ['욕실', '무타공', '정리'],
			reason: '월세방 욕실에 구멍을 내지 않고 샴푸와 세면도구를 정리해요.',
			baseMatch: 78,
			roomBoost: { small: 4 },
			budgetBoost: { starter: 5, balanced: 3 },
			experienceBoost: { first: 3, some: 2 }
		},
		{
			id: 'multi-tap',
			name: 'USB-C 고속충전 멀티탭 4구',
			category: '안전',
			group: '전기/안전',
			price: 27900,
			image:
				'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=700&q=80',
			tags: ['필수', '충전', '안전커버'],
			reason: '가전과 디바이스를 같이 쓰는 자취방 기본템이에요.',
			baseMatch: 91,
			budgetBoost: { starter: 3, balanced: 4, premium: 4 },
			experienceBoost: { first: 5, some: 2 }
		},
		{
			id: 'motion-light',
			name: '충전식 모션 센서 무드등',
			category: '안전',
			group: '전기/안전',
			price: 19900,
			image:
				'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=700&q=80',
			tags: ['현관', '야간', '무타공'],
			reason: '밤에 현관과 침대 주변을 안전하게 쓰기 좋아요.',
			baseMatch: 78,
			roomBoost: { small: 3, medium: 3 },
			budgetBoost: { starter: 5, balanced: 3 },
			experienceBoost: { first: 4 }
		},
		{
			id: 'cable-box',
			name: '멀티탭 케이블 정리함',
			category: '안전',
			group: '전기/안전',
			price: 15900,
			image:
				'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=700&q=80',
			tags: ['케이블', '먼지차단', '정리'],
			reason: '전선이 바닥에 엉키지 않아 먼지와 발 걸림을 줄여줘요.',
			baseMatch: 77,
			roomBoost: { small: 4, medium: 3 },
			budgetBoost: { starter: 4, balanced: 4 },
			experienceBoost: { first: 3 }
		},
		{
			id: 'door-lock-cover',
			name: '현관문 보안 커버 세트',
			category: '안전',
			group: '전기/안전',
			price: 12900,
			image:
				'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=700&q=80',
			tags: ['현관', '보안', '첫자취'],
			reason: '첫 자취생이 불안해하는 현관 보안감을 간단히 보완해요.',
			baseMatch: 76,
			budgetBoost: { starter: 5, balanced: 3 },
			experienceBoost: { first: 5 }
		},
		{
			id: 'bedding',
			name: '사계절 차렵이불 침구 세트',
			category: '침구',
			group: '침구',
			price: 59900,
			image:
				'https://images.unsplash.com/photo-1616627561839-074385245ff6?auto=format&fit=crop&w=700&q=80',
			tags: ['침구', '세탁가능', '입주첫날'],
			reason: '입주 첫날 바로 필요한 품목이라 우선순위가 높아요.',
			baseMatch: 88,
			budgetBoost: { balanced: 5, premium: 6 },
			experienceBoost: { first: 6 }
		},
		{
			id: 'pillow-set',
			name: '워셔블 베개 2개 세트',
			category: '침구',
			group: '침구',
			price: 29900,
			image:
				'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=700&q=80',
			tags: ['숙면', '세탁가능', '기본세트'],
			reason: '첫 입주 때 은근히 빠뜨리기 쉬운 침구 보완템이에요.',
			baseMatch: 80,
			budgetBoost: { starter: 3, balanced: 5, premium: 5 },
			experienceBoost: { first: 4 }
		},
		{
			id: 'mattress-pad',
			name: '미끄럼방지 침대 패드',
			category: '침구',
			group: '침구',
			price: 34900,
			image:
				'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80',
			tags: ['침대패드', '세탁가능', '숙면'],
			reason: '매트리스만 있는 방도 바로 깔끔한 잠자리로 바꿔줘요.',
			baseMatch: 81,
			budgetBoost: { balanced: 5, premium: 5 },
			experienceBoost: { first: 4, some: 2 }
		},
		{
			id: 'bed-cover',
			name: '방수 매트리스 커버',
			category: '침구',
			group: '침구',
			price: 23900,
			image:
				'https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=700&q=80',
			tags: ['방수', '위생', '입주'],
			reason: '옵션 매트리스를 쓰는 경우 위생 만족도를 크게 올려줘요.',
			baseMatch: 79,
			budgetBoost: { starter: 4, balanced: 4 },
			experienceBoost: { first: 4 }
		},
		{
			id: 'sleep-lamp',
			name: '침대 옆 미니 수면등',
			category: '침구',
			group: '침구',
			price: 19900,
			image:
				'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=700&q=80',
			tags: ['수면', '무드등', '충전식'],
			reason: '침대에서 불 끄러 일어나지 않아도 돼 첫날부터 편해요.',
			baseMatch: 76,
			roomBoost: { small: 3 },
			budgetBoost: { starter: 3, balanced: 4 },
			experienceBoost: { first: 3 }
		},
		{
			id: 'mini-vacuum',
			name: '초경량 무선 핸디 청소기',
			category: '청소',
			group: '청소',
			price: 46900,
			image:
				'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=700&q=80',
			tags: ['먼지', '머리카락', '무선'],
			reason: '작은 방은 빠르게 자주 치우는 장비가 만족도가 높아요.',
			baseMatch: 83,
			roomBoost: { small: 4, medium: 5 },
			budgetBoost: { balanced: 5, premium: 7 },
			experienceBoost: { first: 3, some: 4 }
		},
		{
			id: 'cleaning-kit',
			name: '돌돌이+밀대 청소 스타터 키트',
			category: '청소',
			group: '청소',
			price: 18900,
			image:
				'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=700&q=80',
			tags: ['먼지', '머리카락', '가성비'],
			reason: '예산을 아끼면서 바닥과 침구 청소를 같이 챙길 수 있어요.',
			baseMatch: 84,
			roomBoost: { small: 5, medium: 4 },
			budgetBoost: { starter: 7, balanced: 4 },
			experienceBoost: { first: 4 }
		},
		{
			id: 'bath-cleaner',
			name: '욕실 곰팡이 클리너 세트',
			category: '청소',
			group: '청소',
			price: 14900,
			image:
				'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=700&q=80',
			tags: ['욕실', '곰팡이', '입주청소'],
			reason: '입주 직후 욕실 컨디션을 빠르게 잡는 데 좋아요.',
			baseMatch: 80,
			budgetBoost: { starter: 5, balanced: 4 },
			experienceBoost: { first: 5, some: 2 }
		},
		{
			id: 'wet-wipes',
			name: '대용량 청소포 6팩',
			category: '청소',
			group: '청소',
			price: 12900,
			image:
				'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=700&q=80',
			tags: ['청소포', '대용량', '가성비'],
			reason: '가구 조립, 바닥 먼지, 주방 얼룩까지 바로 닦기 좋아요.',
			baseMatch: 78,
			roomBoost: { small: 3 },
			budgetBoost: { starter: 6, balanced: 3 },
			experienceBoost: { first: 3 }
		},
		{
			id: 'electric-kettle',
			name: '온도조절 전기포트 1L',
			category: '주방',
			group: '주방',
			price: 38900,
			image:
				'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80',
			tags: ['커피', '컵라면', '주방가전'],
			reason: '기본 가전이 부족할수록 체감 사용 빈도가 높아요.',
			baseMatch: 79,
			applianceBoost: { none: 10, partial: 5 },
			budgetBoost: { starter: 3, balanced: 4 }
		},
		{
			id: 'rice-container',
			name: '밀폐 쌀 보관통 5kg',
			category: '주방',
			group: '주방',
			price: 17900,
			image:
				'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80',
			tags: ['쌀보관', '밀폐', '벌레방지'],
			reason: '작은 주방에서 식재료를 깔끔하게 보관하기 좋아요.',
			baseMatch: 77,
			roomBoost: { small: 3, medium: 3 },
			budgetBoost: { starter: 4, balanced: 4 },
			experienceBoost: { first: 3, some: 3 }
		},
		{
			id: 'dish-set',
			name: '1인 식기 6P 세트',
			category: '주방',
			group: '주방',
			price: 25900,
			image:
				'https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?auto=format&fit=crop&w=700&q=80',
			tags: ['식기', '1인가구', '기본템'],
			reason: '그릇, 컵, 접시를 한 번에 맞춰 첫 식사를 바로 준비해요.',
			baseMatch: 82,
			applianceBoost: { none: 3, partial: 3 },
			budgetBoost: { starter: 4, balanced: 5 },
			experienceBoost: { first: 5 }
		},
		{
			id: 'cutting-board',
			name: '도마+칼 주방 입문 세트',
			category: '주방',
			group: '주방',
			price: 22900,
			image:
				'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=700&q=80',
			tags: ['요리입문', '도마', '칼'],
			reason: '간단한 집밥을 시작할 때 빠지면 바로 불편한 조합이에요.',
			baseMatch: 79,
			applianceBoost: { none: 4, partial: 4 },
			budgetBoost: { starter: 3, balanced: 4 },
			experienceBoost: { first: 4, some: 2 }
		},
		{
			id: 'storage-box',
			name: '침대 밑 수납박스 3개 세트',
			category: '수납',
			group: '수납',
			price: 24900,
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80',
			tags: ['수납', '계절옷', '정리'],
			reason: '원룸 크기가 작을수록 숨은 수납공간이 중요해요.',
			baseMatch: 84,
			roomBoost: { small: 9, medium: 5 },
			budgetBoost: { starter: 4, balanced: 3 },
			experienceBoost: { first: 4, some: 3 }
		},
		{
			id: 'hanger-rack',
			name: '슬림 행거랙 2단',
			category: '수납',
			group: '수납',
			price: 34900,
			image:
				'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=700&q=80',
			tags: ['옷정리', '원룸', '행거'],
			reason: '옷장이 작거나 없는 원룸에서 바로 체감되는 수납템이에요.',
			baseMatch: 81,
			roomBoost: { small: 6, medium: 4 },
			budgetBoost: { balanced: 4, premium: 5 },
			experienceBoost: { first: 3, some: 4 }
		},
		{
			id: 'drawer-divider',
			name: '속옷 양말 서랍 칸막이',
			category: '수납',
			group: '수납',
			price: 11900,
			image:
				'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=80',
			tags: ['서랍정리', '양말', '속옷'],
			reason: '작은 수납장도 칸을 나누면 훨씬 오래 깔끔하게 유지돼요.',
			baseMatch: 77,
			roomBoost: { small: 5, medium: 3 },
			budgetBoost: { starter: 5, balanced: 3 },
			experienceBoost: { first: 3 }
		},
		{
			id: 'door-hook',
			name: '문걸이 후크 6구',
			category: '수납',
			group: '수납',
			price: 9900,
			image:
				'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80',
			tags: ['문걸이', '가방', '무타공'],
			reason: '가방과 외투를 바닥에 두지 않게 해주는 저예산 수납템이에요.',
			baseMatch: 80,
			roomBoost: { small: 6, medium: 3 },
			budgetBoost: { starter: 6, balanced: 3 },
			experienceBoost: { first: 4 }
		},
		{
			id: 'vacuum-bag',
			name: '계절옷 압축팩 8매',
			category: '수납',
			group: '수납',
			price: 13900,
			image:
				'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=700&q=80',
			tags: ['계절옷', '압축', '공간절약'],
			reason: '옷장 공간이 부족한 원룸에서 부피 큰 옷을 줄여줘요.',
			baseMatch: 78,
			roomBoost: { small: 7, medium: 4 },
			budgetBoost: { starter: 5, balanced: 4 },
			experienceBoost: { first: 3, some: 3 }
		},
		{
			id: 'starter-pan',
			name: '1인 주방 논스틱 팬 냄비 세트',
			category: '주방',
			group: '주방',
			price: 52900,
			image:
				'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80',
			tags: ['요리입문', '1인가구', '인덕션'],
			reason: '외식비를 줄이고 싶은 첫 자취생에게 잘 맞아요.',
			baseMatch: 81,
			applianceBoost: { none: 4, partial: 6 },
			budgetBoost: { balanced: 5, premium: 5 },
			experienceBoost: { first: 4 }
		}
	];

	const budget = $derived.by((): Budget => {
		if (isTravelThread) {
			if (budgetAmount <= 1600000) return 'starter';
			if (budgetAmount >= 2300000) return 'premium';
			return 'balanced';
		}

		if (budgetAmount <= 180000) return 'starter';
		if (budgetAmount >= 280000) return 'premium';
		return 'balanced';
	});
	const budgetMin = $derived(isTravelThread ? 1200000 : 120000);
	const budgetMax = $derived(isTravelThread ? 2800000 : 320000);
	const budgetStep = $derived(isTravelThread ? 100000 : 10000);
	const budgetLimit = $derived(budgetAmount);
	const budgetProgress = $derived(((budgetAmount - budgetMin) / (budgetMax - budgetMin)) * 100);
	const filterSignature = $derived(`${roomSize}-${budgetAmount}-${appliances}-${experience}`);

	const travelProducts: Product[] = [
		{
			id: 'mad-flight',
			name: '인천-마드리드 왕복 항공권',
			category: '항공권',
			group: '항공권',
			price: 1180000,
			image:
				'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80',
			tags: ['직항우선', '위탁수하물', '마드리드'],
			reason: '스페인 첫 여행이면 마드리드 인아웃 동선이 가장 안정적이에요.',
			baseMatch: 92,
			budgetBoost: { balanced: 4, premium: 6 },
			experienceBoost: { first: 4 }
		},
		{
			id: 'bcn-flight',
			name: '인천-바르셀로나 왕복 항공권',
			category: '항공권',
			group: '항공권',
			price: 1260000,
			image:
				'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=700&q=80',
			tags: ['바르셀로나', '야간도착', '수하물포함'],
			reason: '가우디 투어 중심 일정이라면 바르셀로나 인아웃이 편해요.',
			baseMatch: 89,
			budgetBoost: { premium: 6, balanced: 3 },
			experienceBoost: { first: 3, some: 4 }
		},
		{
			id: 'openjaw-flight',
			name: '마드리드 IN 바르셀로나 OUT 항공권',
			category: '항공권',
			group: '항공권',
			price: 1340000,
			image:
				'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=700&q=80',
			tags: ['오픈조', '동선절약', '2도시'],
			reason: '도시간 이동을 줄이고 스페인 핵심 도시를 이어 보기 좋아요.',
			baseMatch: 87,
			budgetBoost: { premium: 7 },
			experienceBoost: { some: 4, pro: 5 }
		},
		{
			id: 'gaudi-tour',
			name: '바르셀로나 가우디 반일 투어',
			category: '투어티켓',
			group: '투어티켓',
			price: 89000,
			image:
				'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=700&q=80',
			tags: ['사그라다파밀리아', '한국어가이드', '반일'],
			reason: '처음 가는 스페인 여행에서 만족도가 가장 높은 핵심 투어예요.',
			baseMatch: 94,
			budgetBoost: { starter: 3, balanced: 5, premium: 5 },
			experienceBoost: { first: 6 }
		},
		{
			id: 'prado-ticket',
			name: '프라도 미술관 패스트트랙 티켓',
			category: '투어티켓',
			group: '투어티켓',
			price: 31000,
			image:
				'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=700&q=80',
			tags: ['마드리드', '미술관', '대기줄패스'],
			reason: '마드리드 일정에서 날씨와 상관없이 넣기 좋은 대표 티켓이에요.',
			baseMatch: 85,
			budgetBoost: { starter: 5, balanced: 4 },
			experienceBoost: { first: 3, some: 3 }
		},
		{
			id: 'toledo-tour',
			name: '톨레도 근교 일일 투어',
			category: '투어티켓',
			group: '투어티켓',
			price: 72000,
			image:
				'https://images.unsplash.com/photo-1562624475-96c2bc08fab9?auto=format&fit=crop&w=700&q=80',
			tags: ['근교', '일일투어', '중세도시'],
			reason: '스페인 도시 풍경을 하루 더 깊게 보고 싶을 때 잘 맞아요.',
			baseMatch: 82,
			budgetBoost: { balanced: 4, premium: 5 },
			experienceBoost: { some: 4, pro: 4 }
		},
		{
			id: 'esim',
			name: '스페인 10일 eSIM 데이터',
			category: '여행물품',
			group: '여행물품',
			price: 18900,
			image:
				'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
			tags: ['eSIM', '10일', '데이터'],
			reason: '도착 직후 지도와 교통앱을 바로 쓰려면 가장 먼저 챙겨야 해요.',
			baseMatch: 93,
			budgetBoost: { starter: 5, balanced: 5, premium: 5 },
			experienceBoost: { first: 5, some: 4 }
		},
		{
			id: 'anti-pickpocket-bag',
			name: '도난방지 크로스백',
			category: '여행물품',
			group: '여행물품',
			price: 42900,
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
			tags: ['소매치기방지', '여권', '크로스백'],
			reason: '바르셀로나와 마드리드 시내 이동에서 체감 안전감이 좋아요.',
			baseMatch: 90,
			budgetBoost: { starter: 4, balanced: 5, premium: 5 },
			experienceBoost: { first: 6 }
		},
		{
			id: 'travel-adapter',
			name: '유럽형 멀티 어댑터',
			category: '여행물품',
			group: '여행물품',
			price: 15900,
			image:
				'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=700&q=80',
			tags: ['EU플러그', 'USB-C', '필수템'],
			reason: '숙소마다 콘센트 위치가 달라 멀티포트 어댑터가 편해요.',
			baseMatch: 88,
			budgetBoost: { starter: 5, balanced: 5 },
			experienceBoost: { first: 5, some: 3 }
		}
	];

	const variantImages = [
		'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
		'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80',
		'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=700&q=80',
		'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80',
		'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=80',
		'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80'
	];

	function createVariant(product: Product, index: number): Product {
		const labels = ['가성비형', '프리미엄형'];
		const priceRate = index === 1 ? 0.82 : 1.24;
		const matchOffset = index === 1 ? -3 : -5;

		return {
			...product,
			id: `${product.id}-v${index}`,
			name: `${product.name} ${labels[index - 1]}`,
			price: Math.max(9900, Math.round((product.price * priceRate) / 100) * 100),
			image: variantImages[(product.id.length + index) % variantImages.length],
			tags:
				index === 1
					? [...product.tags.slice(0, 2), '가성비']
					: [...product.tags.slice(0, 2), '업그레이드'],
			reason:
				index === 1
					? '예산을 아끼면서 핵심 기능은 챙기는 대안이에요.'
					: '조금 더 오래 쓰고 싶은 사람에게 맞는 업그레이드 후보예요.',
			baseMatch: Math.max(72, product.baseMatch + matchOffset)
		};
	}

	function ensureMinimumGroupItems(items: Product[]) {
		const groups = new Map<string, Product[]>();

		for (const item of items) {
			const groupItems = groups.get(item.group) ?? [];
			groupItems.push(item);
			groups.set(item.group, groupItems);
		}

		return Array.from(groups.values()).flatMap((groupItems) => {
			const expanded = [...groupItems];
			let variantIndex = 1;

			while (expanded.length < 3) {
				expanded.push(
					createVariant(groupItems[(variantIndex - 1) % groupItems.length], variantIndex)
				);
				variantIndex += 1;
			}

			return expanded;
		});
	}

	const topicProducts: Record<string, Product[]> = {
		running: [
			{
				id: 'run-shoes',
				name: '쿠션 러닝화 데일리 트레이너',
				category: '러닝화',
				group: '러닝화',
				price: 129000,
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
				tags: ['10km', '쿠션', '입문'],
				reason: '10km 준비에는 발 부담을 줄이는 데일리 러닝화가 먼저예요.',
				baseMatch: 94,
				budgetBoost: { balanced: 5, premium: 6 },
				experienceBoost: { first: 5 }
			},
			{
				id: 'run-belt',
				name: '초경량 러닝 벨트',
				category: '보급템',
				group: '보급템',
				price: 24900,
				image:
					'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80',
				tags: ['휴대폰', '젤', '흔들림방지'],
				reason: '휴대폰과 에너지젤을 넣고 뛰어도 흔들림이 적어요.',
				baseMatch: 88,
				budgetBoost: { starter: 5, balanced: 5 },
				experienceBoost: { first: 4, some: 4 }
			},
			{
				id: 'run-recovery',
				name: '종아리 마사지 롤러',
				category: '회복템',
				group: '회복템',
				price: 19900,
				image:
					'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80',
				tags: ['회복', '종아리', '스트레칭'],
				reason: '러닝 후 종아리 뭉침을 풀어 다음 훈련을 이어가기 좋아요.',
				baseMatch: 84,
				budgetBoost: { starter: 5, balanced: 4 },
				experienceBoost: { first: 3, some: 4 }
			}
		],
		'running-crew-2': [
			{
				id: 'diet-meal',
				name: '고단백 도시락 7팩',
				category: '식단',
				group: '식단',
				price: 59900,
				image:
					'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=700&q=80',
				tags: ['고단백', '칼로리관리', '일주일'],
				reason: '초반 식단 실패를 줄이려면 바로 먹을 수 있는 구성이 좋아요.',
				baseMatch: 93,
				budgetBoost: { balanced: 5, premium: 5 },
				experienceBoost: { first: 5 }
			},
			{
				id: 'diet-band',
				name: '홈트 저항밴드 세트',
				category: '운동템',
				group: '운동템',
				price: 22900,
				image:
					'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80',
				tags: ['홈트', '근력', '저항밴드'],
				reason: '공간이 작아도 하체와 코어 운동을 시작하기 쉬워요.',
				baseMatch: 87,
				budgetBoost: { starter: 5, balanced: 4 },
				experienceBoost: { first: 4, some: 4 }
			},
			{
				id: 'diet-snack',
				name: '저당 단백질 간식 박스',
				category: '간식',
				group: '간식',
				price: 32900,
				image:
					'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
				tags: ['저당', '단백질', '야식대체'],
				reason: '식단 중간에 무너지기 쉬운 간식 타이밍을 잡아줘요.',
				baseMatch: 85,
				budgetBoost: { starter: 4, balanced: 5 },
				experienceBoost: { first: 4 }
			}
		],
		'idol-2': [
			{
				id: 'cat-litter',
				name: '먼지 적은 벤토나이트 모래',
				category: '화장실',
				group: '화장실',
				price: 28900,
				image:
					'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80',
				tags: ['모래', '먼지적음', '초보집사'],
				reason: '냥집사 첫 준비는 냄새와 먼지를 줄이는 모래 선택이 중요해요.',
				baseMatch: 93,
				budgetBoost: { starter: 5, balanced: 5 },
				experienceBoost: { first: 6 }
			},
			{
				id: 'cat-feeder',
				name: '자동 급식기 3L',
				category: '급식',
				group: '급식',
				price: 64900,
				image:
					'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=700&q=80',
				tags: ['자동급식', '예약', '외출'],
				reason: '출근이나 외출이 잦아도 급식 루틴을 안정적으로 만들어요.',
				baseMatch: 87,
				budgetBoost: { balanced: 5, premium: 6 },
				experienceBoost: { first: 4, some: 4 }
			},
			{
				id: 'cat-toy',
				name: '낚싯대 장난감 5종',
				category: '장난감',
				group: '장난감',
				price: 15900,
				image:
					'https://images.unsplash.com/photo-1547955922-26be0c1600c4?auto=format&fit=crop&w=700&q=80',
				tags: ['사냥놀이', '낚싯대', '활동량'],
				reason: '실내묘 스트레스를 줄이고 집사와 교감하기 좋아요.',
				baseMatch: 84,
				budgetBoost: { starter: 5, balanced: 4 },
				experienceBoost: { first: 5 }
			}
		],
		'beauty-2': [
			{
				id: 'dog-harness',
				name: '가슴줄 하네스 산책 세트',
				category: '산책템',
				group: '산책템',
				price: 39900,
				image:
					'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80',
				tags: ['하네스', '리드줄', '산책'],
				reason: '목 부담을 줄이고 첫 산책 루틴을 안전하게 시작해요.',
				baseMatch: 94,
				budgetBoost: { starter: 4, balanced: 5 },
				experienceBoost: { first: 6 }
			},
			{
				id: 'dog-treat',
				name: '저알러지 트레이닝 간식',
				category: '간식',
				group: '간식',
				price: 17900,
				image:
					'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=700&q=80',
				tags: ['훈련', '저알러지', '소형견'],
				reason: '산책 훈련과 기다려 교육을 시작하기 좋은 보상 간식이에요.',
				baseMatch: 88,
				budgetBoost: { starter: 5, balanced: 4 },
				experienceBoost: { first: 4, some: 4 }
			},
			{
				id: 'dog-care',
				name: '발 세정 티슈+브러쉬 세트',
				category: '케어템',
				group: '케어템',
				price: 21900,
				image:
					'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=700&q=80',
				tags: ['발세정', '브러쉬', '매일케어'],
				reason: '산책 후 발과 털 관리까지 한 번에 챙길 수 있어요.',
				baseMatch: 85,
				budgetBoost: { starter: 4, balanced: 5 },
				experienceBoost: { first: 4 }
			}
		],
		whiskey: [
			{
				id: 'whiskey-bottle',
				name: '입문 싱글몰트 위스키',
				category: '위스키',
				group: '위스키',
				price: 89000,
				image:
					'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=700&q=80',
				tags: ['입문', '싱글몰트', '선물'],
				reason: '향과 단맛 균형이 좋아 첫 병으로 실패 확률이 낮아요.',
				baseMatch: 93,
				budgetBoost: { balanced: 5, premium: 5 },
				experienceBoost: { first: 5 }
			},
			{
				id: 'whiskey-glass',
				name: '글렌캐런 테이스팅 글라스 2P',
				category: '글라스',
				group: '글라스',
				price: 24900,
				image:
					'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=700&q=80',
				tags: ['글라스', '향', '테이스팅'],
				reason: '향을 모아줘 같은 위스키도 더 선명하게 느껴져요.',
				baseMatch: 88,
				budgetBoost: { starter: 5, balanced: 4 },
				experienceBoost: { first: 4, some: 4 }
			},
			{
				id: 'whiskey-snack',
				name: '치즈&견과 페어링 세트',
				category: '안주',
				group: '안주',
				price: 31900,
				image:
					'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=700&q=80',
				tags: ['페어링', '치즈', '홈바'],
				reason: '홈바 분위기를 빠르게 만들어주는 기본 페어링 구성이에요.',
				baseMatch: 84,
				budgetBoost: { starter: 4, balanced: 5 },
				experienceBoost: { first: 3 }
			}
		],
		'home-cafe': [
			{
				id: 'baking-pan',
				name: '머핀팬+파운드틀 세트',
				category: '도구',
				group: '도구',
				price: 28900,
				image:
					'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=700&q=80',
				tags: ['오븐틀', '입문', '머핀'],
				reason: '처음 만들기 쉬운 머핀과 파운드 케이크를 모두 커버해요.',
				baseMatch: 92,
				budgetBoost: { starter: 5, balanced: 5 },
				experienceBoost: { first: 5 }
			},
			{
				id: 'baking-kit',
				name: '쿠키 믹스 재료 박스',
				category: '재료',
				group: '재료',
				price: 24900,
				image:
					'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=700&q=80',
				tags: ['쿠키', '재료', '실패적음'],
				reason: '계량 부담을 줄여 첫 홈베이킹 성공률을 올려줘요.',
				baseMatch: 89,
				budgetBoost: { starter: 5, balanced: 4 },
				experienceBoost: { first: 6 }
			},
			{
				id: 'baking-wrap',
				name: '베이커리 포장 스티커 세트',
				category: '포장',
				group: '포장',
				price: 12900,
				image:
					'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
				tags: ['선물', '포장', '스티커'],
				reason: '완성한 쿠키나 빵을 선물하기 좋게 마무리해요.',
				baseMatch: 82,
				budgetBoost: { starter: 5, balanced: 4 },
				experienceBoost: { first: 3 }
			}
		],
		fashion: [
			{
				id: 'daily-jacket',
				name: '라이트 오버핏 자켓',
				category: '아우터',
				group: '아우터',
				price: 79000,
				image:
					'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80',
				tags: ['봄', '아우터', '데일리'],
				reason: '티셔츠와 셔츠 위에 모두 걸치기 좋아 활용도가 높아요.',
				baseMatch: 92,
				budgetBoost: { balanced: 5, premium: 5 },
				experienceBoost: { first: 3, some: 4 }
			},
			{
				id: 'daily-shoes',
				name: '화이트 데일리 스니커즈',
				category: '신발',
				group: '신발',
				price: 69000,
				image:
					'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80',
				tags: ['스니커즈', '화이트', '데일리'],
				reason: '팬츠와 스커트 모두에 맞아 코디 고민을 줄여줘요.',
				baseMatch: 88,
				budgetBoost: { starter: 4, balanced: 5 },
				experienceBoost: { first: 4 }
			},
			{
				id: 'daily-point',
				name: '실버 미니백 포인트템',
				category: '포인트템',
				group: '포인트템',
				price: 45900,
				image:
					'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
				tags: ['미니백', '포인트', '실버'],
				reason: '기본 코디에 하나만 더해도 스타일이 살아나요.',
				baseMatch: 83,
				budgetBoost: { starter: 4, balanced: 5 },
				experienceBoost: { some: 4, pro: 4 }
			}
		],
		swimming: [
			{
				id: 'swim-goggles',
				name: '안티포그 미러 수경',
				category: '수경',
				group: '수경',
				price: 32900,
				image:
					'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=700&q=80',
				tags: ['안티포그', '실내수영', '입문'],
				reason: '김서림을 줄여 수업 중 시야 확보가 편해요.',
				baseMatch: 93,
				budgetBoost: { starter: 5, balanced: 5 },
				experienceBoost: { first: 5 }
			},
			{
				id: 'swim-suit',
				name: '베이직 실내 수영복',
				category: '수영복',
				group: '수영복',
				price: 59000,
				image:
					'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=700&q=80',
				tags: ['실내', '베이직', '강습'],
				reason: '강습용으로 부담 없이 입기 좋은 기본 수영복이에요.',
				baseMatch: 89,
				budgetBoost: { balanced: 5, premium: 5 },
				experienceBoost: { first: 4 }
			},
			{
				id: 'swim-bag',
				name: '방수 파우치 샤워백',
				category: '방수템',
				group: '방수템',
				price: 18900,
				image:
					'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=700&q=80',
				tags: ['방수', '샤워백', '수납'],
				reason: '젖은 수영복과 샤워용품을 분리해 들고 다니기 좋아요.',
				baseMatch: 85,
				budgetBoost: { starter: 5, balanced: 4 },
				experienceBoost: { first: 4, some: 3 }
			}
		],
		gaming: [
			{
				id: 'game-keyboard',
				name: '텐키리스 게이밍 키보드',
				category: '키보드',
				group: '키보드',
				price: 89000,
				image:
					'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=80',
				tags: ['텐키리스', 'RGB', 'FPS'],
				reason: '마우스 공간을 넓게 쓰기 좋아 입문 게이밍 셋업에 잘 맞아요.',
				baseMatch: 92,
				budgetBoost: { balanced: 5, premium: 5 },
				experienceBoost: { first: 4, some: 4 }
			},
			{
				id: 'game-headset',
				name: '7.1채널 무선 게이밍 헤드셋',
				category: '헤드셋',
				group: '헤드셋',
				price: 109000,
				image:
					'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=80',
				tags: ['무선', '마이크', '공간감'],
				reason: '보이스 채팅과 위치 사운드를 한 번에 챙길 수 있어요.',
				baseMatch: 90,
				budgetBoost: { balanced: 4, premium: 6 },
				experienceBoost: { first: 4 }
			},
			{
				id: 'game-deskmat',
				name: '초대형 장패드+마우스 번들',
				category: '책상셋업',
				group: '책상셋업',
				price: 39900,
				image:
					'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=700&q=80',
				tags: ['장패드', '마우스', '셋업'],
				reason: '책상 위 움직임을 안정적으로 만들어 플레이 감각이 좋아져요.',
				baseMatch: 86,
				budgetBoost: { starter: 5, balanced: 5 },
				experienceBoost: { first: 3, some: 4 }
			}
		]
	};

	const products = $derived.by((): Product[] =>
		ensureMinimumGroupItems(
			isTravelThread ? travelProducts : (topicProducts[interestId] ?? livingProducts)
		)
	);

	const recommendedProducts = $derived.by((): MatchedProduct[] =>
		products
			.map((product) => ({
				...product,
				match: Math.min(
					99,
					product.baseMatch +
						(product.roomBoost?.[roomSize] ?? 0) +
						(product.budgetBoost?.[budget] ?? 0) +
						(product.applianceBoost?.[appliances] ?? 0) +
						(product.experienceBoost?.[experience] ?? 0)
				)
			}))
			.sort((a, b) => b.match - a.match)
	);

	const selectedProducts = $derived.by(() =>
		recommendedProducts.filter((product) => selectedIds.includes(product.id))
	);
	const totalPrice = $derived(selectedProducts.reduce((sum, product) => sum + product.price, 0));

	const groupCandidateCounts: Record<string, number> = {
		'생활 루틴': 4,
		'전기/안전': 3,
		침구: 5,
		청소: 4,
		주방: 3,
		수납: 5,
		항공권: 3,
		투어티켓: 3,
		여행물품: 3,
		러닝화: 3,
		보급템: 3,
		회복템: 3,
		식단: 3,
		운동템: 3,
		간식: 3,
		화장실: 3,
		급식: 3,
		장난감: 3,
		산책템: 3,
		케어템: 3,
		위스키: 3,
		글라스: 3,
		안주: 3,
		도구: 3,
		재료: 3,
		포장: 3,
		아우터: 3,
		신발: 3,
		포인트템: 3,
		수경: 3,
		수영복: 3,
		방수템: 3,
		키보드: 3,
		헤드셋: 3,
		책상셋업: 3
	};

	const recommendedGroups = $derived.by(() => {
		const groups = new Map<string, typeof recommendedProducts>();

		for (const product of recommendedProducts) {
			if (appliances === 'ready' && ['electric-kettle', 'starter-pan'].includes(product.id)) {
				continue;
			}

			const groupItems = groups.get(product.group) ?? [];
			groupItems.push(product);
			groups.set(product.group, groupItems);
		}

		return Array.from(groups.entries())
			.map(([name, items]) => ({
				name,
				items: items.sort((a, b) => b.match - a.match).slice(0, groupCandidateCounts[name] ?? 3)
			}))
			.sort((a, b) => b.items[0].match - a.items[0].match)
			.slice(0, budget === 'starter' ? 5 : 6);
	});

	const activeFilterLabels = $derived.by(() => ({
		room: isTravelThread
			? roomSize === 'small'
				? '5-7일'
				: roomSize === 'medium'
					? '8-10일'
					: '11일 이상'
			: !isLivingThread
				? roomSize === 'small'
					? '입문'
					: roomSize === 'medium'
						? '데일리'
						: '진심'
				: roomSize === 'small'
					? '5-7평'
					: roomSize === 'medium'
						? '8-10평'
						: '11평 이상',
		appliances:
			appliances === 'none'
				? isTravelThread
					? '항공권부터'
					: !isLivingThread
						? '핵심만'
						: '가전 거의 없음'
				: appliances === 'partial'
					? isTravelThread
						? '투어까지'
						: !isLivingThread
							? '추천까지'
							: '가전 일부 있음'
					: isTravelThread
						? '준비물까지'
						: !isLivingThread
							? '풀세트'
							: '가전 있음',
		experience: isTravelThread
			? experience === 'first'
				? '첫 유럽여행'
				: experience === 'some'
					? '해외여행 경험'
					: '여행 익숙함'
			: !isLivingThread
				? experience === 'first'
					? '입문'
					: experience === 'some'
						? '경험 있음'
						: '익숙함'
				: experience === 'first'
					? '첫 자취'
					: experience === 'some'
						? '경험 있음'
						: '익숙함'
	}));

	function getDefaultSelection() {
		return recommendedGroups
			.map((group) => group.items[0])
			.filter((product) => product.match >= (budget === 'starter' ? 88 : 86))
			.map((product) => product.id);
	}

	function recommendProducts() {
		cartAdded = false;
		hasGenerated = false;
		showFilters = false;
		isGenerating = true;

		setTimeout(() => {
			selectedIds = getDefaultSelection();
			generatedSignature = filterSignature;
			isGenerating = false;
			hasGenerated = true;
		}, 900);
	}

	function editFilters() {
		showFilters = true;
		hasGenerated = false;
		isGenerating = false;
		cartAdded = false;
	}

	$effect(() => {
		if (isTravelThread && budgetAmount < budgetMin) {
			budgetAmount = 1800000;
			return;
		}

		if (!isTravelThread && budgetAmount > budgetMax) {
			budgetAmount = 240000;
			return;
		}

		if (hasGenerated && generatedSignature !== filterSignature) {
			selectedIds = getDefaultSelection();
			generatedSignature = filterSignature;
		}
	});

	function formatPrice(price: number) {
		return `${price.toLocaleString('ko-KR')}원`;
	}

	function toggleProduct(productId: string) {
		cartAdded = false;
		selectedIds = selectedIds.includes(productId)
			? selectedIds.filter((id) => id !== productId)
			: [...selectedIds, productId];
	}

	function addBundleToCart() {
		if (!selectedIds.length) return;
		cartAdded = true;
	}
</script>

<svelte:head>
	<title>딱! 쇼핑스레드</title>
</svelte:head>

<section class="shopping-thread">
	<div class="thread-hero">
		<div>
			<span class="thread-hero__eyebrow"><Sparkles size={15} fill="currentColor" /> AI 추천</span>
			<p>
				{#if isTravelThread}
					<strong>{query}</strong>에 맞춰 항공권, 투어티켓, 여행물품을 먼저 묶어봤어요.
				{:else}
					기본 조건으로 <strong>{query}</strong> 상품을 먼저 묶어봤어요. 필요하면 조건을 바꿔보세요.
				{/if}
			</p>
		</div>
	</div>

	{#if showFilters && !isGenerating}
		<div
			class="thread-form"
			aria-label={isTravelThread
				? '스페인 여행 추천 조건'
				: isLivingThread
					? '자취 필수템 추천 조건'
					: '딱 스레드 추천 조건'}
		>
			<div class="thread-form__group">
				<label for="room-size"
					><Home size={16} />
					{isTravelThread ? '여행 기간' : isLivingThread ? '원룸 크기' : '목표'}</label
				>
				<select id="room-size" bind:value={roomSize}>
					<option value="small"
						>{isTravelThread ? '5-7일' : isLivingThread ? '5-7평' : '입문'}</option
					>
					<option value="medium"
						>{isTravelThread ? '8-10일' : isLivingThread ? '8-10평' : '데일리'}</option
					>
					<option value="large"
						>{isTravelThread ? '11일 이상' : isLivingThread ? '11평 이상' : '진심'}</option
					>
				</select>
			</div>
			<div class="thread-form__group">
				<div class="thread-form__label-row">
					<label for="budget">예산</label>
					<strong>{formatPrice(budgetAmount)}</strong>
				</div>
				<input
					id="budget"
					type="range"
					min={budgetMin}
					max={budgetMax}
					step={budgetStep}
					bind:value={budgetAmount}
					style={`--budget-progress: ${budgetProgress}%`}
				/>
				<div class="thread-form__range-labels">
					<span>{isTravelThread ? '120만원' : '12만원'}</span>
					<span>{isTravelThread ? '280만원' : '32만원'}</span>
				</div>
			</div>
			<div class="thread-form__group">
				<label for="appliances"
					>{isTravelThread ? '예약 범위' : isLivingThread ? '기본 가전' : '구성 범위'}</label
				>
				<select id="appliances" bind:value={appliances}>
					<option value="none"
						>{isTravelThread ? '항공권부터' : isLivingThread ? '거의 없음' : '핵심만'}</option
					>
					<option value="partial"
						>{isTravelThread ? '투어까지' : isLivingThread ? '일부 있음' : '추천까지'}</option
					>
					<option value="ready"
						>{isTravelThread ? '준비물까지' : isLivingThread ? '대부분 있음' : '풀세트'}</option
					>
				</select>
			</div>
			<div class="thread-form__group">
				<label for="experience"
					>{isTravelThread ? '여행 경험' : isLivingThread ? '자취 경험' : '경험'}</label
				>
				<select id="experience" bind:value={experience}>
					<option value="first"
						>{isTravelThread ? '첫 유럽여행' : isLivingThread ? '첫 자취' : '입문'}</option
					>
					<option value="some">경험 있음</option>
					<option value="pro">{isTravelThread ? '여행 익숙함' : '익숙함'}</option>
				</select>
			</div>
		</div>

		<button
			type="button"
			class:recommend-button--loading={isGenerating}
			class="recommend-button"
			disabled={isGenerating}
			onclick={recommendProducts}
		>
			<Sparkles size={18} fill="currentColor" />
			{isGenerating ? 'AI가 구성 중...' : '추천받기'}
		</button>
	{:else if hasGenerated}
		<div class="filter-recap">
			<div>
				<span>{activeFilterLabels.room}</span>
				<span>{formatPrice(budgetAmount)}</span>
				<span>{activeFilterLabels.appliances}</span>
				<span>{activeFilterLabels.experience}</span>
			</div>
			<button type="button" onclick={editFilters}>조건 수정</button>
		</div>
	{/if}

	{#if isGenerating}
		<div class="generating-panel">
			<div class="generating-panel__spark"><Sparkles size={22} fill="currentColor" /></div>
			<strong>AI가 비슷한 상품을 묶는 중</strong>
			<span>가격, 목표, 경험을 기준으로 조합하고 있어요.</span>
		</div>
	{/if}

	{#if hasGenerated}
		<div class="thread-summary">
			<div>
				<strong>{selectedProducts.length}개 상품 구성</strong>
				<span
					>예산 {formatPrice(budgetLimit)} 안에서 {isTravelThread
						? '예약과 여행물품을'
						: isLivingThread
							? '카테고리별 대표 상품을'
							: '관심사별 대표 아이템을'} 골랐어요.</span
				>
			</div>
			<div class="thread-summary__price">
				<span>{formatPrice(totalPrice)}</span>
				<small>{totalPrice <= budgetLimit ? '예산 안쪽' : '예산 초과'}</small>
			</div>
		</div>

		<div class="product-groups">
			{#each recommendedGroups as group}
				<section class="product-section">
					<div class="product-section__header">
						<h2>{group.name}</h2>
						<span>{group.items.length}개 후보</span>
					</div>
					<div class="product-row">
						{#each group.items as product}
							{@const selected = selectedIds.includes(product.id)}
							<article class:product-card--selected={selected} class="product-card">
								<button
									type="button"
									class="product-card__select"
									aria-label={`${product.name} 선택`}
									onclick={() => toggleProduct(product.id)}
								>
									{#if selected}<Check size={16} />{/if}
								</button>
								<img src={product.image} alt={product.name} />
								<div class="product-card__body">
									<div class="product-card__topline">
										<span>{product.category}</span>
										<strong>{product.match}% Match</strong>
									</div>
									<h2>{product.name}</h2>
									<p>{product.reason}</p>
									<div class="product-card__tags">
										{#each product.tags as tag}
											<span>{tag}</span>
										{/each}
									</div>
									<div class="product-card__bottom">
										<strong>{formatPrice(product.price)}</strong>
										<button type="button" onclick={() => toggleProduct(product.id)}>
											{selected ? '담김' : '추가'}
											<ChevronRight size={15} />
										</button>
									</div>
								</div>
							</article>
						{/each}
					</div>
				</section>
			{/each}
		</div>

		<div class="cart-bar">
			<div>
				<span>{selectedProducts.length}개 선택</span>
				<strong>{formatPrice(totalPrice)}</strong>
			</div>
			<button type="button" onclick={addBundleToCart}>
				{#if cartAdded}
					<PackageCheck size={18} /> 장바구니 담김
				{:else}
					<ShoppingCart size={18} /> 묶음으로 담기
				{/if}
			</button>
		</div>
	{/if}
</section>

<style>
	:global(body) {
		background: #f4f4f8;
	}

	.shopping-thread {
		display: flex;
		flex-direction: column;
		gap: 0.95rem;
		padding: 0.15rem 1rem calc(7.6rem + env(safe-area-inset-bottom));
		color: #111827;
	}

	.thread-hero {
		display: block;
		border-radius: 1rem;
		background: #ffffff;
		padding: 0.68rem 0.72rem;
		box-shadow: 0 8px 18px rgba(47, 67, 118, 0.08);
	}

	.thread-hero__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.26rem;
		color: #4f46e5;
		font-size: 0.68rem;
		font-weight: 800;
	}

	.thread-hero__eyebrow :global(svg) {
		width: 0.76rem;
		height: 0.76rem;
	}

	.thread-hero p {
		margin: 0.28rem 0 0;
		color: #667085;
		font-size: 0.72rem;
		line-height: 1.32;
		word-break: keep-all;
	}

	.thread-hero p strong {
		color: #111827;
		font-weight: 900;
	}

	.thread-form {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.66rem;
	}

	.thread-form__group {
		display: flex;
		flex-direction: column;
		gap: 0.42rem;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.9);
		padding: 0.78rem;
		box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.14);
	}

	.thread-form__group label {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: #475467;
		font-size: 0.76rem;
		font-weight: 800;
	}

	.thread-form__label-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.45rem;
	}

	.thread-form__label-row strong {
		color: #111827;
		font-size: 0.82rem;
		font-weight: 900;
		white-space: nowrap;
	}

	.thread-form__group select {
		width: 100%;
		border: none;
		outline: none;
		background: transparent;
		color: #111827;
		font-family: 'Pretendard', sans-serif;
		font-size: 0.95rem;
		font-weight: 900;
		letter-spacing: 0;
	}

	.thread-form__group input[type='range'] {
		width: 100%;
		height: 0.44rem;
		margin: 0.18rem 0 0;
		border-radius: 999px;
		outline: none;
		background: linear-gradient(
			90deg,
			#4f46e5 0%,
			#4f46e5 var(--budget-progress),
			#e5e7eb var(--budget-progress),
			#e5e7eb 100%
		);
		appearance: none;
	}

	.thread-form__group input[type='range']::-webkit-slider-thumb {
		width: 1.24rem;
		height: 1.24rem;
		border: 3px solid #ffffff;
		border-radius: 999px;
		background: #4f46e5;
		box-shadow: 0 4px 10px rgba(79, 70, 229, 0.28);
		appearance: none;
	}

	.thread-form__group input[type='range']::-moz-range-thumb {
		width: 1.02rem;
		height: 1.02rem;
		border: 3px solid #ffffff;
		border-radius: 999px;
		background: #4f46e5;
		box-shadow: 0 4px 10px rgba(79, 70, 229, 0.28);
	}

	.thread-form__range-labels {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #98a2b3;
		font-size: 0.62rem;
		font-weight: 800;
	}

	.recommend-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		width: 100%;
		min-height: 3.2rem;
		border: none;
		border-radius: 1rem;
		background: #111827;
		color: #ffffff;
		font-family: 'Pretendard', sans-serif;
		font-size: 0.98rem;
		font-weight: 900;
		letter-spacing: 0;
		box-shadow: 0 14px 26px rgba(17, 24, 39, 0.18);
	}

	.recommend-button--loading {
		background: #4f46e5;
	}

	.filter-recap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.7rem;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.92);
		padding: 0.72rem;
		box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.14);
	}

	.filter-recap div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.32rem;
		min-width: 0;
	}

	.filter-recap span {
		border-radius: 999px;
		background: #f2f4f7;
		padding: 0.26rem 0.46rem;
		color: #475467;
		font-size: 0.68rem;
		font-weight: 800;
	}

	.filter-recap button {
		flex-shrink: 0;
		border: none;
		border-radius: 999px;
		background: #111827;
		padding: 0.48rem 0.7rem;
		color: #ffffff;
		font-family: 'Pretendard', sans-serif;
		font-size: 0.72rem;
		font-weight: 900;
	}

	.generating-panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.38rem;
		border-radius: 1.1rem;
		background: #f5f3ff;
		padding: 1.1rem;
		text-align: center;
		color: #4f46e5;
		box-shadow: inset 0 0 0 1px rgba(79, 70, 229, 0.1);
	}

	.generating-panel__spark {
		display: grid;
		width: 2.6rem;
		height: 2.6rem;
		place-items: center;
		border-radius: 999px;
		background: #ffffff;
		animation: pulse-generate 900ms ease-in-out infinite alternate;
	}

	.generating-panel strong {
		color: #312e81;
		font-size: 0.98rem;
		font-weight: 900;
	}

	.generating-panel span {
		color: #6d64d8;
		font-size: 0.76rem;
		font-weight: 700;
	}

	.thread-summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		border-radius: 1.1rem;
		background: #edf8f1;
		padding: 0.9rem;
		box-shadow: inset 0 0 0 1px rgba(32, 171, 105, 0.14);
	}

	.thread-summary div:first-child {
		display: flex;
		min-width: 0;
		flex-direction: column;
		gap: 0.25rem;
	}

	.thread-summary strong {
		font-size: 0.92rem;
		font-weight: 900;
	}

	.thread-summary span {
		color: #4a6656;
		font-size: 0.76rem;
		line-height: 1.3;
	}

	.thread-summary__price {
		flex-shrink: 0;
		text-align: right;
	}

	.thread-summary__price span {
		display: block;
		color: #0d7a45;
		font-size: 1rem;
		font-weight: 900;
	}

	.thread-summary__price small {
		color: #148454;
		font-size: 0.72rem;
		font-weight: 800;
	}

	.product-groups {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.product-section {
		display: flex;
		flex-direction: column;
		gap: 0.58rem;
	}

	.product-section__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.1rem;
	}

	.product-section__header h2 {
		margin: 0;
		color: #111827;
		font-size: 0.98rem;
		font-weight: 900;
		letter-spacing: 0;
	}

	.product-section__header span {
		color: #667085;
		font-size: 0.72rem;
		font-weight: 800;
	}

	.product-row {
		display: flex;
		gap: 0.74rem;
		overflow-x: auto;
		margin: 0 -1rem 0 0;
		padding: 0 1rem 0.25rem 0;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
	}

	.product-row::-webkit-scrollbar {
		display: none;
	}

	.product-card {
		position: relative;
		flex: 0 0 10.95rem;
		display: flex;
		flex-direction: column;
		border-radius: 1.15rem;
		background: rgba(255, 255, 255, 0.94);
		padding: 0.72rem;
		box-shadow: 0 10px 22px rgba(34, 42, 72, 0.08);
		scroll-snap-align: start;
	}

	.product-card--selected {
		box-shadow:
			inset 0 0 0 2px #4f46e5,
			0 12px 26px rgba(79, 70, 229, 0.13);
	}

	.product-card__select {
		position: absolute;
		top: 0.58rem;
		left: 0.58rem;
		z-index: 1;
		display: grid;
		width: 1.7rem;
		height: 1.7rem;
		place-items: center;
		border: 2px solid rgba(255, 255, 255, 0.95);
		border-radius: 999px;
		background: rgba(17, 24, 39, 0.45);
		color: #ffffff;
	}

	.product-card--selected .product-card__select {
		background: #4f46e5;
	}

	.product-card img {
		width: 100%;
		aspect-ratio: 1.04;
		border-radius: 0.86rem;
		object-fit: cover;
		background: #eef2f7;
	}

	.product-card__body {
		display: flex;
		min-width: 0;
		flex: 1;
		flex-direction: column;
		padding-top: 0.68rem;
	}

	.product-card__topline,
	.product-card__bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.45rem;
	}

	.product-card__topline span {
		color: #667085;
		font-size: 0.66rem;
		font-weight: 800;
	}

	.product-card__topline strong {
		color: #4f46e5;
		font-size: 0.7rem;
		font-weight: 900;
	}

	.product-card h2 {
		margin: 0.38rem 0 0;
		color: #111827;
		font-size: 0.82rem;
		line-height: 1.25;
		font-weight: 900;
		word-break: keep-all;
	}

	.product-card p {
		margin: 0.35rem 0 0;
		color: #667085;
		font-size: 0.68rem;
		line-height: 1.35;
		word-break: keep-all;
	}

	.product-card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-top: 0.55rem;
	}

	.product-card__tags span {
		border-radius: 999px;
		background: #f2f4f7;
		padding: 0.22rem 0.44rem;
		color: #475467;
		font-size: 0.62rem;
		font-weight: 700;
	}

	.product-card__bottom {
		margin-top: auto;
		padding-top: 0.62rem;
	}

	.product-card__bottom > strong {
		font-size: 0.86rem;
		font-weight: 900;
	}

	.product-card__bottom button,
	.cart-bar button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.18rem;
		border: none;
		border-radius: 999px;
		background: #111827;
		color: #ffffff;
		font-family: 'Pretendard', sans-serif;
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0;
	}

	.product-card__bottom button {
		min-width: 3.7rem;
		min-height: 1.84rem;
		padding: 0 0.46rem;
	}

	.cart-bar {
		position: fixed;
		right: max(1rem, calc((100vw - 28rem) / 2 + 1rem));
		bottom: calc(4.7rem + env(safe-area-inset-bottom));
		left: max(1rem, calc((100vw - 28rem) / 2 + 1rem));
		z-index: 45;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		max-width: calc(28rem - 2rem);
		margin: 0 auto;
		border-radius: 1.15rem;
		background: rgba(17, 24, 39, 0.96);
		padding: 0.78rem 0.82rem;
		color: #ffffff;
		box-shadow: 0 18px 34px rgba(17, 24, 39, 0.24);
		backdrop-filter: blur(14px);
	}

	.cart-bar div {
		display: flex;
		min-width: 0;
		flex-direction: column;
		gap: 0.12rem;
	}

	.cart-bar span {
		color: #cbd5e1;
		font-size: 0.72rem;
		font-weight: 800;
	}

	.cart-bar strong {
		font-size: 1rem;
		font-weight: 900;
	}

	.cart-bar button {
		min-height: 2.8rem;
		padding: 0 0.95rem;
		background: #ffffff;
		color: #111827;
		font-size: 0.84rem;
	}

	@keyframes pulse-generate {
		from {
			transform: scale(0.94);
			box-shadow: 0 0 0 rgba(79, 70, 229, 0);
		}

		to {
			transform: scale(1);
			box-shadow: 0 0 20px rgba(79, 70, 229, 0.22);
		}
	}

	@media (max-width: 390px) {
		.shopping-thread {
			padding-inline: 0.88rem;
		}

		.thread-form {
			gap: 0.54rem;
		}

		.product-row {
			margin: 0 -0.88rem 0 0;
			padding-right: 0.88rem;
			padding-left: 0;
		}
	}
</style>
