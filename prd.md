# [PRD] 관심사 맞춤형 버티컬 메인 대시보드

## 1. 프로젝트 개요
* **목적**: 사용자가 선택한 특정 관심사(예: 쿠킹, 캠핑, 게임 등)에 따라 최적화된 콘텐츠(커머스, 콘텐츠, 소셜)를 한눈에 보여주는 버티컬 홈 구축.
* **핵심 가치**: 개인화된 탐색 경험 제공, 체류 시간 증대 및 구매 전환 유도.
* **기술 스택**: SvelteKit, TypeScript, Tailwind CSS (또는 가벼운 CSS 라이브러리).

## 2. 주요 기능 요구사항 (Functional Requirements)

### 2.1. 다이내믹 헤더 (Dynamic Header)
* **관심사 전환**: 현재 '러닝'으로 설정된 타이틀 클릭 시 다른 관심사(카테고리)로 전환할 수 있는 드롭다운 또는 바텀 시트 노출.
* **인기 지표**: 해당 버티컬의 총 좋아요(하트) 수 및 실시간 활성 지표 표시.

### 2.2. 관심사 특화 위젯 구성 (Grid Layout)
이미지에서 확인된 5가지 핵심 모듈을 Svelte의 컴포넌트 기반으로 설계합니다.

| 모듈명 | 상세 기능 및 특징 |
| :--- | :--- |
| **공동구매/아이템카드** | 할인율, 남은 인원(참여 현황), 가격 정보를 포함한 커머스 카드. |
| **인기글 (Community)** | 날짜별 큐레이션된 베스트 게시글. 조회수 및 작성자 태그 포함. |
| **Shorts (Media)** | 세로형 비디오 프리뷰 및 실시간 시청자/조회수 표시. |
| **나의 팔로잉 (Social)** | 사용자가 팔로우하는 해당 분야 인플루언서/전문가 목록 가로 스크롤. |
| **하단 네비게이션** | 홈, 카테고리, 찜, 마이페이지로 구성된 고정 탭바. |

## 3. UI/UX 디자인 가이드라인

* **레이아웃**: 다양한 크기의 카드가 배치되는 **Masonry 또는 Grid Layout** 적용. (카드별로 중요도에 따라 높이값이 다를 수 있음)
* **컬러 스키마**: 관심사(쿠킹-옐로우/오렌지)에 따라 메인 테마 컬러가 동적으로 변하는 테이밍 시스템 적용.
* **인터랙션**:
    * 커머스 카드의 '참여 중' 프로그레스 바 애니메이션.
    * Shorts 썸네일 호버 시(혹은 진입 시) 자동 재생 또는 마이크로 인터랙션.

## 4. 기술적 상세 설계 (SvelteKit 기반)

### 4.1. 라우팅 아키텍처
* **동적 라우팅**: `/interest/[interest_id]` 구조를 사용하여 `interest_id`에 따라 서버에서 데이터를 프리페칭(Prefetching)합니다.
* **Load Function**: `+page.server.ts`에서 해당 관심사의 위젯 구성 데이터(Layout JSON)와 개별 콘텐츠 데이터를 병렬로 호출하여 LCP를 최적화합니다.

### 4.2. 상태 관리 및 컴포넌트
* **Stores**: 사용자의 현재 관심사 상태 및 팔로잉 목록은 Svelte `writable` store로 관리.
* **Generic Component**: 커머스 카드나 게시글 카드는 다양한 버티컬에서 재사용 가능하도록 디자인 시스템(Atomic Design) 기반으로 설계.

### 4.3. 성능 최적화 (Performance)
* **Image Optimization**: SvelteKit의 이미지 처리 또는 외부 CDN을 활용하여 썸네일 용량 최소화.
* **Skeleton UI**: 위젯별로 데이터 로딩 속도가 다를 수 있으므로, 각 카드별로 개별 스켈레톤 UI 적용.

### 라이브러리
* **CSS**: Tailwind CSS
* **Icon**: Lucide React
* **Animation**: Framer Motion

## 5. 데이터 스키마 (예시)

```json
{
  "verticalId": "cooking",
  "themeColor": "#FFD54F",
  "widgets": [
    { "type": "group-buy", "data": { "title": "퀸센스 샤이니...", "discount": 15, "price": 15500 } },
    { "type": "shorts", "data": { "videoId": "v123", "views": "5.1K" } }
  ]
}
```

## 6. MVP

**개발해야할 페이지**
- interest/[interest_id]/home
  - 관심사 목데이터 (러닝, 메이크업, 테크)
  - 메이크업 관심사의 경우 위에서 언급된 모든 위젯을 포함한 홈 화면
  - 테크 관심사의 경우 홈 전체를 애플 브랜드 프로모션으로 구성
  - 러닝 관심사의 경우 쇼츠 콘텐츠가 강조된 홈 화면
- interest/[interest_id]/shorts
  - 러닝 관심사만 생성 (interest/running/shorts)
- interest/[interest_id]/shorts/[shorts_id]
  - 러닝 관심사에서 쇼츠 상세 페이지 (interest/running/shorts/shorts_id)이동 시 쇼츠 뷰어 노출
  - 쇼츠 뷰어 하단에 아이템 카드 캐로셀 노출, 아이템카드 선택시 바텀시트로 결제 정보 노출

