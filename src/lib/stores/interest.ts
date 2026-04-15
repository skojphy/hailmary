import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import { INTERESTS, MAX_SELECTIONS } from '$lib/data/interests';

export type InterestArea = string;

const SELECTED_INTERESTS_STORAGE_KEY = 'hailmary:selected-interests';
const validInterestIds = new Set(INTERESTS.map((interest) => interest.id));

function sanitizeSelectedInterests(interests: string[]) {
	return interests.filter((interest, index, items) => {
		return validInterestIds.has(interest) && items.indexOf(interest) === index && index < MAX_SELECTIONS;
	});
}

function readSelectedInterests() {
	if (!browser) return [];

	try {
		const raw = window.localStorage.getItem(SELECTED_INTERESTS_STORAGE_KEY);

		if (!raw) return [];

		const parsed = JSON.parse(raw);

		return Array.isArray(parsed) ? sanitizeSelectedInterests(parsed) : [];
	} catch {
		return [];
	}
}

// 현재 사용자의 관심사
export const currentInterest = writable<InterestArea>('running');
export const selectedInterests = writable<InterestArea[]>(readSelectedInterests());

if (browser) {
	selectedInterests.subscribe((value) => {
		window.localStorage.setItem(
			SELECTED_INTERESTS_STORAGE_KEY,
			JSON.stringify(sanitizeSelectedInterests(value))
		);
	});
}

export function setSelectedInterests(interests: string[]) {
	selectedInterests.set(sanitizeSelectedInterests(interests));
}

// 관심사에 따른 테마 색상 (예시)
export const themeColors = derived(currentInterest, ($target) => {
  switch ($target) {
    case 'running':
      return { 
        primary: '#0072B4', 
        name: 'Blue', 
        background: 'bg-blue-50',
        gradient: 'linear-gradient(90deg, #0072B4 0%, #83CAFF 100%)'
      };
    case 'makeup':
      return { 
        primary: '#DA009F', 
        name: 'Pink', 
        background: 'bg-pink-50',
        gradient: 'linear-gradient(90deg, #DA009F 0%, #FF61ED 100%)'
      };
    case 'tech':
      return { 
        primary: '#333333', 
        name: 'DarkGray', 
        background: 'bg-gray-50',
        gradient: 'linear-gradient(90deg, #333333 61%, #999999 100%)'
      };
    default:
      return { 
        primary: '#14B8A6', 
        name: 'Teal', 
        background: 'bg-teal-50',
        gradient: 'linear-gradient(90deg, #14B8A6 0%, #5EEAD4 100%)'
      };
  }
});

// 사용자의 팔로잉 목록 스토어
export const following = writable([
  { id: '1', name: '맛피자', followers: '49,241명', imageUrl: 'https://i.pravatar.cc/150?u=12' },
  { id: '2', name: '윤남노', followers: '12,913명', imageUrl: 'https://i.pravatar.cc/150?u=15' },
  { id: '3', name: '손종원', followers: '89,483명', imageUrl: 'https://i.pravatar.cc/150?u=16' },
  { id: '4', name: '아기맹수', followers: '1,512명', imageUrl: 'https://i.pravatar.cc/150?u=19' },
]);
