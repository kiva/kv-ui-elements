/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
// import { config } from '@vue/test-utils';

// Vue Test Utils global configuration
// config.global.config.warnHandler = () => {};

expect.extend(toHaveNoViolations);
