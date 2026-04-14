import type { InterestArea } from '$lib/stores/interest';
import { shortsData } from './mock/shorts';
import { commerceData } from './mock/commerce';
import { communityData } from './mock/community';

export interface WidgetData {
  id: string;
  type: 'commerce' | 'community' | 'shorts' | 'following' | 'banner';
  title?: string;
  data: any;
}

const bannerData: Record<InterestArea, WidgetData[]> = {
  running: [],
  makeup: [],
  tech: [
    {
      id: 't_b1',
      type: 'banner',
      data: {
        title: 'Apple Week 기획전',
        subtitle: '최대 20% 추가 카드 할인',
        imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80',
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      },
    }
  ]
};

export const mockWidgets: Record<InterestArea, WidgetData[]> = {
  running: [
    shortsData.running,
    ...commerceData.running,
    communityData.running,
  ],
  makeup: [
    ...commerceData.makeup,
    shortsData.makeup,
    communityData.makeup,
  ],
  tech: [
    ...bannerData.tech,
    ...commerceData.tech,
    shortsData.tech,
    communityData.tech,
  ]
};
