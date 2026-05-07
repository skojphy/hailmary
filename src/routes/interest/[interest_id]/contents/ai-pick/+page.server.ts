import type { PageServerLoad } from './$types';
import { aiPickData, type AiPickCard } from '$lib/data/mock/ai-pick';

export const load: PageServerLoad = async ({ params }) => {
	const interest = params.interest_id;

	return {
		interest,
		cards: (aiPickData as Record<string, { data: AiPickCard[] }>)[interest]?.data ?? []
	};
};
