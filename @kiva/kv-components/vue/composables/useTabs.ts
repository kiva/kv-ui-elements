import {
	ref,
	reactive,
	computed,
} from 'vue-demi';

export function useTabs() {

	const tabContext = reactive(
		{
			selectedIndex: 0,
			navItems: <any>[], // populated by KvTab
		}
	);

	const setIndex = (index: number) => {
		tabContext.selectedIndex = index;
	};

	const setItems = (items: any) => {
		tabContext.navItems.push(items);
	};

	const selectedIndex = computed(() => {
		return tabContext.selectedIndex;
	});

	const navItems = computed(() => {
		return tabContext.navItems;
	});

	return {
		tabContext,
		setIndex,
		setItems,
		selectedIndex,
		navItems,
	};

}
