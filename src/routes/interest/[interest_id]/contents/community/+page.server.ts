import type { PageServerLoad } from './$types';
import { getCommunityWidget } from '$lib/data/mock';

export const load: PageServerLoad = async ({ params }) => {
  const interest = params.interest_id;
  
  return {
    interest,
    communityItems: getCommunityWidget(interest).data
  };
};
