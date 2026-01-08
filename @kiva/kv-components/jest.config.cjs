/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	testMatch: ['**/unit/specs/**/*.spec.js', '**/unit/specs/**/*.spec.ts'],

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
		'ts',
		'json',
		'mjs',
		'vue',
	],

	moduleNameMapper: {
		'^#components/(.*)$': '<rootDir>/src/vue/$1',
		'^#utils/(.*)$': '<rootDir>/src/utils/$1',
	},

	// The test environment that will be used for testing
	testEnvironment: 'jsdom',

	// Add global setup for Vue
	testEnvironmentOptions: {
		customExportConditions: ['node', 'node-addons'],
	},

	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.vue$': ['@vue/vue3-jest', {
			globals: {
				'ts-jest': {
					useESM: true,
				},
			},
		}],
		'^.+\\.ts$': ['ts-jest', {
			useESM: true,
			tsconfig: {
				allowJs: true,
			},
		}],
		'^.+\\.js$': 'babel-jest',
		'^.+\\.mjs$': 'babel-jest',
	},

	transformIgnorePatterns: [
		'node_modules/(?!@vueuse)/',
	],

	// ESM configuration
	extensionsToTreatAsEsm: ['.ts'],

	// Files to be executed after the test environment is setup but before tests are run
	setupFilesAfterEnv: [
		'./tests/unit/jest-setup.js',
	],
};
