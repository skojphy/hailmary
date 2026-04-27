<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { Home, Plane, Sparkles } from 'lucide-svelte';

	const query = $derived(page.url.searchParams.get('q') || '자취 필수템');
	const isTravelQuery = $derived(/스페인|여행|항공|투어/i.test(query));
	const targetInterest = $derived(isTravelQuery ? 'early-adopter-2' : 'living-alone');
	const targetLabel = $derived(isTravelQuery ? '여행' : '자취');
	const targetCopy = $derived(
		isTravelQuery
			? '여행 준비 흐름에 더 잘 맞아요. 잠시 후 스페인 여행 스레드를 열어드릴게요.'
			: '자취 시작 흐름에 더 잘 맞아요. 잠시 후 딱 맞는 쇼핑스레드를 열어드릴게요.'
	);

	onMount(() => {
		const timer = window.setTimeout(() => {
			goto(`/interest/${targetInterest}/contents/shopping-thread?q=${encodeURIComponent(query)}`, {
				replaceState: true
			});
		}, 1500);

		return () => window.clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>AI 관심사 이동</title>
</svelte:head>

<section class="routing-page">
	<div class="routing-card">
		<div class="routing-card__orb">
			<Sparkles size={34} fill="currentColor" />
		</div>
		<div class="routing-card__copy">
			<span>AI가 요청을 읽는 중</span>
			<h1>{targetLabel} 관심사로 이동할게요</h1>
			<p><strong>{query}</strong> 요청은 {targetCopy}</p>
		</div>
		<div class="routing-target">
			{#if isTravelQuery}
				<Plane size={17} />
			{:else}
				<Home size={17} />
			{/if}
			<span>{targetLabel}</span>
			<small>새 관심사 매칭</small>
		</div>
		<div class="routing-progress"><span></span></div>
	</div>
</section>

<style>
	:global(body) {
		background: #eef7f4;
	}

	.routing-page {
		display: grid;
		min-height: 100dvh;
		place-items: center;
		padding: 1.2rem;
		background:
			radial-gradient(circle at 50% 18%, rgba(53, 198, 167, 0.28), transparent 32%),
			linear-gradient(180deg, #e6f7f2 0%, #eef4ff 100%);
		color: #111827;
	}

	.routing-card {
		width: min(100%, 23rem);
		border-radius: 1.6rem;
		background: rgba(255, 255, 255, 0.92);
		padding: 1.35rem;
		text-align: center;
		box-shadow: 0 24px 48px rgba(35, 118, 216, 0.14);
	}

	.routing-card__orb {
		display: grid;
		width: 4.6rem;
		height: 4.6rem;
		margin: 0 auto 1rem;
		place-items: center;
		border-radius: 999px;
		background: #111827;
		color: #ffffff;
		animation: ai-pulse 900ms ease-in-out infinite alternate;
	}

	.routing-card__copy span {
		color: #2376d8;
		font-size: 0.78rem;
		font-weight: 900;
	}

	.routing-card__copy h1 {
		margin: 0.42rem 0 0;
		font-size: 1.36rem;
		line-height: 1.18;
		font-weight: 900;
		letter-spacing: 0;
	}

	.routing-card__copy p {
		margin: 0.62rem 0 0;
		color: #667085;
		font-size: 0.86rem;
		line-height: 1.45;
		word-break: keep-all;
	}

	.routing-card__copy strong {
		color: #111827;
		font-weight: 900;
	}

	.routing-target {
		display: inline-flex;
		align-items: center;
		gap: 0.34rem;
		margin-top: 1rem;
		border-radius: 999px;
		background: #edf8f1;
		padding: 0.48rem 0.68rem;
		color: #0d7a45;
		font-size: 0.82rem;
		font-weight: 900;
	}

	.routing-target small {
		color: #4a6656;
		font-size: 0.68rem;
		font-weight: 800;
	}

	.routing-progress {
		overflow: hidden;
		height: 0.4rem;
		margin-top: 1.15rem;
		border-radius: 999px;
		background: #e5e7eb;
	}

	.routing-progress span {
		display: block;
		width: 42%;
		height: 100%;
		border-radius: inherit;
		background: linear-gradient(90deg, #35c6a7, #2376d8);
		animation: ai-route 1.1s ease-in-out infinite;
	}

	@keyframes ai-pulse {
		from {
			transform: scale(0.94);
			box-shadow: 0 0 0 rgba(35, 118, 216, 0);
		}

		to {
			transform: scale(1);
			box-shadow: 0 0 28px rgba(35, 118, 216, 0.28);
		}
	}

	@keyframes ai-route {
		0% {
			transform: translateX(-110%);
		}

		100% {
			transform: translateX(250%);
		}
	}
</style>
