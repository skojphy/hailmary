import type { PageServerLoad } from './$types';
import { commerceData } from '$lib/data/mock/commerce';
import type { InterestArea } from '$lib/stores/interest';

export const load: PageServerLoad = async ({ params }) => {
  const interest = params.interest_id as InterestArea;
  
  return {
    interest,
    commerceItems: commerceData[interest] || []
  };
};
