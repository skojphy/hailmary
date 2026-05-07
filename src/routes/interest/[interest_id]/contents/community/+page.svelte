<script lang="ts">
	import { Eye, MessageCircle, ShoppingBag, Sparkles, TrendingUp } from 'lucide-svelte';
	import type { AiPickCard } from '$lib/data/mock/ai-pick';

	type CommunityItem = {
		id: string;
		author: string;
		title: string;
		views: string;
		comments: number;
	};

	let { data } = $props<{
		data: {
			interest: string;
			communityItems: CommunityItem[];
			aiGuide: AiPickCard | null;
		};
	}>();
</script>

<svelte:head>
	<title>커뮤니티</title>
</svelte:head>

<section class="community-page">
	<div class="community-hero">
		<div>
			<span class="community-hero__eyebrow"><TrendingUp size={15} /> 지금 가장 뜨는 이야기</span>
			<h2>인기글</h2>
			<p>관심사 멤버들이 많이 보고 댓글 단 글을 AI 추천과 함께 모았어요.</p>
		</div>
		<div class="community-hero__rank">
			<strong>TOP</strong>
			<span>{data.communityItems.length}</span>
		</div>
	</div>

	<div class="post-list">
		{#each data.communityItems as post, index}
			{#if index === 2 && data.aiGuide}
				<article class="ai-guide-card">
					<div class="ai-guide-card__head">
						<span><Sparkles size={15} fill="currentColor" /> AI 쇼핑 가이드</span>
						<small>관심사 트렌드 요약</small>
					</div>
					<h3>{data.aiGuide.title}</h3>
					<p>{data.aiGuide.description}</p>
					<div class="ai-guide-card__reason">{data.aiGuide.reason}</div>
					<div class="ai-guide-product">
						<img src={data.aiGuide.product.imageUrl} alt="" />
						<div>
							<strong>{data.aiGuide.product.brand}</strong>
							<span>{data.aiGuide.product.name}</span>
							<b>{data.aiGuide.product.price}</b>
						</div>
						<ShoppingBag size={20} />
					</div>
				</article>
			{/if}

			<a href={`/interest/${data.interest}/contents/community#${post.id}`} class="post-card">
				<div class="post-card__number">{String(index + 1).padStart(2, '0')}</div>
				<div class="post-card__body">
					<h3>{post.title}</h3>
					<div class="post-card__meta">
						<span>{post.author}</span>
						<div>
							<span><Eye size={14} />{post.views}</span>
							<span><MessageCircle size={14} />{post.comments}</span>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.community-page {
		padding: 0.25rem 1rem calc(6rem + env(safe-area-inset-bottom));
		color: #111827;
	}

	.community-hero {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
		padding: 1.15rem;
		border: 1px solid rgba(17, 24, 39, 0.06);
		border-radius: 1.4rem;
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.88)),
			radial-gradient(circle at 18% 0%, rgba(87, 77, 255, 0.16), transparent 36%);
		box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
	}

	.community-hero__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: #4f46e5;
		font-size: 0.78rem;
		font-weight: 900;
	}

	.community-hero h2 {
		margin: 0.38rem 0 0;
		font-size: 1.72rem;
		line-height: 1;
		font-weight: 950;
		letter-spacing: 0;
	}

	.community-hero p {
		margin: 0.5rem 0 0;
		max-width: 15rem;
		color: #64748b;
		font-size: 0.88rem;
		line-height: 1.38;
		font-weight: 650;
	}

	.community-hero__rank {
		display: grid;
		width: 4.25rem;
		height: 4.25rem;
		place-items: center;
		border-radius: 1.15rem;
		background: #111827;
		color: #ffffff;
		box-shadow: 0 14px 24px rgba(17, 24, 39, 0.2);
	}

	.community-hero__rank strong,
	.community-hero__rank span {
		line-height: 1;
	}

	.community-hero__rank strong {
		align-self: end;
		color: #a7f3d0;
		font-size: 0.7rem;
		font-weight: 950;
	}

	.community-hero__rank span {
		align-self: start;
		font-size: 1.55rem;
		font-weight: 950;
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 0.78rem;
	}

	.post-card {
		display: grid;
		grid-template-columns: 2.35rem 1fr;
		gap: 0.82rem;
		align-items: start;
		padding: 1rem;
		border: 1px solid rgba(226, 232, 240, 0.94);
		border-radius: 1.12rem;
		background: #ffffff;
		text-decoration: none;
		box-shadow: 0 10px 22px rgba(15, 23, 42, 0.055);
	}

	.post-card__number {
		display: grid;
		width: 2.35rem;
		height: 2.35rem;
		place-items: center;
		border-radius: 0.86rem;
		background: #f1f5f9;
		color: #475569;
		font-size: 0.84rem;
		font-weight: 950;
	}

	.post-card__body {
		min-width: 0;
	}

	.post-card h3 {
		margin: 0;
		color: #0f172a;
		font-size: 1rem;
		line-height: 1.34;
		font-weight: 850;
		letter-spacing: 0;
	}

	.post-card__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.7rem;
		margin-top: 0.72rem;
		color: #94a3b8;
		font-size: 0.76rem;
		font-weight: 750;
	}

	.post-card__meta div,
	.post-card__meta div span {
		display: inline-flex;
		align-items: center;
	}

	.post-card__meta div {
		gap: 0.56rem;
	}

	.post-card__meta div span {
		gap: 0.2rem;
	}

	.ai-guide-card {
		overflow: hidden;
		padding: 1rem;
		border-radius: 1.35rem;
		background:
			linear-gradient(145deg, rgba(17, 24, 39, 0.94), rgba(30, 41, 59, 0.96)),
			radial-gradient(circle at 12% 0%, rgba(167, 243, 208, 0.4), transparent 35%);
		color: #ffffff;
		box-shadow: 0 18px 36px rgba(15, 23, 42, 0.22);
	}

	.ai-guide-card__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.7rem;
		margin-bottom: 0.92rem;
	}

	.ai-guide-card__head span {
		display: inline-flex;
		align-items: center;
		gap: 0.36rem;
		color: #86efac;
		font-size: 0.8rem;
		font-weight: 950;
	}

	.ai-guide-card__head small {
		color: rgba(255, 255, 255, 0.64);
		font-size: 0.72rem;
		font-weight: 800;
	}

	.ai-guide-card h3 {
		margin: 0;
		max-width: 17rem;
		font-size: 1.35rem;
		line-height: 1.18;
		font-weight: 950;
		letter-spacing: 0;
	}

	.ai-guide-card p {
		margin: 0.52rem 0 0;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.92rem;
		line-height: 1.42;
		font-weight: 650;
	}

	.ai-guide-card__reason {
		margin-top: 0.86rem;
		padding: 0.72rem 0.78rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 0.9rem;
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.82);
		font-size: 0.78rem;
		line-height: 1.38;
		font-weight: 750;
	}

	.ai-guide-product {
		display: grid;
		grid-template-columns: 4.15rem 1fr 1.6rem;
		gap: 0.78rem;
		align-items: center;
		margin-top: 0.9rem;
		padding: 0.62rem;
		border-radius: 1rem;
		background: #ffffff;
		color: #111827;
	}

	.ai-guide-product img {
		width: 4.15rem;
		height: 4.15rem;
		border-radius: 0.72rem;
		object-fit: cover;
	}

	.ai-guide-product div {
		min-width: 0;
	}

	.ai-guide-product strong,
	.ai-guide-product span,
	.ai-guide-product b {
		display: block;
	}

	.ai-guide-product strong {
		font-size: 0.82rem;
		font-weight: 950;
	}

	.ai-guide-product span {
		margin-top: 0.18rem;
		color: #334155;
		font-size: 0.82rem;
		line-height: 1.26;
		font-weight: 700;
	}

	.ai-guide-product b {
		margin-top: 0.22rem;
		font-size: 0.98rem;
		font-weight: 950;
	}

	.ai-guide-product :global(svg) {
		color: #94a3b8;
	}
</style>
