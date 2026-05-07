import type { PageServerLoad } from './$types';
import { getCommunityWidget } from '$lib/data/mock';
import { getAiPickCards } from '$lib/data/mock/ai-pick';
import { getInterestPhotoSet } from '$lib/data/interest-photo-library';
import { error } from '@sveltejs/kit';

const aiGuideArticles = {
	makeup: {
		kicker: '요즘 메이크업 인기글을 훑어보면 공통으로 보이는 말이 있어요. 예쁘게 올라가는 베이스보다, 시간이 지나도 덜 무너지는 베이스를 찾는다는 점입니다.',
		sections: [
			{
				title: '왜 지금 톤업 베이스 이야기가 많을까',
				paragraphs: [
					'최근 커뮤니티에서는 수부지 피부, 출근 메이크업, 수정 화장 줄이기 같은 키워드가 같이 움직이고 있어요. 예전처럼 커버력 하나만 보고 고르기보다, 피부 위에서 얼마나 얇게 밀착되는지와 오후에 번들거림이 얼마나 덜한지가 더 자주 언급됩니다.',
					'특히 베이스 전에 얇게 깔 수 있는 톤업 선크림은 파운데이션을 덜어내고 싶은 사람에게 반응이 좋아요. 피부 톤을 살짝 정리해 주면서도 무겁지 않아야 하고, 마스크나 머리카락에 덜 묻어나는 마무리감도 중요해졌습니다.'
				]
			},
			{
				title: '고를 때는 이 세 가지를 먼저 보면 좋아요',
				paragraphs: [
					'첫째는 제형입니다. 손등에서 바로 보송해지는 제품보다, 얼굴에 펴 바른 뒤 1분 정도 지나면서 얇게 마르는 타입이 데일리로 쓰기 편해요. 둘째는 톤입니다. 너무 밝게 뜨는 핑크 톤보다는 목과 경계가 덜 생기는 자연스러운 톤업이 실패 확률이 낮습니다.',
					'셋째는 다음 단계와의 궁합입니다. 쿠션이나 컨실러를 위에 올릴 예정이라면 밀림이 적은지, 단독으로 쓸 예정이라면 모공 주변이 답답해 보이지 않는지가 중요합니다.'
				]
			}
		],
		analysis: [
			'수부지, 지속력, 얇은 베이스 키워드가 같은 글에서 반복됐어요.',
			'저장 반응은 단독 사용보다 “베이스 전에 얇게” 쓰는 조합형 글에서 높았어요.',
			'가격보다 재구매, 휴대성, 오후 무너짐 후기가 선택 기준으로 많이 등장했어요.'
		],
		tipTitle: 'AI가 정리한 사용 팁',
		tips: [
			'스킨케어가 충분히 흡수된 뒤 손가락 두 마디 정도만 얇게 펴 발라요.',
			'콧볼과 이마는 덧바르기보다 퍼프로 눌러 마무리하면 번들거림이 덜해요.',
			'쿠션을 올릴 때는 전체가 아니라 잡티나 붉은기 부위만 얇게 보완하는 편이 자연스러워요.'
		]
	},
	running: {
		kicker: '러닝 커뮤니티에서 장비 이야기는 결국 기록보다 컨디션으로 모입니다. 최근에는 더 멀리 뛰는 법보다, 다음 날에도 무리 없이 다시 뛸 수 있는 준비물에 대한 반응이 높아요.',
		sections: [
			{
				title: '요즘 러너들이 먼저 챙기는 기준',
				paragraphs: [
					'인기글에서는 우중런, 10K 이후 피로, 양말 미끄러짐 같은 작은 불편이 자주 보입니다. 기록을 줄이는 장비보다 꾸준히 나가게 만드는 장비가 더 현실적인 관심사로 올라온 셈입니다.',
					'특히 초보 러너는 신발만 바꾸면 해결될 거라고 생각하기 쉽지만, 실제 후기는 양말, 바람막이, 회복 간식처럼 작고 자주 쓰는 아이템에서 만족도가 크게 갈립니다.'
				]
			},
			{
				title: '장거리 전에는 착용감을 먼저 맞춰요',
				paragraphs: [
					'땀이 차는 구간이 길어질수록 발 안에서 밀림이 생기고, 작은 마찰이 물집으로 이어질 수 있어요. 그래서 논슬립 양말이나 통기성 좋은 레이어를 먼저 맞추면 러닝 후반의 피로감이 줄어듭니다.',
					'비 오는 날이나 바람이 강한 날은 방수보다 가볍게 말리는 소재가 더 편할 때가 많습니다. 접어서 들고 다닐 수 있는지도 실제 사용감에 큰 영향을 줍니다.'
				]
			}
		],
		analysis: [
			'우중런, 회복, 10K 입문 글의 댓글 반응이 함께 높았어요.',
			'신발보다 양말과 레이어링처럼 반복 구매 가능한 소품 언급이 늘었어요.',
			'완주 인증글 아래에는 다음 훈련을 위한 회복템 질문이 많이 붙었어요.'
		],
		tipTitle: 'AI가 정리한 러닝 전 체크',
		tips: [
			'새 양말은 긴 러닝 전에 바로 신지 말고 짧은 조깅에서 먼저 테스트해요.',
			'비 예보가 있으면 방수보다 건조가 빠른 얇은 레이어를 챙기는 편이 좋아요.',
			'러닝 후 30분 안에 수분과 가벼운 탄수화물을 보충하면 회복 루틴이 안정돼요.'
		]
	}
} as const;

