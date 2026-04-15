import { interestHomeThemes } from '$lib/data/interest-home';
import { getMockWidgets } from '$lib/data/mock';
import { INTERESTS } from '$lib/data/interests';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const interest = params.interest_id;

	if (!INTERESTS.some((item) => item.id === interest)) {
		throw error(404, 'Interest not found');
	}

	return {
		interest,
		theme: interestHomeThemes[interest],
		widgets: getMockWidgets(interest)
	};
}
