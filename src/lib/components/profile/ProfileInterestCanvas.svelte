<script lang="ts">
	import Layer from 'svelte-konva/Layer.svelte';
	import Stage from 'svelte-konva/Stage.svelte';
	import InterestBubble from '$lib/components/interests/InterestBubble.svelte';
	import { INTERESTS, type InterestDefinition } from '$lib/data/interests';

	let viewportWidth = $state(0);
	let viewportHeight = $state(0);

	const sourceMap = new Map(INTERESTS.map((interest) => [interest.id, interest]));

	const bubbles: InterestDefinition[] = [
		createBubble('makeup', { x: 88, y: 92, scale: 0.46 }),
		createBubble('tech', { x: 206, y: 116, scale: 0.48 }),
		createBubble('running', { x: 320, y: 80, scale: 0.45 })
	];

	function createBubble(
		id: string,
		overrides: {
			x: number;
			y: number;
			scale: number;
			rotation?: number;
		}
	): InterestDefinition {
		const source = sourceMap.get(id);

		if (!source) {
			throw new Error(`Unknown interest id: ${id}`);
		}

		return {
			...source,
			x: overrides.x,
			y: overrides.y,
			width: Math.round(source.width * overrides.scale),
			height: Math.round(source.height * overrides.scale),
			rotation: overrides.rotation ?? source.rotation
		};
	}
</script>

<div class="profile-interest-canvas" bind:clientWidth={viewportWidth} bind:clientHeight={viewportHeight}>
	{#if viewportWidth > 0 && viewportHeight > 0}
		<Stage width={viewportWidth} height={viewportHeight}>
			<Layer>
				{#each bubbles as interest (interest.id)}
					<InterestBubble
						{interest}
						selected={true}
						muted={false}
						interactive={false}
						showSelectionMark={false}
						showBadge={false}
						compact={true}
						staticPose={true}
					/>
				{/each}
			</Layer>
		</Stage>
	{/if}
</div>

<style>
	.profile-interest-canvas {
		position: relative;
		width: 100%;
		height: 168px;
		overflow: hidden;
		pointer-events: none;
	}
</style>
