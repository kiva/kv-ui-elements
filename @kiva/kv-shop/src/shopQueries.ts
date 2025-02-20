import type {
	ApolloClient,
	ApolloError,
	DocumentNode,
	MutationOptions,
	QueryOptions,
	WatchQueryOptions,
} from '@apollo/client';
import { getBasketID, hasBasketExpired, createBasket } from './basket';
import { parseShopError } from './shopError';

const watchQueries = new Set<DocumentNode>();

/**
 * Call a shop mutation with a basketId, creating a new basket if necessary.
 */
export async function callShopMutation<TData>(
	apollo: ApolloClient<any>,
	options: MutationOptions<TData, any>,
	maxretries = 2,
) {
	try {
		const result = await apollo.mutate({
			...options,
			variables: {
				...options.variables,
				basketId: getBasketID(),
			},
			refetchQueries: options.awaitRefetchQueries ? Array.from(watchQueries) : [],
		});
		if (result?.errors?.length) {
			// Retry recoverable basket expired errors
			const basketErrors = result?.errors.filter((err) => hasBasketExpired(err));
			if (basketErrors.length) {
				// Create a new basket and retry if retries remain
				if (maxretries > 0) {
					await createBasket(apollo);
					return callShopMutation(apollo, options, maxretries - 1);
				}
				// Fail on basket expired errors if no retries remain
				throw basketErrors[0];
			}

			// Fail on non-recoverable errors
			if (result?.errors?.length) {
				throw result.errors[0];
			}
		}
		// Return successful result data
		return result?.data;
	} catch (e) {
		// Parse and throw on non-recoverable errors
		throw parseShopError(e);
	}
}

/**
 * Call a shop query with a basketId, creating a new basket if necessary.
 */
export async function callShopQuery<TData>(
	apollo: ApolloClient<any>,
	options: QueryOptions<any, TData>,
	maxretries = 2,
) {
	try {
		const result = await apollo.query({
			...options,
			variables: {
				...options.variables,
				basketId: getBasketID(),
			},
		});
		if (result?.errors?.length) {
			// Retry recoverable basket expired errors
			const basketErrors = result?.errors.filter((err) => hasBasketExpired(err));
			if (basketErrors.length) {
				// Create a new basket and retry if retries remain
				if (maxretries > 0) {
					await createBasket(apollo);
					return callShopQuery(apollo, options, maxretries - 1);
				}
				// Fail on basket expired errors if no retries remain
				throw basketErrors[0];
			}

			// Fail on non-recoverable errors
			if (result?.errors?.length) {
				throw result.errors[0];
			}
		}
		// Return successful result data
		return result?.data;
	} catch (e) {
		// Parse and throw on non-recoverable errors
		throw parseShopError(e);
	}
}

/**
 * Watch a shop query with a basketId, creating a new basket if necessary.
 */
export function watchShopQuery<TData>(
	apollo: ApolloClient<any>,
	options: WatchQueryOptions<any, TData>,
	maxretries = 2,
) {
	let retries = 0;
	watchQueries.add(options.query);
	const observable = apollo.watchQuery({
		...options,
		variables: {
			...options.variables,
			basketId: getBasketID(),
		},
	});

	const oldSubscribe = observable.subscribe.bind(observable);
	observable.subscribe = (...args) => {
		let nextFn;
		let errorFn;
		let completeFn;
		if (typeof args[0] === 'function') {
			[nextFn, errorFn, completeFn] = args;
		} else {
			nextFn = args[0]?.next;
			errorFn = args[0]?.error;
			completeFn = args[0]?.complete;
		}

		const newErrorFn = (err: ApolloError) => {
			// Retry recoverable basket expired errors
			const basketErrors = err?.graphQLErrors?.filter((e) => hasBasketExpired(e));
			if (basketErrors.length) {
				// Create a new basket and retry if retries remain
				if (retries < maxretries) {
					createBasket(apollo).then(() => {
						retries += 1;
						observable.refetch({
							...observable.variables,
							basketId: getBasketID(),
						});
					});
				} else {
					// Fail on basket expired errors if no retries remain
					errorFn(parseShopError(basketErrors[0]));
				}
			} else {
				// Fail on non-recoverable errors
				if (err?.graphQLErrors?.length) {
					errorFn(parseShopError(err.graphQLErrors[0]));
				}
				if (err?.networkError) {
					errorFn(parseShopError(err.networkError));
				}
			}
		};

		return oldSubscribe(nextFn, newErrorFn, completeFn);
	};

	return observable;
}
