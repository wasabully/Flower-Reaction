export type CartItemType = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	size: string;
	count: number;
};

export type CartState = {
	totalPrice: number;
	items: CartItemType[];
};
