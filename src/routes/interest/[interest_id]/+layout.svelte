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
	let isShortsView = $derived(/shorts\/\w+$/.test($pageStore.url.pathname));
</script>

<div
	class="interest-shell"
	style={`
		--interest-shell-bg: ${shellMeta.palette.background};
		--interest-shell-gradient: ${shellMeta.palette.backgroundGradient};
		--interest-shell-surface: ${shellMeta.palette.cardBg};
	`}
>
	<Header />

	<main class="interest-shell__main">
		{@render children()}
	</main>

	{#if !isShortsView}
		<BottomNav />
	{/if}
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
		background: transparent;
		box-shadow: 0 20px 48px rgba(27, 31, 52, 0.16);
		isolation: isolate;
	}

	.interest-shell::before {
		content: '';
		position: fixed;
		inset: 0 auto 0 50%;
		width: min(100vw, 28rem);
		transform: translateX(-50%);
		background: var(--interest-shell-gradient);
		z-index: -1;
		pointer-events: none;
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
