import { RootState } from '../store';

export const getCartSelector = (state: RootState) => state.cart;
export const selectCartById = (id: string) => (state: RootState) =>
	state.cart.items.find((item) => item.id === id);
