import type { PageServerLoad } from './$types';
import { getCommunityWidget } from '$lib/data/mock';
import { aiPickData, type AiPickCard } from '$lib/data/mock/ai-pick';

export const load: PageServerLoad = async ({ params }) => {
  const interest = params.interest_id;
  const communityItems = getCommunityWidget(interest).data;
  const aiPick = (aiPickData as Record<string, { data: AiPickCard[] }>)[interest]?.data?.[0] ?? null;
  
  return {
    interest,
    communityItems,
    aiGuide: aiPick
  };
};
