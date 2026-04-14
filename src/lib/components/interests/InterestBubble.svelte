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
	const titleWidth = $derived(Math.max(132, interest.width - 68));
	const badgeWidth = $derived(Math.min(getBadgeWidth(interest.badge), interest.width - 56));
	const titleFontSize = $derived(
		getTitleFontSize(
			interest.labelFontSize ?? (interest.label.length > 5 ? 30 : 36),
			interest.label,
			titleWidth
		)
	);
	const badgeFontSize = $derived(badgeWidth < getBadgeWidth(interest.badge) ? 13 : 15);
	const badgeHeight = 40;
	const titleY = $derived(Math.max(-16, -interest.height * 0.12));
	const badgeY = $derived(
		Math.min(interest.height / 2 - badgeHeight - 18, titleY + titleFontSize + 14)
	);
	const opacity = $derived(interest.enabled ? (muted ? 0.8 : 1) : 0.92);
	const titleColor = $derived(interest.enabled ? '#fff8f4' : '#f2f2f2');
	const badgeFill = $derived(
		interest.enabled ? `${interest.fillStart}88` : 'rgba(255,255,255,0.16)'
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

	function getTitleFontSize(base: number, label: string, width: number) {
		const estimated = Math.floor(width / Math.max(label.length * 0.92, 1));
		return Math.max(20, Math.min(base, estimated));
	}
</script>

<Group
	x={interest.x}
	y={interest.y + motion.offsetY}
	rotation={motion.rotation}
	scaleX={motion.scale}
	scaleY={motion.scale}
	opacity={opacity}
	onpointerclick={emitSelection}
	ontap={emitSelection}
	onmouseover={() => (hovered = true)}
	onmouseout={() => (hovered = false)}
>
	<Path
		data={pathData}
		fillLinearGradientStartPoint={{ x: -interest.width / 2, y: -interest.height / 2 }}
		fillLinearGradientEndPoint={{ x: interest.width / 2, y: interest.height / 2 }}
		fillLinearGradientColorStops={[0, interest.fillStart, 1, interest.fillEnd]}
		shadowColor={glowColor}
		shadowBlur={motion.shadowBlur}
		shadowOffsetY={16}
		shadowOpacity={selected ? 0.45 : 0.3}
	/>

	<Text
		x={-titleWidth / 2}
		y={titleY}
		width={titleWidth}
		align="center"
		text={interest.label}
		fontFamily="RomanticGumi"
		fontSize={titleFontSize}
		fontStyle="900"
		fill={titleColor}
		lineHeight={0.98}
		letterSpacing={-1.4}
	/>

	<Rect
		x={-badgeWidth / 2}
		y={badgeY}
		width={badgeWidth}
		height={badgeHeight}
		cornerRadius={999}
		fill={badgeFill}
	/>

	<Text
		x={-badgeWidth / 2}
		y={badgeY + 9}
		width={badgeWidth}
		align="center"
		text={interest.badge}
		fontSize={badgeFontSize}
		fontStyle="700"
		fill="#ffffff"
	/>

	{#if selected}
		<Circle
			x={-interest.width / 2 + 26}
			y={-interest.height / 2 + 24}
			radius={28}
			fill="#ffffff"
			shadowColor="#00000055"
			shadowBlur={18}
			shadowOffsetY={6}
		/>
		<Line
			points={[
				-interest.width / 2 + 14,
				-interest.height / 2 + 24,
				-interest.width / 2 + 24,
				-interest.height / 2 + 36,
				-interest.width / 2 + 40,
				-interest.height / 2 + 10
			]}
			stroke="#111111"
			strokeWidth={6}
			lineCap="round"
			lineJoin="round"
		/>
	{/if}
</Group>
