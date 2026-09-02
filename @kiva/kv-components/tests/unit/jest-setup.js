/* eslint-disable import/no-extraneous-dependencies, global-require */
if (typeof document !== 'undefined') {
	require('@testing-library/jest-dom');
	const { toHaveNoViolations } = require('jest-axe');
	expect.extend(toHaveNoViolations);
}
