<script lang="ts">
	import { ArrowLeft, Heart, Share2, ShoppingBag, MessageCircle } from 'lucide-svelte';
	import BottomSheet from '$lib/components/widgets/BottomSheet.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	// data.shorts is an array of shorts video mocks
	// data.initialIndex is the index to start at

	let showBottomSheet = $state(false);
	let containerRef: HTMLDivElement;

	function formatPrice(price: number) {
		return price?.toLocaleString() + '원';
	}

	onMount(() => {
		if (containerRef && data.initialIndex > 0) {
			// scroll to the exact short
			const height = window.innerHeight;
			containerRef.scrollTo({ top: height * data.initialIndex, behavior: 'instant' });
		}
	});
</script>

<svelte:head>
	{#if data.shorts[data.initialIndex]}
		<title>쇼츠 - {data.shorts[data.initialIndex].title}</title>
	{/if}
</svelte:head>

<!-- Full Screen Swiper Container -->
<div
	bind:this={containerRef}
	class="fixed inset-0 z-50 bg-black max-w-md mx-auto overflow-y-auto snap-y snap-mandatory h-[100dvh] w-full scrollbar-hide"
>
	<!-- Back button overlay (Fixed at top) -->
	<div
		class="absolute top-0 inset-x-0 p-4 pt-12 z-20 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent pointer-events-none sticky"
	>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<a
			href={`../contents/shorts`}
			class="text-white p-2 pointer-events-auto rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
		>
			<ArrowLeft size={24} />
		</a>
		<span class="text-white font-bold text-lg drop-shadow-md">Shorts</span>
		<div class="w-10"></div>
	</div>

	{#each data.shorts as short, idx}
		<div
			class="w-full h-[100dvh] snap-start snap-always relative overflow-hidden bg-gray-900 border-b-2 border-black"
		>
			<!-- Video Mock (Using Thumbnail) -->
			<img src={short.thumbnail} alt={short.title} class="w-full h-full object-cover opacity-90" />

			<!-- Right Actions -->
			<div class="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
				<button
					class="flex flex-col items-center gap-1.5 text-white hover:text-red-400 transition-colors"
				>
					<div class="p-3 bg-black/40 backdrop-blur-md rounded-full shadow-lg">
						<Heart size={26} fill="currentColor" stroke="none" />
					</div>
					<span class="text-xs font-bold drop-shadow-md">1.2K</span>
				</button>
				<button
					class="flex flex-col items-center gap-1.5 text-white hover:text-gray-300 transition-colors"
				>
					<div class="p-3 bg-black/40 backdrop-blur-md rounded-full shadow-lg">
						<MessageCircle size={26} />
					</div>
					<span class="text-xs font-bold drop-shadow-md">45</span>
				</button>
				<button
					class="flex flex-col items-center gap-1.5 text-white hover:text-gray-300 transition-colors"
				>
					<div class="p-3 bg-black/40 backdrop-blur-md rounded-full shadow-lg">
						<Share2 size={26} />
					</div>
					<span class="text-xs font-bold drop-shadow-md">공유</span>
				</button>
			</div>

			<!-- Bottom Info & Item Carousel -->
			<div
				class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-safe z-10 pointer-events-none"
			>
				<div class="px-5 mb-5 w-[80%]">
					<h2 class="text-white font-bold text-lg leading-tight mb-2 drop-shadow-md line-clamp-2">
						{short.title}
					</h2>
					<p class="text-gray-300 text-sm font-medium">조회수 {short.views}</p>
				</div>

				{#if data.relatedItem}
					<div class="px-4 pb-6 pointer-events-auto">
						<div class="flex items-center gap-1.5 mb-2 pl-1">
							<span class="text-white bg-red-500 text-[10px] px-1.5 py-0.5 rounded font-bold"
								>HOT</span
							>
							<p class="text-white/90 text-xs font-bold">영상 속 추천 아이템</p>
						</div>

						<button
							class="w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98] transition-transform shadow-lg"
							onclick={() => (showBottomSheet = true)}
						>
							<img
								src={data.relatedItem.imageUrl}
								alt="Item"
								class="w-14 h-14 rounded-[10px] object-cover bg-black/20"
							/>
							<div class="flex-1 text-left">
								<p class="text-white text-[15px] font-semibold line-clamp-1 mb-0.5">
									{data.relatedItem.title}
								</p>
								<div class="flex flex-wrap items-center gap-1.5">
									<span class="text-[13px] font-black text-red-400"
										>{data.relatedItem.discountRate}%</span
									>
									<span class="text-[15px] font-bold text-white"
										>{formatPrice(data.relatedItem.price)}</span
									>
								</div>
							</div>
							<div
								class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0"
							>
								<ShoppingBag size={18} strokeWidth={2.5} />
							</div>
						</button>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<!-- Bottom Sheet for Purchase -->
<div class="relative z-[60]">
	<BottomSheet bind:isOpen={showBottomSheet} title="옵션 선택">
		{#if data.relatedItem}
			<div class="flex flex-col gap-6">
				<div class="flex gap-4">
					<img
						src={data.relatedItem.imageUrl}
						alt="Item"
						class="w-24 h-24 rounded-2xl object-cover border border-gray-100"
					/>
					<div class="flex-1 pt-1">
						<h4 class="text-[15px] text-gray-900 font-bold leading-tight mb-2">
							{data.relatedItem.title}
						</h4>
						<span class="line-through text-xs text-gray-400 block mb-0.5"
							>{formatPrice(data.relatedItem.originalPrice)}</span
						>
						<div class="flex items-baseline gap-1.5">
							<span class="text-lg font-black text-red-500">{data.relatedItem.discountRate}%</span>
							<span class="text-2xl font-black text-gray-900 leading-none"
								>{formatPrice(data.relatedItem.price)}</span
							>
						</div>
					</div>
				</div>

				<div class="border-t border-gray-100 pt-5">
					<p class="text-[15px] font-bold text-gray-900 mb-3 block">패키지 옵션</p>
					<select
						class="w-full border-2 border-gray-200 rounded-xl p-3.5 text-[15px] font-medium text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors appearance-none bg-gray-50"
					>
						<option>기본 10팩 패키지</option>
						<option>대용량 30팩 세트 (+20,000원)</option>
					</select>
				</div>

				<button
					class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-[17px] mt-2 mb-2 hover:bg-blue-700 active:scale-[0.98] transition-transform shadow-md"
				>
					구매하기
				</button>
			</div>
		{/if}
	</BottomSheet>
</div>

<style>
	.pb-safe {
		padding-bottom: env(safe-area-inset-bottom, 32px);
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
