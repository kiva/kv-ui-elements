export const ERL_COOKIE_NAME = 'kverlfivedollarnotes';
export const TOP_UP_CAMPAIGN = 'TOPUP-VB-BALANCE-MPV1';
export const BASE_CAMPAIGN = 'BASE-VB_BALANCE_MPV1';

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
) {
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
				: (campaignToCheck.includes(BASE_CAMPAIGN) ? BASE_CAMPAIGN : '');

			if (currentCampaign && setCookie) {
				setCookie(ERL_COOKIE_NAME, currentCampaign, { expires });
			}
		}

		if (currentCampaign) {
			// Base campaign gets largest increment of $5 under the user's balance up to $25 or the unreserved amount
			if (currentCampaign === BASE_CAMPAIGN) {
				let val = Math.floor(userBalance / 5) * 5;

				// eslint-disable-next-line no-nested-ternary
				val = val === 0 ? 5 : (val > 25 ? 25 : val);

				return Number(val <= unreservedAmount ? val : unreservedAmount).toFixed();
			}

			// Top up campaign defaults to $5
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
