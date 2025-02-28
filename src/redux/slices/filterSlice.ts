import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortType = {
	name: string;
	sortingProperties: 'price' | 'title' | 'rating';
};

interface FilterState {
	categoryId: number;
	currentPage: number;
	sort: SortType;
	searchValue: string;
}

const initialState: FilterState = {
	categoryId: 0,
	currentPage: 1,
	sort: { name: 'Цене', sortingProperties: 'price' },
	searchValue: '',
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setSortingType: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<FilterState>) => {
			state.categoryId = Number(action.payload.categoryId);
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
	},
});

export const filterSelector = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const {
	setCategoryId,
	setSortingType,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
