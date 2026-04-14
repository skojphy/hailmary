import { mockWidgets } from '$lib/data/mock';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { interest_id, shorts_id } = params;
  
  if (interest_id !== 'running') {
    throw error(404, 'Not found');
  }

  const shortsWidget = mockWidgets.running.find(w => w.type === 'shorts');
  const commerceWidget = mockWidgets.running.find(w => w.type === 'commerce');
  
  const shorts = shortsWidget ? shortsWidget.data : [];
  const initialIndex = shorts.findIndex((s: any) => s.id === shorts_id);

  if (initialIndex === -1) {
    throw error(404, 'Short not found');
  }

  return {
    interest: interest_id,
    shorts,
    initialIndex,
    relatedItem: commerceWidget?.data
  };
}
