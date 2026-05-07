import { interestHomeThemes } from '$lib/data/interest-home';
import { getMockWidgets } from '$lib/data/mock';
import { getAiPickCards } from '$lib/data/mock/ai-pick';
import { INTERESTS } from '$lib/data/interests';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const interest = params.interest_id;
	const aiPickCards = getAiPickCards(interest);

	if (!INTERESTS.some((item) => item.id === interest)) {
		throw error(404, 'Interest not found');
	}

	return {
		interest,
		theme: interestHomeThemes[interest],
		aiGuide: aiPickCards[0] ?? null,
		aiPick: aiPickCards[1] ?? aiPickCards[0] ?? null,
		widgets: getMockWidgets(interest)
	};
}
