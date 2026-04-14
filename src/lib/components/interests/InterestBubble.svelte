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
	opacity: number;
};

let {
	interest,
	selected = false,
	muted = false,
	intro = false,
	introDelay = 0,
	interactive = true,
	showSelectionMark = true,
	showBadge = true,
	compact = false,
	staticPose = false,
	onselect = () => {}
}: {
	interest: InterestDefinition;
	selected?: boolean;
	muted?: boolean;
	intro?: boolean;
	introDelay?: number;
	interactive?: boolean;
	showSelectionMark?: boolean;
	showBadge?: boolean;
	compact?: boolean;
	staticPose?: boolean;
	onselect?: (selection: { id: string; enabled: boolean }) => void;
} = $props();

let hovered = $state(false);
let ready = $state(false);
let introSettled = $state(false);
let activeAnimation: { cancel?: () => void } | undefined;
let motion = $state<BubbleMotion>({
	scale: 1.01,
	offsetY: 0,
	rotation: 0,
	shadowBlur: 20,
	opacity: 1
});

	const pathData = $derived(createInterestPath(interest.shape, interest.width, interest.height));
	const titleWidth = $derived(
		compact ? Math.max(86, interest.width - 26) : Math.max(96, interest.width - 68)
	);
	const badgeWidth = $derived(
		Math.min(getBadgeWidth(interest.badge), interest.width - (compact ? 28 : 56))
	);
	const titleFontSize = $derived(
		getTitleFontSize(
			(interest.labelFontSize ?? (interest.label.length > 5 ? 30 : 36)) * (compact ? 0.4 : 1),
			interest.label,
			titleWidth
		)
	);
const badgeFontSize = $derived(compact ? 8.5 : badgeWidth < getBadgeWidth(interest.badge) ? 13 : 15);
const badgeHeight = $derived(compact ? 22 : 40);
const titleY = $derived(
	showBadge
		? compact
			? Math.max(-4, -interest.height * 0.02)
			: Math.max(-16, -interest.height * 0.12)
		: -titleFontSize * 0.52
);
const badgeY = $derived(
	Math.min(
		interest.height / 2 - badgeHeight - (compact ? 10 : 18),
		titleY + titleFontSize + (compact ? 5 : 14)
	)
);
	const isMuted = $derived(!selected && muted);
	const displayFillStart = $derived(isMuted ? '#4b4b4b' : interest.fillStart);
	const displayFillEnd = $derived(isMuted ? '#4b4b4b' : interest.fillEnd);
	const opacity = $derived(selected ? 1 : 0.84);
	const titleColor = $derived(selected ? '#fff8f4' : '#ece7e3');
	const badgeFill = $derived(
		selected ? `${displayFillStart}88` : '#5d5d5dcc'
	);
const glowColor = $derived(selected ? `${displayFillStart}aa` : '#00000014');
const motionTarget = $derived.by(() => {
	if (staticPose) {
		return {
			scale: 1,
			offsetY: 0,
			rotation: interest.rotation,
			shadowBlur: selected ? 24 : 10,
			opacity
		};
	}

	if (selected) {
		return {
			scale: 1.09,
			offsetY: -16,
			rotation: interest.rotation + 2,
			shadowBlur: 48,
			opacity
		};
	}

	if (hovered && interest.enabled) {
		return {
			scale: 1.04,
			offsetY: -8,
			rotation: interest.rotation + 1.5,
			shadowBlur: 40,
			opacity
		};
	}

	return {
		scale: 1.01,
		offsetY: 0,
		rotation: interest.rotation,
		shadowBlur: selected ? 32 : 10,
		opacity
	};
});

	onMount(() => {
		if (intro) {
			motion = {
				scale: 0.985,
				offsetY: -Math.max(480, interest.y + interest.height),
				rotation: interest.rotation - 6,
				shadowBlur: 0,
				opacity: 1
			};
			ready = true;
			runMotion(
				motionTarget,
				false,
				introDelay,
				() => {
					introSettled = true;
				},
				true
			);
			return;
		}

	ready = true;
	introSettled = true;
	runMotion(motionTarget, true);
});

	onDestroy(() => {
		activeAnimation?.cancel?.();
	});

	$effect(() => {
	if (!ready || !introSettled) return;

	untrack(() => {
		runMotion(motionTarget);
	});
});

	function runMotion(
		next: BubbleMotion,
		immediate = false,
		delay = 0,
		onComplete?: () => void,
		introDrop = false
	) {
		if (immediate) {
			motion = next;
			onComplete?.();
			return;
		}

		activeAnimation?.cancel?.();

		const animated = { ...motion };
		activeAnimation = animate(animated, {
			scale: next.scale,
			offsetY: next.offsetY,
			rotation: next.rotation,
			shadowBlur: next.shadowBlur,
			opacity: next.opacity,
			delay,
			duration: introDrop ? 1320 : selected ? 900 : 700,
			ease: spring({
				bounce: introDrop ? 0.72 : selected ? 0.6 : 0.38,
				duration: introDrop ? 1320 : selected ? 900 : 700
			}),
			onUpdate: () => {
				motion = {
					scale: animated.scale,
					offsetY: animated.offsetY,
					rotation: animated.rotation,
					shadowBlur: animated.shadowBlur,
					opacity: animated.opacity
				};
			},
			onComplete: () => {
				onComplete?.();
			}
		});
	}

	function emitSelection() {
		if (!interactive) return;

		onselect({
			id: interest.id,
			enabled: interest.enabled
		});
	}

	function getTitleFontSize(base: number, label: string, width: number) {
		if (compact) {
			return Math.max(16, Math.min(18, Math.floor(width / Math.max(label.length * 0.98, 1))));
		}

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
	opacity={motion.opacity}
	onpointerclick={interactive ? emitSelection : undefined}
	ontap={interactive ? emitSelection : undefined}
	onmouseover={interactive ? () => (hovered = true) : undefined}
	onmouseout={interactive ? () => (hovered = false) : undefined}
>
	<Path
		data={pathData}
		fillLinearGradientStartPoint={{ x: -interest.width / 2, y: -interest.height / 2 }}
		fillLinearGradientEndPoint={{ x: interest.width / 2, y: interest.height / 2 }}
		fillLinearGradientColorStops={[0, displayFillStart, 1, displayFillEnd]}
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
		lineHeight={compact ? 0.84 : 0.98}
		letterSpacing={-1.4}
	/>

	{#if showBadge}
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
			y={badgeY}
			width={badgeWidth}
			height={badgeHeight}
			align="center"
			verticalAlign="middle"
			text={interest.badge}
			fontSize={badgeFontSize}
			fontStyle="700"
			lineHeight={1}
			fill="#ffffff"
		/>
	{/if}

	{#if selected && showSelectionMark}
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
