import type { InterestArea } from '$lib/stores/interest';
import type { WidgetData } from '../mock';

export const shortsData: Record<InterestArea, WidgetData> = {
  running: {
    id: 'r_s1',
    type: 'shorts',
    title: 'Trending Shorts',
    data: [
      { id: 'v1', title: '5km를 20분에 뛰는 호흡법', views: '12K', thumbnail: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=80' },
      { id: 'v2', title: '나이키 알파플라이3 리뷰', views: '5.2K', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
      { id: 'v3', title: '초보 러너를 위한 스트레칭 루틴', views: '20K', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
      { id: 'v4', title: '무릎 통증 예방하는 착지법', views: '8.9K', thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80' },
      { id: 'v5', title: '야간 러닝 필수 안전템 BEST 3', views: '15K', thumbnail: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80' },
      { id: 'v6', title: '러닝 후 근손실 방지 꿀팁', views: '41K', thumbnail: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&q=80' },
      { id: 'v7', title: '러닝머신 1시간 지루하지 않게 타는 법', views: '23K', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
      { id: 'v8', title: '비 오는 날 러닝, 주의할 점', views: '11K', thumbnail: 'https://images.unsplash.com/photo-1502904550058-20e408ec2ce4?w=400&q=80' },
      { id: 'v9', title: '하프 마라톤 D-30 훈련법', views: '19K', thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80' },
    ],
  },
  makeup: {
    id: 'm_s1',
    type: 'shorts',
    title: '퀵 뷰티 튜토리얼',
    data: [
      { id: 'v10', title: '5분 컷! 출근 메이크업', views: '50K', thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80' },
      { id: 'v11', title: '워터프루프 아이라이너 절대 안 번지는 법', views: '21K', thumbnail: 'https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?w=400&q=80' },
      { id: 'v12', title: '다이소 꿀템으로 완성하는 하이라이터', views: '180K', thumbnail: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&q=80' },
      { id: 'v13', title: '환절기 스킨케어 루틴 대공개', views: '33K', thumbnail: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80' },
      { id: 'v14', title: '속눈썹 펌 집에서 갓성비로 혼자하기', views: '88K', thumbnail: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=400&q=80' },
      { id: 'v15', title: '곰손도 가능한 컨실러 완벽 커버법', views: '32K', thumbnail: 'https://plus.unsplash.com/premium_photo-1661664157140-52e673baaea2?w=400&q=80' },
      { id: 'v16', title: '여쿨라 찰떡 블러셔 TOP3', views: '29K', thumbnail: 'https://images.unsplash.com/photo-1512496115851-a1c8f137e02c?w=400&q=80' },
    ],
  },
  tech: {
    id: 't_s1',
    type: 'shorts',
    title: '최신 IT 리뷰 쇼츠',
    data: [
      { id: 't_v1', title: '아이패드 에어 M2 하루 사용기', views: '95K', thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80' },
      { id: 't_v2', title: '데스크셋업 완성하는 꿀템 3가지', views: '44K', thumbnail: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80' },
      { id: 't_v3', title: '개발자의 기계식 키보드 타건음', views: '120K', thumbnail: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80' },
      { id: 't_v4', title: '진짜 편한 다이소 케이블 정리템', views: '200K', thumbnail: 'https://plus.unsplash.com/premium_photo-1681228414571-3312c3b88b78?w=400&q=80' },
      { id: 't_v5', title: '맥북 초보들이 무조건 꺼야하는 설정', views: '80K', thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80' },
      { id: 't_v6', title: 'ChatGPT로 생산성 3배 높이는 팁', views: '2.1M', thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80' },
    ],
  }
};
