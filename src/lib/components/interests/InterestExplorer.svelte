<script lang="ts">
	import InterestCanvas from '$lib/components/interests/InterestCanvas.svelte';
	import {
		INTERESTS,
		MAX_SELECTIONS,
		SELECTABLE_IDS,
		type InterestDefinition
	} from '$lib/data/interests';

	let selectedIds = $state(new Set<string>(SELECTABLE_IDS));

	const selectedInterests = $derived(INTERESTS.filter((interest) => selectedIds.has(interest.id)));
	const selectedCount = $derived(selectedIds.size);
	const completionLabel = $derived(`나의 관심사 ${selectedCount}/${MAX_SELECTIONS} 선택 중`);

	function handleInterestSelect(interest: InterestDefinition) {
		if (!interest.enabled) {
			window.alert('comming soon');
			return;
		}

		const next = new Set(selectedIds);

		if (next.has(interest.id)) {
			next.delete(interest.id);
		} else {
			if (next.size >= MAX_SELECTIONS) {
				window.alert(`프로토타입에서는 ${MAX_SELECTIONS}개까지만 선택할 수 있어요.`);
				return;
			}

			next.add(interest.id);
		}

		selectedIds = next;
	}

	function finishSelection() {
		if (selectedCount !== MAX_SELECTIONS) {
			window.alert(`메이크업, 러닝, 테크까지 ${MAX_SELECTIONS}개를 모두 선택해 주세요.`);
			return;
		}

		window.alert(`${selectedInterests.map((interest) => interest.label).join(', ')} 선택 완료`);
	}
</script>

<svelte:head>
	<title>관심사 선택</title>
</svelte:head>

<section class="interest-explorer">
	<div class="interest-explorer__canvas">
		<InterestCanvas {selectedIds} onInterestSelect={handleInterestSelect} />
	</div>

	<header class="interest-explorer__header">
		<h1>요즘 관심 있는 게 뭐예요?</h1>
	</header>

	<footer class="interest-explorer__footer">
		<button type="button" class:ready={selectedCount === MAX_SELECTIONS} onclick={finishSelection}>
			{completionLabel}
		</button>
	</footer>
</section>

<style>
	.interest-explorer {
		position: relative;
		height: 100dvh;
		overflow: hidden;
		background: #252525;
		color: #fff7f0;
	}

	.interest-explorer::before,
	.interest-explorer::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		z-index: 2;
		pointer-events: none;
	}

	.interest-explorer::before {
		top: 0;
		height: 150px;
		background: linear-gradient(180deg, rgba(37, 37, 37, 0.95) 0%, rgba(37, 37, 37, 0) 100%);
	}

	.interest-explorer::after {
		bottom: 0;
		height: 180px;
		background: linear-gradient(0deg, rgba(37, 37, 37, 0.98) 0%, rgba(37, 37, 37, 0) 100%);
	}

	.interest-explorer__canvas {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.interest-explorer__header {
		position: absolute;
		top: 18px;
		left: 0;
		right: 0;
		z-index: 3;
		padding: 0 24px;
		text-align: center;
		pointer-events: none;
	}

	.interest-explorer__header h1 {
		margin: 0;
		font-size: clamp(2rem, 4.6vw, 3.05rem);
		line-height: 1.08;
		letter-spacing: -0.045em;
		font-weight: 800;
		text-shadow: 0 6px 22px rgba(0, 0, 0, 0.28);
	}

	.interest-explorer__footer {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 18px;
		z-index: 4;
		display: flex;
		justify-content: center;
		padding: 0 24px max(18px, env(safe-area-inset-bottom));
	}

	.interest-explorer__footer button {
		width: min(100%, 540px);
		padding: 1.25rem 1.6rem;
		border: none;
		border-radius: 999px;
		background: linear-gradient(90deg, #1697ff 0%, #2b35ef 100%);
		box-shadow:
			0 18px 40px rgba(18, 71, 255, 0.38),
			inset 0 1px 0 rgba(255, 255, 255, 0.18);
		color: #fff;
		font-size: clamp(1rem, 2.2vw, 1.35rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		transition:
			transform 180ms ease,
			filter 180ms ease,
			opacity 180ms ease;
	}

	.interest-explorer__footer button:not(.ready) {
		opacity: 0.75;
		filter: saturate(0.88);
	}

	.interest-explorer__footer button:hover {
		transform: translateY(-2px);
	}

	@media (max-width: 720px) {
		.interest-explorer__header {
			top: 14px;
			padding: 0 18px;
		}

		.interest-explorer__footer button {
			min-width: 100%;
			padding-block: 1.28rem;
		}

		.interest-explorer__footer {
			padding-inline: 18px;
		}

		.interest-explorer__header h1 {
			font-size: clamp(1.9rem, 7.4vw, 2.6rem);
		}
	}
</style>
