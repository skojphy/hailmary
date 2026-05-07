<script lang="ts">
	import { Info, ShoppingBag, Sparkles } from 'lucide-svelte';
	import type { AiPickCard } from '$lib/data/mock/ai-pick';

	let { data } = $props<{
		data: {
			interest: string;
			cards: AiPickCard[];
		};
	}>();
</script>

<svelte:head>
	<title>AI PICK</title>
</svelte:head>

<section class="ai-pick-feed" aria-label="AI PICK 카드 피드">
	{#each data.cards as card}
		<article class="pick-card">
			<img class="pick-card__background" src={card.imageUrl} alt="" />
			<div class="pick-card__shade"></div>

			<div class="pick-card__top">
				<span><Sparkles size={15} fill="currentColor" /> {card.label}</span>
				<div>AI 추천 <Info size={16} /></div>
			</div>

			<div class="pick-card__copy">
				<h2>{card.title}</h2>
				<p>{card.description}</p>
				<div class="pick-card__reason">{card.reason}</div>
			</div>

			<div class="pick-product">
				<div class="pick-product__handle"></div>
				<img src={card.product.imageUrl} alt="" />
				<div class="pick-product__copy">
					<strong>{card.product.brand}</strong>
					<span>{card.product.name}</span>
					<b>{card.product.price}</b>
				</div>
				<button type="button" aria-label="상품 담기"><ShoppingBag size={22} /></button>
			</div>
		</article>
	{/each}
</section>

<style>
	:global(body) {
		background: #111827;
	}

	.ai-pick-feed {
		height: calc(100dvh - 9rem);
		min-height: 34rem;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
		padding: 0 0 calc(5.5rem + env(safe-area-inset-bottom));
		background: #111827;
	}

	.ai-pick-feed::-webkit-scrollbar {
		display: none;
	}

	.pick-card {
		position: relative;
		display: flex;
		min-height: calc(100dvh - 9rem);
		overflow: hidden;
		scroll-snap-align: start;
		color: #ffffff;
		isolation: isolate;
	}

	.pick-card__background,
	.pick-card__shade {
		position: absolute;
		inset: 0;
	}

	.pick-card__background {
		z-index: -2;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.pick-card__shade {
		z-index: -1;
		background:
			linear-gradient(180deg, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.08) 35%, rgba(0, 0, 0, 0.72) 78%),
			linear-gradient(90deg, rgba(0, 0, 0, 0.28), transparent 58%);
	}

	.pick-card__top {
		position: absolute;
		top: 1.1rem;
		left: 1rem;
		right: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
	}

	.pick-card__top span {
		display: inline-flex;
		align-items: center;
		gap: 0.38rem;
		padding: 0.5rem 0.82rem;
		border-radius: 999px;
		background: rgba(17, 24, 39, 0.58);
		color: #86efac;
		font-size: 0.83rem;
		font-weight: 950;
		backdrop-filter: blur(10px);
	}

	.pick-card__top div {
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
		color: rgba(255, 255, 255, 0.88);
		font-size: 0.86rem;
		font-weight: 850;
	}

	.pick-card__copy {
		align-self: flex-end;
		width: 100%;
		padding: 5rem 1rem 8.9rem;
	}

	.pick-card__copy h2 {
		margin: 0;
		max-width: 19rem;
		font-size: clamp(2.15rem, 11vw, 3.35rem);
		line-height: 1.06;
		font-weight: 950;
		letter-spacing: 0;
		text-shadow: 0 4px 18px rgba(0, 0, 0, 0.24);
	}

	.pick-card__copy p {
		margin: 0.82rem 0 0;
		max-width: 18rem;
		font-size: 1.08rem;
		line-height: 1.36;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.9);
	}

	.pick-card__reason {
		margin-top: 0.95rem;
		max-width: 19rem;
		padding: 0.78rem 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 1rem;
		background: rgba(17, 24, 39, 0.38);
		color: rgba(255, 255, 255, 0.86);
		font-size: 0.82rem;
		line-height: 1.38;
		font-weight: 750;
		backdrop-filter: blur(10px);
	}

	.pick-product {
		position: absolute;
		left: 1rem;
		right: 1rem;
		bottom: calc(1rem + env(safe-area-inset-bottom));
		display: grid;
		grid-template-columns: 4.8rem 1fr 2.4rem;
		gap: 0.85rem;
		align-items: center;
		padding: 1rem;
		border-radius: 1.08rem;
		background: #ffffff;
		color: #111827;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
	}

	.pick-product__handle {
		position: absolute;
		top: 0.45rem;
		left: 50%;
		width: 3rem;
		height: 0.36rem;
		border-radius: 999px;
		background: #d1d5db;
		transform: translateX(-50%);
	}

	.pick-product img {
		width: 4.8rem;
		height: 4.8rem;
		border-radius: 0.72rem;
		object-fit: cover;
	}

	.pick-product__copy {
		min-width: 0;
		padding-top: 0.22rem;
	}

	.pick-product__copy strong,
	.pick-product__copy span,
	.pick-product__copy b {
		display: block;
	}

	.pick-product__copy strong {
		font-size: 0.95rem;
		font-weight: 950;
	}

	.pick-product__copy span {
		margin-top: 0.3rem;
		display: -webkit-box;
		overflow: hidden;
		color: #1f2937;
		font-size: 0.92rem;
		line-height: 1.28;
		font-weight: 700;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}

	.pick-product__copy b {
		margin-top: 0.34rem;
		font-size: 1.08rem;
		font-weight: 950;
	}

	.pick-product button {
		display: grid;
		width: 2.4rem;
		height: 2.4rem;
		place-items: center;
		border: 0;
		border-radius: 999px;
		background: #f1f5f9;
		color: #64748b;
	}

	@media (min-width: 520px) {
		.ai-pick-feed {
			height: calc(100dvh - 8.5rem);
			border-radius: 1.4rem;
		}

		.pick-card {
			min-height: calc(100dvh - 8.5rem);
		}
	}
</style>
