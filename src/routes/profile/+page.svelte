<script lang="ts">
	import { ArrowLeft, Bell, MessageSquareMore, Plus } from 'lucide-svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import { currentInterest } from '$lib/stores/interest';

	const tabs = ['나의 활동', '주문 내역', '미션 · 보상'] as const;

	const bubbles = [
		{
			label: '메이크업',
			badge: '12.2K 참여 중',
			className: 'profile-bubble--makeup profile-bubble--clover'
		},
		{
			label: '테크',
			badge: '12.2K 참여 중',
			className: 'profile-bubble--tech profile-bubble--blob'
		},
		{
			label: '러닝',
			badge: '12.2K 참여 중',
			className: 'profile-bubble--running profile-bubble--orb'
		}
	];

	const savedShorts = [
		{
			id: '1',
			title: '4시간후 설화수와 함께 2026년에 만나요',
			views: '0.5K',
			image:
				'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
		},
		{
			id: '2',
			title: '4시간후 설화수와 함께 2026년에 만나요',
			views: '0.5K',
			image:
				'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
		}
	];

	const posts = [
		{
			id: '1',
			title: '내돈내산 흑백요리사 맛집 BEST 10',
			body: '제가 가본 곳중에 제일 괜찮은 곳을 뽑아보았는데요. 맛피자의 가장 맛있는데, 위치는 용...',
			author: '@daeyoon',
			image:
				'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80'
		},
		{
			id: '2',
			title: '내돈내산 흑백요리사 맛집 BEST 10',
			body: '제가 가본 곳중에 제일 괜찮은 곳을 뽑아보았는데요. 맛피자의 가장 맛있는데, 위치는 용...',
			author: '@daeyoon',
			image:
				'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80'
		}
	];
</script>

<svelte:head>
	<title>프로필</title>
</svelte:head>

