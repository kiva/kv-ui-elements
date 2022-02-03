/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	testMatch: ['**/unit/specs/**/*.spec.js'],

	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: false,

	// The directory where Jest should output its coverage files
	// coverageDirectory: 'coverage',

	// Indicates which provider should be used to instrument code for coverage
	// coverageProvider: 'v8',

	// An array of file extensions your modules use
	moduleFileExtensions: [
		'js',
		'json',
		'vue',
	],

	// The test environment that will be used for testing
	testEnvironment: 'jsdom',

	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.js$': 'babel-jest',
	},
};
