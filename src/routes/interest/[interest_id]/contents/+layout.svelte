<script lang="ts">
	import { page } from '$app/state';
	import { interestHeaderMeta } from '$lib/data/interest-home';
	import type { InterestArea } from '$lib/stores/interest';

	let { children } = $props();

	const tabs = [
		{ id: 'shorts', label: 'Shorts', path: 'shorts', italic: true },
		{ id: 'shopping-thread', label: '딱! 쇼핑스레드', path: 'shopping-thread' },
		{ id: 'commerce', label: '📸 갤러리', path: 'commerce' },
		{ id: 'community', label: '🏆 인기글', path: 'community' }
	];

	const interest = $derived(page.params.interest_id as InterestArea);
	const meta = $derived(interestHeaderMeta[interest]);
</script>

<div
	class="contents-shell"
	style={`
    --contents-pill-start: ${meta.palette.noticeAccent};
    --contents-pill-end: ${meta.palette.noticeBorder};
    --contents-pill-text: ${meta.palette.noticeAccent};
    --contents-pill-muted-bg: rgba(255, 255, 255, 0.28);
    --contents-pill-shadow: ${meta.palette.cardShadow};
  `}
>
	<div class="contents-tabs scrollbar-hide">
		{#each tabs as tab}
			<a
				href={tab.path.startsWith('..')
					? `/interest/${page.params.interest_id}/home#following`
					: `/interest/${page.params.interest_id}/contents/${tab.path}`}
				class:contents-tab--active={page.url.pathname.includes(`/contents/${tab.path}`)}
				class="contents-tab"
			>
				<span class:contents-tab__label--italic={tab.italic}>{tab.label}</span>
			</a>
		{/each}
	</div>

	<div class="w-full flex-1 relative">
		{@render children()}
	</div>
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.contents-shell {
		width: 100%;
	}

	.contents-tabs {
		display: flex;
		gap: 0.7rem;
		overflow-x: auto;
		padding: 0.55rem 0.85rem 1.05rem;
	}

	.contents-tab {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 3.45rem;
		padding: 0.88rem 1.55rem;
		border-radius: 999px;
		background: var(--contents-pill-muted-bg);
		color: var(--contents-pill-text);
		text-decoration: none;
		box-shadow: 0 10px 22px rgba(70, 96, 140, 0.08);
		backdrop-filter: blur(6px);
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
		font-size: 1.02rem;
		line-height: 1;
	}

	.contents-tab--active {
		color: #ffffff;
		background: linear-gradient(135deg, var(--contents-pill-start), var(--contents-pill-end));
		box-shadow: 0 14px 24px rgba(73, 102, 212, 0.24);
	}

	.contents-tab__label--italic {
		font-style: italic;
	}

	@media (max-width: 420px) {
		.contents-tabs {
			gap: 0.62rem;
			padding: 0.48rem 0.78rem 0.98rem;
		}

		.contents-tab {
			min-height: 3.22rem;
			padding: 0.82rem 1.38rem;
			font-size: 0.98rem;
		}
	}
</style>
