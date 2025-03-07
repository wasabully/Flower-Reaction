import { CartItemType } from '../redux/slices/cartSlice';

export const calculateTotalPrice = (items: CartItemType[]) => {
	return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
