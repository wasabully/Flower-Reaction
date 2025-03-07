import { calculateTotalPrice } from './calculateTotalPrice';

export const cartStorage = () => {
	const storedCart = localStorage.getItem('cart');
	const items = storedCart ? JSON.parse(storedCart) : [];
	const totalPrice = calculateTotalPrice(items);

	return {
		items: items,
		totalPrice: totalPrice,
	};
};
