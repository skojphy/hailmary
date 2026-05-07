import type { InterestArea } from '$lib/stores/interest';
import type { WidgetData } from '../mock';
import { INTERESTS } from '$lib/data/interests';
import { getInterestPhotoSet } from '$lib/data/interest-photo-library';
import { getCommerceItems } from '../mock';

export type AiPickCard = {
	id: string;
	label: string;
	title: string;
	description: string;
	reason: string;
	imageUrl: string;
	product: {
		brand: string;
		name: string;
		price: string;
		imageUrl: string;
	};
};

export const aiPickData: Record<InterestArea, WidgetData> = {
	running: {
		id: 'r_ai_pick',
		type: 'ai-pick',
		title: 'AI PICK',
		data: [
			{
				id: 'r_ai_1',
				label: '장거리 러너에게',
				title: '땀 차도 무너지지 않는 주말 러닝 루틴',
				description: '가벼운 바람막이와 논슬립 양말을 같이 맞추면 10K 이후 피로감이 덜해요.',
				reason: '최근 인기글에서 우중런, 회복, 장비 비교 언급이 같이 올라와서 세트로 추천해요.',
				imageUrl:
					'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=85',
				product: {
					brand: '런메이트',
					name: '논슬립 미드컷 러닝 양말 3팩',
					price: '9,900원~',
					imageUrl:
						'https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?auto=format&fit=crop&w=300&q=80'
				}
			},
			{
				id: 'r_ai_2',
				label: '회복이 고민이라면',
				title: 'PB 다음 날엔 에너지보다 회복템 먼저',
				description: '젤, 스트레칭 밴드, 가벼운 보온 레이어를 준비하면 다음 훈련이 편해져요.',
				reason: '10K 기록 인증글과 회복 질문이 동시에 반응을 얻고 있어요.',
				imageUrl:
					'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85',
				product: {
					brand: '아미노바이탈',
					name: '에너제틱 10포 세트',
					price: '12,000원~',
					imageUrl: '/images/items/sneakers.png'
				}
			}
		]
	},
	makeup: {
		id: 'm_ai_pick',
		type: 'ai-pick',
		title: 'AI PICK',
		data: [
			{
				id: 'm_ai_1',
				label: '번들거림이 싫다면',
				title: '보송하게 스며드는 톤업을 위해',
				description: '매트한 제형으로 마무리돼요. 베이스 전에 얇게 올리기 좋아요.',
				reason: '수부지 베이스와 뷰티 특가템 이야기가 함께 많이 올라와서 골랐어요.',
				imageUrl:
					'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1000&q=85',
				product: {
					brand: '홀리카홀리카',
					name: '메이크업 선크림 SPF50+ PA+++',
					price: '15,000원~',
					imageUrl: '/images/items/makeup1.webp'
				}
			},
			{
				id: 'm_ai_2',
				label: '봄 웜톤 저장템',
				title: '은은한 코랄 무드로 실패 없는 데일리 메이크업',
				description: '과한 글리터보다 맑은 음영을 먼저 쌓으면 출근 메이크업에도 부담이 적어요.',
				reason: '퍼스널 컬러 후기와 장바구니 저장 글의 공통 키워드를 반영했어요.',
				imageUrl:
					'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1000&q=85',
				product: {
					brand: '무드팔레트',
					name: '봄 웜톤 필수 에디션 섀도우 팔레트',
					price: '29,000원~',
					imageUrl:
						'https://images.unsplash.com/photo-1512496115851-a1c8f137e02c?auto=format&fit=crop&w=300&q=80'
				}
			}
		]
	},
	tech: {
		id: 't_ai_pick',
		type: 'ai-pick',
		title: 'AI PICK',
		data: [
			{
				id: 't_ai_1',
				label: '데스크셋업 업그레이드',
				title: '32인치 고민 중이면 먼저 팔과 시야부터',
				description: '모니터암과 무선 마우스를 같이 맞추면 큰 화면 전환이 훨씬 자연스러워요.',
				reason: '모니터 크기 고민과 데스크테리어 인증글 반응이 높아서 묶어 추천해요.',
				imageUrl:
					'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85',
				product: {
					brand: '데스크핏',
					name: '고중량 프리미엄 듀얼 모니터암',
					price: '49,000원~',
					imageUrl:
						'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=300&q=80'
				}
			},
			{
				id: 't_ai_2',
				label: '이동 많은 얼리어답터',
				title: '작지만 체감 큰 USB-C 오디오 세팅',
				description: '노이즈캔슬링 이어폰은 출퇴근, 카페 작업, 영상 시청 모두에서 만족도가 높아요.',
				reason: '애플 기기 딜과 실사용 후기형 게시물이 계속 상위권이에요.',
				imageUrl:
					'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85',
				product: {
					brand: 'Apple',
					name: 'AirPods Pro 2세대 USB-C',
					price: '289,000원~',
					imageUrl:
						'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=300&q=80'
				}
			}
		]
	}
};

const interestLabelById = new Map(INTERESTS.map((interest) => [interest.id, interest.label]));

