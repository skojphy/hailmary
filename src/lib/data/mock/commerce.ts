import type { InterestArea } from '$lib/stores/interest';
import type { WidgetData } from '../mock';

export const commerceData: Record<InterestArea, WidgetData[]> = {
	running: [
		{
			id: 'r_c1',
			type: 'commerce',
			title: '러너들의 공동구매',
			data: {
				title: '아미노바이탈 에너제틱 10포 세트',
				originalPrice: 20000,
				price: 12000,
				discountRate: 40,
				currentParticipants: 85,
				targetParticipants: 100,
				imageUrl: '/images/items/lipstick.png'
			}
		},
		{
			id: 'r_c2',
			type: 'commerce',
			title: '주말 깜짝 할인',
			data: {
				title: '경량 바람막이 자켓 (블랙/화이트)',
				originalPrice: 89000,
				price: 45000,
				discountRate: 49,
				currentParticipants: 210,
				targetParticipants: 300,
				imageUrl: 'https://images.unsplash.com/photo-1544261763-755eaee02e1c?w=400&q=80'
			}
		},
		{
			id: 'r_c3',
			type: 'commerce',
			title: '베스트 러닝 삭스',
			data: {
				title: '논슬립 미드컷 러닝 양말 3팩',
				originalPrice: 18000,
				price: 9900,
				discountRate: 45,
				currentParticipants: 50,
				targetParticipants: 200,
				imageUrl: 'https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?w=400&q=80'
			}
		},
		{
			id: 'r_c4',
			type: 'commerce',
			title: '스포츠 선크림 특가',
			data: {
				title: '워터프루프 액티브 선크림 50ml + 50ml',
				originalPrice: 32000,
				price: 19000,
				discountRate: 40,
				currentParticipants: 180,
				targetParticipants: 500,
				imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80'
			}
		}
	],
	makeup: [
		{
			id: 'm_c1',
			type: 'commerce',
			title: '오늘의 핫딜',
			data: {
				title: '봄 웜톤 필수 에디션 섀도우 팔레트',
				originalPrice: 45000,
				price: 29000,
				discountRate: 35,
				currentParticipants: 140,
				targetParticipants: 200,
				imageUrl: 'https://images.unsplash.com/photo-1512496115851-a1c8f137e02c?w=400&q=80'
			}
		},
		{
			id: 'm_c2',
			type: 'commerce',
			title: '환절기 스킨케어 공구',
			data: {
				title: '병풀추출물 수분 진정 앰플 대용량 세트',
				originalPrice: 38000,
				price: 15200,
				discountRate: 60,
				currentParticipants: 840,
				targetParticipants: 1000,
				imageUrl: 'https://plus.unsplash.com/premium_photo-1681980018511-cbac52cc21be?w=400&q=80'
			}
		},
		{
			id: 'm_c3',
			type: 'commerce',
			title: '베스트셀러 브러쉬',
			data: {
				title: '초보자 필수 미니 메이크업 브러쉬 5종 세트',
				originalPrice: 24000,
				price: 11900,
				discountRate: 50,
				currentParticipants: 120,
				targetParticipants: 300,
				imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80'
			}
		},
		{
			id: 'm_c4',
			type: 'commerce',
			title: '1+1 특가',
			data: {
				title: '지속력 갑! 픽실 벨벳 틴트 1+1 (색상교차가능)',
				originalPrice: 28000,
				price: 14000,
				discountRate: 50,
				currentParticipants: 500,
				targetParticipants: 500,
				imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21b72a0?w=400&q=80'
			}
		}
	],
	tech: [
		{
			id: 't_c1',
			type: 'commerce',
			title: '애플 디바이스 스페셜 딜',
			data: {
				title: 'AirPods Pro 2세대 (USB-C)',
				originalPrice: 359000,
				price: 289000,
				discountRate: 19,
				currentParticipants: 950,
				targetParticipants: 1000,
				imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80'
			}
		},
		{
			id: 't_c2',
			type: 'commerce',
			title: '얼리버드 키보드 공구',
			data: {
				title: 'NuPhy Air75 V2 무선 기계식 키보드',
				originalPrice: 198000,
				price: 159000,
				discountRate: 19,
				currentParticipants: 120,
				targetParticipants: 500,
				imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80'
			}
		},
		{
			id: 't_c3',
			type: 'commerce',
			title: '모니터 암 특가',
			data: {
				title: '고중량 프리미엄 듀얼 모니터암 무광 블랙',
				originalPrice: 89000,
				price: 49000,
				discountRate: 44,
				currentParticipants: 500,
				targetParticipants: 1000,
				imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80'
			}
		},
		{
			id: 't_c4',
			type: 'commerce',
			title: '재택근무 꿀템',
			data: {
				title: '로지텍 MX Master 3S 무선 마우스',
				originalPrice: 139000,
				price: 99000,
				discountRate: 28,
				currentParticipants: 88,
				targetParticipants: 150,
				imageUrl: 'https://plus.unsplash.com/premium_photo-1664112002342-6eccc54bce53?w=400&q=80'
			}
		}
	]
};
