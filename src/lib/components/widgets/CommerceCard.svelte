<script lang="ts">
  import { themeColors } from '$lib/stores/interest';
  
  interface CommerceData {
    title: string;
    originalPrice: number;
    price: number;
    discountRate: number;
    currentParticipants?: number;
    targetParticipants?: number;
    imageUrl: string;
  }
  
  let { title, data, styles }: { title?: string, data: CommerceData, styles?: any } = $props();

  function formatPrice(price: number) {
    return price.toLocaleString() + '원';
  }
</script>

<div class="bg-white/90 backdrop-blur-md rounded-[20px] shadow-sm overflow-hidden flex flex-col p-3 h-full hover:shadow-md transition-shadow">
  {#if title}
    <h3 class="font-black text-[17px] text-gray-900 mb-2">{title}</h3>
  {/if}
  <div class="aspect-[4/3] w-full relative mb-3 rounded-xl overflow-hidden bg-gray-50">
    <img src={data.imageUrl} alt={data.title} class="object-cover w-full h-full" loading="lazy" />
  </div>
  
  <div class="flex flex-col flex-1">
    <h3 class="text-[15px] font-medium text-gray-700 leading-tight mb-2 flex-1">
      {data.title}
    </h3>
    
    <div class="mt-auto">
      <div class="flex items-baseline gap-1.5 mb-2">
        <span class="text-lg font-black text-red-500">{data.discountRate}%</span>
        <span class="text-xl font-black text-gray-900">{formatPrice(data.price)}</span>
      </div>
      
      {#if styles?.pillText}
        <div class={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${styles.pillColor}`}>
          {styles.pillText}
        </div>
      {/if}
    </div>
  </div>
</div>
