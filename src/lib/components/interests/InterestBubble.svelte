<script lang="ts">
	import { onDestroy, onMount, untrack } from 'svelte';
	import { animate, spring } from 'animejs';
	import Circle from 'svelte-konva/Circle.svelte';
	import Group from 'svelte-konva/Group.svelte';
	import Line from 'svelte-konva/Line.svelte';
	import Path from 'svelte-konva/Path.svelte';
	import Rect from 'svelte-konva/Rect.svelte';
	import Text from 'svelte-konva/Text.svelte';
	import type { InterestDefinition } from '$lib/data/interests';
	import { createInterestPath, getBadgeWidth } from '$lib/utils/interest-geometry';

	type BubbleMotion = {
		scale: number;
		offsetY: number;
		rotation: number;
		shadowBlur: number;
	};

	let {
		interest,
		selected = false,
		muted = false,
		onselect = () => {}
	}: {
		interest: InterestDefinition;
		selected?: boolean;
		muted?: boolean;
		onselect?: (selection: { id: string; enabled: boolean }) => void;
	} = $props();

	let hovered = $state(false);
	let ready = $state(false);
	let activeAnimation: { cancel?: () => void } | undefined;
	let motion = $state<BubbleMotion>({
		scale: 1,
		offsetY: 0,
		rotation: 0,
		shadowBlur: 20
	});

	const pathData = $derived(createInterestPath(interest.shape, interest.width, interest.height));
	const badgeWidth = $derived(getBadgeWidth(interest.badge));
	const opacity = $derived(interest.enabled ? (muted ? 0.64 : 1) : 0.58);
	const titleColor = $derived(interest.enabled ? '#fff8f4' : '#f2f2f2');
	const badgeFill = $derived(
		interest.enabled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.12)'
	);
	const glowColor = $derived(interest.enabled ? `${interest.fillStart}AA` : '#00000055');
	const motionTarget = $derived.by(() => {
		if (selected) {
			return {
				scale: 1.08,
				offsetY: -16,
				rotation: interest.rotation + 2,
				shadowBlur: 48
			};
		}

		if (hovered && interest.enabled) {
			return {
				scale: 1.03,
				offsetY: -8,
				rotation: interest.rotation + 1.5,
				shadowBlur: 40
			};
		}

		return {
			scale: 1,
			offsetY: 0,
			rotation: interest.rotation,
			shadowBlur: interest.enabled ? 32 : 18
		};
	});

	onMount(() => {
		ready = true;
		runMotion(motionTarget, true);
	});

	onDestroy(() => {
		activeAnimation?.cancel?.();
	});

	$effect(() => {
		if (!ready) return;

		untrack(() => {
			runMotion(motionTarget);
		});
	});

	function runMotion(next: BubbleMotion, immediate = false) {
		if (immediate) {
			motion = next;
			return;
		}

		activeAnimation?.cancel?.();

		const animated = { ...motion };
		activeAnimation = animate(animated, {
			scale: next.scale,
			offsetY: next.offsetY,
			rotation: next.rotation,
			shadowBlur: next.shadowBlur,
			duration: selected ? 900 : 700,
			ease: spring({
				bounce: selected ? 0.6 : 0.38,
				duration: selected ? 900 : 700
			}),
			onUpdate: () => {
				motion = {
					scale: animated.scale,
					offsetY: animated.offsetY,
					rotation: animated.rotation,
					shadowBlur: animated.shadowBlur
				};
			}
		});
	}

	function emitSelection() {
		onselect({
			id: interest.id,
			enabled: interest.enabled
		});
	}
</script>

<Group
	config={{
		x: interest.x,
		y: interest.y + motion.offsetY,
		rotation: motion.rotation,
		scaleX: motion.scale,
		scaleY: motion.scale,
		opacity
	}}
	onpointerclick={emitSelection}
	ontap={emitSelection}
	onmouseover={() => (hovered = true)}
	onmouseout={() => (hovered = false)}
>
	<Path
		config={{
			data: pathData,
			fillLinearGradientStartPoint: { x: -interest.width / 2, y: -interest.height / 2 },
			fillLinearGradientEndPoint: { x: interest.width / 2, y: interest.height / 2 },
			fillLinearGradientColorStops: [0, interest.fillStart, 1, interest.fillEnd],
			shadowColor: glowColor,
			shadowBlur: motion.shadowBlur,
			shadowOffsetY: 16,
			shadowOpacity: selected ? 0.45 : 0.3
		}}
	/>

	<Text
		config={{
			x: -interest.width / 2 + 28,
			y: -interest.height / 2 + 38,
			width: interest.width - 56,
			align: 'center',
			text: interest.emoji,
			fontSize: 34,
			fontStyle: '700',
			fill: '#ffffff'
		}}
	/>

	<Text
		config={{
			x: -interest.width / 2 + 30,
			y: -18,
			width: interest.width - 60,
			align: 'center',
			text: interest.label,
			fontSize: interest.label.length > 5 ? 34 : 40,
			fontStyle: '900',
			fill: titleColor,
			lineHeight: 1.04,
			letterSpacing: -1.4
		}}
	/>

	<Rect
		config={{
			x: -badgeWidth / 2,
			y: interest.height / 2 - 58,
			width: badgeWidth,
			height: 44,
			cornerRadius: 999,
			fill: badgeFill
		}}
	/>

	<Text
		config={{
			x: -badgeWidth / 2,
			y: interest.height / 2 - 46,
			width: badgeWidth,
			align: 'center',
			text: interest.badge,
			fontSize: 18,
			fontStyle: '700',
			fill: '#ffffff'
		}}
	/>

	{#if selected}
		<Circle
			config={{
				x: interest.width / 2 - 34,
				y: -interest.height / 2 + 36,
				radius: 28,
				fill: '#ffffff',
				shadowColor: '#00000055',
				shadowBlur: 18,
				shadowOffsetY: 6
			}}
		/>
		<Line
			config={{
				points: [
					interest.width / 2 - 46,
					-interest.height / 2 + 36,
					interest.width / 2 - 36,
					-interest.height / 2 + 48,
					interest.width / 2 - 20,
					-interest.height / 2 + 22
				],
				stroke: '#111111',
				strokeWidth: 6,
				lineCap: 'round',
				lineJoin: 'round'
			}}
		/>
	{/if}
</Group>
