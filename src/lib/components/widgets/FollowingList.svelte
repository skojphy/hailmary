<script lang="ts">
  import { User } from 'lucide-svelte';
  import { following } from '$lib/stores/interest';
</script>

<div class="pt-6 pb-2 w-full bg-white/40 mt-4 rounded-t-3xl backdrop-blur-md border-t border-white/60">
  <div class="px-5 mb-4 flex items-center gap-1.5">
    <h3 class="font-black text-[19px] text-gray-900 flex items-center">
      💘 나의 팔로잉 
      <span class="text-blue-500 ml-2">12</span>
    </h3>
  </div>
  
  <ul class="flex gap-4 overflow-x-auto px-5 pb-4 snap-x scrollbar-hide">
    {#each $following as user}
      <li class="snap-start flex flex-col items-center gap-2 w-[72px] flex-shrink-0">
        <button class="relative rounded-full transition-transform active:scale-95 shadow-md border-2 border-transparent hover:border-gray-300">
          <div class="w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-100">
            <img src={user.imageUrl} alt={user.name} class="w-full h-full object-cover" />
          </div>
        </button>
        <div class="flex flex-col items-center">
          <span class="text-[13px] font-bold text-gray-900 w-full truncate text-center">{user.name}</span>
          <span class="text-[9px] font-semibold text-gray-400 mt-0.5 flex items-center gap-[2px]">
            <User size={9} strokeWidth={3} /> {user.followers}
          </span>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
