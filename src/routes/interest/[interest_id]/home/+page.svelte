<script lang="ts">
  import CommerceCard from '$lib/components/widgets/CommerceCard.svelte';
  import CommunityPost from '$lib/components/widgets/CommunityPost.svelte';
  import ShortsPreview from '$lib/components/widgets/ShortsPreview.svelte';
  import FollowingList from '$lib/components/widgets/FollowingList.svelte';
  import BannerWidget from '$lib/components/widgets/BannerWidget.svelte';
  
  let { data } = $props();
</script>

<svelte:head>
  <title>대시보드 - {data.interest}</title>
</svelte:head>

<div class="flex flex-col gap-5 pt-4">
  <!-- Masonry Layout using CSS Columns -->
  <div class="px-3">
    <div class="columns-2 gap-3 space-y-3">
      {#each data.widgets as widget}
        <!-- Apply column-span: all to banner or other full row items -->
        <div 
          class="break-inside-avoid inline-block w-full"
          style={widget.type === 'banner' ? 'column-span: all; margin-bottom: 0.75rem;' : ''}
        >
          {#if widget.type === 'commerce'}
            <CommerceCard title={widget.title} data={widget.data} styles={widget.styles} />
          {:else if widget.type === 'community'}
            <CommunityPost title={widget.title} posts={widget.data} />
          {:else if widget.type === 'shorts'}
            <ShortsPreview title={widget.title} shorts={widget.data} />
          {:else if widget.type === 'banner'}
            <BannerWidget data={widget.data} />
          {/if}
        </div>
      {/each}
    </div>
  </div>
  
  <FollowingList />
</div>
