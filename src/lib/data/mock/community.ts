import type { InterestArea } from '$lib/stores/interest';
import type { WidgetData } from '../mock';

export const communityData: Record<InterestArea, WidgetData> = {
  running: {
    id: 'r_p1',
    type: 'community',
    title: '오늘의 핫한 게시물',
    data: [
      { id: 'p1', author: '풀코스도전자', title: '오늘 10K PB 달성했습니다! 어떻게 회복하면 좋을까요?', views: '1.2K', comments: 45 },
      { id: 'p2', author: '트레일러너', title: '주말 남산 트레일러닝 코스 공유합니다 (사진 다수)', views: '950', comments: 12 },
      { id: 'p3', author: '러닝머신', title: '우중런에 가장 좋은 운동화 추천 좀 해주세요', views: '320', comments: 18 },
      { id: 'p4', author: '초보달리기', title: '다리가 천근만근인데 내일 쉬는게 맞겠죠?', views: '2.4K', comments: 85 },
      { id: 'p5', author: '밤산책', title: '한강 야간 러닝 크루 가입했는데 너무 좋네요', views: '800', comments: 24 },
      { id: 'p6', author: '장비덕후', title: '스마트워치 애플워치 vs 가민 전격 비교 정리본', views: '5.1K', comments: 210 },
    ],
  },
  makeup: {
    id: 'm_p1',
    type: 'community',
    title: '뷰티 TALK',
    data: [
      { id: 'mp1', author: '코덕일기', title: '이번 올리브영 세일때 꼭 사야할 리스트', views: '8.4K', comments: 120 },
      { id: 'mp2', author: '틴트장인', title: '퍼스널 컬러 진단 받았는데 충격...', views: '3.1K', comments: 45 },
      { id: 'mp3', author: '수부지탈출', title: '수부지에 맞는 파운데이션 정착템 찾았습니다', views: '12K', comments: 88 },
      { id: 'mp4', author: '올영vvipp', title: '단종돼서 오열한 레전드 아이템들 ㅠㅠ 돌아와', views: '2.2K', comments: 34 },
      { id: 'mp5', author: '글리터덕', title: '까마귀들 모여라 영롱 보스 글리터 모음.zip', views: '5.5K', comments: 92 },
    ],
  },
  tech: {
    id: 't_p1',
    type: 'community',
    title: '긱스 포럼',
    data: [
      { id: 'tp1', author: '맥북오너', title: 'M4 아이패드 프로 벤치마크 결과 공유합니다', views: '15K', comments: 201 },
      { id: 'tp2', author: '얼리어답터', title: '갤럭시 링 실물 보고 온 후기 (장단점)', views: '40K', comments: 340 },
      { id: 'tp3', author: '개발자A', title: '개발용 모니터 27인치 4K vs 32인치 고민입니다', views: '8K', comments: 110 },
      { id: 'tp4', author: '겜돌이', title: '스팀덱 OLED 한달 사용기 솔직하게 씁니다', views: '21K', comments: 450 },
      { id: 'tp5', author: '데스크테리어', title: '이케아 페그보드 활용해서 꾸민 책상 (인증샷)', views: '33K', comments: 198 },
    ],
  }
};
