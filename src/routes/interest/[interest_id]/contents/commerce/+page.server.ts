import type { PageServerLoad } from './$types';
import { getCommerceItems } from '$lib/data/mock';

export const load: PageServerLoad = async ({ params }) => {
  const interest = params.interest_id;
  
  return {
    interest,
    commerceItems: getCommerceItems(interest)
  };
};
