<script lang="ts">
	import {
		Heart,
		Share2,
		MessageCircle,
		X,
		BarChart2,
		BadgeCheck,
		VolumeX,
		Volume2
	} from 'lucide-svelte';
	import BottomSheet from '$lib/components/widgets/BottomSheet.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let showBottomSheet = $state(false);
	let isMuted = $state(true);
	let containerRef: HTMLDivElement;
	let activeIndex = $state(data.initialIndex ?? 0);

	function handleScroll() {
		if (!containerRef) return;
		const scrollTop = containerRef.scrollTop;
		const height = window.innerHeight;
		// 각 쇼츠의 top 위치와 중앙 위치 비교
		let minDiff = Infinity;
		let foundIdx = 0;
		for (let i = 0; i < data.shorts.length; i++) {
			const top = i * height;
			const center = scrollTop + height / 2;
			const diff = Math.abs(top + height / 2 - center);
			if (diff < minDiff) {
				minDiff = diff;
				foundIdx = i;
			}
		}
		if (activeIndex !== foundIdx) activeIndex = foundIdx;
	}

	function formatPrice(price: number) {
		return price?.toLocaleString() + '원';
	}

	onMount(() => {
		if (containerRef && data.initialIndex > 0) {
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
	onscroll={handleScroll}
>
	<!-- Global Top Overlays (Badges & Close) -->
	<div
		class="fixed top-0 inset-x-0 p-4 pt-6 z-[70] flex items-center justify-between pointer-events-none max-w-md mx-auto"
	>
		<!-- Left: Badges -->
		<div class="bg-black/30 rounded-sm flex items-center pointer-events-auto">
			<div class="bg-[#0085CC] px-3 py-1.5 rounded-sm flex items-center justify-center shadow-lg">
				<span class="text-white font-black text-[15px] italic">Shorts</span>
			</div>
			<div class="mx-3">
				<span class="text-white/80 font-bold text-[14px]"
					>{data.shorts[activeIndex]?.views ?? ''} 시청</span
				>
			</div>
		</div>

		<!-- Right: Utility Icons -->
		<div class="flex items-center pointer-events-auto text-white">
			<button class="p-2 active:scale-95 transition-transform drop-shadow-lg">
				<img src="/images/pictureinpicture.png" width="32px" height="32px" alt="PIP" />
			</button>
			<a href="../contents/shorts" class="p-2 active:scale-95 transition-transform drop-shadow-lg">
				<X size={32} />
			</a>
		</div>
	</div>

	{#each data.shorts as short (short.id)}
		<div class="w-full h-[100dvh] snap-start snap-always relative overflow-hidden bg-black">
			<!-- Video Mock (Using Thumbnail) -->
			<img src={short.thumbnail} alt={short.title} class="w-full h-full object-cover" />

			<!-- Right Actions Sidebar -->
			<div
				class="absolute right-4 bottom-36 flex flex-col items-center gap-2 z-[60] pointer-events-auto"
			>
				<!-- Analysis -->
				<button class="flex flex-col items-center gap-1 group">
					<div
						class="w-12 h-12 flex items-center justify-center text-white drop-shadow-lg group-active:scale-90 transition-transform"
					>
						<BarChart2 size={24} strokeWidth={2.5} />
					</div>
					<span class="text-white text-[13px] font-bold drop-shadow-md">분석</span>
				</button>

				<!-- Author Avatar -->
				<button
					class="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-xl active:scale-90 transition-transform mb-2"
				>
					<img
						src="https://images.unsplash.com/photo-1577807002746-2aa23cf2d134?auto=format&fit=crop&w=120&q=80"
						alt="Author"
						class="w-full h-full object-cover"
					/>
				</button>

				<!-- Mute Toggle -->
				<button
					class="w-12 h-12 flex items-center justify-center text-white drop-shadow-lg active:scale-90 transition-transform"
					onclick={() => (isMuted = !isMuted)}
				>
					{#if isMuted}
						<VolumeX size={24} strokeWidth={2.5} />
					{:else}
						<Volume2 size={24} strokeWidth={2.5} />
					{/if}
				</button>

				<!-- Like -->
				<button class="flex flex-col items-center gap-1 group">
					<div
						class="w-12 h-12 flex items-center justify-center text-white drop-shadow-lg group-active:scale-90 transition-transform"
					>
						<Heart size={24} strokeWidth={2.5} fill="white" />
					</div>
					<span class="text-white text-[15px] font-bold drop-shadow-md">560</span>
				</button>

				<!-- Comments -->
				<button class="flex flex-col items-center gap-1 group">
					<div
						class="w-12 h-12 flex items-center justify-center text-white drop-shadow-lg group-active:scale-90 transition-transform"
					>
						<MessageCircle size={24} strokeWidth={2.5} fill="white" />
					</div>
					<span class="text-white text-[15px] font-bold drop-shadow-md">40</span>
				</button>

				<!-- Share -->
				<button
					class="w-12 h-12 flex items-center justify-center text-white drop-shadow-lg active:scale-90 transition-transform"
				>
					<Share2 size={24} strokeWidth={2.5} />
				</button>
			</div>

			<!-- Bottom Content (Profile & Product Card) -->
			<div
				class="absolute bottom-0 inset-x-0 p-5 pb-8 z-[60] flex flex-col gap-4 pointer-events-none"
			>
				<!-- Profile & Description -->
				<div class="flex flex-col gap-2 drop-shadow-xl text-white pointer-events-auto">
					<div class="flex items-center gap-1.5">
						<span class="text-[19px] font-semibold drop-shadow-md">{short.creator}</span>
						<BadgeCheck size={18} fill="#0085CC" class="text-white" />
					</div>
					<div class="flex flex-col text-[15px] leading-tight opacity-95">
						{#each short.title.split('\n') as line (line)}
							<p>{line}</p>
						{/each}
					</div>
				</div>

				<!-- Product Display Card -->
				{#if data.relatedItem}
					<button
						class="w-full bg-white rounded-[8px] py-[8px] px-[10px] flex items-center gap-4 text-left shadow-2xl pointer-events-auto active:scale-[0.99] transition-transform"
						onclick={() => (showBottomSheet = true)}
					>
						<div
							class="w-16 h-16 bg-gray-50 rounded-[8px] overflow-hidden shadow-inner flex items-center justify-center border border-gray-100/50"
						>
							<img
								src={data.relatedItem.imageUrl}
								alt={data.relatedItem.title}
								class="w-14 h-14 object-contain"
							/>
						</div>
						<div class="flex-1 flex flex-col gap-1">
							<p class="text-[15px] text-gray-800 line-clamp-1">
								{data.relatedItem.title}
							</p>
							<div class="flex items-center gap-1">
								<span class="text-[17px] text-red-600">{data.relatedItem.discountRate}%</span>
								<span class="text-[18px] font-black text-red-600"
									>{formatPrice(data.relatedItem.price)}</span
								>
							</div>
						</div>
					</button>
				{/if}
			</div>

			<!-- Very Bottom Progress Scrubber -->
			<div class="absolute bottom-1 inset-x-0 h-[2px] bg-white/20 z-[80]">
				<div class="h-full bg-white shadow-[0_0_8px_white]" style="width: 30%"></div>
			</div>
		</div>
	{/each}
</div>

<!-- Bottom Sheet for Purchase (Redesign) -->
<div class="relative z-[100]">
	<BottomSheet bind:isOpen={showBottomSheet}>
		{#if data.relatedItem}
			<div class="flex flex-col gap-2 p-2">
				<!-- 이미지/슬라이더 & GIF 뱃지 -->
				<div class="relative gap-3" style="overflow-x: scroll;">
					<div class="flex gap-3" style="width: max-content;">
						<div class="bg-white rounded-xl flex items-center justify-center">
							<img
								src={data.relatedItem.imageUrl}
								alt="상품"
								class="w-[144px] h-[144px] object-contain"
							/>
						</div>
						<div class="bg-white rounded-xl flex items-center justify-center opacity-60">
							<img
								src={data.relatedItem.imageUrl}
								alt="상품"
								class="w-[144px] h-[144px] object-contain"
							/>
						</div>
						<div class="bg-white rounded-xl flex items-center justify-center opacity-60">
							<img
								src={data.relatedItem.imageUrl}
								alt="상품"
								class="w-[144px] h-[144px] object-contain"
							/>
						</div>
					</div>
				</div>

				<!-- 상품명 -->
				<div class="text-[16px] text-gray-900 mt-1">{data.relatedItem.title}</div>

				<!-- 가격 -->
				<div class="text-[18px] font-extrabold text-red-600 mb-1">
					{formatPrice(data.relatedItem.price)}
				</div>

				<div class="flex justify-between items-center">
					<!-- 수량 조절 -->
					<div class="flex gap-2 items-center">
						<button
							class="w-[32px] h-[32px] rounded-full border border-gray-400 flex items-center justify-center text-2xl text-gray-500"
							>-</button
						>
						<span class="w-8 text-center rounded-[4px] text-[18px] bg-gray-100">1</span>
						<button
							class="w-[32px] h-[32px] rounded-full border border-gray-400 flex items-center justify-center text-2xl text-gray-500"
							>+</button
						>
					</div>
					<!-- 버튼 영역 -->
					<div class="flex gap-2 items-center">
						<button
							class="flex-1 rounded-lg border border-gray-300 bg-white text-gray-700 text-[16px] py-[6px] px-[8px]"
							>취소</button
						>
						<button class="flex-1 rounded-lg bg-green-500 text-white text-[16px] py-[6px] px-[8px]"
							>변경</button
						>
					</div>
				</div>

				<!-- 카드혜택 -->
				<div class="flex items-center gap-2 mt-4">
					<img
						src="/images/samsung-card-logo.png"
						alt="삼성카드"
						class="w-10 h-6 object-contain rounded-md p-0.5"
					/>
					<span class="text-[15px] font-bold text-gray-700">G마켓 삼성카드</span>
					<span class="text-[13px] text-gray-400">949* 일시불</span>
				</div>

				<button
					class="w-full mt-4 py-4 rounded-xl text-white font-bold text-[20px]"
					style="background-color: #0028AC;">구매하기</button
				>
			</div>
		{/if}
	</BottomSheet>
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
