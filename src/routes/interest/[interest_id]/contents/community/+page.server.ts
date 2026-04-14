import type { PageServerLoad } from './$types';
import { communityData } from '$lib/data/mock/community';
import type { InterestArea } from '$lib/stores/interest';

export const load: PageServerLoad = async ({ params }) => {
  const interest = params.interest_id as InterestArea;
  
  return {
    interest,
    communityItems: communityData[interest]?.data || []
  };
};
