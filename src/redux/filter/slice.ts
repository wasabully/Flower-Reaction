import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, SortType } from './type';

const initialState: FilterState = {
	categoryId: 0,
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
		setFilters: (state, action: PayloadAction<FilterState>) => {
			state.categoryId = Number(action.payload.categoryId);
			state.sort = action.payload.sort;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
	},
});

export const { setCategoryId, setSortingType, setFilters, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
