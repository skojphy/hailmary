import type { InterestShape } from '$lib/data/interests';

const join = (parts: string[]) => parts.join(' ');

export function createInterestPath(shape: InterestShape, width: number, height: number): string {
	switch (shape) {
		case 'hex':
			return createHexPath(width, height);
		case 'clover':
			return createCloverPath(width, height);
		case 'tilted-quad':
			return createTiltedQuadPath(width, height);
		case 'pill':
			return createPillPath(width, height);
		case 'pebble':
			return createPebblePath(width, height);
		case 'orb':
		default:
			return createOrbPath(width, height);
	}
}

export function getBadgeWidth(label: string): number {
	return Math.max(122, label.length * 13 + 42);
}

function createOrbPath(width: number, height: number): string {
	const w = width / 2;
	const h = height / 2;

	return join([
		`M ${-w * 0.14} ${-h}`,
		`C ${w * 0.38} ${-h * 1.02}, ${w * 1.06} ${-h * 0.4}, ${w * 0.98} ${h * 0.1}`,
		`C ${w * 0.9} ${h * 0.7}, ${w * 0.22} ${h * 1.02}, ${-w * 0.34} ${h * 0.92}`,
		`C ${-w * 0.96} ${h * 0.74}, ${-w * 1.08} ${-h * 0.08}, ${-w * 0.8} ${-h * 0.54}`,
		`C ${-w * 0.58} ${-h * 0.88}, ${-w * 0.28} ${-h * 0.98}, ${-w * 0.14} ${-h}`,
		'Z'
	]);
}

function createPebblePath(width: number, height: number): string {
	const w = width / 2;
	const h = height / 2;

	return join([
		`M ${-w * 0.58} ${-h * 0.86}`,
		`C ${-w * 0.06} ${-h * 1.08}, ${w * 0.76} ${-h * 0.88}, ${w * 0.92} ${-h * 0.2}`,
		`C ${w * 1.02} ${h * 0.34}, ${w * 0.52} ${h * 0.96}, ${-w * 0.1} ${h * 0.98}`,
		`C ${-w * 0.74} ${h * 0.92}, ${-w} ${h * 0.34}, ${-w * 0.9} ${-h * 0.28}`,
		`C ${-w * 0.82} ${-h * 0.6}, ${-w * 0.72} ${-h * 0.82}, ${-w * 0.58} ${-h * 0.86}`,
		'Z'
	]);
}

function createHexPath(width: number, height: number): string {
	const w = width / 2;
	const h = height / 2;

	return join([
		`M ${-w * 0.52} ${-h}`,
		`L ${w * 0.54} ${-h * 0.82}`,
		`L ${w} ${-h * 0.02}`,
		`L ${w * 0.48} ${h}`,
		`L ${-w * 0.56} ${h * 0.82}`,
		`L ${-w} ${h * 0.04}`,
		'Z'
	]);
}

function createCloverPath(width: number, height: number): string {
	const w = width / 2;
	const h = height / 2;

	return join([
		`M ${-w * 0.14} ${-h * 0.98}`,
		`C ${w * 0.18} ${-h * 1.06}, ${w * 0.62} ${-h * 0.86}, ${w * 0.62} ${-h * 0.42}`,
		`C ${w * 0.92} ${-h * 0.48}, ${w * 1.04} ${-h * 0.04}, ${w * 0.7} ${h * 0.14}`,
		`C ${w * 0.88} ${h * 0.46}, ${w * 0.64} ${h * 0.98}, ${w * 0.16} ${h * 0.88}`,
		`C ${w * 0.04} ${h * 1.06}, ${-w * 0.36} ${h * 1.06}, ${-w * 0.42} ${h * 0.74}`,
		`C ${-w * 0.8} ${h * 0.84}, ${-w * 1.04} ${h * 0.38}, ${-w * 0.76} ${h * 0.02}`,
		`C ${-w * 1.02} ${-h * 0.14}, ${-w * 0.94} ${-h * 0.6}, ${-w * 0.54} ${-h * 0.54}`,
		`C ${-w * 0.48} ${-h * 0.92}, ${-w * 0.24} ${-h}, ${-w * 0.14} ${-h * 0.98}`,
		'Z'
	]);
}

function createTiltedQuadPath(width: number, height: number): string {
	const w = width / 2;
	const h = height / 2;

	return join([
		`M ${-w * 0.86} ${-h * 0.82}`,
		`L ${w * 0.62} ${-h}`,
		`Q ${w} ${-h * 0.46}, ${w * 0.86} ${h * 0.7}`,
		`L ${-w * 0.42} ${h}`,
		`Q ${-w} ${h * 0.44}, ${-w * 0.86} ${-h * 0.82}`,
		'Z'
	]);
}

function createPillPath(width: number, height: number): string {
	const w = width / 2;
	const h = height / 2;

	return join([
		`M ${-w * 0.46} ${-h}`,
		`L ${w * 0.46} ${-h}`,
		`Q ${w} ${-h}, ${w} ${-h * 0.4}`,
		`L ${w} ${h * 0.4}`,
		`Q ${w} ${h}, ${w * 0.46} ${h}`,
		`L ${-w * 0.46} ${h}`,
		`Q ${-w} ${h}, ${-w} ${h * 0.4}`,
		`L ${-w} ${-h * 0.4}`,
		`Q ${-w} ${-h}, ${-w * 0.46} ${-h}`,
		'Z'
	]);
}
