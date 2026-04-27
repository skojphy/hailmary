type InterestPhotoSet = {
	productImages: string[];
	shortsImages: string[];
	galleryImages: string[];
	peopleImages: string[];
	rankingImages: string[];
	influencerNames: string[];
};

const koreanWomenPortraits = [
	'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?auto=format&fit=crop&w=900&q=80',
	'https://images.unsplash.com/photo-1542996966-2e31c00bae31?auto=format&fit=crop&w=900&q=80',
	'https://images.unsplash.com/photo-1514355315815-2b64b0216b14?auto=format&fit=crop&w=900&q=80',
	'https://images.unsplash.com/photo-1624091844772-554661d10173?auto=format&fit=crop&w=900&q=80',
	'https://images.unsplash.com/photo-1564564360647-684f24ae3e1c?auto=format&fit=crop&w=900&q=80'
];

const koreanMenPortraits = [
	'https://images.unsplash.com/photo-1577807002746-2aa23cf2d134?auto=format&fit=crop&w=900&q=80',
	'https://images.unsplash.com/photo-1741675122554-586b770395a8?auto=format&fit=crop&w=900&q=80',
	'https://images.unsplash.com/photo-1612766959025-ac18e2b3bb96?auto=format&fit=crop&w=900&q=80',
	'https://images.unsplash.com/photo-1692048098453-109979b87e10?auto=format&fit=crop&w=900&q=80',
	'https://images.unsplash.com/photo-1580171542477-451bb1c67267?auto=format&fit=crop&w=900&q=80'
];

export const beautyAvatarImages = koreanWomenPortraits.slice(0, 3);
export const techAvatarImages = [
	koreanMenPortraits[0],
	koreanMenPortraits[1],
	koreanWomenPortraits[2]
];
export const sportsAvatarImages = [
	koreanMenPortraits[2],
	koreanWomenPortraits[1],
	koreanMenPortraits[3]
];

const mixedKoreanPortraits = [
	...koreanWomenPortraits.slice(0, 3),
	...koreanMenPortraits.slice(0, 3)
];

