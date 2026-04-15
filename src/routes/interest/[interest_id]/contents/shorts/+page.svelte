<script lang="ts">
	import { Eye, Heart, Play } from 'lucide-svelte';
	import { interestHeaderMeta } from '$lib/data/interest-home';
	import type { InterestArea } from '$lib/stores/interest';

	type ShortsItem = {
		id: string;
		title: string;
		views: string;
		duration: string;
		creator: string;
		liked?: boolean;
		thumbnail: string;
		overlayLabel?: string;
		overlayPosition?: 'top' | 'middle' | 'bottom';
		overlayTone?: 'default' | 'highlight' | 'stats';
	};

	let { data } = $props<{
		data: {
			interest: string;
			shorts: ShortsItem[];
		};
	}>();

	const interest = $derived(data.interest as InterestArea);
	const theme = $derived(interestHeaderMeta[interest]);
	const chips = [
		{ id: 'shorts', label: 'Shorts', active: true, italic: true },
		{ id: 'gallery', label: '📸 갤러리' },
		{ id: 'popular', label: '🏆 인기글' },
		{ id: 'following', label: '💘 나의 팔로잉' }
	];

	function linesOf(text: string) {
		return text.split('\n');
	}
</script>

<svelte:head>
	<title>{theme.label} 쇼츠</title>
</svelte:head>

<section
	class="shorts-feed"
	style={`
		--shorts-pill-start: ${theme.palette.noticeAccent};
		--shorts-pill-end: ${theme.palette.noticeBorder};
		--shorts-pill-text: ${theme.palette.noticeAccent};
		--shorts-pill-muted-bg: rgba(255, 255, 255, 0.28);
		--shorts-shadow: ${theme.palette.cardShadow};
		--shorts-accent: ${theme.palette.accent};
		--shorts-muted: ${theme.palette.cardMuted};
	`}
