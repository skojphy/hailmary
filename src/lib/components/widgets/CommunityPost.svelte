<script lang="ts">
  interface PostData {
    id: string;
    author: string;
    title: string;
    views: string;
    viewers?: string;
    date?: string;
  }
  
  let { title = "인기글", posts = [] }: { title?: string, posts: PostData[] } = $props();
</script>

<div class="bg-white/90 backdrop-blur-md rounded-[20px] shadow-sm flex flex-col p-4 h-full hover:shadow-md transition-shadow">
  <div class="flex items-center justify-between mb-4">
    <h3 class="font-black text-[17px] text-gray-900">{title}</h3>
    {#if posts[0]?.date}
      <span class="text-xs font-semibold text-gray-500">{posts[0].date}</span>
    {/if}
  </div>
  
  <ul class="flex flex-col gap-3 flex-1 justify-center">
    {#each posts as post}
      <li class="group cursor-pointer">
        <a href="#/" class="text-[17px] font-bold text-blue-500 leading-tight block mb-2 underline decoration-blue-500 underline-offset-2">
          {post.title}
        </a>
        <div class="flex items-center text-xs font-medium text-gray-500 mb-3">
          <span>{post.views}</span>
          {#if post.viewers}
            <span class="mx-1.5 font-normal text-gray-300">·</span>
            <span>{post.viewers}</span>
          {/if}
        </div>
        <div class="text-[13px] text-gray-500 font-medium">
          {post.author}
        </div>
      </li>
    {/each}
  </ul>
</div>
