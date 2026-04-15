import { INTERESTS } from '$lib/data/interests';
import { getInterestPhotoSet } from '$lib/data/interest-photo-library';
import { shortsData } from './mock/shorts';
import { commerceData } from './mock/commerce';
import { communityData } from './mock/community';

export interface WidgetData {
	id: string;
	type: 'commerce' | 'community' | 'shorts' | 'following' | 'banner';
	title?: string;
	data: any;
	styles?: {
		pillText?: string;
		pillColor?: string;
	};
}

const interestById = new Map(INTERESTS.map((interest) => [interest.id, interest]));

function hashString(input: string) {
	return Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function pick<T>(items: T[], seed: number) {
	return items[seed % items.length];
}

function getInterestInfo(interestId: string) {
	const interest = interestById.get(interestId);

	return {
		id: interestId,
		label: interest?.label ?? '관심사',
		emoji: interest?.emoji.split(' ')[0] ?? '✨'
	};
}

function createFallbackCommerceWidgets(interestId: string): WidgetData[] {
	const interest = getInterestInfo(interestId);
	const seed = hashString(interestId);
	const photoSet = getInterestPhotoSet(interestId);

	return Array.from({ length: 4 }, (_, index) => ({
		id: `${interestId}-c${index + 1}`,
		type: 'commerce',
		title: `${interest.label} 추천 공동구매`,
		data: {
			title: `${interest.label} 좋아하는 사람들이 많이 보는 추천 아이템 ${index + 1}`,
			originalPrice: (seed + index * 9) * 1900,
			price: (seed + index * 7) * 1200,
			discountRate: 12 + ((seed + index) % 28),
			currentParticipants: 90 + ((seed + index * 17) % 420),
			targetParticipants: 300 + ((seed + index * 43) % 800),
			imageUrl: pick(photoSet.productImages, seed + index)
		}
	}));
}

function createFallbackCommunityWidget(interestId: string): WidgetData {
	const interest = getInterestInfo(interestId);
	const seed = hashString(interestId);

	return {
		id: `${interestId}-community`,
		type: 'community',
		title: `${interest.label} 커뮤니티`,
		data: Array.from({ length: 6 }, (_, index) => ({
			id: `${interestId}-p${index + 1}`,
			author: `${interest.label}메이트${index + 1}`,
			title: `${interest.label} 좋아하는 사람들이 요즘 많이 이야기하는 주제 ${index + 1}`,
			views: `${0.4 + ((seed + index) % 9) / 10}K`,
			comments: 10 + ((seed + index * 7) % 120)
		}))
	};
}

function createFallbackShortsWidget(interestId: string): WidgetData {
	const interest = getInterestInfo(interestId);
	const seed = hashString(interestId);
	const photoSet = getInterestPhotoSet(interestId);

	return {
		id: `${interestId}-shorts`,
		type: 'shorts',
		title: `${interest.label} Shorts`,
		data: Array.from({ length: 6 }, (_, index) => ({
			id: `${interestId}-v${index + 1}`,
			title: `${interest.label} 좋아하면 저장하는\n짧은 영상 ${index + 1}`,
			views: `${0.8 + ((seed + index) % 6)}K`,
			duration: `00:${String(14 + ((seed + index * 3) % 20)).padStart(2, '0')}`,
			creator: `@${interestId.replace(/-/g, '')}${index + 1}`,
			liked: index === 1,
			thumbnail: pick(photoSet.shortsImages, seed + index)
		}))
	};
}

const bannerData: Record<string, WidgetData[]> = {
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
				textColor: '#FFFFFF'
			}
		}
	]
};

export function getCommerceItems(interestId: string): WidgetData[] {
	return (commerceData as Record<string, WidgetData[]>)[interestId] ?? createFallbackCommerceWidgets(interestId);
}

export function getCommunityWidget(interestId: string): WidgetData {
	return (communityData as Record<string, WidgetData>)[interestId] ?? createFallbackCommunityWidget(interestId);
}

export function getShortsWidget(interestId: string): WidgetData {
	return (shortsData as Record<string, WidgetData>)[interestId] ?? createFallbackShortsWidget(interestId);
}

export function getMockWidgets(interestId: string): WidgetData[] {
	return [
		...((bannerData as Record<string, WidgetData[]>)[interestId] ?? []),
		...getCommerceItems(interestId),
		getShortsWidget(interestId),
		getCommunityWidget(interestId)
	];
}

export const mockWidgets: Record<string, WidgetData[]> = Object.fromEntries(
	INTERESTS.map((interest) => [interest.id, getMockWidgets(interest.id)])
);