>
	<div class="shorts-feed__chips">
		{#each chips as chip}
			<button
				type="button"
				class:shorts-feed__chip--active={chip.active}
				class="shorts-feed__chip"
			>
				<span class:shorts-feed__chip-italic={chip.italic}>{chip.label}</span>
			</button>
		{/each}
	</div>

	<div class="shorts-feed__grid">
		{#each data.shorts as short (short.id)}
			<button type="button" class="shorts-card">
				<img class="shorts-card__image" src={short.thumbnail} alt={short.title} loading="lazy" />
				<div class="shorts-card__top-fade"></div>
				<div class="shorts-card__bottom-fade"></div>

				<div class="shorts-card__meta-top">
					<div class="shorts-card__icon-copy">
						<Play size={11} fill="currentColor" />
						<span>{short.duration}</span>
					</div>
					<div class="shorts-card__icon-copy">
						<Eye size={14} />
						<span>{short.views}</span>
					</div>
				</div>

				{#if short.overlayLabel}
					<div
						class:shorts-card__label--highlight={short.overlayTone === 'highlight'}
						class="shorts-card__label"
					>
						{short.overlayLabel}
					</div>
				{/if}

				<div class={`shorts-card__copy shorts-card__copy--${short.overlayPosition ?? 'bottom'} shorts-card__copy--${short.overlayTone ?? 'default'}`}>
					{#each linesOf(short.title) as line}
						<span>{line}</span>
					{/each}
				</div>

				<div class="shorts-card__footer">
					<span>{short.creator}</span>
					<Heart
						size={28}
						fill={short.liked ? 'currentColor' : 'none'}
						strokeWidth={2.1}
						class={short.liked ? 'shorts-card__heart shorts-card__heart--liked' : 'shorts-card__heart'}
					/>
				</div>
			</button>
		{/each}
	</div>
</section>

<style>
	.shorts-feed {
		padding: 0.4rem 0.85rem 6.4rem;
	}

	.shorts-feed__chips {
		display: flex;
		gap: 0.7rem;
		overflow-x: auto;
		padding: 0.15rem 0 1.1rem;
		scrollbar-width: none;
	}

	.shorts-feed__chips::-webkit-scrollbar {
		display: none;
	}

	.shorts-feed__chip {
		border: none;
		flex: 0 0 auto;
		border-radius: 999px;
		padding: 0.88rem 1.48rem;
		background: var(--shorts-pill-muted-bg);
		color: var(--shorts-pill-text);
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
		font-size: 1.02rem;
		line-height: 1;
		box-shadow: 0 10px 22px rgba(70, 96, 140, 0.08);
		backdrop-filter: blur(6px);
	}

	.shorts-feed__chip--active {
		background: linear-gradient(135deg, var(--shorts-pill-start), var(--shorts-pill-end));
		color: #ffffff;
		box-shadow: 0 14px 24px rgba(73, 102, 212, 0.24);
	}

	.shorts-feed__chip-italic {
		font-style: italic;
	}

	.shorts-feed__grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem 0.9rem;
	}

	.shorts-card {
		position: relative;
		aspect-ratio: 0.72;
		border: none;
		padding: 0;
		width: 100%;
		border-radius: 1.35rem;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.2);
		box-shadow: var(--shorts-shadow);
		color: #ffffff;
		text-align: left;
	}

	.shorts-card__image,
	.shorts-card__top-fade,
	.shorts-card__bottom-fade {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.shorts-card__image {
		object-fit: cover;
	}

	.shorts-card__top-fade {
		background: linear-gradient(180deg, rgba(13, 16, 28, 0.52) 0%, rgba(13, 16, 28, 0.12) 24%, rgba(13, 16, 28, 0) 42%);
	}

	.shorts-card__bottom-fade {
		background: linear-gradient(180deg, rgba(13, 16, 28, 0) 46%, rgba(13, 16, 28, 0.2) 62%, rgba(13, 16, 28, 0.86) 100%);
	}

	.shorts-card__meta-top,
	.shorts-card__label,
	.shorts-card__copy,
	.shorts-card__footer {
		position: absolute;
		z-index: 1;
	}

	.shorts-card__meta-top {
		top: 0.72rem;
		left: 0.72rem;
		right: 0.72rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.78rem;
		font-weight: 500;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.34);
	}

	.shorts-card__icon-copy {
		display: flex;
		align-items: center;
		gap: 0.26rem;
	}

	.shorts-card__label {
		top: 3rem;
		left: 0.72rem;
		padding: 0.18rem 0.42rem;
		border-radius: 0.35rem;
		background: rgba(255, 255, 255, 0.82);
		color: #555151;
		font-size: 0.63rem;
		font-weight: 600;
		line-height: 1.15;
	}

	.shorts-card__label--highlight {
		background: rgba(255, 210, 74, 0.94);
		color: #6f4a00;
	}

	.shorts-card__copy {
		left: 0.82rem;
		right: 0.82rem;
		display: flex;
		flex-direction: column;
		gap: 0.08rem;
		font-family: 'Pretendard', sans-serif;
		font-weight: 800;
		line-height: 1.12;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.34);
	}

	.shorts-card__copy span {
		display: block;
	}

	.shorts-card__copy--top {
		top: 3.45rem;
		font-size: 0.82rem;
	}

	.shorts-card__copy--middle {
		top: 42%;
		transform: translateY(-50%);
		font-size: 0.9rem;
	}

	.shorts-card__copy--bottom {
		bottom: 2.8rem;
		font-size: 0.78rem;
	}

	.shorts-card__copy--highlight {
		top: 2.8rem;
		font-size: 0.84rem;
	}

	.shorts-card__copy--stats {
		top: 42%;
		transform: translateY(-50%);
		gap: 0.02rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.01em;
	}

	.shorts-card__copy--stats span:nth-child(2),
	.shorts-card__copy--stats span:nth-child(4),
	.shorts-card__copy--stats span:nth-child(6) {
		font-size: 0.98rem;
	}

	.shorts-card__footer {
		left: 0.76rem;
		right: 0.76rem;
		bottom: 0.72rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.72rem;
		font-weight: 500;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.34);
	}

	.shorts-card__footer span {
		font-size: 0.72rem;
	}

	.shorts-card__heart {
		color: #ffffff;
		filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.32));
	}

	.shorts-card__heart--liked {
		color: #ff5e8d;
	}

	@media (max-width: 420px) {
		.shorts-feed {
			padding: 0.28rem 0.78rem 6.2rem;
		}

		.shorts-feed__chip {
			padding: 0.82rem 1.32rem;
			font-size: 0.98rem;
		}

		.shorts-feed__grid {
			gap: 0.88rem 0.82rem;
		}

		.shorts-card {
			border-radius: 1.2rem;
		}

		.shorts-card__copy--middle {
			font-size: 0.84rem;
		}
	}
</style>
