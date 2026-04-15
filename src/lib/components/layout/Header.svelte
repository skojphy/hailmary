<script lang="ts">
	import { ChevronDown, ChevronUp, Heart } from 'lucide-svelte';
	import { interestHeaderMeta } from '$lib/data/interest-home';
	import { currentInterest, selectedInterests, type InterestArea } from '$lib/stores/interest';
	import { fade, scale } from 'svelte/transition';

	let showDropdown = $state(false);

	const displayInterests = $derived.by(() => {
		const chosen = $selectedInterests.length ? $selectedInterests : [$currentInterest];
		const uniqueChosen = chosen.filter(
			(interest, index, items) => items.indexOf(interest) === index
		);

		if (uniqueChosen.includes($currentInterest)) {
			return [
				$currentInterest,
				...uniqueChosen.filter((interest) => interest !== $currentInterest)
			].slice(0, 10);
		}

		return [$currentInterest, ...uniqueChosen].slice(0, 10);
	});

	const activeMeta = $derived(interestHeaderMeta[$currentInterest]);

	const interestCountParts = $derived.by(() => {
		const text = activeMeta.interestCount;
		const match = text.match(/^(.*?)(\s*관심)$/);

		if (!match) {
			return {
				count: text,
				label: ''
			};
		}

		return {
			count: match[1],
			label: match[2].trim()
		};
	});

	function selectInterest(interest: InterestArea) {
		currentInterest.set(interest);
		showDropdown = false;
	}
</script>

<header
	class="interest-header"
	style={`
		--header-text: ${activeMeta.palette.headerText};
		--header-pill-bg: ${activeMeta.palette.headerPillBg};
		--header-pill-text: ${activeMeta.palette.headerPillText};
		--header-accent: ${activeMeta.palette.accent};
		--header-accent-strong: ${activeMeta.palette.accentStrong};
	`}
>
	<button class="interest-header__title" type="button" onclick={() => (showDropdown = true)}>
		<span class="interest-header__emoji">{activeMeta.emoji}</span>
		<span class="interest-header__label">{activeMeta.label}</span>
		<ChevronDown size={22} strokeWidth={3.2} />
	</button>

	<button class="interest-header__pill" type="button">
		<Heart size={12} fill="currentColor" stroke="none" />
		<span class="interest-header__pill-count">{interestCountParts.count}</span>
		{#if interestCountParts.label}
			<span class="interest-header__pill-label">{interestCountParts.label}</span>
		{/if}
	</button>
</header>

{#if showDropdown}
	<div class="interest-header__overlay">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="interest-header__backdrop"
			aria-label="Close interest selector"
			onclick={() => (showDropdown = false)}
			transition:fade={{ duration: 150 }}
		></div>

		<div
			class="interest-header__menu"
			role="dialog"
			aria-label="관심사 선택"
			transition:scale={{ duration: 220, start: 0.96, opacity: 0 }}
		>
			{#each displayInterests as interest, index (interest)}
				{@const meta = interestHeaderMeta[interest]}
				{#if index === 0}
					<button
						class="interest-header__item interest-header__item--active"
						type="button"
						onclick={() => (showDropdown = false)}
					>
						<span>{meta.emoji}</span>
						<span>{meta.label}</span>
						<ChevronUp size={22} strokeWidth={3.2} />
					</button>
				{:else}
					<a
						class="interest-header__item"
						href={`/interest/${interest}/home`}
						onclick={() => selectInterest(interest)}
					>
						<span>{meta.emoji}</span>
						<span>{meta.label}</span>
					</a>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style>
	.interest-header {
		position: relative;
		z-index: 120;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: calc(1.95rem + env(safe-area-inset-top)) 1.25rem 0.95rem;
		color: var(--header-text);
	}

	.interest-header__title {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		border: none;
		background: transparent;
		padding: 0;
		color: inherit;
	}

	.interest-header__emoji {
		font-size: 1.57rem;
		line-height: 1;
	}

	.interest-header__label {
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
		font-size: 1.74rem;
		line-height: 1;
		letter-spacing: -0.03em;
	}

	.interest-header__title :global(svg) {
		flex-shrink: 0;
		margin-left: 0.1rem;
	}

	.interest-header__pill {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.34rem;
		border: none;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.34);
		padding: 0.58rem 0.72rem;
		color: #ff5a63;
		font-size: 0.79rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
		backdrop-filter: blur(6px);
	}

	.interest-header__pill-count {
		color: #ff5a63;
	}

	.interest-header__pill-label {
		color: #111111;
	}

	.interest-header__overlay {
		position: fixed;
		inset: 0;
		left: 50%;
		z-index: 220;
		width: 100%;
		max-width: 28rem;
		transform: translateX(-50%);
	}

	.interest-header__backdrop {
		position: absolute;
		inset: 0;
		background: rgba(18, 18, 26, 0.16);
		backdrop-filter: blur(10px);
	}

	.interest-header__menu {
		position: absolute;
		top: 0.95rem;
		left: 1.1rem;
		z-index: 221;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 10.25rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.95);
		padding: 0.6rem;
		box-shadow: 0 22px 44px rgba(24, 26, 42, 0.18);
	}

	.interest-header__item {
		display: inline-flex;
		align-items: center;
		gap: 0.42rem;
		border: none;
		border-radius: 1rem;
		background: transparent;
		padding: 0.72rem 0.85rem;
		color: #8e8e96;
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
		font-size: 1.55rem;
		line-height: 1;
		text-decoration: none;
	}

	.interest-header__item--active {
		color: var(--header-text);
		background: rgba(255, 255, 255, 0.78);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
	}

	@media (max-width: 420px) {
		.interest-header {
			padding: calc(1.7rem + env(safe-area-inset-top)) 1rem 0.85rem;
		}

		.interest-header__label {
			font-size: 1.62rem;
		}

		.interest-header__pill {
			padding: 0.52rem 0.66rem;
			font-size: 0.74rem;
		}
	}
</style>
