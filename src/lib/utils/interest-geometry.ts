import type { InterestShape } from '$lib/data/interests';

const join = (parts: string[]) => parts.join(' ');
const format = (value: number) => Number(value.toFixed(2));

type Point = {
	x: number;
	y: number;
};

export function createInterestPath(shape: InterestShape, width: number, height: number): string {
	switch (shape) {
		case 'hex':
			return createHexPath(width, height);
		case 'clover':
			return createCloverPath(width, height);
		case 'four-leaf':
			return createFourLeafPath(width, height);
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

	const points: Point[] = [
		{ x: 0, y: -h },
		{ x: w * 0.86, y: -h * 0.46 },
		{ x: w * 0.86, y: h * 0.46 },
		{ x: 0, y: h },
		{ x: -w * 0.86, y: h * 0.46 },
		{ x: -w * 0.86, y: -h * 0.46 }
	];

	return createRoundedPolygonPath(points, Math.min(width, height) * 0.13);
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

function createFourLeafPath(width: number, height: number): string {
	const w = width / 2;
	const h = height / 2;
	const cx = w * 0.43;
	const cy = h * 0.43;
	const radius = Math.min(w - cx, h - cy) * 1.05;

	const top = { x: 0, y: -cy };
	const right = { x: cx, y: 0 };
	const bottom = { x: 0, y: cy };
	const left = { x: -cx, y: 0 };

	const topRight = getCircleIntersection(top, right, radius, (point) => point.x > 0 && point.y < 0);
	const rightBottom = getCircleIntersection(
		right,
		bottom,
		radius,
		(point) => point.x > 0 && point.y > 0
	);
	const bottomLeft = getCircleIntersection(
		bottom,
		left,
		radius,
		(point) => point.x < 0 && point.y > 0
	);
	const leftTop = getCircleIntersection(left, top, radius, (point) => point.x < 0 && point.y < 0);

	return join([
		`M ${format(leftTop.x)} ${format(leftTop.y)}`,
		`A ${format(radius)} ${format(radius)} 0 0 1 ${format(topRight.x)} ${format(topRight.y)}`,
		`A ${format(radius)} ${format(radius)} 0 0 1 ${format(rightBottom.x)} ${format(rightBottom.y)}`,
		`A ${format(radius)} ${format(radius)} 0 0 1 ${format(bottomLeft.x)} ${format(bottomLeft.y)}`,
		`A ${format(radius)} ${format(radius)} 0 0 1 ${format(leftTop.x)} ${format(leftTop.y)}`,
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

function createRoundedPolygonPath(points: Point[], radius: number): string {
	const commands: string[] = [];
	const count = points.length;

	for (let index = 0; index < count; index += 1) {
		const previous = points[(index - 1 + count) % count];
		const current = points[index];
		const next = points[(index + 1) % count];

		const start = offsetPoint(current, previous, radius);
		const end = offsetPoint(current, next, radius);

		if (index === 0) {
			commands.push(`M ${format(start.x)} ${format(start.y)}`);
		} else {
			commands.push(`L ${format(start.x)} ${format(start.y)}`);
		}

		commands.push(
			`Q ${format(current.x)} ${format(current.y)}, ${format(end.x)} ${format(end.y)}`
		);
	}

	commands.push('Z');
	return join(commands);
}

function offsetPoint(from: Point, to: Point, radius: number): Point {
	const dx = to.x - from.x;
	const dy = to.y - from.y;
	const distance = Math.hypot(dx, dy) || 1;
	const offset = Math.min(radius, distance / 2 - 0.01);
	const ratio = offset / distance;

	return {
		x: from.x + dx * ratio,
		y: from.y + dy * ratio
	};
}

function getCircleIntersection(
	first: Point,
	second: Point,
	radius: number,
	predicate: (point: Point) => boolean
): Point {
	const dx = second.x - first.x;
	const dy = second.y - first.y;
	const distance = Math.hypot(dx, dy) || 1;
	const midpoint = {
		x: (first.x + second.x) / 2,
		y: (first.y + second.y) / 2
	};
	const height = Math.sqrt(Math.max(radius * radius - (distance / 2) ** 2, 0));
	const perp = {
		x: -dy / distance,
		y: dx / distance
	};

	const candidateA = {
		x: midpoint.x + perp.x * height,
		y: midpoint.y + perp.y * height
	};
	const candidateB = {
		x: midpoint.x - perp.x * height,
		y: midpoint.y - perp.y * height
	};

	return predicate(candidateA) ? candidateA : candidateB;
}
