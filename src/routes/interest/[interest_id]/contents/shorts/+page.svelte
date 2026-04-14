<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>러닝 쇼츠 피드</title>
</svelte:head>

<div class="px-3 py-4 pb-24">
  <div class="flex items-center justify-between mb-4 px-1">
    <h2 class="text-[19px] font-black text-gray-900 tracking-tight">트렌딩 쇼츠</h2>
  </div>
  
  <div class="grid grid-cols-2 gap-2">
    {#each data.shorts as short}
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href={`/interest/${data.interest}/shorts/${short.id}`} class="block relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-sm group">
        <img src={short.thumbnail} alt={short.title} class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        
        <!-- Top gradient for views -->
        <div class="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/60 to-transparent"></div>
        
        <!-- Bottom gradient for text -->
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div class="absolute top-2.5 right-2.5 text-white text-xs font-semibold drop-shadow-md">
          {short.views}
        </div>
        
        <div class="absolute bottom-3 left-3 right-3 text-white">
          <p class="text-[14px] font-semibold leading-tight line-clamp-2">{short.title}</p>
        </div>
      </a>
    {/each}
  </div>
</div>
