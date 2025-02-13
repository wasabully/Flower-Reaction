import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: { name: 'Цене', SortingProperties: 'price' },
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	// action
	reducers: {
		setCategoryId: (state, action) => {
			console.log('setCategoryId action', action);
			state.categoryId = action.payload;
		},
		setSortingType: (state, action) => {
			console.log('setSortingType action', action);
			state.sort = action.payload;
		},
	},
});

export const { setCategoryId, setSortingType } = filterSlice.actions;

export default filterSlice.reducer;