const defaultAiGuideArticle = {
	kicker: '이 관심사의 인기글을 보면 유행보다 실사용 기준을 찾는 흐름이 더 강합니다. AI 쇼핑 가이드는 질문, 저장, 구매 반응이 같이 올라온 포인트를 묶어 하나의 글로 정리했어요.',
	sections: [
		{
			title: '지금 사람들이 많이 비교하는 것',
			paragraphs: [
				'최근 커뮤니티 반응은 단순히 예쁜 제품이나 유명한 제품보다 실제로 자주 쓰기 좋은지에 모이고 있어요. 첫 구매 전에 실패를 줄이고 싶은 질문도 많고, 이미 써본 사람들의 짧은 후기가 선택에 영향을 주고 있습니다.',
				'그래서 이번 추천은 한 번 보고 지나가는 아이템이 아니라, 일상에서 반복해서 쓰기 좋은 기준을 중심으로 골랐습니다.'
			]
		},
		{
			title: '구매 전 확인하면 좋은 기준',
			paragraphs: [
				'먼저 사용 빈도를 생각하는 것이 좋아요. 매일 쓰는 물건이라면 디자인보다 관리와 휴대성이 중요하고, 가끔 쓰는 물건이라면 보관하기 쉬운지가 만족도를 좌우합니다.',
				'두 번째는 기존에 가지고 있는 아이템과 잘 이어지는지입니다. 새로 산 제품 하나가 아니라, 이미 쓰는 루틴 안에 자연스럽게 들어오는지가 오래 쓰는 기준이 됩니다.'
			]
		}
	],
	analysis: [
		'질문형 글과 저장 반응이 함께 높은 키워드를 먼저 반영했어요.',
		'후기에서는 가격보다 사용 빈도와 관리 편의성이 자주 언급됐어요.',
		'상품은 현재 바로 연결 가능한 아이템 중심으로 구성했어요.'
	],
	tipTitle: 'AI가 정리한 선택 팁',
	tips: [
		'처음 구매한다면 가장 많이 쓰는 상황 하나를 먼저 정하고 골라요.',
		'비슷한 상품이 많을 때는 보관, 관리, 휴대성처럼 오래 쓰는 기준을 비교해요.',
		'후기에서는 장점보다 반복해서 나오는 불편 포인트를 먼저 확인하는 편이 좋아요.'
	]
};

export const load: PageServerLoad = async ({ params }) => {
	const interest = params.interest_id;
	const postId = params.post_id;
	const communityItems = getCommunityWidget(interest).data;
	const photoSet = getInterestPhotoSet(interest);

	if (postId === 'ai-guide') {
		const guide = getAiPickCards(interest)[0];

		if (!guide) {
			error(404, 'AI guide not found');
		}

		return {
			interest,
			type: 'ai',
			guide,
			photos: [guide.imageUrl, ...photoSet.productImages.slice(0, 2)],
			article:
				aiGuideArticles[interest as keyof typeof aiGuideArticles] ?? defaultAiGuideArticle
		};
	}

	const post = communityItems.find((item: { id: string }) => item.id === postId);

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		interest,
		type: 'post',
		post,
		photo: photoSet.galleryImages[0],
		likes: 120 + post.comments * 3,
		bookmarks: 38 + post.comments,
		comments: [
			{ id: 'c1', author: '취향수집가', body: '이거 진짜 공감돼요. 저도 같은 고민 중이었어요.' },
			{ id: 'c2', author: '실사용러', body: '저는 비슷한 제품 써봤는데 입문용으로 괜찮았습니다.' },
			{ id: 'c3', author: '핫딜탐정', body: '관련 상품은 가격 변동이 있어서 장바구니에 넣고 보는 중이에요.' }
		]
	};
};