<div class="profile-shell">
	<section class="profile-top">
		<div class="profile-toolbar">
			<a class="profile-icon-button" href={`/interest/${$currentInterest}/home`} aria-label="뒤로 가기">
				<ArrowLeft size={24} />
			</a>

			<div class="profile-toolbar__actions">
				<button type="button" class="profile-icon-button" aria-label="메시지">
					<MessageSquareMore size={22} />
				</button>
				<button type="button" class="profile-icon-button" aria-label="알림">
					<Bell size={22} />
				</button>
			</div>
		</div>

		<div class="profile-hero">
			<div class="profile-avatar-wrap">
				<img
					class="profile-avatar"
					src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=240&q=80"
					alt="김다미 프로필 이미지"
				/>
				<div class="profile-badge">B</div>
			</div>

			<h1>김다미</h1>

			<div class="profile-stats">
				<span>팔로워 280</span>
				<span>팔로잉 35</span>
			</div>
		</div>

		<div class="profile-bubbles">
			{#each bubbles as bubble}
				<div class={`profile-bubble ${bubble.className}`}>
					<strong>{bubble.label}</strong>
					<span>{bubble.badge}</span>
				</div>
			{/each}

			<button type="button" class="profile-bubbles__add" aria-label="관심사 추가">
				<Plus size={28} />
			</button>
		</div>
	</section>

	<section class="profile-content">
		<div class="profile-tabs">
			{#each tabs as tab, index}
				<button type="button" class:active={index === 0}>{tab}</button>
			{/each}
		</div>

		<div class="profile-section">
			<h2>내가 저장한 쇼츠</h2>
			<div class="profile-shorts">
				{#each savedShorts as item}
					<article class="short-card">
						<img src={item.image} alt="" />
						<div class="short-card__overlay">
							<div class="short-card__meta">
								<span class="short-card__badge">Shorts</span>
								<span>{item.views}</span>
							</div>
							<p>{item.title}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>

		<div class="profile-section">
			<h2>내가 쓴 글</h2>
			<div class="profile-posts">
				{#each posts as post}
					<article class="post-card">
						<div class="post-card__top">
							<img src={post.image} alt="" />
							<div>
								<h3>{post.title}</h3>
								<p>{post.body}</p>
							</div>
						</div>
						<div class="post-card__author">
							<div class="post-card__avatar"></div>
							<span>{post.author}</span>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<BottomNav />
</div>

<style>
	:global(body) {
		background: #f3f4f6;
	}

	.profile-shell {
		position: relative;
		min-height: 100dvh;
		width: 100%;
		max-width: 28rem;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 22px 50px rgba(15, 23, 42, 0.15);
	}

	.profile-top {
		padding: 18px 18px 22px;
		background: #242424;
		color: #ffffff;
	}

	.profile-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 18px;
	}

	.profile-toolbar__actions {
		display: flex;
		gap: 12px;
	}

	.profile-icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 999px;
		background: transparent;
		color: inherit;
	}

	.profile-hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 4px;
	}

	.profile-avatar-wrap {
		position: relative;
	}

	.profile-avatar {
		width: 96px;
		height: 96px;
		border-radius: 999px;
		object-fit: cover;
	}

	.profile-badge {
		position: absolute;
		top: -8px;
		left: 50%;
		transform: translateX(-50%);
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 4px solid #242424;
		border-radius: 14px;
		background: #2563ff;
		box-shadow: 0 10px 18px rgba(37, 99, 255, 0.35);
		font-size: 1.1rem;
		font-weight: 800;
	}

	.profile-hero h1 {
		margin: 14px 0 0;
		font-size: 2.1rem;
		line-height: 1;
		letter-spacing: -0.05em;
	}

	.profile-stats {
		display: flex;
		gap: 18px;
		margin-top: 12px;
		color: rgba(255, 255, 255, 0.68);
		font-size: 0.98rem;
	}

	.profile-bubbles {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		align-items: end;
		gap: 10px;
		margin-top: 24px;
	}

	.profile-bubble {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 18px 10px;
		color: #fff;
		text-align: center;
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
	}

	.profile-bubble strong {
		font-family: 'RomanticGumi', sans-serif;
		font-size: 1.7rem;
		line-height: 1;
	}

	.profile-bubble span {
		margin-top: 8px;
		padding: 0.35rem 0.8rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.18);
		font-size: 0.66rem;
		font-weight: 700;
	}

	.profile-bubble--makeup {
		min-height: 126px;
		background: linear-gradient(180deg, #ff4ab4 0%, #ff2e7b 100%);
	}

	.profile-bubble--tech {
		min-height: 132px;
		background: linear-gradient(180deg, #1bc9c4 0%, #2454ff 100%);
	}

	.profile-bubble--running {
		min-height: 110px;
		background: linear-gradient(180deg, #9cc900 0%, #72a900 100%);
	}

	.profile-bubble--clover {
		border-radius: 36px;
	}

	.profile-bubble--blob {
		border-radius: 42px;
	}

	.profile-bubble--orb {
		border-radius: 40px;
	}

	.profile-bubbles__add {
		align-self: center;
		width: 52px;
		height: 52px;
		border: none;
		border-radius: 999px;
		background: #ffffff;
		color: #8a8a8a;
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);
	}

	.profile-content {
		padding-bottom: calc(88px + env(safe-area-inset-bottom));
		background: #ffffff;
	}

	.profile-tabs {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-bottom: 1px solid #e5e7eb;
	}

	.profile-tabs button {
		padding: 18px 8px 16px;
		border: none;
		border-bottom: 3px solid transparent;
		background: #fff;
		font-size: 0.95rem;
		font-weight: 800;
		color: #111827;
	}

	.profile-tabs button.active {
		border-bottom-color: #1d8cf8;
		color: #1d8cf8;
	}

	.profile-section {
		padding: 24px 16px 0;
	}

	.profile-section h2 {
		margin: 0 0 14px;
		font-size: 1.05rem;
		font-weight: 800;
		color: #111827;
	}

	.profile-shorts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.short-card {
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		background: #111827;
		aspect-ratio: 0.72;
	}

	.short-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.short-card__overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px;
		background: linear-gradient(180deg, rgba(17, 24, 39, 0.16) 0%, rgba(17, 24, 39, 0.78) 100%);
		color: #fff;
	}

	.short-card__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.88rem;
		font-weight: 700;
	}

	.short-card__badge {
		padding: 0.2rem 0.5rem;
		border-radius: 8px;
		background: #e11dcb;
	}

	.short-card__overlay p {
		margin: 0;
		font-size: 0.82rem;
		line-height: 1.35;
	}

	.profile-posts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		padding-bottom: 20px;
	}

	.post-card {
		padding: 12px;
		border: 1px solid #eceef2;
		border-radius: 18px;
		background: #ffffff;
		box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
	}

	.post-card__top {
		display: flex;
		gap: 10px;
	}

	.post-card__top img {
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border-radius: 10px;
		object-fit: cover;
	}

	.post-card h3 {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.3;
		color: #111827;
	}

	.post-card p {
		margin: 6px 0 0;
		font-size: 0.73rem;
		line-height: 1.45;
		color: #6b7280;
	}

	.post-card__author {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 12px;
		color: #6b7280;
		font-size: 0.8rem;
	}

	.post-card__avatar {
		width: 24px;
		height: 24px;
		border-radius: 999px;
		background: linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%);
	}
</style>
