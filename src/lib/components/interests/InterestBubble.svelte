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
	const isMuted = $derived(!selected && muted);
	const displayFillStart = $derived(isMuted ? muteHexColor(interest.fillStart) : interest.fillStart);
	const displayFillEnd = $derived(isMuted ? muteHexColor(interest.fillEnd) : interest.fillEnd);
	const opacity = $derived(selected ? 1 : 0.96);
	const titleColor = $derived(selected ? '#fff8f4' : '#f0efed');
	const badgeFill = $derived(
		selected ? `${displayFillStart}88` : `${displayFillStart}cc`
	);
	const glowColor = $derived(selected ? `${displayFillStart}aa` : `${displayFillStart}55`);
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

	function muteHexColor(hex: string) {
		const value = hex.replace('#', '');
		const normalized =
			value.length === 3
				? value
						.split('')
						.map((char) => `${char}${char}`)
						.join('')
				: value;

		const r = Number.parseInt(normalized.slice(0, 2), 16);
		const g = Number.parseInt(normalized.slice(2, 4), 16);
		const b = Number.parseInt(normalized.slice(4, 6), 16);
		const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
		const grayTarget = luminance * 0.58 + 38;

		return toHex(
			mixChannel(r, grayTarget, 0.84),
			mixChannel(g, grayTarget, 0.84),
			mixChannel(b, grayTarget, 0.84)
		);
	}

	function mixChannel(value: number, target: number, amount: number) {
		return Math.round(value + (target - value) * amount);
	}

	function toHex(r: number, g: number, b: number) {
		return `#${[r, g, b]
			.map((channel) => Math.max(0, Math.min(255, channel)).toString(16).padStart(2, '0'))
			.join('')}`;
	}
</script>

<Group
	x={interest.x}
	y={interest.y + motion.offsetY}
	rotation={motion.rotation}
	scaleX={motion.scale}
	scaleY={motion.scale}
	{opacity}
	onpointerclick={emitSelection}
	ontap={emitSelection}
	onmouseover={() => (hovered = true)}
	onmouseout={() => (hovered = false)}
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
