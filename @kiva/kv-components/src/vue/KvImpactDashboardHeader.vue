<!-- eslint-disable max-len -->
<template>
	<nav class="tw-bg-primary">
		<div
			class="header__full tw-h-9 tw-grid xl:tw-gap-x-4 tw-items-center tw-mx-auto tw-px-2.5 md:tw-px-4 lg:tw-px-8"
			style="max-width: 1200px;"
		>
			<div class="header__full__logo tw-w-6 tw-text-brand">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 57 23"
				>
					<path
						d="M4.695.391H0v22.141h4.695V.391zm12.899 22.141h4.695V7.011h-4.695v15.521zm12.159 0h5.413l5.413-15.521h-4.662s-2.544 8.445-3.293 11.119h-.066c-.75-2.674-3.326-11.119-3.326-11.119h-4.956l5.477 15.521zm-23.537-8.31c7.37 0 9.092-6.158 9.092-7.21h-.637c-7.372 0-9.094 6.157-9.094 7.21h.639zm-.639.969c0 1.117 1.276 7.403 9.222 7.403h.638c0-1.119-1.277-7.403-9.221-7.403h-.639zM22.746 2.739C22.746 1.272 21.671 0 19.941 0c-1.727 0-2.804 1.272-2.804 2.739 0 1.468 1.077 2.739 2.804 2.739 1.73 0 2.805-1.271 2.805-2.739M57 7.011h-4.532V9.13c-.783-1.631-2.608-2.543-4.729-2.543-3.848 0-6.88 3.129-6.88 8.184 0 5.087 2.935 8.185 6.652 8.185 2.608 0 4.173-1.272 4.956-2.675v2.25H57V7.011zm-4.663 8.151c0 2.871-1.76 4.208-3.522 4.208-1.924 0-3.163-1.956-3.163-4.598 0-2.608 1.305-4.598 3.326-4.598 1.663 0 3.359 1.37 3.359 4.206v.782z"
						fill="currentColor"
					/>
				</svg>
			</div>

			<div class="header__full__right">
				<slot></slot>
			</div>
		</div>
	</nav>
</template>

<style lang="postcss" scoped>
.header__full {
  grid-template-areas: 'logo right';
  grid-template-columns: 1fr auto;
}

.header__full__logo {
  grid-area: logo;
}

.header__full__right {
  grid-area: right;
}
</style>
