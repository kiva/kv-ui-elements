<template>
	<KvCartModal
		v-if="modalVisible"
		:style="{
			'--modal-right': `${modalPosition.right}px`,
			'--modal-top': `${modalPosition.top}px`
		}"
		class="cart-modal !tw-top-0"
		:visible="modalVisible"
		:photo-path="photoPath"
		:basket-count="basketCount"
		:category-name="oneLoanAwayCategory"
		@cart-modal-closed="closeCartModal"
	>
		<template #content>
			<div
				v-if="showModalContent || isFirstLoan"
				class="tw-w-full tw-mx-2.5 tw-border-t tw-border-tertiary tw-py-2"
			>
				<KvCartPill
					class="!tw-w-full tw-justify-center"
					:borrower-name="borrowerName"
					:milestones-number="milestonesNumber"
					:is-close-next-milestone="showOneAway"
					:custom-message="pillMsg"
				>
					<template #icon>
						<div
							:class="{
								// eslint-disable-next-line max-len
								'tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-p-0.5 tw-rounded tw-whitespace-nowrap'
									: showOneAway,
							}"
						>
							<!-- eslint-disable max-len -->
							<svg
								v-if="isFirstLoan"
								class="tw-min-w-3"
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M36.2676 17.5025C34.6519 30.5945 24.9878 35.8229 20.1847 38.0889C20.1496 38.1055 20.1099 38.1043 20.075 38.0873C8.60201 32.516 4.24979 22.9018 3.62911 17.5025C3.34064 14.6558 3.18678 8.5719 3.14406 5.7867C3.14315 5.72754 3.1847 5.67723 3.24194 5.66227C11.6312 3.46948 14.2758 3.52186 20.0937 1.86776C20.1175 1.86099 20.1437 1.86113 20.1673 1.86833C26.6496 3.83905 31.8224 4.23356 36.8613 5.66108C36.9176 5.67702 36.9559 5.72959 36.9546 5.78805C36.8227 11.47 36.4423 15.9605 36.2676 17.5025Z"
									fill="#2AA967"
									stroke="#223829"
									stroke-width="1.8"
								/>
								<path
									d="M20.4351 14.843L21.9756 18.0745L24.854 15.6822L24.7902 19.1942L28.5088 18.0548L26.8519 21.24L30.7676 21.5504L27.8039 23.8581L31.2399 25.5648L27.4819 26.5959L29.8438 29.4037L25.9414 28.9799L26.821 32.4033L23.4488 30.598L22.6939 34.0451L20.4351 31.1704L18.1763 34.0451L17.4214 30.598L14.0492 32.4033L14.9288 28.9799L11.0263 29.4037L13.3883 26.5959L9.63032 25.5648L13.0662 23.8581L10.1025 21.5504L14.0183 21.24L12.3613 18.0548L16.0799 19.1942L16.0162 15.6822L18.8946 18.0745L20.4351 14.843Z"
									fill="#EDF4F1"
								/>
								<g clip-path="url(#clip0_5027_1388)">
									<g clip-path="url(#clip1_5027_1388)">
										<path
											d="M19.2444 20.6905L19.8597 21.0523C21.075 19.9275 20.1316 26.1623 19.8116 27.8909C19.5792 29.5078 14.7217 33.608 13.6854 34.193C12.7214 33.8716 11.8214 32.5859 10.9214 31.943L12.5429 30.7145L14.4237 28.7341C14.7695 28.5282 14.9239 27.9729 14.4345 27.1922L14.2273 26.2352C14.3719 25.417 14.3935 23.7737 14.7459 23.7067C15.0983 23.6397 15.4988 23.962 15.5714 24.1195L15.6854 24.8573L15.9712 23.9288C16.1145 23.2631 16.2966 21.1451 16.508 20.4695C16.7193 19.794 17.0456 19.5155 17.3426 19.7641C17.4599 19.4449 18.217 19.5299 18.7862 19.9414L18.7126 20.4533L19.2444 20.6905Z"
											fill="#D8A15A"
										/>
										<path
											d="M10.1846 31.5C10.1846 31.5 14.2722 29.2857 14.2722 27.8458C13.9934 27.0662 14.0253 27.4322 13.9649 26.5651C13.9045 25.6981 14.5046 24.9692 14.5263 24.1642C14.548 23.3591 15.549 23.1576 15.5722 24.1642"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M17.2757 21.0599C17.3407 20.4353 16.9021 20.1772 16.58 20.1575C16.2253 20.1363 16.1913 20.7398 16.1913 20.7398L15.9326 23.2395C15.9326 23.2395 15.6948 23.9864 15.4656 24.838C15.3559 25.4 15.2535 25.6135 15.2535 25.6135C15.2535 25.6135 15.1848 25.7612 15.1467 26.1471"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M16.4608 24.5279L16.434 24.8684L17.1149 24.922L17.1417 24.5815L16.4608 24.5279ZM16.8957 23.792L17.2328 23.8471L16.8957 23.792ZM17.0506 22.8022L17.3888 22.8504L17.3897 22.8432L17.0506 22.8022ZM17.3052 20.6933L17.6443 20.7342L17.6449 20.7282L17.3052 20.6933ZM17.7496 19.8093L17.7693 19.4684L17.7688 19.4683L17.7496 19.8093ZM18.0616 21.0641C18.0616 21.2527 18.2145 21.4056 18.4032 21.4056C18.5918 21.4056 18.7447 21.2527 18.7447 21.0641H18.0616ZM16.8013 24.5547C17.1417 24.5815 17.1417 24.5815 17.1417 24.5816C17.1417 24.5816 17.1417 24.5816 17.1417 24.5816C17.1417 24.5816 17.1417 24.5816 17.1417 24.5816C17.1417 24.5816 17.1417 24.5816 17.1417 24.5815C17.1417 24.5814 17.1418 24.5813 17.1418 24.581C17.1418 24.5805 17.1419 24.5796 17.142 24.5785C17.1422 24.5761 17.1425 24.5724 17.1429 24.5675C17.1437 24.5577 17.145 24.543 17.1468 24.5239C17.1503 24.4857 17.1557 24.4303 17.1631 24.3624C17.178 24.2264 17.2009 24.042 17.2328 23.8471L16.5587 23.7368C16.5243 23.9471 16.4999 24.1441 16.4841 24.2881C16.4762 24.3603 16.4705 24.4196 16.4666 24.4612C16.4647 24.4819 16.4633 24.4983 16.4623 24.5096C16.4618 24.5153 16.4615 24.5197 16.4612 24.5228C16.4611 24.5243 16.461 24.5255 16.4609 24.5264C16.4609 24.5268 16.4609 24.5272 16.4608 24.5274C16.4608 24.5275 16.4608 24.5277 16.4608 24.5277C16.4608 24.5278 16.4608 24.5278 16.4608 24.5279C16.4608 24.5279 16.4608 24.5279 16.4608 24.5279C16.4608 24.5279 16.4608 24.5279 16.8013 24.5547ZM17.2328 23.8471C17.2864 23.5196 17.3253 23.2709 17.3508 23.1039C17.3636 23.0204 17.373 22.9573 17.3793 22.915C17.3824 22.8938 17.3848 22.8778 17.3863 22.867C17.3871 22.8616 17.3877 22.8575 17.3881 22.8548C17.3883 22.8534 17.3884 22.8523 17.3885 22.8516C17.3886 22.8512 17.3886 22.851 17.3887 22.8508C17.3887 22.8507 17.3887 22.8506 17.3887 22.8505C17.3887 22.8505 17.3887 22.8505 17.3887 22.8504C17.3887 22.8504 17.3887 22.8504 17.3887 22.8504C17.3887 22.8504 17.3887 22.8504 17.0506 22.8022C16.7125 22.7541 16.7125 22.7541 16.7125 22.7541C16.7125 22.7541 16.7125 22.754 16.7125 22.754C16.7125 22.7541 16.7125 22.7541 16.7125 22.7541C16.7125 22.7541 16.7125 22.7541 16.7125 22.7542C16.7125 22.7543 16.7124 22.7545 16.7124 22.7548C16.7123 22.7554 16.7122 22.7563 16.712 22.7576C16.7116 22.7601 16.7111 22.7639 16.7104 22.769C16.7089 22.7792 16.7066 22.7946 16.7036 22.8152C16.6975 22.8564 16.6882 22.9184 16.6757 23.0007C16.6505 23.1654 16.6119 23.4116 16.5587 23.7368L17.2328 23.8471ZM17.3897 22.8432L17.6442 20.7342L16.9661 20.6524L16.7115 22.7613L17.3897 22.8432ZM17.3052 20.6933C17.6449 20.7282 17.6449 20.7283 17.6449 20.7284C17.6449 20.7284 17.6449 20.7284 17.6449 20.7285C17.6449 20.7285 17.6448 20.7286 17.6448 20.7286C17.6448 20.7287 17.6448 20.7287 17.6448 20.7286C17.6449 20.7285 17.6449 20.7283 17.6449 20.7278C17.645 20.7268 17.6452 20.725 17.6455 20.7225C17.6461 20.7174 17.6471 20.7094 17.6485 20.6988C17.6512 20.6776 17.6556 20.6466 17.662 20.6091C17.6748 20.5329 17.6946 20.4356 17.7226 20.3422C17.7522 20.2438 17.7839 20.174 17.8104 20.1367C17.8383 20.0974 17.8128 20.1549 17.7305 20.1503L17.7688 19.4683C17.5107 19.4538 17.3417 19.6169 17.2533 19.7415C17.1635 19.8681 17.1061 20.0206 17.0685 20.1456C17.0294 20.2757 17.004 20.4031 16.9884 20.4957C16.9805 20.5427 16.9749 20.5821 16.9712 20.6102C16.9694 20.6243 16.968 20.6357 16.967 20.6439C16.9666 20.6479 16.9662 20.6512 16.9659 20.6537C16.9658 20.6549 16.9657 20.6559 16.9656 20.6567C16.9656 20.6571 16.9655 20.6574 16.9655 20.6577C16.9655 20.6578 16.9655 20.658 16.9655 20.6581C16.9655 20.6581 16.9654 20.6582 16.9654 20.6582C16.9654 20.6583 16.9654 20.6584 17.3052 20.6933ZM17.7299 20.1503C17.8501 20.1572 17.9059 20.1844 17.9317 20.2029C17.9553 20.2197 17.9801 20.2476 18.0027 20.3099C18.0584 20.4633 18.0616 20.6955 18.0616 21.0641H18.7447C18.7447 20.7461 18.7511 20.3699 18.6448 20.0771C18.5865 19.9163 18.4892 19.7616 18.3284 19.6469C18.1699 19.5337 17.979 19.4805 17.7693 19.4684L17.7299 20.1503Z"
											fill="#22382A"
										/>
										<path
											d="M17.9624 24.475C17.9624 24.475 18.0121 24.2433 18.0905 23.792C18.2035 23.1406 18.2013 22.8927 18.2013 22.8927L18.4274 21.0373C18.4274 21.0373 18.559 20.3958 18.9106 20.3803C19.5083 20.3549 19.6418 20.7713 19.6913 21.2732"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M19.0729 25.0086C19.1796 24.4323 19.2936 23.6414 19.2936 23.6414L19.4856 21.8945C19.4856 21.8945 19.5182 21.4574 19.862 21.3841C20.4474 21.2586 20.627 22.1539 20.6193 22.8405C20.6193 22.8405 20.3918 24.5173 20.3345 25.211C20.2772 25.9047 19.9443 28.2178 18.3708 29.9069C16.5115 31.5829 13.6851 34.1929 13.6851 34.1929"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M22.0093 20.5003H21.6667C21.2984 21.8094 20.6852 25.9186 20.7567 27.6357C20.7567 29.2325 25.1554 32.9683 26.1075 33.6785C27.3928 34.2687 29.0639 32.1003 28.9211 31.3643L26.2503 29.0382C25.9341 28.7909 26.0233 27.8916 26.1075 27.4729L26.9644 24.9827C27.0596 24.7455 26.9935 24.2427 26.6508 24.1289C26.308 24.0151 25.8612 24.2712 25.7659 24.4135L25.3375 24.9827L25.2226 23.7732C25.175 23.1091 25.1107 21.724 24.9965 21.041C24.8822 20.358 24.4842 20.1445 24.1515 20.3437C24.0801 20.0186 23.7802 19.6046 23.1518 19.9236V20.4291L22.7233 20.1445L22.0093 20.5003Z"
											fill="#AF741C"
										/>
										<path
											d="M20.1411 26.6948C20.1411 26.6948 20.1314 28.8758 20.9911 29.7662C21.926 30.7345 25.1575 33.9449 25.5785 34.1285"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M23.8426 27.2245C23.8426 27.2245 22.587 27.3427 22.4766 28.5906"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M28.9848 31.2356C28.9848 31.2356 25.0255 29.2418 25.4509 27.6307C25.8764 26.0195 26.5607 24.5046 26.3715 24.2799C26.1217 23.9825 25.4237 24.2087 25.1012 24.8607C24.7787 25.5127 24.3547 26.3308 24.3547 26.3308"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M23.1941 24.891L23.1597 23.5747C23.1597 23.5747 23.2154 22.3143 23.3156 21.8207C23.3156 20.8601 24.2833 20.4704 24.4148 21.337C24.5165 22.0088 24.4915 23.657 24.4915 23.657C24.4915 23.657 24.4023 24.6497 24.6965 25.3463"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M23.2942 21.3084C23.2942 20.9716 23.529 20.1131 22.8247 19.985C22.2219 20.1033 22.2902 20.5378 22.1693 21.0799C22.0485 21.622 21.9888 23.2313 21.9888 23.2313L21.9644 24.6633"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="square"
											stroke-linejoin="round"
										/>
										<path
											d="M22.1849 20.6467C21.9501 19.8996 21.1267 19.9819 21.0213 21.1164C20.9709 21.6576 20.7175 22.6608 20.7175 22.6608L20.4827 24.1976"
											stroke="#22382A"
											stroke-width="0.683036"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</g>
								</g>
								<path
									d="M36.2676 17.5025C34.6519 30.5945 24.9878 35.8229 20.1847 38.0889C20.1496 38.1055 20.1099 38.1043 20.075 38.0873C8.60201 32.516 4.24979 22.9018 3.62911 17.5025C3.34064 14.6558 3.18678 8.5719 3.14406 5.7867C3.14315 5.72754 3.1847 5.67723 3.24194 5.66227C11.6312 3.46948 14.2758 3.52186 20.0937 1.86776C20.1175 1.86099 20.1437 1.86113 20.1673 1.86833C26.6496 3.83905 31.8224 4.23356 36.8613 5.66108C36.9176 5.67702 36.9559 5.72959 36.9546 5.78805C36.8227 11.47 36.4423 15.9605 36.2676 17.5025Z"
									stroke="#223829"
									stroke-width="1.8"
								/>
								<path
									d="M6.79042 16.0619L5.19586 10.1835L8.41478 9.04901L8.80357 10.3866L6.69262 11.0002L7.01277 12.1016L8.67078 11.4821L9.12761 13.0537L7.40388 13.4471L7.66595 14.3487L9.7769 13.7351L10.1393 15.0884L6.79042 16.0619Z"
									fill="#223829"
								/>
								<path
									d="M33.1027 9.8062L32.0862 9.4574L31.8117 12.9574L30.8766 15.6826L32.0234 16.076L32.9335 13.4235L34.9377 10.4359L33.9476 10.0961L32.9832 11.4446L33.1027 9.8062Z"
									fill="#223829"
								/>
								<path
									d="M31.5926 9.28625L29.0298 8.66132L28.7615 9.76164L29.5303 9.94911L28.3106 14.9507L29.3876 15.2134L30.6054 10.2193L31.3224 10.3942L31.5926 9.28625Z"
									fill="#223829"
								/>
								<path
									d="M25.0681 14.2538L25.2222 13.5225L25.2812 13.2428L25.7358 13.3386L26.5961 9.25753L26.1529 9.10768L26.3635 8.10815L28.3301 8.52271L28.1081 9.57626L27.6642 9.48268L26.8129 13.5208L27.2568 13.6143L27.0346 14.6684L25.0681 14.2538Z"
									fill="#223829"
								/>
								<path
									d="M21.9959 13.755L22.7004 7.51385L23.9144 7.65089L23.333 12.8016L24.6155 12.9464L24.4924 14.0368L21.9959 13.755Z"
									fill="#223829"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M9.76968 9.75852C9.7795 9.33501 10.0587 8.43293 11.0967 8.21273C11.4896 8.16165 12.3586 8.28064 12.6916 9.16517L13.3833 12.5717C13.4001 12.8411 13.4374 13.534 13.1612 13.778L13.4627 14.1883L12.4407 14.3958L12.2881 14.227C12.0562 14.3448 11.6086 14.4766 11.1991 14.3771C10.7553 14.2694 10.5628 13.7844 10.4467 13.3427C10.2034 12.4173 9.88389 10.9975 9.76968 9.75852ZM12.2101 12.6282C12.223 12.5003 11.9505 11.2616 11.7473 10.4868C11.6538 10.1303 11.3149 9.65354 11.1019 9.95424C11.0714 9.99724 11.0441 10.0534 11.0214 10.1254C10.9979 10.356 11.0453 11.25 11.4448 12.8015C11.4789 12.9341 11.6085 13.0328 11.8558 12.9826C12.1813 12.9165 12.1977 12.7526 12.2099 12.6309L12.2101 12.6282Z"
									fill="#223829"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M18.3181 7.56132L17.7253 13.6391L18.9892 13.6541L19.0664 12.2152L20.0459 12.2268L20.2103 13.6685L21.459 13.6833L20.2822 7.58453L19.5614 7.40908C19.3974 7.36915 19.2265 7.36678 19.0614 7.40212L18.3181 7.56132ZM19.204 11.1352L19.769 11.1456C19.832 11.1467 19.8808 11.0888 19.8687 11.0273L19.4843 9.07589C19.4626 8.96598 19.3018 8.97766 19.2914 9.08991L19.1108 11.0309C19.1057 11.0866 19.1482 11.1342 19.204 11.1352Z"
									fill="#223829"
								/>
								<path
									d="M14.8244 7.66792L13.5503 7.79126L14.1939 12.9684C14.4472 13.8769 15.2533 13.9365 15.7466 13.8887C17.0518 13.7624 17.0907 12.7573 17.084 12.6886L16.8011 7.47657L15.5813 7.59465L15.9684 12.3578C15.9106 12.7416 15.3095 12.6795 15.2848 12.424L14.8244 7.66792Z"
									fill="#223829"
								/>
								<defs>
									<clipPath id="clip0_5027_1388">
										<rect
											width="21.8571"
											height="21.8571"
											fill="white"
											transform="translate(9.1853 13.4287)"
										/>
									</clipPath>
									<clipPath id="clip1_5027_1388">
										<rect
											width="21.8571"
											height="21.8571"
											fill="white"
											transform="translate(9.1853 13.4287)"
										/>
									</clipPath>
								</defs>
							</svg>

							<svg
								v-else
								class="tw-min-w-3"
								width="18"
								height="21"
								viewBox="0 0 18 21"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.0001 19L5.6251 20.125C5.50843 20.1583 5.4001 20.1833 5.3001 20.2C5.2001 20.2167 5.1001 20.225 5.0001 20.225C4.46676 20.225 4.0001 20.0375 3.6001 19.6625C3.2001 19.2875 3.0001 18.8083 3.0001 18.225V12.775L0.400098 8.55C0.300098 8.38333 0.225098 8.2125 0.175098 8.0375C0.125098 7.8625 0.100098 7.68333 0.100098 7.5C0.100098 7.31667 0.125098 7.1375 0.175098 6.9625C0.225098 6.7875 0.300098 6.61667 0.400098 6.45L3.8001 0.95C3.98343 0.65 4.2251 0.416667 4.5251 0.25C4.8251 0.0833333 5.1501 0 5.5001 0H12.5001C12.8501 0 13.1751 0.0833333 13.4751 0.25C13.7751 0.416667 14.0168 0.65 14.2001 0.95L17.6001 6.45C17.7001 6.61667 17.7751 6.7875 17.8251 6.9625C17.8751 7.1375 17.9001 7.31667 17.9001 7.5C17.9001 7.68333 17.8751 7.8625 17.8251 8.0375C17.7751 8.2125 17.7001 8.38333 17.6001 8.55L15.0001 12.775V18.225C15.0001 18.8083 14.8001 19.2875 14.4001 19.6625C14.0001 20.0375 13.5334 20.225 13.0001 20.225C12.9001 20.225 12.8001 20.2167 12.7001 20.2C12.6001 20.1833 12.4918 20.1583 12.3751 20.125L9.0001 19ZM5.5001 13H12.5001L15.9001 7.5L12.5001 2H5.5001L2.1001 7.5L5.5001 13ZM7.9501 8.75L11.4751 5.2C11.6584 5 11.8876 4.90417 12.1626 4.9125C12.4376 4.92083 12.6751 5.01667 12.8751 5.2C13.0751 5.4 13.1793 5.6375 13.1876 5.9125C13.1959 6.1875 13.1001 6.425 12.9001 6.625L8.6501 10.875C8.4501 11.075 8.21677 11.175 7.9501 11.175C7.68343 11.175 7.4501 11.075 7.2501 10.875L5.1251 8.75C4.9251 8.55 4.8251 8.3125 4.8251 8.0375C4.8251 7.7625 4.9251 7.525 5.1251 7.325C5.3251 7.125 5.5626 7.025 5.8376 7.025C6.1126 7.025 6.3501 7.125 6.5501 7.325L7.9501 8.75Z"
									fill="#757575"
								/>
							</svg>
							<!-- eslint-enable max-len -->
							<div
								v-if="showOneAway"
								class="tw-text-h5"
							>
								{{ oneAwayText }}
							</div>
						</div>
					</template>
				</KvCartPill>
			</div>
		</template>
	</KvCartModal>
