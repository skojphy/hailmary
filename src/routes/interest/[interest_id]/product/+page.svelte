<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { ArrowLeft } from 'lucide-svelte';

	const fallbackUrl = 'https://item.gmarket.co.kr/Item?goodscode=3080578382';
	const productUrl = $derived(page.url.searchParams.get('url') || fallbackUrl);

	function goBack() {
		goto(`/interest/${page.params.interest_id}/contents/ai-pick`);
	}
</script>

<svelte:head>
	<title>상품 보기</title>
</svelte:head>

<section class="product-view">
	<div class="product-view__frame">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="product-view__bar" role="button" tabindex="0" onclick={goBack}>
			<button type="button" class="product-view__back" onclick={goBack}>
				<ArrowLeft size={19} />
				<span>AI PICK</span>
			</button>
		</div>
		<iframe
			src={productUrl}
			title="Gmarket 상품 상세"
			loading="eager"
			referrerpolicy="no-referrer-when-downgrade"
			sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
		></iframe>
	</div>
</section>

<style>
	.product-view {
		display: flex;
		flex-direction: column;
		height: calc(100dvh - 9.95rem - env(safe-area-inset-top) - env(safe-area-inset-bottom));
		min-height: 32rem;
		padding: 0 1rem 0.8rem;
	}

	.product-view__bar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: 4.1rem;
		padding: 0.62rem;
		pointer-events: auto;
	}

	.product-view__back {
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;
		gap: 0.32rem;
		min-width: 6.2rem;
		min-height: 2.85rem;
		border: 1px solid rgba(255, 255, 255, 0.54);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.92);
		padding: 0.56rem 0.74rem;
		color: #111827;
		font-size: 0.78rem;
		font-weight: 850;
		pointer-events: auto;
		box-shadow: 0 8px 18px rgba(15, 23, 42, 0.16);
		backdrop-filter: blur(10px);
	}

	.product-view__frame {
		position: relative;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		border: 1px solid rgba(15, 23, 42, 0.08);
		border-radius: 1.25rem;
		background: #ffffff;
		box-shadow: 0 18px 36px rgba(15, 23, 42, 0.1);
	}

	.product-view__frame iframe {
		position: relative;
		z-index: 1;
		display: block;
		width: 100%;
		height: calc(100% + 50px);
		border: 0;
		background: #ffffff;
		transform: translateY(-50px);
	}
</style>
