/* eslint-disable max-len */
import { createMinMaxRange } from './minMaxRangeUtils';

export default {
	data() {
		return {
			loanChannelQueryMap: [

				// Lend Drop Down, Category Grid, + All Categories Page

				{
					id: 5,
					url: 'women',
					queryParams: 'status=fundRaising&gender=female',
					algoliaParams: 'gender=female',
					flssLoanSearch: {
						gender: 'female',
					},
				},
				{
					id: 8,
					url: 'agriculture',
					queryParams: 'status=fundRaising&sector=1',
					algoliaParams: 'sector=Agriculture',
					flssLoanSearch: {
						sectorId: [1],
					},
				},
				{
					id: 4,
					url: 'education',
					queryParams: 'status=fundRaising&sector=15',
					algoliaParams: 'sector=Education',
					flssLoanSearch: {
						sectorId: [15],
					},
				},
				{
					id: 32,
					url: 'refugees-and-i-d-ps',
					queryParams: 'status=fundRaising&theme=Refugees/Displaced',
					algoliaParams: 'attributes=Refugees%2FDisplaced',
					flssLoanSearch: {
						themeId: [28],
					},
				},
				{
					id: 18,
					url: 'eco-friendly',
					queryParams: 'status=fundRaising&loanTags=9,8',
					algoliaParams: 'tags=%23Eco-friendly~%23Sustainable%20Ag',
					flssLoanSearch: {
						tagId: [9, 8],
					},
				},
				{
					id: 28,
					url: 'kiva-u-s',
					queryParams: 'status=fundRaising&country=US,GU,VI,PR&distributionModel=direct',
					algoliaParams: 'countries=North%20America%20%3E%20United%20States',
					flssLoanSearch: {
						countryIsoCode: ['US', 'GU', 'VI', 'PR'],
						distributionModel: 'DIRECT',
					},
				},
				{
					id: 23,
					url: 'livestock',
					queryParams: 'status=fundRaising&activity=73',
					// algoliaParams: '', // not supported pass exclude link
					fallbackUrl: '/lend?status=fundRaising&activity=73',
					flssLoanSearch: {
						activityId: [73],
					},
				},
				{
					id: 29,
					url: 'arts',
					queryParams: 'status=fundRaising&sector=9',
					algoliaParams: 'sector=Arts',
					flssLoanSearch: {
						sectorId: [9],
					},
				},
				{
					id: 3,
					url: 'ending-soon',
					queryParams: 'status=fundRaising&expiringSoon=1&sortBy=expiringSoon',
					algoliaParams: 'sortBy=expiringSoon',
					flssLoanSearch: {
						sortBy: 'expiringSoon',
					},
				},
				{
					id: 26,
					url: 'single-parents',
					queryParams: 'status=fundRaising&loanTags=17',
					algoliaParams: 'tags=%23Single%20Parent',
					flssLoanSearch: {
						tagId: [17],
					},
				},
				{
					id: 25,
					url: 'health',
					queryParams: 'status=fundRaising&sector=6',
					algoliaParams: 'sector=Health',
					flssLoanSearch: {
						sectorId: [6],
					},
				},
				{
					id: 12,
					url: 'food',
					queryParams: 'status=fundRaising&sector=12',
					algoliaParams: 'sector=Food',
					flssLoanSearch: {
						sectorId: [12],
					},
				},
				{
					id: 31,
					url: 'water-and-sanitation',
					queryParams: 'status=fundRaising&theme=Water and Sanitation',
					algoliaParams: 'attributes=Water%20and%20Sanitation',
					flssLoanSearch: {
						themeId: [8],
					},
				},
				{
					id: 7,
					url: 'conflict-zones',
					queryParams: 'status=fundRaising&theme=Conflict Zones',
					algoliaParams: 'attributes=Conflict%20Zones',
					flssLoanSearch: {
						themeId: [14],
					},
				},
				{
					id: 11,
					url: 'short-term-loans',
					queryParams: 'status=fundRaising&lenderTerm=0,16',
					algoliaParams: 'repayment=%3A16',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 16),
					},
				},
				{
					id: 6,
					url: 'shelter',
					queryParams: 'status=fundRaising&sector=10',
					algoliaParams: 'sector=Housing',
					flssLoanSearch: {
						sectorId: [10],
					},
				},
				{
					id: 33,
					url: 'mission-driven-orgs',
					queryParams: 'partner=62,630,198,225,229,229,263,274,275,285,292,295,301,311,317,342,358,361,369,376,389,390,412,415,417,431,441,446,449,451,452,458,459,461,466,468,472,482,483,486,489,490,491,492,493,494,496,497,498,500,501,502,503,505,506,508,509,510,511,512,513,514,515,516,517,520,521,523,524,525,529,530,531,532,534,535,536,538,539,540,542,543,544,545,546,548,552,553,555,556,557,558,560,561,563,565,566,567,568,569,570,571,573,575,577,578,579,580,581,583,584,585,586,587,591,592,593,595,597,598,599,600,601,602,603,604,608,610,612,613,614,656,617,618&status=fundRaising&sortBy=popularity',
					fallbackUrl: '/lend?partner=62,630,198,225,229,229,263,274,275,285,292,295,301,311,317,342,358,361,369,376,389,390,412,415,417,431,441,446,449,451,452,458,459,461,466,468,472,482,483,486,489,490,491,492,493,494,496,497,498,500,501,502,503,505,506,508,509,510,511,512,513,514,515,516,517,520,521,523,524,525,529,530,531,532,534,535,536,538,539,540,542,543,544,545,546,548,552,553,555,556,557,558,560,561,563,565,566,567,568,569,570,571,573,575,577,578,579,580,581,583,584,585,586,587,591,592,593,595,597,598,599,600,601,602,603,604,608,610,612,613,614,656,617,618&status=fundRaising&sortBy=popularity',
					flssLoanSearch: {
						partnerId: [62, 630, 198, 225, 229, 263, 274, 275, 285, 292, 295, 301, 311, 317, 342, 358, 361, 369, 376, 389, 390, 412, 415, 417, 431, 441, 446, 449, 451, 452, 458, 459, 461, 466, 468, 472, 482, 483, 486, 489, 490, 491, 492, 493, 494, 496, 497, 498, 500, 501, 502, 503, 505, 506, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 520, 521, 523, 524, 525, 529, 530, 531, 532, 534, 535, 536, 538, 539, 540, 542, 543, 544, 545, 546, 548, 552, 553, 555, 556, 557, 558, 560, 561, 563, 565, 566, 567, 568, 569, 570, 571, 573, 575, 577, 578, 579, 580, 581, 583, 584, 585, 586, 587, 591, 592, 593, 595, 597, 598, 599, 600, 601, 602, 603, 604, 608, 610, 612, 613, 614, 656, 617, 618],
						sortBy: 'popularityScore',
					},
				},
				{
					// id: 33,
					// This used to be Loan Channel id 33 but was changed. However, lenders still have this page
					// book marked and get redirected here so we have to map the url.
					// If the attribute/themeFilter is removed we'll need to update this redirect
					id: 158,
					url: 'social-enterprises',
					queryParams: 'status=fundRaising&theme=Social Enterprise',
					algoliaParams: 'attributes=Social%20Enterprise',
					flssLoanSearch: {
						themeId: [29],
					},
				},
				{
					id: 13,
					url: 'retail-businesses',
					queryParams: 'status=fundRaising&sector=7',
					algoliaParams: 'sector=Retail',
					flssLoanSearch: {
						sectorId: [7],
					},
				},
				{
					id: 17,
					url: 'men',
					queryParams: 'status=fundRaising&gender=male',
					algoliaParams: 'gender=male',
					flssLoanSearch: {
						gender: 'male',
					},
				},
				{
					id: 10,
					url: 'underbanked-areas',
					queryParams: 'status=fundRaising&theme=Underfunded Areas',
					algoliaParams: 'attributes=Underfunded%20Areas',
					flssLoanSearch: {
						themeId: [13],
					},
				},
				{
					id: 16,
					url: 'transport',
					queryParams: 'status=fundRaising&sector=3',
					algoliaParams: 'sector=Transportation',
					flssLoanSearch: {
						sectorId: [3],
					},
				},
				{
					id: 14,
					url: 'groups',
					queryParams: 'status=fundRaising&isGroup=1',
					algoliaParams: '', // not support show exit link
					flssLoanSearch: {
						isIndividual: false,
					},
				},
				{
					id: 1,
					url: 'vulnerable-populations',
					queryParams: 'status=fundRaising&theme=Vulnerable Groups&distributionModel=field_partner',
					algoliaParams: 'attributes=Vulnerable%20Groups',
					flssLoanSearch: {
						themeId: [9],
						distributionModel: 'FIELDPARTNER',
					},
				},

				// Lend By Category Channels

				{
					id: 67,
					url: 'loans-to-single-parents',
					queryParams: 'status=fundRaising&loanTags=17',
					algoliaParams: 'tags=%23Single%20Parent',
					flssLoanSearch: {
						tagId: [17],
					},
				},
				{
					id: 52,
					url: 'loans-to-women',
					queryParams: 'status=fundRaising&gender=female',
					algoliaParams: 'gender=female',
					flssLoanSearch: {
						gender: 'female',
					},
				},
				{
					id: 53,
					url: 'loans-for-education',
					queryParams: 'status=fundRaising&sector=15',
					algoliaParams: 'sector=Education',
					flssLoanSearch: {
						sectorId: [15],
					},
				},
				{
					id: 54,
					url: 'trending-now',
					queryParams: 'status=fundRaising',
					algoliaParams: '',
					flssLoanSearch: {},
				},
				{
					id: 55,
					url: 'loans-to-farmers',
					queryParams: 'status=fundRaising&sector=1',
					algoliaParams: 'sector=Agriculture',
					flssLoanSearch: {
						sectorId: [1],
					},
				},
				{
					id: 56,
					url: 'loans-with-research-backed-impact',
					queryParams: 'status=fundRaising',
					algoliaParams: '',
					flssLoanSearch: {},
				},
				{
					id: 57,
					url: 'loans-to-refugees-and-i-d-ps',
					queryParams: 'status=fundRaising&theme=Refugees/Displaced',
					algoliaParams: 'attributes=Refugees%2FDisplaced',
					flssLoanSearch: {
						themeId: [28],
					},
				},
				{
					id: 58,
					url: 'eco-friendly-loans',
					queryParams: 'status=fundRaising&loanTags=9',
					algoliaParams: 'tags=%23Eco-friendly~%23Sustainable%20Ag',
					flssLoanSearch: {
						tagId: [9],
					},
				},
				{
					id: 59,
					url: 'loans-that-are-ending-soon',
					queryParams: 'status=fundRaising&sortBy=expiringSoon',
					algoliaParams: 'sortBy=expiringSoon',
					flssLoanSearch: {
						sortBy: 'expiringSoon',
					},
				},
				{
					id: 60,
					url: 'almost-funded',
					queryParams: 'status=fundRaising&sortBy=amountLeft',
					algoliaParams: 'sortBy=amountLeft',
					flssLoanSearch: {
						sortBy: 'amountLeft',
					},
				},
				{
					id: 63,
					url: 'loans-for-clean-energy',
					queryParams: 'status=fundRaising&theme=Clean Energy',
					algoliaParams: 'attributes=Clean%20Energy',
					flssLoanSearch: {
						themeId: [32],
					},
				},
				{
					id: 66,
					url: 'lenders-like-you-supported-these-loans',
					queryParams: 'status=fundRaising',
					algoliaParams: '',
					flssLoanSearch: {},
				},
				{
					id: 68,
					url: 'loans-to-mission-driven-enterprises',
					queryParams: 'status=fundRaising&partner=62,630,198,225,229,263,274,275,285,292,295,301,311,317,342,358,361,369,376,389,390,412,415,417,431,441,446,449,451,452,458,459,461,466,468,472,482,483,486,489,490,491,492,493,494,496,497,498,500,501,502,503,505,506,508,509,510,511,512,513,514,515,516,517,520,521,523,524,525,529,530,531,532,534,535,536,538,539,540,542,543,544,545,546,548,552,553,555,556,557,558,560,561,563,565,566,567,568,569,570,571,573,575,577,578,579,580,581,583,584,585,586,587,591,592,593,595,597,598,599,600,601,602,603,604,608,610,612,613,614,656,617,618&sortBy=popularity',
					fallbackUrl: '/lend?partner=62,630,198,225,229,263,274,275,285,292,295,301,311,317,342,358,361,369,376,389,390,412,415,417,431,441,446,449,451,452,458,459,461,466,468,472,482,483,486,489,490,491,492,493,494,496,497,498,500,501,502,503,505,506,508,509,510,511,512,513,514,515,516,517,520,521,523,524,525,529,530,531,532,534,535,536,538,539,540,542,543,544,545,546,548,552,553,555,556,557,558,560,561,563,565,566,567,568,569,570,571,573,575,577,578,579,580,581,583,584,585,586,587,591,592,593,595,597,598,599,600,601,602,603,604,608,610,612,613,614,656,617,618&status=fundRaising&sortBy=popularity',
					flssLoanSearch: {
						partnerId: [62, 630, 198, 225, 229, 263, 274, 275, 285, 292, 295, 301, 311, 317, 342, 358, 361, 369, 376, 389, 390, 412, 415, 417, 431, 441, 446, 449, 451, 452, 458, 459, 461, 466, 468, 472, 482, 483, 486, 489, 490, 491, 492, 493, 494, 496, 497, 498, 500, 501, 502, 503, 505, 506, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 520, 521, 523, 524, 525, 529, 530, 531, 532, 534, 535, 536, 538, 539, 540, 542, 543, 544, 545, 546, 548, 552, 553, 555, 556, 557, 558, 560, 561, 563, 565, 566, 567, 568, 569, 570, 571, 573, 575, 577, 578, 579, 580, 581, 583, 584, 585, 586, 587, 591, 592, 593, 595, 597, 598, 599, 600, 601, 602, 603, 604, 608, 610, 612, 613, 614, 656, 617, 618],
						sortBy: 'popularityScore',
					},
				},
				{
					id: 69,
					url: 'world-refugee-day',
					queryParams: 'status=fundRaising&theme=Refugees/Displaced&distributionModel=field_partner',
					algoliaParams: 'attributes=Refugees%2FDisplaced',
					flssLoanSearch: {
						themeId: [28],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 70,
					url: 'loans-to-u-s-small-businesses',
					queryParams: 'status=fundRaising&country=US,GU,VI,PR',
					flssLoanSearch: {
						countryIsoCode: ['US', 'GU', 'VI', 'PR'],
					},
				},
				{
					id: 71,
					url: 'loans-for-livestock',
					queryParams: 'status=fundRaising&activity=73',
					flssLoanSearch: {
						activityId: [73],
					},
				},
				{
					id: 72,
					url: 'loans-to-artisans',
					queryParams: 'status=fundRaising&sector=9',
					flssLoanSearch: {
						sectorId: [9],
					},
				},
				{
					id: 73,
					url: 'loans-for-shelter',
					queryParams: 'status=fundRaising&sector=10',
					flssLoanSearch: {
						sectorId: [10],
					},
				},
				{
					id: 74,
					url: 'loans-for-food-producers',
					queryParams: 'status=fundRaising&sector=12',
					flssLoanSearch: {
						sectorId: [12],
					},
				},
				{
					id: 75,
					url: 'loans-to-underbanked-areas',
					queryParams: 'status=fundRaising&theme=Underfunded Areas',
					flssLoanSearch: {
						themeId: [13],
					},
				},
				{
					id: 76,
					url: 'loans-for-healthcare',
					queryParams: 'status=fundRaising&sector=6',
					flssLoanSearch: {
						sectorId: [6],
					},
				},
				{
					id: 77,
					url: 'loans-for-retail-businesses',
					queryParams: 'status=fundRaising&sector=7',
					flssLoanSearch: {
						sectorId: [7],
					},
				},
				{
					id: 78,
					url: 'loans-for-water-and-sanitation',
					queryParams: 'status=fundRaising&theme=Water and Sanitation',
					flssLoanSearch: {
						themeId: [8],
					},
				},
				{
					id: 79,
					url: 'group-loans',
					queryParams: 'status=fundRaising&isGroup=1',
					flssLoanSearch: {
						isIndividual: false,
					},
				},

				// Lend By Category Carousel Layout Sub Channels
				// 	ACK-357 Experiment
				{
					id: 116,
					url: 'solar-energy',
					queryParams: 'status=fundRaising&loanTags=9',
					flssLoanSearch: {
						tagId: [9],
					},
				},
				{
					id: 117,
					url: 'sustainable-agriculture',
					queryParams: 'status=fundRaising&sector=1&loanTags=8&sortBy=amountLeft',
					flssLoanSearch: {
						sectorId: [1],
						tagId: [8],
					},
				},
				{
					id: 118,
					url: 'recycle-and-re-use',
					queryParams: 'status=fundRaising&loanTags=9',
					flssLoanSearch: {
						tagId: [9],
					},
				},
				{
					id: 119,
					url: 'other-eco-friendly-loans',
					queryParams: 'status=fundRaising&loanTags=9,8',
					flssLoanSearch: {
						tagId: [8, 9],
					},
				},

				// IWD 2020 Loan Channels
				// TODO: Complete legacy query param for each set (already added gender filter)
				{
					id: 80,
					url: '1-billion-to-women',
					queryParams: 'status=fundRaising&gender=female&distributionModel=field_partner',
					flssLoanSearch: {
						gender: 'female',
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 83,
					url: 'africa-loans',
					queryParams: 'status=fundRaising&gender=female&country=MZ,UG,SN,RW,KE,CD,LR,BF,CM,GH,TG,MG,ML,EG&distributionModel=field_partner',
					algoliaParams: 'gender=female&countries=Africa%20>%20Cameroon~Africa%20>%20Congo%20%28DRC%29~Africa%20>%20Egypt~Africa%20>%20Ghana~Africa%20>%20Kenya~Africa%20>%20Liberia~Africa%20>%20Madagascar~Africa%20>%20Mali~Africa%20>%20Mozambique~Africa%20>%20Nigeria~Africa%20>%20Rwanda~Africa%20>%20Senegal~Africa%20>%20Uganda&sortBy=popularity',
					flssLoanSearch: {
						countryIsoCode: ['BF', 'CD', 'CM', 'EG', 'GH', 'KE', 'LR', 'MG', 'ML', 'MZ', 'RW', 'SN', 'TG', 'UG'],
						gender: 'female',
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 84,
					url: 'asia-loans',
					queryParams: 'status=fundRaising&gender=female&country=KH,TJ,TH,VN,PH,KG,IN,ID,PK&distributionModel=field_partner',
					algoliaParams: 'gender=female&countries=Asia%20>%20Cambodia~Asia%20>%20India~Asia%20>%20Kyrgyzstan~Asia%20>%20Nepal~Asia%20>%20Pakistan~Asia%20>%20Philippines~Asia%20>%20Tajikistan~Asia%20>%20Vietnam&sortBy=popularity',
					flssLoanSearch: {
						countryIsoCode: ['KH', 'TJ', 'TH', 'VN', 'PH', 'KG', 'ID', 'PK'],
						gender: 'female',
						distributionModel: 'FIELDPARTNER',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 85,
					url: 'latin-america-loans',
					queryParams: 'status=fundRaising&gender=female&country=BO,GT,PY,NI,HN,PE,CR,PA,EC,CO,SV,MX,BR&distributionModel=field_partner',
					algoliaParams: 'gender=female&countries=North%20America%20>%20Mexico~South%20America%20>%20Bolivia~South%20America%20>%20Brazil~South%20America%20>%20Colombia~South%20America%20>%20Ecuador~South%20America%20>%20Paraguay~South%20America%20>%20Peru~Central%20America%20>%20Costa%20Rica~Central%20America%20>%20El%20Salvador~Central%20America%20>%20Guatemala~Central%20America%20>%20Honduras~Central%20America%20>%20Nicaragua~North%20America%20>%20Dominican%20Republic&sortBy=popularity',
					flssLoanSearch: {
						countryIsoCode: ['BO', 'GT', 'PY', 'NI', 'HN', 'PE', 'CR', 'PA', 'EC', 'CO', 'SV', 'MX', 'BR'],
						gender: 'female',
						distributionModel: 'FIELDPARTNER',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 86,
					url: 'united-states-loans',
					queryParams: 'status=fundRaising&gender=female&country=US,GU,VI,PR&distributionModel=direct',
					algoliaParams: 'gender=female&countries=North%20America%20>%20United%20States&sortBy=popularity',
					flssLoanSearch: {
						countryIsoCode: ['US', 'GU', 'VI', 'PR'],
						gender: 'female',
						distributionModel: 'DIRECT',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 87,
					url: 'agriculture-loans-for-women',
					queryParams: 'status=fundRaising&gender=female&sector=1',
					algoliaParams: 'gender=female&sector=Agriculture&sortBy=popularity',
					flssLoanSearch: {
						sectorId: [1],
						gender: 'female',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 88,
					url: 'education-loans-for-women',
					queryParams: 'status=fundRaising&gender=female&sector=15',
					algoliaParams: 'gender=female&sector=Education&sortBy=popularity',
					flssLoanSearch: {
						sectorId: [15],
						gender: 'female',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 89,
					url: 'arts-loans-for-women',
					queryParams: 'status=fundRaising&gender=female&sector=9',
					algoliaParams: 'gender=female&sector=Arts&sortBy=popularity',
					flssLoanSearch: {
						sectorId: [9],
						gender: 'female',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 90,
					url: 'ecofriendly-loans',
					queryParams: 'status=fundRaising&gender=female&loanTags=9',
					algoliaParams: 'gender=female&tags=%23Eco-friendly&sortBy=popularity',
					flssLoanSearch: {
						gender: 'female',
						tagId: [9],
						sortBy: 'popularityScore',
					},
				},
				{
					id: 91,
					url: 'ecofriendlyloans',
					queryParams: 'status=fundRaising&gender=female&loanTags=9',
					algoliaParams: 'gender=female&tags=%23Eco-friendly&sortBy=popularity',
					flssLoanSearch: {
						gender: 'female',
						tagId: [9],
						sortBy: 'popularityScore',
					},
				},
				{
					id: 92,
					url: 'food-loans',
					queryParams: 'status=fundRaising&gender=female&sector=12&sortBy=popularity',
					algoliaParams: 'gender=female&sector=Food&sortBy=popularity',
					flssLoanSearch: {
						sectorId: [12],
						gender: 'female',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 93,
					url: 'shelter-loans',
					queryParams: 'status=fundRaising&gender=female&sector=10&sortBy=popularity',
					algoliaParams: 'gender=female&sector=Housing&sortBy=popularity',
					flssLoanSearch: {
						sectorId: [10],
						gender: 'female',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 94,
					url: 'retail-loans',
					queryParams: 'status=fundRaising&gender=female&sector=7&sortBy=popularity',
					algoliaParams: 'gender=female&sector=Retail&sortBy=popularity',
					flssLoanSearch: {
						sectorId: [7],
						gender: 'female',
						sortBy: 'popularityScore',
					},
				},

				// Location specific categories
				{
					id: 130,
					url: 'agriculture-loans-in-the-middle-east',
					queryParams: 'status=fundRaising&country=JO,PS,IL,TR&sector=1',
					flssLoanSearch: {
						sectorId: [1],
						countryIsoCode: ['JO', 'PS', 'IL', 'TR'],
					},
				},
				{
					id: 131,
					url: 'agriculture-loans-in-oceania',
					queryParams: 'status=fundRaising&country=WS,TL,SB,TO,FJ,PG,VU,GU&sector=1',
					flssLoanSearch: {
						sectorId: [1],
						countryIsoCode: ['WS', 'TL', 'SB', 'TO', 'FJ', 'PG', 'VU', 'GU'],
					},
				},
				{
					id: 132,
					url: 'conflict-zone-loans-ending-soon',
					queryParams: 'status=fundRaising&expiringSoon=1&theme=Conflict Zones&sortBy=expiringSoon',
					flssLoanSearch: {
						themeId: [14],
						sortBy: 'expiringSoon',
					},
				},
				{
					id: 133,
					url: 'conflict-zone-loans-that-are-almost-funded',
					queryParams: 'status=fundRaising&theme=Conflict Zones&sortBy=amountLeft',
					flssLoanSearch: {
						themeId: [14],
						sortBy: 'amountLeft',
					},
				},
				{
					id: 134,
					url: 'african-conflict-zones',
					queryParams: 'status=fundRaising&country=MZ,UG,TZ,SN,RW,KE,CD,LR,SL,BF,CM,GH,TG,MG,MW,ZM,ML,EG,LS,ZA,BI,SS,ZW,NA&theme=Conflict Zones',
					flssLoanSearch: {
						themeId: [14],
						countryIsoCode: ['MZ', 'UG', 'TZ', 'SN', 'RW', 'KE', 'CD', 'LR', 'SL', 'BF', 'CM', 'GH', 'TG', 'MG', 'MW', 'ZM', 'ML', 'EG', 'LS', 'ZA', 'BI', 'SS', 'ZW', 'NA'],
					},
				},
				{
					id: 135,
					url: 'latin-american-conflict-zones',
					queryParams: 'status=fundRaising&country=DO,BO,GT,PY,HN,PE,CR,PA,EC,CO,SV,NI,MX,BR,CL,HT,BZ,PR,VI&theme=Conflict Zones',
					flssLoanSearch: {
						themeId: [14],
						countryIsoCode: ['DO', 'BO', 'GT', 'PY', 'HN', 'PE', 'CR', 'PA', 'EC', 'CO', 'SV', 'NI', 'MX', 'BR', 'CL', 'HT', 'BZ', 'PR', 'VI'],
					},
				},
				{
					id: 136,
					url: 'middle-eastern-conflict-zones',
					queryParams: 'status=fundRaising&country=JO,PS,IL,TR&theme=Conflict Zones',
					flssLoanSearch: {
						themeId: [14],
						countryIsoCode: ['JO', 'PS', 'IL', 'TR'],
					},
				},
				{
					id: 137,
					url: 'refugee-and-i-d-p-loans-ending-soon',
					queryParams: 'status=fundRaising&expiringSoon=1&theme=Refugees/Displaced&sortBy=expiringSoon',
					flssLoanSearch: {
						themeId: [28],
						sortBy: 'expiringSoon',
					},
				},
				{
					id: 138,
					url: 'refugee-and-i-d-p-loans-that-are-almost-funded',
					queryParams: 'status=fundRaising&theme=Refugees/Displaced&sortBy=amountLeft',
					flssLoanSearch: {
						themeId: [28],
						sortBy: 'amountLeft',
					},
				},
				{
					id: 139,
					url: 'refugee-and-i-d-ps-in-latin-america',
					queryParams: 'status=fundRaising&country=DO,BO,GT,PY,HN,PE,CR,PA,EC,CO,SV,NI,MX,BR,CL,HT,BZ,PR,VI&theme=Refugees/Displaced',
					flssLoanSearch: {
						themeId: [28],
						countryIsoCode: ['DO', 'BO', 'GT', 'PY', 'HN', 'PE', 'CR', 'PA', 'EC', 'CO', 'SV', 'NI', 'MX', 'BR', 'CL', 'HT', 'BZ', 'PR', 'VI'],
					},
				},
				{
					id: 140,
					url: 'refugee-and-i-d-ps-in-the-middle-east',
					queryParams: 'status=fundRaising&country=JO,PS,IL,TR&theme=Refugees/Displaced',
					flssLoanSearch: {
						themeId: [28],
						countryIsoCode: ['JO', 'PS', 'IL', 'TR'],
					},
				},
				{
					id: 141,
					url: 'responsible-water-collection-and-storage',
					queryParams: 'status=fundRaising&distributionModel=field_partner',
					flssLoanSearch: {
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 142,
					url: '6-month-loans',
					queryParams: 'status=fundRaising&lenderTerm=0,6&defaultRate=,0.01&distributionModel=field_partner',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 6),
						partnerDefaultRate: createMinMaxRange(0, 0.01),
					},
				},
				{
					id: 143,
					url: 'short-term-loans-ending-soon',
					queryParams: 'status=fundRaising&lenderTerm=0,16&expiringSoon=1',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 6),
					},
				},
				{
					id: 144,
					url: 'short-term-loans-almost-funded',
					queryParams: 'status=fundRaising&lenderTerm=0,16&distributionModel=field_partner&sortBy=amountLeft',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 16),
						sortBy: 'amountLeft',
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 145,
					url: 'africa-short-term-loans',
					queryParams: 'status=fundRaising&lenderTerm=0,16&country=MZ,UG,TZ,SN,RW,KE,CD,LR,SL,BF,CM,GH,NG,TG,MG,MW,ZM,ML,EG,LS,ZA,BI,SS,ZW,NA',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 16),
						countryIsoCode: ['MZ', 'UG', 'TZ', 'SN', 'RW', 'KE', 'CD', 'LR', 'SL', 'BF', 'CM', 'GH', 'NG', 'TG', 'MG', 'MW', 'ZM', 'ML', 'EG', 'LS', 'ZA', 'BI', 'SS', 'ZW', 'NA'],
					},
				},
				{
					id: 146,
					url: 'asia-short-term-loans',
					queryParams: 'status=fundRaising&lenderTerm=0,16&country=KH,NP,TJ,TH,VN,PH,KG,IN,ID,PK,MM,LA,BT,BD',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 16),
						countryIsoCode: ['KH', 'NP', 'TJ', 'TH', 'VN', 'PH', 'KG', 'IN', 'ID', 'PK', 'MM', 'LA', 'BT', 'BD'],
					},
				},
				{
					id: 148,
					url: 'eastern-europe-short-term-loans',
					queryParams: 'status=fundRaising&lenderTerm=0,16&country=GE,AL,XK,MD',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 16),
						countryIsoCode: ['GE', 'AL', 'XK', 'MD'],
					},
				},
				{
					id: 149,
					url: 'middle-east-short-term-loans',
					queryParams: 'status=fundRaising&lenderTerm=0,16&country=JO,PS,IL,TR',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 16),
						countryIsoCode: ['JO', 'PS', 'IL', 'TR'],
					},
				},
				{
					id: 150,
					url: 'oceania-short-term-loans',
					queryParams: 'status=fundRaising&lenderTerm=0,16&country=WS,TL,SB,TO,FJ,PG,VU,GU',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 16),
						countryIsoCode: ['WS', 'TL', 'SB', 'TO', 'FJ', 'PG', 'VU', 'GU'],
					},
				},
				{
					id: 151,
					url: 'b-i-p-o-c-business',
					queryParams: 'status=fundRaising&country=US&loanTags=51&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						tagId: [51],
						distributionModel: 'DIRECT',
					},
				},
				{
					id: 152,
					url: 'adapt-to-climate-change-already-here',
					queryParams: 'status=fundRaising&sector=1',
					flssLoanSearch: {
						sectorId: [1],
					},
				},
				{
					id: 153,
					url: 'protect-against-loss',
					queryParams: 'status=fundRaising&theme=Crop Insurance',
					flssLoanSearch: {
						themeId: [37],
					},
				},

				// Misc Promotional or Unsupported URLS

				{
					id: 96,
					url: 'covid-19',
					// queryParams are from initial Loan Channel setup on 4.27.2020 around 3pm
					queryParams: 'status=fundRaising&sector=1,9,5,14,17,12,6,8,7,4,3,13&sortBy=popularity',
					// this will cause legacy lend to load up and apply all params for the Loan Channel
					fallbackUrl: '/lend/covid-19?filter=bypass',
					flssLoanSearch: {
						sectorId: [1, 9, 5, 14, 17, 12, 6, 8, 7, 4, 3, 13],
						sortBy: 'popularityScore',
					},
				},
				{
					id: 97,
					url: 'hitachi-employees-helping-c-o-v-i-d-impacted-businesses',
					// queryParams are from initial Loan Channel setup on 5.3.2020
					queryParams: 'status=fundRaising&riskRating=3,5&sector=1,9,5,14,17,12,8,7,4,3,13&theme=Islamic Finance,Youth,Start-Up,Water and Sanitation,Vulnerable Groups,Fair Trade,Rural Exclusion,Mobile Technology,Underfunded Areas,Conflict Zones,Job Creation,Growing Businesses,Disaster recovery,Innovative Loans,Refugees/Displaced,Social Enterprise,Crisis Support Loans&distributionModel=field_partner',
					// this will cause legacy lend to load up and apply all params for the Loan Channel
					fallbackUrl: '/lend/hitachi-employees-helping-c-o-v-i-d-impacted-businesses?filter=bypass',
					flssLoanSearch: {
						partnerRiskRating: createMinMaxRange(3, 5),
						distributionModel: 'FIELDPARTNER',
						sectorId: [1, 9, 5, 14, 17, 12, 8, 7, 4, 3, 13],
						themeId: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 20, 24, 28, 29, 36],
					},
				},
				{
					id: 98,
					url: 'crisis-support-loans',
					// queryParams are from initial Loan Channel setup on 5.06.2020
					queryParams: 'status=fundRaising&theme=Crisis Support Loans&distributionModel=field_partner',
					// this will cause legacy lend to load up and apply all params for the Loan Channel
					// fallbackUrl: '/lend/crisis-support-loans?filter=bypass'
					algoliaParams: 'attributes=Crisis%20Support%20Loans&sortBy=popularity',
					flssLoanSearch: {
						themeId: [36],
						distributionModel: 'FIELDPARTNER',
						sortBy: 'popularityScore',
					},
				},
				{
					id: 108,
					url: 'recommended-by-lenders',
					queryParams: 'status=fundRaising&riskRating=1,5&lenderTerm=0,10&partner=33,465,265,269,116,271,409,438,34,282,444,310,159,210,268,104,445,32,155,108,158,127,43,106,2,3,4,5,128,36,40,109,355,46,105,37,270,287,356,421,346,107,281,286,153,607,41,47,605,111,110,354,280,288,424,447,347,6,472,112,186,437,162,360,164,184,278,313,267,45,365,478,433,96,290,42,1,8,49,353,7,10,219,53,224,188,427,350,227,9,54,50,55,56,370,11,152,52,212,307,136,51,57,364,291,189,369,481,61,168,220,293,113,165,63,299,384,225,533,131,132,476,480,380,135,304,528,172,170,397,521,66,130,295,306,468,67,144,385,141,228,388,393,137,279,396,559,171,344,377,454,289,245,302,341,455,382,403,477,316,395,441,450,300,71,138,142,392,296,70,13,574,262,567,416,229,214,60,64,247,230,248,244,484,312,321,401,143,198,391,238,241,242,305,213,323,72,200,73,16,82,237,485,249,84,324,487,572,415,254,258,462,407,202,327,332,79,204&defaultRate=,0.01&distributionModel=field_partner',
					flssLoanSearch: {
						partnerRiskRating: createMinMaxRange(1, 5),
						lenderRepaymentTerm: createMinMaxRange(0, 10),
						partnerId: [33, 465, 265, 269, 116, 271, 409, 438, 34, 282, 444, 310, 159, 210, 268, 104, 445, 32, 155, 108, 158, 127, 43, 106, 2, 3, 4, 5, 128, 36, 40, 109, 355, 46, 105, 37, 270, 287, 356, 421, 346, 107, 281, 286, 153, 607, 41, 47, 605, 111, 110, 354, 280, 288, 424, 447, 347, 6, 472, 112, 186, 437, 162, 360, 164, 184, 278, 313, 267, 45, 365, 478, 433, 96, 290, 42, 1, 8, 49, 353, 7, 10, 219, 53, 224, 188, 427, 350, 227, 9, 54, 50, 55, 56, 370, 11, 152, 52, 212, 307, 136, 51, 57, 364, 291, 189, 369, 481, 61, 168, 220, 293, 113, 165, 63, 299, 384, 225, 533, 131, 132, 476, 480, 380, 135, 304, 528, 172, 170, 397, 521, 66, 130, 295, 306, 468, 67, 144, 385, 141, 228, 388, 393, 137, 279, 396, 559, 171, 344, 377, 454, 289, 245, 302, 341, 455, 382, 403, 477, 316, 395, 441, 450, 300, 71, 138, 142, 392, 296, 70, 13, 574, 262, 567, 416, 229, 214, 60, 64, 247, 230, 248, 244, 484, 312, 321, 401, 143, 198, 391, 238, 241, 242, 305, 213, 323, 72, 200, 73, 16, 82, 237, 485, 249, 84, 324, 487, 572, 415, 254, 258, 462, 407, 202, 327, 332, 79, 204],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 65,
					url: 'new-countries-for-you',
					queryParams: 'status=fundRaising&distributionModel=field_partner',
					algoliaParams: '',
					flssLoanSearch: {
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 34,
					url: 'international-womens-day',
					queryParams: 'status=fundRaising&gender=female',
					flssLoanSearch: {
						gender: 'female',
					},
				},
				{
					id: 48,
					url: 'human-flow-fund-support-refugees-and-i-d-ps',
					queryParams: 'status=fundRaising&sector=1,9,5,14,12,8,7,4,3,13&theme=Conflict Zones,Refugees/Displaced&distributionModel=field_partner',
					flssLoanSearch: {
						sectorId: [1, 9, 5, 14, 12, 8, 7, 4, 3, 13],
						themeId: [14, 28],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 51,
					url: 'blackrock',
					queryParams: 'status=fundRaising&excludeNonRated=1&distributionModel=field_partner',
					algoliaParams: '',
					flssLoanSearch: {
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 61,
					url: 'flash-match',
					queryParams: 'status=fundRaising',
					algoliaParams: '',
					flssLoanSearch: {},
				},
				{
					id: 42,
					url: '1-billion-in-change',
					queryParams: 'status=fundRaising',
					algoliaParams: '',
					flssLoanSearch: {},
				},
				{
					id: 35,
					url: 'choose-a-borrower',
					queryParams: 'status=fundRaising&partner=246,77,123,120,171,65,458,379,105,144,125,301,93,127,143,55,137,154,136,163,63,404,231,100,243,245,9,406,294,363,176,428,201,167,126,118,138,15,121,87,222,247,199,188,159,181,106,185,146,169,204,115,58,145&distributionModel=field_partner',
					flssLoanSearch: {
						partnerId: [246, 77, 123, 120, 171, 65, 458, 379, 105, 144, 125, 301, 93, 127, 143, 55, 137, 154, 136, 163, 63, 404, 231, 100, 243, 245, 9, 406, 294, 363, 176, 428, 201, 167, 126, 118, 138, 15, 121, 87, 222, 247, 199, 188, 159, 181, 106, 185, 146, 169, 204, 115, 58, 145],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 37,
					url: 'choose-a-woman-borrower',
					queryParams: 'status=fundRaising&gender=female&lenderTerm=0,18&partner=246,77,123,120,171,65,458,379,105,144,125,301,93,127,143,55,137,154,136,163,63,404,231,100,243,245,9,406,294,363,176,428,201,167,126,118,138,15,121,87,222,247,199,188,159,181,106,185,146,169,204,115,58,145&distributionModel=field_partner',
					flssLoanSearch: {
						gender: 'female',
						lenderRepaymentTerm: createMinMaxRange(0, 18),
						partnerId: [246, 77, 123, 120, 171, 65, 458, 379, 105, 144, 125, 301, 93, 127, 143, 55, 137, 154, 136, 163, 63, 404, 231, 100, 243, 245, 9, 406, 294, 363, 176, 428, 201, 167, 126, 118, 138, 15, 121, 87, 222, 247, 199, 188, 159, 181, 106, 185, 146, 169, 204, 115, 58, 145],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 38,
					url: 'choose-a-farmer',
					queryParams: 'status=fundRaising&lenderTerm=0,18&sector=1&partner=246,77,123,120,171,65,458,379,105,144,125,301,93,127,143,55,137,154,136,163,63,404,231,100,243,245,9,406,294,363,176,428,201,167,126,118,138,15,121,87,222,247,199,188,159,181,106,185,146,169,204,115,58,145&distributionModel=field_partner',
					flssLoanSearch: {
						sectorId: [1],
						lenderRepaymentTerm: createMinMaxRange(0, 18),
						partnerId: [246, 77, 123, 120, 171, 65, 458, 379, 105, 144, 125, 301, 93, 127, 143, 55, 137, 154, 136, 163, 63, 404, 231, 100, 243, 245, 9, 406, 294, 363, 176, 428, 201, 167, 126, 118, 138, 15, 121, 87, 222, 247, 199, 188, 159, 181, 106, 185, 146, 169, 204, 115, 58, 145],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 40,
					url: 'foster-city',
					queryParams: 'status=fundRaising&state=CA&city_state=San Jose,CA&distributionModel=direct',
					algoliaParams: '',
					flssLoanSearch: {
						distributionModel: 'DIRECT',
						city: ['San Jose'],
					},
				},
				{
					id: 43,
					url: 'super-power-a-woman-on-kiva',
					queryParams: 'status=fundRaising&gender=female&distributionModel=field_partner',
					algoliaParams: 'gender=female',
					flssLoanSearch: {
						gender: 'female',
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 44,
					url: 'hitachi-employees-helping-to-ignite-a-dream',
					queryParams: 'status=fundRaising&riskRating=3,5&sector=1,9,5,14,17,12,6,8,7,4,3,13&theme=Islamic Finance,Youth,Start-Up,Water and Sanitation,Vulnerable Groups,Fair Trade,Rural Exclusion,Mobile Technology,Underfunded Areas,Conflict Zones,Job Creation,Growing Businesses,Disaster recovery,Innovative Loans,Refugees/Displaced,Social Enterprise,Crisis Support Loans&distributionModel=field_partner',
					algoliaParams: '',
					flssLoanSearch: {
						partnerRiskRating: createMinMaxRange(3, 5),
						sectorId: [1, 9, 5, 14, 17, 12, 6, 8, 7, 4, 3, 13],
						themeId: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 20, 24, 28, 29, 36],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 45,
					url: 's-j-peninsula',
					queryParams: 'status=fundRaising&country=US&state=CA&city_state=San Jose,CA,Belmont,CA,Atherton,CA,Brisbane,CA,Burlingame,CA,Campbell,CA,Castro Valley,CA,Colma,CA,Cupertino,CA,Daly City,CA,East Palo Alto,CA,Foster City,CA,Fremont,CA,Gilroy,CA,Half Moon Bay,CA,Hayward,CA,Hillsborough,CA,La Honda,CA,Ladera,CA,Loma Mar,CA,Los Altos,CA,Los Altos Hills,CA,Los Gatos,CA,Menlo Park,CA,Millbrae,CA,Milpitas,CA,Monte Sereno,CA,Morgan Hill,CA,Mountain View,CA,Pacifica,CA,Palo Alto,CA,Pescadero,CA,Portola Valley,CA,Redwood City,CA,San Bruno,CA,San Carlos,CA,San Gregorio,CA,San Mateo,CA,Santa Clara,CA,Saratoga,CA,South San Francisco,CA,Sunnyvale,CA,Woodside,CA&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						city: ['San Jose', 'Belmont', 'Atherton', 'Brisbane', 'Burlingame', 'Campbell', 'Castro Valley', 'Colma', 'Cupertino', 'Daly City', 'East Palo Alto', 'Foster City', 'Fremont', 'Gilroy', 'Half Moon Bay', 'Hayward', 'Hillsborough', 'La Honda', 'Ladera', 'Loma Mar', 'Los Altos', 'Los Altos Hills', 'Los Gatos', 'Menlo Park', 'Millbrae', 'Milpitas', 'Monte Sereno', 'Morgan Hill', 'Mountain View', 'Pacifica', 'Palo Alto', 'Pescadero', 'Portola Valley', 'Redwood City', 'San Bruno', 'San Carlos', 'San Gregorio', 'San Mateo', 'Santa Clara', 'Saratoga', 'South San Francisco', 'Sunnyvale', 'Woodside'],
						distributionModel: 'DIRECT',
					},
				},
				{
					id: 49,
					url: 'choose-for-me',
					queryParams: 'status=fundRaising&riskRating=1,5&distributionModel=field_partner',
					algoliaParams: '',
					flssLoanSearch: {
						partnerRiskRating: createMinMaxRange(1, 5),
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 99,
					url: 'i-t-cosmetics-confidence',
					queryParams: 'status=fundRaising&gender=female&riskRating=3,5&sector=1,9,5,14,15,17,12,6,10,8,16,7,4,3,13&distributionModel=field_partner',
					algoliaParams: '',
					flssLoanSearch: {
						gender: 'female',
						partnerRiskRating: createMinMaxRange(3, 5),
						sectorId: [1, 9, 5, 14, 15, 17, 12, 6, 10, 8, 16, 7, 4, 3, 13],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 100,
					url: 'hitachis-c-o-v-i-d-19-response',
					queryParams: 'status=fundRaising&riskRating=3,5&sector=1,9,5,14,17,12,8,7,4,3,13&theme=Islamic Finance,Youth,Start-Up,Water and Sanitation,Vulnerable Groups,Fair Trade,Rural Exclusion,Mobile Technology,Underfunded Areas,Conflict Zones,Job Creation,Growing Businesses,Disaster recovery,Innovative Loans,Refugees/Displaced,Social Enterprise,Crisis Support Loans&distributionModel=field_partner',
					algoliaParams: '',
					flssLoanSearch: {
						partnerRiskRating: createMinMaxRange(3, 5),
						themeId: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 20, 24, 28, 29, 36],
						sectorId: [1, 9, 5, 14, 17, 12, 8, 7, 4, 3, 13],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 157,
					url: 'l-g-b-t-q',
					queryParams: 'status=fundRaising&loanTags=73',
					flssLoanSearch: {
						tagId: [73],
					},
				},
				{
					id: 155,
					url: 'matched-loans',
					flssLoanSearch: {
						isMatchable: true,
					},
				},
				{
					id: 171,
					url: 'featured-projects',
					flssLoanSearch: {
						lenderRepaymentTerm: createMinMaxRange(0, 8),
						sortBy: 'amountLeft',
					},
				},
				{
					id: 172,
					url: 'basic-needs',
					queryParams: 'sector=6,10,20,21',
					flssLoanSearch: {
						sectorId: [6, 10, 20, 21],
					},
				},
				{
					id: 159,
					url: 'loans-with-video',
					queryParams: 'status=fundRaising&loanTags=75&distributionModel=both',
					flssLoanSearch: {
						tagId: [75],
					},
				},
				{
					id: 169,
					url: 'support-the-most-basic-needs',
					queryParams: 'status=fundRaising&sector=6,10&distributionModel=both',
					flssLoanSearch: {
						sectorId: [6, 10],
					},
				},
				{
					id: 156,
					url: 'palestine',
					queryParams: 'status=fundRaising&country=PS&distributionModel=field_partner',
					flssLoanSearch: {
						countryIsoCode: ['PS'],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 160,
					url: 'wisconsin',
					queryParams: 'status=fundRaising&state=WI&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						state: ['WI'],
					},
				},
				{
					id: 161,
					url: 'colorado',
					queryParams: 'status=fundRaising&country=US&zip=80011,80019,80022,80024,80030,80031,80035,80036,80037,80040,80042,80045,80102,80136,80137,80221,80229,80233,80234,80241,80260,80601,80602,80614,80640,80010,80012,80013,80014,80015,80016,80017,80018,80041,80044,80046,80047,80103,80105,80110,80111,80112,80113,80120,80121,80122,80150,80151,80155,80160,80161,80165,80166,80247,80020,80038,80201,80202,80203,80204,80205,80206,80207,80208,80209,80210,80211,80212,80216,80217,80218,80219,80220,80222,80223,80224,80230,80231,80236,80237,80238,80239,80243,80244,80246,80248,80249,80250,80251,80252,80256,80257,80259,80261,80262,80263,80264,80265,80266,80271,80273,80274,80279,80280,80281,80290,80291,80293,80294,80295,80299,80104,80108,80109,80116,80118,80124,80125,80126,80129,80130,80131,80134,80135,80138,80163,80001,80002,80003,80004,80005,80006,80007,80021,80033,80034,80123,80127,80128,80162,80214,80215,80225,80226,80227,80228,80232,80235,80401,80402,80403,80419,80425,80433,80437,80439,80453,80454,80457,80465,80470,80025,80026,80027,80028,80101,80106,80107,80117,80132,80133,80301,80302,80303,80304,80305,80306,80307,80308,80309,80310,80314,80321,80322,80323,80328,80329,80420,80421,80422,80423,80424,80426,80427,80428,80429,80430,80432,80433,80434,80435,80436,80438,80440,80442,80443,80444,80446,80447,80448,80449,80451,80452,80455,80456,80459,80461,80463,80466,80467,80468,80469,80471,80473,80474,80475,80476,80477,80478,80479,80480,80481,80482,80483,80487,80488,80497,80498,80501,80502,80503,80504,80510,80511,80512,80513,80514,80515,80516,80517,80520,80521,80522,80523,80524,80525,80526,80527,80528,80530,80532,80533,80534,80535,80536,80537,80538,80539,80540,80541,80542,80543,80544,80545,80546,80547,80549,80550,80551,80553,80603,80610,80611,80612,80615,80620,80621,80622,80623,80624,80631,80632,80633,80634,80638,80639,80642,80643,80644,80645,80646,80648,80649,80650,80651,80652,80653,80654,80701,80705,80720,80721,80722,80723,80726,80727,80728,80729,80731,80732,80733,80734,80735,80736,80737,80740,80741,80742,80743,80744,80745,80746,80747,80749,80750,80751,80754,80755,80757,80758,80759,80801,80802,80804,80805,80807,80808,80809,80810,80812,80813,80814,80815,80816,80817,80818,80819,80820,80821,80822,80823,80824,80825,80826,80827,80828,80829,80830,80831,80832,80833,80834,80835,80836,80840,80841,80860,80861,80862,80863,80864,80866,80901,80903,80904,80905,80906,80907,80908,80909,80910,80911,80912,80913,80914,80915,80916,80917,80918,80919,80920,80921,80922,80923,80924,80925,80926,80927,80928,80929,80930,80931,80932,80933,80934,80935,80936,80937,80938,80939,80940,80941,80942,80943,80944,80945,80946,80947,80949,80950,80951,80960,80962,80970,80977,80995,80997,81001,81002,81003,81004,81005,81006,81007,81008,81009,81010,81011,81012,81019,81020,81021,81022,81023,81024,81025,81027,81029,81030,81033,81034,81036,81038,81039,81040,81041,81043,81044,81045,81046,81047,81049,81050,81052,81054,81055,81057,81058,81059,81062,81063,81064,81067,81069,81071,81073,81076,81077,81081,81082,81084,81087,81089,81090,81091,81092,81101,81102,81120,81121,81122,81123,81124,81125,81126,81127,81128,81129,81130,81131,81132,81133,81134,81135,81136,81137,81138,81140,81141,81143,81144,81146,81147,81148,81149,81151,81152,81153,81154,81155,81157,81201,81210,81211,81212,81215,81220,81221,81222,81223,81224,81225,81226,81227,81228,81230,81231,81232,81233,81235,81236,81237,81239,81240,81241,81242,81243,81244,81247,81248,81251,81252,81253,81290,81301,81302,81303,81320,81321,81323,81324,81325,81326,81327,81328,81329,81330,81331,81332,81334,81335,81401,81402,81410,81411,81413,81414,81415,81416,81418,81419,81420,81422,81423,81424,81425,81426,81427,81428,81429,81430,81431,81432,81433,81434,81435,81501,81502,81503,81504,81505,81506,81520,81521,81522,81523,81524,81525,81526,81527,81601,81602,81610,81611,81612,81615,81620,81621,81623,81624,81625,81626,81630,81631,81632,81633,81635,81636,81637,81638,81639,81640,81641,81642,81643,81645,81646,81647,81648,81649,81650,81652,81653,81654,81655,81656,81657,81658&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						distributionModel: 'DIRECT',
						state: ['CO'],
					},
				},
				{
					id: 163,
					url: 'district-of-columbia-loans',
					queryParams: 'status=fundRaising&country=US&zip=20001,20002,20003,20004,20005,20006,20007,20008,20009,20010,20011,20012,20013,20015,20016,20017,20018,20019,20020,20022,20024,20026,20027,20029,20030,20032,20033,20035,20036,20037,20038,20039,20040,20041,20042,20043,20044,20045,20047,20049,20050,20052,20053,20055,20056,20057,20058,20059,20060,20061,20062,20063,20064,20065,20066,20067,20068,20069,20070,20071,20073,20074,20075,20076,20077,20078,20080,20081,20082,20090,20091,20201,20202,20203,20204,20206,20207,20208,20210,20211,20212,20213,20214,20215,20216,20217,20218,20219,20220,20221,20222,20223,20224,20226,20227,20228,20229,20230,20232,20233,20235,20237,20238,20239,20240,20241,20242,20244,20245,20250,20251,20252,20254,20260,20261,20262,20265,20266,20268,20270,20277,20289,20299,20301,20303,20306,20310,20314,20317,20318,20319,20330,20340,20350,20355,20370,20372,20373,20374,20375,20376,20380,20388,20389,20390,20391,20392,20393,20394,20395,20398,20401,20402,20403,20404,20405,20406,20407,20408,20410,20411,20412,20413,20414,20415,20416,20417,20418,20419,20420,20421,20422,20423,20424,20425,20426,20427,20428,20429,20431,20433,20434,20435,20436,20437,20439,20440,20441,20442,20444,20447,20451,20453,20456,20460,20463,20468,20469,20470,20472,20500,20501,20502,20503,20504,20505,20506,20507,20508,20509,20510,20511,20515,20520,20521,20522,20523,20524,20525,20526,20527,20528,20529,20530,20531,20533,20534,20535,20536,20537,20538,20539,20540,20541,20542,20543,20544,20546,20547,20548,20549,20551,20552,20553,20554,20555,20557,20559,20560,20565,20566,20570,20571,20572,20573,20575,20576,20577,20578,20579,20580,20581,20585,20586,20590,20591,20593,20594,20597,20599&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						distributionModel: 'DIRECT',
						state: ['DC'],
					},
				},
				{
					id: 168,
					url: 'delaware-loans',
					queryParams: 'status=fundRaising&zip=19701,19702,19703,19706,19707,19708,19709,19710,19711,19712,19713,19714,19715,19716,19717,19718,19720,19721,19725,19726,19730,19731,19732,19733,19734,19735,19736,19801,19802,19803,19804,19805,19806,19807,19808,19809,19810,19850,19880,19884,19885,19886,19890,19891,19892,19893,19894,19895,19896,19897,19898,19899,19901,19902,19903,19904,19905,19906,19930,19931,19933,19934,19936,19938,19939,19940,19941,19943,19944,19945,19946,19947,19950,19951,19952,19953,19954,19955,19956,19958,19960,19961,19962,19963,19964,19966,19967,19968,19969,19970,19971,19973,19975,19977,19979,19980&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						distributionModel: 'DIRECT',
						state: ['DE'],
					},
				},
				{
					id: 154,
					url: 'loans-to-women-being-matched',
					queryParams: 'status=fundRaising&gender=female&distributionModel=both&matcherAccountId=1487001,1547025,200274423,200284457,200284685,200363459,200408698,200444376,200588036,200589331,200595120,201024089,201484338,201800709,201936891,202183546,202494238,202496956,202849326,203055718,203432461,203614612,203670557,203928592,203934932,203937080,203976461,203995508,203995509,203998669,204006929,204025648,204027538,204050806,204063264,204096364,204109814,204112206,204114859,204116920,204122613,204122615,204127583,204143648',
					flssLoanSearch: {
						gender: 'female',
						isMatchable: true,
					},
				},
				{
					id: 162,
					url: 'fresno-c-a-loans',
					queryParams: 'status=fundRaising&country=US&zip=93723,93602,93730,93606,93605,93608,93607,93609,93612,93611,93616,93619,93618,93621,93620,93622,93625,93624,93627,93626,93630,93628,93633,93631,93634,93640,93641,93646,93648,93650,93649,93652,93651,93654,93737,93657,93656,93660,93664,93662,93668,93667,93210,93675,93702,93701,93704,93703,93706,93705,93710,93711,93234,93720,93722,93721,93725,93724,93242,93727,93726,93728,93740,93750,93888,95202,93301,93303,93306,93638,93637,93610,93636,93614,93644,93601,93643,93645,93653,93669,93604,93639,95023,95380,93635,95301,95340,95348,95341,95334,95388,95315,95322,95324,95316,95365,95333,95374,95369,95303,95317,95325,93665,95312,95342,95344,95343,93661,9534,93230,93245,93212,93204,93249,93266,93201,93202,93246,93239,93282,93232,93257,93274,93291,93215,93277,93292,93247,93221,93647,93286,93219,93223,93615,93267,93256,93270,93272,93235,93265,93271,93527,93218,93238,93261,93255,93603,93244,93262,93549,93666,93670,93673,93207,93208,93227,93237,93260,93258,93275,93279,93278,93290,93307,93536,93309,93313,93308,93312,93304,93311,93305,93314,93555,93561,93280,93263,93560,93203,93268,93250,93241,93505,93240,93501,93225,93461,93516,93206,93252,93285,93283,93243,93523,93524,93205,93518,93251,93531,93224,93554,93519,93287,93226,93216,93220,93222,93276&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						distributionModel: 'DIRECT',
						city: ['Fresno'],
					},
				},
				{
					id: 164,
					url: 'iowa-loans',
					queryParams: 'status=fundRaising&country=US&zip=50001,50002,50003,50005,50006,50007,50008,50009,50010,50011,50012,50013,50014,50020,50021,50022,50023,50025,50026,50027,50028,50029,50031,50032,50033,50034,50035,50036,50037,50038,50039,50040,50041,50042,50043,50044,50046,50047,50048,50049,50050,50051,50052,50054,50055,50056,50057,50058,50059,50060,50061,50062,50063,50064,50065,50066,50067,50068,50069,50070,50071,50072,50073,50074,50075,50076,50078,50101,50102,50103,50104,50105,50106,50107,50108,50109,50110,50111,50112,50115,50116,50117,50118,50119,50120,50122,50123,50124,50125,50126,50127,50128,50129,50130,50131,50132,50133,50134,50135,50136,50137,50138,50139,50140,50141,50142,50143,50144,50145,50146,50147,50148,50149,50150,50151,50152,50153,50154,50155,50156,50157,50158,50160,50161,50162,50163,50164,50165,50166,50167,50168,50169,50170,50171,50173,50174,50201,50206,50207,50208,50210,50211,50212,50213,50214,50216,50217,50218,50219,50220,50222,50223,50225,50226,50227,50228,50229,50230,50231,50232,50233,50234,50235,50236,50237,50238,50239,50240,50241,50242,50243,50244,50246,50247,50248,50249,50250,50251,50252,50254,50255,50256,50257,50258,50259,50261,50262,50263,50264,50265,50266,50268,50269,50271,50272,50273,50274,50275,50276,50277,50278,50301,50302,50303,50304,50305,50306,50307,50308,50309,50310,50311,50312,50313,50314,50315,50316,50317,50318,50319,50320,50321,50322,50323,50325,50327,50328,50329,50330,50331,50332,50333,50334,50335,50336,50339,50340,50347,50350,50359,50360,50361,50362,50363,50364,50367,50368,50369,50380,50381,50391,50392,50393,50394,50395,50396,50397,50398,50401,50402,50420,50421,50423,50424,50426,50427,50428,50430,50431,50432,50433,50434,50435,50436,50438,50439,50440,50441,50444,50446,50447,50448,50449,50450,50451,50452,50453,50454,50455,50456,50457,50458,50459,50460,50461,50464,50465,50466,50467,50468,50469,50470,50471,50472,50473,50475,50476,50477,50478,50479,50480,50481,50482,50483,50484,50501,50510,50511,50514,50515,50516,50517,50518,50519,50520,50521,50522,50523,50524,50525,50526,50527,50528,50529,50530,50531,50532,50533,50535,50536,50538,50539,50540,50541,50542,50543,50544,50545,50546,50548,50551,50552,50554,50556,50557,50558,50559,50560,50561,50562,50563,50565,50566,50567,50568,50569,50570,50571,50573,50574,50575,50576,50577,50578,50579,50581,50582,50583,50585,50586,50588,50590,50591,50592,50593,50594,50595,50597,50598,50599,50601,50602,50603,50604,50605,50606,50607,50608,50609,50611,50612,50613,50614,50616,50619,50620,50621,50622,50623,50624,50625,50626,50627,50628,50629,50630,50631,50632,50633,50634,50635,50636,50638,50641,50642,50643,50644,50645,50647,50648,50649,50650,50651,50652,50653,50654,50655,50657,50658,50659,50660,50661,50662,50664,50665,50666,50667,50668,50669,50670,50671,50672,50673,50674,50675,50676,50677,50680,50681,50682,50701,50702,50703,50704,50706,50707,50801,50830,50831,50833,50835,50836,50837,50839,50840,50841,50842,50843,50845,50846,50847,50848,50849,50851,50853,50854,50857,50858,50859,50860,50861,50862,50863,50864,50936,50940,50947,50950,50980,50981,51001,51002,51003,51004,51005,51006,51007,51008,51009,51010,51011,51012,51014,51015,51016,51018,51019,51020,51022,51023,51024,51025,51026,51027,51028,51029,51030,51031,51033,51034,51035,51036,51037,51038,51039,51040,51041,51044,51045,51046,51047,51048,51049,51050,51051,51052,51053,51054,51055,51056,51058,51060,51061,51062,51063,51101,51102,51103,51104,51105,51106,51108,51109,51111,51201,51230,51231,51232,51234,51235,51237,51238,51239,51240,51241,51242,51243,51244,51245,51246,51247,51248,51249,51250,51301,51331,51333,51334,51338,51340,51341,51342,51343,51344,51345,51346,51347,51350,51351,51354,51355,51357,51358,51360,51363,51364,51365,51366,51401,51430,51431,51432,51433,51436,51439,51440,51441,51442,51443,51444,51445,51446,51447,51448,51449,51450,51451,51452,51453,51454,51455,51458,51459,51460,51461,51462,51463,51465,51466,51467,51501,51502,51503,51510,51520,51521,51523,51525,51526,51527,51528,51529,51530,51531,51532,51533,51534,51535,51536,51537,51540,51541,51542,51543,51544,51545,51546,51548,51549,51550,51551,51552,51553,51554,51555,51556,51557,51558,51559,51560,51561,51562,51563,51564,51565,51566,51570,51571,51572,51573,51575,51576,51577,51578,51579,51591,51593,51601,51602,51603,51630,51631,51632,51636,51637,51638,51639,51640,51645,51646,51647,51648,51649,51650,51651,51652,51653,51654,51656,52001,52002,52003,52004,52030,52031,52032,52033,52035,52036,52037,52038,52039,52040,52041,52042,52043,52044,52045,52046,52047,52048,52049,52050,52052,52053,52054,52056,52057,52060,52064,52065,52066,52068,52069,52070,52071,52072,52073,52074,52075,52076,52077,52078,52079,52099,52101,52132,52133,52134,52135,52136,52140,52141,52142,52144,52146,52147,52149,52151,52154,52155,52156,52157,52158,52159,52160,52161,52162,52163,52164,52165,52166,52168,52169,52170,52171,52172,52175,52201,52202,52203,52204,52205,52206,52207,52208,52209,52210,52211,52212,52213,52214,52215,52216,52217,52218,52219,52220,52221,52222,52223,52224,52225,52227,52228,52229,52231,52232,52233,52235,52236,52237,52240,52241,52242,52243,52244,52245,52246,52247,52248,52249,52251,52252,52253,52254,52255,52257,52301,52302,52305,52306,52307,52308,52309,52310,52312,52313,52314,52315,52316,52317,52318,52319,52320,52321,52322,52323,52324,52325,52326,52327,52328,52329,52330,52332,52333,52334,52335,52336,52337,52338,52339,52340,52341,52342,52344,52345,52346,52347,52348,52349,52350,52351,52352,52353,52354,52355,52356,52358,52359,52361,52362,52401,52402,52403,52404,52405,52406,52407,52408,52409,52410,52411,52497,52498,52499,52501,52530,52531,52533,52534,52535,52536,52537,52538,52540,52542,52543,52544,52548,52549,52550,52551,52552,52553,52554,52555,52556,52557,52560,52561,52562,52563,52565,52566,52567,52568,52569,52570,52571,52572,52573,52574,52576,52577,52580,52581,52583,52584,52585,52586,52588,52590,52591,52593,52594,52595,52601,52619,52620,52621,52623,52624,52625,52626,52627,52630,52631,52632,52635,52637,52638,52639,52640,52641,52642,52644,52645,52646,52647,52648,52649,52650,52651,52652,52653,52654,52655,52656,52657,52658,52659,52660,52701,52720,52721,52722,52726,52727,52728,52729,52730,52731,52732,52733,52734,52736,52737,52738,52739,52742,52745,52746,52747,52748,52749,52750,52751,52752,52753,52754,52755,52756,52757,52758,52759,52760,52761,52765,52766,52767,52768,52769,52771,52772,52773,52774,52776,52777,52778,52801,52802,52803,52804,52805,52806,52807,52808,52809,61201,61299,61264,61204,61240,61265,61275,61257,61256,61244&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						distributionModel: 'DIRECT',
						state: ['IA'],
					},
				},
				{
					id: 165,
					url: 'pittsburgh-loans',
					queryParams: 'status=fundRaising&country=US&zip=15004,15005,15006,15007,15009,15010,15012,15014,15015,15017,15018,15019,15020,15021,15022,15024,15025,15026,15027,15028,15030,15031,15032,15033,15034,15035,15036,15037,15038,15042,15043,15044,15045,15046,15047,15049,15050,15051,15052,15053,15054,15055,15056,15057,15059,15060,15061,15062,15063,15064,15065,15066,15067,15068,15071,15072,15074,15075,15076,15077,15078,15081,15082,15083,15084,15085,15086,15087,15088,15089,15090,15091,15095,15096,15101,15102,15104,15106,15108,15110,15112,15116,15120,15122,15123,15126,15127,15129,15131,15132,15133,15134,15135,15136,15137,15139,15140,15142,15143,15144,15145,15146,15147,15148,15201,15202,15203,15204,15205,15206,15207,15208,15209,15210,15211,15212,15213,15214,15215,15216,15217,15218,15219,15220,15221,15222,15223,15224,15225,15226,15227,15228,15229,15230,15231,15232,15233,15234,15235,15236,15237,15238,15239,15240,15241,15242,15243,15244,15250,15251,15252,15253,15254,15255,15257,15258,15259,15260,15261,15262,15263,15264,15265,15267,15268,15270,15272,15274,15275,15276,15277,15278,15279,15281,15282,15283,15285,15286,15289,15290,15295,15301,15310,15311,15312,15313,15314,15315,15316,15317,15320,15321,15322,15323,15324,15325,15327,15329,15330,15331,15332,15333,15334,15336,15337,15338,15339,15340,15341,15342,15344,15345,15346,15347,15348,15349,15350,15351,15352,15353,15354,15357,15358,15359,15360,15361,15362,15363,15364,15365,15366,15367,15368,15370,15376,15377,15378,15380,15401,15410,15413,15415,15416,15417,15420,15421,15422,15425,15428,15430,15431,15433,15435,15436,15437,15438,15439,15440,15442,15443,15444,15445,15446,15447,15448,15449,15450,15451,15454,15455,15456,15458,15459,15460,15461,15462,15463,15464,15465,15466,15467,15468,15469,15470,15472,15473,15474,15475,15476,15478,15479,15480,15482,15484,15486,15488,15489,15490,15492,15601,15610,15611,15612,15613,15615,15616,15617,15618,15619,15620,15621,15622,15623,15624,15625,15626,15627,15628,15629,15630,15631,15632,15633,15634,15635,15636,15637,15638,15639,15640,15641,15642,15644,15646,15647,15650,15655,15656,15658,15660,15661,15662,15663,15664,15665,15666,15668,15670,15671,15672,15673,15674,15675,15676,15677,15678,15679,15680,15681,15682,15683,15684,15685,15686,15687,15688,15689,15690,15691,15692,15693,15695,15696,15697,15698,15701,15710,15713,15716,15717,15720,15723,15725,15727,15731,15732,15736,15739,15747,15750,15751,15752,15754,15756,15763,15772,15774,15779,15783,15901,15902,15904,15905,15906,15907,15909,15915,15920,15923,15929,15931,15943,15944,15945,15948,15949,15951,15952,15954,15956,15958,16001,16002,16003,16020,16021,16022,16023,16024,16025,16027,16029,16030,16033,16034,16035,16037,16038,16039,16040,16041,16045,16046,16048,16050,16051,16052,16053,16055,16056,16057,16059,16061,16063,16066,16101,16102,16103,16105,16107,16108,16110,16111,16112,16113,16114,16115,16116,16117,16120,16121,16123,16124,16125,16127,16130,16131,16132,16133,16134,16137,16140,16142,16143,16145,16146,16148,16150,16151,16153,16154,16155,16156,16157,16159,16160,16161,16201,16210,16211,16212,16216,16218,16222,16223,16226,16228,16229,16236,16238,16244,16246,16256,16311,16314,16316,16327,16328,16335,16354,16360,16388,16401,16403,16404,16406,16407,16410,16411,16412,16413,16415,16417,16421,16422,16423,16424,16426,16427,16428,16430,16432,16433,16434,16435,16438,16440,16441,16442,16443,43952,43953,15001,15003,16675,16699&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						distributionModel: 'DIRECT',
						city: ['Pittsburgh'],
					},
				},
				{
					id: 166,
					url: 'idaho-loans',
					queryParams: 'status=fundRaising&country=US&zip=83520,83533,83537,83542,83544,83552,83555,83638,83643,83654,83672,83803,83805,83806,83808,83813,83821,83824,83827,83832,83833,83836,83837,83847,83852,83855,83858,83864,83866,83869,83870,83871,83874,83876,83501,83547,83549,83554,83645,83811,83830,83839,83851,83522,83524,83525,83526,83530,83535,83536,83539,83540,83541,83545,83546,83548,83553,83610,83611,83615,83632,83661,83671,83801,83802,83804,83809,83810,83812,83814,83815,83822,83823,83825,83826,83834,83835,83840,83841,83842,83843,83844,83845,83846,83848,83849,83850,83854,83856,83857,83860,83861,83867,83868,83872,83873,83337,83605,83607,83616,83617,83619,83622,83627,83669,83670,83706,83714,83716,83601,83623,83624,83629,83633,83634,83636,83641,83642,83646,83647,83648,83650,83655,83657,83660,83687,83702,83703,83705,83709,83712,83713,83278,83286,83333,83334,83342,83347,83350,83352,83355,84028,83341,83211,83212,83220,83223,83228,83232,83233,83237,83238,83239,83241,83243,83252,83254,83261,83263,83271,83272,83276,83281,83283,83287,83301,83354,83302,83311,83312,83313,83314,83316,83318,83320,83321,83322,83323,83324,83325,83327,83328,83330,83332,83335,83336,83338,83340,83344,83346,83348,83353,83111,83285,83402,83450,83451,83454,83455,83460,83464,83469,83120,83201,83202,83203,83204,83209,83210,83213,83214,83215,83217,83218,83221,83226,83227,83234,83235,83236,83244,83245,83246,83250,83251,83253,83255,83262,83274,83277,83401,83404,83406,83420,83421,83422,83423,83424,83425,83427,83428,83429,83431,83433,83434,83435,83436,83440,83442,83443,83444,83445,83446,83448,83449,83452,83462,83463,83465,83466,83467,83468&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						distributionModel: 'DIRECT',
						state: ['ID'],
					},
				},
				{
					id: 170,
					url: 'christians-new-years-challenge',
					queryParams: 'status=fundRaising&loanTags=78&distributionModel=both',
					flssLoanSearch: {
						tagId: [78],
					},
				},
				{
					id: 60,
					url: 'loans-that-are-almost-funded',
					queryParams: 'status=fundRaising&distributionModel=both',
					flssLoanSearch: {
						sortBy: 'amountLeft',
					},
				},
				{
					id: 93,
					url: 'shelter-loans-for-women',
					queryParams: 'status=fundRaising&gender=female&sector=10&distributionModel=both',
					flssLoanSearch: {
						gender: 'female',
						sectorId: [10],
					},
				},
				{
					id: 102,
					url: 'technology',
					queryParams: 'status=fundRaising&loanTags=38&distributionModel=both',
					flssLoanSearch: {
						tagId: [38],
					},
				},
				{
					id: 103,
					url: 'kiva-spotlight',
					queryParams: 'status=fundRaising&distributionModel=field_partner',
					flssLoanSearch: {
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 104,
					url: 'technology-loans-for-women',
					queryParams: 'status=fundRaising&gender=female&loanTags=38&distributionModel=both',
					flssLoanSearch: {
						gender: 'female',
						tagId: [38],
					},
				},
				{
					id: 105,
					url: 'health-loans-for-women',
					queryParams: 'status=fundRaising&gender=female&sector=6&distributionModel=both',
					flssLoanSearch: {
						gender: 'female',
						sectorId: [6],
					},
				},
				{
					id: 106,
					url: 'c-o-v-i-d-19',
					queryParams: 'status=fundRaising&gender=female&sector=1,9,5,14,17,12,6,8,7,4,3,13&distributionModel=both',
					flssLoanSearch: {
						gender: 'female',
						sectorId: [1, 9, 5, 14, 17, 12, 6, 8, 7, 4, 3, 13],
					},
				},
				{
					id: 107,
					url: 'refugee-and-i-d-p-women',
					queryParams: 'status=fundRaising&gender=female&theme=Refugees/Displaced&distributionModel=both',
					flssLoanSearch: {
						gender: 'female',
						themeId: [28],
					},
				},
				{
					id: 109,
					url: 'women-in-africa',
					queryParams: 'status=fundRaising&gender=female&country=MZ,UG,SN,RW,KE,CD,LR,SL,BF,GH,NG,TG,MW,ZM,EG,NA&isGroup=&distributionModel=field_partner',
					flssLoanSearch: {
						gender: 'female',
						countryIsoCode: ['MZ', 'UG', 'SN', 'RW', 'KE', 'CD', 'LR', 'SL', 'BF', 'GH', 'NG', 'TG', 'MW', 'ZM', 'EG', 'NA'],
						distributionModel: 'FIELDPARTNER',
						isIndividual: true,
					},
				},
				{
					id: 110,
					url: 'women-in-asia',
					queryParams: 'status=fundRaising&gender=female&country=KH,NP,TJ,TH,VN,PH,IN,ID,PK&isGroup=&distributionModel=both',
					flssLoanSearch: {
						gender: 'female',
						countryIsoCode: ['KH', 'NP', 'TJ', 'TH', 'VN', 'PH', 'IN', 'ID', 'PK'],
						isIndividual: true,
					},
				},
				{
					id: 111,
					url: 'women-in-latin-america',
					queryParams: 'status=fundRaising&gender=female&country=DO,BO,GT,PY,HN,PE,CR,PA,EC,CO,NI,MX,BR,CL&isGroup=&distributionModel=field_partner',
					flssLoanSearch: {
						gender: 'female',
						countryIsoCode: ['DO', 'BO', 'GT', 'PY', 'HN', 'PE', 'CR', 'PA', 'EC', 'CO', 'NI', 'MX', 'BR', 'CL'],
						distributionModel: 'FIELDPARTNER',
						isIndividual: true,
					},
				},
				{
					id: 112,
					url: 'women-in-the-middle-east',
					queryParams: 'status=fundRaising&gender=female&country=JO,PS,IL,TR&isGroup=&distributionModel=field_partner',
					flssLoanSearch: {
						gender: 'female',
						countryIsoCode: ['JO', 'PS', 'IL', 'TR'],
						distributionModel: 'FIELDPARTNER',
						isIndividual: true,
					},
				},
				{
					id: 113,
					url: 'women-in-oceania',
					queryParams: 'status=fundRaising&gender=female&country=WS,TL,TO,FJ,VU&isGroup=&distributionModel=field_partner',
					flssLoanSearch: {
						gender: 'female',
						countryIsoCode: ['WS', 'TL', 'TO', 'FJ', 'VU'],
						distributionModel: 'FIELDPARTNER',
						isIndividual: true,
					},
				},
				{
					id: 114,
					url: 'loans-to-women-ending-soon',
					queryParams: 'status=fundRaising&gender=female&expiringSoon=1&distributionModel=both',
					flssLoanSearch: {
						gender: 'female',
						sortBy: 'expiringSoon',
					},
				},
				{
					id: 115,
					url: 'women-in-the-u-s',
					queryParams: 'status=fundRaising&gender=female&country=US,PR&isGroup=&distributionModel=direct',
					flssLoanSearch: {
						gender: 'female',
						countryIsoCode: ['US', 'PR'],
						distributionModel: 'DIRECT',
						isIndividual: true,
					},
				},
				{
					id: 120,
					url: 'loans-to-women-almost-funded',
					queryParams: 'status=fundRaising&gender=female&distributionModel=both',
					flssLoanSearch: {
						gender: 'female',
						sortBy: 'amountLeft',
					},
				},
				{
					id: 121,
					url: 'black-owned-business',
					queryParams: 'status=fundRaising&loanTags=43&distributionModel=direct',
					flssLoanSearch: {
						tagId: [43],
						distributionModel: 'DIRECT',
					},
				},
				{
					id: 122,
					url: 'latin-x-hispanic-owned-business',
					queryParams: 'status=fundRaising&loanTags=45&distributionModel=direct',
					flssLoanSearch: {
						tagId: [45],
						distributionModel: 'DIRECT',
					},
				},
				{
					id: 123,
					url: 'u-s-immigrants',
					queryParams: 'status=fundRaising&loanTags=40&distributionModel=direct',
					flssLoanSearch: {
						tagId: [40],
						distributionModel: 'DIRECT',
					},
				},
				{
					id: 124,
					url: 'other-u-s-loans',
					queryParams: 'status=fundRaising&country=US&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['US'],
						distributionModel: 'DIRECT',
					},
				},
				{
					id: 125,
					url: 'agriculture-loans-ending-soon',
					queryParams: 'status=fundRaising&expiringSoon=1&sector=1&distributionModel=both',
					flssLoanSearch: {
						sortBy: 'expiringSoon',
						sectorId: [1],
					},
				},
				{
					id: 126,
					url: 'agriculture-loans-almost-funded',
					queryParams: 'status=fundRaising&sector=1&distributionModel=both',
					flssLoanSearch: {
						sectorId: [1],
						sortBy: 'amountLeft',
					},
				},
				{
					id: 127,
					url: 'agriculture-loans-in-africa',
					queryParams: 'status=fundRaising&country=MZ,UG,TZ,SN,RW,KE,CD,LR,SL,BF,CM,GH,NG,MG,MW,ZM,ML,EG,LS,ZA,BI,SS,ZW,NA&sector=1&distributionModel=field_partner',
					flssLoanSearch: {
						sectorId: [1],
						countryIsoCode: ['MZ', 'UG', 'TZ', 'SN', 'RW', 'KE', 'CD', 'LR', 'SL', 'BF', 'CM', 'GH', 'NG', 'MG', 'MW', 'ZM', 'ML', 'EG', 'LS', 'ZA', 'BI', 'SS', 'ZW', 'NA'],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 128,
					url: 'agriculture-loans-in-asia',
					queryParams: 'status=fundRaising&country=KH,NP,TJ,TH,VN,PH,KG,TR,IN,ID,PK,MM,LA,BT,BD&sector=1&distributionModel=field_partner',
					flssLoanSearch: {
						sectorId: [1],
						countryIsoCode: ['KH', 'NP', 'TJ', 'TH', 'VN', 'PH', 'KG', 'TR', 'IN', 'ID', 'PK', 'MM', 'LA', 'BT', 'BD'],
						distributionModel: 'FIELDPARTNER',
					},
				},
				{
					id: 129,
					url: 'agriculture-loans-in-latin-america',
					queryParams: 'status=fundRaising&country=DO,BO,GT,PY,HN,PE,CR,PA,EC,CO,SV,NI,MX,BR,CL,HT,BZ,PR,VI&sector=1&distributionModel=both',
					flssLoanSearch: {
						sectorId: [1],
						countryIsoCode: ['DO', 'BO', 'GT', 'PY', 'HN', 'PE', 'CR', 'PA', 'EC', 'CO', 'SV', 'NI', 'MX', 'BR', 'CL', 'HT', 'BZ', 'PR', 'VI'],
					},
				},
				{
					id: 147,
					url: 'latin-america-short-term-loans',
					queryParams: 'status=fundRaising&lenderTerm=0,16&country=DO,BO,GT,PY,HN,PE,CR,PA,EC,CO,SV,NI,MX,BR,CL,HT,BZ,PR,VI&distributionModel=both',
					flssLoanSearch: {
						countryIsoCode: ['DO', 'BO', 'GT', 'PY', 'HN', 'PE', 'CR', 'PA', 'EC', 'CO', 'SV', 'NI', 'MX', 'BR', 'CL', 'HT', 'BZ', 'PR', 'VI'],
						lenderRepaymentTerm: createMinMaxRange(0, 16),
					},
				},
				{
					id: 167,
					url: 'puerto-rico-loans',
					queryParams: 'status=fundRaising&country=PR&distributionModel=direct',
					flssLoanSearch: {
						countryIsoCode: ['PR'],
						distributionModel: 'DIRECT',
					},
				},
				{
					id: 174,
					url: 'loans-almost-funded',
					queryParams: 'status=fundRaising&distributionModel=both&sortBy=amountLeft&amountLeft=100,1000000',
					flssLoanSearch: {
						sortBy: 'amountLeft',
						amountLeft: createMinMaxRange(100, 1000000),
					},
				},
			],
		};
	},
};
