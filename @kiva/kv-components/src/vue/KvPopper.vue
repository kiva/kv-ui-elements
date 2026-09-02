<template>
	<transition :name="transitionType">
		<div
			v-show="show"
			class="tw-absolute"
			:style="styles"
			:aria-hidden="show ? 'false' : 'true'"
		>
			<slot></slot>
		</div>
	</transition>
</template>

<script lang="ts">
import {
	onBodyTouchstart,
	offBodyTouchstart,
	isTargetElement,
} from '../utils/touchEvents';

export default {
	name: 'KvPopper',
	props: {
		controller: {
			validator(value) {
				if (typeof value === 'string') return true;
				if (typeof window === 'object'
					&& 'HTMLElement' in window
					&& value instanceof HTMLElement) return true;
				return false;
			},
			required: true,
		},
		openDelay: { type: Number, default: 0 },
		closeDelay: { type: Number, default: 200 },
		// must be defined in our globa/transitions.scss
		transitionType: { type: String, default: '' },
		popperPlacement: { type: String, default: 'bottom-start' },
		popperModifiers: { type: Object, default: () => {} },
		/**
		 * Stay open once shown, rather than closing when the pointer or focus leaves the
		 * controller. Escape and an outside click still close it. Use for poppers holding
		 * something interactive, which the user has to be able to reach and act on.
		 */
		persistent: { type: Boolean, default: false },
	},
	data() {
		return {
			popper: null,
			popperPromise: null,
			styles: {},
			show: false,
			timeout: null,
			suppressOpen: false,
		};
	},
	computed: {
		reference() {
			return typeof this.controller === 'string' ? document.getElementById(this.controller) : this.controller;
		},
		// reference resolves by id on every read, so it is null once the controller leaves
		// the DOM while this popper is still mounted.
		hitTargets() {
			return [this.reference, this.$el].filter(Boolean);
		},
	},
	watch: {
		show(showing) {
			if (this.reference) {
				this.reference.setAttribute('aria-expanded', showing ? 'true' : 'false');
			}
			this.$emit(showing ? 'show' : 'hide');
		},
	},
	mounted() {
		this.reference.tabIndex = 0;
		this.attachEvents();
	},
	updated() {
		if (this.popper) {
			this.popper.scheduleUpdate();
		}
	},
	beforeUnmount() {
		this.removeEvents();
		if (this.popper) {
			this.popper.destroy();
		}
	},
	methods: {
		open() {
			if (this.suppressOpen) return;
			this.initPopper().then(() => {
				this.setTimeout(() => {
					this.show = true;
					this.popper.scheduleUpdate();
					this.attachBodyEvents();
				}, this.openDelay);
			});
		},
		close() {
			this.setTimeout(() => {
				this.show = false;
				this.removeBodyEvents();
			}, this.closeDelay);
		},
		// Persistent content has to stay reachable, so leaving the controller must not close
		// it — by pointer or by tabbing in. Checked here so the prop can change after mount.
		closeOnLeave() {
			if (!this.persistent) this.close();
		},
		// Close now, skipping closeDelay, for dismissals the user asked for directly.
		hide() {
			window.clearTimeout(this.timeout);
			this.show = false;
			this.removeBodyEvents();
		},
		outsideHandler(e) {
			if (!isTargetElement(e, this.hitTargets)) {
				this.hide();
			}
		},
		// Ends the current viewing. Returns focus only if it was inside, so it is not
		// stranded on content that just went away.
		dismiss() {
			const shouldReturnFocus = this.$el.contains(document.activeElement);
			this.hide();
			if (shouldReturnFocus && this.reference) {
				// Returning focus fires the controller's focus handler, which would
				// reopen the popper the user just dismissed.
				this.suppressOpen = true;
				this.reference.focus();
				this.suppressOpen = false;
			}
		},
		keyupHandler(e) {
			if (e.key !== 'Escape') return;
			// Enclosing overlays close on a bubble-phase Escape. Claiming it here stops one
			// keypress from closing this popper and the lightbox around it.
			e.stopPropagation();
			this.dismiss();
		},
		toggle() {
			if (this.show) {
				this.close();
			} else {
				this.open();
			}
		},
		update() {
			if (this.popper) {
				this.popper.scheduleUpdate();
			}
		},
		initPopper() {
			// skip loading if popper already created
			if (this.popper) return Promise.resolve();
			// skip loading if loading already started
			if (this.popperPromise) return this.popperPromise;
			// import and init Popper.js
			this.popperPromise = import('popper.js').then(({ default: Popper }) => {
				this.popper = new Popper(this.reference, this.$el, {
					placement: this.popperPlacement,
					modifiers: {
						applyStyle: (data) => {
							this.styles = data.styles;
							this.setAttributes(data.attributes);
						},
						preventOverflow: {
							padding: 0,
						},
						...this.popperModifiers,
					},
				});
			});
			return this.popperPromise;
		},
		bodyTouchHandler(e) {
			if (!isTargetElement(e, this.hitTargets)) {
				this.show = false;
				this.removeBodyEvents();
			}
		},
		referenceTapHandler(e) {
			e.preventDefault();
			this.toggle();
		},
		attachEvents() {
			this.reference.addEventListener('mouseover', this.open);
			this.reference.addEventListener('focus', this.open);
			this.reference.addEventListener('touchstart', this.referenceTapHandler);
			this.reference.addEventListener('mouseout', this.closeOnLeave);
			this.reference.addEventListener('blur', this.closeOnLeave);
			this.$el.addEventListener('mouseover', this.open);
			this.$el.addEventListener('mouseout', this.closeOnLeave);
		},
		attachBodyEvents() {
			onBodyTouchstart(this.bodyTouchHandler);
			// click, not pointerdown: a control outside the popper must get to run its own
			// handler first, or dismissing here corrupts the state it is about to toggle.
			document.addEventListener('click', this.outsideHandler);
			document.addEventListener('keyup', this.keyupHandler, true);
		},
		removeEvents() {
			this.removeBodyEvents();
			this.reference.removeEventListener('touchstart', this.referenceTapHandler);
			this.reference.removeEventListener('mouseover', this.open);
			this.reference.removeEventListener('focus', this.open);
			this.reference.removeEventListener('mouseout', this.closeOnLeave);
			this.reference.removeEventListener('blur', this.closeOnLeave);
			this.$el.removeEventListener('mouseover', this.open);
			this.$el.removeEventListener('mouseout', this.closeOnLeave);
		},
		removeBodyEvents() {
			offBodyTouchstart(this.bodyTouchHandler);
			document.removeEventListener('click', this.outsideHandler);
			document.removeEventListener('keyup', this.keyupHandler, true);
		},
		setAttributes(attrs) {
			Object.keys(attrs).forEach((attr) => {
				const value = attrs[attr];
				if (value === false) {
					this.$el.removeAttribute(attr);
				} else {
					this.$el.setAttribute(attr, value);
				}
			});
		},
		setTimeout(fn, delay) {
			window.clearTimeout(this.timeout);
			this.timeout = window.setTimeout(fn, delay);
		},
	},
};
</script>
