import { getCommerceItems, getShortsWidget } from '$lib/data/mock';

export async function load({ params }) {
  const interest = params.interest_id;
  const shortsWidget = getShortsWidget(interest);
  const commerceItems = getCommerceItems(interest);

  return {
    interest,
    shorts: shortsWidget.data,
    relatedItem: commerceItems[0]?.data
  };
}
