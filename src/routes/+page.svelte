<script lang="ts">
	import { browser } from '$app/environment';

	const InterestExplorer = browser
		? import('$lib/components/interests/InterestExplorer.svelte').then((module) => module.default)
		: null;
</script>

{#if browser && InterestExplorer}
	{#await InterestExplorer then Component}
		<Component />
	{:catch}
		<div class="interest-page-fallback">
			<p>관심사 맵을 불러오지 못했어요.</p>
		</div>
	{/await}
{:else}
	<div class="interest-page-fallback">
		<p>관심사 맵을 준비 중이에요.</p>
	</div>
{/if}

<style>
	.interest-page-fallback {
		display: grid;
		min-height: 100dvh;
		place-items: center;
		background: #121212;
		color: #fff7f0;
		font-size: 1rem;
	}
</style>
