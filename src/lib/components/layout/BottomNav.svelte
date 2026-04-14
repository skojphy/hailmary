<script lang="ts">
  import { Home, LayoutGrid, Heart, User } from 'lucide-svelte';
  import { currentInterest, themeColors } from '$lib/stores/interest';
  import { page } from '$app/state';

  // page store in svelte 5 might be imported from '$app/state' or we can pass active states.
  // For simplicity, we assume we check the current path.
</script>

<nav class="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white pb-safe z-50">
  <div class="flex items-center justify-around h-16 px-2">
    <!-- Home is active when on /home -->
    <a 
      href={`/interest/${$currentInterest}/home`} 
      class="flex items-center justify-center w-full h-full transition-colors"
      class:text-blue-600={page.url.pathname.includes('/home')}
      class:text-gray-800={!page.url.pathname.includes('/home')}
    >
      <Home size={32} fill={page.url.pathname.includes('/home') ? 'currentColor' : 'none'} />
    </a>
    <a 
      href={`/interest/${$currentInterest}/contents/shorts`} 
      class="flex items-center justify-center w-full h-full transition-colors"
      class:text-blue-600={page.url.pathname.includes('/contents/')}
      class:text-gray-800={!page.url.pathname.includes('/contents/')}
    >
      <LayoutGrid size={32} fill={page.url.pathname.includes('/contents/') ? 'currentColor' : 'none'} />
    </a>
    <button class="flex items-center justify-center w-full h-full text-gray-800 hover:text-gray-900 transition-colors">
      <Heart size={32} />
    </button>
    <button class="flex items-center justify-center w-full h-full text-gray-800 hover:text-gray-900 transition-colors">
      <User size={32} />
    </button>
  </div>
</nav>

<style>
  /* iOS Safe Area */
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
