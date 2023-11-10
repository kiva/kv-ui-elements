// eslint-disable-next-line no-shadow
export enum VerificationState {
	VERIFIED = 'verified',
	PENDING = 'pending',
	REQUIRED = 'required',
	MAY_BE_NEEDED = 'may_be_needed',
	NOT_NEEDED = 'not_needed',
}

export function isBasketVerified(state: VerificationState): boolean {
	return state === VerificationState.VERIFIED || state === VerificationState.NOT_NEEDED;
}
