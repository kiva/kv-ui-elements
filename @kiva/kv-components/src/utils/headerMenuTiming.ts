// Hover-intent open delay for the header menus, in milliseconds.
export const MENU_OPEN_DELAY_MS = 100;

// Duration of a header menu's closing fade, in milliseconds.
export const MENU_CLOSE_FADE_MS = 100;

// Inline custom properties carrying both durations for the link bar root.
export const MENU_TIMING_VARS = {
	'--menu-open-delay': `${MENU_OPEN_DELAY_MS}ms`,
	'--menu-close-fade': `${MENU_CLOSE_FADE_MS}ms`,
};
