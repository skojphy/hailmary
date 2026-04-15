type InterestPhotoSet = {
	productImages: string[];
	shortsImages: string[];
	galleryImages: string[];
	peopleImages: string[];
	rankingImages: string[];
	influencerNames: string[];
};

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
	peopleImages: [
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80'
	],
	rankingImages: [
		'https://images.unsplash.com/photo-1512496115851-a1c8f137e02c?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1586495777744-4413f21b72a0?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1596704017254-9db1944358aa?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: ['수아', '하늘', '예린', '나연', '민서', '서윤']
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
	peopleImages: [
		'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80'
	],
	rankingImages: [
		'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: ['현우', '도윤', '준호', '민재', '서준', '윤호']
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
	peopleImages: [
		'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80'
	],
	rankingImages: [
		'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: ['태오', '도현', '지호', '예준', '가은', '시우']
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
	peopleImages: [
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80'
	],
	rankingImages: [
		'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: ['민지', '서윤', '지훈', '연우', '다온', '현아']
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
	peopleImages: [
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80'
	],
	rankingImages: [
		'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: ['유진', '지아', '태희', '서후', '민우', '라윤']
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
	peopleImages: [
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80'
	],
	rankingImages: [
		'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=240&q=80',
		'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=240&q=80'
	],
	influencerNames: ['유나', '민석', '주원', '아린', '도겸', '채린']
};

function getInterestCategory(interestId: string) {
	if (['makeup', 'beauty', 'beauty-2', 'perfume', 'nail', 'fashion'].includes(interestId)) {
		return 'beauty';
	}

	if (['tech', 'early-adopter', 'phone', 'streaming', 'gaming'].includes(interestId)) {
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

	if (['home', 'interior', 'travel', 'drive', 'plants', 'early-adopter-2'].includes(interestId)) {
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
