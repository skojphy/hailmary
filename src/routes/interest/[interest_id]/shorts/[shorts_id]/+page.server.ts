import { getCommerceItems, getShortsWidget } from '$lib/data/mock';
import { INTERESTS } from '$lib/data/interests';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { interest_id, shorts_id } = params;

	if (!INTERESTS.some((interest) => interest.id === interest_id)) {
		throw error(404, 'Not found');
	}

	const shortsWidget = getShortsWidget(interest_id);
	const commerceWidget = getCommerceItems(interest_id);

	const shorts = shortsWidget ? shortsWidget.data : [];
	const initialIndex = shorts.findIndex((s) => s.id === shorts_id);

	if (initialIndex === -1) {
		throw error(404, 'Short not found');
	}

	return {
		interest: interest_id,
		shorts,
		initialIndex,
		relatedItem: commerceWidget[0]?.data
	};
}
