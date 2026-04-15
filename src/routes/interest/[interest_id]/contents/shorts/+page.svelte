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
	let likedById = $state<Record<string, boolean>>({});

	$effect(() => {
		likedById = Object.fromEntries(
			data.shorts.map((short: ShortsItem) => [short.id, short.liked ?? false])
		);
	});

	function isLiked(short: ShortsItem) {
		return likedById[short.id] ?? false;
	}

	function toggleLike(id: string) {
		likedById = {
			...likedById,
			[id]: !likedById[id]
		};
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
	<div class="shorts-feed__grid">
		{#each data.shorts as short (short.id)}
			<article class="shorts-card">
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

				<div class="shorts-card__footer">
					<span>{short.creator}</span>
					<button
						type="button"
						class={isLiked(short) ? 'shorts-card__heart shorts-card__heart--liked' : 'shorts-card__heart'}
						aria-label={isLiked(short) ? '좋아요 취소' : '좋아요'}
						onclick={() => toggleLike(short.id)}
					>
						<Heart
							size={28}
							fill={isLiked(short) ? 'currentColor' : 'none'}
							strokeWidth={1.75}
						/>
					</button>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.shorts-feed {
		padding: 0 0.85rem 6.4rem;
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
		font-weight: 300;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.34);
	}

	.shorts-card__icon-copy {
		display: flex;
		align-items: center;
		gap: 0.26rem;
	}

	.shorts-card__footer {
		left: 0.76rem;
		right: 0.76rem;
		bottom: 0.52rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.86rem;
		font-weight: 500;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.34);
	}

	.shorts-card__footer span {
		font-size: 0.86rem;
	}

	.shorts-card__heart {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: none;
		background: transparent;
		color: rgba(255, 255, 255, 0.66);
		filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.32));
		cursor: pointer;
	}

	.shorts-card__heart--liked {
		color: #ff5e8d;
		filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.22));
	}

	.shorts-card__heart--liked :global(svg) {
		stroke: rgba(255, 255, 255, 0.36);
	}

	@media (max-width: 420px) {
		.shorts-feed {
			padding: 0 0.78rem 6.2rem;
		}

		.shorts-feed__grid {
			gap: 0.88rem 0.82rem;
		}

		.shorts-card {
			border-radius: 1.2rem;
		}
	}
</style>
