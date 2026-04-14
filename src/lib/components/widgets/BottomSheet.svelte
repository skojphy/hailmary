<script lang="ts">
  import { slide, fade } from 'svelte/transition';
  import { X } from 'lucide-svelte';

  let { isOpen = $bindable(false), title = '', children } = $props();

  function close() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_consider_explicit_label -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    onclick={close}
  ></div>

  <!-- Sheet -->
  <div 
    class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-w-md mx-auto overflow-hidden flex flex-col max-h-[85vh]"
    transition:slide={{ duration: 300, axis: 'y' }}
  >
    <!-- Handle -->
    <div class="flex justify-center pt-3 pb-2 w-full touch-none" onclick={close}>
      <div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
    </div>
    
    <div class="px-5 pb-3 pt-1 flex items-center justify-between border-b border-gray-100">
      <h3 class="font-bold text-lg text-gray-900">{title}</h3>
      <button onclick={close} class="p-1 rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
        <X size={20} />
      </button>
    </div>

    <div class="overflow-y-auto w-full p-5 flex-1">
      {@render children()}
    </div>
  </div>
{/if}
