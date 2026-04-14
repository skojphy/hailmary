<script lang="ts">
	import { Eye } from 'lucide-svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import ProfileInterestCanvas from '$lib/components/profile/ProfileInterestCanvas.svelte';

	const tabs = ['나의 활동', '주문 내역', '미션 · 보상'] as const;

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
			title: '요즘 빠진 러닝화 추천 5가지 직접 신어봄',
			views: '0.5K',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
		}
	];

	const posts = [
		{
			id: '1',
			title: '내돈내산 흑백요리사 맛집 BEST 10',
			body: '제가 가본 곳중에 제일 괜찮은 곳을 뽑아보았는데요. 맛피자 집이 가장 맛있었는데, 위치는 용산 쪽이고 웨이팅 팁까지 같이 정리해봤어요.',
			image:
				'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80',
			author: '@dami',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
		},
		{
			id: '2',
			title: '빈티지 소품샵 투어하기 좋은 성수 코스 6선',
			body: '주말에 천천히 걷기 좋은 동선으로 묶어봤어요. 소품샵 분위기부터 가격대, 쉬어가기 좋은 카페까지...',
			image:
				'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80',
			author: '@dami',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
		}
	];
</script>

<svelte:head>
	<title>프로필</title>
</svelte:head>

<div class="profile-shell">
	<section class="profile-hero">
		<div class="profile-hero__topbar">
			<button type="button" class="ghost-button" aria-label="뒤로 가기">←</button>

			<div class="profile-hero__icons">
				<button type="button" class="ghost-button" aria-label="메시지">✉</button>
				<button type="button" class="ghost-button" aria-label="알림">◌</button>
			</div>
		</div>

		<div class="profile-hero__summary">
			<div class="profile-avatar-wrap">
				<img
					class="profile-avatar"
					src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=240&q=80"
					alt="김다미 프로필 이미지"
				/>
				<span class="profile-badge">B</span>
			</div>

			<h1>김다미</h1>
			<div class="profile-stats">
				<span>팔로워 280</span>
				<span>팔로잉 35</span>
			</div>
		</div>

		<div class="profile-interest-block">
			<ProfileInterestCanvas />

			<button type="button" class="profile-interest-block__add" aria-label="관심사 추가">+</button>
		</div>
	</section>

	<section class="profile-content">
		<div class="profile-tabs">
			{#each tabs as tab, index}
				<button type="button" class:active={index === 0}>{tab}</button>
			{/each}
		</div>

		<section class="profile-section">
			<h2>내가 저장한 쇼츠</h2>
			<div class="shorts-grid">
				{#each savedShorts as item}
					<article class="short-card">
						<img src={item.image} alt="" />
						<div class="short-card__overlay">
							<div class="short-card__meta">
								<span class="shorts-badge">Shorts</span>
								<span class="short-card__views"><Eye size={18} /> {item.views}</span>
							</div>
							<p>{item.title}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section class="profile-section">
			<h2>내가 쓴 글</h2>
			<div class="post-grid">
				{#each posts as post}
					<article class="post-card">
						<div class="post-card__header">
							<img src={post.image} alt="" />
							<div>
								<h3>{post.title}</h3>
							</div>
						</div>
						<p>{post.body}</p>
						<div class="post-card__footer">
							<img class="post-card__avatar" src={post.avatar} alt="" />
							<span>{post.author}</span>
						</div>
					</article>
				{/each}
			</div>
		</section>
	</section>

	<BottomNav />
</div>

<style>
	:global(body) {
		background: #f3f4f6;
	}

	.profile-shell {
		min-height: 100dvh;
		width: 100%;
		max-width: 28rem;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 22px 50px rgba(15, 23, 42, 0.15);
	}

	.profile-hero {
		padding: 18px 16px 0;
		background: #242424;
		color: #fff;
	}

	.profile-hero__topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.profile-hero__icons {
		display: flex;
		gap: 10px;
	}

	.ghost-button {
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 999px;
		background: transparent;
		color: inherit;
		font-size: 1.4rem;
	}

	.profile-hero__summary {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 18px;
	}

	.profile-avatar-wrap {
		position: relative;
	}

	.profile-avatar {
		width: 92px;
		height: 92px;
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
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
		font-size: 2.05rem;
		line-height: 1;
		letter-spacing: -0.05em;
	}

	.profile-stats {
		display: flex;
		gap: 18px;
		margin-top: 12px;
		color: rgba(255, 255, 255, 0.68);
		font-size: 0.96rem;
	}

	.profile-interest-block {
		position: relative;
		margin-top: 18px;
		padding-bottom: 18px;
	}

	.profile-interest-block__add {
		position: absolute;
		right: 70px;
		bottom: 30px;
		width: 54px;
		height: 54px;
		border: none;
		border-radius: 999px;
		background: #ffffff;
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
		color: #777;
		font-size: 2rem;
		line-height: 1;
	}

	.profile-content {
		padding-bottom: calc(88px + env(safe-area-inset-bottom));
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
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
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
		font-family: 'RomanticGumi', 'Pretendard', sans-serif;
		font-size: 1.05rem;
		font-weight: 800;
		color: #111827;
	}

	.shorts-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.post-grid {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 58%;
		gap: 12px;
		overflow-x: auto;
		padding-bottom: 4px;
		scroll-snap-type: x proximity;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.post-grid::-webkit-scrollbar {
		display: none;
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

	.shorts-badge {
		padding: 0.2rem 0.5rem;
		border-radius: 8px;
		background: #e11dcb;
		font-style: italic;
	}

	.short-card__views {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.short-card__overlay p {
		margin: 0;
		font-size: 0.82rem;
		line-height: 1.35;
	}

	.post-card {
		padding: 14px;
		border: 1px solid #eceef2;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
		scroll-snap-align: start;
	}

	.post-card__header {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}

	.post-card__header img {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		border-radius: 12px;
		object-fit: cover;
	}

	.post-card h3 {
		margin: 0;
		font-size: 0.98rem;
		line-height: 1.35;
		letter-spacing: -0.02em;
		font-weight: 800;
		color: #111111;
	}

	.post-card p {
		margin: 10px 0 0;
		font-size: 0.76rem;
		line-height: 1.45;
		letter-spacing: -0.02em;
		color: #8d8d93;
		display: -webkit-box;
		overflow: hidden;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		min-height: calc(0.76rem * 1.45 * 3);
	}

	.post-card__footer {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 12px;
		color: #87878d;
		font-size: 0.82rem;
	}

	.post-card__avatar {
		width: 26px;
		height: 26px;
		border-radius: 999px;
		object-fit: cover;
	}
</style>
