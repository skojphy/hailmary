<script lang="ts">
	import Layer from 'svelte-konva/Layer.svelte';
	import Line from 'svelte-konva/Line.svelte';
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

	const gridStep = 120;
	const gridX = Array.from({ length: Math.floor(WORLD_SIZE.width / gridStep) + 1 }, (_, index) => index * gridStep);
	const gridY = Array.from(
		{ length: Math.floor(WORLD_SIZE.height / gridStep) + 1 },
		(_, index) => index * gridStep
	);

	const highlighted = $derived(INTERESTS.filter((interest) => selectedIds.has(interest.id)));
	const dimmed = $derived(INTERESTS.filter((interest) => !selectedIds.has(interest.id)));

	$effect(() => {
		if (viewportWidth > 0 && viewportHeight > 0 && !initialized) {
			stageX = viewportWidth / 2 - WORLD_SIZE.width / 2;
			stageY = viewportHeight / 2 - WORLD_SIZE.height / 2 + 88;
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
		const padding = 120;

		return {
			x: Math.min(padding, Math.max(-(overflowX + padding), x)),
			y: Math.min(180, Math.max(-(overflowY + padding), y))
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
			config={{
				width: viewportWidth,
				height: viewportHeight,
				x: stageX,
				y: stageY,
				draggable: true,
				dragDistance: 10
			}}
			ondragmove={handleDragMove}
		>
			<Layer>
				<Rect
					config={{
						x: 0,
						y: 0,
						width: WORLD_SIZE.width,
						height: WORLD_SIZE.height,
						fill: '#151515',
						cornerRadius: 72
					}}
				/>

				{#each gridX as x}
					<Line
						config={{
							points: [x, 0, x, WORLD_SIZE.height],
							stroke: 'rgba(255,255,255,0.05)',
							strokeWidth: 1
						}}
					/>
				{/each}

				{#each gridY as y}
					<Line
						config={{
							points: [0, y, WORLD_SIZE.width, y],
							stroke: 'rgba(255,255,255,0.05)',
							strokeWidth: 1
						}}
					/>
				{/each}
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
		border-radius: 40px;
		cursor: grab;
	}

	.interest-canvas :global(canvas) {
		border-radius: 40px;
	}

	.interest-canvas:active {
		cursor: grabbing;
	}
</style>
