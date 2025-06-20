import numeral from 'numeral';

export const ERL_COOKIE_NAME = 'kverlfivedollarnotes';
export const TOP_UP_CAMPAIGN = 'TOPUP-VB-BALANCE-MPV1';
export const BASE_CAMPAIGN = 'BASE-VB_BALANCE_MPV1';
export const BALANCE_CAMPAIGN = 'REPAYMENT-NOTIFICATION_BALANCE_MPV1';
export const NO_BALANCE_CAMPAIGN = 'REPAYMENT-NOTIFICATION_NO-BALANCE_MPV1';

function balanceCampaignOptions(val) {
	if (val > 20) return 25;
	if (val > 15) return 20;
	if (val > 10) return 15;
	if (val > 5) return 10;
	return 5;
}

/**
 * Checks if the unreserved amount is between 25 and 50
 *
 * @param {string} unreservedAmount
 * @returns Whether the unreserved amount is between 25 and 50
 */
export function isBetween25And50(unreservedAmount) {
	return unreservedAmount <= 50 && unreservedAmount > 25;
}

/**
 * Checks if the unreserved amount is less than 25
 *
 * @param {string} unreservedAmount
 * @returns Whether the unreserved amount is less than 25
 */
export function isLessThan25(unreservedAmount) {
	return unreservedAmount < 25 && unreservedAmount > 0;
}

/**
 * Gets the selected option for the Lend CTA component
 *
 * @param {Function} getCookie Method that returns a cookie by name
 * @param {Function} setCookie Method that sets a cookie with the provided name, value, and options
 * @param {boolean} enableFiveDollarsNotes Whether $5 notes experiment is assigned
 * @param {string} campaign The "utm_campaign" query param sourced from the Vue component route
 * @param {string} unreservedAmount The unreserved amount for the loan
 * @param {string} userBalance The balance of the current user
 * @returns {string} The option to be selected in the CTA dropdown
 */
export function getLendCtaSelectedOption(
	getCookie,
	setCookie,
	enableFiveDollarsNotes,
	campaign,
	unreservedAmount,
	userBalance,
	fiveDollarsSelected,
) {
	// defaulted to $5 for fiveDollarsSelected flag even when users come from email with a different balance
	if (enableFiveDollarsNotes && fiveDollarsSelected) {
		return '5';
	}

	// Don't enable the campaign changes when the user balance is undefined (user not logged in)
	if (enableFiveDollarsNotes && typeof userBalance !== 'undefined') {
		let currentCampaign = getCookie?.(ERL_COOKIE_NAME);

		if (campaign && typeof campaign === 'string' && !currentCampaign) {
			// Effects of the campaign lasts for 24 hours
			const expires = new Date();
			expires.setHours(expires.getHours() + 24);

			const campaignToCheck = campaign.toUpperCase();

			// eslint-disable-next-line no-nested-ternary
			currentCampaign = campaignToCheck.includes(TOP_UP_CAMPAIGN)
				? TOP_UP_CAMPAIGN
				: campaignToCheck.includes(BASE_CAMPAIGN) ? BASE_CAMPAIGN // eslint-disable-line no-nested-ternary
					: campaignToCheck.includes(BALANCE_CAMPAIGN) ? BALANCE_CAMPAIGN // eslint-disable-line no-nested-ternary
						: (campaignToCheck.includes(NO_BALANCE_CAMPAIGN) ? NO_BALANCE_CAMPAIGN : '');

			if (currentCampaign && setCookie) {
				setCookie(ERL_COOKIE_NAME, currentCampaign, { expires });
			}
		}

		if (currentCampaign) {
			let val = Math.floor(userBalance / 5) * 5;

			// Base campaign gets largest increment of $5 under the user's balance up to $25 or the unreserved amount
			if (currentCampaign === BASE_CAMPAIGN) {
				// eslint-disable-next-line no-nested-ternary
				val = val === 0 ? 5 : (val > 25 ? 25 : val);

				return Number(val <= unreservedAmount ? val : unreservedAmount).toFixed();
			}

			if (currentCampaign === BALANCE_CAMPAIGN) {
				val = balanceCampaignOptions(val);
				return Number(val).toFixed();
			}

			// Top up and no balance campaigns defaults to $5
			return Number(unreservedAmount > 5 ? 5 : unreservedAmount).toFixed();
		}
	}

	// Handle when $5 notes isn't enabled
	if (isBetween25And50(unreservedAmount) || isLessThan25(unreservedAmount)) {
		return Number(unreservedAmount).toFixed();
	}

	// $25 is the fallback default selected option
	return '25';
}

