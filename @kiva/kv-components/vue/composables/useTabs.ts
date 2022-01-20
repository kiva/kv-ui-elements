import {
	ref,
	reactive,
	computed,
	getCurrentInstance,
} from 'vue-demi';

const tabContext = reactive(
	{
		selectedIndex: 0,
		navItems: <any>[], // populated by KvTab
	}
);

export function useTabs() {

	const setIndex = (index: number) => {
		tabContext.selectedIndex = index;
	};

	const setItems = (items: any) => {
		tabContext.navItems.push(items);
	};

	const resetContext = () => {
		tabContext.navItems.length = 0;
		tabContext.selectedIndex = 0;
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
		resetContext,
	};

}
