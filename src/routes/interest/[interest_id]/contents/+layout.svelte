<script lang="ts">
  import { page } from '$app/state';
  import { themeColors } from '$lib/stores/interest';
  
  let { children } = $props();

  const tabs = [
    { id: 'shorts', label: 'Shorts', path: 'shorts' },
    { id: 'commerce', label: '공구', path: 'commerce' },
    { id: 'community', label: '커뮤니티', path: 'community' }
  ];

  const isShortsRoute = $derived(page.url.pathname.includes('/contents/shorts'));
</script>

<div class="w-full flex flex-col h-full">
  {#if !isShortsRoute}
    <div class="px-5 py-3 overflow-x-auto scrollbar-hide flex items-center gap-2.5 shrink-0">
      {#each tabs as tab}
        <a 
          href={`/interest/${page.params.interest_id}/contents/${tab.path}`}
          class="whitespace-nowrap px-4 py-1.5 rounded-full font-bold text-[15px] transition-colors shadow-sm"
          style={page.url.pathname.includes(`/contents/${tab.path}`) 
            ? `background-color: ${$themeColors.primary}; color: white;` 
            : `background-color: ${$themeColors.primary}1A; color: ${$themeColors.primary};`}
        >
          {#if tab.id === 'shorts'}<span class="italic">{tab.label}</span>{:else}{tab.label}{/if}
        </a>
      {/each}
    </div>
  {/if}

  <div class="w-full flex-1 relative">
    {@render children()}
  </div>
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
