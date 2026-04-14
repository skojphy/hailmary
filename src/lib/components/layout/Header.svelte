<script lang="ts">
	import { Heart, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { currentInterest, themeColors, type InterestArea } from '$lib/stores/interest';
	import { scale, fade } from 'svelte/transition';

	let showDropdown = $state(false);

	const interestLabels: Record<InterestArea, string> = {
		running: '🏃 러닝',
		makeup: '💄 메이크업',
		tech: '💻 테크'
	};

	const availableInterests: InterestArea[] = ['running', 'makeup', 'tech'];

	// Reorder to always put current interest at top
	let displayInterests = $derived([
		$currentInterest,
		...availableInterests.filter((i) => i !== $currentInterest)
	]);

	function selectInterest(interest: InterestArea) {
		if (interest === $currentInterest) {
			showDropdown = false; // Just close if clicking the top one
		} else {
			currentInterest.set(interest);
			showDropdown = false;
		}
	}

	function splitLabel(label: string) {
		const parts = label.split(' ');
		// parts[0] is the emoji, parts[1] is the text
		return { emoji: parts[0], text: parts.slice(1).join(' ') };
	}
</script>

<header class="relative z-40 w-full flex items-center justify-between px-5 h-16 pt-2">
	<button
		class="flex items-center gap-1 font-black text-2xl tracking-tight gumi"
		onclick={() => (showDropdown = true)}
	>
		<span class="mr-0.5">{splitLabel(interestLabels[$currentInterest]).emoji}</span>
		<span
			style={`background-image: ${$themeColors.gradient}; -webkit-background-clip: text; color: transparent;`}
		>
			{splitLabel(interestLabels[$currentInterest]).text}
		</span>
		<ChevronDown size={24} strokeWidth={3} class="text-gray-900 ml-1" />
	</button>

	<div class="flex items-center gap-2">
		<button
			class="flex items-center gap-1.5 px-3 py-1.5 bg-white/40 rounded-full hover:bg-white/60 transition-colors"
		>
			<Heart size={16} fill="#ef4444" stroke="none" />
			<span
				class="text-[13px] font-bold text-blue-600 tracking-tighter w-full border-b-[1.5px] border-blue-600 leading-tight"
				>2.6M</span
			>
		</button>
	</div>
</header>

<!-- Floating Menu Popup Overlay -->
{#if showDropdown}
	<!-- Popup Wrapper -->
	<div class="fixed inset-y-0 left-0 right-0 w-full max-w-md mx-auto z-[100]">
		<!-- Backdrop inside the mobile wrapper -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute inset-0 bg-transparent/20 backdrop-blur-sm"
			onclick={() => (showDropdown = false)}
			aria-label="Close popup"
			transition:fade={{ duration: 150 }}
		></div>

		<!-- Popup Card placed directly over the header button -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="absolute top-2 left-4 bg-white rounded-[24px] p-4 pr-10 shadow-2xl origin-top-left"
			role="dialog"
			transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
		>
			<div class="flex flex-col gap-4 py-1 flex-1">
				{#each displayInterests as interest, i (interest)}
					<div in:fade|global={{ delay: i * 200, duration: 300 }}>
						<a
							href={i === 0 ? '#' : `/interest/${interest}/home`}
							class="flex items-center gap-1 font-black text-[25px] tracking-tight transition-all active:scale-[0.98]"
							onclick={(e) => {
								if (i === 0) e.preventDefault();
								selectInterest(interest);
							}}
						>
							<span class="mr-1">{splitLabel(interestLabels[interest]).emoji}</span>
							{#if i === 0}
								<span
									style={`background-image: ${$themeColors.gradient}; -webkit-background-clip: text; color: transparent;`}
								>
									{splitLabel(interestLabels[interest]).text}
								</span>
								<ChevronUp size={24} strokeWidth={4} class="ml-1 text-gray-800" />
							{:else}
								<span class="text-gray-400">
									{splitLabel(interestLabels[interest]).text}
								</span>
							{/if}
						</a>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
