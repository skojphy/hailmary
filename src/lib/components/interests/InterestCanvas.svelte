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
	let scale = $state(1);
	let initialized = $state(false);
	let isPinching = $state(false);
	let pinchDistance = $state<number | null>(null);
	let canvasElement = $state<HTMLDivElement | null>(null);
	let stageHandle: { node?: { position: (pos: { x: number; y: number }) => void } } | null =
		$state(null);

	const MAX_SCALE = 1.5;
	const minScale = $derived(
		viewportWidth > 0 ? Math.min(1, viewportWidth / WORLD_SIZE.width) : 1
	);

	const highlighted = $derived(INTERESTS.filter((interest) => selectedIds.has(interest.id)));
	const dimmed = $derived(INTERESTS.filter((interest) => !selectedIds.has(interest.id)));

	$effect(() => {
		if (viewportWidth > 0 && viewportHeight > 0 && !initialized) {
			const initial = getInitialStagePosition(viewportWidth, viewportHeight, scale);
			stageX = initial.x;
			stageY = initial.y;
			initialized = true;
		}
	});

	$effect(() => {
		if (viewportWidth > 0 && viewportHeight > 0 && initialized) {
			const nextScale = Math.max(scale, minScale);
			if (nextScale !== scale) {
				scale = nextScale;
			}

			const bounded = clampStage(stageX, stageY, nextScale);
			stageX = bounded.x;
			stageY = bounded.y;
			stageHandle?.node?.position({ x: bounded.x, y: bounded.y });
		}
	});

	function clampStage(x: number, y: number, nextScale: number) {
		const scaledWidth = WORLD_SIZE.width * nextScale;
		const scaledHeight = WORLD_SIZE.height * nextScale;
		const minX = scaledWidth <= viewportWidth ? (viewportWidth - scaledWidth) / 2 : viewportWidth - scaledWidth;
		const maxX = scaledWidth <= viewportWidth ? minX : 0;
		const minY =
			scaledHeight <= viewportHeight ? (viewportHeight - scaledHeight) / 2 : viewportHeight - scaledHeight;
		const maxY = scaledHeight <= viewportHeight ? minY : 0;

		return {
			x: Math.min(maxX, Math.max(minX, x)),
			y: Math.min(maxY, Math.max(minY, y))
		};
	}

	function getInitialStagePosition(width: number, height: number, nextScale: number) {
		const scaledWidth = WORLD_SIZE.width * nextScale;
		const scaledHeight = WORLD_SIZE.height * nextScale;

		return {
			x: scaledWidth <= width ? (width - scaledWidth) / 2 : 0,
			y: scaledHeight <= height ? (height - scaledHeight) / 2 : 0
		};
	}

	function handleDragMove(event: { target?: { x: () => number; y: () => number } }) {
		const x = event.target?.x?.() ?? stageX;
		const y = event.target?.y?.() ?? stageY;
		const bounded = clampStage(x, y, scale);

		stageX = bounded.x;
		stageY = bounded.y;
	}

	function clampScale(nextScale: number) {
		return Math.min(MAX_SCALE, Math.max(minScale, nextScale));
	}

	function zoomAroundPoint(nextScale: number, point: { x: number; y: number }) {
		const worldPoint = {
			x: (point.x - stageX) / scale,
			y: (point.y - stageY) / scale
		};
		const nextX = point.x - worldPoint.x * nextScale;
		const nextY = point.y - worldPoint.y * nextScale;
		const bounded = clampStage(nextX, nextY, nextScale);

		scale = nextScale;
		stageX = bounded.x;
		stageY = bounded.y;
	}

	function getViewportPoint(clientX: number, clientY: number) {
		const rect = canvasElement?.getBoundingClientRect();

		if (!rect) {
			return {
				x: viewportWidth / 2,
				y: viewportHeight / 2
			};
		}

		return {
			x: clientX - rect.left,
			y: clientY - rect.top
		};
	}

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		const zoomFactor = event.deltaY < 0 ? 1.08 : 0.92;
		const nextScale = clampScale(scale * zoomFactor);

		if (nextScale === scale) return;

		zoomAroundPoint(nextScale, getViewportPoint(event.clientX, event.clientY));
	}

	function handleTouchStart(event: TouchEvent) {
		if (event.touches.length !== 2) return;

		isPinching = true;
		pinchDistance = getTouchDistance(event.touches);
	}

	function handleTouchMove(event: TouchEvent) {
		if (event.touches.length !== 2 || pinchDistance === null) return;

		event.preventDefault();

		const nextDistance = getTouchDistance(event.touches);
		const midpoint = getTouchMidpoint(event.touches);
		const nextScale = clampScale(scale * (nextDistance / pinchDistance));

		if (nextScale !== scale) {
			zoomAroundPoint(nextScale, midpoint);
		}

		pinchDistance = nextDistance;
	}

	function handleTouchEnd(event: TouchEvent) {
		if (event.touches.length < 2) {
			isPinching = false;
			pinchDistance = null;
		}
	}

	function getTouchDistance(touches: TouchList) {
		const first = touches[0];
		const second = touches[1];

		return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
	}

	function getTouchMidpoint(touches: TouchList) {
		const first = touches[0];
		const second = touches[1];

		return getViewportPoint(
			(first.clientX + second.clientX) / 2,
			(first.clientY + second.clientY) / 2
		);
	}

	function handleSelect(interest: InterestDefinition) {
		onInterestSelect(interest);
	}
</script>

<div
	class="interest-canvas"
	role="application"
	aria-label="관심사 맵 확대 축소 영역"
	bind:this={canvasElement}
	bind:clientWidth={viewportWidth}
	bind:clientHeight={viewportHeight}
	onwheel={handleWheel}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	ontouchcancel={handleTouchEnd}
>
	{#if viewportWidth > 0 && viewportHeight > 0}
		<Stage
			bind:this={stageHandle}
			width={viewportWidth}
			height={viewportHeight}
			x={stageX}
			y={stageY}
			scaleX={scale}
			scaleY={scale}
			draggable={!isPinching}
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
						muted={true}
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
