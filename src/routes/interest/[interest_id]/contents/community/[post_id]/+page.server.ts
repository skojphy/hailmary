import type { PageServerLoad } from './$types';
import { getCommunityWidget } from '$lib/data/mock';
import { getAiPickCards } from '$lib/data/mock/ai-pick';
import { getInterestPhotoSet } from '$lib/data/interest-photo-library';
import { error } from '@sveltejs/kit';

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
			trends: [
				'최근 저장 반응이 높은 키워드를 우선 반영했어요.',
				'질문형 인기글에서는 구매 전 비교와 사용감 언급이 많아요.',
				'상품은 바로 연결 가능한 아이템 중심으로 골랐어요.'
			]
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
