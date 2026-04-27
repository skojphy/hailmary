<script lang="ts">
	import { goto } from '$app/navigation';
	import { Play, Search, Sparkles, UserRound } from 'lucide-svelte';
	import type {
		CardBadge,
		FollowingCard,
		GalleryCard,
		InterestHomeCard,
		InterestHomeTheme,
		LiveCard,
		ProductCard,
		RankingCard,
		ShortsCard,
		StoryCard
	} from '$lib/data/interest-home';
	import { fly } from 'svelte/transition';

	let { data } = $props<{
		data: {
			interest: string;
			theme: InterestHomeTheme;
		};
	}>();

	let aiPrompt = $state('자취 필수템');

	const leftCards = $derived(
		data.theme.cards.filter((card: InterestHomeCard) => card.column === 'left')
	);
	const rightCards = $derived(
		data.theme.cards.filter((card: InterestHomeCard) => card.column === 'right')
	);

	function cardKey(card: InterestHomeCard) {
		return `${card.type}-${card.id}`;
	}

	function badgeClass(badge: CardBadge) {
		if (badge.kind !== 'text') return 'home-card__badge';
		if (badge.tone === 'accent') return 'home-card__badge home-card__badge--accent';
		if (badge.tone === 'shorts') return 'home-card__badge home-card__badge--shorts';
		return 'home-card__badge';
	}

	function getActionLabelParts(label: string) {
		const match = label.match(/^(더 많은 )(.+?)( 보기)$/);

		if (!match) {
			return {
				prefix: label,
				focus: '',
				suffix: ''
			};
		}

		return {
			prefix: match[1],
			focus: match[2],
			suffix: match[3]
		};
	}

	function submitAiRequest(event: SubmitEvent) {
		event.preventDefault();

		const query = aiPrompt.trim() || '자취 필수템';
		goto(
			`/interest/${data.interest}/contents/shopping-thread?q=${encodeURIComponent(query)}`
		);
	}
</script>

<svelte:head>
	<title>{data.theme.header.label} 홈</title>
</svelte:head>

<section
	class="interest-home"
	style={`
		--home-bg: ${data.theme.palette.background};
		--home-bg-gradient: ${data.theme.palette.backgroundGradient};
		--home-notice-bg: ${data.theme.palette.noticeBg};
		--home-notice-border: ${data.theme.palette.noticeBorder};
		--home-notice-accent: ${data.theme.palette.noticeAccent};
		--home-card-bg: ${data.theme.palette.cardBg};
		--home-card-border: ${data.theme.palette.cardBorder};
		--home-card-shadow: ${data.theme.palette.cardShadow};
		--home-card-text: ${data.theme.palette.cardText};
		--home-card-muted: ${data.theme.palette.cardMuted};
		--home-accent: ${data.theme.palette.accent};
		--home-accent-strong: ${data.theme.palette.accentStrong};
		--home-accent-soft: ${data.theme.palette.accentSoft};
		--home-accent-text: ${data.theme.palette.accentText};
		--home-ranking-accent: ${data.theme.palette.rankingAccent};
	`}
