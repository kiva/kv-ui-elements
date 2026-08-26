/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// jsdom (v20) ships no PointerEvent, so fireEvent.pointerEnter() falls back to a plain Event and
// silently drops `pointerType`. Components that distinguish a real mouse from a touch need that
// property to survive, so provide a minimal MouseEvent-backed stand-in.
if (typeof window.PointerEvent === 'undefined') {
	window.PointerEvent = class PointerEvent extends window.MouseEvent {
		constructor(type, params = {}) {
			super(type, params);
			this.pointerType = params.pointerType;
		}
	};
}