const categoryCopy = {
	beauty: [
		{
			title: '오늘 분위기는 결 좋은 광채로',
			description: '피부 표현은 가볍게, 포인트 컬러는 하나만 남기면 데일리 메이크업이 쉬워져요.',
			reason: '베이스 지속력과 톤 정리 키워드가 같이 많이 언급돼서 추천해요.'
		},
		{
			title: '작은 파우치에 담는 실패 없는 조합',
			description: '선크림, 립, 미니 팔레트처럼 자주 쓰는 제품만 남기면 휴대성이 좋아요.',
			reason: '장바구니 저장과 정착템 후기에서 반복되는 조합을 반영했어요.'
		}
	],
	tech: [
		{
			title: '체감이 큰 데스크 업그레이드',
			description: '입력장치와 화면 배치를 먼저 바꾸면 작업 루틴이 바로 가벼워져요.',
			reason: '셋업 인증과 실사용 후기에서 만족도가 높게 언급된 흐름이에요.'
		},
		{
			title: '가볍게 들고 다니는 생산성 세트',
			description: '무선 오디오와 휴대용 액세서리를 맞추면 이동 중 작업 전환이 빨라져요.',
			reason: '신제품 후기와 할인 정보가 함께 반응을 얻고 있어요.'
		}
	],
	sports: [
		{
			title: '오래 움직이는 날엔 가벼운 장비부터',
			description: '착용감 좋은 기본템을 먼저 맞추면 운동 후반 피로감이 덜해요.',
			reason: '입문 장비와 회복 루틴 질문이 같이 늘고 있어서 골랐어요.'
		},
		{
			title: '주말 루틴을 안정적으로 만드는 준비물',
			description: '날씨와 컨디션 변화에 대응할 수 있는 소품을 챙기면 꾸준함이 쉬워져요.',
			reason: '실전 후기형 인기글에서 반복되는 불편 포인트를 반영했어요.'
		}
	],
	food: [
		{
			title: '집에서 즐기는 작은 취향 루틴',
			description: '자주 쓰는 도구와 베이스 재료를 맞추면 첫 시도도 부담이 줄어요.',
			reason: '입문템 추천과 저장용 레시피 글의 공통 키워드를 묶었어요.'
		},
		{
			title: '주말에 꺼내기 좋은 홈카페 조합',
			description: '향과 질감이 살아나는 기본 아이템을 고르면 만족도가 오래가요.',
			reason: '후기에서 재구매와 선물 언급이 함께 올라오는 흐름이에요.'
		}
	],
	home: [
		{
			title: '공간을 넓게 쓰는 생활 정리템',
			description: '바닥을 비우고 자주 쓰는 물건만 가까이 두면 집이 훨씬 정돈돼 보여요.',
			reason: '좁은 공간 활용과 첫 구매템 질문이 많이 겹쳐서 추천해요.'
		},
		{
			title: '하루 끝을 편하게 만드는 무드 세팅',
			description: '조명, 패브릭, 수납을 같이 맞추면 작은 변화로도 분위기가 달라져요.',
			reason: '방 분위기 전환과 실용템 후기가 함께 반응을 얻고 있어요.'
		}
	],
	culture: [
		{
			title: '취향을 오래 남기는 기록 아이템',
			description: '보고 듣고 읽은 것을 바로 정리할 수 있으면 콘텐츠 경험이 더 깊어져요.',
			reason: '저장하고 다시 보는 콘텐츠형 글의 반응이 높아지고 있어요.'
		},
		{
			title: '이번 주말 감도를 올리는 작은 준비',
			description: '가볍게 들고 나갈 수 있는 아이템 하나만 있어도 경험이 더 선명해져요.',
			reason: '전시, 독서, 사진 후기에서 공통으로 나온 니즈를 반영했어요.'
		}
	]
};

function getAiPickCategory(interestId: string) {
	if (['makeup', 'beauty', 'beauty-2', 'perfume', 'nail', 'fashion'].includes(interestId)) {
		return 'beauty';
	}

	if (['tech', 'phone', 'streaming', 'gaming'].includes(interestId)) {
		return 'tech';
	}

	if (
		[
			'running',
			'running-crew',
			'running-crew-2',
			'yoga',
			'climbing',
			'swimming',
			'camping',
			'early-adopter'
		].includes(interestId)
	) {
		return 'sports';
	}

	if (['bakery', 'tech-2', 'home-cafe', 'cooking', 'whiskey'].includes(interestId)) {
		return 'food';
	}

	if (
		['home', 'living-alone', 'interior', 'travel', 'drive', 'plants', 'early-adopter-2'].includes(
			interestId
		)
	) {
		return 'home';
	}

	return 'culture';
}

function formatPrice(price: number) {
	return `${price.toLocaleString()}원~`;
}

function createFallbackAiPickCards(interestId: string): AiPickCard[] {
	const label = interestLabelById.get(interestId) ?? '관심사';
	const photoSet = getInterestPhotoSet(interestId);
	const products = getCommerceItems(interestId);
	const copySet = categoryCopy[getAiPickCategory(interestId)];

	return Array.from({ length: 4 }, (_, index) => {
		const product = products[index % products.length]?.data;
		const copy = copySet[index % copySet.length];
		const imagePool = [...photoSet.galleryImages, ...photoSet.shortsImages, ...photoSet.productImages];

		return {
			id: `${interestId}_ai_generated_${index + 1}`,
			label: `${label} AI 추천`,
			title: index % 2 === 0 ? `${label} 취향에 맞춘 AI PICK` : copy.title,
			description: copy.description,
			reason: `${label} 인기글의 질문, 저장, 구매 반응을 함께 보고 골랐어요.`,
			imageUrl: imagePool[index % imagePool.length],
			product: {
				brand: product?.title?.split(' ')[0] ?? label,
				name: product?.title ?? `${label} 추천 아이템 ${index + 1}`,
				price: typeof product?.price === 'number' ? formatPrice(product.price) : '추천가 확인',
				imageUrl: product?.imageUrl ?? photoSet.productImages[index % photoSet.productImages.length]
			}
		};
	});
}

export function getAiPickCards(interestId: string): AiPickCard[] {
	const curated = (aiPickData as Record<string, { data: AiPickCard[] }>)[interestId]?.data ?? [];
	const fallback = createFallbackAiPickCards(interestId);

	return [...curated, ...fallback].slice(0, 6);
}
