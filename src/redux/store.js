import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import flowers from './slices/flowersSlice';
export const store = configureStore({
	reducer: {
		filter,
		cart,
		flowers,
	},
});
