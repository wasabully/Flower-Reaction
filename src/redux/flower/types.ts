export interface Flower {
	id: string;
	title: string;
	price: number;
	sizes: string[];
	imageUrl: string;
	count: number;
}

export interface FetchFlowersParams {
	categoryId: number;
	searchValue: string;
	sortBy: string;
}

export interface FlowersState {
	items: Flower[];
	isLoading: boolean;
	error: string | null;
}
