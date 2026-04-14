<script lang="ts">
  interface BannerData {
    title: string;
    subtitle: string;
    imageUrl: string;
    backgroundColor: string;
    textColor: string;
  }
  
  let { data }: { data: BannerData } = $props();
</script>

<div 
  class="rounded-2xl overflow-hidden relative shadow-sm h-full min-h-[140px] flex items-center p-6"
  style="background-color: {data.backgroundColor}; color: {data.textColor};"
>
  <div class="relative z-10 w-[60%]">
    <p class="text-sm font-medium opacity-80 mb-1">{data.subtitle}</p>
    <h3 class="text-xl font-bold leading-tight mb-3">{data.title}</h3>
    <button class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors">
      자세히 보기
    </button>
  </div>
  
  <div class="absolute inset-0 z-0">
    <!-- Gradient overlay for text readability if needed -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
    <img src={data.imageUrl} alt={data.title} class="w-full h-full object-cover object-right" />
  </div>
</div>
