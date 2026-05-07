import type { InterestArea } from '$lib/stores/interest';
import type { WidgetData } from '../mock';

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
				reason: '수부지 베이스와 올영 세일템 이야기가 함께 많이 올라와서 골랐어요.',
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
				reason: '퍼스널 컬러 후기와 세일 장바구니 글의 공통 키워드를 반영했어요.',
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
