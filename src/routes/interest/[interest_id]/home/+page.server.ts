import { interestHomeThemes } from '$lib/data/interest-home';
import { mockWidgets } from '$lib/data/mock';
import type { InterestArea } from '$lib/stores/interest';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const interest = params.interest_id as InterestArea;

	if (!['running', 'makeup', 'tech'].includes(interest)) {
		throw error(404, 'Interest not found');
	}

	return {
		interest,
		theme: interestHomeThemes[interest],
		widgets: mockWidgets[interest] || []
	};
}
