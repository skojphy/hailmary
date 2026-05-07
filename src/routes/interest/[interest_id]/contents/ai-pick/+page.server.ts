import type { PageServerLoad } from './$types';
import { getAiPickCards } from '$lib/data/mock/ai-pick';

export const load: PageServerLoad = async ({ params }) => {
	const interest = params.interest_id;

	return {
		interest,
		cards: getAiPickCards(interest)
	};
};
