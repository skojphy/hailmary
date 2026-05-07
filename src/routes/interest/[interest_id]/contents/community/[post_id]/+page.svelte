<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { ArrowLeft, Bookmark, Heart, MessageCircle, Sparkles } from 'lucide-svelte';

	let { data } = $props();

	const productHref = $derived(
		data.type === 'ai' && data.guide
			? `/interest/${page.params.interest_id}/product?url=${encodeURIComponent(data.guide.product.url ?? 'https://item.gmarket.co.kr/Item?goodscode=3080578382')}`
			: ''
	);

	function goBack() {
		goto(`/interest/${page.params.interest_id}/contents/community`);
	}
</script>

<svelte:head>
	<title>{data.type === 'ai' ? 'AI 쇼핑 가이드' : data.post.title}</title>
</svelte:head>

<article class="detail-page">
	<button type="button" class="detail-back" onclick={goBack}>
		<ArrowLeft size={19} />
		<span>인기글</span>
	</button>

	{#if data.type === 'ai' && data.guide}
		{@const guide = data.guide}
		<header class="detail-hero detail-hero--ai">
			<span><Sparkles size={15} fill="currentColor" /> AI 쇼핑 가이드</span>
			<h1>{guide.title}</h1>
			<p>{guide.description}</p>
		</header>

		<div class="detail-photo-grid">
			{#each data.photos as photo}
				<img src={photo} alt="" />
			{/each}
		</div>

		<section class="detail-section">
			<h2>트렌드 분석</h2>
			{#each data.trends as trend}
				<p>{trend}</p>
			{/each}
		</section>

		<section class="detail-section">
			<h2>AI 추천 이유</h2>
			<p>{guide.reason}</p>
		</section>

		<a class="detail-product" href={productHref}>
			<img src={guide.product.imageUrl} alt="" />
			<div>
				<strong>{guide.product.brand}</strong>
				<span>{guide.product.name}</span>
				<b>{guide.product.price}</b>
			</div>
		</a>
	{:else}
		<header class="detail-hero">
			<span>{data.post.author}</span>
			<h1>{data.post.title}</h1>
			<p>커뮤니티에서 반응이 빠르게 올라온 인기글입니다. 실사용 경험과 구매 전 고민을 중심으로 이야기가 이어지고 있어요.</p>
		</header>

		<img class="detail-cover" src={data.photo} alt="" />

		<section class="detail-section">
			<p>
				최근 이 관심사에서 가장 많이 언급되는 포인트는 입문자가 쉽게 따라 할 수 있는 기준과 실제 사용 후 만족도입니다.
				처음 시작하는 사람에게는 선택지가 너무 많아 보이지만, 커뮤니티에서는 꼭 필요한 것부터 천천히 맞추자는 의견이 많았어요.
			</p>
			<p>
				댓글에서는 가격, 보관, 사용 빈도처럼 일상적인 기준이 많이 이야기됩니다. 그래서 단순히 유행하는 아이템보다 오래 쓰기 좋은
				조합을 찾는 흐름이 강합니다.
			</p>
		</section>

		<div class="detail-actions">
			<span><Heart size={17} /> {data.likes}</span>
			<span><Bookmark size={17} /> {data.bookmarks}</span>
			<span><MessageCircle size={17} /> {data.post.comments}</span>
		</div>

		<section class="detail-comments">
			<h2>댓글</h2>
			{#each data.comments as comment}
				<div class="detail-comment">
					<strong>{comment.author}</strong>
					<p>{comment.body}</p>
				</div>
			{/each}
		</section>
	{/if}
</article>

<style>
	.detail-page {
		min-height: calc(100dvh - 8.6rem);
		padding: 0 1.1rem calc(6rem + env(safe-area-inset-bottom));
		background: #ffffff;
		color: #111827;
	}

	.detail-back {
		display: inline-flex;
		align-items: center;
		gap: 0.36rem;
		margin: 0 0 1rem;
		border: 0;
		background: transparent;
		padding: 0.4rem 0;
		color: #111827;
		font-size: 0.92rem;
		font-weight: 900;
	}

	.detail-hero,
	.detail-section,
	.detail-comments {
		background: #ffffff;
	}

	.detail-hero {
		padding: 0 0 1.1rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.detail-hero--ai {
		color: #111827;
	}

	.detail-hero span {
		display: inline-flex;
		align-items: center;
		gap: 0.32rem;
		color: #4f46e5;
		font-size: 0.78rem;
		font-weight: 950;
	}

	.detail-hero--ai span {
		color: #4f46e5;
	}

	.detail-hero h1 {
		margin: 0.58rem 0 0;
		font-size: 1.58rem;
		line-height: 1.2;
		font-weight: 950;
		letter-spacing: 0;
	}

	.detail-hero p,
	.detail-section p,
	.detail-comment p {
		margin: 0.56rem 0 0;
		color: #475569;
		font-size: 0.92rem;
		line-height: 1.52;
		font-weight: 650;
	}

	.detail-hero--ai p {
		color: #475569;
	}

	.detail-photo-grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 0.56rem;
		margin-top: 0.78rem;
	}

	.detail-photo-grid img,
	.detail-cover {
		width: 100%;
		object-fit: cover;
	}

	.detail-photo-grid img {
		aspect-ratio: 1;
		border-radius: 0.9rem;
	}

	.detail-photo-grid img:first-child {
		grid-row: span 2;
		height: 100%;
	}

	.detail-cover {
		display: block;
		aspect-ratio: 16 / 10;
		margin-top: 0.78rem;
		border-radius: 1rem;
	}

	.detail-section,
	.detail-comments {
		margin-top: 1.15rem;
		padding: 0;
	}

	.detail-section h2,
	.detail-comments h2 {
		margin: 0;
		font-size: 1.06rem;
		font-weight: 950;
	}

	.detail-product {
		display: grid;
		grid-template-columns: 4.4rem 1fr;
		gap: 0.82rem;
		align-items: center;
		margin-top: 1.15rem;
		padding: 0.82rem;
		border: 1px solid #e5e7eb;
		border-radius: 1rem;
		background: #f8fafc;
		color: inherit;
		text-decoration: none;
	}

	.detail-product img {
		width: 4.4rem;
		height: 4.4rem;
		border-radius: 0.8rem;
		object-fit: cover;
	}

	.detail-product strong,
	.detail-product span,
	.detail-product b {
		display: block;
	}

	.detail-product span {
		margin-top: 0.28rem;
		color: #334155;
		font-size: 0.9rem;
		font-weight: 750;
	}

	.detail-product b {
		margin-top: 0.28rem;
		font-size: 1.05rem;
		font-weight: 950;
	}

	.detail-actions {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.78rem;
	}

	.detail-actions span {
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
		border-radius: 999px;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		padding: 0.58rem 0.78rem;
		color: #334155;
		font-size: 0.82rem;
		font-weight: 850;
	}

	.detail-comment + .detail-comment {
		margin-top: 0.82rem;
		padding-top: 0.82rem;
		border-top: 1px solid #e2e8f0;
	}
</style>