</template>

<script>
import {
	ref,
	toRefs,
	computed,
	onMounted,
	onUnmounted,
} from 'vue';
import { throttle } from '../utils/throttle';
import KvCartModal from './KvCartModal.vue';
import KvCartPill from './KvCartPill.vue';

export default {
	components: {
		KvCartModal,
		KvCartPill,
	},
	props: {
		/**
		 * show modal
		 * */
		modalVisible: {
			type: Boolean,
			default: false,
		},
		/**
		 * added loan to basket
		 * */
		addedLoan: {
			type: Object,
			default: () => ({}),
		},
		/**
		 * user data
		 * */
		userData: {
			type: Object,
			default: () => ({}),
		},
		/**
		 * basket limit size
		 * */
		photoPath: {
			type: String,
			default: '',
		},
		/**
		 * milestones number
		 * */
		milestonesNumber: {
			type: Number,
			default: 0,
		},
		/**
		 * show modal content
		 * */
		showModalContent: {
			type: Boolean,
			default: false,
		},
		/**
		 * user has ever logged in
		 * */
		hasEverLoggedIn: {
			type: Boolean,
			default: false,
		},
		/**
		 * is under myKiva experiment
		 * */
		myKivaExperimentEnabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * one loan away category name
		 * */
		oneLoanAwayCategory: {
			type: String,
			default: '',
		},
		/**
		 * one loan away filtered url
		 * */
		oneLoanAwayFilteredUrl: {
			type: String,
			default: '',
		},
		/**
		 * one loan away text
		 * */
		oneAwayText: {
			type: String,
			default: '',
		},
		/**
		 * milestones progress
		 * */
		milestonesProgress: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: [
		'reset-modal', // reset modal values and close on parent component
		'close-redirect', // close and redirect to another page on parent component
	],
	setup(props, { emit }) {
		const {
			addedLoan,
			userData,
			hasEverLoggedIn,
			myKivaExperimentEnabled,
			oneLoanAwayCategory,
			oneLoanAwayFilteredUrl,
			milestonesProgress,
		} = toRefs(props);

		const headerBottomPosition = ref(0);
		const headerLeftPosition = ref(0);

		const basketCount = computed(() => {
			return addedLoan.value?.basketSize ?? 0;
		});

		const modalPosition = computed(() => {
			const right = `${window.innerWidth - headerLeftPosition.value - 200}`; // 200 to be in the middle of the basket
			const top = `${headerBottomPosition.value}`;
			return { right, top };
		});

		const borrowerName = computed(() => addedLoan.value?.name);

		const isGuest = computed(() => !userData.value?.my);

		const isFirstLoan = computed(() => {
			return myKivaExperimentEnabled.value
			&& ((isGuest.value && !hasEverLoggedIn.value) || (!isGuest.value && !userData.value?.my?.loans?.totalCount))
			&& basketCount.value === 1;
		});

		const showOneAway = computed(() => oneLoanAwayCategory.value && oneLoanAwayFilteredUrl.value && !isFirstLoan.value); // eslint-disable-line max-len

		const milestonesProgressCount = computed(() => {
			return Object.values(milestonesProgress.value).reduce((acc, value) => {
				return acc + (value > 0 ? value : 0);
			}, 0);
		});

		const pillMsg = computed(() => {
			if (isFirstLoan.value) {
				const initialHeading = `Supporting ${borrowerName.value} helps`;
				if (addedLoan.value?.borrowerCount > 1 || addedLoan.value?.themes.includes('Social Enterprise')) {
					return `${initialHeading} them invest in themselves.`;
				}
				if (addedLoan.value?.gender === 'male') {
					return `${initialHeading} him invest in himself.`;
				}

				return `${initialHeading} her invest in herself.`;
			}
			if (showOneAway.value) {
				return 'You’re close to your next milestone!';
			}

			const milestonesCopy = milestonesProgressCount.value > 1
				? `${milestonesProgressCount.value} of your milestones`
				: 'your next milestone';

			return borrowerName.value
				? `Supporting ${borrowerName.value} will hit ${milestonesCopy}!`
				: 'Supporting this loan achieves a milestone!';
		});

		const handleRedirect = (type) => {
			if (type === 'view-basket') {
				emit('close-redirect', { type, path: '/basket' });
			} else if (type === 'support-another' && oneLoanAwayFilteredUrl.value) {
				emit('close-redirect', { type, path: oneLoanAwayFilteredUrl.value });
			}
		};

		const closeCartModal = (closedBy) => {
			const { type } = closedBy;
			if (type) {
				handleRedirect(type);
			}
			emit('reset-modal');
		};

		const updateHeaderPosition = () => {
			const header = document.getElementsByTagName('header')[0];
			const headerPosition = header?.getBoundingClientRect() ?? null;

			let targets = [...document.querySelectorAll('[data-testid="header-basket"]')];
			let target = targets.find((t) => t?.clientHeight);

			if (!target) {
				// No basket found, using About as the closest position
				targets = [...document.querySelectorAll('[data-testid="header-about"]')];
				target = targets.find((t) => t?.clientHeight);
			}

			const basketPosition = target?.getBoundingClientRect() ?? null;
			if (basketPosition && basketPosition?.right !== headerLeftPosition.value) {
				headerLeftPosition.value = basketPosition?.right;
			}

			if (headerPosition && headerPosition?.bottom !== headerBottomPosition.value) {
				headerBottomPosition.value = headerPosition?.bottom;
			}
		};

		const updateHeaderPositionThrottled = throttle(updateHeaderPosition, 100);

		onMounted(() => {
			updateHeaderPosition();
			window.addEventListener('scroll', updateHeaderPositionThrottled);
			window.addEventListener('resize', updateHeaderPositionThrottled);
		});

		onUnmounted(() => {
			window.removeEventListener('scroll', updateHeaderPositionThrottled);
			window.removeEventListener('resize', updateHeaderPositionThrottled);
		});

		return {
			modalPosition,
			basketCount,
			isFirstLoan,
			borrowerName,
			showOneAway,
			pillMsg,
			closeCartModal,
		};
	},
};
</script>

<style lang="postcss" scoped>
@screen md {
	.cart-modal:deep(div.container) {
		right: var(--modal-right) !important;
		top: var(--modal-top) !important;
	}
}
</style>