const beautyPhotos: InterestPhotoSet = {
	productImages: [
		'https://images.unsplash.com/photo-1512496115851-a1c8f137e02c?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1586495777744-4413f21b72a0?auto=format&fit=crop&w=900&q=80',
		'https://plus.unsplash.com/premium_photo-1681980018511-cbac52cc21be?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
	],
	shortsImages: [
		'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1512496115851-a1c8f137e02c?auto=format&fit=crop&w=900&q=80'
	],
	galleryImages: [
		'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
	],
	peopleImages: [...koreanWomenPortraits],
	rankingImages: [
		'https://images.unsplash.com/photo-1512496115851-a1c8f137e02c?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1586495777744-4413f21b72a0?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1596704017254-9db1944358aa?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: ['톤업노트', '유리파우치', '립밤로그', '쿨톤수집가', '뷰티모먼트', '메컵살롱']
};

const techPhotos: InterestPhotoSet = {
	productImages: [
		'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=80',
		'/images/baseball.webp',
		'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80'
	],
	shortsImages: [
		'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80'
	],
	galleryImages: [
		'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
	],
	peopleImages: [...techAvatarImages, koreanWomenPortraits[0], koreanMenPortraits[4]],
	rankingImages: [
		'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: [
		'기어로그',
		'데스크셋업러',
		'픽셀노트',
		'테크만물상',
		'키보드취향',
		'리뷰하는준'
	]
};

const sportsPhotos: InterestPhotoSet = {
	productImages: [
		'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1544261763-755eaee02e1c?auto=format&fit=crop&w=900&q=80',
		'https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80'
	],
	shortsImages: [
		'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80'
	],
	galleryImages: [
		'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=900&q=80'
	],
	peopleImages: [...sportsAvatarImages, koreanWomenPortraits[3], koreanMenPortraits[4]],
	rankingImages: [
		'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: [
		'러닝픽',
		'페이스메이커J',
		'무브먼트로그',
		'액티브도감',
		'스포츠캐리어',
		'아웃도어메이트'
	]
};

const baseballPhotos: InterestPhotoSet = {
	productImages: [
		'https://images.unsplash.com/photo-1620740528428-59fb523a484a?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1749559995884-a3731177edf7?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1653681407587-a4add187ba81?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1705847470742-80f5140c53a2?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1551306667-f32e7af055f2?auto=format&fit=crop&w=900&q=80'
	],
	shortsImages: [
		'https://images.unsplash.com/photo-1554591203-d6433caa8495?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1653681441421-831baa165bbf?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1553270040-8e90b62a94f8?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1686256856775-9218a0edf3c7?auto=format&fit=crop&w=900&q=80'
	],
	galleryImages: [
		'https://images.unsplash.com/photo-1534095199036-ba4fd1eed616?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1464701116432-f476204d6c45?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1512631737701-737916001362?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1587565221090-7b8497f86d9e?auto=format&fit=crop&w=900&q=80'
	],
	peopleImages: [...sportsAvatarImages, koreanWomenPortraits[4], koreanMenPortraits[1]],
	rankingImages: [
		'https://images.unsplash.com/photo-1620740528428-59fb523a484a?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1653681407587-a4add187ba81?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1551306683-9e7cf1661af1?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: [
		'야구수집가',
		'더그아웃노트',
		'글러브룸',
		'직관메모',
		'베이스라인랩',
		'배트앤볼'
	]
};

const foodPhotos: InterestPhotoSet = {
	productImages: [
		'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80'
	],
	shortsImages: [
		'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80'
	],
	galleryImages: [
		'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1523293836414-f04e712e1dac?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80'
	],
	peopleImages: [...mixedKoreanPortraits],
	rankingImages: [
		'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: [
		'빵순이레이더',
		'집밥연구소',
		'마켓장바구니',
		'한입로그',
		'미식보드',
		'오늘의식탁'
	]
};

const homeTravelPhotos: InterestPhotoSet = {
	productImages: [
		'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80'
	],
	shortsImages: [
		'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=900&q=80'
	],
	galleryImages: [
		'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'
	],
	peopleImages: [...mixedKoreanPortraits],
	rankingImages: [
		'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: ['룸앤로드', '살림메모', '홈무드집', '트립캐리어', '주말도감', '소도시수집가']
};

const culturePhotos: InterestPhotoSet = {
	productImages: [
		'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=900&q=80'
	],
	shortsImages: [
		'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80'
	],
	galleryImages: [
		'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
		'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80'
	],
	peopleImages: [...mixedKoreanPortraits],
	rankingImages: [
		'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: [
		'무드수집가',
		'플레이리스트룸',
		'영감노트',
		'취향편집샵',
		'전시산책',
		'소란한취향'
	]
};

function getInterestCategory(interestId: string) {
	if (['makeup', 'beauty', 'beauty-2', 'perfume', 'nail', 'fashion'].includes(interestId)) {
		return 'beauty';
	}

	if (['early-adopter'].includes(interestId)) {
		return 'baseball';
	}

	if (['tech', 'phone', 'streaming', 'gaming'].includes(interestId)) {
		return 'tech';
	}

	if (
		[
			'running',
			'running-crew',
			'running-crew-2',
			'yoga',
			'climbing',
			'swimming',
			'camping'
		].includes(interestId)
	) {
		return 'sports';
	}

	if (['bakery', 'tech-2', 'home-cafe', 'cooking', 'whiskey'].includes(interestId)) {
		return 'food';
	}

	if (
		['home', 'living-alone', 'interior', 'travel', 'drive', 'plants', 'early-adopter-2'].includes(
			interestId
		)
	) {
		return 'home-travel';
	}

	return 'culture';
}

export function getInterestPhotoSet(interestId: string): InterestPhotoSet {
	switch (getInterestCategory(interestId)) {
		case 'beauty':
			return beautyPhotos;
		case 'tech':
			return techPhotos;
		case 'baseball':
			return baseballPhotos;
		case 'sports':
			return sportsPhotos;
		case 'food':
			return foodPhotos;
		case 'home-travel':
			return homeTravelPhotos;
		default:
			return culturePhotos;
	}
}
