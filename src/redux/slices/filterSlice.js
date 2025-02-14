import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: { name: 'Цене', SortingProperties: 'price' },
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	// action
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
	},
});

export const { setCategoryId, setSortingType, setCurrentPage } =
	filterSlice.actions;

export default filterSlice.reducer;
