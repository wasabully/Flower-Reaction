import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartStorage } from '../../utils/cartStorage';
import { calculateTotalPrice } from '../../utils/calculateTotalPrice';
import { CartItemType, CartState } from './types';

const initialState: CartState = cartStorage();

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<CartItemType>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}

			state.totalPrice = calculateTotalPrice(state.items);
		},

		minusProduct: (state, action: PayloadAction<string>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload);

			if (findItem) {
				findItem.count--;
				if (findItem.count === 0) {
					state.items = state.items.filter((obj) => obj.id !== action.payload);
				}
			}

			state.totalPrice = calculateTotalPrice(state.items);
		},

		removeProduct: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((obj) => obj.id !== action.payload);

			state.totalPrice = calculateTotalPrice(state.items);
		},

		clearProduct: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addProduct, minusProduct, removeProduct, clearProduct } =
	cartSlice.actions;

export default cartSlice.reducer;
