import type { InterestArea } from '$lib/stores/interest';
import type { WidgetData } from '../mock';

export const shortsData: Record<InterestArea, WidgetData> = {
	running: {
		id: 'r_s1',
		type: 'shorts',
		title: 'Trending Shorts',
		data: [
			{
				id: 'v1',
				title: '레이싱 경기장 달리기!!\n분노의 질주',
				views: '1.2K',
				duration: '00:24',
				creator: '@Nike Run',
				liked: false,
				overlayPosition: 'top',
				thumbnail: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80'
			},
			{
				id: 'v2',
				title: '공복유산소 8km\n5km 걷기 + 3km 러닝',
				views: '2.4K',
				duration: '00:32',
				creator: '@daeyoon',
				liked: false,
				overlayLabel: '직장인 주말 운동',
				overlayPosition: 'middle',
				thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80'
			},
			{
				id: 'v3',
				title: 'Distance\n16.21 km\nPace\n5:59 /km\nTime\n1h 37m',
				views: '0.3K',
				duration: '00:12',
				creator: '@silverstar',
				liked: false,
				overlayPosition: 'middle',
				overlayTone: 'stats',
				thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=900&q=80'
			},
			{
				id: 'v4',
				title: '전 튼실한 저의\n다리를 좋아해요',
				views: '5.1K',
				duration: '00:15',
				creator: '@i2i3r9',
				liked: true,
				overlayLabel: '집에 큰 음악소리 있었다면 이게 그냥 그런거네',
				overlayPosition: 'top',
				overlayTone: 'highlight',
				thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80'
			},
			{
				id: 'v5',
				title: '70명 서울 러닝크루\n6.09km\n7:03/km\n43m 1s',
				views: '1.2K',
				duration: '00:18',
				creator: '@seoulruncrew',
				liked: false,
				overlayPosition: 'top',
				thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80'
			},
			{
				id: 'v6',
				title: '공복러닝 다 듣기 민망하지 않아요?\n이건 그냥 예린씨 운동ㅎㅎ',
				views: '3.4K',
				duration: '00:13',
				creator: '@morningrun',
				liked: false,
				overlayPosition: 'top',
				thumbnail: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=900&q=80'
			}
		]
	},
	makeup: {
		id: 'm_s1',
		type: 'shorts',
		title: '퀵 뷰티 튜토리얼',
		data: [
			{
				id: 'v10',
				title: '5분 컷! 출근 메이크업',
				views: '50K',
				duration: '00:18',
				creator: '@dailybeauty',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=80'
			},
			{
				id: 'v11',
				title: '워터프루프 아이라이너\n절대 안 번지는 법',
				views: '21K',
				duration: '00:29',
				creator: '@linerzip',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?w=700&q=80'
			},
			{
				id: 'v12',
				title: '다이소 꿀템으로 완성하는\n하이라이터',
				views: '180K',
				duration: '00:22',
				creator: '@shiningyou',
				liked: true,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=700&q=80'
			},
			{
				id: 'v13',
				title: '환절기 스킨케어 루틴\n대공개',
				views: '33K',
				duration: '00:31',
				creator: '@glowmoments',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=700&q=80'
			},
			{
				id: 'v14',
				title: '속눈썹 펌 집에서\n갓성비로 혼자하기',
				views: '88K',
				duration: '00:27',
				creator: '@lashhome',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=700&q=80'
			},
			{
				id: 'v15',
				title: '곰손도 가능한 컨실러\n완벽 커버법',
				views: '32K',
				duration: '00:19',
				creator: '@covernote',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://plus.unsplash.com/premium_photo-1661664157140-52e673baaea2?w=700&q=80'
			},
			{
				id: 'v16',
				title: '여쿨라 찰떡 블러셔\nTOP3',
				views: '29K',
				duration: '00:16',
				creator: '@moodbeauty',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1512496115851-a1c8f137e02c?w=700&q=80'
			}
		]
	},
	tech: {
		id: 't_s1',
		type: 'shorts',
		title: '최신 IT 리뷰 쇼츠',
		data: [
			{
				id: 't_v1',
				title: '아이패드 에어 M2\n하루 사용기',
				views: '95K',
				duration: '00:21',
				creator: '@itdaily',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700&q=80'
			},
			{
				id: 't_v2',
				title: '데스크셋업 완성하는\n꿀템 3가지',
				views: '44K',
				duration: '00:18',
				creator: '@setup.zip',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=700&q=80'
			},
			{
				id: 't_v3',
				title: '개발자의 기계식 키보드\n타건음',
				views: '120K',
				duration: '00:14',
				creator: '@keyboardlab',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=700&q=80'
			},
			{
				id: 't_v4',
				title: '진짜 편한 다이소\n케이블 정리템',
				views: '200K',
				duration: '00:26',
				creator: '@techhack',
				liked: true,
				overlayPosition: 'bottom',
				thumbnail: 'https://plus.unsplash.com/premium_photo-1681228414571-3312c3b88b78?w=700&q=80'
			},
			{
				id: 't_v5',
				title: '맥북 초보들이 무조건\n꺼야 하는 설정',
				views: '80K',
				duration: '00:17',
				creator: '@macnote',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&q=80'
			},
			{
				id: 't_v6',
				title: 'ChatGPT로 생산성\n3배 높이는 팁',
				views: '2.1M',
				duration: '00:33',
				creator: '@aishort',
				liked: false,
				overlayPosition: 'bottom',
				thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80'
			}
		]
	}
};
