<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import { interestHeaderMeta } from '$lib/data/interest-home';
	import { currentInterest, type InterestArea } from '$lib/stores/interest';
	import { page as pageStore } from '$app/stores';

	let { children } = $props();

	const shellMeta = $derived(interestHeaderMeta[$currentInterest]);
	const showTechHero = $derived(
		$pageStore.params.interest_id === 'tech' && $pageStore.url.pathname === '/interest/tech/home'
	);

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
		--interest-shell-gradient: ${shellMeta.palette.backgroundGradient};
		--interest-shell-surface: ${shellMeta.palette.cardBg};
	`}
>
	<Header />

	{#if showTechHero}
		<div class="interest-shell__hero">
			<img src="/interest-home/galaxy_banner_img.png" alt="Galaxy S26 Series 프로모션 배너" />
		</div>
	{/if}

	<main class:interest-shell__main--with-hero={showTechHero} class="interest-shell__main">
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

	.interest-shell__hero {
		position: relative;
		z-index: 0;
		margin-top: calc(-1 * (5.7rem + env(safe-area-inset-top)));
		pointer-events: none;
	}

	.interest-shell__hero img {
		display: block;
		width: 100%;
		height: auto;
	}

	.interest-shell__main--with-hero {
		z-index: 1;
		margin-top: -2.35rem;
		padding-top: 1.15rem;
		background: rgba(244, 246, 252, 0.96);
		border-top-left-radius: 2.2rem;
		border-top-right-radius: 2.2rem;
		box-shadow: 0 -8px 28px rgba(148, 156, 196, 0.08);
	}

	:global(body) {
		background: #f4f4f8;
	}
</style>
