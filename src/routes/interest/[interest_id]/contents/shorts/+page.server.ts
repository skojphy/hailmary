import { mockWidgets } from '$lib/data/mock';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const interest = params.interest_id;
  
  const shortsWidget = mockWidgets[interest as keyof typeof mockWidgets]?.find(w => w.type === 'shorts');
  const commerceWidget = mockWidgets[interest as keyof typeof mockWidgets]?.find(w => w.type === 'commerce');

  return {
    interest,
    shorts: shortsWidget ? shortsWidget.data : [],
    relatedItem: commerceWidget?.data
  };
}
