<script lang="ts">
	import InterestCanvas from '$lib/components/interests/InterestCanvas.svelte';
	import {
		INTERESTS,
		MAX_SELECTIONS,
		type InterestDefinition
	} from '$lib/data/interests';

	let selectedIds = $state(new Set<string>());

	const selectedInterests = $derived(
		INTERESTS.filter((interest) => selectedIds.has(interest.id))
	);
	const selectedCount = $derived(selectedIds.size);
	const completionLabel = $derived(
		selectedCount === MAX_SELECTIONS
			? `나의 관심사 ${MAX_SELECTIONS}개 선택 완료`
			: `나의 관심사 ${selectedCount}/${MAX_SELECTIONS} 선택 중`
	);

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
	<div class="interest-explorer__glow interest-explorer__glow--left"></div>
	<div class="interest-explorer__glow interest-explorer__glow--right"></div>

	<header class="interest-explorer__header">
		<p class="interest-explorer__eyebrow">Prototype interest map</p>
		<h1>요즘 관심 있는 게 뭐예요?</h1>
		<p class="interest-explorer__hint">
			평면을 드래그해서 탐색해보세요. 지금은 <strong>메이크업</strong>, <strong>러닝</strong>,
			<strong>테크</strong>만 선택할 수 있어요.
		</p>
	</header>

	<div class="interest-explorer__selected">
		{#each selectedInterests as interest (interest.id)}
			<span>{interest.label}</span>
		{/each}

		{#if selectedInterests.length === 0}
			<span class="interest-explorer__placeholder">선택한 관심사가 여기에 표시돼요</span>
		{/if}
	</div>

	<div class="interest-explorer__canvas-frame">
		<InterestCanvas {selectedIds} onInterestSelect={handleInterestSelect} />
	</div>

	<footer class="interest-explorer__footer">
		<button
			type="button"
			class:ready={selectedCount === MAX_SELECTIONS}
			onclick={finishSelection}
		>
			{completionLabel}
		</button>
	</footer>
</section>

<style>
	.interest-explorer {
		position: relative;
		min-height: 100dvh;
		overflow: hidden;
		padding: 32px 20px 24px;
		background:
			radial-gradient(circle at top left, rgba(255, 78, 170, 0.18), transparent 30%),
			radial-gradient(circle at top right, rgba(53, 120, 255, 0.18), transparent 34%),
			linear-gradient(180deg, #202020 0%, #121212 100%);
		color: #fff7f0;
	}

	.interest-explorer__glow {
		position: absolute;
		inset: auto;
		height: 300px;
		width: 300px;
		filter: blur(70px);
		opacity: 0.24;
		pointer-events: none;
	}

	.interest-explorer__glow--left {
		top: 140px;
		left: -80px;
		background: #ff4fc4;
	}

	.interest-explorer__glow--right {
		top: 220px;
		right: -90px;
		background: #2f74ff;
	}

	.interest-explorer__header {
		position: relative;
		z-index: 1;
		margin: 0 auto 18px;
		max-width: 980px;
		text-align: center;
	}

	.interest-explorer__eyebrow {
		margin: 0 0 10px;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.55);
	}

	.interest-explorer__header h1 {
		margin: 0;
		font-size: clamp(2rem, 6vw, 4.3rem);
		line-height: 0.94;
		letter-spacing: -0.06em;
	}

	.interest-explorer__hint {
		margin: 14px auto 0;
		max-width: 560px;
		font-size: 1rem;
		line-height: 1.5;
		color: rgba(255, 247, 240, 0.72);
	}

	.interest-explorer__selected {
		position: relative;
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin: 0 auto 18px;
		max-width: 980px;
	}

	.interest-explorer__selected span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.7rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(18px);
		font-size: 0.95rem;
		font-weight: 700;
	}

	.interest-explorer__selected .interest-explorer__placeholder {
		color: rgba(255, 247, 240, 0.56);
	}

	.interest-explorer__canvas-frame {
		position: relative;
		z-index: 1;
		height: min(68vh, 860px);
		max-width: 980px;
		margin: 0 auto;
		padding: 14px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 44px;
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(22px);
		box-shadow: 0 36px 100px rgba(0, 0, 0, 0.34);
	}

	.interest-explorer__footer {
		position: sticky;
		bottom: 20px;
		z-index: 2;
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.interest-explorer__footer button {
		min-width: min(92vw, 660px);
		padding: 1.15rem 1.6rem;
		border: none;
		border-radius: 999px;
		background: linear-gradient(90deg, #1f8fff 0%, #2450ff 100%);
		box-shadow: 0 20px 50px rgba(16, 59, 255, 0.38);
		color: #fff;
		font-size: clamp(1rem, 2vw, 1.7rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		transition:
			transform 180ms ease,
			filter 180ms ease,
			opacity 180ms ease;
	}

	.interest-explorer__footer button:not(.ready) {
		opacity: 0.82;
		filter: saturate(0.86);
	}

	.interest-explorer__footer button:hover {
		transform: translateY(-2px);
	}

	@media (max-width: 720px) {
		.interest-explorer {
			padding-inline: 14px;
			padding-top: 24px;
		}

		.interest-explorer__canvas-frame {
			height: 66vh;
			padding: 10px;
			border-radius: 32px;
		}

		.interest-explorer__footer button {
			min-width: 100%;
		}
	}
</style>
