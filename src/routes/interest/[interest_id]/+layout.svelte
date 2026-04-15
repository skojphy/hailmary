<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import { interestHeaderMeta } from '$lib/data/interest-home';
	import { INTERESTS } from '$lib/data/interests';
	import { currentInterest, type InterestArea } from '$lib/stores/interest';
	import { page as pageStore } from '$app/stores';
	import { onDestroy } from 'svelte';

	let { children } = $props();

	const shellMeta = $derived(interestHeaderMeta[$currentInterest]);
	const showTechHero = $derived(
		$pageStore.params.interest_id === 'tech' && $pageStore.url.pathname === '/interest/tech/home'
	);
	let techHeroHeight = $state(0);
	let showTechIntro = $state(false);
	let techIntroShrinking = $state(false);
	let techIntroFading = $state(false);
	let techIntroPlayed = $state(false);
	let introShrinkTimeout: ReturnType<typeof setTimeout> | null = null;
	let introFinishTimeout: ReturnType<typeof setTimeout> | null = null;
	let introFadeTimeout: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		if ($pageStore.params.interest_id) {
			const interest = $pageStore.params.interest_id as InterestArea;

			if (INTERESTS.some((item) => item.id === interest) && $currentInterest !== interest) {
				currentInterest.set(interest);
			}
		}
	});
	let isShortsView = $derived(/shorts\/\w+$/.test($pageStore.url.pathname));

	function clearTechIntroTimers() {
		if (introShrinkTimeout) {
			clearTimeout(introShrinkTimeout);
			introShrinkTimeout = null;
		}

		if (introFinishTimeout) {
			clearTimeout(introFinishTimeout);
			introFinishTimeout = null;
		}

		if (introFadeTimeout) {
			clearTimeout(introFadeTimeout);
			introFadeTimeout = null;
		}
	}

	function finishTechIntro() {
		if (!showTechIntro || techIntroFading) return;

		clearTechIntroTimers();
		techIntroPlayed = true;
		techIntroShrinking = true;
		techIntroFading = true;

		introFadeTimeout = setTimeout(() => {
			showTechIntro = false;
		}, 1400);
	}

	$effect(() => {
		clearTechIntroTimers();

		if (!showTechHero) {
			showTechIntro = false;
			techIntroShrinking = false;
			techIntroFading = false;
			techIntroPlayed = false;
			return;
		}

		if (techIntroPlayed) {
			showTechIntro = false;
			return;
		}

		showTechIntro = true;
		techIntroShrinking = false;
		techIntroFading = false;

		introShrinkTimeout = setTimeout(() => {
			techIntroShrinking = true;
			techIntroFading = true;
		}, 2600);

		introFinishTimeout = setTimeout(() => {
			finishTechIntro();
		}, 4000);
	});

	onDestroy(() => {
		clearTechIntroTimers();
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
	{#if !isShortsView}
		<Header />
	{/if}

	{#if showTechHero}
		<div bind:clientHeight={techHeroHeight} class="interest-shell__hero">
			<img src="/interest-home/galaxy_banner_img.png" alt="Galaxy S26 Series 프로모션 배너" />
		</div>
	{/if}

	{#if showTechIntro}
		<div
			class:interest-shell__hero-intro--shrink={techIntroShrinking}
			class:interest-shell__hero-intro--fade={techIntroFading}
			class="interest-shell__hero-intro"
			style={`--tech-hero-height: ${techHeroHeight}px;`}
		>
			<video
				class="interest-shell__hero-intro-video"
				autoplay
				muted
				playsinline
				preload="auto"
				onended={finishTechIntro}
			>
				<source src="/interest-home/galaxy_movie.webm" type="video/webm" />
				<source src="/interest-home/galaxy_movie.mp4" type="video/mp4" />
			</video>
		</div>
	{/if}

	<main class:interest-shell__main--with-hero={showTechHero} class="interest-shell__main">
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

	.interest-shell__hero {
		position: relative;
		z-index: 0;
		margin-top: calc(-1 * (5.7rem + env(safe-area-inset-top)));
		pointer-events: none;
		aspect-ratio: 372 / 560;
	}

	.interest-shell__hero img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.interest-shell__hero-intro {
		position: fixed;
		inset: 0 auto calc(4rem + env(safe-area-inset-bottom)) 50%;
		z-index: 85;
		width: min(100vw, 28rem);
		transform: translateX(-50%);
		background: #000000;
		overflow: hidden;
		opacity: 1;
		pointer-events: none;
		transition:
			bottom 1400ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 1400ms ease;
	}

	.interest-shell__hero-intro--shrink {
		bottom: calc(100vh - var(--tech-hero-height));
	}

	.interest-shell__hero-intro--fade {
		opacity: 0;
	}

	.interest-shell__hero-intro-video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
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