function buildHugePriceArray(amountLeft) {
	const priceArray = [];

	// Add $100 options up to $1,000
	let minAmount = 100;
	let limitAmount = amountLeft > 1000 ? 1000 : amountLeft;
	let optionCount = limitAmount / minAmount;
	for (let i = 1; i <= optionCount; i += 1) {
		const price = minAmount * i + 500;
		if (price > limitAmount) break;
		priceArray.push(numeral(price).format('0,0'));
	}

	// Add $1000 options up to $10,000
	minAmount = 1000;
	limitAmount = amountLeft > 10000 ? 10000 : amountLeft;
	optionCount = limitAmount / minAmount;
	for (let i = 1; i <= optionCount; i += 1) {
		const price = minAmount * i + 1000;
		if (price > limitAmount) break;
		priceArray.push(numeral(price).format('0,0'));
	}

	// Ensure final option is added
	if (!priceArray.includes(numeral(limitAmount).format('0,0'))) {
		priceArray.push(numeral(limitAmount).format('0,0'));
	}

	return priceArray;
}

function build5DollarsPriceArray(amountLeft) {
	const limit5Notes = amountLeft < 50 ? amountLeft : 50;
	const numberOf5 = limit5Notes / 5;
	const numberOf25 = Math.ceil((amountLeft - limit5Notes) / 25) + 1;
	const priceArray = [];
	for (let i = 1; i <= numberOf5; i += 1) {
		priceArray.push(numeral(5 * i).format('0,0'));
	}
	if (amountLeft > limit5Notes) {
		for (let i = 3; i <= numberOf25; i += 1) {
			priceArray.push(numeral(25 * i).format('0,0'));
		}
	}
	return priceArray;
}

function buildPriceArray(amountLeft, minAmount) {
	// Get count of shares based on available remaining amount
	const optionCount = amountLeft / minAmount;
	// Convert this to formatted array for our select element
	const priceArray = []; // ex. priceArray = ['25', '50', '75']
	for (let i = 1; i <= optionCount; i += 1) {
		priceArray.push(numeral(minAmount * i).format('0,0'));
	}
	return priceArray;
}

/**
 *	Gets the dropdown price values for the lend CTA
 *
 * @param {string} unreservedAmount The unreserved amount of the loan
 * @param {boolean} isCompleteLoanActive Whether to include option that would complete loan
 * @param {number} minAmount The min amount to show in the dropdown
 * @param {boolean} enableFiveDollarsNotes Whether five dollar notes are enabled
 * @param {boolean} isVisitor Whether the current user is a visitor
 * @param {boolean} inPfp Whether the loan is in PFP
 * @returns {string[]} Price value array for the CTA dropdown
 */
export function getDropdownPriceArray(
	unreservedAmount,
	isCompleteLoanActive = false,
	minAmount = 25,
	enableFiveDollarsNotes = false,
	isVisitor = true,
	inPfp = false,
) {
	const parsedAmountLeft = parseFloat(unreservedAmount);
	let priceArray = (enableFiveDollarsNotes && !inPfp)
		? build5DollarsPriceArray(parsedAmountLeft).slice(0, 28)
		: buildPriceArray(parsedAmountLeft, minAmount).slice(0, 20);

	if (parsedAmountLeft > 500 && !isVisitor) {
		const hugePriceArray = buildHugePriceArray(parsedAmountLeft);
		priceArray = priceArray.concat(hugePriceArray);
	}

	if (isCompleteLoanActive && !priceArray.includes(Number(unreservedAmount).toFixed())) {
		priceArray.push(Number(unreservedAmount).toFixed());
	}

	return priceArray;
}
