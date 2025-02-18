import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: { name: 'Цене', SortingProperties: 'price' },
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setSortingType: (state, action) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action) => {
			state.categoryId = Number(action.payload.categoryId);
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
		},
	},
});

export const { setCategoryId, setSortingType, setCurrentPage, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
