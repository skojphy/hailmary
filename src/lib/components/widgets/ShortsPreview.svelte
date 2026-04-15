<script lang="ts">
	import { Eye } from 'lucide-svelte';

	interface ShortData {
		id: string;
		title: string;
		views: string;
		thumbnail: string;
	}

	let { title = 'Shorts', shorts = [] }: { title?: string; shorts: ShortData[] } = $props();
</script>

<div
	class="bg-white/90 backdrop-blur-md rounded-[20px] shadow-sm flex flex-col p-3 h-full hover:shadow-md transition-shadow"
>
	<div class="flex items-center mb-3 px-1">
		<h3 class="font-black italic text-[19px] text-gray-900 tracking-tight">
			{title}
		</h3>
	</div>

	{#if shorts.length > 0}
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			href={`./contents/shorts`}
			class="relative w-full aspect-[3/4] rounded-[14px] overflow-hidden group block"
		>
			<img
				src={shorts[0].thumbnail}
				alt={shorts[0].title}
				class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
			/>
			<!-- Top gradient for views -->
			<div
				class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent"
			></div>

			<!-- Bottom gradient for text -->
			<div
				class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
			></div>

			<!-- Views Badge -->
			<div
				class="absolute top-2.5 right-2.5 flex items-center gap-1 text-white text-xs font-semibold"
			>
				<Eye size={14} />
				<span>{shorts[0].views}</span>
			</div>

			<!-- Title -->
			<div class="absolute bottom-3 left-3 right-3 text-white">
				<p class="text-[15px] font-semibold line-clamp-3 leading-snug text-gray-100">
					{shorts[0].title}
				</p>
			</div>
		</a>
	{/if}
</div>
