import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { cartStorage } from '../../utils/cartStorage';
import { calculateTotalPrice } from '../../utils/calculateTotalPrice';

export type CartItemType = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	size: string;
	count: number;
};

type CartState = {
	totalPrice: number;
	items: CartItemType[];
};

const { items, totalPrice } = cartStorage();

const initialState: CartState = {
	totalPrice: totalPrice,
	items: items,
};

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

export const getCartSelector = (state: RootState) => state.cart;
export const selectCartById = (id: string) => (state: RootState) =>
	state.cart.items.find((item: CartItemType) => item.id === id);

export const { addProduct, minusProduct, removeProduct, clearProduct } =
	cartSlice.actions;

export default cartSlice.reducer;
