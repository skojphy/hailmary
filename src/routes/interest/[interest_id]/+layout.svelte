<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import { interestHeaderMeta } from '$lib/data/interest-home';
	import { currentInterest, type InterestArea } from '$lib/stores/interest';
	import { page as pageStore } from '$app/stores';

	let { children } = $props();

	const shellMeta = $derived(interestHeaderMeta[$currentInterest]);

	$effect(() => {
		if ($pageStore.params.interest_id) {
			const interest = $pageStore.params.interest_id as InterestArea;

			if (['running', 'makeup', 'tech'].includes(interest) && $currentInterest !== interest) {
				currentInterest.set(interest);
			}
		}
	});
</script>

<div
	class="interest-shell"
	style={`
		--interest-shell-bg: ${shellMeta.palette.background};
		--interest-shell-surface: ${shellMeta.palette.cardBg};
	`}
>
	<Header />

	<main class="interest-shell__main">
		{@render children()}
	</main>

	<BottomNav />
</div>

<style>
	.interest-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 28rem;
		margin: 0 auto;
		position: relative;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 11rem),
			var(--interest-shell-bg);
		box-shadow: 0 20px 48px rgba(27, 31, 52, 0.16);
	}

	.interest-shell__main {
		flex: 1;
		position: relative;
		padding-bottom: 5rem;
		overflow-x: hidden;
	}

	:global(body) {
		background: #f4f4f8;
	}
</style>
