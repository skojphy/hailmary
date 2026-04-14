<script lang="ts">
	import Layer from 'svelte-konva/Layer.svelte';
	import Rect from 'svelte-konva/Rect.svelte';
	import Stage from 'svelte-konva/Stage.svelte';
	import InterestBubble from '$lib/components/interests/InterestBubble.svelte';
	import { INTERESTS, WORLD_SIZE, type InterestDefinition } from '$lib/data/interests';

	let {
		selectedIds = new Set<string>(),
		onInterestSelect = () => {}
	}: {
		selectedIds?: Set<string>;
		onInterestSelect?: (interest: InterestDefinition) => void;
	} = $props();

	let viewportWidth = $state(0);
	let viewportHeight = $state(0);
	let stageX = $state(0);
	let stageY = $state(0);
	let initialized = $state(false);
	let stageHandle: { node?: { position: (pos: { x: number; y: number }) => void } } | null =
		$state(null);

	const highlighted = $derived(INTERESTS.filter((interest) => selectedIds.has(interest.id)));
	const dimmed = $derived(INTERESTS.filter((interest) => !selectedIds.has(interest.id)));

	$effect(() => {
		if (viewportWidth > 0 && viewportHeight > 0 && !initialized) {
			const initial = getInitialStagePosition(viewportWidth);
			stageX = initial.x;
			stageY = initial.y;
			initialized = true;
		}
	});

	$effect(() => {
		if (viewportWidth > 0 && viewportHeight > 0 && initialized) {
			const bounded = clampStage(stageX, stageY);
			stageX = bounded.x;
			stageY = bounded.y;
			stageHandle?.node?.position({ x: bounded.x, y: bounded.y });
		}
	});

	function clampStage(x: number, y: number) {
		const overflowX = Math.max(0, WORLD_SIZE.width - viewportWidth);
		const overflowY = Math.max(0, WORLD_SIZE.height - viewportHeight);
		const horizontalPadding = 72;
		const topPadding = 190;
		const bottomPadding = 130;

		return {
			x: Math.min(horizontalPadding, Math.max(-(overflowX + horizontalPadding), x)),
			y: Math.min(topPadding, Math.max(-(overflowY + bottomPadding), y))
		};
	}

	function getInitialStagePosition(width: number) {
		if (width <= 720) {
			return { x: -24, y: 162 };
		}

		return {
			x: width / 2 - WORLD_SIZE.width / 2,
			y: 120
		};
	}

	function handleDragMove(event: { target?: { x: () => number; y: () => number } }) {
		const x = event.target?.x?.() ?? stageX;
		const y = event.target?.y?.() ?? stageY;
		const bounded = clampStage(x, y);

		stageX = bounded.x;
		stageY = bounded.y;
	}

	function handleSelect(interest: InterestDefinition) {
		onInterestSelect(interest);
	}
</script>

<div class="interest-canvas" bind:clientWidth={viewportWidth} bind:clientHeight={viewportHeight}>
	{#if viewportWidth > 0 && viewportHeight > 0}
		<Stage
			bind:this={stageHandle}
			width={viewportWidth}
			height={viewportHeight}
			x={stageX}
			y={stageY}
			draggable={true}
			dragDistance={10}
			ondragmove={handleDragMove}
		>
			<Layer>
				<Rect
					x={0}
					y={0}
					width={WORLD_SIZE.width}
					height={WORLD_SIZE.height}
					fill="#252525"
				/>
			</Layer>

			<Layer>
				{#each dimmed as interest (interest.id)}
					<InterestBubble
						interest={interest}
						selected={false}
						muted={selectedIds.size > 0}
						onselect={() => handleSelect(interest)}
					/>
				{/each}

				{#each highlighted as interest (interest.id)}
					<InterestBubble
						interest={interest}
						selected={true}
						muted={false}
						onselect={() => handleSelect(interest)}
					/>
				{/each}
			</Layer>
		</Stage>
	{/if}
</div>

<style>
	.interest-canvas {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		cursor: grab;
		touch-action: none;
	}

	.interest-canvas:active {
		cursor: grabbing;
	}
</style>
