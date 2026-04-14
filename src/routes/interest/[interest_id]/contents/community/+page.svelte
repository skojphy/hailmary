<script lang="ts">
  import { MessageCircle, Eye, HandHeart } from 'lucide-svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>커뮤니티</title>
</svelte:head>

<div class="px-5 py-4 pb-24">
  <div class="flex items-center gap-2 mb-4 px-1">
    <MessageCircle size={22} class="text-gray-900" />
    <h2 class="text-[19px] font-black text-gray-900 tracking-tight">핫한 게시물</h2>
  </div>
  
  <div class="flex flex-col gap-3">
    {#each data.communityItems as post}
      <a href="#" class="block bg-white p-4 border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors">
        <h3 class="font-bold text-[16px] text-gray-900 mb-2 leading-snug">{post.title}</h3>
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-gray-500">{post.author}</span>
          <div class="flex items-center gap-3 text-gray-400 text-xs font-medium">
            <span class="flex items-center gap-1"><Eye size={14} />{post.views}</span>
            <span class="flex items-center gap-1"><MessageCircle size={14} />{post.comments}</span>
          </div>
        </div>
      </a>
    {/each}
  </div>
  
  <button class="mt-6 w-full py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors">
    <HandHeart size={18} /> 더 많은 이야기 보기
  </button>
</div>
