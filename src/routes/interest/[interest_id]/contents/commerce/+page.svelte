<script lang="ts">
  import { ShoppingBag } from 'lucide-svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>공구</title>
</svelte:head>

<div class="px-5 py-4 pb-24">
  <div class="flex items-center gap-2 mb-4 px-1">
    <ShoppingBag size={22} class="text-gray-900" />
    <h2 class="text-[19px] font-black text-gray-900 tracking-tight">추천 공동구매</h2>
  </div>
  
  <div class="flex flex-col gap-4">
    {#each data.commerceItems as item}
      <a href="#" class="block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div class="relative w-full aspect-[4/3]">
          <img src={item.data.imageUrl} alt={item.data.title} class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            핫딜
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-gray-800 line-clamp-2 leading-tight mb-2">{item.data.title}</h3>
          <div class="flex flex-col gap-1 mb-3">
            <div class="flex items-end gap-1.5">
              <span class="text-sm text-gray-400 line-through">{item.data.originalPrice.toLocaleString()}원</span>
              <span class="text-[19px] font-black text-gray-900">{item.data.price.toLocaleString()}원</span>
            </div>
            <div class="text-sm font-bold text-red-500">{item.data.discountRate}% 할인</div>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2 mb-1.5 overflow-hidden">
            <div class="bg-blue-500 h-2 rounded-full" style={`width: ${(item.data.currentParticipants / item.data.targetParticipants) * 100}%`}></div>
          </div>
          <p class="text-xs text-gray-500 font-medium">달성 기준 {item.data.currentParticipants}/{item.data.targetParticipants}명 참석</p>
        </div>
      </a>
    {/each}
  </div>
</div>
