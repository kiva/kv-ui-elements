const parseError = (error: any) => {
	if (error instanceof Error) {
		console.error('Error creating StreamService instance:', error.message);
	} else {
		console.error('Error creating StreamService instance:', error);
	}
	throw new Error('Failed to create StreamService instance');
};

export default parseError;