>
	<form class="home-notice home-notice--ai" onsubmit={submitAiRequest}>
		<label class="home-notice__text" for="home-ai-prompt">
			<span class="home-notice__icon"><Sparkles size={16} fill="currentColor" /></span>
			<span>유진님, 필요한 것을 말씀해 주세요. </span>
		</label>
		<div class="home-notice__prompt">
			<Search size={15} />
			<input
				id="home-ai-prompt"
				bind:value={aiPrompt}
				placeholder="예: 자취 필수템"
				aria-label="AI에게 요청하기"
			/>
			<button type="submit">요청</button>
		</div>
	</form>

	<div class="home-columns">
		<div class="home-column">
			{#each leftCards as card, index (cardKey(card))}
				<article in:fly={{ y: 20, duration: 600, delay: 50 + index * 150 }} class="home-card">
					{#if card.type === 'story'}
						{@const story = card as StoryCard}
						<div class={badgeClass(story.badge)}>{story.badge.text}</div>
						<h3 class="home-card__story-title">{story.title}</h3>
						<p class="home-card__story-body">{story.body}</p>
						<div class="home-card__meta">
							<div class="home-card__avatars">
								{#each story.avatars.slice(0, 3) as avatar (avatar)}
									<img src={avatar} alt="" />
								{/each}
							</div>
							<span>{story.meta}</span>
						</div>
						{@const action = getActionLabelParts(story.buttonLabel)}
						<button type="button" class="home-card__action">
							<span>{action.prefix}</span><strong>{action.focus}</strong><span>{action.suffix}</span
							>
						</button>
					{:else if card.type === 'product'}
						{@const product = card as ProductCard}
						{#if product.badge.kind === 'logo'}
							<div
								class:home-card__badge-logo--selecti={product.badge.alt === 'Selecti'}
								class="home-card__badge-logo"
							>
								<img src={product.badge.image} alt={product.badge.alt} />
							</div>
						{:else}
							<div class={badgeClass(product.badge)}>{product.badge.text}</div>
						{/if}
						<div class="home-card__media">
							<img src={product.image} alt="" />
						</div>
						<h3 class="home-card__title">{product.title}</h3>
						<div class="home-card__price">
							<span>{product.discount}</span>
							<strong>{product.price}</strong>
						</div>
						<div class="home-card__meta">
							<div class="home-card__avatars">
								{#each product.avatars.slice(0, 3) as avatar (avatar)}
									<img src={avatar} alt="" />
								{/each}
							</div>
							<span>{product.meta}</span>
						</div>
						{@const action = getActionLabelParts(product.buttonLabel)}
						<button type="button" class="home-card__action">
							<span>{action.prefix}</span><strong>{action.focus}</strong><span>{action.suffix}</span
							>
						</button>
					{:else if card.type === 'live'}
						{@const live = card as LiveCard}
						<div class="home-card__badge-live">
							<img src={live.badge.image} alt={live.badge.alt} />
							<span>{live.badge.suffix}</span>
						</div>
						<div class="home-card__media home-card__media--live">
							<img src={live.image} alt="" />
							<div class="home-card__play"><Play size={24} fill="currentColor" /></div>
							<div class="home-card__live-copy">{live.mediaCaption}</div>
						</div>
						<h3 class="home-card__title">{live.title}</h3>
						<div class="home-card__price">
							<span>{live.discount}</span>
							<strong>{live.price}</strong>
						</div>
						<div class="home-card__meta">
							<div class="home-card__avatars">
								{#each live.avatars.slice(0, 3) as avatar (avatar)}
									<img src={avatar} alt="" />
								{/each}
							</div>
							<span>{live.meta}</span>
						</div>
						{@const action = getActionLabelParts(live.buttonLabel)}
						<button type="button" class="home-card__action">
							<span>{action.prefix}</span><strong>{action.focus}</strong><span>{action.suffix}</span
							>
						</button>
					{:else if card.type === 'following'}
						{@const following = card as FollowingCard}
						<div class={badgeClass(following.badge)}>{following.badge.text}</div>
						<div class="following-grid">
							{#each following.people as person}
								<div class="following-person">
									<div class="following-person__avatar">
										<img src={person.image} alt="" />
										<span>+</span>
									</div>
									<strong>{person.name}</strong>
									<small><UserRound size={12} /> {person.followers}</small>
								</div>
							{/each}
						</div>
						{@const action = getActionLabelParts(following.buttonLabel)}
						<button type="button" class="home-card__action">
							<span>{action.prefix}</span><strong>{action.focus}</strong><span>{action.suffix}</span
							>
						</button>
					{/if}
				</article>
			{/each}
		</div>

		<div class="home-column">
			{#each rightCards as card, index (cardKey(card))}
				<article in:fly={{ y: 40, duration: 600, delay: 50 + index * 150 }} class="home-card">
					{#if card.type === 'product'}
						{@const product = card as ProductCard}
						{#if product.badge.kind === 'logo'}
							<div class="home-card__badge-logo">
								<img src={product.badge.image} alt={product.badge.alt} />
							</div>
						{:else}
							<div class={badgeClass(product.badge)}>{product.badge.text}</div>
						{/if}
						<div class="home-card__media">
							<img src={product.image} alt="" />
						</div>
						<h3 class="home-card__title">{product.title}</h3>
						<div class="home-card__price">
							<span>{product.discount}</span>
							<strong>{product.price}</strong>
						</div>
						<div class="home-card__meta">
							<div class="home-card__avatars">
								{#each product.avatars.slice(0, 3) as avatar (avatar)}
									<img src={avatar} alt="" />
								{/each}
							</div>
							<span>{product.meta}</span>
						</div>
						{@const action = getActionLabelParts(product.buttonLabel)}
						<button type="button" class="home-card__action">
							<span>{action.prefix}</span><strong>{action.focus}</strong><span>{action.suffix}</span
							>
						</button>
					{:else if card.type === 'shorts'}
						{@const shorts = card as ShortsCard}
						<div class={badgeClass(shorts.badge)}>{shorts.badge.text}</div>
						<a href="./contents/shorts" class="home-card__link">
							<div class="home-card__media home-card__media--shorts">
								<img src={shorts.image} alt="" />
								<div class="home-card__duration">
									<Play size={11} fill="currentColor" />
									{shorts.duration}
								</div>
								<div class="home-card__overlay-copy">{shorts.title}</div>
							</div>
						</a>
						<div class="home-card__meta">
							<div class="home-card__avatars">
								{#each shorts.avatars.slice(0, 3) as avatar (avatar)}
									<img src={avatar} alt="" />
								{/each}
							</div>
							<span>{shorts.meta}</span>
						</div>
						{@const action = getActionLabelParts(shorts.buttonLabel)}
						<button type="button" class="home-card__action">
							<span>{action.prefix}</span><strong>{action.focus}</strong><span>{action.suffix}</span
							>
						</button>
					{:else if card.type === 'gallery'}
						{@const gallery = card as GalleryCard}
						<div class={badgeClass(gallery.badge)}>{gallery.badge.text}</div>
						<div class="home-card__media home-card__media--gallery">
							<img src={gallery.image} alt="" />
							<div class="home-card__overlay-copy">{gallery.title}</div>
						</div>
						<div class="home-card__meta">
							<div class="home-card__avatars">
								{#each gallery.avatars.slice(0, 3) as avatar (avatar)}
									<img src={avatar} alt="" />
								{/each}
							</div>
							<span>{gallery.meta}</span>
						</div>
						{@const action = getActionLabelParts(gallery.buttonLabel)}
						<button type="button" class="home-card__action">
							<span>{action.prefix}</span><strong>{action.focus}</strong><span>{action.suffix}</span
							>
						</button>
					{:else if card.type === 'ranking'}
						{@const ranking = card as RankingCard}
						<div class={badgeClass(ranking.badge)}>{ranking.badge.text}</div>
						<div class="ranking-list">
							{#each ranking.items as item}
								<div class="ranking-item">
									<div class="ranking-item__copy">
										<strong>{item.rank}</strong>
										<div>
											<h4>{item.label}</h4>
											<p>{item.views}</p>
										</div>
									</div>
									<img src={item.image} alt="" />
								</div>
							{/each}
						</div>
						{@const action = getActionLabelParts(ranking.buttonLabel)}
						<button type="button" class="home-card__action">
							<span>{action.prefix}</span><strong>{action.focus}</strong><span>{action.suffix}</span
							>
						</button>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	:global(body) {
		background: #f4f4f8;
	}

	.interest-home {
		min-height: 100%;
		padding: 0 1rem calc(2rem + env(safe-area-inset-bottom));
		background: transparent;
	}

	.home-notice {
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-direction: column;
		gap: 0.54rem;
		margin: 0.15rem 0 1rem;
		padding: 0.72rem;
		border: 2px solid var(--home-notice-border);
		border-radius: 1.2rem;
		background: var(--home-notice-bg);
		box-shadow: 0 10px 20px rgba(87, 77, 255, 0.12);
	}

	.home-notice__text {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.14rem;
		min-width: 0;
		font-size: 0.84rem;
		line-height: 1.1;
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--home-card-text);
	}

	.home-notice__text strong {
		color: var(--home-notice-accent);
		font-weight: 700;
	}

	.home-notice__icon {
		margin-right: 0.18rem;
		color: #5a49ff;
		font-size: 1.05rem;
	}

	.home-notice__icon :global(svg) {
		display: block;
	}

	.home-notice__prompt {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.45rem;
		width: 100%;
		min-height: 2.72rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.92);
		padding: 0.28rem 0.3rem 0.28rem 0.72rem;
		color: #667085;
		box-shadow: inset 0 0 0 1px rgba(91, 104, 168, 0.1);
	}

	.home-notice__prompt input {
		min-width: 0;
		border: none;
		outline: none;
		background: transparent;
		color: #111827;
		font-family: 'Pretendard', sans-serif;
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0;
	}

	.home-notice__prompt input::placeholder {
		color: #98a2b3;
		font-weight: 600;
	}

	.home-notice button {
		flex-shrink: 0;
		border: none;
		border-radius: 999px;
		background: linear-gradient(135deg, #8d20ff 0%, #406fff 100%);
		padding: 0.62rem 0.92rem;
		color: #ffffff;
		font-family: 'Pretendard', sans-serif;
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1;
	}

	.home-columns {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.9rem;
		align-items: start;
	}

	.home-column {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.home-card {
		padding: 0.92rem;
		border-radius: 1.45rem;
		background: var(--home-card-bg);
		border: 1px solid var(--home-card-border);
		box-shadow: var(--home-card-shadow);
		color: var(--home-card-text);
		backdrop-filter: blur(16px);
	}

	.home-card__badge {
		display: inline-flex;
		align-items: center;
		margin-bottom: 0.82rem;
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
		font-size: 1rem;
		line-height: 1;
		color: var(--home-card-text);
	}

	.home-card__badge--accent {
		color: var(--home-accent);
	}

	.home-card__badge--shorts {
		color: #ff4fa1;
		font-size: 1.12rem;
		font-style: italic;
	}

	.home-card__badge-logo {
		display: inline-flex;
		align-items: center;
		margin-bottom: 0.72rem;
	}

	.home-card__badge-logo img {
		display: block;
		height: 1.12rem;
		width: auto;
	}

	.home-card__badge-logo--selecti img {
		height: 1.28rem;
	}

	.home-card__badge-live {
		display: flex;
		align-items: center;
		gap: 0.34rem;
		margin-bottom: 0.72rem;
	}

	.home-card__badge-live img {
		display: block;
		height: 1.24rem;
		width: auto;
	}

	.home-card__badge-live span {
		color: #ff6a00;
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
		font-size: 0.92rem;
	}

	.home-card__chip {
		padding: 0.22rem 0.44rem;
		border-radius: 0.46rem;
		background: #f6ef58;
		color: #111111;
		box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.04);
	}

	.home-card__story-title,
	.home-card__title {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.28;
		letter-spacing: -0.03em;
		word-break: keep-all;
	}

	.home-card__story-title {
		font-size: 0.96rem;
		line-height: 1.3;
		font-weight: 700;
	}

	.home-card__title {
		font-weight: 400;
	}

	.home-card__story-body {
		margin: 0.52rem 0 0;
		font-size: 0.74rem;
		line-height: 1.4;
		color: var(--home-card-muted);
		display: -webkit-box;
		overflow: hidden;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.home-card__media {
		overflow: hidden;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.76);
		margin-bottom: 0.72rem;
	}

	.home-card__media img {
		display: block;
		width: 100%;
		aspect-ratio: 1.06;
		object-fit: cover;
	}

	.home-card__media--shorts,
	.home-card__media--gallery,
	.home-card__media--live {
		position: relative;
	}

	.home-card__media--shorts img,
	.home-card__media--gallery img,
	.home-card__media--live img {
		aspect-ratio: 0.82;
	}

	.home-card__media--shorts::after,
	.home-card__media--gallery::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 48%;
		background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.62) 100%);
	}

	.home-card__media--live {
		border: 3px solid #ff6d20;
		background: #795d54;
	}

	.home-card__media--live::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(255, 119, 30, 0.06), rgba(0, 0, 0, 0.18));
	}

	.home-card__live-copy {
		position: absolute;
		inset: auto 1rem 1.1rem;
		z-index: 1;
		text-align: center;
		color: #ffffff;
		font-size: 0.84rem;
		line-height: 1.22;
		font-weight: 700;
		white-space: pre-line;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
	}

	.home-card__duration {
		position: absolute;
		top: 0.62rem;
		left: 0.62rem;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
		padding: 0.22rem 0.42rem;
		border-radius: 999px;
		background: rgba(70, 70, 70, 0.44);
		color: #ffffff;
		font-size: 0.72rem;
	}

	.home-card__overlay-copy {
		position: absolute;
		right: 0.82rem;
		bottom: 0.82rem;
		left: 0.82rem;
		z-index: 1;
		color: #ffffff;
		font-size: 0.78rem;
		line-height: 1.3;
		font-weight: 600;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.28);
	}

	.home-card__play {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: grid;
		place-items: center;
		color: #ffffff;
	}

	.home-card__play :global(svg) {
		width: 4rem;
		height: 4rem;
		padding: 1rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(4px);
	}

	.home-card__price {
		display: flex;
		align-items: baseline;
		gap: 0.28rem;
		margin-top: 0.38rem;
	}

	.home-card__price span {
		font-size: 0.94rem;
		font-weight: 300;
		color: var(--home-accent-strong);
	}

	.home-card__price strong {
		font-size: 0.98rem;
		line-height: 1;
		color: #2c2c2c;
		font-weight: 700;
	}

	.home-card__meta {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		margin-top: 0.64rem;
		font-size: 0.76rem;
		font-weight: 600;
		color: var(--home-accent-text);
	}

	.home-card__avatars {
		display: flex;
		align-items: center;
		padding-left: 0.62rem;
	}

	.home-card__avatars img {
		width: 1.42rem;
		height: 1.42rem;
		margin-left: -0.62rem;
		border: 2px solid rgba(255, 255, 255, 0.94);
		border-radius: 999px;
		object-fit: cover;
	}

	.home-card__action {
		width: 100%;
		margin-top: 0.82rem;
		border: none;
		border-radius: 0.86rem;
		background: rgba(255, 255, 255, 0.95);
		padding: 0.68rem 0.7rem;
		color: #9f9aa3;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.82);
	}

	.home-card__action span {
		color: #9f9aa3;
	}

	.home-card__action strong {
		color: #1b1b1b;
		font-weight: 600;
	}

	.home-card__link {
		display: block;
		text-decoration: none;
	}

	.following-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.95rem 0.55rem;
	}

	.following-person {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.following-person__avatar {
		position: relative;
		width: 4.2rem;
		height: 4.2rem;
		margin-bottom: 0.48rem;
	}

	.following-person__avatar img {
		width: 100%;
		height: 100%;
		border-radius: 999px;
		object-fit: cover;
	}

	.following-person__avatar span {
		position: absolute;
		top: -0.18rem;
		right: -0.18rem;
		display: grid;
		place-items: center;
		width: 1.58rem;
		height: 1.58rem;
		border-radius: 999px;
		background: #4663ff;
		color: #ffffff;
		font-size: 1.15rem;
		font-weight: 800;
		box-shadow: 0 6px 10px rgba(70, 99, 255, 0.24);
	}

	.following-person strong {
		font-size: 0.84rem;
		font-weight: 400;
	}

	.following-person small {
		margin-top: 0.16rem;
		font-size: 0.7rem;
		color: var(--home-card-muted);
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
	}

	.following-person small :global(svg) {
		width: 0.78rem;
		height: 0.78rem;
		opacity: 0.75;
	}

	.ranking-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.ranking-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.7rem;
	}

	.ranking-item img {
		width: 3rem;
		height: 3rem;
		border-radius: 0.72rem;
		object-fit: cover;
		background: #f1eff3;
	}

	.ranking-item__copy {
		display: flex;
		align-items: flex-start;
		gap: 0.68rem;
	}

	.ranking-item__copy strong {
		font-size: 1.55rem;
		line-height: 1;
		color: var(--home-ranking-accent);
		font-weight: 300;
	}

	.ranking-item h4 {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.15;
		font-weight: 500;
		color: #4a4a4a;
	}

	.ranking-item p {
		margin: 0.2rem 0 0;
		font-size: 0.78rem;
		color: var(--home-card-muted);
		font-weight: 300;
	}

	@media (max-width: 390px) {
		.interest-home {
			padding-inline: 0.9rem;
		}

		.home-notice {
			padding: 0.66rem;
		}

		.home-notice__text {
			font-size: 0.8rem;
		}

		.home-notice button {
			padding: 0.56rem 0.82rem;
			font-size: 0.76rem;
		}

		.home-card {
			padding: 0.84rem;
		}

		.home-card__story-title,
		.home-card__title {
			font-size: 0.96rem;
		}
	}
</style>
