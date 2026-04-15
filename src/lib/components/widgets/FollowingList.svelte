<script lang="ts">
	import { User } from 'lucide-svelte';
	import { following } from '$lib/stores/interest';
</script>

<div class="px-3 pb-8 mt-2">
	<div class="bg-[#FFEDF2] rounded-[32px] p-6 shadow-sm border border-pink-100/50">
		<div class="mb-6 flex items-center justify-center">
			<h3 class="font-black text-[28px] text-gray-900 flex items-center gap-2 gumi">
				💘 나의 팔로잉
			</h3>
		</div>

		<div class="grid grid-cols-2 gap-x-4 gap-y-8 mb-8">
			{#each $following as user}
				<div class="flex flex-col items-center">
					<div class="relative mb-3">
						<div
							class="w-[110px] h-[110px] rounded-full overflow-hidden border-4 border-white shadow-sm bg-white"
						>
							<img src={user.imageUrl} alt={user.name} class="w-full h-full object-cover" />
						</div>
					</div>
					<div class="flex flex-col items-center gap-0.5">
						<span class="text-[17px] font-black text-gray-900">{user.name}</span>
						<div class="flex items-center gap-1 text-gray-400 font-bold text-[13px]">
							<User size={14} strokeWidth={3} class="text-gray-300" />
							<span>{user.followers}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<button
			class="w-full bg-white py-4 rounded-[20px] shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-1"
		>
			<span class="text-[16px] text-gray-400 font-medium tracking-tight">
				더 많은 <span class="text-gray-900 font-black">인플루언서</span> 보기
			</span>
		</button>
	</div>
</div>
