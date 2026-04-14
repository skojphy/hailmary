<script lang="ts">
  import Header from '$lib/components/layout/Header.svelte';
  import BottomNav from '$lib/components/layout/BottomNav.svelte';
  import { currentInterest, themeColors, type InterestArea } from '$lib/stores/interest';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { page as pageStore } from '$app/stores';

  let { children } = $props();
  
  // pageStore ($page) is the reactive way to access route params in standard Sveltekit unless data is passed
  // We'll sync the current interest store with URL params
  $effect(() => {
    if ($pageStore.params.interest_id) {
      const interest = $pageStore.params.interest_id as InterestArea;
      if (['running', 'makeup', 'tech'].includes(interest) && $currentInterest !== interest) {
        currentInterest.set(interest);
      }
    }
  });
</script>

<div class={`min-h-screen flex flex-col mx-auto w-full max-w-md shadow-2xl relative ${$themeColors.background}`} style="--theme-primary: {$themeColors.primary}">
  <Header />

  <main class="flex-1 pb-20 w-full overflow-x-hidden relative">
    {@render children()}
  </main>

  <BottomNav />
</div>

<style>
  :global(body) {
    background-color: #f9fafb;
  }
</style>
