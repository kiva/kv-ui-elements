import { SiteError, FeedError } from 'getstream';

const parseError = (e: any) => {
	if (e instanceof Error || e instanceof SiteError || e instanceof FeedError) {
		console.error('An error occurred in StreamService lib:', e.message);
	}
	console.error('An unknown error occurred in StreamService lib:', e);
};

export default parseError;
