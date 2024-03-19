const parseError = (e: any) => {
	if (e?.message) {
		console.error('An error occurred in StreamService lib:', e.message);
	}
	console.error('An error occurred in StreamService lib:', e);
};

export default parseError;
