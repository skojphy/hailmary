<script lang="ts">
	import { Bell, Eye, MessageSquareMore } from 'lucide-svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import ProfileInterestCanvas from '$lib/components/profile/ProfileInterestCanvas.svelte';

	const tabs = ['나의 활동', '주문 내역', '미션 · 보상'] as const;
	let activeTab = $state<(typeof tabs)[number]>('나의 활동');

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

	const recentBadges = [
		{
			id: 'recent-1',
			title: '경험 나눔러',
			reward: '+5,000P',
			image: '/images/badges/Badge8.png',
			color: '#2F3652'
		},
		{
			id: 'recent-2',
			title: '공유는 사랑',
			reward: '+5,000P',
			image: '/images/badges/Badge5.png',
			color: '#E66A75'
		},
		{
			id: 'recent-3',
			title: '취향 마스터',
			reward: '+5,000P',
			image: '/images/badges/Badge6.png',
			color: '#F58974'
		}
	];

	const ownedBadges = [
		{
			id: 'owned-1',
			title: '취향 레벨업',
			reward: '+5,000P',
			earned: true,
			image: '/images/badges/Badge1.png',
			color: '#702F7F'
		},
		{
			id: 'owned-2',
			title: '리스트 수집가',
			reward: '+5,000P',
			earned: true,
			image: '/images/badges/Badge2.png',
			color: '#307FC8'
		},
		{
			id: 'owned-3',
			title: '찜하기 전문가',
			reward: '+5,000P',
			earned: false,
			image: '/images/badges/Badge3.png',
			color: '#EA7F8D'
		},
		{
			id: 'owned-4',
			title: '기록 수집가',
			reward: '+5,000P',
			earned: true,
			image: '/images/badges/Badge4.png',
			color: '#AB9C69'
		},
		{
			id: 'owned-5',
			title: '공유는 사랑',
			reward: '+5,000P',
			earned: false,
			image: '/images/badges/Badge5.png',
			color: '#E66A75'
		},
		{
			id: 'owned-6',
			title: '혼자보다 같이',
			reward: '+5,000P',
			earned: false,
			image: '/images/badges/Badge6.png',
			color: '#F58974'
		},
		{
			id: 'owned-7',
			title: '리액션 부자',
			reward: '+5,000P',
			earned: false,
			image: '/images/badges/Badge7.png',
			color: '#FECF39'
		},
		{
			id: 'owned-8',
			title: '경험 나눔꾼',
			reward: '+5,000P',
			earned: false,
			image: '/images/badges/Badge8.png',
			color: '#2F3652'
		},
		{
			id: 'owned-9',
			title: '발견의 즐거움',
			reward: '+100',
			earned: true,
			image: '/images/badges/Badge9.png',
			color: '#4B8558'
		},
		{
			id: 'owned-10',
			title: '취향 마스터',
			reward: '+5,000P',
			earned: false,
			image: '/images/badges/Badge10.png',
			color: '#2563FF'
		},
		{
			id: 'owned-11',
			title: '정보 나눔꾼',
			reward: '+5,000P',
			earned: false,
			image: '/images/badges/Badge11.png',
			color: '#307FC8'
		},
		{
			id: 'owned-12',
			title: '오늘의 출석왕',
			reward: '+5,000P',
			earned: false,
			image: '/images/badges/Badge12.png',
			color: '#BB9137'
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
				<button type="button" class="ghost-button" aria-label="메시지">
					<MessageSquareMore size={28} strokeWidth={2.4} />
				</button>
				<button type="button" class="ghost-button" aria-label="알림">
					<Bell size={28} strokeWidth={2.4} />
				</button>
			</div>
		</div>

		<div class="profile-hero__summary">
			<div class="profile-avatar-wrap">
				<img
					class="profile-avatar"
					src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=240&q=80"
					alt="김다미 프로필 이미지"
				/>
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
			{#each tabs as tab (tab)}
				<button type="button" class:active={activeTab === tab} onclick={() => (activeTab = tab)}>
					{tab}
				</button>
			{/each}
		</div>

		{#if activeTab === '나의 활동'}
			<section class="profile-section">
				<h2>내가 저장한 쇼츠</h2>
				<div class="shorts-grid">
					{#each savedShorts as item (item.id)}
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
					{#each posts as post (post.id)}
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
		{:else if activeTab === '주문 내역'}
			<section class="profile-section">
				<div class="profile-empty-card">
					<h3>주문 내역이 아직 없어요</h3>
					<p>다음 공구나 쇼핑 활동이 생기면 이곳에서 바로 확인할 수 있어요.</p>
				</div>
			</section>
		{:else}
			<section class="profile-section badge-section">
				<h2>최근 획득 뱃지</h2>
				<div class="recent-badge-scroll">
					<div class="recent-badge-row">
						{#each recentBadges as badge (badge.id)}
							<article
								class="badge-card badge-card--recent"
								style="background-color: {badge.color}"
							>
								<span class="gumi mb-3" style="color: #fff; font-weight: 500;">{badge.title}</span>
								<img class="badge-card__image" src={badge.image} alt="" />
							</article>
						{/each}
					</div>
				</div>
			</section>

			<section class="profile-section badge-section">
				<h2>보유뱃지 5</h2>
				<div class="badge-grid">
					{#each ownedBadges as badge (badge.id)}
						<article class:earned={badge.earned} class="badge-card badge-card--owned">
							<img class="badge-card__image" src={badge.image} alt="" />
							<h3>{badge.title}</h3>
							<span class="badge-card__reward">{badge.reward}</span>
						</article>
					{/each}
				</div>
			</section>
		{/if}
	</section>

	<BottomNav />
</div>

<style>
	:global(html),
	:global(body) {
		background: #f3f4f6;
		overflow-x: hidden;
		overflow-y: auto;
		overscroll-behavior: auto;
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

	.badge-section h2 {
		margin-bottom: 18px;
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
		-webkit-overflow-scrolling: touch;
		overscroll-behavior-x: contain;
		scroll-snap-type: x proximity;
		touch-action: pan-x;
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

	.profile-empty-card {
		padding: 22px 18px;
		border: 1px solid #eef1f5;
		border-radius: 24px;
		background: #ffffff;
		box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);
	}

	.profile-empty-card h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 800;
		color: #1f2937;
	}

	.profile-empty-card p {
		margin: 10px 0 0;
		font-size: 0.88rem;
		line-height: 1.5;
		color: #8b93a1;
	}

	.recent-badge-row {
		display: flex;
		flex-direction: row;
		gap: 24px;
		width: max-content;
		padding-bottom: 6px;
	}

	.recent-badge-scroll {
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
		touch-action: pan-x;
	}

	.recent-badge-scroll::-webkit-scrollbar {
		display: none;
	}

	.badge-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px 18px;
	}

	.badge-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.badge-card__image {
		width: 100%;
		max-width: 96px;
		aspect-ratio: 1;
		border-radius: 0;
		object-fit: contain;
		background: transparent;
	}

	.badge-card h3 {
		margin: 8px 0 0;
		font-size: 0.88rem;
		line-height: 1.32;
		letter-spacing: -0.03em;
		font-weight: 800;
		color: #111827;
	}

	.badge-card__reward {
		margin-top: 10px;
		padding: 0.45rem 0.9rem;
		border-radius: 999px;
		background: #edf5ff;
		font-size: 0.8rem;
		font-weight: 800;
		color: #1479ff;
	}

	.badge-card--recent {
		flex: 0 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: left;
		width: 145px;
		height: 185px;
		border-radius: 10px;
	}

	.badge-card--owned:not(.earned) .badge-card__image {
		opacity: 0.2;
	}

	.badge-card--owned:not(.earned) h3,
	.badge-card--owned:not(.earned) .badge-card__reward {
		color: #a8acb4;
	}

	.badge-card--owned:not(.earned) .badge-card__reward {
		background: #f2f3f5;
	}
</style>
