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

	const query = $derived(page.url.searchParams.get('q') || '자취 필수템');

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

	const products: Product[] = [
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
		if (budgetAmount <= 180000) return 'starter';
		if (budgetAmount >= 280000) return 'premium';
		return 'balanced';
	});
	const budgetLimit = $derived(budgetAmount);
	const budgetProgress = $derived(((budgetAmount - 120000) / 200000) * 100);
	const filterSignature = $derived(`${roomSize}-${budgetAmount}-${appliances}-${experience}`);

	const recommendedProducts = $derived.by(() =>
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
		수납: 5
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
		room: roomSize === 'small' ? '5-7평' : roomSize === 'medium' ? '8-10평' : '11평 이상',
		appliances:
			appliances === 'none'
				? '가전 거의 없음'
				: appliances === 'partial'
					? '가전 일부 있음'
					: '가전 있음',
		experience: experience === 'first' ? '첫 자취' : experience === 'some' ? '경험 있음' : '익숙함'
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
				기본 조건으로 <strong>{query}</strong> 상품을 먼저 묶어봤어요. 필요하면 조건을 바꿔보세요.
			</p>
		</div>
	</div>

	{#if showFilters && !isGenerating}
		<div class="thread-form" aria-label="자취 필수템 추천 조건">
			<div class="thread-form__group">
				<label for="room-size"><Home size={16} /> 원룸 크기</label>
				<select id="room-size" bind:value={roomSize}>
					<option value="small">5-7평</option>
					<option value="medium">8-10평</option>
					<option value="large">11평 이상</option>
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
					min="120000"
					max="320000"
					step="10000"
					bind:value={budgetAmount}
					style={`--budget-progress: ${budgetProgress}%`}
				/>
				<div class="thread-form__range-labels">
					<span>12만원</span>
					<span>32만원</span>
				</div>
			</div>
			<div class="thread-form__group">
				<label for="appliances">기본 가전</label>
				<select id="appliances" bind:value={appliances}>
					<option value="none">거의 없음</option>
					<option value="partial">일부 있음</option>
					<option value="ready">대부분 있음</option>
				</select>
			</div>
			<div class="thread-form__group">
				<label for="experience">자취 경험</label>
				<select id="experience" bind:value={experience}>
					<option value="first">첫 자취</option>
					<option value="some">경험 있음</option>
					<option value="pro">익숙함</option>
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
			<span>가격, 공간, 자취 경험을 기준으로 조합하고 있어요.</span>
		</div>
	{/if}

	{#if hasGenerated}
		<div class="thread-summary">
			<div>
				<strong>{selectedProducts.length}개 상품 구성</strong>
				<span>예산 {formatPrice(budgetLimit)} 안에서 카테고리별 대표 상품을 골랐어요.</span>
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
		margin: 0 -1rem;
		padding: 0 1rem 0.25rem;
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
			margin-inline: -0.88rem;
			padding-inline: 0.88rem;
		}
	}
</style>
